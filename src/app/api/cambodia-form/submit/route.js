import { NextResponse } from "next/server";
import { insertCambodiaFormRow } from "@/lib/cambodiaFormDb";
import { uploadCambodiaFormFile } from "@/lib/s3CambodiaForm";

const FILE_FIELD_KEYS = [
  "idCardCopy",
  "passportVisaCopy",
  "familyRecordBookCopy",
  "otherDocumentCopy",
  "signatureFile",
];

function serializeFileField(value) {
  if (value == null) return null;
  if (typeof value === "object" && (value.fileName || value.url)) return value;
  return null;
}

/** Strip non-JSON-safe values; keep file metadata if sent from client. */
export function normalizeCambodiaFormPayload(body) {
  const {
    applicationReference,
    submittedAt,
    locale,
    email,
    fullName,
    phone,
    ...rest
  } = body ?? {};

  const formFields = { ...rest };
  for (const key of FILE_FIELD_KEYS) {
    if (formFields[key] != null && typeof formFields[key] === "object") {
      formFields[key] = serializeFileField(formFields[key]);
    }
  }

  return {
    applicationReference:
      applicationReference ||
      `CAMBODIA-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    submittedAt: submittedAt || new Date().toISOString(),
    locale: locale || null,
    email: email?.trim?.() || email,
    fullName: fullName?.trim?.() || fullName,
    phone: phone || null,
    formFields,
  };
}

async function parseSubmitRequest(req) {
  const contentType = req.headers.get("content-type") || "";

  if (contentType.includes("multipart/form-data")) {
    const formData = await req.formData();
    const payloadRaw = formData.get("payload");
    if (typeof payloadRaw !== "string") {
      throw new Error("Missing form payload");
    }
    const body = JSON.parse(payloadRaw);
    const files = {};
    for (const key of FILE_FIELD_KEYS) {
      const entry = formData.get(key);
      if (entry && typeof entry === "object" && typeof entry.arrayBuffer === "function") {
        files[key] = entry;
      }
    }
    return { body, files };
  }

  return { body: await req.json(), files: {} };
}

export async function POST(req) {
  try {
    const { body, files } = await parseSubmitRequest(req);
    const normalized = normalizeCambodiaFormPayload(body);

    if (!normalized.email) {
      return NextResponse.json({ success: false, error: "Email is required" }, { status: 400 });
    }
    if (!normalized.fullName) {
      return NextResponse.json({ success: false, error: "Full name is required" }, { status: 400 });
    }

    for (const key of FILE_FIELD_KEYS) {
      const file = files[key];
      if (!file) continue;
      try {
        normalized.formFields[key] = await uploadCambodiaFormFile({
          applicationReference: normalized.applicationReference,
          fieldKey: key,
          file,
        });
      } catch (uploadError) {
        console.error(`[cambodia-form/submit] upload failed for ${key}`, uploadError);
        return NextResponse.json(
          {
            success: false,
            error: uploadError.message || `Failed to upload ${key}`,
          },
          { status: 400 }
        );
      }
    }

    const formDataJson = JSON.stringify({
      ...normalized.formFields,
      submittedAt: normalized.submittedAt,
      applicationReference: normalized.applicationReference,
    });

    await insertCambodiaFormRow({
      applicationReference: normalized.applicationReference,
      email: normalized.email,
      fullName: normalized.fullName,
      phone: normalized.phone,
      locale: normalized.locale,
      formDataJson,
      createdAt: new Date(normalized.submittedAt),
    });

    return NextResponse.json({
      success: true,
      reference: normalized.applicationReference,
    });
  } catch (error) {
    console.error("[cambodia-form/submit]", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to save application",
        details: process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}

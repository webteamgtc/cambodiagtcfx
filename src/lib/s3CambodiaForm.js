import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NodeHttpHandler } from "@smithy/node-http-handler";
import { randomBytes } from "crypto";

const MAX_FILE_BYTES = 10 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
]);

function requireEnv(name) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing ${name}`);
  return value;
}

let s3Client;

function getS3Client() {
  if (!s3Client) {
    s3Client = new S3Client({
      region: requireEnv("AWS_REGION"),
      maxAttempts: 5,
      requestHandler: new NodeHttpHandler({
        connectionTimeout: 30_000,
        requestTimeout: 120_000,
      }),
      credentials: {
        accessKeyId: requireEnv("AWS_ACCESS_KEY_ID"),
        secretAccessKey: requireEnv("AWS_SECRET_ACCESS_KEY"),
      },
    });
  }
  return s3Client;
}

function isS3NetworkError(err) {
  const code = err?.code || err?.errno;
  return (
    code === "ECONNRESET" ||
    code === "ETIMEDOUT" ||
    code === "ENOTFOUND" ||
    err?.name === "TimeoutError"
  );
}

function sanitizeFileName(name) {
  return (name || "document")
    .replace(/[^\w.\-()+ ]/g, "_")
    .replace(/\s+/g, "-")
    .slice(0, 120);
}

export function buildCambodiaFormObjectKey({ applicationReference, fieldKey, fileName }) {
  // Bucket-root path e.g. combodian/{ref}/file — not platform/gtcgoapp (S3_ASSET_ROOT).
  const root = process.env.AWS_S3_CAMBODIA_FORM_ROOT?.trim().replace(/^\/+|\/+$/g, "") || "";
  const prefix =
    process.env.AWS_S3_CAMBODIA_FORM_PREFIX?.trim() ||
    process.env.AWS_S3_PASSPORT_PREFIX?.trim() ||
    "combodian";

  const safeRef = (applicationReference || "unknown").replace(/[^\w\-]/g, "_");
  const unique = randomBytes(4).toString("hex");
  const safeName = sanitizeFileName(fileName);

  const segments = [root, prefix, safeRef, `${fieldKey}-${unique}-${safeName}`].filter(Boolean);
  return segments.join("/");
}

export function getS3PublicUrl(key) {
  const normalizedKey = key.replace(/^\/+/, "");
  const publicBase = process.env.S3_PUBLIC_BASE_URL?.trim().replace(/\/+$/, "");
  if (publicBase) {
    return `${publicBase}/${normalizedKey}`;
  }
  const bucket = requireEnv("AWS_S3_BUCKET");
  const region = requireEnv("AWS_REGION");
  return `https://${bucket}.s3.${region}.amazonaws.com/${normalizedKey}`;
}

export async function uploadCambodiaFormFile({ applicationReference, fieldKey, file }) {
  if (!file || typeof file.arrayBuffer !== "function") {
    throw new Error("Invalid file upload");
  }

  const fileSize = file.size ?? 0;
  if (fileSize <= 0) {
    throw new Error("Empty file upload");
  }
  if (fileSize > MAX_FILE_BYTES) {
    throw new Error(`File exceeds ${MAX_FILE_BYTES / (1024 * 1024)}MB limit`);
  }

  const contentType = (file.type || "application/octet-stream").toLowerCase();
  if (!ALLOWED_TYPES.has(contentType)) {
    throw new Error("Unsupported file type. Use PDF, JPG, or PNG.");
  }

  const key = buildCambodiaFormObjectKey({
    applicationReference,
    fieldKey,
    fileName: file.name,
  });

  const body = Buffer.from(await file.arrayBuffer());
  const client = getS3Client();

  try {
    await client.send(
      new PutObjectCommand({
        Bucket: requireEnv("AWS_S3_BUCKET"),
        Key: key,
        Body: body,
        ContentType: contentType,
      })
    );
  } catch (err) {
    const code = err?.name || err?.Code;
    if (code === "AccessDenied" || /not authorized to perform: s3:PutObject/i.test(err?.message || "")) {
      throw new Error(
        `S3 upload denied for key "${key}". IAM user needs s3:PutObject on arn:aws:s3:::${requireEnv("AWS_S3_BUCKET")}/${key.split("/").slice(0, -1).join("/")}/* (check AWS_S3_CAMBODIA_FORM_PREFIX).`
      );
    }
    if (isS3NetworkError(err)) {
      throw new Error(
        "Could not reach AWS S3 (connection reset). Check internet/VPN/firewall, then submit again."
      );
    }
    throw err;
  }

  return {
    fileName: file.name,
    fileSize,
    fileType: contentType,
    url: getS3PublicUrl(key),
    s3Key: key,
  };
}

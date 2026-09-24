import { NextResponse } from "next/server";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_MEDIA_URL || "";
const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || "";
const STRAPI_COLLECTION = "data-ifx-expos";

/**
 * POST /api/strapi/ifx-expos
 * Saves IFX Expo form data to Strapi collection "data-ifx-expos".
 * Body: { email, firstName, lastName, phone, country, optinEmail? }
 */
export async function POST(req) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  if (!STRAPI_URL || !STRAPI_TOKEN) {
    return NextResponse.json(
      { error: "Strapi API URL or token not configured" },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();

    const {
      email,
      firstName,
      lastName,
      phone,
      country,
      optinEmail,
    } = body;

    if (!email || !phone) {
      return NextResponse.json(
        { error: "email and phone are required" },
        { status: 400 }
      );
    }

    // Strapi v4 expects { data: { ...attributes } }
    const strapiPayload = {
      data: {
        email: email?.trim?.() ?? email,
        firstName: firstName?.trim?.() ?? firstName ?? "",
        lastName: lastName?.trim?.() ?? lastName ?? "",
        phone: phone?.trim?.() ?? phone,
        country: country?.trim?.() ?? country ?? "",
        optinEmail: optinEmail ?? true,
      },
    };

    const response = await fetch(`${STRAPI_URL}/api/${STRAPI_COLLECTION}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
      body: JSON.stringify(strapiPayload),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      console.error("[strapi ifx-expos] Strapi error:", data);
      return NextResponse.json(
        {
          error: "Failed to save to Strapi",
          details: data?.error?.message || response.statusText,
        },
        { status: response.status }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Saved successfully",
        id: data?.data?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[strapi ifx-expos] Error:", error);
    return NextResponse.json(
      {
        error: "Failed to save data",
        details: error?.message,
      },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import otpGenerator from "otp-generator";
import { storeOtp } from "../otp-store";

const INFOBIP_BASE_URL = process.env.INFOBIP_BASE_URL || "";
const INFOBIP_API_KEY = process.env.INFOBIP_API_KEY || "";
const INFOBIP_WHATSAPP_SENDER = process.env.INFOBIP_WHATSAPP_SENDER || "";
const WHATSAPP_TEMPLATE_NAME = process.env.WHATSAPP_TEMPLATE_NAME || ""; // << your template name

export async function POST(req) {
  try {
    const { locale = "en", phone } = await req.json();

    if (!phone) {
      return NextResponse.json(
        {
          success: false,
          message: "Phone number is required for OTP delivery.",
        },
        { status: 400 }
      );
    }

    // Generate 6-digit OTP
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      digits: true,
      lowerCaseAlphabets: false,
    });

    // Store OTP securely with expiration (not exposed in response)
    // Store locally first
    await storeOtp("phone", phone, otp);
    
    // Also store via shared storage API for cross-instance support
    try {
      // Get base URL - try multiple methods
      let baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      if (!baseUrl) {
        if (process.env.VERCEL_URL) {
          baseUrl = `https://${process.env.VERCEL_URL}`;
        } else {
          // For local development
          baseUrl = 'http://localhost:3000';
        }
      }
      
      const storageResponse = await fetch(`${baseUrl}/api/otp-storage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "store",
          type: "phone",
          identifier: phone,
          otp: otp,
        }),
      });
      
      if (!storageResponse.ok) {
        console.warn("Shared storage API returned error, but OTP stored locally");
      } else {
        console.log("OTP stored in both local and shared storage");
      }
    } catch (error) {
      // Non-blocking - OTP is already stored locally
      console.warn("Failed to store OTP via shared API (non-critical):", error.message);
    }

    const messageData = await sendWhatsappOtp({ phone, otp, locale });

    // Return success without exposing OTP in response
    return NextResponse.json(
      {
        success: true,
        message: "OTP sent via WhatsApp.",
        providerMessageId: messageData.messageId,
        providerStatus: messageData.status?.name,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("WhatsApp OTP error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Error sending WhatsApp OTP.",
      },
      { status: 500 }
    );
  }
}

async function sendWhatsappOtp({ phone, otp, locale }) {
  if (!INFOBIP_BASE_URL) throw new Error("Missing INFOBIP_BASE_URL");
  if (!INFOBIP_API_KEY) throw new Error("Missing INFOBIP_API_KEY");
  if (!INFOBIP_WHATSAPP_SENDER)
    throw new Error("Missing INFOBIP_WHATSAPP_SENDER");

  const sanitizeNumber = (value = "") => value.toString().replace(/[^\d]/g, "");

  // Sender (must be your WABA number)
  const fromValue = sanitizeNumber(INFOBIP_WHATSAPP_SENDER);
  if (!fromValue) throw new Error("Invalid WhatsApp sender number");

  // Recipient
  const toValue = sanitizeNumber(phone);
  if (!toValue || toValue.length < 7) {
    throw new Error(`Invalid recipient phone number: "${phone}"`);
  }

  // IMPORTANT: template language must match Infobip template language
  // You created "English (UK)" → use en_GB as per Infobip docs.
  const langCode = "en"; // if you later add Arabic variant, you can switch based on locale

  const payload = {
    messages: [
      {
        from: fromValue,
        to: toValue,
        messageId: `otp-${Date.now()}-${Math.random()
          .toString(36)
          .slice(2, 8)}`,
        content: {
          templateName: WHATSAPP_TEMPLATE_NAME, // "text"
          templateData: {
            body: {
              // matches {{1}} in: "{{1}} is your verification code."
              placeholders: [otp],
            },
            buttons: [
              {
                type: "URL",
                parameter: otp,
              },
            ],
          },
          language: langCode,
        },
      },
    ],
  };

  console.log("WhatsApp OTP | Request:", {
    endpoint: `${INFOBIP_BASE_URL}/whatsapp/1/message/template`,
    from: fromValue,
    to: toValue,
    templateName: WHATSAPP_TEMPLATE_NAME,
    langCode,
    otp,
  });

  const response = await fetch(
    `${INFOBIP_BASE_URL}/whatsapp/1/message/template`,
    {
      method: "POST",
      headers: {
        Authorization: `App ${INFOBIP_API_KEY}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("Infobip error response:", {
      status: response.status,
      statusText: response.statusText,
      body: errorBody,
    });
    throw new Error(
      `Infobip WhatsApp error ${response.status}: ${errorBody || "Unknown"}`
    );
  }

  const responseData = await response.json();
  console.log("Infobip raw response:", JSON.stringify(responseData, null, 2));

  const messageData = Array.isArray(responseData.messages)
    ? responseData.messages[0]
    : responseData;

  if (messageData.status?.groupName === "REJECTED") {
    console.error("Infobip message rejected:", messageData.status);
    throw new Error(
      `WhatsApp message rejected: ${
        messageData.status.description ||
        messageData.status.name ||
        "Message rejected"
      }`
    );
  }

  return messageData;
}

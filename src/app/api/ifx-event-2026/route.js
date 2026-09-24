import { NextResponse } from "next/server";
import axios from "axios";

/** Node/undici often default ~10s connect — MC can need more on slow or filtered networks */
const MC_TIMEOUT_MS = Number(process.env.MARKETING_CLOUD_HTTP_TIMEOUT_MS) || 60_000;

const DEFAULT_AUTH_BASE =
  "https://mcsf7fgjmjxp53w8pdwyk0jzsj24.auth.marketingcloudapis.com";
const DEFAULT_REST_BASE =
  "https://mcsf7fgjmjxp53w8pdwyk0jzsj24.rest.marketingcloudapis.com";
const DEFAULT_DE_ROWS_PATH =
  "data/v1/async/dataextensions/key:92953BFD-DDCB-4084-8C24-03A1B9204B01/rows";

const authBase = process.env.MARKETING_CLOUD_AUTH_BASE?.trim() || DEFAULT_AUTH_BASE;
const restBase = process.env.MARKETING_CLOUD_REST_BASE?.trim() || DEFAULT_REST_BASE;
const DATA_EXTENSION_PATH =
  process.env.MARKETING_CLOUD_DE_ROWS_PATH?.trim() || DEFAULT_DE_ROWS_PATH;

function isConnectOrTimeoutError(error) {
  const code = error?.code;
  const causeCode = error?.cause?.code;
  return (
    code === "ECONNABORTED" ||
    code === "ETIMEDOUT" ||
    code === "UND_ERR_CONNECT_TIMEOUT" ||
    causeCode === "UND_ERR_CONNECT_TIMEOUT" ||
    (typeof error?.message === "string" && error.message.includes("timeout"))
  );
}

function mcErrorResponse(error) {
  if (error?.code === "ERR_INVALID_URL" || error?.message === "Invalid URL") {
    return NextResponse.json(
      {
        error: "Invalid Marketing Cloud URL",
        details:
          "MARKETING_CLOUD_AUTH_BASE and MARKETING_CLOUD_REST_BASE must be full URLs (https://…). Leave them unset to use the default SFMC stack URLs.",
        code: "MARKETING_CLOUD_INVALID_URL",
      },
      { status: 500 }
    );
  }
  if (isConnectOrTimeoutError(error)) {
    return NextResponse.json(
      {
        error: "Marketing Cloud unreachable",
        details:
          "Connection to Marketing Cloud timed out. Check outbound HTTPS to *.marketingcloudapis.com, VPN/firewall, and that MARKETING_CLOUD_AUTH_BASE is correct for your SFMC stack.",
        code: "MARKETING_CLOUD_CONNECT_TIMEOUT",
      },
      { status: 503 }
    );
  }
  return NextResponse.json(
    {
      error: "Failed to register partner",
      details: error?.message ?? String(error),
    },
    { status: 500 }
  );
}

export async function POST(req) {
  try {
    const partnerData = await req.json();

    const requiredFields = ["email", "firstName", "lastName", "phone", "country"];
    for (const field of requiredFields) {
      if (!partnerData[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    const clientId = process.env.MARKETING_CLOUD_CLIENT_ID;
    const clientSecret = process.env.MARKETING_CLOUD_CLIENT_SECRET;
    if (!clientId || !clientSecret) {
      return NextResponse.json(
        {
          error: "Server misconfiguration",
          details:
            "Set MARKETING_CLOUD_CLIENT_ID and MARKETING_CLOUD_CLIENT_SECRET in the server environment.",
        },
        { status: 500 }
      );
    }

    const tokenUrl = `${authBase.replace(/\/$/, "")}/v2/token`;
    const tokenRes = await axios.post(
      tokenUrl,
      {
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
      },
      {
        headers: { "Content-Type": "application/json" },
        timeout: MC_TIMEOUT_MS,
        validateStatus: () => true,
      }
    );

    if (tokenRes.status !== 200 || !tokenRes.data?.access_token) {
      const snippet =
        typeof tokenRes.data === "object"
          ? JSON.stringify(tokenRes.data)
          : String(tokenRes.data);
      console.error("Marketing Cloud token error:", tokenRes.status, snippet);
      return NextResponse.json(
        {
          error: "Failed to authenticate with Marketing Cloud",
          details: `Token HTTP ${tokenRes.status}`,
        },
        { status: 502 }
      );
    }

    const accessToken = tokenRes.data.access_token;

    const mcData = {
      items: [
        {
          EmailAddress: partnerData.email,
          FirstName: partnerData.firstName,
          LastName: partnerData.lastName,
          Phone: partnerData.phone,
          CountryResidence: partnerData.country,
          CreatedAt: new Date().toISOString(),
          EnterJourney: true,
          OptinEmail: partnerData.optinEmail ?? true,
          SyncStatus: "Pending",
          Pending: true,
        },
      ],
    };

    const rowsUrl = `${restBase.replace(/\/$/, "")}/${DATA_EXTENSION_PATH.replace(/^\//, "")}`;
    const mcRes = await axios.post(rowsUrl, mcData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      timeout: MC_TIMEOUT_MS,
      validateStatus: () => true,
    });

    if (mcRes.status < 200 || mcRes.status >= 300) {
      const errText =
        typeof mcRes.data === "object"
          ? JSON.stringify(mcRes.data)
          : String(mcRes.data);
      console.error("Marketing Cloud API error:", mcRes.status, errText);
      return NextResponse.json(
        {
          error: "Failed to save to Marketing Cloud",
          details: `Rows HTTP ${mcRes.status}`,
        },
        { status: 502 }
      );
    }

    const mcResult = mcRes.data && typeof mcRes.data === "object" ? mcRes.data : {};
    return NextResponse.json(
      {
        success: true,
        message: "Partner registered successfully",
        mcRequestId: mcResult.requestId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Partner submission error:", error);
    return mcErrorResponse(error);
  }
}

import { NextResponse } from "next/server";
import { verifyOtp } from "../otp-store";

// Ensure Node.js runtime for consistent behavior
export const runtime = "nodejs";

export async function POST(req) {
  try {
    const { phone, email, otp } = await req.json();

    if (!otp || (!phone && !email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Phone/Email and OTP are required.",
        },
        { status: 400 }
      );
    }

    const type = phone ? "phone" : "email";
    const identifier = phone || email;

    // Import stores to check instance
    const { phoneOtpStore, emailOtpStore } = await import("../otp-store");
    
    
    // Debug logging with store instance info
    // console.log("=== OTP VERIFICATION ===");
    // console.log("OTP verification request - Type:", type, "Identifier:", identifier, "OTP:", otp);
    // console.log("OTP verification - Store size:", phoneOtpStore.size);
    // console.log("OTP verification - Store instance:", phoneOtpStore);
    // console.log("OTP verification - All keys in store:", Array.from(phoneOtpStore.keys()));

    // Try shared storage API first (works across instances)
    let result = null;
    try {
      // Get base URL - try multiple methods
      let baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      if (!baseUrl) {
        if (process.env.VERCEL_URL) {
          baseUrl = `https://${process.env.VERCEL_URL}`;
        } else {
          // For local development, try to get from request
          const url = new URL(req.url || 'http://localhost:3000');
          baseUrl = `${url.protocol}//${url.host}`;
        }
      }
      
      const response = await fetch(`${baseUrl}/api/otp-storage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "verify",
          type: type,
          identifier: identifier,
          otp: otp,
        }),
      });
      
      if (response.ok) {
        const apiResult = await response.json();
        result = apiResult;
      } else {
        console.log("Shared API returned error, trying local store");
        result = await verifyOtp(type, identifier, otp);
      }
    } catch (error) {
      console.error("Failed to verify OTP via shared API, trying local store:", error.message);
      // Fallback to local store
      result = await verifyOtp(type, identifier, otp);
    }
    
    // If API didn't return a result, use local verification
    if (!result) {
      result = await verifyOtp(type, identifier, otp);
    }
    
    // Debug logging
    // console.log("OTP verification result:", result.success ? "SUCCESS" : "FAILED", result.message);
    // console.log("======================");

    if (result.success) {
      return NextResponse.json(
        {
          success: true,
          message: result.message,
        },
        { status: 200 }
      );
    } else {
      const statusCode = result.message.includes("expired") || result.message.includes("Invalid") ? 400 : 404;
      return NextResponse.json(
        {
          success: false,
          message: result.message,
        },
        { status: statusCode }
      );
    }
  } catch (error) {
    console.error("OTP verification error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Error verifying OTP.",
      },
      { status: 500 }
    );
  }
}


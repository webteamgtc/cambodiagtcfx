import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE_MAX_AGE_SEC,
  ADMIN_COOKIE_NAME,
  createAdminSessionToken,
  validateAdminCredentials,
} from "@/lib/adminAuth";

export async function POST(req) {
  try {
    const body = await req.json();
    const username = body?.username?.trim?.() ?? "";
    const password = body?.password ?? "";

    if (!validateAdminCredentials(username, password)) {
      return NextResponse.json({ success: false, error: "Invalid username or password" }, { status: 401 });
    }

    const token = createAdminSessionToken();
    const response = NextResponse.json({ success: true });

    response.cookies.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: ADMIN_COOKIE_MAX_AGE_SEC,
    });

    return response;
  } catch (error) {
    console.error("[admin/login]", error);
    return NextResponse.json({ success: false, error: "Login failed" }, { status: 500 });
  }
}

import crypto from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "cambodia_admin_session";
export const ADMIN_COOKIE_MAX_AGE_SEC = 60 * 60 * 8;

function getSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET?.trim();
  if (secret) return secret;
  const fallback = process.env.ADMIN_PASSWORD?.trim();
  if (fallback) return fallback;
  if (process.env.NODE_ENV === "development") {
    return "dev-admin-session-secret-change-in-production";
  }
  throw new Error("Missing ADMIN_SESSION_SECRET or ADMIN_PASSWORD for admin sessions");
}

export function validateAdminCredentials(username, password) {
  const expectedUser = process.env.ADMIN_USERNAME?.trim();
  const expectedPass = process.env.ADMIN_PASSWORD?.trim();
  if (!expectedUser || !expectedPass) {
    return false;
  }
  return username === expectedUser && password === expectedPass;
}

export function createAdminSessionToken() {
  const exp = Date.now() + ADMIN_COOKIE_MAX_AGE_SEC * 1000;
  const payload = Buffer.from(JSON.stringify({ exp, role: "admin" })).toString("base64url");
  const signature = crypto.createHmac("sha256", getSessionSecret()).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

export function verifyAdminSessionToken(token) {
  if (!token || typeof token !== "string") return false;

  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  let expectedSignature;
  try {
    expectedSignature = crypto.createHmac("sha256", getSessionSecret()).update(payload).digest("base64url");
  } catch {
    return false;
  }

  const sigBuf = Buffer.from(signature);
  const expectedBuf = Buffer.from(expectedSignature);
  if (sigBuf.length !== expectedBuf.length) return false;
  if (!crypto.timingSafeEqual(sigBuf, expectedBuf)) return false;

  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return typeof data.exp === "number" && Date.now() < data.exp;
  } catch {
    return false;
  }
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return verifyAdminSessionToken(token);
}

import { NextResponse } from "next/server";
import { DEFAULT_SITE_LOCALE } from "@/i18n/regionalLocale";
import {
  resolveCountryFromRequest,
  resolveCountryForAccessGate,
  setGeoCountryCookie,
} from "@/lib/geo/resolveCountryFromRequest";
import {
  isNoindexLegacyPath,
  getSiteRobotsResponseHeader,
} from "@/lib/seo/noindexPaths";
import { getCanonicalRedirectPathname } from "@/lib/seo/canonicalRedirects";
import {
  buildMainWebsiteRedirectUrl,
  shouldAllowCambodiaSiteAccess,
} from "@/lib/geo/cambodiaAccessGate";

const PUBLIC_FILE = /\.(.*)$/;

function rewriteToLocaleApp(request, publicPathname, countryCode, extraHeaders = {}) {
  const normalizedPublic =
    publicPathname === "" || publicPathname === "/" ? "/" : publicPathname;

  const internalPath =
    normalizedPublic === "/"
      ? `/${DEFAULT_SITE_LOCALE}`
      : `/${DEFAULT_SITE_LOCALE}${normalizedPublic}`;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", normalizedPublic);
  requestHeaders.set("x-locale", DEFAULT_SITE_LOCALE);

  const url = request.nextUrl.clone();
  url.pathname = internalPath;

  const response = NextResponse.rewrite(url, {
    request: { headers: requestHeaders },
  });

  for (const [key, value] of Object.entries(extraHeaders)) {
    response.headers.set(key, value);
  }

  const siteRobots = getSiteRobotsResponseHeader();
  if (siteRobots && !response.headers.has("X-Robots-Tag")) {
    response.headers.set("X-Robots-Tag", siteRobots);
  }

  if (countryCode) setGeoCountryCookie(response, countryCode);
  return response;
}

function redirectNonCambodiaVisitor(request, pathname, countryCode) {
  if (shouldAllowCambodiaSiteAccess(request, countryCode)) return null;
  const redirectUrl = buildMainWebsiteRedirectUrl(pathname, request.nextUrl.search);
  return NextResponse.redirect(redirectUrl, 307);
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/admin") ||
    pathname === "/favicon.ico" ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  if (isNoindexLegacyPath(pathname)) {
    const accessCountry = await resolveCountryForAccessGate(request);
    const geoRedirect = redirectNonCambodiaVisitor(request, pathname, accessCountry);
    if (geoRedirect) return geoRedirect;
    return rewriteToLocaleApp(request, pathname, accessCountry, {
      "X-Robots-Tag": "noindex",
    });
  }

  const canonicalPath = getCanonicalRedirectPathname(pathname);
  if (canonicalPath) {
    const url = request.nextUrl.clone();
    url.pathname = canonicalPath;
    const response = NextResponse.redirect(url, 301);
    const countryCode = await resolveCountryFromRequest(request);
    if (countryCode) setGeoCountryCookie(response, countryCode);
    return response;
  }

  const accessCountry = await resolveCountryForAccessGate(request);
  const geoRedirect = redirectNonCambodiaVisitor(request, pathname, accessCountry);
  if (geoRedirect) return geoRedirect;

  return rewriteToLocaleApp(request, pathname, accessCountry);
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|.*\\..*).*)"],
};

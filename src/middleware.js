import { NextResponse } from "next/server";
import {
  DEFAULT_SITE_LOCALE,
  parsePathLocale,
  sortLocalesLongestFirst,
} from "@/i18n/regionalLocale";
import { locales } from "@/i18n/config";
import {
  resolveCountryFromRequest,
  setGeoCountryCookie,
} from "@/lib/geo/resolveCountryFromRequest";
import { isNoindexLegacyPath } from "@/lib/seo/noindexPaths";
import { getCanonicalRedirectPathname } from "@/lib/seo/canonicalRedirects";

const PUBLIC_FILE = /\.(.*)$/;
const SORTED_LOCALES = sortLocalesLongestFirst(locales);

function getLocaleFromPathname(pathname) {
  return (
    SORTED_LOCALES.find(
      (locale) =>
        pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
    ) || null
  );
}

function buildLocalizedPath(pathname, targetLocale, restPath = null) {
  const resolvedRest =
    restPath ??
    (() => {
      const currentLocale = getLocaleFromPathname(pathname);
      if (currentLocale) {
        return pathname.slice(`/${currentLocale}`.length) || "";
      }
      return pathname === "/" ? "" : pathname;
    })();

  if (resolvedRest === "" || resolvedRest === "/") {
    return `/${targetLocale}`;
  }

  const normalizedRest = resolvedRest.startsWith("/")
    ? resolvedRest
    : `/${resolvedRest}`;

  return `/${targetLocale}${normalizedRest}`;
}

function redirectToLocale(
  request,
  targetLocale,
  restPath,
  countryCode,
  status = 307
) {
  const url = request.nextUrl.clone();
  url.pathname = buildLocalizedPath(request.nextUrl.pathname, targetLocale, restPath);
  const response = NextResponse.redirect(url, status);
  if (countryCode) setGeoCountryCookie(response, countryCode);
  return response;
}

function passThroughWithPathname(request, pathname, extraHeaders = {}) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);
  const pathLocale = getLocaleFromPathname(pathname);
  if (pathLocale) {
    requestHeaders.set("x-locale", pathLocale);
  }

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  for (const [key, value] of Object.entries(extraHeaders)) {
    response.headers.set(key, value);
  }

  return response;
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  if (isNoindexLegacyPath(pathname)) {
    return passThroughWithPathname(request, pathname, {
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

  const countryCode = await resolveCountryFromRequest(request);
  const parsed = parsePathLocale(pathname);

  if (parsed.hadLocalePrefix) {
    if (parsed.isLegacy || parsed.locale !== getLocaleFromPathname(pathname)) {
      return redirectToLocale(
        request,
        parsed.locale,
        parsed.restPath,
        countryCode
      );
    }

    const response = passThroughWithPathname(request, pathname);
    if (countryCode) setGeoCountryCookie(response, countryCode);
    return response;
  }

  return redirectToLocale(
    request,
    DEFAULT_SITE_LOCALE,
    pathname === "/" ? "" : pathname,
    countryCode
  );
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|.*\\..*).*)"],
};

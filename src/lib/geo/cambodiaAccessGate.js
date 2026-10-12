import { CAMBODIA_SITE } from "@/config/cambodiaSite";

export const CAMBODIA_COUNTRY_CODE = "KH";

const LOCALE_PREFIX_RE = /^\/(km-intl|en-intl)(?=\/|$)/;

export function isCambodiaCountry(countryCode) {
  return String(countryCode || "").toUpperCase() === CAMBODIA_COUNTRY_CODE;
}

export function isCambodiaGeoRestrictEnabled() {
  if (CAMBODIA_SITE.cambodiaOnlyAccess !== true) return false;
  const envFlag = process.env.CAMBODIA_GEO_RESTRICT_ENABLED;
  if (envFlag === "false" || envFlag === "0") return false;
  return true;
}

function normalizePublicPathname(pathname) {
  const raw = pathname || "/";
  const withoutLocale = raw.replace(LOCALE_PREFIX_RE, "") || "/";
  if (withoutLocale === "") return "/";
  return withoutLocale.startsWith("/") ? withoutLocale : `/${withoutLocale}`;
}

/**
 * Map a Cambodia-site path to the equivalent URL on gtcfx.com.
 */
export function buildMainWebsiteRedirectUrl(pathname, search = "") {
  const origin = (CAMBODIA_SITE.mainWebsiteOrigin || "https://gtcfx.com").replace(/\/+$/, "");
  const localePath = (CAMBODIA_SITE.mainWebsiteLocalePath || "/en-intl").replace(/\/+$/, "");
  const publicPath = normalizePublicPathname(pathname);

  const targetPath =
    publicPath === "/" ? `${localePath}/` : `${localePath}${publicPath}`;

  const url = new URL(targetPath, `${origin}/`);
  if (search) {
    const query = search.startsWith("?") ? search.slice(1) : search;
    if (query) url.search = query;
  }
  return url.toString();
}

export function hasGeoRestrictBypass(request) {
  const secret = process.env.CAMBODIA_GEO_RESTRICT_BYPASS?.trim();
  if (!secret) return false;

  const header = request.headers.get("x-cambodia-geo-bypass");
  if (header && header === secret) return true;

  const cookie = request.cookies.get("cambodia_geo_bypass")?.value;
  return cookie === secret;
}

export function shouldAllowCambodiaSiteAccess(request, countryCode) {
  if (!isCambodiaGeoRestrictEnabled()) return true;
  if (hasGeoRestrictBypass(request)) return true;
  if (
    process.env.NODE_ENV === "development" &&
    process.env.CAMBODIA_GEO_RESTRICT_IN_DEV !== "true"
  ) {
    return true;
  }
  if (!countryCode) return false;
  return isCambodiaCountry(countryCode);
}

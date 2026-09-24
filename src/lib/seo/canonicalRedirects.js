import {
  ENGLISH_REGIONAL_LOCALE,
  KHMER_REGIONAL_LOCALE,
} from "@/i18n/regionalLocale";

/**
 * Normalize duplicate URL shapes flagged in SEO audits:
 * - /en/... → /en-intl/...
 * - /km/... → /km-intl/...
 * - /en-intl/markets/metals/XPDUSD → .../xpdusd (canonical lowercase slug)
 *
 * @returns {string|null} Canonical pathname or null if already canonical.
 */
export function getCanonicalRedirectPathname(pathname) {
  if (!pathname || pathname === "/") return null;

  let path =
    pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;

  const segments = path.split("/").filter(Boolean);
  if (!segments.length) return null;

  let locale = segments[0].toLowerCase();
  let rest = segments.slice(1);
  let changed = false;

  if (locale === "en") {
    locale = ENGLISH_REGIONAL_LOCALE;
    changed = true;
  }

  if (locale === "km") {
    locale = KHMER_REGIONAL_LOCALE;
    changed = true;
  }

  if (
    rest.length >= 3 &&
    rest[0] === "markets" &&
    typeof rest[2] === "string" &&
    rest[2] !== rest[2].toLowerCase()
  ) {
    rest = [rest[0], rest[1], rest[2].toLowerCase(), ...rest.slice(3)];
    changed = true;
  }

  if (!changed) return null;

  const canonical = rest.length
    ? `/${locale}/${rest.join("/")}`
    : `/${locale}`;

  return canonical === path ? null : canonical;
}

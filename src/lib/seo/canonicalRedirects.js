import { parsePathLocale } from "@/i18n/regionalLocale";

function normalizeTrailingSlash(pathname) {
  if (!pathname || pathname === "/") return "/";
  return pathname.length > 1 && pathname.endsWith("/")
    ? pathname.slice(0, -1)
    : pathname;
}

function applyMarketSlugNormalization(segments) {
  const rest = [...segments];
  let changed = false;

  if (
    rest.length >= 3 &&
    rest[0] === "markets" &&
    typeof rest[2] === "string" &&
    rest[2] !== rest[2].toLowerCase()
  ) {
    rest[2] = rest[2].toLowerCase();
    changed = true;
  }

  return { rest, changed };
}

function buildUnprefixedPath(segments) {
  return segments.length ? `/${segments.join("/")}` : "/";
}

/**
 * Normalize public URL shapes:
 * - Strip `/km-intl`, `/en-intl`, `/en`, `/km`, and other legacy locale prefixes
 * - Lowercase metal instrument slugs under `/markets/metals/...`
 *
 * @returns {string|null} Canonical pathname or null if already canonical.
 */
export function getCanonicalRedirectPathname(pathname) {
  const path = normalizeTrailingSlash(pathname);
  if (path === "/") return null;

  const parsed = parsePathLocale(path);
  let segments;
  let changed = parsed.hadLocalePrefix;

  if (parsed.hadLocalePrefix) {
    segments = parsed.restPath.split("/").filter(Boolean);
  } else {
    segments = path.split("/").filter(Boolean);
  }

  const { rest: normalizedSegments, changed: slugChanged } =
    applyMarketSlugNormalization(segments);
  changed = changed || slugChanged;

  if (!changed) return null;

  const canonical = buildUnprefixedPath(normalizedSegments);
  return canonical === path ? null : canonical;
}

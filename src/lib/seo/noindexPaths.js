import { SEARCH_INDEXING_ENABLED } from "@/config/cambodiaSite";

/** Legacy removed URLs that should stay out of search indexes. */
const NOINDEX_LEGACY_PATHS = new Set(["/fa", "/en-intl/fa", "/km-intl/fa"]);

/** Default robots when the Cambodia site must not appear in search results. */
export const SITE_NOINDEX_ROBOTS = { index: false, follow: true };

/** Exported for robots.txt — these paths must remain crawlable (not Disallow). */
export function getNoindexLegacyPaths() {
  return [...NOINDEX_LEGACY_PATHS];
}

export function normalizePathname(pathname) {
  if (!pathname || pathname === "/") return "/";
  return pathname.replace(/\/+$/, "") || "/";
}

export function isNoindexLegacyPath(pathname) {
  return NOINDEX_LEGACY_PATHS.has(normalizePathname(pathname));
}

export function getRobotsMetadataForPath(pathname) {
  if (!SEARCH_INDEXING_ENABLED) {
    return SITE_NOINDEX_ROBOTS;
  }

  if (isNoindexLegacyPath(pathname)) {
    return { index: false };
  }

  return { index: true, follow: true };
}

/** Optional response header when HTML pages must not be indexed. */
export function getSiteRobotsResponseHeader() {
  if (!SEARCH_INDEXING_ENABLED) {
    return "noindex, follow";
  }
  return null;
}

export const noindexPageMetadata = {
  robots: getRobotsMetadataForPath("/fa"),
  title: "Page not found | GTCFX",
};

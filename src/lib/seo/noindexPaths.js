/** Legacy removed URLs that should stay out of search indexes. */
const NOINDEX_LEGACY_PATHS = new Set(["/fa", "/en-intl/fa"]);

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
  if (isNoindexLegacyPath(pathname)) {
    return { index: false };
  }

  return { index: true, follow: true };
}

export const noindexPageMetadata = {
  robots: getRobotsMetadataForPath("/fa"),
  title: "Page not found | GTCFX",
};

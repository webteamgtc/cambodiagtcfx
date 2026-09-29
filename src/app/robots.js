import { SEARCH_INDEXING_ENABLED } from "@/config/cambodiaSite";
import { getNoindexLegacyPaths } from "@/lib/seo/noindexPaths";

/**
 * robots.txt must NOT disallow noindex URLs.
 * Google needs to crawl those pages to read the noindex meta / X-Robots-Tag
 * and drop them from search results.
 */
export default function robots() {
  const baseUrl = (
    process.env.NEXT_PUBLIC_BASE_URL || "https://www.gtcfx.com"
  ).replace(/\/$/, "");

  const legacyNoindexPaths = getNoindexLegacyPaths();

  return {
    rules: {
      userAgent: "*",
      allow: ["/", ...legacyNoindexPaths],
    },
    ...(SEARCH_INDEXING_ENABLED ? { sitemap: `${baseUrl}/sitemap.xml` } : {}),
  };
}

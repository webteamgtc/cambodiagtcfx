import {
  fetchSymbolTypes,
  fetchSymbolsByType,
} from "@/lib/symbols/gtcTraderSymbolsApi";
import {
  marketCategoryFromApiType,
  rawSymbolToSlug,
} from "@/app/[locale]/markets/market-shared/symbolDetailConfig";

const SITEMAP_PAGE_SIZE = 200;

function getTypeName(item) {
  return item?.title_name || item?.title || "";
}

function isValidInstrumentSlug(slug) {
  if (!slug || typeof slug !== "string") return false;
  const trimmed = slug.trim();
  if (trimmed !== slug || trimmed !== trimmed.toLowerCase()) return false;
  if (/\s/.test(trimmed)) return false;
  if (/[^\x00-\x7F]/.test(trimmed)) return false;
  return /^[a-z0-9][a-z0-9_-]*$/.test(trimmed);
}

/**
 * Canonical English instrument paths: markets/{category}/{slug}
 * e.g. markets/forex/audcad
 */
export async function fetchInstrumentSitemapPaths() {
  const paths = [];
  const seen = new Set();

  try {
    const types = await fetchSymbolTypes();

    for (const typeItem of types) {
      const typeName = getTypeName(typeItem);
      if (!typeName) continue;

      const category = marketCategoryFromApiType(typeName);
      let page = 1;
      let fetched = 0;
      let total = 0;

      while (true) {
        const result = await fetchSymbolsByType({
          type: typeName,
          page,
          pageSize: SITEMAP_PAGE_SIZE,
        });

        const list = result.list;
        total = result.total;

        if (!list.length) break;

        for (const item of list) {
          const rawSymbol = item?.symbol;
          if (!rawSymbol) continue;

          const slug = rawSymbolToSlug(rawSymbol);
          if (!isValidInstrumentSlug(slug)) continue;

          const cleanPath = `markets/${category}/${slug}`;
          if (seen.has(cleanPath)) continue;

          seen.add(cleanPath);
          paths.push(cleanPath);
        }

        fetched += list.length;
        if (total > 0 && fetched >= total) break;

        page += 1;
        if (page > 500) break;
      }
    }
  } catch (error) {
    console.error("[sitemap] instrument fetch failed:", error);
  }

  return paths.sort();
}

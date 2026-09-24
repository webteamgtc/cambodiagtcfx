import { SHOW_CAREERS } from "@/config/featureFlags";
import { getCanonicalUrl } from "@/lib/canonicalUrl";
import { ENGLISH_REGIONAL_LOCALE, KHMER_REGIONAL_LOCALE } from "@/i18n/regionalLocale";
import { fetchAllBlogsForSitemap } from "@/lib/strapiBlogs";
import { getAllMarketNewsArticleSlugs } from "@/app/[locale]/gtc-news/market-news/marketNewsArticleData";
import { fetchInstrumentSitemapPaths } from "@/lib/sitemap/fetchInstrumentSitemapPaths";

/** Stable lastmod for static marketing pages (avoid daily churn). */
const STATIC_LASTMOD =
  process.env.SITEMAP_STATIC_LASTMOD || "2026-08-25T00:00:00.000Z";
  

const STATIC_PATHS = [
  "",
  "account-options",
  "live-account-application",
  "company",
  "company/about-us",
  "company/why-gtc-group",
  "company/global-presence",
  "company/regulations",
  "company/awards",
  "company/events-and-exhibitions",
  "company/forex-expo-dubai-webinar",
  "company/contact-us",
  "company/faqs",
  "company/dynamic-leverage",
  ...(SHOW_CAREERS ? ["company/careers"] : []),
  "trading",
  "trading/account-types",
  "trading/open-live-account",
  "trading/free-demo-account",
  "trading/deposit",
  "trading/mt4-platform",
  "trading/mt5-platform",
  "trading/gtc-go-app",
  "trading/vps-hosting-services",
  "trading/pamm-account",
  "trading/mam-account",
  "trading/swap-update",
  "trading/swap-free-trading",
  "trading/compensation-fund",
  "trading/margin-bonus",
  "trading/copy-trading",
  "markets",
  "markets/forex",
  "markets/indices",
  "markets/commodities",
  "markets/energy",
  "markets/metals",
  "markets/crypto-cfds",
  "markets/shares",
  "markets/future-cfds",
  "markets/economic-calendar",
  "markets/market-holidays",
  "knowledge-to-learn",
  "knowledge-to-learn/platform-guide",
  "knowledge-to-learn/trading-glossary",
  "gtc-news",
  "gtc-news/market-news",
  "gtc-news/earnings-calendar",
  "company-news",
  "blogs",
  "legal/privacy-policy",
  "legal/terms-and-conditions",
  "legal/risk-disclosure",
  "legal/website-disclaimer",
  "legal/cookie-policy",
  "legal/restricted-countries",
  "legal/kyc-compliance-policy",
  "legal/deposit-and-refund-policy",
  "legal/swap-free-terms-and-conditions",
  "legal/legal-documents",
];

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildUrlEntry(loc, lastmod) {
  return `<url>
  <loc>${escapeXml(loc)}</loc>
  <lastmod>${escapeXml(lastmod)}</lastmod>
</url>`;
}

function isValidSitemapSlug(slug) {
  if (!slug || typeof slug !== "string") return false;
  const trimmed = slug.trim();
  if (trimmed !== slug) return false;
  if (/\s/.test(trimmed)) return false;
  if (/[^\x00-\x7F]/.test(trimmed)) return false;
  return /^[a-z0-9][a-z0-9_-]*$/i.test(trimmed);
}

/** English URLs use the Cambodia site default locale prefix. */
function localeUrl(locale, cleanPath) {
  const url = getCanonicalUrl(locale, cleanPath);
  return cleanPath === "" ? `${url}/` : url;
}

function enUrl(cleanPath) {
  return localeUrl(ENGLISH_REGIONAL_LOCALE, cleanPath);
}

export async function buildSitemapXml() {
  const seenLocs = new Set();
  const urlEntries = [];

  const pushEntry = (loc, lastmod) => {
    if (!loc || seenLocs.has(loc)) return;
    seenLocs.add(loc);
    urlEntries.push(buildUrlEntry(loc, lastmod));
  };

  for (const cleanPath of STATIC_PATHS) {
    pushEntry(localeUrl(KHMER_REGIONAL_LOCALE, cleanPath), STATIC_LASTMOD);
    pushEntry(enUrl(cleanPath), STATIC_LASTMOD);
  }

  try {
    const posts = await fetchAllBlogsForSitemap({
      locale: "en",
      pageSize: 100,
      cache: "no-store",
    });

    for (const { slug, lastmod } of posts) {
      if (!isValidSitemapSlug(slug)) continue;
      pushEntry(enUrl(`blogs/${slug}`), lastmod || STATIC_LASTMOD);
    }
  } catch (error) {
    console.error("[sitemap] blog fetch failed:", error);
  }

  for (const slug of getAllMarketNewsArticleSlugs()) {
    if (!isValidSitemapSlug(slug)) continue;
    pushEntry(enUrl(`gtc-news/market-news/${slug}`), STATIC_LASTMOD);
  }

  try {
    const instrumentPaths = await fetchInstrumentSitemapPaths();
    for (const cleanPath of instrumentPaths) {
      pushEntry(enUrl(cleanPath), STATIC_LASTMOD);
    }
  } catch (error) {
    console.error("[sitemap] instrument paths failed:", error);
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries.join("\n")}
</urlset>`;
}

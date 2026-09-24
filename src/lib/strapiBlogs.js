import {
  fetchStrapiCollection,
  getStrapiLocaleCandidates,
  mapStrapiLocale,
  toAbsoluteStrapiMediaUrl,
} from "@/lib/strapi";
import { localizedHref } from "@/i18n/localizedHref";
import { BLOG_CARD_FALLBACK_IMAGE } from "@/lib/blog/blogCardImage";


function decodeHtmlEntities(text) {
  if (!text || typeof text !== "string") return "";
  return text
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) =>
      String.fromCharCode(parseInt(hex, 16))
    );
}

function stripHtmlToPlain(html, maxLen = 320) {
  if (!html || typeof html !== "string") return "";
  const plain = decodeHtmlEntities(html)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (plain.length <= maxLen) return plain;
  return `${plain.slice(0, maxLen - 1).trim()}…`;
}

function getBlogShortDescription(attrs = {}) {
  return (
    (typeof attrs.short_descreption === "string" &&
      attrs.short_descreption.trim()) ||
    (typeof attrs.shortDescription === "string" &&
      attrs.shortDescription.trim()) ||
    (typeof attrs.seo_description === "string" &&
      attrs.seo_description.trim()) ||
    ""
  );
}

function getBlogExcerpt(attrs = {}, maxLen = 160) {
  const shortDescription = getBlogShortDescription(attrs);
  if (shortDescription) {
    return stripHtmlToPlain(shortDescription, maxLen);
  }

  return stripHtmlToPlain(attrs.descreption || attrs.description || "", maxLen);
}

/** Strapi category id for “blogs” listing (same as `src/app/[locale]/blogs/page.jsx`). */
const BLOG_CATEGORY_ID = 6;

/** Strapi “Favourite” category — broker news on GTC News page. */
export const FAVOURITE_CATEGORY_SLUG = "favourite";

/** Strapi “event” category — knowledge hub featured on GTC News page. */
export const EVENT_CATEGORY_SLUG = "event";

/** Hidden from GTC News trends category tabs. */
export const TRENDS_EXCLUDED_CATEGORY_SLUGS = [
  FAVOURITE_CATEGORY_SLUG,
  "fundamental",
  "weekly-forecast",
  EVENT_CATEGORY_SLUG,
];

export function filterTrendCategories(categories = []) {
  const excluded = new Set(
    TRENDS_EXCLUDED_CATEGORY_SLUGS.map((slug) => slug.toLowerCase())
  );
  return categories.filter(
    (category) => !excluded.has(String(category?.slug || "").toLowerCase())
  );
}

export const MARKET_NEWS_ARTICLE_BASE = "/markets/market-news";

function buildBlogDetailHref(categorySlug, slug) {
  if (!slug) return MARKET_NEWS_ARTICLE_BASE;
  const category = categorySlug || "blogs";
  return `${MARKET_NEWS_ARTICLE_BASE}/${category}/${slug}`;
}

export function buildMarketNewsArticleHref(categorySlug, slug) {
  return buildBlogDetailHref(categorySlug, slug);
}

/** Legacy market-news URLs used title text as slug; canonical blog URLs use kebab-case under `/blogs/`. */
export function normalizeLegacyBlogSlug(slug) {
  return decodeURIComponent(String(slug || ""))
    .trim()
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9\s-]/gi, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function buildCanonicalBlogHref(locale, slug) {
  const normalized = normalizeLegacyBlogSlug(slug);
  if (!normalized) return localizedHref(locale, "/blogs");
  return localizedHref(locale, `/blogs/${normalized}`);
}

/**
 * Resolve a blog post's cover image to an absolute production-safe URL.
 * Handles Strapi v4/v5 media shapes and localhost URLs saved from CMS admin.
 */
export function getBlogPostImageUrl(post, fallback = BLOG_CARD_FALLBACK_IMAGE) {
  const attrs = post?.attributes ?? post ?? {};
  const imageRel =
    attrs?.imageUrl?.data?.attributes?.url ||
    attrs?.imageUrl?.data?.url ||
    attrs?.imageUrl?.url ||
    attrs?.image?.data?.attributes?.url ||
    attrs?.image?.data?.url ||
    attrs?.image?.url ||
    "";

  if (!imageRel) return fallback;

  const raw = String(imageRel).trim();

  if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/i.test(raw)) {
    const path = raw.replace(/^https?:\/\/[^/]+/i, "");
    return toAbsoluteStrapiMediaUrl(path) || fallback;
  }

  if (raw.startsWith("http://") || raw.startsWith("https://")) return raw;

  return toAbsoluteStrapiMediaUrl(raw) || fallback;
}

function buildPopulateParams() {
  return {
    "populate[imageUrl][fields][0]": "url",
    "populate[category][fields][0]": "name",
    "populate[category][fields][1]": "slug",
    "populate[author][fields][0]": "name",
    "populate[author][populate][authorImg][fields][0]": "url",
  };
}

/**
 * One page of blogs from Strapi — same attempt order as the blogs page.
 */
export async function fetchBlogsStrapiPage(
  locale,
  start = 0,
  limit = 6,
  cache = "no-store"
) {
  const populateParams = buildPopulateParams();
  const fetchCache =
    typeof cache === "object" && cache !== null ? cache.cache ?? "no-store" : cache;
  const fetchRevalidate =
    typeof cache === "object" && cache !== null ? cache.revalidate : undefined;
  const attemptParams = [
    {
      ...populateParams,
      "filters[category][id][$eq]": BLOG_CATEGORY_ID,
      "pagination[start]": start,
      "pagination[limit]": limit,
    },
    {
      ...populateParams,
      "filters[category][$eq]": BLOG_CATEGORY_ID,
      "pagination[start]": start,
      "pagination[limit]": limit,
    },
    {
      ...populateParams,
      "pagination[start]": start,
      "pagination[limit]": limit,
    },
  ];

  const tryLoad = async (loc) => {
    for (const params of attemptParams) {
      try {
        const res = await fetchStrapiCollection("blogs", {
          locale: loc,
          populate: null,
          sort: "createdAt:desc",
          params,
          cache: fetchCache,
          ...(typeof fetchRevalidate === "number"
            ? { revalidate: fetchRevalidate }
            : {}),
        });
        if (Array.isArray(res?.data)) return res;
      } catch (error) {
        console.error(
          "[strapiBlogs] fetch attempt failed:",
          error?.message || error
        );
      }
    }
    return { data: [] };
  };

  const mappedLocale = mapStrapiLocale(locale);
  let res = await tryLoad(mappedLocale);
  let usedLocale = mappedLocale;
  return {
    data: res?.data,
    meta: res?.meta,
    usedLocale,
  };
}

/**
 * Blogs filtered by Strapi category slug (favourite, company-news, etc.).
 */
export async function fetchBlogsByCategorySlug(
  locale,
  categorySlug,
  start = 0,
  limit = 6,
  cache = "no-store"
) {
  const slug = String(categorySlug || "").trim();
  if (!slug) {
    return { data: [], meta: null, usedLocale: mapStrapiLocale(locale) };
  }
  

  const populateParams = buildPopulateParams();
  const attemptParams = [
    {
      ...populateParams,
      "filters[category][slug][$eq]": slug,
      "pagination[start]": start,
      "pagination[limit]": limit,
    },
    {
      ...populateParams,
      "pagination[start]": start,
      "pagination[limit]": limit,
    },
  ];

  const tryLoad = async (loc) => {
    for (const params of attemptParams) {
      try {
        const res = await fetchStrapiCollection("blogs", {
          locale: loc,
          populate: null,
          sort: "createdAt:desc",
          params,
          cache,
        });
        if (!Array.isArray(res?.data)) continue;

        const filtered = res.data.filter((entry) => {
          const attrs = entry?.attributes ?? entry ?? {};
          const entrySlug =
            attrs?.category?.data?.attributes?.slug ||
            attrs?.category?.slug ||
            "";
          return !params["filters[category][slug][$eq]"] || entrySlug === slug;
        });

        return { ...res, data: filtered };
      } catch (error) {
        console.error(
          "[strapiBlogs] category slug fetch attempt failed:",
          error?.message || error
        );
      }
    }
    return { data: [] };
  };

  const mappedLocale = mapStrapiLocale(locale);
  const res = await tryLoad(mappedLocale);

  return {
    data: res?.data,
    meta: res?.meta,
    usedLocale: mappedLocale,
  };
}

export async function fetchFavouriteBlogsPage(
  locale,
  start = 0,
  limit = 4,
  cache = "no-store"
) {
  return fetchBlogsByCategorySlug(
    locale,
    FAVOURITE_CATEGORY_SLUG,
    start,
    limit,
    cache
  );
}

export async function fetchEventBlogsPage(
  locale,
  start = 0,
  limit = 1,
  cache = "no-store"
) {
  return fetchBlogsByCategorySlug(
    locale,
    EVENT_CATEGORY_SLUG,
    start,
    limit,
    cache
  );
}

/**
 * All blog categories from Strapi `/categories`.
 */
export async function fetchStrapiCategories(locale, cache = "no-store") {
  const mappedLocale = mapStrapiLocale(locale);

  try {
    const res = await fetchStrapiCollection("categories", {
      locale: mappedLocale,
      populate: null,
      sort: "name:asc",
      params: {
        "pagination[limit]": 100,
      },
      cache,
    });

    const rows = Array.isArray(res?.data) ? res.data : [];
    return {
      data: rows.map(mapStrapiCategory).filter((category) => category.slug),
      usedLocale: mappedLocale,
    };
  } catch (error) {
    console.error(
      "[strapiBlogs] categories fetch failed:",
      error?.message || error
    );
    return { data: [], usedLocale: mappedLocale };
  }
}

export function mapStrapiCategory(entry) {
  const attrs = entry?.attributes ?? entry ?? {};
  return {
    id: entry?.id ?? null,
    slug: attrs?.slug || "",
    name: attrs?.name || attrs?.slug || "",
  };
}

function formatBlogDisplayDate(isoString, fallback = "") {
  if (!isoString) return fallback;
  try {
    return new Date(isoString)
      .toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      })
      .toUpperCase();
  } catch {
    return fallback;
  }
}

function formatBlogAuthor(name, fallback = "") {
  const trimmed = typeof name === "string" ? name.trim() : "";
  if (!trimmed) return fallback;
  return `BY ${trimmed.toUpperCase()}`;
}


/** Card shape for `/blogs` listing — links stay on the blogs detail route. */
export function mapBlogPostForBlogsPageCard(post, locale = "en") {
  const card = mapBlogPostForNewsCard(post, locale);
  if (!card.slug) return card;
  return {
    ...card,
    href: localizedHref(locale, `/blogs/${card.slug}`),
  };
}


/**
 * Normalized card shape for GTC News broker section and similar UIs.
 */
export function mapBlogPostForNewsCard(post, locale = "en") {
  const attrs = post?.attributes ?? post ?? {};
  const slug = attrs?.slug || post?.slug || "";
  const categorySlug =
    attrs?.category?.data?.attributes?.slug ||
    attrs?.category?.slug ||
    FAVOURITE_CATEGORY_SLUG;

  const imageRel =
    attrs?.imageUrl?.data?.attributes?.url ||
    attrs?.imageUrl?.data?.url ||
    attrs?.imageUrl?.url ||
    attrs?.image?.data?.attributes?.url ||
    attrs?.image?.data?.url ||
    attrs?.image?.url ||
    "";

  const image = imageRel ? getBlogPostImageUrl(post, "/home/homehero1.webp") : "/home/homehero1.webp";

  const authorName =
    attrs?.author?.data?.attributes?.name ||
    attrs?.author?.name ||
    "";

  const categoryName =
    attrs?.category?.data?.attributes?.name ||
    attrs?.category?.name ||
    "";

  const subtitle =
    getBlogShortDescription(attrs) ||
    categoryName ||
    "";

  const excerpt = getBlogExcerpt(attrs, 160);

  const href = buildBlogDetailHref(categorySlug, slug);

  return {
    id: post?.id ?? slug,
    slug,
    title: attrs?.title || attrs?.name || "",
    subtitle,
    excerpt,
    image,
    date: formatBlogDisplayDate(
      attrs?.publishedAt || attrs?.createdAt,
      ""
    ),
    author: formatBlogAuthor(authorName, ""),
    categoryName,
    categorySlug,
    href,
    locale,
  };
}

function formatArticleDate(isoString, fallback = "") {
  if (!isoString) return fallback;
  try {
    return new Date(isoString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return fallback;
  }
}

function formatArticleLastUpdated(isoString, fallback = "") {
  if (!isoString) return fallback;
  try {
    return new Date(isoString)
      .toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
      .toLowerCase();
  } catch {
    return fallback;
  }
}

/**
 * Normalized article shape for market news detail page components.
 */
export function mapBlogPostForMarketNewsArticle(post, locale = "en") {
  const attrs = post?.attributes ?? post ?? {};
  const card = mapBlogPostForNewsCard(post, locale);
  const htmlContent =
    (typeof attrs.descreption === "string" && attrs.descreption) ||
    (typeof attrs.description === "string" && attrs.description) ||
    "";

  const authorRaw =
    attrs?.author?.data?.attributes?.name ||
    attrs?.author?.name ||
    "";

  const plainBody = stripHtmlToPlain(htmlContent, 10000);
  const paragraphs = plainBody
    ? plainBody.split(/(?<=[.!?])\s+/).reduce((chunks, sentence, index) => {
        const chunkIndex = Math.floor(index / 2);
        if (!chunks[chunkIndex]) chunks[chunkIndex] = sentence;
        else chunks[chunkIndex] = `${chunks[chunkIndex]} ${sentence}`;
        return chunks;
      }, [])
    : card.excerpt
      ? [card.excerpt]
      : [];

  const publishedAt = attrs?.publishedAt || attrs?.createdAt;
  const updatedAt = attrs?.updatedAt || publishedAt;

  return {
    slug: card.slug,
    categorySlug: card.categorySlug,
    categoryName: card.categoryName,
    title: card.title,
    source: card.categoryName || "GTCFX",
    author: authorRaw || card.author.replace(/^BY\s+/i, ""),
    date: formatArticleDate(publishedAt, ""),
    lastUpdated: formatArticleLastUpdated(updatedAt, ""),
    readTime: "",
    shareCount: 0,
    image: card.image,
    htmlContent,
    paragraphs,
    excerpt: card.excerpt,
    href: card.href,
    comments: [],
  };
}

/**
 * Fetch a single blog post by category slug + article slug.
 */
export async function fetchBlogByCategoryAndSlug(
  locale,
  categorySlug,
  blogSlug,
  cache = "no-store"
) {
  const category = String(categorySlug || "").trim();
  const slug = decodeURIComponent(String(blogSlug || "").trim());
  if (!category || !slug) return null;

  const attemptParams = [
    {
      ...buildPopulateParams(),
      "filters[slug][$eq]": slug,
      "filters[category][slug][$eq]": category,
      "pagination[start]": 0,
      "pagination[limit]": 1,
    },
    {
      ...buildPopulateParams(),
      "filters[slug][$eq]": slug,
      "pagination[start]": 0,
      "pagination[limit]": 1,
    },
  ];

  const load = async (loc, params) =>
    fetchStrapiCollection("blogs", {
      locale: loc,
      populate: null,
      sort: "createdAt:desc",
      params,
      cache,
    });

  const mapped = mapStrapiLocale(locale);

  for (const params of attemptParams) {
    try {
      let res = await load(mapped, params);
      if ((!res?.data || res.data.length === 0) && mapped !== "en") {
        res = await load("en", params);
      }

      const row = res?.data?.[0];
      if (!row) continue;

      const attrs = row?.attributes ?? row ?? {};
      const rowCategorySlug =
        attrs?.category?.data?.attributes?.slug ||
        attrs?.category?.slug ||
        "";

      if (rowCategorySlug && rowCategorySlug !== category) continue;

      return row;
    } catch (error) {
      console.error(
        "[strapiBlogs] fetch by category+slug failed:",
        error?.message || error
      );
    }
  }

  return null;
}

/**
 * All blog posts for sitemap (English URLs only: `/blogs/{slug}`).
 */
export async function fetchAllBlogsForSitemap({
  locale = "en",
  pageSize = 100,
  cache = "no-store",
} = {}) {
  const out = [];
  let start = 0;

  for (;;) {
    const { data } = await fetchBlogsStrapiPage(locale, start, pageSize, cache);
    const rows = Array.isArray(data) ? data : [];

    for (const entry of rows) {
      const attrs = entry?.attributes ?? entry;
      const slug = attrs?.slug;
      if (!slug) continue;
      const raw = attrs.updatedAt ?? attrs.publishedAt ?? attrs.createdAt;
      out.push({
        slug: String(slug),
        lastmod: raw ? new Date(raw).toISOString() : new Date().toISOString(),
      });
    }

    if (rows.length < pageSize) break;
    start += pageSize;
  }

  return out;
}

/**
 * Single blog row by slug (server).
 */
export async function fetchBlogRowBySlug(slug, routeLocale, cache = "no-store") {
  const decoded = decodeURIComponent(String(slug || "").trim());
  if (!decoded) return null;

  const params = {
    ...buildPopulateParams(),
    "filters[slug][$eq]": decoded,
    "pagination[start]": 0,
    "pagination[limit]": 1,
  };

  const load = async (loc) =>
    fetchStrapiCollection("blogs", {
      locale: loc,
      populate: null,
      sort: "createdAt:desc",
      params,
      cache,
    });

  const mapped = mapStrapiLocale(routeLocale);
  let res = await load(mapped);
  if ((!res?.data || res.data.length === 0) && mapped !== "en") {
    res = await load("en");
  }

  return res?.data?.[0] ?? null;
}

/**
 * Single blog by slug (server) — same filter/populate pattern as `SingleDetailPage`.
 */
export async function fetchBlogBySlugForMetadata(slug, routeLocale, cache = "no-store") {
  const row = await fetchBlogRowBySlug(slug, routeLocale, cache);
  if (!row) return null;

  const attrs = row?.attributes ?? row ?? {};
  const title =
    (typeof attrs.title === "string" && attrs.title.trim()) ||
    (typeof attrs.name === "string" && attrs.name.trim()) ||
    "";

  const rawDesc =
    getBlogShortDescription(attrs) ||
    stripHtmlToPlain(attrs.descreption || attrs.description || "");

  const rel =
    attrs?.imageUrl?.data?.attributes?.url ||
    attrs?.imageUrl?.data?.url ||
    attrs?.imageUrl?.url ||
    "";
  const imageUrl = rel ? toAbsoluteStrapiMediaUrl(rel) : null;

  return {
    title: title || null,
    description: rawDesc || null,
    imageUrl,
  };
}

/**
 * Blogs linked to a learn-type (section slug) via Strapi `learn_type` relation.
 */
function getBlogLearnTypeSlug(entry) {
  const attrs = entry?.attributes ?? entry ?? {};
  return (
    attrs?.learn_type?.data?.attributes?.slug ||
    attrs?.learn_type?.slug ||
    ""
  );
}

async function resolveLearnTypeIdBySlug(locale, learnTypeSlug, cache) {
  const slug = String(learnTypeSlug || "").trim();
  if (!slug) return null;

  const locales = getStrapiLocaleCandidates(locale);

  for (const loc of locales) {
    try {
      const res = await fetchStrapiCollection("learn-types", {
        locale: loc,
        populate: null,
        params: {
          "filters[slug][$eq]": slug,
          "pagination[pageSize]": 1,
        },
        cache,
      });
      const id = res?.data?.[0]?.id;
      if (id) return id;
    } catch {
      // try next locale
    }
  }

  return null;
}

export async function fetchBlogsByLearnTypeSlug(
  locale,
  learnTypeSlug,
  { cache = "no-store", limit = 50 } = {}
) {
  const slug = String(learnTypeSlug || "").trim();
  if (!slug) {
    return { data: [], usedLocale: mapStrapiLocale(locale) };
  }

  const populateParams = {
    ...buildPopulateParams(),
    "populate[learn_type][fields][0]": "slug",
    "populate[learn_type][fields][1]": "name",
  };

  const locales = getStrapiLocaleCandidates(locale);
  const learnTypeId = await resolveLearnTypeIdBySlug(locale, slug, cache);

  const baseParams = {
    ...populateParams,
    "pagination[pageSize]": limit,
  };

  const attemptParams = [
    { ...baseParams, "filters[learn_type][slug][$eq]": slug },
    ...(learnTypeId
      ? [{ ...baseParams, "filters[learn_type][id][$eq]": learnTypeId }]
      : []),
  ];

  for (const loc of locales) {
    for (const params of attemptParams) {
      try {
        const res = await fetchStrapiCollection("blogs", {
          locale: loc,
          populate: null,
          sort: "createdAt:desc",
          params,
          cache,
        });

        const rows = (Array.isArray(res?.data) ? res.data : []).filter(
          (entry) => getBlogLearnTypeSlug(entry) === slug
        );

        if (rows.length) {
          return { data: rows, usedLocale: loc };
        }
      } catch (error) {
        console.error(
          "[strapiBlogs] learn_type slug fetch failed:",
          error?.message || error
        );
      }
    }
  }

  return { data: [], usedLocale: mapStrapiLocale(locale) };
}

/**
 * Single blog for knowledge hub: matches article slug + learn-type (section) slug.
 */
export async function fetchBlogByLearnTypeAndSlug(
  locale,
  learnTypeSlug,
  blogSlug,
  cache = "no-store"
) {
  const sectionSlug = String(learnTypeSlug || "").trim();
  const slug = decodeURIComponent(String(blogSlug || "").trim());
  if (!slug || !sectionSlug) return null;

  const populateParams = {
    ...buildPopulateParams(),
    "populate[learn_type][fields][0]": "slug",
    "populate[learn_type][fields][1]": "name",
  };

  const learnTypeId = await resolveLearnTypeIdBySlug(locale, sectionSlug, cache);

  const paramsList = [
    {
      ...populateParams,
      "filters[slug][$eq]": slug,
      "filters[learn_type][slug][$eq]": sectionSlug,
      "pagination[limit]": 1,
    },
    ...(learnTypeId
      ? [
          {
            ...populateParams,
            "filters[slug][$eq]": slug,
            "filters[learn_type][id][$eq]": learnTypeId,
            "pagination[limit]": 1,
          },
        ]
      : []),
  ];

  const locales = getStrapiLocaleCandidates(locale);

  for (const loc of locales) {
    for (const params of paramsList) {
      try {
        const res = await fetchStrapiCollection("blogs", {
          locale: loc,
          populate: null,
          sort: "createdAt:desc",
          params,
          cache,
        });
        const row = res?.data?.[0];
        if (row && getBlogLearnTypeSlug(row) === sectionSlug) return row;
      } catch (error) {
        console.error(
          "[strapiBlogs] fetch by learn_type+slug failed:",
          error?.message || error
        );
      }
    }
  }

  return null;
}

/** Card shape for knowledge hub article grids. */
export function mapBlogPostForKnowledgeArticleCard(post) {
  const attrs = post?.attributes ?? post ?? {};
  return {
    slug: attrs.slug || "",
    title: attrs.title || attrs.name || "",
  };
}

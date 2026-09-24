import { getBaseLanguage } from "@/i18n/regionalLocale";

const DEFAULT_STRAPI_API_BASE = "https://api.gtcfx.com/api";
const DEFAULT_MEDIA_BASE = "https://api.gtcfx.com";

export function getStrapiApiBase() {
  const raw =
    process.env.NEXT_PUBLIC_STRAPI_API_URL ||
    process.env.STRAPI_API_URL ||
    DEFAULT_STRAPI_API_BASE;
  return String(raw).replace(/\/$/, "");
}

export function getStrapiMediaBase() {
  const raw =
    process.env.NEXT_PUBLIC_STRAPI_MEDIA_URL || process.env.STRAPI_MEDIA_URL;
  if (raw) return String(raw).replace(/\/$/, "");
  const apiBase = getStrapiApiBase();
  return apiBase.endsWith("/api")
    ? apiBase.slice(0, -4) || DEFAULT_MEDIA_BASE
    : apiBase;
}

/**
 * Map site URL locales to Strapi i18n codes.
 * Regional URLs (en-intl, ar-ae, zh-in, …) → base language (en, ar, zh-Hans).
 */
export function mapStrapiLocale(locale) {
  if (!locale) return "en";
  const base = getBaseLanguage(locale);
  if (base === "zh") return "zh-Hans";
  return base;
}

/** Locales to try in order when loading localized Strapi content. */
export function getStrapiLocaleCandidates(locale) {
  const mapped = mapStrapiLocale(locale);
  if (mapped === "en") return ["en"];

  const candidates = [mapped];
  if (mapped === "zh-Hans") candidates.push("zh");
  if (mapped === "zh") candidates.push("zh-Hans");

  candidates.push("en");
  return [...new Set(candidates)];
}

export function getStrapiAuthHeaders() {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function buildStrapiCollectionUrl(collection, options = {}) {
  const {
    locale,
    populate = "*",
    sort = "createdAt:desc",
    params = {},
  } = options;

  const qs = new URLSearchParams();
  if (populate != null) qs.set("populate", String(populate));
  if (sort != null) qs.set("sort", String(sort));
  if (locale !== false && locale != null) qs.set("locale", String(locale));

  Object.entries(params).forEach(([key, value]) => {
    if (value == null) return;
    qs.set(key, String(value));
  });

  return `${getStrapiApiBase()}/${collection}?${qs.toString()}`;
}

export async function fetchStrapiCollection(collection, options = {}) {
  const { cache = "no-store", revalidate } = options;
  const url = buildStrapiCollectionUrl(collection, options);
  const res = await fetch(url, {
    headers: getStrapiAuthHeaders(),
    cache,
    ...(typeof revalidate === "number" ? { next: { revalidate } } : {}),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(
      `Strapi request failed (${res.status}) for ${collection}. ${body.slice(
        0,
        200
      )}`
    );
  }

  return res.json();
}

export function pickFirstMediaUrl(payload, fieldCandidates = []) {
  if (!payload || payload.error) return null;
  const rows = Array.isArray(payload.data)
    ? payload.data
    : payload.data
    ? [payload.data]
    : [];
  const first = rows[0];
  if (!first) return null;

  const attrs = first.attributes ?? first;
  const fields =
    fieldCandidates.length > 0
      ? fieldCandidates
      : ["file", "attachment", "document", "spreadsheet", "data"];

  const fromNode = (node) => {
    if (!node) return null;
    if (typeof node === "string") return node;
    if (node.url) return node.url;
    if (node.data?.url) return node.data.url;
    if (node.data?.attributes?.url) return node.data.attributes.url;
    if (Array.isArray(node) && node[0]) {
      if (node[0].url) return node[0].url;
      if (node[0].attributes?.url) return node[0].attributes.url;
    }
    return null;
  };

  for (const key of fields) {
    const media = first[key] ?? attrs[key];
    const url = fromNode(media);
    if (url) return url;
  }

  return null;
}

export function toAbsoluteStrapiMediaUrl(url) {
  if (!url) return null;
  if (String(url).startsWith("http")) return String(url);
  return `${getStrapiMediaBase()}${url}`;
}

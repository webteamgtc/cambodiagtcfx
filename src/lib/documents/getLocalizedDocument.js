import { defaultLocale, locales } from "@/i18n/config";
import { resolveContentLocale } from "@/i18n/regionalLocale";

const DEFAULT_DOCUMENTS_BASE =
  "https://gtcfx-bucket.s3.ap-southeast-1.amazonaws.com/documents";

/** Document JSON filenames that use the full URL locale (e.g. en-intl.json). */
const DOCUMENT_PASSTHROUGH_LOCALES = ["en-intl"];

function normalizeDocumentLocale(locale) {
  const raw = typeof locale === "string" ? locale.toLowerCase() : defaultLocale;

  if (DOCUMENT_PASSTHROUGH_LOCALES.includes(raw)) {
    return raw;
  }

  if (!locales.includes(raw)) return defaultLocale;

  return resolveContentLocale(raw);
}

function resolveDocumentBaseUrl(baseUrl) {
  if (!baseUrl || typeof baseUrl !== "string") return null;
  if (baseUrl.startsWith("undefined") || baseUrl.startsWith("null")) {
    return `${DEFAULT_DOCUMENTS_BASE}${baseUrl.replace(/^undefined|null/, "")}`;
  }
  return baseUrl.replace(/\/$/, "");
}

function isDocumentSectionsArray(value) {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every(
      (item) =>
        item &&
        typeof item === "object" &&
        typeof item.id === "string" &&
        Array.isArray(item.content)
    )
  );
}

function normalizeDocumentPayload(payload) {
  if (!payload) return null;

  if (isDocumentSectionsArray(payload)) {
    return { content: payload };
  }

  if (typeof payload === "object" && !Array.isArray(payload)) {
    return payload;
  }

  return null;
}

function mergeDocuments(english, localized) {
  const base = normalizeDocumentPayload(english) || {};
  if (!localized) return base;

  if (isDocumentSectionsArray(localized)) {
    return {
      ...base,
      content: localized,
    };
  }

  const localizedDoc = normalizeDocumentPayload(localized);
  if (!localizedDoc) return base;

  return {
    ...base,
    ...localizedDoc,
    topSection: localizedDoc.topSection ?? base.topSection,
    footer: localizedDoc.footer ?? base.footer,
    content: localizedDoc.content ?? base.content,
  };
}

async function fetchDocument(baseUrl, locale, revalidate) {
  const url = `${baseUrl}/${encodeURIComponent(locale)}.json`;

  try {
    const res = await fetch(url, { next: { revalidate } });
    if (!res.ok) return null;

    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("json")) return null;

    const data = await res.json();
    return normalizeDocumentPayload(data);
  } catch {
    return null;
  }
}

/**
 * Server-side document fetcher:
 * builds `${baseUrl}/${locale}.json` with fallback to English shell + locale content.
 */
export async function getLocalizedDocument(baseUrl, locale, revalidate = 3600) {
  const resolvedBase = resolveDocumentBaseUrl(baseUrl);
  if (!resolvedBase) return null;

  const normalizedLocale = normalizeDocumentLocale(locale);
  const english = await fetchDocument(resolvedBase, "en", revalidate);

  if (normalizedLocale === "en") {
    return english;
  }

  const localized = await fetchDocument(resolvedBase, normalizedLocale, revalidate);
  return mergeDocuments(english, localized);
}

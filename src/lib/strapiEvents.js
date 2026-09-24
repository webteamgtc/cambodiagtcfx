import {
  fetchStrapiCollection,
  mapStrapiLocale,
  toAbsoluteStrapiMediaUrl,
} from "@/lib/strapi";

const DEFAULT_EVENT_IMAGE = "/new-design/company/events/event-one-big.webp";
const EVENTS_COLLECTION =
  process.env.STRAPI_EVENTS_COLLECTION ||
  process.env.NEXT_PUBLIC_STRAPI_EVENTS_COLLECTION ||
  "comments";
const FUTURE_EVENTS_COLLECTION =
  process.env.STRAPI_FUTURE_EVENTS_COLLECTION ||
  process.env.NEXT_PUBLIC_STRAPI_FUTURE_EVENTS_COLLECTION ||
  "future-events";

export function getYearFromDate(value) {
  if (!value) return "";
  const str = typeof value === "string" ? value : String(value);
  const leading = str.match(/^(\d{4})/);
  if (leading) return leading[1];
  const trailing = str.match(/(\d{4})\s*$/);
  return trailing ? trailing[1] : "";
}

/** Sortable YYYY-MM-DD for ordering within a year. */
export function getDateSortKey(value) {
  if (!value) return "";
  const str = typeof value === "string" ? value.trim() : String(value).trim();

  const iso = str.match(/^(\d{4})-(\d{2})(?:-(\d{2}))?/);
  if (iso) return iso[3] ? `${iso[1]}-${iso[2]}-${iso[3]}` : `${iso[1]}-${iso[2]}-01`;

  const months = {
    january: "01",
    february: "02",
    march: "03",
    april: "04",
    may: "05",
    june: "06",
    july: "07",
    august: "08",
    september: "09",
    october: "10",
    november: "11",
    december: "12",
    jan: "01",
    feb: "02",
    mar: "03",
    apr: "04",
    jun: "06",
    jul: "07",
    aug: "08",
    sep: "09",
    oct: "10",
    nov: "11",
    dec: "12",
  };

  const monthNameToNumber = (name) => months[String(name || "").toLowerCase()] || "";

  // "11 - 13 February, 2026" or "11 - 13 February 2026"
  const rangeMatch = str.match(/(\d{1,2})\s*-\s*\d{1,2}\s+([A-Za-z]+),?\s+(\d{4})/);
  if (rangeMatch) {
    const month = monthNameToNumber(rangeMatch[2]);
    if (month) {
      return `${rangeMatch[3]}-${month}-${rangeMatch[1].padStart(2, "0")}`;
    }
  }

  // "5 November 2025" or "5 November, 2025"
  const dayMonthYear = str.match(/(\d{1,2})\s+([A-Za-z]+),?\s+(\d{4})/);
  if (dayMonthYear) {
    const month = monthNameToNumber(dayMonthYear[2]);
    if (month) {
      return `${dayMonthYear[3]}-${month}-${dayMonthYear[1].padStart(2, "0")}`;
    }
  }

  // "October 2024" or "March 2023"
  const monthYear = str.match(/^([A-Za-z]+),?\s+(\d{4})$/);
  if (monthYear) {
    const month = monthNameToNumber(monthYear[1]);
    if (month) {
      return `${monthYear[2]}-${month}-01`;
    }
  }

  const yearOnly = str.match(/^(\d{4})$/);
  if (yearOnly) return `${yearOnly[1]}-01-01`;

  const parsed = new Date(str);
  if (!Number.isNaN(parsed.getTime())) {
    const y = parsed.getFullYear();
    const m = String(parsed.getMonth() + 1).padStart(2, "0");
    const day = String(parsed.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }

  return "";
}

function resolveEventDateSortKey(event) {
  if (event?.dateSort) return event.dateSort;
  return getDateSortKey(event?.date) || getDateSortKey(event?.year) || "9999-12-31";
}

export function sortArchiveEventsByDate(events = []) {
  return [...events].sort((a, b) => {
    const keyA = resolveEventDateSortKey(a);
    const keyB = resolveEventDateSortKey(b);
    const byDate = keyB.localeCompare(keyA);
    if (byDate !== 0) return byDate;

    return String(b.createdAt || "").localeCompare(String(a.createdAt || ""));
  });
}

function resolveStrapiMediaUrl(mediaField) {
  if (!mediaField) return null;

  let node = mediaField?.data ?? mediaField;
  if (Array.isArray(node)) {
    node = node.find(Boolean) ?? null;
  }
  if (!node) return null;

  const url = node?.attributes?.url ?? node?.url;
  return url ? toAbsoluteStrapiMediaUrl(url) : null;
}

function getFeatureImageUrl(attrs) {
  return resolveStrapiMediaUrl(attrs?.featureImage);
}

function getSingleImageUrl(attrs) {
  return resolveStrapiMediaUrl(attrs?.image);
}

function plainText(value) {
  if (!value) return "";
  if (typeof value === "string") return value.trim();
  if (Array.isArray(value)) {
    return value
      .map((block) =>
        Array.isArray(block?.children)
          ? block.children.map((child) => child?.text || "").join("")
          : ""
      )
      .join("\n")
      .trim();
  }
  return String(value).trim();
}

function slugifyEventId(value, fallbackId) {
  const slug = String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || `event-${fallbackId}`;
}

function buildFutureEventLocation(city, country) {
  const parts = [city, country].map((part) => String(part || "").trim()).filter(Boolean);
  return parts.join(", ");
}

function buildFutureEventCardMeta(date, city) {
  const dateLabel = String(date || "").trim();
  const cityLabel = String(city || "").trim();
  if (dateLabel && cityLabel) return `${dateLabel} · ${cityLabel}`;
  return dateLabel || cityLabel || "";
}

function getGalleryImageUrls(attrs) {
  const imagesData = attrs?.images?.data ?? attrs?.images ?? [];
  const rows = Array.isArray(imagesData) ? imagesData : [];

  return rows
    .map((img) => {
      const url = img?.attributes?.url ?? img?.url;
      return url ? toAbsoluteStrapiMediaUrl(url) : null;
    })
    .filter(Boolean);
}

function formatBoothLabel(booth) {
  if (!booth) return "";
  const value = String(booth).trim();
  if (!value) return "";
  if (/^booth\s*#/i.test(value)) return value;
  if (value.startsWith("#")) return `Booth ${value}`;
  return `Booth #${value}`;
}

function normalizeDescription(longDescription) {
  if (!longDescription) return [];
  if (Array.isArray(longDescription)) {
    return longDescription.map((item) => String(item).trim()).filter(Boolean);
  }

  return String(longDescription)
    .split(/\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export function mapStrapiEventToArchiveEvent(event) {
  const attrs = event?.attributes || event;
  const featureImageUrl = getFeatureImageUrl(attrs);
  const galleryUrls = getGalleryImageUrls(attrs);
  const thumb =
    featureImageUrl || galleryUrls[0] || DEFAULT_EVENT_IMAGE;
  const thumbnails = galleryUrls.length ? galleryUrls : [thumb];
  const mainImage = featureImageUrl || thumbnails[0] || DEFAULT_EVENT_IMAGE;

  const yearValue = attrs?.year ?? attrs?.date ?? "";
  const year = getYearFromDate(String(yearValue).trim()) || getYearFromDate(attrs?.date || "");
  const dateSort =
    getDateSortKey(attrs?.date || "") || getDateSortKey(String(yearValue).trim());
  const boothRaw = attrs?.booth ?? "";
  const title = attrs?.title || "";
  const id = String(
    event?.id ?? attrs?.id ?? `event-${title.replace(/\s+/g, "-").toLowerCase() || "item"}`
  );

  return {
    id,
    key: id,
    year,
    dateSort,
    createdAt: attrs?.createdAt || event?.createdAt || "",
    thumb,
    mainImage,
    thumbnails,
    title,
    summary:
      attrs?.shortDescreption ??
      attrs?.shortDescription ??
      attrs?.desc ??
      "",
    booth: formatBoothLabel(boothRaw),
    date: attrs?.date || "",
    location: attrs?.location || "",
    description: normalizeDescription(attrs?.longDescription),
    thumbAlt: title ? `${title} thumbnail` : "Event thumbnail",
    mainAlt: title ? `${title} gallery image` : "Event gallery image",
  };
}

export function mapStrapiEventsToArchive(events = []) {
  if (!Array.isArray(events)) return [];
  return events.map(mapStrapiEventToArchiveEvent).filter((event) => event.title);
}

export function getArchiveYearsFromEvents(events = []) {
  const years = [...new Set(events.map((event) => event.year).filter(Boolean))];
  years.sort((a, b) => Number(b) - Number(a));
  return years;
}

export function filterArchiveEventsByYear(events = [], year) {
  return sortArchiveEventsByDate(events.filter((event) => event.year === year));
}

/**
 * Fetch exhibition archive events from Strapi.
 * Collection defaults to `comments` (legacy CMS slug); override via STRAPI_EVENTS_COLLECTION.
 */
export async function fetchEventsArchive(locale, options = {}) {
  const { cache = "no-store", revalidate } = options;

  try {
    const response = await fetchStrapiCollection(EVENTS_COLLECTION, {
      locale: mapStrapiLocale(locale),
      populate: "*",
      sort: "createdAt:desc",
      params: {
        "pagination[start]": 0,
        "pagination[limit]": 500,
      },
      cache,
      revalidate,
    });

    return Array.isArray(response?.data) ? response.data : [];
  } catch (error) {
    console.error(
      `[visual-archive] Strapi /${EVENTS_COLLECTION} fetch failed:`,
      error?.message
    );
    return [];
  }
}

export async function fetchMappedEventsArchive(locale, options = {}) {
  const rows = await fetchEventsArchive(locale, options);
  return mapStrapiEventsToArchive(rows);
}

export function mapStrapiFutureEventToHeroEvent(event) {
  const attrs = event?.attributes || event;
  const strapiId = event?.id ?? attrs?.id ?? "item";
  const title = attrs?.title || "";
  const date = attrs?.date || "";
  const city = attrs?.city || "";
  const country = attrs?.country || "";
  const location = buildFutureEventLocation(city, country);
  const imageUrl = getSingleImageUrl(attrs) || DEFAULT_EVENT_IMAGE;
  const description = plainText(
    attrs?.descreption ?? attrs?.description ?? attrs?.desc ?? ""
  );

  return {
    id: slugifyEventId(title, strapiId),
    title,
    date,
    location,
    city,
    country,
    cardMeta: buildFutureEventCardMeta(date, city),
    thumb: imageUrl,
    mainImage: imageUrl,
    description,
    dateSort: getDateSortKey(date) || "9999-12-31",
  };
}

export function mapStrapiFutureEventsToHero(events = []) {
  if (!Array.isArray(events)) return [];
  return events
    .map(mapStrapiFutureEventToHeroEvent)
    .filter((event) => event.title)
    .sort((a, b) => a.dateSort.localeCompare(b.dateSort));
}

async function fetchFutureEventsForLocale(locale, options = {}) {
  const { cache = "no-store", revalidate } = options;

  const response = await fetchStrapiCollection(FUTURE_EVENTS_COLLECTION, {
    locale: mapStrapiLocale(locale),
    populate: "*",
    sort: "createdAt:asc",
    params: {
      "pagination[start]": 0,
      "pagination[limit]": 50,
    },
    cache,
    revalidate,
  });

  return Array.isArray(response?.data) ? response.data : [];
}

/**
 * Upcoming hero events from Strapi `future-events` collection.
 */
export async function fetchMappedFutureEvents(locale, options = {}) {
  const mappedLocale = mapStrapiLocale(locale);
  const locales = mappedLocale === "en" ? ["en"] : [mappedLocale, "en"];

  for (const loc of locales) {
    try {
      const rows = await fetchFutureEventsForLocale(loc, options);
      const mapped = mapStrapiFutureEventsToHero(rows);
      if (mapped.length) return mapped;
    } catch (error) {
      console.error(
        `[future-events] Strapi /${FUTURE_EVENTS_COLLECTION} fetch failed (${loc}):`,
        error?.message || error
      );
    }
  }

  return [];
}

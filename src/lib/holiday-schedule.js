import * as XLSX from "xlsx";
import { mapStrapiLocale } from "@/lib/strapi";

const DEFAULT_STRAPI_API_BASE = "https://api.gtcfx.com/api";
const DEFAULT_MEDIA_BASE = "https://api.gtcfx.com";

function strapiBase() {
  const raw =
    process.env.NEXT_PUBLIC_STRAPI_API_URL ||
    process.env.STRAPI_API_URL ||
    DEFAULT_STRAPI_API_BASE;
  return raw.replace(/\/$/, "");
}

function mediaBase() {
  const raw =
    process.env.NEXT_PUBLIC_STRAPI_MEDIA_URL || process.env.STRAPI_MEDIA_URL;
  if (raw) return raw.replace(/\/$/, "");
  const api = strapiBase();
  return api.endsWith("/api") ? api.slice(0, -4) || DEFAULT_MEDIA_BASE : api;
}

/** Strapi v4 (attributes + media) or v5 (flattened) + common media field names */
function pickFileUrl(payload) {
  if (payload == null || payload.error) return null;

  const raw = payload.data;
  const entries = Array.isArray(raw) ? raw : raw != null ? [raw] : [];
  const entry = entries[0];
  if (!entry) return null;

  const attrs = entry.attributes ?? entry;

  const pickFromMedia = (media) => {
    if (media == null) return null;
    if (typeof media === "string" && media.startsWith("/")) return media;
    if (media?.url) return media.url;
    if (media?.data?.attributes?.url) return media.data.attributes.url;
    if (media?.data?.url) return media.data.url;
    if (Array.isArray(media)) {
      const m0 = media[0];
      if (m0?.url) return m0.url;
      if (m0?.attributes?.url) return m0.attributes.url;
    }
    return null;
  };

  for (const key of ["file", "attachment", "document", "spreadsheet"]) {
    const u = pickFromMedia(entry[key] ?? attrs[key]);
    if (u) return u;
  }

  return null;
}

async function fetchStrapiJson(url) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const headers = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const res = await fetch(url, {
    headers,
    cache: "no-store",
  });

  if (!res.ok) {
    const snippet = await res.text().then((t) => t.slice(0, 240)).catch(() => "");
    console.error(
      `[holiday-schedule] Strapi ${res.status} ${url.slice(0, 120)}… ${snippet}`
    );
    return null;
  }

  return res.json();
}

function buildHolidaySchedulesUrl({ locale, populate, params }) {
  const base = strapiBase();
  const qs = new URLSearchParams();
  qs.set("populate", populate);
  qs.set("sort", "createdAt:desc");
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      qs.set(key, String(value));
    });
  }
  if (locale !== false && locale != null) qs.set("locale", String(locale));
  return `${base}/holiday-schedules?${qs.toString()}`;
}

async function fetchHolidayEntryFromStrapi(locale) {
  // 1) One request that returns entries in every locale Strapi knows about.
  //    This generalises to ANY locale instead of guessing locale strings.
  const allUrl = buildHolidaySchedulesUrl({ locale: "all", populate: "*",params: {page: 1, pageSize: 100} });
  const allJson = await fetchStrapiJson(allUrl);
  const rows = Array.isArray(allJson?.data) ? allJson.data : [];

  if (rows.length) {
    const wanted = String(locale || "").toLowerCase();
    const wantedBase = wanted.split("-")[0];

    const localeOf = (row) =>
      String(row?.attributes?.locale ?? row?.locale ?? "").toLowerCase();

    const pickRow = (predicate) => rows.find((row) => predicate(localeOf(row)));

    const match =
      pickRow((rowLocale) => rowLocale === wanted) ||
      pickRow((rowLocale) => rowLocale.split("-")[0] === wantedBase) ||
      pickRow((rowLocale) => rowLocale === "en") ||
      pickRow((rowLocale) => rowLocale.split("-")[0] === "en") ||
      rows[0];

    if (match) {
      const fileUrl = pickFileUrl({ data: [match] });
      if (fileUrl) return { fileUrl, json: allJson };
    }
  }

  // 2) Fallback for Strapi versions/configs that don't support `locale=all`.
  const attempts = [
    { locale, populate: "*" },
    { locale, populate: "file" },
    { locale: "en", populate: "*" },
    { locale: "en", populate: "file" },
    { locale: false, populate: "*" },
    { locale: false, populate: "file" },
  ];

  const seen = new Set([allUrl]);
  for (const opts of attempts) {
    const url = buildHolidaySchedulesUrl(opts);
    if (seen.has(url)) continue;
    seen.add(url);

    const json = await fetchStrapiJson(url);
    const fileUrl = pickFileUrl(json);
    if (fileUrl) return { fileUrl, json };

    const hasRows = Array.isArray(json?.data)
      ? json.data.length > 0
      : json?.data != null;
    if (hasRows && json?.data?.[0] && !fileUrl) {
      console.warn(
        "[holiday-schedule] Strapi returned rows but no file URL — check populate / field name (file)."
      );
    }
  }

  return { fileUrl: null, json: null };
}

async function fetchExcelMatrixFromUrl(fullUrl) {
  const res = await fetch(fullUrl, { cache: "no-store" });
  if (!res.ok) {
    console.error(
      `[holiday-schedule] Excel fetch ${res.status} ${fullUrl.slice(0, 160)}…`
    );
    return null;
  }
  const arrayBuffer = await res.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: "buffer" });
  const firstName = workbook.SheetNames[0];
  if (!firstName) return null;
  const data = XLSX.utils.sheet_to_json(workbook.Sheets[firstName], {
    header: 1,
  });
  return Array.isArray(data) ? data : null;
}

const DIGIT_RANGES = [
  [0x0660, 0x0669], // Arabic-Indic
  [0x06f0, 0x06f9], // Extended Arabic-Indic
  [0xff10, 0xff19], // Full-width
];

/** Localised sheets often use non-ASCII digits, which Date/regex parsing rejects. */
function normalizeDigits(input) {
  return String(input).replace(
    /[\u0660-\u0669\u06F0-\u06F9\uFF10-\uFF19]/g,
    (char) => {
      const code = char.codePointAt(0);
      const range = DIGIT_RANGES.find(([start, end]) => code >= start && code <= end);
      return range ? String(code - range[0]) : char;
    }
  );
}

function parseHeaderDate(value, yearHint = new Date().getFullYear()) {
  if (value == null || value === "") return null;

  if (typeof value === "number" && XLSX.SSF?.parse_date_code) {
    const parsed = XLSX.SSF.parse_date_code(value);
    if (parsed?.y) {
      return `${parsed.y}-${String(parsed.m).padStart(2, "0")}-${String(parsed.d).padStart(2, "0")}`;
    }
  }

  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, "0")}-${String(value.getDate()).padStart(2, "0")}`;
  }

  const str = normalizeDigits(value).trim();
  if (!str) return null;

  if (/^\d{4}-\d{2}-\d{2}/.test(str)) return str.slice(0, 10);

  // e.g. "03 Jul 2026, Friday" or "01 Jul 2026, Wednesday"
  const dmyMatch = str.match(/^(\d{1,2})\s+([A-Za-z]{3,9})\s+(\d{4})/);
  if (dmyMatch) {
    const [, day, monthName, year] = dmyMatch;
    const parsed = new Date(`${day} ${monthName} ${year}`);
    if (!Number.isNaN(parsed.getTime())) {
      return `${parsed.getFullYear()}-${String(parsed.getMonth() + 1).padStart(2, "0")}-${String(parsed.getDate()).padStart(2, "0")}`;
    }
  }

  // e.g. "2026年7月3日" or "7月3日（星期五）" — Date() cannot parse these
  const cjkMatch = str.match(/(?:(\d{4})\s*年)?\s*(\d{1,2})\s*月\s*(\d{1,2})\s*日?/);
  if (cjkMatch) {
    const [, year, month, day] = cjkMatch;
    return `${year || yearHint}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  }

  const isoMatch = str.match(/(\d{4})[./-](\d{1,2})[./-](\d{1,2})/);
  if (isoMatch) {
    const [, y, m, d] = isoMatch;
    return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  }

  const parsed = new Date(str);
  if (!Number.isNaN(parsed.getTime())) {
    return `${parsed.getFullYear()}-${String(parsed.getMonth() + 1).padStart(2, "0")}-${String(parsed.getDate()).padStart(2, "0")}`;
  }

  const withoutYear = new Date(`${str} ${yearHint}`);
  if (!Number.isNaN(withoutYear.getTime())) {
    return `${withoutYear.getFullYear()}-${String(withoutYear.getMonth() + 1).padStart(2, "0")}-${String(withoutYear.getDate()).padStart(2, "0")}`;
  }

  return null;
}

/** Localised sheets state the same status in the sheet's own language. */
const EARLY_CLOSE_PATTERNS = [
  /early\s*clos/i,
  /(?:提前|提早|提早於|早)\s*(?:收市|休市|收盤|收盘|閉市|闭市)/,
  /إغلاق\s*مبكر/,
  /مبكر/,
  /đóng\s*cửa\s*sớm/i,          // Vietnamese: early close
  /fermeture\s*anticip/i,       // French: early closing
  /cierre\s*anticipad/i,        // Spanish: early close
];

const CLOSED_PATTERNS = [
  /\bclosed\b/i,
  /休市/,
  /停市/,
  /閉市|闭市/,
  /休假/,
  /مغلق|مغلقة/,
  /إغلاق/,
  /đóng\s*cửa/i,                // Vietnamese: closed
  /nghỉ\s*lễ/i,                 // Vietnamese: holiday
  /fermé/i,                     // French: closed
  /cerrado/i,                   // Spanish: closed
];

/** Cells that explicitly mean "nothing to report" — never treat as an event. */
const OPEN_OR_EMPTY_PATTERNS = [
  /^-+$/,
  /^n\/?a$/i,
  /^normal$/i,
  /^open$/i,
  /^mở\s*cửa$/i,   // Vietnamese: open
  /^ouvert$/i,     // French: open
  /^abierto$/i,    // Spanish: open
];

function matchesAny(patterns, text) {
  return patterns.some((pattern) => pattern.test(text));
}

function parseHolidayCell(cell) {
  if (cell == null || cell === "") return null;

  const lines = String(cell)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  if (!lines.length) return null;

  const statusText = lines.join(" ");

  // Explicit "open"/placeholder cells are never events, regardless of locale.
  if (matchesAny(OPEN_OR_EMPTY_PATTERNS, statusText)) return null;

  // We can't maintain a keyword list for every language the CMS might
  // publish in, so ANY other non-empty cell in a date column is treated as
  // an event. The keyword lists above only refine the badge color when we
  // recognize the language; otherwise we default to "closed" (red) rather
  // than silently dropping the holiday.
  const isEarlyClose = matchesAny(EARLY_CLOSE_PATTERNS, statusText);
  const badge = lines[0];
  const badgeColor = isEarlyClose ? "orange" : "red";
  const name = lines.length > 1 ? lines.slice(1).join(" ") : null;

  return { badge, badgeColor, name };
}

/**
 * @param {string[][] | null} matrix
 * @returns {{ name: string, date: string, market: string, badge: string, badgeColor: string }[]}
 */
export function parseHolidayEventsFromMatrix(matrix) {
  if (!Array.isArray(matrix) || matrix.length < 2) return [];

  const header = matrix[0] || [];
  const yearHint = new Date().getFullYear();
  const dateByColumn = new Map();

  for (let col = 1; col < header.length; col += 1) {
    const dateStr = parseHeaderDate(header[col], yearHint);
    if (dateStr) dateByColumn.set(col, dateStr);
  }

  const events = [];

  for (let rowIndex = 1; rowIndex < matrix.length; rowIndex += 1) {
    const row = matrix[rowIndex];
    if (!Array.isArray(row) || !row.length) continue;

    const market = String(row[0] ?? "").trim();
    if (!market) continue;

    for (const [col, dateStr] of dateByColumn.entries()) {
      const parsed = parseHolidayCell(row[col]);
      if (!parsed) continue;

      events.push({
        name: parsed.name || market,
        date: dateStr,
        market,
        badge: parsed.badge,
        badgeColor: parsed.badgeColor,
        status: parsed.badge,
      });
    }
  }

  return events.sort((a, b) => a.date.localeCompare(b.date));
}

/**
 * @param {string} locale – route locale (e.g. en, ar, zh)
 * @returns {Promise<string[][] | null>} First sheet as AoA (row 0 = header), or null
 */
export async function fetchHolidayScheduleMatrix(locale) {
  let currentLocale;
  try {
    currentLocale = mapStrapiLocale(locale) || locale;
  } catch (e) {
    // A locale mapStrapiLocale doesn't recognize must never kill the whole
    // fetch — fall back to the raw locale string and let the multi-locale
    // lookup above handle matching/fallback.
    console.warn(
      `[holiday-schedule] mapStrapiLocale threw for "${locale}", using raw locale:`,
      e
    );
    currentLocale = locale;
  }

  try {
    const { fileUrl } = await fetchHolidayEntryFromStrapi(currentLocale);
    if (!fileUrl) {
      console.warn(
        "[holiday-schedule] No file URL — set NEXT_PUBLIC_STRAPI_API_TOKEN if the API requires auth."
      );
      return null;
    }

    const base = mediaBase();
    const fullURL = fileUrl.startsWith("http")
      ? fileUrl
      : `${base}${fileUrl}`;

    return await fetchExcelMatrixFromUrl(fullURL);
  } catch (e) {
    console.error("Holiday schedule fetch failed:", e);
    return null;
  }
}

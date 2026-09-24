/** Cambodia site: Khmer (`km-intl`) default + English (`en-intl`) only. */

/** Base language code used for translations / content bundles. */
export const KHMER_LOCALE = "km";
/** URL locale segment for Khmer pages. */
export const KHMER_REGIONAL_LOCALE = "km-intl";

export const SITE_ALLOWED_BASE_LANGUAGES = ["km", "en"];
export const DEFAULT_SITE_LOCALE = KHMER_REGIONAL_LOCALE;
export const ENGLISH_REGIONAL_LOCALE = "en-intl";

export const REGION_CODES = ["intl"];
export const DEFAULT_REGION_CODE = "intl";
export const REGIONALIZED_BASE_LANGUAGES = ["en", "km"];
export const NON_REGIONAL_LANGUAGES = [];
export const REGIONAL_LOCALES = [KHMER_REGIONAL_LOCALE, ENGLISH_REGIONAL_LOCALE];

/** @deprecated Cambodia site does not use UAE language rules. */
export const UAE_ALLOWED_BASE_LANGUAGES = SITE_ALLOWED_BASE_LANGUAGES;

export function isUaeCountryCode() {
  return false;
}

export function clampBaseLanguageForCountry(baseLanguage) {
  const base = getBaseLanguage(baseLanguage);
  return SITE_ALLOWED_BASE_LANGUAGES.includes(base) ? base : KHMER_LOCALE;
}

export function resolveRegionCode() {
  return DEFAULT_REGION_CODE;
}

export function resolveGeoLocaleFromIntl() {
  return null;
}

export function isZaCountryCode() {
  return false;
}

/** @deprecated */
export function resolveZaLocaleFromIntl() {
  return null;
}

export function buildRegionalLocale(baseLanguage) {
  const base = String(baseLanguage || KHMER_LOCALE).toLowerCase();
  if (base === "en") return ENGLISH_REGIONAL_LOCALE;
  if (base === "km") return KHMER_REGIONAL_LOCALE;
  return KHMER_REGIONAL_LOCALE;
}

export function isRegionalLocale(locale) {
  const normalized = String(locale || "").toLowerCase();
  return (
    normalized === ENGLISH_REGIONAL_LOCALE ||
    normalized === KHMER_REGIONAL_LOCALE
  );
}

/** @deprecated Prefer isRegionalLocale — kept for English-only call sites. */
export function isRegionalEnglishLocale(locale) {
  return String(locale || "").toLowerCase() === ENGLISH_REGIONAL_LOCALE;
}

export function getBaseLanguage(locale) {
  const normalized = String(locale || KHMER_REGIONAL_LOCALE).toLowerCase();
  if (normalized === "km" || normalized.startsWith("km-")) return KHMER_LOCALE;
  if (normalized === "en" || normalized.startsWith("en-")) return "en";
  return SITE_ALLOWED_BASE_LANGUAGES.includes(normalized) ? normalized : KHMER_LOCALE;
}

export function getRegionFromLocale(locale) {
  const normalized = String(locale || "").toLowerCase();
  if (normalized === ENGLISH_REGIONAL_LOCALE || normalized === KHMER_REGIONAL_LOCALE) {
    return "intl";
  }
  if (normalized.startsWith("en-")) return normalized.slice(3);
  if (normalized.startsWith("km-")) return normalized.slice(3);
  return null;
}

export function resolveRegionalLocale(baseLanguage) {
  return buildRegionalLocale(baseLanguage);
}

/** @deprecated Prefer resolveRegionalLocale("en"). */
export function resolveRegionalEnglishLocale() {
  return ENGLISH_REGIONAL_LOCALE;
}

export const DEFAULT_REGIONAL_ENGLISH_LOCALE = ENGLISH_REGIONAL_LOCALE;
export const REGIONAL_ENGLISH_LOCALES = [ENGLISH_REGIONAL_LOCALE];

export function resolveContentLocale(locale) {
  return getBaseLanguage(locale);
}

export function localeUsesUrlPrefix(locale) {
  return isRegionalLocale(locale);
}

export function sortLocalesLongestFirst(localeList) {
  return [...localeList].sort((a, b) => b.length - a.length);
}

export function isAllowedSiteLocale(locale) {
  const normalized = String(locale || "").toLowerCase();
  return (
    normalized === ENGLISH_REGIONAL_LOCALE ||
    normalized === KHMER_REGIONAL_LOCALE
  );
}

/** Map legacy locale segments to the active regional site locale. */
export function normalizeSiteLocale(pathLocale) {
  const normalized = String(pathLocale || "").toLowerCase();
  if (normalized === "km" || normalized.startsWith("km-")) {
    return KHMER_REGIONAL_LOCALE;
  }
  if (normalized === "en" || normalized.startsWith("en-")) {
    return ENGLISH_REGIONAL_LOCALE;
  }
  return DEFAULT_SITE_LOCALE;
}

const LOCALE_SEGMENT = /^[a-z]{2}(?:-[a-z0-9]{2,5})?$/i;

/**
 * Parse the first URL segment as a locale when present.
 * Legacy global locales are recognized so they can redirect cleanly.
 */
export function parsePathLocale(pathname) {
  const segments = String(pathname || "")
    .split("/")
    .filter(Boolean);

  if (!segments.length) {
    return { locale: null, restPath: "", hadLocalePrefix: false, isLegacy: false };
  }

  const first = segments[0].toLowerCase();
  const rest = segments.slice(1);
  const restPath = rest.length ? `/${rest.join("/")}` : "";

  if (isAllowedSiteLocale(first)) {
    return {
      locale: first,
      restPath,
      hadLocalePrefix: true,
      isLegacy: false,
    };
  }

  if (first === "en" || first.startsWith("en-")) {
    return {
      locale: ENGLISH_REGIONAL_LOCALE,
      restPath,
      hadLocalePrefix: true,
      isLegacy: true,
    };
  }

  if (first === "km" || first.startsWith("km-")) {
    return {
      locale: KHMER_REGIONAL_LOCALE,
      restPath,
      hadLocalePrefix: true,
      isLegacy: first !== KHMER_REGIONAL_LOCALE,
    };
  }

  if (LOCALE_SEGMENT.test(first)) {
    return {
      locale: DEFAULT_SITE_LOCALE,
      restPath,
      hadLocalePrefix: true,
      isLegacy: true,
    };
  }

  return { locale: null, restPath: pathname, hadLocalePrefix: false, isLegacy: false };
}

import {
  DEFAULT_SITE_LOCALE,
  ENGLISH_REGIONAL_LOCALE,
  KHMER_LOCALE,
  KHMER_REGIONAL_LOCALE,
  SITE_ALLOWED_BASE_LANGUAGES,
  getBaseLanguage,
  isRegionalLocale,
} from "./regionalLocale";

/** Base language codes (content / language switcher). */
export const baseLanguages = [...SITE_ALLOWED_BASE_LANGUAGES];

/**
 * URL segment + routing locale codes.
 * Includes bare `en` / `km` so legacy paths redirect to `en-intl` / `km-intl`.
 */
export const locales = [
  KHMER_REGIONAL_LOCALE,
  ENGLISH_REGIONAL_LOCALE,
  KHMER_LOCALE,
  "en",
];

export const defaultLocale = DEFAULT_SITE_LOCALE;

/**
 * Cambodia site defaults to Khmer (`/km-intl/...`).
 * English is always served from `/en-intl/...`.
 */
export function resolveLocaleFromAcceptLanguage(acceptHeader) {
  void acceptHeader;
  return defaultLocale;
}

const BASE_HREFLANG = {
  en: "en",
  km: "km",
};

const BASE_OPEN_GRAPH = {
  en: "en_US",
  km: "km_KH",
};

const BASE_NAMES = {
  en: "English",
  km: "ភាសាខ្មែរ",
};

const BASE_DIR = {
  en: "ltr",
  km: "ltr",
};

const REGION_LABEL = {
  intl: "International",
};

function buildLocaleMaps() {
  const hreflang = {
    ...BASE_HREFLANG,
    [ENGLISH_REGIONAL_LOCALE]: "en",
    [KHMER_REGIONAL_LOCALE]: "km",
  };
  const openGraph = {
    ...BASE_OPEN_GRAPH,
    [ENGLISH_REGIONAL_LOCALE]: "en_US",
    [KHMER_REGIONAL_LOCALE]: "km_KH",
  };
  const names = {
    ...BASE_NAMES,
    [ENGLISH_REGIONAL_LOCALE]: `English (${REGION_LABEL.intl})`,
    [KHMER_REGIONAL_LOCALE]: `ភាសាខ្មែរ (${REGION_LABEL.intl})`,
  };
  const dir = {
    ...BASE_DIR,
    [ENGLISH_REGIONAL_LOCALE]: "ltr",
    [KHMER_REGIONAL_LOCALE]: "ltr",
  };

  return { hreflang, openGraph, names, dir };
}

const maps = buildLocaleMaps();

/** BCP 47 values for <html lang> / alternates. */
export const localeHreflang = maps.hreflang;

/** Open Graph locale strings (underscore form) */
export const localeOpenGraph = maps.openGraph;

export const localeNames = maps.names;

export const localeDir = maps.dir;

export { isRegionalLocale, getBaseLanguage };

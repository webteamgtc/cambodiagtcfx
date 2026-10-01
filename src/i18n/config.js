import {
  DEFAULT_SITE_LOCALE,
  KHMER_LOCALE,
  KHMER_REGIONAL_LOCALE,
  SITE_ALLOWED_BASE_LANGUAGES,
  getBaseLanguage,
  isRegionalLocale,
} from "./regionalLocale";

/** Base language codes (content). */
export const baseLanguages = [...SITE_ALLOWED_BASE_LANGUAGES];

/** Internal routing locale for `[locale]` segment (middleware rewrite). */
export const locales = [KHMER_REGIONAL_LOCALE];

export const defaultLocale = DEFAULT_SITE_LOCALE;

/** Cambodia site is Khmer-only; no Accept-Language switching. */
export function resolveLocaleFromAcceptLanguage(acceptHeader) {
  void acceptHeader;
  return defaultLocale;
}

const BASE_HREFLANG = {
  km: "km",
};

const BASE_OPEN_GRAPH = {
  km: "km_KH",
};

const BASE_NAMES = {
  km: "ភាសាខ្មែរ",
};

const BASE_DIR = {
  km: "ltr",
};

const REGION_LABEL = {
  intl: "International",
};

function buildLocaleMaps() {
  const hreflang = {
    ...BASE_HREFLANG,
    [KHMER_REGIONAL_LOCALE]: "km",
  };
  const openGraph = {
    ...BASE_OPEN_GRAPH,
    [KHMER_REGIONAL_LOCALE]: "km_KH",
  };
  const names = {
    ...BASE_NAMES,
    [KHMER_REGIONAL_LOCALE]: `ភាសាខ្មែរ (${REGION_LABEL.intl})`,
  };
  const dir = {
    ...BASE_DIR,
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

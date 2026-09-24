/** Supported platform-guide content locales for the Cambodia site. */
export const PLATFORM_GUIDE_LOCALES = [
  { code: "en", label: "English" },
  { code: "km", label: "ភាសាខ្មែរ" },
];

export const PLATFORM_GUIDE_LOCALE_CODES = PLATFORM_GUIDE_LOCALES.map(
  (item) => item.code
);

export const PLATFORM_GUIDE_LOCALE_FOLDERS = Object.fromEntries(
  PLATFORM_GUIDE_LOCALE_CODES.map((code) => [code, code])
);

/**
 * Maps a site or filter locale to a supported platform-guide folder code.
 * Unknown values fall back to English.
 */
export function normalizePlatformGuideLocale(locale) {
  const rawLocale = String(locale || "en").trim().toLowerCase();

  if (rawLocale === "km" || rawLocale.startsWith("km-")) return "km";
  if (rawLocale === "en" || rawLocale.startsWith("en")) return "en";

  return "en";
}

export function isPlatformGuideLocale(locale) {
  return PLATFORM_GUIDE_LOCALE_CODES.includes(
    normalizePlatformGuideLocale(locale)
  );
}

export function getPlatformGuideLocaleLabel(locale) {
  const code = normalizePlatformGuideLocale(locale);
  return (
    PLATFORM_GUIDE_LOCALES.find((item) => item.code === code)?.label || "English"
  );
}

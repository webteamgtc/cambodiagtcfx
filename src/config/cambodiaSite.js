/**
 * Cambodia site locale and routing configuration.
 *
 * Khmer default (`/km-intl/...`) + English (`/en-intl/...`).
 */
export const CAMBODIA_SITE = {
  allowedBaseLanguages: ["km", "en"],
  defaultLocale: "km-intl",
  khmerLocale: "km-intl",
  englishLocale: "en-intl",
  globalFallbackUrl: "https://www.gtcfx.com/en-intl/",
  /** Main nav mega-menu keys hidden when the site is shown in Khmer. */
  navHiddenForKhmer: ["learn"],
};

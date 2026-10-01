/**
 * Cambodia site locale and routing configuration.
 *
 * Khmer only — public URLs have no locale prefix (e.g. `/markets/forex`).
 * Next.js still serves pages under `[locale]` internally (`km-intl`).
 */
export const CAMBODIA_SITE = {
  allowedBaseLanguages: ["km"],
  defaultLocale: "km-intl",
  khmerLocale: "km-intl",
  /** @deprecated English removed from Cambodia site; kept for legacy URL redirects. */
  englishLocale: "en-intl",
  globalFallbackUrl: "https://www.gtcfx.com/en-intl/",
  /** When false, URLs are locale-less; middleware rewrites to `defaultLocale`. */
  useLocaleUrlPrefix: false,
  showLanguageSwitcher: false,
  /** Main nav mega-menu keys hidden when the site is shown in Khmer. */
  navHiddenForKhmer: ["learn"],
  /**
   * Cambodia regional site — no GA, GTM, Ads, pixels, or domain verification tags.
   * (Duplicate of main gtcfx.com; single-country use only.)
   */
  thirdPartyTrackingEnabled: false,
  /**
   * Duplicate of global gtcfx.com — do not list this host in search (noindex, follow).
   */
  searchIndexingEnabled: false,
};

export const THIRD_PARTY_TRACKING_ENABLED = CAMBODIA_SITE.thirdPartyTrackingEnabled;
export const SEARCH_INDEXING_ENABLED = CAMBODIA_SITE.searchIndexingEnabled;

/**
 * Helper function to generate consistent canonical URLs
 * Ensures all canonical URLs use www.gtcfx.com
 */
import {
  buildRegionalLocale,
  getBaseLanguage,
  isRegionalLocale,
  localeUsesUrlPrefix,
} from "@/i18n/regionalLocale";

export function getCanonicalUrl(locale, path = '') {
    const baseUrl = 'https://www.gtcfx.com';
    const cleanPath = path.replace(/^\/+|\/+$/g, '');
    const normalizedLocale = isRegionalLocale(locale)
      ? locale
      : buildRegionalLocale(getBaseLanguage(locale));

    if (!normalizedLocale || !localeUsesUrlPrefix(normalizedLocale)) {
      return cleanPath ? `${baseUrl}/${cleanPath}` : baseUrl;
    }

    return cleanPath ? `${baseUrl}/${normalizedLocale}/${cleanPath}` : `${baseUrl}/${normalizedLocale}`;
  }

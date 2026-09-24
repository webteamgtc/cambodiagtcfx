import { localeUsesUrlPrefix } from "@/i18n/regionalLocale";

function isProtocolHref(href) {
  return /^(https?:|mailto:|tel:)/i.test(href);
}

/**
 * Internal nav paths in mega menu are locale-less (e.g. `/about-us`).
 * Prefix with `/${locale}` when not default, matching middleware URL rules.
 */
export function localizedHref(locale, href) {
  if (href == null || typeof href !== 'string') return href;
  const trimmed = href.trim();
  if (!trimmed || isProtocolHref(trimmed) || trimmed.startsWith('//')) {
    return href;
  }

  const path = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  if (!localeUsesUrlPrefix(locale)) {
    return path;
  }
  if (path === '/') {
    return `/${locale}`;
  }
  return `/${locale}${path}`;
}

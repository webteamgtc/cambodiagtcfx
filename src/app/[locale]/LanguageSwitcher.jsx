'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { defaultLocale, localeNames } from '@/i18n/config';
import {
  ENGLISH_REGIONAL_LOCALE,
  KHMER_REGIONAL_LOCALE,
  KHMER_LOCALE,
  SITE_ALLOWED_BASE_LANGUAGES,
  getBaseLanguage,
  resolveRegionalLocale,
} from '@/i18n/regionalLocale';

const LOCALE_PATH_PREFIXES = new Set([
  ENGLISH_REGIONAL_LOCALE,
  KHMER_REGIONAL_LOCALE,
  KHMER_LOCALE,
  'en',
]);

export function LanguageSwitcher({ locale }) {
  const pathname = usePathname() || '/';

  const getLocalizedPath = (targetLocale) => {
    const segments = pathname.split('/').filter(Boolean);

    if (
      segments.length > 0 &&
      LOCALE_PATH_PREFIXES.has(segments[0].toLowerCase())
    ) {
      segments.shift();
    }

    const cleanPath = segments.length ? `/${segments.join('/')}` : '/';
    const effectiveLocale = resolveRegionalLocale(targetLocale);

    return cleanPath === '/'
      ? `/${effectiveLocale}`
      : `/${effectiveLocale}${cleanPath}`;
  };

  return (
    <div className="flex items-center gap-3">
      {SITE_ALLOWED_BASE_LANGUAGES.map((lang) => {
        const isActive = getBaseLanguage(locale) === lang;

        return (
          <Link
            key={lang}
            href={getLocalizedPath(lang)}
            className={`transition hover:underline ${
              isActive ? 'font-semibold text-black' : 'text-gray-700'
            }`}
          >
            {localeNames[lang] || lang}
          </Link>
        );
      })}
    </div>
  );
}

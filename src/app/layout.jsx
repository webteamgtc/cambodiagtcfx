import './globals.css';
import { headers } from 'next/headers';
import { poppins } from '@/app/fonts/poppins';
import PageJsonLd from '@/app/[locale]/components/common/PageJsonLd';
import {
  GoogleTagManagerPrimaryHead,
  GoogleTagManagerPrimaryNoscript,
} from '@/app/components/GoogleTagManagerPrimary';
import { localeHreflang } from '@/i18n/config';
import { resolveContentLocale } from '@/i18n/regionalLocale';
// Arabic (`ar`) uses Noto Kufi Arabic on the locale shell — see `src/app/fonts/notoKufiArabic.js` and `[locale]/layout.jsx`.

export const metadata = {
  title: 'GTCFX | Trade Global Markets',
  description:
    'Trade Forex, Indices, Commodities, and more with GTCFX. Fast execution, secure platform, and global access.',
};

export default async function RootLayout({ children }) {
  const headersList = await headers();
  const locale = headersList.get('x-locale') || 'en';
  const contentLocale = resolveContentLocale(locale);
  const lang = localeHreflang[locale] || localeHreflang[contentLocale] || 'en';

  return (
    <html lang={lang} className={poppins.variable} suppressHydrationWarning>
      <head>
        <GoogleTagManagerPrimaryHead />
        <PageJsonLd />
      </head>
      <body className="font-sans bg-white text-dark antialiased">
        <GoogleTagManagerPrimaryNoscript />
        {children}
      </body>
    </html>
  );
}

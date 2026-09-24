import localFont from 'next/font/local';

/** Paths relative to this file → project `public/fonts/Kufi`. */
export const notoKufiArabic = localFont({
  src: [
    {
      path: '../../../public/fonts/Kufi/NotoKufiArabic-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Kufi/NotoKufiArabic-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Kufi/NotoKufiArabic-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Kufi/NotoKufiArabic-Black.ttf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-arabic',
  display: 'swap',
});

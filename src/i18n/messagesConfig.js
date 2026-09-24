import { resolveContentLocale } from "./regionalLocale";

export const BUNDLED_LOCALES = ["en", "km"];

export const MESSAGES_S3_BASE =
  process.env.NEXT_PUBLIC_MESSAGES_S3_BASE ||
  process.env.MESSAGES_S3_BASE ||
  "https://gtcfx-bucket.s3.ap-southeast-1.amazonaws.com/translation";

export function isBundledLocale(locale) {
  const contentLocale = resolveContentLocale(locale);
  return BUNDLED_LOCALES.includes(contentLocale);
}

export function getMessagesUrl(locale) {
  const contentLocale = resolveContentLocale(locale);
  return `${MESSAGES_S3_BASE}/${encodeURIComponent(contentLocale)}.json`;
}

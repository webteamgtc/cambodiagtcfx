import { cache } from "react";
import {
  BUNDLED_LOCALES,
  getMessagesUrl,
  isBundledLocale,
} from "@/i18n/messagesConfig";
import { resolveContentLocale } from "@/i18n/regionalLocale";
import { deepMergeMessages } from "@/i18n/mergeMessages";

const BUNDLED_LOCALE_LOADERS = {
  en: () => import("@/translation/en.json").then((m) => m.default),
  km: () => import("@/translation/km.json").then((m) => m.default),
};

function isValidMessages(payload) {
  return (
    payload != null &&
    typeof payload === "object" &&
    !Array.isArray(payload) &&
    Object.keys(payload).length > 0
  );
}

async function fetchMessagesFromS3(locale) {
  const url = getMessagesUrl(locale);

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(url, {
        cache: "no-store",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        console.error(
          `[i18n] S3 messages fetch failed (${response.status}) for locale "${locale}"`
        );
        return null;
      }

      const data = await response.json();
      if (isValidMessages(data)) {
        return data;
      }

      console.error(
        `[i18n] S3 messages for locale "${locale}" are empty or invalid`
      );
      return null;
    } catch (error) {
      if (attempt === 3) {
        console.error(
          `[i18n] S3 messages fetch error for locale "${locale}":`,
          error
        );
        return null;
      }

      await new Promise((resolve) => {
        setTimeout(resolve, attempt * 300);
      });
    }
  }

  return null;
}

async function loadEnglishMessages() {
  return BUNDLED_LOCALE_LOADERS.en();
}

/**
 * Server-only: load messages for a locale (used by `[locale]/layout.jsx` and pages).
 */
export const getDictionary = cache(async function getDictionary(locale) {
  const normalizedLocale = String(locale || "km-intl").toLowerCase();
  const contentLocale = resolveContentLocale(normalizedLocale);
  const englishMessages = await loadEnglishMessages();

  if (contentLocale === "en") {
    return englishMessages;
  }

  const bundledLoader = BUNDLED_LOCALE_LOADERS[contentLocale];
  if (bundledLoader) {
    const localeMessages = await bundledLoader();
    return deepMergeMessages(englishMessages, localeMessages);
  }

  const s3Messages = await fetchMessagesFromS3(contentLocale);
  if (isValidMessages(s3Messages)) {
    return deepMergeMessages(englishMessages, s3Messages);
  }

  return englishMessages;
});

export { BUNDLED_LOCALES, isBundledLocale, getMessagesUrl };

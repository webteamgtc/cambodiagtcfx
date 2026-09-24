"use client";

import { useCallback, useMemo } from "react";
import { translationTextByPath } from "@/i18n/tranlsationText";
import { normalizePlatformGuideLocale } from "@/lib/platform-guide/locales";
import en from "@/translation/en.json";
import km from "@/translation/km.json";

const GUIDE_LOCALE_MESSAGES = {
  en: en.platformGuidePage,
  km: km.platformGuidePage || en.platformGuidePage,
};

/**
 * Translate platform-guide UI from the selected guide language filter
 * (EN / KM), independent of the site locale.
 */
export function useGuidePageTranslation(guideLocale = "en") {
  const messages = useMemo(() => {
    const code = normalizePlatformGuideLocale(guideLocale);
    return GUIDE_LOCALE_MESSAGES[code] || GUIDE_LOCALE_MESSAGES.en;
  }, [guideLocale]);

  return useCallback(
    (path, fallback = "") =>
      translationTextByPath(path, fallback, messages) || fallback,
    [messages]
  );
}

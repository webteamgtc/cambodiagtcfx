'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { localeDir, localeHreflang } from '@/i18n/config';
import { resolveContentLocale } from '@/i18n/regionalLocale';
import { translationTextByPath, readPath } from '@/i18n/tranlsationText';
import { getMessagesUrl, isBundledLocale } from '@/i18n/messagesConfig';
import bundledEn from '@/translation/en.json';

const LocaleContext = createContext({ locale: 'en', messages: {} });

const DEFAULT_LOADER = bundledEn.common?.loading ?? {
  ariaLabel: 'Loading translations',
  text: 'Loading…',
};

function TranslationLoader({ labels = DEFAULT_LOADER }) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={labels.ariaLabel}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-4 bg-white"
    >
      <span className="h-12 w-12 animate-spin rounded-full border-4 border-[#E5E7EB] border-t-[#293B93]" />
      <span className="text-sm font-medium text-[#293B93]">{labels.text}</span>
    </div>
  );
}

async function fetchClientMessages(locale) {
  const response = await fetch(getMessagesUrl(locale), {
    cache: 'no-store',
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`Failed to load messages for ${locale} (${response.status})`);
  }

  const data = await response.json();
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw new Error(`Invalid messages payload for ${locale}`);
  }

  return data;
}

export function LocaleProvider({ children, locale = 'en', messages = {} }) {
  const [clientMessages, setClientMessages] = useState(messages);
  const [messagesReady, setMessagesReady] = useState(isBundledLocale(locale));
  // Tracks the locale whose client messages are already available, so the
  // loader only shows on the first load of a locale — not on every page
  // navigation within the same locale.
  const loadedLocaleRef = useRef(isBundledLocale(locale) ? locale : null);

  useEffect(() => {
    const dir = localeDir[locale] || "ltr";
    const contentLocale = resolveContentLocale(locale);
    document.documentElement.lang =
      localeHreflang[contentLocale] || contentLocale;
    document.documentElement.dir = dir;
  }, [locale]);

  // Sync when the server sends new messages (navigation / SSR).
  useEffect(() => {
    setClientMessages(messages);
    if (isBundledLocale(locale)) {
      setMessagesReady(true);
    } else if (loadedLocaleRef.current !== locale) {
      // Only a brand-new (not-yet-loaded) locale should trigger the loader.
      setMessagesReady(false);
    }
  }, [locale, messages]);

  // S3-managed locales: always refresh in the browser so live/stale static builds stay correct.
  useEffect(() => {
    if (isBundledLocale(locale)) {
      loadedLocaleRef.current = locale;
      return undefined;
    }

    // Messages for this locale were already fetched once; keep the loader hidden.
    if (loadedLocaleRef.current === locale) {
      setMessagesReady(true);
      return undefined;
    }

    let cancelled = false;

    async function loadMessages() {
      try {
        const freshMessages = await fetchClientMessages(locale);
        if (!cancelled) {
          setClientMessages(freshMessages);
          loadedLocaleRef.current = locale;
          setMessagesReady(true);
        }
      } catch (error) {
        console.error('[i18n] Client messages fetch failed:', error);
        if (!cancelled) {
          // Avoid trapping the user behind a permanent loader.
          loadedLocaleRef.current = locale;
          setMessagesReady(true);
        }
      }
    }

    loadMessages();

    return () => {
      cancelled = true;
    };
  }, [locale]);

  const loaderLabels = useMemo(() => {
    const fromMessages = readPath('common.loading', clientMessages);
    if (fromMessages?.ariaLabel && fromMessages?.text) {
      return fromMessages;
    }
    return DEFAULT_LOADER;
  }, [clientMessages]);

  const value = useMemo(
    () => ({ locale, messages: clientMessages, messagesReady }),
    [locale, clientMessages, messagesReady]
  );

  return (
    <LocaleContext.Provider value={value}>
      {!messagesReady && <TranslationLoader labels={loaderLabels} />}
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocaleMessages() {
  return useContext(LocaleContext)?.messages || {};
}

export function useLocale() {
  return useContext(LocaleContext)?.locale || 'en';
}

export function useMessagesReady() {
  return useContext(LocaleContext)?.messagesReady ?? true;
}

/**
 * Client helper so components can call `t("path.to.key", "fallback")`
 * without passing `messages` into each call.
 */
export function usePathTranslation(basePath = '') {
  const messages = useLocaleMessages();
  const locale = useLocale();

  return useCallback(
    (path, fallback = '') => {
      const key = basePath ? `${basePath}.${path}` : path;
      const effectiveFallback = resolveContentLocale(locale) === 'en' ? fallback : '';
      const value = translationTextByPath(key, effectiveFallback, messages);
      // Prefer locale copy; when a key is missing, keep the caller fallback visible.
      return value || fallback;
    },
    [basePath, locale, messages]
  );
}

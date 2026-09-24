"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useLocale } from "@/app/[locale]/LocaleProvider";
import { getBaseLanguage } from "@/i18n/regionalLocale";

const S3_GLOSSARY_BASE =
  "https://gtcfx-bucket.s3.ap-southeast-1.amazonaws.com/glossary";

const ALPHABET = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

function isValidGlossary(data) {
  return data != null && typeof data === "object" && !Array.isArray(data) && Object.keys(data).length > 0;
}

async function fetchGlossaryJson(url) {
  const response = await axios.get(url, { validateStatus: () => true });
  if (response.status >= 200 && response.status < 300 && isValidGlossary(response.data)) {
    return response.data;
  }
  return null;
}

/**
 * Prefer local bundled glossary (public/glossary/{locale}.json),
 * then S3, then English local, then English S3.
 * Regional URL locales (en-intl, ar-ae, …) map to base language (en, ar, …).
 */
async function fetchGlossary(locale) {
  const contentLocale = getBaseLanguage(locale);
  const candidates = [
    `/glossary/${contentLocale}.json`,
    `${S3_GLOSSARY_BASE}/${contentLocale}.json`,
  ];

  if (contentLocale !== "en") {
    candidates.push("/glossary/en.json", `${S3_GLOSSARY_BASE}/en.json`);
  }

  for (const url of candidates) {
    try {
      const data = await fetchGlossaryJson(url);
      if (data) return data;
    } catch {
      // try next source
    }
  }

  return {};
}

export function useGlossaryHook(initialLetter) {
  const locale = useLocale();
  const normalizedLetter = (initialLetter || "a").toUpperCase();

  const [list] = useState(ALPHABET);
  const [allList, setAllList] = useState({});
  const [active, setActive] = useState(normalizedLetter);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadGlossary() {
      setLoading(true);
      setError(null);

      try {
        const glossary = await fetchGlossary(locale);
        if (cancelled) return;

        setAllList(glossary);
        setActive(normalizedLetter);
        setData(glossary[normalizedLetter] ?? []);
      } catch (fetchError) {
        if (!cancelled) {
          setError(fetchError);
          setAllList({});
          setData([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadGlossary();

    return () => {
      cancelled = true;
    };
  }, [locale, normalizedLetter]);

  useEffect(() => {
    setActive(normalizedLetter);
    setData(allList[normalizedLetter] ?? []);
  }, [normalizedLetter, allList]);

  const allTerms = useMemo(
    () =>
      Object.entries(allList).flatMap(([letter, items]) =>
        (items ?? []).map((item) => ({
          ...item,
          letter: letter.toLowerCase(),
        }))
      ),
    [allList]
  );

  return {
    list,
    active,
    setActive,
    data,
    allList,
    allTerms,
    loading,
    error,
  };
}

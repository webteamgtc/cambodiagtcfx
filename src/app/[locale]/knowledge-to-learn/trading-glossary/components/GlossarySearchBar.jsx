"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { localizedHref } from "@/i18n/localizedHref";
import { useLocale, usePathTranslation } from "@/app/[locale]/LocaleProvider";
import { useGlossaryHook } from "../hooks/useGlossaryHook";

function SearchIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

export default function GlossarySearchBar() {
  const locale = useLocale();
  const t = usePathTranslation("glossaryPage");
  const { allTerms, loading } = useGlossaryHook();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed || loading) return [];

    return allTerms
      .filter(
        ({ term, definition }) =>
          term?.toLowerCase().includes(trimmed) ||
          definition?.toLowerCase().includes(trimmed)
      )
      .slice(0, 8);
  }, [allTerms, loading, query]);

  return (
    <section className="bg-white pb-8 md:pb-12">
      <div className="container">
        <div className="relative max-w-[500px]">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("searchPlaceholder", "Search for glossary")}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm text-[#000032] placeholder:text-gray-400 focus:border-[#293B93] focus:outline-none"
          />

          {results.length > 0 ? (
            <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-20 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
              {results.map(({ term, definition, letter }) => (
                <Link
                  key={`${letter}-${term}`}
                  href={localizedHref(
                    locale,
                    `/knowledge-to-learn/trading-glossary/${letter}`
                  )}
                  className="block border-b border-gray-100 px-4 py-3 last:border-b-0 hover:bg-gray-50 hover:no-underline"
                  onClick={() => setQuery("")}
                >
                  <p className="text-sm font-semibold text-[#000032]">{term}</p>
                  <p className="mt-1 line-clamp-2 text-xs text-gray-600">{definition}</p>
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

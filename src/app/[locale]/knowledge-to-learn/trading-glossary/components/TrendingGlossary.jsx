"use client";

import Link from "next/link";
import { localizedHref } from "@/i18n/localizedHref";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";
import { useGlossaryHook } from "../hooks/useGlossaryHook";

const TRENDING_LETTERS = ["C", "F", "D"];

export default function TrendingGlossary({ locale }) {
  const t = usePathTranslation("glossaryPage");
  const { allList, loading } = useGlossaryHook();

  const trendingTerms = TRENDING_LETTERS.map((letter) => {
    const term = allList[letter]?.[0];
    if (!term) return null;

    return {
      ...term,
      href: `/knowledge-to-learn/trading-glossary/${letter.toLowerCase()}`,
    };
  }).filter(Boolean);

  return (
    <section className="bg-white pb-6 md:pb-10">
      <div className="container">
        <h2 className="mb-6 text-2xl font-bold text-[#000032]">
          {t("trendingTitle", "Trending glossary")}
        </h2>

        {loading ? (
          <p className="text-sm text-gray-500">
            {t("trendingLoading", "Loading trending terms…")}
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {trendingTerms.map(({ term, definition, href }) => (
              <div
                key={term}
                className="flex min-h-[180px] flex-col rounded-xl bg-[#EEF0FF] p-6"
              >
                <h3 className="text-lg font-bold text-[#000032]">{term}</h3>
                <p className="mt-2 text-sm text-gray-600">{definition}</p>
                <Link
                  href={localizedHref(locale, href)}
                  className="mt-auto pt-4 text-sm font-medium text-[#293B93] underline underline-offset-4 hover:no-underline"
                >
                  {t("viewAll", "View all analysis glossary.")}
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

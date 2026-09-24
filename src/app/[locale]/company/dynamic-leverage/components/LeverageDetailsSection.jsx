"use client";

import { useEffect, useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import FadeInSection from "./FadeInSection";
import LeverageCategoryTables from "./LeverageCategoryTables";
import {
  TAB_I18N_KEYS,
  countCategoryRows,
  filterCategorySections,
  useLeverageData,
} from "../hooks/useLeverageData";
import { LEVERAGE_DETAILS_SECTION_ID, LEVERAGE_SET_CATEGORY_EVENT } from "../leveragePageNav";
import { useLocale, usePathTranslation } from "@/app/[locale]/LocaleProvider";

function LeverageDetailsSkeleton() {
  return (
    <div className="mt-8 space-y-8">
      {[0, 1, 2].map((item) => (
        <div key={item} className="animate-pulse">
          <div className="mb-3 h-5 w-40 rounded bg-[#e8ecf8]" />
          <div className="h-56 rounded-xl bg-[#f0f1f6]" />
        </div>
      ))}
    </div>
  );
}

export default function LeverageDetailsSection() {
  const t = usePathTranslation("dynamicLeveragePage.details");
  const locale = useLocale();
  const { data, categories, loading, error } = useLeverageData(locale);
  const [activeCategory, setActiveCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (categories.length && !categories.includes(activeCategory)) {
      setActiveCategory(categories[0]);
    }
  }, [categories, activeCategory]);

  useEffect(() => {
    const handleSetCategory = (event) => {
      const nextCategory = event.detail?.category;
      if (nextCategory && categories.includes(nextCategory)) {
        setActiveCategory(nextCategory);
        setSearchQuery("");
      }
    };

    window.addEventListener(LEVERAGE_SET_CATEGORY_EVENT, handleSetCategory);
    return () => window.removeEventListener(LEVERAGE_SET_CATEGORY_EVENT, handleSetCategory);
  }, [categories]);

  const resolvedCategory = activeCategory || categories[0] || "";

  const activeSections = useMemo(() => {
    if (!data || !resolvedCategory) return [];
    return filterCategorySections(data[resolvedCategory], searchQuery);
  }, [data, resolvedCategory, searchQuery]);

  const visibleRowCount = useMemo(
    () => countCategoryRows(activeSections),
    [activeSections]
  );

  const totalRowCount = useMemo(() => {
    if (!data || !resolvedCategory) return 0;
    return countCategoryRows(data[resolvedCategory]);
  }, [data, resolvedCategory]);

  return (
    <section
      id={LEVERAGE_DETAILS_SECTION_ID}
      className="relative scroll-mt-28 bg-white py-10 md:py-16"
    >
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl">
          <FadeInSection>
            <div className="text-center">
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#3347a8]">
                {t("eyebrow", "SECTION 02 — INSTRUMENT SCHEDULE")}
              </span>
              <h2 className="HeadingH2 mt-5 text-[#02002f]">
                {t("title", "Dynamic Leverage Details")}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-[1.7] text-[#5a5a6e]">
                {t(
                  "description",
                  "Dynamic leverage at GTCFX automatically adjusts based on your trading positions. This model is applied per instrument, meaning your leverage decreases as your trading volume increases. This approach enables you to optimize your trading potential."
                )}
              </p>
            </div>
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <div className="mt-8 flex flex-wrap gap-3">
              {loading && !categories.length
                ? Array.from({ length: 5 }).map((_, index) => (
                    <div
                      key={index}
                      className="h-10 w-28 animate-pulse rounded-full bg-[#e8ecf8]"
                    />
                  ))
                : categories.map((category) => {
                    const i18nKey = TAB_I18N_KEYS[category];
                    const isActive = resolvedCategory === category;
                    const count = countCategoryRows(data?.[category]);

                    return (
                      <button
                        key={category}
                        type="button"
                        onClick={() => setActiveCategory(category)}
                        className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition ${
                          isActive
                            ? "bg-[#293B93] text-white"
                            : "border border-[#e1e7f6] bg-white text-[#02002f] hover:border-[#3347a8]"
                        }`}
                      >
                        {i18nKey ? t(`tabs.${i18nKey}`, category) : category}
                        <span
                          className={`text-xs ${isActive ? "text-white/70" : "text-[#8a8a9a]"}`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
            </div>
          </FadeInSection>

          <FadeInSection delay={0.15}>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative max-w-sm">
                <FiSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8a8a9a]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder={t("searchPlaceholder", "Search by symbol or name...")}
                  className="h-11 w-full rounded-xl border border-[#e8ecf8] bg-white pl-10 pr-4 text-sm text-[#02002f] placeholder:text-[#8a8a9a] focus:border-[#3347a8] focus:outline-none"
                />
              </div>
              <span className="text-[13px] text-[#8a8a9a]">
                {t(
                  "showing",
                  "Showing {visible} of {total} tiers · {category}"
                )
                  .replace("{visible}", String(visibleRowCount))
                  .replace("{total}", String(totalRowCount))
                  .replace("{category}", resolvedCategory || "—")}
              </span>
            </div>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <div className="mt-8">
              {loading ? (
                <LeverageDetailsSkeleton />
              ) : error ? (
                <div className="rounded-xl border border-[#f3d4d4] bg-[#fff5f5] px-6 py-10 text-center text-sm text-[#b42318]">
                  {t("loadError", "Unable to load leverage data. Please try again later.")}
                </div>
              ) : (
                <LeverageCategoryTables
                  sections={activeSections}
                  emptyLabel={t("noResults", "No matching instruments found.")}
                />
              )}
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

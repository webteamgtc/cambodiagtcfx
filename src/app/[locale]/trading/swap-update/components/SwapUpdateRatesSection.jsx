"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import { SWAP_RATES_DATA, SWAP_TABS } from "../swapUpdateData";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

function formatSymbol(symbol) {
  if (typeof symbol !== "string") return "";
  if (symbol.includes("/")) return symbol;
  if (symbol.length === 6) return `${symbol.slice(0, 3)} / ${symbol.slice(3)}`;
  return symbol;
}

export default function SwapUpdateRatesSection() {
  const t = usePathTranslation("swapUpdatePage.rates");
  const tNames = usePathTranslation("swapUpdatePage.instrumentNames");
  const [activeTab, setActiveTab] = useState("forex");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return SWAP_RATES_DATA.filter((row) => {
      const matchesTab = row.category === activeTab;
      const matchesSearch =
        row.symbol.toLowerCase().includes(search.toLowerCase()) ||
        row.name.toLowerCase().includes(search.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [activeTab, search]);

  return (
    <section className="relative overflow-hidden py-10 md:py-16">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
        <div className="absolute inset-0 bg-white" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #F8F9FC 0%, #F8F9FC 12%, rgba(240, 244, 255, 0) 50%, transparent 50%)",
          }}
        />
      </div>

      <div className="container relative min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl text-center">
          <SectionEyebrow variant="compact" className="!text-[#293B93] capitalize tracking-[0.3em]">
            {t("eyebrow", "Overnight Fee Table")}
          </SectionEyebrow>

          <h2 className="HeadingH1 mx-auto mt-4 max-w-2xl font-semibold leading-[1.2] text-[#000]">
            {t("heading", "Daily Overnight Interest Rates")}
          </h2>

          <p className="Text mx-auto mt-5 max-w-4xl font-normal leading-[1.7] text-[#000032]/60">
            {t("sub", "All overnight fees shown per standard lot. Positive values = you receive; negative values = you pay.")}
          </p>

          <div className="mt-10 flex justify-center">
            <div className="inline-flex rounded-full border border-[#E1E7F6] bg-[#F8F9FC] p-1">
              {SWAP_TABS.map((tab) => {
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className={clsx(
                      "min-w-[92px] rounded-full px-5 py-2 TextSmall font-normal transition",
                      isActive
                        ? "bg-[#293B93] text-white"
                        : "text-[#111827] hover:text-[#111827]"
                    )}
                  >
                    {t(`tabs.${tab.key}`, tab.label)}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full max-w-[260px]">
              <input
                type="search"
                placeholder={t("searchPlaceholder", "Search symbol...")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="Text w-full rounded-[8px] border border-[#E1E7F6] bg-[#F8F9FC] py-2.5 pl-9 pr-3 text-xs font-normal text-[#69729F] outline-none focus:border-[#293B93]"
                aria-label={t("searchAria", "Search symbol")}
              />
              <svg
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#293B93]/60"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden
              >
                <path
                  fillRule="evenodd"
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.124 4.384l3.25 3.25a.75.75 0 11-1.06 1.061l-3.25-3.25A7 7 0 012 9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <p className="flex items-center justify-center gap-2 text-xs font-normal text-[#293B93] sm:justify-end">
              <span className="h-1 w-1 rounded-full bg-[#293B93]" aria-hidden />
              {t("lastUpdated", "Last updated: Today 00:00 GMT")}
            </p>
          </div>

          <div className="mt-4 overflow-hidden rounded-[12px] border border-[#E1E7F6] text-left">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] border-collapse">
                <thead>
                  <tr className="border-b border-[#E1E7F6] bg-[#FFF]">
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-[#111827]">
                      {t("headers.symbol", "Symbol")}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-[#111827]">
                      {t("headers.buySwap", "Buy (long) swap")}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-[#111827]">
                      {t("headers.sellSwap", "Sell (short) swap")}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-[#111827]">
                      {t("headers.unit", "Unit")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((row) => (
                    <tr key={row.symbol} className="border-b border-[#EEF2FC] bg-transparent">
                      <td className="px-6 py-2.5">
                        <div className="min-w-0">
                          <p className="Text font-semibold leading-snug text-[#293B93]">
                            {formatSymbol(row.symbol)}
                          </p>
                          <p className="text-xs font-normal text-[#999]">{tNames(row.symbol, row.name)}</p>
                        </div>
                      </td>
                      <td className="TextSmall px-6 py-3.5 font-semibold text-[#111827]">
                        {row.longSwap}
                      </td>
                      <td className="TextSmall px-6 py-3.5 font-semibold text-[#111827]">
                        {row.shortSwap}
                      </td>
                      <td className="TextSmall px-6 py-3.5 font-normal text-[#111827]">
                        {t("unit", row.unit)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



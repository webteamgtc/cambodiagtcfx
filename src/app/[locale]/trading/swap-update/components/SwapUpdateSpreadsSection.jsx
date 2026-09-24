"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import { SWAP_TABLE_TABS, getSwapTableRows } from "../swapUpdateTableData";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

function formatSymbol(symbol) {
  if (typeof symbol !== "string") return "";
  if (symbol.includes("/")) return symbol;
  return symbol;
}


function formatSwapValue(value) {
  if (value == null || Number.isNaN(Number(value))) return "—";
  const num = Number(value);
  if (Number.isInteger(num)) return String(num);
  return String(num);
}

export default function SwapUpdateSpreadsSection() {
  const t = usePathTranslation("swapUpdatePage.spreads");
  const [activeTab, setActiveTab] = useState("forex");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const rows = getSwapTableRows(activeTab);
    const query = search.trim().toLowerCase();
    if (!query) return rows;

    return rows.filter((row) => row.symbol.toLowerCase().includes(query));
  }, [activeTab, search]);

  return (
    <section className="bg-white py-8 md:py-16">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl text-center">
          <SectionEyebrow variant="compact" className="!text-[#293B93] capitalize tracking-[0.3em]">
            {t("eyebrow", "Swap Table")}
          </SectionEyebrow>

          <h2 className="HeadingH1 mx-auto mt-4 max-w-xl font-semibold leading-[1.2] text-[#000]">
            {t("heading", "Daily Swap Rates Across All Markets")}
          </h2>

          <p className="Text mx-auto mt-5 max-w-5xl font-normal leading-[1.7] text-[#69729F]">
            {t(
              "sub",
              "Overnight swap rates for Forex, Metal, Crypto, and Indices. Searchable by symbol."
            )}
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-2">
            <div className="inline-flex flex-wrap justify-center rounded-full border border-[#E1E7F6] bg-[#F8F9FC] p-1">
              {SWAP_TABLE_TABS.map((tab) => {
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

          <div className="mt-4 overflow-hidden rounded-[12px] border border-[#E1E7F6] bg-white text-left">
            <div className="max-h-[420px] overflow-x-auto overflow-y-auto overscroll-contain md:max-h-[520px]">
              <table className="w-full min-w-[760px] border-collapse">
                <thead className="sticky top-0 z-10">
                  <tr className="border-b border-[#E1E7F6] bg-[#F8F9FC]">
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.14em] text-[#111827]">
                      {t("headers.symbol", "Symbol")}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.14em] text-[#111827]">
                      {t("headers.swapType", "Swap type")}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.14em] text-[#111827]">
                      {t("headers.swapLong", "Swap long")}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.14em] text-[#111827]">
                      {t("headers.swapShort", "Swap short")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-6 py-8 text-center text-sm font-normal text-[#69729F]"
                      >
                        {t("empty", "No symbols match your search.")}
                      </td>
                    </tr>
                  ) : (
                    filtered.map((row) => (
                      <tr key={row.symbol} className="border-b border-[#EEF2FC] bg-white">
                        <td className="px-6 py-2.5">
                          <p className="Text leading-snug font-semibold text-[#293B93]">
                            {formatSymbol(row.symbol)}
                          </p>
                        </td>
                        <td className="TextSmall px-6 py-3.5 font-normal text-[#69729F]">
                          {row.swapType}
                        </td>
                        <td className="TextSmall px-6 py-3.5 font-medium text-[#111827]">
                          {formatSwapValue(row.swapLong)}
                        </td>
                        <td className="TextSmall px-6 py-3.5 font-medium text-[#111827]">
                          {formatSwapValue(row.swapShort)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

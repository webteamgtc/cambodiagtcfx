"use client";

import { memo, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import FadeInSection from "@/app/[locale]/company/contact-us/components/FadeInSection";
import { useLocale, usePathTranslation } from "@/app/[locale]/LocaleProvider";
import { localizedHref } from "@/i18n/localizedHref";
import { useMarketLiveQuotes } from "../hooks/useMarketLiveQuotes";
import { getRowLiveQuote, useSymbolQuotesWs } from "../hooks/useSymbolQuotesWs";
import { rawSymbolToSlug } from "../symbolDetailConfig";
import { QuotePricePill } from "./SymbolKlineChart";

const FLASH_MS = 1000;

/** Flash highlight for 1s when a price value changes. */
function usePriceFlash(value) {
  const [flashing, setFlashing] = useState(false);
  const prevRef = useRef(value);
  const timerRef = useRef(null);

  useEffect(() => {
    const prev = prevRef.current;
    const hasRealValue = value != null && value !== "—";
    const hadRealValue = prev != null && prev !== "—";

    if (hadRealValue && hasRealValue && prev !== value) {
      setFlashing(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setFlashing(false), FLASH_MS);
    }

    prevRef.current = value;

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [value]);

  return flashing;
}

function LoadingRows() {
  return Array.from({ length: 5 }).map((_, index) => (
    <tr key={`loading-${index}`} className="border-b border-[#E1E7F6]">
      <td colSpan={5} className="px-4 py-4 md:px-6">
        <div className="h-10 animate-pulse rounded-lg bg-[#F0F3FA]" />
      </td>
    </tr>
  ));
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M7.5 5L12.5 10L7.5 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const QuoteRow = memo(function QuoteRow({ row, liveQuote, detailHref, onNavigate }) {
  const sell = liveQuote?.sell ?? row.bid;
  const buy = liveQuote?.buy ?? row.ask;
  const spread = liveQuote?.spread ?? row.spread;

  const sellFlash = usePriceFlash(sell);
  const buyFlash = usePriceFlash(buy);
  const spreadFlash = usePriceFlash(spread);

  return (
    <tr
      className="cursor-pointer border-b border-[#E1E7F6] transition hover:bg-[#FAFBFF]"
      onClick={() => {
        if (detailHref) onNavigate(detailHref);
      }}
      role={detailHref ? "link" : undefined}
      tabIndex={detailHref ? 0 : undefined}
      onKeyDown={(e) => {
        if (!detailHref) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onNavigate(detailHref);
        }
      }}
    >
      <td className="px-4 py-4 md:px-6">
        <p className="Text font-semibold text-[#293B93]">{row.symbol}</p>
        <p className="TextSmall font-normal text-[#666]">{row.name}</p>
      </td>
      <td className="px-4 py-4 text-center md:px-6">
        <QuotePricePill value={sell} variant="sell" flash={sellFlash} compact />
      </td>
      <td className="px-4 py-4 text-center md:px-6">
        <QuotePricePill value={buy} variant="buy" flash={buyFlash} compact />
      </td>
      <td className="px-4 py-4 text-center md:px-6">
        <QuotePricePill value={spread} variant="spread" flash={spreadFlash} compact />
      </td>
      <td className="px-4 py-4 text-right text-[#666] md:px-6">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#E1E7F6] bg-white text-[#293B93]">
          <ArrowIcon />
        </span>
      </td>
    </tr>
  );
});

/** Isolated so websocket ticks do not re-render the section title/copy. */
function LiveQuotesTableBody({
  rows,
  loading,
  emptyLabel,
  categorySlug,
  locale,
}) {
  const router = useRouter();
  const symbolList = useMemo(() => rows.map((row) => row.rawSymbol), [rows]);
  const liveQuotes = useSymbolQuotesWs(symbolList);

  return (
    <tbody className="bg-white">
      {loading ? <LoadingRows /> : null}
      {!loading && rows.length === 0 ? (
        <tr>
          <td colSpan={5} className="px-4 py-10 text-center Text text-[#666666] md:px-6">
            {emptyLabel}
          </td>
        </tr>
      ) : null}
      {!loading
        ? rows.map((row) => {
            const rowId = row.id ?? row.symbol;
            const symbolSlug = row.rawSymbol || row.symbol;
            const detailHref =
              categorySlug && symbolSlug
                ? localizedHref(locale, `/markets/${categorySlug}/${symbolSlug}`)
                : null;

            return (
              <QuoteRow
                key={rowId}
                row={row}
                liveQuote={getRowLiveQuote(liveQuotes, row)}
                detailHref={detailHref}
                onNavigate={(href) => router.push(href)}
              />
            );
          })
        : null}
    </tbody>
  );
}

export default function MarketLiveQuotesSection({ data }) {
  const locale = useLocale();
  const i18nBase = data.i18nKey ? `${data.i18nKey}.liveQuotes` : "marketsShared.liveQuotes";
  const t = usePathTranslation(i18nBase);
  const ts = usePathTranslation("marketsShared.liveQuotesTable");

  const { tabs, activeType, setActiveType, rows, loading, loadingMore, hasMore, loadMore } =
    useMarketLiveQuotes(data.slug, 15);

  const title = t("title", data.quotesTitle ?? "Live Market Quotes");
  const sub = data.quotesSub ? t("sub", data.quotesSub) : null;
  const emptyLabel = ts("emptyState", "No symbols available right now.");

  if (!tabs.length && !loading) {
    return null;
  }

  return (
    <section className="bg-white py-10 md:py-16">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl">
          <FadeInSection>
            <div className="text-center">
              <h2 className="HeadingH1 mx-auto font-semibold text-[#000]">
                {title}
              </h2>
              {sub ? (
                <p className="Text mx-auto mt-4 max-w-2xl font-normal leading-[1.7] text-[#4E4E4E]">
                  {sub}
                </p>
              ) : null}
            </div>

            {tabs.length > 1 ? (
              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveType(tab.type)}
                    className={clsx(
                      "rounded-full px-7 py-2 text-sm font-normal transition",
                      activeType === tab.type
                        ? "bg-[#293B93] text-white"
                        : "border border-[#E1E7F6] bg-[#F0F3FA] text-[#293B93] hover:border-[#293B93]/30"
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            ) : null}
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <div
              className="mt-8 overflow-hidden rounded-tl-[20px] rounded-tr-[20px] border border-[#E1E7F6] bg-white"
              style={{ boxShadow: "0 36px 30px 0 rgba(225, 231, 246, 0.50)" }}
            >
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] border-collapse">
                  <thead>
                    <tr className="border-b border-[#E1E7F6] bg-[#F0F3FA]">
                      <th className="TextSmall px-4 py-4 text-left font-medium uppercase tracking-wide text-[#666666] md:px-6">
                        {ts("instrument", "Name")}
                      </th>
                      <th className="TextSmall px-4 py-4 text-center font-medium uppercase tracking-wide text-[#666666] md:px-6">
                        {ts("sell", "Sell")}
                      </th>
                      <th className="TextSmall px-4 py-4 text-center font-medium uppercase tracking-wide text-[#666666] md:px-6">
                        {ts("buy", "Buy")}
                      </th>
                      <th className="TextSmall px-4 py-4 text-center font-medium uppercase tracking-wide text-[#666666] md:px-6">
                        {ts("spread", "Change, %")}
                      </th>
                      <th className="w-14 px-4 py-4 md:px-6" aria-hidden />
                    </tr>
                  </thead>
                  <LiveQuotesTableBody
                    rows={rows}
                    loading={loading}
                    emptyLabel={emptyLabel}
                    categorySlug={data.slug}
                    locale={locale}
                  />
                </table>
              </div>

              {data.quotesFooterLink && hasMore ? (
                <div className="bg-white px-4 py-4 text-center md:px-6 md:py-6">
                  <button
                    type="button"
                    onClick={loadMore}
                    disabled={loadingMore}
                    className="Text font-medium text-[#293B93] transition hover:text-[#1E2D77] disabled:opacity-60"
                  >
                    {loadingMore
                      ? ts("loadingMore", "Loading...")
                      : t("footerLink", data.quotesFooterLink)}
                  </button>
                </div>
              ) : null}
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

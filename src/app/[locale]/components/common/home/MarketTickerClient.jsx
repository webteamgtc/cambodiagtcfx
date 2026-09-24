"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useLocale, usePathTranslation } from "../../../LocaleProvider";
import { localizedHref } from "@/i18n/localizedHref";
import { useHomeMarketTickerData } from "@/app/[locale]/markets/market-shared/hooks/useHomeMarketTickerData";
import {
  marketCategoryFromApiType,
  rawSymbolToSlug,
} from "@/app/[locale]/markets/market-shared/symbolDetailConfig";

const MARKET_TICKER_CATEGORY_KEYS = {
  forex: "forex",
  energy: "energy",
  metals: "metals",
  indices: "indices",
  shares: "shares",
  commodities: "commodities",
  "crypto-cfds": "crypto",
  "future-cfds": "futures",
};

function getMarketTickerCategoryKey(typeName = "") {
  const slug = marketCategoryFromApiType(typeName);
  return MARKET_TICKER_CATEGORY_KEYS[slug] || null;
}

function getApiTypeTranslationKey(typeName = "") {
  const name = String(typeName).trim().toLowerCase();
  if (name === "future") return "future";
  if (name === "stock") return "stock";
  if (name.includes("fx") || name.includes("forex")) return "fxMinors";
  if (name === "energy") return "energy";
  if (name.includes("metal")) return "metals";
  if (name.includes("index")) return "index";
  if (name.includes("crypto")) return "crypto";
  return null;
}

function resolveMarketTickerTabLabel(tab, t) {
  const apiTypeKey = getApiTypeTranslationKey(tab.type);
  if (apiTypeKey) {
    const apiLabel = t(`apiTypes.${apiTypeKey}`, "");
    if (apiLabel) return apiLabel;
  }

  const categoryKey = getMarketTickerCategoryKey(tab.type);
  if (categoryKey) {
    const categoryLabel = t(`categories.${categoryKey}`, "");
    if (categoryLabel) return categoryLabel;
  }

  return tab.label;
}

const UP_CLASS = "text-emerald-600";
const DOWN_CLASS = "text-red-500";

function getSymbolInitial(name = "") {
  const trimmed = String(name).trim();
  if (!trimmed) return "?";

  const firstWord = trimmed.split(/[\s/\-_]+/).filter(Boolean)[0] || trimmed;
  return firstWord[0]?.toUpperCase() ?? "?";
}

function AssetIcon({ iconUrl, name }) {
  const wrap =
    "flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full sm:h-10 sm:w-10";
  const initial = getSymbolInitial(name);

  return (
    <span
      className={`${wrap} bg-[#f0f2f8] text-sm font-bold uppercase text-[#1e3a8a] sm:text-base`}
      aria-hidden
    >
      {initial}
    </span>
  );
}

function TickerCardSkeleton() {
  return (
    <div
      className="flex max-w-[340px] shrink-0 animate-pulse items-center gap-2.5 rounded-[999px] border border-neutral-100/80 bg-white px-3.5 py-3 sm:min-w-[280px] sm:gap-3 sm:px-4 md:min-w-[300px] md:px-5"
      aria-hidden
    >
      <span className="h-9 w-9 shrink-0 rounded-full bg-neutral-200 sm:h-10 sm:w-10" />
      <span className="h-4 min-w-0 flex-1 rounded bg-neutral-200" />
      <span className="h-10 w-16 shrink-0 rounded bg-neutral-200" />
    </div>
  );
}

function TickerCard({ item, href }) {
  const tone = item.isUp ? UP_CLASS : DOWN_CLASS;

  const content = (
    <>
      <AssetIcon iconUrl={item.iconUrl} name={item.name} />
      <span className="Text min-w-0 flex-1 truncate text-start font-semibold leading-snug tracking-tight text-neutral-900">
        {item.name}
      </span>
      <div className="flex shrink-0 flex-col items-end gap-0.5 text-end">
        <span className={`Text font-bold tabular-nums ${tone}`}>
          {item.price}
          {item.price !== "—" ? (
            <span className="TextSmall ms-1 inline-block align-middle" aria-hidden>
              {item.isUp ? "↑" : "↓"}
            </span>
          ) : null}
        </span>
        <span className="TextSmall font-semibold tabular-nums">
          <span className="text-red-500">{item.sell}</span>
          <span className="mx-1 text-neutral-400">/</span>
          <span className="text-emerald-600">{item.buy}</span>
        </span>
      </div>
    </>
  );

  const className =
    "flex max-w-[340px] shrink-0 items-center gap-2.5 rounded-[999px] border border-neutral-100/80 bg-white px-3.5 py-1 sm:min-w-[280px] sm:gap-3 sm:px-4 sm:py-1 md:min-w-[300px] md:px-5";
  const style = {
    borderRadius: "50px",
    background: "#FFF",
    boxShadow: "-1px 0 10px 0 rgba(0, 0, 0, 0.10)",
  };
  const ariaLabel = `${item.name} ${item.price} sell ${item.sell} buy ${item.buy}`;

  if (href) {
    return (
      <Link
        href={href}
        className={`${className} transition hover:bg-neutral-50`}
        style={style}
        aria-label={ariaLabel}
      >
        {content}
      </Link>
    );
  }

  return (
    <div className={className} role="group" aria-label={ariaLabel} style={style}>
      {content}
    </div>
  );
}

export default function MarketTickerClient({
  variant = "standalone",
  fullWidth = false,
  hideTabs = false,
}) {
  const locale = useLocale();
  const t = usePathTranslation("home.marketTicker");
  const { tabs, activeType, setActiveType, items, loading, loadingTypes } =
    useHomeMarketTickerData();
  const isFloating = variant === "floating";

  const loopItems = useMemo(() => {
    if (loading) {
      return Array.from({ length: 8 }, (_, index) => ({ key: `loading-${index}`, loading: true }));
    }

    if (!items.length) {
      return [];
    }

    const doubled = [...items, ...items];
    return doubled.length >= 4 ? doubled : [...doubled, ...doubled];
  }, [loading, items]);

  const body = (
    <>
      {!hideTabs && (loadingTypes && !tabs.length ? (
        <div
          className={`gtc-market-ticker__tabs flex w-full flex-nowrap items-center justify-center gap-2 overflow-x-auto md:gap-3 ${isFloating ? "mb-2 md:mb-2" : "-mx-1 mb-2 md:mb-2"}`}
          aria-hidden
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <span
              key={index}
              className={`inline-block h-9 shrink-0 animate-pulse rounded-full bg-neutral-200 ${
                index === 0 ? "w-24" : "w-20"
              }`}
            />
          ))}
        </div>
      ) : tabs.length > 0 ? (
        <div
          className={`gtc-market-ticker__tabs flex w-full flex-nowrap items-center justify-center gap-2 overflow-x-auto md:gap-3 ${isFloating ? "mb-2 md:mb-2" : "-mx-1 mb-2 md:mb-2"}`}
          role="tablist"
          aria-label={t("tabListAria", "Categories")}
        >
          {tabs.map((tab) => {
            const isActive = activeType === tab.type;
            const label = resolveMarketTickerTabLabel(tab, t);
            return (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveType(tab.type)}
                className={`TextButton shrink-0 rounded-full px-3.5 py-1.5 transition-colors md:px-4 ${
                  isActive
                    ? "border border-[#1e3a8a] text-neutral-900"
                    : "border border-transparent text-neutral-600 hover:text-neutral-900"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      ) : null)}

      {/* Keep marquee track LTR so RTL page dir does not push cards off-screen */}
      <div className="gtc-market-ticker__viewport relative overflow-hidden rounded-xl" dir="ltr">
        {!loading && !items.length ? (
          <p className="py-4 text-center text-sm text-neutral-500">
            {t("emptyState", "No live quotes available right now.")}
          </p>
        ) : (
          <div className="gtc-market-ticker__track flex min-w-max items-center gap-2.5 px-0.5 py-2 sm:gap-3 md:gap-4">
            {loopItems.map((item, index) =>
              item.loading ? (
                <TickerCardSkeleton key={item.key} />
              ) : (
                <TickerCard
                  key={`${item.key}-${activeType}-${index}`}
                  item={item}
                  href={
                    item.category && item.rawSymbol
                      ? localizedHref(
                          locale,
                          `/markets/${item.category}/${rawSymbolToSlug(item.rawSymbol)}`
                        )
                      : null
                  }
                />
              )
            )}
          </div>
        )}
      </div>
    </>
  );

  if (isFloating) {
    return (
      <div
        className="w-full bg-white p-4 shadow-[0_18px_50px_rgba(15,23,42,0.14)] ring-1 ring-black/[0.04] md:rounded-[28px] md:p-3 lg:p-4"
        aria-label={t("sectionAria", "Markets")}
      >
        {body}
      </div>
    );
  }

  return (
    <section className="w-full bg-white py-5 md:py-6" aria-label={t("sectionAria", "Markets")}>
      {fullWidth ? (
        <div className="px-3 sm:px-4 md:px-6">{body}</div>
      ) : (
        <div className="mx-auto max-w-[1400px] px-3 sm:px-4 md:px-6">{body}</div>
      )}
    </section>
  );
}

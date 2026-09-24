"use client";

import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import Button from "@/app/[locale]/components/common/Button";
import { REGISTER_HREF } from "../assetMarketData";
import FadeInSection from "@/app/[locale]/company/contact-us/components/FadeInSection";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";
import {
  buildAssetHeroWidget,
  useAssetMarketHeroSymbols,
} from "../hooks/useMarketsInstrumentsData";
import { useRouter } from "next/navigation";

function DataCell({ label, value, positive }) {
  return (
    <div className="rounded-[10px] bg-[#F8F9FC] px-3 py-3">
      <p className="text-xs font-normal uppercase text-[#666]">{label}</p>
      <p
        className={`TextSmall mt-1 font-semibold ${positive === true ? "text-[#04C120]" : positive === false ? "text-[#CF4548]" : "text-[#000032]"
          }`}
      >
        {value}
      </p>
    </div>
  );
}

function SymbolPills({ items, selectedIndex, onSelect }) {
  if (!items.length) return null;

  return (
    <ul className="mb-4 flex flex-wrap gap-2">
      {items.map((item, index) => (
        <li key={item.key}>
          <button
            type="button"
            onClick={() => onSelect(index)}
            className={clsx(
              "inline-flex rounded-full px-3 py-1 text-xs font-semibold transition",
              selectedIndex === index
                ? "bg-[#293B93] text-white"
                : "bg-[#EEF2FF] text-[#293B93] hover:bg-[#DCE4FF]"
            )}
          >
            {item.label}
          </button>
        </li>
      ))}
    </ul>
  );
}

function TradingWidget({ widget, tw, th }) {
  const longPercent = widget.longPercent ?? widget.buyersPercent ?? 50;
  const shortPercent = widget.shortPercent ?? widget.sellersPercent ?? 50;
  const router = useRouter();
  return (
    <div className="p-5 md:p-6"
      style={{
        borderRadius: "20px",
        background: "#FFF",
        boxShadow: "0 4px 50px 0 rgba(41, 59, 147, 0.20)",
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="HeadingH4 font-semibold text-[#000032]">{widget.symbol}</p>
        <span className="inline-flex items-center gap-1.5 text-xs font-normal uppercase tracking-[0.06em] text-[#04C120]">
          <span className="h-2 w-2 rounded-full bg-[#04C120]" aria-hidden />
          {tw("live", "Live")}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-[12px] bg-[#FFF0F0] border border-[#FAD5DA] px-4 py-4">
          <p className="text-xs font-semibold uppercase text-[#CF4548]">{tw("sell", "Sell")}</p>
          <p className="HeadingH5 mt-2 font-semibold text-[#000032]">{widget.sellPrice}</p>
          <a
            href={REGISTER_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs  mt-3 inline-flex items-center gap-1 font-semibold text-[#CF4548] hover:underline"
          >
            <span aria-hidden>▶</span> {tw("sellNow", "Sell Now")}
          </a>
        </div>

        <div className="rounded-[12px] bg-[#EEF8F0] border border-[#D5F0E4] px-4 py-4 ">
          <p className="text-xs font-semibold uppercase text-[#04C120]">{tw("buy", "Buy")}</p>
          <p className="HeadingH5 mt-2 font-semibold text-[#000032]">{widget.buyPrice}</p>
          <a
            href={REGISTER_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs  mt-3 inline-flex items-center justify-end gap-1 font-semibold text-[#04C120] hover:underline"
          >
            {tw("buyNow", "Buy Now")} <span aria-hidden className="">▶</span>
          </a>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <DataCell label={tw("spread", "Spread")} value={widget.spreadDisplay ?? widget.spread} />
        <DataCell
          label={tw("dailyChange", "Daily Change")}
          value={widget.dailyChange}
          positive={widget.dailyChangePositive}
        />
        <DataCell label={tw("dayHigh", "Day High")} value={widget.dayHigh ?? widget.high} />
        <DataCell label={tw("dayLow", "Day Low")} value={widget.dayLow ?? widget.low} />
      </div>

      <div className="mt-5 cursor-pointer"
      onClick={() => {
        router.push(`/trading/open-live-account`);
      }}
      >
        <p className="text-xs font-normal text-[#666]">{tw("marketSentiment", "Market Sentiment")}</p>
        <div className="mt-2 flex h-2 overflow-hidden rounded-full">
          <span className="bg-[#04C120]" style={{ width: `${longPercent}%` }} aria-hidden />
          <span className="bg-[#CF4548]" style={{ width: `${shortPercent}%` }} aria-hidden />
        </div>
        <div className="mt-2 flex items-center justify-between gap-3">
          <span className="text-xs font-medium text-[#04C120]">▲ {tw("long", "Long")} {longPercent}%</span>
          <span className="text-xs font-medium text-[#CF4548]">{shortPercent}% {tw("short", "Short")} ▲</span>
        </div>
      </div>
{/* 
      {widget.minSpreadNote ? (
        <p className="text-xs mx-auto mt-5 inline-flex w-full items-center  rounded-full bg-[#EEF2FC] px-4 py-2 font-medium text-[#293B93]">
          {th("widget.minSpreadNote", widget.minSpreadNote)}
        </p>
      ) : null} */}
    </div>
  );
}

export default function AssetMarketHeroSection({ data, locale = "en" }) {
  const { hero } = data;
  const th = usePathTranslation(`${data.i18nKey}.hero`);
  const tc = usePathTranslation("marketsShared.heroCtas");
  const tw = usePathTranslation("marketsShared.assetWidget");
  const { symbols, liveQuotes, loading } = useAssetMarketHeroSymbols(data.slug, 3);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    setSelectedIndex(0);
  }, [data.slug, symbols.length]);

  const safeIndex = Math.min(selectedIndex, Math.max(symbols.length - 1, 0));
  const selectedSymbol = symbols[safeIndex] ?? null;

  const pillItems = useMemo(
    () =>
      symbols.map((row) => ({
        key: row.rawSymbol || row.symbol,
        label: row.symbol,
      })),
    [symbols]
  );

  const widget = useMemo(() => {
    const base = hero.widget;

    if (!selectedSymbol) {
      return base;
    }

    const live = buildAssetHeroWidget(selectedSymbol, liveQuotes);
    if (!live) {
      return { ...base, symbol: selectedSymbol.symbol };
    }

    return { ...base, ...live };
  }, [hero.widget, selectedSymbol, liveQuotes]);

  return (
    <section className="relative overflow-hidden pb-8 pt-10 md:pb-12 md:pt-16">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          opacity: 0.7,
          background: "linear-gradient(270deg, #F2F5FF 0%, #F9FAFF 100%)",
        }}
      />
      <div className="relative container min-w-0 max-w-full">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-12">
          <div className="min-w-0 text-center lg:text-left">
            <FadeInSection>
              <h1 className="HeadingH1 font-semibold max-w-md leading-[1.5] text-[#000]">
                {th("titlePrefix", hero.titlePrefix)}{" "}
                <span className="text-[#293B93]">{th("titleAccent", hero.titleAccent)}</span>{" "}
                {th("titleSuffix", hero.titleSuffix)}
              </h1>
            </FadeInSection>
            <FadeInSection delay={0.1}>
              <p className="Text mx-auto mt-5 max-w-lg font-normal leading-[1.7] text-[#4E4E4E] lg:mx-0">
                {th("sub", hero.sub)}
              </p>
            </FadeInSection>
            <FadeInSection delay={0.2}>
              <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
                <Button href={REGISTER_HREF} external variant="brand" size="md" showArrow>
                  {tc("startTradingNow", "Start Trading Now")}
                </Button>
              </div>
            </FadeInSection>

            <div className="mt-10 grid grid-cols-2 gap-4 border-t border-[#E1E7F6] pt-6 sm:grid-cols-4">
              {hero.stats.map((item, index) => (
                <div key={item.label} className="min-w-0 text-center lg:text-left">
                  <FadeInSection delay={index * 0.2} >
                    <p className="HeadingH4 font-medium text-[#293B93]">{th(`stats.${index}.value`, item.value)}</p>
                    <p className="TextSmall font-normal text-[#666]">{th(`stats.${index}.label`, item.label)}</p>
                  </FadeInSection>
                </div>

              ))}
            </div>
          </div>


          <FadeInSection delay={0.3}>
            <div>
              {pillItems.length > 0 ? (
                <SymbolPills
                  items={pillItems}
                  selectedIndex={safeIndex}
                  onSelect={setSelectedIndex}
                />
              ) : null}
              <TradingWidget widget={widget} tw={tw} th={th} />
              {loading && !symbols.length ? (
                <p className="mt-2 text-center text-xs text-[#666]">{tw("loading", "Loading live quotes...")}</p>
              ) : null}
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathTranslation } from "../../LocaleProvider";
import { localizedHref } from "@/i18n/localizedHref";

const GLOBE_MAP_SRC = "/new-design/Markets/img3.webp";
const INDICES_VISUAL_SRC = "/new-design/Markets/popular.svg";

const FX_PAIRS = [
  {
    id: "eurusd",
    symbol: "EURUSD",
    nameKey: "eurUsd",
    nameFallback: "Euro / US Dollar",
    price: "1.08245",
    change: "+0.15%",
    positive: true,
    badges: ["$", "$"],
    sparkPath:
      "M0 52 C20 48, 35 55, 55 38 S95 42, 115 28 S155 32, 175 18 S215 24, 235 12 S275 16, 295 8 S335 12, 355 4 L380 8",
  },
  {
    id: "gbpusd",
    symbol: "GBPUSD",
    nameKey: "gbpUsd",
    nameFallback: "British Pound / US Dollar",
    price: "1.27418",
    change: "+0.08%",
    positive: true,
    badges: ["£", "$"],
    sparkPath:
      "M0 48 C25 44, 50 46, 75 40 S125 36, 150 30 S200 26, 225 20 S275 16, 300 12 S350 8, 375 4 L380 8",
  },
  {
    id: "usdjpy",
    symbol: "USDJPY",
    nameKey: "usdJpy",
    nameFallback: "US Dollar / Japanese Yen",
    price: "156.842",
    change: "-0.12%",
    positive: false,
    badges: ["$", "¥"],
    sparkPath:
      "M0 14 C20 18, 45 16, 70 24 S120 22, 145 30 S195 28, 220 36 S270 32, 295 38 S345 34, 370 40 L380 36",
  },
  {
    id: "usdchf",
    symbol: "USDCHF",
    nameKey: "usdChf",
    nameFallback: "US Dollar / Swiss Franc",
    price: "0.90124",
    change: "+0.05%",
    positive: true,
    badges: ["$", "Fr"],
    sparkPath:
      "M0 42 C30 38, 60 36, 90 32 S150 28, 180 24 S240 18, 270 14 S330 10, 360 6 L380 8",
  },
  {
    id: "xauusd",
    symbol: "GOLD(XAUUSD)",
    nameKey: "xauUsd",
    nameFallback: "Gold / US Dollar",
    price: "2,334.50",
    change: "+0.22%",
    positive: true,
    badges: ["Au", "$"],
    sparkPath:
      "M0 44 C15 40, 35 36, 55 32 S95 28, 115 24 S155 18, 175 14 S215 10, 235 8 S275 6, 295 4 S335 2, 355 0 L380 4",
  },
];

function IconChevronRight({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 32 24" fill="none">
    <path d="M30.7098 10.7837L20.3058 0.379763C19.7995 -0.126588 18.9785 -0.126588 18.4722 0.379763C17.9659 0.886113 17.9659 1.70704 18.4722 2.21339L26.7095 10.4506H1.24981C0.55955 10.4506 0 11.0102 0 11.7005C0 12.3907 0.55959 12.9503 1.24981 12.9503H26.7095L18.4722 21.1876C17.9659 21.6939 17.9659 22.5148 18.4722 23.0212C18.7254 23.2743 19.0572 23.4009 19.389 23.4009C19.7208 23.4009 20.0527 23.2743 20.3058 23.0212L30.7098 12.6173C30.8302 12.4969 30.9257 12.3539 30.9908 12.1966C31.056 12.0393 31.0895 11.8707 31.0895 11.7005C31.0895 11.5302 31.056 11.3616 30.9908 11.2043C30.9257 11.047 30.8302 10.9041 30.7098 10.7837Z" fill="#293B93"/>
  </svg>
  );
}

function TrendIcon({ positive }) {
  if (positive) {
    return (
      <svg width="10" height="10" viewBox="0 0 12 12" fill="#1AAF5D" aria-hidden>
        <path d="M6 1.5L10.5 8.5H1.5L6 1.5Z" />
      </svg>
    );
  }
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="#e74c3c" aria-hidden>
      <path d="M6 10.5L1.5 3.5H10.5L6 10.5Z" />
    </svg>
  );
}

function SparklineChart({ pathD, positive, id }) {
  const stroke = positive ? "#293B93" : "#e74c3c";
  const fillId = `spark-${id}-${positive ? "up" : "down"}`;

  return (
    <svg
      viewBox="0 0 380 56"
      className="h-[72px] w-full"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.22" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${pathD} L380 56 L0 56 Z`} fill={`url(#${fillId})`} />
      <path
        d={pathD}
        fill="none"
        stroke={stroke}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PairBadges({ badges }) {
  return (
    <div className="flex shrink-0 items-center">
      <span className="relative z-[1] flex h-10 w-10 items-center justify-center rounded-full bg-[#5b6fc0] text-[15px] font-bold text-white shadow-sm">
        {badges[0]}
      </span>
      <span className="relative -ms-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#293B93] text-[15px] font-bold text-white shadow-sm">
        {badges[1]}
      </span>
    </div>
  );
}

function MarketQuoteCard({ pair, t }) {
  return (
    <div className="relative z-[2] w-full max-w-[360px] rounded-xl border border-[#e8ecf2]/80 bg-white px-6 py-5 shadow-[0_10px_40px_rgba(41,59,147,0.14)] sm:px-7 sm:py-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 pt-0.5">
          <p className="text-[17px] font-bold leading-tight text-[#293B93]">
            {pair.symbol}
          </p>
          <p className="mt-1 text-[13px] font-normal leading-snug text-[#999999]">
            {t(`fx.pairs.${pair.nameKey}`, pair.nameFallback)}
          </p>
        </div>
        <PairBadges badges={pair.badges} />
      </div>

      <div className="mt-5">
        <p className="text-[28px] font-bold leading-none tracking-tight text-[#111827] sm:text-[32px]">
          {pair.price}
        </p>
        <span
          className={`mt-2 inline-flex items-center gap-1 text-[14px] font-semibold ${
            pair.positive ? "text-[#1AAF5D]" : "text-[#e74c3c]"
          }`}
        >
          {pair.change}
          <TrendIcon positive={pair.positive} />
        </span>
      </div>

      <div className="mt-5 -mx-1">
        <SparklineChart
          pathD={pair.sparkPath}
          positive={pair.positive}
          id={pair.id}
        />
      </div>
    </div>
  );
}

function FxPairsList({ activeId, onSelect, t }) {
  return (
    <div className="min-w-0 lg:max-w-[280px]">
      <h3 className="HeadingH2 font-bold text-[#293B93]">
        {t("fx.title", "Popular FX Markets")}
      </h3>
      <ul className="mt-5 border-t border-[#eef1f6]">
        {FX_PAIRS.map((pair) => {
          const active = pair.id === activeId;
          return (
            <li key={pair.id} className="border-b border-[#eef1f6] last:border-b-0">
              <button
                type="button"
                onClick={() => onSelect(pair.id)}
                className="flex w-full items-center justify-between gap-3 py-[18px] text-left transition-colors hover:bg-[#fafbfd]"
              >
                <span
                  className={`Text font-bold leading-snug ${
                    active
                      ? "font-bold text-[#293B93]"
                      : "font-bold text-[#666666]"
                  }`}
                >
                  {pair.symbol}
                </span>
                {active ? (
                  <IconChevronRight className="shrink-0 h-4 w-4" />
                ) : (
                  <span className="inline-block h-4 w-4 shrink-0" aria-hidden />
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function FxVisualPanel({ pair, t }) {
  return (
    <div className="relative grid w-full overflow-hidden">
      <div
        className="pointer-events-none col-start-1 row-start-1 min-h-[280px] overflow-hidden sm:min-h-[380px]"
        aria-hidden
      >
        <Image
          src={GLOBE_MAP_SRC}
          alt=""
          fill
          className=" object-[58%_50%] "
          sizes="(max-width: 1024px) 100vw, 100%"
          priority={false}
        />
      </div>
   
    </div>
  );
}

function StatItem({ value, label }) {
  return (
    <div>
      <p className="HeadingH3 font-bold text-[#293B93]">
        {value}
      </p>
      <p className="mt-1 TextSmall font-normal leading-snug text-[#666666]">
        {label}
      </p>
    </div>
  );
}

function IndicesBlock({ locale, t }) {
  const stats = [
    {
      value: t("indices.stats.indices.value", "50+"),
      label: t("indices.stats.indices.label", "Global Indices"),
    },
    {
      value: t("indices.stats.volume.value", "$2.4T"),
      label: t("indices.stats.volume.label", "Daily Volume"),
    },
    {
      value: t("indices.stats.speed.value", "0.01s"),
      label: t("indices.stats.speed.label", "Execution Speed"),
    },
  ];

  return (
    <div className="pt-6  md:pt-8">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-10 xl:gap-16">
        <div className="min-w-0">
          <h3 className="HeadingH2 font-bold text-[#293B93]">
            {t("indices.title", "Popular Indices")}
          </h3>
          <p className="Text mt-4 max-w-md font-normal leading-[1.5] text-[#666666]">
            {t(
              "indices.description",
              "Access leading global indices and trade the markets that move the world — with real-time data, advanced tools, and zero friction."
            )}
          </p>

          <div className="mt-10 grid grid-cols-3 gap-6 sm:gap-8">
            {stats.map((stat) => (
              <StatItem key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href={localizedHref(locale, "/forex")}
              className="TextButton inline-flex h-11 items-center justify-center rounded-full bg-[#293B93] px-8 text-white transition hover:bg-[#293B93] hover:no-underline sm:min-w-[168px]"
            >
              {t("indices.exploreMarkets", "Explore Markets")}
            </Link>
            <Link
              href={localizedHref(locale, "/indices")}
              className="TextButton inline-flex h-11 items-center justify-center rounded-full border border-[#293B93] bg-transparent px-8 text-[#293B93] transition hover:bg-[#f7f8fc] hover:no-underline sm:min-w-[168px]"
            >
              {t("indices.viewAll", "View All Indices")}
            </Link>
          </div>
        </div>

        <div className="relative flex min-h-[300px] items-center justify-center sm:min-h-[340px] lg:justify-end">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_55%_55%,rgba(214,224,255,0.4),transparent_70%)]"
            aria-hidden
          />
          <div className="relative w-full max-w-[460px] px-2">
            <Image
              src={INDICES_VISUAL_SRC}
              alt={t(
                "indices.imageAlt",
                "Indices market chart illustration with rising trend"
              )}
              width={920}
              height={720}
              className="h-auto w-full"
              sizes="(max-width: 1024px) 90vw, 460px"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MarketsPopularRecommendationsSection({ locale = "en" }) {
  const t = usePathTranslation("marketsPage.popularRecommendationsSection");
  const [activePairId, setActivePairId] = useState(FX_PAIRS[0].id);

  const activePair = useMemo(
    () => FX_PAIRS.find((p) => p.id === activePairId) ?? FX_PAIRS[0],
    [activePairId]
  );

  return (
    <section className="overflow-x-hidden bg-white py-10 md:py-12">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl">
          <h2 className="HeadingH1 text-[#000] text-center">
            {t("title", "Popular Recommendations")}
          </h2>

          <div className="mt-10 grid items-center gap-8 lg:mt-14 lg:grid-cols-[minmax(220px,280px)_1fr] lg:gap-6 xl:grid-cols-[minmax(240px,300px)_1fr] xl:gap-10">
            <FxPairsList
              activeId={activePairId}
              onSelect={setActivePairId}
              t={t}
            />
            <FxVisualPanel pair={activePair} t={t} />
          </div>

          <IndicesBlock locale={locale} t={t} />
        </div>
      </div>
    </section>
  );
}

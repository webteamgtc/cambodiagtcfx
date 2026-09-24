"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { localizedHref } from "@/i18n/localizedHref";
import {
  ASSET_CARDS,
  CHART_TIMEFRAMES,
  MARKET_SUMMARIES,
  TREND_TABS,
  TRENDING_NEWS,
  WATCHLIST_ITEMS,
} from "../marketNewsData";
import FadeInSection from "@/app/[locale]/company/contact-us/components/FadeInSection";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

function RefreshIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M14.998 11.2559H13.75V13.7539H11.2539V15.002H13.75V17.5H14.998V15.002H17.4961V13.7539H14.998V11.2559Z" fill="#293B93" />
      <path d="M9.77734 16.834C9.77734 16.4727 9.48438 16.1777 9.12109 16.1777H4.36719C2.68359 16.1777 1.3125 14.8066 1.3125 13.123V4.36719C1.3125 2.68359 2.68164 1.3125 4.36719 1.3125H13.125C14.8086 1.3125 16.1797 2.68359 16.1797 4.36719V9.03125C16.1797 9.39258 16.4727 9.6875 16.8359 9.6875C17.1992 9.6875 17.4922 9.39453 17.4922 9.03125V4.36719C17.4902 1.95898 15.5332 0 13.125 0H4.36719C1.95898 0 0 1.95898 0 4.36523V13.1211C0 15.5273 1.95898 17.4863 4.36719 17.4863H9.12109C9.48438 17.4883 9.77734 17.1953 9.77734 16.834Z" fill="#293B93" />
    </svg>
  );
}

function Sparkline({ trend }) {
  const up = trend === "up";
  const stroke = up ? "#22A06B" : "#E34935";

  return (
    <svg className="w-full" xmlns="http://www.w3.org/2000/svg" width="220" height="51" viewBox="0 0 220 51" fill="none">
      <path d="M1 21.0217L5.23772 15.0545C6.82461 12.8199 10.1378 12.807 11.7421 15.0291L14.5717 18.9484C15.4442 20.157 17.0437 20.5896 18.4065 19.9858C19.7298 19.3995 21.2822 19.7891 22.1719 20.9306L22.5467 21.4116C24.3943 23.7822 28.1101 23.29 29.2768 20.5201L32.356 13.2089C33.098 11.4472 35.4212 11.0571 36.6978 12.4799C37.6373 13.5269 39.2381 13.6395 40.3148 12.7343L41.0305 12.1326C42.1935 11.1549 43.8355 11.0696 45.2825 11.5331C49.5625 12.9039 55.824 12.1804 59.9153 3.32667C61.1218 0.715534 64.9772 0.0927732 66.4952 2.53603L66.6779 2.82993C67.5506 4.23467 69.4238 4.61868 70.7789 3.67068C72.1486 2.71242 74.0436 3.1164 74.9035 4.54998L79.0928 11.5347C79.6434 12.4526 80.8344 12.7496 81.7515 12.1976C83.0166 11.4361 84.646 12.3097 84.7637 13.7816C85.4245 22.0444 87.6716 34.613 92.96 39.636C94.0113 40.6346 95.6268 40.5473 96.6317 39.5021C97.7369 38.3526 98.9529 36.6945 99.8562 34.5554C100.747 32.4459 103.725 31.3898 105.349 33.0041C106.238 33.8877 107.622 34.033 108.676 33.3534L111.043 31.8258C112.86 30.6531 115.28 31.1372 116.507 32.9188L117.295 34.0645C118.585 35.939 121.178 36.3609 122.996 34.9923L124.286 34.0211C125.297 33.2603 126.608 33.0224 127.821 33.3797L128.536 33.5901C130.367 34.1291 132.324 33.2994 133.209 31.6085L136.275 25.753C137.718 22.9969 141.617 22.871 143.235 25.528L146.124 30.2718C146.919 31.578 148.718 31.8162 149.826 30.7623C150.879 29.7603 152.575 29.9185 153.425 31.0982L156.993 36.0506C158.111 37.6025 160.282 37.9422 161.821 36.8059C163.835 35.3186 166.741 36.4188 167.624 38.762C169.547 43.8651 173.152 49.5229 179.364 49.607C186.317 50.6025 200.016 49.1093 199.182 35.1732C198.347 21.2371 212.046 30.3619 219 36.6664" stroke="#22C134" stroke-width="2" stroke-linecap="round" />
    </svg>
  );
}

const PANEL_CARD =
  "rounded-[14px]";

function MarketsCard() {
  const t = usePathTranslation("marketNewsPage.trends");
  const [activeTimeframe, setActiveTimeframe] = useState("1M");

  return (
    <div className={clsx(PANEL_CARD, "p-43 md:p-3")}
      style={{
        borderRadius: "10px",
        background: "#FFF",
        boxShadow: "0 4px 30px 0 rgba(0, 0, 0, 0.15)",
      }}
    >
      <h3 className="Text font-semibold text-[#000032]">{t("markets", "Markets")}</h3>

      <div className="mt-3 flex overflow-x-auto">
        {MARKET_SUMMARIES.map((item, index) => (
          <div key={`${item.label}-${index}`} className="min-w-[108px] flex-1 px-3 first:pl-0 last:pr-0">
            <p className="text-xs truncate font-normal text-[#69729F]">{item.label}</p>
            <p className="TextSmall font-semibold text-[#000032]">{item.price}</p>
            <p
              className={clsx(
                "text-xs font-normal",
                item.trend === "up" ? "text-[#22A06B]" : "text-[#E34935]"
              )}
            >
              {item.change}
            </p>
          </div>
        ))}
      </div>

      <div className="relative mt-5 min-h-[230px] overflow-hidden  pt-8 md:min-h-[250px]">
        <p className="TextSmall absolute left-3 top-3 font-normal text-[#69729F]">10,230</p>
        <svg className="h-[185px] w-full md:h-[200px]" viewBox="0 0 560 220" preserveAspectRatio="none" aria-hidden>
          <defs>
            <linearGradient id="trendsChartFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E34935" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#E34935" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[55, 110, 165].map((y) => (
            <line key={y} x1="0" y1={y} x2="560" y2={y} stroke="#E8EDFA" strokeWidth="1" />
          ))}
          <path
            d="M0 150 C60 130, 90 170, 140 120 C190 70, 220 100, 280 80 C340 60, 380 110, 440 70 C500 30, 530 50, 560 40 L560 220 L0 220 Z"
            fill="url(#trendsChartFill)"
          />
          <path
            d="M0 150 C60 130, 90 170, 140 120 C190 70, 220 100, 280 80 C340 60, 380 110, 440 70 C500 30, 530 50, 560 40"
            fill="none"
            stroke="#E34935"
            strokeWidth="2.5"
          />
        </svg>
        <div className="mt-1 flex justify-between px-1">
          {["8 Oct", "15 Oct", "22 Oct", "29 Oct", "5 Nov"].map((label) => (
            <span key={label} className="text-[11px] font-normal text-[#69729F]">
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {CHART_TIMEFRAMES.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setActiveTimeframe(item)}
            className={clsx(
              "rounded-full px-3.5 py-1.5 text-xs font-normal transition",
              activeTimeframe === item
                ? "bg-[#293B93] text-white"
                : "bg-transparent text-[#141412] hover:text-[#293B93]"
            )}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

function WatchlistCard() {
  const t = usePathTranslation("marketNewsPage.trends");
  const tA11y = usePathTranslation("common.a11y");

  return (
    <div className={clsx("flex h-full flex-col p-3 md:p-3")}
      style={{
        borderRadius: "10px",
        background: "#FFF",
        boxShadow: "0 4px 30px 0 rgba(0, 0, 0, 0.15)",
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center text-[#293B93]">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="21" viewBox="0 0 13 21" fill="none">
              <path d="M10.5714 7.6457C10.6366 2.52686 6.42515 0.19541 6.10171 0C5.84341 0.130273 1.56685 2.46172 1.63199 7.6457C0.789702 8.22969 -0.11772 9.2 0.0125534 10.8846C0.142827 12.5691 1.8274 13.7349 2.47427 13.6697C3.12115 13.6046 2.92798 13.1509 2.92798 13.1509L3.12339 12.2435C3.12339 12.2435 4.09595 13.6697 4.35425 13.6697H7.85367C8.1771 13.6697 9.08453 12.2435 9.08453 12.2435L9.27994 13.1509C9.27994 13.1509 9.08453 13.6046 9.73365 13.6697C10.3805 13.7349 12.0651 12.5691 12.1954 10.8846C12.3211 9.2 11.4137 8.22744 10.5714 7.6457ZM7.94351 4.89648C7.94351 5.91396 7.11919 6.73828 6.10171 6.73828C5.08423 6.73828 4.25992 5.91396 4.25992 4.89648C4.25992 3.879 5.08423 3.05469 6.10171 3.05469C7.11919 3.05469 7.94351 3.879 7.94351 4.89648ZM4.57437 18.2113C4.57437 18.4943 4.29136 18.7773 4.00835 18.7773C3.72535 18.7773 3.44234 18.4943 3.44234 18.2113V15.4801C3.44234 15.1971 3.72535 14.9141 4.00835 14.9141C4.29136 14.9141 4.57437 15.1971 4.57437 15.4801V18.2113ZM6.66773 19.5298C6.66773 19.8128 6.38472 20.0958 6.10171 20.0958C5.81871 20.0958 5.5357 19.8128 5.5357 19.5298V15.4801C5.5357 15.1971 5.81871 14.9141 6.10171 14.9141C6.38472 14.9141 6.66773 15.1971 6.66773 15.4801V19.5298ZM8.81724 17.4566C8.81724 17.7396 8.53423 18.0227 8.25123 18.0227C7.96822 18.0227 7.68521 17.7396 7.68521 17.4566V15.4801C7.68521 15.1971 7.96822 14.9141 8.25123 14.9141C8.53423 14.9141 8.81724 15.1971 8.81724 15.4801V17.4566Z" fill="#293B93" />
            </svg>
          </span>
          <h3 className="Text font-Medium text-[#000032]">{t("watchlist", "Watchlist")}</h3>
          <svg className="h-4 w-4 text-[#69729F]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="flex items-center gap-2 text-[#293B93]">
          <button type="button" className="TextSmall text-[#000] font-medium hover:underline">
            {t("add", "Add")}
          </button>
          <button
            type="button"
            aria-label={tA11y("refreshWatchlist", "Refresh watchlist")}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-[#F0F3FA]"
          >
            <RefreshIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      <p className="TextSmall mt-4 font-normal text-[#969696]">{t("suggestedForYou", "Suggested for you")}</p>

      <ul className="mt-3 flex-1 space-y-0">
        {WATCHLIST_ITEMS.map((item) => (
          <li
            key={item.symbol}
            className="flex items-start justify-between gap-3 border-b border-[#EEF2FC] py-3 last:border-0"
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-xs font-normal text-[#212121]">{item.name}</p>
                {item.tag ? (
                  <span className="rounded-full bg-[#E8F7EE] px-2 py-0.5 text-[10px] font-medium text-[#22A06B]">
                    {item.tag}
                  </span>
                ) : null}
              </div>
              <p className="text-xs mt-0.5 font-normal text-[#959393]">{item.symbol}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-medium text-[#000032]">{item.price}</p>
              <p className={clsx("text-xs mt-0.5 font-normal", item.trend === "up" ? "text-[#22A06B]" : "text-[#E34935]")}>
                {item.change}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <button type="button" className="TextSmall mt-2 w-full text-center font-medium text-[#293B93] hover:underline">
        {t("goToWatchlist", "Go To Watchlist >")}
      </button>
    </div>
  );
}

function TrendingCard({ locale }) {
  const t = usePathTranslation("marketNewsPage.trends");

  return (
    <div className={clsx("flex h-full flex-col p-3 md:p-3")}
      style={{
        borderRadius: "10px",
        background: "#FFF",
        boxShadow: "0 4px 30px 0 rgba(0, 0, 0, 0.15)",
      }}
    >
      <h3 className="Text font-medium text-[#141412]">{t("trending", "Trending")}</h3>

      <ul className="trending-scroll mt-4 max-h-[380px] flex-1 space-y-4 overflow-y-auto pr-2">
        {TRENDING_NEWS.map((item) => (
          <li key={item.title}>
            <Link href={localizedHref(locale, item.href)} className="flex gap-3 hover:no-underline">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-[8px] bg-[#EDF0FB]">
        <Image src={item.image} alt={item.label || item.title || "Market asset"} fill className="object-cover" sizes="56px" />
              </div>
              <div className="min-w-0">
                <p className="text-xs inline-flex items-center gap-1.5 font-normal text-[#959393]">
                  <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" />
                  </svg>
                  {item.source} - {item.time}
                </p>
                <p className="text-xs mt-1 line-clamp-3 font-medium leading-[1.5] text-[#141412] hover:text-[#293B93]">
                  {item.title}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AssetCard({ card }) {
  const t = usePathTranslation("marketNewsPage.trends");
  const up = card.trend === "up";

  return (
    <div className={clsx("p-3")}
      style={{
        borderRadius: "10px",
        background: "#FFF",
        boxShadow: "0 4px 30px 0 rgba(0, 0, 0, 0.15)",
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <span
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white"
            style={{ backgroundColor: card.color }}
          >
            {card.symbol.slice(0, 1)}
          </span>
          <p className="text-xs truncate font-normal text-[#707070]">{card.name}</p>
        </div>
        <button type="button" aria-label={t("refreshAsset", "Refresh {name}").replace("{name}", card.name)} className="text-[#69729F] hover:text-[#293B93]">
          <RefreshIcon className="h-4 w-4" />
        </button>
      </div>

      <p className="TextSmall mt-2 font-semibold text-[#141412]">{card.price}</p>

      <span
        className={clsx(
          "text-xs inline-flex rounded-full px-2.5 py-0.5 font-normal",
          up ? "bg-[#22C134] text-[#fff]" : "bg-[#D31E27] text-[#fff]"
        )}
      >
        {card.change}
      </span>

      <div className="">
        <Sparkline trend={card.trend} />
      </div>
    </div>
  );
}

function TrendsTabBar({ activeTab, onChange }) {
  return (
    <div className="bg-[#293B93] px-3 py-1.5 md:px-4">
      <div className="flex items-end gap-1 overflow-x-auto">
        {TREND_TABS.map((tab) => {
          const isActive = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onChange(tab.key)}
              className={clsx(
                "shrink-0 px-4 py-2.5 text-sm font-semibold transition md:px-5 md:py-3",
                isActive
                  ? " bg-white text-[#293B93]"
                  : "text-white/85 hover:text-white"
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TrendsDashboard({ locale }) {
  const [activeTab, setActiveTab] = useState("finance");

  return (
    <div
      className="overflow-hidden"
    >
      <FadeInSection delay={0.1}>
        <TrendsTabBar activeTab={activeTab} onChange={setActiveTab} />
      </FadeInSection>
      <div className="space-y-4 px-2 py-4 md:py-6">
        <FadeInSection delay={0.2}>
          <div className="grid gap-3 xl:grid-cols-[1.5fr_0.95fr_0.95fr]">
            <MarketsCard />
            <WatchlistCard />
            <TrendingCard locale={locale} />
          </div>
        </FadeInSection>

        <FadeInSection delay={0.3}>
          <div className="grid mt-3 grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
            {ASSET_CARDS.map((card) => (
              <AssetCard key={card.symbol} card={card} />
            ))}
          </div>
        </FadeInSection>
      </div>
    </div>
  );
}

export default function MarketNewsTrendsSection({ locale = "en" }) {
  const t = usePathTranslation("marketNewsPage.trends");

  return (
    <section className="pb-10 pt-4 md:pb-14">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl">
          <FadeInSection>
            <div className="mb-5 flex items-center gap-4 md:mb-6">
              <h2 className="Text shrink-0 whitespace-nowrap font-bold tracking-[0.3em] text-[#212121]">
                {t("sectionTitle", "GTCFX & Market Trends")}
              </h2>
              <span className="h-px flex-1 bg-[#BFBFBF]" aria-hidden />
            </div>
          </FadeInSection>

          <TrendsDashboard locale={locale} />
        </div>
      </div>

      <style jsx global>{`
        .trending-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .trending-scroll::-webkit-scrollbar-thumb {
          background: #293b93;
          border-radius: 999px;
        }
        .trending-scroll::-webkit-scrollbar-track {
          background: #eef2fc;
          border-radius: 999px;
        }
      `}</style>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { motion } from "framer-motion";
import MobilePeekCarousel from "@/app/[locale]/components/common/MobilePeekCarousel";
import { usePathTranslation } from "../../LocaleProvider";
import { localizedHref } from "@/i18n/localizedHref";
import {
  buildInstrumentWidget,
  useMarketsInstrumentsData,
} from "../market-shared/hooks/useMarketsInstrumentsData";
import { useRouter } from "next/navigation";

function IconExternalLink({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
      <path d="M19.9225 23.9934H5.97261C4.8933 23.9924 3.85848 23.5632 3.09529 22.8C2.3321 22.0368 1.90288 21.002 1.90186 19.9226V5.9728C1.90288 4.89348 2.3321 3.85866 3.09529 3.09547C3.85848 2.33228 4.8933 1.90307 5.97261 1.90204H12.7158C12.9218 1.90204 13.1194 1.98389 13.2651 2.12958C13.4108 2.27527 13.4926 2.47286 13.4926 2.6789C13.4926 2.88494 13.4108 3.08254 13.2651 3.22822C13.1194 3.37391 12.9218 3.45576 12.7158 3.45576H5.97261C5.30526 3.45645 4.66545 3.72185 4.19356 4.19374C3.72167 4.66563 3.45627 5.30545 3.45558 5.9728V19.9226C3.45627 20.59 3.72167 21.2298 4.19356 21.7017C4.66545 22.1736 5.30526 22.439 5.97261 22.4397H19.9225C20.5898 22.439 21.2296 22.1736 21.7015 21.7017C22.1734 21.2298 22.4388 20.59 22.4395 19.9226V12.9477C22.4395 12.7417 22.5213 12.5441 22.667 12.3984C22.8127 12.2527 23.0103 12.1709 23.2164 12.1709C23.4224 12.1709 23.62 12.2527 23.7657 12.3984C23.9114 12.5441 23.9932 12.7417 23.9932 12.9477V19.9226C23.9922 21.002 23.563 22.0368 22.7998 22.8C22.0366 23.5632 21.0018 23.9924 19.9225 23.9934Z" fill="#293B93" />
      <path d="M23.8538 6.20194C23.8406 6.10013 23.8074 6.00195 23.7561 5.91305C23.7047 5.82416 23.6363 5.74632 23.5547 5.68403L18.8106 2.05868C18.7294 1.99679 18.6367 1.95151 18.5379 1.92543C18.4392 1.89935 18.3362 1.89299 18.235 1.90669C18.1337 1.9204 18.0362 1.95391 17.9479 2.00531C17.8596 2.05672 17.7823 2.12501 17.7204 2.20628C17.5955 2.37042 17.5408 2.5775 17.5685 2.78195C17.5961 2.9864 17.7039 3.17148 17.8681 3.29648L21.0208 5.69698C19.3515 5.91861 17.7269 6.39913 16.2056 7.12123C12.4507 8.92614 10.1616 12.0414 9.59188 16.1393C9.57782 16.2404 9.58381 16.3433 9.60952 16.442C9.63523 16.5408 9.68015 16.6335 9.74172 16.7149C9.80328 16.7963 9.88028 16.8648 9.96832 16.9165C10.0564 16.9681 10.1537 17.0019 10.2548 17.0159C10.2904 17.021 10.3263 17.0236 10.3623 17.0236C10.5503 17.0245 10.7323 16.9571 10.8744 16.834C11.0166 16.7109 11.1092 16.5405 11.1352 16.3542C11.6337 12.7651 13.5526 10.1393 16.8322 8.54288C18.2622 7.86349 19.7924 7.41928 21.3639 7.2274L18.7239 10.5614C18.6526 10.6403 18.5982 10.7329 18.5642 10.8337C18.5301 10.9344 18.5171 11.041 18.5259 11.147C18.5347 11.2529 18.5652 11.356 18.6155 11.4497C18.6657 11.5434 18.7347 11.6257 18.818 11.6917C18.9014 11.7577 18.9974 11.8059 19.1002 11.8332C19.2029 11.8606 19.3102 11.8665 19.4153 11.8508C19.5205 11.835 19.6213 11.7978 19.7115 11.7415C19.8017 11.6852 19.8793 11.611 19.9397 11.5234L23.6945 6.77941C23.758 6.69848 23.8047 6.60577 23.832 6.50664C23.8594 6.40751 23.8668 6.30395 23.8538 6.20194Z" fill="#293B93" />
    </svg>
  );
}

function IconDollar() {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF2FF]">

      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="20" viewBox="0 0 17 27" fill="none">
        <path d="M10.099 25.2475V26.9307H6.73267V25.2475C3.0297 25.2475 -3.94493e-08 22.2178 0 18.5149H3.36634C3.36634 20.3663 4.88119 21.8812 6.73267 21.8812V15.1485C3.0297 15.1485 -3.94493e-08 12.1188 0 8.41584C3.94493e-08 4.71287 3.0297 1.68317 6.73267 1.68317V0H10.099V1.68317C13.802 1.68317 16.8317 4.71287 16.8317 8.41584H13.4653C13.4653 6.56436 11.9505 5.0495 10.099 5.0495V11.7822H10.7723C11.9505 11.7822 13.4653 12.4554 14.6436 13.4653C15.9901 14.6436 17 16.495 17 18.5149C16.8317 22.2178 13.802 25.2475 10.099 25.2475ZM10.099 21.8812C11.9505 21.8812 13.4653 20.3663 13.4653 18.5149C13.4653 16.6634 11.9505 15.1485 10.099 15.1485V21.8812ZM6.73267 5.0495C4.88119 5.0495 3.36634 6.56436 3.36634 8.41584C3.36634 10.2673 4.88119 11.7822 6.73267 11.7822V5.0495Z" fill="#293B93" />
      </svg>
    </span>
  );
}

function InstrumentIcon({ src, alt }) {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF2FF]">
      <Image src={src} alt={alt} width={22} height={22} className="h-[20px] w-[20px]" />
    </span>
  );
}

function ArrowDownIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M8.541 13.175C8.45078 13.1401 8.36835 13.0876 8.29845 13.0207L4.62339 9.34563C4.55486 9.2771 4.50049 9.19574 4.46341 9.1062C4.42632 9.01666 4.40723 8.92069 4.40723 8.82377C4.40723 8.62803 4.48498 8.44032 4.62339 8.30191C4.69192 8.23338 4.77328 8.17902 4.86282 8.14193C4.95236 8.10484 5.04833 8.08575 5.14525 8.08575C5.34098 8.08575 5.5287 8.1635 5.66711 8.30191L8.0853 10.7275L8.0853 5.14871C8.0853 4.95377 8.16273 4.76682 8.30058 4.62898C8.43842 4.49114 8.62537 4.4137 8.82031 4.4137C9.01525 4.4137 9.2022 4.49114 9.34004 4.62898C9.47788 4.76682 9.55532 4.95377 9.55532 5.14871L9.55532 10.7275L11.9735 8.30191C12.0418 8.23302 12.1231 8.17834 12.2127 8.14102C12.3023 8.10371 12.3983 8.0845 12.4954 8.0845C12.5924 8.0845 12.6885 8.10371 12.778 8.14102C12.8676 8.17834 12.9489 8.23302 13.0172 8.30191C13.0861 8.37024 13.1408 8.45153 13.1781 8.5411C13.2154 8.63067 13.2346 8.72674 13.2346 8.82377C13.2346 8.9208 13.2154 9.01687 13.1781 9.10644C13.1408 9.19601 13.0861 9.2773 13.0172 9.34563L9.34217 13.0207C9.27226 13.0876 9.18984 13.1401 9.09961 13.175C8.92067 13.2486 8.71995 13.2486 8.541 13.175Z" fill="#CF4548" />
    </svg>
  );
}

function ArrowUpIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9.09929 4.46882C9.18951 4.5038 9.27194 4.55626 9.34184 4.62317L13.0169 8.29823C13.0854 8.36676 13.1398 8.44812 13.1769 8.53766C13.214 8.6272 13.2331 8.72317 13.2331 8.82009C13.2331 9.01583 13.1553 9.20354 13.0169 9.34195C12.9484 9.41048 12.867 9.46484 12.7775 9.50193C12.6879 9.53902 12.592 9.55811 12.495 9.55811C12.2993 9.55811 12.1116 9.48035 11.9732 9.34195L9.555 6.91641L9.555 12.4952C9.555 12.6901 9.47756 12.877 9.33972 13.0149C9.20187 13.1527 9.01492 13.2302 8.81998 13.2302C8.62505 13.2302 8.43809 13.1527 8.30025 13.0149C8.16241 12.877 8.08497 12.6901 8.08497 12.4952L8.08497 6.91641L5.66678 9.34195C5.59845 9.41084 5.51716 9.46552 5.42759 9.50284C5.33802 9.54015 5.24195 9.55936 5.14492 9.55936C5.04789 9.55936 4.95182 9.54015 4.86225 9.50284C4.77269 9.46552 4.69139 9.41084 4.62307 9.34195C4.55417 9.27362 4.49949 9.19233 4.46218 9.10276C4.42486 9.01319 4.40565 8.91712 4.40565 8.82009C4.40565 8.72306 4.42486 8.62699 4.46218 8.53742C4.49949 8.44785 4.55417 8.36656 4.62307 8.29823L8.29813 4.62317C8.36803 4.55626 8.45046 4.5038 8.54068 4.46882C8.71963 4.3953 8.92034 4.3953 9.09929 4.46882Z" fill="#04C120" />
    </svg>
  );
}

function TagPills({ items, selectedIndex = 0, onSelect, interactive = false }) {
  return (
    <ul className="mt-4 flex flex-wrap gap-2">
      {items.map((item, index) => (
        <li key={item.key}>
          {interactive ? (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onSelect?.(index);
              }}
              className={clsx(
                "inline-flex rounded-full px-3 py-1 text-xs font-semibold transition",
                selectedIndex === index
                  ? "bg-[#293B93] text-white"
                  : "bg-[#EEF2FF] text-[#293B93] hover:bg-[#DCE4FF]"
              )}
            >
              {item.label}
            </button>
          ) : (
            <span className="inline-flex rounded-full bg-[#EEF2FF] px-3 py-1 text-xs font-semibold text-[#293B93]">
              {item.label}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

function InstrumentTradingWidget({ widget, t, router }) {
  if (!widget) return null;

  return (
    <div
      className="mt-5 p-3 sm:p-3"
      style={{
        borderRadius: "16.707px",
        border: "0.835px solid #EBEBEB",
        background: "#FFF",
      }}
    >
      <div className="flex items-center justify-between gap-2">
        <p className="Text font-bold text-[#111827]">{widget.symbol}</p>
        <span className="flex h-9 w-9 items-center justify-center">
          <IconExternalLink className="h-6 w-6 text-[#293B93]" />
        </span>
      </div>

      <div className="relative mt-4 grid grid-cols-2 gap-4">
        <span className="pointer-events-none absolute left-1/2 top-[20%] z-[2] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white px-3 py-1 text-xs font-normal leading-none text-[#293B93] shadow-[0_8px_22px_rgba(15,23,42,0.14)]">
          {widget.lotSize}
        </span>

        <div className="rounded-xl cursor-pointer bg-[#d84747] px-2.5 py-2.5 text-white"
        onClick={() => {
          router.push(`live-account-application`);
        }}
        >
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs font-semibold uppercase tracking-wide text-white/95">
              {t("widget.sell", "SELL")}
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between gap-3">
            <p className="Text font-medium leading-none tracking-tight text-white">
              {widget.sellPrice}
            </p>
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-white/95 text-[#d84747]">
              <ArrowDownIcon />
            </span>
          </div>
        </div>

        <div className="rounded-xl cursor-pointer bg-[#10b51a] px-2.5 py-2.5 text-white"
            onClick={() => {
              router.push(`live-account-application`);
            }}
        >
          <div className="flex items-center justify-end gap-3">
            <span className="text-right text-xs font-semibold uppercase tracking-wide text-white/95">
              {t("widget.buy", "BUY")}
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between gap-3">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-white/95 text-[#10b51a]">
              <ArrowUpIcon />
            </span>
            <p className="Text font-medium leading-none tracking-tight text-white">
              {widget.buyPrice}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4 text-xs text-[#999999]">
        <span>
          {t("widget.low", "Low")}: {widget.low}
        </span>
        <span>
          {t("widget.high", "High")}: {widget.high}
        </span>
      </div>

      <div className="mt-4">
        <div className="flex h-2.5 overflow-hidden rounded-full bg-[#e8ecf2]">
          <span
            className="bg-[#d84747]"
            style={{ width: `${widget.sellersPercent}%` }}
            aria-hidden
          />
          <span className="flex-1 bg-[#10b51a]" aria-hidden />
        </div>

        <div className="mt-3 grid grid-cols-2 items-start gap-6">
          <div>
            <p className="text-xs font-normal text-[#888888]">
              {t("widget.sellers", "Sellers")}
            </p>
            <p className="Text mt-1 font-bold leading-none text-[#d84747]">
              {widget.sellersPercent}%
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs font-normal text-[#888888]">
              {t("widget.buyers", "Buyers")}
            </p>
            <p className="Text mt-1 font-bold leading-none text-[#10b51a]">
              {widget.buyersPercent}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function InstrumentCard({ instrument, t, locale, isFeatured, liveQuotes, className = "" }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const href = localizedHref(locale, instrument.href);
  const title = t(`cards.${instrument.key}.title`, instrument.titleFallback);
  const description = t(
    `cards.${instrument.key}.description`,
    instrument.descriptionFallback
  );
  const learnMore = t("learnMore", "Learn more");
  const router = useRouter();

  const apiSymbols = instrument.symbols ?? [];
  const hasApiSymbols = apiSymbols.length > 0;

  useEffect(() => {
    setSelectedIndex(0);
  }, [instrument.key, apiSymbols.length]);

  const safeIndex = Math.min(selectedIndex, Math.max(apiSymbols.length - 1, 0));
  const selectedSymbol = hasApiSymbols ? apiSymbols[safeIndex] : null;

  const pillItems = hasApiSymbols
    ? apiSymbols.map((row) => ({ key: row.rawSymbol || row.symbol, label: row.symbol }))
    : instrument.tagKeys.map((tagKey) => ({
        key: tagKey,
        label: t(`cards.${instrument.key}.tags.${tagKey}`, instrument.tagsFallback[tagKey]),
      }));

  const widget =
    isFeatured && selectedSymbol
      ? buildInstrumentWidget(selectedSymbol, liveQuotes)
      : null;

  const icon =
    instrument.key === "forex" ? (
      <IconDollar />
    ) : (
      <InstrumentIcon src={instrument.icon} alt="" />
    );

  return (
    <article
      className={`flex h-full min-w-0 flex-col p-5 transition-shadow duration-200 hover:shadow-[0_4px_50px_rgba(41,59,147,0.15)] sm:p-6 ${className}`}
      style={{
        borderRadius: "16.993px",
        border: "0.566px solid #B3C0FF",
        background: "#FFF",
      }}
    >
      <div className="flex items-center gap-3">
        {icon}
        <h3 className="Text font-bold text-[#293B93]">{title}</h3>
      </div>

      <p className="TextSmall mt-3 flex-1 font-normal leading-[1.5] text-[#666666]">
        {description}
      </p>

      {isFeatured && widget ? (
        <InstrumentTradingWidget widget={widget} t={t} router={router} />
      ) : null}

      <TagPills
        items={pillItems}
        selectedIndex={safeIndex}
        onSelect={setSelectedIndex}
        interactive={isFeatured && hasApiSymbols}
      />

      <Link
        href={href}
        className="text-xs mt-5 inline-flex w-fit items-center gap-1 font-semibold text-[#293B93] transition hover:text-[#243575] hover:no-underline"
      >
        {learnMore}
        <span aria-hidden>→</span>
      </Link>
    </article>
  );
}

const INSTRUMENTS = [
  {
    key: "forex",
    href: "/markets/forex",
    icon: "/home/forex.svg",
    titleFallback: "Forex CFDs",
    descriptionFallback:
      "With a Tightest Spread Starting from 0 PIPS Offering Leverage up to 1:2000 & No restriction",
    tagKeys: ["tag1", "tag2", "tag3"],
    tagsFallback: { tag1: "EURUSD", tag2: "GBPUSD", tag3: "USDCHF" },
  },
  {
    key: "indices",
    href: "/markets/indices",
    icon: "/home/indices.svg",
    titleFallback: "Indices Trading",
    descriptionFallback:
      "Take positions on 81 global indices — from the S&P 500 to FTSE 100 and Nikkei 225.",
    tagKeys: ["tag1", "tag2", "tag3"],
    tagsFallback: { tag1: "S&P 500", tag2: "NASDAQ", tag3: "FTSE 100" },
  },
  {
    key: "energy",
    href: "/markets/energy",
    icon: "/home/energy.svg",
    titleFallback: "Energy CFDs",
    descriptionFallback:
      "Capitalise on global energy price movements — crude oil, natural gas, and heating oil with tight spreads.",
    tagKeys: ["tag1", "tag2", "tag3"],
    tagsFallback: { tag1: "Crude Oil", tag2: "Nat. Gas", tag3: "Brent" },
  },
  {
    key: "future-cfds",
    href: "/markets/future-cfds",
    icon: "/home/commed.svg",
    titleFallback: "Future CFDs",
    descriptionFallback:
      "Trade leading futures contracts with competitive spreads, flexible leverage, and fast execution.",
    tagKeys: ["tag1", "tag2", "tag3"],
    tagsFallback: { tag1: "Future 1", tag2: "Future 2", tag3: "Future 3" },
  },
  {
    key: "metals",
    href: "/markets/metals",
    icon: "/home/first.svg",
    titleFallback: "Metal CFDs",
    descriptionFallback:
      "Trade Gold, Silver, and Platinum with ultra-competitive spreads — Gold starting at just 4c.",
    tagKeys: ["tag1", "tag2", "tag3"],
    tagsFallback: { tag1: "Gold", tag2: "Silver", tag3: "Platinum" },
  },
];

const CAROUSEL_ORDER = ["forex", "energy", "indices", "future-cfds", "metals"];

function getPosition(cardKey, hoveredKey) {
  const defaults = {
    forex: { col: "1 / 2", row: "1 / 2" },
    indices: { col: "1 / 2", row: "2 / 3" },
    energy: { col: "2 / 3", row: "1 / 3" },
    "future-cfds": { col: "3 / 4", row: "1 / 2" },
    metals: { col: "3 / 4", row: "2 / 3" },
  };

  if (!hoveredKey || hoveredKey === "energy") return defaults[cardKey];

  const span2 = { col: defaults[hoveredKey].col, row: "1 / 3" };

  if (hoveredKey === "forex") {
    return {
      forex: span2,
      indices: { col: "2 / 3", row: "1 / 2" },
      energy: { col: "2 / 3", row: "2 / 3" },
      "future-cfds": defaults["future-cfds"],
      metals: defaults.metals,
    }[cardKey];
  }

  if (hoveredKey === "indices") {
    return {
      forex: { col: "2 / 3", row: "1 / 2" },
      indices: span2,
      energy: { col: "2 / 3", row: "2 / 3" },
      "future-cfds": defaults["future-cfds"],
      metals: defaults.metals,
    }[cardKey];
  }

  if (hoveredKey === "future-cfds") {
    return {
      forex: defaults.forex,
      indices: defaults.indices,
      energy: { col: "2 / 3", row: "1 / 2" },
      "future-cfds": span2,
      metals: { col: "2 / 3", row: "2 / 3" },
    }[cardKey];
  }

  if (hoveredKey === "metals") {
    return {
      forex: defaults.forex,
      indices: defaults.indices,
      energy: { col: "2 / 3", row: "1 / 2" },
      "future-cfds": { col: "2 / 3", row: "2 / 3" },
      metals: span2,
    }[cardKey];
  }

  return defaults[cardKey];
}

export default function MarketsInstrumentsSection({ locale = "en" }) {
  const t = usePathTranslation("marketsPage.instrumentsSection");
  const { symbolsByKey, liveQuotes } = useMarketsInstrumentsData();
  const [hoveredKey, setHoveredKey] = useState("energy");
  const leaveTimeoutRef = useRef(null);
  const isAnimatingRef = useRef(false);

  const instruments = INSTRUMENTS.map((item) => ({
    ...item,
    symbols: symbolsByKey[item.key] ?? [],
  }));

  const handleEnter = (key) => {
    if (isAnimatingRef.current) return;
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    if (key !== hoveredKey) {
      isAnimatingRef.current = true;
      setHoveredKey(key);
    }
  };

  const handleLayoutComplete = () => {
    isAnimatingRef.current = false;
  };

  const handleLeaveGrid = () => {
    leaveTimeoutRef.current = setTimeout(() => {
      setHoveredKey("energy");
    }, 150);
  };

  const byKey = Object.fromEntries(instruments.map((item) => [item.key, item]));
  const carouselItems = CAROUSEL_ORDER.map((key) => byKey[key]).filter(Boolean);

  return (
    <section className="overflow-x-hidden bg-white pt-4 md:pt-6">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl">
          <h2 className="HeadingH2 text-[#293B93]">
            {t("title", "Market Instruments")}
          </h2>

          <div className="mt-8 min-w-0 lg:hidden">
            <MobilePeekCarousel
              items={carouselItems}
              showArrows
              className="w-full min-w-0"
              trackClassName="-mx-4 px-4 min-w-0"
              slideClassName="!h-auto"
              renderItem={(instrument) => (
                <div className="w-full min-w-0">
                  <InstrumentCard
                    instrument={instrument}
                    t={t}
                    locale={locale}
                    liveQuotes={liveQuotes}
                    isFeatured
                  />
                </div>
              )}
            />
          </div>

          <div
            className="mt-8 hidden min-w-0 gap-4 lg:grid lg:grid-cols-3 lg:grid-rows-2 lg:gap-4"
            onMouseLeave={handleLeaveGrid}
          >
            {instruments.map((instrument) => {
              const isFeatured = instrument.key === hoveredKey;
              const pos = getPosition(instrument.key, hoveredKey);
              return (
                <motion.div
                  key={instrument.key}
                  layout
                  transition={{ type: "spring", stiffness: 120, damping: 20 }}
                  style={{ gridColumn: pos.col, gridRow: pos.row }}
                  onMouseEnter={() => handleEnter(instrument.key)}
                  onLayoutAnimationComplete={handleLayoutComplete}
                >
                  <InstrumentCard
                    instrument={instrument}
                    t={t}
                    locale={locale}
                    liveQuotes={liveQuotes}
                    isFeatured={isFeatured}
                    className="h-full"
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

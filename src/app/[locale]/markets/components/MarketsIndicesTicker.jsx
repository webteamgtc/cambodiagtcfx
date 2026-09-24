"use client";

import { useMemo } from "react";
import { usePathTranslation } from "../../LocaleProvider";

const UP_CLASS = "text-[#1AAF5D]";
const DOWN_CLASS = "text-[#e74c3c]";

const INDICES_DATA = [
  {
    key: "sp500",
    nameKey: "sp500",
    nameFallback: "S&P 500",
    price: "5,304.72",
    change: "+0.41%",
  },
  {
    key: "nasdaq",
    nameKey: "nasdaq",
    nameFallback: "NASDAQ",
    price: "5,304.72",
    change: "+0.41%",
  },
  {
    key: "ftse",
    nameKey: "ftse",
    nameFallback: "FTSE 100",
    price: "8,201.33",
    change: "-0.22%",
  },
  {
    key: "dax",
    nameKey: "dax",
    nameFallback: "DAX40",
    price: "18,492.10",
    change: "+0.48%",
  },
  {
    key: "nikkei",
    nameKey: "nikkei",
    nameFallback: "Nikkei",
    price: "38,765.20",
    change: "-0.55%",
  },
];

function TrendIcon({ positive }) {
  if (positive) {
    return (
      <svg
        width="8"
        height="8"
        viewBox="0 0 12 12"
        fill="currentColor"
        className="shrink-0"
        aria-hidden
      >
        <path d="M6 1.5L10.5 8.5H1.5L6 1.5Z" />
      </svg>
    );
  }
  return (
    <svg
      width="8"
      height="8"
      viewBox="0 0 12 12"
      fill="currentColor"
      className="shrink-0"
      aria-hidden
    >
      <path d="M6 10.5L1.5 3.5H10.5L6 10.5Z" />
    </svg>
  );
}

function TickerSeparator() {
  return (
    <span
      className="mx-6 inline-flex h-3.5 w-px shrink-0 bg-[#d8dde8] sm:mx-8 md:mx-10"
      aria-hidden
    />
  );
}

function TickerItem({ item, t }) {
  const isUp = item.change.trim().startsWith("+");
  const tone = isUp ? UP_CLASS : DOWN_CLASS;
  const name = t(`items.${item.nameKey}`, item.nameFallback);

  return (
    <span
      className="inline-flex shrink-0 items-center whitespace-nowrap"
      role="group"
      aria-label={`${name} ${item.price} ${item.change}`}
    >
      <span className="TextSmall font-bold leading-none text-[#293B93]">
        {name}
      </span>
      <span className="TextSmall ms-2 font-normal leading-none tabular-nums text-[#293B93] sm:ms-2.5">
        {item.price}
      </span>
      <span
        className={`ms-2 inline-flex items-center gap-1 TextSmall font-normal leading-none tabular-nums sm:ms-2.5 ${tone}`}
      >
        <TrendIcon positive={isUp} />
        {item.change}
      </span>
    </span>
  );
}

export default function MarketsIndicesTicker() {
  const t = usePathTranslation("marketsPage.indicesTickerSection");

  const loopItems = useMemo(() => {
    const doubled = [...INDICES_DATA, ...INDICES_DATA];
    return doubled.length >= 4 ? doubled : [...doubled, ...doubled];
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        border: "1px solid #E1E7F6",
        background: "linear-gradient(180deg, rgba(255, 255, 255, 0.15) 46.03%, rgba(183, 190, 222, 0.13) 71.98%, rgba(41, 59, 147, 0.04) 100%)",
      }}
      aria-label={t("sectionAria", "Global indices prices")}
    >
      <div className="gtc-markets-indices-ticker__viewport relative overflow-hidden py-3 sm:py-5">
        <div className="gtc-markets-indices-ticker__track flex min-w-max items-center">
          {loopItems.map((item, index) => (
            <span
              key={`${item.key}-${index}`}
              className="inline-flex items-center ps-6 sm:ps-8 md:ps-10"
            >
              <TickerItem item={item} t={t} />
              <TickerSeparator />
            </span>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .gtc-markets-indices-ticker__track {
          animation: gtc-markets-indices-ticker-marquee 40s linear infinite;
          will-change: transform;
        }

        .gtc-markets-indices-ticker__track:hover {
          animation-play-state: paused;
        }

        @keyframes gtc-markets-indices-ticker-marquee {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-50%, 0, 0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .gtc-markets-indices-ticker__track {
            animation: none !important;
            flex-wrap: wrap;
            justify-content: center;
            row-gap: 0.5rem;
            width: auto;
            min-width: 0;
          }
        }
      `}</style>
    </section>
  );
}

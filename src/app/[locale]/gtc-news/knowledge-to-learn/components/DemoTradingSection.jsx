"use client";

import Image from "next/image";
import Link from "next/link";
import RevealOnScroll from "@/app/[locale]/components/RevealOnScroll";
import { usePathTranslation } from "../../../LocaleProvider";
import { FiArrowRight } from "react-icons/fi";
import MobilePeekCarousel from "@/app/[locale]/components/common/MobilePeekCarousel";

const REGISTER_HREF =
  "/live-account-application";

/* ── Ticker Data ── */

const TICKER_ITEMS = [
  { pair: "BTC/USD", value: "67,284.50", change: "+2.34%", positive: true },
  { pair: "ETH/USD", value: "3,512.80", change: "+1.87%", positive: true },
  { pair: "SOL/USD", value: "182.45", change: "-0.62%", positive: false },
  { pair: "AAPL", value: "214.30", change: "+0.95%", positive: true },
  { pair: "TSLA", value: "249.70", change: "-1.23%", positive: false },
];

/* ── Feature Card Data ── */

const FEATURE_CARDS = [
  {
    key: "tightestSpread",
    title: "Tightest Spread",
    description:
      "Experience competitive spreads designed ",
  },
  {
    key: "bestLeverage",
    title: "Best Leverage",
    description:
      "Providing the highest leverage, up to 1:2000",
  },
  {
    key: "tradingInstrument",
    title: "Trading Instrument",
    description:
      "Access to 7+ trading markets including Forex, Metals, Indices, Shares, Crypto & more across",
  },
  {
    key: "ultraFastExecution",
    title: "Ultra-fast Execution",
    description:
      "Trade with top-tier liquidity for fast",
  },
];

/* ── Feature Card Icons ── */

function PieSliceIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="#293B93" strokeWidth="1.8" />
      <path d="M12 3V12L18.5 15.5" stroke="#293B93" strokeWidth="1.8" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function BarChartArrowIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="14" width="3" height="8" rx="0.5" fill="#293B93" />
      <rect x="9" y="8" width="3" height="14" rx="0.5" fill="#293B93" />
      <rect x="14" y="12" width="3" height="10" rx="0.5" fill="#293B93" />
      <path d="M19 6L21 4M21 4L19 4M21 4V6" stroke="#293B93" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MonitorGraphIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="4" width="18" height="14" rx="2" stroke="#293B93" strokeWidth="1.8" />
      <line x1="8" y1="20" x2="16" y2="20" stroke="#293B93" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M7 13L10 9L13 11L17 7" stroke="#293B93" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BalanceScaleIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="12" y1="4" x2="12" y2="18" stroke="#293B93" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="6" y1="18" x2="18" y2="18" stroke="#293B93" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="12" y1="4" x2="5" y2="10" stroke="#293B93" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="12" y1="4" x2="19" y2="10" stroke="#293B93" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="5" cy="10" r="3" stroke="#293B93" strokeWidth="1.5" fill="none" />
      <circle cx="19" cy="10" r="3" stroke="#293B93" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

const FEATURE_ICONS = {
  tightestSpread: PieSliceIcon,
  bestLeverage: BarChartArrowIcon,
  tradingInstrument: MonitorGraphIcon,
  ultraFastExecution: BalanceScaleIcon,
};

/* ── Feature Card ── */

function FeatureCard({ cardKey, title, description, delay = 0 }) {
  const Icon = FEATURE_ICONS[cardKey] || PieSliceIcon;
  return (
    <RevealOnScroll delay={delay}>
      <div
        className="flex flex-col rounded-2xl bg-white px-6 py-6 sm:px-7 sm:py-7"
        style={{
          border: "1px solid #E1E7F6",
          boxShadow: "0 4px 30px 0 rgba(41, 59, 147, 0.08)",
        }}
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F0F2F8]">
          <Icon className="h-5 w-5" />
        </span>

        <h4 className="HeadingH5 mt-4 font-semibold text-[#111827]">{title}</h4>
        <p className="TextSmall mt-3 leading-relaxed text-[#666666]">{description}</p>
      </div>
    </RevealOnScroll>
  );
}

/* ── Section ── */

export default function DemoTradingSection({ locale = "en" }) {
  const t = usePathTranslation("knowledgePage.demoTrading");

  return (
    <section
      className="relative pb-14 md:pb-14 lg:pb-16"
      style={{
        background: "linear-gradient(180deg, #FFFFFF 0%, #F0F1F6 50%, #E8EAF2 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto ">

        <div className="flex flex-col items-center justify-center mb-10">
     <h2 className="HeadingH3 mt-3 font-bold text-[#293B93]">
                {t("title", "Free Demo Account")}
              </h2>
        </div>
        {/* ── Hero: Title + Device Image + Buttons ── */}
       <div className="grid gap-8 lg:grid-cols-[60%_40%] lg:gap-5 xl:gap-6">
  {/* Left: Device Image */}
  <RevealOnScroll>
    <div className="relative w-full h-[250px] md:h-[350px]">
      <Image
        src="/knowledge2.webp"
        alt="Free Demo Account Platform"
       fill
        className="object-contain"
      />
    </div>
  </RevealOnScroll>

  {/* Right: Text + Buttons */}
  <div className="flex flex-col justify-center">
    <RevealOnScroll delay={100}>
      <p className="HeadingH4 my-5 text-[#293B93]">
        {t(
          "headline",
          "Invest with the World's Premier Online Trading Platform."
        )}
      </p>

      <p>
        {t(
          "description",
          "Trade across 7+ markets with the most stable platform, our MetaTrader Platform offers favorable spreads."
        )}
      </p>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:gap-5">
        <Link
          href={REGISTER_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="TextButton inline-flex h-11 w-full items-center justify-center rounded-full bg-[#293B93] px-7 text-white shadow-[0_6px_20px_rgba(41,59,147,0.35)] transition hover:bg-[#243575] hover:no-underline sm:w-auto sm:px-8"
        >
          {t("openLiveAccount", "Open Live Account")}
          <FiArrowRight className="ml-2 h-4 w-4 shrink-0" aria-hidden />
        </Link>

        <Link
          href="/trading/free-demo-account"
          className="TextButton inline-flex h-11 w-full items-center justify-center rounded-full border border-[#293B93] bg-white/90 px-7 text-[#293B93] transition hover:bg-white hover:no-underline sm:w-auto sm:px-8"
        >
          {t("openDemoAccount", "Open Demo Account")}
        </Link>
      </div>
    </RevealOnScroll>
  </div>
</div>
        {/* ── Crypto Ticker Card ── */}
        <RevealOnScroll delay={200}>
          <div
            className="mt-10 md:mt-14 rounded-2xl bg-[#F5F6FA] px-5 py-4 sm:px-6 sm:py-5"
            style={{
              border: "1px solid #E1E7F6",
              boxShadow: "0 4px 24px 0 rgba(41, 59, 147, 0.08)",
            }}
          >
            <div className="flex flex-wrap items-center justify-between gap-4 sm:gap-0">
              {TICKER_ITEMS.map((item, index) => (
                <div key={index} className="flex flex-col items-center justify-center md:px-12"
                style={{
            borderRight: index !== TICKER_ITEMS.length - 1 ? "1px solid #E1E7F6" : "none",
          }}
                >
                  <span className="TextSmall font-semibold text-[#111827]">{item.pair}</span>
                  <span className="TextSmall text-[#444444]">{item.value}</span>
                  <span
                    className={`TextSmall font-semibold ${
                      item.positive ? "text-[#16A34A]" : "text-[#DC2626]"
                    }`}
                  >
                    {item.change}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* ── Feature Cards Grid — desktop ── */}
        <div className="mt-10 hidden gap-5 sm:grid sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-6">
          {FEATURE_CARDS.map((card, index) => (
            <FeatureCard
              key={card.key}
              cardKey={card.key}
              title={t(`features.${card.key}.title`, card.title)}
              description={t(`features.${card.key}.description`, card.description)}
              delay={index * 80}
            />
          ))}
        </div>

        {/* ── Feature Cards Carousel — mobile only ── */}
        <div className="mt-8 sm:hidden w-full overflow-hidden">
          <MobilePeekCarousel
            items={FEATURE_CARDS}
            renderItem={(card) => (
              <div className="w-full px-1">
                <FeatureCard
                  cardKey={card.key}
                  title={t(`features.${card.key}.title`, card.title)}
                  description={t(`features.${card.key}.description`, card.description)}
                />
              </div>
            )}
          />
        </div>
      </div>
    </section>
  );
}
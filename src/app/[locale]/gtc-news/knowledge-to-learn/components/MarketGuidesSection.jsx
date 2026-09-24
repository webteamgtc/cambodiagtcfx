"use client";

import Image from "next/image";
import Link from "next/link";
import RevealOnScroll from "@/app/[locale]/components/RevealOnScroll";
import { usePathTranslation } from "../../../LocaleProvider";
import { FiArrowRight } from "react-icons/fi";
import MobilePeekCarousel from "@/app/[locale]/components/common/MobilePeekCarousel";

/* ── SVG Icons for Market Cards ── */

function StockMarketIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="32" height="32" rx="8" stroke="#293B93" strokeWidth="2" />
      <rect x="10" y="22" width="4" height="8" rx="1" fill="#293B93" />
      <rect x="18" y="16" width="4" height="14" rx="1" fill="#293B93" />
      <rect x="26" y="10" width="4" height="20" rx="1" fill="#293B93" />
    </svg>
  );
}

function ForexMarketIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="32" height="32" rx="8" stroke="#293B93" strokeWidth="2" />
      <text x="11" y="26" fontSize="16" fontWeight="700" fill="#293B93" fontFamily="system-ui">$</text>
      <text x="23" y="26" fontSize="16" fontWeight="700" fill="#293B93" fontFamily="system-ui">$</text>
      <line x1="20" y1="10" x2="20" y2="30" stroke="#293B93" strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

function IndicesMarketIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="32" height="32" rx="8" stroke="#293B93" strokeWidth="2" />
      <path d="M10 28L17 18L23 22L30 12" stroke="#293B93" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M26 12L30 12L30 16" stroke="#293B93" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CommoditiesIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="32" height="32" rx="8" stroke="#293B93" strokeWidth="2" />
      <rect x="11" y="20" width="5" height="10" rx="1" fill="#293B93" />
      <rect x="18" y="14" width="5" height="16" rx="1" fill="#293B93" />
      <rect x="25" y="18" width="5" height="12" rx="1" fill="#293B93" />
      <line x1="10" y1="31" x2="31" y2="31" stroke="#293B93" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CryptoIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="32" height="32" rx="8" stroke="#293B93" strokeWidth="2" />
      <circle cx="20" cy="20" r="9" stroke="#293B93" strokeWidth="2" />
      <path d="M17 16V24H20.5C22.5 24 24 22.5 24 20.5V19.5C24 17.5 22.5 16 20.5 16H17Z" stroke="#293B93" strokeWidth="2" fill="none" />
      <line x1="17" y1="20" x2="23" y2="20" stroke="#293B93" strokeWidth="1.5" />
      <line x1="16" y1="18" x2="24" y2="18" stroke="#293B93" strokeWidth="1" opacity="0.5" />
      <line x1="16" y1="22" x2="24" y2="22" stroke="#293B93" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

function BondDerivativesIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="32" height="32" rx="8" stroke="#293B93" strokeWidth="2" />
      <rect x="12" y="8" width="16" height="22" rx="2" stroke="#293B93" strokeWidth="1.8" fill="none" />
      <line x1="16" y1="14" x2="24" y2="14" stroke="#293B93" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="16" y1="18" x2="24" y2="18" stroke="#293B93" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="16" y1="22" x2="22" y2="22" stroke="#293B93" strokeWidth="1.5" strokeLinecap="round" />
      <text x="17" y="30" fontSize="8" fontWeight="700" fill="#293B93" fontFamily="system-ui">$</text>
    </svg>
  );
}

/* ── Bullet Triangle Icon ── */

function BulletTriangle({ className }) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 2L9 6L3 10V2Z" fill="#293B93" />
    </svg>
  );
}

/* ── Market Card Data ── */

const MARKET_CARDS = [
  { key: "stockMarket", Icon: StockMarketIcon, title: "Stock Market", href: "/forex" },
  { key: "forexMarket", Icon: ForexMarketIcon, title: "Forex Market", href: "/forex" },
  { key: "indicesMarket", Icon: IndicesMarketIcon, title: "Indices Market", href: "/indices" },
  { key: "commodities", Icon: CommoditiesIcon, title: "Commodities", href: "/commodities" },
  { key: "cryptocurrency", Icon: CryptoIcon, title: "Cryptocurrency", href: "/forex" },
  { key: "bondDerivatives", Icon: BondDerivativesIcon, title: "Bond & Derivatives", href: "/forex" },
];

/* ── Forex Bullets ── */

const FOREX_BULLETS = [
  "Major pairs: EURUSD, GBPUSD, USDJPY",
  "Best trading sessions and overlap hours",
  "How central banks influence currency prices",
  "Carry trade strategies explained",
];

/* ── Market Card ── */

function MarketCard({ Icon, title, href, viewLink, delay = 0 }) {
  return (
    <RevealOnScroll delay={delay}>
      <Link
        href={href}
        className="group flex items-center gap-3 rounded-2xl border border-gray-200 bg-[#F0F2F8] px-5 py-4 transition-all hover:bg-[#fff] hover:no-underline sm:px-6 sm:py-5"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white">
          <Icon className="h-6 w-6" />
        </span>
        <span className="HeadingH6 flex-1 font-semibold text-[#111827]">{title}</span>
        <span className="TextSmall font-medium text-[#293B93] transition-colors group-hover:text-[#1d2866]">
          {viewLink}
        </span>
      </Link>
    </RevealOnScroll>
  );
}

/* ── Section ── */

export default function MarketGuidesSection({ locale = "en" }) {
  const t = usePathTranslation("knowledgePage.marketGuides");
  const viewLink = t("viewLink", "view →");

  return (
    <section className="bg-[#fff] pb-14 md:pb-20 lg:pb-24">
      <div className="container">
        {/* ── Top: Market Guides ── */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-14">
             {/* Right: Phone Image */}
          <RevealOnScroll delay={200}>
                <h2 className="HeadingH3 mt-3 font-bold text-[#293B93]">
                {t("title", "Market Guides")}
              </h2> 
            <div className="flex items-center justify-center">
              {/*
                TODO: Update the image src path below to your actual phone/dashboard image
              */}
              <Image
                src="/new-design/knowlegde-3.webp"
                alt="Market Guides Trading App"
                width={520}
                height={480}
                className="h-auto w-full max-w-[520px] object-contain"
                sizes="(max-width: 1024px) 100vw, 520px"
              />
            </div>
          </RevealOnScroll>
          {/* Left: Text */}
          <div className="flex flex-col justify-center">
            <RevealOnScroll>
        
              <p className="HeadingH4 font-semibold mt-4 text-[#000000]"> 
                {t(
                  "subtitle",
                  "Different asset classes offer different opportunities, risk profiles, and trading hours."
                )}
              </p>
              <p className="Text mt-5">
                {t(
                  "forexIntro",
                  "The largest and most liquid market in the world. Trade major, minor, and exotic currency pairs around the clock."
                )}
              </p>
              <ul className="mt-5 space-y-3">
                {FOREX_BULLETS.map((bullet, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <BulletTriangle className="mt-1 h-3 w-3 shrink-0" />
                    <span className="TextSmall leading-relaxed text-[#444444]">
                      {t(`forexBullets.${index}`, bullet)}
                    </span>
                  </li>
                ))}
              </ul>
            </RevealOnScroll>
       {/* ── Middle: Commodities & Indices ── */}
        <RevealOnScroll>
          <div className="pt-7 md:pt-10 mt-7 md:mt-10 border-t border-[#D9D9D9]">
            <h3 className="HeadingH4 font-semibold mt-4 text-[#000000]">
              {t("commoditiesTitle", "Commodities & Indices")}
            </h3>
            <p className="Text mt-3 max-w-2xl text-[#666666]">
              {t(
                "commoditiesDesc",
                "Diversify beyond currencies with precious metals, energy products, and global stock indices."
              )}
            </p>
          </div>
        </RevealOnScroll>

          </div>

         
        </div>

 

        {/* ── Bottom: Cryptocurrency Trading (left) + Market Cards Grid (right) ── */}
<div className="mt-14 md:mt-20 lg:grid lg:grid-cols-[25%_75%] lg:items-center lg:gap-10 xl:gap-14">

  {/* Left: Title */}
  <RevealOnScroll>
    <div className="mb-6 lg:mb-0 lg:pt-2">
      <h3 className="HeadingH3 font-bold text-[#111827]">
        {t("cryptoTitle", "Cryptocurrency Trading")}
      </h3>
    </div>
  </RevealOnScroll>

  {/* Right: Cards */}
  <div>
    {/* Tablet & desktop grid */}
    <div className="hidden sm:grid sm:grid-cols-3 gap-2 lg:gap-3">
      {MARKET_CARDS.map((card, index) => (
        <MarketCard
          key={card.key}
          Icon={card.Icon}
          title={t(`cards.${card.key}.title`, card.title)}
          href={card.href}
          viewLink={viewLink}
          delay={index * 80}
        />
      ))}
    </div>

    {/* Carousel — mobile only */}
    <div className="sm:hidden w-full overflow-hidden">
      <MobilePeekCarousel
        items={MARKET_CARDS}
        renderItem={(card) => (
          <div className="w-full px-1">
            <MarketCard
              Icon={card.Icon}
              title={t(`cards.${card.key}.title`, card.title)}
              href={card.href}
              viewLink={viewLink}
            />
          </div>
        )}
      />
    </div>
  </div>

</div>
      </div>
    </section>
  );
}

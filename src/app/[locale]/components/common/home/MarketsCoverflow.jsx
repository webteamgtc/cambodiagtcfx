"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, usePathTranslation } from "../../../LocaleProvider";
import { localizedHref } from "@/i18n/localizedHref";
import MobilePeekCarousel from "../MobilePeekCarousel";


const AUTO_DELAY = 5000;


const MARKET_CONFIG = [
  {
    id: "energy",
    icon: "/home/products/icon2.webp",
    href: "/markets/energy",
  },
  {
    id: "forex",
    icon: "/home/products/icon17.webp",
    href: "/markets/forex",
  },
  {
    id: "indices",
    icon: "/home/products/icon4.webp",
    href: "/markets/indices",
  },
  {
    id: "metals",
    icon: "/home/products/icon5.webp",
    href: "/markets/metals",
  },
  {
    id: "shares-equity-cfds",
    icon: "/home/products/icon10.webp",
    href: "/markets/shares",
  },
  {
    id: "crypto-cfds",
    icon: "/home/products/icon13.webp",
    href: "/markets/crypto-cfds",
  },
  {
    id: "future-cfds",
    icon: "/home/products/icon9.webp",
    href: "/markets/future-cfds",
  },
];

const POSITIONS = {
  "-4": {
    x: "clamp(-1100px, -66vw, -560px)",
    y: "clamp(290px, 20vw, 350px)",
    rotate: "-50deg",
    opacity: 0,
    zIndex: 0,
  },
  "-3": {
    x: "clamp(-820px, -49vw, -420px)",
    y: "clamp(210px, 14vw, 255px)",
    rotate: "-45deg",
    opacity: 0,
    zIndex: 0,
  },
  "-2": {
    x: "clamp(-540px, -32vw, -275px)",
    y: "clamp(132px, 8.8vw, 162px)",
    rotate: "-40deg",
    opacity: 1,
    zIndex: 1,
  },
  "-1": {
    x: "clamp(-275px, -16vw, -140px)",
    y: "clamp(28px, 2.2vw, 40px)",
    rotate: "-17deg",
    opacity: 1,
    zIndex: 2,
  },
  "0": {
    x: "0px",
    y: "0px",
    rotate: "0deg",
    opacity: 1,
    zIndex: 3,
  },
  "1": {
    x: "clamp(140px, 16vw, 275px)",
    y: "clamp(28px, 2.2vw, 40px)",
    rotate: "17deg",
    opacity: 1,
    zIndex: 2,
  },
  "2": {
    x: "clamp(275px, 32vw, 540px)",
    y: "clamp(132px, 8.8vw, 162px)",
    rotate: "40deg",
    opacity: 1,
    zIndex: 1,
  },
  "3": {
    x: "clamp(420px, 49vw, 820px)",
    y: "clamp(210px, 14vw, 255px)",
    rotate: "45deg",
    opacity: 0,
    zIndex: 0,
  },
  "4": {
    x: "clamp(560px, 66vw, 1100px)",
    y: "clamp(290px, 20vw, 350px)",
    rotate: "50deg",
    opacity: 0,
    zIndex: 0,
  },
};

const CARD_SIZE = "clamp(200px, 18vw, 300px)";
const CARD_CLIP = "polygon(0 0, 100% 0, 87% 100%, 13% 100%)";


function MobileMarketCard({ market }) {
  return (
    <div className="flex justify-center px-2 pb-3 pt-1">
      <div
        className="relative aspect-square w-[clamp(190px,64vw,230px)] overflow-hidden bg-white shadow-[0_18px_38px_rgba(31,49,95,0.08)]"
        style={{ clipPath: CARD_CLIP }}
      >
        <Image
          src={market.icon}
          alt={market.label}
          width={130}
          height={130}
          className="absolute left-1/2 top-[15%] h-[74px] w-[74px] -translate-x-1/2 object-contain"
        />
        <div className="absolute left-1/2 top-[60%] w-full -translate-x-1/2 px-5 text-center">
          {market.cardTitle.split("\n").map((line) => (
            <span
              key={line}
              className="HeadingH5 block !text-[22px] !leading-[1.16] !tracking-[-0.03em] text-neutral-950"
            >
              {line}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function getCardPosition(index, activeIndex, total) {
  let position = index - activeIndex;
  const middle = Math.floor(total / 2);

  if (position > middle) position -= total;
  if (position < -middle) position += total;

  return position;
}

export default function MarketsCoverflow() {
  const locale = useLocale();
  const t = usePathTranslation("home.marketsCoverflow");
  const [activeIndex, setActiveIndex] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const autoRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const markets = useMemo(
    () =>
      MARKET_CONFIG.map(({ id, icon, href }) => ({
        id,
        icon,
        href,
        label: t(`markets.${id}.label`, ""),
        cardTitle: t(`markets.${id}.cardTitle`, ""),
        title: t(`markets.${id}.title`, ""),
        description: t(`markets.${id}.description`, ""),
      })),
    [t]
  );

  const activeMarket = markets[activeIndex];

  const startAutoPlay = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current);

    autoRef.current = setInterval(() => {
      setActiveIndex((current) => (current + 1) % markets.length);
    }, AUTO_DELAY);
  }, [markets.length]);

  useEffect(() => {
    if (isMobile) {
      if (autoRef.current) clearInterval(autoRef.current);
      return undefined;
    }

    startAutoPlay();

    return () => {
      if (autoRef.current) clearInterval(autoRef.current);
    };
  }, [startAutoPlay, isMobile]);

  const selectMarket = (index) => {
    setActiveIndex(index);
    startAutoPlay();
  };

  const titleLine1 = t("titleLine1", "Trade the Leading");
  const titleLine2 = t("titleLine2", "Global CFDs Markets");
  const viewMore = t("viewMore", "View more");

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#F2F4FF_0%,#F7F9FF_45%,#FBFCFF_72%,#FFFFFF_100%)] py-20 sm:py-24 lg:py-[110px]">
      <div className="mx-auto max-w-[1664px]">
        <div className="mx-auto max-w-[760px] px-5 text-center">
          <h2 className="HeadingH2">
            {titleLine1}
            <br />
            {titleLine2}
          </h2>
        </div>

        {isMobile ? (
          <div className="mt-12 px-5">
            <MobilePeekCarousel
              items={markets}
              initialIndex={activeIndex}
              onActiveIndexChange={setActiveIndex}
              renderItem={(market) => <MobileMarketCard market={market} />}
            />
          </div>
        ) : (
          <div
            className="relative mx-auto mt-14 w-full lg:mt-16"
            style={{
              height: `calc(${CARD_SIZE} + 110px)`,
            }}
          >
            {markets.map((market, index) => {
            const position = getCardPosition(
              index,
              activeIndex,
              markets.length
            );

            const layout = POSITIONS[String(position)];
            const isActive = position === 0;
            const isVisible = Math.abs(position) <= 2;
            const isLongLabel = market.id === "shares-equity-cfds";
            const selectAria = t("selectMarketAria", "Select {label}").replace(
              "{label}",
              market.label
            );

            return (
              <button
                key={market.id}
                type="button"
                aria-label={selectAria}
                aria-pressed={isActive}
                onClick={() => selectMarket(index)}
                className="absolute left-1/2 top-0 aspect-square w-[clamp(200px,18vw,300px)] cursor-pointer border-0 bg-transparent p-0 outline-none transition-[transform,opacity] duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
                style={{
                  opacity: layout.opacity,
                  zIndex: layout.zIndex,
                  pointerEvents: isVisible ? "auto" : "none",
                  transform: `translateX(-50%) translateX(${layout.x}) translateY(${layout.y}) rotate(${layout.rotate})`,
                }}
              >
                <div
                  className="relative h-full w-full overflow-hidden bg-white shadow-[0_18px_38px_rgba(31,49,95,0.08)]"
                  style={{ clipPath: CARD_CLIP }}
                >
                  <Image
                    src={market.icon}
                    alt={market.label}
                    width={130}
                    height={130}
                    className={`absolute left-1/2 -translate-x-1/2 object-contain ${
                      isActive
                        ? "top-[15%] h-[70px] w-[70px] sm:h-[84px] sm:w-[84px]"
                        : "top-[22%] h-[64px] w-[64px] sm:h-[76px] sm:w-[76px]"
                    }`}
                  />

                  {isActive ? (
                    <div className="absolute left-1/2 top-[60%] w-full -translate-x-1/2 px-6 text-center">
                      {market.cardTitle.split("\n").map((line) => (
                        <span
                          key={line}
                          className="HeadingH5 block !text-[clamp(19px,1.55vw,26px)] !leading-[1.16] !tracking-[-0.03em] text-neutral-950"
                        >
                          {line}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span
                      className={`HeadingH6 absolute bottom-[16%] left-1/2 -translate-x-1/2 text-center !leading-none !tracking-[-0.045em] text-[#5B5D64] ${
                        isLongLabel
                          ? "w-[82%] whitespace-normal !text-[clamp(13px,1.05vw,20px)]"
                          : "whitespace-nowrap !text-[clamp(18px,1.5vw,26px)]"
                      }`}
                    >
                      {market.label}
                    </span>
                  )}
                </div>
              </button>
            );
          })}

          <div
            className="pointer-events-none absolute left-1/2 z-30 -translate-x-1/2"
            style={{
              top: `calc(${CARD_SIZE} + 14px)`,
            }}
          >
            <Image
              src="/home/products/arrow.svg"
              alt=""
              width={44}
              height={38}
              className="block h-auto w-[40px] sm:w-[44px]"
            />
          </div>
          </div>
        )}

        <div className="relative z-30 mx-auto mt-6 max-w-[840px] px-5 text-center sm:mt-0">
          <h3 className="HeadingH4 text-[#293B93]">{activeMarket.title}</h3>

          <p className="mx-auto mt-5 max-w-[800px] text-base leading-relaxed text-[#292B58] sm:text-lg">
            {activeMarket.description}
          </p>

          <Link
            href={localizedHref(locale, activeMarket.href) || activeMarket.href}
            className="mt-8 inline-flex min-h-11 items-center capitalize focus:underline-none hover:underline-none justify-center rounded-full bg-[#293B93] px-8 text-sm font-semibold text-white transition hover:bg-[#1E2D77]"
          >
            {viewMore}
          </Link>
        </div>
      </div>
    </section>
  );
}

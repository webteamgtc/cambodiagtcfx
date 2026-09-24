"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { motion } from "framer-motion";

import MobilePeekCarousel from "../MobilePeekCarousel";
import { useLocale, usePathTranslation } from "../../../LocaleProvider";
import { localizedHref } from "@/i18n/localizedHref";

const MARKET_KEYS = ["energy", "commodities", "forex", "indices", "metals"];
const DEFAULT_KEY = "forex";
const ANIMATION_MS = 520;

const CARD_ICONS = {
  energy: "/new-design/Markets/icon2.svg",
  commodities: "/new-design/Markets/icon5.svg",
  forex: "/new-design/Markets/icon1.svg",
  indices: "/new-design/Markets/icon3.svg",
  metals: "/new-design/Markets/icon4.svg",
};

const CENTER_CARD_BG = "/home/market-fan-center-card.svg";
const SIDE_CARD_BG = "/home/market-fan-side-card.svg";

const FAN_CARD_WIDTH = 172;
const FAN_CARD_HEIGHT = 164;

const FAN_TRANSITION = {
  duration: 0.5,
  ease: [0.22, 1, 0.36, 1],
};

/*
  These positions are based on your design image.

  The cards intentionally overlap:
  Energy → Commodities → Forex → Indices → Metals
*/
const FAN_SLOTS = [
  {
    x: -304,
    y: 80,
    rotate: -42,
    zIndex: 1,
  },
  {
    x: -164,
    y: 24,
    rotate: -20,
    zIndex: 4,
  },
  {
    x: 0,
    y: 0,
    rotate: 0,
    zIndex: 10,
  },
  {
    x: 164,
    y: 24,
    rotate: 20,
    zIndex: 4,
  },
  {
    x: 304,
    y: 80,
    rotate: 42,
    zIndex: 1,
  },
];

function getRelativeIndex(marketIndex, activeIndex) {
  const total = MARKET_KEYS.length;

  let difference = marketIndex - activeIndex;

  if (difference > 2) difference -= total;
  if (difference < -2) difference += total;

  return difference;
}

function splitSectionTitle(title) {
  const match = title.match(/^(.+?)\s+(Global.+)$/i);

  if (match) {
    return {
      line1: match[1].trim(),
      line2: match[2].trim(),
    };
  }

  return {
    line1: title,
    line2: "",
  };
}

function CardBackground({ isCenter }) {
  return (
    <span className="pointer-events-none absolute inset-0 z-0" aria-hidden>
      <Image
        src={isCenter ? CENTER_CARD_BG : SIDE_CARD_BG}
        alt=""
        fill
        sizes={`${FAN_CARD_WIDTH}px`}
        className="object-fill"
      />
    </span>
  );
}

function FanIndicator() {
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-[169px] z-20 -translate-x-1/2"
      aria-hidden
    >
      <span className="block h-0 w-0 border-x-[10px] border-b-[17px] border-x-transparent border-b-[#293B93]" />
    </div>
  );
}

function FanMarketCard({
  marketKey,
  relativeIndex,
  slot,
  isAnimating,
  isActive,
  onSelect,
  t,
}) {
  const isCenter = relativeIndex === 0;
  const iconSize = isCenter ? 64 : 60;

  return (
    <motion.button
      type="button"
      initial={false}
      aria-pressed={isActive}
      aria-label={t(`tabs.${marketKey}.contentTitle`)}
      onMouseEnter={() => onSelect(marketKey)}
      onFocus={() => onSelect(marketKey)}
      onClick={() => onSelect(marketKey)}
      animate={{
        x: slot.x - FAN_CARD_WIDTH / 2,
        y: slot.y,
        rotate: slot.rotate,
      }}
      transition={FAN_TRANSITION}
      style={{
        position: "absolute",
        left: "50%",
        top: 0,
        width: FAN_CARD_WIDTH,
        height: FAN_CARD_HEIGHT,
        zIndex: slot.zIndex,
        transformOrigin: "50% 100%",
      }}
      className={clsx(
        "relative border-0 bg-transparent p-0",
        "cursor-pointer outline-none",
        "focus-visible:ring-2 focus-visible:ring-[#293B93] focus-visible:ring-offset-4",
        isAnimating && "pointer-events-none"
      )}
    >
      <CardBackground isCenter={isCenter} />

      <div className="relative z-10 h-full w-full">
        <div
          className="absolute left-1/2 top-[18px] -translate-x-1/2"
          style={{
            width: iconSize,
            height: iconSize,
          }}
        >
          <Image
            src={CARD_ICONS[marketKey]}
            alt=""
            fill
            sizes={`${iconSize}px`}
            draggable={false}
            priority={marketKey === DEFAULT_KEY}
            className="pointer-events-none select-none object-contain"
          />
        </div>

        <div
          className={clsx(
            "absolute inset-x-3 text-center font-semibold leading-[1.3]",
            isCenter
              ? "top-[93px] text-[12px] text-[#141414]"
              : "top-[104px] text-[13px] text-[#656565]"
          )}
        >
          <span
            className={clsx(
              isCenter
                ? "mx-auto block max-w-[122px]"
                : "whitespace-nowrap"
            )}
          >
            {isCenter
              ? t(`tabs.${marketKey}.contentTitle`)
              : t(`tabs.${marketKey}.label`)}
          </span>
        </div>
      </div>
    </motion.button>
  );
}

export default function GlobalCfdsMarketsSection() {
  const t = usePathTranslation("home.homeMarkets");
  const locale = useLocale();

  const [activeKey, setActiveKey] = useState(DEFAULT_KEY);
  const [isAnimating, setIsAnimating] = useState(false);

  const activeKeyRef = useRef(activeKey);
  const animationTimerRef = useRef(null);

  activeKeyRef.current = activeKey;

  const activeIndex = MARKET_KEYS.indexOf(activeKey);

  const sectionTitle = t(
    "sectionTitle",
    "Trade the Leading Global CFDs Markets"
  );

  const { line1, line2 } = splitSectionTitle(sectionTitle);

  const cardModels = useMemo(
    () =>
      MARKET_KEYS.map((marketKey, marketIndex) => {
        const relativeIndex = getRelativeIndex(marketIndex, activeIndex);

        return {
          marketKey,
          relativeIndex,
          slot: FAN_SLOTS[relativeIndex + 2],
        };
      }),
    [activeIndex]
  );

  const handleSelect = useCallback((marketKey) => {
    if (marketKey === activeKeyRef.current) return;

    if (animationTimerRef.current) {
      window.clearTimeout(animationTimerRef.current);
    }

    setIsAnimating(true);
    setActiveKey(marketKey);

    animationTimerRef.current = window.setTimeout(() => {
      setIsAnimating(false);
      animationTimerRef.current = null;
    }, ANIMATION_MS);
  }, []);

  useEffect(() => {
    return () => {
      if (animationTimerRef.current) {
        window.clearTimeout(animationTimerRef.current);
      }
    };
  }, []);

  const activeHref =
    localizedHref(locale, t(`tabs.${activeKey}.buttonLink`, "/")) || "/";

  return (
    <section className="relative overflow-hidden bg-[#F9FAFD] pt-[58px] pb-[48px]">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_58%_at_50%_38%,rgba(222,229,255,0.48),transparent_72%)]"
        aria-hidden
      />

      <div className="container relative">
        <header className="mx-auto mb-9 max-w-[420px] text-center">
          <h2 className="text-[22px] font-semibold leading-[1.25] tracking-[-0.025em] text-[#111111] md:text-[23px]">
            <span className="block">{line1}</span>
            {line2 ? <span className="block">{line2}</span> : null}
          </h2>
        </header>

        {/* Desktop layout */}
        <div className="hidden md:block">
          <div className="relative mx-auto h-[206px] w-full max-w-[860px] overflow-visible">
            {cardModels.map(({ marketKey, relativeIndex, slot }) => (
              <FanMarketCard
                key={marketKey}
                marketKey={marketKey}
                relativeIndex={relativeIndex}
                slot={slot}
                isAnimating={isAnimating}
                isActive={activeKey === marketKey}
                onSelect={handleSelect}
                t={t}
              />
            ))}

            <FanIndicator />
          </div>

          <div className="mx-auto mt-[10px] max-w-[400px] text-center">
            <h3 className="text-[16px] font-semibold leading-tight text-[#293B93] md:text-[17px]">
              {t(`tabs.${activeKey}.contentTitle`)}
            </h3>

            <p className="mt-[13px] text-[11px] leading-[1.55] text-[#555555]">
              {t(`tabs.${activeKey}.contentDescription`)}
            </p>

            <Link
              href={activeHref}
              className="mt-[22px] inline-flex h-[25px] items-center justify-center rounded-full bg-[#293B93] px-5 text-[8px] font-medium text-white no-underline transition hover:bg-[#223277] hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#293B93] focus-visible:ring-offset-2"
            >
              {t(`tabs.${activeKey}.buttonText`, "Start Trading")}
            </Link>
          </div>
        </div>

        {/* Mobile layout */}
        <div className="md:hidden">
          <MobilePeekCarousel
            items={MARKET_KEYS}
            initialIndex={MARKET_KEYS.indexOf(DEFAULT_KEY)}
            onActiveIndexChange={(index) => {
              const marketKey = MARKET_KEYS[index];

              if (marketKey) {
                setActiveKey(marketKey);
              }
            }}
            trackClassName="-mx-4 px-4"
            renderItem={(marketKey) => (
              <div className="relative mx-auto min-h-[320px] max-w-[320px] overflow-hidden px-7 py-8 text-center">
                <CardBackground isCenter />

                <div className="relative z-10">
                  <div className="relative mx-auto h-[74px] w-[74px]">
                    <Image
                      src={CARD_ICONS[marketKey]}
                      alt=""
                      fill
                      sizes="74px"
                      className="object-contain"
                    />
                  </div>

                  <h3 className="mt-6 text-lg font-semibold text-[#293B93]">
                    {t(`tabs.${marketKey}.contentTitle`)}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-[#666666]">
                    {t(`tabs.${marketKey}.contentDescription`)}
                  </p>

                  <Link
                    href={
                      localizedHref(
                        locale,
                        t(`tabs.${marketKey}.buttonLink`, "/")
                      ) || "/"
                    }
                    className="mt-6 inline-flex min-h-[45px] w-full items-center justify-center rounded-full bg-[#293B93] px-8 py-3 text-sm font-medium text-white no-underline transition hover:bg-[#223277] hover:no-underline"
                  >
                    {t(`tabs.${marketKey}.buttonText`, "Start Trading")}
                  </Link>
                </div>
              </div>
            )}
          />
        </div>
      </div>
    </section>
  );
}
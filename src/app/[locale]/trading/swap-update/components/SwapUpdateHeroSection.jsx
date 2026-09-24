"use client";

import { useEffect, useState } from "react";
import Button from "@/app/[locale]/components/common/Button";
import { localizedHref } from "@/i18n/localizedHref";
import { HERO_BULLETS, LIVE_COST_DASHBOARD, REGISTER_HREF } from "../swapUpdateData";
import { HeroTrustBadge } from "@/app/[locale]/company/global-presence/components/GlobalPresenceHeroSection";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

const RIGHT_BG_CLIP = "polygon(62% 0, 100% 0, 100% 100%, 38% 100%)";

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="7" viewBox="0 0 8 7" fill="none">
      <path d="M7.796 0C5.364 1.51275 3.6 3.42294 2.804 4.38007L0.86 2.83488L0 3.5365L3.356 7C3.932 5.49942 5.764 2.56721 8 0.482619L7.796 0Z" fill="#293B93" />
    </svg>
  );
}

function LiveBadge({ label }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-normal uppercase tracking-wide text-[#04C120]">
      <span className="h-2 w-2 rounded-full bg-[#04C120]" aria-hidden />
      {label}
    </span>
  );
}

function SwapBox({ label, value }) {
  const isPositive = value.startsWith("+");

  return (
    <div className="flex-1 rounded-[10px] border border-[#E1E7F6] bg-[#F8F9FC] px-3 py-3">
      <p className="text-xs font-normal uppercase tracking-wide text-[#999]">
        {label}
      </p>
      <p
        className={`Text mt-1.5 leading-snug font-semibold ${
          isPositive ? "text-[#04C120]" : "text-[#C93B3B]"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function InstrumentRow({ item, showDivider, index, t }) {
  return (
    <div className={showDivider ? "border-t border-[#E1E7F6] pt-3" : ""}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 text-left">
          <p className="Text font-semibold text-[#000032]">{item.symbol}</p>
          <p className="TextSmall  font-normal text-[#69729F]">{t(`instruments.${index}.category`, item.category)}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="HeadingH5 font-semibold text-[#293B93]">{item.spread}</p>
          <p className="TextSmall mt-0.5 font-normal text-[#69729F]">{t(`instruments.${index}.spreadUnit`, item.spreadUnit)}</p>
        </div>
      </div>

      <div className="mt-3 flex gap-3">
        <SwapBox label={t("longSwapLabel", "Long swap/lot")} value={item.longSwap} />
        <SwapBox label={t("shortSwapLabel", "Short swap/lot")} value={item.shortSwap} />
      </div>
    </div>
  );
}

function useUtcClock() {
  const format = () => {
    const now = new Date();
    const h = String(now.getUTCHours()).padStart(2, "0");
    const m = String(now.getUTCMinutes()).padStart(2, "0");
    const s = String(now.getUTCSeconds()).padStart(2, "0");
    return `${h} : ${m} : ${s} UTC`;
  };

  const [time, setTime] = useState(format);

  useEffect(() => {
    const id = setInterval(() => setTime(format()), 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}

function LiveCostDashboard() {
  const { avgSpread, instruments } = LIVE_COST_DASHBOARD;
  const utcTime = useUtcClock();
  const t = usePathTranslation("swapUpdatePage.hero.dashboard");

  return (
    <div className="relative mx-auto w-full max-w-[400px] lg:max-w-none lg:justify-self-end">
      <div className="overflow-hidden"
      style={{
        borderRadius: "20px",
        background: "#FCFDFF",
        boxShadow: "0 0 45px 0 rgba(41, 59, 147, 0.08)",
      }}
      >
        <div className="flex items-center justify-between bg-[#293B93] px-5 py-3 md:px-6">
          <p className="Text font-medium text-white">{t("title", "Live Cost Dashboard")}</p>
          <LiveBadge label={t("liveLabel", "Live")} />
        </div>

        <div className="p-4 md:p-5">
          <div className="rounded-[10px] border border-[#E1E7F6] bg-[#F8F9FC] px-4 py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0 text-left">
                <p className="text-xs font-normal text-[#999]">{t("avgSpreadLabel", "Today's Avg Spread")}</p>
                <p className="mt-1 flex items-baseline gap-1.5">
                  <span className="HeadingH3 font-semibold text-[#293B93]">
                    {avgSpread.value}
                  </span>
                  <span className="text-xs font-normal text-[#999]">
                    {avgSpread.unit}
                  </span>
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-xs font-normal text-[#999]">{t("benchmark", avgSpread.benchmark)}</p>
                <p className="text-xs mt-1 font-medium text-[#04C120]">
                  {t("comparison", avgSpread.comparison)}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-3 space-y-5">
            {instruments.map((item, index) => (
              <InstrumentRow
                key={item.symbol}
                item={item}
                showDivider={index > 0}
                index={index}
                t={t}
              />
            ))}
          </div>

          <div className="mt-5 rounded-[10px] border border-[#E1E7F6] bg-[#F8F9FC] px-4 py-4">
            <p className="text-xs font-normal text-[#999]">{t("lastUpdatedLabel", "Last updated")}</p>
            <p className="HeadingH4 mt-1 font-semibold tracking-wide text-[#293B93]">
              {utcTime}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SwapUpdateHeroSection({ locale = "en" }) {
  const t = usePathTranslation("swapUpdatePage.hero");
  return (
    <section className="relative overflow-hidden pb-14 pt-10 md:pb-20 md:pt-16">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute inset-0 bg-[#F4F7FC]"
          style={{ clipPath: RIGHT_BG_CLIP }}
        />
        <div
          className="absolute inset-0"
          style={{
            clipPath: RIGHT_BG_CLIP,
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        />
      </div>

      <div className="relative container min-w-0 max-w-full">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12">
          <div className="min-w-0 text-center lg:text-left">
            <HeroTrustBadge>{t("badge", "Cost Transparency Commitment")}</HeroTrustBadge>
            <h1 className="HeadingH1 mt-7 max-w-md font-semibold leading-[1.3] text-[#000]">
              {t("headingPrefix", "Every cost, ")}
              <span className="text-[#293B93]">{t("headingAccent", "crystal clear")}</span>
              {t("headingSuffix", " to you.")}
            </h1>

            <p className="Text mx-auto mt-6 max-w-xl font-normal leading-[1.7] text-[#000032]/60 md:mt-7 lg:mx-0">
              {t("sub", "GTCFX promises: transparent spreads, daily-updated overnight interest, zero hidden fees, and zero requotes — because real trading confidence starts with real numbers.")}
            </p>

            <ul className="mt-6 flex flex-col items-center gap-4 md:mt-7 lg:items-start">
              {HERO_BULLETS.map((item, index) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-[4px] bg-[#E1E7F6]">
                    <CheckIcon />
                  </span>
                  <span className="TextSmall font-normal text-[#666]">{t(`bullets.${index}`, item)}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex w-full flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:w-auto lg:justify-start">
              <Button
                href={REGISTER_HREF}
                external
                variant="brand"
                size="md"
                showArrow
                className="!self-center w-full max-w-[280px] sm:w-auto lg:!self-start"
              >
                {t("claimCta", "Open Live Account")}
              </Button>
              <Button
                href={localizedHref(locale, "/trading/free-demo-account")}
                variant="outline"
                size="md"
                className="!self-center w-full max-w-[280px] sm:w-auto lg:!self-start"
              >
                {t("demoCta", "Free Demo")}
              </Button>
            </div>
          </div>

          <LiveCostDashboard />
        </div>
      </div>
    </section>
  );
}

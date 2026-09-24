"use client";

import Link from "next/link";
import { localizedHref } from "@/i18n/localizedHref";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

const REGISTER_HREF =
  "/live-account-application";

const STATS = [
  { value: "1,000+", label: "TRADING MARKETS" },
  { value: "1:2000", label: "MAX LEVERAGE" },
  { value: "$0", label: "ACCOUNT FEE" },
];

const TRUST_BADGES = [
  "Multi-jurisdiction regulated",
  "Ultra-fast execution",
  "Segregated client funds 24/7 support",
];

const GRID_PATTERN_STYLE = {
  backgroundImage:
    "linear-gradient(to right, rgba(41,59,147,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(41,59,147,0.05) 1px, transparent 1px)",
  backgroundSize: "44px 44px",
};

export default function TradingCtaSection({ locale = "en" }) {
  const t = usePathTranslation("forTradingBeginnersPage.cta");

  return (
    <section className="relative overflow-hidden bg-[#F8FAFF] py-14 md:py-20 lg:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={GRID_PATTERN_STYLE}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <span className="select-none text-[22vw] font-black leading-none tracking-tight text-[#293B93] opacity-[0.03] md:text-[18vw]">
          GTCFX
        </span>
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center">
            <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.02em] text-black md:text-[44px] xl:text-[52px]">
              {t("headingPrefix", "Trade the World's")}{" "}
              <span className="text-[#293B93]">{t("headingAccent", "markets.")}</span>
            </h2>

            <p className="Text mt-5 max-w-xl text-[#4B5563] md:mt-6">
              {t(
                "sub",
                "Open a live account and access 7+ trading markets including Forex, Metals, Indices, Shares, Crypto & more — from a broker trusted globally."
              )}
            </p>

            <span className="mt-7 h-1 w-10 rounded-full bg-[#293B93]" />

            <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:gap-5">
              <Link
                href={REGISTER_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#293B93] px-8 text-[15px] font-medium text-white transition hover:bg-[#243575] hover:no-underline"
              >
                {t("openLiveAccount", "Open Live Account")}
              </Link>

              <Link
                href={localizedHref(locale, "/trading/free-demo-account")}
                className="inline-flex h-12 items-center justify-center rounded-full border border-[#293B93] bg-white px-8 text-[15px] font-medium text-[#293B93] transition hover:bg-[#f7f8fc] hover:no-underline"
              >
                {t("tryDemoFirst", "Try Demo Account First")}
              </Link>
            </div>

            <p className="mt-6 text-[12px] text-[#6B7280] md:text-[13px]">
              <span className="align-middle">ⓘ</span>{" "}
              {t(
                "disclaimer",
                "CFD trading involves significant risk of loss. Please trade responsibly."
              )}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2">
              {TRUST_BADGES.map((badge, index) => (
                <span key={badge} className="flex items-center gap-x-3">
                  {index > 0 && (
                    <span aria-hidden className="text-[#9CA3AF]">
                      •
                    </span>
                  )}
                  <span className="text-[12px] text-[#6B7280] md:text-[13px]">
                    {t(`trustBadges.${index}`, badge)}
                  </span>
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-end justify-center gap-8 text-right md:gap-10 lg:pl-8">
            {STATS.map((stat, index) => (
              <div key={stat.label}>
                <p className="text-[48px] font-bold leading-none text-[#293B93] md:text-[64px] xl:text-[72px]">
                  {t(`stats.${index}.value`, stat.value)}
                </p>
                <p className="mt-2 text-[12px] font-semibold uppercase tracking-[0.15em] text-[#293B93] md:text-[13px]">
                  {t(`stats.${index}.label`, stat.label)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

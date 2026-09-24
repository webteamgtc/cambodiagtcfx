"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "@/app/[locale]/components/common/Button";
import { localizedHref } from "@/i18n/localizedHref";
import {
  HERO_PILLS,
  HERO_TRUST_ITEMS,
  REGISTER_HREF,
} from "../openLiveAccountData";
import { HeroTrustBadge } from "@/app/[locale]/company/global-presence/components/GlobalPresenceHeroSection";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

const HERO_VISUAL = "/new-design/Trading/open-live-hero-2.webp";

function HeroPill({ before, highlight, after }) {
  return (
    <span className="inline-flex rounded-full gap-1 border border-[#E1E7F6] bg-[#F8F9FC] px-4 py-2 TextSmall font-normal text-[#000032]">
      {before}
      <span className=" text-[#293B93]"> {before ? " " : ""} {highlight} {after ? " " : ""}</span>
      {after}
    </span>
  );
}

function TrustIcon({ type }) {
  if (type === "building") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path d="M8 1L2 4.5V15H14V4.5L8 1Z" stroke="#293B93" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M6 15V9H10V15" stroke="#293B93" strokeWidth="1.2" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === "lock") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <rect x="3.5" y="7" width="9" height="7" rx="1.5" stroke="#293B93" strokeWidth="1.2" />
        <path d="M5.5 7V5.5C5.5 3.84315 6.84315 2.5 8.5 2.5C10.1569 2.5 11.5 3.84315 11.5 5.5V7" stroke="#293B93" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "bolt") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path d="M9 1L4 9H8L7 15L12 7H8L9 1Z" stroke="#293B93" strokeWidth="1.2" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M2.5 3.5C2.5 2.67157 3.17157 2 4 2H12C12.8284 2 13.5 2.67157 13.5 3.5V10.5C13.5 11.3284 12.8284 12 12 12H9.5L6.5 14V12H4C3.17157 12 2.5 11.3284 2.5 10.5V3.5Z" stroke="#293B93" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

export default function OpenLiveAccountHeroSection({ locale = "en" }) {
  const t = usePathTranslation("openLiveAccountPage.hero");

  return (
    <section
      className="relative overflow-hidden bg-cover bg-center pb-14 pt-10 md:pb-20 md:pt-18 lg:pt-20"
      style={{ backgroundImage: "url('/breadcamp/leverage.webp')" }}
    >
      <div className="relative container min-w-0 max-w-full">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12 xl:gap-14">
          <div className="min-w-0 text-center lg:text-left">
            <HeroTrustBadge className="!text-[#000032]">
              {t("badge", "Live markets · 24/5 trading")}
            </HeroTrustBadge>

            <h1 className="HeadingH1 mt-5 max-w-lg font-semibold text-[#000]">
              {t("title", "Open your trading account with GTCFX")}
            </h1>

            <p className="Text mx-auto mt-6 max-w-xl font-normal leading-[1.7] text-[#000032]/60 md:mt-7 lg:mx-0">
              {t(
                "description",
                "A regulated multi-asset broker built for serious traders. Trade 7+ markets with institutional-grade execution."
              )}
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-2 md:mt-7 lg:justify-start">
              {HERO_PILLS.map((pill) => (
                <HeroPill
                  key={pill.key}
                  before={t(`pills.${pill.key}.before`)}
                  highlight={t(`pills.${pill.key}.highlight`)}
                  after={t(`pills.${pill.key}.after`)}
                />
              ))}
            </div>

            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-5 lg:justify-start">
              <Button
                href={REGISTER_HREF}
                external
                variant="brand"
                size="lg"
                showArrow
                className="w-full font-medium sm:w-auto"
              >
                {t("primaryCta", "Open Live Account")}
              </Button>

              <Link
                href={localizedHref(locale, "/trading/free-demo-account")}
                className="Text font-medium text-[#666] underline underline-offset-4 transition hover:text-[#666] hover:no-underline"
              >
                {t("openFreeDemoAccount", "Open Free Demo Account")}
              </Link>
            </div>

            <div className="mt-10 border-y border-[#E1E7F6] py-5 md:py-6">
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 lg:justify-start">
                {HERO_TRUST_ITEMS.map((item) => (
                  <div key={item.key} className="flex items-center gap-2">
                    <TrustIcon type={item.icon} />
                    <span className="TextSmall font-medium text-[#293B93]">
                      {t(`trustItems.${item.key}`)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative mx-auto aspect-[905/765] w-full max-w-[480px] sm:max-w-[520px] lg:max-w-[560px] lg:justify-self-end">
            <Image
              src={HERO_VISUAL}
              alt="GTCFX trading platform preview"
              fill
              priority
              className="object-cover object-center scale-[1.16]"
              sizes="(max-width: 1024px) 92vw, 560px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

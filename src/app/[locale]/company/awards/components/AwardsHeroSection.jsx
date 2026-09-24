"use client";

import clsx from "clsx";
import Image from "next/image";
import Button from "@/app/[locale]/components/common/Button";
import MobilePeekCarousel from "@/app/[locale]/components/common/MobilePeekCarousel";
import FadeInSection from "@/app/[locale]/company/dynamic-leverage/components/FadeInSection";
import { useLocale, usePathTranslation } from "../../../LocaleProvider";
import { localizedHref } from "@/i18n/localizedHref";

const GLOBE_SRC = "/new-design/company/award-banner.svg";

const HERO_STATS = [
  {
    key: "awards",
    valueKey: "stats.awards.value",
    labelKey: "stats.awards.label",
    value: "52+",
    label: "International Awards",
  },
  {
    key: "cities",
    valueKey: "stats.cities.value",
    labelKey: "stats.cities.label",
    value: "14",
    label: "Cities Honored",
  },
  {
    key: "regions",
    valueKey: "stats.regions.value",
    labelKey: "stats.regions.label",
    value: "04",
    label: "Regions Covered",
  },
];

const GLOBE_MARKERS = [
  {
    key: "london",
    labelKey: "globe.markers.london",
    label: "LONDON - 03",
    top: "26%",
    left: "44%",
  },
  {
    key: "zurich",
    labelKey: "globe.markers.zurich",
    label: "ZURICH - 04",
    top: "30%",
    left: "50%",
  },
  {
    key: "newYork",
    labelKey: "globe.markers.newYork",
    label: "NEW YORK - 05",
    top: "34%",
    left: "28%",
  },
  {
    key: "dubai",
    labelKey: "globe.markers.dubai",
    label: "DUBAI - 12",
    top: "42%",
    left: "58%",
  },
  {
    key: "hongKong",
    labelKey: "globe.markers.hongKong",
    label: "HONG KONG - 08",
    top: "40%",
    left: "72%",
  },
  {
    key: "singapore",
    labelKey: "globe.markers.singapore",
    label: "SINGAPORE - 06",
    top: "52%",
    left: "70%",
  },
];

const GLOBE_CARDS = [
  {
    key: "latestHonor",
    valueKey: "globe.cards.latestHonor.value",
    labelKey: "globe.cards.latestHonor.label",
    value: "2025",
    label: "Latest Honor - Dubai",
    className: "left-0 top-2 sm:top-4",
  },
  {
    key: "judges",
    valueKey: "globe.cards.judges.value",
    labelKey: "globe.cards.judges.label",
    value: "150+",
    label: "Industry Judges",
    className: "bottom-16 left-0 sm:bottom-20",
  },
  {
    key: "trustRating",
    valueKey: "globe.cards.trustRating.value",
    labelKey: "globe.cards.trustRating.label",
    value: "A+",
    label: "Trust Rating - Global",
    className: "bottom-8 right-0 sm:bottom-12",
  },
];

const PARTNER_KEYS = [
  { key: "worldFinance", labelKey: "partners.worldFinance", label: "World Finance" },
  { key: "financeMagnates", labelKey: "partners.financeMagnates", label: "Finance Magnates" },
  { key: "dubaiForexExpo", labelKey: "partners.dubaiForexExpo", label: "Dubai Forex Expo" },
  { key: "ukFinance", labelKey: "partners.ukFinance", label: "UK Finance" },
];

function StarIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M7 1.5L8.35 5.15L12.25 5.35L9.2 7.75L10.2 11.55L7 9.45L3.8 11.55L4.8 7.75L1.75 5.35L5.65 5.15L7 1.5Z"
        fill="#293B93"
      />
    </svg>
  );
}

function HeroTrustBadge({ children }) {
  return (
    <div className="inline-flex items-center gap-2.5 px-5 py-1.5"
      style={{
        borderRadius: "99px",
        border: "1px solid #E1E7F6",
        background: "#F7F9FF",
      }}
    >
      <span
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#EEF2FF]"
        aria-hidden
      >
        <span className="h-2 w-2 rounded-full bg-[#293B93]" />
      </span>
      <span className="TextSmall font-normal normal-case tracking-normal text-[#293B93]">
        {children}
      </span>
    </div>
  );
}

function HeroStatItem({ item, t, className = "" }) {
  return (
    <div className={clsx("min-w-0 text-center md:text-left", className)}>
      <p className="HeadingH3 font-semibold text-[#293B93]">
        {t(item.valueKey, item.value)}
      </p>
      <p className="TextSmall mt-2 font-normal uppercase text-[#666]">
        {t(item.labelKey, item.label)}
      </p>
    </div>
  );
}


function AwardsGlobeVisual({ t }) {
  return (
    <div className="relative mx-auto w-full min-w-0 max-w-[560px] lg:mx-0 lg:max-w-none">
      <div className="relative aspect-square w-full">
        <Image
          src={GLOBE_SRC}
          alt=""
          fill
          priority
          className="object-contain"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}

function PartnerBar({ t }) {
  return (
    <div className="mt-12 flex flex-wrap border-y border-[#E5EAF4] py-6 items-center justify-evenly gap-x-4 gap-y-3 md:mt-16">
      {PARTNER_KEYS.map((partner, index) => (
        <div key={partner.key} className="flex items-center gap-16">
          {index > 0 ? (
            <span className="hidden h-[3px] w-6 bg-[#B48755] sm:block" aria-hidden />
          ) : null}
          <span className="Text font-medium uppercase tracking-[0.18em] text-[#69729F]">
            {t(partner.labelKey, partner.label)}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function AwardsHeroSection() {
  const t = usePathTranslation("awardsPage.hero");
  const locale = useLocale();

  return (
    <section className="py-14 md:py-20">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] md:gap-12 ">
            <FadeInSection>
              <div className="min-w-0 text-center md:text-left">
                <HeroTrustBadge>{t("badge", "GLOBAL · 2026 · GLORY MAP")}</HeroTrustBadge>

                <h1 className="HeadingH1 mt-7 max-w-xs leading-[1.25] text-black md:mt-8">
                  {t("title", "Recognition without borders.")}
                </h1>

                <p className="Text mt-6 max-w-xl font-normal leading-[1.7] text-[#000032]/60 md:mt-7">
                  {t(
                    "description",
                    "From Dubai to London, Singapore to Hong Kong — GTCFX is recognized by leading industry institutions across global markets."
                  )}
                </p>

                <div className="mt-10 hidden border-y py-4 border-[#E5EAF4] w-full min-w-0 sm:grid sm:grid-cols-3">
                  {HERO_STATS.map((item, index) => (
                    <HeroStatItem
                      key={item.key}
                      item={item}
                      t={t}
                     />
                  ))}
                </div>

                <div className="mt-8 w-full min-w-0 sm:hidden">
                  <MobilePeekCarousel
                    items={HERO_STATS}
                    showArrows
                    className="w-full min-w-0"
                    trackClassName="-mx-4 px-4 min-w-0"
                    slideClassName="!h-auto"
                    renderItem={(item) => (
                      <div className="w-full min-w-0 max-w-full px-1">
                        <HeroStatItem item={item} t={t} />
                      </div>
                    )}
                  />
                </div>

                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:justify-start sm:gap-4">
                  <Button
                    href={localizedHref(locale, "/live-account-application")}
                    external
                    variant="primary"
                    size="lg"
                    showArrow
                    className="w-full font-medium md:w-auto"
                  >
                    {t("openAccount", "Open Account")}
                  </Button>

                  <Button
                    href={localizedHref(locale, "/trading/free-demo-account")}
                    variant="outline"
                    size="lg"
                    className="w-full !border-[#E1E7F6] !bg-white !font-medium !text-[#293B93] md:w-auto"
                  >
                    {t("tryDemoAccount", "Try Demo Account")}
                  </Button>
                </div>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.15}>
              <div className="min-w-0 pb-4 lg:pb-0">
                <AwardsGlobeVisual t={t} />
              </div>
            </FadeInSection>
          </div>

          <PartnerBar t={t} />
        </div>
      </div>
    </section>
  );
}

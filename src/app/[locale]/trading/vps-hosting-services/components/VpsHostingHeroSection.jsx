"use client";

import clsx from "clsx";
import Button from "@/app/[locale]/components/common/Button";
import FadeInSection from "@/app/[locale]/company/contact-us/components/FadeInSection";
import { HeroTrustBadge } from "@/app/[locale]/company/global-presence/components/GlobalPresenceHeroSection";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";
import { HERO_METRICS } from "../vpsHostingData";
import VpsHostingStatsBarSection from "./VpsHostingStatsBarSection";

const TONE_CLASS = {
  blue: "text-[#293B93]",
  dark: "text-[#000032]",
  green: "text-[#1BAF6E]",
};

function MetricCell({ item, t }) {
  return (
    <div className="rounded-xl bg-[#F8F9FC] border border-[#E1E7F6] px-4 py-4">
      <p className={clsx("HeadingH4 font-bold leading-none", TONE_CLASS[item.tone] || TONE_CLASS.dark)}>
        {t(`metrics.${item.key}.value`, item.value)}
      </p>
      <p className="TextSmall mt-2 font-normal text-[#69729F]">
        {t(`metrics.${item.key}.label`, item.label)}
      </p>
    </div>
  );
}

export default function VpsHostingHeroSection({ locale = "en" }) {
  const t = usePathTranslation("vpsHostingPage.hero");

  return (
    <section
      className="relative overflow-hidden bg-cover bg-center pb-14 pt-10 md:pb-20 md:pt-18 lg:pt-20"
      style={{ backgroundImage: "url('/breadcamp/leverage.webp')" }}
    >


      <div className="container relative min-w-0 max-w-full">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12">
          <FadeInSection>
            <div className="min-w-0 text-center lg:text-left">
              <HeroTrustBadge>{t("badge", "Co-located Infrastructure")}</HeroTrustBadge>

              <h1 className="HeadingH1 mt-6 font-semibold leading-[1.3] text-[#000]">
                <span>{t("headingPrefix", "Professional Grade Trading")} </span>
                <span className="text-[#293B93]">{t("headingAccent", "Infrastructure")}</span>
                <span> {t("headingSuffix", "— Global Co-located VPS")}</span>
              </h1>

              <p className="Text mx-auto mt-5 max-w-xl font-normal leading-[1.7] text-[#000032]/60 lg:mx-0">
                {t(
                  "sub",
                  "Trade without interruption. Our VPS keeps your platform running 24/6 — even when your device is off. No missed trades, no downtime, no delays."
                )}
              </p>

              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
                <Button href="#apply-vps" variant="brand" size="md" showArrow>
                  {t("primaryCta", "Apply for VPS Hosting")}
                </Button>
                <Button href="#pricing" variant="secondary" size="md">
                  {t("secondaryCta", "View Pricing")}
                </Button>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection delay={0.15}>
            <div className="overflow-hidden rounded-[20px] border border-[#E1E7F6] bg-white"
              style={{
                boxShadow: "0px 4px 53.5px 0px #293B9324",

              }}
            >
              <div className="h-1.5 w-full bg-[#293B93]" aria-hidden />

              <div className="p-5 md:p-6">
                <p className="TextSmall font-normal uppercase tracking-[0.14em] text-[#6E6E6E]">
                  {t("cardTitle", "// Live Server Status — Equinix NY4")}
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  {HERO_METRICS.map((item) => (
                    <MetricCell key={item.key} item={item} t={t} />
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-[#1BAF6E]" />
                    <span className="TextSmall font-normal text-[#6E6E6E]">
                      {t("cardStatus", "All systems operational")}
                    </span>
                  </span>
                  <span className="TextSmall text-[#6E6E6E]">·</span>
                  <span className="TextSmall font-normal text-[#6E6E6E]">
                    {t("cardNodes", "4 active nodes")}
                  </span>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
        <VpsHostingStatsBarSection />
      </div>
    </section>
  );
}

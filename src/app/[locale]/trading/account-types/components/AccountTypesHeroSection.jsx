"use client";

import Image from "next/image";
import Button from "@/app/[locale]/components/common/Button";
import { localizedHref } from "@/i18n/localizedHref";
import { HERO_STATS, REGISTER_HREF } from "../accountTypesData";
import { HeroTrustBadge } from "@/app/[locale]/company/global-presence/components/GlobalPresenceHeroSection";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

const HERO_VISUAL = "/new-design/Trading/banner-account-type.webp";

function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[420px] lg:max-w-[560px] lg:justify-self-end">
      <Image
        src={HERO_VISUAL}
        alt="GTCFX account types trading preview"
        width={672}
        height={681}
        priority
        className="h-auto w-full object-contain"
        sizes="(max-width: 1024px) 92vw, 560px"
      />
    </div>
  );
}

export default function AccountTypesHeroSection({ locale = "en" }) {
  const t = usePathTranslation("accountTypesPage.heroSection");

  return (
    <section className="relative overflow-hidden pb-14 pt-10 md:pb-20 md:pt-16">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_0%,rgba(225,231,246,0.85),transparent_65%)]"
        aria-hidden
      />

      <div className="relative container min-w-0 max-w-full">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12">
          <div className="min-w-0 text-center lg:text-left">
            <HeroTrustBadge className="!text-[#293B93] !bg-transparent">
            {t("badge", "Trading Accounts")}
            </HeroTrustBadge>

            <h1 className="HeadingH1 max-w-md font-semibold mt-5 text-[#000]">
              {t("titleStart", "Find the trading account")}{" "}
              <span className="text-[#293B93]">{t("titleHighlight", "that fits")} </span>  {t("titleEnd", "you best.")}
            </h1>

            <p className="Text mx-auto mt-6 max-w-xl font-normal leading-[1.7] text-[#000032]/60 md:mt-7 lg:mx-0">
            {t("description", "From Dubai to London, Singapore to Hong Kong — GTCFX is honored by the institutions and authorities that define each region. Every award is a reflection of the trust we've earned.")}
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap lg:justify-start">
              <Button href={REGISTER_HREF} external variant="brand" size="md" showArrow>
                {t("primaryCta", "Open Live Account")}
              </Button>
              <Button
                href={localizedHref(locale, "/trading/free-demo-account")}
                variant="outline"
                size="md"
              >
               {t("secondaryCta", "Try Demo Account First")}
              </Button>
            </div>

            <div className="mt-10 grid grid-cols-4 gap-4 border-y border-[#E1E7F6] py-5 sm:gap-6">
              {HERO_STATS.map((item) => (
                <div key={item.key} className="min-w-0">
                  <p className="HeadingH3 font-semibold text-[#293B93]">
                    {item.value}
                  </p>
                  <p className="TextSmall mt-1 font-normal text-[#666666]">
                    {t(`stats.${item.key}`, item.label)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <HeroVisual />
        </div>
      </div>
    </section>
  );
}

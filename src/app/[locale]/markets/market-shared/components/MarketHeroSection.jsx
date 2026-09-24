"use client";

import Button from "@/app/[locale]/components/common/Button";
import { HeroTrustBadge } from "@/app/[locale]/company/global-presence/components/GlobalPresenceHeroSection";
import { localizedHref } from "@/i18n/localizedHref";
import { REGISTER_HREF } from "../marketPageData";
import FadeInSection from "@/app/[locale]/company/contact-us/components/FadeInSection";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

export default function MarketHeroSection({ data, locale = "en" }) {
  const t = usePathTranslation(`${data.i18nKey}.hero`);
  const tc = usePathTranslation("marketsShared.heroCtas");

  return (
    <section className="relative overflow-hidden py-14  md:py-20">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          opacity: 0.7,
          background: "linear-gradient(270deg, #F2F5FF 0%, #F9FAFF 100%)",
        }}
      />

      <div className="relative container min-w-0 max-w-full">
        <FadeInSection>
          <div className="mx-auto max-w-4xl text-center">
            <HeroTrustBadge overlayClass="bg-[#EDF0FB]" className="!mx-auto !text-[#293B93] uppercase tracking-[0.14em]">
              {t("badge", data.badge)}
            </HeroTrustBadge>

            <h1 className="HeadingH1 mx-auto mt-6 max-w-3xl font-semibold text-[#000]">
              {t("title", data.heroTitle)}{" "}
              <span className="text-[#293B93]">{t("titleAccent", data.heroTitleAccent)}</span>
            </h1>

            <p className="Text mx-auto mt-5 max-w-2xl font-normal leading-[1.7] text-[#4E4E4E]">
              {t("sub", data.heroSub)}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 py-6 sm:grid-cols-4 sm:gap-6">
              {data.heroStats.map((item, index) => (
                <div key={item.label} className="min-w-0">
                  <p className="HeadingH3 font-semibold text-[#293B93]">
                    {t(`stats.${index}.value`, item.value)}
                  </p>
                  <p className="TextSmall mt-1 font-normal text-[#666]">
                    {t(`stats.${index}.label`, item.label)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Button href={REGISTER_HREF} external variant="brand" size="md" showArrow>
                {tc("openLiveAccount", "Open Live Account")}
              </Button>
           
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}

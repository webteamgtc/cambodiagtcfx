"use client";

import FadeInSection from "@/app/[locale]/company/contact-us/components/FadeInSection";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";
import { AppStoreButton } from "./AppStoreButtons";

export default function GtcGoHeroSection({ data }) {
  const { hero } = data;
  const heroNamespace =
    hero.i18nNamespace === "copyTradingHero"
      ? "gtcGoAppPage.copyTradingHero"
      : "gtcGoAppPage.hero";
  const t = usePathTranslation(heroNamespace);

  return (
    <section className="relative h-[calc(100vw*563/375+80px)] min-h-[calc(100vw*563/375+80px)] overflow-hidden bg-[url('/home/app-mobile.png')] bg-cover bg-top bg-no-repeat pt-[30px] md:h-auto md:min-h-[640px] md:bg-[url('/home/app-image.png')] md:bg-center md:pt-0">
      <div className="container relative z-10 flex h-full min-h-0 min-w-0 max-w-full items-start justify-center px-4 pb-12 md:block md:min-h-[640px] md:items-end md:pb-20 md:pt-48 lg:pb-24 lg:pt-56">
        <div className="mx-auto max-w-6xl">
          <FadeInSection>
            <div className="mx-auto max-w-xl text-center lg:mx-0 lg:max-w-lg lg:text-left">
              <h1 className="HeadingH1 font-semibold text-white">
                {t("title")}
              </h1>

              <p className="Text mx-auto mt-4 max-w-md font-normal leading-[1.7] text-white/95 sm:mt-5 lg:mx-0">
                {t("description")}
              </p>

              <div className="mt-7 hidden w-full flex-row items-stretch justify-center gap-3 sm:mt-8 sm:items-center md:flex lg:justify-start">
                <AppStoreButton type="apple" variant="light" />
                <AppStoreButton type="google" variant="gold" />
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

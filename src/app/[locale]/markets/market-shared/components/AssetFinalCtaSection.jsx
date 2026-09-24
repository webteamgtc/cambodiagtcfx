"use client";

import Button from "@/app/[locale]/components/common/Button";
import { localizedHref } from "@/i18n/localizedHref";
import { REGISTER_HREF } from "../assetMarketData";
import FadeInSection from "@/app/[locale]/company/contact-us/components/FadeInSection";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

function BackgroundCircles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <span className="absolute -bottom-28 -left-36 h-[340px] opacity-20 w-[340px] rounded-full bg-[#E1E7F6] md:-bottom-36 md:-left-48 md:h-[480px] md:w-[480px]" />
      <span className="absolute -bottom-20 -left-24 h-[260px] opacity-15 w-[260px] rounded-full bg-[#E1E7F6] md:-bottom-28 md:-left-32 md:h-[360px] md:w-[360px]" />
      <span className="absolute -bottom-32 -right-20 h-[380px] w-[380px] opacity-20 rounded-full bg-[#E1E7F6] md:-bottom-40 md:-right-28 md:h-[520px] md:w-[520px]" />
      <span className="absolute -bottom-16 right-6 h-[240px] w-[240px] rounded-full opacity-30 bg-[#E1E7F6] md:-bottom-20 md:right-12 md:h-[320px] md:w-[320px]" />
      <span className="absolute bottom-2 -right-10 h-[200px] w-[200px] rounded-full opacity-30 bg-[#E1E7F6] md:bottom-4 md:-right-14 md:h-[260px] md:w-[260px]" />
      <span className="absolute -bottom-8 right-28 h-[160px] w-[160px] rounded-full opacity-25 bg-[#E1E7F6] md:right-40 md:h-[210px] md:w-[210px]" />
    </div>
  );
}

export default function AssetFinalCtaSection({ data, locale = "en" }) {
  const { finalCta } = data;
  const t = usePathTranslation(`${data.i18nKey}.finalCta`);
  const tc = usePathTranslation("marketsShared.heroCtas");

  return (
    <section className="relative overflow-hidden  py-12 md:py-16">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          opacity: 0.15,
          background:
            "linear-gradient(180deg, #FFFFFF 0%, rgba(183, 190, 222, 0.86) 50%, rgba(41, 59, 147, 0.29) 100%)",
        }}
      />

      <BackgroundCircles />

      <div className="container relative z-10 min-w-0 max-w-full">
        <div className="mx-auto max-w-3xl text-center">
          <FadeInSection>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#EDF0FB] px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-[#293B93]" aria-hidden />
              <span className="TextSmall font-normal uppercase tracking-[0.08em] text-[#293B93]">
                {t("eyebrow", finalCta.eyebrow)}
              </span>
            </span>
          </FadeInSection>
          <FadeInSection delay={0.1}>
            <h2 className="HeadingH1 mx-auto mt-5 font-semibold text-[#000]">{t("title", finalCta.title)}</h2>
            <p className="Text mx-auto mt-4 max-w-3xl font-normal leading-[1.7] text-[#4E4E4E]">
              {t("sub", finalCta.sub)}
            </p>
          </FadeInSection>
          <FadeInSection delay={0.2}>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4 md:mt-10">
              <Button
                href={REGISTER_HREF}
                external
                variant="brand"
                size="lg"
                showArrow
                className="shadow-[0_14px_40px_rgba(41,59,147,0.45)]"
              >
                {tc("startTradingNow", "Start Trading Now")}
              </Button>
          
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

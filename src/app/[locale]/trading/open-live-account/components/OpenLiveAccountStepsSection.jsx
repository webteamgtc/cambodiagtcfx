'use client'
import Image from "next/image";
import MobilePeekCarousel from "@/app/[locale]/components/common/MobilePeekCarousel";
import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import { STEPS, STEPS_BG_SRC } from "../openLiveAccountData";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

function StepCard({ item, t }) {
  return (
    <article className={`interactive-card flex h-full flex-col rounded-[20px] border border-[#E1E7F6] bg-white p-5 text-left md:p-6 ${item.className}`}>
      <p className="font-serif font-normal text-[64px] italic leading-none text-[#E1E7F6] md:text-[72px]">
        {item.step}
      </p>

      <h3 className="Text mt-4 font-semibold text-[#000]">{t(`items.${item.key}.title`)}</h3>

      <p className="TextSmall mt-3 flex-1 font-normal leading-[1.65] text-[#000000]">
        {t(`items.${item.key}.description`)}
      </p>

      <div className="mt-6 flex items-center justify-between border-t border-[#E1E7F6] pt-4">
        <span className="text-xs font-normal text-[#666]">{t("footerLabel", "Review time")}</span>
        <span className="TextSmall font-normal text-[#293B93]">
          {t(`items.${item.key}.footerValue`, item.footerValue)}
        </span>
      </div>
    </article>
  );
}

export default function OpenLiveAccountStepsSection() {
  const t = usePathTranslation("openLiveAccountPage.steps");

  return (
    <section className="relative overflow-hidden py-6 md:py-8">
      <div className="relative container min-w-0 max-w-full">

        <div className="mx-auto relative max-w-6xl text-center">
   
          <SectionEyebrow variant="compact" className="capitalize">{t("eyebrow", "Onboarding")}</SectionEyebrow>

          <h2 className="HeadingH1 mx-auto mt-4 max-w-3xl font-semibold leading-[1.25] text-[#000]">
            {t("titleLine1", "Open an account in 3 minutes.")}
            <br className="hidden sm:block" />
            <span className="sm:sr-only"> </span>
            {t("titleLine2", "Trade today.")}
          </h2>

          {/* Mobile carousel */}
          <div className="md:hidden mt-12 relative z-10 lg:mt-14">
            <MobilePeekCarousel
              items={STEPS}
              renderItem={(item) => (
                <div className="px-1 pb-2">
                  <StepCard item={item} t={t} />
                </div>
              )}
            />
          </div>
          {/* Desktop grid */}
          <div className="hidden md:grid mt-12 gap-5 relative z-10 md:grid-cols-3 md:gap-6 lg:mt-14">
            {STEPS.map((item) => (
              <StepCard key={item.key} item={item} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

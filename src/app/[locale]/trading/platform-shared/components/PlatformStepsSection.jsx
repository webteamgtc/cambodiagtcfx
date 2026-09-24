"use client";

import FadeInSection from "@/app/[locale]/company/regulations/components/FadeInSection";
import MobilePeekCarousel from "@/app/[locale]/components/common/MobilePeekCarousel";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

export default function PlatformStepsSection({ data }) {
  const { steps } = data;
  const t = usePathTranslation(`${data.i18nKey}.steps`);

  return (
    <section className="bg-[#F8F9FC] py-10 md:py-16">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl">
          <FadeInSection>
            <div className="mb-12 text-center md:mb-16">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#293B93]">{t("eyebrow", steps.eyebrow)}</p>
              <h2 className="HeadingH1 mt-3">
                <span className="text-[#000]">{t("heading1", steps.heading1)}</span>{" "}
                <span className="text-[#293B93]">{t("heading2", steps.heading2)}</span>
              </h2>
              <p className="Text mx-auto mt-4 max-w-2xl font-normal leading-[1.7] text-[#000032]/60">{t("sub", steps.sub)}</p>
            </div>
          </FadeInSection>

          {/* Mobile carousel */}
          <div className="md:hidden">
            <MobilePeekCarousel
              items={steps.items}
              renderItem={(item, index) => (
                <div className="px-1 pb-2 flex flex-col items-center text-center">
                  <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-xl bg-[#293B93] text-xl font-bold text-white shadow-lg shadow-[#293B93]/20">
                    {item.num}
                  </div>
                  <h3 className="HeadingH5 mt-6 font-semibold text-[#000]">{t(`items.${index}.title`, item.title)}</h3>
                  <p className="Text mt-3 max-w-xs font-normal leading-[1.7] text-[#000032]/60">{t(`items.${index}.desc`, item.desc)}</p>
                  <span className="TextSmall mt-4 inline-block rounded-full bg-[#E1E7F6]/40 px-3 py-1 font-medium text-[#293B93]">{t(`items.${index}.tag`, item.tag)}</span>
                </div>
              )}
            />
          </div>
          {/* Desktop grid */}
          <div className="relative hidden md:grid grid-cols-3 gap-8">
            {/* Connecting line on desktop */}
            <div className="pointer-events-none absolute top-[40px] left-0 hidden h-px w-full md:block" style={{ background: "linear-gradient(90deg, transparent 15%, #E1E7F6 15%, #E1E7F6 85%, transparent 85%)" }} />

            {steps.items.map((item, index) => (
              <FadeInSection key={index} delay={index * 0.1}>
                <div className="relative flex flex-col items-center text-center">
                  <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-xl bg-[#293B93] text-xl font-bold text-white shadow-lg shadow-[#293B93]/20">
                    {item.num}
                  </div>
                  <h3 className="HeadingH5 mt-6 font-semibold text-[#000]">{t(`items.${index}.title`, item.title)}</h3>
                  <p className="Text mt-3 max-w-xs font-normal leading-[1.7] text-[#000032]/60">{t(`items.${index}.desc`, item.desc)}</p>
                  <span className="TextSmall mt-4 inline-block rounded-full bg-[#E1E7F6]/40 px-3 py-1 font-medium text-[#293B93]">{t(`items.${index}.tag`, item.tag)}</span>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import FadeInSection from "@/app/[locale]/company/regulations/components/FadeInSection";
import MobilePeekCarousel from "@/app/[locale]/components/common/MobilePeekCarousel";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

export default function PammMamStepsSection({ data }) {
  const { steps } = data;
  const t = usePathTranslation(`${data.i18nKey}.steps`);

  return (
    <section className="bg-white py-10 md:py-16">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <FadeInSection>
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#293B93]">{t("eyebrow", steps.eyebrow)}</p>
              <h2 className="HeadingH1 mt-3 text-[#000032]">{t("heading", steps.heading)}</h2>
              <p className="Text mx-auto mt-5 max-w-xl font-normal leading-[1.7] text-[#000032]/60">{t("sub", steps.sub)}</p>
            </div>
          </FadeInSection>

          {/* Timeline */}
          <FadeInSection delay={0.1}>
            <div className="relative mt-14">
              {/* Desktop connecting line */}
              <div className="absolute left-0 right-0 top-7 hidden h-px border-t-2 border-dashed border-[#C7D0E8] md:block" style={{ zIndex: 0 }} />

              {/* Mobile carousel */}
              <div className="md:hidden">
                <MobilePeekCarousel
                  items={steps.items}
                  renderItem={(step, index) => (
                    <div className="px-1 pb-2 flex flex-col items-center text-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#293B93] text-xl font-bold text-white shadow-md">
                        {step.num}
                      </div>
                      <h3 className="HeadingH5 mt-5 text-[#000032]">{t(`items.${index}.title`, step.title)}</h3>
                      <p className="Text mt-2 font-normal text-[#000032]/60">{t(`items.${index}.desc`, step.desc)}</p>
                    </div>
                  )}
                />
              </div>
              {/* Desktop grid */}
              <div className="relative z-10 hidden md:grid grid-cols-4 gap-8">
                {steps.items.map((step, index) => (
                  <FadeInSection key={step.num} delay={index * 0.1}>
                    <div className="flex flex-col items-center text-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#293B93] text-xl font-bold text-white shadow-md">
                        {step.num}
                      </div>
                      <h3 className="HeadingH5 mt-5 text-[#000032]">{t(`items.${index}.title`, step.title)}</h3>
                      <p className="Text mt-2 font-normal text-[#000032]/60">{t(`items.${index}.desc`, step.desc)}</p>
                    </div>
                  </FadeInSection>
                ))}
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

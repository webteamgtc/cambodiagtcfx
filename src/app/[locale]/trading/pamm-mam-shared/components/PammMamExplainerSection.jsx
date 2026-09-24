"use client";

import FadeInSection from "@/app/[locale]/company/regulations/components/FadeInSection";
import MobilePeekCarousel from "@/app/[locale]/components/common/MobilePeekCarousel";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

const stepIcons = {
  investor: (
    <svg className="h-8 w-8 text-[#293B93]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  trade: (
    <svg className="h-8 w-8 text-[#293B93]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
    </svg>
  ),
  distribute: (
    <svg className="h-8 w-8 text-[#293B93]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
    </svg>
  ),
};

export default function PammMamExplainerSection({ data }) {
  const { explainer } = data;
  const t = usePathTranslation(`${data.i18nKey}.explainer`);
  const calloutText = t("callout", explainer.callout);

  return (
    <section className="bg-white py-10 md:py-16">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <FadeInSection>
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#293B93]">{t("eyebrow", explainer.eyebrow)}</p>
              <h2 className="HeadingH1 mt-3 text-[#000032]">{t("heading", explainer.heading)}</h2>
              <p className="Text mx-auto mt-5 max-w-2xl font-normal leading-[1.7] text-[#000032]/60">{t("sub", explainer.sub)}</p>
            </div>
          </FadeInSection>

          {/* Mobile carousel */}
          <div className="sm:hidden mt-12">
            <MobilePeekCarousel
              items={explainer.steps}
              renderItem={(step, index) => (
                <div className="px-1 pb-2">
                  <div className="relative rounded-2xl border border-[#E1E7F6] bg-[#F8F9FC] p-6">
                    <p className="text-xs font-medium text-[#999] text-right">/ {step.num}</p>
                    <div className="mt-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[#293B93]/10">
                      {stepIcons[step.icon] || stepIcons.investor}
                    </div>
                    <h3 className="HeadingH5 mt-5 text-[#000032]">{t(`steps.${index}.title`, step.title)}</h3>
                    <p className="Text mt-2 font-normal text-[#000032]/60">{t(`steps.${index}.desc`, step.desc)}</p>
                  </div>
                </div>
              )}
            />
          </div>
          {/* Desktop grid */}
          <div className="hidden sm:grid mt-12 gap-6 sm:grid-cols-3">
            {explainer.steps.map((step, index) => (
              <FadeInSection key={step.num} delay={index * 0.1}>
                <div className="relative rounded-2xl border border-[#E1E7F6] bg-[#F8F9FC] p-6">
                  <p className="text-xs font-medium text-[#999] text-right">/ {step.num}</p>
                  <div className="mt-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[#293B93]/10">
                    {stepIcons[step.icon] || stepIcons.investor}
                  </div>
                  <h3 className="HeadingH5 mt-5 text-[#000032]">{t(`steps.${index}.title`, step.title)}</h3>
                  <p className="Text mt-2 font-normal text-[#000032]/60">{t(`steps.${index}.desc`, step.desc)}</p>
                  {index < explainer.steps.length - 1 && (
                    <div className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 sm:flex h-8 w-8 items-center justify-center rounded-full border border-[#E1E7F6] bg-white shadow-sm">
                      <svg className="h-4 w-4 text-[#293B93]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </div>
              </FadeInSection>
            ))}
          </div>

          {/* Callout block */}
          <FadeInSection>
            <div className="mt-10 rounded-xl border-l-4 border-[#293B93] bg-[#F8F9FC] px-6 py-5">
              <p className="text-sm leading-relaxed text-[#000032]/80"
                dangerouslySetInnerHTML={{ __html: calloutText.replace(/(automatically distributed|PAMM \(Percentage Allocation Management Module\)|MAM \(Multi-Account Manager\))/g, '<strong>$1</strong>') }}
              />
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

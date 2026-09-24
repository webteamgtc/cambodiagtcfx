"use client";

import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import FadeInSection from "@/app/[locale]/company/dynamic-leverage/components/FadeInSection";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";
import { WEBINAR_JOIN_STEPS } from "../webinarData";

function JoinStepCard({ step, index, t }) {
  return (
    <article className="relative h-full rounded-[20px] border border-[#E1E7F6] bg-white p-5 text-left shadow-[0_8px_30px_rgba(41,59,147,0.05)] md:p-6">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#293B93] text-sm font-semibold text-white">
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3 className="HeadingH5 mt-5 font-semibold text-[#000032]">
        {t(step.titleKey, step.title)}
      </h3>
      <p className="TextSmall mt-3 font-normal leading-[1.65] text-[#666]">
        {t(step.descriptionKey, step.description)}
      </p>
    </article>
  );
}

export default function WebinarJoinSection() {
  const t = usePathTranslation("forexExpoDubaiWebinarPage.joinSection");

  return (
    <section className="bg-white py-8 md:py-16">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl">
          <FadeInSection>
            <div className="text-center">
              <SectionEyebrow variant="compact" className="capitalize tracking-[0.35em]">
                {t("eyebrow", "On the Day")}
              </SectionEyebrow>

              <h2 className="HeadingH1 mx-auto mt-4 max-w-3xl font-semibold text-[#000]">
                {t("title", "Join Live on Zoom")}
              </h2>

              <p className="Text mx-auto mt-5 max-w-2xl font-normal leading-[1.7] text-[#000032]/60 md:mt-6">
                {t(
                  "description",
                  "Once registered, follow these steps to be ready for the live session with Jameel Ahmad."
                )}
              </p>
            </div>
          </FadeInSection>

          <div className="mt-10 grid gap-5 md:mt-14 md:grid-cols-3 md:gap-6">
            {WEBINAR_JOIN_STEPS.map((step, index) => (
              <FadeInSection key={step.key} delay={0.08 + index * 0.05}>
                <JoinStepCard step={step} index={index} t={t} />
              </FadeInSection>
            ))}
          </div>

          <FadeInSection delay={0.2}>
            <div className="mt-8 flex flex-col gap-4 rounded-[16px] border border-[#E1E7F6] bg-[#F8F9FC] px-5 py-5 sm:flex-row sm:items-center sm:gap-5 md:mt-10 md:px-6">
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] border border-[#E1E7F6] bg-white text-[#293B93]"
                aria-hidden
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="5" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M8 10.5L11 13L16 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <p className="TextSmall text-left font-normal leading-[1.65] text-[#000032]">
                {t(
                  "zoomNote",
                  "Your Zoom link will be shared by email after registration. Please use the same email address you provide in the form."
                )}
              </p>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

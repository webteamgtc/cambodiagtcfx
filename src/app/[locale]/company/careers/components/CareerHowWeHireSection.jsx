"use client";

import MobilePeekCarousel from "@/app/[locale]/components/common/MobilePeekCarousel";
import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import { usePathTranslation } from "../../../LocaleProvider";

const HIRE_STEPS = [
  {
    key: "apply",
    number: "1",
    rotation: -8,
    title: "Apply",
    description:
      "Submit your profile and relevant documents. Our team reviews every application personally — no black-box filters.",
    titleKey: "steps.apply.title",
    descriptionKey: "steps.apply.description",
  },
  {
    key: "review",
    number: "2",
    rotation: 8,
    title: "Review",
    description:
      "Our hiring team evaluates your background within 5 business days. Shortlisted candidates are contacted for an initial call.",
    titleKey: "steps.review.title",
    descriptionKey: "steps.review.description",
  },
  {
    key: "interview",
    number: "3",
    rotation: -6,
    title: "Interview",
    description:
      "A structured two to three-stage process covering technical depth, case work, and cultural alignment with the team.",
    titleKey: "steps.interview.title",
    descriptionKey: "steps.interview.description",
  },
  {
    key: "offer",
    number: "4",
    rotation: 6,
    title: "Offer",
    description:
      "Receive a transparent, competitive offer with clear onboarding timelines. Your new chapter starts here.",
    titleKey: "steps.offer.title",
    descriptionKey: "steps.offer.description",
  },
];

export function HireStep({ step, t }) {
  return (
    <div className="relative z-[1] mx-auto md:max-w-[240px] text-center">
      <div
        className="mx-auto flex h-16 w-16 items-center justify-center"
        style={{
          borderRadius: '20px',
          background: 'linear-gradient(138deg, #4B5FC1 12.98%, #293B93 64.07%)',
          transform: `rotate(${step.rotation}deg)`,
        }}
      >
        <span className="HeadingH4 font-medium text-white">{step.number}</span>
      </div>

      <h3 className="HeadingH5 mt-8 font-semibold text-[#000]">
        {t(step.titleKey, step.title)}
      </h3>

      <p className="TextSmall mt-5 font-normal leading-[1.65] text-[#69729F]">
        {t(step.descriptionKey, step.description)}
      </p>
    </div>
  );
}

export default function CareerHowWeHireSection() {
  const t = usePathTranslation("careerPage.howWeHireSection");

  return (
    <section className="pb-8 md:pb-16">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl text-center">
          <SectionEyebrow variant="compact" className="capitalize tracking-[0.3em]">
            {t("eyebrow", "Our Process")}
          </SectionEyebrow>

          <h2 className="HeadingH1 mx-auto mt-4 max-w-3xl font-semibold text-[#000]">
            {t("title", "How We Hire")}
          </h2>

          <p className="Text mx-auto mt-5 max-w-2xl font-normal leading-[1.7] text-[#000032]/60 md:mt-6">
            {t(
              "description",
              "Simple, transparent, and fast — four steps from application to offer."
            )}
          </p>

          <div className="relative mt-12 lg:mt-16">
            <div
              className="pointer-events-none absolute left-[10%] right-[10%] top-8 hidden border-t border-dashed border-[#69729F] md:block"
              aria-hidden
            />

            <div className="sm:hidden">
              <MobilePeekCarousel
                items={HIRE_STEPS}
                showArrows
                className="w-full min-w-0"
                trackClassName="-mx-4 px-4 min-w-0"
                slideClassName="!h-auto"
                renderItem={(step) => (
                  <div className="w-full min-w-0 max-w-full px-1">
                    <HireStep step={step} t={t} />
                  </div>
                )}
              />
            </div>

            <div className="hidden gap-8 sm:grid sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {HIRE_STEPS.map((step) => (
                <HireStep key={step.key} step={step} t={t} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

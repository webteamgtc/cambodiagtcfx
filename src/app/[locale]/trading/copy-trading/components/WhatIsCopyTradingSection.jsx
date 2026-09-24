"use client";

import MobilePeekCarousel from "@/app/[locale]/components/common/MobilePeekCarousel";
import { HireStep } from "@/app/[locale]/company/careers/components/CareerHowWeHireSection";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

const STEPS = [
  {
    key: "one",
    number: "01",
    rotation: -8,
    titleKey: "cards.one.title",
    descriptionKey: "cards.one.description",
  },
  {
    key: "two",
    number: "02",
    rotation: 8,
    titleKey: "cards.two.title",
    descriptionKey: "cards.two.description",
  },
  {
    key: "three",
    number: "03",
    rotation: -6,
    titleKey: "cards.three.title",
    descriptionKey: "cards.three.description",
  },
];

export default function WhatIsCopyTradingSection() {
  const t = usePathTranslation("copyTradingPage.whatIs");

  return (
    <section className="bg-white  py-8 md:py-16">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#E5E8F2] bg-[#F2F4F9] px-4 py-2 text-sm font-medium text-[#293B93]">
            <svg xmlns="http://www.w3.org/2000/svg" width="5" height="5" viewBox="0 0 5 5" fill="none">
              <circle cx="2.5" cy="2.5" r="2.5" fill="#12BA82" />
            </svg>
            {t("badge")}
          </span>

          <h2 className="HeadingH1 mx-auto mt-4 max-w-3xl font-semibold leading-[1.4] text-[#000032]">
            {t("title")}
          </h2>

          <p className="Text mx-auto mt-3 max-w-2xl font-normal leading-[1.7] text-[#4E4E4E]">
            {t("description")}
          </p>

          <div className="relative mt-12 lg:mt-14">
            <div
              className="pointer-events-none absolute left-[12%] right-[12%] top-8 hidden border-t border-dashed border-[#69729F] md:block"
              aria-hidden
            />

            <div className="sm:hidden">
              <MobilePeekCarousel
                items={STEPS}
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

            <div className="hidden gap-8 sm:grid sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {STEPS.map((step) => (
                <HireStep key={step.key} step={step} t={t} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import MobilePeekCarousel from "@/app/[locale]/components/common/MobilePeekCarousel";
import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import { HireStep } from "@/app/[locale]/company/careers/components/CareerHowWeHireSection";
import { STEPS } from "../freeDemoAccountData";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

export default function FreeDemoAccountStepsSection() {
  const t = usePathTranslation("freeDemoAccountPage.stepsSection");

  return (
    <section className=" py-2 md:py-2 pb-8 md:pb-16">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl text-center">
          <SectionEyebrow variant="compact" className="capitalize">{t("eyebrow", "Workflow")}</SectionEyebrow>

          <h2 className="HeadingH1 mx-auto mt-4 max-w-3xl font-semibold leading-[1.25] text-[#000]">
            {t("titleStart", "Launch your lab in")}{" "}
            <span className="text-[#293B93]">{t("titleHighlight", "four steps.")}</span>
          </h2>

          <p className="Text mx-auto mt-5 max-w-2xl font-normal leading-[1.7] text-[#000032]/60">
          {t("description", "A professional set-up flow — designed so your demo environment closely mirrors how you intend to trade live.")}          </p>


          <div className="relative mt-12 lg:mt-14">
            <div
              className="pointer-events-none absolute left-[10%] right-[10%] top-8 hidden border-t border-dashed border-[#69729F] md:block"
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

            <div className="hidden gap-8 sm:grid sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
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

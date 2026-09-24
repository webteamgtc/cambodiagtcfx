"use client";

import Button from "@/app/[locale]/components/common/Button";
import MobilePeekCarousel from "@/app/[locale]/components/common/MobilePeekCarousel";
import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import { HireStep } from "@/app/[locale]/company/careers/components/CareerHowWeHireSection";
import { localizedHref } from "@/i18n/localizedHref";
import { HOW_STEPS, REGISTER_HREF } from "../swapFreeTradingData";
import FadeInSection from "@/app/[locale]/company/contact-us/components/FadeInSection";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

export default function SwapFreeTradingHowSection({ locale = "en" }) {
  const t = usePathTranslation("swapFreeTradingPage.how");
  return (
    <section className="py-2 bg-white md:pb-16  md:py-2">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl text-center">
          <FadeInSection>
            <SectionEyebrow variant="compact" className="!text-[#293B93] capitalize">
              {t("eyebrow", "How It Works")}
            </SectionEyebrow>

            <h2 className="HeadingH1 mx-auto mt-4 max-w-xl font-semibold leading-[1.25] text-[#000]">
              {t("heading", "How Swap-Free Works")}
            </h2>

            <p className="Text mx-auto mt-5 max-w-5xl font-normal leading-[1.7] text-[#000032]/60">
              {t("sub", "Swap-free status may be automatically applied based on your region or enabled upon request.")}
            </p>
          </FadeInSection>

          <div className="relative mt-12 lg:mt-14">
            <div
              className="pointer-events-none absolute left-[10%] right-[10%] top-8 hidden border-t border-dashed border-[#69729F] md:block"
              aria-hidden
            />

            <div className="sm:hidden">
              <MobilePeekCarousel
                items={HOW_STEPS}
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
              {HOW_STEPS.map((step, index) => (
                <FadeInSection delay={index * 0.1}>
                  <HireStep key={step.key} step={step} t={t} />
                </FadeInSection>
              ))}
            </div>
          </div>
          <FadeInSection>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-6 md:mt-12">
              <Button href={REGISTER_HREF} external variant="brand" size="md" showArrow>
                {t("applyCta", "Apply for Swap-Free Status")}
              </Button>
              <p className="text-xs font-normal leading-[1.6] text-[#999]">
                {t("responseNote", "Our team typically responds within 24 hours.")}
              </p>
            </div>
          </FadeInSection>

        </div>
      </div>
    </section>
  );
}

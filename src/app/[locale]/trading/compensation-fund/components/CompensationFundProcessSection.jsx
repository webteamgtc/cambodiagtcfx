"use client";

import MobilePeekCarousel from "@/app/[locale]/components/common/MobilePeekCarousel";
import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import { HireStep } from "@/app/[locale]/company/careers/components/CareerHowWeHireSection";
import FadeInSection from "@/app/[locale]/company/contact-us/components/FadeInSection";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";
import { PROCESS_STEPS } from "../compensationFundData";

export default function CompensationFundProcessSection() {
  const t = usePathTranslation("compensationFundPage.process");

  return (
    <section className="bg-[#F8F9FC] py-8 md:py-16">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl text-center">
          <FadeInSection>
            <SectionEyebrow variant="compact" className=" capitalize">
              {t("eyebrow", "How It Works")}
            </SectionEyebrow>

            <h2 className="HeadingH1 mx-auto mt-4 max-w-4xl font-semibold leading-[1.25] text-[#000]">
              {t("title", "How are the funds managed?")}
            </h2>

            <p className="Text mx-auto mt-5 max-w-5xl font-normal leading-[1.7] text-[#000032]/60">
              {t(
                "description",
                "The Compensation Fund is a compensation mechanism maintained by the Financial Commission for eligible clients of its members. According to the Financial Commission’s Rules, the Fund is held in a separate bank account and may be used to satisfy an eligible Award if a member fails or refuses to comply with that Award, or ceases to be a member before paying it. Any payment is subject to the applicable Rules, compensation limits and available fund balance. The Fund is not an insurance policy, deposit-guarantee scheme or general protection against trading losses or broker insolvency. It applies only to eligible claims made against the specific legal entity that holds Financial Commission membership."
              )}
            </p>
          </FadeInSection>

          <div className="relative mt-12 lg:mt-14">
            <div
              className="pointer-events-none absolute left-[10%] right-[10%] top-8 hidden border-t border-dashed border-[#69729F] md:block"
              aria-hidden
            />

            <div className="sm:hidden">
              <MobilePeekCarousel
                items={PROCESS_STEPS}
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
              {PROCESS_STEPS.map((step, index) => (
                <FadeInSection key={step.key} delay={index * 0.1}>
                  <HireStep step={step} t={t} />
                </FadeInSection>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

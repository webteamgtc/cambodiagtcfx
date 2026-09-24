"use client";

import { useState } from "react";
import clsx from "clsx";
import Button from "@/app/[locale]/components/common/Button";
import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import { localizedHref } from "@/i18n/localizedHref";
import {
  INSTRUMENT_CATEGORIES,
  INSTRUMENT_TABS,
  REGISTER_HREF,
} from "../swapFreeTradingData";
import FadeInSection from "@/app/[locale]/company/contact-us/components/FadeInSection";
import MobilePeekCarousel from "@/app/[locale]/components/common/MobilePeekCarousel";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

function InstrumentCard({ item, activeTab, t }) {
  return (
    <article className="interactive-card flex text-center h-full flex-col rounded-[14px] border border-[#E1E7F6] bg-white px-2 py-2 md:px-3 md:py-4">
      <h3 className="TextSmall font-semibold leading-snug text-[#293B93]">
        {t(`categories.${activeTab}.${item.key}.title`, item.title)}
      </h3>
      <p className="text-xs mt-1 font-normal leading-[1.5] text-[#666]">
        {t(`categories.${activeTab}.${item.key}.examples`, item.examples)}
      </p>
    </article>
  );
}

export default function SwapFreeTradingInstrumentsSection({ locale = "en" }) {
  const t = usePathTranslation("swapFreeTradingPage.instruments");
  const [activeTab, setActiveTab] = useState("eligible");
  const categories = INSTRUMENT_CATEGORIES[activeTab];

  return (
    <section className="relative overflow-hidden pt-10 md:pt-16 pb-6">
      <div
        className="pointer-events-none absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            "radial-gradient(rgba(41,59,147,0.06) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
        aria-hidden
      />

      <div className="relative container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl text-center">
          <FadeInSection>
            <SectionEyebrow variant="compact" className="!text-[#293B93] capitalize tracking-[0.18em]">
              {t("eyebrow", "Instruments")}
            </SectionEyebrow>

            <h2 className="HeadingH1 mx-auto mt-4 max-w-xl font-semibold leading-[1.25] text-[#000]">
              {t("heading", "Instruments Covered")}
            </h2>

            <p className="Text mx-auto mt-5 max-w-3xl font-normal leading-[1.7] text-[#000032]/60">
              {t("sub", "Swap-free applies only to selected instruments. Coverage may vary depending on region and liquidity-provider conditions.")}
            </p>
          </FadeInSection>
          <FadeInSection delay={0.5}>
            <div className=" mt-10 rounded-[20px] border border-[#E1E7F6] bg-white px-6 py-6 md:px-6 md:py-6">
              <div className="flex justify-center">
                <div className="inline-flex w-full max-w-3xl overflow-hidden rounded-full border border-[#E1E7F6] bg-white">
                  {INSTRUMENT_TABS.map((tab) => {
                    const isActive = activeTab === tab.key;

                    return (
                      <button
                        key={tab.key}
                        type="button"
                        onClick={() => setActiveTab(tab.key)}
                        className={clsx(
                          "flex-1 px-4 py-3 text-[12px] font-medium leading-snug transition md:px-6 md:text-[13px]",
                          isActive
                            ? "bg-[#293B93] text-white"
                            : "bg-white text-[#293B93] hover:bg-[#F8F9FC]"
                        )}
                      >
                        {t(`tabs.${tab.key}`, tab.label)}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8 border-t border-[#E1E7F6] pt-8">
                {/* Mobile carousel */}
                <div className="lg:hidden">
                  <MobilePeekCarousel
                    items={categories}
                    renderItem={(item) => (
                      <div className="px-1 pb-2">
                        <InstrumentCard item={item} activeTab={activeTab} t={t} />
                      </div>
                    )}
                  />
                </div>
                {/* Desktop grid */}
                <div className="hidden lg:grid gap-2 lg:grid-cols-5">
                  {categories.map((item) => (
                    <InstrumentCard key={item.key} item={item} activeTab={activeTab} t={t} />
                  ))}
                </div>
              </div>

              <p className="TextSmall mx-auto mt-6 max-w-3xl font-normal leading-[1.5] text-[#666]">
                {t("note", "For the live list, please refer to the Contract Specifications section in your trading platform.")}
              </p>
            </div>
          </FadeInSection>
          <FadeInSection delay={0.5}>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4 md:mt-10">
              <Button
                href={localizedHref(locale, "/markets")}
                variant="outline"
                size="md"
                className="border-[#E1E7F6] bg-transparent text-[#293B93]"
              >
                {t("specsCta", "View Full Contract Specifications")}
              </Button>
              <Button href={REGISTER_HREF} external variant="brand" size="md">
                {t("openCta", "Open Live Account")}
              </Button>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

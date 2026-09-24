"use client";

import { FiArrowUpRight } from "react-icons/fi";
import FadeInSection from "./FadeInSection";
import LeverageStatsSection from "./LeverageStatsSection";
import LeverageMarginSheet from "./LeverageMarginSheet";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";
import { HERO_CATEGORY_NAV, scrollToLeverageSection } from "../leveragePageNav";

const categories = HERO_CATEGORY_NAV;

export default function LeverageHeroSection() {
  const t = usePathTranslation("dynamicLeveragePage.hero");

  return (
    <section
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat py-10 md:py-16"
      style={{ backgroundImage: "url('/breadcamp/leverage.webp')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/20" />

      <div className="container relative z-10 min-w-0 max-w-full pt-10">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Left */}
            <FadeInSection>
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#e1e7f6] bg-white px-4 py-2 text-sm font-medium text-[#3347a8]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3347a8]" />
                  {t("badge", "Transparent Trading Conditions")}
                </span>

                <h1 className="HeadingH1 mt-6 text-[#02002f]">
                  {t("titleLine1", "Leverage &")}<br />
                  {t("titleLine2", "Margin Conditions.")}
                </h1>

                <p className="mt-5 max-w-md text-[15px] leading-[1.7] text-[#5a5a6e]">
                  {t(
                    "description",
                    "Every instrument, every margin requirement, every leverage tier — laid out so you can size your positions with precision instead of guesswork."
                  )}
                </p>

                {/* Pills */}
                <div className="mt-8 flex flex-wrap gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat.key}
                      type="button"
                      onClick={() => scrollToLeverageSection(cat.sectionId, cat.category)}
                      className="inline-flex items-center gap-2 rounded-full border border-[#e1e7f6] bg-white px-5 py-2.5 text-sm font-medium text-[#02002f] transition hover:border-[#3347a8] hover:bg-[#f5f6fc]"
                    >
                      {t(`categories.${cat.key}`)}
                      <FiArrowUpRight className="h-3.5 w-3.5 text-[#8a8a9a]" />
                    </button>
                  ))}
                </div>
              </div>
            </FadeInSection>

            {/* Right — Margin Sheet */}
            <FadeInSection delay={0.15}>
              <LeverageMarginSheet />
            </FadeInSection>
          </div>
        </div>
      </div>
      <LeverageStatsSection />
    </section>
  );
}

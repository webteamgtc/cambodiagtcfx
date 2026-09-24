"use client";

import FadeInSection from "@/app/[locale]/company/contact-us/components/FadeInSection";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";
import {
  HERO_CATEGORY_NAV,
  scrollToEarningsSection,
} from "../earningsPageNav";

const CATEGORY_FALLBACKS = {
  calendar: "Calendar",
  screener: "Screener",
  marginGuide: "Margin Guide",
  faqs: "FAQs",
};

export default function EarningsCalendarHero() {
  const t = usePathTranslation("earningsPage.hero");

  return (
    <section
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat py-10 md:py-16"
      style={{ backgroundImage: "url('/breadcamp/leverage.webp')" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-white/70" aria-hidden />

      <div className="container relative z-10 min-w-0 max-w-full pt-10">
        <div className="mx-auto max-w-6xl">
          <FadeInSection>
            <div className="text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#e1e7f6] bg-white px-4 py-2 text-sm font-medium text-[#3347a8]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#3347a8]" />
                {t("badge", "Events Calendar")}
              </span>

              <h1 className="HeadingH1 mt-6 font-semibold leading-[1.3] text-[#111827]">
                {t("titleLine1", "Earnings &")}
                <br />
                {t("titleLine2", "Dividends Calendar.")}
              </h1>

              <p className="Text mx-auto mt-5 max-w-2xl leading-[1.7] text-[#5a5a6e]">
                {t(
                  "description",
                  "Track upcoming earnings releases and dividend dates for shares and index CFDs — so you can plan positions before volatility and margin adjustments hit."
                )}
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                {HERO_CATEGORY_NAV.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => scrollToEarningsSection(item.sectionId)}
                    className="rounded-full border border-[#E1E7F6] bg-white px-4 py-2 text-sm font-semibold text-[#293B93] transition hover:bg-[#F0F2F8]"
                  >
                    {t(`categories.${item.key}`, CATEGORY_FALLBACKS[item.key])}
                  </button>
                ))}
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

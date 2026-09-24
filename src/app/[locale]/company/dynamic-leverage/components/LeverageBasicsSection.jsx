"use client";

import { FiActivity, FiCreditCard, FiAlertTriangle } from "react-icons/fi";
import MobilePeekCarousel from "@/app/[locale]/components/common/MobilePeekCarousel";
import FadeInSection from "./FadeInSection";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

const cards = [
  { num: "i.", key: "definition", icon: FiActivity },
  { num: "ii.", key: "margin", icon: FiCreditCard },
  { num: "iii.", key: "risk", icon: FiAlertTriangle },
];

function BasicsCard({ card }) {
  const t = usePathTranslation("dynamicLeveragePage.basics");
  const Icon = card.icon;
  

  return (
    <div className="group cursor-pointer flex h-full flex-col rounded-2xl border border-[#e8ecf8] bg-white p-6 transition-colors duration-300 hover:border-primary hover:bg-primary">
      <div className="flex items-start justify-between">
        <span className="text-[13px] text-[#8a8a9a] transition-colors group-hover:text-white/80">
          {card.num} {t(`cards.${card.key}.label`)}
        </span>
        <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#e8ecf8] text-[#3347a8] transition-colors group-hover:border-white/20 group-hover:bg-white/15 group-hover:text-white">
          <Icon className="h-5 w-5" strokeWidth={1.8} />
        </span>
      </div>
      <h3 className="mt-6 text-[20px] font-bold text-[#02002f] transition-colors group-hover:text-white">
        {t(`cards.${card.key}.title`)}
      </h3>
      <p className="mt-3 text-[14px] leading-[1.7] text-[#5a5a6e] transition-colors group-hover:text-white/85">
        {t(`cards.${card.key}.description`)}
      </p>
      <div className="mt-auto border-t border-dashed border-[#e8ecf8] pt-4 transition-colors group-hover:border-white/20">
        <p className="text-[13px] leading-[1.7] text-[#3347a8] transition-colors group-hover:text-white">
          {t(`cards.${card.key}.example`)}
        </p>
      </div>
    </div>
  );
}

export default function LeverageBasicsSection() {
  const t = usePathTranslation("dynamicLeveragePage.basics");

  return (
    <section className="relative bg-white pt-10 md:pt-16">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <FadeInSection>
            <div className="text-center">
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#3347a8]">
                {t("eyebrow", "The Basics")}
              </span>
              <h2 className="HeadingH2 mt-5 text-[#02002f]">
                {t("titleStart", "What is leverage")}{" "}
                <span className="text-[#293B93]">{t("titleHighlight", "really?")}</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-[1.7] text-[#5a5a6e]">
                {t(
                  "description",
                  "Three short concepts. No jargon. Once you grasp these, you understand the foundation of every leveraged trade you'll ever place."
                )}
              </p>
            </div>
          </FadeInSection>

          {/* Mobile Carousel */}
          <div className="mt-8 sm:hidden">
            <MobilePeekCarousel
              items={cards}
              showArrows
              className="w-full min-w-0"
              trackClassName="-mx-4 px-4 min-w-0"
              slideClassName="!h-auto"
              renderItem={(card) => (
                <div className="w-full min-w-0 max-w-full px-1">
                  <BasicsCard card={card} />
                </div>
              )}
            />
          </div>

          {/* Desktop Grid */}
          <div className="mt-12 hidden grid-cols-1 gap-5 sm:grid sm:grid-cols-3">
            {cards.map((card, index) => (
              <FadeInSection key={card.key} delay={index * 0.1}>
                <BasicsCard card={card} />
              </FadeInSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

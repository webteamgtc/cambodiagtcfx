"use client";

import FadeInSection from "./FadeInSection";
import MobilePeekCarousel from "@/app/[locale]/components/common/MobilePeekCarousel";
import { FiDollarSign, FiShield, FiUserCheck, FiLock } from "react-icons/fi";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

const pillars = [
  { icon: FiDollarSign, key: "segregated" },
  { icon: FiShield, key: "negative" },
  { icon: FiUserCheck, key: "aml" },
  { icon: FiLock, key: "encryption" },
];

function PillarCard({ pillar }) {
  const t = usePathTranslation("regulationsPage.protection");
  const Icon = pillar.icon;
  return (
    <div className="flex h-full flex-col rounded-2xl border border-[#e8ecf8] bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f0f2f8]">
        <Icon className="h-5 w-5 text-[#3347a8]" />
      </div>
      <h3 className="mt-5 text-base font-bold text-[#02002f]">{t(`pillars.${pillar.key}.title`)}</h3>
      <p className="mt-3 text-sm leading-relaxed text-[#5a5a6e]">{t(`pillars.${pillar.key}.description`)}</p>
    </div>
  );
}

export default function RegulationsProtectionSection() {
  const t = usePathTranslation("regulationsPage.protection");

  return (
    <section className="bg-[#f8f9fc] py-10 md:py-16">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl">
          <FadeInSection>
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#3347a8]">{t("eyebrow", "Client Protection")}</p>
              <h2 className="HeadingH1 mt-3 text-[#02002f]">
                {t("titleStart", "How your funds are")} <span className="text-[#3347a8]">{t("titleHighlight", "protected.")}</span>
              </h2>
              <p className="mx-auto mt-4 max-w-4xl text-[15px] leading-[1.7] text-[#5a5a6e]">
                {t(
                  "description",
                  "Four pillars of client safety — built into the operating procedure of every licensed entity. Not optional features. Not marketing language. Regulator-mandated, audit-tested controls."
                )}
              </p>
            </div>
          </FadeInSection>

          {/* Mobile Carousel */}
          <div className="mt-8 sm:hidden">
            <MobilePeekCarousel
              items={pillars}
              showArrows
              className="w-full min-w-0"
              trackClassName="-mx-4 px-4 min-w-0"
              slideClassName="!h-auto"
              renderItem={(pillar) => (
                <div className="w-full min-w-0 max-w-full px-1">
                  <PillarCard pillar={pillar} />
                </div>
              )}
            />
          </div>

          {/* Desktop Grid */}
          <div className="mt-12 hidden grid-cols-1 gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <FadeInSection key={p.key} delay={i * 0.08}>
                <PillarCard pillar={p} />
              </FadeInSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

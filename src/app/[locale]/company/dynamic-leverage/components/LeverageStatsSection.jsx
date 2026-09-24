"use client";

import FadeInSection from "./FadeInSection";
import MobilePeekCarousel from "@/app/[locale]/components/common/MobilePeekCarousel";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

const stats = [
  { num: "01", key: "maxLeverage", value: "1:2000" },
  { num: "02", key: "instruments", value: "7+" },
  { num: "03", key: "entities", value: "5" },
  { num: "04", key: "marginAlerts", value: "24 / 7" },
];

export default function LeverageStatsSection() {
  const t = usePathTranslation("dynamicLeveragePage.stats");

  return (
    <section className="relative pt-10 md:pt-16">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl">
          {/* Header row */}
          <FadeInSection>
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-medium uppercase tracking-wider text-[#8a8a9a]">
                {t("atAGlance", "/ AT A GLANCE")}
              </span>
              <span className="text-[13px] font-medium uppercase tracking-wider text-[#8a8a9a]">
                {t("keyFigures", "4 KEY FIGURES")}
              </span>
            </div>
          </FadeInSection>

          {/* Cards — mobile carousel */}
          <div className="lg:hidden mt-8">
            <MobilePeekCarousel
              items={stats}
              renderItem={(stat, index) => (
                <div className="px-1 pb-2">
                  <div className="rounded-2xl border border-[#e8ecf8] bg-white p-6 transition hover:shadow-md hover:border-[#d0d8e8]">
                    <p className="text-[13px] text-[#8a8a9a]">/ {stat.num} · {t(`items.${stat.key}.label`)}</p>
                    <p className="mt-4 text-[40px] font-bold leading-none text-[#293B93]">{stat.value}</p>
                    <p className="mt-4 text-[13px] leading-[1.7] text-[#8a8a9a]">{t(`items.${stat.key}.description`)}</p>
                    <div className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-[#f0f1f6]">
                      <div
                        className="h-full rounded-full bg-[#293B93]/20"
                        style={{ width: `${60 + index * 10}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}
            />
          </div>
          {/* Cards — desktop grid */}
          <div className="hidden lg:grid grid-cols-4 gap-4 mt-8">
            {stats.map((stat, index) => (
              <FadeInSection key={stat.key} delay={index * 0.1}>
                <div className="rounded-2xl border border-[#e8ecf8] bg-white p-6 transition hover:shadow-md hover:border-[#d0d8e8]">
                  <p className="text-[13px] text-[#8a8a9a]">/ {stat.num} · {t(`items.${stat.key}.label`)}</p>
                  <p className="mt-4 text-[40px] font-bold leading-none text-[#293B93]">{stat.value}</p>
                  <p className="mt-4 text-[13px] leading-[1.7] text-[#8a8a9a]">{t(`items.${stat.key}.description`)}</p>
                  <div className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-[#f0f1f6]">
                    <div
                      className="h-full rounded-full bg-[#293B93]/20"
                      style={{ width: `${60 + index * 10}%` }}
                    />
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

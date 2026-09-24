"use client";

import FadeInSection from "@/app/[locale]/company/regulations/components/FadeInSection";
import MobilePeekCarousel from "@/app/[locale]/components/common/MobilePeekCarousel";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

function EdgeCard({ stat, index, t }) {
  const icons = [
    /* spreads */
    <svg key="s" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/></svg>,
    /* speed */
    <svg key="sp" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2.05v3.03c3.39.49 6 3.39 6 6.92 0 .9-.18 1.75-.49 2.54l2.63 1.53c.56-1.24.88-2.62.88-4.07 0-5.29-3.93-9.64-9.02-9.95zM12 19c-3.87 0-7-3.13-7-7 0-3.53 2.61-6.43 6-6.92V2.05C5.93 2.36 2 6.7 2 12c0 5.52 4.47 10 9.99 10 3.31 0 6.24-1.61 8.06-4.09l-2.6-1.53C16.17 17.98 14.21 19 12 19z"/></svg>,
    /* no requotes */
    <svg key="nr" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>,
    /* support */
    <svg key="su" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/></svg>,
  ];

  return (
    <FadeInSection delay={index * 0.08}>
      <div className="flex h-full flex-col border-r border-[#E1E7F6] px-6 py-8 last:border-r-0 md:px-8">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F0F2F8] text-[#293B93]">
          {icons[index % icons.length]}
        </span>
        <p className="HeadingH3 mt-5 font-semibold text-[#000]">{stat.value}</p>
        <p className="TextSmall mt-1 font-semibold text-[#000]">{t(`stats.${index}.label`, stat.label)}</p>
        <p className="Text mt-3 font-normal leading-[1.7] text-[#666]">{t(`stats.${index}.desc`, stat.desc)}</p>
      </div>
    </FadeInSection>
  );
}

export default function PlatformEdgeSection({ data }) {
  const edge = data.edge;
  const t = usePathTranslation(`${data.i18nKey}.edge`);

  return (
    <section className="bg-white py-10 md:py-16">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl">
          <FadeInSection>
            <div className="mb-10 text-center md:mb-14">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#293B93]">{t("eyebrow", edge.eyebrow)}</p>
              <h2 className="HeadingH1 mt-3">
                <span className="text-[#000]">{t("heading1", edge.heading1)}</span>
                <br />
                <span className="text-[#293B93]">{t("heading2", edge.heading2)}</span>
              </h2>
              <p className="Text mx-auto mt-4 max-w-2xl font-normal leading-[1.7] text-[#000032]/60">{t("sub", edge.sub)}</p>
            </div>
          </FadeInSection>

          {/* Mobile carousel */}
          <div className="lg:hidden">
            <MobilePeekCarousel
              items={edge.stats}
              renderItem={(stat, index) => (
                <div className="px-1 pb-2">
                  <EdgeCard stat={stat} index={index} t={t} />
                </div>
              )}
            />
          </div>
          {/* Desktop grid */}
          <div className="hidden lg:grid grid-cols-4 divide-x divide-[#E1E7F6] rounded-2xl border border-[#E1E7F6]">
            {edge.stats.map((stat, index) => (
              <EdgeCard key={index} stat={stat} index={index} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

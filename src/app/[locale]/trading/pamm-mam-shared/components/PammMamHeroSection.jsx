"use client";

import FadeInSection from "@/app/[locale]/company/regulations/components/FadeInSection";
import { REGISTER_HREF } from "../pammMamData";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

function DashboardCard({ dashboard, t }) {
  return (
    <div className="rounded-2xl border border-[#E1E7F6] bg-white shadow-lg p-6 w-full max-w-md mx-auto lg:mx-0">
      <p className="text-base font-bold text-[#000032] mb-4 pb-4 border-b border-[#E1E7F6]">{t("dashboard.title", dashboard.title)}</p>
      <div className="divide-y divide-[#F0F2F8]">
        {dashboard.rows.map((row, i) => (
          <div key={i} className="flex items-center justify-between py-3">
            <span className="text-sm text-[#666]">{t(`dashboard.rows.${i}`, row.label)}</span>
            <span className={`text-sm font-semibold ${
              row.color === "blue" ? "text-[#293B93]" :
              row.color === "green" ? "text-green-500" :
              "text-[#000032]"
            }`}>
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PammMamHeroSection({ data }) {
  const { hero } = data;
  const t = usePathTranslation(`${data.i18nKey}.hero`);
  return (
    <section
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/breadcamp/leverage.webp')" }}
    >
      {/* Light white overlay */}
      <div className="absolute inset-0 bg-white/20" />
      <div className="container relative z-10 min-w-0 max-w-full py-10 md:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Left */}
            <FadeInSection>
              <div className="min-w-0 text-center lg:text-left">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#E1E7F6] bg-white px-4 py-2 text-sm text-[#293B93]">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#293B93]" />
                  {t("badge", hero.badge)}
                </span>
                <h1 className="HeadingH1 mt-5 text-[#000032]">{t("heading", hero.heading)}</h1>
                <p className="Text mt-5 font-normal leading-[1.7] text-[#000032]/60">{t("sub", hero.sub)}</p>
                <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
                  <a
                    href={hero.primaryHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#293B93] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1f2d75]"
                  >
                    {t("primaryCta", hero.primaryCta)}
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                  {/* <a
                    href={hero.secondaryHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-[#293B93] px-6 py-3 text-sm font-semibold text-[#293B93] transition hover:bg-[#293B93]/5"
                  >
                    {t("secondaryCta", hero.secondaryCta)}
                  </a> */}
                </div>
              </div>
            </FadeInSection>

            {/* Right - Dashboard Card */}
            <FadeInSection delay={0.15}>
              <DashboardCard dashboard={hero.dashboard} t={t} />
            </FadeInSection>
          </div>
        </div>
      </div>
    </section>
  );
}

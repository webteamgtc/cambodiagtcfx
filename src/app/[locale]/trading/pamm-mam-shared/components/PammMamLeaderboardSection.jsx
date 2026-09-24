"use client";

import { useState } from "react";
import FadeInSection from "@/app/[locale]/company/regulations/components/FadeInSection";
import { REGISTER_HREF } from "../pammMamData";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

function ManagerCard({ manager, t }) {
  return (
    <div className={`rounded-2xl border p-5 ${manager.featured ? "border-[#293B93] shadow-md" : "border-[#E1E7F6] bg-white"}`}>
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-[#F0F2F8] pb-4">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white"
          style={{ backgroundColor: manager.color }}
        >
          {manager.initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-[#000032]">{manager.name}</p>
          <p className="text-xs text-[#999]">{manager.strategy}</p>
        </div>
      </div>
      {/* Stats */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div>
          <p className="text-lg font-bold text-green-500">{manager.return}</p>
          <p className="text-xs text-[#999]">{t("returnLabel", "12-Month Return")}</p>
        </div>
        <div>
          <p className="text-lg font-bold text-red-500">{manager.drawdown}</p>
          <p className="text-xs text-[#999]">{t("drawdownLabel", "Max Drawdown")}</p>
        </div>
        <div>
          <p className="text-base font-semibold text-[#000032]">{manager.aum}</p>
          <p className="text-xs text-[#999]">{t("aumLabel", "AUM")}</p>
        </div>
        <div>
          <p className="text-base font-semibold text-[#000032]">{manager.investors}</p>
          <p className="text-xs text-[#999]">{t("investorsLabel", "Investors")}</p>
        </div>
      </div>
      {/* Footer */}
      <div className="mt-4 flex items-center justify-between border-t border-[#F0F2F8] pt-4">
        <p className="text-xs text-[#666]">{t("feeLabel", "Performance Fee:")} <span className="font-semibold">{manager.fee}</span></p>
        <p className="text-xs text-[#666]">{t("minLabel", "Min:")} <span className="font-semibold">{manager.min}</span></p>
      </div>
      <a
        href={REGISTER_HREF}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-4 block w-full rounded-xl py-2.5 text-center text-sm font-semibold transition ${
          manager.featured
            ? "bg-[#293B93] text-white hover:bg-[#1f2d75]"
            : "bg-[#F0F2F8] text-[#293B93] hover:bg-[#E1E7F6]"
        }`}
      >
        {t("copyCta", "Copy This Manager →")}
      </a>
    </div>
  );
}

export default function PammMamLeaderboardSection({ data }) {
  const { leaderboard } = data;
  const t = usePathTranslation(`${data.i18nKey}.leaderboard`);
  const [activeFilter, setActiveFilter] = useState(0);

  return (
    <section className="bg-[#F8F9FC] py-10 md:py-16">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <FadeInSection>
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#293B93]">{t("eyebrow", leaderboard.eyebrow)}</p>
              <h2 className="HeadingH1 mt-3 text-[#000032]">{t("heading", leaderboard.heading)}</h2>
              <p className="Text mx-auto mt-5 max-w-2xl font-normal leading-[1.7] text-[#000032]/60">{t("sub", leaderboard.sub)}</p>
            </div>
          </FadeInSection>

          {/* Filter Tabs */}
          <FadeInSection delay={0.1}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {leaderboard.filters.map((filter, index) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(index)}
                  className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                    activeFilter === index
                      ? "bg-[#293B93] text-white"
                      : "border border-[#E1E7F6] bg-white text-[#666] hover:border-[#293B93] hover:text-[#293B93]"
                  }`}
                >
                  {t(`filters.${index}`, filter)}
                </button>
              ))}
            </div>
          </FadeInSection>

          {/* Manager Cards */}
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {leaderboard.managers.map((manager, index) => (
              <FadeInSection key={index} delay={index * 0.05}>
                <ManagerCard manager={manager} t={t} />
              </FadeInSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

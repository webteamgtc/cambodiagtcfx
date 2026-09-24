"use client";

import clsx from "clsx";
import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import FadeInSection from "@/app/[locale]/company/contact-us/components/FadeInSection";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";
import { COVERAGE_STATS } from "../compensationFundData";

function StatCard({ item, t, delay = 0 }) {
  const isBlue = item.tone === "blue";

  return (
    <FadeInSection delay={delay}>
      <article
        className={clsx(
          "flex text-left h-full min-h-[220px] flex-col rounded-[20px] border px-6 py-6 md:px-8 md:py-8",
          isBlue
            ? "border-[#293B931A] bg-[#293B930D]"
            : "border-[#B487551A] bg-[#B487550D]"
        )}
      >
        <span
          className={clsx(
            " inline-flex w-fit rounded-full px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]",
            isBlue ? "bg-[#E1E7F6] text-[#293B93]" : "bg-[#B4875533] text-[#B48755]"
          )}
        >
          {t(item.badgeKey, item.badge)}
        </span>

        <p
          className={clsx(
            "HeadingH1 mt-6 font-semibold",
            isBlue ? "text-[#293B93]" : "text-[#B48755]"
          )}
        >
          {t(item.valueKey, item.value)}
        </p>

        <p className="TextSmall mt-5 font-normal leading-[1.5] text-[#666]">
          {t(item.descriptionKey, item.description)}
        </p>
      </article>
    </FadeInSection>
  );
}

export default function CompensationFundCoverageStatsSection() {
  const t = usePathTranslation("compensationFundPage.coverageStats");

  return (
    <section className="py-8 bg-white md:py-16">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl text-center">
          <FadeInSection>
            <SectionEyebrow variant="compact" className=" capitalize">
              {t("eyebrow", "By the Numbers")}
            </SectionEyebrow>

            <h2 className="HeadingH1 mx-auto mt-4 max-w-xl font-semibold leading-[1.25] text-[#000]">
              {t("title", "Funding sources and maximum coverage")}
            </h2>
          </FadeInSection>

          <div className="mt-10 grid gap-5 md:mt-12 md:grid-cols-2 md:gap-6">
            {COVERAGE_STATS.map((item, index) => (
              <StatCard key={item.key} item={item} t={t} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

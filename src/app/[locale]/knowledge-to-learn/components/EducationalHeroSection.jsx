"use client";

import { Fragment } from "react";
import RevealOnScroll from "@/app/[locale]/components/RevealOnScroll";
import { usePathTranslation } from "../../LocaleProvider";
import MegaMenuHubTabs from "@/app/[locale]/components/common/MegaMenuHubTabs";




function DecorativeRings() {
  return (
    <div className="pointer-events-none absolute -right-24 top-1/2 hidden -translate-y-1/2 lg:block" aria-hidden>
      {[420, 320, 220].map((size) => (
        <span
          key={size}
          className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full border border-[#293B93]/10"
          style={{ width: size, height: size, right: `-${size / 4}px` }}
        />
      ))}
    </div>
  );
}

function StatDivider() {
  return (
    <div
      className="h-8 w-px shrink-0 self-center bg-[#C5CDE0] sm:h-10"
      aria-hidden
    />
  );
}

function StatItem({ value, label, showLiveDot = false }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 px-1 py-2 text-center sm:gap-1.5 sm:px-6 sm:py-3">
      {showLiveDot && (
        <span
          className="mb-0.5 h-2 w-2 rounded-full bg-[#293B93]"
          aria-hidden
        />
      )}
      <p className="text-[15px] font-semibold leading-tight text-[#293B93] sm:text-[18px] md:text-[22px] xl:text-[28px]">
        {value}
      </p>
      <p className="text-[8px] font-normal uppercase leading-tight tracking-[0.04em] text-[#9AA0BE] sm:text-[12px] sm:tracking-[0.12em] md:text-sm">
        {label}
      </p>
    </div>
  );
}

export default function EducationalHeroSection({ links }) {
  const t = usePathTranslation("knowledgePage.hero");

  const stats = [
    { key: "articles", value: t("stats.articles.value", "1000+"), label: t("stats.articles.label", "Articles") },
    { key: "ebookCategories", value: t("stats.ebookCategories.value", "200+"), label: t("stats.ebookCategories.label", "E-Book Categories") },
    { key: "learningModules", value: t("stats.learningModules.value", "30+"), label: t("stats.learningModules.label", "Learning Modules") },
    { key: "learningPaths", value: t("stats.learningPaths.value", "10+"), label: t("stats.learningPaths.label", "Learning Paths") },
  ];

  return (
    <section className="relative overflow-hidden py-14 md:py-16 bg-[url('/knowledge.jpeg')] bg-cover bg-center">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
        style={{
          opacity: 0.9,
          background:
            "linear-gradient(180deg, #F6F7FB 0%, #F4F6FF 28.79%, rgba(246, 247, 251, 0.00) 57.58%)",
        }}
      />
      <DecorativeRings />
      {/* <MegaMenuHubTabs links={links} /> */}
      <div className="container min-w-0 max-w-full pt-20">
        <RevealOnScroll>
          <div className="mx-auto flex max-w-6xl flex-col justify-center items-center gap-10 lg:flex-row lg:items-center lg:gap-4">
            <div className=" text-center lg:-ml-8">
              <h1 className="HeadingH1 font-semibold text-[#111827]">
                {t("title", "Educational Materials")}
              </h1>
              <p className="TextRegular mt-3 text-[#666666]">
                {t("description", "Structured resources for every stage of your trading journey.")}
              </p>
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={120}>
          <div className="mx-auto mt-10 max-w-5xl px-1 sm:px-4 lg:mt-16">
            <div className="flex flex-row items-center justify-between">
              {stats.map((stat, index) => (
                <Fragment key={stat.key}>
                  {index > 0 && <StatDivider />}
                  <StatItem
                    value={stat.value}
                    label={stat.label}
                    showLiveDot={false}
                  />
                </Fragment>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import FadeInSection from "@/app/[locale]/company/dynamic-leverage/components/FadeInSection";
import { useLocaleMessages, usePathTranslation } from "../../../LocaleProvider";
import {
  AWARD_YEARS,
  AWARDS_DATA,
  buildRegionalAwardItems,
} from "../awardsData";

const INITIAL_VISIBLE_COUNT = 9;

function YearFilterButton({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "rounded-full border px-4 py-1 text-xs font-medium transition md:px-5 md:py-1.5 md:text-sm",
        active
          ? "border-[#293B93] bg-[#293B93] text-white"
          : "border-[#E1E7F6] bg-white text-[#000032] hover:border-[#D8DFF5]"
      )}
    >
      {children}
    </button>
  );
}

function TopRatedTag({ label }) {
  return (
    <span
      className="inline-flex px-3 py-1.5 text-xs font-medium text-[#293B93]"
      style={{
        borderRadius: "99px",
        border: "1px solid #E1E7F6",
        background: "#F8F9FC",
      }}
    >
      {label}
    </span>
  );
}

function AwardCardContent({ award, topRatedLabel }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col justify-center">
      <p className="TextSmall font-medium text-[#293B93]">-{award.year}</p>
      <h3 className="HeadingH5 mt-2 font-semibold text-[#000]">{award.title}</h3>
      <p className="TextSmall mt-2 font-normal leading-[1.55] text-[#666]">
        {award.subtitle}
      </p>
      <div className="mt-4">
        <TopRatedTag label={topRatedLabel} />
      </div>
    </div>
  );
}

function AwardCard({ award, topRatedLabel, useFeaturedLayout }) {
  const isWide = useFeaturedLayout && award.layout === "wide";
  const isWideReverse = useFeaturedLayout && award.layout === "wide-reverse";
  const isHorizontal = isWide || isWideReverse;

  return (
    <article
      className={clsx(
        "flex h-full overflow-hidden rounded-[22px] border border-[#E1E7F6] bg-white",
        isHorizontal
          ? "min-h-[220px] flex-col md:min-h-[240px] md:flex-row md:items-stretch"
          : "min-h-[200px] flex-col gap-2 p-4 md:p-5",
        isWideReverse && "md:flex-row-reverse"
      )}
    >
      <div
        className={clsx(
          "flex items-center",
          isHorizontal
            ? "w-full justify-center px-4 py-4 md:w-1/2 md:flex-1 md:px-6 md:py-8"
            : "w-full justify-center"
        )}
      >
        <Image
          src={award.image}
          alt={award.title}
          width={240}
          height={260}
          className={clsx(
            "block h-auto w-auto object-contain",
            isHorizontal
              ? "max-h-[150px] max-w-[180px] sm:max-h-[170px] sm:max-w-[210px] md:max-h-[200px] md:max-w-[240px]"
              : "max-h-[130px] max-w-[150px] sm:max-h-[145px] sm:max-w-[165px]"
          )}
        />
      </div>

      <div
        className={clsx(
          isHorizontal
            ? "flex w-full flex-1 flex-col justify-center px-4 pb-5 md:w-1/2 md:px-6 md:py-8"
            : "min-w-0"
        )}
      >
        <AwardCardContent award={award} topRatedLabel={topRatedLabel} />
      </div>
    </article>
  );
}

function ViewAllAwardsCard({ t, onClick }) {
  const className =
    "flex h-full min-h-[200px] w-full items-center justify-center rounded-[22px] border border-[#E1E7F6] bg-[#F8F9FC] p-6 transition hover:border-[#D8DFF5] hover:no-underline md:min-h-[240px]";

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={className}>
        <span className="HeadingH5 inline-flex items-center gap-2 font-semibold text-[#000]">
          {t("viewMore", "View More")}
          <span aria-hidden className="text-[#293B93]">
            &gt;
          </span>
        </span>
      </button>
    );
  }

  return (
    <Link href="#all-awards" className={className}>
      <span className="HeadingH5 inline-flex items-center gap-2 font-semibold text-[#000]">
        {t("viewAll", "View All Awards")}
        <span aria-hidden className="text-[#293B93]">
          &gt;
        </span>
      </span>
    </Link>
  );
}

function getGridItemClass(award, useFeaturedLayout) {
  if (!useFeaturedLayout) return "h-full";

  if (award.layout === "wide" || award.layout === "wide-reverse") {
    return "h-full md:col-span-2";
  }

  return "h-full";
}

export default function AwardsRegionalAwardsSection() {
  const messages = useLocaleMessages();
  const t = usePathTranslation("awardsPage.regionalAwardsSection");
  const [activeYear, setActiveYear] = useState("all");
  const [showAll, setShowAll] = useState(false);

  const topRatedLabel = t("topRated", "Top Rated");

  const allAwardItems = useMemo(
    () => buildRegionalAwardItems(messages),
    [messages]
  );

  const yearFilters = useMemo(
    () => [
      { key: "all", label: t("filters.all", "All Awards") },
      ...AWARD_YEARS.map((year) => ({
        key: year,
        label: t(`filters.${year}`, year),
      })),
    ],
    [t]
  );

  const filteredAwards = useMemo(() => {
    if (activeYear === "all") return allAwardItems;
    return buildRegionalAwardItems(
      messages,
      AWARDS_DATA.filter((award) => award.year === activeYear)
    );
  }, [activeYear, allAwardItems, messages]);

  useEffect(() => {
    setShowAll(false);
  }, [activeYear]);

  const hasMoreAwards = filteredAwards.length > INITIAL_VISIBLE_COUNT;

  const displayedAwards = useMemo(() => {
    if (showAll || !hasMoreAwards) return filteredAwards;
    return filteredAwards.slice(0, INITIAL_VISIBLE_COUNT);
  }, [filteredAwards, hasMoreAwards, showAll]);

  const showViewMoreCard = hasMoreAwards && !showAll;

  return (
    <section id="all-awards" className="pt-6 pb-10 md:pb-16 md:pt-8">
      <div className="container">
        <div className="">
          <FadeInSection>
            <div className="text-center">
              <SectionEyebrow
                variant="compact"
                className="inline-block font-normal uppercase tracking-[0.28em]"
              >
                {t("eyebrow", "Regional Awards")}
              </SectionEyebrow>

              <h2 className="HeadingH1 mx-auto mt-4 font-semibold text-[#000] md:mt-5">
                {t("title", "Recognized in every market.")}
              </h2>

              <p className="Text mx-auto mt-5 max-w-2xl font-normal leading-[1.7] text-[#000032]/60 md:mt-6">
                {t(
                  "description",
                  "Switch by region to find the recognition closest to where you trade. Each card carries an issuer, a year, and the city where the trophy was lifted."
                )}
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-2 md:mt-10">
                {yearFilters.map((filter) => (
                  <YearFilterButton
                    key={filter.key}
                    active={activeYear === filter.key}
                    onClick={() => setActiveYear(filter.key)}
                  >
                    {filter.label}
                  </YearFilterButton>
                ))}
              </div>
            </div>
          </FadeInSection>

          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 md:mt-12 md:grid-cols-3 md:gap-4">
            {displayedAwards.map((award, index) => (
              <FadeInSection
                key={award.key}
                delay={Math.min(index * 0.03, 0.3)}
                className={getGridItemClass(award, true)}
              >
                <AwardCard
                  award={award}
                  topRatedLabel={topRatedLabel}
                  useFeaturedLayout
                />
              </FadeInSection>
            ))}

            {showViewMoreCard ? (
              <FadeInSection delay={0.35} className="h-full">
                <ViewAllAwardsCard t={t} onClick={() => setShowAll(true)} />
              </FadeInSection>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

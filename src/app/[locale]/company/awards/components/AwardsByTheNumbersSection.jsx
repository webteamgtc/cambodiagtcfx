"use client";

import clsx from "clsx";
import MobilePeekCarousel from "@/app/[locale]/components/common/MobilePeekCarousel";
import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import FadeInSection from "@/app/[locale]/company/dynamic-leverage/components/FadeInSection";
import { usePathTranslation } from "../../../LocaleProvider";

const REGION_CARDS = [
  {
    key: "apac",
    featured: true,
    value: "18",
    regionKey: "cards.apac.region",
    region: "Asia Pacific",
    titleKey: "cards.apac.title",
    title: "APAC Awards",
    locationsKey: "cards.apac.locations",
    locations: "Singapore · Hong Kong · Tokyo",
    tagKeys: [
      "cards.apac.tags.bestMobileApp",
      "cards.apac.tags.mostTrusted",
      "cards.apac.tags.topFxBroker",
    ],
    tags: ["Best Mobile App", "Most Trusted", "Top FX Broker"],
  },
  {
    key: "middleEast",
    value: "14",
    regionKey: "cards.middleEast.region",
    region: "Middle East",
    titleKey: "cards.middleEast.title",
    title: "Middle East",
    locationsKey: "cards.middleEast.locations",
    locations: "Dubai · Abu Dhabi",
  },
  {
    key: "europe",
    value: "11",
    regionKey: "cards.europe.region",
    region: "Europe",
    titleKey: "cards.europe.title",
    title: "European Honors",
    locationsKey: "cards.europe.locations",
    locations: "London · Zurich",
  },
  {
    key: "crossRegion",
    value: "09",
    regionKey: "cards.crossRegion.region",
    region: "Global",
    titleKey: "cards.crossRegion.title",
    title: "Cross-Region",
    locationsKey: "cards.crossRegion.locations",
    locations: "Worldwide Panels",
  },
];

function RegionStat({ value }) {
  return (
    <p className="text-6xl font-bold text-[#000]">
      {value}
      <sup className="relative ml-0.5 text-[0.42em] font-semibold text-[#293B93]"
        style={{
          top: "-1.5em",
        }}
      >
        +
      </sup>
    </p>
  );
}

function RegionCard({ card, t, index, className = "" }) {
  const tags = card.tagKeys?.map((key, index) => t(key, card.tags[index])) ?? [];
  const margintop=index === 1||index === 3 ? "md:mt-6 mt-0" : "mt-0";

  return (
    <article
      className={clsx(
        "flex min-h-[260px] min-w-0 flex-col rounded-[20px] p-5 sm:min-h-[280px] md:p-8",
        margintop,
        card.featured
          ? "border border-[#E1E7F6]0"
          : "border border-[#E1E7F6] bg-white",
        className
      )}
      style={
        card.featured
          ? {
            background: "linear-gradient(225deg, rgba(41, 59, 147, 0.21) 2.36%, rgba(143, 153, 199, 0.03) 26.82%, rgba(255, 255, 255, 0.00) 69.88%)",
          }
          : undefined
      }
    >
      <div className="flex items-center gap-2">
        <span
          className={clsx(
            "h-2 w-2 shrink-0 rounded-full",
            card.featured ? "bg-[#E8A54B]" : "bg-[#293B93]"
          )}
          aria-hidden
        />
        <span className="text-xs font-normal text-[#000000]">
          {t(card.regionKey, card.region)}
        </span>
      </div>

      <div className="my-6 flex flex-1 items-center sm:my-8">
        <RegionStat value={card.value} />
      </div>

      <div className="mt-auto min-w-0">
        <h3 className="HeadingH5 font-semibold text-[#000]">
          {t(card.titleKey, card.title)}
        </h3>
        <p className="TextSmall mt-2 font-normal uppercase text-[#666]">
          {t(card.locationsKey, card.locations)}
        </p>

        {tags.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex px-3 py-1.5 text-xs font-medium text-[#69729F]"
                style={{
                  borderRadius: "99px",
                  border: "1px solid #E1E7F6",
                  background: "#FFF",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}

export default function AwardsByTheNumbersSection() {
  const t = usePathTranslation("awardsPage.byTheNumbersSection");

  return (
    <section className="pb-10 md:pb-16">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl">
          <FadeInSection>
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start lg:gap-10 xl:gap-14">
              <div className="min-w-0 text-center lg:text-left">
                <SectionEyebrow variant="compact" className="inline-block font-normal capitalize">
                  {t("eyebrow", "Browse by Topic")}
                </SectionEyebrow>

                <h2 className="HeadingH1 mt-4 max-w-lg font-semibold leading-[1.2] text-[#000] lg:mt-5">
                  {t("titleBefore", "By the")}{" "}
                  <span className="text-[#293B93]">
                    {t("titleAccent", "numbers")}
                  </span>{" "}
                  {t("titleAfter", "across every region.")}
                </h2>
              </div>

              <p className="Text max-w-md text-right mx-auto font-normal leading-[1.7] text-[#000032]/60 lg:pt-8">
                {t(
                  "description",
                  "A snapshot of recognition received from regulators, financial media and industry juries — region by region, year after year."
                )}
              </p>
            </div>
          </FadeInSection>

          <div className="mt-10 w-full min-w-0 lg:hidden">
            <MobilePeekCarousel
              items={REGION_CARDS}
              showArrows
              className="w-full min-w-0"
              trackClassName="-mx-4 px-4 min-w-0"
              slideClassName="!h-auto"
              renderItem={(card, index) => (
                <div className="w-full min-w-0 max-w-full px-1">
                  <RegionCard card={card} t={t} index={index} />
                </div>
              )}
            />
          </div>

          <div
            className="mt-10 hidden min-w-0 gap-3 lg:grid lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-4"
          >
            {REGION_CARDS.map((card, index) => (
              <FadeInSection key={card.key} delay={index * 0.08}>
                <RegionCard card={card} t={t} index={index} className="h-full" />
              </FadeInSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import clsx from "clsx";
import Button from "@/app/[locale]/components/common/Button";
import MobilePeekCarousel from "@/app/[locale]/components/common/MobilePeekCarousel";
import { usePathTranslation } from "../../../LocaleProvider";
import FadeInSection from "@/app/[locale]/company/dynamic-leverage/components/FadeInSection";

const HERO_STATS = [
  {
    key: "nationalities",
    valueKey: "stats.nationalities.value",
    labelKey: "stats.nationalities.label",
    value: "18+",
    label: "Nationalities on the team",
  },
  {
    key: "dubai",
    valueKey: "stats.dubai.value",
    labelKey: "",
    value: "Dubai",
    label: "",
  },
  {
    key: "ownership",
    valueKey: "stats.ownership.value",
    labelKey: "stats.ownership.label",
    value: "100%",
    label: "Ownership expected & enabled",
  },
];

function CareerBadge({ children }) {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full px-5 py-1.5"
      style={{

        borderRadius: '99px',
        background: '#E1E7F6',
      }}
    >
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#293B93]" aria-hidden />
      <span className="TextSmall font-medium normal-case tracking-normal text-[#293B93]">
        {children}
      </span>
    </div>
  );
}

function HeroStatItem({ item, t, className = "" }) {
  return (
    <div className={clsx("min-w-0 px-4 text-center sm:px-6", className)}>
      <p className="HeadingH3 font-semibold text-[#293B93]">
        {t(item.valueKey, item.value)}
      </p>
      <p className="TextSmall mx-auto mt-2 max-w-[12rem] font-normal leading-[1.55] text-[#666]">
        {t(item.labelKey, item.label)}
      </p>
    </div>
  );
}

export default function CareerHeroSection() {
  const t = usePathTranslation("careerPage.hero");

  return (
    <section className="relative overflow-hidden bg-white py-14 md:py-20"
      style={{ backgroundImage: "url('/breadcamp/leverage.webp')" }}

    >
      <div className="absolute inset-0 bg-white/20" />

      <div className="relative container min-w-0 max-w-full">
        <FadeInSection>
        <div className="mx-auto max-w-4xl text-center">
          <CareerBadge>{t("badge", "GTC Group · Careers")}</CareerBadge>

          <h1 className="HeadingH1 mx-auto mt-7 max-w-xl leading-[1.25] md:mt-8">
            {t("titleBefore", "We don't hire employees we find")}{" "}
            <span className="text-[#293B93]">
              {t("titleAccent", "fellow travelers.")}
            </span>
          </h1>

          <p className="Text mx-auto mt-6 max-w-3xl font-normal leading-[1.7] text-[#000032]/60 md:mt-7">
            {t(
              "description",
              "At GTC Group, every member is a co-author of our company's growth story. If you seek depth, real impact, and cross-cultural collision in finance — we've been waiting for you."
            )}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
            <Button href="#openings" className="w-full md:w-auto" variant="primary" size="lg" showArrow>
              {t("exploreOpenings", "Explore Openings")}
            </Button>

            <Button
              href="#culture"
              variant="outline"
              size="lg"
              className="!border-[#E1E7F6] !bg-[#F8F9FC] !font-semibold !text-[#293B93]"
            >
              {t("ourCulture", "Our Culture")}
            </Button>
          </div>

          <div className="mt-12 w-full min-w-0 sm:hidden md:mt-16">
            <MobilePeekCarousel
              items={HERO_STATS}
              showArrows
              className="w-full min-w-0"
              trackClassName="-mx-4 px-4 min-w-0"
              slideClassName="!h-auto"
              renderItem={(item) => (
                <div className="w-full min-w-0 max-w-full px-1">
                  <HeroStatItem item={item} t={t} />
                </div>
              )}
            />
          </div>

          <div className="mt-12 hidden w-full min-w-0 sm:mt-16 sm:grid sm:grid-cols-3">
            {HERO_STATS.map((item, index) => (
              <HeroStatItem
                key={item.key}
                item={item}
                t={t}
                className={index > 0 ? "sm:border-l sm:border-dashed sm:border-[#69729F]" : ""}
              />
            ))}
          </div>
        </div>
        </FadeInSection>
      </div>
    </section>
  );
}

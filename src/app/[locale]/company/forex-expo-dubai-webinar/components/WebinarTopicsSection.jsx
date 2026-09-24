"use client";

import MobilePeekCarousel from "@/app/[locale]/components/common/MobilePeekCarousel";
import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import FadeInSection from "@/app/[locale]/company/dynamic-leverage/components/FadeInSection";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";
import { WEBINAR_TOPICS } from "../webinarData";

function TopicCard({ item, t }) {
  return (
    <article className="flex h-full min-w-0 flex-col rounded-[20px] border border-[#E1E7F6] bg-white p-4 text-left md:p-6">
      <span
        className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-[#E1E7F6] bg-[#E1E7F6] text-sm font-semibold text-[#293B93]"
      >
        {item.number}
      </span>

      <h3 className="HeadingH5 mt-7 font-semibold text-[#000]">
        {t(item.titleKey, item.title)}
      </h3>

      <p className="text-xs mt-6 flex-1 font-normal leading-[1.65] text-[#666]">
        {t(item.descriptionKey, item.description)}
      </p>
    </article>
  );
}

export default function WebinarTopicsSection() {
  const t = usePathTranslation("forexExpoDubaiWebinarPage.topicsSection");

  return (
    <section className="bg-white pt-8 md:pt-16">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl text-center">
          <FadeInSection>
            <SectionEyebrow variant="compact" className="capitalize tracking-[0.3em]">
              {t("eyebrow", "What You'll Learn")}
            </SectionEyebrow>

            <h2 className="HeadingH1 mx-auto mt-4 max-w-3xl font-semibold text-[#000]">
              {t("title", "An Hour of Insight, Built for Active Traders")}
            </h2>

            <p className="Text mx-auto mt-5 max-w-2xl font-normal leading-[1.7] text-[#000032]/60 md:mt-6">
              {t(
                "description",
                "Whether you are preparing for Forex Expo Dubai or refining your daily trading process, this session delivers practical context you can act on immediately."
              )}
            </p>
          </FadeInSection>

          <div className="mt-10 text-left sm:hidden md:mt-14">
            <MobilePeekCarousel
              items={WEBINAR_TOPICS}
              showArrows
              className="w-full min-w-0"
              trackClassName="-mx-4 px-4 min-w-0"
              slideClassName="!h-auto"
              renderItem={(item) => (
                <div className="w-full min-w-0 max-w-full px-1">
                  <TopicCard item={item} t={t} />
                </div>
              )}
            />
          </div>

          <div className="mt-10 hidden grid-cols-1 gap-5 text-left sm:grid sm:grid-cols-2 sm:gap-6 md:mt-14 lg:grid-cols-3">
            {WEBINAR_TOPICS.map((item, index) => (
              <FadeInSection key={item.key} delay={index * 0.1}>
                <TopicCard item={item} t={t} />
              </FadeInSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

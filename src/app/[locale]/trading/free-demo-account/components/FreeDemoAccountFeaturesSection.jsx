"use client";

import MobilePeekCarousel from "@/app/[locale]/components/common/MobilePeekCarousel";
import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import { CommitmentCard } from "@/app/[locale]/company/why-gtc-group/components/WhyGtcGroupCommitmentsSection";
import { FEATURE_CARDS } from "../freeDemoAccountData";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

export default function FreeDemoAccountFeaturesSection() {
  const t = usePathTranslation("freeDemoAccountPage.featuresSection");

  return (
    <section className="py-14 md:py-16">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl text-center">
          <SectionEyebrow variant="compact" className="capitalize">
            {t("eyebrow", "Why Trade With Demo")}
          </SectionEyebrow>

          <h2 className="HeadingH1 mx-auto mt-4 max-w-xl font-semibold leading-[1.25] text-[#000]">
            {t("titleStart", "Everything you need to")}{" "}
            <span className="text-[#293B93]"> {t("titleHighlight", "trade like it's real")}</span>
          </h2>

          <p className="Text mx-auto mt-5 max-w-4xl font-normal leading-[1.7] text-[#000032]/60">
            {t("description", "A demo built to mirror live trading — same prices, same execution, same opportunities. Zero risk.")}
          </p>

          <div className="mt-8 text-left sm:hidden lg:mt-12">
            <MobilePeekCarousel
              items={FEATURE_CARDS}
              showArrows
              className="w-full min-w-0"
              trackClassName="-mx-4 px-4 min-w-0"
              slideClassName="!h-auto"
              renderItem={(item) => (
                <div className="w-full min-w-0 max-w-full px-1">
                  <CommitmentCard item={item} t={t} />
                </div>
              )}
            />
          </div>

          <div className="mt-10 hidden grid-cols-1 gap-5 text-left sm:grid sm:grid-cols-2 sm:gap-6 lg:mt-12 lg:grid-cols-4">
            {FEATURE_CARDS.map((item) => (
              <CommitmentCard key={item.key} item={item} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

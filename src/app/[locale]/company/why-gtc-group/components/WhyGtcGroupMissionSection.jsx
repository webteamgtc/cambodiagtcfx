"use client";

import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import { usePathTranslation } from "../../../LocaleProvider";

export default function WhyGtcGroupMissionSection() {
  const t = usePathTranslation("whyGtcGroupPage.missionSection");

  return (
    <section className="bg-[#F8F9FC] py-8 md:py-16">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-4xl text-center">
          <SectionEyebrow variant="compact" className="capitalize tracking-[0.3em]">
            {t("eyebrow", "Our Mission Statement")}
          </SectionEyebrow>

          <h2 className="HeadingH4 mx-auto mt-5 max-w-3xl font-medium leading-[1.7] text-[#000] md:mt-6 lg:max-w-4xl">
            {t(
              "statement",
              "We are not just a broker. We are builders of technology, practitioners of compliance, and guardians of trader rights. GTC Group is rooted in Dubai — built for the world."
            )}
          </h2>

          <div
            className="mx-auto mt-6 h-[3px] w-16 rounded-full bg-[#293B93] md:mt-8"
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}

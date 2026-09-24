"use client";

import Image from "next/image";
import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import FadeInSection from "@/app/[locale]/company/dynamic-leverage/components/FadeInSection";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";
import { WEBINAR_DETAILS } from "../webinarData";

export default function WebinarSpeakerSection() {
  const t = usePathTranslation("forexExpoDubaiWebinarPage.speakerSection");
  const speaker = WEBINAR_DETAILS.speaker;

  return (
    <section id="speaker" className="bg-white py-10 md:py-16">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <FadeInSection>
              <SectionEyebrow variant="compact" className="capitalize tracking-[0.3em]">
                {t("eyebrow", "Featured Speaker")}
              </SectionEyebrow>

              <h2 className="HeadingH1 mx-auto mt-4 max-w-3xl font-semibold text-[#000]">
                {t("title", "Meet Jameel Ahmad")}
              </h2>

              <p className="Text mx-auto mt-5 max-w-2xl font-normal leading-[1.6] text-[#000032]/60 md:mt-6">
                {t(
                  "description",
                  "Join our Chief Analyst for an exclusive online session ahead of Forex Expo Dubai — covering market themes, trader priorities, and what to watch in the months ahead."
                )}
              </p>
            </FadeInSection>
          </div>

          <FadeInSection delay={0.08}>
            <div className="mt-10 grid items-center gap-8 rounded-[20px] border border-[#E1E7F6] bg-[#F8F9FC] p-5 md:mt-14 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:p-8">
              <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-[20px] bg-[#E8EDF8] mx-auto md:mx-0">
                <Image
                  src={speaker.image}
                  alt={t("speakerImageAlt", `${speaker.name} — GTCFX webinar speaker`)}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 360px"
                />
              </div>

              <div className="min-w-0 text-left">
                <p className="TextSmall font-semibold uppercase tracking-[0.2em] text-[#69729F]">
                  {t("speakerLabel", "Speaker")}
                </p>
                <h3 className="HeadingH2 mt-3 font-semibold text-[#293B93]">
                  {t("speakerName", speaker.name)}
                </h3>
                <p className="Text mt-2 font-medium text-[#69729F]">
                  {t("speakerRole", speaker.role)}
                </p>
                <p className="Text mt-6 font-normal leading-[1.7] text-[#666]">
                  {t("speakerBio", speaker.bio)}
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[14px] border border-[#E1E7F6] bg-white px-4 py-4">
                    <p className="TextSmall font-semibold text-[#293B93]">
                      {t("sessionDateLabel", "Session Date")}
                    </p>
                    <p className="text-sm mt-2 text-[#666]">
                      {t("sessionDate", WEBINAR_DETAILS.date)}
                    </p>
                  </div>
                  <div className="rounded-[14px] border border-[#E1E7F6] bg-white px-4 py-4">
                    <p className="TextSmall font-semibold text-[#293B93]">
                      {t("sessionTimeLabel", "Session Time")}
                    </p>
                    <p className="text-sm mt-2 text-[#666]">
                      {t("sessionTime", WEBINAR_DETAILS.time)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

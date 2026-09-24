"use client";

import clsx from "clsx";
import FadeInSection from "@/app/[locale]/company/contact-us/components/FadeInSection";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";
import { STATS_BAR } from "../vpsHostingData";

export default function VpsHostingStatsBarSection() {
  const t = usePathTranslation("vpsHostingPage.statsBar");

  return (
    <section className=" pt-16">
      <div className="container min-w-0 max-w-full">
        <FadeInSection>
          <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl bg-[#293B93]">
            <div className="grid grid-cols-2 sm:flex sm:flex-row sm:items-stretch">
              {STATS_BAR.map((item, index) => (
                <div
                  key={item.key}
                  className={clsx(
                    "relative flex flex-col items-center justify-center px-4 py-4 text-center text-white sm:flex-1 md:px-6 md:py-6",
                    index < STATS_BAR.length - 1 &&
                      "sm:after:absolute sm:after:right-0 sm:after:top-1/2 sm:after:h-[55%] sm:after:w-px sm:after:-translate-y-1/2 sm:after:bg-white/25",
                    index % 2 === 0 &&
                      index < STATS_BAR.length - 1 &&
                      "max-sm:after:absolute max-sm:after:right-0 max-sm:after:top-1/2 max-sm:after:h-[55%] max-sm:after:w-px max-sm:after:-translate-y-1/2 max-sm:after:bg-white/25",
                    index < 2 &&
                      "max-sm:border-b max-sm:border-white/20"
                  )}
                >
                  <p className="HeadingH2 font-semibold text-white">
                    {t(`${index}.value`, item.value)}
                  </p>
                  <p className="TextSmall mt-1 font-normal text-[#9AB1D2]">
                    {t(`${index}.title`, item.title)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}

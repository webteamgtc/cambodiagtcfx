"use client";

import { STATS_BAR } from "../swapUpdateData";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

export default function SwapUpdateStatsBarSection() {
  const t = usePathTranslation("swapUpdatePage.statsBar");
  return (
    <section className="bg-[#F8F9FC] py-10 md:py-12">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-stretch sm:gap-0">
          {STATS_BAR.map((item, index) => (
            <div key={item.title} className="flex min-w-0 flex-1 items-stretch">
              {index > 0 && (
                <div
                  className="hidden h-24 shrink-0 items-center sm:flex"
                  aria-hidden
                >
                  <div className="h-full w-0 border-l border-dashed border-[#69729F]/55" />
                </div>
              )}

              <div className="min-w-0 flex-1 px-4  sm:px-6 md:px-8">
                <p className="HeadingH2 font-semibold text-[#293B93]">{item.value}</p>
                <p className="Text mt-3 font-semibold leading-[1.4] text-[#000032]">
                  {t(`${index}.title`, item.title)}
                </p>
                <p className="TextSmall mt-3 font-normal leading-[1.5] text-[#69729F]">
                  {t(`${index}.label`, item.label)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

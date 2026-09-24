"use client";

import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

export default function CourseHeader() {
  const t = usePathTranslation("forTradingBeginnersPage.courseHeader");

  return (
    <section className="bg-white py-10 md:py-16 lg:py-24">
      <div className="container">
        <div className="flex items-start gap-3">
          <span
            aria-hidden
            className="mt-[10px] h-3 w-3 shrink-0 rounded-[2px] bg-[#293B93] md:mt-[14px] lg:mt-[16px]"
          />
          <div>
            <h1 className="HeadingH2 font-bold text-black">
              {t(
                "title",
                "Technical Analysis for Beginners: Trading with Charts and Indicators"
              )}
            </h1>
            <p className="Text mt-3 text-[#666]">
              {t("subtitle", "Free online courses covering technical analysis")}
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 md:mt-10 md:flex-row md:items-center md:gap-6">
          <div className="shrink-0">
            <p className="text-[15px] font-bold text-black">
              {t("progressLabel", "Your progress")}
            </p>
            <p className="TextSmall text-[#666]">
              {t("progressCount", "0 of 5 finished")}
            </p>
          </div>

          <div className="flex-1">
            <div className="h-2 w-full rounded-full bg-[#E5EAF4]">
              <div
                className="h-2 rounded-full bg-[#293B93]"
                style={{ width: "0%" }}
              />
            </div>
          </div>

          <Link
            href="/knowledge-to-learn"
            className="group inline-flex shrink-0 items-center gap-1 text-[15px] font-medium text-[#293B93] hover:no-underline"
          >
            {t("psychologyLink", "Psychology")}
            <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

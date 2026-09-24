"use client";

import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

const SECTIONS = [
  { id: 1, label: "SECTION 1", title: "What is technical analysis?", units: "5 units" },
  { id: 2, label: "SECTION 2", title: "What is technical analysis?", units: "5 units" },
  { id: 3, label: "SECTION 3", title: "What is technical analysis?", units: "5 units" },
  { id: 4, label: "SECTION 4", title: "What is technical analysis?", units: "5 units" },
  { id: 5, label: "SECTION 5", title: "What is technical analysis?", units: "5 units" },
  { id: 6, label: "SECTION 6", title: "What is technical analysis?", units: "5 units" },
];

function CourseCard({ label, title, units, startCta }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-[#e5eaf4] bg-white p-5 transition hover:border-[#cfd8ea] sm:p-6">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-black sm:text-[12px]">
        {label}
      </p>

      <h3 className="HeadingH5 mt-2 font-bold text-black">{title}</h3>

      <p className="TextSmall mt-1 text-[#666]">{units}</p>

      <Link
        href="/knowledge-to-learn/for-trading-beginners"
        className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-[#E8E6F8] px-4 py-2 text-sm font-medium text-[#293B93] transition hover:bg-[#dedbf2] hover:no-underline"
      >
        {startCta}
        <FiArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </div>
  );
}

export default function SectionCardsGrid() {
  const t = usePathTranslation("forTradingBeginnersPage.sections");
  const startCta = t("startCta", "Start");

  return (
    <section className="bg-white pb-14 md:pb-16 lg:pb-20">
      <div className="container">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SECTIONS.map((section, index) => (
            <CourseCard
              key={section.id}
              label={t(`items.${index}.label`, section.label)}
              title={t(`items.${index}.title`, section.title)}
              units={t(`items.${index}.units`, section.units)}
              startCta={startCta}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

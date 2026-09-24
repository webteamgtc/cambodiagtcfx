"use client";

import Link from "next/link";
import { localizedHref } from "@/i18n/localizedHref";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

function CourseCard({ label, title, units, startCta, href }) {
  return (
    <Link
      href={href}
      className="interactive-card group flex h-[280px] flex-col rounded-2xl border border-[#e5eaf4] bg-white p-10 hover:no-underline sm:p-6"
    >
      <p className="text-[11px] font-semibold uppercase tracking-wide text-black sm:text-[12px]">
        {label}
      </p>

      <h3 className="HeadingH5 mt-2 font-bold text-black">{title}</h3>

      {/* <p className="TextSmall mt-1 text-[#666]">{units}</p> */}

      <span className="mt-auto inline-flex w-fit items-center gap-1.5 rounded-full bg-[#E8E6F8] px-4 py-2 text-sm font-medium text-[#293B93] transition group-hover:bg-[#dedbf2] group-hover:text-white group-hover:bg-primary">
        {startCta} →
      </span>
    </Link>
  );
}

export default function SectionCardsGrid({
  locale = "en",
  materialSlug,
  sections = [],
  translationScope,
}) {
  const t = usePathTranslation(translationScope || "forTradingBeginnersPage.sections");
  const startCta = t("startCta", "Start");

  if (!sections?.length) {
    return (
      <section className="bg-white pb-14 md:pb-16 lg:pb-20">
        <div className="container">
          <p className="text-sm text-gray-500">
            {t("noCategoriesFound", "No categories found.")}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white pb-14 md:pb-16 lg:pb-20">
      <div className="container">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sections?.map((section, index) => (
            <CourseCard
              key={section.slug}
              label={
                translationScope
                  ? t(`items.${index}.label`, section.label)
                  : section.label
              }
              title={section.title}
              units={t(`items.${index}.units`, section.units)}
              startCta={startCta}
              href={localizedHref(
                locale,
                `/knowledge-to-learn/${materialSlug}/${section.slug}`
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

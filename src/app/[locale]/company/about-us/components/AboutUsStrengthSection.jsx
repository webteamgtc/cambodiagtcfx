"use client";

import clsx from "clsx";
import MobilePeekCarousel from "@/app/[locale]/components/common/MobilePeekCarousel";
import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import { usePathTranslation } from "../../../LocaleProvider";

const STRENGTH_STATS = (t) => [
  {
    key: "founded",
    tag: "EST.",
    value: t("foundedValue"),  
    description:
      t("foundedDescription"),
    footer: t("foundedFooter"),
    tagKey: "foundedTag",
    valueKey: "foundedValue",
    descriptionKey: "foundedDescription",
    footerKey: "foundedFooter",
  },
  {
    key: "clients",
    tag: "CLIENTS",
    value: t("clientsValue"),  
    description: t("clientsDescription"),
    footer: t("clientsFooter"),
    tagKey: "clientsTag",
    valueKey: "clientsValue",
    descriptionKey: "clientsDescription",
    footerKey: "clientsFooter",
  },
 
  {
    key: "awards",
    tag: "AWARDS",
    value: t("awardsValue"),  
    description:
      t("awardsDescription"),
    footer: t("awardsFooter"),
    tagKey: "awardsTag",
    valueKey: "awardsValue",
    descriptionKey: "awardsDescription",
    footerKey: "awardsFooter",
  },
];

function StrengthStatColumn({ item, t, className = "" }) {
  return (
    <div
      className={clsx(
        "flex min-h-[200px] text-center lg:text-left min-w-0 flex-col px-0 py-2 sm:px-6 lg:min-h-[250px] lg:px-8 lg:py-4",
        className
      )}
    >
      <p className="TextSmall text-[11px] font-medium uppercase tracking-[0.14em] text-[#9CA3AF]">
        <span className="text-[#293B93]">•</span>
        <span className="mx-1.5 text-[#D9D9D9]">/</span>
        {t(item.tagKey, item.tag)}
      </p>

      <p className="HeadingH2 font-bold mt-5 text-[#293B93]">{t(item.valueKey, item.value)}</p>

      <p className="TextSmall mt-4 md:max-w-[250px] font-normal leading-[1.5] text-[#999]">
        {t(item.descriptionKey, item.description)}
      </p>

      <p className="TextSmall mt-auto pt-4 font-normal uppercase text-[#999]">
        <span className="mr-2 text-[#999]">—</span>
        {t(item.footerKey, item.footer)}
      </p>
    </div>
  );
}

export default function AboutUsStrengthSection() {
  const t = usePathTranslation("aboutUsPage.strengthSection");

  return (
    <section className="relative overflow-hidden pb-14 md:pb-16">
      <div className="relative container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl text-center">
          <SectionEyebrow>{t("eyebrow", "Strength Data")}</SectionEyebrow>

          <h2 className="HeadingH1 mx-auto mt-4 leading-[1.2] text-[#000]">
            {t("title")}
          </h2>

          <p className="Text mx-auto mt-5 max-w-3xl font-normal leading-[1.7] opacity-60 text-[#000032] md:mt-6">
            {t(
              "description")}
          </p>

          <div className="mt-12 sm:hidden lg:mt-16">
            <MobilePeekCarousel
              items={STRENGTH_STATS(t)}
              showArrows
              trackClassName="-mx-4 px-4"
              renderItem={(item) => (
                <StrengthStatColumn item={item} t={t} className="px-2" />
              )}
            />
          </div>

          <div className="mt-12 hidden grid-cols-2 gap-x-0 gap-y-10 sm:grid lg:mt-16 lg:grid-cols-3 lg:gap-0">
            {STRENGTH_STATS(t)?.map((item, index) => (
              <div
                key={item.key}
                className={clsx(
                  "min-w-0",
                  index > 0 && "lg:border-l lg:border-[#E5EAF4]",
                  index % 2 === 1 && "sm:border-l sm:border-[#E5EAF4]",
                  index >= 2 && "sm:border-t sm:border-[#E5EAF4] lg:border-t-0"
                )}
              >
                <StrengthStatColumn item={item} t={t} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

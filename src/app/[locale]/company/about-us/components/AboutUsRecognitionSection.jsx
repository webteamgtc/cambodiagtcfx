"use client";

import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import Button from "@/app/[locale]/components/common/Button";
import { usePathTranslation } from "../../../LocaleProvider";

const REGISTER_HREF =
  "/live-account-application";

const AWARD_ITEMS = [
  {
    key: "cfdBroker",
    index: "01",
    title: "Best CFD Broker",
    organization: "International Business Magazine",
    category: "BEST CFD BROKER",
    year: "2024",
    titleKey: "items.cfdBroker.title",
    organizationKey: "items.cfdBroker.organization",
    categoryKey: "items.cfdBroker.category",
  },
  {
    key: "trustedBroker",
    index: "02",
    title: "Most trusted broker",
    organization: "Global Forex Awards",
    category: "MOST TRUSTED",
    year: "2023",
    titleKey: "items.trustedBroker.title",
    organizationKey: "items.trustedBroker.organization",
    categoryKey: "items.trustedBroker.category",
  },
  {
    key: "customerService",
    index: "03",
    title: "Excellent Customer Service Award",
    organization: "MENA Financial Awards",
    category: "CUSTOMER SERVICE",
    year: "2023",
    titleKey: "items.customerService.title",
    organizationKey: "items.customerService.organization",
    categoryKey: "items.customerService.category",
  },
  {
    key: "compliance",
    index: "04",
    title: "Best Regulatory Compliance Brand",
    organization: "Forex Brokers Review",
    category: "COMPLIANCE",
    year: "2022",
    titleKey: "items.compliance.title",
    organizationKey: "items.compliance.organization",
    categoryKey: "items.compliance.category",
  },
  {
    key: "middleEast",
    index: "05",
    title: "Best broker in the Middle East",
    organization: "MENA Forex Show",
    category: "MIDDLE EAST",
    year: "2022",
    titleKey: "items.middleEast.title",
    organizationKey: "items.middleEast.organization",
    categoryKey: "items.middleEast.category",
  },
];

function AwardRow({ item, t }) {
  const title = t(item.titleKey, item.title);
  const organization = t(item.organizationKey, item.organization);
  const category = t(item.categoryKey, item.category);

  return (
    <div className="border-b border-[#E1E7F6] py-3 first:border-t-[#E1E7F6] md:py-4">
      <div className="hidden items-center gap-4 lg:grid lg:grid-cols-[56px_minmax(0,1.35fr)_minmax(0,1.15fr)_minmax(0,0.95fr)_64px] lg:gap-x-6 xl:gap-x-10">
        <p className="HeadingH5 font-bold text-[#293B93]">{item.index}</p>
        <p className="Text font-semibold text-[#111827]">{title}</p>
        <p className="TextSmall font-normal text-[#666]">{organization}</p>
        <p className="TextSmall text-right text-[11px] font-medium uppercase tracking-[0.12em] text-[#666]">
          {category}
        </p>
        <p className="Text text-right font-bold text-[#293B93]">{item.year}</p>
      </div>

      <div className="min-w-0 lg:hidden">
        <div className="flex items-start justify-between gap-4">
          <p className="HeadingH5 font-bold text-[#293B93]">{item.index}</p>
          <p className="HeadingH5 font-bold text-[#293B93]">{item.year}</p>
        </div>
        <p className="HeadingH5 mt-3 font-semibold text-[#000]">{title}</p>
        <p className="TextSmall mt-2 font-normal text-[#666666]">{organization}</p>
        <p className="TextSmall mt-2 text-[11px] font-medium uppercase tracking-[0.12em] text-[#9CA3AF]">
          {category}
        </p>
      </div>
    </div>
  );
}

export default function AboutUsRecognitionSection() {
  const t = usePathTranslation("aboutUsPage.recognitionSection");

  return (
    <section className="relative overflow-hidden bg-[#F8F9FC] py-8 md:py-16">
      <div className="relative container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl text-center">
          <SectionEyebrow>{t("eyebrow", "RECOGNITION")}</SectionEyebrow>

          <h2 className="HeadingH1 mx-auto mt-4 max-w-4xl font-semibold leading-[1.2] text-[#000]">
            {t("titleLine1", "Industry recognition,")}
            <br />
            <span className="text-[#293B93]">
              {t("titleLine2", "numerous awards")}
            </span>
          </h2>

          <p className="Text mx-auto mt-5 max-w-3xl font-normal leading-[1.6] text-[#000032] md:mt-6">
            {t(
              "description",
              "GTCFX maintains deep partnerships with top global fintech events, liquidity providers, and platform suppliers, and has received industry recognition on multiple occasions."
            )}
          </p>

          <div className="mt-12 text-left lg:mt-16">
            {AWARD_ITEMS.map((item) => (
              <AwardRow key={item.key} item={item} t={t} />
            ))}
          </div>

          <div className="mt-10 flex justify-center md:mt-12">
            <Button
              href={REGISTER_HREF}
              external
              variant="brand"
              size="md"
              showArrow
            >
              {t("startTrading", "Start trading")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

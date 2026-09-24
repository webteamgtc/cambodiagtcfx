"use client";

import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import Button from "@/app/[locale]/components/common/Button";
import { useLocale, usePathTranslation } from "../../../LocaleProvider";
import { localizedHref } from "@/i18n/localizedHref";

const REGULATORS = [
  { key: "fsca", code: "FSCA", region: "S. AFRICA", codeKey: "regulators.fsca.code", regionKey: "regulators.fsca.region" },
  { key: "vfsc", code: "VFSC", region: "VANUATU", codeKey: "regulators.vfsc.code", regionKey: "regulators.vfsc.region" },
  { key: "fca", code: "FCA", region: "UK", codeKey: "regulators.fca.code", regionKey: "regulators.fca.region" },
  { key: "asic", code: "ASIC", region: "AUSTRALIA", codeKey: "regulators.asic.code", regionKey: "regulators.asic.region" },
  { key: "fsc", code: "FSC", region: "MAURITIUS", codeKey: "regulators.fsc.code", regionKey: "regulators.fsc.region" },
];

function RegulatorCell({ item, t }) {
  return (
    <div className="flex flex-col items-center justify-center bg-white px-3 py-3 sm:py-5">
      <p className="HeadingH5 font-bold text-[#293B93]">
        {t(item.codeKey, item.code)}
      </p>
      <p className=" mt-1.5 text-xs font-normal uppercase tracking-[0.05em] text-[#666666]">
        {t(item.regionKey, item.region)}
      </p>
    </div>
  );
}

function SectionDivider() {
  return (
    <div className="flex flex-col items-center py-8 md:py-10" aria-hidden>
      <div className="h-16 w-px bg-[#293B93] md:h-24" />
      <span className="mt-0 h-2.5 w-2.5 rotate-45 bg-[#293B93]" />
    </div>
  );
}

export default function AboutUsRegulationMissionSection() {
  const t = usePathTranslation("aboutUsPage.regulationMissionSection");
  const locale = useLocale();

  return (
    <section className="relative overflow-hidden bg-white py-8 md:py-16">
      <div className="relative container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl text-center lg:text-left">
          <SectionEyebrow>{t("regulatedEyebrow", "REGULATED")}</SectionEyebrow>

          <div className="mt-0 flex flex-col gap-5 lg:flex-row  lg:justify-between lg:gap-10">
            <h2 className="HeadingH2 max-w-3xl font-semibold leading-[1.2] mt-3 text-[#000]">
              {t("regulatedTitle")}
            </h2>

            <div className="mx-auto shrink-0 md:mx-0 lg:pb-1">
              <Button
                href={localizedHref(locale, "/company/regulations")}
                variant="brand"
                size="md"
                showArrow
                className="!w-auto sm:!w-auto"
              >
                {t("regulatedLink")}
              </Button>
            </div>
          </div>

          <div className="mt-10 overflow-hidden rounded-sm border border-[#E1E7F6] lg:mt-12">
            <div className="grid grid-cols-2 gap-px bg-[#E5EAF4] sm:grid-cols-3 lg:grid-cols-5">
              {REGULATORS.map((item) => (
                <RegulatorCell key={item.key} item={item} t={t} />
              ))}
            </div>
          </div>

          <SectionDivider />

          <div className="text-center">
            <SectionEyebrow>{t("missionEyebrow", "OUR MISSION")}</SectionEyebrow>

            <blockquote className="mx-auto mt-5 max-w-4xl">
              <p className="HeadingH1 text-center font-semibold leading-[1.2] mt-5 text-[#000]">
                <span className="text-[#293B93]">&ldquo;</span>
                {t("missionQuoteBefore")} <br /> 
                             <span className="text-[#293B93]">
                  {t("missionQuoteAccent")}
                </span>
                {t("missionQuoteAfter")}
                <span className="text-[#293B93]">&rdquo;</span>
              </p>
            </blockquote>

            <p className=" mt-6 text-xs font-normal uppercase tracking-[0.18em] text-[#000032] md:mt-8">
              {t("missionFooter")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

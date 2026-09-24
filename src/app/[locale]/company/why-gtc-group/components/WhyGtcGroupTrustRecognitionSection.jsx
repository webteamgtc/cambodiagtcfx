"use client";

import MobilePeekCarousel from "@/app/[locale]/components/common/MobilePeekCarousel";
import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import { usePathTranslation } from "../../../LocaleProvider";

const REGULATORS = [
  {
    key: "fca",
    label: "Regulated by",
    code: "FCA",
    authority: "UK Financial Conduct Authority",
    labelKey: "regulators.fca.label",
    codeKey: "regulators.fca.code",
    authorityKey: "regulators.fca.authority",
  },
  {
    key: "sfc",
    label: "Licensed with",
    code: "SFC",
    authority: "Securities & Futures Commission HK",
    labelKey: "regulators.sfc.label",
    codeKey: "regulators.sfc.code",
    authorityKey: "regulators.sfc.authority",
  },
  {
    key: "mas",
    label: "Registered",
    code: "MAS",
    authority: "Monetary Authority of Singapore",
    labelKey: "regulators.mas.label",
    codeKey: "regulators.mas.code",
    authorityKey: "regulators.mas.authority",
  },
  {
    key: "finra",
    label: "Member of",
    code: "FINRA",
    authority: "US Self-Regulatory Organization",
    labelKey: "regulators.finra.label",
    codeKey: "regulators.finra.code",
    authorityKey: "regulators.finra.authority",
  },
];

const AWARDS = [
  {
    key: "institutionalBroker",
    text: "Best Institutional Broker 2024 — Global Finance Awards",
    textKey: "awards.institutionalBroker",
  },
  {
    key: "wealthManager",
    text: "Top Wealth Manager 2023 — Asia Asset Management",
    textKey: "awards.wealthManager",
  },
  {
    key: "iso27001",
    text: "ISO 27001 Certified — Information Security",
    textKey: "awards.iso27001",
  },
];

function DocumentIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16" fill="none">
    <path d="M9.33332 1.6H1.55555V14.4H12.4444V4.8H9.33332V1.6ZM0 0.7936C0 0.3552 0.347666 0 0.776999 0H10.1111L14 4V15.1944C14.0007 15.2995 13.9813 15.4036 13.9429 15.501C13.9044 15.5983 13.8477 15.6869 13.776 15.7617C13.7043 15.8365 13.619 15.8961 13.5249 15.937C13.4308 15.9778 13.3298 15.9993 13.2276 16H0.772332C0.568071 15.9985 0.372569 15.9145 0.228058 15.766C0.0835472 15.6175 0.00162917 15.4165 0 15.2064V0.7936ZM9.33332 7.2H10.1111V11.2H3.88888V7.2H4.66666V6.4C4.66666 5.76348 4.91249 5.15303 5.35008 4.70294C5.78766 4.25286 6.38115 4 6.99999 4C7.61883 4 8.21232 4.25286 8.6499 4.70294C9.08749 5.15303 9.33332 5.76348 9.33332 6.4V7.2ZM7.77777 7.2V6.4C7.77777 6.18783 7.69582 5.98434 7.54996 5.83431C7.4041 5.68428 7.20627 5.6 6.99999 5.6C6.79371 5.6 6.59588 5.68428 6.45002 5.83431C6.30416 5.98434 6.22221 6.18783 6.22221 6.4V7.2H7.77777Z" fill="#293B93"/>
  </svg>
  );
}

function RegulatorCard({ item, t }) {
  return (
    <article className="flex flex-col items-center justify-center px-4 py-4 text-center"
      style={{
        borderRadius: "22px",
        border: "1px solid #E1E7F6",
        background: "#FFF",
      }}
    >
      <p className="TextSmall font-normal text-[#69729F]">
        {t(item.labelKey, item.label)}
      </p>
      <p className="HeadingH4 mt-1 font-bold text-[#293B93]">
        {t(item.codeKey, item.code)}
      </p>
      <p className="TextSmall mt-1 max-w-[12rem] font-normal leading-[1.5] text-[#69729F] sm:max-w-none">
        {t(item.authorityKey, item.authority)}
      </p>
    </article>
  );
}

function AwardItem({ item, t, className = "" }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center"
        style={{
          borderRadius: "10px",
          background: "rgba(225, 231, 246, 0.58)",
        }}
      >
        <DocumentIcon className="h-3 w-3" />
      </span>
      <p className="TextSmall text-left font-normal leading-[1.55] text-[#666666]">
        {t(item.textKey, item.text)}
      </p>
    </div>
  );
}

export default function WhyGtcGroupTrustRecognitionSection() {
  const t = usePathTranslation("whyGtcGroupPage.trustRecognitionSection");

  return (
    <section className=" py-8 md:py-12">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl text-center">
          <SectionEyebrow variant="compact">
            {t("eyebrow", "Trust & Recognition")}
          </SectionEyebrow>

          <h2 className="HeadingH1 mx-auto mt-4">
            {t("title", "Regulated. Recognized. Trusted.")}
          </h2>

          <p className="Text mx-auto mt-5 max-w-3xl font-normal leading-[1.7] text-[#000032]/60 md:mt-6">
            {t(
              "description",
              "Multi-jurisdictional oversight and a consistent track record of industry recognition."
            )}
          </p>

          <div className="mt-8 border-b border-[#E1E7F6] pb-6 sm:hidden md:mt-12">
            <MobilePeekCarousel
              items={REGULATORS}
              showArrows
              className="w-full min-w-0"
              trackClassName="-mx-4 px-4 min-w-0"
              slideClassName="!h-auto"
              renderItem={(item) => (
                <div className="w-full min-w-0 max-w-full px-1">
                  <RegulatorCard item={item} t={t} />
                </div>
              )}
            />
          </div>

          <div className="mt-8 hidden grid-cols-1 gap-4 border-b border-[#E1E7F6] pb-10 sm:grid sm:grid-cols-2 sm:gap-5 md:mt-12 lg:grid-cols-4">
            {REGULATORS.map((item) => (
              <RegulatorCard key={item.key} item={item} t={t} />
            ))}
          </div>

          <div className="mx-auto max-w-4xl pt-8 md:pt-10">
            <div className="grid grid-cols-1 gap-6 text-left sm:grid-cols-2 sm:gap-x-10 sm:gap-y-7">
              {AWARDS.slice(0, 2).map((item) => (
                <AwardItem key={item.key} item={item} t={t} />
              ))}
            </div>

            <div className="mt-6 flex justify-center sm:mt-6">
              <AwardItem
                item={AWARDS[2]}
                t={t}
                className="w-full max-w-md sm:max-w-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

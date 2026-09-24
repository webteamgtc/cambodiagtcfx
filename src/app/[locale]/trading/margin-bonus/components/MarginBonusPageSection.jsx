"use client";

import { Suspense, useState } from "react";
import PrimaryButton from "@/app/[locale]/components/common/PrimaryButton";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";
import MarginBonusDrawer from "./MarginBonusDrawer";

function SummaryCard({ item }) {
  return (
    <div className="rounded-[24px] border border-[#E5E7EB] bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-[#6B7280]">{item.label}</p>
      <h4 className="mt-2 text-[28px] font-bold text-secondary md:text-[34px]">
        {item.value}
      </h4>
    </div>
  );
}

function SectionCard({ number, title, children }) {
  return (
    <div className="rounded-[28px] border border-[#E5E7EB] bg-white p-6 shadow-sm md:p-8">
      <div className="flex items-center gap-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl bg-[#263788]/10 font-semibold text-[#263788]">
          {number}
        </div>
        <h3 className="HeadingH5 font-semibold">
          {title}
        </h3>
      </div>

      <div className="mt-6 text-[15px] leading-8 text-[#374151] md:text-base">
        {children}
      </div>
    </div>
  );
}

export default function MarginBonusPageSection({ messages = {} }) {
  const t = usePathTranslation("marginBonusPage");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const summaryCards = [
    {
      label: t("summary.minimumDeposit.label"),
      value: t("summary.minimumDeposit.value"),
    },
    {
      label: t("summary.bonusRate.label"),
      value: t("summary.bonusRate.value"),
    },
    {
      label: t("summary.maxBonus.label"),
      value: t("summary.maxBonus.value"),
    },
    {
      label: t("summary.cashback.label"),
      value: t("summary.cashback.value"),
    },
  ];

  const restrictedCountries = [
    t("eligibility.notAvailableCountries.one"),
    t("eligibility.notAvailableCountries.two"),
    t("eligibility.notAvailableCountries.three"),
    t("eligibility.notAvailableCountries.four"),
    t("eligibility.notAvailableCountries.five"),
    t("eligibility.notAvailableCountries.six"),
  ];

  const cashbackExamples = [
    {
      text: t(
        "cashback.examples.one.text"),
      good: true,
    },
    {
      text: t(
        "cashback.examples.two.text"),
      good: false,
    },
    {
      text: t(
        "cashback.examples.three.text"),
      good: true,
    },
    {
      text: t(
        "cashback.examples.four.text"),
      good: false,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#F8FAFC] py-14 md:py-20">
      <div className="pointer-events-none absolute left-[-100px] top-10 h-[260px] w-[260px] rounded-xl bg-[#263788]/5 blur-3xl" />
      <div className="pointer-events-none absolute right-[-100px] bottom-10 h-[280px] w-[280px] rounded-xl bg-[#b68756]/10 blur-3xl" />

      <div className="container relative z-10">
        {/* Hero */}
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex rounded-xl border border-[#b68756]/20 bg-[#b68756]/10 px-4 py-1.5 text-sm font-semibold text-[#b68756]">
            {t("hero.badge")}
          </span>

          <h1 className="HeadingH3 mt-5">
            {t("hero.titleStart")}{" "}
            <span className="text-[#b68756]">{t("hero.titleHighlight")}</span>?
          </h1>

          <p className="mt-5 text-[15px] leading-7 text-[#4B5563] md:text-lg md:leading-8">
            {t("hero.description")}
          </p>
        </div>

        {/* Warning */}
        <div className="mx-auto mt-8 max-w-5xl rounded-[24px] border border-[#FECACA] bg-[#FEF2F2] px-5 py-4 md:px-6">
          <p className="text-sm font-semibold leading-7 text-[#DC2626] md:text-base">
            {t("warning.text")}
          </p>
        </div>

        {/* Apply Now CTA */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setDrawerOpen(true)}
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#263788] to-[#1a2566] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(38,55,136,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(38,55,136,0.35)] focus:outline-none focus:ring-2 focus:ring-[#263788]/50 focus:ring-offset-2"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" fill="currentColor" fillOpacity="0.15" />
            </svg>
            Apply Now
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true">
              <path d="M5 12h14m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Summary cards */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map((item) => (
            <SummaryCard key={item.label} item={item} />
          ))}
        </div>

        {/* Terms */}
        <div className="mt-10 space-y-6">
          <SectionCard number="1" title={t("eligibility.title")}>
            <ol className="list-decimal space-y-3 pl-5">
              <li>{t("eligibility.points.one")}</li>
              <li>
                {t("eligibility.points.two")}:
                <ul className="mt-2 list-disc pl-5">
                  <li>{t("eligibility.subPoints.one")}</li>
                  <li>{t("eligibility.subPoints.two")}</li>
                </ul>
              </li>
              <li>{t("eligibility.points.three")}</li>
              <li>{t("eligibility.points.four")}</li>
              <li>{t("eligibility.points.five")}</li>
              <li>{t("eligibility.points.six")}</li>
            </ol>

            <div className="mt-6 rounded-2xl bg-[#F8FAFC] p-4">
              <p className="text-sm font-semibold text-primary">{t("eligibility.notAvailableLabel")}:</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {restrictedCountries.map((country) => (
                  <span
                    key={country}
                    className="rounded-xl border border-[#E5E7EB] bg-white px-3 py-1 text-sm text-[#4B5563]"
                  >
                    {country}
                  </span>
                ))}
              </div>
            </div>
          </SectionCard>

          <SectionCard number="2" title={t("bonusSize.title")}>
            <ol className="list-decimal space-y-3 pl-5">
              <li>
                {t("bonusSize.points.one")}:
                <ul className="mt-2 list-disc pl-5">
                  <li>{t("bonusSize.subPoints.one")}</li>
                  <li>{t("bonusSize.subPoints.two")}</li>
                </ul>
              </li>
              <li>{t("bonusSize.points.two")}</li>
              <li>{t("bonusSize.points.three")}</li>
              <li>{t("bonusSize.points.four")}</li>
            </ol>
          </SectionCard>

          <SectionCard number="3" title={t("cashback.title")}>
            <ol className="list-decimal space-y-3 pl-5">
              <li>{t("cashback.points.one")}</li>
              <li>
                {t("cashback.points.two")}:
                <ul className="mt-2 list-disc pl-5">
                  <li>{t("cashback.subPoints.one")}</li>
                  <li>{t("cashback.subPoints.two")}</li>
                </ul>
              </li>
            </ol>

            <div className="mt-6 rounded-[24px] bg-[#F8FAFC] p-4 md:p-5">
              <p className="mb-4 text-sm font-semibold text-primary md:text-base">{t("cashback.examplesLabel")}</p>
              <div className="space-y-3">
                {cashbackExamples.map((item, index) => (
                  <div
                    key={index}
                    className={`rounded-2xl border px-4 py-3 text-sm leading-7 ${item.good
                        ? "border-[#BBF7D0] bg-[#F0FDF4] text-[#166534]"
                        : "border-[#FECACA] bg-[#FEF2F2] text-[#B91C1C]"
                      }`}
                  >
                    {item.text}{" "}
                    <strong>
                      {item.good
                        ? `\u2192 ${t("cashback.status.eligible")}`
                        : `\u2192 ${t("cashback.status.ineligible")}`}
                    </strong>
                  </div>
                ))}
              </div>
            </div>

            <ol start={3} className="mt-6 list-decimal space-y-3 pl-5">
              <li>{t("cashback.points.three")}</li>
              <li>{t("cashback.points.four")}</li>
              <li>{t("cashback.points.five")}</li>
            </ol>
          </SectionCard>

          <SectionCard number="4" title={t("bonusUse.title")}>
            <ol className="list-decimal space-y-3 pl-5">
              <li>
                {t("bonusUse.points.one")}:
                <ul className="mt-2 list-disc pl-5">
                  <li>{t("bonusUse.subPoints.one")}</li>
                  <li>{t("bonusUse.subPoints.two")}</li>
                  <li>{t("bonusUse.subPoints.three")}</li>
                </ul>
              </li>
              <li>{t("bonusUse.points.two")}</li>
            </ol>
          </SectionCard>

          <SectionCard number="5" title={t("withdrawalConditions.title")}>
            <ol className="list-decimal space-y-3 pl-5">
              <li>{t("withdrawalConditions.points.one")}</li>
              <li>{t("withdrawalConditions.points.two")}</li>
            </ol>
          </SectionCard>

          <SectionCard number="6" title={t("bonusExpiry.title")}>
            <ol className="list-decimal space-y-3 pl-5">
              <li>{t("bonusExpiry.points.one")}</li>
              <li>{t("bonusExpiry.points.two")}</li>
              <li>{t("bonusExpiry.points.three")}</li>
            </ol>
          </SectionCard>

          <SectionCard number="7" title={t("abusePolicy.title")}>
            <ol className="list-decimal space-y-3 pl-5">
              <li>
                {t("abusePolicy.points.one")}:
                <ul className="mt-2 list-disc pl-5">
                  <li>{t("abusePolicy.subPoints.one")}</li>
                  <li>{t("abusePolicy.subPoints.two")}</li>
                  <li>{t("abusePolicy.subPoints.three")}</li>
                </ul>
              </li>
              <li>
                {t("abusePolicy.points.two")}:
                <ul className="mt-2 list-disc pl-5">
                  <li>{t("abusePolicy.actions.one")}</li>
                  <li>{t("abusePolicy.actions.two")}</li>
                  <li>{t("abusePolicy.actions.three")}</li>
                </ul>
              </li>
            </ol>
          </SectionCard>

          <SectionCard number="8" title={t("stopOutPolicy.title")}>
            <ol className="list-decimal space-y-3 pl-5">
              <li>{t("stopOutPolicy.points.one")}</li>
            </ol>
          </SectionCard>

          <SectionCard number="9" title={t("clientAcknowledgment.title")}>
            <ol className="list-decimal space-y-3 pl-5">
              <li>{t("clientAcknowledgment.points.one")}</li>
              <li>{t("clientAcknowledgment.points.two")}</li>
            </ol>
          </SectionCard>
        </div>

        {/* Apply box */}
        <div className="mt-10 rounded-[28px] border border-[#DBEAFE] bg-[#EFF6FF] p-6 md:p-8">
          <h3 className="HeadingH4 font-semibold text-secondary">
            {t("howToApply.title")}
          </h3>

          <ol className="mt-5 list-decimal space-y-3 pl-5 text-[15px] leading-8 text-[#374151] md:text-base">
            <li>{t("howToApply.points.one")}</li>
            <li>{t("howToApply.points.two")}</li>
            <li>{t("howToApply.points.three")}</li>
            <li>{t("howToApply.points.four")}</li>
          </ol>

          <p className="mt-6 text-[15px] leading-7 text-[#4B5563] md:text-base">
            {t("howToApply.cashbackNote")}
          </p>

          <p className="mt-3 text-[15px] leading-7 text-[#4B5563] md:text-base">
            {t("howToApply.assistanceNote")}
          </p>

          <div className="mt-8">
            <PrimaryButton>
              {t("howToApply.buttonLabel")}
            </PrimaryButton>
          </div>
        </div>
      </div>
      <Suspense fallback={null}>
        <MarginBonusDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      </Suspense>
    </section>
  );
}
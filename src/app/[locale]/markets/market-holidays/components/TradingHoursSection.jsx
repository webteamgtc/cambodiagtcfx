"use client";

import { useMemo, useState } from "react";
import RevealOnScroll from "../../../components/RevealOnScroll";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";
import { getTradingHoursRows } from "./tradingHoursData";

const TAB_KEYS = ["fx", "goldSilver", "crudeOil", "crypto", "cashIndices", "stocks"];
const DAY_KEYS = ["mon", "tue", "wed", "thu", "fri"];
const DAY_FALLBACKS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

function formatSessions(value) {
  if (!value || value === "—") return ["—"];
  return String(value)
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
}

function TimeSessions({ value, className = "" }) {
  const sessions = formatSessions(value);

  return (
    <div className={`flex flex-col gap-0.5 ${className}`}>
      {sessions.map((session, index) => (
        <span
          key={`${session}-${index}`}
          className="whitespace-nowrap font-medium tabular-nums leading-snug"
        >
          {session}
        </span>
      ))}
    </div>
  );
}

function PricingTradingSplit({
  pricing,
  trading,
  t,
  showLabels = false,
  className = "",
}) {
  return (
    <div
      className={[
        "grid grid-cols-2 divide-x divide-[#D8DEEF] text-center",
        showLabels ? "text-xs" : "text-xs sm:text-sm",
        className,
      ].join(" ")}
    >
      <div className="min-w-0 px-3 py-1">
        {showLabels ? (
          <span className="text-xs font-medium">{t("pricing", "Pricing")}</span>
        ) : (
          <TimeSessions value={pricing} className="items-center text-[#555555]" />
        )}
      </div>
      <div className="min-w-0 px-3 py-1">
        {showLabels ? (
          <span className="text-xs font-medium">{t("trading", "Trading")}</span>
        ) : (
          <TimeSessions value={trading} className="items-center text-[#293B93]" />
        )}
      </div>
    </div>
  );
}

function DayTimes({ time, t }) {
  return (
    <div className="space-y-3 text-xs sm:text-sm">
      <div>
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-[#999999]">
          {t("pricing", "Pricing")}
        </p>
        <TimeSessions value={time.pricing} className="text-[#555555]" />
      </div>
      <div>
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-[#999999]">
          {t("trading", "Trading")}
        </p>
        <TimeSessions value={time.trading} className="text-[#293B93]" />
      </div>
    </div>
  );
}

function InstrumentMobileCard({ row, t }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-[#E1E7F6] bg-white shadow-sm">
      <div className="border-b border-[#EEF1F8] bg-[#F7F8FC] px-4 py-3">
        <h3 className="TextSmall font-bold text-[#293B93]">{row.symbol}</h3>
      </div>

      <ul className="divide-y divide-[#EEF1F8]">
        {row.times.map((time, dayIndex) => (
          <li key={DAY_KEYS[dayIndex]} className="px-4 py-3">
            <p className="TextSmall mb-2 font-medium text-[#666666]">
              {t(`days.${dayIndex}`, DAY_FALLBACKS[dayIndex])}
            </p>
            <DayTimes time={time} t={t} />
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function TradingHoursSection() {
  const t = usePathTranslation("marketHolidaysPage.tradingHours");
  const [activeTab, setActiveTab] = useState("fx");

  const rows = useMemo(() => getTradingHoursRows(activeTab), [activeTab]);

  return (
    <section
      id="trading-hours"
      className="container w-full scroll-mt-24 py-10 md:py-16"
    >
      <RevealOnScroll>
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#293B93]">
              {t("eyebrow", "Market schedule")}
            </p>
            <h2 className="HeadingH2 mt-3 text-[#000032]">
              {t("heading", "Forex & CFD Trading Hours")}
            </h2>
            <p className="Text mt-3 font-normal leading-[1.7] text-[#000032]/60">
              {t(
                "sub",
                "View the latest trading hours for Forex, Metals, Commodities, and other financial instruments. GTCFX provides updated market session times to help you plan your trades effectively. Please note these times provided are subject to change. For the most accurate and real-time session details, please refer to your trading terminal or check the specifications of each instrument."
              )}
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={80}>
          <div className="mt-8 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div
              role="tablist"
              aria-label={t("tabsLabel", "Instrument categories")}
              className="mx-auto flex w-max min-w-full justify-start gap-2 rounded-2xl border border-[#E1E7F6] bg-white p-2 sm:justify-center"
            >
              {TAB_KEYS.map((key) => {
                const active = activeTab === key;
                return (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveTab(key)}
                    className={[
                      "whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-semibold transition",
                      active
                        ? "bg-[#293B93] text-white shadow-sm"
                        : "text-[#555555] hover:bg-[#F0F2F8] hover:text-[#293B93]",
                    ].join(" ")}
                  >
                    {t(`tabs.${key}`, key)}
                  </button>
                );
              })}
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={140}>
          {/* Mobile / tablet cards */}
          <div className="mt-6 space-y-3 lg:hidden">
            {rows.map((row) => (
              <InstrumentMobileCard key={row.symbol} row={row} t={t} />
            ))}
          </div>

          {/* Desktop table */}
          <div className="mt-6 hidden w-full overflow-hidden rounded-2xl border border-[#E1E7F6] bg-white shadow-sm lg:block">
            <table className="w-full table-fixed border-collapse text-left">
              <colgroup>
                <col style={{ width: "13%" }} />
                {DAY_KEYS.map((day) => (
                  <col key={day} style={{ width: "17.4%" }} />
                ))}
              </colgroup>
              <thead>
                <tr className="bg-[#293B93] text-white">
                  <th className="sticky left-0 z-10 bg-[#293B93] px-5 py-4 text-sm font-semibold">
                    {t("symbolsHeader", "Symbols")}
                  </th>
                  {DAY_KEYS.map((day, index) => (
                    <th
                      key={day}
                      className="px-2 py-4 text-center text-sm font-semibold"
                    >
                      {t(`days.${index}`, DAY_FALLBACKS[index])}
                    </th>
                  ))}
                </tr>
                <tr className="bg-[#F0F2FA] text-xs text-[#666666]">
                  <th className="sticky left-0 z-10 bg-[#F0F2FA] px-5 py-2" />
                  {DAY_KEYS.map((day) => (
                    <th key={`${day}-sub`} className="px-2 py-2 font-medium">
                      <PricingTradingSplit
                        pricing=""
                        trading=""
                        t={t}
                        showLabels
                      />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr
                    key={row.symbol}
                    className={[
                      "group border-b border-[#EEF1F8] transition hover:bg-[#F7F8FC]",
                      index === rows.length - 1 ? "border-b-0" : "",
                    ].join(" ")}
                  >
                    <td className="sticky left-0 z-10 bg-white px-5 py-4 text-sm font-bold text-[#293B93] transition group-hover:bg-[#F7F8FC]">
                      {row.symbol}
                    </td>
                    {row.times.map((time, dayIndex) => (
                      <td key={DAY_KEYS[dayIndex]} className="px-2 py-4 align-top">
                        <PricingTradingSplit
                          pricing={time.pricing}
                          trading={time.trading}
                          t={t}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="TextSmall mt-4 text-center text-[#888888]">
            {t(
              "footnote",
              "Schedules are indicative and may change during market holidays or daylight saving adjustments."
            )}
          </p>
      </RevealOnScroll>
    </section>
  );
}

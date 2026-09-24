"use client";

import { useState, useEffect } from "react";
import { usePathTranslation } from "../../LocaleProvider";

// ─── Sample Data ───────────────────────────────────────────────────────────────
const EVENTS = [
  {
    id: 1,
    date: "Monday, 25 May 2026",
    time: "All day",
    flag: "🇺🇸",
    currency: "USD",
    impact: null,
    event: "Memorial Day",
    act: "-",
    fcst: "-",
    prev: "-",
    chart: false,
  },
  {
    id: 2,
    date: "Monday, 25 May 2026",
    time: "All day",
    flag: "🇬🇧",
    currency: "GBP",
    impact: null,
    event: "Spring Bank Holiday",
    act: "-",
    fcst: "-",
    prev: "-",
    chart: false,
  },
  {
    id: 3,
    date: "Monday, 25 May 2026",
    time: "All day",
    flag: "🇨🇭",
    currency: "USD",
    impact: null,
    event: "Whit Monday",
    act: "-",
    fcst: "-",
    prev: "-",
    chart: false,
  },
  {
    id: 4,
    date: "Monday, 25 May 2026",
    time: "All day",
    flag: "🇳🇴",
    currency: "CHF",
    impact: null,
    event: "Whit Monday",
    act: "-",
    fcst: "-",
    prev: "-",
    chart: false,
  },
  {
    id: 5,
    date: "Monday, 25 May 2026",
    time: "All day",
    flag: "🇰🇷",
    currency: "KRW",
    impact: null,
    event: "Buddha's Birthday",
    act: "-",
    fcst: "-",
    prev: "-",
    chart: false,
  },
  {
    id: 6,
    date: "Monday, 25 May 2026",
    time: "All day",
    flag: "🇸🇬",
    currency: "SGD",
    impact: null,
    event: "CPI y/y",
    act: "-",
    fcst: "-",
    prev: "-",
    chart: false,
  },
  {
    id: 7,
    date: "Monday, 25 May 2026",
    time: "All day",
    flag: "🇨🇭",
    currency: "CHF",
    impact: "medium",
    event: "CPI y/y",
    act: "N/D",
    fcst: "2.0%",
    prev: "1.8%",
    chart: true,
  },
  {
    id: 8,
    date: "Monday, 25 May 2026",
    time: "All day",
    flag: "🇧🇷",
    currency: "BRL",
    impact: "high",
    event: "FGV Consumer Confidence",
    act: "1.8%",
    fcst: "90.3",
    prev: "89.1",
    chart: true,
  },
  {
    id: 9,
    date: "Tuesday, 26 May 2026",
    time: "08:30",
    flag: "🇺🇸",
    currency: "USD",
    impact: "high",
    event: "Core Durable Goods Orders m/m",
    act: "0.3%",
    fcst: "0.2%",
    prev: "-0.1%",
    chart: true,
  },
  {
    id: 10,
    date: "Tuesday, 26 May 2026",
    time: "10:00",
    flag: "🇪🇺",
    currency: "EUR",
    impact: "medium",
    event: "Consumer Confidence Flash",
    act: "-",
    fcst: "-14.5",
    prev: "-16.0",
    chart: false,
  },
  {
    id: 11,
    date: "Wednesday, 27 May 2026",
    time: "14:00",
    flag: "🇺🇸",
    currency: "USD",
    impact: "low",
    event: "CB Consumer Confidence",
    act: "-",
    fcst: "98.5",
    prev: "97.0",
    chart: false,
  },
];

const TAB_KEYS = ["today", "tomorrow", "thisWeek", "customDates"];
const DAY_KEYS = ["all", "mon", "tue", "wed", "thu", "fri", "sat", "sun"];

const IMPACT_DOT = {
  high: "bg-red-500",
  medium: "bg-yellow-400",
  low: "bg-gray-300",
};

// ─── Calendar SVG ──────────────────────────────────────────────────────────────
function CalendarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#1a3591]">
      <rect x="3" y="4" width="18" height="17" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 9h18" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 2v4M16 2v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

// ─── Sliders / Filter SVG ─────────────────────────────────────────────────────
function FiltersIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#1a3591]">
      <path d="M4 6h16M7 12h10M10 18h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

// ─── Bar Chart SVG ────────────────────────────────────────────────────────────
function BarChartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#1a3591]">
      <rect x="3" y="12" width="4" height="9" rx="1" fill="currentColor" opacity="0.4" />
      <rect x="10" y="7" width="4" height="14" rx="1" fill="currentColor" opacity="0.7" />
      <rect x="17" y="3" width="4" height="18" rx="1" fill="currentColor" />
    </svg>
  );
}

// ─── Small calendar icon for event cell ──────────────────────────────────────
function EventCalIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-[#1a3591] shrink-0 mt-0.5">
      <rect x="3" y="4" width="18" height="17" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M3 9h18" stroke="currentColor" strokeWidth="2" />
      <path d="M8 2v4M16 2v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// ─── Chevron Down ─────────────────────────────────────────────────────────────
function ChevronDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#1a3591]">
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CustomEconomicCalendarSection() {
  const t = usePathTranslation("knowledgePage.economicCalendar");
  const [activeTab, setActiveTab] = useState(0);
  const [activeDay, setActiveDay] = useState("all");
  const [currentTime, setCurrentTime] = useState("");

  // Live clock
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const h = String(now.getUTCHours() + 8).padStart(2, "0");
      const m = String(now.getUTCMinutes()).padStart(2, "0");
      setCurrentTime(`${h}:${m}`);
    };
    update();
    const t = setInterval(update, 60000);
    return () => clearInterval(t);
  }, []);

  // Group events by date
  const grouped = EVENTS.reduce((acc, ev) => {
    if (!acc[ev.date]) acc[ev.date] = [];
    acc[ev.date].push(ev);
    return acc;
  }, {});

  return (
    <section id="technical-analysis" className="py-10 md:py-14 bg-white">
      <div className="container mx-auto max-w-6xl">
        {/* ── Heading ── */}
        <div className="text-center mb-10">
          <h2
            className="HeadingH3 font-bold mb-3"
            style={{ color: "#293B93" }}
          >
            {t("heading", "Economic Calendar")}
          </h2>
          <p className="Text text-gray-500">
            {t("sub", "GTCFX offers a variety of tools to enhance your trading Experience")}
          </p>
        </div>

        {/* ── Main Card ── */}
        <div className="rounded-2xl border border-[#D9DBE5] bg-white overflow-hidden">

          {/* ── Tab Bar ── */}
          <div className="grid grid-cols-4 border-b border-[#D9DBE5]">
            {TAB_KEYS.map((tabKey, i) => (
              <button
                key={tabKey}
                onClick={() => setActiveTab(i)}
                className={`py-5 text-sm font-semibold tracking-widest uppercase transition-colors
                  ${i > 0 ? "border-l border-[#D9DBE5]" : ""}
                  ${activeTab === i
                    ? "bg-[#1a3591] text-white"
                    : "bg-[#EEF0F8] text-[#8a95b8] hover:bg-[#e0e4f0]"
                  }`}
              >
                {t(`tabs.${tabKey}`, tabKey)}
              </button>
            ))}
          </div>

          {/* ── Date Range + Current Time Bar ── */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#D9DBE5]">
            <button className="flex items-center gap-2 text-[#1a3591] font-semibold text-sm">
              <CalendarIcon />
              <span>{t("dateRange", "25 – 31 May, 2026")}</span>
              <ChevronDownIcon />
            </button>
            <div className="flex items-center gap-3">
              <span className="text-[#1a3591] font-semibold text-sm">
                {t("currentTime", "Current time:")}{" "}
                <span className="font-bold">{currentTime || "19:14"}</span>{" "}
                <span className="font-normal">{t("timezone", "(GMT+8:00)")}</span>
              </span>
              <button className="text-[#1a3591] hover:opacity-70 transition-opacity">
                <FiltersIcon />
              </button>
            </div>
          </div>

          {/* ── Day Pills + Impact Legend ── */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-[#D9DBE5]">
            {/* Day pills */}
            <div className="flex items-center gap-1 flex-wrap">
              {DAY_KEYS.map((dayKey) => (
                <button
                  key={dayKey}
                  onClick={() => setActiveDay(dayKey)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors
                    ${activeDay === dayKey
                      ? "bg-[#1a3591] text-white"
                      : "text-[#555e7a] hover:bg-[#EEF0F8]"
                    }`}
                >
                  {t(`days.${dayKey}`, dayKey)}
                </button>
              ))}
            </div>
            {/* Impact legend */}
            <div className="flex items-center gap-4 text-sm text-[#555e7a]">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
                {t("impact.high", "High Impact")}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-yellow-400 inline-block" />
                {t("impact.medium", "Medium Impact")}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-gray-300 inline-block" />
                {t("impact.low", "Low Impact")}
              </span>
            </div>
          </div>

          {/* ── Table ── */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              {/* Table header */}
              <thead>
                <tr className="border-b border-[#D9DBE5]">
                  <th className="text-left py-3 px-5 font-medium text-[#8a95b8] w-24">{t("columns.time", "Time")}</th>
                  <th className="text-left py-3 px-3 font-medium text-[#8a95b8] w-28">{t("columns.currency", "Currency")}</th>
                  <th className="text-left py-3 px-3 font-medium text-[#8a95b8]">{t("columns.event", "Event")}</th>
                  <th className="text-center py-3 px-3 font-medium text-[#8a95b8] w-20">{t("columns.act", "Act")}</th>
                  <th className="text-center py-3 px-3 font-medium text-[#8a95b8] w-20">{t("columns.fcst", "Fcst")}</th>
                  <th className="text-center py-3 px-3 font-medium text-[#8a95b8] w-20">{t("columns.prev", "Prev")}</th>
                  <th className="w-10" />
                </tr>
              </thead>
              <tbody>
                {Object.entries(grouped).map(([date, rows]) => (
                  <>
                    {/* Date group header */}
                    <tr key={date} className="bg-[#F0F2F8]">
                      <td colSpan={7} className="py-3 px-5 font-semibold text-[#1a3591] text-sm">
                        {date}
                      </td>
                    </tr>
                    {/* Event rows */}
                    {rows.map((ev) => (
                      <tr
                        key={ev.id}
                        className="border-b border-[#F0F2F8] hover:bg-[#fafbff] transition-colors"
                      >
                        {/* Time */}
                        <td className="py-4 px-5 text-[#555e7a]">
                          {ev.time === "All day"
                            ? t("allDay", "All day")
                            : ev.time}
                        </td>

                        {/* Currency */}
                        <td className="py-4 px-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xl leading-none">{ev.flag}</span>
                            <span className="text-[#555e7a] font-medium">{ev.currency}</span>
                          </div>
                        </td>

                        {/* Event */}
                        <td className="py-4 px-3">
                          <div className="flex items-center gap-2">
                            {ev.impact && (
                              <span
                                className={`w-2 h-2 rounded-full shrink-0 ${IMPACT_DOT[ev.impact]}`}
                              />
                            )}
                            {!ev.impact && <EventCalIcon />}
                            <span className="font-semibold text-[#1a1a2e]">{ev.event}</span>
                          </div>
                        </td>

                        {/* Act */}
                        <td className="py-4 px-3 text-center text-[#555e7a]">{ev.act}</td>

                        {/* Fcst */}
                        <td className="py-4 px-3 text-center text-[#555e7a]">{ev.fcst}</td>

                        {/* Prev */}
                        <td className="py-4 px-3 text-center text-[#555e7a]">{ev.prev}</td>

                        {/* Chart icon */}
                        <td className="py-4 px-3 text-center">
                          {ev.chart && <BarChartIcon />}
                        </td>
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

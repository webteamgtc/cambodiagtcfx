"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import RevealOnScroll from "../../../components/RevealOnScroll";
import { useLocale, usePathTranslation } from "@/app/[locale]/LocaleProvider";
import {
  fetchHolidayScheduleMatrix,
  parseHolidayEventsFromMatrix,
} from "@/lib/holiday-schedule";

const MONTH_FALLBACKS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const DAY_FALLBACKS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const badgeClasses = {
  red: "bg-red-50 text-red-700 ring-1 ring-red-100",
  orange: "bg-amber-50 text-amber-800 ring-1 ring-amber-100",
  green: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100",
};

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

function formatDateLong(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

function groupEventsByDate(events) {
  const groups = new Map();
  for (const event of events) {
    if (!groups.has(event.date)) groups.set(event.date, []);
    groups.get(event.date).push(event);
  }
  return [...groups.entries()].sort(([a], [b]) => a.localeCompare(b));
}

function isDateInMonth(dateStr, year, monthIndex) {
  const [y, m] = dateStr.split("-").map(Number);
  return y === year && m === monthIndex + 1;
}

export default function HolidayCalendarSection({ locale: localeProp }) {
  const contextLocale = useLocale();
  const locale = localeProp || contextLocale || "en";
  const t = usePathTranslation("marketHolidaysPage.holidayCalendar");
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [calendarInitialized, setCalendarInitialized] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const matrix = await fetchHolidayScheduleMatrix(locale);
      const events = matrix ? parseHolidayEventsFromMatrix(matrix) : [];
      setHolidays(events);
      setCalendarInitialized(false);
    } catch (error) {
      console.error("Holiday calendar fetch failed:", error);
      setHolidays([]);
    } finally {
      setLoading(false);
    }
  }, [locale]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  useEffect(() => {
    if (!holidays.length || calendarInitialized) return;

    const anchor =
      holidays.find((holiday) => holiday.date >= todayStr) ?? holidays[0];
    const [year, month] = anchor.date.split("-").map(Number);

    if (year && month) {
      setCurrentYear(year);
      setCurrentMonth(month - 1);
    }

    setCalendarInitialized(true);
  }, [holidays, calendarInitialized, todayStr]);

  const holidayDates = useMemo(
    () => new Set(holidays.map((h) => h.date)),
    [holidays]
  );

  const upcomingHolidays = useMemo(
    () => holidays.filter((holiday) => holiday.date >= todayStr),
    [holidays, todayStr]
  );

  const listEvents = useMemo(() => {
    if (selectedDate) {
      return holidays.filter((holiday) => holiday.date === selectedDate);
    }
    return upcomingHolidays;
  }, [holidays, selectedDate, upcomingHolidays]);

  const groupedList = useMemo(() => groupEventsByDate(listEvents), [listEvents]);

  const monthEvents = useMemo(
    () => holidays.filter((holiday) => isDateInMonth(holiday.date, currentYear, currentMonth)),
    [holidays, currentYear, currentMonth]
  );

  const monthGrouped = useMemo(() => groupEventsByDate(monthEvents), [monthEvents]);

  const monthStats = useMemo(() => {
    const earlyClose = monthEvents.filter((e) => e.badgeColor === "orange").length;
    const closed = monthEvents.filter((e) => e.badgeColor === "red").length;
    return {
      dates: monthGrouped.length,
      notices: monthEvents.length,
      earlyClose,
      closed,
    };
  }, [monthEvents, monthGrouped.length]);

  const monthSpotlight = useMemo(() => {
    const fromToday = monthGrouped.filter(([date]) => date >= todayStr);
    const pool = fromToday.length ? fromToday : monthGrouped;
    return pool.slice(0, 4);
  }, [monthGrouped, todayStr]);

  const nextGlobalHoliday = useMemo(
    () => upcomingHolidays[0] ?? null,
    [upcomingHolidays]
  );

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  function prevMonth() {
    setSelectedDate(null);
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  }

  function nextMonth() {
    setSelectedDate(null);
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  }

  function buildDateStr(day) {
    return `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  }

  function handleDateSelect(dateStr) {
    setSelectedDate((prev) => (prev === dateStr ? null : dateStr));
  }

  function jumpToMonth(dateStr) {
    const [year, month] = dateStr.split("-").map(Number);
    if (year && month) {
      setCurrentYear(year);
      setCurrentMonth(month - 1);
    }
    setSelectedDate(dateStr);
  }

  return (
    <section id="holiday-hours" className="w-full scroll-mt-24 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <RevealOnScroll>
          <div className="flex flex-col items-center text-center">
            <h2 className="HeadingH2">
              {t("heading", "Holiday Hours & Notices")}
            </h2>
            <p className="mt-3 max-w-2xl text-gray-500">
              {t(
                "sub",
                "Market holidays may affect trading hours. Review upcoming closures and early-close schedules below."
              )}
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={150}>
          {loading ? (
            <div className="my-12 flex min-h-64 items-center justify-center">
              <span
                className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-[#293B93]/20 border-t-[#293B93]"
                aria-label={t("loadingAria", "Loading holiday schedule")}
              />
            </div>
          ) : (
            <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 items-stretch gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-8">
              {/* Calendar */}
              <div className="flex min-h-[520px] flex-col rounded-2xl border border-[#E1E7F6] bg-white p-5 shadow-[0_8px_40px_rgba(41,59,147,0.08)] md:p-6 lg:max-h-[520px]">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={prevMonth}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#E1E7F6] text-lg text-[#293B93] transition hover:border-[#293B93]/30 hover:bg-[#F3F5FA]"
                    aria-label={t("prevMonthAria", "Previous month")}
                  >
                    ‹
                  </button>
                  <span className="text-center font-semibold text-[#000032]">
                    {t(`months.${currentMonth}`, MONTH_FALLBACKS[currentMonth])}{" "}
                    {currentYear}
                  </span>
                  <button
                    type="button"
                    onClick={nextMonth}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#E1E7F6] text-lg text-[#293B93] transition hover:border-[#293B93]/30 hover:bg-[#F3F5FA]"
                    aria-label={t("nextMonthAria", "Next month")}
                  >
                    ›
                  </button>
                </div>

                <div className="mb-2 grid grid-cols-7 text-center text-xs font-medium uppercase tracking-wide text-[#8A93C0]">
                  {DAY_FALLBACKS.map((d, index) => (
                    <span key={d}>{t(`dayLabels.${index}`, d)}</span>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-y-1 text-center">
                  {Array.from({ length: firstDay }).map((_, i) => (
                    <span key={`empty-${i}`} />
                  ))}

                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const dateStr = buildDateStr(day);
                    const isToday = dateStr === todayStr;
                    const isHoliday = holidayDates.has(dateStr);
                    const isSelected = dateStr === selectedDate;

                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => handleDateSelect(dateStr)}
                        className={clsx(
                          "relative mx-auto flex h-9 w-9 items-center justify-center rounded-full text-sm transition",
                          isSelected
                            ? "bg-[#293B93] font-bold text-white shadow-md shadow-[#293B93]/25"
                            : isToday
                              ? "bg-[#4F7DF5] font-bold text-white"
                              : "text-gray-700 hover:bg-[#F3F5FA]"
                        )}
                      >
                        {day}
                        {isHoliday && (
                          <span
                            className={clsx(
                              "absolute bottom-0.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full",
                              isSelected ? "bg-white" : "bg-amber-400"
                            )}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[#EEF1F8] pt-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#4F7DF5]" />
                    {t("legend.today", "Today")}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                    {t("legend.holiday", "Holiday")}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#293B93]" />
                    {t("legend.selected", "Selected")}
                  </span>
                </div>

                {/* Month insights — fills space below calendar */}
                <div className="mt-4 flex flex-1 flex-col overflow-hidden rounded-xl border border-[#E1E7F6] bg-gradient-to-br from-[#F8FAFF] via-white to-[#FAFBFE]">
                  <div className="shrink-0 border-b border-[#EEF1F8] px-4 py-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#8A93C0]">
                      {t("monthInsights.eyebrow", "This month")}
                    </p>
                    <p className="mt-0.5 text-sm font-bold text-[#000032]">
                      {t(`months.${currentMonth}`, MONTH_FALLBACKS[currentMonth])} {currentYear}
                    </p>
                  </div>

                  <div className="grid shrink-0 grid-cols-3 gap-2 px-4 py-3">
                    <div className="rounded-lg bg-white px-2 py-2 text-center shadow-sm ring-1 ring-[#EEF1F8]">
                      <p className="text-lg font-bold leading-none text-[#293B93]">{monthStats.dates}</p>
                      <p className="mt-1 text-[10px] font-medium text-gray-500">
                        {t("monthInsights.dates", "Dates")}
                      </p>
                    </div>
                    <div className="rounded-lg bg-white px-2 py-2 text-center shadow-sm ring-1 ring-[#EEF1F8]">
                      <p className="text-lg font-bold leading-none text-[#293B93]">{monthStats.notices}</p>
                      <p className="mt-1 text-[10px] font-medium text-gray-500">
                        {t("monthInsights.notices", "Notices")}
                      </p>
                    </div>
                    <div className="rounded-lg bg-white px-2 py-2 text-center shadow-sm ring-1 ring-[#EEF1F8]">
                      <p className="text-lg font-bold leading-none text-amber-600">{monthStats.earlyClose}</p>
                      <p className="mt-1 text-[10px] font-medium text-gray-500">
                        {t("monthInsights.earlyClose", "Early close")}
                      </p>
                    </div>
                  </div>

                  <div className="holiday-list-scroll min-h-0 flex-1 overflow-y-auto px-3 pb-3">
                    {monthSpotlight.length > 0 ? (
                      <ul className="space-y-2">
                        {monthSpotlight.map(([date, events]) => (
                          <li key={date}>
                            <button
                              type="button"
                              onClick={() => handleDateSelect(date)}
                              className={clsx(
                                "w-full rounded-lg border px-3 py-2.5 text-left transition",
                                selectedDate === date
                                  ? "border-[#293B93]/40 bg-[#293B93]/5 shadow-sm"
                                  : "border-[#EEF1F8] bg-white hover:border-[#293B93]/20 hover:bg-[#F8FAFF]"
                              )}
                            >
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-xs font-semibold text-[#293B93]">
                                  {formatDateLong(date)}
                                </span>
                                <span className="rounded-full bg-[#293B93]/10 px-2 py-0.5 text-[10px] font-semibold text-[#293B93]">
                                  {events.length}
                                </span>
                              </div>
                              <p className="mt-1 line-clamp-2 text-xs text-gray-600">
                                {events
                                  .slice(0, 3)
                                  .map((e) => e.name || e.market)
                                  .join(" · ")}
                                {events.length > 3
                                  ? ` · +${events.length - 3} ${t("monthInsights.more", "more")}`
                                  : ""}
                              </p>
                              <div className="mt-2 flex flex-wrap gap-1">
                                {events.slice(0, 2).map((event, index) => (
                                  <span
                                    key={`${event.market}-${index}`}
                                    className={clsx(
                                      "rounded-full px-2 py-0.5 text-[10px] font-medium",
                                      badgeClasses[event.badgeColor] || badgeClasses.orange
                                    )}
                                  >
                                    {event.badge}
                                  </span>
                                ))}
                              </div>
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="flex h-full flex-col justify-center rounded-lg border border-dashed border-[#E1E7F6] bg-white/70 px-4 py-6 text-center">
                        <p className="text-sm font-medium text-gray-700">
                          {t("monthInsights.noEvents", "No market notices this month.")}
                        </p>
                        {nextGlobalHoliday && (
                          <button
                            type="button"
                            onClick={() => jumpToMonth(nextGlobalHoliday.date)}
                            className="mt-3 text-xs font-semibold text-[#293B93] hover:underline"
                          >
                            {t("monthInsights.nextUp", "Next up")}: {formatDateLong(nextGlobalHoliday.date)} —{" "}
                            {nextGlobalHoliday.name || nextGlobalHoliday.market}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Upcoming list — scrollable */}
              <div className="flex min-h-[420px] flex-col overflow-hidden rounded-2xl border border-[#E1E7F6] bg-white shadow-[0_8px_40px_rgba(41,59,147,0.08)] lg:max-h-[520px]">
                <div className="shrink-0 border-b border-[#EEF1F8] bg-gradient-to-r from-[#F8FAFF] to-white px-5 py-4 md:px-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold text-[#000032]">
                        {selectedDate
                          ? formatDateLong(selectedDate)
                          : t("upcomingHeading", "Upcoming Holidays")}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {selectedDate
                          ? t("selectedDateHint", "Events on the selected date")
                          : t(
                              "upcomingSub",
                              "Tap a highlighted date on the calendar to filter"
                            )}
                      </p>
                    </div>
                    {selectedDate ? (
                      <button
                        type="button"
                        onClick={() => setSelectedDate(null)}
                        className="shrink-0 rounded-full border border-[#E1E7F6] px-3 py-1 text-xs font-medium text-[#293B93] transition hover:bg-[#F3F5FA]"
                      >
                        {t("clearFilter", "Show all")}
                      </button>
                    ) : (
                      <span className="shrink-0 rounded-full bg-[#293B93]/10 px-3 py-1 text-xs font-semibold text-[#293B93]">
                        {upcomingHolidays.length}
                      </span>
                    )}
                  </div>
                </div>

                <div className="holiday-list-scroll flex-1 overflow-y-auto px-4 py-4 md:px-5">
                  {groupedList.length === 0 ? (
                    <div className="flex h-full min-h-[280px] flex-col items-center justify-center px-4 text-center">
                      <p className="text-sm font-medium text-gray-700">
                        {selectedDate
                          ? t("noEventsOnDate", "No market events on this date.")
                          : t("noUpcoming", "No upcoming holidays scheduled.")}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {groupedList.map(([date, events]) => {
                        const monthLabel = new Date(date + "T00:00:00").toLocaleDateString(
                          "en-US",
                          { month: "short" }
                        );
                        const dayLabel = new Date(date + "T00:00:00").getDate();

                        return (
                          <article
                            key={date}
                            className={clsx(
                              "overflow-hidden rounded-xl border transition",
                              selectedDate === date
                                ? "border-[#293B93]/30 bg-[#F8FAFF] shadow-sm"
                                : "border-[#EEF1F8] bg-white hover:border-[#293B93]/15 hover:shadow-sm"
                            )}
                          >
                            <div className="flex gap-3 border-b border-[#EEF1F8] bg-[#FAFBFE] px-4 py-3">
                              <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-[#E1E7F6]">
                                <span className="text-[10px] font-medium uppercase leading-none text-[#8A93C0]">
                                  {monthLabel}
                                </span>
                                <span className="text-lg font-bold leading-tight text-[#293B93]">
                                  {dayLabel}
                                </span>
                              </div>
                              <div className="min-w-0 flex-1 pt-0.5">
                                <p className="text-sm font-semibold text-[#000032]">
                                  {formatDateLong(date)}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {events.length}{" "}
                                  {events.length === 1
                                    ? t("eventSingular", "market notice")
                                    : t("eventPlural", "market notices")}
                                </p>
                              </div>
                              {!selectedDate && (
                                <button
                                  type="button"
                                  onClick={() => jumpToMonth(date)}
                                  className="self-center text-xs font-medium text-[#293B93] hover:underline"
                                >
                                  {t("viewOnCalendar", "View")}
                                </button>
                              )}
                            </div>

                            <ul className="divide-y divide-[#EEF1F8]">
                              {events.map((holiday, index) => (
                                <li
                                  key={`${holiday.date}-${holiday.market}-${index}`}
                                  className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                                >
                                  <div className="min-w-0 flex-1">
                                    <p className="truncate font-semibold text-gray-900">
                                      {holiday.name || holiday.market}
                                    </p>
                                    {holiday.name && (
                                      <p className="truncate text-sm text-gray-500">
                                        {holiday.market}
                                      </p>
                                    )}
                                  </div>
                                  <span
                                    className={clsx(
                                      "inline-flex w-fit shrink-0 rounded-full px-3 py-1 text-xs font-medium",
                                      badgeClasses[holiday.badgeColor] || badgeClasses.orange
                                    )}
                                  >
                                    {holiday.badge}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </article>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </RevealOnScroll>
      </div>

      <style jsx global>{`
        .holiday-list-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(41, 59, 147, 0.35) transparent;
        }
        .holiday-list-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .holiday-list-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .holiday-list-scroll::-webkit-scrollbar-thumb {
          background: rgba(41, 59, 147, 0.25);
          border-radius: 999px;
        }
        .holiday-list-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(41, 59, 147, 0.45);
        }
      `}</style>
    </section>
  );
}

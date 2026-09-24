"use client";

import clsx from "clsx";
import Link from "next/link";
import Button from "@/app/[locale]/components/common/Button";
import { localizedHref } from "@/i18n/localizedHref";
import { CALENDAR_DAY, KEY_EVENTS, REGISTER_HREF } from "../marketNewsData";
import FadeInSection from "@/app/[locale]/company/contact-us/components/FadeInSection";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

const IMPACT_STYLES = {
  high: {
    bar: "bg-[#E34935]",
    dot: "bg-[#E34935]",
  },
  medium: {
    bar: "bg-[#F5B800]",
    dot: "bg-[#F5B800]",
  },
  low: {
    bar: "bg-[#22A06B]",
    dot: "bg-[#22A06B]",
  },
};

const TABLE_COLUMN_KEYS = ["time", "country", "event", "actual", "forecast", "previous", "instruments", "trade"];

function CalendarIcon() {
  return (
    <svg className="h-4 w-4 text-[#293B93]" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M15.8348 2.5V5H12.5022V2.5H7.5V5H4.16741V2.5H0V19.1674H20V2.5H15.8348ZM19.1674 18.3326H0.834821V3.33259H3.33482V5.83036H8.33036V3.33259H11.6674V5.83036H16.6674V3.33259H19.1674V18.3326Z" fill="#293B93" />
      <path d="M5 0H6.66741V4.16741H5V0ZM15 0H13.3348V4.16741H15V0ZM1.66741 17.5H18.3348V6.66741H1.66741V17.5ZM2.5 7.5H17.5V16.6674H2.5V7.5Z" fill="#293B93" />
      <path d="M4.17188 10.1897C4.17188 10.5295 4.30686 10.8554 4.54714 11.0957C4.78743 11.336 5.11332 11.471 5.45312 11.471C5.79293 11.471 6.11882 11.336 6.35911 11.0957C6.59939 10.8554 6.73438 10.5295 6.73438 10.1897C6.73438 10.0215 6.70123 9.85487 6.63685 9.69942C6.57246 9.54397 6.47808 9.40273 6.35911 9.28375C6.24013 9.16478 6.09889 9.0704 5.94344 9.00601C5.78799 8.94162 5.62138 8.90848 5.45312 8.90848C5.28487 8.90848 5.11826 8.94162 4.96281 9.00601C4.80736 9.0704 4.66612 9.16478 4.54714 9.28375C4.42817 9.40273 4.33379 9.54397 4.2694 9.69942C4.20502 9.85487 4.17188 10.0215 4.17188 10.1897Z" fill="#293B93" />
      <path d="M13.1004 10.1897C13.1004 10.5295 13.2354 10.8554 13.4757 11.0957C13.716 11.336 14.0419 11.471 14.3817 11.471C14.7215 11.471 15.0474 11.336 15.2877 11.0957C15.528 10.8554 15.6629 10.5295 15.6629 10.1897C15.6629 9.84993 15.528 9.52403 15.2877 9.28375C15.0474 9.04347 14.7215 8.90848 14.3817 8.90848C14.0419 8.90848 13.716 9.04347 13.4757 9.28375C13.2354 9.52403 13.1004 9.84993 13.1004 10.1897Z" fill="#293B93" />
      <path d="M8.63616 10.1897C8.63616 10.358 8.6693 10.5246 8.73369 10.68C8.79808 10.8355 8.89246 10.9767 9.01143 11.0957C9.13041 11.2147 9.27165 11.3091 9.4271 11.3735C9.58255 11.4378 9.74916 11.471 9.91741 11.471C10.0857 11.471 10.2523 11.4378 10.4077 11.3735C10.5632 11.3091 10.7044 11.2147 10.8234 11.0957C10.9424 10.9767 11.0367 10.8355 11.1011 10.68C11.1655 10.5246 11.1987 10.358 11.1987 10.1897C11.1987 9.84993 11.0637 9.52403 10.8234 9.28375C10.5831 9.04347 10.2572 8.90848 9.91741 8.90848C9.5776 8.90848 9.25171 9.04347 9.01143 9.28375C8.77115 9.52403 8.63616 9.84993 8.63616 10.1897Z" fill="#293B93" />
      <path d="M4.17188 13.9621C4.17188 14.3019 4.30686 14.6278 4.54714 14.868C4.78743 15.1083 5.11332 15.2433 5.45312 15.2433C5.79293 15.2433 6.11882 15.1083 6.35911 14.868C6.59939 14.6278 6.73438 14.3019 6.73438 13.9621C6.73438 13.7938 6.70123 13.6272 6.63685 13.4717C6.57246 13.3163 6.47808 13.175 6.35911 13.0561C6.24013 12.9371 6.09889 12.8427 5.94344 12.7783C5.78799 12.7139 5.62138 12.6808 5.45312 12.6808C5.28487 12.6808 5.11826 12.7139 4.96281 12.7783C4.80736 12.8427 4.66612 12.9371 4.54714 13.0561C4.42817 13.175 4.33379 13.3163 4.2694 13.4717C4.20502 13.6272 4.17188 13.7938 4.17188 13.9621Z" fill="#293B93" />
      <path d="M13.1004 13.9621C13.1004 14.3019 13.2354 14.6278 13.4757 14.868C13.716 15.1083 14.0419 15.2433 14.3817 15.2433C14.7215 15.2433 15.0474 15.1083 15.2877 14.868C15.528 14.6278 15.6629 14.3019 15.6629 13.9621C15.6629 13.6222 15.528 13.2964 15.2877 13.0561C15.0474 12.8158 14.7215 12.6808 14.3817 12.6808C14.0419 12.6808 13.716 12.8158 13.4757 13.0561C13.2354 13.2964 13.1004 13.6222 13.1004 13.9621Z" fill="#293B93" />
      <path d="M8.63616 13.9621C8.63616 14.1303 8.6693 14.2969 8.73369 14.4524C8.79808 14.6078 8.89246 14.7491 9.01143 14.868C9.13041 14.987 9.27165 15.0814 9.4271 15.1458C9.58255 15.2102 9.74916 15.2433 9.91741 15.2433C10.0857 15.2433 10.2523 15.2102 10.4077 15.1458C10.5632 15.0814 10.7044 14.987 10.8234 14.868C10.9424 14.7491 11.0367 14.6078 11.1011 14.4524C11.1655 14.2969 11.1987 14.1303 11.1987 13.9621C11.1987 13.6222 11.0637 13.2964 10.8234 13.0561C10.5831 12.8158 10.2572 12.6808 9.91741 12.6808C9.5776 12.6808 9.25171 12.8158 9.01143 13.0561C8.77115 13.2964 8.63616 13.6222 8.63616 13.9621Z" fill="#293B93" />
    </svg>
  );
}

function SectionHeader() {
  const t = usePathTranslation("marketNewsPage.calendar");

  return (
    <div className="mb-5 flex items-center gap-4 md:mb-6">
      <h2 className="Text shrink-0 whitespace-nowrap font-bold tracking-[0.3em] text-[#212121]">
        {t("sectionTitle", "GTCFX & Calendar")}
      </h2>
      <span className="h-px flex-1 bg-[#BFBFBF]" aria-hidden />
    </div>
  );
}

function InstrumentPills({ instruments }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {instruments.map((symbol) => (
        <span
          key={symbol}
          className="inline-flex rounded-full bg-[#EDF0FB] px-2.5 py-1 text-[11px] font-medium text-[#293B93]"
        >
          {symbol}
        </span>
      ))}
    </div>
  );
}

function KeyEventCard({ item, locale }) {
  const t = usePathTranslation("marketNewsPage.calendar");

  return (
    <article className="overflow-hidden rounded-[14px] border border-[#E5E8F0] bg-[#F7F8FC]">
      <div className="border-l-4 border-[#E8344B] p-4 md:p-5">
        <p className="TextSmall font-normal text-[#69729F]">
          {item.country} {item.date} - {item.time}
        </p>
        <h3 className="Text mt-1 font-semibold text-[#000032]">{item.title}</h3>
        <p className="TextSmall mt-2 font-normal leading-[1.65] text-[#666]">{item.description}</p>
        <Link
          href={localizedHref(locale, item.href)}
          className="TextSmall mt-4 inline-block font-medium text-[#293B93] hover:underline"
        >
          {t("readAnalysis", "Read Analysis →")}
        </Link>
      </div>
    </article>
  );
}

export default function MarketNewsCalendarSection({ locale = "en" }) {
  const t = usePathTranslation("marketNewsPage.calendar");

  return (
    <section className="bg-white pb-10 pt-4 md:pb-14">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl">
          <FadeInSection>
            <SectionHeader />
          </FadeInSection>
          <FadeInSection delay={0.1}>
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
              <div className="overflow-hidden">
                <div className="flex flex-wrap items-center gap-3 border-t border-[#E8EDFA] px-4 py-4 md:px-6">
                  <CalendarIcon />
                  <p className="Text leading-snug font-medium text-[#000032]">{CALENDAR_DAY.date}</p>
                  <span className="inline-flex rounded-full bg-[#F0F2F9] px-3 py-2 text-xs font-normal text-[#293B93]">
                    {t("eventsCount", "{count} events").replace("{count}", CALENDAR_DAY.eventCount)}
                  </span>
                  {CALENDAR_DAY.isToday ? (
                    <span className="inline-flex rounded-full bg-[#FDECEC] px-3 py-2 text-xs font-normal uppercase tracking-[0.04em] text-[#E34935]">
                      {t("today", "TODAY")}
                    </span>
                  ) : null}
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[920px] border-collapse">
                    <thead>
                      <tr className="border-y border-[#CBD2E4]">
                        {TABLE_COLUMN_KEYS.map((col) => (
                          <th
                            key={col}
                            className="text-xs px-4 py-4 text-left font-medium uppercase text-[#767C84] md:px-2"
                          >
                            {t(`columns.${col}`, col)}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {CALENDAR_DAY.rows.map((row) => {
                        const impact = IMPACT_STYLES[row.impact] ?? IMPACT_STYLES.low;

                        return (
                          <tr
                            key={`${row.time}-${row.event}`}
                            className={clsx(
                              "border-b border-[#E8EDFA] last:border-0",
                              row.impact === "high" && "border-l-[3px] border-l-[#E34935]",
                              row.impact === "medium" && "border-l-[3px] border-l-[#F5B800]",
                              row.impact === "low" && "border-l-[3px] border-l-[#22A06B]"
                            )}
                          >
                            <td className="px-4 py-2 md:px-2">
                              <span className="text-xs font-medium text-[#000032]">{row.time}</span>
                            </td>
                            <td className="px-4 py-2 md:px-2">
                              <span className="inline-flex items-center gap-2">
                                <span className={clsx("h-2 w-2 rounded-full", impact.dot)} aria-hidden />
                                <span className="text-xs font-medium text-[#000032]">{row.country}</span>
                              </span>
                            </td>
                            <td className="text-xs px-4 py-2 font-medium text-[#000032] md:px-2">{row.event}</td>
                            <td className="text-xs px-4 py-2 font-medium text-[#000032] md:px-2">{row.actual}</td>
                            <td className="text-xs px-4 py-2 text-[#959393] md:px-5">{row.forecast}</td>
                            <td className="text-xs px-4 py-2 text-[#959393] md:px-5">{row.previous}</td>
                            <td className="px-4 py-4 md:px-2">
                              <InstrumentPills instruments={row.instruments} />
                            </td>
                            <td className="px-4 py-4 md:px-2">
                              <Button href={REGISTER_HREF} external variant="brand" size="sm" className="!h-7 !rounded-[3px] !px-4 !text-[13px]">
                                {t("trade", "Trade")}
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              <aside className="min-w-0">
                <h3 className="HeadingH5 font-normal text-[#000]">{t("keyEvents", "This Week's Key Events")}</h3>
                <div className="mt-5 space-y-4">
                  {KEY_EVENTS.map((item, index) => (
                    <FadeInSection delay={index * 0.1}><KeyEventCard key={item.title} item={item} locale={locale} /></FadeInSection>
                  ))}
                </div>
              </aside>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

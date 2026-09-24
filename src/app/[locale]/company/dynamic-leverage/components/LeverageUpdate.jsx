"use client";

import Image from "next/image";
import { FiAlertTriangle, FiClock, FiInfo } from "react-icons/fi";
import FadeInSection from "./FadeInSection";
import { useLocaleMessages, usePathTranslation } from "@/app/[locale]/LocaleProvider";
import { readPath } from "@/i18n/tranlsationText";

const LEGEND_ITEMS = [
  { key: "china", color: "bg-[#3347a8]" },
  { key: "server", color: "bg-[#2eab71]" },
  { key: "uae", color: "bg-[#c7894f]" },
];

function isNonEmptyString(v) {
  return typeof v === "string" && v.trim().length > 0;
}

function getArray(v) {
  if (Array.isArray(v)) return v.filter(isNonEmptyString);
  if (isNonEmptyString(v)) return [v];
  return [];
}

function getObjValues(v) {
  if (!v || typeof v !== "object" || Array.isArray(v)) return [];
  return Object.values(v).filter(isNonEmptyString);
}

function TimeRow({ time, label, highlight = false }) {
  return (
    <li className={`flex items-center gap-3 text-[14px] ${highlight ? "text-[#e04a4a]" : "text-[#5a5a6e]"}`}>
      <span
        className={`w-14 shrink-0 font-semibold ${highlight ? "text-[#e04a4a]" : "text-[#3347a8]"}`}
      >
        {time}
      </span>
      <span className={highlight ? "italic" : ""}>{label}</span>
    </li>
  );
}

function MondayTimes({ times, zoneKey, cutoffLabel, zoneLabel }) {
  if (!times.length) return null;

  return (
    <ul className="space-y-2">
      {times.map((time, index) => (
        <TimeRow
          key={`${zoneKey}-${index}`}
          time={time}
          label={
            index === 1
              ? `${cutoffLabel} (${zoneLabel})`
              : zoneLabel
          }
          highlight={index === 1}
        />
      ))}
    </ul>
  );
}

export default function LeverageUpdate() {
  const messages = useLocaleMessages();
  const t = usePathTranslation("dynamicLeverage.update");
  const section = readPath("dynamicLeverage.update", messages) || {};

  const economicList = getArray(section.economic?.list);
  const importantList = getArray(section.important?.list);
  const mondayChina = getArray(section.times?.monday?.china);
  const mondayServer = getArray(section.times?.monday?.server);
  const mondayUae = getArray(section.times?.monday?.uae);
  const rolloverPoints = getObjValues(section.rollover?.points);
  const hmrList = getObjValues(section.hmrBox?.list);
  const hmrParas = getObjValues(section.hmrBox?.paragraphs);
  const hmrNoticeParas = getObjValues(section.hmrNotice?.paragraphs);

  return (
    <section className="relative py-10 md:py-16 mt-8" style={{ backgroundColor: "#F8F9FC" }}>
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl">
          <FadeInSection>
            <div className="text-center">
              <h2 className="HeadingH2 text-[#02002f]">{t("title")}</h2>
              <p className="mx-auto mt-4 max-w-3xl text-[15px] leading-[1.7] text-[#5a5a6e]">
                {t("intro")}
              </p>
            </div>
          </FadeInSection>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <FadeInSection delay={0.05}>
              <div className="space-y-5">
                <div className="rounded-2xl border border-[#e8ecf8] bg-white p-6 shadow-sm">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#eef1fb] text-[#3347a8]">
                      <FiClock className="h-5 w-5" strokeWidth={1.8} />
                    </span>
                    <h3 className="text-[18px] font-semibold text-[#02002f]">
                      {t("weekend.title")}
                    </h3>
                  </div>

                  <div className="space-y-5 border-t border-[#f0f1f6] pt-5">
                    <div>
                      <h4 className="mb-3 text-[14px] font-semibold text-[#293B93]">
                        {t("weekend.beforeFridayClose")}
                      </h4>
                      <ul className="space-y-2">
                        <TimeRow time={t("times.friday.china")} label={t("weekend.china")} />
                        <TimeRow time={t("times.friday.server")} label={t("weekend.server")} />
                        <TimeRow time={t("times.friday.uae")} label={t("weekend.uae")} />
                      </ul>
                    </div>

                    <div>
                      <h4 className="mb-3 text-[14px] font-semibold text-[#293B93]">
                        {t("weekend.afterMondayOpen")}
                      </h4>
                      <div className="space-y-4">
                        <MondayTimes
                          times={mondayChina}
                          zoneKey="china"
                          cutoffLabel={t("weekend.cutoff")}
                          zoneLabel={t("weekend.china")}
                        />
                        <MondayTimes
                          times={mondayServer}
                          zoneKey="server"
                          cutoffLabel={t("weekend.cutoff")}
                          zoneLabel={t("weekend.server")}
                        />
                        <MondayTimes
                          times={mondayUae}
                          zoneKey="uae"
                          cutoffLabel={t("weekend.cutoff")}
                          zoneLabel={t("weekend.uae")}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {economicList.length > 0 ? (
                  <div className="rounded-2xl border border-[#e8ecf8] bg-white p-6 shadow-sm">
                    <div className="mb-4 flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#fdf4ea] text-[#c7894f]">
                        <FiAlertTriangle className="h-5 w-5" strokeWidth={1.8} />
                      </span>
                      <h3 className="text-[18px] font-semibold text-[#02002f]">
                        {t("economic.title")}
                      </h3>
                    </div>
                    <ul className="list-disc space-y-2 border-t border-[#f0f1f6] pt-5 pl-5 text-[14px] leading-[1.7] text-[#5a5a6e] ltr:text-left rtl:text-right">
                      {economicList.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </FadeInSection>

            <FadeInSection delay={0.1}>
              <div className="flex h-full flex-col gap-5">
                <div className="relative min-h-[280px] overflow-hidden rounded-2xl border border-[#e8ecf8] shadow-sm lg:min-h-[360px]">
                  <Image
                    src="/lerv.webp"
                    alt="Leverage schedule visualization"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                <div className="flex flex-wrap gap-3 rounded-2xl border border-[#e8ecf8] bg-white p-4">
                  {LEGEND_ITEMS.map((item) => (
                    <div key={item.key} className="flex items-center gap-2">
                      <span className={`h-3 w-3 rounded-full ${item.color}`} />
                      <span className="text-[13px] text-[#5a5a6e]">{t(`legend.${item.key}`)}</span>
                    </div>
                  ))}
                </div>

                {importantList.length > 0 ? (
                  <div className="rounded-2xl border border-[#fde2e2] bg-[#fff8f8] p-6">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#fdeaea] text-[#e04a4a]">
                        <FiInfo className="h-5 w-5" strokeWidth={1.8} />
                      </span>
                      <h3 className="text-[18px] font-semibold text-[#e04a4a]">
                        {t("important.title")}
                      </h3>
                    </div>
                    <ul className="list-disc space-y-2 pl-5 text-[14px] leading-[1.7] text-[#5a5a6e] ltr:text-left rtl:text-right">
                      {importantList.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </FadeInSection>
          </div>

          <FadeInSection delay={0.15}>
            <div className="mt-6 rounded-2xl border border-[#e8ecf8] bg-white p-6 shadow-sm md:p-8">
              <h3 className="text-[20px] font-semibold text-[#02002f]">{t("rollover.title")}</h3>

              <div className="mt-4 rounded-xl bg-[#F8F9FC] p-5">
                {isNonEmptyString(t("rollover.schedule.label")) ? (
                  <p className="text-[14px] font-medium text-[#5a5a6e]">
                    {t("rollover.schedule.label")}
                  </p>
                ) : null}
                <p className="mt-1 text-[18px] font-semibold text-[#02002f]">
                  {t("rollover.schedule.time")}{" "}
                  {isNonEmptyString(t("rollover.schedule.timezone"))
                    ? `(${t("rollover.schedule.timezone")})`
                    : ""}
                </p>
                {isNonEmptyString(t("rollover.schedule.days")) ? (
                  <p className="mt-1 text-[13px] text-[#8a8a9a]">
                    {t("rollover.schedule.days")}
                  </p>
                ) : null}
              </div>

              {rolloverPoints.length > 0 ? (
                <div className="mt-4 space-y-3">
                  {rolloverPoints.map((point, index) => (
                    <p key={index} className="text-[14px] leading-[1.7] text-[#5a5a6e]">
                      {point}
                    </p>
                  ))}
                </div>
              ) : null}
            </div>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <div className="mt-6 rounded-2xl border border-[#e8ecf8] bg-white p-6 shadow-sm md:p-8">
              <h3 className="text-[18px] font-semibold text-[#02002f]">{t("hmrBox.title")}</h3>

              {hmrList.length > 0 ? (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-[14px] leading-[1.7] text-[#5a5a6e] ltr:text-left rtl:text-right">
                  {hmrList.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              ) : null}

              {hmrParas.length > 0 ? (
                <div className="mt-4 space-y-2">
                  {hmrParas.map((paragraph, index) => (
                    <p key={index} className="text-[14px] leading-[1.7] text-[#5a5a6e]">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ) : null}

              {isNonEmptyString(t("hmrBox.highlight")) ? (
                <p className="mt-4 text-[14px] font-semibold text-[#02002f]">
                  {t("hmrBox.highlight")}
                </p>
              ) : null}
            </div>
          </FadeInSection>

          {isNonEmptyString(t("hmrNotice.title")) && hmrNoticeParas.length > 0 ? (
            <FadeInSection delay={0.25}>
              <div className="mt-6 rounded-2xl border border-[#d0d8e8] bg-[#eef1fb] p-6 md:p-8">
                <h3 className="text-[18px] font-semibold text-[#3347a8]">
                  {t("hmrNotice.title")}
                </h3>
                {hmrNoticeParas.map((paragraph, index) => (
                  <p key={index} className="mt-3 text-[14px] leading-[1.7] text-[#5a5a6e]">
                    {paragraph}
                  </p>
                ))}
              </div>
            </FadeInSection>
          ) : null}
        </div>
      </div>
    </section>
  );
}

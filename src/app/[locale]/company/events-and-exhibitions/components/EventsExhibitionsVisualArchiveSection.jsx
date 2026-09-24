"use client";

import clsx from "clsx";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import FadeInSection from "@/app/[locale]/company/dynamic-leverage/components/FadeInSection";
import {
  filterArchiveEventsByYear,
  getArchiveYearsFromEvents,
} from "@/lib/strapiEvents";
import { usePathTranslation } from "../../../LocaleProvider";
import { ARCHIVE_EVENTS, ARCHIVE_YEARS } from "../visualArchiveData";

function LocationBadge({ location }) {
  return (
    <div className="flex flex-col min-w-0 gap-3 border-[#E8EDFA] md:border-l md:pl-6">
      <span className="flex h-6 w-6 shrink-0 items-center text-primary">
        <svg className=" h-5 w-5 " xmlns="http://www.w3.org/2000/svg" width="21" height="30" viewBox="0 0 21 30" fill="none">
          <path d="M10.4977 26.6876C10.4977 26.6876 21 18.8836 21 10.6209C21 4.75761 16.3001 0 10.4977 0C4.6954 0 0 4.75761 0 10.6209C0 19.0625 10.4977 26.6876 10.4977 26.6876ZM10.4977 5.75776C12.7025 5.75776 14.499 7.57455 14.499 9.80425C14.499 12.034 12.7025 13.8507 10.4977 13.8507C8.29294 13.8507 6.49644 12.034 6.49644 9.80425C6.49644 7.57455 8.29294 5.75776 10.4977 5.75776Z" fill="#293B93" />
          <path d="M16.3409 24.2514C15.978 24.1505 15.606 24.3661 15.5062 24.7331C15.4064 25.1002 15.6196 25.4764 15.9825 25.5773C17.8108 26.0866 18.1873 26.6555 18.1873 26.7793C18.1873 27.3299 15.5742 28.6236 10.5023 28.6236C5.43033 28.6236 2.81724 27.3299 2.81724 26.7793C2.81724 26.6463 3.22554 26.0407 5.23072 25.5223C5.3174 25.4997 5.39884 25.46 5.47037 25.4056C5.54191 25.3512 5.60214 25.283 5.64764 25.2051C5.69313 25.1271 5.723 25.0409 5.73553 24.9512C5.74806 24.8616 5.74302 24.7703 5.72067 24.6827C5.69833 24.595 5.65914 24.5127 5.60533 24.4403C5.55151 24.368 5.48414 24.3071 5.40705 24.261C5.32996 24.215 5.24466 24.1848 5.15602 24.1722C5.06739 24.1595 4.97716 24.1646 4.89047 24.1872C2.64031 24.7698 1.45172 25.6645 1.45172 26.7793C1.45172 28.9907 6.13804 30 10.4977 30C14.8574 30 19.5437 28.9907 19.5437 26.7793C19.5437 26.0315 18.9857 24.9901 16.3409 24.2514Z" fill="#293B93" />
        </svg>
      </span>
      <p className="min-w-0 text-left text-sm font-medium leading-snug text-primary md:max-w-[150px]">
        {location}
      </p>
    </div>
  );
}

function MobileLocationPin() {
  return (
    <svg
      className="h-4 w-4 shrink-0 text-primary"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 21 30"
      fill="none"
      aria-hidden
    >
      <path
        d="M10.4977 26.6876C10.4977 26.6876 21 18.8836 21 10.6209C21 4.75761 16.3001 0 10.4977 0C4.6954 0 0 4.75761 0 10.6209C0 19.0625 10.4977 26.6876 10.4977 26.6876ZM10.4977 5.75776C12.7025 5.75776 14.499 7.57455 14.499 9.80425C14.499 12.034 12.7025 13.8507 10.4977 13.8507C8.29294 13.8507 6.49644 12.034 6.49644 9.80425C6.49644 7.57455 8.29294 5.75776 10.4977 5.75776Z"
        fill="currentColor"
      />
      <path
        d="M16.3409 24.2514C15.978 24.1505 15.606 24.3661 15.5062 24.7331C15.4064 25.1002 15.6196 25.4764 15.9825 25.5773C17.8108 26.0866 18.1873 26.6555 18.1873 26.7793C18.1873 27.3299 15.5742 28.6236 10.5023 28.6236C5.43033 28.6236 2.81724 27.3299 2.81724 26.7793C2.81724 26.6463 3.22554 26.0407 5.23072 25.5223C5.3174 25.4997 5.39884 25.46 5.47037 25.4056C5.54191 25.3512 5.60214 25.283 5.64764 25.2051C5.69313 25.1271 5.723 25.0409 5.73553 24.9512C5.74806 24.8616 5.74302 24.7703 5.72067 24.6827C5.69833 24.595 5.65914 24.5127 5.60533 24.4403C5.55151 24.368 5.48414 24.3071 5.40705 24.261C5.32996 24.215 5.24466 24.1848 5.15602 24.1722C5.06739 24.1595 4.97716 24.1646 4.89047 24.1872C2.64031 24.7698 1.45172 25.6645 1.45172 26.7793C1.45172 28.9907 6.13804 30 10.4977 30C14.8574 30 19.5437 28.9907 19.5437 26.7793C19.5437 26.0315 18.9857 24.9901 16.3409 24.2514Z"
        fill="currentColor"
      />
    </svg>
  );
}

function MobileEventMetaBar({ booth, date, location }) {
  if (!booth && !date && !location) return null;

  return (
    <div className="mt-3 flex items-stretch overflow-hidden rounded-lg border border-[#E1E7F6] bg-white">
      {(booth || date) && (
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-2 px-2.5 py-2 text-[10px] font-medium leading-snug text-primary">
          {booth ? <span>• {booth}</span> : null}
          {date ? <span>• {date}</span> : null}
        </div>
      )}
      {location ? (
        <>
          {(booth || date) ? <div className="w-px shrink-0 bg-[#E1E7F6]" aria-hidden /> : null}
          <div className="flex min-w-0 flex-1 items-start gap-1.5 px-2.5 py-2 text-[10px] font-medium leading-snug text-primary">
            <MobileLocationPin />
            <span className="min-w-0 line-clamp-2">{location}</span>
          </div>
        </>
      ) : null}
    </div>
  );
}

function EventImageGallery({ event, t, variant = "desktop", title }) {
  const isMobile = variant === "mobile";
  const images = useMemo(() => {
    const merged = [event.mainImage, ...(event.thumbnails ?? [])].filter(Boolean);
    return [...new Set(merged)];
  }, [event.mainImage, event.thumbnails]);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [event.id, event.key]);

  if (!images.length) return null;

  if (isMobile) {
    return (
      <div className="min-w-0">
        <div className="grid grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] items-start gap-3">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#E8EDF8]">
            <Image
              src={images[activeIndex]}
              alt={t(`events.${event.key}.mainAlt`, event.mainAlt || event.title)}
              fill
              className="object-cover"
              sizes="55vw"
            />
          </div>

          <div className="min-w-0">
            {title ? (
              <h3 className="text-sm font-semibold leading-snug text-[#000032]">{title}</h3>
            ) : null}

            {images.length > 1 ? (
              <div className="mt-2 flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:thin]">
                {images.slice(0, 4).map((image, index) => {
                  const isActive = activeIndex === index;

                  return (
                    <button
                      key={`${image}-${index}`}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={clsx(
                        "relative aspect-[4/3] w-14 shrink-0 overflow-hidden rounded-lg bg-[#E8EDF8] transition",
                        isActive ? "ring-2 ring-primary ring-offset-1" : "opacity-80"
                      )}
                      aria-label={t(`events.${event.key}.thumbAlt`, event.thumbAlt || event.title)}
                      aria-pressed={isActive}
                    >
                      <Image src={image} alt={t(`events.${event.key}.thumbAlt`, `${title} thumbnail ${index + 1}`)} fill className="object-cover" sizes="56px" />
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-w-0">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-tr-[32px] rounded-bl-[32px] bg-[#E8EDF8]">
        <Image
          src={images[activeIndex]}
          alt={t(`events.${event.key}.mainAlt`, event.mainAlt || event.title)}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 420px"
        />
      </div>

      {images.length > 1 ? (
        <div className="mt-3 flex items-center gap-2">
          <div className="flex min-w-0 flex-1 gap-2 overflow-x-auto p-2 pb-1 [scrollbar-width:thin]">
            {images.map((image, index) => {
              const isActive = activeIndex === index;

              return (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={clsx(
                    "relative aspect-[4/3] w-20 shrink-0 overflow-hidden rounded-tr-[16px] rounded-bl-[16px] bg-[#E8EDF8] transition sm:w-24",
                    isActive ? "ring-2 ring-primary ring-offset-2" : "opacity-80 hover:opacity-100"
                  )}
                  aria-label={t(`events.${event.key}.thumbAlt`, event.thumbAlt || event.title)}
                  aria-pressed={isActive}
                >
                  <Image src={image} alt={t(`events.${event.key}.thumbAlt`, `${title} thumbnail ${index + 1}`)} fill className="object-cover" sizes="96px" />
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function ArchiveEventCard({ event, isExpanded, onToggle, t }) {
  const eventKey = event.key || event.id;
  const title = t(`events.${eventKey}.title`, event.title);
  const summary = t(`events.${eventKey}.summary`, event.summary);
  const booth = t(`events.${eventKey}.booth`, event.booth);
  const date = t(`events.${eventKey}.date`, event.date);
  const location = t(`events.${eventKey}.location`, event.location);
  const description = t(`events.${eventKey}.description`, event.description);
  const descriptionParagraphs = Array.isArray(description)
    ? description
    : String(description)
      .split(/\n+/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);

  const panelId = `archive-panel-${eventKey}`;
  const headerId = `archive-header-${eventKey}`;

  return (
    <article
      className="overflow-hidden rounded-[20px] border border-[#E1E7F6] bg-white md:bg-[#F8F9FC]"
    >
      {/* Mobile collapsed header */}
      <button
        type="button"
        id={headerId}
        aria-expanded={isExpanded}
        aria-controls={panelId}
        onClick={onToggle}
        className="w-full p-4 text-left transition hover:bg-[#FAFBFE] md:hidden"
      >
        <div className="flex gap-3">
          <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-xl bg-[#E8EDF8]">
            <Image
              src={event.thumb}
              alt={t(`events.${eventKey}.thumbAlt`, event.thumbAlt || title)}
              fill
              className="object-cover"
              sizes="72px"
            />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-semibold leading-snug text-[#000032]">{title}</h3>
            {summary ? (
              <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[#666]">{summary}</p>
            ) : null}
          </div>
        </div>

        <MobileEventMetaBar booth={booth} date={date} location={location} />
      </button>

      {/* Desktop collapsed header */}
      <button
        type="button"
        aria-expanded={isExpanded}
        aria-controls={panelId}
        onClick={onToggle}
        className="hidden w-full flex-col gap-4 p-4 text-left transition hover:bg-[#FAFBFE] md:flex md:flex-row md:items-center md:gap-6 md:p-5"
      >
        <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl bg-[#E8EDF8] sm:h-24 sm:w-32">
          <Image
            src={event.thumb}
            alt={t(`events.${eventKey}.thumbAlt`, event.thumbAlt || title)}
            fill
            className="object-cover"
            sizes="128px"
          />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold text-[#000032] sm:text-lg">{title}</h3>
          {summary ? (
            <p className="mt-1 text-sm leading-relaxed text-[#666]">{summary}</p>
          ) : null}
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
            {booth ? <span className="font-medium text-primary">• {booth}</span> : null}
            {date ? <span className="text-[#666]">• {date}</span> : null}
          </div>
        </div>

        {location ? (
          <div className="md:shrink-0">
            <LocationBadge location={location} />
          </div>
        ) : null}
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={headerId}
        className={clsx(
          "grid transition-[grid-template-rows,opacity] duration-500 ease-in-out motion-reduce:transition-none",
          isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          {/* Mobile expanded panel */}
          <div className="border-t border-[#E8EDFA] p-4 md:hidden">
            <EventImageGallery event={event} t={t} variant="mobile" title={title} />

            {descriptionParagraphs.length ? (
              <ul className="mt-4 space-y-3">
                {descriptionParagraphs.map((paragraph, index) => (
                  <li
                    key={`${eventKey}-mobile-paragraph-${index}`}
                    className="flex gap-2 text-xs leading-[1.75] text-[#69729F]"
                  >
                    <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[#69729F]" aria-hidden />
                    <span>{paragraph}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {/* Desktop expanded panel */}
          <div className="hidden border-t border-[#E8EDFA] p-4 md:block md:p-6">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start lg:gap-10">
              <EventImageGallery event={event} t={t} />

              <div className="min-w-0">
                <h3 className="text-xl font-semibold text-[#000032] md:text-2xl">{title}</h3>
                {descriptionParagraphs.length ? (
                  <div className="mt-4 space-y-4">
                    {descriptionParagraphs.map((paragraph, index) => (
                      <p
                        key={`${eventKey}-paragraph-${index}`}
                        className="text-sm leading-[1.8] text-[#69729F] md:text-[15px]"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function EventsExhibitionsVisualArchiveSection({ events = [] }) {
  const t = usePathTranslation("eventsAndExhibitionsPage.visualArchiveSection");

  const allEvents = useMemo(() => {
    if (Array.isArray(events) && events.length > 0) return events;
    return ARCHIVE_EVENTS;
  }, [events]);

  const availableYears = useMemo(() => {
    const years = getArchiveYearsFromEvents(allEvents);
    return years.length > 0 ? years : ARCHIVE_YEARS;
  }, [allEvents]);

  const [activeYear, setActiveYear] = useState(availableYears[0] ?? "2025");
  const [expandedKey, setExpandedKey] = useState("");

  const eventsForYear = useMemo(
    () => filterArchiveEventsByYear(allEvents, activeYear),
    [allEvents, activeYear]
  );

  useEffect(() => {
    if (!availableYears.includes(activeYear)) {
      setActiveYear(availableYears[0] ?? "");
    }
  }, [activeYear, availableYears]);

  useEffect(() => {
    if (!eventsForYear.length) {
      setExpandedKey("");
      return;
    }

    const hasExpanded = eventsForYear.some(
      (event) => (event.key || event.id) === expandedKey
    );

    if (!hasExpanded) {
      setExpandedKey(eventsForYear[0].key || eventsForYear[0].id);
    }
  }, [eventsForYear, expandedKey]);

  const onYearChange = (year) => {
    setActiveYear(year);
    const nextItems = filterArchiveEventsByYear(allEvents, year);
    setExpandedKey(nextItems[0]?.key || nextItems[0]?.id || "");
  };

  return (
    <section id="journey" className="py-10 md:py-16 bg-white">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <FadeInSection>
              <SectionEyebrow variant="compact" className="capitalize tracking-[0.3em]">
                {t("eyebrow", "Visual Archive")}
              </SectionEyebrow>

              <h2 className="HeadingH1 mx-auto mt-4 max-w-3xl font-semibold text-[#000]">
                {t("title", "The Stages We've Walked")}
              </h2>

              <p className="Text mx-auto mt-5 max-w-2xl font-normal leading-[1.6] text-[#000032]/60 md:mt-6">
                {t(
                  "description",
                  "From expo floors to conference halls — a record of where GTC has shown up, connected, and represented the global trading community."
                )}
              </p>
            </FadeInSection>
          </div>
          <FadeInSection delay={0.08}>
            <div className="mt-8 flex flex-nowrap items-center justify-center gap-1 md:mt-10 md:flex-wrap md:gap-2">
              {availableYears.map((year) => {
                const isActive = activeYear === year;

                return (
                  <button
                    key={year}
                    type="button"
                    onClick={() => onYearChange(year)}
                    className={clsx(
                      "min-w-0 flex-1 whitespace-nowrap rounded-full px-1 py-1 text-[11px] font-medium transition sm:px-2.5 md:flex-none md:px-5 md:py-2 md:text-sm",
                      isActive
                        ? "bg-primary text-white"
                        : "bg-[#F8F9FC] border border-[#E1E7F6] text-[#02002f] hover:bg-[#E8ECF4]"
                    )}
                  >
                    {year}
                  </button>
                );
              })}
            </div>
          </FadeInSection>

          <div className="mt-6 space-y-4 md:mt-8">
            {eventsForYear.length ? (
              eventsForYear.map((event, index) => {
                const eventKey = event.key || event.id;

                return (
                  <FadeInSection key={eventKey} delay={index * 0.05}>
                    <ArchiveEventCard
                      event={event}
                      isExpanded={expandedKey === eventKey}
                      onToggle={() =>
                        setExpandedKey((current) =>
                          current === eventKey ? "" : eventKey
                        )
                      }
                      t={t}
                    />
                  </FadeInSection>
                );
              })
            ) : (
              <div className="rounded-2xl border border-[#E8EDFA] bg-white px-6 py-12 text-center text-sm text-[#69729F]">
                {t("emptyYear", "No archived events for this year yet.")}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

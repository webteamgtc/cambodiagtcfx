"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import CommonLeadForm from "@/app/[locale]/components/common/CommonLeadForm";
import MobilePeekCarousel from "@/app/[locale]/components/common/MobilePeekCarousel";
import { REGISTER_FORM_APPEARANCE } from "@/app/[locale]/components/common/home/HomeRegisterSection";
import { useLocale, usePathTranslation } from "@/app/[locale]/LocaleProvider";
import { localizedHref } from "@/i18n/localizedHref";
import {

} from "../eventsHeroData";

function resolveHeroEvents(events) {
  return Array.isArray(events) && events.length > 0 ? events : [];
}

function getEventLabels(event, t) {
  const fallbackCardMeta =
    event.cardMeta ||
    (event.date && event.location ? `${event.date} · ${event.location}` : event.location || "");

  return {
    title: t(`events.${event.id}.title`, event.title),
    date: t(`events.${event.id}.date`, event.date),
    location: t(`events.${event.id}.location`, event.location),
    cardMeta: t(`events.${event.id}.cardMeta`, fallbackCardMeta),
  };
}

function MoreEventCard({ event, isSelected, onSelect, variant = "desktop", t }) {
  const isMobileCard = variant === "mobile";
  const { title, cardMeta } = getEventLabels(event, t);

  return (
    <button
      type="button"
      onClick={() => onSelect(event)}
      className={clsx(
        "group flex min-w-0 flex-col justify-between rounded-[12px] text-left transition",
        isMobileCard ? "h-full w-full bg-white" : "min-w-0 flex-1 rounded-[10px]",
        !isMobileCard &&
          (isSelected
            ? "border-[#E1E7F6] bg-[#F3F5FA]"
            : "border-transparent hover:bg-[#FAFBFE]")
      )}
      style={{
        borderRadius: isMobileCard ? "12px" : "10px",
        border: isSelected ? "1px solid #293B93" : "1px solid #EBEBEB",
        boxShadow: isMobileCard
          ? "0 4px 20px 0 rgba(41, 59, 147, 0.10)"
          : isSelected
            ? "rgb(41 59 147 / 23%) 0px 4px 20px 0px, rgb(41 59 147 / 6%) 0px 4px 20px 0px"
            : undefined,
      }}
    >
      <div
        className={clsx(
          "relative overflow-hidden bg-[#E8EDF8]",
          isMobileCard ? "rounded-t-[12px]" : "rounded-tl-[8px] rounded-tr-[8px]"
        )}
      >
        <div
          className={clsx(
            "relative w-full",
            isMobileCard ? "aspect-[4/3]" : "aspect-[16/10]"
          )}
        >
          <Image
            src={event.thumb}
            alt={title}
            fill
            className="object-cover object-center"
            sizes={isMobileCard ? "160px" : "200px"}
          />
        </div>
      </div>

      <div className={clsx("flex-1", isMobileCard ? "p-2.5" : "p-3")}>
        <p
          className={clsx(
            "line-clamp-2 font-semibold leading-snug text-[#293B93]",
            isMobileCard ? "text-[11px] leading-[1.35]" : "TextSmall mt-3"
          )}
        >
          {title}
        </p>
        <p
          className={clsx(
            "font-normal leading-[1.45] text-[#8A93C0]",
            isMobileCard ? "mt-1.5 text-[10px]" : "mt-2 text-xs"
          )}
        >
          {cardMeta}
        </p>
      </div>
    </button>
  );
}

export default function EventsExhibitionsHeroSection({ events }) {
  const t = usePathTranslation("eventsAndExhibitionsPage.hero");
  const locale = useLocale();
  const heroEvents = resolveHeroEvents(events);
  const defaultEvent = heroEvents[0] || [];
  const [selectedEvent, setSelectedEvent] = useState(defaultEvent);
  
  const thankYouHref = localizedHref(locale, "/thank-you") || "/thank-you";
  const upcomingHref = localizedHref(locale, "/company/events-and-exhibitions#upcoming");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleHeroSelection = (event) => {
      if (event?.detail) {
        setSelectedEvent(event.detail);
      }
    };

    window.addEventListener("eventsHeroSelect", handleHeroSelection);
    return () => window.removeEventListener("eventsHeroSelect", handleHeroSelection);
  }, []);

  const selectedLabels = getEventLabels(selectedEvent, t);

  const descriptionKey = selectedEvent?.descriptionKey || "default";
  const description =
    selectedEvent.description ||
    t(
      `descriptions.${descriptionKey}`,
      descriptionKey === "africa"
        ? "Join us in Cape Town to discover innovative trading solutions, connect with our experts, and explore new partnership opportunities."
        : descriptionKey === "vietnam"
          ? "Join us in Hanoi for an elevated networking evening with our regional partners, traders, and innovation leaders."
          : descriptionKey === "bahrain"
            ? "Meet GTCFX in Manama to connect with industry leaders and explore new opportunities across the region."
            : descriptionKey === "hongkong"
              ? "Meet our team in Hong Kong to explore fresh opportunities and connect with the global trading community."
              : "Discover groundbreaking trading solutions and connect with our experts at this premier event."
    );

  const locationLabel =
    selectedLabels.date && selectedLabels.location
      ? `${selectedLabels.date} · ${selectedLabels.location}`
      : selectedLabels.location || "";

  const heroBackgroundImage =
    selectedEvent.mainImage || selectedEvent.thumb || "/event.jpeg";

  const selectedEventIndex = Math.max(
    0,
    heroEvents.findIndex((event) => event.id === selectedEvent.id)
  );

  return (
    <section className="relative overflow-hidden py-12 md:py-16 lg:py-28">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          key={selectedEvent.id}
          src={heroBackgroundImage}
          alt=""
          fill
          priority={selectedEvent.id === defaultEvent.id}
          className="object-cover object-center transition-opacity duration-500 ease-in-out"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(231, 238, 254, 0.92) 0%, rgba(255, 255, 255, 0.88) 100%)",
          }}
        />
      </div>
      <div className="container relative z-10">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Hero copy — first on mobile, top-left on desktop */}
          <div className="order-1 min-w-0 text-center lg:col-span-7 lg:row-start-1 lg:text-left">
            <h1 className="HeadingH1 max-w-xl leading-[1.2] text-[#000032]">
              <span className="text-[#293B93]">{selectedLabels.title}</span>
            </h1>

            <p className="Text mx-auto mt-5 max-w-xl font-normal leading-[1.7] text-[#666] md:mt-6 lg:mx-0">
              {description}
            </p>

            {locationLabel ? (
              <p className="TextSmall mt-4 font-medium text-[#69729F] md:mt-5">
                {locationLabel}
              </p>
            ) : null}
          </div>

          {/* Lead form — second on mobile, right column on desktop */}
          <div className="order-2 min-w-0 lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1">
            <div
              className="bg-white p-4 md:p-6 lg:p-6"
              style={{
                borderRadius: "20px",
                background: "#FFF",
                boxShadow: "0 4px 50px 0 rgba(41, 59, 147, 0.15)",
              }}
            >
              <CommonLeadForm
                variant="homeRegister"
                translationNamespace="home.registerForm"
                hideDisclaimer
                appearance={REGISTER_FORM_APPEARANCE}
                successRedirect={thankYouHref}
                cardClassName="!p-0 !rounded-none"
                cardStyle={{ boxShadow: "none" }}
              />
            </div>
          </div>

          {/* Event carousel — third on mobile, bottom-left on desktop */}
          <div className="order-3 min-w-0 border-t border-dashed border-[#7C87BD] pt-6 text-left md:pt-8 lg:col-span-7 lg:row-start-2">
            <div className="flex items-center justify-between gap-4">
              <h2 className="HeadingH5 font-semibold text-[#293B93]">
                {t("moreEvents", "More Events")}
              </h2>
              <Link
                href={upcomingHref}
                className="TextSmall shrink-0 font-medium text-[#293B93] hover:underline"
              >
                {t("viewAllActivities", "View All Activities")} →
              </Link>
            </div>

            <div className="mt-4 lg:hidden">
              <MobilePeekCarousel
                items={heroEvents}
                initialIndex={selectedEventIndex}
                slidesPerView={2}
                spaceBetween={8}
                showArrows={false}
                trackClassName="-mx-4 px-4"
                onActiveIndexChange={(index) => {
                  const event = heroEvents[index];
                  if (event) setSelectedEvent(event);
                }}
                renderItem={(event) => (
                  <div className="h-full pb-1">
                    <MoreEventCard
                      event={event}
                      isSelected={selectedEvent.id === event.id}
                      onSelect={setSelectedEvent}
                      variant="mobile"
                      t={t}
                    />
                  </div>
                )}
              />
            </div>

            <div className="mt-4 hidden gap-3 lg:grid lg:grid-cols-3">
              {heroEvents.map((event) => (
                <MoreEventCard
                  key={event.id}
                  event={event}
                  isSelected={selectedEvent.id === event.id}
                  onSelect={setSelectedEvent}
                  t={t}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

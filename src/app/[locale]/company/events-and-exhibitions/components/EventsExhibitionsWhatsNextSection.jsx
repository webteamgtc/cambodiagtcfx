"use client";

import { useEffect, useState } from "react";
import { FiCalendar, FiMapPin } from "react-icons/fi";
import {
  FaInstagram,
  FaLinkedinIn,
  FaWeixin,
  FaXTwitter,
} from "react-icons/fa6";
import Button from "@/app/[locale]/components/common/Button";
import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import FadeInSection from "@/app/[locale]/company/dynamic-leverage/components/FadeInSection";
import { usePathTranslation } from "../../../LocaleProvider";

const EVENT_TARGET_DATE = new Date("2026-09-15T09:00:00+07:00");

const SOCIAL_LINKS = [
  {
    key: "instagram",
    href: "https://www.instagram.com/gtcfxofficial/",
    label: "Instagram",
    icon: FaInstagram,
  },
  {
    key: "wechat",
    href: "https://www.gtcfx.com",
    label: "WeChat",
    icon: FaWeixin,
  },
  {
    key: "x",
    href: "https://x.com/GTC_fx",
    label: "X",
    icon: FaXTwitter,
  },
  {
    key: "linkedin",
    href: "https://linkedin.com/company/gtcfx-official",
    label: "LinkedIn",
    icon: FaLinkedinIn,
  },
];

function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = targetDate.getTime() - Date.now();

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, mins: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        mins: Math.floor((diff / (1000 * 60)) % 60),
      });
    };

    tick();
    const intervalId = setInterval(tick, 1000);
    return () => clearInterval(intervalId);
  }, [targetDate]);

  return timeLeft;
}

function ConfirmedBadge({ children }) {
  return (
    <span className="TextSmall inline-flex items-center gap-2 px-3 py-1 font-medium text-[#293B93]"
      style={{
        borderRadius: "999px",
        border: "1px solid #E1E7F6",
        background: "#F8F9FC",
      }}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[#293B93]" aria-hidden />
      {children}  </span>
  );
}

function CountdownUnit({ value, label }) {
  return (
    <div className="min-w-0 text-center">
      <div className="flex min-w-[4.5rem] items-center justify-center rounded-[4px] bg-[#E1E7F6] px-2 py-2 sm:min-w-[5.5rem] sm:px-3 sm:py-3">
        <span className="HeadingH2 font-semibold text-[#293B93]">{value}</span>
      </div>
      <p className="text-xs mt-2 font-normal text-[#69729F]">{label}</p>
    </div>
  );
}

function EventCard({ t }) {
  return (
    <article
      className="mt-8 rounded-[20px] border border-[#E1E7F6] bg-white p-6 sm:p-7"
      style={{ borderLeft: "3px solid #293B93" }}
    >
      <ConfirmedBadge>{t("event.badge", "Confirmed")}</ConfirmedBadge>

      <h3 className="HeadingH4 mt-5 font-semibold text-[#000032]">
        {t("event.title", "iFX EXPO Asia 2026")}
      </h3>

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
        <p className="text-xs inline-flex items-center gap-1.5 font-normal text-[#69729F]">
          <FiCalendar className="h-3.5 w-3.5 shrink-0" aria-hidden />
          {t("event.date", "September 2026")}
        </p>
        <p className="text-xs inline-flex items-center gap-1.5 font-normal text-[#69729F]">
          <FiMapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
          {t("event.location", "Bangkok, Thailand")}
        </p>
      </div>

      <p className="TextSmall mt-5 font-normal leading-[1.5] text-[#666]">
        {t(
          "event.description",
          "Join GTC Group at one of Asia's premier forex gatherings. Meet our team in person, explore partnership opportunities, and experience our latest platform innovations live on the floor."
        )}
      </p>


    </article>
  );
}

function CalendarCountdownCard({ t }) {
  const { days, hours, mins } = useCountdown(EVENT_TARGET_DATE);

  return (
    <article className="interactive-card flex h-full flex-col rounded-[20px] border border-[#E1E7F6] bg-white p-6 text-center sm:p-8 lg:min-h-[420px] lg:justify-center">
      <h3 className="HeadingH5 font-semibold text-[##000000]">
        {t("calendar.title", "2026–2027 Event Calendar")}
      </h3>
      <p className="Text mt-2 font-normal text-[#666]">
        {t("calendar.subtitle", "Planning our next global chapter")}
      </p>

      <div className="mt-8 flex items-center justify-center gap-2 sm:gap-3">
        <CountdownUnit
          value={String(days)}
          label={t("calendar.countdown.days", "Days")}
        />
        <span className="HeadingH3 mb-6 font-bold text-[#69729F]" aria-hidden>
          :
        </span>
        <CountdownUnit
          value={String(hours).padStart(2, "0")}
          label={t("calendar.countdown.hours", "Hours")}
        />
        <span className="HeadingH3 mb-6 font-bold text-[#69729F]" aria-hidden>
          :
        </span>
        <CountdownUnit
          value={String(mins).padStart(2, "0")}
          label={t("calendar.countdown.mins", "Mins")}
        />
      </div>

      <p className="TextSmall mx-auto mt-10 max-w-sm font-normal leading-[1.6] text-[#666]">
        {t(
          "calendar.description",
          "We're shaping our 2026/2027 exhibition calendar. Follow us on social media so you never miss our next move."
        )}
      </p>

      <div className="mt-8 flex items-center justify-center gap-3">
        {SOCIAL_LINKS.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.key}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E1E7F6] text-[#293B93] transition hover:bg-[#DCE4F6] hover:no-underline"
            >
              <Icon className="h-4 w-4" aria-hidden />
            </a>
          );
        })}
      </div>
    </article>
  );
}

export default function EventsExhibitionsWhatsNextSection() {
  const t = usePathTranslation("eventsAndExhibitionsPage.whatsNextSection");

  return (
    <section id="upcoming" className="bg-[#F8F9FC] py-8 md:py-16">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <FadeInSection>
            <div className="min-w-0 text-left">
              <SectionEyebrow variant="compact" className="capitalize tracking-[0.3em]">
                {t("eyebrow", "What's Next")}
              </SectionEyebrow>

              <h2 className="HeadingH1 mt-4 max-w-lg font-semibold leading-[1.2] text-[#000]">
                {t("title", "The next stage, we're waiting for you")}
              </h2>

              <EventCard t={t} />
            </div>
          </FadeInSection>

          <FadeInSection delay={0.15} className="h-full">
            <CalendarCountdownCard t={t} />
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

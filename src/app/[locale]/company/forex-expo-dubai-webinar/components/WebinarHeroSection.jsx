"use client";

import CommonLeadForm from "@/app/[locale]/components/common/CommonLeadForm";
import { REGISTER_FORM_APPEARANCE } from "@/app/[locale]/components/common/home/HomeRegisterSection";
import { useLocale, usePathTranslation } from "@/app/[locale]/LocaleProvider";
import { localizedHref } from "@/i18n/localizedHref";
import {
  WEBINAR_DETAILS,
  WEBINAR_HERO_EXTRAS,
  WEBINAR_HIGHLIGHTS,
} from "../webinarData";

const HIGHLIGHT_ICONS = {
  date: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 3v4M16 3v4M3 10h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  speaker: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5 20c0-3.314 3.134-6 7-6s7 2.686 7 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  platform: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="2" y="5" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M16 9l6-3v12l-6-3V9z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  ),
  duration: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 8v4l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  language: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 12h16M12 4c2.5 2.7 2.5 13.3 0 16M12 4c-2.5 2.7-2.5 13.3 0 16" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
  admission: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 9h12M8 13h8M7 5h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
};

function HighlightCard({ item, t }) {
  return (
    <div className="group flex min-h-[148px] min-w-0 flex-1 flex-col rounded-2xl border border-[#E1E7F6] bg-white/90 p-5 text-left shadow-[0_8px_30px_rgba(41,59,147,0.06)] backdrop-blur-sm transition hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(41,59,147,0.1)]">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF2FA] text-[#293B93]">
        {HIGHLIGHT_ICONS[item.id]}
      </span>
      <p className="TextSmall mt-4 font-semibold text-[#293B93]">
        {t(item.labelKey, item.label)}
      </p>
      <p className="text-xs mt-2 flex-1 font-normal leading-[1.55] text-[#69729F]">
        {t(item.valueKey, item.value)}
      </p>
    </div>
  );
}

export default function WebinarHeroSection() {
  const t = usePathTranslation("forexExpoDubaiWebinarPage.hero");
  const locale = useLocale();

  const thankYouHref = localizedHref(locale, "/thank-you") || "/thank-you";

  return (
    <section className="relative overflow-hidden py-12 md:py-16 lg:py-24">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: "linear-gradient(180deg, #E7EEFE 0%, #FFFFFF 55%, #F8FAFF 100%)",
        }}
        aria-hidden
      />
      <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-[#293B93]/10 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute right-0 top-1/3 h-72 w-72 rounded-full bg-[#B8935A]/10 blur-3xl" aria-hidden />

      <div className="container relative">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 text-center lg:col-span-7 lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E1E7F6] bg-white/80 px-5 py-1.5 shadow-sm backdrop-blur-sm">
              <span className="relative flex h-2 w-2 shrink-0" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#B8935A] opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#B8935A]" />
              </span>
              <span className="TextSmall font-medium text-[#293B93] normal-case tracking-normal">
                {t("badge", "Upcoming Webinar · Online via Zoom")}
              </span>
            </div>

            <h1 className="HeadingH1 mt-6 max-w-2xl leading-[1.15] text-[#000032] md:mt-7">
              {t("title", "Join GTCFX at")}{" "}
              <span className="text-[#293B93]">
                {t("titleAccent", WEBINAR_DETAILS.title)}
              </span>
            </h1>

            <p className="Text mx-auto mt-5 max-w-2xl font-normal leading-[1.75] text-[#666] lg:mx-0 md:mt-6">
              {t(
                "description",
                "Tune in live as Jameel Ahmad shares market insight, trading perspectives, and a practical outlook for Forex Expo Dubai — followed by an interactive Q&A session."
              )}
            </p>

            <p className="Text mx-auto mt-4 max-w-2xl font-normal leading-[1.75] text-[#666] lg:mx-0">
              {t(
                "description2",
                "Open to traders, partners, and anyone preparing for Forex Expo Dubai. Join from anywhere — no travel required."
              )}
            </p>

            <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-2 lg:justify-start">
              <span className="rounded-full bg-[#293B93] px-4 py-2 text-xs font-semibold text-white">
                {t("dateChip", WEBINAR_DETAILS.date)}
              </span>
              <span className="rounded-full border border-[#E1E7F6] bg-white px-4 py-2 text-xs font-semibold text-[#293B93]">
                {t("timeChip", WEBINAR_DETAILS.time)}
              </span>
              <span className="rounded-full border border-[#E1E7F6] bg-white px-4 py-2 text-xs font-semibold text-[#69729F]">
                {t("platformChip", WEBINAR_DETAILS.platform)}
              </span>
            </div>

            <div className="mt-8 space-y-3">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {WEBINAR_HIGHLIGHTS.map((item) => (
                  <HighlightCard key={item.id} item={item} t={t} />
                ))}
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {WEBINAR_HERO_EXTRAS.map((item) => (
                  <HighlightCard key={item.id} item={item} t={t} />
                ))}
              </div>
            </div>
          </div>

          <div className="min-w-0 lg:col-span-5 lg:sticky lg:top-28">
            <div
              className="overflow-hidden rounded-[20px] border border-white/70 bg-white p-4 md:p-6 lg:p-6"
              style={{
                boxShadow: "0 4px 50px 0 rgba(41, 59, 147, 0.15)",
              }}
            >
              <div className="mb-5 rounded-2xl bg-[#F7F9FF] px-4 py-3 text-left">
                <p className="TextSmall font-semibold text-[#293B93]">
                  {t("formTitle", "Register for Webinar")}
                </p>
                <p className="text-xs mt-1 leading-[1.5] text-[#69729F]">
                  {t(
                    "formHint",
                    "Free registration · Zoom link sent to your email after confirmation"
                  )}
                </p>
              </div>

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
        </div>
      </div>
    </section>
  );
}

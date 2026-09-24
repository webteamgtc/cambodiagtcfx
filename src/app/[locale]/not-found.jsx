'use client';

import Link from "next/link";
import { useLocale, usePathTranslation } from "@/app/[locale]/LocaleProvider";

/**
 * Local English defaults. `usePathTranslation` returns an empty string for
 * missing keys on non-English locales (no English fallback), so we coalesce
 * to these defaults to guarantee the page is never blank for any locale.
 */
const DEFAULTS = {
  title: "Page Not Found",
  description: "Sorry, the page you're looking for doesn't exist or has been moved.",
  backHome: "Back to Home",
  contactSupport: "Contact Support",
};

/* Lightweight inline-SVG illustration: a "lost" compass whose needle is
   broken / drifting, signalling "pointing nowhere". Brand blue palette. */
function LostCompass() {
  return (
    <svg
      viewBox="0 0 140 140"
      className="h-32 w-32 sm:h-36 sm:w-36 md:h-40 md:w-40"
      role="img"
      aria-label="Lost compass illustration"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* soft base disc */}
      <circle cx="70" cy="70" r="66" fill="#F8F9FC" />
      {/* dashed orbit (searching) */}
      <circle
        cx="70"
        cy="70"
        r="58"
        fill="none"
        stroke="#C7D0F0"
        strokeWidth="2"
        strokeDasharray="3 7"
        className="nf-orbit"
      />
      {/* compass body */}
      <circle cx="70" cy="70" r="48" fill="#FFFFFF" stroke="#293B93" strokeWidth="3" />

      {/* cardinal tick marks */}
      <line x1="70" y1="24" x2="70" y2="34" stroke="#293B93" strokeWidth="3" strokeLinecap="round" />
      <line x1="116" y1="70" x2="106" y2="70" stroke="#293B93" strokeWidth="3" strokeLinecap="round" />
      <line x1="70" y1="116" x2="70" y2="106" stroke="#293B93" strokeWidth="3" strokeLinecap="round" />
      <line x1="24" y1="70" x2="34" y2="70" stroke="#293B93" strokeWidth="3" strokeLinecap="round" />

      {/* north pointer */}
      <path d="M70 18 L75.5 30 L64.5 30 Z" fill="#293B93" />

      {/* broken needle — north half (dark), tilted, with a gap below pivot */}
      <g className="nf-needle" transform="rotate(32 70 70)">
        <path d="M70 70 L65 44 L70 30 L75 44 Z" fill="#293B93" />
        {/* south half (light) — detached, starts below the pivot */}
        <path d="M70 80 L65 104 L70 118 L75 104 Z" fill="#4A5FC1" />
      </g>

      {/* pivot */}
      <circle cx="70" cy="70" r="4.5" fill="#1B2559" />
      <circle cx="70" cy="70" r="2" fill="#F8F9FC" />

      {/* drifting north-arrow fragment (pointing nowhere) */}
      <path d="M108 38 L118 30 L112 27 Z" fill="#4A5FC1" opacity="0.75" />

      {/* scattered "lost" stars */}
      <circle cx="30" cy="36" r="2.2" fill="#4A5FC1" opacity="0.5" />
      <circle cx="112" cy="104" r="1.6" fill="#293B93" opacity="0.4" />
      <circle cx="40" cy="104" r="1.4" fill="#4A5FC1" opacity="0.35" />
    </svg>
  );
}

export default function NotFound() {
  const locale = useLocale();
  const t = usePathTranslation("notFound");

  const title = t("title", DEFAULTS.title) || DEFAULTS.title;
  const description = t("description", DEFAULTS.description) || DEFAULTS.description;
  const backHome = t("backHome", DEFAULTS.backHome) || DEFAULTS.backHome;
  const contactSupport = t("contactSupport", DEFAULTS.contactSupport) || DEFAULTS.contactSupport;

  const homeHref = `/${locale}`;
  const supportHref = `/${locale}/company/contact-us`;

  return (
    <section className="nf-root relative flex min-h-[calc(100vh-220px)] items-center justify-center overflow-hidden bg-gradient-to-b from-[#F8F9FC] via-[#F8F9FC] to-[#EAEEF8] px-6 py-20">
      {/* localized keyframes — kept here so nothing else has to change */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes nfFadeUp {
              from { opacity: 0; transform: translateY(26px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes nfFloat {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-10px); }
            }
            @keyframes nfSpin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            .nf-illustration { will-change: transform; }
            .nf-orbit { transform-box: fill-box; transform-origin: center; }
            .nf-404, .nf-heading, .nf-desc, .nf-actions { will-change: transform, opacity; }
            @media (prefers-reduced-motion: no-preference) {
              .nf-illustration { animation: nfFloat 5s ease-in-out infinite; }
              .nf-orbit { animation: nfSpin 26s linear infinite; }
              .nf-404 { opacity: 0; animation: nfFadeUp 0.7s ease-out 0.05s forwards; }
              .nf-heading { opacity: 0; animation: nfFadeUp 0.7s ease-out 0.2s forwards; }
              .nf-desc { opacity: 0; animation: nfFadeUp 0.7s ease-out 0.32s forwards; }
              .nf-actions { opacity: 0; animation: nfFadeUp 0.7s ease-out 0.44s forwards; }
            }
          `,
        }}
      />

      {/* decorative brand blobs */}
      <div className="pointer-events-none absolute -top-24 -start-24 h-72 w-72 rounded-full bg-[#293B93]/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -end-20 h-80 w-80 rounded-full bg-[#4A5FC1]/5 blur-3xl" />

      <div className="nf-content relative z-10 mx-auto flex max-w-xl flex-col items-center text-center">
        {/* illustration */}
        <div className="nf-illustration mb-8 flex justify-center">
          <LostCompass />
        </div>

        {/* large gradient 404 */}
        <div className="nf-404 bg-gradient-to-br from-[#293B93] to-[#4A5FC1] bg-clip-text text-[7rem] font-bold leading-none text-transparent sm:text-[8rem] md:text-[9rem]">
          404
        </div>

        {/* heading */}
        <h1 className="nf-heading mt-2 text-2xl font-semibold text-[#1B2559] sm:text-3xl">
          {title}
        </h1>

        {/* description */}
        <p className="nf-desc mt-4 max-w-md text-base leading-relaxed text-[#5A6485] sm:text-lg">
          {description}
        </p>

        {/* actions */}
        <div className="nf-actions mt-9 flex flex-col items-center gap-4 sm:flex-row sm:gap-5">
          <Link
            href={homeHref}
            className="inline-flex h-12 items-center justify-center rounded-full bg-[#293B93] px-8 text-[15px] font-medium text-white shadow-sm transition-colors hover:bg-[#243575] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#293B93]/40 focus-visible:ring-offset-2"
          >
            {backHome}
          </Link>
          <Link
            href={supportHref}
            className="inline-flex h-12 items-center justify-center rounded-full border border-[#293B93] bg-white px-8 text-[15px] font-medium text-[#293B93] transition-colors hover:bg-[#F7F8FC] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#293B93]/40 focus-visible:ring-offset-2"
          >
            {contactSupport}
          </Link>
        </div>
      </div>
    </section>
  );
}

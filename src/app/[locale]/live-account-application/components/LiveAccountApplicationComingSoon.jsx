"use client";

import Link from "next/link";
import { useLocale, usePathTranslation } from "@/app/[locale]/LocaleProvider";
import { localizedHref } from "@/i18n/localizedHref";
import Button from "@/app/[locale]/components/common/Button";
import LiveAccountApplicationContactBar from "./LiveAccountApplicationContactBar";
import SercAccountOpeningForm from "./SercAccountOpeningForm";

const FEATURE_KEYS = ["secure", "fast", "support"];

const FEATURE_FALLBACKS = {
  secure: "Secure verification",
  fast: "Fast digital onboarding",
  support: "Khmer & English support",
};

function FeatureIcon({ name }) {
  const className = "h-5 w-5 text-[#293B93]";

  if (name === "fast") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === "support") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 3a9 9 0 00-9 9v4l-2 2h5.2a3 3 0 006 0H19l-2-2v-4a9 9 0 00-5-9z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3l7 4v5c0 4.5-3 8.5-7 9-4-.5-7-4.5-7-9V7l7-4z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M9.5 12l1.8 1.8L15 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export default function LiveAccountApplicationComingSoon() {
  const locale = useLocale();
  const t = usePathTranslation("liveAccountApplicationPage.comingSoon");

  const demoHref = localizedHref(locale, "/trading/free-demo-account");
  const contactHref = localizedHref(locale, "/company/contact-us");
  const homeHref = localizedHref(locale, "/");

  return (
    <div className="relative overflow-hidden pb-16 pt-6 md:pb-24 md:pt-10">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes laa-float {
              0%, 100% { transform: translateY(0) scale(1); }
              50% { transform: translateY(-12px) scale(1.02); }
            }
            @keyframes laa-shimmer {
              0% { background-position: 0% 50%; }
              100% { background-position: 200% 50%; }
            }
            @keyframes laa-pulse-ring {
              0% { transform: scale(0.92); opacity: 0.45; }
              70% { transform: scale(1.08); opacity: 0; }
              100% { transform: scale(1.08); opacity: 0; }
            }
            .laa-float { animation: laa-float 6s ease-in-out infinite; }
            .laa-shimmer {
              background-size: 200% 200%;
              animation: laa-shimmer 8s linear infinite;
            }
            .laa-pulse-ring { animation: laa-pulse-ring 2.4s ease-out infinite; }
          `,
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(41, 59, 147, 0.18), transparent 60%), linear-gradient(180deg, #f8faff 0%, #eef2ff 45%, #f8faff 100%)",
        }}
      />
      <span
        className="laa-float pointer-events-none absolute -left-16 top-24 h-56 w-56 rounded-full bg-[#293B93]/10 blur-3xl"
        aria-hidden
      />
      <span
        className="laa-float pointer-events-none absolute -right-12 top-40 h-64 w-64 rounded-full bg-[#4A5FC1]/15 blur-3xl"
        style={{ animationDelay: "1.2s" }}
        aria-hidden
      />

      <div className="container relative z-10">
        <SercAccountOpeningForm />
        {/* <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#293B93]/20 bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#293B93] shadow-sm backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="laa-pulse-ring absolute inline-flex h-full w-full rounded-full bg-[#293B93]" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#293B93]" />
            </span>
            {t("badge", "Coming Soon")}
          </span>

          <h1 className="HeadingH2 mt-8 font-semibold text-[#000032] md:mt-10">
            {t("title", "Live Account Application")}
          </h1>

          <p className="mt-4 text-lg font-medium text-[#293B93] md:text-xl">
            {t("headline", "We're putting the finishing touches on your onboarding experience.")}
          </p>

          <p className="Text mx-auto mt-4 max-w-2xl font-normal leading-relaxed text-[#69729F]">
            {t(
              "description",
              "Online live account registration for Cambodia will be available here shortly. In the meantime, open a demo account or speak with our team."
            )}
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-4xl md:mt-14">
          <div className="relative overflow-hidden rounded-[28px] border border-[#E1E7F6]/80 bg-white/90 p-8 shadow-[0_24px_60px_rgba(41,59,147,0.12)] backdrop-blur-sm md:p-12">
            <div
              className="laa-shimmer pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#293B93] via-[#6B7FD7] to-[#293B93]"
              aria-hidden
            />

            <div className="relative flex flex-col items-center">
              <div className="relative mb-8 flex h-28 w-28 items-center justify-center md:h-32 md:w-32">
                <span
                  className="absolute inset-0 rounded-full border border-[#293B93]/15"
                  aria-hidden
                />
                <span
                  className="absolute inset-2 rounded-full border border-dashed border-[#293B93]/25 laa-float"
                  aria-hidden
                />
                <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#293B93] to-[#4A5FC1] shadow-lg shadow-[#293B93]/30 md:h-24 md:w-24">
                  <svg
                    className="h-10 w-10 text-white md:h-12 md:w-12"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M5 9h14v10a2 2 0 01-2 2H7a2 2 0 01-2-2V9z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 13h6M9 16h4"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              <p className="text-center text-sm font-medium uppercase tracking-[0.18em] text-[#8892B0]">
                {t("notify", "Launching soon for Cambodia")}
              </p>

              <ul className="mt-8 grid w-full gap-3 sm:grid-cols-3">
                {FEATURE_KEYS.map((key) => (
                  <li
                    key={key}
                    className="flex items-center gap-3 rounded-2xl border border-[#EEF2FF] bg-[#F8F9FD] px-4 py-3.5 text-left"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                      <FeatureIcon name={key} />
                    </span>
                    <span className="text-sm font-medium leading-snug text-[#000032]">
                      {t(`features.${key}`, FEATURE_FALLBACKS[key])}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex w-full flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
                <Button href={demoHref} variant="primary" size="lg" showArrow className="sm:min-w-[200px]">
                  {t("ctaDemo", "Try free demo")}
                </Button>
                <Button
                  href={contactHref}
                  variant="secondary"
                  size="lg"
                  showArrow
                  className="sm:min-w-[200px]"
                >
                  {t("ctaContact", "Contact support")}
                </Button>
              </div>

              <Link
                href={homeHref}
                className="mt-6 text-sm font-medium text-[#69729F] transition-colors hover:text-[#293B93]"
              >
                {t("ctaHome", "Back to home")} →
              </Link>
            </div>
          </div>

        </div> */}
      </div>
    </div>
  );
}

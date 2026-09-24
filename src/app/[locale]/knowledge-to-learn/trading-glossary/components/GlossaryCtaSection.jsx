"use client";

import Link from "next/link";
import { localizedHref } from "@/i18n/localizedHref";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

const REGISTER_HREF = "/live-account-application";

const DOT_PATTERN_STYLE = {
  backgroundImage:
    "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
  backgroundSize: "24px 24px",
};

export default function GlossaryCtaSection({ locale }) {
  const t = usePathTranslation("glossaryPage.cta");

  return (
    <section className="bg-white py-6 md:py-10">
      <div className="container">
        <div className="relative overflow-hidden rounded-[20px] bg-[#293B93] px-8 py-12 md:px-14 md:py-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={DOT_PATTERN_STYLE}
          />

          <div className="relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div className="flex flex-col justify-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                {t("eyebrow", "Ready when you are")}
              </p>
              <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
                {t("heading", "Ready to trade?")}
              </h2>
              <p className="mt-3 max-w-md text-sm text-white/80">
                {t(
                  "sub",
                  "Ready to start your trading journey with GTCFX? Apply for an account in just a matter of minutes."
                )}
              </p>
              <p className="mt-6 text-xs text-white/60">
                {t("footnote", "Demo also available · no card required")}
              </p>
            </div>

            <div className="flex flex-col items-start gap-3 lg:items-end">
              <Link
                href={localizedHref(locale, REGISTER_HREF)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#293B93] transition hover:bg-gray-100 hover:no-underline"
              >
                {t("primary", "Start trading")} <span aria-hidden>↓</span>
              </Link>

              <Link
                href={localizedHref(locale, "/trading/free-demo-account")}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10 hover:no-underline"
              >
                {t("secondary", "Or try demo")} <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import FadeInSection from "@/app/[locale]/company/regulations/components/FadeInSection";
import { REGISTER_HREF } from "../pammMamData";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

export default function PammMamCtaSection({ data }) {
  const type = data.type; // "PAMM" or "MAM"
  const isPamm = type === "PAMM";
  const t = usePathTranslation(`${data.i18nKey}.cta`);

  return (
    <section className="relative overflow-hidden bg-[#293B93] py-16 md:py-24">
      {/* Dot pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }}
      />
      <div className="container relative z-10 min-w-0 max-w-full">
        <div className="mx-auto max-w-3xl text-center">
          <FadeInSection>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
              {t("eyebrow", "— Get Started Today —")}
            </p>
            <h2 className="HeadingH1 max-w-xl mx-auto mt-5 text-white">
              {t(
                "heading",
                isPamm
                  ? "Ready to build your asset management business?"
                  : "Ready to scale your fund management operation?"
              )}
            </h2>
            <p className="Text mx-auto mt-6 max-w-2xl font-normal leading-[1.7] text-white/70">
              {t(
                "sub",
                isPamm
                  ? "Join hundreds of professional fund managers on GTCFX PAMM — where your trading expertise becomes a scalable, revenue-generating enterprise."
                  : "Join professional fund managers on GTCFX MAM — lot-based control, full transparency, and institutional-grade infrastructure built for scale."
              )}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={REGISTER_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#293B93] transition hover:bg-white/90"
              >
                {t("primaryCta", "Open Live Account")}
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href={data?.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                {t("secondaryCta", isPamm ? "Join as PAMM Investor" : "Join as MAM Investor")}
              </a>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

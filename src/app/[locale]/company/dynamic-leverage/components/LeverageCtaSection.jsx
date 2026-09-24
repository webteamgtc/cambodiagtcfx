"use client";

import { FiArrowRight } from "react-icons/fi";
import FadeInSection from "./FadeInSection";
import { useLocale, usePathTranslation } from "@/app/[locale]/LocaleProvider";
import Link from "next/link";
import { localizedHref } from "@/i18n/localizedHref";

export default function LeverageCtaSection() {
  const t = usePathTranslation("dynamicLeveragePage.cta");
  const locale = useLocale();
  return (
    <section className="bg-white py-10 md:py-16">
      <div className="container">
        <FadeInSection>
          <div
            className="relative overflow-hidden rounded-[28px] md:rounded-[40px] px-6 py-14 text-center md:px-10 md:py-20"
            style={{
              border: "1px solid #E1E7F6",
              background: "linear-gradient(180deg, rgba(255,255,255,0.15) 46%, rgba(183,190,222,0.13) 72%, rgba(41,59,147,0.04) 100%)",
            }}
          >
            <div className="relative z-10 mx-auto max-w-3xl">
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#3347a8]">
                {t("eyebrow", "— START TRADING —")}
              </span>

              <h2 className="HeadingH1 mt-4 text-[#02002f]">
                {t("titleStart", "Trade on the")} <span className="text-[#293B93]">{t("titleHighlight", "best")}</span><br />
                {t("titleEnd", "conditions in the room.")}
              </h2>

              <p className="mx-auto mt-5 max-w-xl text-[15px] leading-[1.7] text-[#5a5a6e]">
                {t(
                  "description",
                  "Open a live account in three minutes, or test every leverage tier risk-free in a demo with USD 100,000 of virtual funds."
                )}
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href={localizedHref(locale, "/live-account-application")}
                  target="_blank"
                  className="inline-flex h-12 items-center gap-2 rounded-full bg-[#293B93] px-8 text-[15px] font-semibold text-white shadow-lg shadow-[#293B93]/25 transition hover:bg-[#1e2d6f] hover:no-underline"
                >
                  {t("primaryCta", "Open Live Account")}
                  <FiArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={localizedHref(locale, "/trading/free-demo-account")}
                  className="inline-flex h-12 items-center gap-2 rounded-full border border-[#d1d5e0] bg-white px-8 text-[15px] font-semibold text-[#02002f] transition hover:border-[#3347a8] hover:bg-[#f8f9ff] hover:no-underline"
                >
                  {t("secondaryCta", "Try Demo Account")}
                </Link>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}

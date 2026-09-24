"use client";

import RevealOnScroll from "../../../components/RevealOnScroll";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";
import { localizedHref } from "@/i18n/localizedHref";
import Link from "next/link";

export default function MarketHolidaysCtaSection({ locale }) {
  const t = usePathTranslation("marketHolidaysPage.cta");
  
  return (
    <section
      className="w-full py-16 md:py-20"
      style={{
        background:
          "linear-gradient(135deg, #1B2559 0%, #293B93 50%, #3347a8 100%)",
      }}
    >
      <div className="container mx-auto px-4">
        <RevealOnScroll>
          <div className="flex flex-col items-center text-center lg:flex-row lg:items-center lg:justify-between lg:text-left gap-10">
            {/* ── Left content ── */}
            <div className="max-w-xl">
              {/* i18n: cta.heading */}
              <h2 className="HeadingH2 text-white">
                {t("heading", "Stay Ahead of Market Changes")}
              </h2>

              <p className="text-white/70 mt-4 max-w-lg">
                {t("sub", "Trading hours and holiday schedules are subject to change. Always verify in your terminal before placing a trade.")}
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-3 mt-6">
                <span className="rounded-full bg-white/10 border border-white/20 px-4 py-2 text-sm text-white">
                  {t("hoursBadge", "⚠️ Hours may vary on holidays")}
                </span>
                <span className="rounded-full bg-white/10 border border-white/20 px-4 py-2 text-sm text-white">
                  {t("liquidityBadge", "📉 Reduced liquidity possible")}
                </span>
              </div>
            </div>

            {/* ── Right content – Buttons ── */}
            <div className="flex flex-col gap-4 shrink-0">
              {/* i18n: cta.open_account */}
              <Link
                href={localizedHref(locale, "/live-account-application")}
                className="rounded-full bg-white/20 backdrop-blur px-8 py-3 text-white font-medium text-lg text-center hover:bg-white/30 transition"
              >
                {t("openCta", "Open an Account")}
              </Link>

              <Link
                href={localizedHref(locale, "/company/contact-us")}
                className="rounded-full border border-white/40 px-8 py-3 text-white font-medium text-lg text-center hover:bg-white/10 transition"
              >
                {t("contactCta", "Contact Support")}
              </Link>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

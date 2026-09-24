"use client";
import Link from "next/link";
import { useLocale, usePathTranslation } from "../../../LocaleProvider";
import { localizedHref } from "@/i18n/localizedHref";
import { localeDir } from "@/i18n/config";
import MarketTicker from "./MarketTicker";

const REGISTER_HREF =
  "/live-account-application";

/** Source image is 1920×880 — keep hero height in sync on large screens to avoid top/bottom crop */
const HERO_ASPECT_HEIGHT = "45.83vw";

export default function HeroSection() {
  const t = usePathTranslation("home.homeHero");
  const locale = useLocale();
  const isRTL = localeDir[locale] === "rtl";

  const heading = t("tradeHeading", "Access Global Markets with GTCFX");
  const sub = t(
    "tradeSub",
    "Trade forex, metals, commodities, indices and more with a secure, fast and professional trading environment."
  );
  const trustedBadge = t(
    "trustedBadge",
    "Trusted by 985,000+ clients worldwide"
  );
  const startLabel = t("startTrading", "Open Live Account");
  const downloadLabel = t("downloadAppCta", "Free Demo Account");
  const heroBanner = isRTL ? "/home/new-banner-rtl.png" : "/home/new-banner.png";

  return (
    <section className="relative z-30 overflow-x-clip">
      <div
        className="relative flex min-h-[min(100vh,680px)] items-center justify-center bg-cover bg-[70%_center] bg-no-repeat pt-14 md:min-h-[clamp(620px,var(--hero-h),880px)] md:bg-center md:pt-0 md:pb-28 lg:pb-32 min-[1920px]:h-[880px] min-[1920px]:min-h-[880px] min-[1920px]:max-h-[880px]"
        style={{
          "--hero-h": HERO_ASPECT_HEIGHT,
          backgroundImage: `url('${heroBanner}')`,
        }}
      >
        <div className="container flex flex-col gap-10  md:flex-row md:items-center md:justify-between md:gap-16 md:text-left text-center">
          <div className="px-4 md:px-0 text-white md:max-w-[28rem] lg:max-w-3xl flex flex-col gap-6">
       
            <h1 className="HeadingH1 max-w-xl text-balance text-white">{heading}</h1>
            <p className="Text text-white max-w-xl ">{sub}</p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <Link
                href={REGISTER_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="TextButton inline-flex min-h-[40px] items-center justify-center rounded-full border border-white/90 bg-transparent px-6 py-2.5 font-semibold text-white transition hover:bg-white/10 hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a1020]/80 md:min-h-[52px] md:px-8"
              >
                {startLabel}
              </Link>
              <Link
                href={localizedHref(locale, "/trading/free-demo-account")}
                className="TextButton inline-flex min-h-[40px] items-center justify-center rounded-full bg-[#2E42A5] px-6 py-2.5 font-semibold text-white shadow-md transition hover:bg-[#1e3490] hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2541B2] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a1020]/80 md:min-h-[52px] md:px-8"
              >
                {downloadLabel}
              </Link>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 hidden justify-center px-3 md:flex md:px-5">
          <div className="pointer-events-auto w-full  translate-y-[46%] md:translate-y-[48%] container">
            <MarketTicker variant="floating" />
          </div>
        </div>
      </div>
    </section>
  );
}
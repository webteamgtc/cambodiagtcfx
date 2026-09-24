"use client";

import Image from "next/image";
import clsx from "clsx";
import Button from "../../../components/common/Button";
import RevealOnScroll from "../../../components/RevealOnScroll";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";
import { localizedHref } from "@/i18n/localizedHref";
const TICKER_CARDS = [
  {
    symbol: "EURUSD",
    category: "FX",
    price: "1.0842",
    change: "+0.0023 (+0.21%)",
    positive: true,
  },
  {
    symbol: "XAUUSD",
    category: "Gold",
    price: "2,341.50",
    change: "+8.30 (+0.36%)",
    positive: true,
  },
  {
    symbol: "US30",
    category: "Index",
    price: "39,218",
    change: "-124 (-0.32%)",
    positive: false,
  },
  {
    symbol: "BTCUSD",
    category: "Crypto",
    price: "67,450",
    change: "+1,230 (+1.86%)",
    positive: true,
  },
];

const STATS = [
  { value: "50+", label: "Currency Pairs" },
  { value: "24/7", label: "Market Hours" },
  { value: "5ms", label: "Avg Execution" },
  { value: "170+", label: "Countries Served" },
];

export default function MarketHolidaysHeroSection({ locale }) {
  const t = usePathTranslation("marketHolidaysPage.hero");
  const statValues = ["50+", "24/7", "5ms", "170+"];
  return (
    <>
    <section className="relative overflow-hidden py-16 md:py-24">
      {/* Background image */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/markets/market-holiday.webp"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

  

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
          {/* Left content */}
          <div className="max-w-xl">
            <RevealOnScroll delay={0}>
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/70 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                {t("badge", "Trading Accounts")}
              </span>
            </RevealOnScroll>

            <RevealOnScroll delay={100}>
              <h1 className="mb-6 text-4xl font-bold leading-tight text-black md:text-5xl lg:text-[56px]">
                {t("headingPrefix", "Find the trading account")}{" "}
                <span className="text-[#293b93]">{t("headingAccent", "that fits")}</span>{" "}
                {t("headingSuffix", "you best.")}
              </h1>
            </RevealOnScroll>

            <RevealOnScroll delay={200}>
              <p className="mb-8 text-base leading-relaxed md:text-lg text-[#6b7280]">
                {t("sub", "From Dubai to London, Singapore to Hong Kong — GTCFX is honored by the institutions and authorities that define each region. Every award is a reflection of the trust we've earned.")}
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={300}>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button
                  href={localizedHref(locale, "/live-account-application")}
                  variant="primary"
                  size="lg"
                  showArrow
                >
                  {t("openCta", "Open live account")}
                </Button>
                <Button
                  href={localizedHref(locale, "/trading/free-demo-account")}
                  variant="outline"
                  size="lg"
                  className="border-[#293b93] text-[#293b93] hover:bg-white/10"
                >
                  {t("demoCta", "Try Demo Account First")}
                </Button>
              </div>
            </RevealOnScroll>
          </div>

          {/* Right ticker cards */}
          <div className="w-full lg:max-w-[480px] xl:max-w-[520px]">
            <RevealOnScroll delay={200}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {TICKER_CARDS.map((card, index) => (
                  <div
                    key={card.symbol}
                    className="rounded-2xl border border-white/20 bg-white/95 p-5 shadow-lg backdrop-blur-sm"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-sm font-semibold text-[#1B2559]">
                        {card.symbol}
                      </span>
                      <span
                        className={clsx(
                          "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                          card.positive
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-red-50 text-red-600"
                        )}
                      >
                        <span
                          className={clsx(
                            "h-1.5 w-1.5 rounded-full",
                            card.positive ? "bg-emerald-500" : "bg-red-500"
                          )}
                        />
                        {t(`tickerCategories.${index}`, card.category)}
                      </span>
                    </div>
                    <div className="mb-1 text-2xl font-bold text-[#1B2559]">
                      {card.price}
                    </div>
                    <div
                      className={clsx(
                        "text-sm font-medium",
                        card.positive ? "text-emerald-600" : "text-red-600"
                      )}
                    >
                      {card.change}
                    </div>
                  </div>
                ))}
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>

    
    </section>
   
      </>
  );
}

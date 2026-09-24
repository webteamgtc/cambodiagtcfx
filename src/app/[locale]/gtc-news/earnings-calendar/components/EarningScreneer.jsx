"use client";

import { useMemo } from "react";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

export default function EarningScreneer({
  locale = "en",
  height = 600,
  market = "america",
  defaultScreen = "earnings_this_month",
  colorTheme = "light",
  showToolbar = true,
  isTransparent = false,
  enableScrolling = true,
}) {
  const t = usePathTranslation("earningsPage.screener");

  const src = useMemo(() => {
    const config = {
      width: "100%",
      height,
      defaultColumn: "overview",
      defaultScreen,
      market,
      showToolbar,
      colorTheme,
      isTransparent,
      enableScrolling,
    };

    const encoded = encodeURIComponent(JSON.stringify(config));
    return `https://www.tradingview-widget.com/embed-widget/screener/?locale=${encodeURIComponent(
      locale
    )}#${encoded}`;
  }, [
    locale,
    height,
    market,
    defaultScreen,
    colorTheme,
    showToolbar,
    isTransparent,
    enableScrolling,
  ]);

  return (
    <section id="earning-screener" className="scroll-mt-24 bg-white py-10 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 text-center md:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#293B93]">
              {t("eyebrow", "Market screener")}
            </p>
            <h2 className="HeadingH2 mt-3 text-[#000032]">
              {t("title", "Earnings this month")}
            </h2>
            <p className="Text mt-3 max-w-2xl font-normal leading-[1.7] text-[#000032]/60">
              {t(
                "description",
                "Scan companies reporting earnings and spot opportunities before the next release."
              )}
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[#E1E7F6] bg-white shadow-sm">
            <iframe
              title="TradingView Screener"
              src={src}
              className="block w-full"
              style={{ height }}
              allowTransparency
            />
          </div>
        </div>
      </div>
    </section>
  );
}

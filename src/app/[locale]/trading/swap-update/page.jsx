import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import SwapUpdateHeroSection from "./components/SwapUpdateHeroSection";
import SwapUpdateCalculatorSection from "./components/SwapUpdateCalculatorSection";
import SwapUpdateStatsBarSection from "./components/SwapUpdateStatsBarSection";
import SwapUpdateSpreadsSection from "./components/SwapUpdateSpreadsSection";
import SwapUpdateRatesSection from "./components/SwapUpdateRatesSection";
import SwapUpdateFaqSection from "./components/SwapUpdateFaqSection";
import SwapUpdateCtaSection from "./components/SwapUpdateCtaSection";

export async function generateMetadata({ params }) {
  const { locale } = await params;

  return getPageMetadata({
    locale,
    key: "swapUpdate",
    path: "trading/swap-update",
    fallbackTitle: "Swap Update | Transparent Spreads & Rates | GTCFX",
    fallbackDescription:
      "View live spreads, commissions, and daily overnight swap rates at GTCFX. Every cost crystal clear — no hidden fees.",
  });
}

export default async function SwapUpdatePage({ params }) {
  const { locale } = await params;

  return (
    <>
      <div className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
          aria-hidden
          style={{
            background: [
              "linear-gradient(180deg, rgba(231, 238, 254, 0) 0%, #F8FAFF 100%)",
              "linear-gradient(180deg, rgba(248, 250, 255, 0) 0%, #F0F4FF 28.37%, #EBF1FE 75.96%, rgba(231, 238, 254, 0) 100%)",
              "linear-gradient(180deg, #F8FAFF 0%, rgba(231, 238, 254, 0) 100%)",
            ].join(", "),
          }}
        />

        <SwapUpdateHeroSection locale={locale} />
  
        {/* <SwapUpdateStatsBarSection /> */}
        <SwapUpdateSpreadsSection />
     
      </div>

      <SwapUpdateCtaSection locale={locale} />
    </>
  );
}

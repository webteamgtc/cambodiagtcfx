import { Suspense } from "react";
import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import MarketHolidaysHeroSection from "./components/MarketHolidaysHeroSection";
import TradingHoursSection from "./components/TradingHoursSection";
import HolidayCalendarSection from "./components/HolidayCalendarSection";
import TradeableInstrumentsSection from "./components/TradeableInstrumentsSection";
import MarketHolidaysCtaSection from "./components/MarketHolidaysCtaSection";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return getPageMetadata({
    locale,
    key: "marketHolidays",
    path: "markets/market-holidays",
    fallbackTitle: "Market Holidays & Trading Hours | GTCFX",
    fallbackDescription: "Check forex and CFD trading hours, market holidays, and schedule updates. Plan your trades with GTCFX's comprehensive market calendar.",
  });
}

export default async function MarketHolidaysPage({ params }) {
  const { locale } = await params;
  return (
    <>
      <MarketHolidaysHeroSection locale={locale} />
      <Suspense fallback={null}>
        <TradingHoursSection locale={locale} />
      </Suspense>
      <Suspense fallback={null}>
        <HolidayCalendarSection locale={locale} />
      </Suspense>
      <Suspense fallback={null}>
        <TradeableInstrumentsSection locale={locale} />
      </Suspense>
      <Suspense fallback={null}>
        <MarketHolidaysCtaSection locale={locale} />
      </Suspense>
    </>
  );
}

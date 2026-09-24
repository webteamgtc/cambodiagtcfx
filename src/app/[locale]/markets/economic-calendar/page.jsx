import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import EconomicCalendarHeroSection from "./components/EconomicCalendarHeroSection";
import MarketsEconomicCalendarSection from "../components/MarketsEconomicCalendarSection";
import EconomicCalendarFaqSection from "./components/EconomicCalendarFaqSection";
import EconomicCalendarCtaSection from "./components/EconomicCalendarCtaSection";

export async function generateMetadata({ params }) {
  const { locale } = await params;

  return getPageMetadata({
    locale,
    key: "economicCalendar",
    path: "markets/economic-calendar",
    fallbackTitle: "Economic Calendar | Market Events & Data | GTCFX",
    fallbackDescription:
      "Track high-impact economic events, central bank decisions, and key market data with the GTCFX Economic Calendar. Stay ahead of the market.",
  });
}

export default async function EconomicCalendarPage({ params }) {
  const { locale } = await params;

  return (
    <div className="bg-white">
      <EconomicCalendarHeroSection locale={locale} />
      <div id="calendar">
        <MarketsEconomicCalendarSection locale={locale} />
      </div>
      <EconomicCalendarFaqSection />
      <EconomicCalendarCtaSection locale={locale} />
    </div>
  );
}

import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import MarketNewsTopSection from "./components/MarketNewsTopSection";
import MarketNewsTrendsSection from "./components/MarketNewsTrendsSection";
import MarketNewsCalendarSection from "./components/MarketNewsCalendarSection";
import MarketNewsAnalysisSection from "./components/MarketNewsAnalysisSection";
import MarketNewsKnowledgeHubSection from "./components/MarketNewsKnowledgeHubSection";
import MarketNewsActivationSection from "./components/MarketNewsActivationSection";

export async function generateMetadata({ params }) {
  const { locale } = await params;

  return getPageMetadata({
    locale,
    key: "marketNews",
    path: "gtc-news/market-news",
    fallbackTitle: "Market News | GTCFX Trading",
    fallbackDescription:
      "Stay ahead with GTCFX market news — breaking headlines, economic calendar updates, analysis videos, and trading insights across forex, indices, commodities, and crypto.",
  });
}

export default async function MarketNewsPage({ params }) {
  const { locale } = await params;

  return (
    <div className="bg-white">
      <MarketNewsTopSection locale={locale} />
      <MarketNewsTrendsSection locale={locale} />
      <MarketNewsCalendarSection locale={locale} />
      <MarketNewsAnalysisSection />
      <MarketNewsKnowledgeHubSection locale={locale} />
      <MarketNewsActivationSection locale={locale} />
    </div>
  );
}

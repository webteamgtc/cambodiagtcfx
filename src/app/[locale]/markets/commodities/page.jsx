import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import MarketPage from "../market-shared/components/MarketPage";
import { COMMODITIES } from "../market-shared/marketPageData";

export async function generateMetadata({ params }) {
  const { locale } = await params;

  return getPageMetadata({
    locale,
    key: "commodities",
    path: COMMODITIES.path,
    fallbackTitle: "Trade Commodities | 40+ Products | GTCFX",
    fallbackDescription:
      "Trade energy, metals, and agricultural commodities with competitive spreads and flexible leverage at GTCFX.",
  });
}

export default async function CommoditiesMarketPage({ params }) {
  const { locale } = await params;

  return <MarketPage data={COMMODITIES} locale={locale} />;
}

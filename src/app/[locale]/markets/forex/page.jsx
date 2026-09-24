import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import MarketPage from "../market-shared/components/MarketPage";
import { FOREX } from "../market-shared/marketPageData";
export async function generateMetadata({ params }) {
  const { locale } = await params;

  return getPageMetadata({
    locale,
    key: "forex",
    path: FOREX.path,
    fallbackTitle: "Trade Forex | 70+ Currency Pairs | GTCFX",
    fallbackDescription:
      "Trade 70+ forex pairs with tight spreads, fast execution, and flexible leverage at GTCFX.",
  });
}

export default async function ForexMarketPage({ params }) {
  const { locale } = await params;

  return (
    <MarketPage data={FOREX} locale={locale} />
  );
}

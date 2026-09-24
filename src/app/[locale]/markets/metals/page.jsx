import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import AssetMarketPage from "../market-shared/components/AssetMarketPage";
import { METALS } from "../market-shared/assetMarketData";
export async function generateMetadata({ params }) {
  const { locale } = await params;

  return getPageMetadata({
    locale,
    key: "metals",
    path: METALS.path,
    fallbackTitle: "Trade Precious Metals | Gold & Silver | GTCFX",
    fallbackDescription:
      "Trade gold, silver, platinum, and palladium CFDs with tight spreads and flexible leverage at GTCFX.",
  });
}

export default async function MetalsMarketPage({ params }) {
  const { locale } = await params;

  return (
    <AssetMarketPage data={METALS} locale={locale} />
  );
}

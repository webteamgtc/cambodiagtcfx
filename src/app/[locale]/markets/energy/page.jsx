import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import AssetMarketPage from "../market-shared/components/AssetMarketPage";
import { ENERGY } from "../market-shared/assetMarketData";
export async function generateMetadata({ params }) {
  const { locale } = await params;

  return getPageMetadata({
    locale,
    key: "energy",
    path: ENERGY.path,
    fallbackTitle: "Trade Energy Markets | Crude Oil & Gas | GTCFX",
    fallbackDescription:
      "Trade energy CFDs including crude oil, natural gas, and refined products with competitive spreads at GTCFX.",
  });
}

export default async function EnergyMarketPage({ params }) {
  const { locale } = await params;

  return (
    <AssetMarketPage data={ENERGY} locale={locale} />
  );
}

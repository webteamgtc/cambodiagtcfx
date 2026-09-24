import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import AssetMarketPage from "../market-shared/components/AssetMarketPage";
import { FUTURE_CFDS } from "../market-shared/assetMarketData";
export async function generateMetadata({ params }) {
  const { locale } = await params;

  return getPageMetadata({
    locale,
    key: "futureCfds",
    path: FUTURE_CFDS.path,
    fallbackTitle: "Trade Future CFDs | Futures Contracts | GTCFX",
    fallbackDescription:
      "Trade leading future CFDs including futures contracts with competitive spreads at GTCFX.",
  });
}

export default async function FutureCfdsMarketPage({ params }) {
  const { locale } = await params;

  return (
    <AssetMarketPage data={FUTURE_CFDS} locale={locale} />
  );
}

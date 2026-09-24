import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import AssetMarketPage from "../market-shared/components/AssetMarketPage";
import { CRYPTO } from "../market-shared/assetMarketData";
export async function generateMetadata({ params }) {
  const { locale } = await params;

  return getPageMetadata({
    locale,
    key: "cryptoCfds",
    path: CRYPTO.path,
    fallbackTitle: "Trade Crypto CFDs | Bitcoin & Ethereum | GTCFX",
    fallbackDescription:
      "Trade leading cryptocurrency CFDs including Bitcoin and Ethereum with competitive spreads at GTCFX.",
  });
}

export default async function CryptoCfdsMarketPage({ params }) {
  const { locale } = await params;

  return (
    <AssetMarketPage data={CRYPTO} locale={locale} />
  );
}

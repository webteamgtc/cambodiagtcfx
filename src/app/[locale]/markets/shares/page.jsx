import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import MarketPage from "../market-shared/components/MarketPage";
import { SHARES } from "../market-shared/marketPageData";
export async function generateMetadata({ params }) {
  const { locale } = await params;

  return getPageMetadata({
    locale,
    key: "shares",
    path: SHARES.path,
    fallbackTitle: "Trade Shares | Global Stocks | GTCFX",
    fallbackDescription:
      "Trade shares on leading global companies. Access stock market opportunities with flexible trading conditions and real-time pricing.",
  });
}

export default async function SharesMarketPage({ params }) {
  const { locale } = await params;

  return (
    <MarketPage data={SHARES} locale={locale} />
  );
}

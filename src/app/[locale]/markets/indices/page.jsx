import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import MarketPage from "../market-shared/components/MarketPage";
import { INDICES } from "../market-shared/marketPageData";
export async function generateMetadata({ params }) {
  const { locale } = await params;

  return getPageMetadata({
    locale,
    key: "indices",
    path: INDICES.path,
    fallbackTitle: "Trade Indices | Global Markets | GTCFX",
    fallbackDescription:
      "Trade global indices including US30, US500, GER40, and more with competitive spreads at GTCFX.",
  });
}

export default async function IndicesMarketPage({ params }) {
  const { locale } = await params;

  return (
    <MarketPage data={INDICES} locale={locale} />
  );
}

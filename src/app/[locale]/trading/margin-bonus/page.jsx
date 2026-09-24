import { getDictionary } from "@/i18n/request";
import MarginBonusPageSection from "./components/MarginBonusPageSection";
import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
export async function generateMetadata({ params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return getPageMetadata({
    locale,
    key: "marginBonus",
    dict,
    path: "trading/margin-bonus",
    fallbackTitle: "Margin Bonus - GTC FX",
    fallbackDescription: "Enhance your trading power with additional margin support, giving you greater flexibility to seize market opportunities.",
  });
}

export default async function pages({ params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const marginBonusPage = dict?.marginBonusPage || {};
  

  return (
    <>
 
      <MarginBonusPageSection messages={marginBonusPage} />

      {/* other sections */}
    </>
  );
}

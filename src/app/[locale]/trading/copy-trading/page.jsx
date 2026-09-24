import { getDictionary } from "@/i18n/request";
import CopyTradingHero from "./components/CopyTradingHero";
import WhatIsCopyTradingSection from "./components/WhatIsCopyTradingSection";
import CopyTradingHowItWorks from "./components/CopyTradingHowItWorks";
import CopyRatingData from "./components/CopyRatingData";
import CopyTradingRiskDisclosureSection from "./components/CopyTradingRiskDisclosureSection";
import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import { translationTextByPath } from "@/i18n/tranlsationText";
export async function generateMetadata({ params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return getPageMetadata({
    locale,
    key: "copyTrading",
    dict,
    path: "trading/copy-trading",
    fallbackTitle: "Copy Trading - GTC FX",
    fallbackDescription: "Copy top strategies with GTCFX.",
  });
}

export default async function AboutPage({ params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const copyTradingPage = dict?.copyTradingPage || {};
 
  return (
    <>
      <CopyTradingHero messages={copyTradingPage} />
      <WhatIsCopyTradingSection messages={copyTradingPage} />
      <CopyRatingData messages={copyTradingPage} />
      <CopyTradingHowItWorks messages={copyTradingPage} />
      <CopyTradingRiskDisclosureSection />
    </>
  );
}

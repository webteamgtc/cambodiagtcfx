import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import MegaMenuHubTabs from "@/app/[locale]/components/common/MegaMenuHubTabs";
import EducationalHeroSection from "./components/EducationalHeroSection";
import EducationalMaterialsSection from "./components/EducationalMaterialsSection";
import TradingEssentialsSection from "./components/TradingEssentialsSection";
import MarketGuidesSection from "./components/MarketGuidesSection";
import DemoTradingSection from "./components/DemoTradingSection";
import CustomEconomicCalendarSection from "./components/CustomEconomicCalendarSection";
import QandASection from "./components/QandASection";
import GtcGoPromoSection from "./components/GtcGoPromoSection";
import TradingJourneyCtaSection from "./components/TradingJourneyCtaSection";
import { getMenuHubTabsForLocale } from "@/app/[locale]/components/common/megaMenuData";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return getPageMetadata({
    locale,
    key: "knowledgeToLearn",
    path: "knowledge-to-learn",
    fallbackTitle: "Knowledge to Trade - GTC FX",
    fallbackDescription: "Guides, tutorials, FAQs, and educational resources to trade with confidence.",
  });
}

export default async function KnowledgeHubPage({ params }) {
  const { locale } = await params;
  const { title, links } = await getMenuHubTabsForLocale("learn", locale);

  return (
    <>
 
      <EducationalHeroSection links={links}/>
      <EducationalMaterialsSection locale={locale} />
      {/* <TradingEssentialsSection locale={locale} />
      <MarketGuidesSection locale={locale} /> */}
            {/* <GtcGoPromoSection /> */}

      <DemoTradingSection locale={locale} />
      <QandASection />
      <TradingJourneyCtaSection locale={locale} />
    </>
  );
}

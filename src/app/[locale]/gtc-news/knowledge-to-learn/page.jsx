import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import MenuHubSection from "@/app/[locale]/components/common/MenuHubSection";
import InnerPageBanner from "@/app/[locale]/components/common/InnerPageBanner";
import EducationalMaterialsSection from "./components/EducationalMaterialsSection";
import TradingEssentialsSection from "./components/TradingEssentialsSection";
import MarketGuidesSection from "./components/MarketGuidesSection";
import DemoTradingSection from "./components/DemoTradingSection";
import EconomicCalendarSection from "./components/EconomicCalendarSection";
import CustomEconomicCalendarSection from "./components/CustomEconomicCalendarSection";
import QandASection from "./components/QandASection";
import TradingJourneyCtaSection from "./components/TradingJourneyCtaSection";
import SupportCtaSection from "@/app/[locale]/components/common/SupportCtaSection";
import { getMenuHubTabsForLocale } from "@/app/[locale]/components/common/megaMenuData";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const { title } = await getMenuHubTabsForLocale("about", locale);

  return getPageMetadata({
    locale,
    key: "gtc-news/knowledge-to-learn",
    path: "gtc-news/knowledge-to-learn",
    fallbackTitle: `${title || "Knowledge to trade"} - GTC FX`,
    fallbackDescription:
      "Guides, tutorials, FAQs, and educational resources to trade with confidence.",
  });
}

export default async function KnowledgeHubPage({ params }) {
  const { locale } = await params;
  const { title, links } = await getMenuHubTabsForLocale("about", locale);

  return (
    <>
 
      <EducationalMaterialsSection locale={locale} />
      <TradingEssentialsSection locale={locale} />
      <MarketGuidesSection locale={locale} />
      <DemoTradingSection locale={locale} />
      <CustomEconomicCalendarSection />
      <QandASection />
      <TradingJourneyCtaSection locale={locale} />
    </>
  );
}

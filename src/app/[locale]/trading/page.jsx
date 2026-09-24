import { Suspense } from "react";
import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import { getMenuHubTabsForLocale } from "@/app/[locale]/components/common/megaMenuData";
import TradingHubSection from "./components/TradingHubSection";
import TradingOpenAccountSection from "./components/TradingOpenAccountSection";
import TradingFundAccountSection from "./components/TradingFundAccountSection";
import TradingAccountTypesSection from "./components/TradingAccountTypesSection";
import TradingPlatformsSection from "./components/TradingPlatformsSection";
import TradingDynamicLeverageSection from "./components/TradingDynamicLeverageSection";
import TradingSwapUpdateSection from "./components/TradingSwapUpdateSection";
import TradingSwapFreeSection from "./components/TradingSwapFreeSection";
import TradingAdvantagesSection from "./components/TradingAdvantagesSection";
import TradingVpsPricingSection from "./components/TradingVpsPricingSection";
import SupportCtaSection from "../components/common/SupportCtaSection";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const { title } = await getMenuHubTabsForLocale("trading", locale);

  return getPageMetadata({
    locale,
    key: "trading",
    path: "trading",
    fallbackTitle: `${title || "Trading"} - GTC FX`,
    fallbackDescription:
      "Open a trading account, explore MT4, MT5, GTC Go, and trading tools at GTCFX.",
  });
}

export default async function TradingHubPage({ params }) {
  const { locale } = await params;
  const { links } = await getMenuHubTabsForLocale("trading", locale);

  return (
    <>
      <Suspense fallback={null}>
        <TradingHubSection locale={locale} links={links} />
        <TradingOpenAccountSection />
        <TradingFundAccountSection locale={locale} />
        <TradingAccountTypesSection />
      </Suspense>
      <Suspense fallback={null}>
        <TradingPlatformsSection locale={locale} />
        <TradingDynamicLeverageSection />
        <TradingSwapUpdateSection />
        {/* <TradingSwapFreeSection /> */}
      </Suspense>
      <Suspense fallback={null}>
        <TradingAdvantagesSection />
        <TradingVpsPricingSection locale={locale} />
        <SupportCtaSection locale={locale} />
      </Suspense>
    </>
  );
}

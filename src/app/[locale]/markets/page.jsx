import { Suspense } from "react";
import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import { getMenuHubTabsForLocale } from "@/app/[locale]/components/common/megaMenuData";
import MarketsHubSection from "./components/MarketsHubSection";
import MarketsIndicesTicker from "./components/MarketsIndicesTicker";
import MarketsInstrumentsSection from "./components/MarketsInstrumentsSection";
import MarketsEconomicCalendarSection from "./components/MarketsEconomicCalendarSection";
import WhyGtcGroupGetStartedSection from "@/app/[locale]/company/why-gtc-group/components/WhyGtcGroupGetStartedSection";

export const revalidate = 300;

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const { title } = await getMenuHubTabsForLocale("markets", locale);

  return getPageMetadata({
    locale,
    key: "markets",
    path: "markets",
    fallbackTitle: `${title || "Markets"} | GTCFX`,
    fallbackDescription:
      "Trade forex, indices, metals, energy, and commodities with GTCFX.",
  });
}

export default async function MarketsHubPage({ params }) {
  const { locale } = await params;
  const { links } = await getMenuHubTabsForLocale("account", locale);

  return (
    <>
      <MarketsHubSection locale={locale} links={links} />
      <Suspense fallback={null}>
        <MarketsInstrumentsSection locale={locale} />
      </Suspense>
      <Suspense fallback={null}>
        <div
          style={{
            background: "linear-gradient(180deg, rgba(231, 238, 254, 0.00) 0%, #F8FAFF 92.87%)",
          }}
        >
          <MarketsEconomicCalendarSection locale={locale} />
        </div>
      </Suspense>
      <Suspense fallback={null}>
       
        <MarketsIndicesTicker />
        {/* <MarketsPopularCommoditiesSection /> */}
        <WhyGtcGroupGetStartedSection />

      </Suspense>
    </>
  );
}

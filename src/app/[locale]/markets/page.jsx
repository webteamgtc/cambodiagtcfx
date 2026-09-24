import { Suspense } from "react";
import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import { fetchBlogsStrapiPage } from "@/lib/strapiBlogs";
import { getMenuHubTabsForLocale } from "@/app/[locale]/components/common/megaMenuData";
import MarketsHubSection from "./components/MarketsHubSection";
import MarketsIndicesTicker from "./components/MarketsIndicesTicker";
import MarketsInstrumentsSection from "./components/MarketsInstrumentsSection";
import MarketsNewsFeedSection from "./components/MarketsNewsFeedSection";
import MarketsEconomicCalendarSection from "./components/MarketsEconomicCalendarSection";
import MarketsPopularRecommendationsSection from "./components/MarketsPopularRecommendationsSection";
import MarketsPopularCommoditiesSection from "./components/MarketsPopularCommoditiesSection";
import WhyGtcGroupGetStartedSection from "@/app/[locale]/company/why-gtc-group/components/WhyGtcGroupGetStartedSection";

// Revalidate page shell periodically; blog fetch uses no-store for fresh Strapi media.
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
  const { data: blogData } = await fetchBlogsStrapiPage(locale, 0, 5, "no-store");
  const posts = Array.isArray(blogData) ? blogData : [];

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
          <MarketsNewsFeedSection locale={locale} posts={posts} />
          <div className="mx-auto max-w-6xl h-[1px] bg-[#B3C0FF]"/>
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

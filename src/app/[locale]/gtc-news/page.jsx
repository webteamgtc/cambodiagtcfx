import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import {
  fetchBlogsByCategorySlug,
  fetchEventBlogsPage,
  fetchFavouriteBlogsPage,
  fetchStrapiCategories,
  filterTrendCategories,
  mapBlogPostForNewsCard,
} from "@/lib/strapiBlogs";
import MegaMenuHubTabs from "@/app/[locale]/components/common/MegaMenuHubTabs";
import { getMenuHubTabsForLocale } from "@/app/[locale]/components/common/megaMenuData";
import GtcNewsBrokerSection from "./components/GtcNewsBrokerSection";
import GtcNewsAppSection from "./components/GtcNewsAppSection";
import GtcNewsTrendsSection from "./components/GtcNewsTrendsSection";
import GtcNewsAnalysisSection from "./components/GtcNewsAnalysisSection";
import GtcNewsKnowledgeHubSection from "./components/GtcNewsKnowledgeHubSection";
import MarketNewsActivationSection from "./market-news/components/MarketNewsActivationSection";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return getPageMetadata({
    locale,
    key: "gtcNews",
    path: "gtc-news",
    fallbackTitle: "GTC News | GTCFX Trading",
    fallbackDescription: "Get the latest market insights, company news, and trading updates from GTCFX.",
  });
}

export default async function GtcNewsPage({ params }) {
  const { locale } = await params;
  const { links } = await getMenuHubTabsForLocale("about", locale);

  const { data: favouritePosts = [] } = await fetchFavouriteBlogsPage(
    locale,
    0,
    4
  );
  const brokerPosts = (Array.isArray(favouritePosts) ? favouritePosts : []).map(
    (post) => mapBlogPostForNewsCard(post, locale)
  );

  const { data: trendCategories = [] } = await fetchStrapiCategories(locale);
  const visibleTrendCategories = filterTrendCategories(trendCategories);
  const firstTrendCategorySlug = visibleTrendCategories[0]?.slug || "";
  const { data: initialTrendPosts = [] } = firstTrendCategorySlug
    ? await fetchBlogsByCategorySlug(locale, firstTrendCategorySlug, 0, 6)
    : { data: [] };
  const trendPosts = (Array.isArray(initialTrendPosts) ? initialTrendPosts : []).map(
    (post) => mapBlogPostForNewsCard(post, locale)
  );

  const { data: eventPosts = [] } = await fetchEventBlogsPage(locale, 0, 1);
  const eventFeatured = (Array.isArray(eventPosts) ? eventPosts : [])
    .map((post) => mapBlogPostForNewsCard(post, locale))[0] ?? null;

  return (
    <div className="bg-white">
      {/* <div className="pt-6 md:pt-10">
        <MegaMenuHubTabs links={links} />
      </div> */}
      {/* <GtcNewsBrokerSection locale={locale} posts={brokerPosts} /> */}
      <GtcNewsTrendsSection
        locale={locale}
        categories={visibleTrendCategories}
        initialPosts={trendPosts}
        initialCategorySlug={firstTrendCategorySlug}
      />
    
      <GtcNewsKnowledgeHubSection locale={locale} featuredPost={eventFeatured} />
      <MarketNewsActivationSection locale={locale} />
    </div>
  );
}

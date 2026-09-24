import { notFound } from "next/navigation";
import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import { fetchStrapiCategories, fetchBlogsByCategorySlug, mapBlogPostForNewsCard } from "@/lib/strapiBlogs";
import CategoryHeroSection from "./components/CategoryHeroSection";
import PriceMarquee from "./components/PriceMarquee";
import CategoryNewsGrid from "./components/CategoryNewsGrid";
import MarketNewsActivationSection from "@/app/[locale]/gtc-news/market-news/components/MarketNewsActivationSection";
import MarketTicker from "../../components/common/home/MarketTicker";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { locale, category } = await params;
  const { data: categories = [] } = await fetchStrapiCategories(locale);
  const match = categories.find((item) => item.slug === category);
  const title = match?.name || category.charAt(0).toUpperCase() + category.slice(1);

  return getPageMetadata({
    locale,
    key: `gtc-news/${category}`,
    path: `gtc-news/${category}`,
    fallbackTitle: `${title} News | GTCFX`,
    fallbackDescription: `Latest ${title} news and market insights from GTCFX.`,
  });
}

export default async function CategoryPage({ params }) {
  const { locale, category } = await params;
  const { data: categories = [] } = await fetchStrapiCategories(locale);
  const match = categories.find((item) => item.slug === category);

  if (!match) {
    notFound();
  }

  const { data: initialPosts = [], meta } = await fetchBlogsByCategorySlug(
    locale,
    category,
    0,
    12
  );
  const posts = (Array.isArray(initialPosts) ? initialPosts : []).map((post) =>
    mapBlogPostForNewsCard(post, locale)
  );
  const total = Number(meta?.pagination?.total ?? posts.length);

  return (
    <div className="bg-white">
      <CategoryHeroSection locale={locale} category={match.name} />
      <MarketTicker locale={locale} fullWidth hideTabs />
      <CategoryNewsGrid
        locale={locale}
        category={category}
        categoryName={match.name}
        initialPosts={posts}
        initialTotal={total}
      />
      <MarketNewsActivationSection locale={locale} />
    </div>
  );
}

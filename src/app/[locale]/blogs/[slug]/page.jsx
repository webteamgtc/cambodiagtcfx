import { notFound } from "next/navigation";
import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import {
  fetchBlogRowBySlug,
  fetchBlogsStrapiPage,
  mapBlogPostForBlogsPageCard,
  mapBlogPostForMarketNewsArticle,
} from "@/lib/strapiBlogs";
import MarketNewsArticleHeaderSection from "@/app/[locale]/markets/market-news/components/article/MarketNewsArticleHeaderSection";
import MarketNewsArticleBodySection from "@/app/[locale]/markets/market-news/components/article/MarketNewsArticleBodySection";
import MarketNewsArticleFeedbackSection from "@/app/[locale]/markets/market-news/components/article/MarketNewsArticleFeedbackSection";
import MarketNewsArticleCommentsSection from "@/app/[locale]/markets/market-news/components/article/MarketNewsArticleCommentsSection";
import MarketNewsRelatedSection from "@/app/[locale]/markets/market-news/components/article/MarketNewsRelatedSection";
import MarketNewsArticleCtaSection from "@/app/[locale]/markets/market-news/components/article/MarketNewsArticleCtaSection";
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const post = await fetchBlogRowBySlug(slug, locale);
  if (!post) {
    return getPageMetadata({
      locale,
      key: "blogs",
      path: `blogs/${slug}`,
      fallbackTitle: "Blogs - GTC FX",
      fallbackDescription: "Read market insights from GTCFX.",
    });
  }

  const article = mapBlogPostForMarketNewsArticle(post, locale);
  const description =
    article.excerpt ||
    article.paragraphs?.[0] ||
    "Read market insights from GTCFX.";

  return getPageMetadata({
    locale,
    key: "blogs",
    path: `blogs/${slug}`,
    fallbackTitle: `${article.title} | GTCFX`,
    fallbackDescription: description,
    overrideTitle: article.title ? `${article.title} | GTCFX` : undefined,
    overrideDescription: description,
    overrideOgImageUrl:
      article.image && String(article.image).startsWith("http")
        ? article.image
        : undefined,
  });
}

export default async function BlogDetailPage({ params }) {
  const { locale, slug } = await params;
  const post = await fetchBlogRowBySlug(slug, locale);
  if (!post) {
    notFound();
  }
  const article = mapBlogPostForMarketNewsArticle(post, locale);
  const { data: relatedSource = [] } = await fetchBlogsStrapiPage(locale, 0, 4);
  const relatedArticles = (Array.isArray(relatedSource) ? relatedSource : [])
    ?.filter((entry) => {
      const attrs = entry?.attributes ?? entry ?? {};
      return (attrs?.slug || entry?.slug) !== slug;
    })
    ?.slice(0, 3)
    ?.map((entry) => {
      const card = mapBlogPostForBlogsPageCard(entry, locale);
      return {
        slug: card.slug,
        categorySlug: card.categorySlug,
        title: card.title,
        excerpt: card.excerpt,
        date: card.date,
        image: card.image,
        href: card.href,
        comments: 0,
        likes: 0,
      };
    });

  return (
    <div className="bg-white">
      <MarketNewsArticleHeaderSection
        article={article}
        locale={locale}
        parentLabel="Blogs"
        parentHref="/blogs"
        hideCategoryCrumb
      />
      <MarketNewsArticleBodySection article={article} />
      <MarketNewsArticleFeedbackSection />
      <MarketNewsArticleCommentsSection comments={article.comments} />
      <MarketNewsRelatedSection
        locale={locale}
        relatedArticles={relatedArticles}
        viewMoreHref="/blogs"
      />
      <MarketNewsArticleCtaSection locale={locale} />

    </div>

  );

}



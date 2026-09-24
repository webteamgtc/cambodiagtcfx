import { notFound, permanentRedirect } from "next/navigation";
import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import {
  buildMarketNewsArticleHref,
  buildCanonicalBlogHref,
  fetchBlogByCategoryAndSlug,
  fetchBlogRowBySlug,
  fetchBlogsByCategorySlug,
  fetchStrapiCategories,
  mapBlogPostForMarketNewsArticle,
  mapBlogPostForNewsCard,
} from "@/lib/strapiBlogs";
import {
  getMarketNewsArticle,
  RELATED_ARTICLES,
} from "../marketNewsArticleData";
import MarketNewsArticleHeaderSection from "../components/article/MarketNewsArticleHeaderSection";
import MarketNewsArticleBodySection from "../components/article/MarketNewsArticleBodySection";
import MarketNewsArticleFeedbackSection from "../components/article/MarketNewsArticleFeedbackSection";
import MarketNewsArticleCommentsSection from "../components/article/MarketNewsArticleCommentsSection";
import MarketNewsRelatedSection from "../components/article/MarketNewsRelatedSection";
import MarketNewsArticleCtaSection from "../components/article/MarketNewsArticleCtaSection";

export const dynamic = "force-dynamic";

function normalizeSegments(segments) {
  if (!segments) return [];
  return (Array.isArray(segments) ? segments : [segments]).filter(Boolean);
}

function redirectLegacyBlogCategory(locale, segments) {
  const parts = normalizeSegments(segments);
  if (parts.length !== 2 || parts[0] !== "blogs") return;

  permanentRedirect(buildCanonicalBlogHref(locale, parts[1]));
}

async function resolveArticleContext(locale, segments) {
  const parts = normalizeSegments(segments);

  if (parts.length === 2) {
    const [category, slug] = parts;
    const [{ data: categories = [] }, post, { data: categoryPosts = [] }] =
      await Promise.all([
        fetchStrapiCategories(locale),
        fetchBlogByCategoryAndSlug(locale, category, slug),
        fetchBlogsByCategorySlug(locale, category, 0, 4),
      ]);

    if (post) {
      return {
        article: mapBlogPostForMarketNewsArticle(post, locale),
        relatedSource: categoryPosts,
        currentSlug: slug,
        categories,
      };
    }

    const rowBySlug = await fetchBlogRowBySlug(slug, locale);
    if (rowBySlug) {
      const attrs = rowBySlug?.attributes ?? rowBySlug ?? {};
      const actualCategory =
        attrs?.category?.data?.attributes?.slug ||
        attrs?.category?.slug ||
        category;

      if (actualCategory !== category) {
        permanentRedirect(buildMarketNewsArticleHref(actualCategory, slug));
      }
    }

    const staticArticle = getMarketNewsArticle(slug);
    if (staticArticle) {
      return {
        article: staticArticle,
        relatedSource: null,
        currentSlug: slug,
        categories,
        staticRelated: RELATED_ARTICLES,
      };
    }

    return { article: null, categories };
  }

  if (parts.length === 1) {
    const [slug] = parts;
    const [{ data: categories = [] }, post] = await Promise.all([
      fetchStrapiCategories(locale),
      fetchBlogRowBySlug(slug, locale),
    ]);

    const categorySlugs = new Set(categories.map((item) => item.slug));
    if (categorySlugs.has(slug)) {
      notFound();
    }

    if (post) {
      const attrs = post?.attributes ?? post ?? {};
      const categorySlug =
        attrs?.category?.data?.attributes?.slug ||
        attrs?.category?.slug ||
        "blogs";

      permanentRedirect(buildMarketNewsArticleHref(categorySlug, slug));
    }

    const staticArticle = getMarketNewsArticle(slug);
    if (staticArticle) {
      return {
        article: staticArticle,
        relatedSource: null,
        currentSlug: slug,
        categories,
        staticRelated: RELATED_ARTICLES,
      };
    }
  }

  return { article: null, categories: [] };
}

export async function generateMetadata({ params }) {
  const { locale, segments } = await params;
  redirectLegacyBlogCategory(locale, segments);
  const parts = normalizeSegments(segments);
  const { article } = await resolveArticleContext(locale, parts);

  const path =
    parts.length === 2
      ? `markets/market-news/${parts[0]}/${parts[1]}`
      : parts.length === 1
        ? `markets/market-news/${parts[0]}`
        : "markets/market-news";

  if (!article) {
    return getPageMetadata({
      locale,
      key: "marketNews",
      path,
      fallbackTitle: "Market News | GTCFX",
      fallbackDescription: "Read the latest market news and analysis from GTCFX.",
    });
  }

  const description =
    article.excerpt ||
    article.paragraphs?.[0] ||
    "Read the latest market news and analysis from GTCFX.";

  return getPageMetadata({
    locale,
    key: "marketNews",
    path,
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

export default async function MarketNewsArticlePage({ params }) {
  const { locale, segments } = await params;
  redirectLegacyBlogCategory(locale, segments);
  const parts = normalizeSegments(segments);
  const { article, relatedSource, currentSlug, staticRelated } =
    await resolveArticleContext(locale, parts);

  if (!article) {
    notFound();
  }

  const relatedArticles = staticRelated
    ? staticRelated
    : (Array.isArray(relatedSource) ? relatedSource : [])
        .filter((entry) => {
          const attrs = entry?.attributes ?? entry ?? {};
          return (attrs?.slug || entry?.slug) !== currentSlug;
        })
        .slice(0, 3)
        .map((entry) => {
          const card = mapBlogPostForNewsCard(entry, locale);
          return {
            slug: card.slug,
            categorySlug: card.categorySlug,
            title: card.title,
            excerpt: card.excerpt,
            date: card.date,
            image: card.image,
            comments: 0,
            likes: 0,
          };
        });

  return (
    <div className="bg-white">
      <MarketNewsArticleHeaderSection article={article} locale={locale} />
      <MarketNewsArticleBodySection article={article} />
      <MarketNewsArticleFeedbackSection />
      <MarketNewsArticleCommentsSection comments={article.comments} />
      <MarketNewsRelatedSection locale={locale} relatedArticles={relatedArticles} />
      <MarketNewsArticleCtaSection locale={locale} />
    </div>
  );
}

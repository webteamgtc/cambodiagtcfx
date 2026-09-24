import { notFound } from "next/navigation";
import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import {
  getAllMarketNewsArticleSlugs,
  getMarketNewsArticle,
} from "../marketNewsArticleData";
import MarketNewsArticleHeaderSection from "../components/article/MarketNewsArticleHeaderSection";
import MarketNewsArticleBodySection from "../components/article/MarketNewsArticleBodySection";
import MarketNewsArticleFeedbackSection from "../components/article/MarketNewsArticleFeedbackSection";
import MarketNewsArticleCommentsSection from "../components/article/MarketNewsArticleCommentsSection";
import MarketNewsRelatedSection from "../components/article/MarketNewsRelatedSection";
import MarketNewsArticleCtaSection from "../components/article/MarketNewsArticleCtaSection";

export function generateStaticParams() {
  return getAllMarketNewsArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const article = getMarketNewsArticle(slug);

  return getPageMetadata({
    locale,
    key: "marketNews",
    path: `gtc-news/market-news/${slug}`,
    fallbackTitle: article ? `${article.title} | GTCFX` : "Market News | GTCFX",
    fallbackDescription: article?.paragraphs?.[0] ?? "Read the latest market news and analysis from GTCFX.",
    overrideTitle: article ? `${article.title} | GTCFX` : undefined,
    overrideDescription: article?.paragraphs?.[0],
  });
}

export default async function MarketNewsArticlePage({ params }) {
  const { locale, slug } = await params;
  const article = getMarketNewsArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="bg-white">
      <MarketNewsArticleHeaderSection article={article} locale={locale} />
      <MarketNewsArticleBodySection article={article} />
      <MarketNewsArticleFeedbackSection />
      <MarketNewsArticleCommentsSection comments={article.comments} />
      <MarketNewsRelatedSection locale={locale} />
      <MarketNewsArticleCtaSection locale={locale} />
    </div>
  );
}

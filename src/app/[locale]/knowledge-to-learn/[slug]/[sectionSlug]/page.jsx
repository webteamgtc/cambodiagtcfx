import { notFound } from "next/navigation";
import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import {
  fetchBlogsByLearnTypeSlug,
  mapBlogPostForKnowledgeArticleCard,
} from "@/lib/strapiBlogs";
import { fetchLearnTypeBySlug } from "@/lib/strapiLearnTypes";
import {
  getKnowledgeMaterial,
  getMaterialSection,
} from "../../knowledgeMaterialsData";
import ArticleCardsGrid from "../../components/course/ArticleCardsGrid";
import TradingCtaSection from "../../components/course/TradingCtaSection";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { locale, slug, sectionSlug } = await params;
  const material = getKnowledgeMaterial(slug);

  let learnType = null;
  try {
    learnType = await fetchLearnTypeBySlug(locale, sectionSlug);
  } catch {
    learnType = null;
  }

  const staticSection = getMaterialSection(slug, sectionSlug);
  const sectionTitle = learnType?.name || staticSection?.title;

  if (!material || !sectionTitle) {
    return getPageMetadata({
      locale,
      key: "knowledge-to-learn",
      path: "knowledge-to-learn",
      fallbackTitle: "Knowledge to Trade - GTC FX",
      fallbackDescription: "Guides, tutorials, and educational resources.",
    });
  }

  return getPageMetadata({
    locale,
    key: `knowledge-to-learn/${slug}/${sectionSlug}`,
    path: `knowledge-to-learn/${slug}/${sectionSlug}`,
    fallbackTitle: `${sectionTitle} - ${material.courseTitle} - GTC FX`,
    fallbackDescription: sectionTitle,
  });
}

export default async function KnowledgeSectionPage({ params }) {
  const { locale, slug, sectionSlug } = await params;
  const material = getKnowledgeMaterial(slug);

  if (!material) {
    notFound();
  }

  let learnType = null;
  try {
    learnType = await fetchLearnTypeBySlug(locale, sectionSlug);
  } catch (error) {
    console.error("[knowledge-to-learn] learn-type fetch failed:", error?.message || error);
  }

  const staticSection = getMaterialSection(slug, sectionSlug);

  if (!learnType && !staticSection) {
    notFound();
  }

  let articles = [];
  try {
    const { data } = await fetchBlogsByLearnTypeSlug(locale, sectionSlug);
    articles = (data || [])
      .map(mapBlogPostForKnowledgeArticleCard)
      .filter((article) => article.slug && article.title);
  } catch (error) {
    console.error("[knowledge-to-learn] blogs fetch failed:", error?.message || error);
  }

  if (!articles.length && learnType?.blog?.slug) {
    articles = [
      {
        slug: learnType.blog.slug,
        title: learnType.blog.title || learnType.name,
      },
    ];
  }

  if (!articles.length && staticSection?.articles?.length) {
    articles = staticSection.articles;
  }

  const title = learnType?.name || staticSection?.title || sectionSlug;

  return (
    <>
      <ArticleCardsGrid
        locale={locale}
        materialSlug={slug}
        sectionSlug={sectionSlug}
        title={title}
        articles={articles}
      />
      <TradingCtaSection locale={locale} />
    </>
  );
}

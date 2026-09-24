import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FiArrowLeft } from "react-icons/fi";
import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import { localizedHref } from "@/i18n/localizedHref";
import {
  fetchBlogByLearnTypeAndSlug,
  fetchBlogBySlugForMetadata,
  mapBlogPostForMarketNewsArticle,
} from "@/lib/strapiBlogs";
import { fetchLearnTypeBySlug } from "@/lib/strapiLearnTypes";
import {
  getKnowledgeMaterial,
  getMaterialArticle,
  getMaterialSection,
} from "../../../knowledgeMaterialsData";
import MarketNewsArticleBodySection from "@/app/[locale]/markets/market-news/components/article/MarketNewsArticleBodySection";
import TradingCtaSection from "../../../components/course/TradingCtaSection";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { locale, slug, sectionSlug, articleSlug } = await params;
  const material = getKnowledgeMaterial(slug);

  const blogMeta = await fetchBlogBySlugForMetadata(articleSlug, locale);
  const staticArticle = getMaterialArticle(slug, sectionSlug, articleSlug);
  const staticSection = getMaterialSection(slug, sectionSlug);

  const title =
    blogMeta?.title || staticArticle?.title || "Knowledge to Trade - GTC FX";

  return getPageMetadata({
    locale,
    key: "knowledge-to-learn",
    path: `knowledge-to-learn/${slug}/${sectionSlug}/${articleSlug}`,
    fallbackTitle: `${title} - ${material?.courseTitle ?? "GTC FX"}`,
    fallbackDescription:
      blogMeta?.description || staticArticle?.title || "Guides, tutorials, and educational resources.",
    overrideTitle: title ? `${title} | GTCFX` : undefined,
    overrideDescription: blogMeta?.description || staticArticle?.title,
  });
}

const PLACEHOLDER_PARAGRAPHS = [
  "Understanding the markets begins with a solid grasp of the fundamentals. In this lesson, we break down the core concepts every trader should know before placing their first trade.",
  "Technical analysis is one of the most widely used approaches to forecasting price movements. By studying historical charts and applying indicators, traders can make more informed decisions in real time.",
  "Risk management is just as important as finding the right setup. Successful traders focus on position sizing, stop-loss placement, and maintaining a balanced risk-to-reward ratio.",
];

export default async function KnowledgeArticlePage({ params }) {
  const { locale, slug, sectionSlug, articleSlug } = await params;
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
  const staticArticle = getMaterialArticle(slug, sectionSlug, articleSlug);

  if (!learnType && !staticSection) {
    notFound();
  }

  let blogPost = null;
  try {
    blogPost = await fetchBlogByLearnTypeAndSlug(locale, sectionSlug, articleSlug);
  } catch (error) {
    console.error("[knowledge-to-learn] blog fetch failed:", error?.message || error);
  }

  if (!blogPost && !staticArticle) {
    notFound();
  }

  const sectionHref = localizedHref(locale, `/knowledge-to-learn/${slug}/${sectionSlug}`);

  const article = blogPost
    ? mapBlogPostForMarketNewsArticle(blogPost, locale)
    : {
        title: staticArticle.title,
        htmlContent: "",
        paragraphs: PLACEHOLDER_PARAGRAPHS,
        image: null,
      };

  return (
    <div className="mt-20 bg-white">
      {/* <article className="pt-10 pb-6 md:pt-14">
        <div className="container min-w-0 max-w-full">
          <div className="mx-auto max-w-4xl">
            <h1 className="HeadingH2 font-bold text-black">{article.title}</h1>

            {article.image ? (
              <div className="relative mt-8 aspect-[18/7] w-full overflow-hidden rounded-xl">
                <Image
                  src={article.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 896px"
                  priority
                />
              </div>
            ) : null}
          </div>
        </div>
      </article> */}

      <MarketNewsArticleBodySection article={article} />

      <div className="container min-w-0 max-w-full pb-10">
        <div className="mx-auto max-w-4xl border-t border-[#D9D9D9] pt-8">
          <Link
            href={sectionHref}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#293B93] transition hover:text-[#243575] hover:no-underline"
          >
            <FiArrowLeft className="h-4 w-4" aria-hidden />
            Back to Section
          </Link>
        </div>
      </div>

      <TradingCtaSection locale={locale} />
    </div>
  );
}

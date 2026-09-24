import { notFound } from "next/navigation";
import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import {
  fetchLearnTypesByMainCategory,
  mapLearnTypesToSections,
} from "@/lib/strapiLearnTypes";
import {
  getAllMaterialSlugs,
  getKnowledgeMaterial,
  getMaterialSections,
} from "../knowledgeMaterialsData";
import CourseHeader from "../components/course/CourseHeader";
import SectionCardsGrid from "../components/course/SectionCardsGrid";
import CourseAppPromoSection from "../components/course/CourseAppPromoSection";
import KnowledgeMaterialDebug from "../components/course/KnowledgeMaterialDebug";

const MATERIAL_TRANSLATION_SCOPES = {
  "for-trading-beginners": {
    header: "forTradingBeginnersPage.courseHeader",
    sections: "forTradingBeginnersPage.sections",
  },
};

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return getAllMaterialSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const material = getKnowledgeMaterial(slug);

  if (!material) {
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
    key: `knowledge-to-learn/${slug}`,
    path: `knowledge-to-learn/${slug}`,
    fallbackTitle: `${material.courseTitle} - GTC FX`,
    fallbackDescription: material.courseSubtitle,
  });
}

export default async function KnowledgeMaterialPage({ params }) {
  const { locale, slug } = await params;
  const material = getKnowledgeMaterial(slug);

  if (!material) {
    notFound();
  }

  let learnTypes = [];
  try {
    const result = await fetchLearnTypesByMainCategory(locale, slug);
    learnTypes = result.items;
  } catch (error) {
    console.error("[knowledge-to-learn] learn-types fetch failed:", error?.message || error);
  }

  const sectionsFromApi = mapLearnTypesToSections(learnTypes, slug);
  const sections = sectionsFromApi || [];
  const translationScopes = MATERIAL_TRANSLATION_SCOPES[slug];

  return (
    <>
      <KnowledgeMaterialDebug
        slug={slug}
        learnTypes={learnTypes}
        sectionsFromApi={sectionsFromApi}
        sections={sections}
      />
      <CourseHeader
        locale={locale}
        translationScope={translationScopes?.header}
        title={material?.courseTitle}
        subtitle={material?.courseSubtitle}
        progressTotal={sections?.length}
      />
      <SectionCardsGrid
        locale={locale}
        materialSlug={slug}
        sections={sections}
        translationScope={translationScopes?.sections}
      />
      <CourseAppPromoSection />
    </>
  );
}

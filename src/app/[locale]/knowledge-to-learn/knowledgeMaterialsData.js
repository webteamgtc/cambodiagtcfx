/** Shared course / material data for knowledge hub slug routes */

export const KNOWLEDGE_MATERIALS = [
  {
    slug: "for-trading-beginners",
    key: "videoTutorials",
    courseTitle: "Technical Analysis for Beginners: Trading with Charts and Indicators",
    courseSubtitle: "Free online courses covering technical analysis",
    progressTotal: 5,
  },
  {
    slug: "ebooks-guides",
    key: "ebooksGuides",
    courseTitle: "E-Books & Guides: Forex and CFD Fundamentals",
    courseSubtitle: "Downloadable guides for every stage of your trading journey",
    progressTotal: 5,
  },
  {
    slug: "webinars-live",
    key: "webinarsLive",
    courseTitle: "Webinars & Live Sessions: Learn From Active Traders",
    courseSubtitle: "Interactive live market analysis and Q&A sessions",
    progressTotal: 4,
  },
  {
    slug: "platform-walkthroughs",
    key: "platformWalkthroughs",
    courseTitle: "Platform Walkthroughs: MT4, MT5 & WebTrader",
    courseSubtitle: "Step-by-step platform guides from install to first trade",
    progressTotal: 6,
  },
  {
    slug: "technical-analysis",
    key: "technicalAnalysis",
    courseTitle: "Technical Analysis for Beginners: Trading with Charts and Indicators",
    courseSubtitle: "Free online courses covering technical analysis",
    progressTotal: 5,
  },
];

const DEFAULT_ARTICLES = [
  { slug: "opening-your-first-position", title: "Opening Your First Position" },
  { slug: "new-discover-hub-on-mobile-app", title: "New Discover Hub on Mobile App" },
  {
    slug: "wall-street-futures-rise-on-tech-earnings-beat",
    title: "Wall Street futures rise on tech earnings beat",
  },
  { slug: "understanding-candlestick-patterns", title: "Understanding Candlestick Patterns" },
  { slug: "how-to-set-stop-loss-and-take-profit", title: "How to Set Stop Loss and Take Profit" },
  { slug: "reading-support-and-resistance-levels", title: "Reading Support and Resistance Levels" },
  { slug: "intro-to-moving-averages", title: "Intro to Moving Averages" },
  { slug: "risk-management-basics", title: "Risk Management Basics" },
  { slug: "building-your-first-watchlist", title: "Building Your First Watchlist" },
];

function buildSections(materialSlug) {
  return Array.from({ length: 6 }, (_, index) => {
    const num = index + 1;
    const sectionSlug = `section-${num}`;
    return {
      slug: sectionSlug,
      label: `SECTION ${num}`,
      title: "What is technical analysis?",
      units: "5 units",
      articles: DEFAULT_ARTICLES.map((article) => ({
        ...article,
        slug: `${sectionSlug}-${article.slug}`,
        href: `/knowledge-to-learn/${materialSlug}/${sectionSlug}/${article.slug}`,
      })),
    };
  });
}

const sectionsByMaterial = Object.fromEntries(
  KNOWLEDGE_MATERIALS.map((material) => [material.slug, buildSections(material.slug)])
);

export function getKnowledgeMaterial(slug) {
  return KNOWLEDGE_MATERIALS.find((material) => material.slug === slug) ?? null;
}

export function getMaterialSections(materialSlug) {
  return sectionsByMaterial[materialSlug] ?? [];
}

export function getMaterialSection(materialSlug, sectionSlug) {
  return getMaterialSections(materialSlug).find((section) => section.slug === sectionSlug) ?? null;
}

export function getMaterialArticle(materialSlug, sectionSlug, articleSlug) {
  const section = getMaterialSection(materialSlug, sectionSlug);
  return section?.articles.find((article) => article.slug === articleSlug) ?? null;
}

export function getMaterialByCardKey(cardKey) {
  return KNOWLEDGE_MATERIALS.find((material) => material.key === cardKey) ?? null;
}

export function getAllMaterialSlugs() {
  return KNOWLEDGE_MATERIALS.map((material) => material.slug);
}

export function getAllSectionParams() {
  return KNOWLEDGE_MATERIALS.flatMap((material) =>
    getMaterialSections(material.slug).map((section) => ({
      slug: material.slug,
      sectionSlug: section.slug,
    }))
  );
}

export function getAllArticleParams() {
  return KNOWLEDGE_MATERIALS.flatMap((material) =>
    getMaterialSections(material.slug).flatMap((section) =>
      section.articles.map((article) => ({
        slug: material.slug,
        sectionSlug: section.slug,
        articleSlug: article.slug,
      }))
    )
  );
}

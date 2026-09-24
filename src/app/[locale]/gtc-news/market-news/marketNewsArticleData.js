export const REGISTER_HREF =
  "https://mygtcfx.com/getview?view=register&token=exhowww.z8owwwww";

export const MARKET_NEWS_ARTICLES = {
  "how-to-create-order-in-orbit": {
    slug: "how-to-create-order-in-orbit",
    title: "Public Enterprises Ministry, Future of Egypt discuss boosting industry cooperation",
    source: "Daily News Egypt",
    author: "Hany Abou-El-Fotouh",
    date: "24 November 2023",
    lastUpdated: "January 7, 2026 10:01 pm",
    readTime: "2 min read",
    shareCount: 24,
    image: "/new-design/Markets/news-big-one.svg",
    paragraphs: [
      "Minister of Public Enterprises Sector Mohamed Shimi received Head of Future of Egypt Authority for Sustainable Development Bahaa El-Ghannam, at the ministry's headquarters in the New Capital to discuss ways to strengthen cooperation and advance strategic partnerships in support of the state's sustainable development goals.",
      "The meeting reviewed a number of areas of mutual interest, most notably potential cooperation between the Future of Egypt Authority and the ministry's affiliated companies in several sectors, including phosphate production, salt industries, and vehicle manufacturing.",
      "Shimi emphasized that the Ministry of Public Enterprises Sector is implementing an integrated strategy aimed at maximizing the utilization of assets and capabilities within its affiliated companies, in line with Egypt's Vision 2030, to generate the highest possible added value for the national economy.",
      "He stressed the importance of enhancing integration and cooperation with national entities, particularly the Future of Egypt Authority, given its extensive expertise and significant capabilities.",
      "The minister also praised the authority's pivotal role in supporting the national economy through its major projects in agriculture, industry, and food manufacturing, which contribute to strengthening food security and achieving sustainable development. He underscored the need to unify efforts to ensure optimal use of national resources.",
      "For his part, Bahaa El-Ghannam stated that the coming period will witness expanded coordination and closer collaboration to implement joint projects. These initiatives aim to boost production, enhance sustainability, and create new job opportunities, thereby positively impacting the Egyptian economy.",
      "El-Ghannam said that the Future of Egypt Authority operates in line with the directives of the political leadership to enhance food security and support sustainable development, with a focus on expanding integrated productive projects, strengthening supply chains, and achieving long-term economic sustainability.",
    ],
    comments: [
      {
        id: "1",
        author: "James Wane",
        asked: "April 19, 2026",
        category: "Analytics",
        text: "This cooperation roadmap could matter a lot for industrial names tied to phosphate and logistics. Would love more clarity on project timelines.",
        replies: [
          {
            id: "1-1",
            author: "GTCFX Editorial",
            asked: "April 19, 2026",
            category: "Analytics",
            text: "Thanks James — we will update this article as official statements are released.",
            replies: [],
          },
        ],
      },
      {
        id: "2",
        author: "Omar Hassan",
        asked: "April 18, 2026",
        category: "Markets",
        text: "Interesting development for regional industrial policy. Watching energy and logistics names closely.",
        replies: [],
      },
    ],
  },
  "public-enterprises-ministry-future-of-egypt": {
    slug: "public-enterprises-ministry-future-of-egypt",
    title: "How to Create 'Order in Orbit'",
    source: "GTCFX Editorial",
    author: "Justin Low",
    date: "23 December 2025",
    lastUpdated: "December 23, 2025 4:30 pm",
    readTime: "4 min read",
    shareCount: 18,
    image: "/new-design/Markets/news-big-one.svg",
    paragraphs: [
      "With space traffic and space debris on the rise, the need for an effective international space traffic management system has never been more pressing.",
      "What would it take to create, develop, and operationalize such a system — and how might markets respond as policy frameworks evolve?",
      "This article outlines the core coordination challenges, stakeholder incentives, and potential milestones investors should monitor over the coming quarters.",
    ],
    comments: [],
  },
};

export const RELATED_ARTICLES = [
  {
    slug: "evaluation-dutch-merchant-shipping-protection-act",
    title: "Evaluation of the Dutch Merchant Shipping Protection Act",
    excerpt: "RAND Europe is evaluating the Merchant Shipping Protection Act that allows ..",
    date: "Dec 23, 2025",
    comments: 11,
    likes: 24,
    image: "/new-design/Markets/news-small-one.webp",
  },
  {
    slug: "asian-markets-venezuela-impact-gold-rally",
    title: "Evaluation of the Dutch Merchant Shipping Protection Act",
    excerpt: "RAND Europe is evaluating the Merchant Shipping Protection Act that allows ..",
    date: "Dec 23, 2025",
    comments: 11,
    likes: 24,
    image: "/new-design/Markets/news-small-two.webp",
  },
  {
    slug: "us-dollar-forecast-2026",
    title: "Evaluation of the Dutch Merchant Shipping Protection Act",
    excerpt: "RAND Europe is evaluating the Merchant Shipping Protection Act that allows ..",
    date: "Dec 23, 2025",
    comments: 11,
    likes: 24,
    image: "/new-design/Markets/news-small-one.webp",
  },
];

export function getMarketNewsArticle(slug) {
  return MARKET_NEWS_ARTICLES[slug] ?? null;
}

export function getAllMarketNewsArticleSlugs() {
  return Object.keys(MARKET_NEWS_ARTICLES);
}

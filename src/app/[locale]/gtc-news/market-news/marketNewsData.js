export const REGISTER_HREF =
  "https://mygtcfx.com/getview?view=register&token=exhowww.z8owwwww";

export const CLIENT_PORTAL_HREF = "https://mygtcfx.com/";

const NEWS_IMAGE = "/new-design/Markets/news-small-one.webp";
const FEATURED_IMAGE = "/new-design/Markets/news-big-one.svg";
const KNOWLEDGE_IMAGE = "/new-design/Markets/knowledge.svg";

export const TOP_NEWS = {
  gtcNews: {
    title: "GTC News",
    items: [
      {
        image: "/new-design/Markets/news-small-one.webp",
        title: "In Ukraine, Is the U.S. Promising Too Much?",
        author: "Justin Low",
        date: "Dec 23, 2025",
        href: "/blogs",
      },
      {
        image: "/new-design/Markets/news-small-two.webp",
        title: "In Ukraine, Is the U.S. Promising Too Much?",
        author: "Justin Low",
        date: "Dec 23, 2025",
        href: "/blogs",
      },
    ],
  },
  breaking: {
    title: "Breaking News",
    slides: [
      {
        image: FEATURED_IMAGE,
        headline: "How to Create 'Order in Orbit'",
        excerpt:
          "With space traffic and space debris on the rise, the need for an effective international space traffic management system has never been more pressing. What would it take to create, develop, and operationalize such a system?",
        author: "Justin Low",
        date: "Dec 23, 2025",
        href: "/gtc-news/market-news/how-to-create-order-in-orbit",
      },
      {
        excerpt:
          "Markets are repositioning ahead of the next CPI print as traders weigh the path of rate cuts and the dollar's near-term direction.",
        author: "Justin Low",
        date: "Dec 22, 2025",
        href: "/blogs",
      },
      {
        image: "/new-design/Markets/news-small-one.webp",
        headline: "Oil Volatility Rises Ahead of OPEC+ Output Decision",
        excerpt:
          "Energy traders are bracing for a choppy session as supply expectations shift and geopolitical risk premiums remain elevated.",
        author: "Justin Low",
        date: "Dec 21, 2025",
        href: "/blogs",
      },
      {
        image: "/new-design/Markets/news-small-one.webp",
        headline: "Wall Street Futures Rise on Tech Earnings Beat",
        excerpt:
          "Index futures climbed after a string of stronger-than-expected earnings reports lifted sentiment across growth sectors.",
        author: "Justin Low",
        date: "Dec 20, 2025",
        href: "/blogs",
      },
      {
        image: KNOWLEDGE_IMAGE,
        headline: "Gold Tests Key Resistance as Safe-Haven Demand Builds",
        excerpt:
          "Precious metals are drawing fresh interest as investors hedge macro uncertainty and watch central-bank commentary closely.",
        author: "Justin Low",
        date: "Dec 19, 2025",
        href: "/blogs",
      },
    ],
  },
  latestNews: {
    title: "Latest News",
    items: [
      {
        image: "/new-design/Markets/news-small-three.webp",
        title: "In Ukraine, Is the U.S. Promising Too Much?",
        author: "Justin Low",
        date: "3 hours ago",
        href: "/blogs",
      },
      {
        image: "/new-design/Markets/news-small-four.webp",
        title: "In Ukraine, Is the U.S. Promising Too Much?",
        author: "Justin Low",
        date: "Dec 23, 2025",
        href: "/blogs",
      },
    ],
  },
};

export const TREND_TABS = [
  { key: "finance", label: "Finance" },
  { key: "business", label: "Business" },
  { key: "fashion", label: "Fashion" },
  { key: "technology", label: "Technology" },
  { key: "lifestyle", label: "Lifestyle" },
  { key: "entertainment", label: "Entertainment" },
  { key: "celebrity", label: "Celebrity" },
  { key: "sports", label: "Sports" },
];

export const MARKET_SUMMARIES = [
  { label: "General In...", price: "10,014.86", change: "-0.42%", trend: "down" },
  { label: "General In...", price: "10,018.24", change: "+0.18%", trend: "up" },
  { label: "General In...", price: "10,006.12", change: "-0.11%", trend: "down" },
  { label: "General In...", price: "10,021.55", change: "+0.27%", trend: "up" },
  { label: "General In...", price: "10,009.73", change: "-0.05%", trend: "down" },
];

export const CHART_TIMEFRAMES = ["1M", "1Y", "5Y", "Max"];

export const WATCHLIST_ITEMS = [
  { name: "DOW", symbol: "DOW", price: "38,214.50", change: "+0.64%", trend: "up" },
  { name: "BITCOIN", symbol: "BTC", price: "68,420.00", change: "+1.92%", trend: "up" },
  {
    name: "APPLE INC",
    symbol: "AAPL",
    price: "198.42",
    change: "+2.34%",
    trend: "up",
    tag: "Earnings beat",
  },
  { name: "ETHEREUM", symbol: "ETH", price: "2,932.38", change: "+0.87%", trend: "up" },
  { name: "BNB", symbol: "BNB", price: "612.18", change: "+0.45%", trend: "up" },
  { name: "TESLA INC", symbol: "TSLA", price: "248.76", change: "+1.12%", trend: "up" },
];

export const TRENDING_NEWS = [
  {
    image: "/new-design/map.svg",
    source: "Gulfbusiness.com",
    time: "1 hr. ago",
    title: "Space42 reports nine month earnings, lays foundation for sustainable growth",
    href: "/blogs",
  },
  {
    image: "/new-design/map.svg",
    source: "Gulfbusiness.com",
    time: "2 hr. ago",
    title: "Regional markets climb as investors weigh policy signals and earnings",
    href: "/blogs",
  },
  {
    image: "/new-design/map.svg",
    source: "Gulfbusiness.com",
    time: "3 hr. ago",
    title: "Energy stocks advance on supply outlook and stronger crude prices",
    href: "/blogs",
  },
  {
    image: "/new-design/map.svg",
    source: "Gulfbusiness.com",
    time: "4 hr. ago",
    title: "Tech leaders extend rally after upbeat guidance from major chipmakers",
    href: "/blogs",
  },
];

export const ASSET_CARDS = [
  { name: "Ethereum", symbol: "ETH", price: "$2,932.38", change: "+0.87%", trend: "up", color: "#627EEA" },
  { name: "yearn.finance", symbol: "YFI", price: "$6,842.10", change: "-3.54%", trend: "down", color: "#006AE3" },
  { name: "Band Protocol", symbol: "BAND", price: "$1.42", change: "+1.18%", trend: "up", color: "#516AFF" },
  { name: "Gather", symbol: "GTH", price: "$0.0182", change: "-1.26%", trend: "down", color: "#293B93" },
  { name: "Firstcoin", symbol: "FST", price: "$0.0841", change: "+0.62%", trend: "up", color: "#B48755" },
  { name: "GoldMint", symbol: "MNTP", price: "$1.08", change: "-0.44%", trend: "down", color: "#C9A227" },
];

export const CALENDAR_DAY = {
  date: "Monday, Jun 08, 2026",
  eventCount: 7,
  isToday: true,
  rows: [
    {
      time: "02:30",
      country: "AU",
      impact: "high",
      event: "RBA Interest Rate Decision",
      actual: "4.10%",
      forecast: "4.10%",
      previous: "4.35%",
      instruments: ["AUD", "XAU"],
    },
    {
      time: "09:00",
      country: "DE",
      impact: "medium",
      event: "German Industrial Production m/m",
      actual: "0.3%",
      forecast: "0.1%",
      previous: "-0.2%",
      instruments: ["EUR", "DAX"],
    },
    {
      time: "11:00",
      country: "EU",
      impact: "low",
      event: "ECB President Lagarde Speaks",
      actual: "—",
      forecast: "—",
      previous: "—",
      instruments: ["EUR", "US500"],
    },
    {
      time: "13:30",
      country: "US",
      impact: "high",
      event: "Non-Farm Payrolls",
      actual: "+185K",
      forecast: "+165K",
      previous: "+228K",
      instruments: ["USD", "US500", "XAU"],
    },
    {
      time: "13:30",
      country: "US",
      impact: "high",
      event: "Unemployment Rate",
      actual: "3.9%",
      forecast: "4.0%",
      previous: "4.1%",
      instruments: ["USD", "US500"],
    },
    {
      time: "15:00",
      country: "US",
      impact: "medium",
      event: "ISM Services PMI",
      actual: "52.4",
      forecast: "51.8",
      previous: "51.2",
      instruments: ["USD", "US500"],
    },
    {
      time: "17:00",
      country: "US",
      impact: "low",
      event: "Factory Orders m/m",
      actual: "0.2%",
      forecast: "0.1%",
      previous: "-0.4%",
      instruments: ["USD"],
    },
  ],
};

export const KEY_EVENTS = [
  {
    country: "US",
    date: "Jun 08",
    time: "13:30",
    title: "Non-Farm Payrolls",
    description:
      "Markets expect a softer print after last month's surprise upside. A miss could weigh on the dollar and lift gold, while a beat may revive rate-hike bets.",
    href: "/blogs",
  },
  {
    country: "AU",
    date: "Jun 08",
    time: "02:30",
    title: "RBA Interest Rate Decision",
    description:
      "Traders are watching for any shift in forward guidance. A dovish hold could pressure AUD pairs, while hawkish rhetoric may support the currency.",
    href: "/blogs",
  },
];

export const ANALYSIS_VIDEO = {
  title: "GTCFX & Analysis",
  featured: {
    headlineLine1: "Trump-Xi Meeting Sends Markets Higher:",
    headlineLine2: "Is This the Turning Point?",
    currentTime: "00:41:38",
    totalDuration: "01:03:56",
    progress: 64,
    presenterImage: "/new-design/trading-banner.webp",
  },
  thumbnails: [
    {
      headlineLine1: "Trump-Xi Meeting Sends Markets Higher:",
      headlineLine2: "Is This the Turning Point?",
      presenterImage: "/new-design/trading-banner.webp",
    },
    {
      headlineLine1: "Trump-Xi Meeting Sends Markets Higher:",
      headlineLine2: "Is This the Turning Point?",
      presenterImage: "/new-design/trading-banner.webp",
    },
    {
      headlineLine1: "Trump-Xi Meeting Sends Markets Higher:",
      headlineLine2: "Is This the Turning Point?",
      presenterImage: "/new-design/trading-banner.webp",
    },
  ],
};

export const KNOWLEDGE_HUB = {
  subtitle:
    "Enhance you trading knowledge with our MetaTrader trading guides & insightful articles",
  featured: {
    tag: "Central Banks",
    title: "FX option expiries for 6 January 10am New York cut",
    date: "Dec 23, 2025",
    excerpt:
      "A look at the key FX option expiries for the New York cut and what they may mean for major currency pairs heading into the session open.",
    image: KNOWLEDGE_IMAGE,
    href: "/blogs",
    comments: 11,
    likes: 24,
  },
  middleRow: [
    {
      image: "/new-design/Markets/hub-one.svg",
      overlayTitle: "EdTech Stocks",
      excerpt:
        "Education technology names are back in focus as earnings season highlights adoption trends across digital learning platforms.",
      date: "Dec 23, 2025",
      href: "/blogs",
      comments: 11,
      likes: 24,
    },
    {
      image: "/new-design/Markets/hub-one.svg",
      overlayTitle: "Clean Energy ETFs: Renewable Energy",
      excerpt:
        "Renewable energy ETFs are drawing fresh flows as policy support and infrastructure spending keep the sector in the spotlight.",
      date: "Dec 23, 2025",
      href: "/blogs",
      comments: 11,
      likes: 24,
    },
    {
      image: "/new-design/Markets/hub-one.svg",
      overlayTitle: "Top AI Stocks",
      excerpt:
        "AI leaders remain volatile after another week of product launches, with traders watching guidance and capex commentary closely.",
      date: "Dec 23, 2025",
      href: "/blogs",
      comments: 11,
      likes: 24,
    },
  ],
  headlineColumns: [
    [
      {
        title: "Eight warm-weather trips to find purpose.",
        underlined: true,
        href: "/blogs",
      },
      {
        title: "An Explosive Start to 2026-North American Session Market Wrap for January 5.",
        href: "/blogs",
      },
      {
        title: "Turkey's caffeine-free coffee alternative.",
        href: "/blogs",
      },
    ],
    [
      {
        title: "How to Improve Health Care Access and Quality in Rural West Virginia.",
        href: "/blogs",
      },
      {
        title: "The share of pre-K teachers who intended to leave their jobs fell by around.",
        href: "/blogs",
      },
      {
        title:
          "Asian stock markets shrugged off Venezuela's impact, WTI crude sold off, Gold rallied towards...",
        href: "/blogs",
      },
    ],
    [
      {
        title: "How Do Pre-K Teachers Use Educational Technology?",
        href: "/blogs",
      },
      {
        title: "2026 US Dollar Forecast: How the Fed, Government Spending, and AI Will Drive...",
        href: "/blogs",
      },
      {
        title: "US GDP impresses, 2025 in review.",
        href: "/blogs",
      },
    ],
  ],
};

export const ACTIVATION = {
  eyebrow: "ACTIVATION",
  subtitle: "How to enable swap-free — fast & transparent",
  infoColumns: [
    {
      icon: "hand",
      title: "Activation is simple",
      text: "Reach out, and our dedicated team handles the rest. No paperwork, no hidden steps just a seamless request.",
    },
    {
      icon: "question",
      title: "How to activate swap-free?",
      text: "Contact our support team via Live Chat or Email. We will review your eligibility and activate swap-free status on your account once confirmed.",
    },
  ],
  channels: [
    {
      title: "Live Chat",
      subtitle: "24/7 instant support",
      href: "/company/contact-us",
    },
    {
      title: "Email",
      subtitle: "support@gtcfx.com",
      href: "mailto:support@gtcfx.com",
    },
  ],
  cta: {
    label: "Contact Support Now",
    href: "/company/contact-us",
  },
};

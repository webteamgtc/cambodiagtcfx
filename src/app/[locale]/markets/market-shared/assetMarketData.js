import { MARKET_OVERVIEW_ROWS } from "./marketOverviewData";

export const REGISTER_HREF =
  "/live-account-application";

const SHARED_WHY_FEATURES = [
  {
    key: "execution",
    title: "Ultra-fast execution",
    description: "NDD, no dealing desk, zero manual intervention",
    badge: "< 10 ms",
  },
  {
    key: "spreads",
    title: "Tight spreads",
    description: "ECN accounts from 0.0 pips with raw pricing",
    badge: "From 0.0",
  },
  {
    key: "regulated",
    title: "Multi-regulated",
    description: "Licensed by 7 financial authorities worldwide",
    badge: "3 licences",
  },
  {
    key: "support",
    title: "24/7 support",
    description: "English and Khmer client service",
    badge: "AR EN ZH",
  },
  {
    key: "platform",
    title: "Multi-platform",
    description: "MT4, MT5 & GTCFX Go App",
    badge: "MT4-MT5-App",
  },
];

const SHARED_WHY_STATS = [
  { value: "985,000+", label: "Global clients" },
  // { value: "100+", label: "Countries served" },
  { value: "Est. 2012", label: "14+ years of trust" },
];

const SHARED_TRUST_LINKS = [
  { icon: "shield", label: "SCA regulated" },
  { icon: "shield", label: "FCA authorised" },
  { icon: "shield", label: "ASIC licensed" },
  { icon: "lock", label: "Segregated client funds" },
  { icon: "globe", label: "100+ countries" },
];

const SHARED_WHY_SUB =
  "A platform built for serious traders — fast, regulated, and cost-efficient.";

const SHARED_TRENDING_SUB =
  "Whether you trade currencies, energy, global indices, precious metals or broad commodities — GTCFX gives you direct, competitive access to them all.";

const SHARED_TRENDING_FOOTER_STATS = [
  { icon: "globe", text: "200k+ active traders worldwide" },
  { icon: "volume", text: "$15B+ monthly trading volume" },
  { icon: "clock", text: "24/7 dedicated support: 0.5s response" },
];

const SHARED_FAQ_SUB =
  "Industry-leading execution, dual top-tier regulation, and uncompromised fund security — built for traders who demand excellence.";

const SHARED_CFD_ANSWER =
  "A Contract for Difference (CFD) is a derivative product that allows you to speculate on price movements of global financial markets without owning the underlying asset. Profit from both rising and falling prices with flexible terms.";

const SHARED_FINAL_CTA_SUB =
  "Open a live account in minutes, or practise risk-free with our unlimited demo account. No deposit required to start.";

const ENERGY_PROMO = {
  text: "Trade crude oil, natural gas, and other energy CFDs to access the world's most active commodity markets. Go long or short with flexible leverage and razor-thin spreads.",
  highlights: ["WTI spread from 0.03", "Leverage up to 1:1000", "Near 24-hour trading"],
};

const METALS_PROMO = {
  text: "Trade gold, silver, and other precious metal CFDs to hedge inflation and diversify your portfolio. Access deep liquidity with competitive spreads and flexible leverage.",
  highlights: ["Gold spread from 0.22", "Leverage up to 1:2000", "Near 24-hour trading"],
};

const CRYPTO_PROMO = {
  text: "Trade leading cryptocurrency CFDs around the clock — speculate on price moves without a wallet. Go long or short with transparent pricing and flexible leverage.",
  highlights: ["BTC spread from 15.70", "Leverage up to 1:2000", "24/7 market access"],
};

const SHARED_MARKET_OVERVIEW_ROWS = MARKET_OVERVIEW_ROWS;

const SHARED_HERO_STATS = [
  { value: "0.0", label: "Min Spread (pips)" },
  { value: "1:2000", label: "Max Leverage" },
  { value: "<10ms", label: "Execution Speed" },
  { value: "24/7", label: "Live Support" },
];

export const ENERGY = {
  i18nKey: "energyMarketPage",
  slug: "energy",
  metaKey: "energy",
  path: "markets/energy",
  activeTab: "energy",
  hero: {
    badge: "MARKET",
    titlePrefix: "Trade",
    titleAccent: "USOIL",
    titleSuffix: "with Precision",
    sub: "Access global energy markets with tight spreads, deep liquidity, and lightning-fast execution on crude oil, natural gas, and refined products.",
    stats: SHARED_HERO_STATS,
    widget: {
      symbol: "USOIL",
      sellPrice: "78.42",
      buyPrice: "78.45",
      spreadDisplay: "0.03 pts",
      dailyChange: "+0.42%",
      dailyChangePositive: true,
      dayHigh: "79.10",
      dayLow: "77.80",
      longPercent: 58,
      shortPercent: 42,
      minSpreadNote: "Min Spread: 0.03 pts · 100 barrels per lot",
    },
  },
  trending: {
    badge: "Hot topic",
    title: "Energy Markets Trending Now",
    sub: SHARED_TRENDING_SUB,
    items: [
      {
        key: "wti",
        name: "WTI Oil",
        code: "CL",
        price: "$75.23",
        change: "+0.32%",
        positive: true,
        footerIcon: "volume",
        footerText: "Volume: 1.2M",
      },
      {
        key: "brent",
        name: "Brent Oil",
        code: "BRN",
        price: "$79.45",
        change: "+0.18%",
        positive: true,
        footerIcon: "globe",
        footerText: "Geopolitical spread",
      },
      {
        key: "ngas",
        name: "Natural Gas",
        code: "NG",
        price: "$2.842",
        change: "-0.47%",
        positive: false,
        footerIcon: "volume",
        footerText: "Volume: 1.2M",
      },
      {
        key: "heat",
        name: "Heating Oil",
        code: "HO",
        price: "$2.613",
        change: "-0.22%",
        positive: false,
        footerIcon: "clock",
        footerText: "24h active",
      },
      {
        key: "gasol",
        name: "Gasoline",
        code: "RB",
        price: "$2.318",
        change: "+0.09%",
        positive: true,
        footerIcon: "volume",
        footerText: "Volume: 980K",
      },
      {
        key: "diesel",
        name: "Gas Oil",
        code: "GO",
        price: "$2.642",
        change: "-0.05%",
        positive: false,
        footerIcon: "clock",
        footerText: "24h active",
      },
      {
        key: "coal",
        name: "Coal",
        code: "COAL",
        price: "$142.50",
        change: "+0.11%",
        positive: true,
        footerIcon: "volume",
        footerText: "Volume: 640K",
      },
      {
        key: "ethanol",
        name: "Ethanol",
        code: "ET",
        price: "$2.124",
        change: "+0.07%",
        positive: true,
        footerIcon: "globe",
        footerText: "Global demand",
      },
    ],
    footerStats: SHARED_TRENDING_FOOTER_STATS,
    footerCta: "Start trading",
  },
  overview: {
    eyebrow: "MARKET OVERVIEW",
    title: "All markets at a glance",
    sub: "Compare spreads, leverage, and trading hours across GTCFX market categories.",
    rows: SHARED_MARKET_OVERVIEW_ROWS,
  },
  why: {
    title: "Why trade energy with GTCFX?",
    sub: SHARED_WHY_SUB,
    features: SHARED_WHY_FEATURES,
    stats: SHARED_WHY_STATS,
    trustLinks: SHARED_TRUST_LINKS,
  },
  promo: ENERGY_PROMO,
  faq: {
    eyebrow: "FAQ",
    title: "Common Questions about Energy",
    sub: SHARED_FAQ_SUB,
    items: [
      {
        "question": "What energy instruments can I trade?",
        "answer": "GTCFX offers Energy CFDs including WTI Crude Oil, Brent Crude Oil, and Natural Gas — all tradeable without owning the underlying commodity."
      },
      {
        "question": "What is an Energy CFD?",
        "answer": "An Energy CFD is a derivative product that allows you to speculate on the price movements of energy commodities such as oil and gas, without owning the physical asset. Positions can be taken in either direction."
      },
      {
        "question": "What spreads are available on energy products?",
        "answer": "Spreads on Energy CFDs vary by instrument and market conditions. View our full spreads table for current pricing."
      },

      {
        "question": "What leverage is available for energy trading?",
        "answer": "Leverage on Energy CFDs is available up to 1:100* depending on your account type and jurisdiction. *FSCM & VFSC clients only."
      },
      {
        "question": "What are the trading hours for energy markets?",
        "answer": "Energy CFDs are available to trade approximately 23 hours per day, Monday to Friday, subject to market conditions."
      }
    ],
  },
  finalCta: {
    eyebrow: "START NOW",
    title: "Ready to Trade energy?",
    sub: SHARED_FINAL_CTA_SUB,
  },
};

export const METALS = {
  i18nKey: "metalsMarketPage",
  slug: "metals",
  metaKey: "metals",
  path: "markets/metals",
  activeTab: "metals",
  hero: {
    badge: "MARKET",
    titlePrefix: "Trade",
    titleAccent: "XAUUSD",
    titleSuffix: "with Precision",
    sub: "Trade gold, silver, platinum, and palladium with tight spreads, flexible leverage, and institutional-grade execution on global metal markets.",
    stats: SHARED_HERO_STATS,
    widget: {
      symbol: "XAUUSD",
      sellPrice: "2,334.50",
      buyPrice: "2,334.72",
      spreadDisplay: "0.22 pts",
      dailyChange: "+0.22%",
      dailyChangePositive: true,
      dayHigh: "2,341.80",
      dayLow: "2,328.40",
      longPercent: 62,
      shortPercent: 38,
      minSpreadNote: "Min Spread: 0.22 pts · 100 oz per lot",
    },
  },
  trending: {
    badge: "Hot topic",
    title: "Precious Metals Trending Now",
    sub: SHARED_TRENDING_SUB,
    items: [
      {
        key: "gold",
        name: "Gold",
        code: "XAU",
        price: "$2,334.50",
        change: "+0.22%",
        positive: true,
        footerIcon: "volume",
        footerText: "Volume: 1.2M",
      },
      {
        key: "silver",
        name: "Silver",
        code: "XAG",
        price: "$27.84",
        change: "+0.15%",
        positive: true,
        footerIcon: "globe",
        footerText: "Global demand",
      },
      {
        key: "platinum",
        name: "Platinum",
        code: "XPT",
        price: "$942.50",
        change: "-0.08%",
        positive: false,
        footerIcon: "volume",
        footerText: "Volume: 420K",
      },
      {
        key: "palladium",
        name: "Palladium",
        code: "XPD",
        price: "$1,024.30",
        change: "+0.12%",
        positive: true,
        footerIcon: "clock",
        footerText: "24h active",
      },
      {
        key: "copper",
        name: "Copper",
        code: "HG",
        price: "$4.284",
        change: "-0.04%",
        positive: false,
        footerIcon: "volume",
        footerText: "Volume: 860K",
      },
      {
        key: "gold-gbp",
        name: "Gold / GBP",
        code: "XAUGBP",
        price: "£1,842.60",
        change: "+0.18%",
        positive: true,
        footerIcon: "globe",
        footerText: "FX-linked",
      },
      {
        key: "gold-eur",
        name: "Gold / EUR",
        code: "XAUEUR",
        price: "$2,158.40",
        change: "+0.20%",
        positive: true,
        footerIcon: "volume",
        footerText: "Volume: 720K",
      },
      {
        key: "silver-eur",
        name: "Silver / EUR",
        code: "XAGEUR",
        price: "$25.74",
        change: "+0.11%",
        positive: true,
        footerIcon: "clock",
        footerText: "24h active",
      },
    ],
    footerStats: SHARED_TRENDING_FOOTER_STATS,
    footerCta: "Start trading",
  },
  overview: {
    eyebrow: "MARKET OVERVIEW",
    title: "All markets at a glance",
    sub: "Compare spreads, leverage, and trading hours across GTCFX market categories.",
    rows: SHARED_MARKET_OVERVIEW_ROWS,
  },
  why: {
    title: "Why trade XAUUSD with GTCFX?",
    sub: SHARED_WHY_SUB,
    features: SHARED_WHY_FEATURES,
    stats: SHARED_WHY_STATS,
    trustLinks: SHARED_TRUST_LINKS,
  },
  promo: METALS_PROMO,
  faq: {
    eyebrow: "FAQ",
    title: "Common Questions about Metals",
    sub: SHARED_FAQ_SUB,
    items: [
      {
        "question": "What spreads do you offer on metals?",
        "answer": "GTCFX offers Gold (XAUUSD) CFD spreads from 0.03 pips — equivalent to approximately 4 cents per ounce. Silver (XAGUSD) spreads are also highly competitive. Spreads are floating and reflect live market conditions. Actual spreads may widen during periods of low liquidity or high volatility."
      },
      {
        "question": "What is a CFD?",
        "answer": "A Contract for Difference (CFD) is a derivative product that allows you to speculate on price movements of financial markets without owning the underlying asset. CFDs can be used to take positions in both rising and falling markets, but losses are possible in either direction."
      },
      {
        "question": "What leverage do you offer on precious metals?",
        "answer": "GTCFX offers leverage on Precious Metal CFDs up to 1:2000 for eligible clients of GTC Global Ltd (FSC Mauritius) and GTC Global Trade Capital Co. (VFSC Vanuatu). Leverage amplifies both potential gains and potential losses — please ensure you understand the risks before trading with leverage."
      }
    ],
  },
  finalCta: {
    eyebrow: "START NOW",
    title: "Ready to Trade XAUUSD?",
    sub: SHARED_FINAL_CTA_SUB,
  },
};

export const CRYPTO = {
  i18nKey: "cryptoCfdsMarketPage",
  slug: "crypto-cfds",
  metaKey: "cryptoCfds",
  path: "markets/crypto-cfds",
  activeTab: "crypto",
  hero: {
    badge: "MARKET",
    titlePrefix: "Trade",
    titleAccent: "BTCUSD",
    titleSuffix: "with Precision",
    sub: "Access leading cryptocurrency CFDs with competitive spreads, 24/7 market access, and institutional-grade execution — no wallet required.",
    stats: SHARED_HERO_STATS,
    widget: {
      symbol: "BTCUSD",
      sellPrice: "67,842.50",
      buyPrice: "67,858.20",
      spreadDisplay: "15.70 pts",
      dailyChange: "+1.24%",
      dailyChangePositive: true,
      dayHigh: "68,940.00",
      dayLow: "66,420.00",
      longPercent: 55,
      shortPercent: 45,
      minSpreadNote: "Min Spread: 15.70 pts · 1 BTC per lot",
    },
  },
  trending: {
    badge: "Hot topic",
    title: "Crypto Markets Trending Now",
    sub: SHARED_TRENDING_SUB,
    items: [
      {
        key: "btc",
        name: "Bitcoin",
        code: "BTC",
        price: "$67,842.50",
        change: "+1.24%",
        positive: true,
        footerIcon: "volume",
        footerText: "Volume: 1.2M",
      },
      {
        key: "eth",
        name: "Ethereum",
        code: "ETH",
        price: "$3,482.40",
        change: "+0.86%",
        positive: true,
        footerIcon: "globe",
        footerText: "Global demand",
      },
      {
        key: "xrp",
        name: "Ripple",
        code: "XRP",
        price: "$0.6242",
        change: "-0.32%",
        positive: false,
        footerIcon: "volume",
        footerText: "Volume: 980K",
      },
      {
        key: "ltc",
        name: "Litecoin",
        code: "LTC",
        price: "$84.28",
        change: "+0.45%",
        positive: true,
        footerIcon: "clock",
        footerText: "24h active",
      },
      {
        key: "ada",
        name: "Cardano",
        code: "ADA",
        price: "$0.4824",
        change: "+0.18%",
        positive: true,
        footerIcon: "volume",
        footerText: "Volume: 640K",
      },
      {
        key: "sol",
        name: "Solana",
        code: "SOL",
        price: "$142.84",
        change: "+1.12%",
        positive: true,
        footerIcon: "globe",
        footerText: "High momentum",
      },
      {
        key: "doge",
        name: "Dogecoin",
        code: "DOGE",
        price: "$0.1428",
        change: "-0.08%",
        positive: false,
        footerIcon: "clock",
        footerText: "24h active",
      },
      {
        key: "bnb",
        name: "BNB",
        code: "BNB",
        price: "$584.20",
        change: "+0.62%",
        positive: true,
        footerIcon: "volume",
        footerText: "Volume: 720K",
      },
    ],
    footerStats: SHARED_TRENDING_FOOTER_STATS,
    footerCta: "Start trading",
  },
  overview: {
    eyebrow: "MARKET OVERVIEW",
    title: "All markets at a glance",
    sub: "Compare spreads, leverage, and trading hours across GTCFX market categories.",
    rows: SHARED_MARKET_OVERVIEW_ROWS,
  },
  why: {
    title: "Why trade BTCUSD with GTCFX?",
    sub: SHARED_WHY_SUB,
    features: SHARED_WHY_FEATURES,
    stats: SHARED_WHY_STATS,
    trustLinks: SHARED_TRUST_LINKS,
  },
  promo: CRYPTO_PROMO,
  faq: {
    eyebrow: "FAQ",
    title: "Common Questions about Crypto CFDs",
    sub: SHARED_FAQ_SUB,
    items: [
      {
        question: "Do I need a crypto wallet to trade?",
        answer:
          "No. Crypto CFDs let you speculate on price movements without owning or storing digital assets. All positions are settled in your account currency.",
      },
      {
        question: "What is a CFD?",
        answer: SHARED_CFD_ANSWER,
      },
      {
        question: "What leverage do you offer?",
        answer:
          "Leverage up to 1:2000 may be available on selected crypto CFDs, subject to account type and regional regulations. Crypto markets are highly volatile — manage risk carefully.",
      },
    ],
  },
  finalCta: {
    eyebrow: "START NOW",
    title: "Ready to Trade BTCUSD?",
    sub: SHARED_FINAL_CTA_SUB,
  },
};

export const FUTURE_CFDS = {
  ...CRYPTO,
  i18nKey: "futureCfdsMarketPage",
  slug: "future-cfds",
  metaKey: "futureCfds",
  path: "markets/future-cfds",
  hero: {
    ...CRYPTO.hero,
    titleAccent: "Future CFDs",
    sub: "Trade leading futures contracts with competitive spreads, flexible leverage, and institutional-grade execution — no physical delivery required.",
    widget: {
      ...CRYPTO.hero.widget,
      symbol: "US500",
      minSpreadNote: "Min Spread: 0.6 pts · 1 contract per lot",
    },
  },
  trending: {
    ...CRYPTO.trending,
    title: "Futures Markets Trending Now",
  },
  why: {
    ...CRYPTO.why,
    title: "Why trade Future CFDs with GTCFX?",
  },
  faq: {
    ...CRYPTO.faq,
    title: "Common Questions about Future CFDs",
  },
  finalCta: {
    ...CRYPTO.finalCta,
    title: "Ready to Trade Future CFDs?",
  },
};

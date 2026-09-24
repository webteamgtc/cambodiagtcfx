import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { FOREX, INDICES } from "../src/app/[locale]/markets/market-shared/marketPageData.js";
import { ENERGY, METALS, CRYPTO } from "../src/app/[locale]/markets/market-shared/assetMarketData.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const enPath = path.join(__dirname, "../src/translation/en.json");

function buildFlatMarketPage(data) {
  const quotes = {};
  for (const [tabKey, rows] of Object.entries(data.quotes ?? {})) {
    quotes[tabKey] = rows.map(({ symbol, name }) => ({ symbol, name }));
  }

  const quoteTabs = {};
  for (const tab of data.quoteTabs ?? []) {
    quoteTabs[tab.key] = tab.label;
  }

  const highlights = (data.highlights ?? []).map(({ label, value }) => ({ label, value }));
  const heroStats = (data.heroStats ?? []).map(({ label, value }) => ({ label, value }));
  const whyStats = (data.whyStats ?? []).map(({ label, value }) => ({ label, value }));

  const features = {};
  for (const f of data.features ?? []) {
    features[f.key] = { title: f.title, description: f.description, link: f.link };
  }

  const whySideBadges = (data.whySideBlock?.badges ?? []).map((b) => b.label);

  const popularInstruments = (data.popularInstruments ?? []).map(({ key, symbol }) => ({
    key,
    symbol,
  }));

  const downloads = {};
  for (const d of data.downloads ?? []) {
    downloads[d.key] = {
      platform: d.platform,
      description: d.description,
      tags: d.tags,
      cta: d.cta,
      footerNote: d.footerNote,
    };
  }

  const awards = (data.awards ?? []).map(({ key, title, source, year }) => ({
    key,
    title,
    source,
    year,
  }));

  return {
    hero: {
      badge: data.badge,
      title: data.heroTitle,
      titleAccent: data.heroTitleAccent,
      sub: data.heroSub,
      stats: heroStats,
    },
    highlights,
    liveQuotes: {
      title: data.quotesTitle,
      sub: data.quotesSub,
      footerLink: data.quotesFooterLink,
      tabs: quoteTabs,
      instruments: quotes,
    },
    whyTrade: {
      title: data.whyTitle,
      sub: data.whySub,
      stats: whyStats,
      features,
      sideBlock: {
        title: data.whySideBlock?.title,
        description: data.whySideBlock?.description,
        badges: whySideBadges,
        cta: data.whySideBlock?.cta,
      },
      statBlock: {
        value: data.whyStatBlock?.value,
        label: data.whyStatBlock?.label,
        lines: data.whyStatBlock?.lines,
      },
    },
    awards,
    popular: {
      title: data.popularTitle,
      sub: data.popularSub,
      instruments: popularInstruments,
    },
    downloads,
  };
}

function buildAssetMarketPage(data) {
  const trendingItems = (data.trending?.items ?? []).map(
    ({ key, name, code, footerText }) => ({ key, name, code, footerText })
  );
  const trendingFooterStats = (data.trending?.footerStats ?? []).map((s) => s.text);
  const overviewRows = (data.overview?.rows ?? []).map(({ key, market }) => ({ key, market }));
  const whyFeatures = {};
  for (const f of data.why?.features ?? []) {
    whyFeatures[f.key] = { title: f.title, description: f.description, badge: f.badge };
  }
  const whyStats = (data.why?.stats ?? []).map(({ label, value }) => ({ label, value }));
  const trustLinks = (data.why?.trustLinks ?? []).map((l) => l.label);
  const faqItems = (data.faq?.items ?? []).map(({ question, answer }) => ({ question, answer }));

  return {
    hero: {
      badge: data.hero?.badge,
      titlePrefix: data.hero?.titlePrefix,
      titleAccent: data.hero?.titleAccent,
      titleSuffix: data.hero?.titleSuffix,
      sub: data.hero?.sub,
      stats: (data.hero?.stats ?? []).map(({ label, value }) => ({ label, value })),
      widget: {
        symbol: data.hero?.widget?.symbol,
        minSpreadNote: data.hero?.widget?.minSpreadNote,
      },
    },
    trending: {
      badge: data.trending?.badge,
      title: data.trending?.title,
      sub: data.trending?.sub,
      items: trendingItems,
      footerStats: trendingFooterStats,
      footerCta: data.trending?.footerCta,
    },
    overview: {
      eyebrow: data.overview?.eyebrow,
      title: data.overview?.title,
      sub: data.overview?.sub,
      rows: overviewRows,
    },
    why: {
      title: data.why?.title,
      sub: data.why?.sub,
      features: whyFeatures,
      stats: whyStats,
      trustLinks,
    },
    promo: {
      text: data.promo?.text,
      highlights: data.promo?.highlights,
    },
    faq: {
      eyebrow: data.faq?.eyebrow,
      title: data.faq?.title,
      sub: data.faq?.sub,
      items: faqItems,
    },
    finalCta: {
      eyebrow: data.finalCta?.eyebrow,
      title: data.finalCta?.title,
      sub: data.finalCta?.sub,
    },
  };
}

const marketsShared = {
  heroCtas: {
    openLiveAccount: "Open Live Account",
    openDemoAccount: "Open Demo Account",
    startTradingNow: "Start Trading Now",
    freeDemoAccount: "Free Demo Account",
    openFreeAccount: "Open Free Account",
    noAccountYet: "No account yet?",
  },
  liveQuotesTable: {
    instrument: "INSTRUMENT",
    sell: "SELL",
    buy: "BUY",
    spread: "SPREAD",
    dailyChange: "DAILY CHANGE",
    action: "ACTION",
    tradeCta: "Trade",
  },
  awardsSection: {
    title: "Recognized Excellence",
    sub: "GTCFX is honored by leading financial institutions worldwide for trading excellence and client service.",
    viewAll: "View all awards",
  },
  downloadSection: {
    title: "Download Trading Platforms",
    sub: "Trade on desktop, web, or mobile with industry-leading platforms synced to your GTCFX account.",
    newBadge: "New",
    ios: "iOS",
    android: "Android",
  },
  popularDetail: {
    bidBuy: "Bid (Buy)",
    askSell: "Ask (Sell)",
    liveData: "Live Data",
    dayRange: "Day Range",
    spread: "Spread",
    week52Range: "52W Range",
    prevClose: "Prev Close",
    volume: "Volume",
  },
  finalCta: {
    heading: "Didn't find what you were looking for?",
    sub: "Access real-time prices, ultra-low spreads, and 1:2000 leverage — all in one platform.",
    startTrading: "Start Trading Now",
    noAccount: "No account yet?",
    openFreeAccount: "Open Free Account",
    tryDemo: "Try Demo Account",
  },
  assetWidget: {
    live: "Live",
    sell: "Sell",
    buy: "Buy",
    sellNow: "Sell Now",
    buyNow: "Buy Now",
    spread: "Spread",
    dailyChange: "Daily Change",
    dayHigh: "Day High",
    dayLow: "Day Low",
    marketSentiment: "Market Sentiment",
    long: "Long",
    short: "Short",
  },
  overviewTable: {
    market: "MARKET",
    instruments: "INSTRUMENTS",
    spreadFrom: "SPREAD FROM",
    maxLeverage: "MAX LEVERAGE",
    tradingHours: "TRADING HOURS",
    mostPopular: "Most Popular",
  },
};

const sharesOverrides = {
  hero: {
    title: "Trade Shares",
    titleAccent: "Global Stocks",
    sub: "Access leading global companies with competitive spreads, flexible leverage, and real-time pricing on major stock CFDs.",
    stats: [
      { value: "500+", label: "Share CFDs" },
      { value: "0.0", label: "Spreads from" },
      { value: "1:20", label: "Leverage" },
      { value: "24/7", label: "Support" },
    ],
  },
  liveQuotes: {
    title: "Live Share Quotes",
    sub: "Real-time bid/ask prices on major global stocks — updated continuously during market hours.",
    footerLink: "View All 500+ Shares →",
  },
  whyTrade: {
    title: "Why Trade Share CFDs with GTCFX?",
    sub: "Gain exposure to global equities without owning the underlying shares — trade long or short with flexible leverage and transparent pricing.",
  },
  popular: {
    title: "Popular Shares",
    sub: "Click any share to view live charts & detailed pricing",
  },
};

const futureCfdsOverrides = {
  hero: {
    titleAccent: "Future CFDs",
    sub: "Trade leading futures contracts with competitive spreads, flexible leverage, and institutional-grade execution — no physical delivery required.",
    widget: {
      symbol: "US500",
      minSpreadNote: "Min Spread: 0.6 pts · 1 contract per lot",
    },
  },
  trending: {
    title: "Futures Markets Trending Now",
  },
  why: {
    title: "Why trade Future CFDs with GTCFX?",
  },
  faq: {
    title: "Common Questions about Future CFDs",
  },
  finalCta: {
    title: "Ready to Trade Future CFDs?",
  },
};

function deepMerge(base, override) {
  if (!override) return base;
  const out = { ...base };
  for (const key of Object.keys(override)) {
    const b = base[key];
    const o = override[key];
    out[key] =
      b && o && typeof b === "object" && !Array.isArray(b) && typeof o === "object" && !Array.isArray(o)
        ? deepMerge(b, o)
        : o ?? b;
  }
  return out;
}

const marketPages = {
  marketsShared,
  forexMarketPage: buildFlatMarketPage(FOREX),
  indicesMarketPage: buildFlatMarketPage(INDICES),
  sharesMarketPage: deepMerge(buildFlatMarketPage(FOREX), sharesOverrides),
  energyMarketPage: buildAssetMarketPage(ENERGY),
  metalsMarketPage: buildAssetMarketPage(METALS),
  cryptoCfdsMarketPage: buildAssetMarketPage(CRYPTO),
  futureCfdsMarketPage: deepMerge(buildAssetMarketPage(CRYPTO), futureCfdsOverrides),
};

const en = JSON.parse(fs.readFileSync(enPath, "utf8"));
Object.assign(en, marketPages);
fs.writeFileSync(enPath, JSON.stringify(en, null, 2) + "\n");
console.log("Added market page translations to en.json");

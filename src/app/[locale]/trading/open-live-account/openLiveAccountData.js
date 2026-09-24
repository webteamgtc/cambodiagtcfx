import { GTC_GO_APP_DOWNLOAD_HREF } from "@/lib/gtcGoAppLinks";

export const REGISTER_HREF =
  "/live-account-application";

export const HERO_PILLS = [
  { key: "regulated" },
  { key: "spreads" },
  { key: "leverage" },
  { key: "execution" },
];

export const HERO_TRUST_ITEMS = [
  { key: "multiRegulated", icon: "building" },
  { key: "segregatedFunds", icon: "lock" },
  { key: "fastExecution", icon: "bolt" },
  { key: "support", icon: "support" },
];

export const REGULATION_CARDS = [
  {
    key: "regulatedOperations",
    title: "Regulated Operations",
    description:
      "Licensed and supervised by recognized financial authorities across multiple jurisdictions.",
    icon: "operations",
  },
  {
    key: "fundSecurity",
    title: "Fund Security",
    description:
      "Client funds fully segregated from corporate accounts, held with tier-1 banking partners.",
    icon: "shield",
  },
  {
    key: "industryRecognition",
    title: "Industry Recognition",
    description:
      "Recipient of multiple international awards for execution quality, transparency, and service.",
    icon: "award",
  },
  {
    key: "globalCoverage",
    title: "Global Coverage",
    description:
      "Serving traders across 90+ countries with localized support and infrastructure.",
    icon: "globe",
  },
];

export const REGULATORS = [
  { code: "DFSA", region: "UAE" },
  { code: "FSC", region: "Mauritius" },
  { code: "VFSC", region: "Vanuatu" },
  { code: "FSA", region: "Seychelles" },
  { code: "SCB", region: "Bahamas" },
];

export const ACCOUNT_SPEC_KEYS = ["spreads", "commission", "maxLeverage", "platforms"];

export const ACCOUNT_TYPES = [
  {
    key: "standard",
    name: "Standard",
    subtitle: "Most clients · everyday trading",
    minDeposit: "$0",
    featured: true,
    badge: "Recommended",
    icon: "standard",
    cta: "Open now",
    swapFreeAvailable: true,
    specs: {
      spreads: "1.0 pips",
      commission: "None",
      maxLeverage: "1:2000",
      platforms: "MT4 / MT5",
    },
  },
  {
    key: "ecn",
    name: "ECN",
    subtitle: "Active traders · scalpers · EAs",
    minDeposit: "$3000",
    featured: false,
    icon: "ecn",
    cta: "Open now",
    swapFreeAvailable: false,
    specs: {
      spreads: "0.0 pips",
      commission: "$5 / lot",
      maxLeverage: "1:500",
      platforms: "MT4 / MT5",
    },
  },
];

export const STEPS_BG_SRC = "/new-design/Trading/OPEN.svg";

export const STEPS = [
  {
    key: "basic-info",
    step: "01",
    title: "Basic information",
    description:
      "Name, email, phone. We'll verify your details and create your secure trading profile.",
    footerLabel: "Review time",
    footerValue: "< 2 min",
  },
  {
    key: "kyc",
    step: "02",
    title: "Verify identity (KYC)",
    description:
      "Upload ID and proof of address. We review and approve most accounts in under 24 hours.",
    footerLabel: "Review time",
    footerValue: "~24 hours",
    className:"mt-[-20px]"
  },
  {
    key: "deposit",
    step: "03",
    title: "Deposit & trade",
    description:
      "Fund your account with 10+ payment methods. Start trading the moment funds arrive.",
    footerLabel: "Review time",
    footerValue: "$100",
  },
];

export const PLATFORMS = [
  {
    key: "gtcGo",
    name: "GTC Go",
    description:
      "Our flagship native mobile app. Built ground-up for the modern trader.",
    href: GTC_GO_APP_DOWNLOAD_HREF,
    external: true,
    icon: "mobile",
    tags: ["iOS", "Android", "Biometric", "Push alerts"],
    featured: true,
  },
  {
    key: "mt5",
    name: "MT5",
    description: "Next-gen multi-asset platform with advanced tools.",
    href: "/trading/mt5-platform",
    icon: "laptop",
    tags: ["38 indicators", "EA support", "Multi-asset"],
    featured: false,
  },
  {
    key: "mt4",
    name: "MT4",
    description: "The classic FX platform. Reliable, fast, familiar.",
    href: "/trading/mt4-platform",
    icon: "laptop",
    tags: ["30 indicators", "Stable", "Time-tested"],
    featured: false,
  },
  {
    key: "webtrader",
    name: "WebTrader",
    description: "No downloads. Trade directly from your browser.",
    href: "/live-account-application",
    external: true,
    icon: "web",
    tags: ["Browser", "Zero install", "Cross-OS"],
    featured: false,
  },
];

export const FEATURE_GRID = [
  {
    key: "spreads",
    title: "Ultra-low spreads",
    description:
      "EURUSD spreads compressed to institutional levels on ECN accounts.",
    icon: "spreads",
    stat: { value: "0.0", suffix: "pips from" },
  },
  {
    key: "execution",
    title: "Lightning execution",
    description:
      "Server-side architecture optimized for sub-10ms order fulfillment.",
    icon: "execution",
    stat: { value: "<10", suffix: "ms avg" },
  },
  {
    key: "liquidity",
    title: "Deep liquidity",
    description:
      "Direct connections to tier-1 liquidity providers — no requotes, ever.",
    icon: "liquidity",
    showChart: true,
  },
  {
    key: "deposits",
    title: "Flexible deposits",
    description:
      "10+ payment methods. Instant credit. Zero fees on most channels.",
    icon: "deposits",
  },
];

export const FEATURE_SUPPORT = {
  key: "support",
  title: "24/7 English and Khmer support",
  description:
    "Real human support — wherever you are, whenever markets are open.",
  icon: "support",
  languages: ["English", "ភាសាខ្មែរ"],
};

export const FEATURE_TICKER = [
  "Fast execution",
  "No re-quotes",
  "Negative balance protection",
  "24/7 support",
  "Instant deposits",
];

export const FEATURE_LIST = [
  {
    key: "calculator",
    title: "Trading Calculator",
    description:
      "Estimate spreads, margin requirements, and potential profit/loss before you trade.",
    href: "/company/dynamic-leverage",
    cta: "Open calculator",
    icon: "calculator",
  },
  {
    key: "calendar",
    title: "Economic Calendar",
    description:
      "Track every market-moving release. Filtered by impact, region, and currency.",
    href: "/markets/economic-calendar",
    cta: "View calendar",
    icon: "calendar",
  },
  {
    key: "vps",
    title: "Free VPS",
    description:
      "Eligible accounts get free VPS hosting — ideal for running EAs 24/7 with low latency.",
    href: "/trading/vps-hosting-services",
    cta: "Check eligibility",
    icon: "vps",
  },
  {
    key: "analysis",
    title: "Market Analysis",
    description:
      "Daily commentary from GTCFX analysts. Setups, levels, and macro context.",
    href: "/markets",
    cta: "Read latest",
    icon: "analysis",
  },
  {
    key: "academy",
    title: "Trading Academy",
    description:
      "Structured curriculum from zero to advanced. Video, articles, and live sessions.",
    href: "/gtc-news/knowledge-to-learn",
    cta: "Start learning",
    icon: "academy",
  },
  {
    key: "gtcGo",
    title: "GTC Go App",
    description:
      "Trade, deposit, withdraw, and monitor your account — all from your phone.",
    href: "/trading/gtc-go-app",
    cta: "Download app",
    icon: "mobile",
  },
];

export const PAYMENT_METHODS = [
  { key: "fasapay", name: "FasaPay", letter: "F" },
  { key: "bankWire", name: "Bank Wire", letter: "B" },
  { key: "skrill", name: "Skrill", letter: "S" },
  { key: "perfectMoney", name: "PerfectMoney", letter: "P" },
  { key: "visa", name: "Visa", letter: "V" },
  { key: "neteller", name: "Neteller", letter: "N" },
];

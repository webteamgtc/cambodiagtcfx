export const REGISTER_HREF =
  "/live-account-application";

export const HERO_BULLETS = [
  "Real-time spread display, no hidden markup",
  "Overnight interest updated daily, tracked to market rates",
  "No requotes — what you see is what you get",
];

export const LIVE_COST_DASHBOARD = {
  avgSpread: {
    value: "0.8",
    unit: "pips",
    benchmark: "EURUSD benchmark",
    comparison: "↓ 33% vs industry avg",
  },
  instruments: [
    {
      symbol: "EURUSD",
      category: "FX Major",
      spread: "0.8",
      spreadUnit: "pips spread",
      longSwap: "+$1.20",
      shortSwap: "-$2.80",
    },
    {
      symbol: "XAUUSD",
      category: "Gold Spot",
      spread: "18",
      spreadUnit: "pts spread",
      longSwap: "+$5.20",
      shortSwap: "-$8.10",
    },
  ],
};

export const HERO_INSTRUMENT_TABS = ["FX", "Indices", "Metals", "Crypto"];

export const HERO_INSTRUMENTS = {
  FX: {
    symbol: "EURUSD",
    spread: "0.8",
    commission: "$0",
    buy: "1.08244",
    sell: "1.08252",
    totalCost: "0.8 pips",
  },
  Indices: {
    symbol: "US500",
    spread: "0.4",
    commission: "$0",
    buy: "5,284.20",
    sell: "5,284.60",
    totalCost: "0.4 pts",
  },
  Metals: {
    symbol: "XAUUSD",
    spread: "0.20",
    commission: "$0",
    buy: "2,334.50",
    sell: "2,334.70",
    totalCost: "0.20",
  },
  Crypto: {
    symbol: "BTCUSD",
    spread: "12.0",
    commission: "$0",
    buy: "67,842.00",
    sell: "67,854.00",
    totalCost: "12.0",
  },
};

export const CALCULATOR_INSTRUMENTS = [
  { value: "EURUSD", label: "EURUSD" },
  { value: "GBPUSD", label: "GBPUSD" },
  { value: "USDJPY", label: "USDJPY" },
  { value: "XAUUSD", label: "XAUUSD (Gold)" },
  { value: "US500", label: "US500 (S&P 500)" },
];

export const CALCULATOR_ACCOUNTS = [
  { value: "standard", label: "Standard Account" },
  { value: "ecn", label: "ECN Account" },
  { value: "vip", label: "VIP Account" },
];

export const HOLDING_PERIODS = [
  { value: "1", label: "1 day" },
  { value: "3", label: "3 days" },
  { value: "7", label: "7 days" },
  { value: "30", label: "30 days" },
];

export const SWAP_RATES_BY_INSTRUMENT = {
  EURUSD: { long: -5.42, short: 2.15 },
  GBPUSD: { long: -4.88, short: 1.92 },
  USDJPY: { long: 3.21, short: -6.14 },
  XAUUSD: { long: -8.35, short: 3.48 },
  US500: { long: -2.10, short: -1.85 },
};

export const STATS_BAR = [
  { value: "0.0", title: "Forex Spread from (pips)", label: "Raw ECN accounts" },
  { value: "Daily", title: "Overnight Fee Updates", label: "Refreshed every trading day" },
  { value: "3x", title: "Wednesday Triple Swap", label: "Covers weekend settlement" },
];

export const SPREAD_TABS = [
  { key: "forex", label: "Forex" },
  { key: "indices", label: "Indices" },
  { key: "commodities", label: "Commodities" },
];

export const SPREADS_DATA = [
  {
    symbol: "EURUSD",
    name: "Euro / US Dollar",
    category: "forex",
    minSpread: "0.8",
    avgSpread: "1.0",
    type: "Floating",
  },
  {
    symbol: "GBPUSD",
    name: "British Pound / US Dollar",
    category: "forex",
    minSpread: "1.0",
    avgSpread: "1.3",
    type: "Floating",
  },
  {
    symbol: "USDJPY",
    name: "US Dollar / Japanese Yen",
    category: "forex",
    minSpread: "0.9",
    avgSpread: "1.1",
    type: "Floating",
  },
  {
    symbol: "AUDUSD",
    name: "Australian Dollar / US Dollar",
    category: "forex",
    minSpread: "1.0",
    avgSpread: "1.4",
    type: "Floating",
  },
  {
    symbol: "USDCAD",
    name: "US Dollar / Canadian Dollar",
    category: "forex",
    minSpread: "1.2",
    avgSpread: "1.5",
    type: "Floating",
  },
  {
    symbol: "USDCHF",
    name: "US Dollar / Swiss Franc",
    category: "forex",
    minSpread: "1.1",
    avgSpread: "1.4",
    type: "Floating",
  },
  {
    symbol: "NZDUSD",
    name: "New Zealand Dollar / US Dollar",
    category: "forex",
    minSpread: "1.3",
    avgSpread: "1.6",
    type: "Floating",
  },
  {
    symbol: "EURGBP",
    name: "Euro / British Pound",
    category: "forex",
    minSpread: "1.0",
    avgSpread: "1.2",
    type: "Floating",
  },
  {
    symbol: "US500",
    name: "US 500 Index",
    category: "indices",
    minSpread: "0.4",
    avgSpread: "0.6",
    type: "Floating",
  },
  {
    symbol: "GER40",
    name: "Germany 40 Index",
    category: "indices",
    minSpread: "1.0",
    avgSpread: "1.3",
    type: "Floating",
  },
  {
    symbol: "XAUUSD",
    name: "Gold Spot",
    category: "commodities",
    minSpread: "0.20",
    avgSpread: "0.30",
    type: "Floating",
  },
  {
    symbol: "USOIL",
    name: "WTI Crude Oil",
    category: "commodities",
    minSpread: "0.8",
    avgSpread: "1.1",
    type: "Floating",
  },
  {
    symbol: "BTCUSD",
    name: "Bitcoin / US Dollar",
    category: "crypto",
    minSpread: "12.0",
    avgSpread: "18.0",
    type: "Floating",
  },
];

export const SWAP_TABS = [
  { key: "forex", label: "Forex" },
  { key: "indices", label: "Indices" },
  { key: "commodities", label: "Commodities" },
];

export const SWAP_RATES_DATA = [
  {
    symbol: "EURUSD",
    name: "Euro / US Dollar",
    category: "forex",
    longSwap: "-$3.20",
    shortSwap: "+$1.10",
    unit: "Per Lot",
  },
  {
    symbol: "GBPUSD",
    name: "British Pound / US Dollar",
    category: "forex",
    longSwap: "-$4.50",
    shortSwap: "+$1.30",
    unit: "Per Lot",
  },
  {
    symbol: "USDJPY",
    name: "US Dollar / Japanese Yen",
    category: "forex",
    longSwap: "-$2.80",
    shortSwap: "-$4.20",
    unit: "Per Lot",
  },
  {
    symbol: "AUDUSD",
    name: "Australian Dollar / US Dollar",
    category: "forex",
    longSwap: "-$3.10",
    shortSwap: "+$0.95",
    unit: "Per Lot",
  },
  {
    symbol: "USDCAD",
    name: "US Dollar / Canadian Dollar",
    category: "forex",
    longSwap: "+$0.85",
    shortSwap: "-$3.90",
    unit: "Per Lot",
  },
  {
    symbol: "USDCHF",
    name: "US Dollar / Swiss Franc",
    category: "forex",
    longSwap: "-$3.60",
    shortSwap: "+$1.05",
    unit: "Per Lot",
  },
  {
    symbol: "NZDUSD",
    name: "New Zealand Dollar / US Dollar",
    category: "forex",
    longSwap: "-$3.80",
    shortSwap: "+$1.15",
    unit: "Per Lot",
  },
  {
    symbol: "EURGBP",
    name: "Euro / British Pound",
    category: "forex",
    longSwap: "-$2.40",
    shortSwap: "+$0.85",
    unit: "Per Lot",
  },
  {
    symbol: "US500",
    name: "US 500 Index",
    category: "indices",
    longSwap: "-$2.10",
    shortSwap: "-$1.85",
    unit: "Per Lot",
  },
  {
    symbol: "US30",
    name: "US Wall Street 30",
    category: "indices",
    longSwap: "-$3.25",
    shortSwap: "-$2.90",
    unit: "Per Lot",
  },
  {
    symbol: "UK100",
    name: "UK 100 Index",
    category: "indices",
    longSwap: "-$1.75",
    shortSwap: "-$1.42",
    unit: "Per Lot",
  },
  {
    symbol: "GER40",
    name: "Germany 40 Index",
    category: "indices",
    longSwap: "-$2.05",
    shortSwap: "-$1.68",
    unit: "Per Lot",
  },
  {
    symbol: "XAUUSD",
    name: "Gold Spot",
    category: "commodities",
    longSwap: "-$8.35",
    shortSwap: "+$3.48",
    unit: "Per Lot",
  },
  {
    symbol: "XAGUSD",
    name: "Silver Spot",
    category: "commodities",
    longSwap: "-$2.15",
    shortSwap: "+$0.92",
    unit: "Per Lot",
  },
  {
    symbol: "USOIL",
    name: "WTI Crude Oil",
    category: "commodities",
    longSwap: "-$1.85",
    shortSwap: "-$0.65",
    unit: "Per Lot",
  },
  {
    symbol: "BTCUSD",
    name: "Bitcoin / US Dollar",
    category: "crypto",
    longSwap: "-$12.40",
    shortSwap: "-$9.80",
    unit: "Per Lot",
  },
  {
    symbol: "ETHUSD",
    name: "Ethereum / US Dollar",
    category: "crypto",
    longSwap: "-$6.20",
    shortSwap: "-$4.90",
    unit: "Per Lot",
  },
];

export const FAQ_ITEMS = [
  {
    question: "Is swap charged every day?",
    answer:
      "Yes. Swap is charged daily for every overnight position. If you close before the market rollover (usually 5 PM New York time), no swap is applied for that day.",
  },
  {
    question: "When are swap rates applied?",
    answer:
      "Swap rates are applied daily at the platform rollover time (typically 00:00 server time). Positions held open through this time will incur or earn the applicable swap charge.",
  },
  {
    question: "How often are swap rates updated?",
    answer:
      "GTCFX publishes updated swap rates daily. Rates may change based on market conditions, central bank policies, and liquidity provider pricing.",
  },
  {
    question: "Are swap rates the same for all account types?",
    answer:
      "Swap rates may vary slightly between account types and instruments. Check your trading terminal or this page for the most current rates applicable to your account.",
  },
  {
    question: "Do you offer swap-free accounts?",
    answer:
      "Yes. GTCFX offers swap-free trading on selected instruments for eligible clients. Visit our Swap-Free Trading page for full details and eligibility requirements.",
  },
];

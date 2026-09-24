import { formatDisplaySymbol } from "@/lib/symbols/gtcTraderSymbolsApi";

export const MARKET_CATEGORIES = {
  forex: {
    slug: "forex",
    label: "FOREX",
    displayLabel: "Forex",
    path: "markets/forex",
    tags: ["Most Liquid", "Tight Spreads", "24H Volatile"],
  },
  energy: {
    slug: "energy",
    label: "ENERGY",
    displayLabel: "Energy",
    path: "markets/energy",
    tags: ["High Volatility", "Global Demand", "24H Markets"],
  },
  metals: {
    slug: "metals",
    label: "METALS",
    displayLabel: "Metals",
    path: "markets/metals",
    tags: ["Safe Haven", "Tight Spreads", "High Liquidity"],
  },
  indices: {
    slug: "indices",
    label: "INDICES",
    displayLabel: "Indices",
    path: "markets/indices",
    tags: ["Global Markets", "Diversified", "High Leverage"],
  },
  shares: {
    slug: "shares",
    label: "SHARES",
    displayLabel: "Shares",
    path: "markets/shares",
    tags: ["Equity CFDs", "Global Stocks", "Flexible Lots"],
  },
  commodities: {
    slug: "commodities",
    label: "COMMODITIES",
    displayLabel: "Commodities",
    path: "markets/commodities",
    tags: ["Real Assets", "Diversified", "Global Demand"],
  },
  "crypto-cfds": {
    slug: "crypto-cfds",
    label: "CRYPTO CFDs",
    displayLabel: "Crypto CFDs",
    path: "markets/crypto-cfds",
    tags: ["24/7 Trading", "High Volatility", "Digital Assets"],
  },
  "future-cfds": {
    slug: "future-cfds",
    label: "FUTURE CFDs",
    displayLabel: "Future CFDs",
    path: "markets/future-cfds",
    tags: ["Futures Access", "Flexible Leverage", "Global Markets"],
  },
};

/** Normalize URL slug → API symbol (EURUSD). */
export function slugToRawSymbol(slug = "") {
  return String(slug || "")
    .trim()
    .toUpperCase()
    .replace(/[-_/]/g, "");
}

/** Prefer readable URL slug (eurusd). */
export function rawSymbolToSlug(symbol = "") {
  return String(symbol || "")
    .replace(/\//g, "")
    .toLowerCase();
}

export function getCategoryConfig(category) {
  return MARKET_CATEGORIES[category] || MARKET_CATEGORIES.forex;
}

export function isValidMarketCategory(category) {
  return Boolean(MARKET_CATEGORIES[category]);
}


/** Map GTC Trader API type labels (e.g. "FX Minors") → URL category slug. */
export function marketCategoryFromApiType(typeName = "") {
  const name = String(typeName).trim().toLowerCase();
  if (!name) return "forex";
  if (name.includes("fx") || name.includes("forex")) return "forex";
  if (name.includes("energy")) return "energy";
  if (name.includes("metal") || name.includes("gold") || name.includes("silver")) {
    return "metals";
  }
  if (name.includes("index")) return "indices";
  if (name.includes("stock") || name.includes("share") || name.includes("equity")) {
    return "shares";
  }
  if (name.includes("future")) return "future-cfds";
  if (name.includes("crypto")) return "crypto-cfds";
  if (name.includes("commodit")) return "commodities";
  return "forex";
}

export function getDisplaySymbol(rawSymbol, info) {
  if (info?.description && /^[A-Z]{6}$/.test(rawSymbol)) {
    return formatDisplaySymbol(rawSymbol);
  }
  return formatDisplaySymbol(rawSymbol) || rawSymbol;
}

const TRIPLE_SWAP_DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function getTripleSwapDay(swapMultip = []) {
  if (!Array.isArray(swapMultip)) return "Wednesday";
  const idx = swapMultip.findIndex((v) => Number(v) >= 3);
  return idx >= 0 ? TRIPLE_SWAP_DAYS[idx] : "Wednesday";
}

export function formatPipValue(digits) {
  const d = Number(digits);
  if (!Number.isFinite(d) || d <= 0) return "—";
  return (1 / 10 ** d).toFixed(d);
}

export function formatLeverage(leverage) {
  const n = Number(leverage);
  if (!Number.isFinite(n) || n <= 0) return "—";
  return `1:${n}`;
}

export function formatSwap(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return "—";
  const sign = n > 0 ? "+" : "";
  return `${sign}${n.toFixed(2)}`;
}

export function buildAboutCopy(displaySymbol, info, categoryConfig) {
  const description = info?.description?.trim() || displaySymbol;
  const group = info?.group_name || categoryConfig.displayLabel;

  return {
    title: `About ${displaySymbol}`,
    body: `${displaySymbol} (${description}) is available as a CFD instrument in the ${group} market on GTCFX. Trade with competitive spreads, flexible leverage, and fast execution across MT4, MT5, and the GTC Go app.`,
    tags: categoryConfig.tags || [],
  };
}

export function buildSpecsFromInfo(info = {}) {
  const digits = Number(info.digits);
  const currency = info.currency_base || info.currency || "";
  const contractSize = info.contract_size
    ? `${Number(info.contract_size).toLocaleString()}${currency ? ` ${currency}` : ""}`
    : "—";

  return [
    { label: "Contract size", value: contractSize },
    { label: "Min. Lot", value: info.min_volume != null ? String(info.min_volume) : "—" },
    { label: "Pip Value", value: formatPipValue(digits) },
    {
      label: "Value Per Pip",
      value: info.tick_value_usd ? `$${Number(info.tick_value_usd).toFixed(2)}` : "—",
    },
    { label: "Leverage", value: formatLeverage(info.leverage) },
    {
      label: "Margin Rate",
      value:
        info.leverage && Number(info.leverage) > 0
          ? `${((1 / Number(info.leverage)) * 100).toFixed(2)}%`
          : "—",
    },
    { label: "Triple Swap Day", value: getTripleSwapDay(info.swap_multip) },
    { label: "Trading Hours", value: "24/5" },
  ];
}

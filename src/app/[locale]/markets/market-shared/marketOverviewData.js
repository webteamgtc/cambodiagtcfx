/**
 * Canonical “All markets at a glance” table — aligned with market pages,
 * Markets hub copy, and Tier 1 leverage from the official S3 schedule.
 */
export const MARKET_OVERVIEW_ROWS = [
  {
    key: "forex",
    market: "Forex",
    icon: "/new-design/Markets/icon1.svg",
    instruments: "70+",
    spreadFrom: "0.0 pips",
    maxLeverage: "1:2000",
    tradingHours: "Near 24h",
    mostPopular: true,
  },
  {
    key: "energy",
    market: "Energy",
    icon: "/new-design/Markets/icon2.svg",
    instruments: "6+",
    spreadFrom: "0.03 pips",
    maxLeverage: "1:1000",
    tradingHours: "Mon–Fri ~23h",
  },
  {
    key: "indices",
    market: "Indices",
    icon: "/new-design/Markets/icon3.svg",
    instruments: "81+",
    spreadFrom: "0.4 pips",
    maxLeverage: "1:125",
    tradingHours: "Near 24h",
  },
  {
    key: "metals",
    market: "Metals",
    icon: "/new-design/Markets/icon4.svg",
    instruments: "6+",
    spreadFrom: "0.22 pips",
    maxLeverage: "1:2000",
    tradingHours: "Near 24h",
  },
  {
    key: "commodities",
    market: "Commodities",
    icon: "/new-design/Markets/icon5.svg",
    instruments: "40+",
    spreadFrom: "0.03 pips",
    maxLeverage: "1:2000",
    tradingHours: "Near 24h",
  },
];

/** Merge page/i18n partial rows onto canonical overview data by key. */
export function resolveMarketOverviewRows(rows = MARKET_OVERVIEW_ROWS) {
  const canonicalByKey = Object.fromEntries(
    MARKET_OVERVIEW_ROWS.map((row) => [row.key, row])
  );

  return (rows.length ? rows : MARKET_OVERVIEW_ROWS).map((row) => ({
    ...canonicalByKey[row.key],
    ...row,
  }));
}

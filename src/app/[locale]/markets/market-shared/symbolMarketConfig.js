/** Live quotes copy for asset market pages. */
export const ASSET_MARKET_QUOTES_META = {
  energy: {
    quotesTitle: "Live Energy Quotes",
    quotesSub:
      "Explore energy instruments available on GTCFX — crude oil, natural gas, and related products.",
    quotesFooterLink: "View all energy symbols →",
  },
  metals: {
    quotesTitle: "Live Metals Quotes",
    quotesSub:
      "Explore precious and industrial metals available on GTCFX — gold, silver, platinum, and more.",
    quotesFooterLink: "View all metal symbols →",
  },
  "future-cfds": {
    quotesTitle: "Live Future CFD Quotes",
    quotesSub:
      "Explore futures-based CFD instruments available on GTCFX with flexible market access.",
    quotesFooterLink: "View all future symbols →",
  },
};

export function mergeAssetMarketQuotesData(data) {
  const meta = ASSET_MARKET_QUOTES_META[data?.slug];
  if (!meta) return data;
  return { ...data, ...meta };
}

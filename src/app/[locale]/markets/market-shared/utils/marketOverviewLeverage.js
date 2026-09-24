/** Maps overview table row keys to official leverage schedule categories (S3 JSON). */
export const OVERVIEW_LEVERAGE_CATEGORIES = {
  forex: ["Forex"],
  energy: ["Energies"],
  indices: ["Cash Index", "Future Index"],
  metals: ["Metals"],
  commodities: ["Metals", "Energies"],
};

export function parseLeverageRatio(value = "") {
  const match = String(value).match(/1\s*:\s*(\d+)/i);
  return match ? Number(match[1]) : 0;
}

export function formatLeverageRatio(ratio) {
  if (!ratio || !Number.isFinite(ratio)) return null;
  return `1:${ratio}`;
}

/** Highest Tier 1 (row index 1) leverage across the given schedule categories. */
export function getMaxTierOneLeverage(data, categories = []) {
  if (!data || !categories.length) return null;

  let maxRatio = 0;

  for (const category of categories) {
    const sections = data[category];
    if (!Array.isArray(sections)) continue;

    for (const section of sections) {
      const tierOne = section?.data?.[1];
      const ratio = parseLeverageRatio(tierOne?.Column6);
      if (ratio > maxRatio) maxRatio = ratio;
    }
  }

  return formatLeverageRatio(maxRatio);
}

export function resolveOverviewRowLeverage(data, rowKey, fallback = "—") {
  const categories = OVERVIEW_LEVERAGE_CATEGORIES[rowKey];
  if (!categories) return fallback;

  return getMaxTierOneLeverage(data, categories) ?? fallback;
}

export function mergeOverviewRowsWithLeverage(rows = [], leverageData) {
  if (!leverageData) return rows;

  return rows.map((row) => ({
    ...row,
    maxLeverage: resolveOverviewRowLeverage(leverageData, row.key, row.maxLeverage),
  }));
}

import rawSwapTable from "./swapUpdateTableData.json";

export const SWAP_TABLE_TABS = [
  { key: "forex", label: "Forex" },
  { key: "metal", label: "Metal" },
  { key: "crypto", label: "Crypto" },
  { key: "indices", label: "Indices" },
];

const CATEGORY_KEY_MAP = {
  forex: "Forex",
  metal: "Metal",
  crypto: "Crypto",
  indices: "Indices",
};

function normalizeRow(row) {
  return {
    symbol: row.symbol,
    swapType: row["swap type"],
    swapLong: row["swap long"],
    swapShort: row["swap short"],
  };
}

export function getSwapTableRows(category) {
  const dataKey = CATEGORY_KEY_MAP[category];
  const rows = dataKey ? rawSwapTable[dataKey] : [];
  return Array.isArray(rows) ? rows.map(normalizeRow) : [];
}

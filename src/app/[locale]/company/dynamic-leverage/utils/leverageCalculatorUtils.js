const DATA_COLUMNS = ["Column2", "Column3", "Column4", "Column5", "Column6"];

const DEFAULT_CONTRACT_SIZES = {
  XAU: 100,
  XAG: 5000,
  default: 100000,
};

const ACCOUNT_CURRENCY = "USD";

export { ACCOUNT_CURRENCY };

/** Extract example symbol from headers like "Trade Size (eg. EURUSD)". */
export function extractExampleSymbol(tradeSizeHeader = "") {
  const match = String(tradeSizeHeader).match(/\(eg\.\s*([A-Z0-9]+)\)/i);
  return match?.[1]?.toUpperCase() ?? null;
}

/** Extract currency code from tier trade-size copy. */
export function extractCurrencyFromText(text = "") {
  const match = String(text).match(/\b(USD|EUR|GBP|JPY|AUD|CAD|CHF|NZD)\b/i);
  return match?.[1]?.toUpperCase() ?? "USD";
}

/** Parse lot tier strings such as "0 - 5 lots" or "125+ lots". */
export function parseLotTierRange(lotSizeStr = "") {
  const text = String(lotSizeStr)
    .toLowerCase()
    .replace(/lots?/g, "")
    .trim();

  const plusMatch = text.match(/^([\d.]+)\+$/);
  if (plusMatch) {
    return { min: Number(plusMatch[1]), max: Number.POSITIVE_INFINITY };
  }

  const rangeMatch = text.match(/^([\d.]+)\s*-\s*([\d.]+)$/);
  if (rangeMatch) {
    return {
      min: Number(rangeMatch[1]),
      max: Number(rangeMatch[2]),
    };
  }

  return null;
}

export function parseMarginPercent(value = "") {
  const parsed = parseFloat(String(value).replace("%", "").trim());
  return Number.isFinite(parsed) ? parsed : 0;
}

export function parseLeverageRatio(value = "") {
  const match = String(value).match(/1\s*:\s*([\d,]+)/i);
  if (!match) return 0;
  const parsed = parseFloat(match[1].replace(/,/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

export function formatLeverageRatio(value = "") {
  const ratio = parseLeverageRatio(value);
  if (!ratio) return value || "—";
  return `1 : ${ratio.toLocaleString()}`;
}

export function getContractSizeForSymbol(symbol = "") {
  const normalized = String(symbol).replace(/\//g, "").toUpperCase();

  if (normalized.startsWith("XAU")) return DEFAULT_CONTRACT_SIZES.XAU;
  if (normalized.startsWith("XAG")) return DEFAULT_CONTRACT_SIZES.XAG;

  return DEFAULT_CONTRACT_SIZES.default;
}

export function buildInstrumentOptions(data) {
  if (!data) return [];

  return Object.entries(data).flatMap(([category, sections]) =>
    (sections ?? []).map((section) => {
      const header = section.data?.[0] ?? {};
      const symbol = extractExampleSymbol(header.Column4);

      return {
        id: `${category}::${section.title}`,
        category,
        title: section.title,
        symbol,
        section,
      };
    })
  );
}

export function findTierRowForLots(section, lots) {
  const rows = section?.data?.slice(1) ?? [];
  const numericLots = Number(lots);

  if (!Number.isFinite(numericLots) || numericLots <= 0) {
    return rows[0] ?? null;
  }

  for (const row of rows) {
    const range = parseLotTierRange(row.Column3);
    if (!range) continue;

    if (numericLots >= range.min && numericLots <= range.max) {
      return row;
    }
  }

  return rows[rows.length - 1] ?? null;
}

export function getTierSummary(section, lots) {
  const tierRow = findTierRowForLots(section, lots);

  if (!tierRow) {
    return {
      tier: "—",
      marginPercent: 0,
      leverage: 0,
      leverageLabel: "—",
      tradeCurrency: "USD",
    };
  }

  return {
    tier: tierRow.Column2 ?? "—",
    marginPercent: parseMarginPercent(tierRow.Column5),
    leverage: parseLeverageRatio(tierRow.Column6),
    leverageLabel: formatLeverageRatio(tierRow.Column6),
    tradeCurrency: extractCurrencyFromText(tierRow.Column4),
  };
}

export function calculateRequiredMargin({
  lots,
  midPrice,
  marginPercent,
  contractSize,
  symbol = "",
}) {
  const numericLots = Number(lots);
  const price = Number(midPrice);

  if (!Number.isFinite(numericLots) || numericLots <= 0) {
    return null;
  }

  const unitsPerLot = contractSize ?? getContractSizeForSymbol(symbol);
  const effectivePrice = Number.isFinite(price) && price > 0 ? price : 1;
  const positionSize = numericLots * unitsPerLot * effectivePrice;
  const requiredMargin = positionSize * (marginPercent / 100);

  const normalizedSymbol = String(symbol).replace(/\//g, "").toUpperCase();
  const pipValue =
    normalizedSymbol.length === 6 && normalizedSymbol.endsWith("USD")
      ? numericLots * 10
      : null;

  return {
    positionSize,
    requiredMargin,
    marginPercent,
    pipValue,
  };
}

export function formatMoney(value, currency = "USD", fractionDigits = 2) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return "—";

  return `${numeric.toLocaleString(undefined, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  })} ${currency}`;
}

export function getInstrumentDisplayLabel(option) {
  if (!option) return "—";
  if (option.symbol) {
    const displaySymbol =
      option.symbol.length === 6
        ? `${option.symbol.slice(0, 3)} / ${option.symbol.slice(3)}`
        : option.symbol;
    return `${option.title} (${displaySymbol})`;
  }
  return option.title;
}

export function getTableColumns() {
  return DATA_COLUMNS;
}

"use client";

import { useMemo } from "react";
import { useLocale } from "@/app/[locale]/LocaleProvider";
import { formatQuotePrice } from "@/lib/symbols/gtcTraderQuotesWs";
import {
  getRowLiveQuote,
  useSymbolQuotesWs,
} from "@/app/[locale]/markets/market-shared/hooks/useSymbolQuotesWs";
import { useLeverageData } from "./useLeverageData";

/**
 * Hero margin sheet — Tier 1 max leverage from the official schedule + live WS prices.
 * Symbols: uppercase, no slashes or spaces (EURUSD, XAUUSD, US500, …).
 */
export const MARGIN_SHEET_ROWS = [
  {
    symbol: "EURUSD",
    category: "Forex",
    sectionTitle: "Forex Majors",
    digits: 5,
  },
  {
    symbol: "USDJPY",
    category: "Forex",
    sectionTitle: "Forex Majors",
    digits: 3,
  },
  {
    symbol: "XAUUSD",
    category: "Metals",
    sectionTitle: "Gold",
    digits: 2,
  },
  {
    symbol: "US500",
    category: "Future Index",
    sectionTitle: "Index - US500",
    digits: 2,
  },
  {
    symbol: "US30",
    category: "Cash Index",
    sectionTitle: "Index - US30",
    digits: 2,
  },
];

function findLeverageSection(data, category, sectionTitle) {
  const sections = data?.[category];
  if (!sections?.length) return null;
  return sections.find((section) => section.title === sectionTitle) ?? null;
}

/** Always use Tier 1 (max leverage row) for the hero snapshot. */
function getTierOneRow(section) {
  return section?.data?.[1] ?? null;
}

function formatLeverageCompact(leverageValue = "") {
  return String(leverageValue).replace(/\s/g, "") || "—";
}

function formatScheduleMargin(marginValue = "") {
  const text = String(marginValue).trim();
  return text || "—";
}

function formatSheetPrice(mid, digits, symbol) {
  if (mid == null || !Number.isFinite(mid)) return "—";

  const normalized = String(symbol).replace(/\//g, "").toUpperCase();

  if (normalized === "US500" || normalized === "US30" || normalized === "XAUUSD") {
    return mid.toLocaleString(undefined, {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    });
  }

  return formatQuotePrice(mid, digits);
}

function getDayChange(quote) {
  const sell = quote?.sellNum;
  const buy = quote?.buyNum;
  const mid =
    sell != null && buy != null ? (sell + buy) / 2 : sell ?? buy ?? null;

  const base = quote?.prevClose ?? quote?.dayOpen;

  if (mid == null || base == null || !Number.isFinite(base) || base === 0) {
    return { change: "—", up: true };
  }

  const pct = ((mid - base) / base) * 100;
  const sign = pct >= 0 ? "+" : "";

  return {
    change: `${sign}${pct.toFixed(2)}%`,
    up: pct >= 0,
  };
}

export function useLeverageMarginSheet() {
  const locale = useLocale();
  const { data, loading: leverageLoading } = useLeverageData(locale);

  const symbols = useMemo(
    () => MARGIN_SHEET_ROWS.map((row) => row.symbol).filter(Boolean),
    []
  );

  const quotes = useSymbolQuotesWs(symbols);

  const rows = useMemo(
    () =>
      MARGIN_SHEET_ROWS.map((config) => {
        const section = findLeverageSection(data, config.category, config.sectionTitle);
        const tierRow = getTierOneRow(section);

        const quote = getRowLiveQuote(quotes, {
          rawSymbol: config.symbol,
          digits: config.digits,
        });

        const { change, up } = getDayChange(quote);
        const mid =
          quote?.sellNum != null && quote?.buyNum != null
            ? (quote.sellNum + quote.buyNum) / 2
            : quote?.sellNum ?? quote?.buyNum ?? null;

        return {
          key: config.symbol,
          symbol: config.symbol,
          leverage: tierRow?.Column6 ? formatLeverageCompact(tierRow.Column6) : null,
          margin: tierRow?.Column5 ? formatScheduleMargin(tierRow.Column5) : null,
          price: formatSheetPrice(mid, config.digits, config.symbol),
          change,
          up,
          hasLivePrice: mid != null,
        };
      }),
    [data, quotes]
  );

  const isStreaming = rows.some((row) => row.hasLivePrice);

  return {
    rows,
    leverageLoading,
    isStreaming,
  };
}

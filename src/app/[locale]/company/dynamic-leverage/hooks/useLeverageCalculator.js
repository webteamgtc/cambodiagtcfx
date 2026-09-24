"use client";

import { useMemo } from "react";
import { useLocale } from "@/app/[locale]/LocaleProvider";
import { getRowLiveQuote, useSymbolQuotesWs } from "@/app/[locale]/markets/market-shared/hooks/useSymbolQuotesWs";
import {
  buildInstrumentOptions,
  calculateRequiredMargin,
  findTierRowForLots,
  formatMoney,
  getContractSizeForSymbol,
  getInstrumentDisplayLabel,
  getTierSummary,
} from "../utils/leverageCalculatorUtils";
import { useLeverageData } from "../hooks/useLeverageData";

function useMidPrice(symbol, quotes) {
  return useMemo(() => {
    if (!symbol) return null;

    const quote = getRowLiveQuote(quotes, {
      rawSymbol: symbol,
      digits: symbol.startsWith("XAU") || symbol.startsWith("XAG") ? 2 : 5,
    });

    if (!quote) return null;

    const sell = Number(quote.sellNum ?? quote.sell);
    const buy = Number(quote.buyNum ?? quote.buy);

    if (Number.isFinite(sell) && Number.isFinite(buy) && sell > 0 && buy > 0) {
      return (sell + buy) / 2;
    }

    const fallback = Number(quote.mid ?? quote.price);
    return Number.isFinite(fallback) && fallback > 0 ? fallback : null;
  }, [quotes, symbol]);
}

export function useLeverageCalculator() {
  const locale = useLocale();
  const { data, loading, error } = useLeverageData(locale);

  const instruments = useMemo(() => buildInstrumentOptions(data), [data]);

  return {
    data,
    instruments,
    loading,
    error,
    getTierSummary,
    findTierRowForLots,
    calculateRequiredMargin,
    formatMoney,
    getInstrumentDisplayLabel,
    getContractSizeForSymbol,
  };
}

export function useLeverageCalculatorQuote(symbol) {
  const symbols = useMemo(() => (symbol ? [symbol] : []), [symbol]);
  const quotes = useSymbolQuotesWs(symbols);
  const midPrice = useMidPrice(symbol, quotes);

  return {
    quotes,
    midPrice,
    hasLiveRate: midPrice != null,
  };
}

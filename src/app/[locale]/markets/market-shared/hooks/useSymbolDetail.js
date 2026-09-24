"use client";

import { useEffect, useMemo, useState } from "react";
import {
  getRowLiveQuote,
  useSymbolQuotesWs,
} from "../hooks/useSymbolQuotesWs";
import {
  buildAboutCopy,
  buildSpecsFromInfo,
  getCategoryConfig,
  getDisplaySymbol,
  slugToRawSymbol,
} from "../symbolDetailConfig";
import {
  buildChartStats,
  formatChartPrice,
  formatSpread,
} from "../components/SymbolKlineChart";

async function fetchSymbolInfo(symbol) {
  const params = new URLSearchParams({ symbol });
  const res = await fetch(`/api/symbols/info?${params}`);
  const json = await res.json();
  if (!res.ok) throw new Error(json?.error || "Failed to load symbol info");
  return json.data || null;
}

async function fetchDailyCandles(symbol) {
  const params = new URLSearchParams({
    symbol,
    date: "1440",
    count: "2",
  });
  const res = await fetch(`/api/symbols/chart?${params}`);
  const json = await res.json();
  if (!res.ok) return [];
  return Array.isArray(json.data) ? json.data : [];
}

export function useSymbolDetail(category, slug) {
  const categoryConfig = useMemo(() => getCategoryConfig(category), [category]);
  const rawSymbol = slug

  const [info, setInfo] = useState(null);
  const [dailyCandles, setDailyCandles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const quotes = useSymbolQuotesWs(rawSymbol ? [rawSymbol] : []);

  useEffect(() => {
    if (!rawSymbol) {
      setLoading(false);
      setError("Invalid symbol");
      return undefined;
    }

    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const [nextInfo, candles] = await Promise.all([
          fetchSymbolInfo(rawSymbol),
          fetchDailyCandles(rawSymbol),
        ]);
        if (cancelled) return;
        setInfo(nextInfo);
        setDailyCandles(candles);
      } catch (err) {
        if (!cancelled) {
          setError(err?.message || "Failed to load symbol");
          setInfo(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [rawSymbol]);

  const digits = Number.isFinite(Number(info?.digits)) ? Number(info.digits) : 5;

  const liveQuote = useMemo(
    () =>
      getRowLiveQuote(quotes, {
        rawSymbol,
        digits,
      }),
    [quotes, rawSymbol, digits]
  );

  const displaySymbol = getDisplaySymbol(rawSymbol, info);
  const subtitle = info?.description?.trim() || `${categoryConfig.displayLabel} instrument`;

  const sellNum = liveQuote?.sellNum ?? null;
  const buyNum = liveQuote?.buyNum ?? null;
  const midNum =
    sellNum != null && buyNum != null
      ? (sellNum + buyNum) / 2
      : sellNum ?? buyNum ?? null;

  const dayStats = useMemo(() => buildChartStats(dailyCandles), [dailyCandles]);

  const changeAbs = dayStats?.change ?? null;
  const changePct = dayStats?.changePct ?? null;
  const changePositive = changeAbs == null ? null : changeAbs >= 0;

  const specs = useMemo(() => buildSpecsFromInfo(info || {}), [info]);
  const about = useMemo(
    () => buildAboutCopy(displaySymbol, info, categoryConfig),
    [displaySymbol, info, categoryConfig]
  );

  return {
    categoryConfig,
    rawSymbol,
    displaySymbol,
    subtitle,
    loading,
    error,
    info,
    liveQuote,
    sellPrice: liveQuote?.sell ?? (sellNum != null ? formatChartPrice(sellNum, digits) : "—"),
    buyPrice: liveQuote?.buy ?? (buyNum != null ? formatChartPrice(buyNum, digits) : "—"),
    midPrice: midNum != null ? formatChartPrice(midNum, digits) : "—",
    sellNum,
    buyNum,
    midNum,
    spread: formatSpread(sellNum, buyNum),
    dayHigh: dayStats?.h != null ? formatChartPrice(dayStats.h, digits) : "—",
    dayLow: dayStats?.l != null ? formatChartPrice(dayStats.l, digits) : "—",
    swapLong: info?.swap_long,
    swapShort: info?.swap_short,
    changeAbs,
    changePct,
    changePositive,
    digits,
    specs,
    about,
  };
}

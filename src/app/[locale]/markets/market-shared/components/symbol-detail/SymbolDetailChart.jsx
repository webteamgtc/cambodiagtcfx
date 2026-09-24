"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import clsx from "clsx";
import {
  buildChartStats,
  formatChartPrice,
} from "../SymbolKlineChart";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const DETAIL_INTERVALS = [
  { label: "1m", value: 1 },
  { label: "15m", value: 15 },
  { label: "30m", value: 30 },
  { label: "1h", value: 60 },
  { label: "4h", value: 240 },
  { label: "1d", value: 1440 },
];

async function fetchChart(symbol, date) {
  const params = new URLSearchParams({
    symbol,
    date: String(date),
    count: "100",
  });
  const res = await fetch(`/api/symbols/chart?${params}`);
  const json = await res.json();
  if (!res.ok) throw new Error(json?.error || "Failed to load chart");
  return Array.isArray(json.data) ? json.data : [];
}

export default function SymbolDetailChart({
  rawSymbol,
  displaySymbol,
  currentPrice,
}) {
  const [interval, setInterval] = useState(1);
  const [candles, setCandles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!rawSymbol) return undefined;

    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const data = await fetchChart(rawSymbol, interval);
        if (!cancelled) setCandles(data);
      } catch {
        if (!cancelled) setCandles([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [rawSymbol, interval]);

  const stats = useMemo(() => buildChartStats(candles), [candles]);

  const priceLine = useMemo(() => {
    if (currentPrice != null && !Number.isNaN(Number(currentPrice))) {
      return Number(currentPrice);
    }
    return stats?.c ?? null;
  }, [currentPrice, stats]);

  const chartId = useMemo(
    () => `symbol-detail-${rawSymbol}-${interval}`,
    [rawSymbol, interval]
  );

  const buildPriceAnnotation = (y) => {
    if (y == null) return {};
    return {
      yaxis: [
        {
          y,
          borderColor: "#293B93",
          strokeDashArray: 0,
          borderWidth: 1.5,
          label: {
            borderColor: "#293B93",
            style: {
              color: "#fff",
              background: "#293B93",
              fontSize: "11px",
              fontWeight: 600,
              padding: { left: 6, right: 6, top: 2, bottom: 2 },
            },
            text: formatChartPrice(y),
            position: "right",
          },
        },
      ],
    };
  };

  const series = useMemo(
    () => [
      {
        name: displaySymbol,
        data: candles.map((c) => ({
          x: new Date(c.t * 1000),
          y: [c.o, c.h, c.l, c.c],
        })),
      },
    ],
    [candles, displaySymbol]
  );

  const options = useMemo(
    () => ({
      chart: {
        id: chartId,
        type: "candlestick",
        height: 340,
        fontFamily: "inherit",
        toolbar: { show: false },
        zoom: { enabled: false },
      },
      plotOptions: {
        candlestick: {
          colors: {
            upward: "#22C55E",
            downward: "#EF4444",
          },
        },
      },
      annotations: buildPriceAnnotation(stats?.c ?? null),
      xaxis: {
        type: "datetime",
        labels: { show: false },
        axisBorder: { show: false },
        axisTicks: { show: false },
        crosshairs: { show: false },
        tooltip: { enabled: false },
      },
      yaxis: {
        opposite: true,
        tooltip: { enabled: true },
        labels: {
          style: { colors: "#9AA3B8", fontSize: "11px" },
          formatter: (v) => formatChartPrice(v),
        },
      },
      grid: {
        borderColor: "#EEF2FC",
        strokeDashArray: 4,
      },
      tooltip: { enabled: true },
    }),
    [chartId, stats?.c]
  );

  useEffect(() => {
    if (priceLine == null || typeof window === "undefined") return undefined;

    let cancelled = false;

    async function updateLine() {
      const ApexCharts = (await import("apexcharts")).default;
      if (cancelled) return;
      ApexCharts.exec(
        chartId,
        "updateOptions",
        { annotations: buildPriceAnnotation(priceLine) },
        false,
        false
      );
    }

    updateLine();
    return () => {
      cancelled = true;
    };
  }, [chartId, priceLine]);

  return (
    <div className="flex h-full flex-col">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-[#000]">{displaySymbol}</h3>
        <div className="flex flex-wrap items-center gap-3">
          {DETAIL_INTERVALS.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setInterval(item.value)}
              className={clsx(
                "rounded-full px-3 py-1 text-xs font-normal transition",
                interval === item.value
                  ? "bg-[#293B93] text-white"
                  : " text-[#969B9F] hover:bg-[#E4E9F6]"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex h-[340px] items-center justify-center rounded-xl bg-[#F8F9FC]">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#293B93] border-t-transparent" />
        </div>
      ) : candles.length === 0 ? (
        <div className="flex h-[280px] items-center justify-center rounded-xl bg-[#F8F9FC] text-sm text-[#666]">
          Chart data unavailable
        </div>
      ) : (
        <div className="symbol-detail-chart min-h-[340px]">
          <Chart
            key={chartId}
            options={options}
            series={series}
            type="candlestick"
            height={340}
          />
        </div>
      )}

      <p className="mt-1.5 flex items-start gap-2 text-xs leading-relaxed ">
        <span
          className="mt-1 text-[#CF4548] inline-flex h-4 w-4 shrink-0 items-center justify-center text-[10px] font-bold"
          aria-hidden
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M9.975 0C4.466 0 0 4.466 0 9.975C0 15.484 4.466 19.95 9.975 19.95C15.484 19.95 19.95 15.484 19.95 9.975C19.95 4.466 15.484 0 9.975 0ZM9.975 1.75C14.518 1.75 18.2 5.432 18.2 9.975C18.2 14.518 14.518 18.2 9.975 18.2C5.432 18.2 1.75 14.518 1.75 9.975C1.75 5.432 5.432 1.75 9.975 1.75Z" fill="#FB553C" />
            <path d="M9.975 8.6163C10.5817 8.6163 10.885 8.91963 10.885 9.5263V14.2583C10.885 14.865 10.5817 15.1683 9.975 15.1683C9.36833 15.1683 9.065 14.865 9.065 14.2583V9.5263C9.065 8.91963 9.36833 8.6163 9.975 8.6163Z" fill="#FB553C" />
            <path d="M8.645 6.1117C8.645 6.46444 8.78512 6.80273 9.03455 7.05215C9.28397 7.30157 9.62226 7.4417 9.975 7.4417C10.3277 7.4417 10.666 7.30157 10.9155 7.05215C11.1649 6.80273 11.305 6.46444 11.305 6.1117C11.305 5.75896 11.1649 5.42067 10.9155 5.17125C10.666 4.92182 10.3277 4.7817 9.975 4.7817C9.62226 4.7817 9.28397 4.92182 9.03455 5.17125C8.78512 5.42067 8.645 5.75896 8.645 6.1117Z" fill="#FB553C" />
          </svg>
        </span>
        <span className="text-[#000] font-medium">
          Past performance is not a reliable indicator of future results. Share
          prices are indicative and may differ from the market prices.
        </span>
      </p>
    </div>
  );
}

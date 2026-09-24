"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import clsx from "clsx";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export const CHART_INTERVALS = [
  { label: "1m", value: 1 },
  { label: "15m", value: 15 },
  { label: "30m", value: 30 },
  { label: "1h", value: 60 },
  { label: "4h", value: 240 },
  { label: "1d", value: 1440 },
  { label: "1w", value: 10080 },
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

export function formatChartPrice(value, digits = 5) {
  if (value == null || Number.isNaN(value)) return "—";
  const n = Number(value);
  if (n >= 1000) return n.toFixed(2);
  if (n >= 100) return n.toFixed(3);
  if (n >= 10) return n.toFixed(4);
  return n.toFixed(digits);
}

export function formatSpread(sellNum, buyNum) {
  if (sellNum == null || buyNum == null || Number.isNaN(sellNum) || Number.isNaN(buyNum)) {
    return "—";
  }

  const diff = buyNum - sellNum;
  const mid = (sellNum + buyNum) / 2;

  // Forex-style quotes: show spread in pips (e.g. 1.4)
  if (mid < 50 && mid > 0.5) {
    return (diff * 10000).toFixed(1);
  }
  if (mid >= 1000) return diff.toFixed(2);
  if (mid >= 100) return diff.toFixed(3);
  return diff.toFixed(4);
}

export function buildChartStats(candles) {
  const last = candles[candles.length - 1];
  const first = candles[0];
  if (!last) return null;

  const change = first ? last.c - first.o : 0;
  const changePct = first?.o ? (change / first.o) * 100 : 0;

  return {
    o: last.o,
    h: last.h,
    l: last.l,
    c: last.c,
    change,
    changePct,
  };
}

export function QuotePricePill({ value, variant = "neutral", flash = false, compact = false }) {
  return (
    <span
      className={clsx(
        "inline-flex justify-center font-medium transition-colors duration-300",
        compact ? "min-w-0 rounded px-1.5 py-0.5 text-sm" : "min-w-[72px] rounded-md px-3 py-1.5 text-sm",
        compact && !flash && "text-[#4E4E4E] bg-transparent",
        !compact &&
          variant === "sell" &&
          (flash ? "bg-[#B8EBC4] text-[#0F6B24] ring-2 ring-[#04C120]/30" : "bg-[#E8F8EB] text-[#1A7A32]"),
        !compact &&
          variant === "buy" &&
          (flash ? "bg-[#F9C4C4] text-[#A93226] ring-2 ring-[#CF4548]/30" : "bg-[#FDECEC] text-[#C0392B]"),
        !compact &&
          variant === "spread" &&
          (flash ? "bg-[#B8EBC4] text-[#0F6B24] ring-2 ring-[#04C120]/30" : "bg-[#E8F8EB] text-[#1A7A32]"),
        compact && flash && variant === "sell" && "bg-[#B8EBC4] text-[#0F6B24]",
        compact && flash && variant === "buy" && "bg-[#F9C4C4] text-[#A93226]",
        compact && flash && variant === "spread" && "bg-[#DDE8F8] text-[#293B93]",
        variant === "neutral" && "text-[#4E4E4E]"
      )}
    >
      {value}
    </span>
  );
}

export default function SymbolKlineChart({ rawSymbol, displaySymbol, currentPrice }) {
  const [interval, setInterval] = useState(1440);
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

  const chartId = useMemo(() => `kline-${rawSymbol}-${interval}`, [rawSymbol, interval]);

  const buildPriceAnnotation = (y, open) => {
    if (y == null) return {};
    const lineColor = open != null && y >= open ? "#04C120" : "#CF4548";
    return {
      yaxis: [
        {
          y,
          borderColor: lineColor,
          strokeDashArray: 4,
          borderWidth: 1.5,
          label: {
            borderColor: lineColor,
            style: {
              color: "#fff",
              background: lineColor,
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
        height: 320,
        fontFamily: "inherit",
        zoom: {
          enabled: true,
          type: "x",
          autoScaleYaxis: true,
          allowMouseWheelZoom: true,
        },
        selection: {
          enabled: true,
          type: "x",
        },
        toolbar: {
          show: true,
          autoSelected: "zoom",
          tools: {
            download: false,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true,
          },
        },
      },
      plotOptions: {
        candlestick: {
          colors: {
            upward: "#04C120",
            downward: "#CF4548",
          },
        },
      },
      annotations: buildPriceAnnotation(stats?.c ?? null, stats?.o),
      xaxis: {
        type: "datetime",
        labels: { style: { colors: "#888", fontSize: "11px" } },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        opposite: true,
        tooltip: { enabled: true },
        labels: {
          style: { colors: "#888", fontSize: "11px" },
          formatter: (v) => formatChartPrice(v),
        },
      },
      grid: {
        borderColor: "#EEF2FC",
        strokeDashArray: 4,
      },
      tooltip: { enabled: true },
    }),
    [chartId, stats?.c, stats?.o]
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
        { annotations: buildPriceAnnotation(priceLine, stats?.o) },
        false,
        false
      );
    }

    updateLine();

    return () => {
      cancelled = true;
    };
  }, [chartId, priceLine, stats?.o]);

  const intervalLabel =
    CHART_INTERVALS.find((item) => item.value === interval)?.label ?? "1d";

  return (
    <div className="border-t border-[#E1E7F6] bg-white px-4 py-4 md:px-6 md:py-5">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="text-sm font-semibold text-[#293B93]">
          {displaySymbol} · {intervalLabel}
        </span>
        <span className="h-2 w-2 rounded-full bg-[#04C120]" aria-hidden />
        {stats ? (
          <p className="w-full text-xs text-[#666] sm:w-auto sm:ml-2">
            O <span className="text-[#333]">{formatChartPrice(stats.o)}</span> H{" "}
            <span className="text-[#333]">{formatChartPrice(stats.h)}</span> L{" "}
            <span className="text-[#333]">{formatChartPrice(stats.l)}</span> C{" "}
            <span className="text-[#333]">{formatChartPrice(stats.c)}</span>
            <span
              className={clsx(
                "ml-2 font-medium",
                stats.change >= 0 ? "text-[#04C120]" : "text-[#CF4548]"
              )}
            >
              {stats.change >= 0 ? "+" : ""}
              {formatChartPrice(stats.change)} ({stats.changePct >= 0 ? "+" : ""}
              {stats.changePct.toFixed(2)}%)
            </span>
          </p>
        ) : null}
      </div>

      {loading ? (
        <div className="flex h-[320px] items-center justify-center rounded-lg bg-[#F8F9FC]">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#293B93] border-t-transparent" />
        </div>
      ) : candles.length === 0 ? (
        <div className="flex h-[200px] items-center justify-center rounded-lg bg-[#F8F9FC] text-sm text-[#666]">
          Chart data unavailable
        </div>
      ) : (
        <div
          className="symbol-kline-chart"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          <Chart
            key={chartId}
            options={options}
            series={series}
            type="candlestick"
            height={320}
          />
        </div>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-1 border-t border-[#EEF2FC] pt-3">
        {CHART_INTERVALS.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => setInterval(item.value)}
            className={clsx(
              "rounded px-2.5 py-1 text-xs font-medium transition",
              interval === item.value
                ? "bg-[#293B93] text-white"
                : "text-[#666] hover:bg-[#F0F3FA]"
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

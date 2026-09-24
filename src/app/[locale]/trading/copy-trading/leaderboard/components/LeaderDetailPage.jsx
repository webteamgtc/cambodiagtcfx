"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import ChartWrapperComponent from "../../../../components/common/chart/ChartWrapper";
import dynamic from "next/dynamic";
// import ReturnCard from "../components/leaderBoard/singleDetail/cards";
import ReturnLeader from "./return/index";
import TradingLeader from "./trading/index";
import InstrumentLeader from "./instrument/index";
import HistoryLeader from "./history/index";
import LoaderComponent from "./LoaderCompoent";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";
 
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

function formatNumber(v, { decimals = 2 } = {}) {
    const n = Number(v);
    if (!Number.isFinite(n)) return "-";
    return new Intl.NumberFormat(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    }).format(n);
}

function formatInteger(v) {
    const n = Number(v);
    if (!Number.isFinite(n)) return "-";
    return new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(n);
}

function formatMoney(v) {
    const n = Number(v);
    if (!Number.isFinite(n)) return "-";
    const sign = n >= 0 ? "+" : "";
    return `${sign}${new Intl.NumberFormat(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(n)}`;
}

function formatPercent(v) {
    const n = Number(v);
    if (!Number.isFinite(n)) return "-";
    const sign = n >= 0 ? "+" : "";
    return `${sign}${formatNumber(n, { decimals: 2 })}%`;
}

function toDate(v) {
    const d = v ? new Date(v) : null;
    return d && !Number.isNaN(d.getTime()) ? d : null;
}

function filterHistoryEntries(entries, timeRange) {
    if (!Array.isArray(entries) || entries.length === 0) return [];
    if (timeRange === "ALL") return entries;

    const days =
        timeRange === "7D" ? 7 : timeRange === "30D" ? 30 : timeRange === "90D" ? 90 : null;
    if (!days) return entries;

    const last = toDate(entries[entries.length - 1]?.tp);
    if (!last) return entries;
    const cutoff = new Date(last);
    cutoff.setDate(cutoff.getDate() - days);
    return entries.filter((e) => {
        const d = toDate(e?.tp);
        return d ? d >= cutoff : false;
    });
}

function calcRangeMetrics(entries) {
    if (!Array.isArray(entries) || entries.length < 2) {
        return { roiDelta: null, pnlSum: null, startRt: null };
    }

    const firstRt = Number(entries[0]?.rt);
    const lastRt = Number(entries[entries.length - 1]?.rt);
    const roiDelta = Number.isFinite(firstRt) && Number.isFinite(lastRt) ? lastRt - firstRt : null;

    const pnlSum = entries.reduce((acc, e) => {
        const v = Number(e?.rp);
        return Number.isFinite(v) ? acc + v : acc;
    }, 0);

    return {
        roiDelta,
        pnlSum: Number.isFinite(pnlSum) ? pnlSum : null,
        startRt: Number.isFinite(firstRt) ? firstRt : null,
    };
}

function StatCard({ label, value }) {
    return (
        <div className="rounded-xl border border-slate-200 p-4">
            <p className="TextSmall text-slate-500">{label}</p>
            <p className="TextButton mt-1 text-slate-900">{value}</p>
        </div>
    );
}

const LeaderBoardDetail = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const [timeRange, setTimeRange] = useState("ALL");
    const [activeTab, setActiveTab] = useState("overview");
    const [activityTab, setActivityTab] = useState("positions");
    const [sortBy, setSortBy] = useState("openingTime");
    const [perfMode, setPerfMode] = useState("roi"); // "roi" | "pnl"
    const [visibility, setVisibility] = useState("public"); // "public" | "private"
    const [tabs, setTabs] = useState(1);
    const [overviewPanel, setOverviewPanel] = useState("key"); // key | risk | daily

    useEffect(() => {
        setLoading(true);
        // Clear old profile so UI doesn't show stale data
        setData(null);
        axios
            .get(
                `${process.env.NEXT_PUBLIC_LEADER_URL}rating/1/profile/${params?.slug}?widget_key=social_platform_ratings`
            )
            .then((res) => {
                setData(res?.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log({ err });
                setLoading(false);
            });
    }, [params?.slug]);

    // const t = useTranslations("prime-tech.socialTranding.leaderBoard")
    const tr = usePathTranslation("copyTradingPage.leaderboardDetail");

    const filteredEntries = filterHistoryEntries(data?.history?.entries, timeRange);
    const chartItem = data ? { ...data, history: { ...(data?.history || {}), entries: filteredEntries } } : null;
    const rangeMetrics = calcRangeMetrics(filteredEntries);
    const rangeRoiText =
        rangeMetrics.roiDelta == null ? "-" : `${formatNumber(rangeMetrics.roiDelta, { decimals: 2 })}%`;
    const rangePnlText =
        rangeMetrics.pnlSum == null
            ? "-"
            : `${formatMoney(rangeMetrics.pnlSum)} ${data?.account?.currency || ""}`.trim();

    const overviewAum =
        data?.account?.balance ?? data?.account?.equity ?? null;
    const leadingMarginBalance =
        data?.account?.freeMargin ?? data?.account?.margin ?? null;
    const profitSharing = data?.extension?.profitSharing ?? data?.additional?.profitSharing ?? null;
    const minCopyAmount = data?.extension?.minimumCopyAmount ?? data?.additional?.minimumCopyAmount ?? null;

    const assetPrefs = Array.isArray(data?.extension?.assetPreferences)
        ? data.extension.assetPreferences
        : null;
    const assetSeries = assetPrefs?.map((x) => Number(x?.value)).filter((v) => Number.isFinite(v)) ?? [];
    const assetLabels = assetPrefs?.map((x) => String(x?.label ?? "")).filter(Boolean) ?? [];
    const hasAssetPrefs = assetSeries.length > 0 && assetLabels.length > 0;
    const donutSeries = hasAssetPrefs ? assetSeries : [100];
    const donutLabels = hasAssetPrefs ? assetLabels : ["N/A"];
    const donutColors = hasAssetPrefs ? ["#1D4ED8", "#FBD400", "#10B981", "#8B5CF6"] : ["#E2E8F0"];

    const donutOptions = {
        chart: {
            type: "donut",
            sparkline: { enabled: true },
            animations: { enabled: false },
        },
        labels: donutLabels,
        colors: donutColors,
        legend: { show: false },
        dataLabels: { enabled: false },
        stroke: { width: 0 },
        plotOptions: {
            pie: {
                donut: {
                    size: "70%",
                },
            },
        },
        tooltip: { enabled: assetSeries.length > 0 },
    };

    const perfPoints = (filteredEntries || [])
        .map((e, idx) => {
            const x = toDate(e?.tp)?.getTime();
            const rt = Number(e?.rt);
            const rp = Number(e?.rp);
            if (!Number.isFinite(x)) return null;

            if (perfMode === "roi") {
                // Normalize ROI so chart starts near 0 (Binance-like)
                const y = Number.isFinite(rt) && rangeMetrics.startRt != null ? rt - rangeMetrics.startRt : null;
                return Number.isFinite(y) ? { x, y } : null;
            }

            // PnL mode: cumulative sum of daily profit (rp)
            let cum = 0;
            for (let i = 0; i <= idx; i += 1) {
                const v = Number(filteredEntries?.[i]?.rp);
                if (Number.isFinite(v)) cum += v;
            }
            const y = cum;
            return Number.isFinite(y) ? { x, y } : null;
        })
        .filter(Boolean);

    const perfSeries = [
        {
            name: perfMode === "roi" ? "ROI" : "PnL",
            data: perfPoints,
        },
    ];

    const perfChartOptions = {
        chart: {
            type: "area",
            toolbar: { show: false },
            zoom: { enabled: false },
            animations: { enabled: false },
        },
        stroke: { curve: "smooth", width: 2 },
        colors: ["#16A34A"],
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.16,
                opacityTo: 0.02,
                stops: [0, 90, 100],
            },
        },
        dataLabels: { enabled: false },
        xaxis: {
            type: "datetime",
            labels: { show: true, style: { colors: "#94A3B8", fontSize: "12px" } },
            axisBorder: { show: false },
            axisTicks: { show: false },
        },
        yaxis: {
            labels: {
                show: true,
                style: { colors: "#94A3B8", fontSize: "12px" },
                formatter: (val) => {
                    const n = Number(val);
                    if (!Number.isFinite(n)) return "";
                    return n.toFixed(2);
                },
            },
        },
        grid: {
            borderColor: "#E2E8F0",
            strokeDashArray: 4,
            padding: { left: 10, right: 10, top: 0, bottom: 0 },
        },
        tooltip: {
            x: { format: "yyyy-MM-dd HH:mm" },
            y: {
                formatter: (val) =>
                    perfMode === "roi"
                        ? `${formatNumber(val, { decimals: 2 })}%`
                        : `${formatNumber(val, { decimals: 2 })} ${data?.account?.currency || ""}`.trim(),
            },
        },
    };

    return (
        <>
            <div className="bg-[#F8FAFC] py-10 md:py-12 2xl:py-16">
                {loading || !data ? (
                    <LoaderComponent />

                ) : (
                    <div className="container">
                        {/* Header (Binance-like) */}
                        <div className="mb-8 flex flex-col gap-6">
                            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                                <div className="flex items-center gap-4">
                                    <img
                                        className="h-14 w-14 rounded-xl object-cover"
                                        src={
                                            data?.public?.avatarPath ||
                                            "/GTCFX-ICON.svg"
                                        }
                                        alt=""
                                    />
                                    <div className="min-w-0">
                                        <h1 className="HeadingH3 truncate text-slate-900">{data?.accountName}</h1>
                                        <p className="TextSmall mt-1 text-slate-500">
                                            {data?.account?.leverage ? `1x to ${formatInteger(data?.account?.leverage)}x leverage` : ""}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex w-full flex-col gap-2 md:w-auto md:min-w-[200px]">
                                    <button
                                        type="button"
                                        className="TextButton rounded-lg bg-secondary py-2.5 text-white transition hover:brightness-95"
                                        onClick={() => {
                                            window.open(
                                                `https://gtccopy.com/portal/registration/subscription?provider=${data?.profileId}&backLink=true&backUrl=https%3A%2F%2Fratings.gtccopy.com%2Fwidgets%2Fratings%3FwidgetKey=social_platform_ratings&lang=en&wlid=2b9e7678-160f-48f5-9a5f-5f5bef2d9d26&widgetKey=social_platform_ratings`,
                                                "_blank"
                                            );
                                        }}
                                    >
                                        {tr("copy", "Copy")}
                                    </button>
                                </div>
                            </div>

                            <div className="TextSmall flex flex-wrap items-center gap-x-6 gap-y-2 text-slate-600">
                                <span>
                                    Days Trading <span className="font-semibold text-slate-900">{formatInteger(data?.age)}</span>
                                </span>
                                <span>
                                    {tr("copiers", "Copiers")} <span className="font-semibold text-slate-900">{formatInteger(data?.extension?.copiers ?? "-")}</span>
                                </span>
                                <span>
                                    {tr("totalCopiers", "Total Copiers")} <span className="font-semibold text-slate-900">{formatInteger(data?.extension?.totalCopiers ?? "-")}</span>
                                </span>
                                <span>
                                    {tr("mockCopiers", "Mock Copiers")} <span className="font-semibold text-slate-900">{formatInteger(data?.extension?.mockCopiers ?? "-")}</span>
                                </span>
                                <span>
                                    {tr("closedPortfolios", "Closed Portfolios")} <span className="font-semibold text-slate-900">{formatInteger(data?.extension?.closedPortfolios ?? "-")}</span>
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-1 lg:items-start">

                            <div className="space-y-6 text-left">
                                {/* Tabs (Binance-like) */}


                                {/* Account quick summary (compact + aligned) */}
                                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                        <div className="min-w-0">
                                            <h2 className="HeadingH4 text-slate-900">{tr("accountSummary", "Account summary")}</h2>
                                            <p className="TextSmall mt-1 text-slate-500">
                                                #{formatInteger(data?.rank)} · {data?.account?.country || "-"} ·{" "}
                                                {data?.account?.leverage ? `1:${formatInteger(data?.account?.leverage)}` : "-"} ·{" "}
                                                {data?.account?.currency || "-"}
                                            </p>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="TextSmall rounded-lg bg-slate-100 px-3 py-2 text-slate-700">
                                                {tr("balance", "Balance")}:{" "}
                                                <span className="font-semibold text-slate-900">
                                                    {formatNumber(data?.account?.balance, { decimals: 2 })}
                                                </span>
                                            </span>
                                            <span className="TextSmall rounded-lg bg-slate-100 px-3 py-2 text-slate-700">
                                                {tr("equity", "Equity")}:{" "}
                                                <span className="font-semibold text-slate-900">
                                                    {formatNumber(data?.account?.equity, { decimals: 2 })}
                                                </span>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                                        {[
                                            { label: tr("floatingPnl", "Floating PnL"), value: formatNumber(data?.account?.floatingPnL, { decimals: 2 }) },
                                            { label: tr("freeMargin", "Free margin"), value: formatNumber(data?.account?.freeMargin, { decimals: 2 }) },
                                            { label: tr("margin", "Margin"), value: formatNumber(data?.account?.margin, { decimals: 2 }) },
                                            { label: tr("credit", "Credit"), value: formatNumber(data?.account?.credit, { decimals: 2 }) },
                                            { label: tr("updated", "Updated"), value: data?.updatedUtc ? new Date(data.updatedUtc).toLocaleDateString() : "-" },
                                        ].map((x) => (
                                            <div key={x.label} className="rounded-xl bg-slate-50 px-4 py-3">
                                                <p className="TextSmall text-slate-500">{x.label}</p>
                                                <p className="TextButton mt-1 text-slate-900">{x.value}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Time range selector */}
                                <div className="flex flex-wrap items-center justify-end gap-2">
                                    {["7D", "30D", "90D", "ALL"].map((r) => (
                                        <button
                                            key={r}
                                            type="button"
                                            className={[
                                                "TextSmall rounded-lg px-3 py-2 transition",
                                                timeRange === r ? "bg-[#F1F3FF] text-primary ring-1 ring-primary/15" : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50",
                                            ].join(" ")}
                                            onClick={() => setTimeRange(r)}
                                        >
                                            {r}
                                        </button>
                                    ))}
                                </div>

                                {/* Performance (Binance-like) */}
                                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
                                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                        <div className="flex items-center justify-between gap-3">
                                            <h2 className="HeadingH4 text-slate-900">{tr("performance", "Performance")}</h2>
                                            <span className="TextSmall text-slate-500">{timeRange === "ALL" ? tr("all", "All") : timeRange}</span>
                                        </div>

                                        <div className="mt-5 space-y-4">
                                            <div className="flex items-center justify-between gap-4">
                                                <span className="TextSmall text-slate-500">{tr("roi", "ROI")}</span>
                                                <span className="TextButton text-emerald-600">{rangeRoiText}</span>
                                            </div>
                                            <div className="flex items-center justify-between gap-4">
                                                <span className="TextSmall text-slate-500">{tr("pnl", "PnL")}</span>
                                                <span className="TextButton text-emerald-600">{rangePnlText}</span>
                                            </div>
                                            <div className="flex items-center justify-between gap-4">
                                                <span className="TextSmall text-slate-500">{tr("copierPnl", "Copier PnL")}</span>
                                                <span className="TextButton text-slate-900">-</span>
                                            </div>
                                            <div className="flex items-center justify-between gap-4">
                                                <span className="TextSmall text-slate-500">{tr("sharpeRatio", "Sharpe Ratio")}</span>
                                                <span className="TextButton text-slate-900">{formatNumber(data?.sharpeRatio, { decimals: 2 })}</span>
                                            </div>
                                            <div className="flex items-center justify-between gap-4">
                                                <span className="TextSmall text-slate-500">{tr("mdd", "MDD")}</span>
                                                <span className="TextButton text-slate-900">{formatNumber(data?.maxDrawdown, { decimals: 2 })}%</span>
                                            </div>
                                            <div className="flex items-center justify-between gap-4">
                                                <span className="TextSmall text-slate-500">{tr("winRate", "Win Rate")}</span>
                                                <span className="TextButton text-slate-900">{formatNumber(data?.winRate, { decimals: 2 })}%</span>
                                            </div>
                                            <div className="flex items-center justify-between gap-4">
                                                <span className="TextSmall text-slate-500">{tr("winPositions", "Win Positions")}</span>
                                                <span className="TextButton text-slate-900">{formatInteger(data?.profitDays)}</span>
                                            </div>
                                            <div className="flex items-center justify-between gap-4">
                                                <span className="TextSmall text-slate-500">{tr("totalPositions", "Total Positions")}</span>
                                                <span className="TextButton text-slate-900">{formatInteger(data?.totalClosedTrades)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                        <div className="flex flex-wrap items-center justify-between gap-3">
                                            <div className="flex items-center gap-2 rounded-lg bg-slate-100 p-1">
                                                <button
                                                    type="button"
                                                    className={[
                                                        "TextSmall rounded-md px-3 py-1.5 transition",
                                                        perfMode === "roi" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900",
                                                    ].join(" ")}
                                                    onClick={() => setPerfMode("roi")}
                                                >
                                                    ROI
                                                </button>
                                                <button
                                                    type="button"
                                                    className={[
                                                        "TextSmall rounded-md px-3 py-1.5 transition",
                                                        perfMode === "pnl" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900",
                                                    ].join(" ")}
                                                    onClick={() => setPerfMode("pnl")}
                                                >
                                                    PnL
                                                </button>
                                            </div>

                                            <span className="TextSmall text-slate-500">{timeRange === "ALL" ? "All" : timeRange}</span>
                                        </div>

                                        <div className="mt-4 min-h-[260px]">
                                            <ApexChart options={perfChartOptions} series={perfSeries} type="area" height={280} />
                                        </div>
                                        <div className="mt-3 hidden">
                                            <ChartWrapperComponent item={chartItem || data} height={95} width={"100%"} />
                                        </div>
                                    </div>
                                </div>





                            </div>
                        </div>

                        <div>
                            <div className="flex  my-6 flex-wrap items-center gap-2">
                                {[
                                    { id: "overview", label: tr("tabs.overview", "Overview") },
                                    { id: "trading", label: tr("tabs.trading", "Trading") },
                                    { id: "account", label: tr("tabsExtended.account", "Account") },
                                    { id: "history", label: tr("tabs.history", "History") },
                                ].map((t) => (
                                    <button
                                        key={t.id}
                                        type="button"
                                        className={[
                                            "TextButton rounded-xl px-4 py-2 transition",
                                            activeTab === t.id ? "bg-primary text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200",
                                        ].join(" ")}
                                        onClick={() => setActiveTab(t.id)}
                                    >
                                        {t.label}
                                    </button>
                                ))}
                            </div>
                            <div>
                                {activeTab === "overview" && (
                                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                        <div className="flex flex-wrap items-center justify-between gap-4">
                                            <div className="min-w-0">
                                                <h2 className="HeadingH4 text-slate-900">{tr("tabs.overview", "Overview")}</h2>
                                                <p className="TextSmall mt-1 text-slate-500">
                                                    {tr("updatedLabel", "Updated:")} {data?.updatedUtc ? new Date(data.updatedUtc).toLocaleString() : "-"}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-2 rounded-lg bg-slate-100 p-1">
                                                {[
                                                    { id: "key", label: tr("overviewSubtabs.key", "Key stats") },
                                                    { id: "risk", label: tr("overviewSubtabs.risk", "Risk") },
                                                    { id: "daily", label: tr("overviewSubtabs.daily", "Daily") },
                                                ].map((t) => (
                                                    <button
                                                        key={t.id}
                                                        type="button"
                                                        className={[
                                                            "TextSmall rounded-md px-3 py-1.5 transition",
                                                            overviewPanel === t.id
                                                                ? "bg-white text-slate-900 shadow-sm"
                                                                : "text-slate-500 hover:text-slate-900",
                                                        ].join(" ")}
                                                        onClick={() => setOverviewPanel(t.id)}
                                                    >
                                                        {t.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
                                            {overviewPanel === "key" ? (
                                                <>
                                                    <StatCard label="Win rate" value={`${formatNumber(data?.winRate, { decimals: 1 })}%`} />
                                                    <StatCard label="Closed trades" value={formatInteger(data?.totalClosedTrades)} />
                                                    <StatCard label="Profit days" value={formatInteger(data?.profitDays)} />
                                                    <StatCard label="Loss days" value={formatInteger(data?.lossDays)} />
                                                    <StatCard label="Return (All time)" value={`${formatNumber(data?.returnAllTime, { decimals: 2 })}%`} />
                                                    <StatCard label="Return (Quarter)" value={`${formatNumber(data?.returnQuarter, { decimals: 2 })}%`} />
                                                    <StatCard label="Return (Month)" value={`${formatNumber(data?.returnMonth, { decimals: 2 })}%`} />
                                                    <StatCard label="Return (Week)" value={`${formatNumber(data?.returnWeek, { decimals: 2 })}%`} />
                                                    <StatCard label="Return (Day)" value={`${formatNumber(data?.returnDay, { decimals: 2 })}%`} />
                                                </>
                                            ) : overviewPanel === "risk" ? (
                                                <>
                                                    <StatCard label="Max drawdown" value={`${formatNumber(data?.maxDrawdown, { decimals: 2 })}%`} />
                                                    <StatCard label="Downside deviation" value={formatNumber(data?.downsideDeviation, { decimals: 2 })} />
                                                    <StatCard label="Daily return volatility" value={`${formatNumber(data?.dailyReturnVolatility, { decimals: 2 })}%`} />
                                                    <StatCard label="Return volatility" value={`${formatNumber(data?.returnVolatility, { decimals: 2 })}%`} />
                                                    <StatCard label="Recovery factor" value={formatNumber(data?.recoveryFactor, { decimals: 2 })} />
                                                    <StatCard label="Absolute gain" value={`${formatNumber(data?.absoluteGain, { decimals: 2 })}%`} />
                                                </>
                                            ) : (
                                                <>
                                                    <StatCard label="Max daily profit" value={`${formatNumber(data?.maxDailyProfit, { decimals: 2 })}%`} />
                                                    <StatCard label="Max daily loss" value={`${formatNumber(data?.maxDailyLoss, { decimals: 2 })}%`} />
                                                    <StatCard label="Avg daily profit" value={`${formatNumber(data?.averageDailyProfit, { decimals: 2 })}%`} />
                                                    <StatCard label="Avg daily loss" value={`${formatNumber(data?.averageDailyLoss, { decimals: 2 })}%`} />
                                                    <StatCard label="Geometric avg (weekly)" value={`${formatNumber(data?.geometricAverageReturnWeekly, { decimals: 2 })}%`} />
                                                    <StatCard label="Geometric avg (monthly)" value={`${formatNumber(data?.geometricAverageReturnMonthly, { decimals: 2 })}%`} />
                                                </>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {activeTab === "trading" && (
                                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                        <h2 className="HeadingH4 text-slate-900">Trading</h2>
                                        <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3">
                                            <StatCard label="Win rate" value={`${formatNumber(data?.winRate, { decimals: 1 })}%`} />
                                            <StatCard label="Closed trades" value={formatInteger(data?.totalClosedTrades)} />
                                            <StatCard label="Volume (month)" value={formatNumber(data?.volumeMonth, { decimals: 2 })} />
                                            <StatCard label="Profit days" value={formatInteger(data?.profitDays)} />
                                            <StatCard label="Loss days" value={formatInteger(data?.lossDays)} />
                                            <StatCard label="Return (calendar month)" value={`${formatNumber(data?.returnCalendarMonth, { decimals: 2 })}%`} />
                                        </div>
                                    </div>
                                )}

                                {activeTab === "account" && (
                                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                        <h2 className="HeadingH4 text-slate-900">Account</h2>
                                        <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3">
                                            <StatCard label="Balance" value={formatNumber(data?.account?.balance, { decimals: 2 })} />
                                            <StatCard label="Equity" value={formatNumber(data?.account?.equity, { decimals: 2 })} />
                                            <StatCard label="Floating PnL" value={formatNumber(data?.account?.floatingPnL, { decimals: 2 })} />
                                            <StatCard label="Margin" value={formatNumber(data?.account?.margin, { decimals: 2 })} />
                                            <StatCard label="Free margin" value={formatNumber(data?.account?.freeMargin, { decimals: 2 })} />
                                            <StatCard label="Credit" value={formatNumber(data?.account?.credit, { decimals: 2 })} />
                                        </div>
                                    </div>
                                )}

                                {activeTab === "history" && (
                                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                        <div className="flex items-center justify-between gap-4">
                                            <h2 className="HeadingH4 text-slate-900">{tr("equityHistory", "Equity history")}</h2>
                                            <span className="TextSmall text-slate-500">
                                                Entries: {formatInteger(filteredEntries?.length)}
                                            </span>
                                        </div>

                                        <div className="mt-5 overflow-x-auto">
                                            <table className="min-w-[740px] w-full border-separate border-spacing-0">
                                                <thead>
                                                    <tr className="bg-slate-50">
                                                        {["Date", "Return %", "Equity", "Balance", "Profit"].map((h) => (
                                                            <th
                                                                key={h}
                                                                className="TextSmall whitespace-nowrap border-b border-slate-200 px-4 py-3 text-left font-semibold text-slate-600"
                                                            >
                                                                {h}
                                                            </th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {filteredEntries?.slice().reverse().map((e, idx) => (
                                                        <tr key={`${e?.tp || idx}`} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/40"}>
                                                            <td className="TextSmall whitespace-nowrap border-b border-slate-200 px-4 py-3 text-slate-700">
                                                                {e?.tp ? new Date(e.tp).toLocaleDateString() : "-"}
                                                            </td>
                                                            <td className="TextSmall whitespace-nowrap border-b border-slate-200 px-4 py-3 text-slate-700">
                                                                {formatNumber(e?.rt, { decimals: 2 })}%
                                                            </td>
                                                            <td className="TextSmall whitespace-nowrap border-b border-slate-200 px-4 py-3 text-slate-700">
                                                                {formatNumber(e?.ee, { decimals: 2 })}
                                                            </td>
                                                            <td className="TextSmall whitespace-nowrap border-b border-slate-200 px-4 py-3 text-slate-700">
                                                                {formatNumber(e?.eb, { decimals: 2 })}
                                                            </td>
                                                            <td className="TextSmall whitespace-nowrap border-b border-slate-200 px-4 py-3 text-slate-700">
                                                                {formatNumber(e?.rp, { decimals: 2 })}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>


                        {/* Detailed tabs (outside card) */}
                        <div className="flex flex-wrap items-center my-6 gap-5 px-1">
                            {[
                                { id: 1, label: "Return" },
                                { id: 2, label: "Trading" },
                                { id: 3, label: "Trading Markets" },
                                { id: 4, label: "History" },
                            ].map((t) => (
                                <button
                                    key={t.id}
                                    type="button"
                                    className={[
                                        "TextButton relative pb-2 text-slate-500 transition hover:text-slate-900",
                                        tabs === t.id ? "text-slate-900" : "",
                                    ].join(" ")}
                                    onClick={() => setTabs(t.id)}
                                >
                                    {t.label}
                                    {tabs === t.id ? (
                                        <span className="absolute left-0 top-full mt-2 h-[2px] w-full rounded-xl bg-[#FBD400]" />
                                    ) : null}
                                </button>
                            ))}
                        </div>

                        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div>
                                {tabs == 1 ? (
                                    <ReturnLeader data={data} id={data?.accountId} />
                                ) : tabs == 2 ? (
                                    <TradingLeader data={data} id={data?.accountId} tabs={tabs} />
                                ) : tabs == 3 ? (
                                    <InstrumentLeader data={data} id={data?.accountId} tabs={tabs} />
                                ) : tabs == 4 ? (
                                    <HistoryLeader data={data} id={data?.accountId} tabs={tabs} />
                                ) : null}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default LeaderBoardDetail;

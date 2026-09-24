"use client";
import { useState } from "react"
import useGraphDetails from "./useGraphDetails"
import PieChart from "../../../../../components/common/chart/pieChart"
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

const TableRow = ({ text, value, classes }) => {
    return (
        <>
            <div className={`TextSmall p-4 border-b border-slate-200 text-slate-600 ${classes}`}>{text}</div>
            <div className={`TextButton p-4 border-b border-slate-200 text-right text-slate-900 ${classes}`}>{value}</div>
        </>
    )
}

const InstrumentLeader = ({ data, id }) => {
    const tr = usePathTranslation("copyTradingPage.leaderboardDetail.instruments");
    const [filter, setFilter] = useState("count")
    const {
        quarterlyGraphData,
        tableData
    } = useGraphDetails({
        data,
        filter,
        id
    });

    const statRows = [
        { key: "bestTrade", value: `$${tableData?.best?.profit ?? "-"}`, zebra: true },
        { key: "worstTrade", value: `$${tableData?.worst?.profit ?? "-"}` },
        { key: "largestTrade", value: `${tableData?.largest?.volume ?? "-"}`, zebra: true },
        { key: "tradesWon", value: `${tableData?.won?.count ?? "-"}` },
        { key: "tradesLost", value: `${tableData?.lost?.count ?? "-"}`, zebra: true },
        { key: "totalProfit", value: `$${tableData?.total?.profit ?? "-"}` },
        { key: "avgTradeSize", value: `${tableData?.total?.averageTradeSize ?? "-"}`, zebra: true },
        { key: "avgProfitWin", value: `$${tableData?.won?.averageProfitPerTrade ?? "-"}` },
        { key: "avgLossLost", value: `$${tableData?.lost?.averageProfitPerTrade ?? "-"}`, zebra: true },
        { key: "avgPnlTrade", value: `$${tableData?.total?.averageProfitPerTrade ?? "-"}` },
        { key: "avgPnlLot", value: `$${tableData?.total?.averageProfitPerLot ?? "-"}`, zebra: true },
        { key: "avgDuration", value: `${tableData?.averageDuration ?? "-"}`, zebra: true },
    ];

    return (
        <div className="">
            <div className="">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="min-w-0">
                        <h2 className="HeadingH4 text-slate-900">{tr("title", "Instruments")}</h2>
                        <p className="TextSmall mt-1 text-slate-500">{tr("subtitle", "Account's exposure history per symbol")}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 md:justify-end">
                        <button
                            type="button"
                            className={[
                                "TextButton rounded-xl px-4 py-2 transition",
                                filter === "count"
                                    ? "bg-primary text-white"
                                    : "bg-slate-100 text-slate-700 hover:bg-slate-200",
                            ].join(" ")}
                            onClick={() => setFilter("count")}
                        >
                            {tr("count", "Count")}
                        </button>
                        <button
                            type="button"
                            className={[
                                "TextButton rounded-xl px-4 py-2 transition",
                                filter === "volume"
                                    ? "bg-primary text-white"
                                    : "bg-slate-100 text-slate-700 hover:bg-slate-200",
                            ].join(" ")}
                            onClick={() => setFilter("volume")}
                        >
                            {tr("volume", "Volume")}
                        </button>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 md:items-start">
                    <div>
                        <div className="mt-5 overflow-hidden rounded-xl border border-slate-200">
                            <div className="grid grid-cols-2">
                                {statRows.map((row) => (
                                    <TableRow
                                        key={row.key}
                                        text={tr(`stats.${row.key}`, row.key)}
                                        classes={row.zebra ? "bg-slate-50/60" : ""}
                                        value={row.value}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center md:justify-end">
                        <div className="w-full max-w-[520px]">
                            <PieChart height={360} width={"100%"} seriesData={quarterlyGraphData} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InstrumentLeader

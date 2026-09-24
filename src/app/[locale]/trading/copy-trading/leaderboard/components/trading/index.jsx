"use client";

import { useState } from "react"
import ChartDetail from "../singleChart"
import useGraphDetails from "./useGraphDetails"
import ColumnChart from "@/app/[locale]/components/common/chart/index"
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

const TradingLeader = ({ data, id }) => {
    const tr = usePathTranslation("copyTradingPage.leaderboardDetail.trading");
    const [date, setDate] = useState("all")
    const {
        quarterlyGraphData,
    } = useGraphDetails({
        data,
        id
    });

    const periodTabs = [
        { id: "all", key: "periods.all" },
        { id: "3months", key: "periods.threeMonths" },
        { id: "1months", key: "periods.oneMonth" },
        { id: "week", key: "periods.week" },
    ];

    return (
        <div className="space-y-6">
            <div className="">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="min-w-0">
                        <h2 className="HeadingH4 text-slate-900">{tr("title", "Return & Leverage")}</h2>
                        <p className="TextSmall mt-1 text-slate-500">{tr("subtitle", "Return and leverage comparison chart")}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 md:justify-end">
                        {periodTabs.map((t) => (
                            <button
                                key={t.id}
                                type="button"
                                className={[
                                    "TextButton rounded-xl px-4 py-2 transition",
                                    date === t.id
                                        ? "bg-primary text-white"
                                        : "bg-slate-100 text-slate-700 hover:bg-slate-200",
                                ].join(" ")}
                                onClick={() => setDate(t.id)}
                            >
                                {tr(t.key, t.id)}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mt-6">
                    <ChartDetail item={data} height={360} width={"100%"} date={date} label="Return" grid={true} />
                </div>
            </div>

            <div className="">
                <div className="text-left">
                    <h2 className="HeadingH4 text-slate-900">{tr("leverageTitle", "Leverage")}</h2>
                    <p className="TextSmall mt-1 text-slate-500">{tr("leverageSubtitle", "Account leverage history")}</p>
                </div>

                <div className="mt-6">
                    <ColumnChart
                        height={360}
                        width={"100%"}
                        seriesData={quarterlyGraphData}
                        showAxis={true}
                        label={tr("leverageTitle", "Leverage")}
                        strokeWidth={[0]}
                        grid={true}
                        variant="bar"
                    />
                </div>
            </div>
        </div>
    )
}

export default TradingLeader

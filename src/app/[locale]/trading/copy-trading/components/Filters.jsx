"use client";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { GoListUnordered } from "react-icons/go";
import { CgMenuGridO } from "react-icons/cg";
import { useState } from "react";

const Filters = (props) => {
    const { pagination, setPagination, setView, view, messages = {} } = props
    const t = (key, fallback = "") => {
        const parts = key.split(".");
        let cur = messages;
        for (const p of parts) cur = cur?.[p];
        return typeof cur === "string" && cur.length ? cur : fallback;
    };

    const [show, setShow] = useState(false)
    return (
        <div className='container flex justify-between items-center'>
            <div className="flex gap-2  items-center">
                <div className={`rounded-md border cursor-pointer p-1 ${view == "list" ? "border-secondary" : ""}`}
                    onClick={() => { setView("list") }}
                >
                    <GoListUnordered />
                </div>
                <div className={`rounded-md border cursor-pointer p-1 ${view == "grid" ? "border-secondary" : ""}`}
                    onClick={() => { setView("grid") }}
                >
                    <CgMenuGridO />
                </div>
                <div className="dropdown ml-6">
                    <div tabIndex={0} role="button" className="pagination-btn p-2 border text-xs border-secondary rounded-md"
                        onClick={() => setShow(!show)}
                    >{t("rating.filters.orderByLabel", "Order by")}: {pagination?.orderBy?.name}</div>
                    {show &&
                        <ul tabIndex={0} className="dropdown-content bg-white menu rounded-box z-[1] w-52 shadow"
                        >
                            <li className="p-2 cursor-pointer rounded-sm hover:bg-[#e9e9e99c] "
                                onClick={() => {
                                    setPagination((st) => ({
                                        ...st, orderBy: {
                                            ...st.orderBy,
                                            name: "Balance",
                                            value: "account/balance asc"
                                        }
                                    }))
                                    setShow(false)
                                }}
                            >
                                {t("rating.filters.options.balance", "Balance")}
                            </li>
                            <li className="p-2 cursor-pointer rounded-sm hover:bg-[#e9e9e99c] "
                                onClick={() => {
                                    setPagination((st) => ({
                                        ...st, orderBy: {
                                            ...st.orderBy,
                                            name: t("rating.filters.options.averageProfit", "Average profit"),
                                            value: "averageDailyProfit asc"
                                        }
                                    }))
                                    setShow(false)

                                }}
                            >
                                {t("rating.filters.options.averageProfit", "Average profit")}
                            </li>
                            <li className="p-2 cursor-pointer rounded-sm hover:bg-[#e9e9e99c] "
                                onClick={() => {
                                    setPagination((st) => ({
                                        ...st, orderBy: {
                                            ...st.orderBy,
                                            name: t("rating.filters.options.deposits", "Deposits"),
                                            value: "grossDepositMonth asc"
                                        }
                                    }))
                                    setShow(false)

                                }}
                            >
                                {t("rating.filters.options.deposits", "Deposits")}
                            </li>
                            <li className="p-2 cursor-pointer rounded-sm hover:bg-[#e9e9e99c] "
                                onClick={() => {
                                    setPagination((st) => ({
                                        ...st, orderBy: {
                                            ...st.orderBy,
                                            name: t("rating.filters.options.rating", "Rating"),
                                            value: "rank asc"
                                        }
                                    }))
                                    setShow(false)
                                }}
                            >
                                {t("rating.filters.options.rating", "Rating")}
                            </li>
                        </ul>
                    }
                </div>
            </div>
            <div className='r-pagination flex gap-2 items-center'>
                <button disabled={pagination?.skip == 12} className='pagination-btn p-2 border border-secondary rounded-md'
                    onClick={() => {
                        setPagination(st => ({ ...st, skip: st.skip - 12 }))
                    }}
                >
                    <FaChevronLeft className=" text-secondary" />
                </button>
                <span className=" text-xs">{pagination?.skip} {t("rating.filters.ofLabel", "OF")} {pagination?.total||100}</span>
                <button disabled={pagination?.total == pagination?.skip + 12} className='pagination-btn p-2 border border-secondary rounded-md'
                    onClick={() => {
                        setPagination(st => ({ ...st, skip: st.skip + 12 }))
                    }}
                >
                    <FaChevronRight className=" text-secondary" />
                </button>
            </div>
        </div>
    )
}

export default Filters
"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";
import TopPerformer from "./TopPerfermer";
import CopyRatingFeaturesRow from "./CopyRatingFeaturesRow";
import CopyRatingLeaderboardTable from "./CopyRatingLeaderboardTable";

const PAGE_SIZE = 12;

export default function CopyRatingData() {
    const t = usePathTranslation("copyTradingPage.rating");
    const [featuredData, setFeaturedData] = useState(null);
    const [tableData, setTableData] = useState(null);
    const [featuredLoading, setFeaturedLoading] = useState(true);
    const [tableLoading, setTableLoading] = useState(true);
    const [pagination, setPagination] = useState({
        total: 0,
        skip: 0,
    });

    useEffect(() => {
        axios
            .get(
                `${process.env.NEXT_PUBLIC_LEADER_URL}rating/1?%24top=100&widget_key=social_platform_ratings`
            )
            .then((res) => {
                setFeaturedData(res?.data);
                setFeaturedLoading(false);
            })
            .catch((err) => {
                console.log({ err });
                setFeaturedLoading(false);
            });
    }, []);

    useEffect(() => {
        setTableLoading(true);
        axios
            .get(
                `${process.env.NEXT_PUBLIC_LEADER_URL}rating/1?$top=${PAGE_SIZE}&widget_key=social_platform_ratings&$count=true&$orderby=rank asc&$skip=${pagination.skip}`
            )
            .then((res) => {
                setTableData(res?.data);
                setPagination((state) => ({
                    ...state,
                    total: res?.data?.count ?? 0,
                }));
                setTableLoading(false);
            })
            .catch((err) => {
                console.log({ err });
                setTableLoading(false);
            });
    }, [pagination.skip]);

    const featuredItems = useMemo(
        () => featuredData?.items || [],
        [featuredData]
    );
    const tableItems = useMemo(() => tableData?.items || [], [tableData]);

    const canGoPrev = pagination.skip > 0;
    const canGoNext = pagination.total > pagination.skip + PAGE_SIZE;

    return (
        <section className="bg-[#F8F9FD] py-8 md:py-16">
            <div className="container min-w-0 max-w-full">
                <div className="mx-auto max-w-6xl">
                    <div className="text-center">
                        <span className="inline-flex items-center gap-2 rounded-full border border-[#E1E7F6] bg-[#F7F9FF] px-4 py-2 text-sm font-medium text-[#293B93]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="5" height="5" viewBox="0 0 5 5" fill="none">
                                <circle cx="2.5" cy="2.5" r="2.5" fill="#12BA82" />
                            </svg>
                            {t("badge")}
                        </span>

                        <h2 className="HeadingH1 uppercase mx-auto mt-4 max-w-3xl font-semibold leading-[1.4] text-[#000032]">
                            {t("title")}
                        </h2>

                        <p className="Text mx-auto mt-2 max-w-2xl font-normal leading-[1.7] text-[#4E4E4E]">
                            {t("description")}
                        </p>
                    </div>

                    <TopPerformer items={featuredItems} loading={featuredLoading} />

                    <CopyRatingFeaturesRow />

                    <div className="">
                        <CopyRatingLeaderboardTable items={tableItems} loading={tableLoading} />

                        <div className="mt-6 flex items-center justify-end gap-3">
                            <button
                                type="button"
                                disabled={!canGoPrev}
                                className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#E1E7F6] bg-white text-[#293B93] transition hover:border-[#293B93] disabled:cursor-not-allowed disabled:opacity-40"
                                onClick={() =>
                                    setPagination((state) => ({
                                        ...state,
                                        skip: Math.max(0, state.skip - PAGE_SIZE),
                                    }))
                                }
                                aria-label={t("pagination.previous")}
                            >
                                <FaChevronLeft />
                            </button>
                            <span className="text-sm text-[#69729F]">
                                {pagination.skip + 1}-{Math.min(pagination.skip + PAGE_SIZE, pagination.total || PAGE_SIZE)}{" "}
                                {t("pagination.of")} {pagination.total || PAGE_SIZE}
                            </span>
                            <button
                                type="button"
                                disabled={!canGoNext}
                                className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#E1E7F6] bg-white text-[#293B93] transition hover:border-[#293B93] disabled:cursor-not-allowed disabled:opacity-40"
                                onClick={() =>
                                    setPagination((state) => ({
                                        ...state,
                                        skip: state.skip + PAGE_SIZE,
                                    }))
                                }
                                aria-label={t("pagination.next")}
                            >
                                <FaChevronRight />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

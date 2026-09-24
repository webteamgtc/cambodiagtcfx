import { useMemo } from "react";
import { useRouter } from "next/navigation";
import ChartWrapperComponent from "../../../components/common/chart/ChartWrapper";
import LeaderCardGridItem from "../../../components/common/leaderboard/LeaderCardGridItem";
import {
  buildGtccopySubscriptionUrl,
  formatInteger,
  formatMoney,
  formatPercent,
  getLeaderCardAvatar,
  getLeaderCardCountryCode,
} from "../../../components/common/leaderboard/leaderboardCardUtils";

const LeaderCard = (props) => {
  const { data, view, messages = {} } = props;
  const router = useRouter();
  const t = (key, fallback = "") => {
    const parts = key.split(".");
    let cur = messages;
    for (const p of parts) cur = cur?.[p];
    return typeof cur === "string" && cur.length ? cur : fallback;
  };

  const items = useMemo(() => data?.items || [], [data]);
  return (
    <div className="container mt-6">
      {view == "grid" ? (
        <div className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3">
          {items?.map((single, index) => (
            <LeaderCardGridItem
              key={single?.profileId ?? index}
              item={single}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-x-5 gap-y-2">
          {items?.map((single, index) => {
            const countryCode = getLeaderCardCountryCode(single);
            const avatar = getLeaderCardAvatar(single);

            const pnlText = formatMoney(single?.totalProfit);
            const roiText = formatPercent(single?.maxProfit);
            return (
              <div
                key={single?.profileId ?? index}
                className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md"
                onClick={() => {
                  router.push(`/leaderboard/${single?.profileId}`);
                }}
              >
                <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-[1fr_260px_140px] md:items-center md:p-5">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        className="h-12 w-12 rounded-xl object-cover"
                        src={avatar}
                        alt=""
                      />
                      <div className="absolute -right-1 top-0 h-4 w-4 overflow-hidden rounded-xl ring-2 ring-white">
                        {countryCode?.length > 3 || countryCode === "" ? (
                          <img
                            className="h-full w-full object-cover"
                            src={avatar}
                            alt=""
                          />
                        ) : (
                          <img
                            className="h-full w-full object-cover"
                            src={`https://flagcdn.com/96x72/${countryCode}.webp`}
                            alt=""
                          />
                        )}
                      </div>
                    </div>
                    <div className="min-w-0">
                      <p className="TextButton truncate text-slate-900">
                        {single?.accountName}
                      </p>
                      <p className="TextSmall mt-1 text-slate-500">
                        #{formatInteger(single?.rank)} ·{" "}
                        {single?.account?.country || "-"} ·{" "}
                        {single?.account?.leverage
                          ? `1:${formatInteger(single?.account?.leverage)}`
                          : "-"}{" "}
                        · {single?.account?.currency || "-"}
                      </p>
                      <p className="TextSmall mt-1 text-slate-500">
                        {t("rating.list.pnlLabel", "30D PNL")}:{" "}
                        <span className="text-emerald-600">{pnlText}</span> ·
                        {t("rating.list.roiLabel", "ROI")}:{" "}
                        <span className="text-emerald-600">{roiText}</span>
                      </p>
                    </div>
                  </div>

                  <div className="min-h-[70px]">
                    <ChartWrapperComponent
                      item={single}
                      height={70}
                      width={250}
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="TextButton rounded-lg bg-secondary px-5 py-2.5 text-white transition hover:brightness-95"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(
                          buildGtccopySubscriptionUrl(single?.accountId),
                          "_blank"
                        );
                      }}
                    >
                      {t("rating.list.copyButton", "Copy")}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default LeaderCard;

"use client";

import { useRouter } from "next/navigation";
import ChartWrapperComponent from "@/app/[locale]/components/common/chart/ChartWrapper";
import {
  buildGtccopySubscriptionUrl,
  formatInteger,
  formatMoney,
  formatNumber,
  formatPercent,
  getLeaderCardAvatar,
  getLeaderCardCountryCode,
  pickAumFromHistory,
} from "@/app/[locale]/components/common/leaderboard/leaderboardCardUtils";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

function valueToneClass(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return "text-[#000032]";
  return n >= 0 ? "text-emerald-500" : "text-red-500";
}

function LeaderboardRow({ item, onNavigate }) {
  const t = usePathTranslation("copyTradingPage.rating.list");
  const countryCode = getLeaderCardCountryCode(item);
  const avatar = getLeaderCardAvatar(item);
  const statAum =
    pickAumFromHistory(item) ??
    item?.account?.equity ??
    item?.account?.balance ??
    null;
  const statSharpe = item?.sharpeRatio ?? item?.account?.sharpeRatio ?? null;

  return (
    <tr
      className="group cursor-pointer border-b border-[#E8EDFA] transition hover:bg-[#FAFBFE]"
      onClick={() => onNavigate(item)}
    >
      <td className="px-4 py-2 text-sm font-medium text-[#293B93] md:px-5">
        #{formatInteger(item?.rank)}
      </td>
      <td className="px-4 py-2 md:px-5">
        <div className="flex min-w-[180px] items-center gap-3">
          <div className="relative shrink-0">
            <img
              className="h-10 w-10 rounded-xl object-cover"
              src={avatar}
              alt=""
            />
            {countryCode ? (
              <div className="absolute -right-1 top-0 h-4 w-4 overflow-hidden rounded-full ring-2 ring-white">
                <img
                  className="h-full w-full object-cover"
                  src={`https://flagcdn.com/96x72/${countryCode}.webp`}
                  alt=""
                />
              </div>
            ) : null}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[#000032]">
              {item?.accountName}
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-[#69729F]">
              <span>{item?.account?.country || "-"}</span>
              <span className="rounded-md bg-[#EEF2FF] px-2 py-0.5 font-medium text-[#293B93]">
                API
              </span>
            </div>
          </div>
        </div>
      </td>
      <td className={`px-4 py-2 text-sm font-semibold md:px-5 ${valueToneClass(item?.totalProfit)}`}>
        {formatMoney(item?.totalProfit)}
      </td>
      <td className={`px-4 py-2 text-sm font-semibold md:px-5 ${valueToneClass(item?.maxProfit)}`}>
        {formatPercent(item?.maxProfit)}
      </td>
      <td className="px-4 py-2 md:px-5">
        <div className="min-w-[96px]">
          <ChartWrapperComponent item={item} height={42} width={96} />
        </div>
      </td>
      <td className="px-4 py-2 text-sm font-medium text-[#9AA2B3] md:px-5">
        {statAum == null ? "-" : formatNumber(statAum, { decimals: 2 })}
      </td>
      <td className="px-4 py-2 text-sm font-medium text-[#9AA2B3] md:px-5">
        {statSharpe == null ? "-" : formatNumber(statSharpe, { decimals: 2 })}
      </td>
      <td className="px-4 py-2 md:px-5">
        <button
          type="button"
          className="rounded-lg bg-[#293B93] px-4 py-2 text-xs font-medium text-white transition hover:bg-[#1f2d75]"
          onClick={(event) => {
            event.stopPropagation();
            window.open(buildGtccopySubscriptionUrl(item?.accountId), "_blank");
          }}
        >
          {t("copyButton")}
        </button>
      </td>
    </tr>
  );
}

export default function CopyRatingLeaderboardTable({ items = [], loading = false }) {
  const t = usePathTranslation("copyTradingPage.rating.table");
  const router = useRouter();

  const handleNavigate = (item) => {
    if (item?.profileId != null) {
      router.push(`/trading/copy-trading/leaderboard/${item.profileId}`);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-44 items-center justify-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="rounded-2xl border border-[#E8EDFA] bg-white px-6 py-12 text-center text-sm text-[#69729F]">
        {t("emptyState")}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[20px] border border-[#E8EDFA] bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-[920px] w-full border-collapse">
          <thead>
            <tr className="border-b border-[#E8EDFA] bg-[#fff] text-left">
              <th className="px-4 py-4 text-xs font-normal uppercase tracking-[0.08em] text-[#9AA2B3] md:px-5">
                {t("rank")}
              </th>
              <th className="px-4 py-4 text-xs font-normal uppercase tracking-[0.08em] text-[#9AA2B3] md:px-5">
                {t("trader")}
              </th>
              <th className="px-4 py-4 text-xs font-normal uppercase tracking-[0.08em] text-[#9AA2B3] md:px-5">
                {t("pnl")}
              </th>
              <th className="px-4 py-4 text-xs font-normal uppercase tracking-[0.08em] text-[#9AA2B3] md:px-5">
                {t("roi")}
              </th>
              <th className="px-4 py-4 text-xs font-normal uppercase tracking-[0.08em] text-[#9AA2B3] md:px-5">
                {t("trend")}
              </th>
              <th className="px-4 py-4 text-xs font-normal uppercase tracking-[0.08em] text-[#9AA2B3] md:px-5">
                {t("aum")}
              </th>
              <th className="px-4 py-4 text-xs font-normal uppercase tracking-[0.08em] text-[#9AA2B3] md:px-5">
                {t("sharpe")}
              </th>
              <th className="px-4 py-4 md:px-5" aria-hidden />
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <LeaderboardRow
                key={item?.profileId ?? index}
                item={item}
                onNavigate={handleNavigate}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

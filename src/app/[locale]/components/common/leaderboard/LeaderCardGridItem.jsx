"use client";

import { useRouter } from "next/navigation";
import ChartWrapperComponent from "../chart/ChartWrapper";
import {
  buildGtccopySubscriptionUrl,
  formatInteger,
  formatMoney,
  formatNumber,
  formatPercent,
  getLeaderCardAvatar,
  getLeaderCardCountryCode,
  pickAumFromHistory,
} from "./leaderboardCardUtils";

const EXCLUDED_COUNTRY_CODES = new Set(["JP", "KR", "IR", "GB", "AU", "US"]);
const EXCLUDED_COUNTRY_NAMES = [
  "japan",
  "korea",
  "iran",
  "united kingdom",
  "australia",
  "united states",
  "usa",
];

function isExcludedCountry(item) {
  const code = String(item?.account?.countryCode || "").toUpperCase();
  if (EXCLUDED_COUNTRY_CODES.has(code)) return true;

  const countryName = String(item?.account?.country || "").toLowerCase();
  return EXCLUDED_COUNTRY_NAMES.some((name) => countryName.includes(name));
}

function OutlineStarIcon() {
  return (
    <svg
      className="h-4 w-4 shrink-0 text-[#C5CBE0]"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
    >
      <path
        d="M10 2.5L12.1 7.4L17.5 8.1L13.4 11.9L14.4 17.3L10 14.7L5.6 17.3L6.6 11.9L2.5 8.1L7.9 7.4L10 2.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MetaDot() {
  return <span className="h-1 w-1 shrink-0 rounded-full bg-[#C5CBE0]" aria-hidden />;
}

/**
 * Grid-style copy-trading / leaderboard card (avatar, PNL, chart, AUM/MDD/Sharpe, actions).
 */
export default function LeaderCardGridItem({
  item,
  getDetailPath = (i) =>
    i?.profileId != null ? `/trading/copy-trading/leaderboard/${i.profileId}` : "#",
  getCopyProviderId = (i) => i?.profileId,
  chartHeight = 100,
  chartWidth = "100%",
  showMockButton = true,
  mockButtonLabel = "Mock",
  onMockClick,
  highlighted = false,
  isTopOne = false,
  topBadgeLabel = "TOP 1",
  className = "",
}) {
  const router = useRouter();
  const countryCode = getLeaderCardCountryCode(item);
  const avatar = getLeaderCardAvatar(item);

  if (isExcludedCountry(item)) {
    return null;
  }

  const statAum =
    pickAumFromHistory(item) ??
    item?.account?.equity ??
    item?.account?.balance ??
    null;
  const statMdd =
    item?.maxDrawdown ?? item?.mdd ?? item?.account?.mdd ?? null;
  const statSharpe =
    item?.sharpeRatio ?? item?.account?.sharpeRatio ?? null;

  const pnlText = formatMoney(item?.totalProfit);
  const roiText = formatPercent(item?.maxProfit);
  const pnlTone =
    Number(item?.totalProfit) >= 0 ? "text-[#1FA363]" : "text-[#D3402F]";
  const roiTone =
    Number(item?.maxProfit) >= 0 ? "text-[#1FA363]" : "text-[#D3402F]";
  const copyUrl = buildGtccopySubscriptionUrl(getCopyProviderId(item));
  const mockUrl = "https://gtccopy.com/portal/login";

  const handleCardClick = () => {
    const href = getDetailPath(item);
    if (href && href !== "#") router.push(href);
  };

  const leverageText = item?.account?.leverage
    ? formatInteger(item?.account?.leverage)
    : "-";

  return (
    <div
      className={`group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(41,59,147,0.12)] 
        } ${className}`.trim()}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleCardClick();
        }
      }}

      style={{
        boxShadow: "0 4px 30px rgba(41, 59, 147, 0.10);",
      }}
    >
      <div className="flex h-full flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="relative shrink-0">
              <img
                className="h-12 w-12 rounded-xl object-cover"
                src={avatar}
                alt=""
              />
              <div className="absolute -right-1 -top-0.5 h-4 w-4 overflow-hidden rounded-full ring-2 ring-white">
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
              <div className="flex items-center gap-1.5">
                <h4 className="TextButton truncate font-semibold text-[#000032]">
                  {item?.accountName}
                </h4>
                <OutlineStarIcon />
              </div>

              <div className="text-xs font-normal mt-0.5 flex flex-wrap items-center gap-1 text-[#8891A8]">
                <span>#{formatInteger(item?.rank)}</span>
                <MetaDot />
                <span>{item?.account?.country || "-"}</span>
                <MetaDot />
                <span>{leverageText}</span>
                <MetaDot />
                <span>{item?.account?.currency || "-"}</span>
              </div>
            </div>
          </div>

          <span className="shrink-0 rounded-md bg-[#F3F6FD] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#69729F]">
            API
          </span>
        </div>

        <div className="mt-4 w-full min-h-[92px]">
          <ChartWrapperComponent
            item={item}
            height={chartHeight}
            width={chartWidth}
          />
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4 items-end">
          <div className="min-w-0 text-left">
            <p className="text-[11px] font-normal uppercase tracking-[0.06em] text-[#8891A8]">
              30 Days PNL (USD)
            </p>
            <p className={`HeadingH4 mt-1 font-semibold leading-none ${pnlTone}`}>
              {pnlText}
            </p>
          </div>

          <div className="min-w-0 text-right">
            <p className="text-[11px] font-normal uppercase tracking-[0.06em] text-[#8891A8]">
              30 Days ROI
            </p>
            <p className={`HeadingH5 mt-1 font-semibold leading-none ${roiTone}`}>
              {roiText}
            </p>
          </div>
        </div>

        <div className="my-3 border-t border-[#EDEFF5]" />

        <div className="grid grid-cols-3 gap-3">
          <div className="min-w-0">
            <p className="text-[11px] font-normal uppercase tracking-[0.06em] text-[#8891A8]">
              AUM
            </p>
            <p className="TextButton mt-1 font-semibold text-[#000032]">
              {statAum == null ? "-" : formatNumber(statAum, { decimals: 2 })}
            </p>
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-normal uppercase tracking-[0.06em] text-[#8891A8]">
              30 Days MDD
            </p>
            <p className="TextButton mt-1 font-semibold text-[#000032]">
              {statMdd == null
                ? "-"
                : `${formatNumber(statMdd, { decimals: 2 })}%`}
            </p>
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-normal uppercase tracking-[0.06em] text-[#8891A8]">
              Sharpe Ratio
            </p>
            <p className="TextButton mt-1 font-semibold text-[#000032]">
              {statSharpe == null
                ? "-"
                : formatNumber(statSharpe, { decimals: 2 })}
            </p>
          </div>
        </div>

        <div className="mt-auto grid grid-cols-2 gap-3 pt-2">
          {showMockButton ? (
            <button
              type="button"
              className="TextButton rounded-xl bg-[#EEF2FF] py-3 font-medium text-[#293B93] transition hover:bg-[#E3E9FF]"
              onClick={(e) => {
                e.stopPropagation();
                if (onMockClick) {
                  onMockClick(item);
                } else {
                  window.open(mockUrl, "_blank");
                }
              }}
            >
              {mockButtonLabel}
            </button>
          ) : null}
          <button
            type="button"
            className={`TextButton rounded-xl py-3 font-semibold text-white transition hover:brightness-95 ${showMockButton ? "" : "col-span-2"
              } ${highlighted
                ? "bg-[#B8935A] hover:bg-[#a6834f]"
                : "bg-[#293B93] hover:bg-[#1f2d75]"
              }`}
            onClick={(e) => {
              e.stopPropagation();
              window.open(copyUrl, "_blank");
            }}
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
}

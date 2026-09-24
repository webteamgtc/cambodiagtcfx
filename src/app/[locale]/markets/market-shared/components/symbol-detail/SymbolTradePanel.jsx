"use client";

import clsx from "clsx";
import { REGISTER_HREF } from "../../assetMarketData";
import { formatSwap } from "../../symbolDetailConfig";

function SideButton({ side, price }) {
  const isSell = side === "sell";

  return (
    <a
      href={REGISTER_HREF}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        "flex flex-1 flex-col items-center justify-center px-4 py-5 text-center text-white transition hover:opacity-95",
      )}
      style={isSell ? {
        borderRadius: "20px",
        background: "linear-gradient(270deg, #DF2B2B 0%, #FA4D4D 100%)",
      } : {
        borderRadius: "20px",
        background: "linear-gradient(270deg, #069A6C 0%, #0EB47D 100%)",
      }}
    >
      <span className="TextSmall font-medium uppercase"
        style={isSell ? {
          color: "#FDCDD3",
        } : {
          color: "#ADE3CB",
        }}
      >
        {isSell ? "Sell" : "Buy"}
      </span>
      <span className="mt-1 HeadingH3 font-semibold tabular-nums">{price}</span>
      <span className="mt-1 TextSmall font-medium uppercase"
        style={isSell ? {
          color: "#FDCDD3",
        } : {
          color: "#ADE3CB",
        }}

      >
        {isSell ? "Bid" : "Ask"}
      </span>
    </a>
  );
}

function StatCell({ label, value, tone }) {
  return (
    <div className="rounded-xl bg-[#F1F5F9] px-4 py-3">
      <p className="text-xs font-normal text-[#666]">{label}</p>
      <p
        className={clsx(
          "mt-0.5 TextSmall font-medium tabular-nums",
          tone === "neg" && "text-[#E8344B]",
          tone === "pos" && "text-[#1BAF6E]",
          !tone && "text-[#000]"
        )}
      >
        {value}
      </p>
    </div>
  );
}

export default function SymbolTradePanel({
  sellPrice,
  buyPrice,
  spread,
  dayHigh,
  dayLow,
  swapLong,
  swapShort,
}) {
  const longTone =
    Number(swapLong) > 0 ? "pos" : Number(swapLong) < 0 ? "neg" : undefined;
  const shortTone =
    Number(swapShort) > 0 ? "pos" : Number(swapShort) < 0 ? "neg" : undefined;

  return (
    <div className="flex h-full flex-col">
      <div className="flex gap-3">
        <SideButton side="sell" price={sellPrice} />
        <SideButton side="buy" price={buyPrice} />
      </div>

      <div className="mt-4 flex justify-center">
        <span className="inline-flex items-center rounded-full bg-[#F1F5F9] px-4 py-1.5 text-sm font-medium text-[#293B93]">
          <span className="text-[#666] pr-1">  Spread:{" "} </span>{" "} {spread} pips
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <StatCell label="Day High" value={dayHigh} />
        <StatCell label="Day Low" value={dayLow} />
        <StatCell label="Swap Long" value={formatSwap(swapLong)} tone={longTone} />
        <StatCell label="Swap Short" value={formatSwap(swapShort)} tone={shortTone} />
      </div>
    </div>
  );
}

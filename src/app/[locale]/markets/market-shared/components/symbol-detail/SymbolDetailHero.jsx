"use client";

import clsx from "clsx";
import { formatChartPrice } from "../SymbolKlineChart";

function LiveBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#DCE2F6] px-3 py-1.5 text-xs font-normal uppercase tracking-[0.06em] text-[#293B93]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#293B93]" aria-hidden />
      Live Quote
    </span>
  );
}

function CategoryBadge({ label }) {
  return (
    <span className="inline-flex items-center rounded-full px-3 py-1.5 text-xs font-normal uppercase tracking-[0.06em] text-[#293B93]">
      GTCFX - {label}
    </span>
  );
}

function ChangePill({ changeAbs, changePct, changePositive, digits }) {
  if (changeAbs == null || changePct == null) return null;

  const positive = changePositive !== false;
  const absText = `${positive ? "+" : ""}${formatChartPrice(changeAbs, digits)}`;
  const pctText = `${positive ? "+" : ""}${changePct.toFixed(2)}%`;

  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-5 py-1.5 text-xs font-normal",
        positive ? "bg-[#E6FFF4] text-[#1BAF6E]" : "bg-[#FDECEC] text-[#CF4548]"
      )}
    >
      {pctText} ({absText})
    </span>
  );
}

export default function SymbolDetailHero({
  categoryLabel,
  displaySymbol,
  subtitle,
  midPrice,
  changeAbs,
  changePct,
  changePositive,
  digits,
}) {
  return (
    <header className="mb-6 md:mb-8">
      <div className="flex flex-wrap items-center gap-2">
        <LiveBadge />
        <CategoryBadge label={categoryLabel} />
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1">
        <h1 className="HeadingH1 font-semibold tracking-tight text-[#000]">
          {displaySymbol}
        </h1>
        <p className="Text leading-snug text-[#4E4E4E]">{subtitle}</p>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <p className="HeadingH3 font-semibold tracking-tight text-[#293B93]">{midPrice}</p>
        <ChangePill
          changeAbs={changeAbs}
          changePct={changePct}
          changePositive={changePositive}
          digits={digits}
        />
      </div>
    </header>
  );
}

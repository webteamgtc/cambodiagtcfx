"use client";

import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

const HIGHLIGHT_ROWS = [
  { key: "aapl", symbol: "AAPL", eventKey: "exDividend", date: "Aug 12" },
  { key: "msft", symbol: "MSFT", eventKey: "earnings", date: "Jul 22" },
  { key: "nvda", symbol: "NVDA", eventKey: "earnings", date: "Aug 28" },
  { key: "spx", symbol: "US500", eventKey: "indexDividend", date: "Sep 03" },
];

export default function EarningsHighlightPanel() {
  const t = usePathTranslation("earningsPage.hero");

  return (
    <div className="rounded-2xl border border-[#e8ecf8] bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-[#5a5a6e]">
          {t("highlightTitle", "Upcoming · Corporate Events")}
        </span>
        <span className="flex items-center gap-1.5 text-sm font-medium text-[#2eab71]">
          <span className="relative inline-flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2eab71] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2eab71]" />
          </span>
          {t("highlightStatus", "Live")}
        </span>
      </div>

      <div className="mt-4 divide-y divide-[#f0f1f6]">
        {HIGHLIGHT_ROWS.map((row) => (
          <div key={row.key} className="flex items-center justify-between py-3.5">
            <div>
              <p className="text-[15px] font-semibold text-[#02002f]">{row.symbol}</p>
              <p className="mt-0.5 text-xs text-[#8a8a9a]">
                {t(`highlight.events.${row.eventKey}`, row.eventKey)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[15px] font-semibold text-[#02002f]">{row.date}</p>
              <p className="mt-0.5 text-xs font-medium text-[#3347a8]">
                {t("highlight.timezone", "GMT+3")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

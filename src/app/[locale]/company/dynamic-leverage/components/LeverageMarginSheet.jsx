"use client";

import { usePathTranslation } from "@/app/[locale]/LocaleProvider";
import { useLeverageMarginSheet, MARGIN_SHEET_ROWS } from "../hooks/useLeverageMarginSheet";

function MarginSheetSkeleton() {
  return (
    <div className="mt-4 divide-y divide-[#f0f1f6]">
      {Array.from({ length: MARGIN_SHEET_ROWS.length }).map((_, index) => (
        <div key={index} className="flex animate-pulse items-center justify-between py-3.5">
          <div className="space-y-2">
            <div className="h-4 w-24 rounded bg-[#e8ecf8]" />
            <div className="h-3 w-32 rounded bg-[#f0f1f6]" />
          </div>
          <div className="space-y-2 text-right">
            <div className="ml-auto h-4 w-20 rounded bg-[#e8ecf8]" />
            <div className="ml-auto h-3 w-14 rounded bg-[#f0f1f6]" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function LeverageMarginSheet() {
  const t = usePathTranslation("dynamicLeveragePage.hero");
  const { rows, leverageLoading, isStreaming } = useLeverageMarginSheet();

  return (
    <div className="rounded-2xl border border-[#e8ecf8] bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-[#5a5a6e]">
          {t("marginSheetTitle", "Live · Margin Sheet")}
        </span>
        <span className="flex items-center gap-1.5 text-sm font-medium text-[#2eab71]">
          <span className="relative inline-flex h-2 w-2">
            {isStreaming ? (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2eab71] opacity-75" />
            ) : null}
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2eab71]" />
          </span>
          {t("streaming", "Streaming")}
        </span>
      </div>

      {leverageLoading ? (
        <MarginSheetSkeleton />
      ) : (
        <div className="mt-4 divide-y divide-[#f0f1f6]">
          {rows.map((row) => (
            <div key={row.key} className="flex items-center justify-between py-3.5">
              <div>
                <p className="text-[15px] font-semibold text-[#02002f]">{row.symbol}</p>
                {row.leverage && row.margin ? (
                  <p className="mt-0.5 text-xs text-[#8a8a9a]">
                    {row.leverage} · {row.margin}
                  </p>
                ) : null}
              </div>
              <div className="text-right">
                <p className="text-[15px] font-semibold text-[#02002f]">{row.price}</p>
                <p
                  className={`mt-0.5 text-xs font-medium ${
                    row.up ? "text-[#2eab71]" : "text-[#e04a4a]"
                  }`}
                >
                  {row.change}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

const tickerItems = [
  { pair: "USD/JPY", price: "156.842", change: "+0.08%", up: true },
  { pair: "USD/JPY", price: "156.842", change: "-0.18%", up: false },
  { pair: "USD/JPY", price: "156.842", change: "+0.08%", up: true },
  { pair: "USD/JPY", price: "156.842", change: "+0.08%", up: true },
  { pair: "USD/JPY", price: "156.842", change: "-0.18%", up: false },
];

export default function LeverageTickerSection() {
  const t = usePathTranslation("dynamicLeveragePage.ticker");

  return (
    <section className="relative border-y border-[#e8ecf8] bg-white py-4">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto flex max-w-6xl items-center gap-6 overflow-x-auto">
          {tickerItems.map((item, index) => (
            <div key={index} className="flex shrink-0 items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-[15px] font-semibold text-[#02002f]">{item.pair}</span>
                <span className="text-[13px] text-[#8a8a9a]">{item.price}</span>
                <span className={`text-[13px] font-medium ${item.up ? "text-[#2eab71]" : "text-[#e04a4a]"}`}>
                  {item.change}
                </span>
              </div>
              {index < tickerItems.length - 1 && (
                <span className="h-4 w-px bg-[#e8ecf8]" />
              )}
            </div>
          ))}
          <span className="ml-auto shrink-0 text-[13px] text-[#8a8a9a]">
            {t("lastUpdate", "Last Update · 14:32 Gmt")}
          </span>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathTranslation } from "../../LocaleProvider";
import { localizedHref } from "@/i18n/localizedHref";
import Button from "@/app/[locale]/components/common/Button";
const LEVERAGE_POINTS = [
  {
    key: "multiplier",
    title: "Leverage Multiplier Effect",
    description: "Leverage amplifies both losses and profits equally. A 1% market move on a 1:100 leveraged position results in a 100% gain or loss on your margin — understanding this relationship is essential before trading with leverage.",
  },
  {
    key: "margin",
    title: "Leverage Ratio & Margin Relationship",
    description:
      "Leverage multiple determines required margin ratio: Margin = Position Value ÷ Leverage",
  },
  {
    key: "lots",
    title: "Contract Size & Lot Size",
    description:
      "Standard Lot = 100,000 Base Currency Units\nMini Lot (0.01 Lot) = 1,000 Base Currency Units",
  },
 
];

/** Replace chartCard / tradingCard with your final artwork when ready */
const LEVERAGE_VISUALS = {
  chartCard: "/new-design/line-chart-new.webp",
  tradingCard: "/new-design/candle.svg",
};

function SavingGoalCard() {
  return (
    <div className="rounded-2xl border border-[#eef1f6] bg-white p-4 shadow-[0_12px_36px_rgba(15,23,42,0.08)] sm:p-5">
      <p className="TextSmall font-medium text-[#9ca3af]">Saving Goal</p>
      <p className="mt-0.5 text-[11px] text-[#c4c9d4]">Data from mon 20-Aug 27 2025</p>
      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="text-[22px] font-semibold tracking-tight text-[#2b3d8f] sm:text-[24px]">
          $2,390.00
        </p>
        <div
          className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full"
          style={{
            background:
              "conic-gradient(#2b3d8f 0deg 288deg, #e8ecf4 288deg 360deg)",
          }}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[11px] font-semibold text-[#2b3d8f]">
            80%
          </span>
        </div>
      </div>
    </div>
  );
}

function ChartCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#eef1f6] bg-white shadow-[0_12px_36px_rgba(15,23,42,0.08)]">
      <Image src={LEVERAGE_VISUALS.chartCard} alt="" width={600} height={400} className="w-full h-auto" />
    </div>
  );
}

function TradingCard() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#eef1f6] bg-white shadow-[0_16px_40px_rgba(15,23,42,0.1)]">
      <div className="border-b border-[#f1f3f7] px-4 py-3">
        <p className="text-center text-[13px] font-semibold text-[#111827]">EURUSD</p>
      </div>
      <div className="relative min-h-[200px] flex-1 bg-[#f8f9fb]">
        <Image
          src={LEVERAGE_VISUALS.tradingCard}
          alt=""
          fill
          className="object-cover object-top"
          sizes="(max-width: 1024px) 45vw, 280px"
        />
      </div>
      <div className="space-y-2 border-t border-[#f1f3f7] p-3">
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg bg-[#f3f4f6] py-2 text-center text-[12px] font-medium text-[#6b7280]">
            Sell
          </div>
          <div className="rounded-lg bg-[#22c55e] py-2 text-center text-[12px] font-semibold text-white">
            Buy
          </div>
        </div>
        <div className="rounded-lg bg-[#22c55e] py-2.5 text-center text-[13px] font-semibold text-white">
          Buy
        </div>
      </div>
    </div>
  );
}

export default function CompanyLeverageSection({ locale = "en" }) {
  const t = usePathTranslation("companyPage.leverageSection");

  const pointKeys = ["multiplier", "margin", "lots"];

  return (
    <section className="overflow-x-hidden bg-white py-4 md:py-6 ">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16">
          <div>
            <h2 className="HeadingH3 text-center md:text-left text-[#293B93]">
              {t("title", "Leverage Information")}
            </h2>

            <ul className="mt-4 space-y-7 md:mt-10 md:space-y-8">
              {LEVERAGE_POINTS.map((point, index) => (
                <li key={point.key} className="flex gap-4">
                  <span
                    className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#293B93]"
                    aria-hidden
                  />
                  <div className="max-w-sm">
                    <h3 className="HeadingH5 font-semibold leading-snug">
                      {t(`points.${pointKeys[index]}.title`, point.title)}
                    </h3>
                    <p className="TextSmall mt-2 whitespace-pre-line leading-[1.5] font-normal text-[#666666]">
                      {t(`points.${pointKeys[index]}.description`, point.description)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto w-full lg:mx-0 lg:max-w-none">
            <div className="relative">
              <div className=" bottom-0 left-0 z-20 w-full">
                <ChartCard />
              </div>
            </div>
          </div>
        </div>

  
        <div className="mt-6 flex justify-center md:mt-12">
          <Button
            href={localizedHref(locale, "/company/dynamic-leverage")}
            variant="brand"
            size="md"
            showArrow
          >
            {t("viewMore", "View More")}
          </Button>
        </div>
      </div>
    </section>
  );
}

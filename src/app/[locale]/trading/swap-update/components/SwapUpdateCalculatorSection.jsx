"use client";

import clsx from "clsx";
import { useState } from "react";
import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import Button from "@/app/[locale]/components/common/Button";
import {
  CALCULATOR_INSTRUMENTS,
  SWAP_RATES_BY_INSTRUMENT,
} from "../swapUpdateData";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

const fieldClass =
  "Text w-full rounded-[10px] border border-[#E1E7F6] bg-[#F8FAFF] px-4 py-2.5 font-medium text-[#293B93] outline-none transition focus:border-[#293B93] focus:ring-2 focus:ring-[#293B93]/10";

const selectClass = `${fieldClass} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2712%27 height=%278%27 viewBox=%270 0 12 8%27 fill=%27none%27%3E%3Cpath d=%27M1 1.5L6 6.5L11 1.5%27 stroke=%27%23666%27 stroke-width=%271.5%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27/%3E%3C/svg%3E')] bg-[length:12px] bg-[right_16px_center] bg-no-repeat pr-10`;

function BullishIcon() {
  return (
    <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden>
      <path d="M1 12L6 7L10 10L17 2" stroke="#C93B3B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 2H17V7" stroke="#C93B3B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShortIcon() {
  return (
    <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden>
      <path d="M1 2L6 7L10 4L17 12" stroke="#293B93" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 12H17V7" stroke="#293B93" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FieldLabel({ htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="TextSmall mb-2 block font-medium text-[#69729F]">
      {children}
    </label>
  );
}

function calcSwapCost(instrument, volume, days, direction) {
  const rates = SWAP_RATES_BY_INSTRUMENT[instrument];
  if (!rates) return null;

  const longCost = (rates.long * volume * days).toFixed(2);
  const shortCost = (rates.short * volume * days).toFixed(2);

  return {
    longCost,
    shortCost,
    activeCost: direction === "bullish" ? longCost : shortCost,
    direction,
  };
}

export default function SwapUpdateCalculatorSection() {
  const t = usePathTranslation("swapUpdatePage.calculator");
  const [instrument, setInstrument] = useState("EURUSD");
  const [volume, setVolume] = useState("1");
  const [period, setPeriod] = useState("1");
  const [direction, setDirection] = useState("bullish");
  const [result, setResult] = useState(null);

  const handleSubmit = () => {
    const vol = parseFloat(volume) || 0;
    const days = parseInt(period, 10) || 1;
    setResult(calcSwapCost(instrument, vol, days, direction));
  };

  return (
    <section className="bg-white py-8  md:py-16">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl text-center">
          <SectionEyebrow variant="compact" className="!text-[#293B93]">
            {t("eyebrow", "Tool")}
          </SectionEyebrow>

          <h2 className="HeadingH1 mt-4 font-semibold leading-[1.25] text-[#000]">
            {t("heading", "Swap Holding Cost Calculator")}
          </h2>

          <div
            className="mt-10 p-5 text-left md:mt-12 md:p-8"
            style={{
              borderRadius: "20px",
              background: "#FFF",
              boxShadow: "0 0 60px 0 rgba(41, 59, 147, 0.11)",
            }}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <FieldLabel htmlFor="calc-instrument">{t("instrumentLabel", "Trading Instruments")}</FieldLabel>
                <select
                  id="calc-instrument"
                  value={instrument}
                  onChange={(e) => setInstrument(e.target.value)}
                  className={selectClass}
                >
                  {CALCULATOR_INSTRUMENTS.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <FieldLabel htmlFor="calc-volume">{t("volumeLabel", "Trading Instruments")}</FieldLabel>
                <input
                  id="calc-volume"
                  type="number"
                  min="1"
                  step="1"
                  value={volume}
                  onChange={(e) => setVolume(e.target.value)}
                  className={fieldClass}
                />
              </div>

              <div>
                <FieldLabel>{t("directionLabel", "Trading Instruments")}</FieldLabel>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setDirection("bullish")}
                    className={clsx(
                      "flex flex-1 items-center justify-center gap-2 rounded-[10px] border px-3 py-2.5 transition",
                      direction === "bullish"
                        ? "border-[#293B93] bg-[#EEF2FC]"
                        : "border-[#E1E7F6] bg-[#F8FAFF] hover:border-[#293B93]/30"
                    )}
                  >
                    <BullishIcon />
                    <span className="Text font-medium text-[#293B93]">{t("bullish", "Bullish")}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDirection("short")}
                    className={clsx(
                      "flex flex-1 items-center justify-center gap-2 rounded-[10px] border px-3 py-2.5 transition",
                      direction === "short"
                        ? "border-[#293B93] bg-[#EEF2FC]"
                        : "border-[#E1E7F6] bg-[#F8FAFF] hover:border-[#293B93]/30"
                    )}
                  >
                    <ShortIcon />
                    <span className="Text font-medium text-[#293B93]">{t("shortSelling", "Short selling")}</span>
                  </button>
                </div>
              </div>

              <div>
                <FieldLabel htmlFor="calc-period">{t("periodLabel", "Trading Instruments")}</FieldLabel>
                <input
                  id="calc-period"
                  type="number"
                  min="1"
                  step="1"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  className={fieldClass}
                />
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <Button
                type="button"
                variant="brand"
                size="lg"
                onClick={handleSubmit}
                className="min-w-[200px] px-12 sm:min-w-[300px]"
              >
                {t("submit", "Submit")}
              </Button>
            </div>

            {result && (
              <div className="mt-8 rounded-[14px] border border-[#E1E7F6] bg-[#F8FAFF] p-5 text-center">
                <p className="TextSmall font-medium text-[#666]">
                  {t("resultLabel", "Estimated swap cost")} · {instrument} · {volume} {t("lots", "lot(s)")} ·{" "}
                  {result.direction === "bullish"
                    ? t("bullishLong", "Bullish (Long)")
                    : t("shortSelling", "Short selling")}
                </p>
                <p className="HeadingH2 mt-3 font-semibold text-[#293B93]">
                  {Number(result.activeCost) >= 0 ? "+" : ""}
                  {result.activeCost} {t("currency", "USD")}
                </p>
                <p className="TextSmall mt-4 font-normal text-[#999]">
                  {t("disclaimer", "Indicative values only. Actual swap charges may vary by account type and market conditions.")}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

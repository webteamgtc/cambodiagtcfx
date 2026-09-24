"use client";

import { useEffect, useMemo, useState } from "react";
import FadeInSection from "./FadeInSection";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";
import { useLeverageCalculator, useLeverageCalculatorQuote } from "../hooks/useLeverageCalculator";
import { LEVERAGE_CALCULATOR_SECTION_ID } from "../leveragePageNav";

const ACCOUNT_CURRENCY = "USD";

const inputClassName =
  "mt-1.5 flex h-11 w-full items-center rounded-xl border border-[#e8ecf8] bg-white px-4 text-sm text-[#02002f] focus:border-[#3347a8] focus:outline-none";

export default function LeverageCalculatorSection() {
  const t = usePathTranslation("dynamicLeveragePage.calculator");
  const { instruments, loading, error, getTierSummary, calculateRequiredMargin, formatMoney, getContractSizeForSymbol } =
    useLeverageCalculator();

  const [selectedInstrumentId, setSelectedInstrumentId] = useState("");
  const [lotSize, setLotSize] = useState("1");

  useEffect(() => {
    if (instruments.length && !instruments.some((item) => item.id === selectedInstrumentId)) {
      setSelectedInstrumentId(instruments[0].id);
    }
  }, [instruments, selectedInstrumentId]);

  const selectedInstrument = useMemo(
    () => instruments.find((item) => item.id === selectedInstrumentId) ?? instruments[0] ?? null,
    [instruments, selectedInstrumentId]
  );

  const { midPrice, hasLiveRate } = useLeverageCalculatorQuote(selectedInstrument?.symbol);

  const tierSummary = useMemo(() => {
    if (!selectedInstrument) return null;
    return getTierSummary(selectedInstrument.section, lotSize);
  }, [getTierSummary, lotSize, selectedInstrument]);

  const calculation = useMemo(() => {
    if (!selectedInstrument || !tierSummary) return null;

    return calculateRequiredMargin({
      lots: lotSize,
      midPrice,
      marginPercent: tierSummary.marginPercent,
      contractSize: getContractSizeForSymbol(selectedInstrument.symbol),
      symbol: selectedInstrument.symbol,
    });
  }, [
    calculateRequiredMargin,
    getContractSizeForSymbol,
    lotSize,
    midPrice,
    selectedInstrument,
    tierSummary,
  ]);

  const resultCurrency = ACCOUNT_CURRENCY;

  return (
    <section
      id={LEVERAGE_CALCULATOR_SECTION_ID}
      className="relative scroll-mt-28 py-10 md:py-16"
      style={{ backgroundColor: "#F8F9FC" }}
    >
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
            <FadeInSection>
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#3347a8]">
                  {t("eyebrow", "SECTION 03 — INTERACTIVE TOOL")}
                </span>
                <h2 className="HeadingH2 mt-5">
                  {t("titleLine1", "Margin")}
                  <br />
                  <span className="text-[#293B93]">{t("titleHighlight", "calculator.")}</span>
                </h2>
                <p className="mt-5 max-w-md text-[15px] leading-[1.7] text-[#5a5a6e]">
                  {t(
                    "description",
                    "Pick an instrument, type a lot size, set your leverage — required margin is shown instantly in your account base currency. No more manual math before opening a position."
                  )}
                </p>

                <div className="mt-8 rounded-2xl border border-dashed border-[#d0d8e8] bg-white p-6">
                  <p className="text-[13px] text-[#8a8a9a]">{t("formulaLabel", "/ Formula")}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-[13px]">
                    <span className="rounded-lg bg-[#eef1fb] px-3 py-1.5 font-medium text-[#3347a8]">
                      {t("formula.requiredMargin", "Required Margin")}
                    </span>
                    <span className="text-[#8a8a9a]">=</span>
                    <span className="rounded-lg bg-[#eef1fb] px-3 py-1.5 font-medium text-[#3347a8]">
                      {t("formula.positionSize", "Position Size")}
                    </span>
                    <span className="text-[#8a8a9a]">×</span>
                    <span className="rounded-lg bg-[#eef1fb] px-3 py-1.5 font-medium text-[#3347a8]">
                      {t("formula.marginPercent", "Margin %")}
                    </span>
                  </div>
                  <p className="mt-3 text-[12px] leading-[1.7] text-[#8a8a9a]">
                    {t(
                      "formulaNote",
                      "Where Position Size = Lots × Contract Size × Asset Price, converted to your account base currency at the live mid rate."
                    )}
                  </p>
                </div>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.15}>
              <div className="rounded-2xl border border-[#e8ecf8] bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[15px] font-semibold text-[#02002f]">
                    {t("widgetTitle", "Margin Calculator · v2.4")}
                  </span>
                  <span className="flex items-center gap-1.5 text-[13px] font-medium text-[#8a8a9a]">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        hasLiveRate ? "bg-[#2eab71]" : "bg-[#d0d5e4]"
                      }`}
                    />
                    {hasLiveRate
                      ? t("liveRates", "LIVE RATES")
                      : t("estimatedRates", "ESTIMATED RATES")}
                  </span>
                </div>

                {loading ? (
                  <div className="mt-6 space-y-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <div key={index} className="h-11 animate-pulse rounded-xl bg-[#f0f1f6]" />
                    ))}
                  </div>
                ) : error ? (
                  <p className="mt-6 rounded-xl bg-[#fff5f5] px-4 py-3 text-sm text-[#b42318]">
                    {t("loadError", "Unable to load leverage schedule. Please try again later.")}
                  </p>
                ) : (
                  <>
                    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <label htmlFor="leverage-instrument" className="text-[13px] font-medium text-[#02002f]">
                          {t("fields.instrument", "Instrument")}
                        </label>
                        <select
                          id="leverage-instrument"
                          value={selectedInstrument?.id ?? ""}
                          onChange={(event) => setSelectedInstrumentId(event.target.value)}
                          className={inputClassName}
                        >
                          {instruments.map((instrument) => (
                            <option key={instrument.id} value={instrument.id}>
                              {instrument.title}
                              {instrument.symbol ? ` · ${instrument.symbol}` : ""}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="leverage-account-currency" className="text-[13px] font-medium text-[#02002f]">
                          {t("fields.accountCurrency", "Account Currency")}
                        </label>
                        <div id="leverage-account-currency" className={`${inputClassName} bg-[#f8f9fc]`}>
                          {ACCOUNT_CURRENCY}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="leverage-lot-size" className="text-[13px] font-medium text-[#02002f]">
                          {t("fields.lotSize", "Lot Size")}
                        </label>
                        <div className="relative mt-1.5">
                          <input
                            id="leverage-lot-size"
                            type="number"
                            min="0.01"
                            step="0.01"
                            value={lotSize}
                            onChange={(event) => setLotSize(event.target.value)}
                            className={`${inputClassName} pr-14`}
                          />
                          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#8a8a9a]">
                            {t("lotUnit", "LOT")}
                          </span>
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-[13px] font-medium text-[#02002f]">
                          {t("fields.leverage", "Leverage")}
                        </label>
                        <div className={`${inputClassName} bg-[#f8f9fc]`}>
                          {tierSummary?.leverageLabel ?? "—"}
                          {tierSummary?.tier ? (
                            <span className="ml-2 text-[#8a8a9a]">({tierSummary.tier})</span>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 rounded-xl bg-[#293B93] p-6 text-white">
                      <p className="text-[13px] text-white/70">{t("resultLabel", "/ Required Margin")}</p>
                      <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-[13px] text-white/70">{resultCurrency}</span>
                        <span className="text-[48px] font-bold leading-none">
                          {calculation
                            ? calculation.requiredMargin.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })
                            : "—"}
                        </span>
                      </div>
                      <div className="mt-6 grid grid-cols-1 gap-4 border-t border-white/20 pt-4 sm:grid-cols-3">
                        <div>
                          <p className="text-[11px] text-white/60">
                            {t("result.positionSize", "Position Size")}
                          </p>
                          <p className="mt-1 text-[13px] font-medium">
                            {calculation
                              ? formatMoney(calculation.positionSize, resultCurrency)
                              : "—"}
                          </p>
                        </div>
                        <div>
                          <p className="text-[11px] text-white/60">
                            {t("result.marginPercent", "Margin%")}
                          </p>
                          <p className="mt-1 text-[13px] font-medium">
                            {tierSummary ? `${tierSummary.marginPercent.toFixed(4).replace(/\.?0+$/, "")}%` : "—"}
                          </p>
                        </div>
                        <div>
                          <p className="text-[11px] text-white/60">{t("result.pipValue", "Pip Value")}</p>
                          <p className="mt-1 text-[13px] font-medium">
                            {calculation?.pipValue != null
                              ? formatMoney(calculation.pipValue, ACCOUNT_CURRENCY)
                              : t("notApplicable", "N/A")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </FadeInSection>
          </div>
        </div>
      </div>
    </section>
  );
}

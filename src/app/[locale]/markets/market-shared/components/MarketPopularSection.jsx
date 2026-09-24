"use client";

import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import FadeInSection from "@/app/[locale]/company/contact-us/components/FadeInSection";
import MobilePeekCarousel from "@/app/[locale]/components/common/MobilePeekCarousel";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

function MiniTrendIcon({ positive }) {
  const stroke = positive ? "#04C120" : "#CF4548";

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M0.961844 8.8797H9.51908C9.78468 8.8797 10 9.09503 10 9.36062C10 9.62622 9.78468 9.84154 9.51908 9.84154H0.480916C0.215319 9.84154 0 9.62622 0 9.36062V0.480916C0 0.215319 0.215319 1.32649e-10 0.480916 0C0.746524 0 0.961833 0.215319 0.961833 0.480916L0.961844 8.8797ZM4.724 4.68986L4.01544 7.04043C3.89724 7.43256 3.37426 7.50691 3.15146 7.16325L1.49763 4.61226C1.35313 4.3894 1.41668 4.0916 1.63954 3.94711C1.8624 3.80263 2.16021 3.86616 2.30469 4.08904L3.39403 5.7693L3.86351 4.21184C3.88257 4.14861 3.91445 4.08999 3.95716 4.03962C3.99987 3.98925 4.0525 3.94821 4.11177 3.91907L6.07321 2.95471C6.28647 2.84986 6.54435 2.9165 6.68011 3.11155L7.61171 4.45001L8.95833 0.529063C9.04461 0.27786 9.31818 0.144166 9.56938 0.230435C9.82059 0.316705 9.95428 0.590281 9.86801 0.841483L8.21344 5.65908C8.08555 6.03147 7.58882 6.10076 7.36388 5.77761L6.12674 4.00019L4.724 4.68986Z" fill="#293B93" />
    </svg>
  );
}

function ChangeBadge({ change, positive }) {
  return (
    <span style={{
      borderRadius: "20px",
      background: "#F0F4FA",
      padding: "2px 4px",
    }}>
      <span
        className={clsx(
          "text-xs inline-flex items-center gap-0.5 font-medium",
          positive ? "text-[#04C120]" : "text-[#CF4548]"
        )}
      >
        <span aria-hidden className="text-xs">{positive ? "↑" : "↓"}</span>
        {change}
      </span>
    </span>

  );
}

function DetailChart({ positive }) {
  const fill = positive ? "rgba(41,59,147,0.14)" : "rgba(207,69,72,0.14)";
  const stroke = positive ? "#293B93" : "#CF4548";
  const area = positive
    ? "M36 72 C72 64, 108 54, 144 46 S216 30, 252 22 S324 16, 360 12 L360 92 L36 92 Z"
    : "M36 24 C72 32, 108 42, 144 50 S216 66, 252 74 S324 80, 360 84 L360 92 L36 92 Z";
  const line = positive
    ? "M36 72 C72 64, 108 54, 144 46 S216 30, 252 22 S324 16, 360 12"
    : "M36 24 C72 32, 108 42, 144 50 S216 66, 252 74 S324 80, 360 84";
  const yLabels = positive
    ? ["1.0855", "1.0850", "1.0845", "1.0840", "1.0835", "1.0830"]
    : ["1.0855", "1.0850", "1.0845", "1.0840", "1.0835", "1.0830"];
  const xLabels = ["D-6", "D-5", "D-4", "D-3", "D-2", "Yesterday", "Today"];

  return (
    <div className="relative mt-2">
      <div className="absolute right-0 top-0 flex h-[calc(100%-24px)] flex-col justify-between py-1 text-right">
        {yLabels.map((label) => (
          <span key={label} className="text-[10px] font-medium text-[#9AA3C6]">
            {label}
          </span>
        ))}
      </div>

      <svg viewBox="0 0 400 100" className="h-36 w-full pr-12 md:h-44" aria-hidden>
        {[18, 34, 50, 66, 82].map((y) => (
          <line key={y} x1="36" y1={y} x2="360" y2={y} stroke="#E8EDFA" strokeWidth="1" />
        ))}
        <path d={area} fill={fill} />
        <path d={line} fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
      </svg>

      <div className="mt-1 grid grid-cols-7 gap-1 pr-12 text-center">
        {xLabels.map((label) => (
          <span key={label} className="text-[10px] font-medium text-[#9AA3C6]">
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

function StatRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 py-1">
      <span className="TextSmall font-normal text-[#69729F]">{label}</span>
      <span className="TextSmall font-semibold text-[#000032]">{value}</span>
    </div>
  );
}

function PopularInstrumentButton({ item, index, isActive, onSelect, t,isMobile=false }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(item.key)}
      className={clsx(
        "relative box-border h-fit w-full max-w-full min-w-0 rounded-[22px] border bg-white p-4 text-left transition",
        isActive
          ? "border-[#D4DDF3] lg:shadow-[0_4px_20px_0_rgba(41,59,147,0.15)]"
          : "border-[#D4DDF3] hover:border-[#293B93]/15"
      )}
    >
      <p className="TextSmall font-semibold text-[#1F2F40]">
        {t(`instruments.${index}.symbol`, item.symbol)}
      </p>

      <div className="flex items-end justify-between gap-3">
        <p className="text-xs font-medium text-[#000032]">{item.price}</p>
        <ChangeBadge change={item.change} positive={item.positive} />
      </div>

      <div className="mt-2 flex justify-end">
        <MiniTrendIcon positive={item.positive} />
      </div>
    </button>
  );
}

function getDetail(item) {
  return {
    volume: item.volume ?? "—",
    bid: item.bid ?? item.price,
    ask: item.ask ?? item.price,
    dayRange: item.dayRange ?? "—",
    spread: item.spread ?? "—",
    week52Range: item.week52Range ?? "—",
    prevClose: item.prevClose ?? "—",
  };
}

export default function MarketPopularSection({ data }) {
  const t = usePathTranslation(`${data.i18nKey}.popular`);
  const td = usePathTranslation("marketsShared.popularDetail");
  const [activeKey, setActiveKey] = useState(data.defaultPopular);
  const [updatedAt, setUpdatedAt] = useState("");

  const active = useMemo(
    () => data.popularInstruments.find((item) => item.key === activeKey) ?? data.popularInstruments[0],
    [activeKey, data.popularInstruments]
  );

  const activeIndex = useMemo(
    () =>
      Math.max(
        0,
        data.popularInstruments.findIndex((item) => item.key === activeKey)
      ),
    [activeKey, data.popularInstruments]
  );

  const detail = useMemo(() => getDetail(active), [active]);

  useEffect(() => {
    const formatTime = () =>
      new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });

    setUpdatedAt(formatTime());
  }, [activeKey]);

  return (
    <section className="relative overflow-x-hidden py-8 md:py-16">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl">
          <FadeInSection>
            <div className="text-center">
              <h2 className="HeadingH1 mx-auto font-semibold text-[#000]">{t("title", data.popularTitle)}</h2>
              <p className="Text mx-auto mt-4 max-w-2xl font-normal leading-[1.7] text-[#4E4E4E]">
                {t("sub", data.popularSub)}
              </p>
            </div>
          </FadeInSection>

          <div className="mt-12 grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-baseline">
            <div className="min-w-0 max-w-full overflow-hidden lg:hidden">
              <MobilePeekCarousel
                items={data.popularInstruments}
                showArrows
                initialIndex={activeIndex}
                onActiveIndexChange={(index) => {
                  const item = data.popularInstruments[index];
                  if (item) setActiveKey(item.key);
                }}
                className="w-full min-w-0 max-w-full"
                slideClassName="!h-auto !w-full !max-w-full"
                renderItem={(item, index) => (
                  <div className="box-border w-full min-w-0 max-w-full px-0.5 py-1">
                    <PopularInstrumentButton
                      item={item}
                      index={index}
                      isActive={false}
                      onSelect={setActiveKey}
                      t={t}
                      isMobile={true}
                    />
                  </div>
                )}
              />
            </div>

            <div className="hidden h-full min-w-0 grid-cols-2 gap-3 lg:grid xl:grid-cols-3">
              {data.popularInstruments.map((item, index) => {
                const isActive = item.key === activeKey;

                return (
                  <div key={item.key ?? index}>
                    <FadeInSection delay={index * 0.2}>
                      <PopularInstrumentButton
                        item={item}
                        index={index}
                        isActive={isActive}
                        onSelect={setActiveKey}
                        t={t}
                        isMobile={false}
                      />
                    </FadeInSection>
                  </div>
                );
              })}
            </div>

            <FadeInSection delay={0.2}>
              <div className="min-w-0 max-w-full rounded-[20px] border border-[#D4DDF3] bg-white p-5 md:p-6">
                <div className="flex items-start justify-between gap-4 border-b border-b-dashed border-[#E1E7F6] pb-3">
                  <h3 className="HeadingH5 font-semibold text-[#000032]">{active.symbol}</h3>
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#EEF8F0] px-3 py-1 border border-[#E1E7F6]">
                    <span className="h-2 w-2 rounded-full bg-[#1BAF6E]" aria-hidden />
                    <span className="text-xs font-medium uppercase tracking-[0.08em] text-[#293B93]">
                      {td("liveData", "Live Data")}
                    </span>
                  </div>
                </div>

                <p className="HeadingH2 mt-4 font-semibold text-[#000]">{active.price}</p>

                <div className="mt-2 flex flex-wrap items-center gap-4">
                  <ChangeBadge change={active.change} positive={active.positive} />
                  <span className="TextSmall font-medium text-[#69729F]">
                    {td("volume", "Volume")}: {detail.volume}
                  </span>
                </div>

                <div className="mt-5 grid gap-x-8 md:grid-cols-2 bg-[#F4F8FF] rounded-[20px] p-4">
                  <div>
                    <StatRow label={td("bidBuy", "Bid (Buy)")} value={detail.bid} />
                    <StatRow label={td("dayRange", "Day Range")} value={detail.dayRange} />
                    <StatRow label={td("spread", "Spread")} value={detail.spread} />
                  </div>
                  <div>
                    <StatRow label={td("askSell", "Ask (Sell)")} value={detail.ask} />
                    <StatRow label={td("week52Range", "52W Range")} value={detail.week52Range} />
                    <StatRow label={td("prevClose", "Prev. Close")} value={detail.prevClose} />
                  </div>
                </div>

                <DetailChart positive={active.positive} />

                <p className="text-xs border-t border-[#E1E7F6] pt-4 mt-4 text-right font-normal text-[#8B97A6]">
                  Last updated {updatedAt} real-time simulation
                </p>
              </div>
            </FadeInSection>
          </div>
        </div>
      </div>
    </section>
  );
}

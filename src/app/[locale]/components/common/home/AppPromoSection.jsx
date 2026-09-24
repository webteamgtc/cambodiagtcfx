"use client";

import Image from "next/image";
import Link from "next/link";
import PrimaryButton from "../PrimaryButton";
import StoreDownloadLink from "@/app/[locale]/components/common/StoreDownloadLink";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

function IconGooglePlay({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="28" height="28" aria-hidden>
      <path
        fill="currentColor"
        d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.802 8.99l-2.303 2.303-8.635-8.635z"
      />
    </svg>
  );
}

function IconApple({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="26" height="26" aria-hidden>
      <path
        fill="currentColor"
        d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"
      />
    </svg>
  );
}

function PhoneWatchlist({ className }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[2rem] border-[3px] border-[#1a1a1a] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.12)] ${className}`}
    >
      <div className="absolute left-1/2 top-2 h-5 w-16 -translate-x-1/2 rounded-xl bg-[#1a1a1a]/90" aria-hidden />
      <div className="space-y-2 bg-[#f2f3f5] px-2.5 pb-4 pt-8">
        <div className="flex items-center justify-between text-[9px] font-semibold text-[#1a1a1a] md:text-[10px]">
          <span>$100,000.00</span>
          <span className="rounded bg-emerald-500/15 px-1.5 py-0.5 text-emerald-700">
            Live
          </span>
        </div>
        <div className="flex justify-center gap-3 text-[8px] text-[#555] md:text-[9px]">
          <span className="flex flex-col items-center gap-0.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-white text-[10px] font-bold text-primary shadow-sm">
              Q
            </span>
            Quick Trade
          </span>
          <span className="flex flex-col items-center gap-0.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-white text-[10px] font-bold text-primary shadow-sm">
              I
            </span>
            Invite
          </span>
        </div>
        <div className="space-y-1 rounded-xl bg-white p-2 shadow-sm">
          {[
            { pair: "XPDUSD", pct: "+0.24%", up: true },
            { pair: "XPTUSD", pct: "-0.12%", up: false },
            { pair: "XAUUSD", pct: "+0.08%", up: true },
          ].map((row) => (
            <div
              key={row.pair}
              className="flex items-center justify-between border-b border-[#eee] py-1.5 text-[9px] last:border-0 md:text-[10px]"
            >
              <span className="font-medium text-[#1a1a1a]">{row.pair}</span>
              <span
                className={
                  row.up ? "font-semibold text-emerald-600" : "font-semibold text-red-500"
                }
              >
                {row.pct}
              </span>
            </div>
          ))}
        </div>
        <div className="flex justify-around border-t border-[#e5e5e5] pt-2 text-[8px] text-[#888]">
          <span>Market</span>
          <span>Order</span>
          <span>Assets</span>
          <span>Me</span>
        </div>
      </div>
    </div>
  );
}

function PhoneTrade({ className }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[2rem] border-[3px] border-[#1a1a1a] bg-white shadow-[0_24px_60px_rgba(0,0,0,0.15)] ${className}`}
    >
      <div className="absolute left-1/2 top-2 h-5 w-16 -translate-x-1/2 rounded-xl bg-[#1a1a1a]/90" aria-hidden />
      <div className="space-y-2 bg-[#f2f3f5] px-2.5 pb-4 pt-8">
        <div className="text-center text-[10px] font-bold text-[#1a1a1a] md:text-[11px]">
          XPDUSD
        </div>
        <div className="flex h-20 items-end justify-center gap-0.5 overflow-hidden rounded-lg bg-white px-1.5 pb-1 pt-2">
          {[40, 55, 48, 62, 58, 70, 65, 72, 68, 80].map((h, i) => (
            <div
              key={i}
              className="w-1 shrink-0 rounded-sm bg-emerald-500/75"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          <button
            type="button"
            className="rounded-lg bg-[#e8e8e8] py-2 text-[8px] font-semibold text-[#333] md:text-[9px]"
          >
            Sell 1,730.58
          </button>
          <button
            type="button"
            className="rounded-lg bg-emerald-500 py-2 text-[8px] font-semibold text-white md:text-[9px]"
          >
            Buy 1,738.41
          </button>
        </div>
        <div className="space-y-1 rounded-lg bg-white p-2 text-[8px] text-[#555] md:text-[9px]">
          <div className="flex justify-between">
            <span>Lots</span>
            <span className="font-medium">0.01</span>
          </div>
          <div className="text-[7px] text-[#999]">Take Profit & Stop Loss</div>
        </div>
        <button
          type="button"
          className="w-full rounded-xl bg-emerald-500 py-2.5 text-[10px] font-bold text-white shadow-md"
        >
          Buy
        </button>
      </div>
    </div>
  );
}

export default function AppPromoSection() {
  const t = usePathTranslation("home.appPromo");
  const tA11y = usePathTranslation("common.a11y");

  return (
    <section className="bg-[#F1F2F4] py-10 lg:py-16 border-t border-b border-gray-300">
      <div className="max-w-6xl mx-auto px-4 md:px-0">
        <div className="grid items-center gap-4 lg:grid-cols-12 justify-center md:gap-10">
          {/* Left — copy + social proof */}
          <div className="order-2 text-center lg:order-1 lg:col-span-5 lg:text-left flex flex-col gap-6 md:gap-8  items-center lg:items-start">
            <h2 className="HeadingH2">
              {t("titleLine1", "Trade. Invest. Earn")}
             <span className="text-secondary"> {t("titleLine2", "All in one App.")}</span>
            </h2>
            <p className="Text">
              {t(
                "description",
                "Trade the CFD market on the go with our mobile application and benefit from ultra-low latency trading infrastructure, award-winning order execution and deep fluidity."
              )}
            </p>

            <div className="md:mt-8 mt-4 flex flex-wrap items-start justify-center lg:justify-start">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[28px] font-bold leading-none text-[#1a1a1a] md:text-[32px]">
                    4.7
                  </span>
                  <div>
                    <div
                      className="flex gap-0.5 text-[14px] leading-none text-[#EAB308] md:text-[16px]"
                      aria-label={t("starsAria", "4.7 out of 5 stars")}
                    >
                      {"★★★★★"}
                    </div>
                    <p className="TextSmall text-[#333333]">{t("rating", "Rating")}</p>
                  </div>
                </div>

              </div>
              <div className="flex items-center gap-2 mb-5">
                <p className="text-[28px] font-bold leading-none text-[#1a1a1a] md:text-[32px]">
                  15M
                </p>
                <p className="TextSmall hidden md:block max-w-[180px] text-[#666]">
                  {t("downloadsLong", "More than 15 million downloads")}
                </p>
                <p className="TextSmall md:hidden block max-w-[180px] text-[#666]">
                  {t("downloadsShort", "15+ million downloads")}
                </p>
              </div>
              <PrimaryButton href="/register">
                {t("openLiveAccount", "Open Live Account")}
              </PrimaryButton>
            </div>
          </div>

          {/* Center — phones */}
          <div className="order-1 flex justify-center lg:order-2 lg:col-span-4">
            <div className="relative flex w-full max-w-[200px] items-end justify-center sm:max-w-[400px]">
              <Image src="/home/app-img.webp" alt={t("imageAlt", "App Promo")} width={400} height={600} className="w-full h-full object-contain" />
            </div>
          </div>

          {/* Right — stores + QR */}
          <div className="order-3 flex flex-col items-center gap-6 lg:col-span-3 md:max-w-[180px] lg:items-start">
            <div className="flex w-full md:flex-col flex-row justify-center gap-3">
              <StoreDownloadLink
                type="google"
                className="flex items-center gap-3 text-white transition hover:opacity-90"
              >
                <img src="/home/google-play.svg" alt={t("googlePlayAlt", "Google Play")} className=" h-12 object-contain" />
              </StoreDownloadLink>
              <StoreDownloadLink
                type="apple"
                className="flex items-center gap-3  text-white transition hover:opacity-90"
              >
                <img src="/home/app-store.svg" alt={t("appleStoreAlt", "Apple Store")} className=" h-12 object-contain" />
              </StoreDownloadLink>
            </div>

            <div className="flex w-full flex-col items-center gap-3 lg:items-start">
              <p className="TextSmall text-center text-[#666] lg:text-left">
                {t("scanToDownload", "Scan to Download GTCFX Trading App")}
              </p>
              <div className="flex h-[132px] w-[132px] items-center justify-center md:h-[148px] md:w-[148px]">
                <img src="/home/qrcode.svg" alt={tA11y("qrCode", "QR Code")} className=" h-full w-full object-contain" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

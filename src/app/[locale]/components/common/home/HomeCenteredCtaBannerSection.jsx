"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathTranslation } from "../../../LocaleProvider";
import { GTC_GO_APP_DOWNLOAD_HREF } from "@/lib/gtcGoAppLinks";

function DownloadIcon({ className }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="M12 4.5v10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M8.25 11.5L12 15.25l3.75-3.75" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 19.25h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CheckBadgeIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8 12.5l2.5 2.5L16 9.5"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FloatingBadge({ children, className = "" }) {
  return (
    <div
      className={`flex max-w-[min(220px,46vw)] items-center gap-2.5 rounded-xl bg-white px-3 py-2.5 shadow-[0_12px_40px_rgba(15,23,42,0.12)] ring-1 ring-[#0f172a]/[0.06] sm:max-w-[240px] sm:px-3.5 sm:py-3 ${className}`}
    >
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1e3a8a] text-white sm:h-8 sm:w-8">
        <CheckBadgeIcon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
      </span>
      <span className="TextSmall text-start font-medium leading-snug text-[#111827]">{children}</span>
    </div>
  );
}

/** Dummy wallet-style card (replace asset later if needed). */
function WalletOverlayCard({ title, valueHidden }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#1e293b]/80 bg-[#0b1224] shadow-[0_20px_50px_rgba(2,6,23,0.45)] ring-1 ring-white/10">
      <div className="border-b border-white/10 bg-[#0f172a] px-3 py-2.5 sm:px-4 sm:py-3">
        <p className="TextSmall font-medium uppercase tracking-wide text-slate-400">{title}</p>
        <p className="mt-1 font-mono text-lg font-semibold tracking-wide text-white sm:text-xl">{valueHidden}</p>
      </div>
      <div className="space-y-2 px-3 py-3 sm:px-4 sm:py-3.5">
        <div className="h-2 w-full rounded-full bg-white/10" />
        <div className="h-2 w-[80%] rounded-full bg-white/5" />
      </div>
    </div>
  );
}

export default function HomeCenteredCtaBannerSection() {
  const t = usePathTranslation("home.centerCtaBanner");

  return (
    <section className="relative isolate overflow-hidden bg-white pt-2 md:pt-10">
      <div className="container relative z-10">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <h2 className="HeadingH2 text-balance text-[#111827]">
            {t("title", "Trade Smarter with GTCFX:GTC Go")}
          </h2>
          <p className="Text mt-3 text-pretty text-[#666666]">
            {t(
              "subtitle",
              "With this platform, you can access your account anywhere, anytime for balance and so much more."
            )}
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 md:mt-9 md:gap-4">
            <Link
              href={t("buttons.openLive.href", "https://mygtcfx.com/getview?view=register&token=exhowww.z8owwwww")}
              target="_blank"
              rel="noopener noreferrer"
              className="TextButton inline-flex min-h-[40px] items-center justify-center rounded-full bg-[#293B93] px-7 py-2.5 font-normal text-white shadow-sm transition hover:bg-[#172554] hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a8a] focus-visible:ring-offset-2 md:min-h-[48px]"
            >
              {t("buttons.openLive.label", "Create Account")}
            </Link>

            <Link
              href={t("buttons.download.href", GTC_GO_APP_DOWNLOAD_HREF)}
              target="_blank"
              rel="noopener noreferrer"
              className="TextButton inline-flex min-h-[40px] items-center justify-center gap-2 rounded-full border border-[#293B93] bg-transparent px-7 py-2.5 font-normal text-[#293B93] transition hover:bg-[#1e3a8a]/[0.06] hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a8a] focus-visible:ring-offset-2 md:min-h-[48px]"
            >
              {t("buttons.download.label", "Download App")}
            </Link>
          </div>
        </div>

        {/* Hero mockup = placeholder phone / app art — swap `src` when your asset is ready */}
        <div className="relative mx-auto mt-8 w-full max-w-[1040px] md:mt-8">
          <div className="relative z-10 mx-auto flex w-full justify-center px-1 sm:px-2">
            <div className="relative w-full max-w-[980px] min-h-[174px] sm:min-h-[320px] md:min-h-[380px] lg:min-h-[430px]">
              <Image
                src="/new-design/banner-last-new.webp"
                alt=""
                fill
                className="object-contain object-bottom"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 980px"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

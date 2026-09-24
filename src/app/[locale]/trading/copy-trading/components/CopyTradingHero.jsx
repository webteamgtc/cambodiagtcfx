"use client";

import Image from "next/image";
import Button from "@/app/[locale]/components/common/Button";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

const HERO_MOBILE_IMAGE = "/new-design/company/copy-mobile.webp";

const FLOATING_PAIRS = [
  {
    key: "gbpusd",
    pair: "GBP/USD",
    change: "+0.92%",
    flags: ["🇬🇧", "🇺🇸"],
    className: "left-0 top-[8%] -translate-x-2 sm:-left-6 lg:-left-10",
  },
  {
    key: "eurusd",
    pair: "EUR/USD",
    change: "+0.68%",
    flags: ["🇪🇺", "🇺🇸"],
    className: "left-2 top-[38%] -translate-x-1 sm:-left-4 lg:-left-8",
  },
  {
    key: "audusd",
    pair: "AUD/USD",
    change: "+1.20%",
    flags: ["🇦🇺", "🇺🇸"],
    className: "right-0 top-[34%] translate-x-2 sm:-right-4 lg:-right-8",
  },
  {
    key: "usdjpy",
    pair: "USD/JPY",
    change: "+0.35%",
    flags: ["🇺🇸", "🇯🇵"],
    className: "right-2 bottom-[10%] translate-x-1 sm:-right-2 lg:-right-6",
  },
];

function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #E4EEFC 0%, #EEF4FC 42%, #EEF3FB 100%)",
        }}
      />

      <svg
        className="absolute bottom-0 left-0 w-full"

        xmlns="http://www.w3.org/2000/svg" width="1918" height="210" viewBox="0 0 1918 210" fill="none">
        <path opacity="0.55" d="M1921 273.466V10.4659C1598.46 -39.0537 1266.44 100.147 924.926 156.741C583.415 213.335 275.106 199.186 -0.00012207 114.296V273.466H1921Z" fill="url(#paint0_linear_822_5676)" />
        <defs>
          <linearGradient id="paint0_linear_822_5676" x1="1921" y1="192.466" x2="0.000106931" y2="192.466" gradientUnits="userSpaceOnUse">
            <stop stop-color="#B9CBEB" stop-opacity="0" />
            <stop offset="0.5" stop-color="#B9CBEB" />
            <stop offset="1" stop-color="#B9CBEB" stop-opacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function FloatingPairCard({ pair, change, flags, className }) {
  return (
    <div
      className={`absolute z-20 hidden min-w-[132px] rounded-2xl border border-white/70 bg-white/75 px-3.5 py-3 shadow-[0_10px_30px_rgba(41,59,147,0.12)] backdrop-blur-md sm:block ${className}`}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-[#000032]">{pair}</p>
          <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-[#22C55E]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden
            >
              <path
                d="M6 2.5L9.5 7H2.5L6 2.5Z"
                fill="currentColor"
              />
            </svg>
            {change}
          </p>
        </div>

        <div className="flex -space-x-2">
          {flags.map((flag, index) => (
            <span
              key={`${pair}-${index}`}
              className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#F3F6FD] text-sm"
              aria-hidden
            >
              {flag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CopyTradingHero() {
  const t = usePathTranslation("copyTradingPage");

  return (
    <section className="relative overflow-hidden pt-10">
      <HeroBackground />

      <div className="container relative z-10 min-w-0 max-w-full">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:gap-12 xl:gap-16">
          <div className="min-w-0 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#E5E8F2] bg-[#F2F4F9] px-4 py-2 text-sm font-medium text-[#293B93]">
              <svg xmlns="http://www.w3.org/2000/svg" width="5" height="5" viewBox="0 0 5 5" fill="none">
                <circle cx="2.5" cy="2.5" r="2.5" fill="#12BA82" />
              </svg>
              {t("hero.badge")}
            </span>

            <h1 className="HeadingH1 mt-5 max-w-md font-semibold leading-[1.4] text-[#000032] lg:mt-6">
              <span className="text-[#293B93]">{t("hero.titleHighlight")}</span>
              {t("hero.titleStart")}
            </h1>

            <p className="Text mx-auto mt-3 max-w-xl font-normal leading-[1.7] text-[#4E4E4E] lg:mx-0 lg:mt-3">
              {t("hero.description")}
            </p>

            <div className="mt-10 flex justify-center lg:justify-start">
              <Button
                href="https://gtccopy.com/portal/login"
                external
                variant="brand"
                size="lg"
                showArrow
                className="min-w-[220px] font-semibold"
              >
                {t("hero.primaryCta")}
              </Button>
            </div>
          </div>

          <div className="relative mx-auto flex w-full max-w-[560px] justify-center lg:mx-0 lg:max-w-none lg:justify-end">
            <div className="pointer-events-none absolute inset-x-8 top-8 h-[320px] rounded-full bg-[radial-gradient(circle,rgba(41,59,147,0.12)_0%,transparent_70%)] blur-2xl" />

            <div className="relative w-full">
              {/* {FLOATING_PAIRS.map((item) => (
                <FloatingPairCard
                  key={item.key}
                  pair={item.pair}
                  change={item.change}
                  flags={item.flags}
                  className={item.className}
                />
              ))} */}

              <div className="relative z-20 mx-auto aspect-[7/7] w-full">
                <Image
                  src={HERO_MOBILE_IMAGE}
                  alt={t("hero.imageAlt")}
                  fill
                  priority
                  className="object-contain object-center"
                  sizes="(max-width: 1024px) 90vw, 420px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

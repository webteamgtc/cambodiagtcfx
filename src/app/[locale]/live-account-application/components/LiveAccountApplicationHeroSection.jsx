"use client";

import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

const ACCOUNT_SLUG_MAP = {
  "standard-account": {
    title: "Standard Account",
    subtitle:
      "Start trading across global markets with institutional-grade infrastructure and multi-regulatory protection.",
  },
  "ecn-account": {
    title: "ECN Account",
    subtitle:
      "Trade with raw spreads and direct market access for professional traders.",
  },
  "mam-pamm-account": {
    title: "MAM/PAMM Account",
    subtitle: "Manage multiple accounts with advanced allocation methods.",
  },
  "pro-ecn-account": {
    title: "Pro ECN Account",
    subtitle:
      "Professional-grade ECN trading with ultra-low latency execution.",
  },
  "raw-spread-account": {
    title: "RAW Spread Account",
    subtitle: "Access raw interbank spreads with minimal markup.",
  },
  "vip-account": {
    title: "VIP Account",
    subtitle:
      "Exclusive trading conditions and personalized services for high-volume traders.",
  },
  "corporate-account": {
    title: "Corporate Account",
    subtitle: "Institutional trading solutions for corporate clients.",
  },
  "demo-account": {
    title: "Demo Account",
    subtitle: "Practice your trading with virtual funds.",
  },
  "multi-account": {
    title: "Multi-Account",
    subtitle: "Manage multiple trading accounts from a single dashboard.",
  },
  "mt5-account": {
    title: "MT5 Account",
    subtitle:
      "Trade on MetaTrader 5 with multi-asset access and advanced analytics.",
  },
  "partnership-account": {
    title: "Partnership Account",
    subtitle:
      "Grow with GTCFX as an affiliate partner and earn from client activity.",
  },
  "pamm-account": {
    title: "PAMM Account",
    subtitle:
      "Allocate capital across managed strategies with transparent performance.",
  },
  "mam-account": {
    title: "MAM Account",
    subtitle: "Manage multiple client accounts with flexible allocation methods.",
  },
};

function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <span className="absolute left-[6%] top-16 h-48 w-48 rounded-full border border-[#E1E7F6]/80 opacity-50 md:h-64 md:w-64" />
      <span className="absolute right-[8%] top-24 h-36 w-36 rounded-full border border-[#E1E7F6]/70 opacity-40 md:h-44 md:w-44" />
      <span className="absolute bottom-0 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full border border-[#E1E7F6]/60 opacity-35 md:h-72 md:w-72" />
    </div>
  );
}

export default function LiveAccountApplicationHeroSection({
  accountKey = "standard-account",
}) {
  const t = usePathTranslation("liveAccountApplicationPage.hero");
  const resolvedKey = ACCOUNT_SLUG_MAP[accountKey] ? accountKey : "standard-account";
  const accountT = usePathTranslation(
    `liveAccountApplicationPage.accounts.${resolvedKey}`
  );
  const fallback = ACCOUNT_SLUG_MAP[resolvedKey];

  return (
    <section className="relative overflow-hidden pb-8 pt-10 md:pb-0 md:pt-20">
      <HeroBackground />

      <div className="container relative z-10 min-w-0 max-w-full">
        <div className="mx-auto max-w-5xl text-center">
          <span className="inline-flex items-center rounded-full bg-[#EEF2FF] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#293B93] md:text-[11px]">
            {t("eyebrow", "GLOBALLY MULTI-REG BROKER")}
          </span>

          <h2 className="HeadingH2 mx-auto mt-6 font-semibold text-[#000032] md:mt-7">
            {t("title", "Open Live Account")}
          </h2>

          <p className="Text mx-auto mt-4 max-w-5xl font-normal leading-[1.75] text-[#69729F] md:mt-5">
            {accountT("subtitle", fallback.subtitle)}
          </p>
        </div>
      </div>
    </section>
  );
}

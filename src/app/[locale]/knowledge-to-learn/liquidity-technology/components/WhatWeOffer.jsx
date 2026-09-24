"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import FadeInSection from "@/app/[locale]/company/contact-us/components/FadeInSection";

function PillBadge({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[#E5E8F2] bg-[#F2F4F9] px-3.5 py-2 text-[11px] font-medium uppercase tracking-[0.12em] text-[#293B93]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" aria-hidden />
      {children}
    </span>
  );
}

function LiquidityVisual() {
  return (
    <div className="relative mx-auto flex w-full max-w-[520px] items-center justify-center">
      <Image
        src="/new-design/learn/last.webp"
        alt="Deep liquidity pools"
        width={420}
        height={360}
        className="h-auto w-full object-contain"
      />
    </div>
  );
}

function ConnectivityVisual() {
  return (
    <div className="relative mx-auto flex min-h-[280px] w-full max-w-[380px] items-center justify-center md:min-h-[320px]">
      <div className="relative w-full overflow-hidden rounded-[22px] bg-[#1A1F2E] p-5 shadow-[0_24px_60px_rgba(15,23,42,0.35)]">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm font-semibold text-white">API Gateway</span>
          <span className="rounded-full bg-[#22C55E]/15 px-2.5 py-0.5 text-[11px] font-semibold text-[#22C55E]">
            Live
          </span>
        </div>
        <div className="space-y-3">
          {["FIX 4.4", "REST API", "WebSocket"].map((label, i) => (
            <div
              key={label}
              className="flex items-center justify-between rounded-xl bg-white/5 px-3.5 py-2.5"
            >
              <span className="text-sm text-white/85">{label}</span>
              <span className="text-xs font-medium text-[#22C55E]">
                {i === 0 ? "<1ms" : i === 1 ? "99.9%" : "24/5"}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute -end-1 top-8 rounded-xl border border-[#E8ECF5] bg-white px-3.5 py-2.5 shadow-[0_10px_30px_rgba(27,42,107,0.12)] sm:end-2">
        <p className="text-[11px] text-[#6B7390]">Latency</p>
        <p className="text-sm font-semibold text-[#0B0F2A]">&lt;1ms</p>
      </div>

      <div className="absolute -start-1 bottom-10 rounded-xl border border-[#E8ECF5] bg-white px-3.5 py-2.5 shadow-[0_10px_30px_rgba(27,42,107,0.12)] sm:start-0">
        <p className="text-[11px] text-[#6B7390]">Uptime</p>
        <p className="text-sm font-semibold text-[#22C55E]">99.99%</p>
      </div>
    </div>
  );
}

function RegulatedIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 10.5L12 5l8 5.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M6.5 10.5V18.5M12 10.5V18.5M17.5 10.5V18.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M4 18.5h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function FundsIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="5" y="7" width="14" height="11" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M5 11h14" stroke="currentColor" strokeWidth="1.7" />
      <path d="M9 14.5h3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path
        d="M16.5 5.5l1.8 1.8M18.3 5.5l-1.8 1.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AuditIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8 4.5h6.5L18 8v11.5a1.5 1.5 0 01-1.5 1.5H8A1.5 1.5 0 016.5 19.5v-13A2 2 0 018 4.5z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M14.5 4.5V8H18" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M9 12.5h6M9 16h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function SupportIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5.5 12a6.5 6.5 0 0113 0v2.5a2 2 0 01-2 2h-1v-6.2a4.5 4.5 0 10-9 0V16.5h-1a2 2 0 01-2-2V12z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M12 19.5c1.2 0 2.2-.5 2.8-1.3"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

const TRUST_CARDS = [
  {
    key: "regulated",
    Icon: RegulatedIcon,
    fallbackTitle: "Multi-Regulated",
    fallbackDesc: "Licensed across multiple jurisdictions for global compliance",
  },
  {
    key: "funds",
    Icon: FundsIcon,
    fallbackTitle: "Segregated Funds",
    fallbackDesc: "Client funds held in separate accounts at top-tier banks",
  },
  {
    key: "audits",
    Icon: AuditIcon,
    fallbackTitle: "Annual Audits",
    fallbackDesc: "Independent third-party audits ensure full transparency",
  },
  {
    key: "support",
    Icon: SupportIcon,
    fallbackTitle: "24/5 Support",
    fallbackDesc: "Dedicated account managers & instant technical assistance",
  },
];

const DEFAULT_BADGES = [
  "Financial Commission",
  "FSCA Regulated",
  "FSC Licensed",
  "VFSC Authorized",
  "AQFA Member",
];

export default function WhatWeOfferSection({ copy }) {
  const offer = copy?.offerTitle || {};
  const trusted = copy?.trustedInstitutions || {};

  const tabs = useMemo(
    () => [
      {
        key: "liquidity",
        label: offer?.liquidity?.tab || offer?.liquidity?.title || "Liquidity",
        accent: offer?.liquidity?.accent || "Premium Access",
        title: offer?.liquidity?.featureTitle || "Deep Liquidity Pools",
        desc:
          offer?.liquidity?.desc ||
          "At GTC Prime, we offer liquidity solutions that can be customized to meet your specific needs and goals. Our technology-driven approach allows us to serve clients around the world, including hedge funds, brokers, exchanges, and other professional clients.",
        tags: offer?.liquidity?.tags || [
          "Multi-asset",
          "Ultra-low latency",
          "Tier-1 banks",
          "Custom streams",
        ],
        Visual: LiquidityVisual,
      },
      {
        key: "connectivity",
        label:
          offer?.connectivity?.tab ||
          offer?.connectivity?.title ||
          "Connectivity",
        accent: offer?.connectivity?.accent || "Premium Access",
        title:
          offer?.connectivity?.featureTitle || "Institutional Connectivity",
        desc:
          offer?.connectivity?.desc ||
          "Connectivity is an essential element of successful trading. At GTC Prime, we offer reliable and fast connectivity solutions to connect our clients to the world's financial markets.",
        tags: offer?.connectivity?.tags || [
          "FIX protocol",
          "Low latency",
          "Colocation",
          "Redundant links",
        ],
        Visual: LiquidityVisual,
      },
    ],
    [offer]
  );

  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const current = tabs.find((t) => t.key === activeTab) || tabs[0];
  const Visual = current.Visual;
  const badges = trusted.badges || DEFAULT_BADGES;
  

  return (
    <>
      <section className="bg-white py-12 md:py-16">
        <div className="container min-w-0 max-w-full">
          <div className=" relative max-w-6xl mx-auto ">
            <FadeInSection>
              <div className="mx-auto max-w-3xl text-center">
                <PillBadge>{offer.eyebrow || "Our Solutions"}</PillBadge>
                <h2 className="mt-4 HeadingH1 leading-[1.4] font-semibold text-[#000]">
                  {offer.heading || "What We Offer"}
                </h2>
                <p className="mx-auto mt-3 max-w-2xl Text leading-[1.6] font-normal text-[#4E4E4E]">
                  {offer.subtitle ||
                    "Institutional-grade solutions designed to power your trading infrastructure with speed, depth, and reliability."}
                </p>
              </div>
            </FadeInSection>
            <FadeInSection delay={0.2}>
              <div className="mx-auto mt-8 flex gap-3 w-fit items-center md:mt-10">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.key;
                  return (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => setActiveTab(tab.key)}
                      className={`rounded-full px-6 py-3 TextSmall font-medium transition-all duration-300 md:min-w-[140px] md:px-8 ${isActive
                        ? "bg-[#293B93] border border-[#293B93] text-white"
                        : "text-[#6B7390] bg-[#F1F5F9] border border-[#E2E8F0] hover:text-[#293B93]"
                        }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </FadeInSection>
            <FadeInSection delay={0.3}>
              <div className="mt-8 overflow-hidden rounded-[20px] bg-[#F8FAFF] md:mt-10">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="flex flex-col justify-center px-6 py-6 md:px-8 md:py-8">
                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#B48755]">
                      — {current.accent}
                    </p>
                    <h3 className="mt-3 font-bold tracking-tight text-[#293B93] HeadingH3 md:leading-tight">
                      {current.title}
                    </h3>
                    <p className="mt-4  TextSmall leading-relaxed text-[#8891A8] md:leading-6">
                      {current.desc}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2.5 sm:gap-3">
                      {current.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-[#EEF0F6] bg-white px-3 py-2 text-center font-medium text-[#182451] TextSmall"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="relative flex items-center justify-center bg-[#E4E8F4] px-6 py-6 md:px-8 md:py-8">
                    <Visual />
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      <section className="bg-white pb-12 md:pb-16 ">
        <div className="container min-w-0 max-w-full">
          <div className=" relative max-w-6xl mx-auto ">
            <FadeInSection>
              <div className="mx-auto max-w-3xl text-center">
                <PillBadge>{trusted.eyebrow || "Our Solutions"}</PillBadge>
                <h2 className="mt-4 text-2xl font-bold tracking-tight text-[#0B0F2A] sm:text-3xl md:text-[34px] md:leading-tight">
                  {trusted.heading || "Trusted by Institutions Worldwide"}
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-[#6B7390] md:text-[17px]">
                  {trusted.subtitle ||
                    "Security and transparency aren't marketing claims — they're built into every layer of our infrastructure."}
                </p>
              </div>
            </FadeInSection>
            <FadeInSection delay={0.2}>
              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-5">
                {TRUST_CARDS.map(({ key, Icon, fallbackTitle, fallbackDesc }) => (
                  <article
                    key={key}
                    className="rounded-2xl border border-[#E6EAF5] bg-white px-5 py-7 text-center shadow-[0_4px_24px_rgba(27,42,107,0.04)] transition hover:border-[#D4DBF0] hover:shadow-[0_10px_30px_rgba(27,42,107,0.08)] md:px-6 md:py-8"
                  >
                    <div className="mx-auto flex h-12 w-12 items-center justify-center text-[#293B93]">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="mt-4 text-base font-bold text-[#0B0F2A] md:text-[17px]">
                      {trusted?.[key]?.title || fallbackTitle}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#6B7390]">
                      {trusted?.[key]?.desc || fallbackDesc}
                    </p>
                  </article>
                ))}
              </div>
            </FadeInSection>
            <FadeInSection delay={0.3}>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 md:mt-10 md:gap-3">
                {badges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full border border-[#D7DEF5] bg-[#EEF2FF] px-3.5 py-1.5 text-[11px] font-semibold text-[#293B93] md:px-4 md:text-xs"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>
    </>
  );
}

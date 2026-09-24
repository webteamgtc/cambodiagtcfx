"use client";

import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import { PLATFORMS } from "../freeDemoAccountData";
import Image from "next/image";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="9" height="6" viewBox="0 0 9 6" fill="none">
      <path d="M3.48267 4.78556L7.90431 0.596819C8.04057 0.467727 8.26152 0.467727 8.3978 0.596819C8.53407 0.725918 8.53407 0.935221 8.3978 1.06432L3.88014 5.34404C3.66062 5.55199 3.30472 5.55199 3.08521 5.34404L0.602202 2.9918C0.465933 2.86271 0.465933 2.6534 0.602202 2.5243C0.738478 2.39521 0.959418 2.39521 1.09569 2.5243L3.48267 4.78556Z" fill="#293B93" stroke="#293B93" />
    </svg>
  );
}

function TrendIcon({ positive }) {
  return (
    <svg
      className={`h-2.5 w-2.5 shrink-0 ${positive ? "text-[#22C55E]" : "text-[#EF4444]"}`}
      viewBox="0 0 10 8"
      fill="currentColor"
      aria-hidden
    >
      {positive ? (
        <path d="M5 0L10 8H0L5 0Z" />
      ) : (
        <path d="M5 8L0 0H10L5 8Z" />
      )}
    </svg>
  );
}

function PlatformBadge({ label }) {
  return (
    <span className="shrink-0 rounded-full border border-[#E1E7F6] bg-[#F8F9FC] px-3 py-1 text-[11px] font-medium leading-none text-[#000]">
      {label}
    </span>
  );
}

function PlatformHeader({ platform }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex min-w-0 items-center gap-5">
        <span className="flex h-14 w-20 shrink-0 items-center justify-center HeadingH5 font-semibold text-white"
          style={{
            borderRadius: "10px",
            background: "linear-gradient(138deg, #4B5FC1 12.98%, #293B93 64.07%)"
          }}
        >
          {platform.iconLabel}
        </span>
        <div className="min-w-0 text-left">
          <h3 className="HeadingH5 font-semibold text-[#000]">{platform.name}</h3>
          <p className="TextSmall mt-0.5 font-normal text-[#999]">{platform.subtitle}</p>
        </div>
      </div>
      <PlatformBadge label={platform.badge} />
    </div>
  );
}

function FeatureGrid({ features, columns = 2 }) {
  return (
    <ul
      className={`mt-5 grid gap-x-4 gap-y-2.5 text-left ${columns === 2 ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-3"
        }`}
    >
      {features.map((feature, i) => (
        <li key={i} className="flex items-center gap-2">
          <span className="mt-1 h-6 w-6 flex justify-center items-center text-[#F8F9FC] border border-[#E1E7F6] rounded-full p-1">
            <CheckIcon />
          </span>
          <span className="TextSmall font-normal leading-snug text-[#69729F]">{feature}</span>
        </li>
      ))}
    </ul>
  );
}

function MarketDataTable({ markets, isLarge = false }) {
  return (
    <div className={` bg-[#F8F9FC] rounded-[22px]  ${isLarge == false ? "p-4 px-6 mt-5 pt-2 " : " pt-4"}`}>
      {markets.map((item) => (
        <div
          key={item.pair}
          className="flex items-center justify-between border-b border-b-dashed border-[#E1E7F6] py-2.5 last:border-b-0"
        >
          <span className="text-xs font-normal tracking-wide text-[#69729F]">{item.pair}</span>
          <span
            className={`flex items-center gap-1.5 text-xs font-normal ${item.positive ? "text-[#22C55E]" : "text-[#CF4447]"
              }`}
          >
            {item.price}
            <TrendIcon positive={item.positive} />
          </span>
        </div>
      ))}
    </div>
  );
}

function EquityCurveChart({ platform }) {
  return (
    <div className="rounded-[16px] bg-[#F8F9FC] p-4">
      <p className="text-[10px] font-normal uppercase tracking-[0.14em] text-[#69729F]">
        // EQUITY CURVE — 30D
      </p>
      <div className="relative mt-3 h-[100px] w-full sm:h-[120px]">
        <svg
          viewBox="0 0 320 120"
          preserveAspectRatio="none"
          className="h-full w-full"
          aria-hidden
        >
          <defs>
            <linearGradient id="equityFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#293B93" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#293B93" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          <path
            d="M0 95 L24 88 L48 92 L72 78 L96 82 L120 68 L144 72 L168 58 L192 62 L216 48 L240 52 L264 38 L288 42 L320 28 L320 120 L0 120 Z"
            fill="url(#equityFill)"
          />
          <path
            d="M0 95 L24 88 L48 92 L72 78 L96 82 L120 68 L144 72 L168 58 L192 62 L216 48 L240 52 L264 38 L288 42 L320 28"
            fill="none"
            stroke="#293B93"
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <MarketDataTable markets={platform.markets} isLarge={true} />

    </div>
  );
}

function StandardPlatformCard({ platform }) {
  return (
    <article className="interactive-card flex h-full flex-col rounded-[24px] border border-[#E1E7F6] bg-white p-6 shadow-[0_4px_30px_rgba(41,59,147,0.06)] md:p-7">
      <PlatformHeader platform={platform} />
      <p className="TextSmall mt-6 text-left font-normal leading-[1.65] text-[#69729F]">
        {platform.description}
      </p>
      <FeatureGrid features={platform.features} />
      <div className="mt-auto">
        <MarketDataTable markets={platform.markets} />
      </div>
    </article>
  );
}

function FeaturedPlatformCard({ platform }) {
  return (
    <article className="interactive-card rounded-[24px] border border-[#E1E7F6] bg-white p-6  md:p-8">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
        <div className="min-w-0">
          <PlatformHeader platform={platform} />
          <p className="TextSmall mt-6 text-left font-normal leading-[1.65] text-[#69729F]">
            {platform.description}
          </p>
          <FeatureGrid features={platform.features} columns={2} />
        </div>

        <div className="flex min-w-0 flex-col justify-center">
          <EquityCurveChart platform={platform} />
        </div>
      </div>
    </article>
  );
}

export default function FreeDemoAccountPlatformsSection() {
  const t = usePathTranslation("freeDemoAccountPage.platformsSection");

  const platforms = PLATFORMS.map((platform) => ({
    ...platform,
    name: t(`items.${platform.key}.name`, platform.name),
    subtitle: t(`items.${platform.key}.subtitle`, platform.subtitle),
    badge: t(`items.${platform.key}.badge`, platform.badge),
    description: t(`items.${platform.key}.description`, platform.description),
    features: platform.features.map((feature, i) =>
      t(`items.${platform.key}.features.${i}`, feature)
    ),
  }));

  const standardPlatforms = platforms.filter((item) => item.variant === "standard");
  const featuredPlatform = platforms.find((item) => item.variant === "featured");

  return (
    <section
      className="py-8 relative md:py-16"
    // style={{
    //   backgroundColor: "#F8F9FC",
    //   backgroundImage:
    //     "linear-gradient(#E1E7F6 1px, transparent 1px), linear-gradient(90deg, #E1E7F6 1px, transparent 1px)",
    //   backgroundSize: "32px 32px",
    // }}
    >
      <div className="pointer-events-none  h-full absolute inset-0 -z-10 overflow-hidden" aria-hidden>
        <Image
          src={"/new-design/about-us/bg.webp"}
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl text-center">
          <SectionEyebrow variant="compact" className="capitalize">
            {t("eyebrow", "Platforms")}
          </SectionEyebrow>

          <h2 className="HeadingH1 mx-auto mt-4 max-w-3xl font-semibold leading-[1.25] text-[#000]">
            {t("titleLine1", "Three platforms.")}{" "} <br />
            <span className="text-[#293B93]">{t("titleHighlight", "One unified strategy environment.")}</span>
          </h2>

          <p className="Text mx-auto mt-5 max-w-3xl font-normal leading-[1.7] text-[#000032]/60">
            {t("description", "Pick the engine that matches your strategy DNA — from classic MQL automation to next-generation multi-asset analytics.")}
          </p>


          <div className="mt-10 space-y-5 text-left lg:mt-12">
            <div className="grid gap-5 lg:grid-cols-2">
              {standardPlatforms.map((platform) => (
                <StandardPlatformCard key={platform.key} platform={platform} />
              ))}
            </div>

            {featuredPlatform ? (
              <FeaturedPlatformCard platform={featuredPlatform} />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

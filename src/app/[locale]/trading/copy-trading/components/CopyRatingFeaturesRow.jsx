"use client";

import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

const FEATURES = [
  { key: "realPerformance", icon: "chart" },
  { key: "riskManaged", icon: "shield" },
  { key: "dataDriven", icon: "clock" },
  { key: "topTraders", icon: "user" },
];

function FeatureIcon({ type }) {
  const iconClass = "h-7 w-7 text-white";

  if (type === "shield") {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 3L4 6.5V11.5C4 16.02 7.58 20.17 12 21C16.42 20.17 20 16.02 20 11.5V6.5L12 3Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M9.5 12L11.2 13.7L14.8 10.1"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "clock") {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M12 8V12L14.5 14"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === "user") {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="8.5" r="3.5" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M5.5 19.5C6.6 16.4 9.1 14.5 12 14.5C14.9 14.5 17.4 16.4 18.5 19.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 16L9 11L13 15L20 8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 8H20V12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function CopyRatingFeaturesRow() {
  const t = usePathTranslation("copyTradingPage.rating.features");

  return (
    <div className="py-14 mx-auto max-w-5xl grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
      {FEATURES.map((feature) => (
        <div key={feature.key} className="flex min-w-0 items-center gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#293B93]">
            <FeatureIcon type={feature.icon} />
          </span>
          <div className="min-w-0">
            <h3 className="TextButton font-semibold text-[#182451]">
              {t(`${feature.key}.title`)}
            </h3>
            <p className="text-xs font-normal leading-[1.4] text-[#7C86A0]">
              {t(`${feature.key}.description`)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

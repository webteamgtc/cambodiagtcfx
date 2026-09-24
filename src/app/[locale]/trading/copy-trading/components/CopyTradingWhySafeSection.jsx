"use client";

import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

const STATS = [
  { key: "clients" },
  { key: "instruments" },
  { key: "signalTrades" },
  { key: "hiddenFees" },
];

const TRUST_CARDS = [
  { key: "regulated", icon: "regulated" },
  { key: "segregated", icon: "segregated" },
  { key: "verified", icon: "verified" },
];

function TrustIcon({ type }) {
  const iconClass = "h-5 w-5 text-[#293B93]";

  if (type === "segregated") {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 3L4 6.5V11.5C4 16.02 7.58 20.17 12 21C16.42 20.17 20 16.02 20 11.5V6.5L12 3Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="12" r="1.6" fill="currentColor" />
        <path
          d="M12 10.2V13.8"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === "verified") {
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

  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="5"
        y="4"
        width="14"
        height="16"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M9 8H15M9 12H15M9 16H12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="17" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function StatItem({ value, label }) {
  return (
    <div className="min-w-0">
      <p className="HeadingH2 font-semibold leading-none text-[#293B93]">{value}</p>
      <p className="TextSmall mt-1 font-medium text-[#8A93A8]">{label}</p>
    </div>
  );
}

function TrustCard({ icon, title, description }) {
  return (
    <article className="flex items-start gap-4 transition p-3 md:p-6"
      style={{
        borderRadius: "15px",
        border: "1px solid #E8EDF7",
        background: "#FFF",
      }}
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center transition"
        style={{
          borderRadius: "10px",
          background: "#FFF",
          boxShadow: "0 4px 30px 0 rgba(41, 59, 147, 0.10)",
        }}
      >
        <TrustIcon type={icon} />
      </span>
      <div className="min-w-0">
        <h3 className="TextButton font-semibold text-[#000032] transition">{title}</h3>
        <p className="TextSmall mt-0.5 font-normal leading-[1.5] text-[#7C86A0]">
          {description}
        </p>
      </div>
    </article>
  );
}

export default function CopyTradingWhySafeSection() {
  const t = usePathTranslation("copyTradingPage.whyItsSafe");

  return (
    <section className="relative py-12 md:py-16"
      style={{
        background: "linear-gradient(180deg, #F6F8FC 0%, rgba(241, 244, 251, 0.00) 100%)"
      }}
    >
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl">
          <div className=" text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#E1E7F6] bg-[#F7F9FF] px-4 py-2 text-sm font-medium uppercase tracking-[0.08em] text-[#293B93]">
              <svg xmlns="http://www.w3.org/2000/svg" width="5" height="5" viewBox="0 0 5 5" fill="none">
                <circle cx="2.5" cy="2.5" r="2.5" fill="#12BA82" />
              </svg>
              {t("badge")}
            </span>

            <h2 className="HeadingH1 max-w-xl mx-auto mt-5 font-semibold leading-[1.4] md:mt-6">
              {t("title")}
            </h2>

            <p className="Text mx-auto mt-5 max-w-2xl font-normal leading-[1.4] text-[#4E4E4E]">
              {t("description")}
            </p>
          </div>

          <div className="mt-10 grid items-start gap-8 lg:mt-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12 xl:gap-16">
            <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:gap-x-12 md:gap-y-12 lg:pt-2">
              {STATS.map((stat) => (
                <StatItem
                  key={stat.key}
                  value={t(`stats.${stat.key}.value`)}
                  label={t(`stats.${stat.key}.label`)}
                />
              ))}
            </div>

            <div className="flex flex-col gap-4 md:gap-5">
              {TRUST_CARDS.map((card) => (
                <TrustCard
                  key={card.key}
                  icon={card.icon}
                  title={t(`cards.${card.key}.title`)}
                  description={t(`cards.${card.key}.description`)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

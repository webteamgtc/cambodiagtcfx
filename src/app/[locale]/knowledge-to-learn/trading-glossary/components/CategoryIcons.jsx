"use client";

import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

function ListIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  );
}

function BarChartIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="12" y1="20" x2="12" y2="10" />
      <line x1="18" y1="20" x2="18" y2="4" />
      <line x1="6" y1="20" x2="6" y2="16" />
    </svg>
  );
}

function BankIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3 21h18" />
      <path d="M5 21V7l8-4 8 4v14" />
      <path d="M10 21v-5a2 2 0 0 1 4 0v5" />
    </svg>
  );
}

function ExchangeIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M7 10h14l-4-4" />
      <path d="M17 14H3l4 4" />
    </svg>
  );
}

function ClipboardIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="8" y="2" width="8" height="4" rx="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M9 12h6" />
      <path d="M9 16h6" />
    </svg>
  );
}

function TrendingUpIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}

const CATEGORIES = [
  { key: "abbreviations", fallback: "Abbreviations", icon: ListIcon },
  { key: "analysis", fallback: "Analysis", icon: BarChartIcon },
  { key: "economics", fallback: "Economics", icon: BankIcon },
  { key: "forex", fallback: "Forex", icon: ExchangeIcon },
  { key: "organizations", fallback: "Organizations", icon: ClipboardIcon },
  { key: "trading", fallback: "Trading", icon: TrendingUpIcon },
];

export default function CategoryIcons() {
  const t = usePathTranslation("glossaryPage.categories");

  return (
    <section className="bg-white pb-10 md:pb-16">
      <div className="container">
        <div className="grid grid-cols-3 gap-4 md:grid-cols-6">
          {CATEGORIES.map(({ key, fallback, icon: Icon }) => (
            <div
              key={key}
              className="flex flex-col items-center justify-center gap-2 rounded-xl bg-[#EEF0FF] p-5"
            >
              <Icon className="h-8 w-8 text-[#293B93]" />
              <span className="text-center text-sm font-medium text-[#000032]">
                {t(key, fallback)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { localizedHref } from "@/i18n/localizedHref";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

const LETTERS = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(97 + i)
);

function HomeIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5z" />
    </svg>
  );
}

export default function AlphabetFilter({ locale, activeLetter }) {
  const t = usePathTranslation("glossaryPage");

  return (
    <section className="bg-white pb-10 md:pb-16">
      <div className="container">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-gray-500">
          {t("alphabet", "ALPHABET")}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={localizedHref(locale, "/knowledge-to-learn/trading-glossary")}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-gray-700 transition hover:border-[#293B93] hover:text-[#293B93]"
            aria-label={t("homeAria", "Trading glossary home")}
          >
            <HomeIcon className="h-4 w-4" />
          </Link>

          {LETTERS.map((letter) => {
            const isActive = activeLetter === letter;
            return (
              <Link
                key={letter}
                href={localizedHref(
                  locale,
                  `/knowledge-to-learn/trading-glossary/${letter}`
                )}
                aria-current={isActive ? "page" : undefined}
                className={`flex h-9 w-9 items-center justify-center rounded-md border text-sm font-medium transition ${
                  isActive
                    ? "border-[#293B93] bg-[#293B93] text-white"
                    : "border-gray-200 text-gray-700 hover:border-[#293B93] hover:text-[#293B93]"
                }`}
              >
                {letter.toUpperCase()}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

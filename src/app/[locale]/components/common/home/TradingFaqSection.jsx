"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useLocale, usePathTranslation } from "../../../LocaleProvider";
import { localizedHref } from "@/i18n/localizedHref";

const FAQ_KEYS = [
  "cfdTrading",
  "markets",
  "leverage",
  "spreadsAndCommissions",
  "margin",
];

function QuestionIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 text-[#747474]"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M9.8 9.4a2.35 2.35 0 0 1 4.53.85c0 1.64-1.92 1.95-1.92 3.35"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="12" cy="15.9" r=".8" fill="currentColor" />
    </svg>
  );
}

function PlusIcon({ open }) {
  return (
    <span
      className={`relative flex h-5 w-5 flex-none items-center justify-center rounded-full border border-[#8B8B8B] transition-transform duration-300 md:h-8 md:w-8 ${
        open ? "rotate-45" : ""
      }`}
      aria-hidden="true"
    >
      <span className="absolute h-px w-2.5 bg-[#5F5F5F] md:w-3" />
      <span className="absolute h-2.5 w-px bg-[#5F5F5F] md:h-3" />
    </span>
  );
}

export default function TradingFaqSection() {
  const locale = useLocale();
  const t = usePathTranslation("home.tradingFaqSection");
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = useMemo(
    () =>
      FAQ_KEYS.map((key) => ({
        key,
        question: t(`faqs.${key}.question`, ""),
        answer: t(`faqs.${key}.answer`, ""),
      })),
    [t]
  );

  const titleLine1 = t("titleLine1", "Everything You Need to");
  const titleLine2 = t("titleLine2", "Know");
  const description = t(
    "description",
    "Still have a trading question? Reach our customer service team for support."
  );
  const contactCta = t("contactCta", "Contact us");
  const contactHref =
    localizedHref(locale, t("contactHref", "/company/contact-us")) ||
    "/company/contact-us";

  const handleToggle = (index) => {
    setActiveIndex((current) => (current === index ? null : index));
  };

  return (
    <section className="overflow-hidden bg-[linear-gradient(180deg,#F8F9FC_0%,#FFFFFF_100%)] pt-12 sm:pt-16">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="pb-12 lg:col-span-5 lg:pb-0">
            <QuestionIcon />

            <h2 className="HeadingH3 mt-7">
              {titleLine1}
              <br />
              {titleLine2}
            </h2>

            <p className="mt-6 max-w-[470px] text-base leading-relaxed text-[#737373] sm:text-lg">
              {description}
            </p>

            <Link
              href={contactHref}
              className="mt-12 inline-flex min-h-14 items-center justify-center rounded-full bg-[#293B93] px-7 text-lg font-semibold text-white transition hover:bg-[#1E2D77]"
            >
              {contactCta}
            </Link>
          </div>

          <div className="lg:col-span-7">
            <div className="border-y border-[#D9DFEB]">
              {faqs.map((faq, index) => {
                const isOpen = activeIndex === index;
                const answerId = `faq-answer-${index}`;

                return (
                  <div
                    key={faq.key}
                    className="border-b border-[#D9DFEB] last:border-b-0"
                  >
                    <button
                      type="button"
                      onClick={() => handleToggle(index)}
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                      className="flex w-full items-center justify-between gap-5 py-7 text-left sm:py-8"
                    >
                      <span className="text-sm md:text-base font-semibold leading-snug text-neutral-950 sm:text-xl">
                        {faq.question}
                      </span>

                      <PlusIcon open={isOpen} />
                    </button>

                    <div
                      id={answerId}
                      className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                        isOpen
                          ? "grid-rows-[1fr] pb-7 opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="max-w-[720px] pr-14 text-base leading-relaxed text-[#686868]">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

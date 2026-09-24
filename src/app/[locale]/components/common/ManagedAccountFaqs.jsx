"use client";

import React, { useId, useMemo, useState } from "react";

function objectValuesInOrder(obj) {
  if (!obj || typeof obj !== "object" || Array.isArray(obj)) return [];
  const order = [
    "one",
    "onea",
    "oneb",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "one1",
    "one2",
    "one3",
    "one4",
  ];

  const keys = Object.keys(obj);
  const ranked = [...keys].sort((a, b) => {
    const ai = order.indexOf(a);
    const bi = order.indexOf(b);
    if (ai === -1 && bi === -1) return 0;
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });

  return ranked
    .map((k) => obj[k])
    .filter((v) => typeof v === "string" && v.trim().length);
}

export default function ManagedAccountFaqs({ faq }) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState(0);

  const faqItems = useMemo(() => {
    // Supported shapes:
    // 1) primeTech.{pamm|mam}.faq: { faqHeading, accordionData: { title, para: { one, two... } } }
    // 2) vps-like: { title, question1, answer1, question2, answer2, ... }
    // 3) array of either shape (use first entry)
    const src = Array.isArray(faq) ? faq[0] : faq;
    const heading = src?.faqHeading || src?.title || "Frequently Asked Questions";

    // Shape 1
    if (src?.accordionData) {
      const accordion = src.accordionData || {};
      const question = accordion?.title || "";
      const answerLines = objectValuesInOrder(accordion?.para);
      const items = question ? [{ question, answerLines }] : [];
      return { heading, items };
    }

    // Shape 2
    const items = [];
    for (let i = 1; i <= 30; i += 1) {
      const q = src?.[`question${i}`];
      const a = src?.[`answer${i}`];
      if (typeof q === "string" && q.trim().length) {
        items.push({
          question: q,
          answerLines: typeof a === "string" && a.trim().length ? [a] : [],
        });
      }
    }

    return { heading, items };
  }, [faq]);

  if (!faqItems.items.length) return null;

  return (
    <section
      className="border-t border-slate-200 bg-gradient-to-b from-slate-50/80 to-white py-10 md:py-14"
      aria-labelledby={`${baseId}-faq-heading`}
    >
      <div className="container max-w-6xl">
        <div className="mb-8 text-center md:mb-10">
          <h2 id={`${baseId}-faq-heading`} className="HeadingH3 text-dark">
            {faqItems.heading}
          </h2>
        </div>

        <ul className="flex flex-col gap-3 md:gap-4" role="list">
          {faqItems.items.map((item, i) => {
            const isOpen = openIndex === i;
            const panelId = `${baseId}-panel-${i}`;
            const headerId = `${baseId}-header-${i}`;

            return (
              <li key={i} className="list-none">
                <div
                  className={`overflow-hidden rounded-2xl border transition-[border-color,box-shadow] duration-200 ${
                    isOpen
                      ? "border-primary/25 bg-white shadow-[0_8px_30px_rgba(38,55,136,0.08)] ring-1 ring-primary/10"
                      : "border-slate-200/90 bg-white shadow-sm hover:border-slate-300 hover:shadow-md"
                  }`}
                >
                  <h3 className="m-0 p-0 text-base font-normal leading-normal">
                    <button
                      type="button"
                      id={headerId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex((prev) => (prev === i ? null : i))}
                      className="flex w-full min-h-[3.25rem] items-center gap-3 rounded-t-2xl px-4 py-3.5 text-start outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2 md:min-h-0 md:px-5 md:py-4"
                    >
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold transition-colors md:h-10 md:w-10 ${
                          isOpen
                            ? "bg-gradient-to-br from-[#263788] to-[#101638] text-white"
                            : "bg-slate-100 text-slate-500"
                        }`}
                        aria-hidden
                      >
                        {i + 1}
                      </span>
                      <span className="min-w-0 flex-1 text-[15px] font-semibold leading-snug text-dark text-start md:text-base">
                        {item.question}
                      </span>
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-all duration-200 ${
                          isOpen
                            ? "rotate-180 border-primary/20 bg-primary/10 text-primary"
                            : "border-slate-200 bg-slate-50 text-slate-500"
                        }`}
                        aria-hidden
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </span>
                    </button>
                  </h3>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={headerId}
                    className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="border-t border-slate-100 px-4 pb-4 pt-1 md:px-5 md:pb-5 md:pt-2">
                        <div className="ps-0 md:ps-[3.25rem] space-y-2">
                          {item.answerLines.map((line, idx) => (
                            <p key={idx} className="TextSmall text-slate-600 leading-relaxed">
                              {line}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}


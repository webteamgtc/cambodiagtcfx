"use client";

import { useState } from "react";
import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import { FAQ_ITEMS } from "../freeDemoAccountData";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div className="overflow-hidden rounded-[16px] border border-[#E1E7F6] bg-white">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6 md:py-5"
        aria-expanded={isOpen}
      >
        <span className="Text font-semibold text-[#000]">{item.question}</span>
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#E1E7F6] text-[#293B93] transition-transform ${isOpen ? "rotate-45 text-white bg-[#293B93]" : "bg-[#F8F9FC]"
            }`}
          aria-hidden
        >
          +
        </span>
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
      >
        <div className="overflow-hidden">
          <p className="TextSmall whitespace-pre-line px-5 pb-5 font-normal leading-[1.7] text-[#000032]/60 md:px-6 md:pb-6">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FreeDemoAccountFaqSection() {
  const t = usePathTranslation("freeDemoAccountPage.faqSection");
  const [openIndex, setOpenIndex] = useState(0);

  const faqItems = FAQ_ITEMS.map((item, index) => ({
    question: t(`items.${index}.question`, item.question),
    answer: t(`items.${index}.answer`, item.answer),
  }));

  return (
    <section className=" py-8 md:py-16">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-3xl text-center">
          <SectionEyebrow>{t("eyebrow", "FAQ")}</SectionEyebrow>

          <h2 className="HeadingH1 mx-auto mt-4 font-semibold leading-[1.25] text-[#000]">
            {t("title", "Common questions, answered.")}
          </h2>
          <p className="Text mx-auto mt-5 max-w-3xl font-normal leading-[1.7] text-[#000032]/60">
            {t("description", "Everything you need to know about the GTCFX demo account before you click \"open.\"")}
          </p>

          <div className="mt-10 space-y-3 text-left md:mt-12">
            {faqItems.map((item, index) => (
              <FaqItem
                key={index}
                item={item}
                isOpen={openIndex === index}
                onToggle={() =>
                  setOpenIndex((current) => (current === index ? -1 : index))
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import clsx from "clsx";
import { useState } from "react";
import FadeInSection from "@/app/[locale]/company/contact-us/components/FadeInSection";
import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";
import { FAQ_ITEMS } from "../vpsHostingData";

function ToggleIcon({ isOpen }) {
  if (isOpen) {
    return (
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#293B93] text-white">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
          <path d="M2 2L10 10M10 2L2 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </span>
    );
  }

  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E8EEFC] text-lg font-normal leading-none text-[#293B93]">
      +
    </span>
  );
}

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div
      className={clsx(
        "overflow-hidden rounded-[14px] bg-white transition-colors",
        isOpen ? "border border-[#293B93]" : "border border-[#E1E7F6]"
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left md:px-5"
        aria-expanded={isOpen}
      >
        <span className="Text font-medium text-[#000]">{item.question}</span>
        <ToggleIcon isOpen={isOpen} />
      </button>

      <div
        className={clsx(
          "grid transition-[grid-template-rows] duration-300 ease-out",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <p className="TextSmall px-4 pb-4 font-normal leading-[1.7] text-[#69729F] md:px-5 md:pb-4">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function VpsHostingFaqSection() {
  const t = usePathTranslation("vpsHostingPage.faq");
  const [openIndex, setOpenIndex] = useState(0);

  const items = FAQ_ITEMS.map((item, index) => ({
    question: t(`items.${index}.question`, item.question),
    answer: t(`items.${index}.answer`, item.answer),
  }));

  return (
    <section className="bg-[#F8F9FC] pb-12 md:pb-16">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-3xl">
          <FadeInSection>
            <div className="text-center">
              <SectionEyebrow variant="compact" className="!text-[#293B93] capitalize">
                {t("eyebrow", "FAQ")}
              </SectionEyebrow>
              <h2 className="HeadingH1 mt-4 font-semibold leading-[1.25] text-[#000]">
                {t("heading", "Frequently Asked Questions")}
              </h2>
              <p className="Text mx-auto mt-5 max-w-2xl font-normal leading-[1.7] text-[#000032]/60">
                {t("sub", "Everything you need to know about GTCFX VPS hosting before you apply.")}
              </p>
            </div>
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <div className="mt-10 space-y-3 text-left">
              {items.map((item, index) => (
                <FaqItem
                  key={item.question}
                  item={item}
                  isOpen={openIndex === index}
                  onToggle={() => setOpenIndex((current) => (current === index ? -1 : index))}
                />
              ))}
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

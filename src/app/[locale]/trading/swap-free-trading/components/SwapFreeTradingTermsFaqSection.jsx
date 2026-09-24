"use client";

import clsx from "clsx";
import { useState } from "react";
import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import { FAQ_ITEMS, TERMS_ITEMS } from "../swapFreeTradingData";
import FadeInSection from "@/app/[locale]/company/contact-us/components/FadeInSection";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

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

function AccordionItem({ item, isOpen, onToggle, delay }) {
  return (
    <FadeInSection delay={delay}>
      <div
        className={clsx(
          "overflow-hidden rounded-[14px] bg-white transition-colors",
          isOpen ? "border border-[#293B93]" : "border border-[#E1E7F6]"
        )}
      >
        <button
          type="button"
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left md:px-5 md:py-5"
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
            <p className="TextSmall px-4 pb-4 font-normal leading-[1.7] text-[#69729F] md:px-5 md:pb-5">
              {item.answer}
            </p>
          </div>
        </div>
      </div>
    </FadeInSection>
  );
}

function AccordionGroup({ items, openIndex, onToggle }) {
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <AccordionItem
          key={item.question}
          item={item}
          isOpen={openIndex === index}
          onToggle={() => onToggle(index)}
          delay={index * 0.1}
        />
      ))}
    </div>
  );
}

export default function SwapFreeTradingTermsFaqSection() {
  const t = usePathTranslation("swapFreeTradingPage.termsFaq");
  const [termsOpen, setTermsOpen] = useState(0);
  const [faqOpen, setFaqOpen] = useState(0);

  const termsItems = TERMS_ITEMS.map((item, index) => ({
    question: t(`terms.${index}.question`, item.question),
    answer: t(`terms.${index}.answer`, item.answer),
  }));

  const faqItems = FAQ_ITEMS.map((item, index) => ({
    question: t(`faqs.${index}.question`, item.question),
    answer: t(`faqs.${index}.answer`, item.answer),
  }));

  return (
    <section className=" py-10  md:py-16">

      <div className="container relative min-w-0 max-w-full">
        <div className="mx-auto max-w-3xl">
          <FadeInSection>
            <div className="text-center">
              <SectionEyebrow variant="compact" className="!text-[#293B93]  capitalize tracking-[0.18em]">
                {t("eyebrow", "Terms & FAQ")}
              </SectionEyebrow>

              <h2 className="HeadingH1 mx-auto mt-4 max-w-xl font-semibold leading-[1.25] text-[#000]">
                {t("heading", "Terms & conditions + frequently asked questions")}
              </h2>

              <p className="TextSmall mx-auto mt-4 font-normal uppercase tracking-[0.12em] text-[#69729F]">
                {t("termsLabel", "Terms & Conditions")}
              </p>
            </div>
          </FadeInSection>
          <div className="mt-8">
            <AccordionGroup
              items={termsItems}
              openIndex={termsOpen}
              onToggle={(index) =>
                setTermsOpen((current) => (current === index ? -1 : index))
              }
            />
          </div>

          <div className="mt-12">
            <h3 className="HeadingH5 mb-5 text-left font-semibold text-[#293B93]">
              {t("faqLabel", "Frequently Asked Questions")}
            </h3>

            <AccordionGroup
              items={faqItems}
              openIndex={faqOpen}
              onToggle={(index) =>
                setFaqOpen((current) => (current === index ? -1 : index))
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}

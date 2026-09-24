"use client";

import FadeInSection from "@/app/[locale]/company/contact-us/components/FadeInSection";
import clsx from "clsx";
import { useState } from "react";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

function ChevronIcon({ isOpen }) {
  return (
    <svg
      className={clsx(
        "h-5 w-5 shrink-0 transition-transform duration-300",
        isOpen ? "rotate-180 text-[#293B93]" : "text-[#000032]"
      )}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FaqItem({ item, isOpen, onToggle, isLast, t, index }) {
  return (
    <div className={clsx("border-[#E8EDFA]", !isLast && "border-b")}>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
        aria-expanded={isOpen}
      >
        <span
          className={clsx(
            "HeadingH5 font-medium",
            isOpen ? "text-[#293B93]" : "text-[#000032]"
          )}
        >
          {t(`items.${index}.question`, item.question)}
        </span>
        <ChevronIcon isOpen={isOpen} />
      </button>

      <div
        className={clsx(
          "grid transition-[grid-template-rows] duration-300 ease-out",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <p className="TextSmall pb-5 pr-8 font-normal leading-[1.7] text-[#4E4E4E]">
            {t(`items.${index}.answer`, item.answer)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AssetFaqSection({ data }) {
  const { faq } = data;
  const t = usePathTranslation(`${data.i18nKey}.faq`);
  const [openIndex, setOpenIndex] = useState(1);

  return (
    <section className="bg-white py-8 md:py-16">
      <div className="container min-w-0 max-w-full">
        <div className="text-center mx-auto max-w-6xl ">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#EDF0FB] px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-[#293B93]" aria-hidden />
            <span className="TextSmall font-normal text-[#293B93]">{t("eyebrow", faq.eyebrow ?? "FAQ")}</span>
          </span>
          <div className="mx-auto max-w-3xl">
            <FadeInSection>
            <h2 className="HeadingH1 mx-auto mt-5 font-semibold text-[#000]">{t("title", faq.title)}</h2>
            </FadeInSection>
            <FadeInSection delay={0.1}>
            <p className="Text mx-auto mt-4 max-w-2xl font-normal leading-[1.7] text-[#4E4E4E]">{t("sub", faq.sub)}</p>
            </FadeInSection>
          </div>
          <div className="mt-10 text-left">
            {faq.items.map((item, index) => (
              <div key={index}>
              <FadeInSection delay={index * 0.2}>
              <FaqItem
                item={item}
                index={index}
                t={t}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex((current) => (current === index ? -1 : index))}
                isLast={index === faq.items.length - 1}
              />
              </FadeInSection>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

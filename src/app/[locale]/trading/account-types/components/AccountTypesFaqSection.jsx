"use client";

import clsx from "clsx";
import { useState } from "react";
import Button from "@/app/[locale]/components/common/Button";
import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import { localizedHref } from "@/i18n/localizedHref";
import { FAQ_ITEMS } from "../accountTypesData";
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

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div
      className={clsx(
        "overflow-hidden rounded-[14px] bg-white transition-colors",
        isOpen ? "border-2 border-[#293B93]" : "border border-[#E1E7F6]"
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-3 py-3 text-left md:px-5 md:py-3"
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
          <p className="TextSmall whitespace-pre-line px-3 pb-3 font-normal leading-[1.7] text-[#69729F] md:px-5 md:pb-3">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AccountTypesFaqSection({ locale = "en" }) {
  const t = usePathTranslation("accountTypesPage.faqSection");
  const [openIndex, setOpenIndex] = useState(0);

  const faqItems = FAQ_ITEMS.map((item, index) => ({
    question: t(`items.${index}.question`, item.question),
    answer: t(`items.${index}.answer`, item.answer),
  }));

  return (
    <section className=" py-2 md:py-4 pb-8 md:pb-14">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 md:grid-cols-2 md:gap-14 md:items-start">
            <div className="min-w-0 text-left">
              <SectionEyebrow variant="compact" className="!text-[#293B93] capitalize">
                {t("eyebrow", "FAQ")}
              </SectionEyebrow>

              <h2 className="HeadingH1 mt-4 max-w-md font-semibold leading-[1.25] text-[#000]">
                {t("title", "Common questions answered.")}
              </h2>

              <p className="Text mt-5 max-w-xl font-normal leading-[1.7] text-[#000032]/60">
                {t("description", "If you don't see your question here, our team is one message away — every trading hour, every weekday.")}
              </p>

              <div className="mt-10 rounded-[14px] border max-w-sm border-[#E1E7F6] bg-white p-5 md:p-6">
                <h3 className="HeadingH5 font-semibold text-[#000032]">{t("sideCard.title", "Still wondering?")}</h3>
                <p className="TextSmall mt-2 font-normal leading-[1.65] text-[#666]">
                  {t("sideCard.description", "Talk to a specialist — get a clear, jargon-free answer in under 2 minutes.")}
                </p>
                <div className="mt-7">
                  <Button
                    href={localizedHref(locale, "/company/contact-us")}
                    variant="brand"
                    size="md"
                    fullWidth
                    className="!rounded-full !w-fit"
                  >
                    {t("sideCard.cta", "Chat with us")} <span aria-hidden>→</span>
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-3">
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
      </div>
    </section>
  );
}

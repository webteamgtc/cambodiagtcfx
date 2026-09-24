"use client";

import { useState } from "react";
import FadeInSection from "@/app/[locale]/company/regulations/components/FadeInSection";
import { FiPlus, FiMinus } from "react-icons/fi";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#E1E7F6] bg-white transition hover:shadow-sm">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left md:px-8"
      >
        <span className="text-sm font-semibold text-[#000032]">{item.q}</span>
        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition ${isOpen ? "bg-[#293B93] text-white" : "bg-[#F0F2F8] text-[#293B93]"}`}>
          {isOpen ? <FiMinus className="h-4 w-4" /> : <FiPlus className="h-4 w-4" />}
        </span>
      </button>
      {isOpen && (
        <div className="px-6 pb-5 md:px-8">
          <p className="text-sm leading-relaxed text-[#666]">{item.a}</p>
        </div>
      )}
    </div>
  );
}

export default function PammMamFaqSection({ data }) {
  const { faq } = data;
  const t = usePathTranslation(`${data.i18nKey}.faq`);
  const [openIndex, setOpenIndex] = useState(0);

  const items = faq.items.map((item, index) => ({
    q: t(`items.${index}.q`, item.q),
    a: t(`items.${index}.a`, item.a),
  }));

  return (
    <section className="bg-white py-10 md:py-16">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-3xl">
          <FadeInSection>
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#293B93]">{t("eyebrow", faq.eyebrow)}</p>
              <h2 className="HeadingH1 mt-3 text-[#000032]">{t("heading", faq.heading)}</h2>
              <p className="Text mx-auto mt-5 max-w-xl font-normal leading-[1.7] text-[#000032]/60">{t("sub", faq.sub)}</p>
            </div>
          </FadeInSection>

          <div className="mt-10 space-y-4">
            {items.map((item, index) => (
              <FadeInSection key={index} delay={index * 0.05}>
                <FaqItem
                  item={item}
                  isOpen={openIndex === index}
                  onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
                />
              </FadeInSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

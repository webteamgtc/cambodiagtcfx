"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathTranslation } from "../../LocaleProvider";

const STATS = [
  { value: "24", key: "articles" },
  { value: "98%", key: "resolved" },
  { value: "24-7", key: "liveSupport" },
];

function ChevronIcon({ open }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={`shrink-0 text-[#555e7a] transition-transform duration-300 ${open ? "rotate-0" : "rotate-180"}`}>
      <path d="M18 15l-6-6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AccordionItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className="border border-[#E8EAF2]  rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 text-left bg-[#F3F5F7] hover:bg-[#fafbff] transition-colors"
      >
        <span className="font-semibold text-[#1a1a2e] text-sm pr-4">{question}</span>
        <ChevronIcon open={isOpen} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-40" : "max-h-0"}`}>
        <div className="px-5 pb-4 text-sm text-[#555e7a] leading-relaxed border-t border-[#E8EAF2] pt-3 bg-white">{answer}</div>
      </div>
    </div>
  );
}

export default function QandASection() {
  const t = usePathTranslation("knowledgePage.qanda");
  const [openId, setOpenId] = useState(1);
  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  const faqItems = [
    {
      id: 1,
      question: t("items.0.question", "Ask price/Ask"),
      answer: t(
        "items.0.answer",
        "The price at which a seller has offered to purchase the currency or instrument."
      ),
    },
    {
      id: 2,
      question: t("items.1.question", "What leverage options are available for trading?"),
      answer: t(
        "items.1.answer",
        "GTCFX offers flexible leverage options up to 1:2000 depending on your account type, instrument, and regulatory region. Please refer to our leverage page for full details."
      ),
    },
    {
      id: 3,
      question: t("items.2.question", "Is my account and funds protected?"),
      answer: t(
        "items.2.answer",
        "Yes. Client funds are held in segregated accounts with top-tier banks. GTCFX complies with regulatory requirements to ensure the safety of your funds."
      ),
    },
    {
      id: 4,
      question: t("items.3.question", "Is my account and funds protected?"),
      answer: t(
        "items.3.answer",
        "GTCFX uses advanced encryption and two-factor authentication to protect your account. Our risk management team monitors accounts 24/7."
      ),
    },
  ];

  return (
    <section className="pb-10 md:pb-14 xl:pb-16 bg-white relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="relative rounded-3xl overflow-visible bg-white mb-6 pb-6">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 pointer-events-none opacity-60">
            <Image src="/G.webp" alt="Decorative G Background" width={700} height={420} className="object-contain" />
          </div>

          <div className="absolute left-[-30px] top-28 hidden md:flex">
            <Image src="/faq2.webp" alt="Decorative Card" width={330} height={173} />
          </div>

          <div className="relative z-10 text-center pt-12 pb-10 px-6">
            <h2 className="HeadingH1 text-black font-semobold mb-8">
              {t("heading", "GTCFX Q&A")}
            </h2>
            <h3 className="HeadingH3 font-bold text-[#1a3591]">
              {t("faqHeading", "Frequently Asked Questions")}
            </h3>
          </div>

          <div className="relative z-10 mt-4">
            <div className="relative bg-white rounded-2xl border border-[#E8EAF2] px-6 py-4 flex items-center gap-4 shadow-sm">
              <input
                type="text"
                placeholder={t("searchPlaceholder", "Please enter your question?")}
                className="flex-1 bg-transparent text-sm text-[#8a95b8] outline-none placeholder:text-[#aab0c8]"
              />
              <button className="w-10 h-10 rounded-full bg-[#1a3591] text-white flex items-center justify-center shadow-md hover:bg-[#152d7a] transition-colors shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-[#B3C0FF] bg-white z-10 relative p-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="HeadingH4 font-bold text-[#1a1a2e] mb-3">
                {t("leftHeading", "Please enter your question?")}
              </h3>
              <p className="Text text-[#555e7a] mb-8 leading-relaxed">
                {t(
                  "leftDesc",
                  "A general report provides a concise overview of key findings and conclusions on a specific subject."
                )}
              </p>
            </div>

            <div className="flex items-center gap-3 mb-8 flex-wrap">
              {STATS?.map((s) => (
                <div key={s.key} className="flex flex-col items-center justify-center border border-[#1a3591] rounded-xl px-5 py-3 min-w-[80px]">
                  <span className="text-lg font-black text-[#1a3591] leading-none">{s.value}</span>
                  <span className="text-[10px] font-semibold text-[#8a95b8] tracking-widest mt-0.5">
                    {t(`stats.${s.key}`, s.key.toUpperCase())}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/open-account"
              className="inline-flex items-center gap-2 bg-[#1a3591] text-white font-semibold px-8 py-3 rounded-full hover:bg-[#152d7a] transition-colors w-fit"
            >
              {t("openAccountCta", "Open an Account")}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            {faqItems.map((faq) => (
              <AccordionItem
                key={faq.id}
                question={faq.question}
                answer={faq.answer}
                isOpen={openId === faq.id}
                onToggle={() => toggle(faq.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

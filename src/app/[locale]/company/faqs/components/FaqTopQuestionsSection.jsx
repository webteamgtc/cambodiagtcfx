"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocale, usePathTranslation } from "@/app/[locale]/LocaleProvider";
import { fetchFaqQuestionGroups } from "@/lib/strapiFaqs";

function CategoryButton({ item, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center justify-between gap-3 rounded-2xl border px-5 py-4 text-left transition ${
        active
          ? "border bg-white text-[#293B93]"
          : "border-transparent bg-transparent border-none text-[#69729F] hover:border-[#e6eaf3] hover:bg-white/70"
      }`}
      style={
        active
          ? {
              border: "1px solid #E1E7F6",
              boxShadow: "0px 0px 25px 0px #293B931A",
            }
          : {}
      }
    >
      <span
        className={`TextSmall font-medium md:text-[15px] ${
          active ? "text-[#293B93]" : "text-[#69729F]"
        }`}
      >
        {item.label}
      </span>
      <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-[#d9dfed] px-1.5 text-[10px] font-semibold text-[#5b6ec6]">
        {item.count}
      </span>
    </button>
  );
}

function FaqAccordionItem({ item, isOpen, onToggle }) {
  return (
    <div
      className={`overflow-hidden rounded-[18px] border bg-white transition ${
        isOpen
          ? "border-[#6b7fd6] shadow-[0_16px_36px_rgba(51,71,168,0.08)]"
          : "border-[#e6eaf3]"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6 md:py-5"
      >
        <span className="TextSmall font-semibold text-black md:text-[15px]">
          {item.question}
        </span>
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm transition ${
            isOpen
              ? "bg-[#3347a8] text-white"
              : "border border-[#dce2f0] bg-white text-[#5b6ec6]"
          }`}
          aria-hidden
        >
          {isOpen ? "x" : "+"}
        </span>
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5 pt-0 md:px-6 md:pb-6">
            <div
              className="TextSmall leading-6 text-[#6b7280] [&_a]:font-semibold [&_a]:text-[#293B93] [&_a]:underline [&_a]:underline-offset-2 [&_a]:transition hover:[&_a]:text-[#1f2d75] [&_li]:my-1 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mb-3 [&_p:last-child]:mb-0 [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5"
              dangerouslySetInnerHTML={{ __html: item.answer }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FaqTopQuestionsSection({ locale: localeProp }) {
  const contextLocale = useLocale();
  const locale = localeProp || contextLocale || "en";
  const t = usePathTranslation("faqsPage.topQuestions");
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const [openIndex, setOpenIndex] = useState(0);
  const [questionGroups, setQuestionGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadFaqs = useCallback(async () => {
    setLoading(true);
    try {
      const groups = await fetchFaqQuestionGroups(locale);
      setQuestionGroups(groups);
      setActiveGroupIndex(0);
      setOpenIndex(0);
    } catch (error) {
      console.error("FAQ fetch failed:", error);
      setQuestionGroups([]);
    } finally {
      setLoading(false);
    }
  }, [locale]);

  useEffect(() => {
    loadFaqs();
  }, [loadFaqs]);

  const activeGroup = useMemo(
    () => questionGroups[activeGroupIndex] || questionGroups[0],
    [activeGroupIndex, questionGroups]
  );

  return (
    <section className="bg-[#f4f6fb] py-14 md:py-16 ">
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(280px,0.75fr)] lg:items-end">
          <div className="max-w-2xl text-center md:text-left">
            <p className="TextSmall font-semibold text-[#293B93]">
              {t("eyebrow", "Top Questions")}
            </p>
            <h2 className="HeadingH1 mt-2 max-w-xl text-primary ">
              {t("titleStart", "Quick answers")}
              <br />
              {t("titleConnector", "to")}{" "}
              <span className="text-[#293B93]">
                {t("titleHighlight", "common questions")}
              </span>
            </h2>
          </div>

          <p className="TextSmall max-w-md text-center md:text-right lg:justify-self-end lg:pt-7">
            {t(
              "description",
              "Browse by category. If you can't find what you're looking for, our team is one click away."
            )}
          </p>
        </div>

        {loading ? (
          <div className="mt-12 flex min-h-64 items-center justify-center">
            <span
              className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-[#293B93]/20 border-t-[#293B93]"
              aria-label={t("loadingAria", "Loading FAQs")}
            />
          </div>
        ) : questionGroups.length === 0 ? (
          <p className="mt-12 text-center text-sm text-gray-500">
            {t("empty", "No FAQs available at the moment.")}
          </p>
        ) : (
          <div className="mt-10 grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-10">
            <div className="space-y-2">
              {questionGroups.map((item, index) => (
                <CategoryButton
                  key={item.key}
                  item={item}
                  active={index === activeGroupIndex}
                  onClick={() => {
                    setActiveGroupIndex(index);
                    setOpenIndex(0);
                  }}
                />
              ))}
            </div>

            <div className="space-y-3">
              {activeGroup?.questions?.map((item, index) => (
                <FaqAccordionItem
                  key={`${activeGroup.key}-${index}`}
                  item={item}
                  isOpen={index === openIndex}
                  onToggle={() =>
                    setOpenIndex((prev) => (prev === index ? -1 : index))
                  }
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

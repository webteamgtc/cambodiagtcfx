"use client";

import { useMemo, useState } from "react";
import FadeInSection from "./FadeInSection";
import { useLocaleMessages, usePathTranslation } from "@/app/[locale]/LocaleProvider";
import { readPath } from "@/i18n/tranlsationText";

const TIERED_KEYS = ["one", "two", "three", "four", "five", "six"];
const HMR_KEYS = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven"];

const ORDER = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
];

function isPlainObject(v) {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}

function objectValuesInOrder(obj) {
  if (!isPlainObject(obj)) return [];

  const keys = Object.keys(obj);
  const ranked = [...keys].sort((a, b) => {
    const ai = ORDER.indexOf(a);
    const bi = ORDER.indexOf(b);
    if (ai === -1 && bi === -1) return 0;
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });

  return ranked.map((key) => obj[key]).filter(Boolean);
}

function getOptionalString(value, keyPath) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed === keyPath || trimmed.includes(keyPath)) return null;
  return trimmed;
}

function FaqAccordionItem({ item, isOpen, onToggle }) {
  const paragraphValues = useMemo(
    () => objectValuesInOrder(item.paragraphs),
    [item.paragraphs]
  );
  const listValues = useMemo(
    () => (item.list ? objectValuesInOrder(item.list) : []),
    [item.list]
  );

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
        <span className="TextSmall font-semibold text-[#02002f] md:text-[15px]">
          {item.title}
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
          <div className="space-y-4 px-5 pb-5 pt-0 md:px-6 md:pb-6">
            {paragraphValues.map((paragraph, index) => (
              <p
                key={index}
                className="TextSmall leading-6 text-[#6b7280] ltr:text-left rtl:text-right"
              >
                {paragraph}
              </p>
            ))}

            {listValues.length > 0 ? (
              <ul className="list-disc space-y-2 pl-5 TextSmall leading-6 text-[#6b7280] ltr:text-left rtl:text-right">
                {listValues.map((listItem, index) => (
                  <li key={index}>{listItem}</li>
                ))}
              </ul>
            ) : null}

            {item.note ? (
              <p className="TextSmall italic leading-6 text-[#8a8a9a] ltr:text-left rtl:text-right">
                {item.note}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function FaqGroup({ heading, items, openIndex, setOpenIndex, delayOffset = 0 }) {
  return (
    <>
      <FadeInSection delay={delayOffset}>
        <div className="text-center">
          <h2 className="HeadingH2 text-[#02002f]">{heading}</h2>
        </div>
      </FadeInSection>

      <div className="mt-10 space-y-4">
        {items.map((item, index) => (
          <FadeInSection key={item.id} delay={delayOffset + index * 0.03}>
            <FaqAccordionItem
              item={item}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex((prev) => (prev === index ? -1 : index))}
            />
          </FadeInSection>
        ))}
      </div>
    </>
  );
}

export default function LeverageFaqs() {
  const messages = useLocaleMessages();
  const tieredT = usePathTranslation("dynamicLeverage.tieredLeverage");
  const hmrT = usePathTranslation("dynamicLeverage.highMarginRequirement");
  const tieredSection = readPath("dynamicLeverage.tieredLeverage", messages) || {};
  const hmrSection = readPath("dynamicLeverage.highMarginRequirement", messages) || {};
  const [tieredOpenIndex, setTieredOpenIndex] = useState(0);
  const [hmrOpenIndex, setHmrOpenIndex] = useState(-1);

  const tieredFaqs = useMemo(() => {
    return TIERED_KEYS.map((key) => {
      const item = tieredSection[key] || {};
      const answer = typeof item.ans === "string" ? item.ans : tieredT(`${key}.ans`);

      return {
        id: `tiered-${key}`,
        title: tieredT(`${key}.ques`),
        paragraphs: answer ? { one: answer } : {},
        list: null,
        note: null,
      };
    });
  }, [tieredSection, tieredT]);

  const hmrFaqs = useMemo(() => {
    return HMR_KEYS.map((key) => {
      const item = hmrSection[key] || {};
      const paragraphsRaw = item.paragraphs;
      const listRaw = item.list;
      const noteRaw = item.note;

      return {
        id: `hmr-${key}`,
        title: hmrT(`${key}.ques`),
        paragraphs: isPlainObject(paragraphsRaw) ? paragraphsRaw : {},
        list: isPlainObject(listRaw) ? listRaw : null,
        note: getOptionalString(noteRaw, `${key}.note`),
      };
    });
  }, [hmrSection, hmrT]);

  return (
    <section className="relative bg-white py-10 md:py-16">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl">
          <FaqGroup
            heading={tieredT("heading")}
            items={tieredFaqs}
            openIndex={tieredOpenIndex}
            setOpenIndex={setTieredOpenIndex}
          />

          <div className="mt-16">
            <FaqGroup
              heading={""}
              items={hmrFaqs}
              openIndex={hmrOpenIndex}
              setOpenIndex={setHmrOpenIndex}
              delayOffset={0.1}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

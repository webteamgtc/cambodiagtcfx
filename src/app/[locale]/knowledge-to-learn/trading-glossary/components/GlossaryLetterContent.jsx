"use client";

import TradingCtaSection from "@/app/[locale]/knowledge-to-learn/components/course/TradingCtaSection";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";
import { useGlossaryHook } from "../hooks/useGlossaryHook";
import GlossaryHeader from "./GlossaryHeader";
import AlphabetFilter from "./AlphabetFilter";
import GlossaryTermsGrid from "./GlossaryTermsGrid";

export default function GlossaryLetterContent({ letter, locale }) {
  const t = usePathTranslation("glossaryPage");
  const { data, loading } = useGlossaryHook(letter);

  return (
    <>
      <GlossaryHeader />
      <AlphabetFilter locale={locale} activeLetter={letter} />

      <section className="bg-white pb-6 md:pb-10">
        <div className="container">
          <h2 className="text-2xl font-bold text-[#000032] md:text-3xl">
            {t(
              "letterHeading",
              "Financial Terms And FAQs To Help You Understand Trading With GTCFX"
            )}
          </h2>
        </div>
      </section>

      <section className="bg-white pb-4 md:pb-6">
        <div className="container flex items-start gap-2">
          <span className="mt-1 h-6 w-2 rounded-sm bg-[#293B93]" aria-hidden />
          <span className="font-serif text-4xl text-[#293B93]">
            {letter.toUpperCase()}
          </span>
        </div>
      </section>

      <GlossaryTermsGrid terms={data} loading={loading} />
      <TradingCtaSection locale={locale} />
    </>
  );
}

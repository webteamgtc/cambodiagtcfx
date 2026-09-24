"use client";

import FadeInSection from "@/app/[locale]/company/contact-us/components/FadeInSection";
import { useState } from "react";
import { FiThumbsDown, FiThumbsUp } from "react-icons/fi";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

export default function MarketNewsArticleFeedbackSection() {
  const t = usePathTranslation("marketNewsArticlePage.feedback");
  const tA11y = usePathTranslation("common.a11y");
  const [vote, setVote] = useState(null);

  return (
    <section className="bg-white py-2 md:py-2">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto flex max-w-2xl flex-wrap items-center justify-between gap-5">
          <div>
            <FadeInSection>
              <h2 className="HeadingH5 font-semibold text-[#000]">{t("heading", "Did you find this article useful?")}</h2>
            </FadeInSection>
            <FadeInSection delay={0.2}>
              <p className="TextSmall mt-1 font-normal text-[#777]">{t("sub", "Add as a preferred source on Google")}</p>
            </FadeInSection>
          </div>
          <FadeInSection delay={0.3}>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setVote("up")}
                aria-pressed={vote === "up"}
                aria-label={tA11y("articleUsefulYes", "Yes, this article was useful")}
                className={`inline-flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)] ${vote === "up" ? "ring-2 ring-[#A32020]/25" : ""
                  }`}
              >
                <FiThumbsUp className="h-5 w-5 text-[#A32020]" strokeWidth={1.8} aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => setVote("down")}
                aria-pressed={vote === "down"}
                aria-label={tA11y("articleUsefulNo", "No, this article was not useful")}
                className={`inline-flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)] ${vote === "down" ? "ring-2 ring-[#4E4E4E]/20" : ""
                  }`}
              >
                <FiThumbsDown className="h-5 w-5 text-[#333333]" strokeWidth={1.8} aria-hidden />
              </button>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

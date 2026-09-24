"use client";

import FadeInSection from "@/app/[locale]/company/contact-us/components/FadeInSection";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

function ShareNetworkIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <circle cx="18" cy="5" r="2.5" />
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="19" r="2.5" />
      <path d="M8.2 10.8 15.8 6.2M8.2 13.2l7.6 4.6" strokeLinecap="round" />
    </svg>
  );
}

export default function MarketNewsArticleHeaderSection({ article, locale }) {
  const t = usePathTranslation("marketNewsArticlePage.header");
  const tA11y = usePathTranslation("common.a11y");
  const source = article.source ?? article.author;
  const lastUpdated = article.lastUpdated ?? article.date;
  const shareCount = article.shareCount ?? 0;

  return (
    <>
      <section className="container min-w-0 max-w-full pt-[50px]">
        <div className="mx-auto max-w-6xl">
          <FadeInSection delay={0.1}>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 md:mt-8">
              <div className="flex items-center gap-3">
                <span
                  className="inline-flex h-12 w-12 shrink-0 rounded-full bg-[#D9D9D9]"
                  aria-hidden
                />
                <div>
                  <p className="Text leading-snug font-semibold text-[#000]">{source}</p>
                  <p className="text-xs mt-0.5 font-normal text-[#828282]">
                    {t("lastUpdated", "Last updated:")} {lastUpdated}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-7">
                <span className="TextSmall font-medium text-[#000]">{shareCount}</span>
                <button
                  type="button"
                  aria-label={tA11y("shareArticle", "Share article")}
                  className="TextSmall inline-flex items-center gap-2 font-medium text-[#000] transition hover:text-[#293B93]"
                >
                  {t("share", "Share")}
                  <ShareNetworkIcon />
                </button>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>
    </>
  );
}

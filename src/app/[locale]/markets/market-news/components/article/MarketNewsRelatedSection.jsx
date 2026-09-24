'use client';
import Image from "next/image";
import Link from "next/link";
import { localizedHref } from "@/i18n/localizedHref";
import FadeInSection from "@/app/[locale]/company/contact-us/components/FadeInSection";
import MobilePeekCarousel from "@/app/[locale]/components/common/MobilePeekCarousel";

function MetaIcons({ comments, likes }) {
  return (
    <div className="flex items-center gap-4 text-[#828282]">
      <span className="TextSmall inline-flex items-center gap-1.5 font-normal">
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
        {comments}
      </span>
      <span className="TextSmall inline-flex items-center gap-1.5 font-normal">
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
          <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
        </svg>
        {likes}
      </span>
      <button type="button" aria-label="More options" className="inline-flex text-[#828282]">
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <circle cx="5" cy="12" r="1.6" />
          <circle cx="12" cy="12" r="1.6" />
          <circle cx="19" cy="12" r="1.6" />
        </svg>
      </button>
    </div>
  );
}

function RelatedCard({ item, locale }) {
  const href = item.categorySlug
    ? `/markets/market-news/${item.categorySlug}/${item.slug}`
    : `/markets/market-news/${item.slug}`;

  return (
    <article className="flex h-full flex-col">
      <Link
        href={localizedHref(locale, href)}
        className="group flex h-full flex-col hover:no-underline"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[10px] bg-[#E5E5E5]">
          <Image src={item.image} alt={item.title || "Related article"} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
        </div>

        <h3 className="Text  mt-4 line-clamp-2 font-semibold leading-[1.35] text-[#000] group-hover:text-[#293B93]">
          {item.title}
        </h3>
        <p className="TextSmall mt-3 line-clamp-2 flex-1 font-normal leading-[1.4] text-[#000]">{item.excerpt}</p>

        <div className="mt-6 flex items-center justify-between gap-3">
          <p className="TextSmall font-normal text-[#828282]">{item.date}</p>
          <MetaIcons comments={item.comments ?? 11} likes={item.likes ?? 24} />
        </div>

        <div className="mt-4 border-t border-[#EEEEEE]" aria-hidden />
      </Link>
    </article>
  );
}

export default function MarketNewsRelatedSection({ locale, relatedArticles = [] }) {
  if (!relatedArticles.length) return null;

  return (
    <section className="bg-white py-10 md:py-12">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl">
          <FadeInSection>
          <div className="flex items-center gap-4">
            <h2 className="HeadingH5 shrink-0 font-semibold uppercase tracking-[0.28em] text-[#000]">
              GTCFX &amp; Related
            </h2>
            <span className="hidden h-px flex-1 border-t border-dashed border-[#D9D9D9] sm:block" aria-hidden />
          </div>
          </FadeInSection>
          <FadeInSection delay={0.1}>
          {/* Mobile carousel */}
          <div className="md:hidden mt-6">
            <MobilePeekCarousel
              items={relatedArticles}
              renderItem={(item) => (
                <div className="px-1 pb-2">
                  <RelatedCard item={item} locale={locale} />
                </div>
              )}
            />
          </div>
          {/* Desktop grid */}
          <div className="hidden md:grid mt-6 gap-6 md:grid-cols-3 md:gap-8">
            {relatedArticles.map((item) => (
              <RelatedCard key={item.slug} item={item} locale={locale} />
            ))}
          </div>
          </FadeInSection>
          <FadeInSection delay={0.2}>
          <Link
            href={localizedHref(locale, "/gtc-news")}
            className="TextSmall mt-8 flex h-12 w-full items-center justify-center rounded-[10px] bg-[#E5E5E5] font-medium text-[#6E6E6E] transition hover:bg-[#D9D9D9] hover:text-[#4E4E4E] hover:no-underline"
          >
            View more news
          </Link>
          </FadeInSection>
          </div>
      </div>
    </section>
  );
}

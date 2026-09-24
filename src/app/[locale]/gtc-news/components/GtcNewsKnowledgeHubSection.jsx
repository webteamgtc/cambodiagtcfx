'use client';

import Image from "next/image";
import Link from "next/link";
import Button from "@/app/[locale]/components/common/Button";
import { localizedHref } from "@/i18n/localizedHref";
import { EVENT_CATEGORY_SLUG } from "@/lib/strapiBlogs";
import GtcNewsSectionTitle from "./GtcNewsSectionTitle";
import FadeInSection from "@/app/[locale]/company/contact-us/components/FadeInSection";
import { usePathTranslation } from "../../LocaleProvider";

function MetaIcons({ comments = 0, likes = 0 }) {
  return (
    <div className="flex items-center gap-4 text-[#69729F]">
      <span className="text-xs inline-flex items-center gap-1.5 font-normal">
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
        {comments}
      </span>
      <span className="text-xs inline-flex items-center gap-1.5 font-normal">
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
          <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
        </svg>
        {likes}
      </span>
      <button type="button" aria-label="More options" className="inline-flex text-[#69729F]">
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <circle cx="5" cy="12" r="1.6" />
          <circle cx="12" cy="12" r="1.6" />
          <circle cx="19" cy="12" r="1.6" />
        </svg>
      </button>
    </div>
  );
}

function SectionHeader({ locale, t }) {
  return (
    <div className="mb-6 md:mb-8">
      <GtcNewsSectionTitle
        title={t("sectionTitle", "GTCFX & Knowledge Hub")}
        action={
          <Button
            href="/knowledge-to-learn"
            variant="brand"
            size="sm"
            className="!h-10 gap-2 !px-4 !rounded-[8px]"
            icon={
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/70 text-sm leading-none">
                +
              </span>
            }
            iconPosition="left"
          >
            {t("viewMore", "View more")}
          </Button>
        }
      />
      <p className="TextSmall mt-3 max-w-3xl font-normal text-[#5E5D5D]">
        {t(
          "subtitle",
          "Enhance you trading knowledge with our MetaTrader trading guides & insightful articles"
        )}
      </p>
    </div>
  );
}

function FeaturedArticle({ item, locale, t }) {
  const tag = item.categoryName || item.tag || "Event";
  const title = item.title || t("featured.title", "");
  const imageAlt = title || tag;

  return (
    <div
      className="overflow-hidden rounded-[16px] pb-6 lg:grid lg:grid-cols-2"
      style={{
        background:
          "linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, rgba(41, 59, 147, 0.10) 103.3%)",
      }}
    >
      <div className="flex flex-col p-6 md:p-8">
        <span className="inline-flex w-fit rounded-[6px] bg-[#293B93] px-3 py-2">
          <span className="TextSmall font-medium capitalize text-white">{tag}</span>
        </span>

        <h3 className="HeadingH5 mt-7 font-bold leading-[1.2] text-[#000032]">{title}</h3>
        {item.date ? (
          <p className="TextSmall mt-3 font-normal text-[#4F4F4F]">{item.date}</p>
        ) : null}
        {item.excerpt ? (
          <p className="TextSmall mt-4 font-normal leading-[1.3] text-[#000]">{item.excerpt}</p>
        ) : null}

        <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-8">
          <Link
            href={localizedHref(locale, item.href)}
            className="TextSmall font-medium text-[#293B93] underline underline-offset-2 hover:no-underline"
          >
            {t("viewMore", "View more")}
          </Link>
          <MetaIcons />
        </div>
      </div>

      <div className="relative min-h-[240px] lg:min-h-full">
        <Image
          src={item.image}
          alt={imageAlt}
          fill
          className="object-contain"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}

export default function GtcNewsKnowledgeHubSection({
  locale = "en",
  featuredPost = null,
}) {
  const t = usePathTranslation("gtcNewsPage.knowledgeHub");

  return (
    <section className="bg-white pb-10 pt-4 md:pb-14">
      <div className="container">
        <div className="">
          <FadeInSection>
            <SectionHeader locale={locale} t={t} />
          </FadeInSection>

          {featuredPost ? (
            <FadeInSection delay={0.1}>
              <FeaturedArticle item={featuredPost} locale={locale} t={t} />
            </FadeInSection>
          ) : (
            <FadeInSection delay={0.1}>
              <p className="text-center text-[#69729F]">
                {t("emptyState", "No event articles available right now.")}
              </p>
            </FadeInSection>
          )}
        </div>
      </div>
    </section>
  );
}

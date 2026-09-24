"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import Button from "@/app/[locale]/components/common/Button";
import { localizedHref } from "@/i18n/localizedHref";
import { KNOWLEDGE_HUB } from "../marketNewsData";
import FadeInSection from "@/app/[locale]/company/contact-us/components/FadeInSection";
import MobilePeekCarousel from "@/app/[locale]/components/common/MobilePeekCarousel";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

function MetaIcons({ comments, likes }) {
  const t = usePathTranslation("marketNewsPage.knowledgeHub");

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
      <button type="button" aria-label={t("moreOptions", "More options")} className="inline-flex text-[#69729F]">
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <circle cx="5" cy="12" r="1.6" />
          <circle cx="12" cy="12" r="1.6" />
          <circle cx="19" cy="12" r="1.6" />
        </svg>
      </button>
    </div>
  );
}

function SectionHeader({ locale }) {
  const t = usePathTranslation("marketNewsPage.knowledgeHub");

  return (
    <div className="mb-6 md:mb-8">
      <div className="flex flex-wrap items-center gap-4">
        <h2 className="HeadingH5 shrink-0 font-semibold text-[#000]">{t("title", "GTCFX & Knowledge Hub")}</h2>
        <span className="hidden h-px flex-1 border-t  border-[#D8DEEA] sm:block" aria-hidden />
        <Button
          href={localizedHref(locale, "/blogs")}
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
      </div>
      <p className="TextSmall mt-3 max-w-3xl font-normal text-[#5E5D5D]">{KNOWLEDGE_HUB.subtitle}</p>
    </div>
  );
}

function FeaturedArticle({ item, locale }) {
  const t = usePathTranslation("marketNewsPage.knowledgeHub");

  return (
    <div className="overflow-hidden rounded-[16px] pb-6 lg:grid lg:grid-cols-2"
      style={{
        background: "linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, rgba(41, 59, 147, 0.10) 103.3%)",
      }}
    >
      <div className="flex flex-col p-6 md:p-8">
        <span className="inline-flex w-fit rounded-[6px] bg-[#293B93] px-3 py-2">
          <span className="TextSmall font-medium text-white">{item.tag}</span>
        </span>

        <h3 className="HeadingH5 mt-7 font-bold leading-[1.2] text-[#000032]">{item.title}</h3>
        <p className="TextSmall mt-3 font-normal text-[#4F4F4F]">{item.date}</p>
        <p className="TextSmall mt-4 font-normal leading-[1.3] text-[#000]">{item.excerpt}</p>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-8">
          <Link
            href={localizedHref(locale, item.href)}
            className="TextSmall font-medium text-[#293B93] underline underline-offset-2 hover:no-underline"
          >
            {t("viewMore", "View more")}
          </Link>
          <MetaIcons comments={item.comments} likes={item.likes} />
        </div>
      </div>

      <div className="relative min-h-[240px] lg:min-h-full">
        <Image src={item.image} alt={item.overlayTitle || item.title || "Knowledge hub article"} fill className="object-contain" sizes="(max-width: 1024px) 100vw, 50vw" />
      </div>
    </div>
  );
}

function MiddleArticleCard({ item, locale }) {
  return (
    <article className="overflow-hidden">
      <Link href={localizedHref(locale, item.href)} className="block hover:no-underline">
        <div className="relative aspect-[16/10] w-full">
          <Image src={item.image} alt={item.overlayTitle || item.title || "Knowledge hub article"} fill className="object-cover" sizes="33vw" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent px-4 pb-4 pt-10">
            <h4 className="Text font-semibold leading-[1.35] text-white">{item.overlayTitle}</h4>
          </div>
        </div>
      </Link>

      <div className="pt-4 md:pt-5">
        <p className="Text font-normal leading-[1.4] text-[#000]">{item.excerpt}</p>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="TextSmall font-normal text-[#69729F]">{item.date}</p>
          <MetaIcons comments={item.comments} likes={item.likes} />
        </div>
      </div>
    </article>
  );
}

function HeadlineGrid({ columns, locale }) {
  const rowCount = columns[0]?.length ?? 0;

  return (
    <div>
      {Array.from({ length: rowCount }, (_, rowIndex) => (
        <div
          key={`headline-row-${rowIndex}`}
          className={clsx(
            "grid grid-cols-1 gap-x-10 gap-y-4  md:grid-cols-3"
          )}
        >
          {columns.map((column, columnIndex) => {
            const item = column[rowIndex];
            if (!item) return null;

            return (
              <Link
                key={`${columnIndex}-${item.title}`}
                href={localizedHref(locale, item.href)}
                className="group block hover:no-underline border-b py-5 border-[#C2C2C2]"
              >
                <h4
                  className={clsx(
                    "Text font-semibold leading-[1.45] text-[#000]",
                    "hover:underline decoration-[#000] underline-offset-[3px]"
                  )}
                >
                  {item.title}
                </h4>
              </Link>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default function MarketNewsKnowledgeHubSection({ locale = "en" }) {
  const { featured, middleRow, headlineColumns } = KNOWLEDGE_HUB;

  return (
    <section className="bg-white pb-10 pt-4 md:pb-14">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl">
          <FadeInSection>
            <SectionHeader locale={locale} />
          </FadeInSection>
          <FadeInSection delay={0.1}>
          <FeaturedArticle item={featured} locale={locale} />
          </FadeInSection>

          {/* Middle row — mobile carousel */}
          <div className="md:hidden mt-6">
            <MobilePeekCarousel
              items={middleRow}
              renderItem={(item) => (
                <div className="px-1 pb-2">
                  <MiddleArticleCard item={item} locale={locale} />
                </div>
              )}
            />
          </div>
          {/* Middle row — desktop grid */}
          <div className="hidden md:grid mt-6 gap-5 md:grid-cols-3">
            {middleRow.map((item, index) => (
              <FadeInSection delay={index * 0.1}><MiddleArticleCard key={item.overlayTitle} item={item} locale={locale} /></FadeInSection>
            ))}
          </div>

          <div className="mt-12 border-t border-[#C9C9C9] pt-6 md:pt-6">
            <FadeInSection delay={0.1}>
              <HeadlineGrid columns={headlineColumns} locale={locale} />
            </FadeInSection>
          </div>
        </div>
      </div>
    </section>
  );
}

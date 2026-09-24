"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import GtcNewsSectionTitle from "./GtcNewsSectionTitle";
import FadeInSection from "@/app/[locale]/company/contact-us/components/FadeInSection";
import MobilePeekCarousel from "@/app/[locale]/components/common/MobilePeekCarousel";
import { localizedHref } from "@/i18n/localizedHref";
import { usePathTranslation } from "../../LocaleProvider";
import { filterTrendCategories } from "@/lib/strapiBlogs";

function CategoryTabs({ categories, activeTab, onChange }) {
  if (!categories.length) return null;

  return (
    <div className="rounded-md bg-[#293B93] py-2 md:px-6 md:py-3.5">
      <div className="flex items-center gap-2 overflow-x-auto [-webkit-overflow-scrolling:touch] md:gap-4">
        {categories.map((tab) => {
          const isActive = activeTab === tab.slug;
          return (
            <button
              key={tab.slug}
              type="button"
              onClick={() => onChange(tab.slug)}
              className={clsx(
                "shrink-0 rounded-md px-5 py-2.5 text-xs font-bold transition md:text-base",
                isActive
                  ? "bg-white text-[#293B93]"
                  : "text-white hover:text-white/80"
              )}
            >
              {tab.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function NewsCard({ item, locale, badgeLabel }) {
  const title = item.title || "Untitled Article";
  const description = item.excerpt || item.subtitle || "";

  return (
    <article className="interactive-card group flex h-full flex-col overflow-hidden rounded-2xl border border-[#e5eaf4] bg-white">
      <Link
        href={localizedHref(locale, item.href)}
        className="relative interactive-card__keep block aspect-video w-full overflow-hidden hover:no-underline"
      >
        <Image
          src={item.image}
          alt={title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

      </Link>

      <div className="flex flex-1 flex-col p-4 md:p-5">
        <div className="flex items-center justify-between">
          <div className="group-hover:bg-white group-hover:text-[#293B93] rounded bg-[#293B93] px-2 py-1 text-[10px] font-semibold text-white">
            {badgeLabel}
          </div>
          {(item.date || item.author) && (
            <p className="text-xs font-medium uppercase tracking-[0.1em] text-[#69729F]">
              {item.date}
              {/* {item.date && item.author ? <span className="mx-1">•</span> : null} */}
              {/* {item?.author} */}
            </p>
          )}
        </div>
        <h4 className="mt-2 text-base font-bold leading-snug text-[#000032] md:text-lg">
          <Link
            href={localizedHref(locale, item.href)}
            className="hover:text-[#293B93] hover:no-underline"
          >
            {title}
          </Link>
        </h4>
        {description ? (
          <p className="TextSmall mt-3 line-clamp-3 flex-1 text-[#4B5563]">
            {description}
          </p>
        ) : null}
      </div>
    </article>
  );
}

function PostsGrid({ posts, locale, badgeLabel, loading, emptyLabel }) {
  if (loading) {
    return (
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-[320px] animate-pulse rounded-2xl border border-[#e5eaf4] bg-[#f4f6fa]"
          />
        ))}
      </div>
    );
  }

  if (!posts.length) {
    return (
      <p className="mt-8 text-center text-[#69729F]">{emptyLabel}</p>
    );
  }

  return (
    <>
      <div className="mt-6 md:hidden">
        <MobilePeekCarousel
          items={posts}
          renderItem={(item) => (
            <div className="px-1 pb-2">
              <NewsCard item={item} locale={locale} badgeLabel={badgeLabel} />
            </div>
          )}
        />
      </div>

      <div className="mt-6 hidden grid-cols-1 gap-6 md:grid md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {posts.map((item) => (
          <NewsCard
            key={item.id ?? item.slug}
            item={item}
            locale={locale}
            badgeLabel={badgeLabel}
          />
        ))}
      </div>
    </>
  );
}

export default function GtcNewsTrendsSection({
  locale = "en",
  categories = [],
  initialPosts = [],
  initialCategorySlug = "",
}) {
  const t = usePathTranslation("gtcNewsPage.trends");
  const visibleCategories = useMemo(
    () => filterTrendCategories(categories),
    [categories]
  );
  const firstCategorySlug =
    visibleCategories[0]?.slug || initialCategorySlug || "";
  const [activeTab, setActiveTab] = useState(firstCategorySlug);
  const [postsByCategory, setPostsByCategory] = useState(() => {
    if (!firstCategorySlug) return {};
    return { [firstCategorySlug]: initialPosts };
  });
  const [loading, setLoading] = useState(false);
  const postsCacheRef = useRef({});

  const activeCategory = useMemo(
    () => visibleCategories.find((category) => category.slug === activeTab) ?? null,
    [visibleCategories, activeTab]
  );

  const posts = postsByCategory[activeTab] ?? [];
  const badgeLabel = activeCategory?.name || t("badge", "GTCFX");

  postsCacheRef.current = postsByCategory;

  useEffect(() => {
    if (!activeTab || postsCacheRef.current[activeTab]) return;

    let cancelled = false;
    setLoading(true);

    const params = new URLSearchParams({
      category: activeTab,
      locale,
      limit: "6",
    });

    fetch(`/api/gtc-news/category-blogs?${params.toString()}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load category posts");
        return res.json();
      })
      .then((json) => {
        if (cancelled) return;
        setPostsByCategory((current) => ({
          ...current,
          [activeTab]: Array.isArray(json.posts) ? json.posts : [],
        }));
      })
      .catch((error) => {
        console.error("[GtcNewsTrendsSection] load failed:", error);
        if (cancelled) return;
        setPostsByCategory((current) => ({
          ...current,
          [activeTab]: [],
        }));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [activeTab, locale]);

  useEffect(() => {
    if (!firstCategorySlug) return;
    setActiveTab(firstCategorySlug);
    setPostsByCategory({ [firstCategorySlug]: initialPosts });
  }, [firstCategorySlug, initialPosts]);

  return (
    <section className="py-10 md:py-16">
      <div className="container">
        <div className="">
          <FadeInSection>
            <GtcNewsSectionTitle title={t("sectionTitle", "GTCFX & Market Trends")} />
          </FadeInSection>

          {visibleCategories.length > 0 ? (
            <FadeInSection delay={0.1}>
              <CategoryTabs
                categories={visibleCategories}
                activeTab={activeTab}
                onChange={setActiveTab}
              />
            </FadeInSection>
          ) : null}

          <FadeInSection delay={0.2}>
            <PostsGrid
              posts={posts}
              locale={locale}
              badgeLabel={badgeLabel}
              loading={loading && !posts.length}
              emptyLabel={t("emptyState", "No articles available in this category.")}
            />
          </FadeInSection>

          {activeTab ? (
            <div className="mt-8 flex justify-center">
              <Link
                href={localizedHref(locale, `/gtc-news/${activeTab}`)}
                className="rounded-full border border-[#293B93] px-8 py-2.5 text-sm font-semibold text-[#293B93] transition hover:bg-[#293B93] hover:text-white"
              >
                {t("readMore", "Read More")}
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

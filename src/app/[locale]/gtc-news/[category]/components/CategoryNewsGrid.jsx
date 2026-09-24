"use client";

import { useState } from "react";
import Link from "next/link";
import { localizedHref } from "@/i18n/localizedHref";
import GtcNewsSectionTitle from "../../components/GtcNewsSectionTitle";
import BlogCoverImage from "@/app/[locale]/components/common/BlogCoverImage";

const ITEMS_PER_PAGE = 12;

function NewsCard({ item, locale, badgeLabel }) {
  return (
    <article className="group flex h-full flex-col">
      <Link
        href={localizedHref(locale, item.href)}
        className="relative block aspect-video w-full overflow-hidden rounded-lg bg-[#d1d1d1] hover:no-underline"
      >
        <BlogCoverImage
          src={item.image}
          alt={item.title}
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute left-3 top-3 rounded bg-[#293B93] px-2 py-1 text-[10px] font-semibold text-white">
          {badgeLabel}
        </div>
      </Link>

      <div className="flex flex-1 flex-col pt-4">
        {(item.date || item.author) && (
          <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.1em] text-[#69729F]">
            {item.date ? <span>{item.date}</span> : null}
            {item.date && item.author ? (
              <span className="text-gray-300">•</span>
            ) : null}
            {item.author ? <span>{item.author}</span> : null}
          </p>
        )}
        <h3 className="mt-2 text-base font-bold leading-snug text-[#000032] md:text-lg">
          <Link
            href={localizedHref(locale, item.href)}
            className="hover:text-[#293B93] hover:no-underline"
          >
            {item.title}
          </Link>
        </h3>
        {item.excerpt ? (
          <p className="TextSmall mt-2 line-clamp-3 text-[#4B5563]">{item.excerpt}</p>
        ) : null}
      </div>
    </article>
  );
}

export default function CategoryNewsGrid({
  locale,
  category,
  categoryName = "News",
  initialPosts = [],
  initialTotal = 0,
}) {
  const [posts, setPosts] = useState(initialPosts);
  const [total, setTotal] = useState(initialTotal);
  const [loading, setLoading] = useState(false);

  const hasMore = posts.length < total;

  const handleLoadMore = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const params = new URLSearchParams({
        category,
        locale,
        start: String(posts.length),
        limit: String(ITEMS_PER_PAGE),
      });

      const res = await fetch(`/api/gtc-news/category-blogs?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to load more posts");

      const json = await res.json();
      const nextPosts = Array.isArray(json.posts) ? json.posts : [];

      setPosts((current) => [...current, ...nextPosts]);
      setTotal(Number(json.total ?? total));
    } catch (error) {
      console.error("[CategoryNewsGrid] load more failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-10 md:py-16">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl">
          <GtcNewsSectionTitle title={categoryName} />

          {posts.length === 0 ? (
            <p className="mt-8 text-center text-[#69729F]">
              No articles available in this category.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {posts.map((item) => (
                <NewsCard
                  key={item.id ?? item.slug}
                  item={item}
                  locale={locale}
                  badgeLabel={item.categoryName || categoryName}
                />
              ))}
            </div>
          )}

          {hasMore && (
            <div className="mt-10 flex justify-center md:mt-12">
              <button
                type="button"
                onClick={handleLoadMore}
                disabled={loading}
                className="TextButton inline-flex items-center justify-center rounded-full border border-[#293B93] px-8 py-2.5 font-semibold text-[#293B93] transition hover:bg-[#293B93] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#293B93]/40 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

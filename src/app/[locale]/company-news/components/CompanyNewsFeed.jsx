"use client";

import { useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import SingleBlogSection from "../../components/blogs/SingleblogSection";
import BlogItem from "../../components/common/BlogItem";
import { useLocale } from "../../LocaleProvider";
import { getBlogPostImageUrl } from "@/lib/strapiBlogs";
import {
  getStrapiApiBase,
  getStrapiAuthHeaders,
  mapStrapiLocale,
} from "@/lib/strapi";

const getApiBase = () => getStrapiApiBase();
const getAuthHeaders = () => getStrapiAuthHeaders();

function getCategoryName(post, fallbackCategory = "Company News") {
  const attrs = post?.attributes ?? post ?? {};
  return (
    attrs?.category?.data?.attributes?.name ||
    attrs?.category?.name ||
    fallbackCategory
  );
}

function getExcerpt(post, fallbackExcerpt = "Read the latest updates and announcements from our team.") {
  const attrs = post?.attributes ?? post ?? {};
  return (
    attrs?.descreption || attrs?.short_descreption ||
    attrs?.shortDescription ||
    fallbackExcerpt
  );
}

function formatDate(isoString, fallbackDate = "Mar 26, 2026") {
  if (!isoString) return fallbackDate;
  try {
    return new Date(isoString).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  } catch {
    return fallbackDate;
  }
}

async function fetchBlogsBatch(locale, start, limit) {
  const baseLocale = mapStrapiLocale(locale);
  const populateParams = {
    "populate[imageUrl][fields][0]": "url",
    "populate[category][fields][0]": "name",
    "populate[category][fields][1]": "slug",
    "populate[author][fields][0]": "name",
    "populate[author][populate][authorImg][fields][0]": "url",
  };

  const attempts = [
    {
      ...populateParams,
      "filters[category][id][$eq]": 7,
      "pagination[start]": start,
      "pagination[limit]": limit,
    },
    {
      ...populateParams,
      "filters[category][$eq]": 7,
      "pagination[start]": start,
      "pagination[limit]": limit,
    },
    {
      ...populateParams,
      "pagination[start]": start,
      "pagination[limit]": limit,
    },
  ];

  const runAttempt = async (loc) => {
    for (const params of attempts) {
      const qs = new URLSearchParams();
      qs.set("locale", loc);
      qs.set("sort", "createdAt:desc");
      Object.entries(params).forEach(([k, v]) => qs.set(k, String(v)));

      try {
        const res = await fetch(`${getApiBase()}/blogs?${qs.toString()}`, {
          headers: getAuthHeaders(),
          cache: "no-store",
        });
        if (!res.ok) continue;
        const json = await res.json();
        if (Array.isArray(json?.data)) return { ...json, usedLocale: loc };
      } catch {
        // Try next attempt
      }
    }
    return null;
  };

  let response = await runAttempt(baseLocale);
  return response || { data: [], meta: { pagination: { total: 0 } }, usedLocale: baseLocale };
}

export default function CompanyNewsFeed({
  initialPosts = [],
  initialTotal = 0,
  initialLocale = "en",
  routeLocale = "en",
  pageLimit = 6,
  uiText = {},
}) {
  const [posts, setPosts] = useState(initialPosts);
  const [total, setTotal] = useState(initialTotal);
  const [start, setStart] = useState(initialPosts.length);
  const [loadingMore, setLoadingMore] = useState(false);
  const contextLocale = useLocale();
  const effectiveLocale = contextLocale || routeLocale || initialLocale || "en";

  const hasMore = start < total;
  const featured = posts[0];
  const rest = useMemo(() => posts.slice(1), [posts]);

  const loadMore = async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    try {
      const res = await fetchBlogsBatch(effectiveLocale, start, pageLimit);
      const incoming = Array.isArray(res?.data) ? res.data : [];
      const nextTotal = Number(res?.meta?.pagination?.total || total);

      if (incoming.length > 0) {
        setPosts((prev) => [...prev, ...incoming]);
        setStart((prev) => prev + incoming.length);
      } else {
        setStart(nextTotal);
      }
      setTotal(nextTotal);
    } finally {
      setLoadingMore(false);
    }
  };

  if (!featured) {
    return (
      <div className="rounded-xl border border-[#E7E9F3] bg-white p-6 text-center">
        <p className="Text text-[#4D4D70]">
          {uiText.emptyState || "No company news available right now."}
        </p>
      </div>
    );
  }

  return (
    <>
      <SingleBlogSection posts={featured} uiText={uiText} />

      <InfiniteScroll
        dataLength={posts.length}
        next={loadMore}
        hasMore={hasMore}
        scrollThreshold={0.75}
        loader={
          <p className="TextSmall pt-6 text-center text-[#6B7280]">
            {uiText.loading || "Loading..."}
          </p>
        }
        endMessage={
          <p className="TextSmall pt-6 text-center text-[#6B7280]">
            {uiText.endMessage || "No more items"}
          </p>
        }
      >
        {rest.length > 0 && (
          <div className="mt-10 grid gap-6 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, idx) => {
              const attrs = post?.attributes ?? post ?? {};
              const id = post?.id || `${attrs?.slug || "post"}-${idx}`;
              return (
                <BlogItem
                  key={id}
                  category={getCategoryName(post, uiText.defaultCategory || "Company News")}
                  title={attrs?.title || uiText.untitled || "Untitled Article"}
                  readTime={attrs?.readTime}
                  excerpt={getExcerpt(
                    post,
                    uiText.defaultExcerpt || "Read the latest updates and announcements from our team."
                  )}
                  date={formatDate(
                    attrs?.publishedAt || attrs?.createdAt,
                    uiText.defaultDate || "Mar 26, 2026"
                  )}
                  dateIso={attrs?.publishedAt || attrs?.createdAt || "2026-03-26"}
                  href={`/${routeLocale}/company-news/${attrs?.slug || attrs?.documentId || post?.slug || ""}`}
                  imageSrc={getBlogPostImageUrl(post)}
                  imageAlt={attrs?.title || uiText.imageAlt || "news image"}
                />
              );
            })}
          </div>
        )}
      </InfiniteScroll>
    </>
  );
}

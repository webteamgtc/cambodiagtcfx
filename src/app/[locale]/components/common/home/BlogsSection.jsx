import { fetchStrapiCollection, mapStrapiLocale } from "@/lib/strapi";
import { getDictionary } from "@/i18n/request";
import BlogItem from "../BlogItem";
import BlogsSectionMobile from "./BlogsSectionMobile";
import { getBlogPostImageUrl } from "@/lib/strapiBlogs";

function IconClock({ className }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

const DEFAULT_STRAPI_API_BASE = "https://api.gtcfx.com/api";

const getApiBase = () =>
  (
    process.env.NEXT_PUBLIC_STRAPI_API_URL ||
    process.env.STRAPI_API_URL ||
    DEFAULT_STRAPI_API_BASE
  ).replace(/\/$/, "");

function getCategoryName(post, fallback) {
  const attrs = post?.attributes ?? post ?? {};
  return (
    attrs?.category?.data?.attributes?.name ||
    attrs?.category?.name ||
    fallback
  );
}

function getExcerpt(post, fallback) {
  const attrs = post?.attributes ?? post ?? {};
  return (
    attrs?.descreption ||
    attrs?.short_descreption ||
    attrs?.shortDescription ||
    fallback
  );
}

function formatDate(isoString, fallback = "Mar 26, 2026") {
  if (!isoString) return fallback;

  try {
    return new Date(isoString).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  } catch {
    return fallback;
  }
}

function getNestedValue(obj, path, fallback = "") {
  return path.split(".").reduce((acc, key) => acc?.[key], obj) ?? fallback;
}

async function getBlogs(locale, start = 0, limit = 3) {
  const populateParams = {
    "populate[imageUrl][fields][0]": "url",
    "populate[category][fields][0]": "name",
    "populate[category][fields][1]": "slug",
    "populate[author][fields][0]": "name",
    "populate[author][populate][authorImg][fields][0]": "url",
  };

  const attemptParams = [
    {
      ...populateParams,
      "filters[category][id][$eq]": 6,
      "pagination[start]": start,
      "pagination[limit]": limit,
    },
    {
      ...populateParams,
      "filters[category][$eq]": 6,
      "pagination[start]": start,
      "pagination[limit]": limit,
    },
    {
      ...populateParams,
      "pagination[start]": start,
      "pagination[limit]": limit,
    },
  ];

  const tryLoad = async (loc) => {
    for (const params of attemptParams) {
      try {
        const res = await fetchStrapiCollection("blogs", {
          locale: mapStrapiLocale(loc),
          populate: null,
          sort: "createdAt:desc",
          params,
          cache: "no-store",
          revalidate: 300,
        });

        if (Array.isArray(res?.data)) return res;
      } catch (error) {
        console.error("[blogs] blogs fetch attempt failed:", error?.message || error);
      }
    }

    return { data: [] };
  };

  let res = await tryLoad(locale);
  let usedLocale = mapStrapiLocale(locale);

  // if ((!res?.data || res.data.length === 0) && locale !== "en") {
  //   res = await tryLoad("en");
  //   usedLocale = "en";
  // }

  const rows = Array.isArray(res?.data) ? res.data : [];
  const total = Number(res?.meta?.pagination?.total || rows.length || 0);

  return {
    rows,
    total,
    usedLocale,
  };
}

export default async function BlogsSection({ locale = "en" }) {
  const messages = await getDictionary(locale);
  const blogText = getNestedValue(messages, "home.homeBlogs", {});

  const firstBatch = await getBlogs(locale, 0, 3);
  const rows = Array.isArray(firstBatch?.rows) ? firstBatch.rows : [];
  const usedLocale = firstBatch?.usedLocale || locale;

  const headingBefore = blogText?.heading?.before || "Latest Insights ";
  const headingSeparator = blogText?.heading?.separator || "&";
  const headingAfter = blogText?.heading?.after || " Company Updates";
  const description =
    blogText?.description ||
    "Stay informed with the latest market insights, trading updates, and company news. Explore expert analysis, educational content, and important announcements from GTCFX.";
  const readMore = blogText?.readMore || "Read →";

  const fallbackTitle = blogText?.fallback?.title || "Untitled Article";
  const fallbackExcerpt =
    blogText?.fallback?.excerpt ||
    "Read the latest updates and announcements from our team.";
  const fallbackDate = blogText?.fallback?.date || "Mar 26, 2026";
  const fallbackReadTime = blogText?.fallback?.readTime || "5 min read";
  const fallbackCategory = blogText?.fallback?.category || "Blogs";
  const fallbackImageAlt = blogText?.fallback?.imageAlt || "news image";

  return (
    <>
      {rows?.length > 0 && (
        <section className="py-10 md:py-16">
          <div className="container">
            <div className="mx-auto mb-10 flex max-w-4xl flex-col items-center gap-6 text-center md:mb-14">
              <h2 className="HeadingH2">
                {headingBefore}
                <span className="text-secondary"> {headingSeparator} </span>
                {headingAfter}
              </h2>

              <p className="Text">{description}</p>
            </div>

            <div className="hidden items-stretch gap-6 md:grid md:grid-cols-3 md:gap-8">
              {rows.map((post, idx) => {
                const attrs = post?.attributes ?? post ?? {};
                const id = post?.id || `${attrs?.slug || "post"}-${idx}`;
                const href = `/${usedLocale}/blogs/${attrs?.slug || attrs?.documentId || post?.slug || ""}`;

                return (
                  <BlogItem
                    key={id}
                    category={getCategoryName(post, fallbackCategory)}
                    title={attrs?.title || fallbackTitle}
                    readTime={attrs?.readTime || fallbackReadTime}
                    excerpt={getExcerpt(post, fallbackExcerpt)}
                    date={formatDate(attrs?.publishedAt || attrs?.createdAt, fallbackDate)}
                    dateIso={attrs?.publishedAt || attrs?.createdAt || "2026-03-26"}
                    href={href}
                    imageSrc={getBlogPostImageUrl(post)}
                    imageAlt={attrs?.title || fallbackImageAlt}
                    readMoreText={readMore}
                  />
                );
              })}
            </div>

            <div className="md:hidden">
              <BlogsSectionMobile
                items={rows.map((post, idx) => {
                  const attrs = post?.attributes ?? post ?? {};
                  const href = `/${usedLocale}/blogs/${attrs?.slug || attrs?.documentId || post?.slug || ""}`;

                  return {
                    category: getCategoryName(post, fallbackCategory),
                    title: attrs?.title || fallbackTitle,
                    readTime: attrs?.readTime || fallbackReadTime,
                    date: formatDate(attrs?.publishedAt || attrs?.createdAt, fallbackDate),
                    dateIso: attrs?.publishedAt || attrs?.createdAt || "2026-03-26",
                    href,
                    imageSrc: getBlogPostImageUrl(post),
                    imageAlt: attrs?.title || fallbackImageAlt,
                    readMoreText: readMore,
                  };
                })}
              />
            </div>
          </div>
        </section>
      )}
    </>

  );
}
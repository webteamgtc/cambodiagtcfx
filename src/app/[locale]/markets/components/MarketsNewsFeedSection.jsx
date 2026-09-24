"use client";

import Link from "next/link";
import MobilePeekCarousel from "@/app/[locale]/components/common/MobilePeekCarousel";
import BlogCoverImage from "@/app/[locale]/components/common/BlogCoverImage";
import { usePathTranslation } from "../../LocaleProvider";
import { localizedHref } from "@/i18n/localizedHref";
import { BLOG_CARD_FALLBACK_IMAGE } from "@/lib/blog/blogCardImage";
import {
  formatPostDate,
  getPostAuthor,
  getPostExcerpt,
  getPostImageUrl,
  getPostSlug,
  getPostTitle,
} from "./marketsNewsUtils";

function IconMore({ className }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <circle cx="5" cy="12" r="1.75" />
      <circle cx="12" cy="12" r="1.75" />
      <circle cx="19" cy="12" r="1.75" />
    </svg>
  );
}

function FeaturedArticle({ article, t }) {
  return (
    <article className="flex h-full min-w-0 flex-col">
      <Link
        href={article.href}
        className="group block overflow-hidden rounded-xl hover:no-underline"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-[#e8ecf2] sm:aspect-[16/9]">
          <BlogCoverImage
            src={article.image}
            alt={article.title}
            className="object-cover transition duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 1024px) 100vw, 58vw"
          />
        </div>
      </Link>

      <Link href={article.href} className="mt-5 block hover:no-underline">
        <h3 className="HeadingH5 font-semibold leading-snug text-[#111827] transition group-hover:text-[#293B93]">
          {article.title}
        </h3>
      </Link>

      <p className="TextSmall mt-3 line-clamp-3 font-normal leading-relaxed text-[#666666]">
        {article.excerpt}
      </p>

      <div className="mt-5 flex items-center justify-between gap-3">
        <p className="TextSmall font-normal text-[#666666]">
          {article.author ? (
            <>
              <span className="text-[#333333]">{article.author}</span>
              <span className="mx-1.5 text-[#999999]">•</span>
            </>
          ) : null}
          <time dateTime={article.dateIso}>{article.date}</time>
        </p>
        <button
          type="button"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#666666] transition hover:bg-[#f0f2f8]"
          aria-label={t("moreOptions", "More options")}
        >
          <IconMore />
        </button>
      </div>
    </article>
  );
}

function CompactArticleCard({ article }) {
  return (
    <article className="flex h-full min-w-0 flex-col">
      <Link
        href={article.href}
        className="group block overflow-hidden rounded-xl hover:no-underline"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-[#e8ecf2]">
          <BlogCoverImage
            src={article.image}
            alt={article.title}
            className="object-cover transition duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 50vw, 22vw"
          />
        </div>
        <h3 className="Text mt-3 line-clamp-3 font-semibold leading-snug text-[#111827] transition group-hover:text-[#293B93]">
          {article.title}
        </h3>
      </Link>
    </article>
  );
}

const FALLBACK_ARTICLES = [
  {
    slug: "leverage-trading-guide",
    title:
      "What Is Leverage in Trading? Benefits, Risks & Real Examples (2026 Guide)",
    excerpt:
      "Discover what leverage in trading means, how it works, its benefits, major risks, and real examples. Learn how to use leverage safely in forex, stocks, and CFD trading.",
    author: "Justin Low",
    date: "Dec 23, 2026",
    dateIso: "2026-12-23",
    image: BLOG_CARD_FALLBACK_IMAGE,
  },
  {
    slug: "week-ahead-20-april",
    title: "What to Expect in the Week Ahead? 20 April - 24 April",
    excerpt: "",
    author: "",
    date: "",
    dateIso: "",
    image: BLOG_CARD_FALLBACK_IMAGE,
  },
  {
    slug: "weekly-outlook-13-17-april",
    title:
      "Weekly Outlook: 13-17 April 2026 – US PPI, Eurozone CPI & FOMC Speeches in Focus Amid US-Iran",
    excerpt: "",
    author: "",
    date: "",
    dateIso: "",
    image: BLOG_CARD_FALLBACK_IMAGE,
  },
  {
    slug: "weekly-recap-6-10-april",
    title:
      "Weekly Recap: 6th – 10th April 2026 – Oil Volatility, Iran Conflict & Central Bank Signals",
    excerpt: "",
    author: "",
    date: "",
    dateIso: "",
    image: BLOG_CARD_FALLBACK_IMAGE,
  },
  {
    slug: "what-you-missed-30-march",
    title: "What You Missed On This Week? 30 March – 3 April",
    excerpt: "",
    author: "",
    date: "",
    dateIso: "",
    image: "/new-design/mobile.webp",
  },
];

function mapPostsToArticles(posts, locale, t) {
  if (!posts?.length) {
    return FALLBACK_ARTICLES.map((item) => ({
      ...item,
      href: localizedHref(locale, `/blogs/${item.slug}`),
      excerpt: item.excerpt || t("defaultExcerpt", ""),
    }));
  }

  return posts.map((post) => {
    const slug = getPostSlug(post);
    const attrs = post?.attributes ?? post ?? {};
    return {
      slug,
      title: getPostTitle(post, t("untitled", "Untitled Article")),
      excerpt: getPostExcerpt(
        post,
        t(
          "defaultExcerpt",
          "Read the latest market insights, trading updates, and analysis from GTCFX."
        )
      ),
      author: getPostAuthor(post),
      date: formatPostDate(
        attrs?.publishedAt || attrs?.createdAt,
        t("defaultDate", "Mar 26, 2026")
      ),
      dateIso: attrs?.publishedAt || attrs?.createdAt || "",
      image: getPostImageUrl(post),
      href: localizedHref(locale, `/blogs/${slug}`),
    };
  });
}

export default function MarketsNewsFeedSection({ locale = "en", posts = [] }) {
  const t = usePathTranslation("marketsPage.newsFeedSection");

  const articles = mapPostsToArticles(posts, locale, t);
  const featured = articles[0];
  const compact = articles.slice(1, 5);

  const blogsHref = localizedHref(locale, "/blogs");

  return (
    <section className="overflow-x-hidden bg-white py-14 md:py-16">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl">
          <h2 className="HeadingH1 text-[#000] text-center">
            {t("title", "Market News Feed")}
          </h2>

          <p className="HeadingH2 text-[#293B93] mt-10 md:mt-12">
            {t("subtitle", "Market News")}
          </p>

          <div className="mt-6 grid min-w-0 gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-10 xl:gap-12">
            {featured ? (
              <FeaturedArticle article={featured} t={t} />
            ) : null}

            <div className="min-w-0">
              <div className="hidden gap-5 sm:grid sm:grid-cols-2 sm:gap-5 lg:gap-6">
                {compact.map((article) => (
                  <CompactArticleCard key={article.slug} article={article} />
                ))}
              </div>

              <div className="sm:hidden">
                <MobilePeekCarousel
                  items={compact}
                  showArrows
                  className="w-full min-w-0"
                  trackClassName="-mx-4 px-4 min-w-0"
                  slideClassName="!h-auto"
                  renderItem={(article) => (
                    <div className="w-full min-w-0">
                      <CompactArticleCard article={article} />
                    </div>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="mt-10 flex justify-center md:mt-12">
            <Link
              href={blogsHref}
              className="TextButton inline-flex h-11 min-w-[160px] items-center justify-center rounded-full bg-[#293B93] px-10 text-white transition hover:bg-[#243575] hover:no-underline"
            >
              {t("learnMore", "Learn more")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

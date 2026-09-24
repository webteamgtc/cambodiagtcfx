"use client";

import Link from "next/link";
import { localizedHref } from "@/i18n/localizedHref";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

function ArticleCard({ title, readMoreLabel, featured = false, href }) {
  const buttonClass = featured
    ? "bg-[#293B93] text-white group-hover:bg-white group-hover:!text-[#293B93]"
    : "border border-[#D1D5DB] bg-white text-[#6B7280] group-hover:border-white group-hover:!text-[#293B93]";

  return (
    <Link href={href} className="group block h-full">
      <article
        className={`flex h-full min-h-[240px] flex-col justify-between rounded-[10px] bg-[#FAFAFA] p-5 transition duration-300 hover:bg-[#293B93] hover:shadow-md sm:p-6`}
      >
        <h3 className="HeadingH5 font-semibold leading-snug text-black transition group-hover:text-white">
          {title}
        </h3>

        <span
          className={`mt-6 inline-flex w-fit items-center justify-center rounded-full px-5 py-2 text-sm font-medium transition ${buttonClass}`}
        >
          {readMoreLabel}
        </span>
      </article>
    </Link>
  );
}

export default function ArticleCardsGrid({
  title,
  articles = [],
  locale,
  materialSlug,
  sectionSlug,
}) {
  const t = usePathTranslation("forTradingBeginnersPage.articles");

  return (
    <section className="bg-white py-14 md:py-16 lg:py-20">
      <div className="container">
        <h2 className="HeadingH2 font-bold text-black">{title}</h2>

        {!articles?.length ? (
          <p className="mt-8 text-sm text-gray-500 lg:mt-10">
            {t("noArticlesFound", "No articles found.")}
          </p>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3 lg:gap-6">
            {articles.map((article, index) => (
              <ArticleCard
                key={article.slug}
                title={article?.title}
                readMoreLabel={t("readMore", "Read more")}
                featured={index === 0}
                href={localizedHref(
                  locale,
                  `/knowledge-to-learn/${materialSlug}/${sectionSlug}/${article.slug}`
                )}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

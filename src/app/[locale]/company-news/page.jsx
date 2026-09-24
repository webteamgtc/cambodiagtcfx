import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import { MdOutlineNewspaper } from "react-icons/md";
import { getDictionary } from "@/i18n/request";
import {
  fetchStrapiCollection,
  mapStrapiLocale,
} from "@/lib/strapi";
import CompanyNewsFeed from "./components/CompanyNewsFeed";

export const dynamic = "force-dynamic";

async function getCompanyNews(locale, start = 0, limit = 6) {
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

  const tryLoad = async (loc) => {
    for (const params of attemptParams) {
      try {
        const res = await fetchStrapiCollection("blogs", {
          locale: loc,
          populate: null,
          sort: "createdAt:desc",
          params,
          cache: "no-store",
        });

        if (Array.isArray(res?.data)) return res;
      } catch (error) {
        console.error(
          "[company-news] blogs fetch attempt failed:",
          error?.message || error
        );
      }
    }

    return { data: [] };
  };

  const mappedLocale = mapStrapiLocale(locale);
  const res = await tryLoad(mappedLocale);
  const usedLocale = mappedLocale;

  const rows = Array.isArray(res?.data) ? res.data : [];
  const total = Number(res?.meta?.pagination?.total || rows.length || 0);

  return {
    rows,
    total,
    usedLocale,
  };
}

export async function generateMetadata({ params }) {
  const { locale } = await params;

  return getPageMetadata({
    locale,
    key: "companyNews",
    path: "company-news",
    fallbackTitle: "Company News | GTCFX Trading Updates",
    fallbackDescription:
      "Explore the latest updates, announcements, and developments from GTCFX across global markets.",
  });
}

export default async function CompanyNewsPage({ params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const companyNews = dict.companyNews || {};

  const text = (key, fallback) => {
    const value = companyNews?.[key];
    return typeof value === "string" && value.length ? value : fallback;
  };

  const firstBatch = await getCompanyNews(locale, 0, 6);

  const uiText = {
    readMore: text("readMore", "Read More"),
    emptyState: text("emptyState", "No company news available right now."),
    endMessage: text("endMessage", "No more items"),
    loading: text("loading", "Loading..."),
    defaultCategory: text("defaultCategory", "Company News"),
    defaultExcerpt: text(
      "defaultExcerpt",
      "Read the latest updates and announcements from our team."
    ),
    untitled: text("untitled", "Untitled Article"),
    imageAlt: text("imageAlt", "news image"),
    defaultDate: text("defaultDate", "Mar 26, 2026"),
  };

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-[#fff] to-[#fff] py-10 md:py-16">
        <div className="container relative z-10">
          <div className="mb-4 flex items-center gap-3 text-[#b68756]">
            <p className="text-secondary text-4xl md:text-5xl">
              <MdOutlineNewspaper />
            </p>

            <h1 className="HeadingH3 text-primary">
              {text("titlePrefix", "Company")}{" "}
              <span className="text-[#b68756]">
                {text("titleHighlight", "News")}
              </span>
            </h1>
          </div>

          <p className="Text my-5 max-w-4xl">
            {text(
              "intro",
              "Read the latest company news, market updates, and insights from GTCFX. Stay informed and make confident trading decisions every day."
            )}
          </p>

          <CompanyNewsFeed
            initialPosts={firstBatch.rows}
            initialTotal={firstBatch.total}
            initialLocale={firstBatch.usedLocale}
            routeLocale={locale}
            pageLimit={6}
            uiText={uiText}
          />
        </div>
      </section>
    </>
  );
}

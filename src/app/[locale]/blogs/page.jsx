import { MdOutlineNewspaper } from "react-icons/md";
import { getDictionary } from "@/i18n/request";
import { fetchBlogsStrapiPage } from "@/lib/strapiBlogs";
import InnerPageBanner from "../components/common/InnerPageBanner";
import BlogFeeds from "./components/BlogFeeds";
import { getPageMetadata } from "@/lib/metadata/getPageMetadata";

export const dynamic = "force-dynamic";

async function getBlogs(locale, start = 0, limit = 6) {
  const { data, meta, usedLocale } = await fetchBlogsStrapiPage(
    locale,
    start,
    limit,
    "no-store"
  );
  const rows = Array.isArray(data) ? data : [];
  const total = Number(meta?.pagination?.total || rows.length || 0);
  return {
    rows,
    total,
    usedLocale, 
  };
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return getPageMetadata({
    locale,
      key: "blogs",
    dict,
    path: "blogs",
    fallbackTitle: "Blogs - GTC FX",
    fallbackDescription: "Read market insights from GTCFX.",
  });
}

export default async function CompanyNewsPage({ params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const blogs = dict.blogs || {};
  const text = (key, fallback) => {
    const value = blogs?.[key];
    return typeof value === "string" && value.length ? value : fallback;
  };

  const firstBatch = await getBlogs(locale, 0, 6);
  const uiText = {
    readMore: text("readMore", "Read More"),
    emptyState: text("emptyState", "No blogs available right now."),
    endMessage: text("endMessage", "No more items"),
    loading: text("loading", "Loading..."),
    defaultCategory: text("defaultCategory", "Blogs"),
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
                {text("titlePrefix", "Blogs")}{" "}
             </h1>
          </div>
          <p className="Text my-5 max-w-4xl">
            {text(
              "intro",
              "Stay ahead with GTCFX Blog — your source for CFD market news, trading tips, and strategies to help you trade smarter and grow consistently."
            )}
          </p>
             <BlogFeeds
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

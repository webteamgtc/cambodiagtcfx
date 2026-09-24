import InnerPageBanner from "../../components/common/InnerPageBanner";
import { getDictionary } from "@/i18n/request";
import SingleDetailPage from "../../components/blogs/SingleDetailPage";
import { getPageMetadata } from "@/lib/metadata/getPageMetadata";

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  return getPageMetadata({
    locale,
    key: "companyNews",
    path: `company-news/${slug}`,
    fallbackTitle: "Company News - GTC FX",
    fallbackDescription: "Latest updates from GTCFX.",
  });
}

export default async function CompanyNewsDetailPage({ params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const companyNews = dict.companyNews || {};
  const text = (key, fallback) =>
    typeof companyNews?.[key] === "string" && companyNews[key].length
      ? companyNews[key]
      : fallback;

  return (
    <>

      <SingleDetailPage url="company-news" />
    </>
  );
}

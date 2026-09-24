import { getDictionary } from "@/i18n/request";
 import LeaderDetailPage from "../components/LeaderDetailPage";
import { getPageMetadata } from "@/lib/metadata/getPageMetadata";

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const dict = await getDictionary(locale);
  return getPageMetadata({
    locale,
    key: "leaderboard",
    dict,
    path: `leaderboard/${slug}`,
    fallbackTitle: "Leaderboard - GTC FX",
    fallbackDescription: "Explore our leaderboard and see the top traders.",
  });
}

export default async function pages({ params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <>

      <LeaderDetailPage />

      {/* other sections */}
    </>
  );
}

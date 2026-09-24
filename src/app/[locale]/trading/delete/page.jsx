import { getDictionary } from "@/i18n/request";
import DeleteAccountPage from "./components/DeleteAccountPage";
import { getPageMetadata } from "@/lib/metadata/getPageMetadata";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return getPageMetadata({
    locale,
    key: "deleteAccount",
    dict,
    path: "trading/delete",
    fallbackTitle: "Delete Account - GTC FX",
    fallbackDescription: "Securely submit your account deletion request.",
  });
}

export default async function AboutPage({ params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const about = dict.about || {};

  return (
    <>
 
      <DeleteAccountPage />

      {/* other sections */}
    </>
  );
}

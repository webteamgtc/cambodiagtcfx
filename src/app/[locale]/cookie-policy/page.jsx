import { getDictionary } from "@/i18n/request";
import InnerPageBanner from "../components/common/InnerPageBanner";
import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import { getLocalizedDocument } from "@/lib/documents/getLocalizedDocument";
import { locales } from "@/i18n/config";
import PrivacyPolicyPage from "../components/documents/PrivacyPolicy";


export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const PRIVACY_DOCUMENT_BASE_URL =
  process.env.NEXT_PUBLIC_DOCUMENTS_URL + "/cookie-policy";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return getPageMetadata({
    locale,
    key: "cookiePolicy",
    dict,
    path: "cookie-policy",
    fallbackTitle: "Cookie Policy | How We Use Cookies | GTCFX",
    fallbackDescription:
      "Learn how GTCFX uses cookies and similar technologies to enhance your browsing experience and improve website functionality.",
  });
}

export default async function Page({ params }) {
  const { locale } = await params;
  const privacyData = await getLocalizedDocument(
    PRIVACY_DOCUMENT_BASE_URL,
    locale
  );

  return (
    <>
   
      <PrivacyPolicyPage data={privacyData} />
    </>
  );
}
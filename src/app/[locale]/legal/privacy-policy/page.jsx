import { getDictionary } from "@/i18n/request";
import PrivacyPolicyPage from "../components/commonDocumentSection";
import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import { getLocalizedDocument } from "@/lib/documents/getLocalizedDocument";
import { locales } from "@/i18n/config";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const PRIVACY_DOCUMENT_BASE_URL =
  process.env.NEXT_PUBLIC_DOCUMENTS_URL + "/privacy-policy";
export async function generateMetadata({ params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return getPageMetadata({
    locale,
    key: "privacyPolicy",
    dict,
    path: "legal/privacy-policy",
    fallbackTitle: "Privacy Policy - GTCFX",
    fallbackDescription: "Your privacy is important to us. Learn how we protect and manage your personal data with the highest standards of security and transparency.",
  });
}

export default async function pages({ params }) {
  const { locale } = await params;
  const privacyData = await getLocalizedDocument(
    PRIVACY_DOCUMENT_BASE_URL,
    locale
  );

  return (
    <>

      <PrivacyPolicyPage data={privacyData} />

      {/* other sections */}
    </>
  );
}

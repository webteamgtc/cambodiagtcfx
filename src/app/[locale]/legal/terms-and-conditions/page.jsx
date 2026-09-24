import { getDictionary } from "@/i18n/request";
import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import { locales } from "@/i18n/config";
import TermsAndConditionsPage from "../components/commonDocumentSection";
import PrivacyPolicyPage from "../components/commonDocumentSection";
import { getLocalizedDocument } from "@/lib/documents/getLocalizedDocument";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const PRIVACY_DOCUMENT_BASE_URL =
  process.env.NEXT_PUBLIC_DOCUMENTS_URL + "/terms-and-conditions"


export async function generateMetadata({ params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return getPageMetadata({
    locale,
    key: "termsCondition",
    dict,
    path: "legal/terms-and-conditions",
    fallbackTitle: "Terms and Conditions | GTCFX",
    fallbackDescription:
      "Read the Terms & Conditions of GTCFX before availing of our services. Click here to learn how GTCFX manages data feeds, privacy, security, and more.",
  });
}

export default async function pages({ params }) {
  const { locale } = await params;
  const termsData = await getLocalizedDocument(
    PRIVACY_DOCUMENT_BASE_URL,
    locale
  );

  return (
    <>

      <PrivacyPolicyPage data={termsData} />

      {/* other sections */}
    </>
  );
}

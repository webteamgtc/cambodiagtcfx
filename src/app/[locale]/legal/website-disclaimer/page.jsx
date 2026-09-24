import { getDictionary } from "@/i18n/request";
import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import { locales } from "@/i18n/config";
import PrivacyPolicyPage from "../components/commonDocumentSection";
import { getLocalizedDocument } from "@/lib/documents/getLocalizedDocument";
export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const WEBSITE_DISCLAIMER_DOCUMENT_BASE_URL =
  process.env.NEXT_PUBLIC_DOCUMENTS_URL + "/website-disclaimer";
export async function generateMetadata({ params }) {
  const { locale } = params;
  const dict = await getDictionary(locale);

  return getPageMetadata({
    locale,
    dict,
    key: "websiteDisclaimer",
    path: "legal/website-disclaimer",
    fallbackTitle: "Website Disclaimer | GTCFX",
    fallbackDescription:
      "The information provided on this website is for general informational purposes only and does not constitute investment advice, solicitation, or recommendation.",
  });
}

export default async function WebsiteDisclaimer({ params }) {
    const { locale } = await params;
  const websiteDisclaimerData = await getLocalizedDocument(
    WEBSITE_DISCLAIMER_DOCUMENT_BASE_URL,
    locale
  );

  return (
    <>
      <PrivacyPolicyPage data={websiteDisclaimerData} />

      {/* other sections */}
    </>
  );
}
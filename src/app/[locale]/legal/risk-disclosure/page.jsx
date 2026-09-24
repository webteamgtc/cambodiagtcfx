import { getDictionary } from "@/i18n/request";
import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import { locales } from "@/i18n/config";
import PrivacyPolicyPage from "../components/commonDocumentSection";
import { getLocalizedDocument } from "@/lib/documents/getLocalizedDocument";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const RISK_DISCLOSURE_DOCUMENT_BASE_URL =
  process.env.NEXT_PUBLIC_DOCUMENTS_URL + "/risk-disclosure";
export async function generateMetadata({ params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return getPageMetadata({
    locale,
    key: "riskDisclosure",
    dict,
    path: "legal/risk-disclosure",
    fallbackTitle: "Risk Disclosure - GTC FX",
    fallbackDescription: "Understand the risks associated with trading financial instruments before making investment decisions.",
  });
}

export default async function AboutPage({ params }) {
  const { locale } = await params;
  const riskDisclosureData = await getLocalizedDocument(
    RISK_DISCLOSURE_DOCUMENT_BASE_URL,
    locale
  );

  return (
    <>
      <PrivacyPolicyPage data={riskDisclosureData} />

      {/* other sections */}
    </>
  );
}

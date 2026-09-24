import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import { locales } from "@/i18n/config";
import LegalDocumentsHeroSection from "./components/LegalDocumentsHeroSection";
import LegalDocumentsContentSection from "./components/LegalDocumentsContentSection";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;

  return getPageMetadata({
    locale,
    key: "legalDocuments",
    path: "legal/legal-documents",
    fallbackTitle: "Legal Documents | Policies & Client Agreements | GTCFX",
    fallbackDescription:
      "Download GTCFX legal documents, client onboarding forms, privacy policies, risk disclosures, and regulatory agreements for GTC Global LTD (Mauritius) and GTC Global Trade Capital Co. Ltd (Vanuatu).",
  });
}

export default function LegalDocumentsPage() {
  return (
    <>
      <LegalDocumentsHeroSection />
      <LegalDocumentsContentSection />
    </>
  );
}

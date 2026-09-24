import { getDictionary } from "@/i18n/request";
import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import { locales } from "@/i18n/config";
import PrivacyPolicyPage from "../components/commonDocumentSection";
import { getLocalizedDocument } from "@/lib/documents/getLocalizedDocument";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const DEPOSIT_AND_REFUND_POLICY_DOCUMENT_BASE_URL =
  process.env.NEXT_PUBLIC_DOCUMENTS_URL + "/deposit-and-refund-policy";
  export async function generateMetadata({ params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return getPageMetadata({
    locale,
    key: "refundPolicy",
    dict,
    path: "legal/deposit-and-refund-policy",
    fallbackTitle: "Deposit & Refund Policy- GTCFX",
    fallbackDescription: "This Deposit & Refund Policy outlines the procedures and conditions related to deposits, withdrawals, and refund requests with GTCFX.",
  });
}

export default async function pages({ params }) {
  const { locale } = await params;
  const depositRefundPolicyData = await getLocalizedDocument(
    DEPOSIT_AND_REFUND_POLICY_DOCUMENT_BASE_URL,
        locale
      );

  return (
    <>

      <PrivacyPolicyPage data={depositRefundPolicyData} />
      

      {/* other sections */}
    </>
  );
}

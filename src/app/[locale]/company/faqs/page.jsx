import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import FaqCategoriesSection from "./components/FaqCategoriesSection";
import FaqHeroSection from "./components/FaqHeroSection";
import SupportCtaSection from "@/app/[locale]/components/common/SupportCtaSection";

export async function generateMetadata({ params }) {
  const { locale } = await params;

  return getPageMetadata({
    locale,
    key: "faqs",
    path: "company/faqs",
    fallbackTitle: "FAQs - GTC FX",
    fallbackDescription:
      "Find answers about accounts, deposits, platforms, verification, and support.",
  });
}

export default async function FaqsPage({ params }) {
  const { locale } = await params;

  return (
    <>
      <FaqHeroSection />

      <FaqCategoriesSection />
     
      <SupportCtaSection locale={locale} />
    </>
  );
}

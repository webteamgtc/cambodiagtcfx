import { Suspense } from "react";
import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import { getMenuHubTabsForLocale } from "@/app/[locale]/components/common/megaMenuData";
import CompanyHubSection from "./components/CompanyHubSection";
import CompanyLegalSection from "./components/CompanyLegalSection";
import CompanyAwardsSection from "./components/CompanyAwardsSection";
import CompanyLeverageSection from "./components/CompanyLeverageSection";
import CompanyHelpCenterSection from "./components/CompanyHelpCenterSection";
import CompanyPartnerSection from "./components/CompanyPartnerSection";
import SupportCtaSection from "@/app/[locale]/components/common/SupportCtaSection";

export async function generateMetadata({ params }) {
  const { locale } = await params;

  return getPageMetadata({
    locale,
    key: "company",
    path: "company",
    fallbackTitle: "GTCFX Company | Regulations, Awards, Partners & Support",
    fallbackDescription:
      "Explore GTCFX company information — global regulations, industry awards, partnership programs, leverage details, and support resources from a trusted Forex & CFD broker.",
  });
}



export default async function CompanyHubPage({ params }) {
  const { locale } = await params;
  const { links } = await getMenuHubTabsForLocale("prime", locale);
  

  return (
    <>
      <CompanyHubSection locale={locale} links={links} />
      <Suspense fallback={null}>
        <CompanyLegalSection locale={locale} />
        <CompanyAwardsSection locale={locale} />
      </Suspense>
      <Suspense fallback={null}>
        <CompanyLeverageSection locale={locale} />
        <CompanyHelpCenterSection locale={locale} />
        <CompanyPartnerSection />
        <SupportCtaSection locale={locale} />
      </Suspense>
    </>
  );
}

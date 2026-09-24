import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import RegulationsHeroSection from "./components/RegulationsHeroSection";
import RegulationsLicensesSection from "./components/RegulationsLicensesSection";
import RegulationsPresenceSection from "./components/RegulationsPresenceSection";
import RegulationsTimelineSection from "./components/RegulationsTimelineSection";
import RegulationsProtectionSection from "./components/RegulationsProtectionSection";
import RegulationsGroupSection from "./components/RegulationsGroupSection";
import RegulationsCtaSection from "./components/RegulationsCtaSection";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return getPageMetadata({
    locale,
    key: "regulations",
    path: "company/regulations",
    fallbackTitle: "Regulations | GTCFX",
    fallbackDescription:
      "GTC Financial Group holds financial services licenses across five jurisdictions. Verify our regulated entities and compliance framework.",
  });
}


export default async function RegulationsPage({ params }) {
  await params;
  return (
    <>
      <RegulationsHeroSection />
      <RegulationsLicensesSection />
      <RegulationsPresenceSection />
      {/* <RegulationsTimelineSection /> */}
      <RegulationsProtectionSection />
      <RegulationsGroupSection />
      <RegulationsCtaSection />
    </>
  );
}

import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import CompensationFundHeroSection from "./components/CompensationFundHeroSection";
import CompensationFundProcessSection from "./components/CompensationFundProcessSection";
import CompensationFundCoverageStatsSection from "./components/CompensationFundCoverageStatsSection";
import CompensationFundProtectionScopeSection from "./components/CompensationFundProtectionScopeSection";
import CompensationFundCtaSection from "./components/CompensationFundCtaSection";

export async function generateMetadata({ params }) {
  const { locale } = await params;

  return getPageMetadata({
    locale,
    key: "compensationFund",
    path: "trading/compensation-fund",
    fallbackTitle: "Security of Fund | Compensation Fund | GTCFX",
    fallbackDescription:
      "Learn how GTCFX protects client funds through Financial Commission membership and compensation fund coverage up to €20,000 per client.",
  });
}

export default async function CompensationFundPage() {
  return (
    <div className="relative overflow-hidden bg-[#F8F9FC]">
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden
        style={{
          background: [
            "linear-gradient(180deg, rgba(231, 238, 254, 0) 0%, #F8FAFF 100%)",
            "linear-gradient(180deg, rgba(248, 250, 255, 0) 0%, #F0F4FF 28.37%, #EBF1FE 75.96%, rgba(231, 238, 254, 0) 100%)",
            "linear-gradient(180deg, #F8FAFF 0%, rgba(231, 238, 254, 0) 100%)",
          ].join(", "),
        }}
      />

      <CompensationFundHeroSection />
      <CompensationFundProcessSection />
      <CompensationFundCoverageStatsSection />
      <CompensationFundProtectionScopeSection />
      <CompensationFundCtaSection />
    </div>
  );
}

import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import VpsHostingHeroSection from "./components/VpsHostingHeroSection";
import VpsHostingStatsBarSection from "./components/VpsHostingStatsBarSection";
import VpsHostingPricingSection from "./components/VpsHostingPricingSection";
import VpsHostingComparisonSection from "./components/VpsHostingComparisonSection";
import VpsHostingFaqSection from "./components/VpsHostingFaqSection";
import VpsHostingApplySection from "./components/VpsHostingApplySection";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return getPageMetadata({
    locale,
    key: "vpsHosting",
    path: "trading/vps-hosting-services",
    fallbackTitle: "VPS Hosting for Trading | Low Latency & Stability | GTCFX",
    fallbackDescription:
      "Enhance your trading with VPS hosting from GTCFX. Enjoy low latency, secure connections, and uninterrupted execution.",
  });
}

export default async function VpsHostingServicesPage({ params }) {
  const { locale } = await params;

  return (
    <div className="bg-white">
      <VpsHostingHeroSection locale={locale} />
      {/* <VpsHostingStatsBarSection /> */}
      <VpsHostingPricingSection />
      <VpsHostingComparisonSection />
      <VpsHostingFaqSection />
      <VpsHostingApplySection />
    </div>
  );
}

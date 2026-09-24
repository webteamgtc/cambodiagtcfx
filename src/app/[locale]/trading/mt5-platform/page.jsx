import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import PlatformHeroSection from "../platform-shared/components/PlatformHeroSection";
import PlatformStatsSection from "../platform-shared/components/PlatformStatsSection";
import PlatformCapabilitiesSection from "../platform-shared/components/PlatformCapabilitiesSection";
import PlatformDownloadSection from "../platform-shared/components/PlatformDownloadSection";
import PlatformEdgeSection from "../platform-shared/components/PlatformEdgeSection";
import PlatformStepsSection from "../platform-shared/components/PlatformStepsSection";
import PlatformFaqSection from "../platform-shared/components/PlatformFaqSection";
import PlatformCtaSection from "../platform-shared/components/PlatformCtaSection";
import { MT5 } from "../platform-shared/platformData";
import WhyGtcGroupGetStartedSection from "../../company/why-gtc-group/components/WhyGtcGroupGetStartedSection";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return getPageMetadata({
    locale,
    key: "mt5Platform",
    path: "trading/mt5-platform",
    fallbackTitle: "MetaTrader 5 | GTCFX Trading Platform",
    fallbackDescription:
      "Download MT5 with GTCFX. The next-generation multi-asset trading platform with deeper analytics, native hedging, and expanded markets.",
  });
}

export default async function MT5PlatformPage({ params }) {
  await params;

  return (
    <>
      <PlatformHeroSection data={MT5} />
      {/* <PlatformStatsSection data={MT5} /> */}
      <PlatformCapabilitiesSection data={MT5} />
      <PlatformDownloadSection data={MT5} />
      <PlatformEdgeSection data={MT5} />
      <PlatformStepsSection data={MT5} />
      <PlatformFaqSection data={MT5} />
      <PlatformCtaSection data={MT5} />
    </>
  );
}

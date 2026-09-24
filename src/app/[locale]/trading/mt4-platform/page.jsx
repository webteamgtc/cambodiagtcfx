import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import PlatformHeroSection from "../platform-shared/components/PlatformHeroSection";
import PlatformStatsSection from "../platform-shared/components/PlatformStatsSection";
import PlatformCapabilitiesSection from "../platform-shared/components/PlatformCapabilitiesSection";
import PlatformDownloadSection from "../platform-shared/components/PlatformDownloadSection";
import PlatformEdgeSection from "../platform-shared/components/PlatformEdgeSection";
import PlatformStepsSection from "../platform-shared/components/PlatformStepsSection";
import PlatformFaqSection from "../platform-shared/components/PlatformFaqSection";
import PlatformCtaSection from "../platform-shared/components/PlatformCtaSection";
import { MT4 } from "../platform-shared/platformData";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return getPageMetadata({
    locale,
    key: "mt4Platform",
    path: "trading/mt4-platform",
    fallbackTitle: "MetaTrader 4 | GTCFX Trading Platform",
    fallbackDescription:
      "Download MT4 with GTCFX. The world's most trusted trading platform with powerful charting, automated strategies, and lightning-fast execution.",
  });
}

export default async function MT4PlatformPage({ params }) {
  await params;

  return (
    <>
      <PlatformHeroSection data={MT4} />
      {/* <PlatformStatsSection data={MT4} /> */}
      <PlatformCapabilitiesSection data={MT4} />
      <PlatformDownloadSection data={MT4} />
      <PlatformEdgeSection data={MT4} />
      <PlatformStepsSection data={MT4} />
      <PlatformFaqSection data={MT4} />
      <PlatformCtaSection data={MT4} />
    </>
  );
}

import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import PlatFormAppHero from "../platform-shared/components/PlatFormAppHero";
import PlatformCapabilitiesSection from "../platform-shared/components/PlatformCapabilitiesSection";
import PlatformDownloadSection from "../platform-shared/components/PlatformDownloadSection";
import PlatformEdgeSection from "../platform-shared/components/PlatformEdgeSection";
import PlatformStepsSection from "../platform-shared/components/PlatformStepsSection";
import PlatformFaqSection from "../platform-shared/components/PlatformFaqSection";
import PlatformCtaSection from "../platform-shared/components/PlatformCtaSection";
import { MT4, MT_APP_IOS } from "../platform-shared/platformData";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return getPageMetadata({
    locale,
    key: "mtAppIos",
    path: "trading/metatrader-for-ipad",
    fallbackTitle: "MetaTrader for iPhone/iPad | GTCFX",
    fallbackDescription:
      "Trade on the go with GTCFX MetaTrader for iPhone and iPad. Real-time quotes, advanced charting, and seamless account access.",
  });
}

export default async function MetaTraderForIpadPage({ params }) {
  await params;

  return (
    <>
      <PlatFormAppHero data={MT_APP_IOS} />
      <PlatformCapabilitiesSection data={MT4} />
      <PlatformDownloadSection data={MT4} />
      <PlatformEdgeSection data={MT4} />
      <PlatformStepsSection data={MT4} />
      <PlatformFaqSection data={MT4} />
      <PlatformCtaSection data={MT4} />
    </>
  );
}

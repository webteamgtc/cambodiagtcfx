import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import { gtcGoData } from "./gtcGoData";
import GtcGoHeroSection from "./components/GtcGoHeroSection";
import GtcGoFeatureCards from "./components/GtcGoFeatureCards";
import GtcGoMultiDeviceSection from "./components/GtcGoMultiDeviceSection";
import GtcGoAppShowcase from "./components/GtcGoAppShowcase";
import GtcGoCategoriesSection from "./components/GtcGoCategoriesSection";
import GtcGoBottomCta from "./components/GtcGoBottomCta";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return getPageMetadata({
    locale,
    key: "gtcGoApp",
    path: "trading/gtc-go-app",
    fallbackTitle: "GTC Go — Trade. Anywhere. Anytime. | GTCFX",
    fallbackDescription:
      "Global markets in the palm of your hand. Download GTC Go for iOS and Android — 7+ trading markets, live quotes, and professional tools on mobile.",
  });
}

export default async function GtcGoAppPage({ params }) {
  await params;

  return (
    <div className="bg-white">
      <GtcGoHeroSection data={gtcGoData} />
      <GtcGoFeatureCards data={gtcGoData} />
      <GtcGoMultiDeviceSection data={gtcGoData} />
      <GtcGoAppShowcase data={gtcGoData} />

      <GtcGoBottomCta data={gtcGoData} />
    </div>
  );
}

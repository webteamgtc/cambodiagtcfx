import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import { gtcGoDataIpad } from "./gtcGoData";
import { gtcGoData } from "../gtc-go-app/gtcGoData";
import GtcGoHeroSection from "./components/GtcGoHeroSection";
import GtcGoFeatureCards from "../gtc-go-app/components/GtcGoFeatureCards";
import GtcGoMultiDeviceSection from "../gtc-go-app/components/GtcGoMultiDeviceSection";
import GtcGoAppShowcase from "../gtc-go-app/components/GtcGoAppShowcase";
import GtcGoCategoriesSection from "../gtc-go-app/components/GtcGoCategoriesSection";
import GtcGoBottomCta from "../gtc-go-app/components/GtcGoBottomCta";


export async function generateMetadata({ params }) {
  const { locale } = await params;
  return getPageMetadata({
    locale,
    key: "gtcGoApp",
    path: "trading/gtc-go-app-ipad",
    fallbackTitle: "GTC Go — Trade. Anywhere. Anytime. | GTCFX",
    fallbackDescription:
      "Global markets in the palm of your hand. Download GTC Go for iOS and Android — 7+ trading markets, live quotes, and professional tools on mobile.",
  });
}

export default async function GtcGoAppIpadPage({ params }) {
  await params;

  return (
    <div className="bg-white">
      <GtcGoHeroSection data={gtcGoDataIpad} />
      <GtcGoFeatureCards data={gtcGoData} />
      <GtcGoMultiDeviceSection data={gtcGoData} />
      <GtcGoAppShowcase data={gtcGoData} />

      <GtcGoBottomCta data={gtcGoData} />
    </div>
  );
}

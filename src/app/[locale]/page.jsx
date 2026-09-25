import { Suspense } from "react";
import FeaturesSection from "./components/common/home/FeaturesSection";
import Counter from "./components/common/home/Counter";
import MarketTabsSection from "./components/common/home/MarketTabsSection";
import TradingFeaturesSection from "./components/common/home/TradingFeaturesSection";
import AppPromoSection from "./components/common/home/AppPromoSection";
import BlogsSection from "./components/common/home/BlogsSection";
import SecurityBanner from "./components/common/home/SecurityBanner";
import AwardsMarquee from "./components/common/home/AwardsMarquee";
import RevealOnScroll from "./components/RevealOnScroll";
import CopyTradingSection from "./components/common/home/CopyTradingSection";
import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import HeroSection from "./components/common/home/HeroSection";
import TrustRatingsSection from "./components/common/home/TrustRatingsSection";
import ChooseTradingAccountSection from "./components/common/home/ChooseTradingAccountSection";
import HomeZigzagCopyPammSection from "./components/common/home/HomeZigzagCopyPammSection";
import HomeCenteredCtaBannerSection from "./components/common/home/HomeCenteredCtaBannerSection";
import HomeRegisterSection from "./components/common/home/HomeRegisterSection";
import TradingPlatformsStackSection from "./components/common/home/TradingPlatformsStackSection";
import MarketTicker from "./components/common/home/MarketTicker";
import MarketsCoverflow from "./components/common/home/MarketsCoverflow";
import TradingFaqSection from "./components/common/home/TradingFaqSection";
export async function generateMetadata({ params }) {
  const { locale } = await params;
  return getPageMetadata({
    locale,
    key: "home",
    path: "",
    fallbackTitle: "GTC FX",
    fallbackDescription: "Trading & Finance",
  });
}

export default async function HomePage({ params }) {
  const { locale } = await params;

  return (
    <>
      <HeroSection />
      <div className="md:hidden w-full overflow-x-hidden">
        <div className="mx-auto w-full max-w-full">
          <MarketTicker variant="floating" />
        </div>
      </div>

      <Suspense fallback={null}>
        <RevealOnScroll className="relative z-10">
          <FeaturesSection />
        </RevealOnScroll>
        <RevealOnScroll>
          <MarketsCoverflow />
        </RevealOnScroll> 
      </Suspense>

      <Suspense fallback={null}>
            <RevealOnScroll>
          <Counter />
        </RevealOnScroll>
        <TradingPlatformsStackSection />
      </Suspense>

      <Suspense fallback={null}>
        <RevealOnScroll>
          <TradingFaqSection />
        </RevealOnScroll>
        <RevealOnScroll>
          <HomeRegisterSection />
        </RevealOnScroll>
      </Suspense>
    </>
  );
}

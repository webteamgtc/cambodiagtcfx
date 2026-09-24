import AssetMarketHeroSection from "./AssetMarketHeroSection";
import AssetTrendingSection from "./AssetTrendingSection";
import AssetOverviewSection from "./AssetOverviewSection";
import AssetWhySection from "./AssetWhySection";
import AssetPromoBannerSection from "./AssetPromoBannerSection";
import AssetFaqSection from "./AssetFaqSection";
import AssetFinalCtaSection from "./AssetFinalCtaSection";
import MarketLiveQuotesSection from "./MarketLiveQuotesSection";
import { mergeAssetMarketQuotesData } from "../symbolMarketConfig";

export default function AssetMarketPage({ data, locale = "en" }) {
  const pageData = mergeAssetMarketQuotesData(data);

  return (
    <div className="relative overflow-hidden">


      <AssetMarketHeroSection data={pageData} locale={locale} />
    
      <MarketLiveQuotesSection data={pageData} />
      <div className=" relative">
        <div className="pointer-events-none  absolute inset-0 -z-10" aria-hidden
          style={{
            opacity: 0.7,
            background: "linear-gradient(180deg, rgba(248, 250, 255, 0.00) 0%, rgba(240, 244, 255, 0.64) 28.37%, rgba(235, 241, 254, 0.32) 75.96%, rgba(231, 238, 254, 0.00) 100%)",
          }}
        >

        </div>
        <AssetOverviewSection data={pageData} />
        <AssetWhySection data={pageData} />
      </div>
      <AssetPromoBannerSection data={pageData} />
      <AssetFaqSection data={pageData} />
      <AssetFinalCtaSection data={pageData} locale={locale} />
    </div>
  );
}

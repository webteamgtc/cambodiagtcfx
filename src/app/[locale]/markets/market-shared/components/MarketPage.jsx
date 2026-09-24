import MarketFinalCtaSection from "./MarketFinalCtaSection";
import MarketHeroSection from "./MarketHeroSection";
import MarketCategoryTabs from "./MarketCategoryTabs";
import MarketLiveQuotesSection from "./MarketLiveQuotesSection";
import MarketWhyTradeSection from "./MarketWhyTradeSection";
import MarketAwardsSection from "./MarketAwardsSection";
import MarketPopularSection from "./MarketPopularSection";
import MarketDownloadSection from "./MarketDownloadSection";

export default function MarketPage({ data, locale = "en" }) {
  return (
    <div className="relative overflow-hidden">


      <MarketHeroSection data={data} locale={locale} />
      {/* <MarketCategoryTabs items={data.highlights} i18nKey={data.i18nKey} /> */}
      <MarketLiveQuotesSection data={data} />
      <MarketWhyTradeSection data={data} />
      {/* <MarketAwardsSection data={data} locale={locale} /> */}
      <div className="relative">
        <div className="pointer-events-none  absolute inset-0 -z-10" aria-hidden
          style={{
            opacity: 0.7,
            background: "linear-gradient(180deg, rgba(248, 250, 255, 0.00) 0%, rgba(240, 244, 255, 0.64) 28.37%, rgba(235, 241, 254, 0.32) 75.96%, rgba(231, 238, 254, 0.00) 100%)"
          }}
        >

        </div>
        {/* <MarketPopularSection data={data} /> */}
        <MarketDownloadSection data={data} locale={locale} />
      </div>

      <MarketFinalCtaSection locale={locale} />
    </div>
  );
}

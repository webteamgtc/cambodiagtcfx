import { getDictionary } from "@/i18n/request";
import AssetSection from "./components/AssetSection";
import WhoServeSection from "./components/WhoServe";
import WhatWeOfferSection from "./components/WhatWeOffer";
import DirectAccessSection from "./components/DirectAccess";
import LiquditySection from "./components/LiquditySection";
import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import WhyGtcGroupGetStartedSection from "../../company/why-gtc-group/components/WhyGtcGroupGetStartedSection";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return getPageMetadata({
    locale,
    key: "liquidityTechnology",
    path: "knowledge-to-learn/liquidity-technology",
    fallbackTitle: "Liquidity & Technology - GTC FX",
    fallbackDescription: "Institutional liquidity and trading technology.",
  });
}

export default async function LiquidityTechnologyPage({ params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const copy = dict?.primeTech?.liquidityTechnologyPage || {};
  const directAccessCopy = dict?.primeTech?.directAccess || {};
  const assetData = [
    {
      name: copy?.Chooseliquidity?.option1?.title,
      description: copy?.Chooseliquidity?.option1?.desc,
      imageUrl: "https://gtcfx-bucket.s3.ap-southeast-1.amazonaws.com/img/home/icon/icon1.webp",
      alt: "Forex",
    },
    {
      name: copy?.Chooseliquidity?.option2?.title,
      description: copy?.Chooseliquidity?.option2?.desc,
      imageUrl: "https://gtcfx-bucket.s3.ap-southeast-1.amazonaws.com/img/home/icon/icon8.webp",
      alt: "Crypto CFDs",
    },
    {
      name: copy?.Chooseliquidity?.option3?.title,
      description: copy?.Chooseliquidity?.option3?.desc,
      imageUrl: "https://gtcfx-bucket.s3.ap-southeast-1.amazonaws.com/img/home/icon/icon6.webp",
      alt: "Indices",
    },
    {
      name: copy?.Chooseliquidity?.option4?.title,
      description: copy?.Chooseliquidity?.option4?.desc,
      imageUrl: "https://gtcfx-bucket.s3.ap-southeast-1.amazonaws.com/img/home/icon/icon3.webp",
      alt: "CFDs",
    },
    {
      name: copy?.Chooseliquidity?.option5?.title,
      description: copy?.Chooseliquidity?.option5?.desc,
      imageUrl: "https://gtcfx-bucket.s3.ap-southeast-1.amazonaws.com/img/home/icon/icon4.webp",
      alt: "Commodities",
    },
    {
      name: copy?.Chooseliquidity?.option6?.title,
      description: copy?.Chooseliquidity?.option6?.desc,
      imageUrl: "https://gtcfx-bucket.s3.ap-southeast-1.amazonaws.com/img/home/icon/icon5.webp",
      alt: "Indices",
    },
  ].filter((x) => x?.name);
  return (
    <div>
      <LiquditySection copy={copy} />
      <div className="relative">
        {/* <div className="pointer-events-none  absolute inset-0 -z-10" aria-hidden
          style={{
            opacity: 0.7,
            background: "linear-gradient(180deg, rgba(248, 250, 255, 0.00) 0%, rgba(240, 244, 255, 0.64) 28.37%, rgba(235, 241, 254, 0.32) 75.96%, rgba(231, 238, 254, 0.00) 100%)",
          }}
        >

        </div> */}
        <AssetSection
          assetData={assetData}
          title={copy?.Chooseliquidity?.title}
          eyebrow={copy?.Chooseliquidity?.eyebrow}
          subtitle={copy?.Chooseliquidity?.subtitle}
        />
        <WhoServeSection copy={copy} />
        <DirectAccessSection copy={directAccessCopy} />
      </div>

      <WhatWeOfferSection copy={copy} />
      <WhyGtcGroupGetStartedSection/>
    </div>
  );
}
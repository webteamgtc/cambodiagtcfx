import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import LeverageHeroSection from "./components/LeverageHeroSection";
import LeverageStatsSection from "./components/LeverageStatsSection";
import LeverageTickerSection from "./components/LeverageTickerSection";
import LeverageDetailsSection from "./components/LeverageDetailsSection";
import LeverageCalculatorSection from "./components/LeverageCalculatorSection";
import LeverageBasicsSection from "./components/LeverageBasicsSection";
import LeveragePolicySection from "./components/LeveragePolicySection";
import LeverageCtaSection from "./components/LeverageCtaSection";
import LeverageUpdate from "./components/LeverageUpdate";
import LeverageFaqs from "./components/LeverageFaqs";

export async function generateMetadata({ params }) {
  const { locale } = await params;

  return getPageMetadata({
    locale,
    key: "dynamicLeverage",
    path: "company/dynamic-leverage",
    fallbackTitle: "Dynamic Leverage - GTC FX",
    fallbackDescription:
      "Explore GTCFX dynamic leverage and margin conditions. Transparent trading requirements for Forex, Metals, Indices, Crypto, and Stocks.",
  });
}

export default async function DynamicLeveragePage({ params }) {
  await params;

  return (
    <>
      <LeverageHeroSection />

    
      <LeverageDetailsSection />
      <LeverageCalculatorSection />
      <LeverageBasicsSection />


      <LeverageUpdate/>
      <LeverageFaqs/>
  
      <LeverageCtaSection />
    </>
  );
}

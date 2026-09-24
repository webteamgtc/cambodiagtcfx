import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import SwapFreeTradingHeroSection from "./components/SwapFreeTradingHeroSection";
import SwapFreeTradingWhySection from "./components/SwapFreeTradingWhySection";
import SwapFreeTradingHowSection from "./components/SwapFreeTradingHowSection";
import SwapFreeTradingInstrumentsSection from "./components/SwapFreeTradingInstrumentsSection";
import SwapFreeTradingTermsFaqSection from "./components/SwapFreeTradingTermsFaqSection";
import Image from "next/image";

export async function generateMetadata({ params }) {
  const { locale } = await params;

  return getPageMetadata({
    locale,
    key: "swapFree",
    path: "trading/swap-free-trading",
    fallbackTitle: "Swap-Free Trading at GTCFX | Trade Without Swap Charges",
    fallbackDescription:
      "Trade without overnight swap charges on selected instruments at GTCFX. Interest-free conditions for eligible traders — transparent, fair, and compliant.",
  });
}

export default async function SwapFreeTradingPage({ params }) {
  const { locale } = await params;

  return (
    <div className="relative overflow-hidden bg-[#F8F9FC]">
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden
        style={{
          background: [
            "linear-gradient(180deg, rgba(231, 238, 254, 0) 0%, #F8FAFF 100%)",
            "linear-gradient(180deg, rgba(248, 250, 255, 0) 0%, #F0F4FF 28.37%, #EBF1FE 75.96%, rgba(231, 238, 254, 0) 100%)",
            "linear-gradient(180deg, #F8FAFF 0%, rgba(231, 238, 254, 0) 100%)",
          ].join(", "),
        }}
      />

      <SwapFreeTradingHeroSection locale={locale} />
      <SwapFreeTradingWhySection />
    
      <div className="relative">
        <div className="pointer-events-none  h-full absolute inset-0 opacity-35 overflow-hidden" aria-hidden>
          <Image
            src={"/new-design/about-us/bg.webp"}
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
        <SwapFreeTradingInstrumentsSection locale={locale} />
        <SwapFreeTradingTermsFaqSection />
      </div>
    </div>
  );
}

import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import WhyGtcGroupHeroSection from "./components/WhyGtcGroupHeroSection";
import WhyGtcGroupMissionSection from "./components/WhyGtcGroupMissionSection";
import WhyGtcGroupCommitmentsSection from "./components/WhyGtcGroupCommitmentsSection";
import WhyGtcGroupBackgroundSection from "./components/WhyGtcGroupBackgroundSection";
import WhyGtcGroupEdgeSection from "./components/WhyGtcGroupEdgeSection";
import WhyGtcGroupRecognitionSection from "./components/WhyGtcGroupRecognitionSection";
import WhyGtcGroupClientVoicesSection from "./components/WhyGtcGroupClientVoicesSection";
import WhyGtcGroupTrustRecognitionSection from "./components/WhyGtcGroupTrustRecognitionSection";
import WhyGtcGroupGetStartedSection from "./components/WhyGtcGroupGetStartedSection";
import Image from "next/image";


export async function generateMetadata({ params }) {
  const { locale } = await params;

  return getPageMetadata({
    locale,
    key: "whyGtcGroup",
    path: "company/why-gtc-group",
    fallbackTitle: "Why Choose GTCFX | Forex & CFD Trading Platform Benefits",
    fallbackDescription:
      "Discover why traders choose GTCFX. Trade Forex and CFDs with tight spreads, fast execution, advanced platforms like MT4 & MT5, and reliable global support.",
  });
}

export default async function WhyGtcGroupPage() {
  return (
    <>
      <WhyGtcGroupHeroSection />
      <WhyGtcGroupMissionSection />
      <WhyGtcGroupCommitmentsSection />
      <WhyGtcGroupBackgroundSection />
      <div className="relative">

        <div className="pointer-events-none  h-[90%] absolute inset-0 -z-10 overflow-hidden" aria-hidden>
          <Image
            src={"/new-design/about-us/bg-why-gtc.webp"}
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
        <WhyGtcGroupRecognitionSection />

        <WhyGtcGroupEdgeSection />
        <WhyGtcGroupClientVoicesSection />
        {/* <WhyGtcGroupTrustRecognitionSection /> */}
      </div>
      <WhyGtcGroupGetStartedSection />
    </>
  );
}

import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import Image from "next/image";
import FreeDemoAccountHeroSection from "./components/FreeDemoAccountHeroSection";
import FreeDemoAccountFeaturesSection from "./components/FreeDemoAccountFeaturesSection";
import FreeDemoAccountStepsSection from "./components/FreeDemoAccountStepsSection";
import FreeDemoAccountPlatformsSection from "./components/FreeDemoAccountPlatformsSection";
import FreeDemoAccountTipsSection from "./components/FreeDemoAccountTipsSection";
import FreeDemoAccountFaqSection from "./components/FreeDemoAccountFaqSection";
import FreeDemoAccountConversionSection from "./components/FreeDemoAccountConversionSection";
import FreeDemoAccountFinalCtaSection from "./components/FreeDemoAccountFinalCtaSection";

const HERO_BG_SRC = "/new-design/about-us/bg.webp";

export async function generateMetadata({ params }) {
  const { locale } = await params;

  return getPageMetadata({
    locale,
    key: "freeDemoAccount",
    path: "trading/free-demo-account",
    fallbackTitle: "Free Demo Account | GTCFX Trading",
    fallbackDescription:
      "Start trading risk-free with a GTCFX demo account. Practice with virtual funds on MT4, MT5, and GTC Go in real market conditions.",
  });
}

export default async function FreeDemoAccountPage({ params }) {
  const { locale } = await params;

  return (
    <>


      <FreeDemoAccountHeroSection />

      <FreeDemoAccountFeaturesSection />
      <FreeDemoAccountStepsSection />
      <div className="relative">
        <div
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
          aria-hidden
          style={{
            background: [
              "linear-gradient(180deg, rgba(231, 238, 254, 0) 0%, #F8FAFF 100%)",
              "linear-gradient(180deg, rgba(248, 250, 255, 0) 0%, rgba(240, 244, 255, 0.8) 28.37%, rgba(235, 241, 254, 0.397) 75.96%, rgba(231, 238, 254, 0) 100%)",
              "linear-gradient(180deg, #F8FAFF 0%, rgba(231, 238, 254, 0) 100%)",
            ].join(", "),
          }}
        />

      
        <FreeDemoAccountTipsSection locale={locale} />
        <FreeDemoAccountFaqSection />
      </div>
      

      <FreeDemoAccountConversionSection locale={locale} />
      {/* <FreeDemoAccountFinalCtaSection /> */}
    </>
  );
}

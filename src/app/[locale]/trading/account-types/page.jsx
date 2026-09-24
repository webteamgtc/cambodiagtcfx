import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import Image from "next/image";
import AccountTypesHeroSection from "./components/AccountTypesHeroSection";
import AccountTypesComparisonSection from "./components/AccountTypesComparisonSection";
import AccountTypesTierDetailSection from "./components/AccountTypesTierDetailSection";
import AccountTypesPlatformsSection from "./components/AccountTypesPlatformsSection";
import AccountTypesStepsSection from "./components/AccountTypesStepsSection";
import AccountTypesFaqSection from "./components/AccountTypesFaqSection";
import AccountTypesCtaSection from "./components/AccountTypesCtaSection";
import WhyGtcGroupGetStartedSection from "../../company/why-gtc-group/components/WhyGtcGroupGetStartedSection";

const HERO_BG_SRC = "/new-design/about-us/bg.webp";


export async function generateMetadata({ params }) {
  const { locale } = await params;

  return getPageMetadata({
    locale,
    key: "accountTypes",
    path: "trading/account-types",
    fallbackTitle: "Account Types | GTCFX Trading",
    fallbackDescription:
      "Compare GTCFX Standard, ECN, and Pro accounts. Find the trading account that fits your style with competitive spreads and leverage.",
  });
}

export default async function AccountTypesPage({ params }) {
  const { locale } = await params;

  return (
    <>
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

        <AccountTypesHeroSection locale={locale} />


        <AccountTypesComparisonSection />
        <div className="h-[1px] bg-[#E1E7F6] max-w-6xl mx-auto"></div>
        <AccountTypesTierDetailSection />
        <AccountTypesPlatformsSection locale={locale} />
        <AccountTypesStepsSection />
   
      </div>
      <WhyGtcGroupGetStartedSection/>
    </>
  );
}

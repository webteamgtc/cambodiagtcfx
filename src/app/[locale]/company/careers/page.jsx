import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import { SHOW_CAREERS } from "@/config/featureFlags";
import { notFound } from "next/navigation";
import CareerHeroSection from "./components/CareerHeroSection";
import CareerManifestoSection from "./components/CareerManifestoSection";
import CareerTeamsSection from "./components/CareerTeamsSection";
import CareerOpenPositionsSection from "./components/CareerOpenPositionsSection";
import CareerHowWeHireSection from "./components/CareerHowWeHireSection";
import CareerEmployeeStoriesSection from "./components/CareerEmployeeStoriesSection";
import CareerCtaSection from "./components/CareerCtaSection";
import WhyGtcGroupBackgroundSection from "../why-gtc-group/components/WhyGtcGroupBackgroundSection";
import WhyGtcGroupCommitmentsSection, {
  CAREER_CORE_VALUES,
} from "../why-gtc-group/components/WhyGtcGroupCommitmentsSection";

export async function generateMetadata({ params }) {
  const { locale } = await params;

  return getPageMetadata({
    locale,
    key: "career",
    path: "company/careers",
    fallbackTitle: "Careers at GTCFX | Jobs in a Global Trading Company",
    fallbackDescription:
      "Explore career opportunities at GTCFX. Join a global trading company and grow your career in fintech, trading, and financial markets.",
  });
}

export default function CareerPage() {
  if (!SHOW_CAREERS) {
    notFound();
  }

  return (
    <>
      <CareerHeroSection />
      <CareerManifestoSection />
      <WhyGtcGroupCommitmentsSection
        translationNamespace="careerPage.coreValuesSection"
        items={CAREER_CORE_VALUES}
        descriptionClassName="Text mx-auto mt-5 max-w-3xl font-normal leading-[1.7] text-[#000032]/60 md:mt-6"
      />
      <WhyGtcGroupBackgroundSection
        translationNamespace="careerPage.lifeAtGtcSection"
        variant="lifeAtGtc"
        badgeValueKey="badgeTitle"
        badgeLabelKey="badgeSubtitle"
        imageSrc="/new-design/about-us/burj-arab.webp"
      />
      <CareerTeamsSection />
      <div className="relative"

      >
        <div className="pointer-events-none  h-[90%] absolute inset-0 -z-10 overflow-hidden" aria-hidden
          style={{
            opacity: 0.7,
            background: 'linear-gradient(180deg, rgba(248, 250, 255, 0.00) 0%, rgba(240, 244, 255, 0.90) 28.37%, rgba(235, 241, 254, 0.45) 75.96%, rgba(231, 238, 254, 0.00) 100%)',
          }}
        >
        </div>

        <CareerOpenPositionsSection />

        <CareerHowWeHireSection />
      </div>
      <CareerEmployeeStoriesSection />
      <CareerCtaSection />
    </>
  );
}

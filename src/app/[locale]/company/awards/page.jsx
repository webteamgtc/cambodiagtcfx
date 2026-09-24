import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import AwardsByTheNumbersSection from "./components/AwardsByTheNumbersSection";
import AwardsHeroSection from "./components/AwardsHeroSection";
import AwardsGetStartedSection from "./components/AwardsGetStartedSection";
import AwardsRegionalAwardsSection from "./components/AwardsRegionalAwardsSection";

export async function generateMetadata({ params }) {
  const { locale } = await params;

  return getPageMetadata({
    locale,
    key: "awards",
    path: "company/awards",
    fallbackTitle: "Award-Winning Forex & CFD Broker | GTCFX Global Recognition",
    fallbackDescription:
      "Explore GTCFX awards and global recognition across leading financial expos. Trade Forex and CFDs with an award-winning broker trusted worldwide.",
  });
}

export default function AwardsPage() {
  return (
    <div className="relative">
        <div className="pointer-events-none  h-[90%] absolute inset-0 -z-10 overflow-hidden" aria-hidden
                    style={{
                        opacity: 0.7,
                        background: 'linear-gradient(180deg, rgba(248, 250, 255, 0.00) 0%, rgba(240, 244, 255, 0.90) 28.37%, rgba(235, 241, 254, 0.45) 75.96%, rgba(231, 238, 254, 0.00) 100%)',
                    }}
                >
                </div>
      <AwardsHeroSection />
      <AwardsRegionalAwardsSection />
      <AwardsGetStartedSection />
    </div>
  );
}

import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import GlobalPresenceHeroSection from "./components/GlobalPresenceHeroSection";
import GlobalPresenceRegulatedEntitiesSection from "./components/GlobalPresenceRegulatedEntitiesSection";
import GlobalPresenceWhereWeServeSection from "./components/GlobalPresenceWhereWeServeSection";
import GlobalPresenceLocalAdvantageSection from "./components/GlobalPresenceLocalAdvantageSection";
import GlobalPresencePhilosophySection from "./components/GlobalPresencePhilosophySection";
import GlobalPresenceGetStartedSection from "./components/GlobalPresenceGetStartedSection";
import Image from "next/image";
import WhyGtcGroupGetStartedSection from "../why-gtc-group/components/WhyGtcGroupGetStartedSection";

export async function generateMetadata({ params }) {
    const { locale } = await params;

    return getPageMetadata({
        locale,
        key: "globalPresence",
        path: "company/global-presence",
        fallbackTitle: "Global Presence | GTCFX Forex & CFD Trading Platform Worldwide",
        fallbackDescription:
            "Explore GTCFX's global presence across 20+ locations. Trade Forex and CFDs with a broker serving clients in 100+ countries worldwide.",
    });
}

export default async function GlobalPresencePage() {
    return (
        <>
            <div className="relative"
                style={{
                    background: 'linear-gradient(180deg, #F8FAFF 0%, rgba(231, 238, 254, 0.00) 100%)',
                }}
            >
                <div className="pointer-events-none  h-[90%] absolute inset-0 -z-10 overflow-hidden" aria-hidden
                    style={{
                        background: 'linear-gradient(180deg, #F8FAFF 0%, rgba(231, 238, 254, 0.00) 100%)',
                    }}
                >
                </div>

                <GlobalPresenceHeroSection />
                <GlobalPresenceRegulatedEntitiesSection />
            </div>

            {/* <GlobalPresenceWhereWeServeSection /> */}
            <GlobalPresenceLocalAdvantageSection />
            <GlobalPresencePhilosophySection />
            <WhyGtcGroupGetStartedSection />
        </>
    );
}

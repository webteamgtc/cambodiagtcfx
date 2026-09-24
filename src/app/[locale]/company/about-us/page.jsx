import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import SupportCtaSection from "@/app/[locale]/components/common/SupportCtaSection";
import AboutUsHeroSection from "./components/AboutUsHeroSection";
import AboutUsStrengthSection from "./components/AboutUsStrengthSection";
import AboutUsBrandStorySection from "./components/AboutUsBrandStorySection";
import AboutUsWhyChooseSection from "./components/AboutUsWhyChooseSection";
import AboutUsExploreSection from "./components/AboutUsExploreSection";
import AboutUsRecognitionSection from "./components/AboutUsRecognitionSection";
import AboutUsRegulationMissionSection from "./components/AboutUsRegulationMissionSection";
import AboutUsGetStartedSection from "./components/AboutUsGetStartedSection";
import Image from "next/image";

const HERO_BG_SRC = "/new-design/about-us/bg.webp";


export async function generateMetadata({ params }) {
    const { locale } = await params;

    return getPageMetadata({
        locale,
        key: "aboutUs",
        path: "company/about-us",
        fallbackTitle: "About GTCFX | Global Trading Company & Trusted Broker",
        fallbackDescription:
            "Learn about GTCFX, a global Forex and CFD trading platform serving 985,000+ clients across 100+ countries.",
    });
}

export default async function AboutUsPage({ params }) {
    const { locale } = await params;

    return (
        <>
            <div className="relative">
                <div className="pointer-events-none  h-[90%] absolute inset-0 -z-10 overflow-hidden" aria-hidden>
                    <Image
                        src={HERO_BG_SRC}
                        alt=""
                        fill
                        priority
                        className="object-cover object-center"
                        sizes="100vw"
                    />
                </div>
                <AboutUsHeroSection locale={locale} />
                <AboutUsStrengthSection />
                <div className="bg-[#E1E7F6] h-[1px] w-full"></div>
            </div>
            <div className="relative">
                <div className="pointer-events-none  absolute inset-0 -z-10" aria-hidden
                    style={{
                        opacity: 0.7,
                        background: "linear-gradient(180deg, rgba(248, 250, 255, 0.00) 0%, rgba(240, 244, 255, 0.64) 28.37%, rgba(235, 241, 254, 0.32) 75.96%, rgba(231, 238, 254, 0.00) 100%)",
                    }}
                >

                </div>
                
                <AboutUsBrandStorySection />
                <div className="bg-[#E1E7F6] h-[1px] w-full"></div>

                <AboutUsWhyChooseSection />
                <AboutUsExploreSection />
                <AboutUsRecognitionSection />

            </div>
            <AboutUsRegulationMissionSection />
            <AboutUsGetStartedSection />
        </>
    );
}

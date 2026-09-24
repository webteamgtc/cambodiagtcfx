import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import Image from "next/image";
import OpenLiveAccountHeroSection from "./components/OpenLiveAccountHeroSection";
import OpenLiveAccountRegulationSection from "./components/OpenLiveAccountRegulationSection";
import OpenLiveAccountTypesSection from "./components/OpenLiveAccountTypesSection";
import OpenLiveAccountStepsSection from "./components/OpenLiveAccountStepsSection";
import OpenLiveAccountPlatformsSection from "./components/OpenLiveAccountPlatformsSection";
import OpenLiveAccountFeaturesGridSection from "./components/OpenLiveAccountFeaturesGridSection";
import OpenLiveAccountFeaturesListSection from "./components/OpenLiveAccountFeaturesListSection";
import OpenLiveAccountPaymentsSection from "./components/OpenLiveAccountPaymentsSection";
import OpenLiveAccountCtaSection from "./components/OpenLiveAccountCtaSection";

const HERO_BG_SRC = "/new-design/about-us/bg.webp";

export async function generateMetadata({ params }) {
    const { locale } = await params;

    return getPageMetadata({
        locale,
        key: "openLiveAccount",
        path: "trading/open-live-account",
        fallbackTitle: "Open Live Account | GTCFX Trading",
        fallbackDescription:
            "Open your GTCFX live trading account in minutes. Choose your account type, verify, fund, and start trading forex, indices, metals, and more.",
    });
}

export default async function OpenLiveAccountPage({ params }) {
    const { locale } = await params;

    return (
        <>
            <OpenLiveAccountHeroSection locale={locale} />
            <OpenLiveAccountRegulationSection />
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
                <OpenLiveAccountTypesSection locale={locale} />
                <OpenLiveAccountStepsSection />
            </div>
            <div className="relative">
                <div className="pointer-events-none  absolute inset-0 -z-10" aria-hidden
                    style={{
                        opacity: 0.7,
                        background: "linear-gradient(180deg, rgba(248, 250, 255, 0.00) 0%, rgba(240, 244, 255, 0.64) 28.37%, rgba(235, 241, 254, 0.32) 75.96%, rgba(231, 238, 254, 0.00) 100%)",
                    }}
                >

                </div>
                <OpenLiveAccountPlatformsSection locale={locale} />
                <OpenLiveAccountFeaturesGridSection />
                <OpenLiveAccountFeaturesListSection locale={locale} />
            </div>
            {/* <OpenLiveAccountPaymentsSection /> */}
            <OpenLiveAccountCtaSection locale={locale} />
        </>
    );
}

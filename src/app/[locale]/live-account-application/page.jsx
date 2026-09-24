import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import LiveAccountApplicationHeroSection from "./components/LiveAccountApplicationHeroSection";
import LiveAccountApplicationForm from "./components/LiveAccountApplicationForm";
import LiveAccountApplicationContactBar from "./components/LiveAccountApplicationContactBar";
import { Suspense } from "react";

export async function generateMetadata({ params }) {
    const { locale } = await params;

    return getPageMetadata({
        locale,
        key: "liveAccountApplication",
        path: "live-account-application",
        fallbackTitle: "Live Account Application | GTCFX",
        fallbackDescription:
            "Apply for a GTCFX live trading account. Complete the secure application form to start trading forex, indices, metals, and more.",
    });
}

export default async function LiveAccountApplicationPage({ searchParams }) {
    const resolvedParams = await searchParams;
    const accountKey = resolvedParams?.account || "standard-account";

    return (
        <div className="relative">
            <div className="pointer-events-none  absolute inset-0 -z-10" aria-hidden
                style={{
                    opacity: 0.7,
                    background: "linear-gradient(180deg, rgba(248, 250, 255, 0.00) 0%, rgba(240, 244, 255, 0.64) 28.37%, rgba(235, 241, 254, 0.32) 75.96%, rgba(231, 238, 254, 0.00) 100%)",
                }}
            >

            </div>
            <LiveAccountApplicationHeroSection accountKey={accountKey} />

            <section className="pb-14 md:pb-16">
                <div className="container">
                    <div className="mx-auto max-w-4xl pt-14">
                        <Suspense fallback={<div>Loading...</div>}>
                            <LiveAccountApplicationForm accountKey={accountKey} />
                        </Suspense>

                        <LiveAccountApplicationContactBar />
                    </div>
                </div>
            </section>
        </div>
    );
}

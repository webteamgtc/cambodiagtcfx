import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import { fetchMappedEventsArchive, fetchMappedFutureEvents } from "@/lib/strapiEvents";
import EventsExhibitionsHeroSection from "./components/EventsExhibitionsHeroSection";
import EventsExhibitionsVisualArchiveSection from "./components/EventsExhibitionsVisualArchiveSection";
import EventsExhibitionsPhilosophySection from "./components/EventsExhibitionsPhilosophySection";
import EventsExhibitionsWhatsNextSection from "./components/EventsExhibitionsWhatsNextSection";
import EventsExhibitionsStayConnectedSection from "./components/EventsExhibitionsStayConnectedSection";
import EventAndExhibitionGallery from "./components/EventAndExhibitionGallery";
import EventsExhibitionsMediaResourcesSection from "./components/EventsExhibitionsMediaResourcesSection";
export async function generateMetadata({ params }) {
    const { locale } = await params;

    return getPageMetadata({
        locale,
        key: "events",
        path: "company/events-and-exhibitions",
        fallbackTitle: "Forex Events & Trading Exhibitions | GTCFX Global Events",
        fallbackDescription:
            "Discover upcoming Forex events and trading exhibitions. Meet GTCFX worldwide and explore our latest products and services.",
    });
}

export default async function EventsAndExhibitionsPage({ params }) {
    const { locale } = await params;
    const [archiveEvents, futureEvents] = await Promise.all([
        fetchMappedEventsArchive(locale, { revalidate: 300 }),
        fetchMappedFutureEvents(locale, { revalidate: 300 }),
    ]);

    return (
        <>
            <div className="relative"

            >
                <div className="pointer-events-none  h-[90%] absolute inset-0 -z-10 overflow-hidden" aria-hidden
                    style={{
                        opacity: 0.7,
                        background: 'linear-gradient(180deg, rgba(248, 250, 255, 0.00) 0%, rgba(240, 244, 255, 0.90) 28.37%, rgba(235, 241, 254, 0.45) 75.96%, rgba(231, 238, 254, 0.00) 100%)',
                    }}
                >
                </div>
                <EventsExhibitionsHeroSection events={futureEvents} />
                {/* <EventsExhibitionsWhatsNextSection /> */}
                <EventsExhibitionsVisualArchiveSection events={archiveEvents} />            </div>
            <div className="h-[1px] mt-12 bg-[#E1E7F6] max-w-6xl mx-auto">

            </div>
            <EventsExhibitionsPhilosophySection />
          
        <EventsExhibitionsMediaResourcesSection />
            {/* <EventsExhibitionsStayConnectedSection /> */}
           
        </>
    );
}

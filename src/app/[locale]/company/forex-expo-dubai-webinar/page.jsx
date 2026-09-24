import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import WebinarHeroSection from "./components/WebinarHeroSection";
import WebinarRegisterSection from "./components/WebinarRegisterSection";
import WebinarSpeakerSection from "./components/WebinarSpeakerSection";
import WebinarTopicsSection from "./components/WebinarTopicsSection";
import WebinarJoinSection from "./components/WebinarJoinSection";

export async function generateMetadata({ params }) {
  const { locale } = await params;

  return getPageMetadata({
    locale,
    key: "forexExpoDubaiWebinar",
    path: "company/forex-expo-dubai-webinar",
    fallbackTitle: "Forex Expo Dubai Webinar | GTCFX Online Session with Jameel Ahmad",
    fallbackDescription:
      "Register for the GTCFX Forex Expo Dubai webinar on 18 August, 7:00–8:00 PM. Join Jameel Ahmad live online via Zoom for market insight and Q&A.",
  });
}

export default function ForexExpoDubaiWebinarPage() {
  return (
    <>
      <div className="relative">
        <div
          className="pointer-events-none absolute inset-0 -z-10 h-[90%] overflow-hidden"
          aria-hidden
          style={{
            opacity: 0.7,
            background:
              "linear-gradient(180deg, rgba(248, 250, 255, 0.00) 0%, rgba(240, 244, 255, 0.90) 28.37%, rgba(235, 241, 254, 0.45) 75.96%, rgba(231, 238, 254, 0.00) 100%)",
          }}
        />
        <WebinarHeroSection />
        <WebinarRegisterSection />
        <WebinarSpeakerSection />
      </div>

      <div className="mx-auto mt-12 h-px max-w-6xl bg-[#E1E7F6]" />

      <WebinarTopicsSection />
      <WebinarJoinSection />
    </>
  );
}

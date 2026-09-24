import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import PlatformHeroSection from "./components/PlatformHeroSection";
import PlatformContentSection from "./components/PlatformContentSection";
import PlatformCtaSection from "./components/PlatformCtaSection";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return getPageMetadata({
    locale,
    key: "knowledge-to-learn/platform-guide",
    path: "knowledge-to-learn/platform-guide",
    fallbackTitle: "GTCFX Platform Guides - GTC FX",
    fallbackDescription:
      "Get the most from your GTCFX account, and discover everything you need to know about our platform's tools and features.",
  });
}

export default async function PlatformGuidePage({ params }) {
  const { locale } = await params;

  return (
    <>
      <PlatformHeroSection locale={locale} />
      <PlatformContentSection locale={locale} />
      <PlatformCtaSection locale={locale} />
    </>
  );
}

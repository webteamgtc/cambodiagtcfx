import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import LiveAccountApplicationComingSoon from "./components/LiveAccountApplicationComingSoon";

export async function generateMetadata({ params }) {
  const { locale } = await params;

  return getPageMetadata({
    locale,
    key: "liveAccountApplication",
    path: "live-account-application",
    fallbackTitle: "Live Account Application — Coming Soon | GTCFX",
    fallbackDescription:
      "Live account onboarding for GTCFX Cambodia is coming soon. Try a free demo or contact our team in the meantime.",
  });
}

export default function LiveAccountApplicationPage() {
  return <LiveAccountApplicationComingSoon />;
}

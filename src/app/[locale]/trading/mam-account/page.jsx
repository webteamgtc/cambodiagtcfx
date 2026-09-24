import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import { MAM } from "../pamm-mam-shared/pammMamData";
import PammMamHeroSection from "../pamm-mam-shared/components/PammMamHeroSection";
import PammMamStatsSection from "../pamm-mam-shared/components/PammMamStatsSection";
import PammMamExplainerSection from "../pamm-mam-shared/components/PammMamExplainerSection";
import PammMamLeaderboardSection from "../pamm-mam-shared/components/PammMamLeaderboardSection";
import PammMamStepsSection from "../pamm-mam-shared/components/PammMamStepsSection";
import PammMamFaqSection from "../pamm-mam-shared/components/PammMamFaqSection";
import PammMamCtaSection from "../pamm-mam-shared/components/PammMamCtaSection";

export async function generateMetadata({ params }) {
  const { locale } = await params;

  return getPageMetadata({
    locale,
    key: "mamAccount",
    path: "trading/mam-account",
    fallbackTitle: "MAM Account — Multi-Account Manager | GTCFX",
    fallbackDescription:
      "GTCFX MAM gives professional fund managers lot-based control over hundreds of sub-accounts simultaneously on MT4 and MT5.",
  });
}

export default async function MamAccountPage({ params }) {
  await params;
  return (
    <>
      <PammMamHeroSection data={MAM} />
      <PammMamStatsSection data={MAM} />
      <PammMamExplainerSection data={MAM} />
      <PammMamLeaderboardSection data={MAM} />
      <PammMamStepsSection data={MAM} />
      <PammMamFaqSection data={MAM} />
      <PammMamCtaSection data={MAM} />
    </>
  );
}

import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import { PAMM } from "../pamm-mam-shared/pammMamData";
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
    key: "pammAccount",
    path: "trading/pamm-account",
    fallbackTitle: "PAMM Account — Managed Fund Trading | GTCFX",
    fallbackDescription:
      "Join GTCFX PAMM — institutional-grade percentage allocation management. Apply as a fund manager or invest with verified top-performing traders.",
  });
}

export default async function PammAccountPage({ params }) {
  await params;
  return (
    <>
      <PammMamHeroSection data={PAMM} />
      {/* <PammMamStatsSection data={PAMM} /> */}
      <PammMamExplainerSection data={PAMM} />
      <PammMamLeaderboardSection data={PAMM} />
      <PammMamStepsSection data={PAMM} />
      <PammMamFaqSection data={PAMM} />
      <PammMamCtaSection data={PAMM} />
    </>
  );
}

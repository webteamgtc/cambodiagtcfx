"use client";

import MobilePeekCarousel from "@/app/[locale]/components/common/MobilePeekCarousel";
import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import { usePathTranslation } from "../../../LocaleProvider";
import FadeInSection from "@/app/[locale]/company/dynamic-leverage/components/FadeInSection";

const TEAMS = [
  {
    key: "trading",
    emoji: "📈",
    openRoles: 12,
    title: "Trading",
    description:
      "Multi-asset execution, prop trading, and market-making across equity, FX, and derivatives markets.",
    titleKey: "teams.trading.title",
    descriptionKey: "teams.trading.description",
    rolesKey: "teams.trading.roles",
  },
  {
    key: "technology",
    emoji: "⚙️",
    openRoles: 18,
    title: "Technology",
    description:
      "Low-latency infrastructure, trading systems, data engineering, and platform development.",
    titleKey: "teams.technology.title",
    descriptionKey: "teams.technology.description",
    rolesKey: "teams.technology.roles",
  },
  {
    key: "compliance",
    emoji: "⚖️",
    openRoles: 5,
    title: "Compliance",
    description:
      "Regulatory affairs, AML, KYC, and legal frameworks supporting our global licensing footprint.",
    titleKey: "teams.compliance.title",
    descriptionKey: "teams.compliance.description",
    rolesKey: "teams.compliance.roles",
  },
  {
    key: "sales",
    emoji: "🪙",
    openRoles: 9,
    title: "Sales",
    description:
      "Institutional and retail client acquisition, relationship management, and business development.",
    titleKey: "teams.sales.title",
    descriptionKey: "teams.sales.description",
    rolesKey: "teams.sales.roles",
  },
  {
    key: "operations",
    emoji: "🔧",
    openRoles: 8,
    title: "Operations",
    description:
      "Settlement, reconciliation, back-office efficiency, and operational risk management.",
    titleKey: "teams.operations.title",
    descriptionKey: "teams.operations.description",
    rolesKey: "teams.operations.roles",
  },
  {
    key: "marketing",
    emoji: "📣",
    openRoles: 7,
    title: "Marketing",
    description:
      "Brand strategy, digital acquisition, content, and campaign management across global markets.",
    titleKey: "teams.marketing.title",
    descriptionKey: "teams.marketing.description",
    rolesKey: "teams.marketing.roles",
  },
  {
    key: "finance",
    emoji: "💼",
    openRoles: 4,
    title: "Finance",
    description:
      "FP&A, treasury, financial reporting, and investor relations across multiple regulatory jurisdictions.",
    titleKey: "teams.finance.title",
    descriptionKey: "teams.finance.description",
    rolesKey: "teams.finance.roles",
  },
  {
    key: "risk",
    emoji: "🛡️",
    openRoles: 5,
    title: "Risk Management",
    description:
      "Market risk, credit risk, stress testing, and model validation to protect and position GTC.",
    titleKey: "teams.risk.title",
    descriptionKey: "teams.risk.description",
    rolesKey: "teams.risk.roles",
  },
];

function TeamCard({ team, t }) {
  return (
    <article className="interactive-card flex h-full min-w-0 flex-col rounded-[22px] border border-[#E1E7F6] bg-white p-5 text-left sm:p-6">
      <span
        className="flex h-11 w-11 items-center justify-center rounded-[10px] border border-[#E1E7F6] bg-[#F8F9FC] text-xl"
        aria-hidden
      >
        {team.emoji}
      </span>

      <h3 className="HeadingH5 mt-7 font-semibold text-[#000]">
        {t(team.titleKey, team.title)}
      </h3>

      <p className="text-xs mt-4 flex-1 font-normal leading-[1.65] text-[#666]">
        {t(team.descriptionKey, team.description)}
      </p>

      <span className="mt-4 inline-flex w-fit rounded-full bg-[#E1E7F6] px-3 py-1 text-xs font-normal text-[#293B93]">
        {t(team.rolesKey, `${team.openRoles} Open Roles`)}
      </span>
    </article>
  );
}

export default function CareerTeamsSection() {
  const t = usePathTranslation("careerPage.teamsSection");

  return (
    <section id="openings" className="bg-[#F8F9FC] py-8 md:py-16">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl text-center">
          <FadeInSection> 
          <SectionEyebrow variant="compact" className="capitalize tracking-[0.3em]">
            {t("eyebrow", "Explore Teams")}
          </SectionEyebrow>

          <h2 className="HeadingH1 mx-auto mt-4 max-w-3xl font-semibold text-[#000]">
            {t("titleBefore", "Teams You Can")}{" "}
            <span className="text-[#293B93]">{t("titleAccent", "Join")}</span>
          </h2>

          <p className="Text mx-auto mt-5 max-w-2xl font-normal leading-[1.7] text-[#000032]/60 md:mt-6">
            {t(
              "description",
              "Four things that make GTC Group a place worth investing your career in."
            )}
          </p>
          </FadeInSection>
          <div className="mt-12 text-left sm:hidden md:mt-14">
            <MobilePeekCarousel
              items={TEAMS}
              showArrows
              className="w-full min-w-0"
              trackClassName="-mx-4 px-4 min-w-0"
              slideClassName="!h-auto"
              renderItem={(team) => (
                <div className="w-full min-w-0 max-w-full px-1">
                  <TeamCard team={team} t={t} />
                </div>
              )}
            />
          </div>

          <div className="mt-8 hidden grid-cols-1 gap-5 text-left sm:grid sm:grid-cols-2 sm:gap-6 md:mt-10 lg:grid-cols-4">
            {TEAMS.map((team, index) => (
              <FadeInSection key={team.key} delay={index * 0.1}>
                <TeamCard key={team.key} team={team} t={t} />
              </FadeInSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

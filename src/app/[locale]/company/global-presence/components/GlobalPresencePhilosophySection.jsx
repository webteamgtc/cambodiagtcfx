"use client";

import MobilePeekCarousel from "@/app/[locale]/components/common/MobilePeekCarousel";
import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import { usePathTranslation } from "../../../LocaleProvider";

const PHILOSOPHY_CARDS = [
  {
    key: "licenceFirst",
    titleKey: "cards.licenceFirst.title",
    descriptionKey: "cards.licenceFirst.description",
    title: "Licence First, Always",
    description:
      "Every market we enter requires local regulatory approval before we onboard a single client.",
    icon: BuildingIcon,
  },
  {
    key: "transparentOps",
    titleKey: "cards.transparentOps.title",
    descriptionKey: "cards.transparentOps.description",
    title: "Transparent Operations",
    description:
      "All entity details, licence numbers, and regulatory status are publicly verifiable on each authority's official register.",
    icon: SearchIcon,
  },
  {
    key: "clientProtection",
    titleKey: "cards.clientProtection.title",
    descriptionKey: "cards.clientProtection.description",
    title: "Layered Client Protection",
    description:
      "Regulatory oversight plus independent Financial Commission membership provides dual-layer accountability for every client.",
    icon: ShieldCheckIcon,
  },
];

function BuildingIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 10H20" stroke="#293B93" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7 10V18M11 10V18M15 10V18M19 10V18" stroke="#293B93" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3 18H21" stroke="#293B93" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 4L19 10H5L12 4Z" stroke="#293B93" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function SearchIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="6.5" stroke="#293B93" strokeWidth="1.5" />
      <path d="M16 16L20 20" stroke="#293B93" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ShieldCheckIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3.5L5.5 6.25V11C5.5 15.1 8.4 18.75 12 20C15.6 18.75 18.5 15.1 18.5 11V6.25L12 3.5Z"
        stroke="#293B93"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M9.25 11.75L11 13.5L14.9 9.6"
        stroke="#293B93"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhilosophyCard({ item, t }) {
  const Icon = item.icon;

  return (
    <article className="interactive-card group flex h-full flex-col items-center rounded-[22px] border border-[#E1E7F6] bg-white px-6 py-8 text-center sm:px-7 sm:py-9">
      <span className="flex h-12 w-12 items-center justify-center rounded-[10px] border border-[#E1E7F6] bg-[#E1E7F6]">
        <Icon className="h-6 w-6" />
      </span>

      <h3 className="HeadingH5 mt-8 font-bold text-[#111827]">
        {t(item.titleKey, item.title)}
      </h3>

      <p className="TextSmall mt-5 max-w-[18rem] font-normal leading-[1.5] text-[#666]">
        {t(item.descriptionKey, item.description)}
      </p>
    </article>
  );
}

export default function GlobalPresencePhilosophySection() {
  const t = usePathTranslation("globalPresencePage.philosophySection");

  return (
    <section className="bg-white py-8 md:py-16">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <SectionEyebrow variant="compact" className="inline-block font-normal capitalize" >
              {t("eyebrow", "Our Philosophy")}
            </SectionEyebrow>

            <h2 className="HeadingH1 mx-auto mt-4 max-w-3xl font-semibold text-[#111827]">
              {t("titleLine1", "Cross Borders.")}
              <br />
              <span className=" text-[#293B93]">
                {t("titleLine2", "Never Cross the Line.")}
              </span>
            </h2>

            <p className="Text mx-auto mt-5 max-w-3xl font-normal leading-[1.7] text-[#000032]/60 md:mt-6">
              {t(
                "description",
                "GTC Group's global expansion strategy is anchored in a non-negotiable principle: compliance before commerce. We obtain local regulatory authorisation before entering any new market — because client protection is not a feature, it's the foundation."
              )}
            </p>
          </div>

          <div className="mt-8 sm:hidden md:mt-12">
            <MobilePeekCarousel
              items={PHILOSOPHY_CARDS}
              showArrows
              className="w-full min-w-0"
              trackClassName="-mx-4 px-4 min-w-0"
              slideClassName="!h-auto"
              renderItem={(item) => (
                <div className="w-full min-w-0 max-w-full px-1">
                  <PhilosophyCard item={item} t={t} />
                </div>
              )}
            />
          </div>

          <div className="mt-8 hidden grid-cols-1 gap-5 sm:grid sm:grid-cols-2 sm:gap-6 md:mt-12 lg:grid-cols-3">
            {PHILOSOPHY_CARDS.map((item) => (
              <PhilosophyCard key={item.key} item={item} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

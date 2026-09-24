"use client";

import RevealOnScroll from "@/app/[locale]/components/RevealOnScroll";
import { usePathTranslation } from "../../LocaleProvider";
import { useParams, useRouter } from "next/navigation";
import { localizedHref } from "@/i18n/localizedHref";
import { getMaterialByCardKey } from "../knowledgeMaterialsData";
/* ── SVG Icons ── */

function MonitorGradIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="6"
        y="6"
        width="36"
        height="26"
        rx="3"
        stroke="currentColor"
        strokeWidth="2.2"
      />
      <line
        x1="18"
        y1="38"
        x2="30"
        y2="38"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <line
        x1="24"
        y1="32"
        x2="24"
        y2="38"
        stroke="currentColor"
        strokeWidth="2.2"
      />
      {/* graduation cap */}
      <path
        d="M24 14L15 19L24 24L33 19L24 14Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M18 21V27C18 27 21 29.5 24 29.5C27 29.5 30 27 30 27V21"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <line
        x1="33"
        y1="19"
        x2="33"
        y2="27"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BookIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 8C8 8 12 5 24 5C36 5 40 8 40 8V38C40 38 36 35 24 35C12 35 8 38 8 38V8Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
        fill="none"
      />
      <line
        x1="24"
        y1="5"
        x2="24"
        y2="35"
        stroke="currentColor"
        strokeWidth="2"
      />
      <line x1="13" y1="13" x2="21" y2="13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="13" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="13" y1="23" x2="19" y2="23" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="27" y1="13" x2="35" y2="13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="27" y1="18" x2="35" y2="18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="27" y1="23" x2="33" y2="23" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function LaptopPlayIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="8"
        y="8"
        width="32"
        height="24"
        rx="3"
        stroke="currentColor"
        strokeWidth="2.2"
      />
      <line
        x1="4"
        y1="36"
        x2="44"
        y2="36"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* play button */}
      <circle cx="24" cy="20" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M22 17L28 20L22 23V17Z" fill="currentColor" />
    </svg>
  );
}

/* ── Data ── */

const CARDS = [
  {
    key: "videoTutorials",
    Icon: MonitorGradIcon,
    title: "For Trading Beginners",
    description:
      "Step-by-step video courses covering platform navigation, order types, risk management, and advanced trading concepts with real-market examples.",
    tags: ["Beginner", "Intermediate", "Advanced"],
  },
  {
    key: "ebooksGuides",
    Icon: BookIcon,
    title: "Trading Essentials",
    description:
      "Downloadable PDF guides on Forex basics, CFD trading strategies, commodity analysis, and index trading fundamentals.",
    tags: ["Forex", "CFDs", "Commodities"],
  },
  {
    key: "webinarsLive",
    Icon: LaptopPlayIcon,
    title: "Market Guides",
    description:
      "Join live market analysis sessions hosted by experienced traders. Ask questions in real time and learn professional decision-making techniques.",
    tags: ["Live", "Interactive", "Weekly"],
  },
  {
    key: "platformWalkthroughs",
    Icon: MonitorGradIcon,
    title: "Risk Management Basics",
    description:
      "Detailed guides for MT4, MT5, and our proprietary WebTrader platform—from installation to executing your first trade.",
    tags: ["MT4", "MT5", "WebTrader"],
  },
  {
    key: "technicalAnalysis",
    Icon: BookIcon,
    title: "Technical Analysis Basics",
    description:
      "An exhaustive A–Z glossary of trading terminology. From 'Ask Price' to 'Yield Curve', never feel lost in market jargon again.",
    tags: ["Reference", "A–Z Index"],
  },
  {
    key: "strategyBlueprints",
    Icon: LaptopPlayIcon,
    title: "GTCFX Platform Guides",
    description:
      "Tested trading frameworks with clear entry, exit, and risk parameters. Scalping, day trading, swing trading, and position trading covered.",
    tags: ["Scalping", "Swing", "Position"],
  },
];

/* ── Tag Pill ── */

function TagPill({ children }) {
  return (
    <span className="inline-block rounded-full border border-[#D6D3F0] bg-[#E8E6F8] px-3 py-1 text-[11px] font-medium leading-none text-[#293B93] transition-all duration-300 group-hover:border-transparent group-hover:bg-[#b68756] group-hover:text-white">
      {children}
    </span>
  );
}

/* ── Card ── */

function EduCard({ Icon, title, description, tags, delay = 0, onClick }) {
  return (
    <RevealOnScroll delay={delay}>
      <div
        className="interactive-card group flex h-full cursor-pointer flex-col rounded-[20px] border border-[#E1E7F6] bg-white p-6 sm:p-7"
        style={{
          boxShadow: "0 4px 40px 0 rgba(41, 59, 147, 0.08)",
        }}
        onClick={() => {
          onClick();
        }}
      >
        {/* Icon */}
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F0F1FC] text-[#293B93]">
          <Icon className="h-7 w-7" />
        </span>

        {/* Title */}
        <h3 className="HeadingH5 mt-5 font-semibold text-[#111827]">{title}</h3>

        {/* Description */}
        <p className="TextSmall mt-3 flex-1 leading-relaxed text-[#666666]">
          {description}
        </p>

        {/* Tags */}
        <div className="mt-5 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <TagPill key={tag}>{tag}</TagPill>
          ))}
        </div>
      </div>
    </RevealOnScroll>
  );
}

/* ── Section ── */

export default function EducationalMaterialsSection({ locale: localeProp = "en" }) {
  const t = usePathTranslation("knowledgePage.educationalMaterials");
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale || localeProp || "en").toString();

  const navigateToMaterial = (cardKey) => {
    // if (cardKey === "tradingGlossary") {
    //   router.push(localizedHref(locale, "/knowledge-to-learn/trading-glossary"));
    //   return;
    // }

    const material = getMaterialByCardKey(cardKey);
    if (!material) return;

    router.push(localizedHref(locale, `/knowledge-to-learn/${material.slug}`));
  };


  return (
    <section className="bg-white pt-14 md:pt-20 ">
      <div className="container">
        {/* Header */}
        <RevealOnScroll>
          <div className=" text-left">
            <h2 className="HeadingH2 font-bold mb-5">
                {t("subtitle", "For Trading Beginners")}
            </h2>
           
          </div>
        </RevealOnScroll>

        {/* Cards Grid */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:mt-14 lg:grid-cols-3 lg:gap-7">
          {CARDS.map((card, index) => (
            <EduCard
              key={card.key}
              Icon={card.Icon}
              title={t(`cards.${card.key}.title`, card.title)}
              description={t(`cards.${card.key}.description`, card.description)}
              tags={card.tags.map((tag, tagIndex) =>
                t(`cards.${card.key}.tags.${tagIndex}`, tag)
              )}
              delay={index * 80}
              onClick={() => {
                if (card.key === "strategyBlueprints" || index === 5) {
                  router.push(
                    localizedHref(locale, "/knowledge-to-learn/platform-guide")
                  );
                  return;
                }
                navigateToMaterial(card.key);
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

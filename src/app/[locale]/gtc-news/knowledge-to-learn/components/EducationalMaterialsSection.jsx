"use client";

import RevealOnScroll from "@/app/[locale]/components/RevealOnScroll";
import { usePathTranslation } from "../../../LocaleProvider";
import MobilePeekCarousel from "@/app/[locale]/components/common/MobilePeekCarousel";

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
        stroke="#293B93"
        strokeWidth="2.2"
      />
      <line
        x1="18"
        y1="38"
        x2="30"
        y2="38"
        stroke="#293B93"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <line
        x1="24"
        y1="32"
        x2="24"
        y2="38"
        stroke="#293B93"
        strokeWidth="2.2"
      />
      {/* graduation cap */}
      <path
        d="M24 14L15 19L24 24L33 19L24 14Z"
        stroke="#293B93"
        strokeWidth="2"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M18 21V27C18 27 21 29.5 24 29.5C27 29.5 30 27 30 27V21"
        stroke="#293B93"
        strokeWidth="2"
        fill="none"
      />
      <line
        x1="33"
        y1="19"
        x2="33"
        y2="27"
        stroke="#293B93"
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
        stroke="#293B93"
        strokeWidth="2.2"
        strokeLinejoin="round"
        fill="none"
      />
      <line
        x1="24"
        y1="5"
        x2="24"
        y2="35"
        stroke="#293B93"
        strokeWidth="2"
      />
      <line x1="13" y1="13" x2="21" y2="13" stroke="#293B93" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="13" y1="18" x2="21" y2="18" stroke="#293B93" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="13" y1="23" x2="19" y2="23" stroke="#293B93" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="27" y1="13" x2="35" y2="13" stroke="#293B93" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="27" y1="18" x2="35" y2="18" stroke="#293B93" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="27" y1="23" x2="33" y2="23" stroke="#293B93" strokeWidth="1.8" strokeLinecap="round" />
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
        stroke="#293B93"
        strokeWidth="2.2"
      />
      <line
        x1="4"
        y1="36"
        x2="44"
        y2="36"
        stroke="#293B93"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* play button */}
      <circle cx="24" cy="20" r="6" stroke="#293B93" strokeWidth="2" fill="none" />
      <path d="M22 17L28 20L22 23V17Z" fill="#293B93" />
    </svg>
  );
}

/* ── Data ── */

const CARDS = [
  {
    key: "videoTutorials",
    Icon: MonitorGradIcon,
    title: "Video Tutorials",
    description:
      "Step-by-step video courses covering platform navigation, order types, risk management, and advanced trading concepts with real-market examples.",
    tags: ["Beginner", "Intermediate", "Advanced"],
  },
  {
    key: "ebooksGuides",
    Icon: BookIcon,
    title: "E-Books & Guides",
    description:
      "Downloadable PDF guides on Forex basics, CFD trading strategies, commodity analysis, and index trading fundamentals.",
    tags: ["Forex", "CFDs", "Commodities"],
  },
  {
    key: "webinarsLive",
    Icon: LaptopPlayIcon,
    title: "Webinars & Live Sessions",
    description:
      "Join live market analysis sessions hosted by experienced traders. Ask questions in real time and learn professional decision-making techniques.",
    tags: ["Live", "Interactive", "Weekly"],
  },
  {
    key: "platformWalkthroughs",
    Icon: MonitorGradIcon,
    title: "Platform Walkthroughs",
    description:
      "Detailed guides for MT4, MT5, and our proprietary WebTrader platform—from installation to executing your first trade.",
    tags: ["MT4", "MT5", "WebTrader"],
  },
  {
    key: "tradingGlossary",
    Icon: BookIcon,
    title: "Trading Glossary",
    description:
      "An exhaustive A–Z glossary of trading terminology. From 'Ask Price' to 'Yield Curve', never feel lost in market jargon again.",
    tags: ["Reference", "A–Z Index"],
  },
  {
    key: "strategyBlueprints",
    Icon: LaptopPlayIcon,
    title: "Strategy Blueprints",
    description:
      "Tested trading frameworks with clear entry, exit, and risk parameters. Scalping, day trading, swing trading, and position trading covered.",
    tags: ["Scalping", "Swing", "Position"],
  },
];

/* ── Tag Pill ── */

function TagPill({ children }) {
  return (
    <span className="inline-block rounded-full bg-[#E8E6F8] px-3 py-1 text-[11px] font-medium leading-none text-[#293B93]">
      {children}
    </span>
  );
}

/* ── Card ── */

function EduCard({ Icon, title, description, tags, delay = 0 }) {
  return (
    <RevealOnScroll delay={delay}>
      <div
        className="flex h-full flex-col rounded-[20px] border border-[#E1E7F6] bg-white p-6 sm:p-7"
        style={{
          boxShadow: "0 4px 40px 0 rgba(41, 59, 147, 0.08)",
        }}
      >
        {/* Icon */}
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F0F1FC]">
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

export default function EducationalMaterialsSection({ locale = "en" }) {
  const t = usePathTranslation("knowledgePage.educationalMaterials");

  return (
    <section className="bg-white py-14 md:py-20 lg:py-24">
      <div className="container">
        {/* Header */}
        <RevealOnScroll>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="HeadingH1 font-bold mb-5">
              {t("title", "Educational Materials")}
            </h2>
            <p className="HeadingH3 mt-2 font-semibold text-[#293B93]">
              {t("subtitle", "For Trading Beginners")}
            </p>
          </div>
        </RevealOnScroll>

        {/* Cards Grid — desktop */}
        <div className="mt-10 hidden gap-6 sm:grid lg:mt-14 lg:grid-cols-3 lg:gap-7">
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
            />
          ))}
        </div>

        {/* Cards Carousel — mobile only */}
        <div className="mt-8 sm:hidden w-full overflow-hidden">
          <MobilePeekCarousel
            items={CARDS}
            renderItem={(card) => (
              <div className="w-full px-1">
                <EduCard
                  Icon={card.Icon}
                  title={t(`cards.${card.key}.title`, card.title)}
                  description={t(`cards.${card.key}.description`, card.description)}
                  tags={card.tags.map((tag, tagIndex) =>
                    t(`cards.${card.key}.tags.${tagIndex}`, tag)
                  )}
                />
              </div>
            )}
          />
        </div>
      </div>
    </section>
  );
}

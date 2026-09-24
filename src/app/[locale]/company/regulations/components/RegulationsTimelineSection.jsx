"use client";

import clsx from "clsx";
import { useMemo } from "react";
import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import FadeInSection from "./FadeInSection";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

const milestones = [
  { year: "2017", yearKey: "y2017", phaseKey: "foundation", itemCount: 1 },
  { year: "2020", yearKey: "y2020", phaseKey: "foundation", itemCount: 1 },
  { year: "2021", yearKey: "y2021", phaseKey: "expansion", itemCount: 1 },
  { year: "2022", yearKey: "y2022", phaseKey: "scale", itemCount: 2 },
  { year: "2023", yearKey: "y2023", phaseKey: "acceleration", itemCount: 2 },
  { year: "2024", yearKey: "y2024", phaseKey: "acceleration", itemCount: 1 },
  { year: "2025", yearKey: "y2025", phaseKey: "acceleration", itemCount: 2 },
];

const LICENSE_HIGHLIGHT =
  /\b(FSP \d+|FCA \d+|GB\d+|licence \d+|\d{8,})\b/gi;

function renderMilestoneText(text) {
  return text.split(LICENSE_HIGHLIGHT).map((part, index) => {
    if (!part) return null;

    if (/^(FSP \d+|FCA \d+|GB\d+|licence \d+|\d{8,})$/i.test(part)) {
      return (
        <span key={index} className="font-medium text-[#293B93]">
          {part}
        </span>
      );
    }

    return part;
  });
}

function MilestoneList({ items, className = "" }) {
  return (
    <ul className={clsx("space-y-3", className)}>
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-2.5 text-left TextSmall font-normal leading-[1.65] text-[#666]"
        >
          <span
            className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#293B93]"
            aria-hidden
          />
          <span>{renderMilestoneText(item)}</span>
        </li>
      ))}
    </ul>
  );
}

function TimelineMarker() {
  return (
    <span
      className="absolute left-8 top-0 z-10 flex h-4 w-4 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#293B93] bg-white"
      aria-hidden
    >
      <span className="h-2 w-2 rounded-full bg-[#293B93]" />
    </span>
  );
}

function TimelineCard({ milestone }) {
  return (
    <article
      className="relative w-[280px] shrink-0 sm:w-[300px]"
      aria-label={`${milestone.year}, ${milestone.phase}`}
    >
      <TimelineMarker />

      <div
        className="mt-6 rounded-[20px] border border-[#E1E7F6] bg-white p-5 sm:p-6"
        style={{
          boxShadow: "0 0 25px 0 rgba(41, 59, 147, 0.10)",
        }}
      >
        <p className="HeadingH3 font-semibold text-[#293B93]">{milestone.year}</p>
        <p className="TextSmall mt-1 font-normal capitalize text-[#666]">
          {milestone.phase}
        </p>
        <MilestoneList items={milestone.items} className="mt-5" />
      </div>
    </article>
  );
}

export default function RegulationsTimelineSection() {
  const t = usePathTranslation("regulationsPage.timeline");

  const translatedMilestones = useMemo(
    () =>
      milestones.map((m) => ({
        year: m.year,
        phase: t(`phases.${m.phaseKey}`),
        items: Array.from({ length: m.itemCount }, (_, i) =>
          t(`milestones.${m.yearKey}.item${i + 1}`)
        ).filter(Boolean),
      })),
    [t]
  );

  const loopMilestones = useMemo(() => {
    const doubled = [...translatedMilestones, ...translatedMilestones];
    return doubled.length >= 4 ? doubled : [...doubled, ...doubled];
  }, [translatedMilestones]);
  

  return (
    <section className="overflow-hidden bg-white py-14 md:py-20">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl">
          <FadeInSection>
            <div className="text-center">
              <SectionEyebrow
                variant="compact"
                className="inline-block font-normal capitalize tracking-[0.28em]"
              >
                {t("eyebrow", "Our Story")}
              </SectionEyebrow>

              <h2 className="HeadingH1 mx-auto mt-4 max-w-xl font-semibold leading-[1.25] text-[#000] md:mt-5"> 
                {t("titleStart", "Committed to")}{" "}
                <span className="text-[#293B93]">{t("titleHighlight", "your success")}</span>{" "}
                {t("titleEnd", "— since day one.")}
              </h2>

              <p className="Text mx-auto mt-5 max-w-2xl font-normal leading-[1.7] text-[#666] md:mt-6">
                {t(
                  "description",
                  "Six years of disciplined expansion, one licence at a time. Each milestone below is a regulatory step that broadened the markets our clients can access with confidence."
                )}
              </p>
            </div>
          </FadeInSection>
        </div>
      </div>

      <FadeInSection delay={0.1}>
        <div className="relative mt-12 md:mt-16">
          <div
            className="pointer-events-none absolute left-0 right-0 top-4 z-0 border-t-2 border-dashed border-[#293B93]/25"
            aria-hidden
          />

          <div className="gtc-regulations-timeline__viewport relative overflow-hidden">
            <div className="gtc-regulations-timeline__track flex min-w-max items-start gap-8 px-4 pt-4 sm:gap-10 sm:px-6 md:gap-12">
              {loopMilestones.map((milestone, index) => (
                <TimelineCard
                  key={`${milestone.year}-${index}`}
                  milestone={milestone}
                />
              ))}
            </div>
          </div>
        </div>
      </FadeInSection>

      <style jsx global>{`
        .gtc-regulations-timeline__track {
          animation: gtc-regulations-timeline-marquee 56s linear infinite;
          will-change: transform;
        }

        .gtc-regulations-timeline__track:hover {
          animation-play-state: paused;
        }

        @keyframes gtc-regulations-timeline-marquee {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-50%, 0, 0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .gtc-regulations-timeline__track {
            animation: none !important;
            flex-wrap: wrap;
            justify-content: center;
            row-gap: 2rem;
            width: auto;
            max-width: 72rem;
            margin-inline: auto;
          }
        }
      `}</style>
    </section>
  );
}

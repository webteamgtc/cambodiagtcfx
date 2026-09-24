"use client";

import Image from "next/image";
import MobilePeekCarousel from "@/app/[locale]/components/common/MobilePeekCarousel";
import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import { usePathTranslation } from "../../../LocaleProvider";

const GLOBE_SRC = "/new-design/about-us/map-location.svg";

const FEATURES = [
  { key: "multilingual", icon: GlobeFeatureIcon },
  { key: "compliance", icon: DocumentFeatureIcon },
  { key: "payments", icon: CardFeatureIcon },
];

function GlobeFeatureIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="7" stroke="#293B93" strokeWidth="1.4" />
      <path d="M3 10H17M10 3C7.5 6.5 7.5 13.5 10 17C12.5 13.5 12.5 6.5 10 3Z" stroke="#293B93" strokeWidth="1.4" />
    </svg>
  );
}

function DocumentFeatureIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M6 3.5H11.5L14.5 6.5V16.5C14.5 17.05 14.05 17.5 13.5 17.5H6C5.45 17.5 5 17.05 5 16.5V4.5C5 3.95 5.45 3.5 6 3.5Z"
        stroke="#293B93"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M11.5 3.5V6.5H14.5" stroke="#293B93" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M7.5 10H12.5M7.5 12.5H11" stroke="#293B93" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function CardFeatureIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <rect x="3" y="5" width="14" height="10" rx="1.5" stroke="#293B93" strokeWidth="1.4" />
      <path d="M3 8.5H17" stroke="#293B93" strokeWidth="1.4" />
      <path d="M6 12H9" stroke="#293B93" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}


function AdvantageGlobe({ t }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[460px]">



      <div className="relative h-full w-full">
        <Image
          src={GLOBE_SRC}
          alt=""
          fill
          className="object-contain"
          sizes="(max-width: 1024px) 90vw, 460px"
          loading="lazy"
        />
      </div>
    </div>
  );
}

function FeatureCard({ feature, t }) {
  const Icon = feature.icon;

  return (
    <article className="interactive-card flex gap-4 rounded-[20px] border border-[#E1E7F6] bg-[#fff] p-5 sm:p-6"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#E1E7F6]">
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <h3 className="Text font-semibold text-[#000]">
          {t(`cards.${feature.key}.title`)}
        </h3>
        <p className="TextSmall mt-2 font-normal leading-[1.55] text-[#666]">
          {t(`cards.${feature.key}.description`)}
        </p>
      </div>
    </article>
  );
}

export default function GlobalPresenceLocalAdvantageSection() {
  const t = usePathTranslation("globalPresencePage.localAdvantageSection");

  return (
    <section className="bg-[#F8F9FC] py-8 md:py-16">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <SectionEyebrow variant="compact" className="inline-block font-normal capitalize">
              {t("eyebrow", "Local Advantage")}
            </SectionEyebrow>

            <h2 className="HeadingH1 mx-auto mt-4 max-w-md font-semibold ">
              {t("titleLine1", "Not Just a Licence ")}{" "}
              <span className="text-[#293B93]">
                {t("titleLine2", "Real Local Support")}
              </span>
            </h2>

            <p className="Text mx-auto mt-5 max-w-3xl font-normal leading-[1.7] text-[#000032]/60 md:mt-6">
              {t(
                "description",
                "Being regulated locally means our operational infrastructure is built around the communities we serve — not bolted on as an afterthought."
              )}
            </p>
          </div>

          <div className="mt-8 grid w-full min-w-0 items-center gap-6 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:gap-10">
            <AdvantageGlobe t={t} />

            <div className="min-w-0 sm:hidden">
              <MobilePeekCarousel
                items={FEATURES}
                showArrows
                className="w-full min-w-0"
                trackClassName="-mx-4 px-4 min-w-0"
                slideClassName="!h-auto"
                renderItem={(feature) => (
                  <div className="w-full min-w-0 max-w-full px-1">
                    <FeatureCard feature={feature} t={t} />
                  </div>
                )}
              />
            </div>

            <div className="hidden min-w-0 flex-col gap-4 sm:flex sm:gap-5">
              {FEATURES.map((feature) => (
                <FeatureCard key={feature.key} feature={feature} t={t} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

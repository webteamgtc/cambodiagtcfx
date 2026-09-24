"use client";

import MobilePeekCarousel from "@/app/[locale]/components/common/MobilePeekCarousel";
import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import { usePathTranslation } from "../../../LocaleProvider";

const ZONES = [
  {
    key: "mena",
    titleKey: "zones.mena.title",
    badgeKey: "zones.mena.badge",
    title: "Middle East & North Africa",
    badge: "GTC MULTI TRADING DMCC · SCA",
    icon: CrescentIcon,
    regions: [
      { key: "uae", labelKey: "zones.mena.regions.uae", label: "United Arab Emirates" },
      { key: "saudi", labelKey: "zones.mena.regions.saudi", label: "Saudi Arabia" },
      { key: "egypt", labelKey: "zones.mena.regions.egypt", label: "Egypt" },
      { key: "kuwaitQatar", labelKey: "zones.mena.regions.kuwaitQatar", label: "Kuwait & Qatar" },
      { key: "jordanBahrain", labelKey: "zones.mena.regions.jordanBahrain", label: "Jordan & Bahrain" },
    ],
    languages: [
      { key: "arabic", labelKey: "zones.mena.languages.arabic", label: "Arabic", flag: "🇸🇦" },
      { key: "english", labelKey: "zones.mena.languages.english", label: "English", flag: "🇬🇧" },
    ],
  },
  {
    key: "apac",
    titleKey: "zones.apac.title",
    badgeKey: "zones.apac.badge",
    title: "Asia-Pacific",
    badge: "GTC Global Ltd · FSC",
    icon: ApacGlobeIcon,
    regions: [
      { key: "china", labelKey: "zones.apac.regions.china", label: "China (Mainland & HK)" },
      { key: "sea", labelKey: "zones.apac.regions.sea", label: "Southeast Asia" },
      { key: "anz", labelKey: "zones.apac.regions.anz", label: "Australia & New Zealand" },
      { key: "koreaJapan", labelKey: "zones.apac.regions.koreaJapan", label: "South Korea & Japan" },
      { key: "india", labelKey: "zones.apac.regions.india", label: "India & South Asia" },
    ],
    languages: [
      { key: "mandarin", labelKey: "zones.apac.languages.mandarin", label: "Mandarin", flag: "🇨🇳" },
      { key: "english", labelKey: "zones.apac.languages.english", label: "English", flag: "🇬🇧" },
    ],
  },
  {
    key: "global",
    titleKey: "zones.global.title",
    badgeKey: "zones.global.badge",
    title: "Global Online Platform",
    badge: "GTC Global Ltd · FSC",
    icon: WireframeGlobeIcon,
    regions: [
      { key: "latam", labelKey: "zones.global.regions.latam", label: "Latin America" },
      { key: "africa", labelKey: "zones.global.regions.africa", label: "Sub-Saharan Africa" },
      { key: "europe", labelKey: "zones.global.regions.europe", label: "Eastern Europe" },
      { key: "rest", labelKey: "zones.global.regions.rest", label: "Rest of World" },
      { key: "online", labelKey: "zones.global.regions.online", label: "Online-Only Clients" },
    ],
    languages: [
      { key: "spanish", labelKey: "zones.global.languages.spanish", label: "Spanish", flag: "🇪🇸" },
      { key: "english", labelKey: "zones.global.languages.english", label: "English", flag: "🇬🇧" },
      { key: "portuguese", labelKey: "zones.global.languages.portuguese", label: "Portuguese", flag: "🇵🇹" },
    ],
  },
];

function CrescentIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M14.5 4.5C11.5 4.5 9 7 9 10C9 13 11.5 15.5 14.5 15.5C13 17 10.5 17.5 8.5 16.5C6 15.2 4.5 12.5 4.5 9.5C4.5 6 7 3 10.5 3C12 3 13.4 3.6 14.5 4.5Z"
        fill="#FBBF24"
      />
    </svg>
  );
}

function ApacGlobeIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8.5" fill="#EEF2FF" stroke="#93A8E8" strokeWidth="1.2" />
      <path
        d="M6 12C8 9.5 10 8.5 12 8.5C14.5 8.5 16.5 10 18 12C16 14.5 14 15.5 12 15.5C9.5 15.5 7.5 14 6 12Z"
        fill="#293B93"
        fillOpacity="0.25"
      />
      <ellipse cx="12" cy="12" rx="8.5" ry="3" stroke="#93A8E8" strokeWidth="1" />
    </svg>
  );
}

function WireframeGlobeIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8.5" stroke="#293B93" strokeWidth="1.3" />
      <ellipse cx="12" cy="12" rx="3.5" ry="8.5" stroke="#293B93" strokeWidth="1.2" />
      <path d="M3.5 12H20.5M5 8H19M5 16H19" stroke="#293B93" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}

function LanguageBadge({ language, t }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E1E7F6] bg-[#E1E7F6] px-3 py-1.5">
      <span className="text-xs leading-none" aria-hidden>
        {language.flag}
      </span>
      <span className="text-xs font-normal text-[#000000]">
        {t(language.labelKey, language.label)}
      </span>
    </span>
  );
}

function ZoneColumn({ zone, t, showDivider }) {
  const Icon = zone.icon;

  return (
    <div
      className={`min-w-0 px-0 py-2  sm:px-2 ${
        showDivider
          ? "md:border-l md:border-dashed md:border-[#E1E7F6] md:pl-8 xl:pl-10"
          : "md:pr-4 xl:pr-6"
      }`}
    >
      <Icon className="h-7 w-7" />

      <h3 className="HeadingH5 mt-4 font-semibold text-[#111827]">
        {t(zone.titleKey, zone.title)}
      </h3>

      <p className="TextSmall mt-3 inline-block rounded-full bg-[#E1E7F6] px-4 py-1 font-normal text-[#000000]/80">
        {t(zone.badgeKey, zone.badge)}
      </p>

      <ul className="mt-6 space-y-2.5">
        {zone.regions.map((region) => (
          <li
            key={region.key}
            className="TextSmall flex items-start gap-2 font-normal text-[#666]"
          >
            <span className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-[#9CA3AF]" aria-hidden />
            <span>{t(region.labelKey, region.label)}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <p className="text-xs font-normal text-[#666]">
          {t("languagesLabel", "Languages")}
        </p>
        <div className="mt-3 border-t border-[#E1E7F6] pt-3 flex flex-wrap gap-2">
          {zone.languages.map((language) => (
            <LanguageBadge key={language.key} language={language} t={t} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function GlobalPresenceWhereWeServeSection() {
  const t = usePathTranslation("globalPresencePage.whereWeServeSection");

  return (
    <section className="bg-white py-10 md:py-14">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <SectionEyebrow variant="compact" className="inline-block font-normal capitalize">
              {t("eyebrow", "Geographic Coverage")}
            </SectionEyebrow>

            <h2 className="HeadingH1 mx-auto mt-4 max-w-md font-semibold ">
              {t("titleBefore", "Where We")}{" "}
              <span className="text-[#293B93]">{t("titleAccent", "Serve")}</span>
            </h2>

            <p className="Text mx-auto mt-5 max-w-3xl font-normal leading-[1.7] text-[#000032]/60 md:mt-6">
              {t(
                "description",
                "Our regulated entities collectively cover three global zones, providing compliant access for clients in virtually every major financial market."
              )}
            </p>
          </div>

          <div className="mt-12 md:hidden">
            <MobilePeekCarousel
              items={ZONES}
              showArrows
              className="w-full min-w-0"
              trackClassName="-mx-4 px-4 min-w-0"
              slideClassName="!h-auto"
              renderItem={(zone, index) => (
                <div className="w-full min-w-0 max-w-full px-1">
                  <ZoneColumn zone={zone} t={t} showDivider={false} />
                </div>
              )}
            />
          </div>

          <div className="mt-12 hidden grid-cols-1 gap-10 md:grid md:grid-cols-3 md:gap-0">
            {ZONES.map((zone, index) => (
              <ZoneColumn
                key={zone.key}
                zone={zone}
                t={t}
                showDivider={index > 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

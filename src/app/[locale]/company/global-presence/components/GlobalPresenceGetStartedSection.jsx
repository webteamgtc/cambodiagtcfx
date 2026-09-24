"use client";

import Link from "next/link";
import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import { useLocale, usePathTranslation } from "../../../LocaleProvider";
import { localizedHref } from "@/i18n/localizedHref";

const CONTACT_ACTIONS = [
  {
    key: "mena",
    labelKey: "card.actions.mena",
    label: "MENA Clients — Dubai Office (SCA)",
    flag: "🇦🇪",
    hrefKey: "card.actions.menaHref",
    href: "/contact-us",
    external: false,
    icon: null,
  },
  {
    key: "apac",
    labelKey: "card.actions.apac",
    label: "Asia-Pacific & Global — Mauritius (FSC)",
    flag: "🇲🇺",
    hrefKey: "card.actions.apacHref",
    href: "/contact-us",
    external: false,
    icon: null,
  },
  {
    key: "disputes",
    labelKey: "card.actions.disputes",
    label: "Disputes — Financial Commission Portal",
    flag: null,
    hrefKey: "card.actions.disputesHref",
    href: "https://financialcommission.org/dispute-resolution/",
    external: true,
    icon: GavelIcon,
  },
];

const STATS = [
  {
    key: "countries",
    valueKey: "stats.countries.value",
    labelKey: "stats.countries.label",
    value: "32+",
    label: "Countries with active client relationships",
  },
  {
    key: "offices",
    valueKey: "stats.offices.value",
    labelKey: "stats.offices.label",
    value: "18",
    label: "Physical offices & representative offices",
  },
  {
    key: "markets",
    valueKey: "stats.markets.value",
    labelKey: "stats.markets.label",
    value: "14",
    label: "Regulated markets with full licences",
  },
  {
    key: "nationalities",
    valueKey: "stats.nationalities.value",
    labelKey: "stats.nationalities.label",
    value: "180+",
    label: "Client nationalities served globally",
  },
];

function GavelIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M4.5 14.5L5.5 15.5L3 18H4L6.5 15.5L7.5 16.5L5 19H6L8.5 16.5L9.5 17.5L7 20H8L10.5 17.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="7"
        y="3"
        width="8"
        height="4"
        rx="1"
        transform="rotate(35 11 5)"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path d="M5 13L11 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function ContactActionButton({ action, t, locale }) {
  const href = action.external
    ? t(action.hrefKey, action.href)
    : localizedHref(locale, t(action.hrefKey, action.href));

  const Icon = action.icon;
  const classes =
    "TextSmall flex w-full items-center gap-3 px-4 py-3.5 font-medium text-white transition hover:no-underline sm:px-5";


  const content = (
    <>
      {/* <span className="flex h-8 w-8 shrink-0 items-center justify-center TextSmall"
      style={{
        borderRadius: "10px",
        border: "0.7px solid rgba(225, 231, 246, 0.70)",
        background: "rgba(105, 114, 159, 0.62)",
      }}
      >
        {action.flag ? (
          <span aria-hidden>{action.flag}</span>
        ) : Icon ? (
          <Icon className="h-4 w-4" />
        ) : null}
      </span> */}
      <span className="text-left leading-snug">
        {t(action.labelKey, action.label)}
      </span>
    </>
  );

  if (action.external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} style={{
        borderRadius: "10px",
        border: "0.7px solid rgba(225, 231, 246, 0.70)",
        background: "rgba(105, 114, 159, 0.62)",
      }}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}
    style={{
      borderRadius: "10px",
      border: "0.7px solid rgba(225, 231, 246, 0.70)",
      background: "rgba(105, 114, 159, 0.62)",
    }}
    >
      {content}
    </Link>
  );
}

function StatItem({ item, t, showDivider }) {
  return (
    <div
      className={`min-w-0 px-4 text-center md:text-left sm:px-6 first:pl-0 ${showDivider ? "lg:border-l lg:border-dotted-[#D9D9D9]" : ""
        }`}
    >
      <p className="HeadingH3 font-semibold text-[#293B93]">
        {t(item.valueKey, item.value)}
      </p>
      <p className="TextSmall mt-2 max-w-[11rem] !font-normal leading-[1.55] text-[#999]">
        {t(item.labelKey, item.label)}
      </p>
    </div>
  );
}

export default function GlobalPresenceGetStartedSection() {
  const t = usePathTranslation("globalPresencePage.getStartedSection");
  const locale = useLocale();

  return (
    <section className="bg-[#F8F9FC] py-8 md:py-16">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-start gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-8 ">
            <div className="min-w-0 text-center md:text-left">
              <SectionEyebrow variant="compact" className=" font-normal capitalize">
                {t("eyebrow", "Get Started")}
              </SectionEyebrow>

              <h2 className="HeadingH1 mt-4 max-w-lg font-semibold leading-[1.2] md:mt-5">
                {t("title", "Find the Right Account for Your Region")}
              </h2>

              <p className="Text mt-5 max-w-lg font-normal leading-[1.7] text-[#000032]/60 md:mt-6">
                {t(
                  "description",
                  "Based on your location, we'll match you to the appropriate regulated entity and guide you through a locally-compliant account opening process."
                )}
              </p>
            </div>

            <div className="min-w-0 px-6 py-8 sm:px-8 sm:py-9"
              style={{
                borderRadius: "20px",
                background: "#293B93",
              }}
            >
              <h3 className="HeadingH5 font-semibold text-white">
                {t("card.title", "Speak to Our Team")}
              </h3>

              <p className="TextSmall mt-3 font-normal leading-[1.55] text-white/60">
                {t(
                  "card.description",
                  "Our multilingual compliance team is ready to help you understand which entity and account type best suits your needs."
                )}
              </p>

              <div className="mt-6 flex flex-col gap-3">
                {CONTACT_ACTIONS.map((action) => (
                  <ContactActionButton
                    key={action.key}
                    action={action}
                    t={t}
                    locale={locale}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* <div className="mt-8 grid grid-cols-2 gap-8 md:mt-14 lg:grid-cols-4 lg:gap-0">
            {STATS.map((item, index) => (
              <StatItem
                key={item.key}
                item={item}
                t={t}
                showDivider={index > 0}
              />
            ))}
          </div> */}
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import TextArrowLink from "@/app/[locale]/components/common/TextArrowLink";
import { useLocale, usePathTranslation } from "../../../LocaleProvider";
import { localizedHref } from "@/i18n/localizedHref";
import FadeInSection from "@/app/[locale]/company/dynamic-leverage/components/FadeInSection";
import Button from "@/app/[locale]/components/common/Button";

import clsx from "clsx";

const REGISTER_HREF =
  "/live-account-application";



const DUBAI_IMAGE_SRC = "/new-design/about-us/burj.svg";

const WHY_GTC_TAGS = [
  { key: "dmcc", labelKey: "tags.dmcc", label: "DMCC Framework" },
  { key: "mauritius", labelKey: "tags.mauritius", label: "Mauritius Entity" },
  {
    key: "financialCommission",
    labelKey: "tags.financialCommission",
    label: "Financial Commission Member",
  },
  { key: "menaApac", labelKey: "tags.menaApac", label: "MENA & APAC Focus" },
];

export const CAREER_LIFE_AT_GTC_ITEMS = [
  {
    key: "location",
    title: "Prime Dubai Location",
    description: "DIFC core business district, where finance meets culture",
    titleKey: "items.location.title",
    descriptionKey: "items.location.description",
    icon: LocationIcon,
  },
  {
    key: "flexible",
    title: "Flexible Arrangements",
    description: "we care about output, not clock-in times (role dependent)",
    titleKey: "items.flexible.title",
    descriptionKey: "items.flexible.description",
    icon: SlidersIcon,
  },
  {
    key: "pay",
    title: "Competitive Pay + Performance Incentives",
    description: "industry-leading comp that moves as you do",
    titleKey: "items.pay.title",
    descriptionKey: "items.pay.description",
    icon: MoneyBagIcon,
  },
  {
    key: "training",
    title: "Training & Certification Budget",
    description: "we invest in your professional development",
    titleKey: "items.training.title",
    descriptionKey: "items.training.description",
    icon: TrainingIcon,
  },
  {
    key: "celebrations",
    title: "Multicultural Celebrations",
    description:
      "Eid, Lunar New Year, Christmas and more — all celebrated, all welcome",
    titleKey: "items.celebrations.title",
    descriptionKey: "items.celebrations.description",
    icon: CelebrationIcon,
  },
  {
    key: "referral",
    title: "Employee Referral Program",
    description: "great people know great people; we reward those connections",
    titleKey: "items.referral.title",
    descriptionKey: "items.referral.description",
    icon: ReferralIcon,
  },
];

function LocationIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M10 1.5C6.96243 1.5 4.5 3.96243 4.5 7C4.5 11.25 10 18.5 10 18.5C10 18.5 15.5 11.25 15.5 7C15.5 3.96243 13.0376 1.5 10 1.5Z"
        stroke="#293B93"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="7" r="2" stroke="#293B93" strokeWidth="1.4" />
    </svg>
  );
}

function SlidersIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M4 5H16M4 10H16M4 15H16" stroke="#293B93" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="7" cy="5" r="1.5" fill="#293B93" />
      <circle cx="13" cy="10" r="1.5" fill="#293B93" />
      <circle cx="9" cy="15" r="1.5" fill="#293B93" />
    </svg>
  );
}

function MoneyBagIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M6 6.5V5.5C6 4.11929 7.11929 3 8.5 3H11.5C12.8807 3 14 4.11929 14 5.5V6.5"
        stroke="#293B93"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M5 8.5H15C15.8284 8.5 16.5 9.17157 16.5 10V15C16.5 15.8284 15.8284 16.5 15 16.5H5C4.17157 16.5 3.5 15.8284 3.5 15V10C3.5 9.17157 4.17157 8.5 5 8.5Z"
        stroke="#293B93"
        strokeWidth="1.4"
      />
      <path d="M10 11V13" stroke="#293B93" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function TrainingIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <rect x="3" y="4" width="14" height="9" rx="1" stroke="#293B93" strokeWidth="1.4" />
      <path d="M7 16H13" stroke="#293B93" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M10 13V16" stroke="#293B93" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="8" cy="8.5" r="1" fill="#293B93" />
      <path d="M11 10.5L13 8.5" stroke="#293B93" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function CelebrationIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M4 16L7 4L10 10L16 7L4 16Z"
        stroke="#293B93"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M14 4L15 5M16 8L17.5 7.5M13 3L13.5 1.5" stroke="#293B93" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function ReferralIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="7" cy="6.5" r="2.5" stroke="#293B93" strokeWidth="1.4" />
      <circle cx="13.5" cy="7.5" r="2" stroke="#293B93" strokeWidth="1.4" />
      <path
        d="M3.5 16.5C3.5 13.7386 5.73858 11.5 8.5 11.5C10.1569 11.5 11.6187 12.3482 12.5 13.6"
        stroke="#293B93"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M13 11.5C15.2091 11.5 17 13.2909 17 15.5"
        stroke="#293B93"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ImagePanel({ t, imageSrc = DUBAI_IMAGE_SRC, badgeValueKey, badgeLabelKey }) {
  return (
    <div className="relative min-w-0">
      <div className="relative overflow-hidden rounded-[20px]">
        <Image
          src={imageSrc}
          alt=""
          width={560}
          height={680}
          className="mx-auto h-auto object-cover"
          sizes="(max-width: 1024px) 100vw, 42vw"
        />
      </div>

      {/* <div className="absolute bottom-5 right-5 rounded-xl bg-[#293B93] px-5 py-4 text-center sm:-bottom-6 sm:-right-6 sm:px-6 sm:py-5">
        <p className="HeadingH4 font-bold leading-none text-white">
          {t(badgeValueKey, "2019")}
        </p>
        <p className="TextSmall mt-1 font-normal text-white">
          {t(badgeLabelKey, "Founded in Dubai")}
        </p>
      </div> */}
    </div>
  );
}

function BenefitItem({ item, t, delay }) {
  const Icon = item.icon;

  return (
    <FadeInSection delay={delay}>
    <div className="flex gap-4 border-b border-[#E1E7F6] py-4  sm:gap-5 sm:py-6">
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center"
        style={{
          borderRadius: "10px",
          border: "1px solid #E1E7F6",
          background: "#E1E7F6",
        }}
      >
        <Icon className="h-5 w-5" />
      </span>

      <div className="min-w-0 text-left">
        <h3 className="HeadingH5 font-semibold text-[#000]">
          {t(item.titleKey, item.title)}
        </h3>
        <p className="text-xs mt-1 font-normal leading-[1.65] text-[#666666] sm:mt-1">
          {t(item.descriptionKey, item.description)}
          </p>
        </div>
      </div>
    </FadeInSection>
  );
}

function CompanyBackgroundContent({ t, locale }) {
  return (
    <div className="min-w-0 text-center md:text-left">
      <SectionEyebrow variant="compact" className="capitalize tracking-[0.3em]">
        {t("eyebrow", "Company Background")}
      </SectionEyebrow>

      <h2 className="HeadingH2 mt-5 font-semibold text-[#000]">
        {t("title", "Rooted in Dubai, Serving the World")}
      </h2>

      <p className="TextSmall mt-8 font-normal leading-[1.7] text-[#69729F] md:mt-6">
        {t(
          "paragraph1",
          "GTC Group was established in Dubai, operating under the DMCC regulatory framework with an independent regulated entity in Mauritius. We are also members of the Financial Commission, providing an additional layer of client protection."
        )}
      </p>

      <p className="TextSmall mt-8 font-normal leading-[1.7] text-[#69729F]">
        {t(
          "paragraph2",
          "Deeply embedded in the Middle East and Asia-Pacific markets, our localized expertise powers global trading needs — bridging regional depth with international reach."
        )}
      </p>

      {/* <div className="mt-7 flex flex-wrap justify-center gap-2.5 sm:mt-8 md:justify-start">
        {WHY_GTC_TAGS.map((tag) => (
          <span
            key={tag.key}
            className="inline-flex px-4 py-2 text-xs font-semibold text-[#293B93]"
            style={{
              borderRadius: "49px",
              border: "1px solid #E1E7F6",
              background: "#F8F9FC",
            }}
          >
            {t(tag.labelKey, tag.label)}
          </span>
        ))}
      </div> */}

      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <Button
                href={REGISTER_HREF}
                external
                variant="primary"
                size="lg"
                showArrow
              >
                {t("openLiveAccount", "Open Live Account") || "Open Live Account"}
              </Button>

             
            </div>

   
    </div>
  );
}

export default function WhyGtcGroupBackgroundSection({
  translationNamespace = "whyGtcGroupPage.backgroundSection",
  variant = "company",
  imageSrc = DUBAI_IMAGE_SRC,
  benefitItems = CAREER_LIFE_AT_GTC_ITEMS,
  badgeValueKey = "badgeYear",
  badgeLabelKey = "badgeLabel",
}) {
  const t = usePathTranslation(translationNamespace);
  const locale = useLocale();
  const isLifeAtGtc = variant === "lifeAtGtc";

  return (
    <section className={isLifeAtGtc ? "bg-white pb-8 md:pb-14" : "bg-[#F8F9FC] py-8 md:py-16"}>
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl">
          <FadeInSection>
          {isLifeAtGtc ? (
            <>
              <div className="text-center">
                <SectionEyebrow variant="compact" className="capitalize tracking-[0.3em]">
                  {t("eyebrow", "Life at GTC")}
                </SectionEyebrow>

                <h2 className="HeadingH1 mx-auto mt-4 max-w-3xl font-semibold text-[#000]">
                  {t("title", "What it actually feels like to work here")}
                </h2>

                <p className="Text mx-auto mt-5 max-w-2xl font-normal leading-[1.7] text-[#000032]/60 md:mt-6">
                  {t(
                    "description",
                    "Four things that make GTC Group a place worth investing your career in."
                  )}
                </p>
              </div>

              <div className="mt-12 grid items-start gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-12 xl:gap-16">
                <ImagePanel
                  t={t}
                  imageSrc={imageSrc}
                  badgeValueKey={badgeValueKey}
                  badgeLabelKey={badgeLabelKey}
                />

                <div className="min-w-0">
                  {benefitItems.map((item, index) => (
                       <BenefitItem key={item.key} item={item} t={t} delay={index * 0.1} />
                   ))}
                </div>
              </div>
            </>
          ) : (
            <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-12 xl:gap-16">
              <ImagePanel
                t={t}
                imageSrc={imageSrc}
                badgeValueKey={badgeValueKey}
                badgeLabelKey={badgeLabelKey}
              />

              <CompanyBackgroundContent t={t} locale={locale} />
            </div>
          )}
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

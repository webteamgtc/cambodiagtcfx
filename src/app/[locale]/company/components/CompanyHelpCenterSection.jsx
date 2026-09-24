"use client";

import MobilePeekCarousel from "@/app/[locale]/components/common/MobilePeekCarousel";
import Button from "@/app/[locale]/components/common/Button";
import { useLocale, usePathTranslation } from "../../LocaleProvider";
import { localizedHref } from "@/i18n/localizedHref";
import PrimaryButton from "../../components/common/PrimaryButton";

const FEATURE_KEYS = ["fastResponse", "localExpertise", "secure"];

function ClockIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M12 8v4l2.5 2"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MapPinIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21s6-5.2 6-10a6 6 0 10-12 0c0 4.8 6 10 6 10z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="11" r="2.25" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  );
}

function LockIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="6"
        y="10"
        width="12"
        height="9"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path
        d="M9 10V8a3 3 0 016 0v2"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

const ICONS = {
  fastResponse: ClockIcon,
  localExpertise: MapPinIcon,
  secure: LockIcon,
};

const DEFAULT_FEATURES = {
  fastResponse: {
    title: "Fast Response",
    description: "Replies within 24 hours on all business days, no waiting around.",
  },
  localExpertise: {
    title: "Local Expertise",
    description: "Agents who deeply understand your regional market and local needs.",
  },
  secure: {
    title: "Secure & Confidential",
    description: "Your data is fully encrypted and handled in accordance with our Privacy Policy.",
  },
};

function HelpFeatureCard({ featureKey, t }) {
  const fallback = DEFAULT_FEATURES[featureKey];
  const Icon = ICONS[featureKey];

  return (
    <article className="interactive-card h-full rounded-2xl border min-h-[200px] flex flex-col justify-center border-[#B3C0FF] bg-white px-5 py-6 sm:px-6 sm:py-7">
      <div className="flex items-center gap-3 sm:gap-3.5">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#eef2ff] text-[#2b3d8f] sm:h-11 sm:w-11">
          <Icon className="h-[18px] w-[18px] sm:h-5 sm:w-5" />
        </span>
        <h3 className="HeadingH5 font-semibold leading-snug">
          {t(`features.${featureKey}.title`, fallback.title)}
        </h3>
      </div>
      <p className="TextSmall mt-3 pl-[52px] leading-[1.65] text-[#666666] sm:mt-3.5 sm:pl-[58px]">
        {t(`features.${featureKey}.description`, fallback.description)}
      </p>
    </article>
  );
}

export default function CompanyHelpCenterSection() {
  const t = usePathTranslation("companyPage.helpCenterSection");
  const locale = useLocale();

  const features = FEATURE_KEYS.map((key) => ({ key }));

  return (
    <section className="overflow-x-hidden bg-white py-8 md:py-10 ">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="HeadingH1 text-[#000] text-center">
          {t("title", "Help Center")}
        </h2>

        <div className="mt-6 grid gap-4 lg:mt-12 lg:grid-cols-2 lg:items-center lg:gap-x-12 xl:gap-x-16">
          <h3 className="HeadingH2 text-[#293B93] max-w-xl text-center md:text-left" >
            <span className="block">{t("headlineLine1", "We're here to help")} {t("headlineLine2", "you")}</span>
          </h3>
          <p className="TextSmall leading-[1.5] font-normal lg:max-w-md lg:justify-self-end xl:max-w-lg text-center md:text-left">
            {t(
              "description",
              ""
            )}
          </p>
        </div>

        <div className="mt-10 md:mt-12">
          <div className="md:hidden">
            <MobilePeekCarousel
              items={features}
              showArrows
              trackClassName="-mx-4 px-4"
              renderItem={(item) => (
                <HelpFeatureCard featureKey={item.key} t={t} />
              )}
            />
          </div>

          <div className="hidden gap-5 md:grid md:grid-cols-3 md:gap-5 lg:gap-6">
            {features.map((item) => (
              <HelpFeatureCard key={item.key} featureKey={item.key} t={t} />
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-center md:mt-12">
          <Button
            href={localizedHref(locale, "/company/faqs")}
            variant="brand"
            size="md"
            showArrow
          >
            {t("viewMore", "View More")}
          </Button>
        </div>
      </div>
    </section>
  );
}

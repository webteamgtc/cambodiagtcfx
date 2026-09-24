"use client";

import Image from "next/image";
import Button from "@/app/[locale]/components/common/Button";
import { useLocale, usePathTranslation } from "../../../LocaleProvider";
import { localizedHref } from "@/i18n/localizedHref";

const REGISTER_HREF =
  "/live-account-application";

const MAP_SRC = "/new-design/about-us/hero-global-2.svg";

const HERO_STATS = [
  {
    key: "entities",
    valueKey: "stats.entities.value",
    labelKey: "stats.entities.label",
    value: "5",
    label: "Regulated Entities",
  },
  {
    key: "protection",
    valueKey: "stats.protection.value",
    labelKey: "stats.protection.label",
    value: "$20K",
    label: "Client Protection",
  },
  {
    key: "languages",
    valueKey: "stats.languages.value",
    labelKey: "stats.languages.label",
    value: "20+",
    label: "Languages Supported",
  },
];

export const HeroTrustBadge = ({ children, className, overlayClass }) => {
  return (
    <div
      className="inline-flex items-center gap-2.5 px-5 py-1.5"
      style={{
        borderRadius: "99px",
        border: "1px solid #E1E7F6",
        background: overlayClass ? "#E1E7F6" : "#F7F9FF",
      }}
    >
      <span
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#EEF2FF]"
        aria-hidden
      >
        <span className="h-2 w-2 rounded-full bg-[#293B93]" />
      </span>
      <span className={`TextSmall font-normal normal-case tracking-normal text-[#293B93] ${className}`}>
        {children}
      </span>
    </div>
  );
}

function GlobalPresenceMap({ mapAlt }) {
  return (
    <div className="relative w-full min-w-0">
      <Image
        src={MAP_SRC}
        alt={mapAlt}
        width={875}
        height={672}
        className="block h-auto w-full"
        sizes="(max-width: 1024px) 100vw, 50vw"
        priority
      />
    </div>
  );
}

export default function GlobalPresenceHeroSection() {
  const t = usePathTranslation("globalPresencePage.hero");
  const locale = useLocale();

  return (
    <section className="py-16 md:py-20">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="min-w-0 text-center md:text-left">
            <HeroTrustBadge>
              {t("badge", "Multi-Jurisdictional Regulated Broker")}
            </HeroTrustBadge>

            <h1 className="HeadingH2 mt-7 font-semibold max-w-lg leading-[1.25] text-black">
              {t("titleLine1", "Global Reach,")}
              <br />
              <span className="text-[#293B93]">
                {t("titleLine2", "Local Authority")}
              </span>
            </h1>

            <p className="Text mt-6 max-w-xl font-normal leading-[1.7] text-[#000032]/60">
              {t(
                "description",
                "GTCFX operates through independently regulated entities across multiple jurisdictions — ensuring every client is served within a fully compliant, supervised framework."
              )}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <Button
                href={REGISTER_HREF}
                external
                variant="primary"
                size="lg"
                showArrow
              >
                {t("openAccount", "Open Account")}
              </Button>

              <Button
                href={localizedHref(locale, "/company/regulations")}
                variant="outline"
                size="lg"
                className="border-[#E1E7F6] bg-white font-semibold text-[#293B93]"
              >
                {t("viewLicences", "View Licences")}
              </Button>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 border-y border-[#E1E7F6] py-5 sm:gap-6">
              {HERO_STATS.map((item) => (
                <div key={item.key} className="min-w-0">
                  <p className="HeadingH3 font-semibold text-[#293B93]">
                    {t(item.valueKey, item.value)}
                  </p>
                  <p className="TextSmall mt-1 font-normal text-[#666666]">
                    {t(item.labelKey, item.label)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-center">
            <GlobalPresenceMap mapAlt={t("mapAlt", "GTCFX global presence map")} />
          </div>
        </div>
      </div>
    </section>
  );
}

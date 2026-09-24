"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { AU, GB, MU, VU, ZA } from "country-flag-icons/react/3x2";
import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import Button from "@/app/[locale]/components/common/Button";
import { useLocale, usePathTranslation } from "../../../LocaleProvider";
import { localizedHref } from "@/i18n/localizedHref";

const FLAG_ICONS = {
  za: ZA,
  vu: VU,
  gb: GB,
  au: AU,
  mu: MU,
};

const ENTITIES = [
  {
    key: "southAfrica",
    flagCode: "za",
    nameKey: "entities.southAfrica.name",
    locationKey: "entities.southAfrica.location",
    footerKey: "entities.southAfrica.footer",
    details: [
      {
        key: "authority",
        labelKey: "detailLabels.authority",
        valueKey: "entities.southAfrica.authority",
        icon: BuildingIcon,
      },
      {
        key: "licenseType",
        labelKey: "detailLabels.licenseType",
        valueKey: "entities.southAfrica.licenseType",
        icon: DocumentIcon,
      },
      {
        key: "licence",
        labelKey: "detailLabels.licence",
        valueKey: "entities.southAfrica.licence",
        icon: DocumentIcon,
      },
      {
        key: "registration",
        labelKey: "detailLabels.registration",
        valueKey: "entities.southAfrica.registration",
        icon: PinIcon,
      },
      {
        key: "address",
        labelKey: "detailLabels.address",
        valueKey: "entities.southAfrica.address",
        icon: PinIcon,
      },
    ],
  },
  {
    key: "vanuatu",
    flagCode: "vu",
    nameKey: "entities.vanuatu.name",
    locationKey: "entities.vanuatu.location",
    footerKey: "entities.vanuatu.footer",
    details: [
      {
        key: "authority",
        labelKey: "detailLabels.authority",
        valueKey: "entities.vanuatu.authority",
        icon: BuildingIcon,
      },
      {
        key: "licenseType",
        labelKey: "detailLabels.licenseType",
        valueKey: "entities.vanuatu.licenseType",
        icon: DocumentIcon,
      },
      {
        key: "licence",
        labelKey: "detailLabels.licence",
        valueKey: "entities.vanuatu.licence",
        icon: DocumentIcon,
      },
      {
        key: "address",
        labelKey: "detailLabels.address",
        valueKey: "entities.vanuatu.address",
        icon: PinIcon,
      },
    ],
  },
  {
    key: "unitedKingdom",
    flagCode: "gb",
    nameKey: "entities.unitedKingdom.name",
    locationKey: "entities.unitedKingdom.location",
    footerKey: "entities.unitedKingdom.footer",
    tierKey: "entities.unitedKingdom.tier",
    details: [
      {
        key: "authority",
        labelKey: "detailLabels.authority",
        valueKey: "entities.unitedKingdom.authority",
        icon: BuildingIcon,
      },
      {
        key: "licenseType",
        labelKey: "detailLabels.licenseType",
        valueKey: "entities.unitedKingdom.licenseType",
        icon: DocumentIcon,
      },
      {
        key: "frnLicenseNo",
        labelKey: "detailLabels.frnLicenseNo",
        valueKey: "entities.unitedKingdom.frnLicenseNo",
        icon: DocumentIcon,
      },
    ],
  },
  {
    key: "australia",
    flagCode: "au",
    nameKey: "entities.australia.name",
    locationKey: "entities.australia.location",
    footerKey: "entities.australia.footer",
    tierKey: "entities.australia.tier",
    details: [
      {
        key: "authority",
        labelKey: "detailLabels.authority",
        valueKey: "entities.australia.authority",
        icon: BuildingIcon,
      },
      {
        key: "licenseType",
        labelKey: "detailLabels.licenseType",
        valueKey: "entities.australia.licenseType",
        icon: DocumentIcon,
      },
      {
        key: "licence",
        labelKey: "detailLabels.licence",
        valueKey: "entities.australia.licence",
        icon: DocumentIcon,
      },
      {
        key: "afsl",
        labelKey: "detailLabels.afsl",
        valueKey: "entities.australia.afsl",
        icon: PinIcon,
      },
    ],
  },
  {
    key: "mauritius",
    flagCode: "mu",
    nameKey: "entities.mauritius.name",
    locationKey: "entities.mauritius.location",
    footerKey: "entities.mauritius.footer",
    details: [
      {
        key: "authority",
        labelKey: "detailLabels.authority",
        valueKey: "entities.mauritius.authority",
        icon: BuildingIcon,
      },
      {
        key: "licenseType",
        labelKey: "detailLabels.licenseType",
        valueKey: "entities.mauritius.licenseType",
        icon: DocumentIcon,
      },
      {
        key: "licence",
        labelKey: "detailLabels.licence",
        valueKey: "entities.mauritius.licence",
        icon: DocumentIcon,
      },
      {
        key: "companyNo",
        labelKey: "detailLabels.companyNo",
        valueKey: "entities.mauritius.companyNo",
        icon: PinIcon,
      },
    ],
  },
];

function CarouselArrow({ direction, onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Previous entities" : "Next entities"}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#e5e7eb] bg-white text-[#9ca3af] shadow-[0_2px_8px_rgba(15,23,42,0.06)] transition hover:border-[#d1d5db] hover:text-[#293B93] disabled:pointer-events-none disabled:opacity-35 sm:h-11 sm:w-11"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden
      >
        {direction === "prev" ? (
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        )}
      </svg>
    </button>
  );
}

function BuildingIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M3 8H17" stroke="#293B93" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M5 8V15M8 8V15M12 8V15M15 8V15" stroke="#293B93" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M2 15H18" stroke="#293B93" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M10 3L16 8H4L10 3Z" stroke="#293B93" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function DocumentIcon({ className }) {
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

function PinIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M10 17.5C10 17.5 15 12.5 15 8.75C15 5.85 12.76 3.5 10 3.5C7.24 3.5 5 5.85 5 8.75C5 12.5 10 17.5 10 17.5Z"
        stroke="#293B93"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="8.75" r="1.75" stroke="#293B93" strokeWidth="1.4" />
    </svg>
  );
}


function EntityFlag({ code, label }) {
  const FlagIcon = FLAG_ICONS[code];
  if (!FlagIcon) return null;

  return (
    <span className="inline-flex h-8 w-10 shrink-0 overflow-hidden rounded-sm">
      <FlagIcon title={label || code.toUpperCase()} className="h-full w-full" />
    </span>
  );
}

function DetailRow({ detail, t }) {
  const Icon = detail.icon;

  return (
    <div className="flex items-start gap-3 border-b border-[#E1E7F6] pb-4">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#E1E7F6]">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-normal text-[#666]">{t(detail.labelKey)}</p>
        <p className="TextSmall mt-0.5 font-medium text-[#111827]">{t(detail.valueKey)}</p>
      </div>
    </div>
  );
}

function EntityCard({ entity, t }) {
  const tier = entity.tierKey ? t(entity.tierKey) : null;

  return (
    <article className="flex h-full min-w-0 flex-col overflow-hidden rounded-[10px] border border-[#E1E7F6] bg-white">
      <div className="p-6 sm:p-7">
        <div className="flex flex-col items-start gap-3">
          <div className="flex w-full items-start justify-between gap-3">
            <EntityFlag code={entity.flagCode} label={t(entity.nameKey)} />
            {tier ? (
              <span className="rounded-full bg-[#EEF2FF] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#293B93]">
                {tier}
              </span>
            ) : null}
          </div>
          <div className="mt-2 min-w-0">
            <h3 className="HeadingH5 font-semibold text-[#000000]">{t(entity.nameKey)}</h3>
            <p className="TextSmall font-normal text-[#666]">{t(entity.locationKey)}</p>
          </div>
        </div>

        <div className="mt-10 space-y-5">
          {entity.details.map((detail) => (
            <DetailRow key={detail.key} detail={detail} t={t} />
          ))}
        </div>
      </div>
    </article>
  );
}

export default function GlobalPresenceRegulatedEntitiesSection() {
  const t = usePathTranslation("globalPresencePage.regulatedEntitiesSection");
  const locale = useLocale();
  const [swiper, setSwiper] = useState(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const updateNavState = (instance) => {
    if (!instance) return;
    setIsBeginning(instance.isBeginning);
    setIsEnd(instance.isEnd);
  };

  return (
    <section className="pb-10">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <SectionEyebrow variant="compact" className="inline-block font-normal capitalize">
              {t("eyebrow", "Regulated Entities")}
            </SectionEyebrow>

            <h2 className="HeadingH1 mx-auto mt-4 font-semibold">
              {t("titleLine1", "Five Entities.")}
              <br />
              <span className="text-[#293B93]">
                {t("titleLine2", "One Standard of Compliance.")}
              </span>
            </h2>

            <p className="Text mx-auto mt-5 max-w-4xl font-normal leading-[1.7] text-[#000032]/60 md:mt-6">
              {t(
                "description",
                "Each GTC Group entity is independently licensed and supervised by its local regulatory authority, providing clients with transparent, accountable service within established legal frameworks."
              )}
            </p>

          </div>

          <div className="relative mt-10 min-w-0 overflow-hidden md:mt-12">
            <div className="flex min-w-0 items-center gap-3 sm:gap-4">
              <CarouselArrow
                direction="prev"
                onClick={() => swiper?.slidePrev()}
                disabled={!swiper || isBeginning}
              />

              <div className="min-w-0 flex-1 overflow-hidden">
                <Swiper
                  className="regulated-entities-swiper w-full max-w-full"
                  onSwiper={(instance) => {
                    setSwiper(instance);
                    updateNavState(instance);
                  }}
                  onSlideChange={updateNavState}
                  onResize={updateNavState}
                  onBreakpoint={updateNavState}
                  observer
                  observeParents
                  watchOverflow
                  spaceBetween={16}
                  slidesPerView={1}
                  slidesPerGroup={1}
                  breakpoints={{
                    640: { slidesPerView: 2, slidesPerGroup: 1, spaceBetween: 18 },
                    1024: { slidesPerView: 3, slidesPerGroup: 1, spaceBetween: 20 },
                  }}
                >
                  {ENTITIES.map((entity) => (
                    <SwiperSlide key={entity.key} className="!h-auto">
                      <EntityCard entity={entity} t={t} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <CarouselArrow
                direction="next"
                onClick={() => swiper?.slideNext()}
                disabled={!swiper || isEnd}
              />
            </div>
          </div>

          <div className="mt-6 flex justify-center md:mt-10 mb-10">
              <Button
                href={localizedHref(locale, "/company/regulations")}
                variant="brand"
                size="md"
                showArrow
                className="!w-auto sm:!w-auto"
              >
                {t("regulatedLink", "Complete regulatory information")}
              </Button>
            </div>
        </div>
      </div>
    </section>
  );
}

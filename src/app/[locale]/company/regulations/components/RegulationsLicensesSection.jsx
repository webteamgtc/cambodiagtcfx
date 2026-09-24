"use client";

import FadeInSection from "./FadeInSection";
import MobilePeekCarousel from "@/app/[locale]/components/common/MobilePeekCarousel";
import { FiArrowUpRight, FiCheckCircle } from "react-icons/fi";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";
import { AU, GB, KM, MU, VU, ZA } from "country-flag-icons/react/3x2";

const ENTITY_VERIFY_LINKS = {
  southAfrica: "https://www.gtcfx.com/en-za",
  vanuatu: "https://www.gtcfx.com/en-vu",
  mauritius: "https://www.gtcfx.com/en-mu",
  australia: "https://gtcau.com.au/",
  unitedKingdom: "https://gmgmarkets.co.uk/",
  comorosAnjouan:
    "https://anjouanoffshorefinanceauthority.org/register/gtc-global-trading-ltd/",
};

const entities = [

  {
    id: "ZA-01",
    entityKey: "southAfrica",
    flag: "za",
    verifyKey: "fsca",
    verifyLink: ENTITY_VERIFY_LINKS.southAfrica,
    details: [
      { labelKey: "regulator", field: "regulator" },
      { labelKey: "licenseType", field: "licenseType" },
      { labelKey: "licenseNo", field: "licenseNo" },
      { labelKey: "registrationNo", field: "registrationNo" },
      { labelKey: "registeredAddress", field: "registeredAddress" },
    ],
  },
  {
    id: "VU-02",
    entityKey: "vanuatu",
    flag: "vu",
    verifyKey: "vfsc",
    verifyLink: ENTITY_VERIFY_LINKS.vanuatu,
    details: [
      { labelKey: "regulator", field: "regulator" },
      { labelKey: "licenseType", field: "licenseType" },
      { labelKey: "licenseNo", field: "licenseNo" },
      { labelKey: "registeredAddress", field: "registeredAddress" },
    ],
  },
  {
    id: "KM-06",
    entityKey: "comorosAnjouan",
    flag: "km",
    verifyKey: "anjouan",
    verifyLink: ENTITY_VERIFY_LINKS.comorosAnjouan,
    details: [
      { labelKey: "regulator", field: "regulator" },
      { labelKey: "licenseType", field: "licenseType" },
      { labelKey: "licenseNo", field: "licenseNo" },
      { labelKey: "companyNo", field: "companyNo" },
      { labelKey: "registeredAddress", field: "registeredAddress" },
    ],
  },
  {
    id: "UK-03",
    entityKey: "unitedKingdom",
    flag: "gb",
    verifyKey: "fca",
    verifyLink: ENTITY_VERIFY_LINKS.unitedKingdom,
    tier: true,
    affiliateNote: true,
    details: [
      { labelKey: "regulator", field: "regulator" },
      { labelKey: "licenseType", field: "licenseType" },
      { labelKey: "frnLicenseNo", field: "frnLicenseNo" },
    ],
  },
  {
    id: "AU-04",
    entityKey: "australia",
    flag: "au",
    verifyKey: "asic",
    verifyLink: ENTITY_VERIFY_LINKS.australia,
    tier: false,
    details: [
      { labelKey: "regulator", field: "regulator" },
      { labelKey: "licenseType", field: "licenseType" },
      { labelKey: "licenseNo", field: "licenseNo" },
    ],
  },
  {
    id: "MU-05",
    entityKey: "mauritius",
    flag: "mu",
    verifyKey: "fsc",
    verifyLink: ENTITY_VERIFY_LINKS.mauritius,
    details: [
      { labelKey: "regulator", field: "regulator" },
      { labelKey: "licenseType", field: "licenseType" },
      { labelKey: "licenseNo", field: "licenseNo" },
      { labelKey: "companyNo", field: "companyNo" },
    ],
  },
];

const FLAG_ICONS = {
  km: KM,
  za: ZA,
  vu: VU,
  gb: GB,
  au: AU,
  mu: MU,
};

function Flag({ code }) {
  const FlagIcon = FLAG_ICONS[code];
  if (!FlagIcon) return null;

  return (
    <span className="inline-flex h-7 w-10 shrink-0 overflow-hidden rounded-sm shadow-sm">
      <FlagIcon title={code.toUpperCase()} className="h-full w-full" />
    </span>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex gap-4">
      <span className="w-28 shrink-0 text-xs text-[#8a8a9a]">{label}</span>
      <span className="text-xs font-medium text-[#02002f]">{value}</span>
    </div>
  );
}

function EntityCard({ entity }) {
  const t = usePathTranslation("regulationsPage.licenses");
  const tier = entity.tier ? t(`entities.${entity.entityKey}.tier`, "TIER 1") : "";

  return (
    <div className="flex h-full flex-col rounded-2xl border border-[#e8ecf8] bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between">
        <Flag code={entity.flag} />
        <span className="text-xs font-medium text-[#8a8a9a]">
          {entity.id}
          {tier ? ` · ${tier}` : ""}
        </span>
      </div>

      <p className="mt-4 text-xs text-[#8a8a9a]">{t(`entities.${entity.entityKey}.location`)}</p>
      <h3 className="mt-1 text-base font-bold text-[#02002f]">{t(`entities.${entity.entityKey}.name`)}</h3>

      <div className="mt-5 flex-1 space-y-3 border-t border-[#f0f1f6] pt-5">
        {entity?.details?.map((d) => (
          <DetailRow
            key={d.labelKey}
            label={t(`labels.${d.labelKey}`)}
            value={t(`entities.${entity.entityKey}.${d.field}`)}
          />
        ))}
        {entity.affiliateNote ? (
          <p className="pt-1 text-xs font-normal italic text-[#8a8a9a]">
            {t(`entities.${entity.entityKey}.affiliateNote`)}
          </p>
        ) : null}
        {entity?.afterNoteDetails?.map((d) => (
          <DetailRow
            key={d.labelKey}
            label={t(`labels.${d.labelKey}`)}
            value={t(`entities.${entity.entityKey}.${d.field}`)}
          />
        ))}
      </div>
      {entity.verifyLink ? (
        <div className="mt-6 flex items-center justify-between border-t border-dashed border-[#f0f1f6] pt-4">
          <a
            href={entity.verifyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-medium text-[#3347a8] hover:underline"
          >
            {t(`verify.${entity.verifyKey}`)} <FiArrowUpRight className="h-3 w-3" />
          </a>
        </div>
      ) : null}
    </div>
  );
}

function VerificationCard() {
  const t = usePathTranslation("regulationsPage.licenses");

  return (
    <div className="flex h-full flex-col rounded-2xl border border-[#e8ecf8] bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between">
        <span className="flex h-5 w-7 items-center justify-center">
          <FiCheckCircle className="h-5 w-5 text-[#3347a8]" />
        </span>
        <span className="text-xs font-medium uppercase tracking-wider text-[#8a8a9a]">
          {t("verificationCard.label", "VERIFICATION")}
        </span>
      </div>

      <p className="mt-4 text-xs text-[#8a8a9a]">
        {t("verificationCard.kicker", "Need to verify a license?")}
      </p>
      <h3 className="mt-1 text-lg font-bold leading-snug text-[#02002f]">
        {t("verificationCard.title", "All licenses are publicly verifiable on regulator registers.")}
      </h3>

      <div className="mt-5 flex-1 border-t border-[#f0f1f6] pt-5">
        <p className="text-xs font-medium leading-[1.7] text-[#02002f]">
          {t(
            "verificationCard.description",
            "Each entity can be cross-checked directly with the regulator that supervises it. We never ask you to take our word for it — and neither should any broker."
          )}
        </p>
      </div>

      <div className="mt-6 border-t border-dashed border-[#f0f1f6] pt-4">
        <a
          href={ENTITY_VERIFY_LINKS.comorosAnjouan}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs font-medium text-[#3347a8] hover:underline"
        >
          {t("verify.anjouan", "Verify on Anjouan register")}{" "}
          <FiArrowUpRight className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}

export default function RegulationsLicensesSection() {
  const t = usePathTranslation("regulationsPage.licenses");
  const carouselItems = [...entities];

  return (
    <section className="bg-white py-10 md:py-16">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl">
          <FadeInSection>
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#3347a8]">
                {t("eyebrow", "Regulated Entities and Affiliates")}
              </p>
              <h2 className="HeadingH1 mt-3 text-[#02002f]">
                {t("titleLine1", "Our globally licensed entities")}
                <br />
                <span className="text-[#3347a8]">{t("titleLine2", "Our Global Reach")}</span>
              </h2>
              <p className="mx-auto mt-4 max-w-6xl text-[15px] leading-[1.7] text-[#5a5a6e]">
                {t(
                  "description",
                  "Five independent legal entities. Each licensed and supervised by its local regulator. Each verifiable against the regulator's public register."
                )}
              </p>
            </div>
          </FadeInSection>

          <div className="mt-8 sm:hidden">
            <MobilePeekCarousel
              items={carouselItems}
              showArrows
              className="w-full min-w-0"
              trackClassName="-mx-4 px-4 min-w-0"
              slideClassName="!h-auto"
              renderItem={(item) => (
                <div className="w-full min-w-0 max-w-full px-1">
                  { <EntityCard entity={item} />}
                </div>
              )}
            />
          </div>

          <div className="mt-12 hidden grid-cols-1 gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3">
            {entities.map((entity, i) => (
              <FadeInSection key={entity.entityKey} delay={i * 0.05}>
                <EntityCard entity={entity} />
              </FadeInSection>
            ))}
            {/* <FadeInSection delay={entities.length * 0.05}>
              <VerificationCard />
            </FadeInSection> */}
          </div>
        </div>
      </div>
    </section>
  );
}

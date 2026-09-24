"use client";

import FadeInSection from "./FadeInSection";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";
import { AU, GB, KM, MU, VU, ZA } from "country-flag-icons/react/3x2";

const footprint = [
  { key: "comorosAnjouan", code: "AOFA", flag: "km" },
  { key: "southAfrica", code: "FSCA", flag: "za" },
  { key: "vanuatu", code: "VFSC", flag: "vu" },
  { key: "unitedKingdom", code: "FCA", flag: "gb" },
  { key: "australia", code: "ASIC", flag: "au" },
  { key: "mauritius", code: "FSC", flag: "mu" },
];

const FLAG_ICONS = {
  km: KM,
  za: ZA,
  vu: VU,
  gb: GB,
  au: AU,
  mu: MU,
};

const stats = [
  { key: "entities", valueKey: "statValues.entities", labelKey: "stats.entities" },
  { key: "jurisdictions", valueKey: "statValues.jurisdictions", labelKey: "stats.jurisdictions" },
  { key: "countries", valueKey: "statValues.countries", labelKey: "stats.countries" },
];

function Flag({ code }) {
  const FlagIcon = FLAG_ICONS[code];
  if (!FlagIcon) return null;

  return (
    <span className="inline-flex h-6 w-8 shrink-0 overflow-hidden rounded-sm shadow-sm">
      <FlagIcon title={code.toUpperCase()} className="h-full w-full" />
    </span>
  );
}

export default function RegulationsHeroSection() {
  const t = usePathTranslation("regulationsPage.hero");

  return (
    <section className="relative overflow-hidden bg-[#f8f9fc] py-10 md:py-16">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[min(420px,55%)] bg-gradient-to-b from-white to-transparent"
        aria-hidden
      />
      <div className="container relative z-10 min-w-0 max-w-full pt-4 md:pt-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
            <FadeInSection>
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#e1e7f6] bg-white px-4 py-2 text-sm font-medium text-[#3347a8]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3347a8]" />
                  {t("badge", "Last review May 2026")}
                </span>


                <h1 className="HeadingH2 mt-4 text-[#02002f]">
                  {t("titleLine1", "Regulated Entities.")}
                  <br />
                  {t("titleLine2", "Clear Disclosures.")}
                  <br />
                  <span className="text-[#3347a8]">{t("titleLine3", "Informed Choices.")}</span>
                </h1>

                <p className="mt-5 max-w-md text-[15px] leading-[1.7] text-[#5a5a6e]">
                  {t(
                    "description",
                    "GTC operates through a network of separately incorporated entities and affiliates across multiple jurisdictions. Certain entities are licensed and regulated by their respective local authorities, with each licence applying only to the entity to which it was issued."
                  )}
                </p>

                <div className="mt-8 grid grid-cols-3 gap-4">
                  {stats.map((s) => (
                    <div key={s.key}>
                      <p className="text-xl font-bold text-[#02002f]">
                        {t(s.valueKey, s.key === "countries" ? "Global" : "Multiple")}
                      </p>
                      <p className="mt-1 text-xs text-[#8a8a9a]">
                        {t(s.labelKey, s.key === "entities" ? "Regulated Entities" : s.key === "jurisdictions" ? "Jurisdictions" : "Client Based")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.15} className="hidden lg:block">
              <div className="rounded-2xl border border-[#e8ecf8] bg-white p-5 shadow-sm md:p-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#02002f]">
                    {t("footprintTitle", "Active Regulatory Footprint")}
                  </span>
                  <span className="flex items-center gap-1.5 text-sm font-medium text-[#2eab71]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#2eab71]" />
                    {t("liveLabel", "LIVE")}
                  </span>
                </div>

                <div className="mt-4 divide-y divide-[#f0f1f6]">
                  {footprint.map((item) => (
                    <div key={item.key} className="flex items-center justify-between py-3.5">
                      <div className="flex min-w-0 items-center gap-3">
                        <Flag code={item.flag} />
                        <div className="min-w-0">
                          <p className="text-[15px] font-semibold text-[#02002f]">
                            {t(`footprint.${item.key}.country`)}
                          </p>
                          <p className="mt-0.5 truncate text-xs text-[#8a8a9a]">
                            {t(`footprint.${item.key}.entity`)}
                          </p>
                        </div>
                      </div>
                      <span className="ml-3 shrink-0 rounded-full bg-[#f0f2f8] px-3 py-1 text-xs font-medium text-[#3347a8]">
                        {item.code}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </div>
    </section>
  );
}

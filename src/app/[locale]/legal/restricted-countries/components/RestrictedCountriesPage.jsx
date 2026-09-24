"use client";

import { usePathTranslation, useLocaleMessages } from "@/app/[locale]/LocaleProvider";
import { readPath } from "@/i18n/tranlsationText";

const DEFAULT_COUNTRIES = {
  prohibited: [
    "Democratic People's Republic of Korea",
    "Iran",
    "Myanmar",
  ],
  highRisk: [
    "Democratic Republic of Congo",
    "Haiti",
    "Iraq",
    "Kenya",
    "Kuwait",
    "Lao People's Democratic Republic",
    "Lebanon",
    "Monaco",
    "Nepal",
    "Papua New Guinea",
    "South Sudan",
    "Syria",
    "Venezuela",
    "Vietnam",
    "Virgin Islands (UK)",
    "Yemen",
  ],
  serviceRestriction: [
    "Afghanistan",
    "Russia",
    "Ukraine",
    "Israel",
    "USA",
    "Australia",
    "Japan",
  ],
};

export default function RestrictedCountriesPage() {
  const t = usePathTranslation("restrictedCountriesPage");
  const messages = useLocaleMessages();
  const countries =
    readPath("restrictedCountriesPage.countries", messages) || DEFAULT_COUNTRIES;

  const prohibitedCountries = countries.prohibited ?? DEFAULT_COUNTRIES.prohibited;
  const highRiskCountries = countries.highRisk ?? DEFAULT_COUNTRIES.highRisk;
  const serviceRestrictionCountries =
    countries.serviceRestriction ?? DEFAULT_COUNTRIES.serviceRestriction;

  return (
    <section className="bg-[#f8fafc] py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-2xl font-bold text-[#0f172a] md:text-4xl">
            {t("title", "Restricted Countries")}
          </h1>
          <p className="mt-4 text-gray-600">
            {t(
              "description",
              "GTC Global Ltd does not provide services to residents of certain jurisdictions due to regulatory, compliance, and risk management policies."
            )}
          </p>
        </div>

        <div className="mt-10">
          <h2 className="mb-4 text-lg font-semibold text-[#b91c1c]">
            {t("prohibitedHeading", "List of Prohibited Countries")}
          </h2>
          <div className="flex flex-wrap gap-3">
            {prohibitedCountries.map((country) => (
              <span
                key={country}
                className="rounded-xl bg-[#b91c1c]/10 px-4 py-2 text-sm font-medium text-[#b91c1c]"
              >
                {country}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <h2 className="mb-4 text-lg font-semibold text-[#b68756]">
            {t("highRiskHeading", "List of High Risk Countries")}
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {highRiskCountries.map((country) => (
              <div
                key={country}
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-center text-sm text-gray-700 transition hover:bg-gray-50"
              >
                {country}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <h2 className="mb-4 text-lg font-semibold text-[#293794]">
            {t("serviceRestrictionHeading", "Service Restriction")}
          </h2>
          <div className="flex flex-wrap gap-3">
            {serviceRestrictionCountries.map((country) => (
              <span
                key={country}
                className="rounded-xl bg-[#293794]/10 px-4 py-2 text-sm font-medium text-[#293794]"
              >
                {country}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-[#b68756]/20 bg-[#fff7ed] p-5">
          <p className="text-sm leading-6 text-gray-700">
            <span className="font-semibold text-[#b68756]">{t("noteLabel", "Note:")}</span>{" "}
            {t(
              "noteText",
              "The above list applies specifically to services offered by GTC Global Ltd and GTC Global Trade Capital Co. Limited. Other entities within the GTC Financial Group may operate under different regulatory frameworks. Please refer to their respective websites for more details."
            )}
          </p>
        </div>
      </div>
    </section>
  );
}

import { getDictionary } from "@/i18n/request";
import RestrictedCountriesPage from "./components/RestrictedCountriesPage";
import { getPageMetadata } from "@/lib/metadata/getPageMetadata";

export async function generateMetadata({ params }) {
  const { locale } = params;
  const dict = await getDictionary(locale);

  return getPageMetadata({
    locale,
    dict,
    key: "restrictedCountries",
    path: "legal/restricted-countries",
    fallbackTitle: "Restricted Countries | GTCFX Service Availability",
    fallbackDescription:
      "Check the list of restricted countries for GTCFX services and ensure compliance before opening a trading account.",
  });
}

export default async function RestrictedCountries({ params }) {
  const { locale } = params;
  const dict = await getDictionary(locale);
  const restrictedCountriesPage = dict?.restrictedCountriesPage || {};

  return (
    <>
      <RestrictedCountriesPage />
    </>
  );
}
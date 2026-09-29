import { getDictionary } from "@/i18n/request";
import { locales, localeDir } from "@/i18n/config";
import { getBaseLanguage } from "@/i18n/regionalLocale";
import { notoKufiArabic } from "@/app/fonts/notoKufiArabic";
import { poppins } from "@/app/fonts/poppins";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { LocaleProvider } from "./LocaleProvider";
import StaticBrandHeader from "@/app/[locale]/components/common/StaticBrandHeader";
import PageBackBar from "@/app/[locale]/components/common/PageBackBar";
import LocaleFooter from "./components/common/LocaleFooter";
import { ToastContainer } from "react-toastify";
import UsCfdDisclaimerModal from "./components/common/UsCfdDisclaimerModal";
import RegionalLocaleGuard from "./components/common/RegionalLocaleGuard";
import { getLocaleSeoMetadata } from "./components/common/seo/localeSeoMetadata";
import { getRobotsMetadataForPath } from "@/lib/seo/noindexPaths";
import InstallAppBanner from "@/app/[locale]/components/common/InstallAppBanner";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Always resolve translations at request time (S3 locales must not be baked in at build).
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const base = await getLocaleSeoMetadata(locale);
  const pathname = (await headers()).get("x-pathname") || "";
  const robots = getRobotsMetadataForPath(pathname);

  return {
    ...base,
    robots,
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  if (!locales.includes(locale)) notFound();

  const dict = await getDictionary(locale);
  const isRTL = localeDir[locale] === "rtl";
  const isArabic = getBaseLanguage(locale) === "ar";

  return (
    <LocaleProvider locale={locale} messages={dict}>
      <div
        dir={isRTL ? "rtl" : "ltr"}
        className={
          isArabic
            ? `min-h-screen ${notoKufiArabic.variable} font-arabic`
            : `min-h-screen ${poppins.variable} font-sans`
        }
      >
        <RegionalLocaleGuard />
        <StaticBrandHeader />
        <main>
          <PageBackBar />
          {children}
        </main>
        <LocaleFooter locale={locale} />
        <InstallAppBanner />
        <UsCfdDisclaimerModal />
        <ToastContainer autoClose={3000} />
      </div>
    </LocaleProvider>
  );
}
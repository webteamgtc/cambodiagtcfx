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
import StickyContactBar from "./components/common/StickyContactBar";
import ConsentAwareScripts from "./components/common/ConsentAwareScripts";
import CookiesBanner from "./components/common/CookiesBanner";
import UsCfdDisclaimerModal from "./components/common/UsCfdDisclaimerModal";
import RegionalLocaleGuard from "./components/common/RegionalLocaleGuard";
import { getLocaleSeoMetadata } from "./components/common/seo/localeSeoMetadata";
import { getRobotsMetadataForPath } from "@/lib/seo/noindexPaths";
import AppQRWidget from "./components/common/AppQRWidget";
import AppDownloadStickyBar from "./components/common/AppDownloadStickyBar";
import InstallAppBanner from "@/app/[locale]/components/common/InstallAppBanner";
import ConvrsChatScript from "@/app/[locale]/components/common/ConvrsChatScript";
import ConvrsChatOffset from "@/app/[locale]/components/common/ConvrsChatOffset";
import { GTM_CONTAINER_ID, LEGACY_THIRD_PARTY_SCRIPTS_ENABLED } from "@/lib/analytics/ga4";

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
        <noscript>
          {LEGACY_THIRD_PARTY_SCRIPTS_ENABLED ? (
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          ) : null}
        </noscript>

        <ConsentAwareScripts />
        <ConvrsChatScript />
        <RegionalLocaleGuard />
        <ConvrsChatOffset />
        <StaticBrandHeader />
        <main>
          <PageBackBar />
          {children}
        </main>
        <LocaleFooter locale={locale} />
        <InstallAppBanner />
        <CookiesBanner />
        <UsCfdDisclaimerModal />
        <ToastContainer autoClose={3000} />
      </div>
    </LocaleProvider>
  );
}
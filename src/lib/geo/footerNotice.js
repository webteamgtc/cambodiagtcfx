import { getRegionFromLocale } from "@/i18n/regionalLocale";

const INTERNATIONAL_FOOTER_KEYS = [
  "firstPara",
  "secondPara",
  "thirdPara",
  "fourthPara",
  "fifthPara",
  "sixthPara",
];

const ZA_FOOTER_KEYS = [
  "firstPara",
  "secondPara",
  "thirdPara",
  "fourthPara",
  "fifthPara",
];

const ENTITY_REGIONAL_FOOTER_KEYS = [
  "contractingEntityPara",
  "entityPara",
  "entitySecondPara",
  "restrictionPara",
];

/** Temporarily use the international footer on /en-ae and /ar-ae until UAE copy is updated. */
export function shouldUseUaeFooter(locale) {
  void locale;
  return false;
}

/** Explicit regional URL in the path always wins over geo IP. */
function hasExplicitRegion(locale, region) {
  return getRegionFromLocale(locale) === region;
}

/** South Africa footer for /en-za (and other *-za URLs) or ZA IP address. */
export function shouldUseZaFooter(locale, countryCode) {
  if (hasExplicitRegion(locale, "vu") || hasExplicitRegion(locale, "mu")) return false;
  if (hasExplicitRegion(locale, "za")) return true;
  return String(countryCode || "").toUpperCase() === "ZA";
}

/** Vanuatu footer for /en-vu (and other *-vu URLs) or VU IP address. */
export function shouldUseVuFooter(locale, countryCode) {
  if (hasExplicitRegion(locale, "vu")) return true;
  if (hasExplicitRegion(locale, "za") || hasExplicitRegion(locale, "mu")) return false;
  return String(countryCode || "").toUpperCase() === "VU";
}

/** Mauritius footer for /en-mu (and other *-mu URLs) or MU IP address. */
export function shouldUseMuFooter(locale, countryCode) {
  if (hasExplicitRegion(locale, "mu")) return true;
  if (hasExplicitRegion(locale, "za") || hasExplicitRegion(locale, "vu")) return false;
  return String(countryCode || "").toUpperCase() === "MU";
}

function buildEntityRegionalFooterDisclaimers(t, prefix) {
  return [
    t(`${prefix}.riskWarning.firstPara`, ""),
    t(`${prefix}.riskWarning.secondPara`, ""),
    ...ENTITY_REGIONAL_FOOTER_KEYS.map((key) => t(`${prefix}.${key}`, "")),
  ].filter(Boolean);
}

function getEntityRegionalFooterTitle(t, prefix) {
  return t(`${prefix}.riskWarning.title`, "");
}

export function buildFooterDisclaimers(t, locale, countryCode) {
  if (shouldUseUaeFooter(locale)) {
    return [];
  }

  const region = getRegionFromLocale(locale);

  if (region === "vu") {
    return buildEntityRegionalFooterDisclaimers(t, "footerNoticeVu");
  }

  if (region === "mu") {
    return buildEntityRegionalFooterDisclaimers(t, "footerNoticeMu");
  }

  if (region === "za" || shouldUseZaFooter(locale, countryCode)) {
    return ZA_FOOTER_KEYS.map((key) => t(`footerNoticeZa.${key}`, "")).filter(Boolean);
  }

  if (shouldUseVuFooter(locale, countryCode)) {
    return buildEntityRegionalFooterDisclaimers(t, "footerNoticeVu");
  }

  if (shouldUseMuFooter(locale, countryCode)) {
    return buildEntityRegionalFooterDisclaimers(t, "footerNoticeMu");
  }

  return INTERNATIONAL_FOOTER_KEYS.map((key) => t(`footerNotice.${key}`, "")).filter(Boolean);
}

export function getFooterNoticeTitle(t, locale, countryCode) {
  if (shouldUseUaeFooter(locale)) {
    return "";
  }

  const region = getRegionFromLocale(locale);

  if (region === "vu") {
    return getEntityRegionalFooterTitle(t, "footerNoticeVu");
  }

  if (region === "mu") {
    return getEntityRegionalFooterTitle(t, "footerNoticeMu");
  }

  if (region === "za" || shouldUseZaFooter(locale, countryCode)) {
    return t("footerNoticeZa.title", "");
  }

  if (shouldUseVuFooter(locale, countryCode)) {
    return getEntityRegionalFooterTitle(t, "footerNoticeVu");
  }

  if (shouldUseMuFooter(locale, countryCode)) {
    return getEntityRegionalFooterTitle(t, "footerNoticeMu");
  }

  return t("footerNotice.title", "");
}

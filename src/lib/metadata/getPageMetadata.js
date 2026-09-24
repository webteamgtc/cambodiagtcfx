import { getCanonicalUrl } from "@/lib/canonicalUrl";
import enMessages from "@/translation/en.json";
import { locales, localeHreflang, localeOpenGraph } from "@/i18n/config";
import { ENGLISH_REGIONAL_LOCALE, DEFAULT_SITE_LOCALE } from "@/i18n/regionalLocale";
import { getDictionary } from "@/i18n/request";

const defaultMetaData = enMessages?.metaData || enMessages?.metadata || {};

const DEFAULT_METADATA = {
  title: "GTC FX",
  description: "Trading & Finance",
};

const SITE_ORIGIN = "https://www.gtcfx.com";
const DEFAULT_OG_IMAGE = "/gtcfx.png";

function resolveOgImageUrl(imagePath, locale) {
  if (typeof imagePath === "string" && imagePath.startsWith("http")) {
    return imagePath;
  }
  if (typeof imagePath === "string" && imagePath.startsWith("/")) {
    return `${SITE_ORIGIN}${imagePath}`;
  }
  return getCanonicalUrl(locale, imagePath);
}

export async function getPageMetadata({
  locale = "km-intl",
  key,
  dict: dictProp = null,
  path = "",
  fallbackTitle = DEFAULT_METADATA.title,
  fallbackDescription = DEFAULT_METADATA.description,
  fallbackImage = DEFAULT_OG_IMAGE,
  /** When set, wins over JSON/dict `key` title (e.g. Strapi post title). */
  overrideTitle,
  /** When set, wins over JSON/dict `key` description. */
  overrideDescription,
  /** Absolute image URL for OG/Twitter (e.g. Strapi media). */
  overrideOgImageUrl,
}) {
  const dict = dictProp ?? (await getDictionary(locale));
  const dictMetaRoot = dict?.metaData || dict?.metadata || {};
  const pageMeta = defaultMetaData?.[key];
  const dictMeta = dictMetaRoot?.[key];
  const title =
    (typeof overrideTitle === "string" && overrideTitle.trim()) ||
    dictMeta?.title ||
    pageMeta?.title ||
    fallbackTitle;
  const description =
    (typeof overrideDescription === "string" && overrideDescription.trim()) ||
    dictMeta?.des ||
    pageMeta?.des ||
    fallbackDescription;
  const canonical = getCanonicalUrl(locale, path);
  const ogImage =
    typeof overrideOgImageUrl === "string" && overrideOgImageUrl.startsWith("http")
      ? overrideOgImageUrl
      : resolveOgImageUrl(fallbackImage, locale);
  const cleanPath = String(path || "").replace(/^\/+|\/+$/g, "");
  const isBlogPage =
    /^blogs(\/|$)/.test(cleanPath) ||
    /^latest-news(\/|$)/.test(cleanPath) ||
    /^company-news(\/|$)/.test(cleanPath) ||
    /^research(\/|$)/.test(cleanPath);

  const languageAlternates = isBlogPage
    ? { en: getCanonicalUrl(ENGLISH_REGIONAL_LOCALE, cleanPath) }
    : buildLanguageAlternates(cleanPath);

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        ...languageAlternates,
        "x-default": getCanonicalUrl(DEFAULT_SITE_LOCALE, cleanPath),
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "GTCFX",
      type:
        typeof overrideTitle === "string" && overrideTitle.trim()
          ? "article"
          : "website",
      locale: localeOpenGraph[locale] || "en_US",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

/** One URL per hreflang tag — prefer `{lang}-intl` over other regional variants. */
function buildLanguageAlternates(cleanPath) {
  const alternates = {};
  const sortedLocales = [...locales].sort((a, b) => {
    const rank = (locale) => {
      if (locale.endsWith("-intl")) return 0;
      if (!locale.includes("-")) return 1;
      return 2;
    };
    return rank(a) - rank(b);
  });

  for (const lc of sortedLocales) {
    const tag = localeHreflang[lc] || lc;
    if (!alternates[tag]) {
      alternates[tag] = getCanonicalUrl(lc, cleanPath);
    }
  }

  return alternates;
}


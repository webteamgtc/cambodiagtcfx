import { notFound } from "next/navigation";
import { FiDownload } from "react-icons/fi";
import { getDictionary } from "@/i18n/request";
import { getPageMetadata } from "@/lib/metadata/getPageMetadata";
import {
  getPlatformGuideFromDrive,
  PLATFORM_DRIVE_FOLDERS,
  createSlug,
} from "@/lib/platform-guide/googleDrive";
import { normalizePlatformGuideLocale } from "@/lib/platform-guide/locales";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PLATFORM_LABEL_FALLBACKS = {
  gtcgo: "GTCFX: GTC Go App Tutorial",
  gettingStarted: "GTCFX Client Portal Tutorial",
};

function resolveGuideLocale(pageLocale, guideLangParam) {
  if (guideLangParam) {
    return normalizePlatformGuideLocale(guideLangParam);
  }

  return normalizePlatformGuideLocale(pageLocale);
}

/** Platform labels are authored in en / km message bundles. */
function resolveMessagesLocale(guideLocale) {
  const code = normalizePlatformGuideLocale(guideLocale);
  if (code === "km") return "km";
  return "en";
}

function getPlatformLabel(dict, platform) {
  return (
    dict?.platformGuidePage?.platforms?.[platform] ||
    PLATFORM_LABEL_FALLBACKS[platform] ||
    platform
  );
}

function normalizePlatform(platform) {
  const value = String(platform || "gtcgo").trim();
  for (const key of Object.keys(PLATFORM_DRIVE_FOLDERS)) {
    if (key.toLowerCase() === value.toLowerCase()) return key;
  }
  return null;
}

/** Decode + normalize slug from the URL so Arabic / encoded paths still match. */
function normalizeGuideSlugParam(slug) {
  let value = Array.isArray(slug) ? slug.join("/") : String(slug || "");

  for (let i = 0; i < 2; i += 1) {
    try {
      const decoded = decodeURIComponent(value);
      if (decoded === value) break;
      value = decoded;
    } catch {
      break;
    }
  }

  return createSlug(value.normalize("NFC"));
}

async function findGuideItem({ locale, platform, slug }) {
  const rootFolderId = PLATFORM_DRIVE_FOLDERS[platform];
  if (!rootFolderId) return null;

  const normalizedSlug = normalizeGuideSlugParam(slug);

  let data = await getPlatformGuideFromDrive(rootFolderId, locale);

  if (locale !== "en" && data.png.length === 0 && data.pdf.length === 0) {
    data = await getPlatformGuideFromDrive(rootFolderId, "en");
  }

  const items = [...data.png, ...data.pdf];
  return (
    items.find((item) => item.slug === normalizedSlug) ||
    items.find((item) => item.slug === String(slug || "")) ||
    items.find((item) => item.id === normalizedSlug) ||
    items.find((item) => createSlug(item.title) === normalizedSlug) ||
    null
  );
}

export async function generateMetadata({ params, searchParams }) {
  const { locale, platform: platformParam, slug } = await params;
  const { lang: guideLangParam } = await searchParams;
  const platform = normalizePlatform(platformParam);
  const normalizedLocale = resolveGuideLocale(locale, guideLangParam);

  if (!platform) {
    return getPageMetadata({
      locale: normalizedLocale,
      key: "knowledge-to-learn/platform-guide",
      path: `knowledge-to-learn/platform-guide/${platformParam}/${slug}`,
      fallbackTitle: "Platform Guide | GTCFX",
      fallbackDescription: "GTCFX platform guide details.",
    });
  }

  try {
    const item = await findGuideItem({
      locale: normalizedLocale,
      platform,
      slug,
    });

    return getPageMetadata({
      locale: normalizedLocale,
      key: "knowledge-to-learn/platform-guide",
      path: `knowledge-to-learn/platform-guide/${platform}/${slug}`,
      fallbackTitle: item
        ? `${item.title} | GTCFX Platform Guides`
        : "Platform Guide | GTCFX",
      fallbackDescription: item
        ? `View the full ${item.type === "pdf" ? "PDF" : "image"} guide: ${item.title}.`
        : "GTCFX platform guide details.",
    });
  } catch {
    return getPageMetadata({
      locale: normalizedLocale,
      key: "knowledge-to-learn/platform-guide",
      path: `knowledge-to-learn/platform-guide/${platform}/${slug}`,
      fallbackTitle: "Platform Guide | GTCFX",
      fallbackDescription: "GTCFX platform guide details.",
    });
  }
}

export default async function PlatformGuideDetailPage({ params, searchParams }) {
  const { locale, platform: platformParam, slug } = await params;
  const { lang: guideLangParam } = await searchParams;
  const platform = normalizePlatform(platformParam);
  const normalizedLocale = resolveGuideLocale(locale, guideLangParam);

  if (!platform) notFound();

  let item = null;
  try {
    item = await findGuideItem({
      locale: normalizedLocale,
      platform,
      slug,
    });
  } catch (error) {
    console.error("Platform guide detail error:", error);
  }

  if (!item) notFound();

  const dict = await getDictionary(resolveMessagesLocale(normalizedLocale));
  const platformLabel = getPlatformLabel(dict, platform);
  const downloadPdfLabel =
    dict?.platformGuidePage?.downloadPdf || "Download PDF";
  const isRtl = normalizedLocale === "ar";

  return (
    <section className="bg-white py-10 md:py-16">
      <div className="container">
        <div
          className={isRtl ? "text-right" : "text-left"}
          dir={isRtl ? "rtl" : "ltr"}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#293B93]">
            {platformLabel}
          </p>
          <h1 className="HeadingH2 mt-2 text-[#111827]">{item.title}</h1>

          {item.type === "pdf" ? (
            <div
              className={`mt-6 flex flex-wrap items-center gap-3 ${
                isRtl ? "justify-start" : "justify-start"
              }`}
            >
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#293B93] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1E2D77] hover:no-underline"
              >
                <FiDownload className="h-4 w-4" />
                {downloadPdfLabel}
              </a>
            </div>
          ) : null}

          <div className="mt-8 overflow-hidden rounded-2xl border border-[#E1E7F6] bg-[#F8F9FC]" dir="ltr">
            {item.type === "png" ? (
              <img
                src={item.previewUrl || item.thumbnail}
                alt={item.title}
                className="mx-auto block h-auto w-full max-w-full object-contain"
                referrerPolicy="no-referrer"
              />
            ) : (
              <iframe
                title={item.title}
                src={item.previewUrl}
                className="block h-[min(80vh,900px)] w-full bg-white"
                allow="autoplay"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

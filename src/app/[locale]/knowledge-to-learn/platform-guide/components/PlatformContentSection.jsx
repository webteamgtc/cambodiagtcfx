"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiArrowRight, FiChevronDown, FiDownload } from "react-icons/fi";
import { useLocale } from "@/app/[locale]/LocaleProvider";
import { localizedHref } from "@/i18n/localizedHref";
import { normalizePlatformGuideLocale } from "@/lib/platform-guide/locales";
import { useGuidePageTranslation } from "../hooks/useGuidePageTranslation";
import { usePlatformGuideHook } from "../hooks/usePlatformGuideHook";
import { usePlatformGuideVideosHook } from "../hooks/usePlatformGuideVideosHook";

/* ── Main Tab Icons ── */

function DocumentAppIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="10"
        y="6"
        width="28"
        height="36"
        rx="3"
        stroke="currentColor"
        strokeWidth="2.2"
      />
      <path
        d="M16 16H26"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16 22H32"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16 28H32"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16 34H26"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MonitorBookIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="6"
        y="6"
        width="36"
        height="26"
        rx="3"
        stroke="currentColor"
        strokeWidth="2.2"
      />
      <line
        x1="18"
        y1="38"
        x2="30"
        y2="38"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <line
        x1="24"
        y1="32"
        x2="24"
        y2="38"
        stroke="currentColor"
        strokeWidth="2.2"
      />
      <path
        d="M24 13L16 17L24 21L32 17L24 13Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

/* ── PDF Icon (Acrobat-style) ── */

function PdfIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 6C12 5.44772 12.4477 5 13 5H26L36 15V43C36 43.5523 35.5523 44 35 44H13C12.4477 44 12 43.5523 12 43V6Z"
        fill="#E74C3C"
      />
      <path d="M26 5L36 15H27C26.4477 15 26 14.5523 26 14V5Z" fill="#C0392B" />
      <path
        d="M18 28C18 28 20 32 24 32C28 32 30 28 30 28"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M24 24V34"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M21 36C21 36 23 34 24 34C25 34 27 36 27 36"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function guideDetailHref(locale, platform, slug, guideLocale) {
  const base =
    localizedHref(
      locale,
      `/knowledge-to-learn/platform-guide/${platform}/${slug}`
    ) || `/knowledge-to-learn/platform-guide/${platform}/${slug}`;

  const params = new URLSearchParams();
  const normalizedGuideLocale = normalizePlatformGuideLocale(guideLocale);

  if (normalizedGuideLocale) {
    params.set("lang", normalizedGuideLocale);
  }

  const query = params.toString();
  return query ? `${base}?${query}` : base;
}

function PlayCircleIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="24" cy="24" r="20" fill="white" fillOpacity="0.95" />
      <circle
        cx="24"
        cy="24"
        r="20"
        stroke="#293B93"
        strokeOpacity="0.15"
        strokeWidth="1.5"
      />
      <path d="M20 16L33 24L20 32V16Z" fill="#293B93" />
    </svg>
  );
}

function VideoCard({ title, thumbnail, watchLabel, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full flex-col text-start"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-[#E8EBF2] bg-[#D9D9D9]">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : null}
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <PlayCircleIcon className="h-14 w-14" />
        </span>
      </div>
      <h3 className="mt-4 text-sm font-bold text-[#111827] sm:text-base">{title}</h3>
      <span className="mt-2 text-sm font-medium text-[#293B93]">{watchLabel}</span>
      <div className="mt-3 h-px w-full bg-[#E5E5E5]" />
    </button>
  );
}

function VideoPlayerModal({ video, closeLabel, onClose }) {
  if (!video) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label={closeLabel}
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
      />
      <div className="relative z-[101] w-full max-w-4xl overflow-hidden rounded-2xl bg-black shadow-2xl">
        <div className="flex items-center justify-between gap-4 bg-[#111827] px-4 py-3 text-white">
          <p className="truncate text-sm font-medium">{video.title}</p>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-full px-3 py-1 text-xs font-semibold text-white/90 transition hover:bg-white/10"
          >
            {closeLabel}
          </button>
        </div>
        <div className="aspect-video w-full">
          <iframe
            title={video.title}
            src={`${video.embedUrl}?autoplay=1`}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

/**
 * Guide cover card — cropped to blue top portion of the graphic.
 * Full image / PDF opens on the detail page.
 */
function GuideCoverCard({ title, href, imageSrc }) {
  return (
    <Link href={href} className="group flex flex-col hover:no-underline">
      {/* Fixed crop height: only blue branded top of the guide art is visible */}
      <div className="relative h-[180px] w-full overflow-hidden rounded-xl border border-[#E8EBF2] bg-[#F7F8FA] sm:h-[250px] lg:h-[285px]">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={title}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            className="absolute inset-0 h-[220%] w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[#293B93]/5">
            <PdfIcon className="h-10 w-10" />
          </div>
        )}
      </div>
      <h3 className="mt-4 text-[11px] font-bold text-[#111827] sm:text-base">
        {title} 
      </h3>
      <div className="mt-3 h-px w-full bg-[#E5E5E5]" />
    </Link>
  );
}

function PdfCard({ title, href, viewPdfLabel = "View PDF" }) {
  return (
    <Link
      href={href}
      className="flex h-full flex-col items-center rounded-xl border border-[#E5E7EB] bg-white px-6 py-8 text-center transition-shadow duration-300 hover:shadow-md hover:no-underline"
    >
      <span className="flex h-16 w-16 items-center justify-center rounded-full border border-[#E5E7EB]">
        <PdfIcon className="h-9 w-9" />
      </span>
      <h3 className="mt-4 text-sm font-semibold leading-snug text-[#111827] sm:text-base">
        {title}
      </h3>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#293B93]">
        <FiDownload className="h-4 w-4" />
        {viewPdfLabel}
      </span>
    </Link>
  );
}

function LoadingGrid({ count = 4, variant = "cover" }) {
  if (variant === "pdf") {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="flex animate-pulse flex-col items-center rounded-xl border border-[#E5E7EB] bg-white px-6 py-8"
          >
            <div className="h-16 w-16 rounded-full bg-[#E5E7EB]" />
            <div className="mt-4 h-4 w-3/4 rounded bg-[#E5E7EB]" />
            <div className="mt-4 h-4 w-24 rounded bg-[#E5E7EB]" />
          </div>
        ))}
      </div>
    );
  }

  if (variant === "video") {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="aspect-[16/10] rounded-xl bg-[#E5E7EB]" />
            <div className="mt-4 h-4 w-3/4 rounded bg-[#E5E7EB]" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="h-[160px] rounded-xl bg-[#E5E7EB] sm:h-[180px] lg:h-[200px]" />
          <div className="mt-4 h-4 w-3/4 rounded bg-[#E5E7EB]" />
        </div>
      ))}
    </div>
  );
}

const VISIBLE_PDF_COUNT = 6;

const MAIN_TABS = [
  { key: "gtcgo", labelKey: "platforms.gtcgo", fallback: "GTCFX: GTC Go App Tutorial", Icon: DocumentAppIcon },
  {
    key: "gettingStarted",
    labelKey: "platforms.gettingStarted",
    fallback: "GTCFX Client Portal Tutorial",
    Icon: MonitorBookIcon,
  },
];

const BASE_SUB_TABS = [
  { key: "png", label: "PNG" },
  { key: "pdf", label: "PDF" },
];

const VIDEO_SUB_TAB = { key: "video", label: "Video" };

function MainTabButton({ active, Icon, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-2xl px-5 py-2 text-start transition-all duration-300 sm:px-6 sm:py-3 ${
        active
          ? "bg-[#293B93] text-white shadow-md"
          : "bg-[#F5F5F5] text-[#111827] hover:bg-[#EBEBEB]"
      }`}
    >
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
          active ? "bg-white/15" : "bg-white"
        }`}
      >
        <Icon className="h-6 w-6" />
      </span>
      <span className="HeadingH5 font-bold">{label}</span>
    </button>
  );
}

function SubTabButton({ active, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 pb-3 text-sm font-medium transition-colors duration-200 ${
        active ? "text-[#293B93]" : "text-[#999999] hover:text-[#666666]"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full transition-colors duration-200 ${
          active ? "bg-[#293B93]" : "bg-transparent"
        }`}
      />
      {label}
    </button>
  );
}

const GUIDE_LANGUAGE_OPTIONS = [
  { code: "en", label: "EN", enabled: true },
  { code: "ar", label: "AR", enabled: true },
  { code: "zh", label: "ZH", enabled: true },
  { code: "es", label: "ES", enabled: true },
  { code: "vi", label: "VI", enabled: true },
  { code: "fr", label: "FR", enabled: true },
];

function GuideLanguageFilter({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const activeLabel =
    GUIDE_LANGUAGE_OPTIONS.find((item) => item.code === value)?.label || "EN";

  return (
    <div className="relative shrink-0 self-start sm:self-auto">
      <button
        type="button"
        aria-expanded={open}
        aria-label="Filter guides by language"
        onClick={() => setOpen((current) => !current)}
        className="inline-flex items-center gap-2 mb-2 rounded-md border border-[#E1E7F6] bg-white px-4 py-2 text-sm font-medium text-[#111827] transition hover:border-[#293B93]/30 hover:bg-[#F7F8FC]"
      >
        
        <span className="font-semibold text-[#293B93]">{activeLabel}</span>
        <FiChevronDown
          className={`h-4 w-4 text-[#666666] transition ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Close language menu"
            className="fixed inset-0 z-10 cursor-default"
            onClick={() => setOpen(false)}
          />
          <div className="absolute end-0 top-full z-20 mt-2 min-w-[120px] overflow-hidden rounded-xl border border-[#E1E7F6] bg-white py-1 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
            {GUIDE_LANGUAGE_OPTIONS.map((item) => (
              <button
                key={item.code}
                type="button"
                disabled={!item.enabled}
                onClick={() => {
                  if (!item.enabled) return;
                  onChange(item.code);
                  setOpen(false);
                }}
                className={`block w-full px-4 py-2.5 text-start text-sm transition ${
                  item.enabled
                    ? item.code === value
                      ? "bg-[#F3F4F8] font-semibold text-[#293B93] hover:bg-[#F7F8FC]"
                      : "font-medium text-[#111827] hover:bg-[#F7F8FC]"
                    : "cursor-not-allowed font-medium text-[#A0A7B5]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function PlatformContentSection({ locale: localeProp = "en" }) {
  const localeFromProvider = useLocale();
  const locale = localeProp || localeFromProvider || "en";
  const [mainTab, setMainTab] = useState("gtcgo");
  const [subTab, setSubTab] = useState("png");
  const [showAllPdf, setShowAllPdf] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const [guideLocale, setGuideLocale] = useState(() =>
    normalizePlatformGuideLocale(locale)
  );
  const t = useGuidePageTranslation(guideLocale);
  const isRtl = false;
  const isClientPortalTab = mainTab === "gettingStarted";
  const subTabs = isClientPortalTab
    ? [...BASE_SUB_TABS, VIDEO_SUB_TAB]
    : BASE_SUB_TABS;

  const { data, loading, error } = usePlatformGuideHook(guideLocale, mainTab);
  const {
    videos,
    loading: videosLoading,
    error: videosError,
  } = usePlatformGuideVideosHook(guideLocale, isClientPortalTab);

  useEffect(() => {
    setGuideLocale(normalizePlatformGuideLocale(locale));
  }, [locale]);

  useEffect(() => {
    if (!isClientPortalTab && subTab === "video") {
      setSubTab("png");
      setActiveVideo(null);
    }
  }, [isClientPortalTab, subTab]);

  useEffect(() => {
    if (loading) return;
    if (subTab === "png" && data.png.length === 0 && data.pdf.length > 0) {
      setSubTab("pdf");
    } else if (subTab === "pdf" && data.pdf.length === 0 && data.png.length > 0) {
      setSubTab("png");
    }
  }, [loading, data.png.length, data.pdf.length, subTab]);

  const visiblePdfItems = showAllPdf
    ? data.pdf
    : data.pdf.slice(0, VISIBLE_PDF_COUNT);
  const hasMorePdf = data.pdf.length > VISIBLE_PDF_COUNT;
  const showDriveLoading = loading && subTab !== "video";
  const showVideoLoading = subTab === "video" && videosLoading;
  const showLoading = showDriveLoading || showVideoLoading;
  const activeError = subTab === "video" ? videosError : error;

  return (
    <section className="bg-white py-16 md:py-20">
      <div
        className="container"
        dir={isRtl ? "rtl" : "ltr"}
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          {MAIN_TABS.map((tab) => (
            <MainTabButton
              key={tab.key}
              active={mainTab === tab.key}
              Icon={tab.Icon}
              label={t(tab.labelKey, tab.fallback)}
              onClick={() => {
                setMainTab(tab.key);
                setSubTab("png");
                setShowAllPdf(false);
                setActiveVideo(null);
              }}
            />
          ))}
        </div>

        <div className="mt-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-6">
              {subTabs.map((tab) => (
                <SubTabButton
                  key={tab.key}
                  active={subTab === tab.key}
                  label={tab.label}
                  onClick={() => {
                    setSubTab(tab.key);
                    setActiveVideo(null);
                  }}
                />
              ))}
            </div>
            <GuideLanguageFilter
              value={guideLocale}
              onChange={(nextLocale) => {
                setGuideLocale(nextLocale);
                setShowAllPdf(false);
                setActiveVideo(null);
              }}
            />
          </div>
          <div className="h-px w-full bg-[#E5E5E5]" />
        </div>

        <div className="mt-10">
          {showLoading && (
            <LoadingGrid
              count={subTab === "pdf" ? 3 : subTab === "video" ? 3 : 4}
              variant={subTab}
            />
          )}

          {!showLoading && activeError && (
            <p className="text-center text-sm text-[#666666]">
              {subTab === "video" && typeof activeError === "string"
                ? activeError
                : t(
                    "loadError",
                    "Unable to load platform guide content. Please try again later."
                  )}
            </p>
          )}

          {!showLoading && !activeError && subTab === "png" && data.png.length === 0 && (
            <p className="text-center text-sm text-[#666666]">
              {t("emptyPng", "No PNG guides available yet.")}
            </p>
          )}

          {!showLoading && !activeError && subTab === "pdf" && data.pdf.length === 0 && (
            <p className="text-center text-sm text-[#666666]">
              {t("emptyPdf", "No PDF guides available yet.")}
            </p>
          )}

          {!showLoading && !activeError && subTab === "video" && videos.length === 0 && (
            <p className="text-center text-sm text-[#666666]">
              {t("emptyVideo", "No tutorial videos available yet.")}
            </p>
          )}

          {!showLoading && subTab === "png" && data.png.length > 0 && (
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
              {data.png.map((item) => (
                <GuideCoverCard
                  key={item.id}
                  title={item.title}
                  href={guideDetailHref(locale, mainTab, item.slug, guideLocale)}
                  imageSrc={item.thumbnail}
                />
              ))}
            </div>
          )}

          {!showLoading && subTab === "pdf" && data.pdf.length > 0 && (
            <div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                {visiblePdfItems.map((item) => (
                  <PdfCard
                    key={item.id || item.url}
                    title={item.title}
                    href={guideDetailHref(locale, mainTab, item.slug, guideLocale)}
                    viewPdfLabel={t("viewPdf", "View PDF")}
                  />
                ))}
              </div>

              {hasMorePdf && !showAllPdf && (
                <div className="mt-10 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setShowAllPdf(true)}
                    className="inline-flex items-center gap-2 rounded-full border border-[#293B93] px-7 py-3 text-sm font-semibold text-[#293B93] transition hover:bg-[#f7f8fc]"
                  >
                    {t("showAll", "Show All")}
                    <FiArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {!showLoading && subTab === "video" && videos.length > 0 && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {videos.map((video) => (
                <VideoCard
                  key={video.id}
                  title={video.title}
                  thumbnail={video.thumbnail}
                  watchLabel={t("watchVideo", "Watch video")}
                  onClick={() => setActiveVideo(video)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <VideoPlayerModal
        video={activeVideo}
        closeLabel={t("closeVideo", "Close video")}
        onClose={() => setActiveVideo(null)}
      />
    </section>
  );
}

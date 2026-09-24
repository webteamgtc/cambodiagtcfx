"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useMemo, useState } from "react";
import { defaultLocale } from "@/i18n/config";
import {
  ENGLISH_REGIONAL_LOCALE,
  KHMER_REGIONAL_LOCALE,
  KHMER_LOCALE,
  SITE_ALLOWED_BASE_LANGUAGES,
  getBaseLanguage,
  resolveRegionalLocale,
} from "@/i18n/regionalLocale";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";
import { GB, KH } from "country-flag-icons/react/1x1";

const LOCALE_PATH_PREFIXES = new Set([
  ENGLISH_REGIONAL_LOCALE,
  KHMER_REGIONAL_LOCALE,
  KHMER_LOCALE,
  "en",
]);

function stripLocalePrefix(pathname) {
  if (!pathname) pathname = "/";
  const segments = pathname.split("/").filter(Boolean);

  if (
    segments.length > 0 &&
    LOCALE_PATH_PREFIXES.has(segments[0].toLowerCase())
  ) {
    segments.shift();
  }

  return segments.length ? `/${segments.join("/")}` : "/";
}

function getLocalizedPath(pathname, targetLocale) {
  const cleanPath = stripLocalePrefix(pathname);
  const effectiveLocale = resolveRegionalLocale(targetLocale);

  return cleanPath === "/"
    ? `/${effectiveLocale}`
    : `/${effectiveLocale}${cleanPath}`;
}

const FLAG_ICONS = {
  en: GB,
  km: KH,
};

function LocaleIcon({ code, alt }) {
  if (String(code || "").toLowerCase() === "en") {
    return (
      <span className="inline-flex h-full w-full items-center justify-center rounded-full bg-[#e6edf8] text-[#2f4666]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-[70%] w-[70%]"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18" />
          <path d="M12 3a13 13 0 0 1 0 18" />
          <path d="M12 3a13 13 0 0 0 0 18" />
        </svg>
      </span>
    );
  }

  const FlagIcon = FLAG_ICONS[String(code || "").toLowerCase()];
  if (!FlagIcon) return null;

  return (
    <FlagIcon
      title={alt}
      aria-label={alt}
      className="block h-full w-full"
    />
  );
}

function buildLanguages(t) {
  return SITE_ALLOWED_BASE_LANGUAGES.map((code) => ({
    code,
    label: t(`languages.${code}.label`),
    name: t(`languages.${code}.label`),
    sub: t(`languages.${code}.sub`),
    flagAlt: t(`languages.${code}.label`),
  }));
}

export function LanguageDrawerPanel({
  locale = defaultLocale,
  variant = "desktop",
  onClose,
  hideHeader = false,
  showMobileClose = false,
  compactMobile = true,
}) {
  const pathname = usePathname();
  const t = usePathTranslation("common.languageSwitcher");

  const DRAWER_LANGUAGES = useMemo(() => buildLanguages(t), [t]);

  const isMobile = variant === "mobile";
  const isInline = variant === "mobile-inline";
  const isDropdown = variant === "mobile-dropdown";
  const isDesktopDropdown = variant === "desktop-dropdown";
  const isMobileLike = isMobile || isInline || isDropdown;
  const useCompactGrid = isMobileLike && compactMobile;
  const showPanelHeader = !hideHeader && !isDesktopDropdown;

  if (isDesktopDropdown) {
    return (
      <div className="absolute right-0 top-[calc(100%+8px)] z-[70] w-max">
        <div className="rounded-[14px] border border-[#e8e8e8] bg-white p-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.1)]">
          <div className="flex items-stretch gap-1.5">
            {DRAWER_LANGUAGES.map((lang) => {
              const isActive = getBaseLanguage(locale) === lang.code;

              return (
                <Link
                  key={lang.code}
                  href={getLocalizedPath(pathname, lang.code)}
                  onClick={() => onClose?.()}
                  className={`inline-flex min-w-[96px] items-center justify-center gap-2 rounded-[10px] border px-3 py-2.5 transition-colors duration-200 ${
                    isActive
                      ? "border-[#cfd4e3] bg-[#f7f8fc]"
                      : "border-[#ececec] bg-white hover:bg-[#f7f7f7]"
                  }`}
                >
                  <span className="inline-flex h-5 w-5 shrink-0 overflow-hidden rounded-full">
                    <LocaleIcon code={lang.code} alt={lang.flagAlt} />
                  </span>
                  <span className="whitespace-nowrap text-[13px] font-medium leading-none text-[#111827]">
                    {lang.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  const content = (
    <div
      className={`${
        isInline
          ? ""
          : isDesktopDropdown
            ? "rounded-[12px] border border-[#ececec] bg-white p-2 shadow-[0_12px_30px_rgba(0,0,0,0.12)]"
            : "bg-white pb-4 pt-4 shadow-[0_20px_40px_rgba(0,0,0,0.08)] md:pb-10 md:pt-8"
      }`}
    >
      {showPanelHeader && (
        <div className="md:mb-6 mb-3 container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-dark text-[18px]">
              {t("title")}
            </span>
          </div>

          {isMobile && showMobileClose ? (
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-6 w-6 items-center justify-center rounded-[5px] border border-[#d9d9d9] bg-white text-[#111827] hover:bg-[#f7f7f7]"
              aria-label={t("closeLabel")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 6l12 12M18 6L6 18"
                />
              </svg>
            </button>
          ) : (
            <div className="text-[12px] text-[#6b7280] md:text-[13px]">
              {t("currentLabel")}{" "}
              <span className="font-medium text-dark">
                {getBaseLanguage(locale)?.toUpperCase?.() || "EN"}
              </span>
            </div>
          )}
        </div>
      )}

      <div
        className={`${
          isInline ? "max-h-[320px]" : isMobile ? "max-h-[60vh]" : "max-h-[70vh]"
        } overflow-auto py-1 container mx-auto`}
      >
        <div
          className={`grid ${
            isDesktopDropdown
              ? "grid-cols-2 gap-1.5"
              : useCompactGrid
                ? "grid-cols-2 gap-2"
                : isMobile || isInline
                  ? "grid-cols-2"
                  : "grid-cols-2"
          } gap-x-4 gap-y-2`}
        >
          {DRAWER_LANGUAGES.map((lang) => {
            const isActive = getBaseLanguage(locale) === lang.code;

            return (
              <Link
                key={lang.code}
                href={getLocalizedPath(pathname, lang.code)}
                onClick={() => onClose?.()}
                className={
                  isDesktopDropdown
                    ? `flex items-center gap-2 rounded-[8px] border px-2 py-2 transition-colors duration-200 ${
                        isActive
                          ? "border-primary/30 bg-primary/5"
                          : "border-[#ececec] bg-white hover:bg-[#f7f7f7]"
                      }`
                    : useCompactGrid
                      ? `flex items-center justify-start gap-2 rounded-[10px] border px-2 py-3 transition-colors duration-200 md:rounded-[14px] ${
                          isActive
                            ? "border-primary/30 bg-primary/5"
                            : "border-[#ececec] bg-white hover:bg-[#f7f7f7]"
                        }`
                      : `flex items-center gap-3 rounded-[10px] px-3 py-2 transition-colors duration-200 md:rounded-[12px] ${
                          isActive
                            ? "bg-white ring-1 ring-primary/20"
                            : "hover:bg-white/70"
                        }`
                }
              >
                <span
                  className={`inline-flex shrink-0 overflow-hidden rounded-xl ${
                    isDesktopDropdown ? "h-5 w-5" : "h-6 w-6 md:h-7 md:w-7"
                  }`}
                >
                  <LocaleIcon code={lang.code} alt={lang.flagAlt} />
                </span>

                {useCompactGrid ? (
                  <span className="text-[12px] font-semibold leading-none text-[#111827]">
                    {lang.name}
                  </span>
                ) : (
                  <span className="min-w-0">
                    <span className="block truncate font-medium text-dark text-[14px]">
                      {lang.name}
                    </span>
                    <span className="block truncate text-[12px] text-[#6b7280]">
                      {lang.sub}
                    </span>
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );

  if (!isMobile && !isInline && !isDropdown) {
    return (
      <div className="absolute left-0 right-0 top-full z-40 hidden w-full md:block">
        {content}
      </div>
    );
  }

  if (isInline) {
    return <div className="md:mt-4">{content}</div>;
  }

  if (isDropdown) {
    return (
      <div className="absolute left-0 right-0 top-full z-50 mt-2 md:hidden">
        {content}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[60] md:hidden">
      <button
        type="button"
        className="absolute inset-0 bg-transparent"
        onClick={onClose}
        aria-label={t("closeLabel")}
      />
      <div className="absolute left-0 right-0 top-[60px] max-h-[calc(100vh-72px)] overflow-auto bg-white">
        {content}
      </div>
    </div>
  );
}

export default function LanguageSwitcher({
  locale = defaultLocale,
  mobile = false,
  disableMenu = false,
  mobileIcon = "chevron",
  mobilePanel = "overlay",
  onMobileClick,
}) {
  const pathname = usePathname();
  const t = usePathTranslation("common.languageSwitcher");
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const DRAWER_LANGUAGES = useMemo(() => buildLanguages(t), [t]);

  const currentLanguage =
    DRAWER_LANGUAGES.find((lang) => lang.code === getBaseLanguage(locale)) ||
    DRAWER_LANGUAGES[0];

  return (
    <div className="group relative">
      <button
        type="button"
        onClick={() => {
          if (mobile) {
            if (typeof onMobileClick === "function") return onMobileClick();
            if (mobilePanel !== "none") setMobileDrawerOpen((v) => !v);
          }
        }}
        className={`inline-flex items-center justify-center gap-2 rounded-[10px] transition-colors duration-200 ${
          mobile
            ? "h-10 border border-[#d9d9d9] bg-white px-3 text-[#111827] hover:bg-[#f7f7f7]"
            : "h-8 bg-primary px-3 text-white hover:opacity-90 xl:h-10"
        }`}
        aria-label={t("title")}
      >
        <span className="inline-flex h-5 w-5 shrink-0 overflow-hidden rounded-xl">
          <LocaleIcon
            code={currentLanguage.code}
            alt={currentLanguage.flagAlt}
          />
        </span>

        <span className="text-[14px] font-medium leading-none">
          {currentLanguage.label}
        </span>

        {mobile ? (
          mobileIcon === "hamburger" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 7h16M4 12h16M4 17h16"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          )
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
      </button>

      {!mobile && !disableMenu && (
        <div className="invisible absolute right-0 top-full z-50 mt-2 min-w-[128px] rounded-[12px] border border-[#e8e8e8] bg-white p-1.5 opacity-0 shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all duration-200 group-hover:visible group-hover:opacity-100">
          {DRAWER_LANGUAGES.map((lang) => {
            const isActive = getBaseLanguage(locale) === lang.code;

            return (
              <Link
                key={lang.code}
                href={getLocalizedPath(pathname, lang.code)}
                className={`flex items-center gap-3 rounded-[8px] px-3 py-2 text-[14px] transition-colors duration-200 ${
                  isActive
                    ? "bg-[#f3f6fb] font-medium text-primary"
                    : "text-primary hover:bg-[#f7f7f7]"
                }`}
              >
                <span className="inline-flex h-[18px] w-[18px] shrink-0 overflow-hidden rounded-xl">
                  <LocaleIcon code={lang.code} alt={lang.flagAlt} />
                </span>
                <span>{lang.label}</span>
              </Link>
            );
          })}
        </div>
      )}

      {mobile && mobileDrawerOpen && (
        <LanguageDrawerPanel
          locale={locale}
          variant={mobilePanel === "dropdown" ? "mobile-dropdown" : "mobile"}
          onClose={() => setMobileDrawerOpen(false)}
        />
      )}
    </div>
  );
}

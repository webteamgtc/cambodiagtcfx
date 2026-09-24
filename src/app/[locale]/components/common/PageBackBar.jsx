"use client";

import { useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { localeDir, locales } from "@/i18n/config";
import { localizedHref } from "@/i18n/localizedHref";
import { useLocale, usePathTranslation } from "../../LocaleProvider";
import { MENU_HUB_PATHS } from "./megaMenuData";

const MENU_HUB_SLUGS = Object.values(MENU_HUB_PATHS);

function normalizePath(pathname) {
  return pathname?.replace(/\/$/, "") || "/";
}

function humanizeSegment(segment) {
  return decodeURIComponent(segment)
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function buildCrumbs(pathname, locale) {
  const segments = normalizePath(pathname).split("/").filter(Boolean);
  // Drop the leading locale segment (e.g. "en", "ar") when present.
  const pathSegments =
    segments.length && locales.includes(segments[0])
      ? segments.slice(1)
      : segments;

  return [
    { slug: "home", href: localizedHref(locale, "/") },
    ...pathSegments.map((segment, index) => ({
      slug: segment,
      href: localizedHref(locale, `/${pathSegments.slice(0, index + 1).join("/")}`),
    })),
  ];
}

function isHomePage(pathname, locale) {
  if (!pathname) return true;
  return normalizePath(pathname) === normalizePath(localizedHref(locale, "/"));
}

function isMenuHubPage(pathname, locale) {
  if (!pathname) return false;
  const normalized = normalizePath(pathname);
  return MENU_HUB_SLUGS.some(
    (slug) => normalized === normalizePath(localizedHref(locale, `/${slug}`))
  );
}

function isLeaderboardDetailPage(pathname, locale) {
  if (!pathname) return false;
  const normalized = normalizePath(pathname);

  const leaderboardBase = normalizePath(
    localizedHref(locale, "/trading/copy-trading/leaderboard")
  );
  // Only hide breadcrumbs on individual leader pages (a slug under the base),
  // not on the leaderboard listing itself.
  if (normalized === leaderboardBase) return false;

  return normalized.startsWith(`${leaderboardBase}/`);
}

function isPlatformGuideDetailPage(pathname, locale) {
  if (!pathname) return false;
  const normalized = normalizePath(pathname);

  const guideBase = normalizePath(
    localizedHref(locale, "/knowledge-to-learn/platform-guide")
  );
  // Keep breadcrumbs on the listing page; hide only on /platform/[slug].
  if (normalized === guideBase) return false;

  return normalized.startsWith(`${guideBase}/`);
}

function isLiveAccountApplicationPage(pathname, locale) {
  if (!pathname) return false;
  const normalized = normalizePath(pathname);
  return (
    normalized === normalizePath(localizedHref(locale, "/live-account-application"))
  );
}

export default function PageBackBar() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const isRTL = localeDir[locale] === "rtl";
  const t = usePathTranslation("breadcrumbs");
  const a11y = usePathTranslation("common.a11y");

  const crumbLabel = (slug) => {
    const fallback = slug === "home" ? "Home" : humanizeSegment(slug);
    const key = slug === "home" ? "home" : `labels.${slug}`;
    return t(key, fallback) || fallback;
  };

  const handleBack = useCallback(() => {
    window.dispatchEvent(new CustomEvent("gtcfx:close-mega-menu"));

    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }
    router.push(localizedHref(locale, "/"));
  }, [locale, router]);

  if (
    isHomePage(pathname, locale) ||
    isMenuHubPage(pathname, locale) ||
    isLeaderboardDetailPage(pathname, locale) ||
    isPlatformGuideDetailPage(pathname, locale) ||
    isLiveAccountApplicationPage(pathname, locale)
  ) {
    return null;
  }

  const crumbs = buildCrumbs(pathname, locale);

  return (
    <div className="container relative md:flex hidden">
      <div className="absolute top-[26px] z-10 start-[12px] flex items-center gap-3">
        <nav aria-label={a11y("breadcrumb", "Breadcrumb")} className="min-w-0">
          <ol className="flex items-center gap-1.5 text-[13px] md:text-sm">
            {crumbs.map((crumb, index) => {
              const isLast = index === crumbs.length - 1;
              return (
                <li key={crumb.href} className="flex min-w-0 items-center gap-1.5">
                  {index > 0 && (
                    <svg
                      className={`h-3.5 w-3.5 shrink-0 text-gray-400 ${isRTL ? "scale-x-[-1]" : ""}`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                  {isLast ? (
                    <span
                      aria-current="page"
                      className="truncate font-semibold text-[#293a8c]"
                    >
                      {crumbLabel(crumb.slug)}
                    </span>
                  ) : (
                    <Link
                      href={crumb.href}
                      className="truncate text-gray-500 transition hover:text-[#293a8c]"
                    >
                      {crumbLabel(crumb.slug)}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
}

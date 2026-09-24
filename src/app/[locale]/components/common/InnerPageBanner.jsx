"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, defaultLocale, localeDir } from "@/i18n/config";
import { useLocale, usePathTranslation } from "../../LocaleProvider";

function formatLabel(slug) {
  if (!slug) return "";

  const customLabels = {
    "about-us": "About Us",
    "global-presence": "Global Presence",
    "contact-us": "Contact Us",
    "prime-tech": "Prime & Tech",
    "why-gtcfx": "Why GTCFX",
    "why-gtc-group": "Why GTCFX",
    faq: "FAQ",
    "glossary-faqs": "Glossary & FAQs",
    blogs: "Blogs",
    "cfd-trading": "Forex CFDs",
    metals: "Metals CFDs",
    "energy-cfds": "Energy CFDs",
  };

  if (customLabels[slug]) return customLabels[slug];

  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function InnerPageBanner({
  title,
  description = "",
  backgroundImage = "/images/banner/default-banner.webp",
  mobileBackgroundImage = "/images/banner/default-banner-mobile.webp",
  height = "min-h-[0px] md:min-h-[500px] lg:min-h-[450px]",
  overlay = true,
  align = "left",
  className = "",
}) {
  const pathname = usePathname();
  const locale = useLocale();
  const tBreadcrumb = usePathTranslation("breadcrumbs");
  const isRTL = localeDir[locale] === "rtl";
  const pathParts = pathname.split("/").filter(Boolean);

  const currentLocale = locales.includes(pathParts[0]) ? pathParts[0] : "";
  const segments = pathParts.filter((segment) => !locales.includes(segment));
  const breadcrumbSegments =
    segments.length > 1 ? segments.slice(0, -1) : segments;

  const homeHref =
    currentLocale && currentLocale !== defaultLocale
      ? `/${currentLocale}`
      : "/";

  const breadcrumbItems = [
    { label: tBreadcrumb("home", "Home"), href: homeHref },
    ...breadcrumbSegments.map((segment, index) => {
      const href =
        (currentLocale ? `/${currentLocale}` : "") +
        "/" +
        breadcrumbSegments.slice(0, index + 1).join("/");

      return {
        label: tBreadcrumb(`url.${segment}`, formatLabel(segment)),
        href,
      };
    }),
  ];

  const pageTitle =
    title ||
    tBreadcrumb(
      `url.${segments[segments.length - 1]}`,
      formatLabel(segments[segments.length - 1])
    ) ||
    "Page Title";

  const overlayGradient = overlay
    ? isRTL
      ? "linear-gradient(270deg, rgba(22,38,132,0.92) 0%, rgba(35,58,170,0.78) 35%, rgba(28,42,110,0.35) 62%, rgba(255,255,255,0.08) 100%)"
      : "linear-gradient(90deg, rgba(22,38,132,0.92) 0%, rgba(35,58,170,0.78) 35%, rgba(28,42,110,0.35) 62%, rgba(255,255,255,0.08) 100%)"
    : "";

  return (
    <section className={`relative overflow-hidden ${className}`}>
      <div className={`relative w-full ${height}`}>
        {/* Mobile Background */}
        <div
          className="absolute inset-0 block bg-cover bg-center bg-no-repeat md:hidden"
          style={{
            backgroundImage: overlayGradient
              ? `${overlayGradient}, url('${mobileBackgroundImage}')`
              : `url('${mobileBackgroundImage}')`,
            transform: isRTL ? "rotateY(180deg)" : undefined,
            transformOrigin: "center",

          }}
        />

        {/* Desktop Background */}
        <div
          className="absolute inset-0 hidden bg-cover bg-center bg-no-repeat md:block"
          style={{
            backgroundImage: overlayGradient
              ? `${overlayGradient}, url('${backgroundImage}')`
              : `url('${backgroundImage}')`,
            transform: isRTL ? "rotateY(180deg)" : undefined,
            transformOrigin: "center",
           }}
        />

        {/* Decorative bars */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-full opacity-[0.12]">
          <div className="absolute left-[2%] top-[20%] hidden h-[220px] w-[180px] md:block">
            <div className="flex h-full items-end gap-4">
              <span className="h-20 w-3 bg-white/70" />
              <span className="h-36 w-3 bg-white/50" />
              <span className="h-28 w-3 bg-white/35" />
              <span className="h-16 w-3 bg-white/40" />
              <span className="h-12 w-3 bg-white/25" />
              <span className="h-40 w-3 bg-white/35" />
            </div>
          </div>

          <div className="absolute left-[14%] top-[42%] hidden h-[200px] w-[420px] lg:block">
            <div className="flex h-full items-end gap-5">
              <span className="h-24 w-4 bg-white/30" />
              <span className="h-40 w-4 bg-white/18" />
              <span className="h-28 w-4 bg-white/24" />
              <span className="h-12 w-4 bg-white/20" />
              <span className="h-36 w-4 bg-white/15" />
              <span className="h-16 w-4 bg-white/22" />
              <span className="h-44 w-4 bg-white/18" />
              <span className="h-32 w-4 bg-white/20" />
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[78%] bg-gradient-to-b from-transparent via-white/20 to-white/95" />

        {/* Content */}
        <div className="relative z-10 container" dir={isRTL ? "rtl" : "ltr"}>
          <div className="flex min-h-[500px] items-start pt-24 md:min-h-[400px] md:pt-28 lg:min-h-[450px] lg:pt-32">
            <div
              className={`w-full max-w-[720px] ${
                align === "center"
                  ? "mx-auto text-center"
                  : isRTL
                  ? "text-right"
                  : "text-left"
              }`}
            >
              {/* Breadcrumb */}
              <div
                className={`mb-5 flex flex-wrap items-center gap-2 pt-16 text-sm font-semibold text-white md:text-base`}
              >
                {breadcrumbItems.map((item, index) => {
                  const isLast = index === breadcrumbItems.length - 1;

                  return (
                    <div
                      key={`${item.label}-${index}`}
                      className="flex items-center gap-2"
                    >
                      {!isLast ? (
                        <Link
                          href={item.href}
                          className="text-white transition hover:text-[#d7b082]"
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <span className="text-white/95">{item.label}</span>
                      )}

                      {!isLast && (
                        <span className="text-secondary">
                          {isRTL ? "←" : "→"}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Title */}
              <h1 className="HeadingH2 text-secondary">{pageTitle}</h1>

              {/* Description */}
              {description && (
                <p
                  className={`mt-5 max-w-[560px] text-base leading-7 text-white/95 md:text-lg md:leading-8 ${
                    align === "center" ? "mx-auto" : isRTL ? "ml-auto" : ""
                  }`}
                >
                  {description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
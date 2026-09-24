"use client";

import Link from "next/link";
import Image from "next/image";
import { localizedHref } from "@/i18n/localizedHref";
import StoreDownloadLink from "@/app/[locale]/components/common/StoreDownloadLink";

function isExternalLink(href = "") {
  return href.startsWith("http://") || href.startsWith("https://");
}

const APPLE_TIMING = "cubic-bezier(0.16, 1, 0.3, 1)";

/** Blue sidebar promo typography — smaller than global HeadingH3 / TextSmall */
const MEGA_MENU_PROMO_HEADING =
  "text-[18px] md:text-[20px] font-semibold leading-[1.2] text-white";
const MEGA_MENU_PROMO_BODY =
  "text-[14px] md:text-[15px] font-normal leading-[1.5] text-white";
const MEGA_MENU_PROMO_LINK =
  "text-[14px] md:text-[15px] font-normal leading-[1.4] text-white transition-opacity hover:text-white hover:opacity-85 hover:no-underline";
const MEGA_MENU_PROMO_CTA =
  "text-[15px] md:text-[16px] font-semibold text-white";

/** Fixed scroll area height for mega menu content */
const MEGA_MENU_MAX_HEIGHT = "min(70dvh, 640px)";

function motionStyle(delayMs) {
  return { transitionTimingFunction: APPLE_TIMING, transitionDelay: `${delayMs}ms` };
}

function fadeInClass(motionEnabled, motionVisible, durationMs = 300) {
  if (!motionEnabled) return "";
  return `transform-gpu transition-[opacity,transform] duration-[${durationMs}ms] ${motionVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
    }`;
}

function FxproSectionLabel({ children }) {
  return (
    <div className="mb-5">
      <h4 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#808080]">
        {children}
      </h4>
      <div
        className="mt-3 h-px w-full bg-[#E0E0E0]"
        aria-hidden
      />
    </div>
  );
}

function FxproLinkList({ groupKey, links, locale, linkClass, onLinkClick }) {
  return (
    <ul className="space-y-3.5">
      {links.map((link) => {
        const external = link.external || isExternalLink(link.href);
        const href = external ? link.href : localizedHref(locale, link.href);
        return (
          <li key={`${groupKey}-${link.label}`}>
            <Link
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className={linkClass}
              onClick={() => onLinkClick?.()}
            >
              {link.icon && <span className="mr-1.5 inline-block text-[#0052FF]">✦</span>}
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function FxproColumnSection({
  column,
  locale,
  linkClass,
  stacked = false,
  showDivider = false,
  onLinkClick,
}) {
  return (
    <div className={stacked && showDivider ? "mt-10" : ""}>
      <FxproSectionLabel>{column.heading}</FxproSectionLabel>
      {Array.isArray(column.groups) ? (
        <div className="space-y-6">
          {column.groups.map((group, idx) => (
            <div key={group.heading} className={idx > 0 ? "border-t border-[#E0E0E0] pt-5" : ""}>
              <h5 className="mb-3 text-[12px] font-semibold uppercase tracking-[0.04em] text-[#0052FF]">
                {group.heading}
              </h5>
              <FxproLinkList
                groupKey={group.heading}
                links={group.links}
                locale={locale}
                linkClass={linkClass}
                onLinkClick={onLinkClick}
              />
            </div>
          ))}
        </div>
      ) : (
        <FxproLinkList
          groupKey={column.heading}
          links={column.links}
          locale={locale}
          linkClass={linkClass}
          onLinkClick={onLinkClick}
        />
      )}
    </div>
  );
}

function FxproFeaturedPromoCard({ promo, locale, motionEnabled, motionVisible, onLinkClick }) {
  const heading = promo.heading || "";
  const description = promo.description || "";
  const ctaLabel = promo.ctaLabel;
  const bgSrc = "/new-design/bg-megamenu.svg";
  const external = promo.href && isExternalLink(promo.href);
  const href = promo.href
    ? external
      ? promo.href
      : localizedHref(locale, promo.href)
    : null;

  const card = (
    <div
      className={`relative flex min-h-full w-full min-w-[280px] max-w-[320px] flex-col justify-between overflow-hidden bg-gradient-to-b from-[#4B5FC1] to-[#293B93] px-8 py-10 lg:min-w-[300px] ${fadeInClass(motionEnabled, motionVisible)}`}
      style={motionEnabled ? motionStyle(motionVisible ? 100 : 0) : undefined}
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-5 h-[58%]">
        <Image src={bgSrc} alt="" fill className="object-contain object-bottom" sizes="320px" />
      </div>

      <div className="relative z-10">
        <h4 className={MEGA_MENU_PROMO_HEADING}>
          {heading}
        </h4>
        {description && (
          <p className={`mt-5 max-w-[240px] ${MEGA_MENU_PROMO_BODY}`}>
            {description}
          </p>
        )}
      </div>

      {href && (
        <div className="relative z-10 mt-10">
          <span
            className={`items-center justify-center w-full gap-2 rounded-[4px] bg-[#B48755] px-5 py-3 ${MEGA_MENU_PROMO_CTA} ${promo.ctaFullWidth ? "flex w-full justify-center" : "inline-flex"
              }`}
          >
            {ctaLabel}
            <span aria-hidden>→</span>
          </span>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="block h-full shrink-0 hover:no-underline"
        onClick={() => onLinkClick?.()}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {card}
      </Link>
    );
  }

  return <div className="h-full shrink-0">{card}</div>;
}

function CloudDownloadIcon({ className = "h-4 w-4 shrink-0" }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M10 2.5V11.25M10 11.25L7.1875 8.4375M10 11.25L12.8125 8.4375M4.375 13.125C2.71875 13.125 1.375 14.4688 1.375 16.125C1.375 17.7812 2.71875 19.125 4.375 19.125H15.625C17.2812 19.125 18.625 17.7812 18.625 16.125C18.625 14.4688 17.2812 13.125 15.625 13.125"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FxproPlatformDownloadsCard({ promo, locale, motionEnabled, motionVisible, onLinkClick }) {
  const heading = promo.heading;
  const downloads = Array.isArray(promo.downloads) ? promo.downloads : [];
  const qrSrc = promo.qrSrc || "/home/qrcode.svg";
  const bgSrc = "/new-design/bg-megamenu.svg";

  const card = (
    <div
      className={`flex min-h-full relative w-full min-w-[280px] max-w-[320px] flex-col bg-gradient-to-b from-[#4B5FC1] to-[#293B93] px-7 py-9 lg:min-w-[300px] lg:px-8 lg:py-10 ${fadeInClass(motionEnabled, motionVisible)}`}
      style={motionEnabled ? motionStyle(motionVisible ? 100 : 0) : undefined}
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-5 h-[58%]">
        <Image src={bgSrc} alt="" fill className="object-contain object-bottom" sizes="320px" />
      </div>
      <h4 className={MEGA_MENU_PROMO_HEADING}>{heading}</h4>

      <ul className="mt-5 space-y-2">
        {downloads.map((item) => {
          const external = item.external || isExternalLink(item.href);
          const href = external ? item.href : localizedHref(locale, item.href);
          return (
            <li key={item.label}>
              <Link
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className={`inline-flex items-center gap-3 ${MEGA_MENU_PROMO_LINK}`}
                onClick={() => onLinkClick?.()}
              >
                <CloudDownloadIcon />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="mt-6 flex items-center gap-4">
        <div className="relative h-[92px] w-[92px] shrink-0 overflow-hidden rounded-md bg-white p-2">
          <Image src={qrSrc} alt="" width={92} height={92} className="h-full w-full object-contain" />
        </div>
        <div className="flex flex-col gap-2.5">
          <StoreDownloadLink type="apple" className="inline-flex transition hover:opacity-90">
            <Image
              src="/new-design/app-white-new.svg"
              alt="Download on the App Store"
              width={120}
              height={36}
              className="h-9 w-auto"
            />
          </StoreDownloadLink>
          <StoreDownloadLink type="google" className="inline-flex transition hover:opacity-90">
            <Image
              src="/new-design/play-white-new.svg"
              alt="Get it on Google Play"
              width={120}
              height={36}
              className="h-9 w-auto"
            />
          </StoreDownloadLink>
        </div>
      </div>
    </div>
  );

  return <div className="h-full shrink-0">{card}</div>;
}

function FxproPromoCard({ promo, locale, motionEnabled, motionVisible, onLinkClick }) {
  const heading = promo.heading;
  const description = promo.description || promo.title || "";
  const qrSrc = promo.qrSrc || "/home/qrcode.svg";
  const showStores = promo.showStoreBadges === true;
  const external = promo.href && isExternalLink(promo.href);
  const href = promo.href
    ? external
      ? promo.href
      : localizedHref(locale, promo.href)
    : null;

  const inner = (
    <div
      className={`flex w-full max-w-[300px] flex-col bg-[#F9F9F9] p-6 lg:min-w-[280px] lg:p-7 ${fadeInClass(motionEnabled, motionVisible)}`}
      style={motionEnabled ? motionStyle(motionVisible ? 100 : 0) : undefined}
    >
      {!promo.imgOnly && (
        <FxproSectionLabel>{heading}</FxproSectionLabel>
      )}
      {!promo.imgOnly && description && (
        <p className="mb-5 text-[13px] leading-[1.5] text-[#1A1A1A]">{description}</p>
      )}
      <div className="flex items-center gap-4">
        {showStores && (
          <>
            <div className="relative h-[88px] w-[88px] shrink-0 overflow-hidden rounded-md bg-white p-1.5 shadow-sm ring-1 ring-[#E0E0E0]">
              <Image src={qrSrc} alt="" width={88} height={88} className="h-full w-full object-contain" />
            </div>
            <div className="flex flex-col gap-2.5">
              <StoreDownloadLink type="apple" className="inline-flex transition hover:opacity-90">
                <Image
                  src="/home/app-store.svg"
                  alt="Download on the App Store"
                  width={120}
                  height={36}
                  className="h-9 w-auto"
                />
              </StoreDownloadLink>
              <StoreDownloadLink type="google" className="inline-flex transition hover:opacity-90">
                <Image
                  src="/home/google-play.svg"
                  alt="Get it on Google Play"
                  width={120}
                  height={36}
                  className="h-9 w-auto"
                />
              </StoreDownloadLink>
            </div>
          </>
        )}
        {!showStores && !promo.imgOnly && promo.src && (
          <div className="relative h-[140px] w-full overflow-hidden rounded-lg">
            <Image src={promo.src} alt={promo.alt || ""} fill className="object-cover" sizes="300px" />
          </div>
        )}
        {!showStores && promo.imgOnly && (
          <div className="relative h-[250px] w-full overflow-hidden rounded-lg">
            <Image src={promo.src} alt={promo.alt || ""} fill className="object-cover" sizes="300px" />
          </div>
        )}
        {!showStores && !promo.imgOnly && !promo.src && (
          <div className="relative h-[88px] w-[88px] shrink-0 overflow-hidden rounded-md bg-white p-1.5 shadow-sm ring-1 ring-[#E0E0E0]">
            <Image src={qrSrc} alt="" width={88} height={88} className="h-full w-full object-contain" />
          </div>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="block shrink-0 hover:no-underline"
        onClick={() => onLinkClick?.()}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {inner}
      </Link>
    );
  }

  return <div className="shrink-0">{inner}</div>;
}

function isSidePromoVariant(variant) {
  return variant === "featured" || variant === "downloads";
}

function renderFxproPromoCard({ promo, locale, motionEnabled, motionVisible, onLinkClick }) {
  if (promo.variant === "featured") {
    return (
      <FxproFeaturedPromoCard
        promo={promo}
        locale={locale}
        motionEnabled={motionEnabled}
        motionVisible={motionVisible}
        onLinkClick={onLinkClick}
      />
    );
  }

  if (promo.variant === "downloads") {
    return (
      <FxproPlatformDownloadsCard
        promo={promo}
        locale={locale}
        motionEnabled={motionEnabled}
        motionVisible={motionVisible}
        onLinkClick={onLinkClick}
      />
    );
  }

  return (
    <FxproPromoCard
      promo={promo}
      locale={locale}
      motionEnabled={motionEnabled}
      motionVisible={motionVisible}
      onLinkClick={onLinkClick}
    />
  );
}

export default function MegaMenuPanel({
  menu,
  locale = "en",
  variant = "default",
  motionOpen,
  contentVisible,
  contentKey,
  panelRef,
  onLinkClick,
}) {
  if (!menu || !menu.columns?.length) return null;

  const motionEnabled = motionOpen !== undefined;
  const panelMotionVisible = motionEnabled ? motionOpen : true;
  const innerMotionVisible = motionEnabled
    ? contentVisible !== undefined
      ? contentVisible
      : motionOpen
    : true;
  const remountKey = contentKey ?? menu.title;

  const isDark = variant === "dark";
  const isFxpro = variant === "fxpro";
  const promo = menu.promo;

  const titleClass = isDark ? "text-white" : "text-dark";
  const headingClass = isDark ? "text-slate-400" : "text-secondary";
  const linkClass = isDark
    ? "text-[15px] leading-[1.45] text-slate-200 transition-colors duration-200 hover:text-white hover:no-underline"
    : "text-[15px] leading-[1.45] text-[#1A1A1A] transition-colors duration-200 hover:text-[#0052FF] hover:no-underline";

  const fxproLinkClass =
    "block text-[15px] font-normal leading-[1.45] text-[#1A1A1A] transition-colors duration-200 hover:text-[#0052FF] hover:no-underline";

  const surfaceMotion =
    motionEnabled &&
    `transform-gpu transition-[opacity,transform] duration-[320ms] ${panelMotionVisible ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
    }`;

  const contentMotion =
    motionEnabled &&
    `transform-gpu transition-[opacity,transform] duration-[260ms] ${innerMotionVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
    }`;

  const headerRow = (
    <div className={`mb-6 flex items-center gap-3 lg:mb-8 ${fadeInClass(motionEnabled, innerMotionVisible)}`}>
      <h3 className={`text-[18px] font-semibold ${titleClass}`}>{menu.title}</h3>
      <span
        aria-hidden="true"
        className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-r from-[#B68756] via-[#995F22] to-[#995F22] text-sm text-white"
      >
        →
      </span>
    </div>
  );

  const columnGrid = (
    <div
      key={remountKey}
      className="grid gap-8 sm:gap-9 lg:gap-10"
      style={{
        gridTemplateColumns: `repeat(${menu.columns.length}, minmax(0, 1fr))`,
      }}
    >
      {menu.columns.map((column, i) => (
        <div
          key={column.heading}
          className={fadeInClass(motionEnabled, innerMotionVisible)}
          style={motionEnabled ? motionStyle(innerMotionVisible ? 56 + i * 42 : 0) : undefined}
        >
          <h4 className={`mb-4 text-[15px] font-semibold lg:mb-6 lg:text-[16px] ${headingClass}`}>
            {column.heading}
          </h4>
          {Array.isArray(column.groups) ? (
            <div className="space-y-5">
              {column.groups.map((group, idx) => (
                <div key={group.heading} className={idx > 0 ? "border-t border-white/10 pt-4" : ""}>
                  <h5 className={`mb-3 text-[13px] font-semibold ${headingClass}`}>{group.heading}</h5>
                  <ul className="space-y-3 lg:space-y-4">
                    {group.links.map((link) => {
                      const external = link.external || isExternalLink(link.href);
                      const href = external ? link.href : localizedHref(locale, link.href);
                      return (
                        <li key={`${group.heading}-${link.label}`}>
                          <Link
                            href={href}
                            target={external ? "_blank" : undefined}
                            rel={external ? "noopener noreferrer" : undefined}
                            className={linkClass}
                            onClick={() => onLinkClick?.()}
                          >
                            {link.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <ul className="space-y-4 lg:space-y-5">
              {column.links.map((link) => {
                const external = link.external || isExternalLink(link.href);
                const href = external ? link.href : localizedHref(locale, link.href);
                return (
                  <li key={`${column.heading}-${link.label}`}>
                    <Link
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className={linkClass}
                      onClick={() => onLinkClick?.()}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      ))}
    </div>
  );

  const blockPointer = motionEnabled && !panelMotionVisible;

  if (isFxpro) {
    const columns = menu.columns;
    const useFlatLayout = menu.columnLayout === "flat" || columns.length <= 3;
    const primaryColumns = useFlatLayout ? columns : columns.slice(0, -2);
    const stackedSections = useFlatLayout ? [] : columns.slice(-2);
    const linkColCount = primaryColumns.length + (stackedSections.length > 0 ? 1 : 0);
    const isSidePromo = isSidePromoVariant(promo?.variant);

    return (
      <div
        ref={panelRef}
        className={`absolute border-t border-[#CCD1E5] left-0 right-0 top-full z-40 hidden w-full overflow-x-hidden lg:block ${blockPointer ? "pointer-events-none" : ""
          }`}
      >
        <div
          className={`overflow-x-hidden overflow-y-auto  bg-white shadow-[0_20px_40px_rgba(0,0,0,0.08)] ${surfaceMotion ?? ""}`}
          style={{
            maxHeight: MEGA_MENU_MAX_HEIGHT,
            ...(motionEnabled ? { transitionTimingFunction: APPLE_TIMING } : undefined),
          }}
        >
          <div
            key={remountKey}
            className={`mx-auto flex container items-stretch gap-12 lg:gap-14 ${isSidePromo ? "py-0" : ""
              } ${contentMotion ?? ""}`}
            style={motionEnabled ? { transitionTimingFunction: APPLE_TIMING } : undefined}
          >
            <div
              className="grid min-w-0 flex-1 gap-x-12 gap-y-10 py-10 lg:gap-x-16 xl:gap-x-20"
              style={{
                gridTemplateColumns: `repeat(${linkColCount}, minmax(0, 1fr))`,
              }}
            >
              {primaryColumns.map((column, i) => (
                <div
                  key={column.heading}
                  className={fadeInClass(motionEnabled, innerMotionVisible)}
                  style={motionEnabled ? motionStyle(innerMotionVisible ? 40 + i * 35 : 0) : undefined}
                >
                  <FxproColumnSection column={column} locale={locale} linkClass={fxproLinkClass} onLinkClick={onLinkClick} />
                </div>
              ))}

              {stackedSections.length > 0 && (
                <div
                  className={fadeInClass(motionEnabled, innerMotionVisible)}
                  style={
                    motionEnabled ? motionStyle(innerMotionVisible ? 40 + primaryColumns.length * 35 : 0) : undefined
                  }
                >
                  {stackedSections.map((column, idx) => (
                    <FxproColumnSection
                      key={column.heading}
                      column={column}
                      locale={locale}
                      linkClass={fxproLinkClass}
                      stacked={stackedSections.length > 1}
                      showDivider={idx > 0}
                      onLinkClick={onLinkClick}
                    />
                  ))}
                </div>
              )}
            </div>

            {promo && (
              <div
                className={`flex shrink-0 justify-end self-stretch ${isSidePromo ? "" : "lg:pt-0"
                  }`}
              >
                {renderFxproPromoCard({
                  promo,
                  locale,
                  motionEnabled,
                  motionVisible: innerMotionVisible,
                  onLinkClick,
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  const innerSurface = isDark
    ? "rounded-b-2xl border-t border-white/10 bg-[#0a1628] px-10 pb-10 pt-8 shadow-[0_24px_48px_rgba(0,0,0,0.35)]"
    : "rounded-b-[16px] bg-[#f4f5f7] px-10 pb-10 pt-8 shadow-[0_20px_40px_rgba(0,0,0,0.08)]";

  return (
    <div
      className={`absolute left-0 right-0 top-full z-40 hidden lg:block ${blockPointer ? "pointer-events-none" : ""
        }`}
    >
      <div
        className={`${innerSurface} overflow-x-hidden overflow-y-auto ${surfaceMotion ?? ""}`}
        style={{
          maxHeight: MEGA_MENU_MAX_HEIGHT,
          ...(motionEnabled ? { transitionTimingFunction: APPLE_TIMING } : undefined),
        }}
      >
        {headerRow}
        {columnGrid}
      </div>
    </div>
  );
}

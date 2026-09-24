"use client";
import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import MegaMenuPanel from "./MegaMenuPanel";
import {
  getMegaMenuData,
  getMenuHubPath,
  getNavItems,
} from "./megaMenuData";
import { useMegaMenuPanelMotion } from "./useMegaMenuPanelMotion";
import { AiOutlineLogin } from "react-icons/ai";
import { LanguageDrawerPanel } from "./LanguageSwitcher";
import { useLocale, useLocaleMessages, usePathTranslation } from "../../LocaleProvider";
import { localizedHref } from "@/i18n/localizedHref";
import { translationTextByPath } from "@/i18n/tranlsationText";
import { useLocationDetail } from "@/context/useLocationDetail";
import { isUaeCountry } from "@/lib/geo/resolveCountryFromRequest";
import { getBaseLanguage } from "@/i18n/regionalLocale";

const REGISTER_HREF = "https://web.mygtc.app/user?redirect=%252Fdashboard";
const LOGIN_HREF = "https://web.mygtc.app/user?redirect=%252Fdashboard";

function isExternalNavHref(href = "") {
  return href.startsWith("http://") || href.startsWith("https://");
}

function UserOutlineIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M10.075 7.415C10.129 7.382 10.184 7.352 10.236 7.317C10.342 7.245 10.445 7.168 10.544 7.087C10.643 7.006 10.738 6.92 10.828 6.829C10.919 6.739 11.005 6.644 11.087 6.545C11.168 6.446 11.244 6.343 11.316 6.237C11.388 6.131 11.455 6.02 11.517 5.907C11.578 5.794 11.634 5.677 11.685 5.557C11.736 5.437 11.781 5.315 11.82 5.19C11.859 5.065 11.892 4.937 11.919 4.807C11.946 4.677 11.966 4.544 11.98 4.41C11.993 4.274 12 4.138 12 4C12 3.862 11.993 3.726 11.979 3.591C11.965 3.457 11.945 3.324 11.918 3.194C11.891 3.064 11.858 2.936 11.819 2.811C11.78 2.686 11.735 2.563 11.684 2.444C11.633 2.325 11.577 2.208 11.516 2.094C11.453 1.981 11.387 1.87 11.315 1.764C11.243 1.658 11.167 1.555 11.086 1.456C11.004 1.357 10.918 1.263 10.827 1.172C10.737 1.081 10.641 0.995 10.543 0.914C10.445 0.833 10.342 0.755 10.235 0.684C10.128 0.613 10.018 0.545 9.90501 0.483C9.79201 0.421 9.67501 0.366 9.55501 0.315C9.43501 0.264 9.31401 0.219 9.18901 0.18C9.06401 0.141 8.93701 0.108 8.80601 0.081C8.67601 0.055 8.54301 0.034 8.40901 0.02C8.27401 0.007 8.13801 0 8.00001 0C7.86201 0 7.72601 0.007 7.59101 0.021C7.45701 0.034 7.32401 0.055 7.19401 0.081C7.06401 0.108 6.93601 0.141 6.81101 0.18C6.68601 0.219 6.56301 0.264 6.44301 0.314C6.32301 0.364 6.20701 0.42 6.09301 0.482C5.97901 0.544 5.87001 0.611 5.76401 0.683C5.65801 0.755 5.55501 0.832 5.45601 0.913C5.35701 0.995 5.26201 1.081 5.17201 1.172C5.08101 1.262 4.99501 1.357 4.91401 1.456C4.83201 1.555 4.75501 1.658 4.68401 1.764C4.61301 1.87 4.54401 1.98 4.48201 2.094C4.42001 2.208 4.36501 2.324 4.31401 2.444C4.26301 2.564 4.21901 2.686 4.18001 2.811C4.14101 2.936 4.10801 3.063 4.08101 3.194C4.05501 3.324 4.03401 3.457 4.02001 3.591C4.00701 3.726 4.00001 3.862 4.00001 4C4.00001 4.138 4.00701 4.274 4.02101 4.409C4.03501 4.543 4.05501 4.676 4.08201 4.806C4.10901 4.936 4.14201 5.064 4.18101 5.189C4.22001 5.314 4.26501 5.437 4.31601 5.556C4.36701 5.675 4.42201 5.792 4.48401 5.906C4.54601 6.02 4.61301 6.13 4.68501 6.236C4.75701 6.342 4.83401 6.445 4.91501 6.544C4.99701 6.643 5.08201 6.737 5.17301 6.828C5.26301 6.919 5.35801 7.005 5.45701 7.086C5.55601 7.168 5.65901 7.245 5.76501 7.316C5.80501 7.343 5.84801 7.366 5.89001 7.392C3.11101 8.238 1.03601 10.763 1.03601 14H1.86401C1.86401 11 4.65101 7.914 7.95001 7.914C11.249 7.914 14.036 11 14.036 14H14.864C14.864 10.788 12.82 8.279 10.075 7.415ZM5.68601 5.907C5.62501 5.833 5.56701 5.756 5.51301 5.676C5.45901 5.596 5.40901 5.513 5.36301 5.428C5.31701 5.343 5.27401 5.256 5.23601 5.167C5.19801 5.078 5.16501 4.985 5.13501 4.891C5.10601 4.797 5.08101 4.701 5.06101 4.603C5.04101 4.505 5.02601 4.407 5.01601 4.306C5.00501 4.206 5.00001 4.104 5.00001 4C5.00001 3.896 5.00501 3.794 5.01601 3.694C5.02601 3.593 5.04101 3.494 5.06101 3.397C5.08101 3.3 5.10601 3.204 5.13501 3.109C5.16401 3.015 5.19801 2.923 5.23601 2.834C5.27401 2.745 5.31601 2.657 5.36201 2.572C5.40801 2.487 5.45801 2.404 5.51201 2.324C5.56601 2.244 5.62401 2.167 5.68501 2.093C5.74601 2.019 5.81201 1.948 5.88001 1.88C5.94801 1.812 6.01901 1.747 6.09301 1.686C6.16701 1.625 6.24401 1.567 6.32401 1.513C6.40401 1.459 6.48701 1.409 6.57201 1.363C6.65701 1.317 6.74501 1.275 6.83401 1.237C6.92301 1.199 7.01601 1.165 7.10901 1.136C7.20301 1.107 7.29901 1.082 7.39701 1.062C7.49501 1.042 7.59301 1.027 7.69401 1.017C7.79401 1.005 7.89601 1 8.00001 1C8.10401 1 8.20601 1.005 8.30701 1.016C8.40801 1.026 8.50701 1.041 8.60401 1.061C8.70101 1.081 8.79701 1.106 8.89101 1.135C8.98501 1.164 9.07701 1.198 9.16701 1.236C9.25601 1.274 9.34401 1.316 9.42901 1.362C9.51401 1.408 9.59601 1.458 9.67601 1.512C9.75601 1.566 9.83301 1.624 9.90701 1.685C9.98101 1.746 10.053 1.811 10.12 1.879C10.187 1.947 10.253 2.018 10.314 2.092C10.375 2.166 10.433 2.243 10.487 2.323C10.541 2.403 10.591 2.486 10.637 2.571C10.683 2.656 10.725 2.744 10.763 2.833C10.801 2.922 10.835 3.015 10.865 3.108C10.894 3.202 10.919 3.298 10.939 3.396C10.959 3.494 10.974 3.592 10.984 3.693C10.994 3.794 11 3.896 11 4C11 4.104 10.994 4.206 10.984 4.306C10.974 4.407 10.959 4.506 10.939 4.603C10.918 4.701 10.894 4.796 10.865 4.891C10.836 4.985 10.802 5.077 10.763 5.166C10.724 5.255 10.683 5.343 10.637 5.428C10.591 5.513 10.54 5.596 10.487 5.676C10.434 5.756 10.375 5.833 10.314 5.907C10.252 5.981 10.187 6.052 10.12 6.12C10.053 6.188 9.98101 6.253 9.90701 6.314C9.83301 6.375 9.75601 6.433 9.67601 6.487C9.59601 6.541 9.51401 6.591 9.42901 6.637C9.34401 6.683 9.25601 6.726 9.16701 6.764C9.07701 6.802 8.98501 6.836 8.89101 6.865C8.79701 6.894 8.70101 6.919 8.60401 6.939C8.50601 6.959 8.40701 6.974 8.30701 6.984C8.20601 6.995 8.10401 7 8.00001 7C7.89601 7 7.79401 6.995 7.69401 6.984C7.59301 6.974 7.49401 6.959 7.39701 6.939C7.30001 6.919 7.20301 6.894 7.10901 6.865C7.01501 6.835 6.92301 6.802 6.83301 6.764C6.74301 6.726 6.65601 6.684 6.57101 6.638C6.48601 6.592 6.40301 6.542 6.32301 6.488C6.24301 6.434 6.16701 6.375 6.09301 6.314C6.01901 6.253 5.94801 6.188 5.88001 6.12C5.81201 6.052 5.74701 5.981 5.68601 5.907Z" fill="currentColor" />
    </svg>
  );
}

function LanguageHeaderButton({
  variant = "full",
  locale = "en",
  onClick,
  onMouseEnter,
  ariaExpanded = false,
  languageAriaLabel = "Language",
}) {
  const isCompact = variant === "compact";
  const label = getBaseLanguage(locale || "en").toUpperCase();

  if (isCompact) {
    return (
      <button
        type="button"
        aria-label={languageAriaLabel}
        aria-expanded={ariaExpanded}
        onClick={onClick}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#293B93] text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
          className="h-8 w-8"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18" />
          <path d="M12 3a13 13 0 0 1 0 18" />
          <path d="M12 3a13 13 0 0 0 0 18" />
        </svg>
      </button>
    );
  }

  return (
    <button
      type="button"
      aria-label={languageAriaLabel}
      aria-expanded={ariaExpanded}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className="inline-flex h-9 items-center gap-1.5 rounded-full bg-[#293B93] px-2 text-[12px] font-normal text-white sm:h-10 sm:gap-2 sm:px-3 sm:text-[14px]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
        className="h-6 w-6"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3a13 13 0 0 1 0 18" />
        <path d="M12 3a13 13 0 0 0 0 18" />
      </svg>
      {label}
    </button>
  );
}

function HeaderActions({
  className,
  variant = "full",
  locale = "en",
  onLanguageClick,
  onLanguageMouseEnter,
  languageMenuOpen = false,
  isUae = false,
  languagePanelRef,
  onLanguageMenuClose,
}) {
  const isCompact = variant === "compact";
  const messages = useLocaleMessages();
  const navigation = messages?.navigation ?? {};
  const registerLabel = translationTextByPath("topbar.register", "Register", navigation);
  const loginLabel = translationTextByPath("topbar.member", "Log In", navigation);
  const languageAriaLabel = translationTextByPath("a11y.language", "Language", navigation);
  const registerHref = localizedHref(locale, REGISTER_HREF);

  return (
    <div className={`flex shrink-0 items-center gap-2 ${className ?? ""}`}>
      {isCompact ? (
        <>
          <Link
            href={registerHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center justify-center rounded-full bg-[#293B93] px-3 text-[12px] font-medium text-white transition hover:bg-[#243575] hover:no-underline"
          >
            {registerLabel}
          </Link>
          <LanguageHeaderButton
            variant="compact"
            locale={locale}
            languageAriaLabel={languageAriaLabel}
            ariaExpanded={languageMenuOpen}
            onClick={onLanguageClick}
          />
        </>
      ) : (
        <>
          <Link
            href={registerHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 cursor-pointer text-[#293B93] select-none items-center gap-1.5 rounded-full border border-[#cfd1d7] bg-white hover:bg-primary hover:text-white px-2 text-[12px] font-medium sm:h-10 sm:gap-2 sm:px-3 sm:text-[14px]"
          >
            <UserOutlineIcon />
            {registerLabel}
          </Link>
          <Link
            href={LOGIN_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 cursor-pointer select-none items-center gap-1.5 rounded-full border border-[#cfd1d7] bg-transparent px-2 text-[12px] hover:bg-secondary hover:text-white font-medium text-[#6b7280] sm:h-10 sm:gap-2 sm:px-3 sm:text-[14px]"
          >
            <AiOutlineLogin />
            {loginLabel}
          </Link>
          <div
            className="relative"
            ref={isUae ? languagePanelRef : undefined}
            onMouseEnter={onLanguageMouseEnter}
          >
            <LanguageHeaderButton
              variant="full"
              locale={locale}
              languageAriaLabel={languageAriaLabel}
              ariaExpanded={languageMenuOpen}
              onClick={onLanguageClick}
            />
            {isUae && languageMenuOpen && (
              <LanguageDrawerPanel
                locale={locale}
                variant="desktop-dropdown"
                onClose={onLanguageMenuClose}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

function MobileHamburgerButton({ open, onClick, className, openLabel = "Open menu", closeLabel = "Close menu" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={open ? closeLabel : openLabel}
      aria-expanded={open}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-[10px] text-[#1f2937] sm:h-10 sm:w-10 ${className ?? ""}`}
    >
      {open ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-[#293B93]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
          <g clipPath="url(#clip0_564_2150)">
            <path d="M10.2667 1.6C11.224 1.6 12 2.37604 12 3.33333C12 4.29063 11.224 5.06667 10.2667 5.06667L1.73333 5.06667C0.776042 5.06667 9.31462e-07 4.29063 9.73307e-07 3.33333C1.01515e-06 2.37604 0.776042 1.6 1.73334 1.6L10.2667 1.6ZM22.2667 10.2667C23.224 10.2667 24 11.0427 24 12C24 12.9573 23.224 13.7333 22.2667 13.7333L1.73333 13.7333C0.776042 13.7333 5.5263e-07 12.9573 5.94475e-07 12C6.36319e-07 11.0427 0.776042 10.2667 1.73334 10.2667L22.2667 10.2667ZM15.4095 18.9333C16.3668 18.9333 17.1429 19.7094 17.1429 20.6667C17.1429 21.624 16.3668 22.4 15.4095 22.4L1.73333 22.4C0.776039 22.4 1.73798e-07 21.624 2.15643e-07 20.6667C2.57487e-07 19.7094 0.776041 18.9333 1.73333 18.9333L15.4095 18.9333Z" fill="#293B93" />
          </g>
          <defs>
            <clipPath id="clip0_564_2150">
              <rect width="24" height="24" fill="white" transform="translate(24 1.04907e-06) rotate(90)" />
            </clipPath>
          </defs>
        </svg>
      )}
    </button>
  );
}

function isHubNavActive(pathname, hubHref) {
  if (!pathname || !hubHref) return false;
  return pathname === hubHref || pathname.startsWith(`${hubHref}/`);
}

const MOBILE_LANGUAGE_KEY = "language";

function RiskWarningBanner() {
  const { countryCode, locationReady } = useLocationDetail();
  const messages = useLocaleMessages();
  const riskWarning = translationTextByPath(
    "topbar.riskWarning",
    "CFDs are highly speculative, leveraged instruments. Trading in CFDs carries a high degree of risk to your capital. Investors should ensure they possess adequate market knowledge or seek independent financial advice before executing trades.",
    messages?.navigation ?? {}
  );

  const riskWarningUS = translationTextByPath(
    "topbar.riskWarningUS",
    "Trading CFDs involves significant risk and may result in the loss of your invested capital. You should carefully consider whether trading is appropriate for your financial circumstances and obtain independent financial advice where necessary. GTCFX services are not offered to residents of the United States or in jurisdictions where the distribution or use of such services is prohibited by applicable laws or regulations.",
    messages?.navigation ?? {}
  );
  // Wait for geo lookup. Hide only for confirmed US — if lookup fails
  // (common on mobile), still show the warning for non-US visitors.
  if (!locationReady) return null;

  return (
    <div className="relative z-[1] border-b border-[#E8EAF0] bg-white px-0 py-2 sm:py-2.5">
      <p className="container text-left text-[9px] leading-[1.5] text-primary sm:text-[11px] md:text-[12px]">
        {countryCode === "US" ? riskWarningUS : riskWarning}
      </p>
    </div>
  );
}


/**
 * Brand header — nav opens mega menu and navigates to the matching hub page.
 */
export default function StaticBrandHeader() {
  const locale = useLocale();
  const { countryCode } = useLocationDetail();
  const isUae = isUaeCountry(countryCode);
  const messages = useLocaleMessages();
  const pathname = usePathname();
  const router = useRouter();
  const navigation = useMemo(() => messages?.navigation ?? {}, [messages]);
  const loginLabel = translationTextByPath("topbar.member", "Log In", navigation);
  const a11y = {
    language: translationTextByPath("a11y.language", "Language", navigation),
    openMenu: translationTextByPath("a11y.openMenu", "Open menu", navigation),
    closeMenu: translationTextByPath("a11y.closeMenu", "Close menu", navigation),
    primaryNav: translationTextByPath("a11y.primaryNav", "Primary navigation", navigation),
    mobileNav: translationTextByPath("a11y.mobileNav", "Mobile navigation", navigation),
    expandSubmenu: translationTextByPath("a11y.expandSubmenu", "Expand {label} submenu", navigation),
    collapseSubmenu: translationTextByPath(
      "a11y.collapseSubmenu",
      "Collapse {label} submenu",
      navigation
    ),
  };
  const navItems = useMemo(() => getNavItems(navigation, locale), [navigation, locale]);
  const megaMenuData = useMemo(
    () => getMegaMenuData(navigation, locale),
    [navigation, locale]
  );

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileLanguageOpen, setMobileLanguageOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);

  const { displayKey: megaDisplayKey, motionOpen: megaMotionOpen, contentVisible: megaContentVisible } =
    useMegaMenuPanelMotion(activeMegaMenu);

  const megaAnchorRef = useRef(null);
  const megaPanelRef = useRef(null);
  const languagePanelRef = useRef(null);
  const mobileMenuPanelRef = useRef(null);
  const mobileLanguagePanelRef = useRef(null);

  const isLanguageMenuOpen = activeMegaMenu === MOBILE_LANGUAGE_KEY;
  const headerElevated =
    mobileLanguageOpen ||
    Boolean(megaDisplayKey) ||
    (isLanguageMenuOpen && !isUae);

  const closeMegaMenu = useCallback(() => {
    setActiveMegaMenu(null);
    setMobileExpanded(null);
  }, []);

  const openMegaMenu = useCallback((key) => {
    setActiveMegaMenu(key);
  }, []);

  const toggleLanguageMenu = useCallback(() => {
    setActiveMegaMenu((prev) => (prev === MOBILE_LANGUAGE_KEY ? null : MOBILE_LANGUAGE_KEY));
  }, []);

  const prefetchHub = useCallback(
    (key) => {
      const hubHref = getMenuHubPath(key, locale);
      if (hubHref && pathname !== hubHref) {
        router.prefetch(hubHref);
      }
    },
    [locale, pathname, router]
  );

  const handleNavMouseEnter = useCallback(
    (key) => {
      openMegaMenu(key);
      prefetchHub(key);
    },
    [openMegaMenu, prefetchHub]
  );

  const navigateToHub = useCallback(
    (key) => {
      const hubHref = getMenuHubPath(key, locale);
      if (hubHref && pathname !== hubHref) {
        router.push(hubHref);
      }
    },
    [locale, pathname, router]
  );

  const handleDesktopNavClick = useCallback(
    (key) => {
      closeMegaMenu();
      navigateToHub(key);
    },
    [closeMegaMenu, navigateToHub]
  );

  const handleHeaderMouseLeave = useCallback(
    (event) => {
      if (typeof window !== "undefined" && window.innerWidth < 1024) return;
      const nextTarget = event.relatedTarget;
      if (nextTarget instanceof Node && event.currentTarget.contains(nextTarget)) {
        return;
      }
      closeMegaMenu();
    },
    [closeMegaMenu]
  );

  useEffect(() => {
    const closeMegaFromHistory = () => {
      closeMegaMenu();
    };

    window.addEventListener("popstate", closeMegaFromHistory);
    window.addEventListener("gtcfx:close-mega-menu", closeMegaFromHistory);
    return () => {
      window.removeEventListener("popstate", closeMegaFromHistory);
      window.removeEventListener("gtcfx:close-mega-menu", closeMegaFromHistory);
    };
  }, [closeMegaMenu]);

  useEffect(() => {
    closeMegaMenu();
    setMobileMenuOpen(false);
    setMobileLanguageOpen(false);
  }, [pathname, closeMegaMenu]);

  useEffect(() => {
    if (!activeMegaMenu) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") closeMegaMenu();
    };

    const onPointerDown = (event) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (megaAnchorRef.current?.contains(target)) return;
      if (megaPanelRef.current?.contains(target)) return;
      if (languagePanelRef.current?.contains(target)) return;
      closeMegaMenu();
    };

    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [activeMegaMenu, closeMegaMenu]);

  const handleMobileNavLabelClick = useCallback(
    (key) => {
      navigateToHub(key);
      setMobileMenuOpen(false);
      setMobileExpanded(null);
      closeMegaMenu();
    },
    [closeMegaMenu, navigateToHub]
  );

  const toggleMobileSection = (key) => {
    setMobileExpanded((prev) => (prev === key ? null : key));
  };

  const toggleMobileLanguagePanel = useCallback(() => {
    setMobileLanguageOpen((open) => {
      const nextOpen = !open;
      if (nextOpen) {
        setMobileMenuOpen(false);
        setMobileExpanded(null);
      }
      return nextOpen;
    });
    setActiveMegaMenu(null);
  }, []);

  const handleLanguageButtonClick = useCallback(() => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      toggleMobileLanguagePanel();
      return;
    }
    toggleLanguageMenu();
  }, [toggleMobileLanguagePanel, toggleLanguageMenu]);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
    setMobileExpanded(null);
    setMobileLanguageOpen(false);
    closeMegaMenu();
  }, [closeMegaMenu]);

  const closeMobileLanguagePanel = useCallback(() => {
    setMobileLanguageOpen(false);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen && !mobileLanguageOpen) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        closeMobileMenu();
      }
    };

    const onPointerDown = (event) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (megaAnchorRef.current?.contains(target)) return;
      if (mobileMenuPanelRef.current?.contains(target)) return;
      if (mobileLanguagePanelRef.current?.contains(target)) return;
      closeMobileMenu();
    };

    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [mobileMenuOpen, mobileLanguageOpen, closeMobileMenu]);

  return (
    <header
      className={`sticky top-0 z-50 transition-[colors,box-shadow] duration-200 ${
        isUae && isLanguageMenuOpen ? "overflow-visible" : "overflow-x-clip"
      } ${headerElevated
        ? "border-[#E0E0E0] bg-white lg:border-b-0 lg:shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
        : "border-[#e0e2e7] bg-[#f4f5f7]"
        }`}
      role="banner"
      onMouseLeave={handleHeaderMouseLeave}
    >
      <RiskWarningBanner />
      {/* <InstallAppBanner /> */}
      <div ref={megaAnchorRef} className="container">
        <div className="grid grid-cols-1 gap-y-2.5 py-2.5 sm:gap-y-3 sm:py-3.5 md:gap-y-3.5 md:py-4 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center lg:gap-x-4 lg:gap-y-0 xl:gap-x-6">
          <div className="flex items-center justify-between lg:w-fit lg:justify-start">
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
              <Link href={localizedHref(locale, "/")} className="flex shrink-0 items-center">
                <Image
                  src="https://gtcfx-bucket.s3.ap-southeast-1.amazonaws.com/img/logo-2024-new.webp"
                  width={150}
                  height={52}
                  alt="GTCFX"
                  priority
                  className="h-[30px] w-auto cursor-pointer object-contain transition-all duration-300 sm:h-[34px] md:h-[38px] lg:h-[40px]"
                />
              </Link>
            </div>

            <div className="flex items-center gap-3 lg:hidden">
              <HeaderActions
                variant="compact"
                locale={locale}
                languageMenuOpen={mobileLanguageOpen}
                onLanguageClick={handleLanguageButtonClick}
              />
              <MobileHamburgerButton
                open={mobileMenuOpen}
                openLabel={a11y.openMenu}
                closeLabel={a11y.closeMenu}
                onClick={() => {
                  setMobileMenuOpen((open) => {
                    const nextOpen = !open;
                    if (nextOpen) {
                      setMobileExpanded(null);
                      setMobileLanguageOpen(false);
                    }
                    return nextOpen;
                  });
                }}
              />
            </div>
          </div>

          <nav
            className="hidden lg:mx-0 lg:flex lg:justify-self-center lg:overflow-visible lg:px-0"
            aria-label={a11y.primaryNav}
          >
            <ul className="flex min-w-max items-center gap-x-5 sm:gap-x-7 md:gap-x-8 lg:min-w-0 lg:justify-center">
              {navItems.map((item) => {
                const hubHref = getMenuHubPath(item.key, locale);
                const isMegaActive = activeMegaMenu === item.key;
                const isHubActive = isHubNavActive(pathname, hubHref);

                return (
                  <li
                    key={item.key}
                    className="flex"
                    onMouseEnter={() => handleNavMouseEnter(item.key)}
                  >
                    <button
                      type="button"
                      aria-expanded={isMegaActive}
                      aria-haspopup="true"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDesktopNavClick(item.key);
                      }}
                      className={`flex items-center gap-1.5 whitespace-nowrap px-3 py-2.5 text-[12px] font-medium leading-none transition-all duration-200 sm:text-[13px] md:px-4 md:text-[15px] ${isMegaActive || isHubActive
                        ? "text-[#293B93] lg:-mb-px"
                        : "text-primary hover:text-[#293B93]"
                        }`}
                    >
                      <span>{item.label}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-3.5 w-3.5 shrink-0 transition-transform duration-200 md:h-4 md:w-4 ${isMegaActive ? "rotate-180 text-[#293B93]" : ""
                          }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        aria-hidden
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <HeaderActions
            className="hidden justify-self-end lg:flex"
            locale={locale}
            languageMenuOpen={isLanguageMenuOpen}
            onLanguageClick={handleLanguageButtonClick}
            onLanguageMouseEnter={() => openMegaMenu(MOBILE_LANGUAGE_KEY)}
            isUae={isUae}
            languagePanelRef={languagePanelRef}
            onLanguageMenuClose={closeMegaMenu}
          />
        </div>
      </div>

      {isLanguageMenuOpen && !isUae && (
        <div ref={languagePanelRef}>
          <LanguageDrawerPanel locale={locale} variant="desktop" onClose={closeMegaMenu} />
        </div>
      )}

      {megaDisplayKey && !isLanguageMenuOpen && (
        <MegaMenuPanel
          menu={megaMenuData[megaDisplayKey]}
          locale={locale}
          variant="fxpro"
          motionOpen={megaMotionOpen}
          contentVisible={megaContentVisible}
          contentKey={megaDisplayKey}
          panelRef={megaPanelRef}
          onLinkClick={closeMegaMenu}
        />
      )}

      {mobileLanguageOpen && (
        <div ref={mobileLanguagePanelRef}>
          <LanguageDrawerPanel
            locale={locale}
            variant="mobile"
            showMobileClose
            hideHeader={isUae}
            onClose={closeMobileLanguagePanel}
          />
        </div>
      )}

      {mobileMenuOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-transparent lg:hidden"
            onClick={closeMobileMenu}
            aria-label={a11y.closeMenu}
          />
          <div ref={mobileMenuPanelRef} className="relative z-50 bg-white container lg:hidden">
            <div className="flex max-h-[min(88vh,calc(100dvh-72px))] flex-col border-t border-[#e5e7eb]">
              <nav
                className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 pb-2 pt-3"
                aria-label={a11y.mobileNav}
              >
                {navItems.map((item) => {
                  const isExpanded = mobileExpanded === item.key;
                  const menu = megaMenuData[item.key];

                  return (
                    <div key={item.key} className="border-b border-[#eceff4] py-1 last:border-b-0">
                      <div className="flex w-full items-center justify-between gap-2 py-1">
                        <button
                          type="button"
                          onClick={() => handleMobileNavLabelClick(item.key)}
                          className="min-w-0 flex-1 text-start text-[16px] font-semibold leading-snug tracking-[-0.01em] text-[#0a0a0a] sm:text-[17px]"
                        >
                          {item.label}
                        </button>
                        <button
                          type="button"
                          aria-expanded={isExpanded}
                          aria-label={(isExpanded ? a11y.collapseSubmenu : a11y.expandSubmenu).replace(
                            "{label}",
                            item.label
                          )}
                          onClick={() => toggleMobileSection(item.key)}
                          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] text-[#293B93]"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-5 w-5 shrink-0 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""
                              }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                            aria-hidden
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>
                      {isExpanded && menu && (
                        <div className="space-y-6 pb-4 pl-0.5 pt-1">
                          {menu.columns.map((column) => (
                            <div key={column.heading}>
                              <h4 className="mb-3 border-b border-[#e5e7eb] pb-2.5 text-[13px] font-bold uppercase leading-tight tracking-[0.08em] text-[#1a1a1a] sm:text-[14px]">
                                {column.heading}
                              </h4>
                              {Array.isArray(column.groups) ? (
                                <div className="space-y-4">
                                  {column.groups.map((group) => (
                                    <div key={group.heading}>
                                      <h5 className="mb-2 text-[12px] font-semibold uppercase tracking-[0.04em] text-[#0052FF]">
                                        {group.heading}
                                      </h5>
                                      <ul className="space-y-2.5">
                                        {group.links.map((link) => {
                                          const external =
                                            link.external || isExternalNavHref(link.href);
                                          const href = external
                                            ? link.href
                                            : localizedHref(locale, link.href);

                                          return (
                                            <li key={`${group.heading}-${link.label}`}>
                                              <Link
                                                href={href}
                                                target={external ? "_blank" : undefined}
                                                rel={external ? "noopener noreferrer" : undefined}
                                                className="block py-0.5 text-[15px] font-medium leading-snug text-[#334155] active:text-[#0052FF]"
                                                onClick={() => {
                                                  closeMobileMenu();
                                                }}
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
                                <ul className="space-y-2.5">
                                  {column.links.map((link) => {
                                    const external =
                                      link.external || isExternalNavHref(link.href);
                                    const href = external
                                      ? link.href
                                      : localizedHref(locale, link.href);

                                    return (
                                      <li key={`${column.heading}-${link.label}`}>
                                        <Link
                                          href={href}
                                          target={external ? "_blank" : undefined}
                                          rel={external ? "noopener noreferrer" : undefined}
                                          className="block py-0.5 text-[15px] font-medium leading-snug text-[#334155] active:text-[#0052FF]"
                                          onClick={() => {
                                            closeMobileMenu();
                                          }}
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
                      )}
                    </div>
                  );
                })}

                <div className="border-b border-[#eceff4] py-1 last:border-b-0">
                  <Link
                    href={LOGIN_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center py-2 text-start text-[16px] font-semibold leading-snug tracking-[-0.01em] text-[#0a0a0a] hover:no-underline sm:text-[17px]"
                    onClick={closeMobileMenu}
                  >
                    {loginLabel}
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        </>
      )}
    </header>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import MegaMenuPanel from "./MegaMenuPanel";
import { getMegaMenuData, getNavItems } from "./megaMenuData";
import { useMegaMenuPanelMotion } from "./useMegaMenuPanelMotion";
import LanguageSwitcher, { LanguageDrawerPanel } from "./LanguageSwitcher";
import Image from "next/image";
import DownloadQR from "./DownloadQR";
import { localizedHref } from "@/i18n/localizedHref";
import { translationTextByPath } from "@/i18n/tranlsationText";

function isExternalNavHref(href = "") {
  return href.startsWith("http://") || href.startsWith("https://");
}

export default function MainHeader({ locale = "en", navigation = {} }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobilePanel, setMobilePanel] = useState("menu"); // menu | language
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const navItems = getNavItems(navigation, locale);
  const megaMenuData = getMegaMenuData(navigation, locale);
  const { displayKey: megaDisplayKey, motionOpen: megaMotionOpen } =
    useMegaMenuPanelMotion(activeMegaMenu);
  const loginText = translationTextByPath(
    "topbar.member",
    "Log in",
    navigation
  );
  const partnerText = translationTextByPath(
    "topbar.rgister",
    "Partner With Us",
    navigation
  );
  const openMenuAria = translationTextByPath(
    "a11y.openMenu",
    "Open navigation menu",
    navigation
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileSection = (key) => {
    setMobileExpanded((prev) => {
      // Accordion behavior: only one section can stay open at a time.
      if (prev === key) return null;
      return key;
    });
  };

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full py-3 transition-all duration-300 ${scrolled ? "bg-white/10 backdrop-blur-md" : "bg-transparent"
        }`}
    >
      <div className="container">
        <div
          className={`relative bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition-all duration-300 ${activeMegaMenu ? "rounded-t-[16px]" : "rounded-[8px]"
            }`}
          onMouseLeave={() => setActiveMegaMenu(null)}
        >
          <div
            className={`flex items-center justify-between px-3 xl:px-6 transition-all duration-300 ${activeMegaMenu ? "rounded-t-[16px] rounded-b-none" : "rounded-[16px]"
              } ${scrolled ? "min-h-[58px] md:min-h-[74px]" : "min-h-[60px] md:min-h-[60px] xl:min-h-[75px] 4xl:min-h-[85px]"}`}
          >
            {/* Logo */}
            <Link href={localizedHref(locale, "/")} className="flex shrink-0 items-center">
              <Image
                src="https://gtcfx-bucket.s3.ap-southeast-1.amazonaws.com/img/logo-2024-new.webp"
                width={200}
                height={72}
                alt="GTCFX"
                priority
                className={`cursor-pointer object-contain transition-all duration-300 ${scrolled
                    ? "w-[120px] h-[42px] sm:w-[130px] sm:h-[47px] md:w-[150px] md:h-[54px]"
                    : "w-[130px] h-[47px] sm:w-[130px] sm:h-[47px] md:w-[120px] md:h-[53px] 2xl:w-[170px] 2xl:h-[61px] 4xl:w-[200px] 4xl:h-[72px]"
                  }`}
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden items-center justify-end gap-2 lg:flex xl:gap-5">
              {navItems.map((item) => {
                const isActive = activeMegaMenu === item.key;
                console.log(isActive, item.key);

                return (
                  <button
                    key={item.key}
                    type="button"
                    onMouseEnter={() => setActiveMegaMenu(item.key)}
                    className={`flex items-center gap-2 xl:text-[15px] text-[13px] font-medium leading-none transition-colors duration-200 ${isActive ? "text-primary" : "text-primary hover:text-primary"
                      }`}
                  >
                    <span>{item.label}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-4 w-4 transition-transform duration-200 ${isActive ? "rotate-180" : ""
                        }`}
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
                  </button>
                );
              })}
            </nav>

            {/* Desktop Right */}
            <div className="hidden items-center gap-2.5 lg:flex">
              <Link
                href="https://web.mygtc.app/user?redirect=%252Fdashboard"
                target="_blank"
                className="inline-flex xl:h-10 h-8 items-center hover:no-underline hover:bg-primary hover:text-white justify-center rounded-[10px] border border-[#d7d7d7] xl:px-5 px-3 text-[14px] font-medium text-[#333] transition-colors duration-200 hover:border-primary"
              >
                {loginText}
              </Link>

              <Link
                href="https://reg.gtcfx.com/uae/partners-campaign"
                target="_blank"
                className="inline-flex hover:no-underline bg-secondary xl:h-10 h-8 items-center justify-center rounded-[10px] hover:bg-primary-gradient xl:px-5 px-3 text-[13px] xl:text-[15px] font-medium text-white transition-opacity duration-200 hover:opacity-90"
              >
                {partnerText}
              </Link>

              <div onMouseEnter={() => setActiveMegaMenu("language")}>
                <LanguageSwitcher locale={locale} disableMenu />
              </div>
              <DownloadQR />
            </div>

            {/* Mobile Right */}
            <div className="flex items-center gap-2 lg:hidden">
              <LanguageSwitcher
                locale={locale}
                mobile
                mobileIcon="chevron"
                mobilePanel="none"
                disableMenu
                onMobileClick={() => {
                  setMobileOpen(true);
                  setMobilePanel("language");
                  setMobileExpanded(null);
                }}
              />

              <button
                type="button"
                onClick={() => {
                  setMobilePanel("menu");
                  setMobileExpanded(null);
                  setMobileOpen((v) => !v);
                }}
                className="inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-[#d9d9d9] text-dark"
                aria-label={openMenuAria}
                aria-expanded={mobileOpen}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  {mobileOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 6l12 12M18 6L6 18"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 7h16M4 12h16M4 17h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {megaDisplayKey && (
            <MegaMenuPanel
              menu={megaMenuData[megaDisplayKey]}
              locale={locale}
              motionOpen={megaMotionOpen}
              contentKey={megaDisplayKey}
            />
          )}
          {activeMegaMenu === "language" && (
            <LanguageDrawerPanel locale={locale} variant="desktop" />
          )}

          {mobileOpen && (
            <div className="border-t border-[#ececec] md:px-5 px-2 md:py-5 py-2 lg:hidden max-h-[calc(100vh-130px)] overflow-y-auto overscroll-contain">
              {mobilePanel === "menu" ? (
                <>
                  <nav className="flex flex-col">
                    {navItems.map((item) => {
                      const isExpanded = mobileExpanded === item.key;
                      const menu = megaMenuData[item.key];

                      return (
                        <div key={item.key} className="border-b border-[#ececec] py-3">
                          <button
                            type="button"
                            onClick={() => toggleMobileSection(item.key)}
                            className="flex w-full items-center justify-between text-left text-[15px] font-medium text-primary"
                          >
                            <span>{item.label}</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""
                                }`}
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
                          </button>

                          {isExpanded && menu && (
                            <div className="mt-4 space-y-5 pb-2">
                              {menu.columns.map((column) => (
                                <div key={column.heading}>
                                  <h4 className="mb-3 text-[14px] font-semibold text-dark">
                                    {column.heading}
                                  </h4>

                                  <ul className="space-y-3">
                                    {(column.groups
                                      ? column.groups.flatMap((group) => group.links)
                                      : column.links
                                    ).map((link) => {
                                      const external =
                                        link.external ||
                                        isExternalNavHref(link.href);
                                      const href = external
                                        ? link.href
                                        : localizedHref(locale, link.href);
                                      return (
                                      <li key={link.label}>
                                        <Link
                                          href={href}
                                          className="text-[14px] text-[#4b4b4b]"
                                          onClick={() => {
                                            setMobileOpen(false);
                                            setMobileExpanded(null);
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
                          )}
                        </div>
                      );
                    })}
                  </nav>

                  <div className="mt-5 flex flex-col gap-3">
                    <Link
                      href="https://mygtcfx.com/getview?view=register&token=exhowww.z8owwwww"
                target="_blank"
                      className="inline-flex h-11 items-center justify-center rounded-[10px] border border-[#d9d9d9] px-5 text-[14px] font-medium text-[#333]"
                      onClick={() => setMobileOpen(false)}
                    >
                      {loginText}
                    </Link>

                    <Link
                      href="https://reg.gtcfx.com/uae/partners-campaign"
                      target="_blank"
                      className="inline-flex h-11 items-center justify-center rounded-[10px] bg-primary-gradient px-5 text-[14px] font-medium text-white"
                      onClick={() => setMobileOpen(false)}
                    >
                      {partnerText}
                    </Link>
                  </div>
                </>
              ) : (
                <div className="pb-2">
                  <div className="md:mb-4 mb-2 flex items-center justify-between">
                    <div className="text-[15px] font-semibold text-[#111827]">
                      Select language
                    </div>
                  </div>

                  <LanguageDrawerPanel
                    locale={locale}
                    variant="mobile-inline"
                    hideHeader
                    onClose={() => {
                      setMobileOpen(false);
                      setMobilePanel("menu");
                    }}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
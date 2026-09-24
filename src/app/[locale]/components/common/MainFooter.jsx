"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { localizedHref } from "@/i18n/localizedHref";
import { useLocale, usePathTranslation } from "../../LocaleProvider";
import { useLocationDetail } from "@/context/useLocationDetail";
import { buildFooterDisclaimers, getFooterNoticeTitle, shouldUseUaeFooter } from "@/lib/geo/footerNotice";

export default function MainFooter({ locale: localeProp = "en" }) {
  const locale = useLocale() || localeProp;
  const t = usePathTranslation("footerLink");
  const a11y = usePathTranslation("common.a11y");
  const { countryCode } = useLocationDetail();
  const year = new Date().getFullYear();

  const footerColumns = [
    {
      title: t("columns.trading.label", "Trading"),
      links: [
        { label: t("columns.trading.menu1", "Account Types"), href: "/account-types" },
        { label: t("columns.trading.menu2", "Deposit Funds"), href: "/deposit" },
        { label: t("columns.trading.menu3", "Dynamic Leverage"), href: "/company/dynamic-leverage" },
        { label: t("columns.trading.menu4", "Islamic Account"), href: "/islamic-accounts" },
      ],
    },
    {
      title: t("columns.platforms.label", "Platforms"),
      links: [
        { label: t("columns.platforms.menu1", "GTC GO App"), href: "/trading/gtc-go-app" },
        { label: t("columns.platforms.menu2", "MT4 Platform"), href: "/trading/mt4-platform" },
        { label: t("columns.platforms.menu3", "MT5 Platform"), href: "/trading/mt5-platform" },
        { label: t("columns.platforms.menu4", "VPS Hosting"), href: "/vps-hosting-services" },
      ],
    },
    {
      title: t("columns.tools.label", "Investment & Trading Solutions"),
      links: [
        { label: t("columns.tools.menu1", "Copy Trading"), href: "/copy-trading" },
        { label: t("columns.tools.menu2", "PAMM Trading"), href: "/trading/pamm-account" },
        { label: t("columns.tools.menu3", "PAMM Accounts"), href: "/trading/pamm-account" },
        { label: t("columns.tools.menu4", "MAM Accounts"), href: "/trading/mam-account" },
      ],
    },
    {
      title: t("columns.resources.label", "Insights & Resources"),
      links: [
        { label: t("columns.resources.menu1", "Market Insights"), href: "/blogs" },
        { label: t("columns.resources.menu2", "Company Updates"), href: "/company-news" },
        { label: t("columns.resources.menu3", "Earnings Calendar"), href: "/earnings-calendar" },
      ],
    },
    {
      title: t("columns.companyLegal.label", "Company"),
      links: [
        { label: t("columns.companyLegal.menu1", "About Us"), href: "/about-us" },
        { label: t("columns.companyLegal.menu2", "Why GTCFX"), href: "/why-gtc-group" },
        { label: t("columns.companyLegal.menu3", "Global Presence"), href: "/global-presence" },
        { label: t("columns.companyLegal.menu4", "Regulations"), href: "/company/regulations" },
      ],
    },
    {
      title: t("columns.resources.legalTitle", "Legal & Compliance"),
      links: [
        { label: t("columns.resources.menu0", "Legal Documents"), href: "/legal/legal-documents" },
        { label: t("columns.resources.menu1", "Website Disclaimer"), href: "/website-disclaimer" },
        { label: t("columns.resources.menu2", "Risk Disclosure"), href: "/risk-disclosure" },
        { label: t("columns.resources.menu3", "Restricted Countries"), href: "/restricted-countries" },
        { label: t("columns.resources.menu4", "KYC & Compliance Policy"), href: "/kyc-compliance-policy" },
        { label: t("columns.resources.menu5", "Deposit & Refund Policy"), href: "/deposit-and-refund-policy" },
        { label: t("columns.resources.menu6", "Swap-Free Terms & Conditions"), href: "/swap-free-terms-and-conditions" },
        { label: t("columns.resources.menu7", "Cookie Policy"), href: "/cookie-policy" },
        { label: t("columns.resources.menu8", "Privacy Policy"), href: "/privacy-policy" },
      ],
    },
  ];

  const socialLinks = [
    { icon: "/icons/fb.svg", href: "https://www.facebook.com/GTCFXGlobalTradeCapital", label: "Facebook" },
    { icon: "/icons/linkedin.svg", href: "https://linkedin.com/company/gtcfx-official", label: "LinkedIn" },
    { icon: "/icons/youtube.svg", href: "https://www.youtube.com/channel/UCnKWakjm1b9Bm63xgwNFXHA", label: "YouTube" },
    { icon: "/icons/insta.svg", href: "https://www.instagram.com/gtcfxofficial/", label: "Instagram" },
    { icon: "/icons/tele.svg", href: "https://t.me/gtc_vip_signal", label: "Telegram" },
    { icon: "/icons/tiktok.svg", href: "https://www.tiktok.com/@gtcgroup_official", label: "TikTok" },
    { icon: "/icons/x.svg", href: "https://x.com/GTC_fx", label: "X" },
  ];

  const disclaimers = useMemo(
    () => buildFooterDisclaimers(t, locale, countryCode),
    [t, locale, countryCode]
  );
  const footerNoticeTitle = useMemo(
    () => getFooterNoticeTitle(t, locale, countryCode),
    [t, locale, countryCode]
  );

  const useUaeFooter = shouldUseUaeFooter(locale);

  const copyrightText = t(
    useUaeFooter ? "footerCopyRightUae.copyRightText" : "footerCopyRight.copyRightText",
    useUaeFooter
      ? "© COPYRIGHT {year} GTC FINANCIAL CONSULTANCY L.L.C - ALL RIGHTS RESERVED"
      : "© COPYRIGHT {year} GTCFX - ALL RIGHTS RESERVED"
  ).replace("{year}", String(year));

  return (
    <footer className="bg-[#2f429d] text-white pt-10 md:pt-16">
      <div className="container">
        <div className="flex  items-center md:items-start flex-col gap-5 border-b border-white/20  pb-5 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="HeadingH3 max-w-xl text-center text-white md:text-left">
            {t("footerHeading", "Global Markets. One Connection.")}
          </h2>

          <div className="flex flex-wrap items-center md:gap-3 gap:1.5">
            {socialLinks.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="relative flex h-12 w-12 items-center justify-center transition"
              >
                <Image
                  src={item.icon}
                  alt={item.label}
                  fill
                  sizes="44px"
                  className="p-[4px] object-contain brightness-0 invert"
                />
              </Link>
            ))}
          </div>
        </div>

        <div className="grid gap-8 border-b border-white/20 py-8 md:grid-cols-3 xl:grid-cols-6">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h5 className="text-[15px] mb-3  uppercase tracking-[0.03em] text-secondary font-semibold">
                {column.title}
              </h5>

              <ul className="space-y-2">
                {column.links.map((link, idx) => (
                  <li key={`${column.title}-${link.href}-${idx}`}>
                    <Link
                      href={
                        link.href.startsWith("/")
                          ? localizedHref(locale, link.href)
                          : link.href
                      }
                      className="TextSmall leading-5 text-white/90 transition hover:no-underline hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-6">
          {footerNoticeTitle ? (
            <h6 className="mb-3 mt-0 text-xs font-semibold uppercase tracking-[0.06em] text-white/90">
              {footerNoticeTitle}
            </h6>
          ) : null}
          <ul className="space-y-2">
            {disclaimers.map((item, index) => (
              <li
                key={index}
                className="text-xs leading-[1.6] text-white/80 list-none"
              >
                <span className="inline">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/20 py-4 md:flex-row md:items-center md:justify-start md:gap-5">
          <Link href="/" locale={locale} aria-label="GTCFX">
            <Image
              src="https://gtcfx-bucket.s3.ap-southeast-1.amazonaws.com/img/footer-logo.webp"
              width={90}
              height={32}
              alt={a11y("gtcfxLogo", "GTCFX official logo")}
              priority
            />
          </Link>
          <p className="TextSmall tracking-wide text-white/80">{copyrightText}</p>
        </div>
      </div>
    </footer>
  );
}

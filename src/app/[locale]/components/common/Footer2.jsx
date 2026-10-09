"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { localizedHref } from "@/i18n/localizedHref";
import { localeDir } from "@/i18n/config";
import { useLocale, useLocaleMessages, usePathTranslation } from "../../LocaleProvider";
import { isCareerHref } from "@/config/featureFlags";
import { buildFooterDisclaimers, getFooterNoticeTitle, shouldUseUaeFooter } from "@/lib/geo/footerNotice";
import { useLocationDetail } from "@/context/useLocationDetail";
import UaeFooterNotice from "./UaeFooterNotice";
import { CAMBODIA_SITE } from "@/config/cambodiaSite";

const FOOTER_COLUMN_DEFS = [
    {
        id: "popularInstruments",
        section: "popularInstruments",
        titleFallback: "Instruments",
        links: [
            { key: "menu1", href: "/markets/forex", fallback: "Forex CFDs" },
            { key: "menu2", href: "/markets/energy", fallback: "Energy CFDs" },
            { key: "menu3", href: "/markets/indices", fallback: "Indices CFDs" },
            { key: "menu4", href: "/markets/metals", fallback: "Metals CFDs" },
            { key: "menu5", href: "/markets/shares", fallback: "Shares/Equity CFDs" },
            { key: "menu7", href: "/markets/future-cfds", fallback: "Future CFDs" },
        ],
    },
    {
        id: "quickNavigation",
        section: "quickNavigation",
        titleFallback: "Quick Navigation",
        links: [
            { key: "menu3", href: "/trading/deposit", fallback: "Deposit & Withdraw" },
            { key: "menu4", href: "/markets", fallback: "Trading Instruments" },
        ],
    },
    {
        id: "platforms",
        section: "platforms",
        titleFallback: "Platforms",
        links: [
            // { key: "menu2", href: "/trading/mt4-platform", fallback: "MT4" },
            { key: "menu3", href: "/trading/mt5-platform", fallback: "MT5" },
        ],
    },
    {
        id: "company",
        section: "company",
        titleFallback: "Company",
        links: [
            { key: "menu1", href: "/company/about-us", fallback: "About Us" },
            { key: "menu2", href: "/company/why-gtc-group", fallback: "Why GTCFX" },
            { key: "menu3", href: "/company/regulations", fallback: "Global Regulation" },
            { key: "menu4", href: "/company/careers", fallback: "Careers" },
        ],
    },
    {
        id: "support",
        section: "support",
        titleFallback: "Support",
        links: [
            { key: "menu1", href: "/company/faqs", fallback: "FAQ" },
            { key: "menu2", href: "/company/contact-us", fallback: "Contact Us" },
            { key: "menu3", href: "/company/faqs", fallback: "Help Center" },
        ],
    },
    {
        id: "legal",
        section: "legal",
        linkSection: "legalCompliance",
        titleFallback: "Legal",
        links: [
            { key: "menu1", href: "/legal/website-disclaimer", fallback: "Website Disclaimer" },
            { key: "menu2", href: "/legal/risk-disclosure", fallback: "Risk Disclosure" },
            { key: "menu3", href: "/legal/restricted-countries", fallback: "Restricted Countries" },
            { key: "menu5", href: "/legal/deposit-and-refund-policy", fallback: "Deposit & Refund Policy" },
            { key: "menu4", href: "/legal/kyc-compliance-policy", fallback: "KYC & Compliance Policy" },
            { key: "menu7", href: "/legal/cookie-policy", fallback: "Cookie Policy" },
            { key: "menu8", href: "/legal/privacy-policy", fallback: "Privacy Policy" },
            { key: "menu9", href: "/legal/terms-and-conditions", fallback: "Terms and Conditions" },
        ],
    },
];

function pickFooterText(columns, section, key, locale, fallback = "") {
    const value = columns?.[section]?.[key];
    if (typeof value === "string" && value.trim()) {
        return value.trim();
    }
    return locale === "en" ? fallback : "";
}

function buildFooterColumns(columns, locale) {
    const defs = CAMBODIA_SITE.hideFooterLegalColumn
        ? FOOTER_COLUMN_DEFS.filter((def) => def.id !== "legal")
        : FOOTER_COLUMN_DEFS;

    return defs.map((def) => {
        const linkSection = def.linkSection ?? def.section;
        const title = pickFooterText(columns, def.section, "label", locale, def.titleFallback);
        const links = def.links
            .map((link) => ({
                label: pickFooterText(columns, linkSection, link.key, locale, link.fallback),
                href: link.href,
            }))
            .filter((link) => !isCareerHref(link.href))
            .filter((link) => link.label);

        return {
            id: def.id,
            title,
            links,
        };
    }).filter((column) => column.title && column.links.length > 0);
}
function isExternalNavHref(href = "") {
    return href.startsWith("http://") || href.startsWith("https://");
}

function FooterNavLink({ link, locale }) {
    if (link.disabled) {
        return (
            <span
                aria-disabled="true"
                className="TextSmall block cursor-not-allowed text-start leading-5 text-black/40"
            >
                {link.label}
            </span>
        );
    }

    const external = link.external || isExternalNavHref(link.href);
    const href = external
        ? link.href
        : link.href.startsWith("/")
          ? localizedHref(locale, link.href)
          : link.href;

    return (
        <Link
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="TextSmall block text-start leading-5 text-black/80 transition hover:no-underline hover:text-black"
        >
            {link.label}
        </Link>
    );
}

export default function Footer2({ locale: localeProp = "en" }) {
    const locale = useLocale() || localeProp;
    const messages = useLocaleMessages();
    const isRtl = localeDir[locale] === "rtl";
    const t = usePathTranslation("footerLink");
    const year = new Date().getFullYear();
    const { countryCode } = useLocationDetail();
    const footerColumns = useMemo(
        () => buildFooterColumns(messages?.footerLink?.columns ?? {}, locale),
        [locale, messages]
    );
    const useUaeFooter = shouldUseUaeFooter(locale);
    const uaeFooterContent = messages?.footerLink?.footerNoticeUae;
    const disclaimers = useMemo(
        () => buildFooterDisclaimers(t, locale, countryCode),
        [t, locale, countryCode]
    );
    const footerNoticeTitle = useMemo(
        () => getFooterNoticeTitle(t, locale, countryCode),
        [t, locale, countryCode]
    );

    const copyrightText = t(
        useUaeFooter ? "footerCopyRightUae.copyRightText" : "footerCopyRight.copyRightText",
        useUaeFooter
            ? "© COPYRIGHT {year} GTC FINANCIAL CONSULTANCY L.L.C - ALL RIGHTS RESERVED"
            : "© COPYRIGHT {year} GTCFX - ALL RIGHTS RESERVED"
    )?.replace("{year}", String(year)) ?? "";

    const footerNavGridClass = CAMBODIA_SITE.hideFooterLegalColumn
        ? "grid w-full grid-cols-2 gap-x-4 gap-y-8 border-b border-black/10 py-8 sm:grid-cols-2 md:grid-cols-3 md:gap-x-6 lg:grid-cols-5 lg:gap-x-8"
        : "grid w-full grid-cols-2 gap-x-4 gap-y-8 border-b border-black/10 py-8 md:grid-cols-3 md:gap-x-6 lg:gap-x-8 xl:grid-cols-6";

    return (
        <footer className="bg-white  text-black pt-10 md:pt-16">
            <div className="container">
                <div className="border-b border-black/10 pb-5">
                    <h2 className="HeadingH4 max-w-xl text-center font-semibold text-black md:text-start">
                        {t("footerHeading", "Global Markets. One Connection.")}
                    </h2>
                </div>

                <div className={footerNavGridClass}>
                    {footerColumns.map((column) => (
                        <div key={column.id} className="min-w-0">
                            <h5
                                className={`my-3 text-[15px] font-semibold text-secondary ${
                                    isRtl
                                        ? "text-start normal-case tracking-normal"
                                        : "uppercase tracking-[0.03em]"
                                }`}
                            >
                                {column.title}
                            </h5>

                            {column.groups ? (
                                <div className="space-y-5">
                                    {column.groups.map((group) => (
                                        <div key={group.heading}>
                                            <h6 className="mb-2 border-b border-black/10 pb-2 text-[12px] font-semibold leading-tight text-black/90 ltr:uppercase ltr:tracking-[0.06em] rtl:text-start rtl:normal-case rtl:tracking-normal">
                                                {group.heading}
                                            </h6>
                                            <ul className="space-y-2 text-start">
                                                {group.links.map((link, idx) => (
                                                    <li
                                                        key={`${group.heading}-${link.href}-${idx}`}
                                                    >
                                                        <FooterNavLink
                                                            link={link}
                                                            locale={locale}
                                                        />
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <ul className="space-y-2 text-start">
                                    {column.links.map((link, idx) => (
                                        <li
                                            key={`${column.id}-${link.href}-${idx}`}
                                            className="min-w-0 break-words"
                                        >
                                            <FooterNavLink link={link} locale={locale} />
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>

                <div className="pt-6">
                    {useUaeFooter ? (
                        <UaeFooterNotice content={uaeFooterContent} isRtl={isRtl} />
                    ) : (
                        <div className="space-y-2 text-start">
                            {footerNoticeTitle ? (
                                <h6
                                    className={`mb-3 mt-0 text-xs font-semibold text-black/90 ${
                                        isRtl
                                            ? "text-start normal-case tracking-normal"
                                            : "uppercase tracking-[0.06em]"
                                    }`}
                                >
                                    {footerNoticeTitle}
                                </h6>
                            ) : null}
                            <ul className="space-y-2">
                                {disclaimers.map((item, index) => (
                                    <li
                                        key={index}
                                        className="list-none text-xs leading-[1.6] text-black/70"
                                    >
                                        <span className="inline">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>


            </div>
            <div className="bg-[#293B93] text-white">
                <div className="container mx-auto mt-8 flex flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-start md:gap-5">
                    <Link href="/" locale={locale} aria-label="GTCFX">
                        <Image
                            src="https://gtcfx-bucket.s3.ap-southeast-1.amazonaws.com/img/footer-logo.webp"
                            width={90}
                            height={32}
                            alt="GTCFX official logo"
                            priority
                        />
                    </Link>
                    <p className="TextSmall text-white tracking-wide ">{copyrightText}</p>
                </div>
            </div>
        </footer>
    );
}

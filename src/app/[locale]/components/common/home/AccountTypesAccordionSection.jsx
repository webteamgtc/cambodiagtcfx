"use client";

import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { useLocale, usePathTranslation } from "../../../LocaleProvider";
import { localizedHref } from "@/i18n/localizedHref";

function IconCardsStack({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="41" viewBox="0 0 44 41" fill="none">
      <path d="M41.0176 41H8.59825C7.80727 41 7.04868 40.6913 6.48937 40.1417C5.93006 39.5922 5.61585 38.8468 5.61585 38.0696V15.318C5.61585 14.5408 5.93006 13.7954 6.48937 13.2459C7.04868 12.6963 7.80727 12.3876 8.59825 12.3876H41.0176C41.8086 12.3876 42.5672 12.6963 43.1265 13.2459C43.6858 13.7954 44 14.5408 44 15.318V38.0696C44 38.8468 43.6858 39.5922 43.1265 40.1417C42.5672 40.6913 41.8086 41 41.0176 41ZM8.59825 14.1251C8.27544 14.1251 7.96573 14.2505 7.73665 14.4739C7.50756 14.6974 7.3777 15.0008 7.37538 15.318V38.0696C7.37538 38.3883 7.50422 38.6939 7.73355 38.9192C7.96288 39.1446 8.27392 39.2712 8.59825 39.2712H41.0176C41.1782 39.2712 41.3372 39.2401 41.4856 39.1797C41.6339 39.1193 41.7687 39.0308 41.8823 38.9192C41.9959 38.8077 42.0859 38.6752 42.1474 38.5294C42.2088 38.3836 42.2405 38.2274 42.2405 38.0696V15.318C42.2405 15.1602 42.2088 15.0039 42.1474 14.8582C42.0859 14.7124 41.9959 14.5799 41.8823 14.4684C41.7687 14.3568 41.6339 14.2683 41.4856 14.2079C41.3372 14.1475 41.1782 14.1164 41.0176 14.1164L8.59825 14.1251Z" fill="#2E42A5" />
      <path d="M5.53667 28.1374C5.35587 28.1373 5.17948 28.0825 5.0315 27.9804C4.88353 27.8783 4.77116 27.7339 4.70969 27.5669L0.258079 15.5514C0.068941 15.0533 -0.0177534 14.5233 0.00301479 13.992C0.023783 13.4608 0.151601 12.9388 0.379069 12.4565C0.606536 11.9741 0.929134 11.5408 1.32818 11.1818C1.72723 10.8228 2.1948 10.5451 2.70383 10.3648L31.0763 0.25108C31.5833 0.0664343 32.1225 -0.0178304 32.6628 0.00313853C33.2031 0.0241075 33.7339 0.149896 34.2245 0.373259C34.7152 0.596623 35.156 0.913149 35.5216 1.30461C35.8872 1.69607 36.1704 2.15473 36.3548 2.65418L39.6892 11.6788C39.7426 11.7876 39.7723 11.9063 39.7762 12.0271C39.7801 12.1479 39.7582 12.2682 39.7119 12.3801C39.6656 12.4921 39.5959 12.5933 39.5073 12.6771C39.4187 12.761 39.3132 12.8257 39.1976 12.867C39.0819 12.9083 38.9588 12.9253 38.8361 12.917C38.7134 12.9086 38.5938 12.8751 38.4851 12.8185C38.3764 12.7619 38.2809 12.6835 38.205 12.5885C38.129 12.4934 38.0742 12.3837 38.044 12.2666L34.6745 3.21605C34.4553 2.65121 34.0185 2.19392 33.4586 1.94316C32.8988 1.6924 32.261 1.66834 31.6833 1.8762L3.31086 12.0245C3.02233 12.1269 2.75718 12.2842 2.53062 12.4874C2.30407 12.6906 2.12056 12.9357 1.99061 13.2088C1.86066 13.4818 1.78683 13.7774 1.77334 14.0785C1.75986 14.3796 1.80699 14.6804 1.91204 14.9636L6.36365 26.9791C6.44288 27.1946 6.43179 27.4322 6.33281 27.6396C6.23383 27.8471 6.05506 28.0075 5.83579 28.0855C5.7399 28.1197 5.63868 28.1373 5.53667 28.1374ZM18.9091 25.6911C18.7023 25.6908 18.5022 25.619 18.3439 25.4882C18.1856 25.3574 18.0793 25.176 18.0436 24.9759C18.0079 24.7757 18.0451 24.5696 18.1487 24.3937C18.2522 24.2178 18.4156 24.0834 18.61 24.0141L30.7155 19.7871C30.8247 19.7487 30.9405 19.7319 31.0563 19.7377C31.172 19.7435 31.2855 19.7717 31.3902 19.8207C31.4948 19.8697 31.5886 19.9385 31.666 20.0232C31.7435 20.108 31.8032 20.2069 31.8416 20.3143C31.9177 20.5299 31.904 20.7662 31.8035 20.9719C31.703 21.1775 31.5238 21.3358 31.305 21.4122L19.1994 25.6911C19.1033 25.7069 19.0052 25.7069 18.9091 25.6911ZM21.3812 32.5114C21.1949 32.4846 21.0223 32.3998 20.8887 32.2694C20.7551 32.139 20.6676 31.97 20.639 31.7871C20.6105 31.6043 20.6424 31.4172 20.7301 31.2535C20.8177 31.0898 20.9565 30.958 21.1261 30.8776L33.1877 26.5555C33.2968 26.5171 33.4126 26.5004 33.5284 26.5062C33.6442 26.5119 33.7577 26.5401 33.8623 26.5891C33.9669 26.6381 34.0607 26.707 34.1382 26.7917C34.2157 26.8764 34.2753 26.9753 34.3138 27.0828C34.393 27.2983 34.3819 27.5359 34.283 27.7434C34.184 27.9508 34.0052 28.1112 33.7859 28.1892L21.6716 32.4595C21.5785 32.4927 21.4803 32.5103 21.3812 32.5114Z" fill="#2E42A5" />
    </svg>
  );
}

function TriangleUp({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="12" viewBox="0 0 21 12" fill="none">
      <path d="M10.3921 0L20.7844 12H-0.000214577L10.3921 0Z" fill="#2E42A5" />
    </svg>
  );
}

/** Light strip at top of ECN-style cards (stacked / tab look) */
function EcnCardTopBar() {
  return (
    <div
      className="h-2 w-full shrink-0 bg-gradient-to-b from-[#D4DEEA] via-[#B9C8DC] to-[#A8B9D0]"
      aria-hidden
    />
  );
}

function EcnProgressRing({ label }) {
  const r = 44;
  const c = 2 * Math.PI * r;
  const dash = c * 0.9;

  return (
    <div className="relative flex h-[88px] w-[88px] shrink-0 items-center justify-center md:h-[100px] md:w-[100px]" aria-hidden>
      <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120" fill="none">
        <circle cx="60" cy="60" r={r} stroke="rgba(255,255,255,0.14)" strokeWidth="9" fill="none" />
        <circle
          cx="60"
          cy="60"
          r={r}
          stroke="white"
          strokeWidth="9"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c}`}
        />
      </svg>
      <span className="Text absolute text-center font-bold tabular-nums text-white">{label}</span>
    </div>
  );
}

function resolveHref(locale, href) {
  if (!href || typeof href !== "string") return "/accounts";
  if (/^https?:\/\//i.test(href)) return href;
  return localizedHref(locale, href) || href;
}

export default function AccountTypesAccordionSection() {
  const t = usePathTranslation("home.accountTypesAccordion");
  const locale = useLocale();
  const [ecnPeek, setEcnPeek] = useState(false);

  const title = t("title", "Choose The Account That Fits Your Trading Style");
  const subtitle = t("subtitle", "Simple. Transparent. Built for every trader.");

  const trustHeadline = t("trust.headline", "Trusted Since 2012");
  const trustBody = t(
    "trust.body",
    "Trusted by millions of satisfied users — our financial services have made a real impact on people's lives."
  );
  const avA = t("trust.avatarA", "GT");
  const avB = t("trust.avatarB", "FX");

  const ecnTitle = t("ecn.title", "ECN account");
  const ecnHeadline = t("ecn.headline", "ECN");
  const ecnSubline = t("ecn.subline", "account");
  const ringLabel = t("ecn.ringLabel", "+90%");
  const ecnPeekAria = t("ecn.peekHint", "Standard account");

  const stdHeadline = "Hassle-Free Copy Trading";
  const stdSubline = t("standard.subline", "account");
  const stdDesc = "Automatically copy trades from top performers. Choose a trader, set your amount, and let the platform manage the rest for you.";
  const stdCta = t("standard.cta", "Explore Copy Trading");
  const stdHref = resolveHref(locale, t("standard.ctaHref", ""));

  const rawHeadline = "Passive PAMM Investment";
  const rawSubline = t("rawPlus.subline", "account");
  const rawTitle = "Invest with trusted managers using structured strategies. Your funds stay in your account, with transparent performance and minimal effort required.";
  const rawDesc = t("rawPlus.description", "");
  const rawCta = t("rawPlus.cta", "Explore PAMM Investment");

  const stdExternal = /^https?:\/\//i.test(stdHref);

  return (
    <section className="bg-white pb-8 md:pb-12">
      <div className="container mx-auto max-w-6xl px-4">
      
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          {/* Column 1: trust + ECN / Standard peek */}
          <div className="flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-4 text-start">
              <div className="flex items-start gap-4">
                <div className="relative shrink-0">
                  <div className="flex -space-x-3 rtl:space-x-reverse" aria-hidden>
                    <span className="TextSmall relative z-[2] flex h-11 w-11 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-[#93C5FD] to-[#2563EB] font-bold text-white shadow-sm md:h-12 md:w-12">
                      <img src="/new-design/user.webp" alt="GT" width={44} height={41} />
                    </span>
                    <span className="TextSmall relative z-[1] flex h-11 w-11 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-[#CBD5E1] to-[#64748B] font-bold text-white shadow-sm md:h-12 md:w-12">
                      <img src="/new-design/user.webp" alt="GT" width={44} height={41} />
                    </span>
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <TriangleUp className="h-3 w-3 shrink-0 md:h-3.5 md:w-3.5" />
                    <p className="HeadingH4 text-[#111827] font-semibold">{trustHeadline}</p>
                  </div>
                  <p className="Text mt-2 leading-relaxed text-[#6B7280]">{trustBody}</p>
                </div>
              </div>
            </div>

            <div
              className="relative min-h-[140px] overflow-hidden rounded-2xl shadow-[0_16px_40px_rgba(21,43,110,0.28)] md:min-h-[140px]"
              onMouseEnter={() => setEcnPeek(true)}
              onMouseLeave={() => setEcnPeek(false)}
              role="group"
              aria-label={`${ecnTitle}. ${ecnPeekAria}`}
            >
              {/* ECN face — same chrome as reference: gray top bar + “ECN account” + ring */}
              <div
                className={clsx(
                  "absolute inset-0 flex flex-col bg-[#152B6E] text-white transition-all duration-300 ease-out",
                  ecnPeek ? "pointer-events-none scale-[0.98] opacity-0" : "opacity-100"
                )}
              >
                <EcnCardTopBar />
                <div className="flex min-h-0 flex-1 items-center justify-between gap-4 px-5 py-4 md:px-7 md:py-5">
                  <p className="HeadingH3 min-w-0 text-white">
                    <span className="font-medium">{ecnHeadline}</span>{" "}<br />
                    <span className="font-normal text-white">{ecnSubline}</span>
                  </p>
                  <EcnProgressRing label={ringLabel} />
                </div>
              </div>

              {/* Hover: Standard — same ECN treatment (gray bar, dark panel, heading + ring) */}
              <div
                className={clsx(
                  "absolute inset-0 flex flex-col bg-[#152B6E] text-white transition-all duration-300 ease-out",
                  ecnPeek ? "z-[2] translate-y-0 opacity-100" : "pointer-events-none z-[1] translate-y-2 opacity-0"
                )}
              >
                <EcnCardTopBar />
                <div className="flex min-h-0 flex-1 items-center justify-between gap-4 px-5 py-4 md:px-7 md:py-5">
                  <p className="HeadingH3 min-w-0 text-white">
                    <span className="font-medium">Standard</span>{" "}<br />
                    <span className="font-normal text-white">{stdSubline}</span>
                  </p>
                  <EcnProgressRing label={ringLabel} />
                </div>
              </div>
            </div>
          </div>

          {/* Standard */}
          <div
            className={clsx(
              "flex h-full flex-col p-6 transition-all duration-300 md:p-7 lg:p-8",
            )}

            style={{
              borderRadius: "20px",
              background: "#F5F6F9",
            }}
          >
            <IconCardsStack className="mb-5 h-12 w-12 shrink-0 md:h-14 md:w-14" />
            <h3 className="HeadingH5 mt-5 text-[#111827] font-semibold">
              {stdHeadline}
            </h3>
            <p className="Text mt-4 flex-1 leading-relaxed text-[#666666]">{stdDesc}</p>
            <Link
              href={stdHref}
              target={stdExternal ? "_blank" : undefined}
              rel={stdExternal ? "noopener noreferrer" : undefined}
              className="TextButton mt-8 inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-[#293B93] px-6 font-normal text-white shadow-sm transition hover:bg-[#293B93] hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 md:w-auto md:self-start"
            >
              {stdCta}
            </Link>
          </div>

          {/* Raw+ (no CTA — matches reference) */}
          <div className="flex h-full flex-col p-6 md:p-7 lg:p-8"
            style={{
              borderRadius: "20px",
              background: "#F5F6F9",
            }}
          >
            <IconCardsStack className="mb-5 h-12 w-12 shrink-0 md:h-14 md:w-14" />
            <h3 className="HeadingH5 mt-5 text-[#111827] font-semibold">
              {rawHeadline}
            </h3>
            <p className="Text mt-4 flex-1 leading-relaxed text-[#666666]">{rawDesc}</p>
             <Link
              href={stdHref}
              target={stdExternal ? "_blank" : undefined}
              rel={stdExternal ? "noopener noreferrer" : undefined}
              className="TextButton mt-8 inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-[#293B93] px-6 font-normal text-white shadow-sm transition hover:bg-[#293B93] hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 md:w-auto md:self-start"
            >
              {rawCta}
            </Link>
            <span className="sr-only">{rawTitle}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

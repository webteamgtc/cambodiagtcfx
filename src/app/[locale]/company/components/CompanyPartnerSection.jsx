"use client";

import clsx from "clsx";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import MobilePeekCarousel from "@/app/[locale]/components/common/MobilePeekCarousel";
import { usePathTranslation } from "../../LocaleProvider";

const PARTNERS_URL = "https://reg.gtcfx.com/uae/partners-campaign";
const AFFILIATE_URL = "https://www.gtcaffiliates.com/";
const GTC_PRIME_URL = "https://gtcprime.com/";

const TAB_KEYS = ["partners", "prime"];
const DEFAULT_KEY = "affiliate";

function CollapseCornerArrow({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M20 12H4M20 12L14 6M20 12L14 18"
        stroke="#666666"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ExternalLinkIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 17L17 7M17 7H10M17 7V14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PartnerExpandedPanel({ tab, expanded }) {
  return (
    <div
      className={clsx(
        "absolute inset-0 flex flex-col max-w-3xl mx-auto overflow-hidden p-6 ease-out motion-reduce:transition-none motion-reduce:opacity-100 sm:p-7 lg:p-8",
        expanded
          ? "pointer-events-auto opacity-100 transition-opacity duration-250 motion-reduce:duration-150"
          : "pointer-events-none opacity-0 transition-opacity duration-150"
      )}
      aria-hidden={!expanded}
    >
      <div className="relative z-[2] flex min-h-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-4">
          <h3
            id={`partner-panel-${tab.key}`}
            className="HeadingH4 font-bold text-[#293B93]"
          >
            {tab.contentTitle}
          </h3>
          <a
            href={tab.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#293B93] text-white transition hover:bg-[#243575] hover:no-underline sm:h-10 sm:w-10"
            aria-label={tab.linkAriaLabel}
          >
            <ExternalLinkIcon className="h-5 w-5 sm:h-7 sm:w-7" />
          </a>
        </div>
        <p className="TextSmall relative z-[2] mt-4 max-w-xl leading-[1.7] text-[#293B93]">
          {tab.contentDescription}
        </p>
      </div>

      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-[1] h-[45%] min-h-[120px] overflow-hidden"
        aria-hidden
      >
        <Image
          src="/new-design/candle.svg"
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 640px"
          className="object-cover object-bottom "
        />
      </div>
    </div>
  );
}

function PartnerMobileCard({ tab }) {
  return (
    <div className="relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-2xl border border-[#eef1f6] bg-[#ebeef3] p-6">
      <div className="relative z-[2] flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-4">
          <h3 className="HeadingH4 font-bold text-[#2b3d8f]">{tab.contentTitle}</h3>
          <a
            href={tab.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#293B93] text-white hover:no-underline"
            aria-label={tab.linkAriaLabel}
          >
            <ExternalLinkIcon className="h-4 w-4" />
          </a>
        </div>
        <p className="TextSmall mt-4 leading-[1.7] text-[#666666]">
          {tab.contentDescription}
        </p>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[1] h-[40%] min-h-[100px]">
        <Image
          src="/new-design/candle.svg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-bottom opacity-[0.35]"
        />
      </div>
    </div>
  );
}

export default function CompanyPartnerSection() {
  const t = usePathTranslation("companyPage.partnerSection");
  const [expandedKey, setExpandedKey] = useState(DEFAULT_KEY);
  const switchLockRef = useRef(false);
  const switchTimerRef = useRef(null);

  const tabs = TAB_KEYS.map((key) => ({
    key,
    label: t(`tabs.${key}.label`),
    contentTitle: t(`tabs.${key}.contentTitle`),
    contentDescription: t(`tabs.${key}.contentDescription`),
    linkAriaLabel: t(`tabs.${key}.linkAriaLabel`),
    href:
      key === "partners"
        ? PARTNERS_URL
        : key === "affiliate"
          ? AFFILIATE_URL
          : GTC_PRIME_URL,
  }));

  const activeTabIndex = Math.max(
    0,
    tabs.findIndex((tab) => tab.key === expandedKey)
  );

  const tabsRef = useRef(tabs);
  tabsRef.current = tabs;

  useEffect(() => {
    return () => {
      if (switchTimerRef.current) window.clearTimeout(switchTimerRef.current);
    };
  }, []);

  const safeSetExpandedKey = useCallback((key) => {
    if (!key || switchLockRef.current) return;

    setExpandedKey((prev) => {
      if (prev === key) return prev;
      switchLockRef.current = true;
      if (switchTimerRef.current) window.clearTimeout(switchTimerRef.current);
      switchTimerRef.current = window.setTimeout(() => {
        switchLockRef.current = false;
      }, 180);
      return key;
    });
  }, []);

  const handleCarouselIndex = useCallback(
    (index) => {
      const tab = tabsRef.current[index];
      if (tab) safeSetExpandedKey(tab.key);
    },
    [safeSetExpandedKey]
  );

  return (
    <section className="overflow-x-hidden bg-white pb-8 md:pb-24">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="HeadingH1">
            {t("title", "Partner with Us")}
          </h2>
          <p className="TextSmall mx-auto mt-5 leading-[1.7] font-normal text-[#666666] md:mt-6">
            {t(
              "description"            )}
          </p>
        </div>

        <div className="mt-10 hidden min-h-[22rem] gap-3 md:flex lg:mt-12 lg:min-h-[21rem]">
          {tabs.map((tab) => {
            const expanded = expandedKey === tab.key;

            return (
              <div
                key={tab.key}
                role="group"
                aria-expanded={expanded}
                id={`partner-tab-${tab.key}`}
                tabIndex={0}
                onMouseEnter={() => safeSetExpandedKey(tab.key)}
                onFocus={() => safeSetExpandedKey(tab.key)}
                onClick={() => safeSetExpandedKey(tab.key)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    safeSetExpandedKey(tab.key);
                  }
                }}
                className={clsx(
                  "group relative isolate flex min-h-0 shrink-0 cursor-pointer flex-col overflow-hidden rounded-2xl bg-[#ebeef3] shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] transition-[flex-grow,flex-basis] duration-[800ms] ease-[cubic-bezier(0.25,1,0.3,1)] will-change-[flex-grow,flex-basis]",
                  expanded
                    ? "min-w-0 basis-[clamp(340px,45vw,640px)] [flex-grow:5]"
                    : "basis-[clamp(76px,6vw,100px)] [flex-grow:0.92]"
                )}
              >
                <div className="relative z-[1] min-h-[22rem] w-full min-w-0 flex-1 lg:min-h-[21rem]">
                  <div
                    className={clsx(
                      "absolute inset-0 flex flex-col px-2 py-4 transition-opacity duration-300 ease-out motion-reduce:transition-none sm:py-10",
                      expanded ? "pointer-events-none opacity-0" : "opacity-100"
                    )}
                    aria-hidden={expanded}
                  >
                    <div className="flex h-full min-h-[16rem] flex-col items-center justify-between">
                      <span
                        className="grow select-none truncate text-center HeadingH4 font-bold text-[#2b3d8f] [writing-mode:vertical-rl]"
                        style={{ transform: "rotate(180deg)" }}
                      >
                        {tab.label}
                      </span>
                    </div>
                  </div>

                  <PartnerExpandedPanel tab={tab} expanded={expanded} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 md:hidden">
          <MobilePeekCarousel
            items={tabs}
            initialIndex={activeTabIndex}
            onActiveIndexChange={handleCarouselIndex}
            showArrows
            trackClassName="-mx-4 px-4"
            renderItem={(tab) => <PartnerMobileCard tab={tab} />}
          />
        </div>
      </div>
    </section>
  );
}

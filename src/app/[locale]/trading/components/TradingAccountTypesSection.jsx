"use client";

import Button from "@/app/[locale]/components/common/Button";
import { useMemo, useState } from "react";
import MobilePeekCarousel from "@/app/[locale]/components/common/MobilePeekCarousel";
import { usePathTranslation } from "../../LocaleProvider";

const MOBILE_ACCOUNT_TYPES = ["standard", "ecn"];

const REGISTER_HREF =
  "/live-account-application";

const ROW_KEYS = [
  "minimumDeposit",
  "leverage",
  "spreads",
  "commission",
  "execution",
  "bankAccess",
];

const ROW_MIN_H = "min-h-[52px]";

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 17 12" fill="none">
      <path d="M8.03277 11.2193C7.74272 11.5179 7.33366 11.6873 6.90442 11.6873C6.4757 11.6873 6.06665 11.5179 5.77659 11.2193L0.456204 5.90263C-0.152068 5.26036 -0.152068 4.28871 0.456204 3.64644C0.735106 3.36914 1.1176 3.20551 1.52241 3.1917C1.97131 3.17098 2.40639 3.33726 2.71398 3.64644L6.90442 7.83582L14.2876 0.457399C14.5814 0.165216 14.9894 0 15.416 0C15.842 0 16.25 0.165216 16.5438 0.457399C17.1521 1.09914 17.1521 2.07025 16.5438 2.71199L8.03277 11.2193Z" fill="#1AAF5D" />
    </svg>
  );
}

function TriangleUp() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M6.56485 13.2736V1.66099L11.1519 6.248C11.3458 6.44191 11.6607 6.44191 11.8546 6.248C12.0485 6.0541 12.0485 5.7392 11.8546 5.54529L6.45471 0.145429C6.2608 -0.0484762 5.9459 -0.0484762 5.752 0.145429L0.145816 5.75161C0.0496396 5.84779 0 5.97499 0 6.10219C0 6.22939 0.0480883 6.35659 0.145816 6.45277C0.339721 6.64667 0.654623 6.64667 0.848528 6.45277L5.57205 1.7308V13.2736C5.57205 13.5481 5.79388 13.77 6.06845 13.77C6.34302 13.77 6.56485 13.5466 6.56485 13.2736Z" fill="#333333" />
    </svg>
  );
}

function ComparisonValue({ value, isLeverage }) {
  if (isLeverage) {
    const badge = value.replace(/^Up to\s+/i, "").trim();

    return (
      <div className="flex flex-wrap items-center justify-between w-full gap-1.5 sm:gap-2">
        <div className="flex items-center gap-1.5">
          <TriangleUp />
          <span className="TextSmall font-normal text-[#333333]">Up to</span>
        </div>
        <span className="rounded-full bg-[#EEF2FF] px-2 py-0.5 text-[12px] font-semibold text-[#293B93] sm:px-2.5 sm:py-1 sm:text-[13px]">
          {badge}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <CheckIcon />
      <span className="TextSmall font-normal text-[#333333]">{value}</span>
    </div>
  );
}

function DiffToggle({ checked, onChange, label }) {
  return (
    <label className="inline-flex cursor-pointer select-none items-center gap-3">
      <span className="relative inline-flex h-6 w-11 shrink-0 align-middle">
        <input
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span
          className="absolute inset-0 rounded-full bg-[#c5cdd8] transition-colors duration-200 peer-checked:bg-[#293B93]"
          aria-hidden
        />
        <span
          className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.2)] transition-transform duration-200 peer-checked:translate-x-5"
          aria-hidden
        />
      </span>
      <span className="TextSmall font-medium text-[#293B93]">{label}</span>
    </label>
  );
}


function ComparisonRow({ isLast, children }) {
  return (
    <div
      className={`grid grid-cols-[minmax(200px,260px)_1fr_1fr] items-center gap-x-6 xl:gap-x-10 ${isLast ? "" : ""
        }`}
    >
      {children}
    </div>
  );
}

function ComparisonGrid({
  rowKeys,
  labels,
  standardValues,
  ecnValues,
  standardTitle,
  ecnTitle,
  openStandardLabel,
  openEcnLabel,
}) {
  const lastIndex = rowKeys.length - 1;

  return (
    <div className="relative hidden lg:block">
      <div
        className="pointer-events-none absolute bottom-0 left-0 top-0 w-[min(100%,260px)] rounded-2xl bg-[#F2F3F96E]"
        aria-hidden
      />

      <ComparisonRow isLast={false}>
        <div className={`${ROW_MIN_H} relative z-[1] px-4 sm:px-5`} aria-hidden />
        <div className={`${ROW_MIN_H} relative z-[1] flex items-center justify-center px-2 sm:px-4`}>
          <h3 className="HeadingH5 font-semibold">
            {standardTitle}
          </h3>
        </div>
        <div className={`${ROW_MIN_H} relative z-[1] flex items-center justify-center px-2 sm:px-4`}>
          <h3 className="HeadingH5 font-semibold">
            {ecnTitle}
          </h3>
        </div>
      </ComparisonRow>

      {rowKeys.map((key, index) => (
        <ComparisonRow key={key} isLast={index === lastIndex}>
          <div className={`${ROW_MIN_H} relative z-[1] flex items-center mx-4 sm:mx-5 border-b border-[#e8ecf2]`}>
            <span className="TextSmall font-semibold text-[#333333]">
              {labels[key]}
            </span>
          </div>
          <div className={`${ROW_MIN_H} relative z-[1] flex items-center px-2 sm:px-4 border-b border-[#e8ecf2]`}>
            <ComparisonValue
              value={standardValues[key]}
              isLeverage={key === "leverage"}
            />
          </div>
          <div className={`${ROW_MIN_H} relative z-[1] flex items-center px-2 sm:px-4 border-b border-[#e8ecf2]`}>
            <ComparisonValue value={ecnValues[key]} isLeverage={key === "leverage"} />
          </div>
        </ComparisonRow>
      ))}

      <div className="grid grid-cols-[minmax(200px,260px)_1fr_1fr] items-center gap-x-6 xl:gap-x-10">
        <div className={`${ROW_MIN_H} relative z-[1]`} aria-hidden />
        <div className={`${ROW_MIN_H} relative z-[1] flex items-center px-2 py-5 sm:px-4`}>
          <Button
            href={REGISTER_HREF}
            external
            variant="brand"
            size="md"
            showArrow
          >
            {openStandardLabel}
          </Button>
        </div>
        <div className={`${ROW_MIN_H} relative z-[1] flex items-center px-2 py-5 sm:px-4`}>
          <Button
            href={REGISTER_HREF}
            external
            variant="brand"
            size="md"
            showArrow
          >
            {openEcnLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

function MobileAccountCard({ title, values, ctaLabel, labels, rowKeys }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#e5eaf0] bg-white">
      <div className="border-b border-[#e5eaf0] px-5 py-4">
        <h3 className="HeadingH5 font-semibold">{title}</h3>
      </div>
      <ul>
        {rowKeys.map((key, index) => (
          <li
            key={key}
            className={`px-5 py-4 ${index < rowKeys.length - 1 ? "border-b border-[#e5eaf0]" : ""}`}
          >
            <p className="TextSmall font-semibold text-[#333333]">
              {labels[key]}
            </p>
            <div className="mt-2.5">
              <ComparisonValue
                value={values[key]}
                isLeverage={key === "leverage"}
              />
            </div>
          </li>
        ))}
      </ul>
      <div className="border-t border-[#e5eaf0] p-5">
        <Button
          href={REGISTER_HREF}
          external
          variant="brand"
          size="md"
          showArrow
        >
          {ctaLabel}
        </Button>
      </div>
    </div>
  );
}

export default function TradingAccountTypesSection() {
  const t = usePathTranslation("accountType");
  const [showOnlyDifferent, setShowOnlyDifferent] = useState(false);

  const rowKeys = useMemo(() => {
    if (!showOnlyDifferent) return ROW_KEYS;

    return ROW_KEYS.filter((key) => {
      const standard = t(`comparison.${key}.standard`, "");
      const ecn = t(`comparison.${key}.ecn`, "");
      return standard !== ecn;
    });
  }, [showOnlyDifferent, t]);

  const labels = useMemo(() => {
    const map = {};
    ROW_KEYS.forEach((key) => {
      map[key] = t(`comparison.${key}.label`, key);
    });
    return map;
  }, [t]);

  const standardValues = useMemo(() => {
    const map = {};
    ROW_KEYS.forEach((key) => {
      map[key] = t(`comparison.${key}.standard`, "");
    });
    return map;
  }, [t]);

  const ecnValues = useMemo(() => {
    const map = {};
    ROW_KEYS.forEach((key) => {
      map[key] = t(`comparison.${key}.ecn`, "");
    });
    return map;
  }, [t]);

  return (
    <section className="overflow-x-hidden pt-14 md:pt-16">
      <div className="container">
        <div className="">
          <div className=" text-center">
            <h2 className="HeadingH2 mx-auto max-w-3xl text-[#293B93]">
              {t("bannerTitle", "Account Types")}
            </h2>
            <p className="Text mx-auto mt-5 max-w-4xl font-normal leading-[1.7] text-[#666666]">
              {t(
                "description",
                "Four account tiers built around different trading styles, experience levels, and market access needs. Compare conditions and find the one that fits how you trade."
              )}              
            </p>

            <div className="mt-8 flex justify-center">
              <DiffToggle
                checked={showOnlyDifferent}
                onChange={setShowOnlyDifferent}
                label={t("toggleLabel", "Show only those that are different")}
              />
            </div>
          </div>

          <div className="mt-10 lg:mt-12">
            <ComparisonGrid
              rowKeys={rowKeys}
              labels={labels}
              standardValues={standardValues}
              ecnValues={ecnValues}
              standardTitle={t("cards.standard.title", "Standard Account")}
              ecnTitle={t("cards.ecn.title", "ECN Account")}
              openStandardLabel={t("cta.openStandard", "Open Standard Account")}
              openEcnLabel={t("cta.openEcn", "Open ECN Account")}
            />

            <div className="min-w-0 lg:hidden">
              <MobilePeekCarousel
                items={MOBILE_ACCOUNT_TYPES}
                showArrows
                className="w-full min-w-0"
                trackClassName="-mx-4 px-4 min-w-0"
                slideClassName="!h-auto"
                renderItem={(type) => (
                  <div className="w-full min-w-0">
                    <MobileAccountCard
                      title={t(
                        type === "standard"
                          ? "cards.standard.title"
                          : "cards.ecn.title",
                        type === "standard" ? "Standard Account" : "ECN Account"
                      )}
                      values={type === "standard" ? standardValues : ecnValues}
                      labels={labels}
                      ctaLabel={t(
                        type === "standard"
                          ? "cta.openStandard"
                          : "cta.openEcn",
                        type === "standard"
                          ? "Open Standard Account"
                          : "Open ECN Account"
                      )}
                      rowKeys={rowKeys}
                    />
                  </div>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

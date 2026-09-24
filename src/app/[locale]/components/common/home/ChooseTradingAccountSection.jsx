"use client";

import clsx from "clsx";
import Link from "next/link";
import { useLocale, usePathTranslation } from "../../../LocaleProvider";
import { localizedHref } from "@/i18n/localizedHref";
import FadeInSection from "@/app/[locale]/company/contact-us/components/FadeInSection";

const REGISTER_HREF =
  "/live-account-application";

const SPEC_KEYS = [
  "minDeposit",
  "spreadsFrom",
  "commission",
  "maxLeverage",
  "minLotSize",
];

function SpecRow({ label, value, isLast }) {
  return (
    <div
      className={clsx(
        "flex items-center justify-between gap-4 py-3",
        "border-b border-dashed border-[#B2B2B2]"
      )}
    >
      <span className="TextSmall text-[#666]">{label}</span>
      <span className="TextSmall font-semibold text-[#000032]">{value}</span>
    </div>
  );
}

function AccountCard({ accountKey, featured, t }) {
  const name = t(`accounts.${accountKey}.name`);
  const description = t(`accounts.${accountKey}.description`);
  const openAccount = t("openAccount", "Open Account");

  const specs = SPEC_KEYS.map((key) => ({
    label: t(`specLabels.${key}`),
    value: t(`accounts.${accountKey}.specs.${key}`),
  }));

  return (
    <article
      className={clsx(
        "relative flex h-full flex-col rounded-[16px] bg-white p-6 md:p-7",
        featured
          ? "border border-[#293B93] border-t-[5px] border-t-[#293B93]"
          : "border border-[#D1DAF2]"
      )}
    >
      {featured ? (
        <span className="absolute right-5 top-5 rounded-full bg-[#293B93] px-3 py-1 text-[10px] font-normal uppercase tracking-wide text-white md:text-[11px]">
          {t("mostPopular", "RECOMMENDED")}
        </span>
      ) : null}

      <div className={clsx("pr-2", featured && "pt-1")}>
        <h3 className="HeadingH5 text-left font-semibold text-[#000032]">{name}</h3>
        <p className="TextSmall mt-2 text-left font-normal leading-relaxed text-[#666]">
          {description}
        </p>
      </div>

      <div className="mt-5 flex-1">
        {specs.map((row, index) => (
          <SpecRow
            key={row.label}
            label={row.label}
            value={row.value}
            isLast={index === specs.length - 1}
          />
        ))}
      </div>

      <div className="mt-8 ">
        {featured ? (
          <Link
            href={REGISTER_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="TextButton max-w-[250px] mx-auto w-full flex min-h-[42px] items-center justify-center rounded-full bg-[#293B93] px-6 font-medium text-white transition hover:bg-[#243575] hover:no-underline"
          >
            {openAccount}
          </Link>
        ) : (
          <Link
            href={REGISTER_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="TextButton max-w-[250px] mx-auto flex min-h-[42px] w-full items-center justify-center rounded-full border border-[#293B93] bg-white px-6 font-medium text-[#293B93] transition hover:bg-[#F4F6FB] hover:no-underline"
          >
            {openAccount}
          </Link>
        )}
      </div>
    </article>
  );
}

export default function ChooseTradingAccountSection() {
  const t = usePathTranslation("home.chooseTradingAccount");
  const locale = useLocale();
  const compareHref = localizedHref(locale, "/trading/account-types") || "/trading/account-types";

  return (
    <section className="bg-white pb-10 md:pb-16">
      <div className="container">
        <header className="mx-auto max-w-4xl text-center">
          <FadeInSection>
            <h2 className="HeadingH2 text-[#000032]">
              {t("title", "Choose Your Trading Account")}
            </h2>
          </FadeInSection>
          <FadeInSection delay={0.2}>
            <p className="Text mt-4 text-[#666]">
              {t(
                "subtitle",
                "Every trader is different. Find the account that matches your experience level, trading style, and goals."
              )}
            </p>
          </FadeInSection>
        </header>

        <div className="mx-auto mt-10 grid max-w-4xl gap-5 md:mt-12 md:grid-cols-2 md:gap-6">
          <FadeInSection delay={0.2}>
            <AccountCard accountKey="standard" featured t={t} />
          </FadeInSection>
          <FadeInSection delay={0.4}>
            <AccountCard accountKey="ecn" featured={false} t={t} />
          </FadeInSection>
        </div>

        <div className="mt-8 flex justify-center md:mt-10">
          <Link
            href={compareHref}
            className="TextButton inline-flex min-h-[42px] items-center justify-center rounded-lg border border-[#293B93] bg-white px-8 font-medium text-[#293B93] transition hover:border-[#293B93]/30 hover:bg-[#F8F9FB] hover:no-underline"
          >
            {t("compareAccounts", "Compare Accounts")}
          </Link>
        </div>
      </div>
    </section>
  );
}

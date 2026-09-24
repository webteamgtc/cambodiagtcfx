"use client";

import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import AccountTypesComparisonCard from "./AccountTypesComparisonCard";
import { ACCOUNT_TYPES, COMPARISON_FOOTNOTES } from "../accountTypesData";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

export default function AccountTypesComparisonSection() {
  const t = usePathTranslation("accountTypesPage.comparisonSection");

  return (
    <section className="pb-8 md:pb-16">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl text-center">
          <SectionEyebrow variant="compact" className="!text-[#293B93] capitalize">
            {t("eyebrow", "Compare Accounts")}
          </SectionEyebrow>

          <h2 className="HeadingH1 mx-auto mt-4 max-w-lg font-semibold text-[#000]">
            {t("titleStart", "Three accounts.")}{" "}
            <span className="text-[#293B93]">{t("titleHighlight", "One that's yours.")}</span>
          </h2>

          <p className="Text mx-auto mt-5 max-w-3xl font-normal leading-[1.7] text-[#000032]/60">
            {t("description", "Compare spreads, commissions, and minimum deposits side by side — then select the account built for your trading style.")}
          </p>

          <div className="mt-14 grid gap-4 md:grid-cols-2 md:gap-10">
            {ACCOUNT_TYPES.map((account) => (
              <AccountTypesComparisonCard
                key={account.key}
                account={account}
                t={t}
              />
            ))}
          </div>

          <div className="mx-auto mt-10 max-w-4xl space-y-2 text-left">
            {COMPARISON_FOOTNOTES.map((key) => (
              <p key={key} className="TextSmall font-normal leading-relaxed text-[#293B93]">
                {t(`footnotes.${key}`, "")}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

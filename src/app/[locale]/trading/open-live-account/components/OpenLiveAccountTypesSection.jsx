'use client'
import MobilePeekCarousel from "@/app/[locale]/components/common/MobilePeekCarousel";
import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import Button from "@/app/[locale]/components/common/Button";
import AccountTypeCard from "@/app/[locale]/trading/components/AccountTypeCard";
import { localizedHref } from "@/i18n/localizedHref";
import { ACCOUNT_SPEC_KEYS, ACCOUNT_TYPES } from "../openLiveAccountData";
import { useLocale, usePathTranslation } from "@/app/[locale]/LocaleProvider";

export default function OpenLiveAccountTypesSection() {
  const t = usePathTranslation("openLiveAccountPage.accountTypes");
  const locale = useLocale();

  const accounts = ACCOUNT_TYPES.map((account) => ({
    ...account,
    name: t(`items.${account.key}.name`),
    subtitle: t(`items.${account.key}.subtitle`),
    cta: t(`items.${account.key}.cta`, "Open now"),
    minDepositLabel: t("minDepositLabel", "min deposit"),
    badge: account.badge ? t(`items.${account.key}.badge`, account.badge) : undefined,
    specs: ACCOUNT_SPEC_KEYS.map((specKey) => ({
      key: specKey,
      label: t(`specLabels.${specKey}`),
      value: t(`items.${account.key}.specs.${specKey}`),
    })),
    swapFree: {
      label: t("specLabels.swapFree", "Swap-free option"),
      value: account.swapFreeAvailable
        ? t("swapFree.available", "Available on request")
        : t("swapFree.no", "No"),
      available: account.swapFreeAvailable,
    },
  }));

  return (
    <section className="py-8 md:py-16">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl text-center">
          <SectionEyebrow variant="compact" className="capitalize">
            {t("eyebrow", "Account Type ")}
          </SectionEyebrow>

          <h2 className="HeadingH1 mx-auto mt-4 max-w-md font-semibold leading-[1.25] text-[#000]">
            {t("titleStart", "Choose")}{" "}
            <span className="text-[#293B93]">{t("titleHighlight", "your account")}</span>
            {t("titleEnd", ".")}
          </h2>

          <p className="Text mx-auto mt-5 max-w-4xl font-normal leading-[1.7] text-[#000032]/60">
            {t(
              "description",
              "GTCFX operates under multiple regulatory licences worldwide, ensuring transparency, security, and fair trading conditions for every client."
            )}
          </p>

          {/* Mobile carousel */}
          <div className="mt-10 md:hidden">
            <MobilePeekCarousel
              items={accounts}
              renderItem={(account) => (
                <div className="px-1 pb-2">
                  <AccountTypeCard account={account} />
                </div>
              )}
            />
          </div>
          {/* Desktop grid */}
          <div className="mt-10 hidden items-stretch gap-5 md:mt-14 md:grid md:grid-cols-2 md:gap-10">
            {accounts.map((account) => (
              <AccountTypeCard key={account.key} account={account} />
            ))}
          </div>

          <div className="mt-10 flex justify-center md:mt-12">
            <Button
              href={localizedHref(locale, "/trading/account-types")}
              variant="brand"
              size="md"
              showArrow
            >
              {t("viewComparison", "View full account comparison")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

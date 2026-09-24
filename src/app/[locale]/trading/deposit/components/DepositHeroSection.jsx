"use client";

import Button from "@/app/[locale]/components/common/Button";
import {
  CLIENT_PORTAL_HREF,
  HERO_STATS,
  QUICK_DEPOSIT_METHODS,
  REGISTER_HREF,
} from "../depositData";
import { HeroTrustBadge } from "@/app/[locale]/company/global-presence/components/GlobalPresenceHeroSection";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

function PaymentMethodIcon({ type }) {
  const className = "h-[14px] w-[14px] text-[#293B93]";

  if (type === "crypto") {
    return (
      <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 20C15.5 20 20 15.5 20 10C20 4.5 15.5 0 10 0C4.5 0 0 4.5 0 10C0 15.5 4.5 20 10 20ZM14.7 8.6C14.5 9.7 14 10.2 13.2 10.3C14.2 10.9 14.7 11.7 14.2 13.2C13.6 15.1 12.1 15.2 10.3 14.9L9.8 16.9L8.7 16.6L9.2 14.6C9.1 14.6 9 14.5 8.8 14.5C8.6 14.5 8.5 14.4 8.3 14.4L7.8 16.4L6.7 16L7.2 14L5 13.5L5.5 12.1L6.3 12.3C6.6 12.4 6.8 12.2 6.8 12L7.6 8.9L8.2 6.7C8.2 6.5 8.1 6.1 7.7 6L6.9 5.8L7.2 4.5L9.5 5L10 3.1L11.1 3.4L10.6 5.3C10.9 5.4 11.2 5.4 11.5 5.5L12 3.6L13 3.9L12.5 5.9C13.9 6.4 14.9 7.1 14.7 8.6ZM9.6 9C10.3 9.2 12.2 9.8 12.5 8.5C12.8 7.3 11.1 6.9 10.3 6.7C10.2 6.7 10.1 6.7 10.1 6.6L9.6 9ZM8.6 12.8C9.5 13.1 11.8 13.8 12.1 12.5C12.4 11.3 10.4 10.8 9.4 10.6C9.3 10.6 9.2 10.6 9.1 10.5L8.6 12.8Z" fill="#293B93" />
      </svg>
    );
  }

  if (type === "mobile") {
    return (
      <svg className={className} xmlns="http://www.w3.org/2000/svg" width="13" height="20" viewBox="0 0 13 20" fill="none">
        <path d="M11.7381 0H1.26211C0.564985 0 0 0.542329 0 1.21136V18.7886C0 19.4577 0.564985 20 1.26211 20H11.7381C12.4349 20 13 19.4577 13 18.7886V1.21136C13 0.542441 12.435 0 11.7381 0ZM5.33139 1.51453H7.66859C7.85309 1.51453 8.00257 1.65793 8.00257 1.83503C8.00257 2.01203 7.85309 2.15556 7.66859 2.15556H5.33139C5.147 2.15556 4.99759 2.01203 4.99759 1.83503C4.99759 1.65795 5.147 1.51453 5.33139 1.51453ZM6.49995 19.0493C5.92828 19.0493 5.46497 18.6045 5.46497 18.0558C5.46497 17.5071 5.92828 17.0621 6.49995 17.0621C7.07167 17.0621 7.53507 17.507 7.53507 18.0558C7.53507 18.6045 7.07167 19.0493 6.49995 19.0493ZM11.7754 16.2289H1.22452V3.21679H11.7754V16.2289Z" fill="#293B93" />
      </svg>
    );
  }

  if (type === "ewallet") {
    return (
      <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17" fill="none">
        <path d="M16.5859 7.14174C16.7581 7.14172 16.9272 7.18652 17.0763 7.27161C17.2253 7.35671 17.349 7.47909 17.4348 7.62641C17.5206 7.77373 17.5655 7.94078 17.565 8.1107C17.5645 8.28062 17.5185 8.4474 17.4319 8.59422L16.248 10.5988H19.0212C19.2216 10.5989 19.4171 10.6596 19.5814 10.7728C19.7457 10.886 19.8709 11.0462 19.94 11.2319C20.0091 11.4175 20.0188 11.6196 19.9678 11.8108C19.9168 12.0021 19.8075 12.1732 19.6548 12.3013L14.1816 16.8845C14.0947 16.9576 13.9848 16.9984 13.8707 17C13.7566 17.0015 13.6456 16.9636 13.5568 16.893C13.468 16.8223 13.407 16.7232 13.3844 16.6128C13.3618 16.5025 13.3789 16.3878 13.4329 16.2886L15.4088 12.6367H13.4484C13.2945 12.6366 13.1428 12.6008 13.0055 12.532C12.8683 12.4633 12.7494 12.3636 12.6586 12.241C12.5677 12.1184 12.5074 11.9764 12.4825 11.8265C12.4577 11.6766 12.469 11.523 12.5156 11.3783L13.663 7.81503C13.726 7.61956 13.8504 7.44896 14.0182 7.32791C14.186 7.20686 14.3885 7.14166 14.5963 7.14174H16.5859ZM17.468 5.61143V6.08968C17.1896 5.97108 16.8894 5.91006 16.5862 5.9104H14.5965C14.1239 5.91039 13.6635 6.05882 13.2819 6.3342C12.9004 6.60958 12.6176 6.99763 12.4744 7.44218L11.3268 11.0052C11.2574 11.2203 11.2221 11.4448 11.222 11.6706L11.223 11.7356C11.2391 12.2736 11.4548 12.787 11.829 13.1785C12.2032 13.57 12.71 13.8124 13.2533 13.8596L13.3299 13.8648L13.1035 14.2835H1.49726C1.10016 14.2835 0.719328 14.1278 0.438538 13.8507C0.157747 13.5736 0 13.1978 0 12.8059V5.61143H17.468ZM6.23859 10.3432H2.74498C2.55011 10.343 2.36285 10.4178 2.22298 10.5517C2.08311 10.6856 2.00167 10.8681 1.99595 11.0603C1.99023 11.2526 2.06069 11.4394 2.19235 11.5812C2.32402 11.723 2.50651 11.8085 2.70106 11.8196L2.74498 11.8208H6.23859C6.43714 11.8208 6.62755 11.743 6.76795 11.6044C6.90834 11.4659 6.98722 11.2779 6.98722 11.082C6.98722 10.8861 6.90834 10.6981 6.76795 10.5596C6.62755 10.421 6.43714 10.3432 6.23859 10.3432ZM15.9708 0C16.3679 0 16.7487 0.155675 17.0295 0.432779C17.3103 0.709883 17.468 1.08572 17.468 1.4776V3.06085H0V1.4776C0 1.08572 0.157747 0.709883 0.438538 0.432779C0.719328 0.155675 1.10016 0 1.49726 0H15.9708Z" fill="#293B93" />
      </svg>
    );
  }

  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 20 16" fill="none">
      <path d="M17.0933 0H2.90668C1.30395 0 0 1.2684 0 2.82743V4.31932H20V2.82743C20 1.2684 18.6961 0 17.0933 0ZM0 13.1725C0 14.7316 1.30393 16 2.90668 16H17.0933C18.6961 16 20 14.7316 20 13.1725V7.21111H0V13.1725ZM12.0682 11.6421H16.2277C16.6443 11.6421 16.9819 11.9866 16.9819 12.4117C16.9819 12.8367 16.6443 13.1813 16.2277 13.1813H12.0682C11.6516 13.1813 11.314 12.8367 11.314 12.4117C11.314 11.9866 11.6516 11.6421 12.0682 11.6421Z" fill="#293B93" />
    </svg>
  );
}

function CheckIcon({ className = "h-3.5 w-3.5" }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="16" height="12" viewBox="0 0 16 12" fill="none">
      <path d="M16 1.41818C16 1.41818 13.44 2.29091 10.4533 5.78182C7.68 8.94545 7.04 10.2545 5.97333 12C5.86667 11.8909 4.26667 8.72727 0 6.43636L2.24 4.25455C2.24 4.25455 4.26667 5.67273 5.65333 8.29091C5.65333 8.29091 9.17333 2.72727 16 0V1.41818Z" fill="#04C120" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M17.0703 12.9297L20 10L17.0703 7.07026V2.92974H12.9297L10 0L7.07026 2.92974H2.92974V7.07026L0 10L2.92974 12.9297V17.0703H7.07026L10 20L12.9297 17.0703H17.0703V12.9297ZM10 15.3027C7.07026 15.3027 4.6973 12.9297 4.6973 10C4.6973 7.07026 7.07026 4.6973 10 4.6973C12.9297 4.6973 15.3027 7.07026 15.3027 10C15.3027 12.9297 12.9297 15.3027 10 15.3027Z" fill="#293B93" />
    </svg>
  );
}

function QuickDepositCard({ t }) {
  return (
    <div className="relative mx-auto w-full max-w-[420px] pt-4 pb-6 lg:max-w-none lg:pt-5 lg:pb-8">
      <div
        className="absolute right-10 border top-[-16px] z-20 flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#22C55E] md:right-12"
        style={{
          borderRadius: "8px",
          background: "#FFFFFF",
          boxShadow: "0 4px 24px rgba(41, 59, 147, 0.12)",
        }}
      >
        <span className="h-6 w-6 flex items-center justify-center" style={{
          borderRadius: "6px",
          background: "rgba(4, 193, 32, 0.10)",
        }}>
          <CheckIcon className="h-2.5 w-2.5" />
        </span>
        {t("quickDeposit.noFeesBadge", "No deposit fees")}
      </div>

      <div
        className="absolute bottom-4  -left-1 z-20 flex items-center gap-3 px-3 py-2 text-xs font-semibold text-[#293B93] md:-left-10"
        style={{
          borderRadius: "10px",
          background: "#FFFFFF",
          boxShadow: "0 4px 24px rgba(41, 59, 147, 0.12)",
        }}
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-[#293B931A] border border-[#E1E7F6] ">
          <ShieldIcon />
        </span>
        {t("quickDeposit.sslBadge", "256-bit SSL")}
      </div>

      <div
        className="relative"
        style={{
          borderRadius: "24px",
          border: "1px solid #E1E7F6",
          background: "#FFFFFF",
          boxShadow: "0 0 48px rgba(41, 59, 147, 0.08)",
        }}
      >
        <div className="p-4 md:px-4 md:py-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="HeadingH5 font-semibold text-[#000]">{t("quickDeposit.title", "Quick Deposit")}</h2>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#04c1201a] px-3 py-1 text-xs font-semibold text-[#22C55E]">
              <CheckIcon className="h-3 w-3" />
              {t("quickDeposit.verified", "Verified")}
            </span>
          </div>

          <ul className="mt-7 space-y-3">
            {QUICK_DEPOSIT_METHODS.map((item) => (
              <li
                key={item.key}
                className="flex items-center justify-between gap-3 rounded-xl bg-[#04c1201a] px-3.5 py-3"
                style={{
                  borderRadius: '10px',
                  border: '1px solid #E1E7F6',
                  background: '#F8F9FC',
                }}
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] border border-[#E1E7F6] ">
                    <PaymentMethodIcon type={item.icon} />
                  </span>
                  <div className="min-w-0 text-left">
                    <p className="TextSmall font-semibold text-[#000]">{t(`quickDeposit.methods.${item.key}.name`, item.name)}</p>
                    <p className="text-xs font-normal text-[#999]">{t(`quickDeposit.methods.${item.key}.subtitle`, item.subtitle)}</p>
                  </div>
                </div>
                <span className="shrink-0 rounded-full bg-[#04c1201a] px-2.5 py-1 text-xs font-medium text-[#22C55E]">
                  {t("quickDeposit.free", "Free")}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function DepositHeroSection() {
  const t = usePathTranslation("depositPage.heroSection");

  return (
    <section
      className="relative overflow-hidden py-10 md:py-18 lg:py-20"
    >
      <div className="pointer-events-none  h-full absolute inset-0 overflow-hidden" aria-hidden>
        <img
          src={"/breadcamp/leverage.webp"}
          alt=""
          priority
          className="object-cover object-center"
        />
      </div>

      <div className="relative container min-w-0 max-w-full">
        <div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)] lg:gap-12">
          <div className="min-w-0 text-center lg:text-left">
            <HeroTrustBadge className="!text-[#293B93]">
              {t("badge", "Trusted & Regulated")}
            </HeroTrustBadge>

            <h1 className="HeadingH1 max-w-md font-semibold mt-5 text-[#000]">
              {t("titleLine1", "Fund Your Account")}{" "}
              {t("titleLine2", "Instantly")}
            </h1>

            <p className="Text mx-auto mt-6 max-w-xl font-normal leading-[1.7] text-[#000032]/60 md:mt-7 lg:mx-0">
              {t("description", "Fast, secure, zero-fee deposits & withdrawals. Support for 10+ payment methods — funds arrive in your trading account in seconds.")}
            </p>
            <div className="mt-10 grid grid-cols-3 gap-4 border-y border-[#E1E7F6] py-5 sm:gap-6">
              {HERO_STATS.map((item) => (
                <div key={item.key} className="min-w-0">
                  <p className="HeadingH3 font-semibold text-[#293B93]">
                    {item.value}
                  </p>
                  <p className="TextSmall mt-1 font-normal text-[#666666]">
                    {t(`stats.${item.key}`, item.label)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap lg:justify-start">
              <Button
                href={CLIENT_PORTAL_HREF}
                external
                variant="brand"
                size="lg"
                showArrow
              >
                {t("primaryCta", "Deposit Now")}
              </Button>
              <Button
                href={REGISTER_HREF}
                external
                variant="outline"
                size="lg"
              >
                {t("secondaryCta", "Open Account")}
              </Button>
            </div>
          </div>

          <QuickDepositCard t={t} />
        </div>
      </div>
    </section>
  );
}

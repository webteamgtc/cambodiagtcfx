"use client";

import Button from "@/app/[locale]/components/common/Button";
import MobilePeekCarousel from "@/app/[locale]/components/common/MobilePeekCarousel";
import { useLocale, usePathTranslation } from "../../../LocaleProvider";
import { localizedHref } from "@/i18n/localizedHref";
import clsx from "clsx";

const REGISTER_HREF =
  "/live-account-application";

const RIGHT_BG_CLIP = "polygon(62% 0, 100% 0, 100% 100%, 38% 100%)";

const STAT_ITEMS = [
  {
    key: "licences",
    valueKey: "stats.licences.value",
    titleKey: "stats.licences.title",
    subtitleKey: "stats.licences.subtitle",
    value: "3",
    title: "Global Support Centre",
    subtitle: "UAE – UK – Cyprus",
    icon: LicencesIcon,
  },
  {
    key: "compensation",
    valueKey: "stats.compensation.value",
    titleKey: "stats.compensation.title",
    subtitleKey: "stats.compensation.subtitle",
    value: "€ 20K",
    title: "Per-client compensation",
    subtitle: "via Financial Commission",
    icon: ShieldIcon,
  },
  {
    key: "latency",
    valueKey: "stats.latency.value",
    titleKey: "stats.latency.title",
    subtitleKey: "stats.latency.subtitle",
    value: "<1ms",
    title: "Order execution latency",
    subtitle: "across global liquidity",
    icon: ClockIcon,
  },
  {
    key: "instruments",
    valueKey: "stats.instruments.value",
    titleKey: "stats.instruments.title",
    subtitleKey: "stats.instruments.subtitle",
    value: "7+",
    title: "Trading Markets",
    subtitle: "Forex, Metals, Indices, Shares, Crypto & more",
    icon: InstrumentsIcon,
  },
];

function LicencesIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16" fill="none">
      <path d="M7 16C2.15162 16 0 13.8353 0 11.2013C0 9.04727 1.66688 7.11358 3.54025 5.34252H10.4737C12.3559 7.1198 14 9.03127 14 11.2013C14 13.8886 11.83 16 7 16ZM9.60487 7.12069H4.40475C3.00038 8.29992 1.75 9.59023 1.75 11.0236C1.75 12.776 3.36437 14.2227 7 14.2227C10.6225 14.2227 12.25 12.8151 12.25 11.0236C12.25 9.58045 11.0171 8.30347 9.60487 7.12069ZM6.98512 13.0373C6.90182 13.1264 6.80154 13.1973 6.69037 13.2458C6.57921 13.2943 6.45949 13.3193 6.3385 13.3193C6.21751 13.3193 6.09779 13.2943 5.98663 13.2458C5.87546 13.1973 5.77518 13.1264 5.69187 13.0373L3.75287 10.9934C3.58091 10.8094 3.48504 10.5655 3.48504 10.3118C3.48504 10.0581 3.58091 9.81417 3.75287 9.63021C3.83618 9.5411 3.93646 9.47014 4.04763 9.42165C4.15879 9.37316 4.27851 9.34816 4.3995 9.34816C4.52049 9.34816 4.64021 9.37316 4.75137 9.42165C4.86254 9.47014 4.96282 9.5411 5.04612 9.63021L6.33937 10.9934L8.925 8.26881C9.0083 8.1797 9.10859 8.10875 9.21975 8.06026C9.33092 8.01176 9.45064 7.98676 9.57162 7.98676C9.69261 7.98676 9.81233 8.01176 9.9235 8.06026C10.0347 8.10875 10.1349 8.1797 10.2182 8.26881C10.3902 8.45277 10.4861 8.69675 10.4861 8.9504C10.4861 9.20406 10.3902 9.44804 10.2182 9.63199L6.98512 13.0373ZM8.94512 4.45387C9.14932 3.56022 9.47628 2.70018 9.91637 1.89903C10.4195 2.04732 10.9087 2.24031 11.3785 2.47576C10.8335 2.99709 10.4886 3.69819 10.4055 4.45387H8.94512ZM6.02262 4.45387C5.90738 3.24838 5.57771 2.07412 5.04962 0.98817C5.27639 0.681335 5.57035 0.432309 5.90826 0.260799C6.24617 0.0892881 6.61874 0 6.9965 0C7.37426 0 7.74683 0.0892881 8.08474 0.260799C8.42264 0.432309 8.71661 0.681335 8.94337 0.98817C8.55436 2.12373 8.22921 3.28083 7.9695 4.45387H6.02262ZM3.58925 4.45387C3.50968 3.69694 3.16389 2.99457 2.61538 2.47576C3.11852 2.24244 3.63974 2.05163 4.17375 1.90525C4.67819 2.66331 4.97973 3.54163 5.04875 4.45387H3.58925Z" fill="#293B93" />
    </svg>
  );
}

function ShieldIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
      <path d="M7.5 0C11.6422 0 15 1.73431 15 3.87339C15 4.51992 14.6934 5.12933 14.1509 5.66515C14.5978 6.22454 14.8438 6.8559 14.8438 7.52696C14.8438 8.30971 14.5181 9.02015 13.9488 9.62763C14.5231 10.2419 14.8438 10.9568 14.8438 11.7231C14.8438 14.2318 11.4997 16 7.5 16C3.50031 16 0.15625 14.2318 0.15625 11.7231C0.15625 10.9568 0.476562 10.2422 1.05062 9.62763C0.481875 9.02048 0.15625 8.30971 0.15625 7.52696C0.15625 6.85558 0.402187 6.22421 0.84875 5.66451C0.306562 5.12966 0 4.52025 0 3.87339C0 1.73431 3.35781 0 7.5 0ZM12.7594 10.556C11.4162 11.3419 9.54375 11.8038 7.5 11.8038C5.46219 11.8038 3.59438 11.3448 2.2525 10.5624L2.30344 10.6202C1.90719 10.992 1.71875 11.3671 1.71875 11.7231C1.71875 13.0472 4.25094 14.3861 7.5 14.3861C10.7491 14.3861 13.2812 13.0472 13.2812 11.7231C13.2812 11.3681 13.0938 10.994 12.6997 10.6228L12.7591 10.556H12.7594ZM12.8553 6.58508L12.8469 6.5896C11.4862 7.30392 9.59375 7.74678 7.5 7.74678C5.4025 7.74678 3.50625 7.30231 2.14531 6.58541C1.85656 6.90399 1.71875 7.22226 1.71875 7.52696C1.71875 8.85102 4.25094 10.1899 7.5 10.1899C10.7491 10.1899 13.2812 8.85102 13.2812 7.52696C13.2812 7.22226 13.1434 6.90399 12.8553 6.58508ZM7.5 1.61391C5.71531 1.61391 4.06375 1.97478 2.89562 2.57806C1.9725 3.05449 1.5625 3.55545 1.5625 3.87339C1.5625 4.19133 1.9725 4.69229 2.89562 5.16871C4.06375 5.77232 5.71531 6.13287 7.5 6.13287C9.28469 6.13287 10.9363 5.77199 12.1044 5.16871C13.0275 4.69229 13.4375 4.19133 13.4375 3.87339C13.4375 3.55545 13.0275 3.05449 12.1044 2.57806C10.9363 1.97446 9.28469 1.61391 7.5 1.61391Z" fill="#293B93" />
      <path d="M4.6875 4.03478C4.6875 4.2488 4.98382 4.45405 5.51126 4.60538C6.03871 4.75672 6.75408 4.84174 7.5 4.84174C8.24592 4.84174 8.96129 4.75672 9.48874 4.60538C10.0162 4.45405 10.3125 4.2488 10.3125 4.03478C10.3125 3.82076 10.0162 3.61551 9.48874 3.46418C8.96129 3.31284 8.24592 3.22782 7.5 3.22782C6.75408 3.22782 6.03871 3.31284 5.51126 3.46418C4.98382 3.61551 4.6875 3.82076 4.6875 4.03478Z" fill="#293B93" />
      <path d="M4.6875 8.87652C4.6875 9.09053 4.98382 9.29579 5.51126 9.44712C6.03871 9.59845 6.75408 9.68347 7.5 9.68347C8.24592 9.68347 8.96129 9.59845 9.48874 9.44712C10.0162 9.29579 10.3125 9.09053 10.3125 8.87652C10.3125 8.6625 10.0162 8.45725 9.48874 8.30591C8.96129 8.15458 8.24592 8.06956 7.5 8.06956C6.75408 8.06956 6.03871 8.15458 5.51126 8.30591C4.98382 8.45725 4.6875 8.6625 4.6875 8.87652Z" fill="#293B93" />
      <path d="M4.6875 12.7499C4.6875 12.9639 4.98382 13.1692 5.51126 13.3205C6.03871 13.4718 6.75408 13.5569 7.5 13.5569C8.24592 13.5569 8.96129 13.4718 9.48874 13.3205C10.0162 13.1692 10.3125 12.9639 10.3125 12.7499C10.3125 12.5359 10.0162 12.3306 9.48874 12.1793C8.96129 12.028 8.24592 11.9429 7.5 11.9429C6.75408 11.9429 6.03871 12.028 5.51126 12.1793C4.98382 12.3306 4.6875 12.5359 4.6875 12.7499Z" fill="#293B93" />
    </svg>
  );
}

function ClockIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1.45455C11.6 1.45455 14.5455 4.4 14.5455 8C14.5455 11.6 11.6 14.5455 8 14.5455C4.4 14.5455 1.45455 11.6 1.45455 8C1.45455 4.4 4.4 1.45455 8 1.45455ZM8 0C3.56364 0 0 3.56364 0 8C0 12.4364 3.56364 16 8 16C12.4364 16 16 12.4364 16 8C16 3.56364 12.4364 0 8 0Z" fill="#293B93" />
      <path d="M10.5455 11.6364C10.3273 11.6364 10.1455 11.5636 10 11.3818L7.45455 8.47273C7.34545 8.36364 7.27273 8.18182 7.27273 8V4.36364C7.27273 3.96364 7.6 3.63636 8 3.63636C8.4 3.63636 8.72727 3.96364 8.72727 4.36364V7.70909L11.0909 10.4C11.3455 10.6909 11.3091 11.1636 11.0182 11.4182C10.8727 11.5636 10.7273 11.6364 10.5455 11.6364Z" fill="#293B93" />
    </svg>
  );
}

function InstrumentsIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
      <path d="M6.3197 16H0.381049C0.171472 16 0 15.8265 0 15.6145V13.92C0 13.708 0.171472 13.5345 0.381049 13.5345H6.3197C6.52928 13.5345 6.70075 13.708 6.70075 13.92V15.6145C6.70075 15.8265 6.52928 16 6.3197 16ZM6.70075 12.2313V10.5369C6.70075 10.3248 6.52928 10.1513 6.3197 10.1513H0.381049C0.171472 10.1513 0 10.3248 0 10.5369V12.2313C0 12.4434 0.171472 12.6169 0.381049 12.6169H6.3197C6.52928 12.6169 6.70075 12.4434 6.70075 12.2313ZM6.70075 8.84627V7.15181C6.70075 6.93976 6.52928 6.76626 6.3197 6.76626H0.381049C0.171472 6.76626 0 6.93976 0 7.15181V8.84627C0 9.05831 0.171472 9.23181 0.381049 9.23181H6.3197C6.52928 9.23181 6.70075 9.06024 6.70075 8.84627ZM15 15.6145V13.92C15 13.708 14.8285 13.5345 14.619 13.5345H8.6803C8.47072 13.5345 8.29925 13.708 8.29925 13.92V15.6145C8.29925 15.8265 8.47072 16 8.6803 16H14.619C14.8304 16 15 15.8265 15 15.6145ZM15 12.2313V10.5369C15 10.3248 14.8285 10.1513 14.619 10.1513H8.6803C8.47072 10.1513 8.29925 10.3248 8.29925 10.5369V12.2313C8.29925 12.4434 8.47072 12.6169 8.6803 12.6169H14.619C14.8304 12.6169 15 12.4434 15 12.2313ZM15 8.84627V7.15181C15 6.93976 14.8285 6.76626 14.619 6.76626H8.6803C8.47072 6.76626 8.29925 6.93976 8.29925 7.15181V8.84627C8.29925 9.05831 8.47072 9.23181 8.6803 9.23181H14.619C14.8304 9.23181 15 9.06024 15 8.84627ZM6.70075 5.46313V3.76867C6.70075 3.55663 6.52928 3.38313 6.3197 3.38313H0.381049C0.171472 3.38313 0 3.55663 0 3.76867V5.46313C0 5.67518 0.171472 5.84867 0.381049 5.84867H6.3197C6.52928 5.84867 6.70075 5.67711 6.70075 5.46313ZM6.70075 2.08V0.385542C6.70075 0.173494 6.52928 0 6.3197 0H0.381049C0.171472 0 0 0.173494 0 0.385542V2.08C0 2.29205 0.171472 2.46554 0.381049 2.46554H6.3197C6.52928 2.46554 6.70075 2.29205 6.70075 2.08Z" fill="#293B93" />
    </svg>
  );
}

function HeroTrustBadge({ children }) {
  return (
    <div className="inline-flex items-center gap-2.5 px-5 py-1.5"
      style={{
        borderRadius: "99px",
        border: "1px solid #E1E7F6",
        background: "#F7F9FF",
      }}
    >
      <span
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#EEF2FF]"
        aria-hidden
      >
        <span className="h-2 w-2 rounded-full bg-[#293B93]" />
      </span>
      <span className="TextSmall font-normal normal-case tracking-normal text-[#293B93]">
        {children}
      </span>
    </div>
  );
}

function StatCard({ item, t, index, isMobile }) {
  const Icon = item.icon;
  const isSecond = index === 1;
  const isThird = index === 2;

  return (
    <article
      className={clsx(
        "h-fit w-full min-w-0 max-w-full p-4 sm:p-5",
        index === 1 ? "md:mt-10" : index === 2 ? "md:-mt-10" : "md:mt-0"
      )}
      style={{
        borderRadius: "20px",
        background: "#FCFDFF",
        boxShadow: !isMobile ? "0 0 45px 0 rgba(41, 59, 147, 0.08)" : "none",
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="HeadingH3 font-bold leading-none text-[#293B93]">
          {t(item.valueKey, item.value)}
        </p>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center"
          style={{
            borderRadius: "6px",
            border: "1px solid #E1E7F6",
          }}
        >
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <p className="TextSmall mt-4 font-medium text-[#666]">
        {t(item.titleKey, item.title)}
      </p>
      <p className="TextSmall font-medium text-[#666]">
        {t(item.subtitleKey, item.subtitle)}
      </p>
    </article>
  );
}

export default function WhyGtcGroupHeroSection() {
  const t = usePathTranslation("whyGtcGroupPage.hero");
  const locale = useLocale();

  return (
    <section className="relative overflow-hidden bg-white py-14 md:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute inset-0 bg-[#F4F7FC]"
          style={{ clipPath: RIGHT_BG_CLIP }}
        />
        <div
          className="absolute inset-0 "
          style={{
            clipPath: RIGHT_BG_CLIP,
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        />
      </div>

      <div className="relative container min-w-0 max-w-full">
        <div className="mx-auto grid w-full min-w-0 max-w-6xl items-center gap-6 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] md:gap-10">
          <div className="min-w-0 text-center md:text-left">
            <HeroTrustBadge>
              {t("eyebrow", "Data-Driven. Verifiable. Trusted.")}
            </HeroTrustBadge>

            <h2 className="HeadingH2 max-w-md mt-7 leading-[1.3] text-[#000]">
              {t("titleBefore", "Why clients choose GTCFX it's all in the")}{" "}
              <span className="relative inline-block text-[#293B93]">
                {t("titleAccent", "numbers")}
                <span
                  className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-[#D4B896]"
                  aria-hidden
                />
              </span>
            </h2>

            <p className="Text mt-10 max-w-xl font-normal leading-[1.7] text-[#000032]/60">
              {t("description")}
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <Button
                href={REGISTER_HREF}
                external
                variant="primary"
                size="lg"
                showArrow
              >
                {t("openLiveAccount", "Open Live Account")}
              </Button>

             
            </div>
          </div>

          <div className="min-w-0 w-full overflow-hidden sm:hidden">
            <MobilePeekCarousel
              items={STAT_ITEMS}
              showArrows
              className="w-full min-w-0"
              trackClassName="min-w-0"
              slideClassName="!h-auto"
              renderItem={(item, index) => (
                <div className="w-full min-w-0 max-w-full px-1">
                  <StatCard item={item} t={t} index={index} isMobile={true} />
                </div>
              )}
            />
          </div>

          <div className="hidden min-w-0 grid-cols-1 gap-4 sm:grid sm:grid-cols-2 sm:gap-5">
            {STAT_ITEMS.map((item, index) => (
              <StatCard key={item.key} item={item} t={t} index={index} isMobile={false} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

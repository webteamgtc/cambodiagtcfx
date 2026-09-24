"use client";

import Image from "next/image";
import Button from "@/app/[locale]/components/common/Button";
import MobilePeekCarousel from "@/app/[locale]/components/common/MobilePeekCarousel";
import { usePathTranslation } from "../../LocaleProvider";

const REGISTER_HREF =
  "/live-account-application";
  

const LEVERAGE_HERO_IMAGE = "/new-design/Trading/dynamic-leverges.webp";

const FEATURE_KEYS = [
  "marketExposure",
  "amplifyReturns",
  "capitalEfficiency",
  "flexibleOptions",
];

function IconPieChart({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="65" height="54" viewBox="0 0 65 54" fill="none">
      <path d="M61.8885 12.5432C61.6381 12.1343 61.2655 11.8146 60.8234 11.6292C60.3812 11.4438 59.892 11.4022 59.4249 11.5102L45.8862 14.6457V3.52042C45.886 3.01063 45.7155 2.51553 45.4016 2.11384C45.0877 1.71216 44.6485 1.42695 44.1539 1.30358C27.1505 -2.9244 0.0365663 3.09533 0 19.9021V34.1264C0.210256 59.8783 63.6803 60.6919 64.0642 34.1264V20.2312C64.0187 17.5231 63.2689 14.8735 61.8885 12.5432ZM39.7522 5.03792L30.053 18.924C29.7882 19.3033 29.6448 19.7539 29.6417 20.2164C29.6385 20.6789 29.7758 21.1315 30.0353 21.5144C30.2948 21.8972 30.6644 22.1923 31.0952 22.3606C31.526 22.529 31.9977 22.5627 32.4481 22.4572L58.7393 16.3643C59.5151 18.1066 59.6857 20.0583 59.2238 21.9087C54.4656 41.2432 4.57079 38.4778 4.57079 19.9159C4.60736 7.73926 26.3461 2.71139 39.7522 5.03792ZM59.4934 34.0762C59.1826 54.8184 4.73077 53.7717 4.57079 34.1082V30.287C16.9576 43.1583 47.2391 43.0441 59.4934 30.1499V34.0762Z" fill="#293B93" />
    </svg>
  );
}

function IconTrendUp({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="51" height="59" viewBox="0 0 51 59" fill="none">
      <path d="M1.68943 40.7825C0.951226 40.7825 0.21302 40.2305 0.0284691 39.3104C-0.156082 38.3904 0.582123 37.4703 1.50488 37.2863C19.7755 34.158 36.016 21.829 44.5053 4.34762C44.6899 3.79557 45.059 3.24353 45.2435 2.69148C45.6127 1.77141 46.72 1.40338 47.4582 1.77141C48.3809 2.13944 48.75 3.24353 48.3809 3.97959C48.1964 4.53163 47.8273 5.08368 47.6427 5.63572C38.5997 24.0372 21.4364 37.1022 2.05853 40.5985C1.87398 40.7825 1.68943 40.7825 1.68943 40.7825Z" fill="#293B93" />
      <path d="M49.3037 11.3402C48.5655 11.3402 47.8273 10.7881 47.6427 9.86806L45.9818 2.13944C45.7972 1.21937 46.3509 0.299293 47.2736 0.115278C48.1964 -0.0687365 49.1191 0.483308 49.3037 1.40338L50.9646 9.31602C51.1492 10.2361 50.5955 11.1562 49.6728 11.3402H49.3037Z" fill="#293B93" />
      <path d="M40.4452 5.81974C39.707 5.81974 38.9688 5.26769 38.7843 4.53163C38.4151 3.61156 38.9688 2.69148 39.8916 2.32346L47.2736 0.115278C48.1964 -0.252751 49.1191 0.299293 49.4882 1.21937C49.8573 2.13944 49.3037 3.05951 48.3809 3.42754L40.9989 5.63572C40.8143 5.63572 40.6298 5.81974 40.4452 5.81974ZM47.2736 59C46.3509 59 45.6127 58.2639 45.6127 57.3439V20.1729C45.6127 19.2528 46.3509 18.5168 47.2736 18.5168C48.1964 18.5168 48.9346 19.2528 48.9346 20.1729V57.3439C48.9346 58.2639 48.1964 59 47.2736 59ZM32.6941 59C31.7713 59 31.0331 58.2639 31.0331 57.3439V34.7101C31.0331 33.79 31.7713 33.0539 32.6941 33.0539C33.6168 33.0539 34.355 33.79 34.355 34.7101V57.3439C34.5396 58.2639 33.8014 59 32.6941 59ZM18.2991 59C17.3763 59 16.6381 58.2639 16.6381 57.3439V45.1989C16.6381 44.2788 17.3763 43.5428 18.2991 43.5428C19.2218 43.5428 19.96 44.2788 19.96 45.1989V57.3439C19.96 58.2639 19.2218 59 18.2991 59ZM3.7195 59C2.79674 59 2.05853 58.2639 2.05853 57.3439V49.4312C2.05853 48.5112 2.79674 47.7751 3.7195 47.7751C4.64225 47.7751 5.38046 48.5112 5.38046 49.4312V57.3439C5.38046 58.2639 4.64225 59 3.7195 59Z" fill="#293B93" />
    </svg>
  );
}

function IconMonitorChart({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="52" height="50" viewBox="0 0 52 50" fill="none">
      <path d="M48.6088 0H3.39121C1.51785 0 0 1.51785 0 3.39017V35.042C0 36.9143 1.51785 38.4333 3.39121 38.4333H48.6088C50.4822 38.4333 52 36.9142 52 35.042V3.39017C52 1.51791 50.4819 0 48.6088 0ZM48.6077 33.9095C48.6077 34.5345 48.1021 35.04 47.4771 35.04H4.52165C3.89666 35.04 3.3911 34.5345 3.3911 33.9095V4.51946C3.3911 3.89447 3.89666 3.3889 4.52165 3.3889H47.4771C48.1021 3.3889 48.6077 3.89447 48.6077 4.51946V33.9095ZM35.0434 42.0094C35.0434 41.3847 34.5366 40.8792 33.9132 40.8792H18.0869C17.4631 40.8792 16.9563 41.3847 16.9563 42.0094V46.5312H5.65215V49.9221H46.3466V46.5312H35.0433L35.0434 42.0094ZM31.7467 21.0207L26.7185 26.1037L18.4974 17.6285L7.91298 28.6725L9.60322 30.4247L18.4369 21.0414L26.7582 29.4808L31.7406 24.5828L40.4865 33.1922L44.6058 17.5488L42.4796 16.8655L39.3148 28.7564L31.7467 21.0207ZM23.1462 13.0501C23.1462 13.0501 26.4492 19.6457 26.4492 21.335C26.4492 21.335 28.0189 16.0518 29.3614 13.5283C29.9256 12.8228 30.2789 11.9242 30.2789 10.9297C30.2789 8.69092 28.5546 6.87496 26.4284 6.87496C24.301 6.87496 22.5778 8.69103 22.5778 10.9297C22.5778 11.7101 22.7974 12.431 23.1596 13.0502L23.1462 13.0501Z" fill="#293B93" />
    </svg>
  );
}

function IconBalanceScale({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="52" height="50" viewBox="0 0 52 50" fill="none">
      <path d="M48.6088 0H3.39121C1.51785 0 0 1.51785 0 3.39017V35.042C0 36.9143 1.51785 38.4333 3.39121 38.4333H48.6088C50.4822 38.4333 52 36.9142 52 35.042V3.39017C52 1.51791 50.4819 0 48.6088 0ZM48.6077 33.9095C48.6077 34.5345 48.1021 35.04 47.4771 35.04H4.52165C3.89666 35.04 3.3911 34.5345 3.3911 33.9095V4.51946C3.3911 3.89447 3.89666 3.3889 4.52165 3.3889H47.4771C48.1021 3.3889 48.6077 3.89447 48.6077 4.51946V33.9095ZM35.0434 42.0094C35.0434 41.3847 34.5366 40.8792 33.9132 40.8792H18.0869C17.4631 40.8792 16.9563 41.3847 16.9563 42.0094V46.5312H5.65215V49.9221H46.3466V46.5312H35.0433L35.0434 42.0094ZM31.7467 21.0207L26.7185 26.1037L18.4974 17.6285L7.91298 28.6725L9.60322 30.4247L18.4369 21.0414L26.7582 29.4808L31.7406 24.5828L40.4865 33.1922L44.6058 17.5488L42.4796 16.8655L39.3148 28.7564L31.7467 21.0207ZM23.1462 13.0501C23.1462 13.0501 26.4492 19.6457 26.4492 21.335C26.4492 21.335 28.0189 16.0518 29.3614 13.5283C29.9256 12.8228 30.2789 11.9242 30.2789 10.9297C30.2789 8.69092 28.5546 6.87496 26.4284 6.87496C24.301 6.87496 22.5778 8.69103 22.5778 10.9297C22.5778 11.7101 22.7974 12.431 23.1596 13.0502L23.1462 13.0501Z" fill="#293B93" />
    </svg>
  );
}

const FEATURE_ICONS = {
  marketExposure: IconPieChart,
  amplifyReturns: IconTrendUp,
  capitalEfficiency: IconMonitorChart,
  flexibleOptions: IconBalanceScale,
};

function LeverageFeatureCard({ featureKey, t }) {
  const Icon = FEATURE_ICONS[featureKey];

  return (
    <article className="interactive-card flex min-h-[220px] flex-col items-center rounded-2xl border border-[#B3C0FF] bg-white px-5 py-8 text-center sm:min-h-[240px] sm:px-4 sm:py-8">
      <span className="flex h-14 w-14 items-center justify-center text-[#293B93]">
        <Icon className="h-11 w-11" />
      </span>
      <h3 className="mt-5 Text font-bold leading-snug text-[#293B93]">
        {t(`cards.${featureKey}.title`)}
      </h3>
      <p className="TextSmall font-normal mt-3 max-w-[240px] leading-relaxed text-[#394582DB]">
        {t(`cards.${featureKey}.description`)}
      </p>
    </article>
  );
}

export default function TradingDynamicLeverageSection() {
  const t = usePathTranslation("tradingPage.dynamicLeverageSection");

  return (
    <section className="overflow-x-hidden bg-white pt-4 md:pt-6">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16">
            <div className="min-w-0 text-center md:text-left">
              <h2 className="HeadingH2 font-semibold leading-tight tracking-[-0.02em] text-[#293B93]">
                {t("title", "Dynamic Leverage")}
              </h2>
              <p className="HeadingH5 mt-4 max-w-sm font-medium leading-snug text-[#666666]">
                {t(
                  "subtitle",
                  "Trade larger positions with smarter exposure control."
                )}
              </p>
              <p className="Text mt-7 max-w-xl font-normal leading-[1.3] text-[#666666] md:mt-6">
                {t(
                  "description",
                  "Leverage is one of the most important features of forex and CFD trading. It is a powerful tool that allows traders to gain greater exposure by opening positions that are significantly larger than the amount required to open the trade. To open positions, a trader is only required to have the margin requirement present in their trading account."
                )}
              </p>
              <Button
                href={REGISTER_HREF}
                external
                variant="brand"
                size="md"
                showArrow
                className="mx-auto mt-8 sm:mt-12 md:mx-0"
              >
                {t("cta", "Open Account")}
              </Button>
            </div>

            <div className="relative mx-auto w-full max-w-[520px] lg:mx-0 lg:max-w-none">
              <div className="relative aspect-[5/4] w-full sm:aspect-[6/5]">
                <Image
                  src={LEVERAGE_HERO_IMAGE}
                  alt={t(
                    "imageAlt",
                    "Balance scale comparing margin deposit to buying power with leverage 1:100"
                  )}
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 1024px) 90vw, 520px"
                />
              </div>
            </div>
          </div>

          <div className="mt-12 min-w-0 lg:mt-16">
            <div className="lg:hidden">
              <MobilePeekCarousel
                items={FEATURE_KEYS}
                showArrows
                className="w-full min-w-0"
                trackClassName="-mx-4 px-4 min-w-0"
                slideClassName="!h-auto"
                renderItem={(key) => (
                  <div className="w-full min-w-0">
                    <LeverageFeatureCard featureKey={key} t={t} />
                  </div>
                )}
              />
            </div>

            <div className="hidden gap-4 min-w-0 lg:grid lg:grid-cols-4 lg:gap-6">
              {FEATURE_KEYS.map((key) => (
                <LeverageFeatureCard key={key} featureKey={key} t={t} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

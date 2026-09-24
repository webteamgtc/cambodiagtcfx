"use client";

import Image from "next/image";
import RevealOnScroll from "@/app/[locale]/components/RevealOnScroll";
import StoreDownloadLink from "@/app/[locale]/components/common/StoreDownloadLink";
import { usePathTranslation } from "../../LocaleProvider";

/** Swap this placeholder when the final background asset is ready */
const SECTION_BG_SRC = "/new-design/bg-knowledge-last.webp";
const PHONE_MOCKUP_SRC = "/new-design/mobile-knowledge.webp";
const QR_SRC = "/home/qrcode.svg";

function PromoStat({ value, label }) {
  return (
    <div className="min-w-0 text-center lg:text-left">
      <p className="HeadingH4 font-semibold text-[#293B93]">{value}</p>
      <p className="TextSmall mt-1 text-[#666]">{label}</p>
    </div>
  );
}

export default function GtcGoPromoSection() {
  const t = usePathTranslation("knowledgePage.gtcGoPromo");

  const stats = [
    {
      key: "traders",
      value: t("stats.traders.value"),
      label: t("stats.traders.label"),
    },
    {
      key: "rating",
      value: t("stats.rating.value"),
      label: t("stats.rating.label"),
    },
    {
      key: "latency",
      value: t("stats.latency.value"),
      label: t("stats.latency.label"),
    },
  ];

  return (
    <section className="relative bg-gradient-to-t from-[#F4F7FF] to-[#fff] isolate overflow-hidden mt-16  pt-16">
      <div className="pointer-events-none absolute inset-0 z-0 w-full" aria-hidden>
        <Image
          src={SECTION_BG_SRC}
          alt=""
          fill
          priority
          className="object-cover w-full object-center"
          sizes="100vw"
        />
      </div>

      <div className="container relative z-10 min-w-0 max-w-full">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 min-w-0 sm:gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:gap-12 xl:gap-16">
          <RevealOnScroll>
            <div className="text-center lg:text-left">
              <h2 className="HeadingH1 font-semibold leading-[1.3] text-[#293B93]">
                {t("headingLine1")}
                <br />
                <span className="text-[#293B93]">{t("headingLine2")}</span>
              </h2>
              <p className="Text leading-snug mt-2 max-w-md font-normal text-[#293B93] lg:mt-5">
                {t("description")}
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-8 sm:gap-10 lg:mt-10 lg:justify-start">
                {stats.map((stat) => (
                  <PromoStat key={stat.key} value={stat.value} label={stat.label} />
                ))}
              </div>

              <div className="mt-8 inline-flex w-full max-w-md flex-col items-center gap-5 sm:flex-row sm:items-center lg:mt-10">
                <div className="flex flex-col items-center gap-3 sm:items-start">
                  <StoreDownloadLink
                    type="google"
                    className="transition hover:opacity-90"
                  >
                    <Image
                      src="/home/google-play.svg"
                      alt={t("googlePlayAlt")}
                      width={140}
                      height={42}
                      className="h-10 w-auto sm:h-11"
                    />
                  </StoreDownloadLink>
                  <StoreDownloadLink
                    type="apple"
                    className="transition hover:opacity-90"
                  >
                    <Image
                      src="/home/app-store.svg"
                      alt={t("appStoreAlt")}
                      width={140}
                      height={42}
                      className="h-10 w-auto sm:h-11"
                    />
                  </StoreDownloadLink>
                </div>

                <div className="flex shrink-0 items-center justify-center rounded-xl border border-[#E8ECF8] bg-white p-2 shadow-sm">
                  <Image
                    src={QR_SRC}
                    alt={t("qrAlt")}
                    width={88}
                    height={88}
                    className="h-[88px] w-[88px] object-contain"
                  />
                </div>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={120}>
            <div className="relative mx-auto overflow-hidden flex w-full min-w-0 justify-center px-2 sm:px-0 lg:mx-0 lg:ml-auto lg:justify-end">
              <Image
                src={PHONE_MOCKUP_SRC}
                alt={t("phoneAlt")}
                width={440}
                height={560}
                className="h-auto w-full max-w-[240px] object-contain object-center sm:max-w-[300px] md:max-w-[360px] lg:max-w-[440px]"
                sizes="(max-width: 480px) 240px, (max-width: 640px) 280px, (max-width: 768px) 320px, (max-width: 1024px) 360px, 440px"
              />
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

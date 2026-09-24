"use client";

import Image from "next/image";
import Button from "@/app/[locale]/components/common/Button";
import { usePathTranslation } from "../../LocaleProvider";
import { localizedHref } from "@/i18n/localizedHref";
import StoreDownloadLink from "@/app/[locale]/components/common/StoreDownloadLink";
const MT4_IMAGE = "/new-design/Trading/mt4.webp";
const MT5_IMAGE = "/new-design/Trading/mt5.svg";

const DOWNLOAD_APP_IMAGE = "/new-design/Trading/app.webp";

const ROWS = [
  { id: "mt4-left", type: "platform", translationKey: "mt4", reverse: false },
  { id: "mt5-right", type: "platform", translationKey: "mt5", reverse: true },
  { id: "download-app", type: "download", reverse: false },
];

function PlatformVisual({ imageAlt }) {
  return (
    <div className="relative mx-auto w-full max-w-[520px] leading-none lg:mx-0 lg:max-w-[560px]">
      <Image
        src={MT4_IMAGE}
        alt={imageAlt}
        width={560}
        height={420}
        className="h-auto w-full"
        sizes="(max-width: 1024px) 90vw, 560px"
      />
    </div>
  );
}

function DownloadAppVisual({ imageAlt }) {
  return (
    <div className="relative mx-auto w-full max-w-[420px] leading-none lg:mx-0 lg:max-w-[440px]">
      <Image
        src={DOWNLOAD_APP_IMAGE}
        alt={imageAlt}
        width={440}
        height={520}
        className="h-auto w-full"
        sizes="(max-width: 1024px) 85vw, 440px"
      />
    </div>
  );
}

function StoreButtons({ t }) {
  return (
    <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4">
      <StoreDownloadLink
        type="google"
        className="inline-flex transition hover:opacity-90"
      >
        <img
          src="/home/google-play.svg"
          alt={t("items.downloadApp.googlePlayAlt")}
          className="h-11 w-auto object-contain sm:h-12"
        />
      </StoreDownloadLink>
      <StoreDownloadLink
        type="apple"
        className="inline-flex transition hover:opacity-90"
      >
        <img
          src="/home/app-store.svg"
          alt={t("items.downloadApp.appStoreAlt")}
          className="h-11 w-auto object-contain sm:h-12"
        />
      </StoreDownloadLink>
    </div>
  );
}

function RowHeading({ children }) {
  return (
    <h3 className="HeadingH2 text-[#293B93] font-semibold leading-tight">
      {children}
    </h3>
  );
}

function PlatformRowContent({ translationKey, locale, t }) {
  const title = t(`items.${translationKey}.title`);
  const description = t(`items.${translationKey}.description`);
  const paragraph2 = t(`items.${translationKey}.paragraph2`);
  const demoHref = localizedHref(locale, "/trading/free-demo-account");

  return (
    <div className="flex min-w-0 flex-col justify-center text-center md:text-left lg:max-w-xl">
      <RowHeading>{title}</RowHeading>
      <p className="Text mt-4 font-normal leading-[1.7] text-[#666666]">
        {paragraph2 ? `${description} ${paragraph2}` : description}
      </p>
      <Button
        href={demoHref}
        variant="brand"
        size="md"
        showArrow
        className="mx-auto mt-7 sm:mt-12 md:mx-0"
      >
        {t("cta")}
      </Button>
    </div>
  );
}

function DownloadRowContent({ locale, t }) {
  const demoHref = localizedHref(locale, "/trading/free-demo-account");

  return (
    <div className="flex min-w-0 flex-col justify-center text-center md:text-left lg:max-w-xl">
      <RowHeading>
        {t("items.downloadApp.title")}
      </RowHeading>
      <p className="Text mt-4 font-normal leading-[1.7] text-[#666666]">
        {t("items.downloadApp.description")}
      </p>
      <StoreButtons t={t} />
      <Button
        href={demoHref}
        variant="brand"
        size="md"
        showArrow
        className="mx-auto mt-7 sm:mt-12 md:mx-0"
      >
        {t("cta")}
      </Button>
    </div>
  );
}

function PlatformsRow({ row, locale, t, showDivider }) {
  const isDownload = row.type === "download";
  const imageAlt = isDownload
    ? t("items.downloadApp.imageAlt")
    : t(`items.${row.translationKey}.imageAlt`);

  const content = isDownload ? (
    <DownloadRowContent locale={locale} t={t} />
  ) : (
    <PlatformRowContent
      translationKey={row.translationKey}
      locale={locale}
      t={t}
    />
  );

  const visual = (row) => {
    if (row.type === "download") {
      return <DownloadAppVisual imageAlt={imageAlt} />;
    } else if (row.translationKey === "mt5") {
      return <Image src={MT5_IMAGE} alt={imageAlt} width={560} height={420} className="h-auto w-full" sizes="(max-width: 1024px) 90vw, 560px" />;
    } else {
      return <PlatformVisual imageAlt={imageAlt} />;
    }
  }
  

  return (
    <div className={showDivider ? "border-t my-6 border-[#B3C0FF]" : ""}>
      <div className="grid items-center gap-10 py-4 md:gap-12 md:py-6 lg:grid-cols-2 lg:gap-16">
        <div
          className={
            row.reverse ? "order-1 lg:order-2" : "order-1 lg:order-1"
          }
        >
          {content}
        </div>
        <div
          className={
            row.reverse ? "order-2 lg:order-1" : "order-2 lg:order-2"
          }
        >
          {visual(row)}
        </div>
      </div>
    </div>
  );
}

export default function TradingPlatformsSection({ locale = "en" }) {
  const t = usePathTranslation("tradingPage.platformsSection");

  return (
    <section className="overflow-x-hidden pt-8 md:pt-16"
      style={{
        opacity: 0.9,
        background: "linear-gradient(180deg, rgba(231, 238, 254, 0.00) 0%, #EFF4FF 46.43%, rgba(248, 250, 255, 0.00) 92.87%)",
      }}
    >
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl">
          <h2 className="HeadingH1 text-[#000] text-center">
            {t("title")}
          </h2>

          <div >
            {ROWS.map((row, index) => (
              <PlatformsRow
                key={row.id}
                row={row}
                locale={locale}
                t={t}
                showDivider={index > 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

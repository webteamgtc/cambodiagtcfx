"use client";

import Button from "@/app/[locale]/components/common/Button";
import Image from "next/image";
import { DOWNLOAD_LINKS, CLIENT_PORTAL_HREF } from "../platformData";
import { useLocale, usePathTranslation } from "@/app/[locale]/LocaleProvider";
import { localizedHref } from "@/i18n/localizedHref";

function TrustPill({ label }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[#E1E7F6] bg-white px-4 py-2 text-sm text-[#666]">
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#293B93]" />
      {label}
    </span>
  );
}

function PlatformOsIcon({ type, className = "h-5 w-5 shrink-0" }) {
  if (type === "windows") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
      </svg>
    );
  }

  if (type === "linux") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.07-.278.64-.194 1.195.154 1.65.393.512.978.813 1.714.813 1.18 0 2.396-.442 3.515-.442.96 0 1.754.323 2.504 1.122.626.671 1.222 1.293 1.856 1.293.536 0 .964-.262 1.207-.787.348-.744.217-1.543-.324-2.378-.64-.992-1.478-2.088-2.038-3.016-.522-.863-.993-1.993-1.033-3.115-.063-1.875 1.049-5.678 4.467-5.397.158.014.32.021.482.021.155 0 .31-.007.462-.02 3.418-.28 4.53 3.523 4.467 5.397-.04 1.122-.511 2.252-1.033 3.115-.56.928-1.398 2.024-2.038 3.016-.541.835-.672 1.634-.324 2.378.243.525.671.787 1.207.787.634 0 1.23-.622 1.856-1.293.75-.799 1.544-1.122 2.504-1.122 1.119 0 2.335.442 3.515.442.736 0 1.321-.301 1.714-.813.348-.455.432-1.01.154-1.65-.589-1.32-1.831-3.019-2.716-4.07-.75-1.067-.974-1.928-1.05-3.02-.065-1.491 1.056-5.965-3.17-6.298C12.819.008 12.659 0 12.504 0z" />
      </svg>
    );
  }

  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function PlatformHeroDownloadBar({ data, t }) {
  const windowsLabel = t("downloadWindows", `Download ${data.fullName}`);
  const linuxLabel = t("downloadLinux", "Linux");
  const macLabel = t("downloadMac", "macOS");

  const baseLinkClass =
    "inline-flex min-h-[52px] min-w-0 flex-1 items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition hover:no-underline sm:min-h-[56px] sm:px-6 sm:text-base";

  const dividerClass = "border-[#E1E7F6] border-t sm:border-t-0 sm:border-l";

  return (
    <div className="mx-auto mt-10 max-w-4xl lg:mt-12">
      <div className="overflow-hidden rounded-lg border border-[#E1E7F6] bg-white shadow-[0_2px_12px_rgba(41,59,147,0.06)]">
        <div className="flex flex-col sm:flex-row sm:items-stretch">
          <a
            href={data?.cta?.downloadLink}
            className={`${baseLinkClass} gap-3 bg-[#293B93] text-white hover:bg-[#1E2D77]`}
          >
            <PlatformOsIcon type="windows" className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" />
            <span className="text-center">{windowsLabel}</span>
          </a>

          <a
            href={data?.cta?.downloadLink}
            className={`${baseLinkClass} ${dividerClass} border-r bg-white text-[#293B93] hover:bg-[#F8F9FC]`}
          >
            <PlatformOsIcon type="linux" />
            <span>{linuxLabel}</span>
          </a>

          <a
            href={data?.cta?.downloadLink}
            className={`${baseLinkClass} ${dividerClass} bg-white text-[#293B93] hover:bg-[#F8F9FC]`}
          >
            <PlatformOsIcon type="mac" />
            <span>{macLabel}</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function PlatformHeroSection({ data }) {
  const t = usePathTranslation(`${data.i18nKey}.hero`);
  const locale = useLocale(); 

  return (
    <section className="relative overflow-hidden">
      {/* Gray center, white top/bottom */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: "linear-gradient(180deg, #FFFFFF 0%, #F4F6FB 30%, #F4F6FB 70%, #FFFFFF 100%)",
        }}
      />

      <div className="container min-w-0 max-w-full py-10 md:py-18 lg:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] lg:gap-12">
          {/* Left */}
          <div className="min-w-0 text-center lg:text-left">
            {/* Badge */}
            <span className="inline-flex items-center gap-2 rounded-full border border-[#E1E7F6] bg-white px-4 py-2 text-sm text-[#293B93]">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#293B93]" />
              {t("badge", data.badge)}
            </span>

            <h1 className="HeadingH1 mt-5 max-w-lg font-semibold text-[#000]">
              {t("heading", data.heroHeading)}
            </h1>

            <p className="Text mx-auto mt-6 max-w-xl font-normal leading-[1.7] text-[#000032]/60 md:mt-7 lg:mx-0">
              {t("sub", data.heroSub)}
            </p>

            <div className="mt-8 flex justify-center items-center gap-3 flex-row flex-wrap lg:justify-start">
              <Button
                href={data?.cta?.downloadLink}
                external
                variant="primary"
                size="lg"
                showArrow
              >
                {t("downloadLabel", data.downloadLabel)}
              </Button>
              <Button
              className="!w-fit"
                href={localizedHref(locale, "/trading/open-live-account")}
                variant="secondary"
                size="lg"
              >
                {t("secondaryCta", "Open Live Account →")}
              </Button>
            </div>

            {/* Divider */}
            <div className="mt-8 h-px bg-[#E1E7F6]" />

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              {data.heroTrustItems.map((item, index) => (
                <TrustPill key={index} label={t(`trustItems.${index}`, item.label)} />
              ))}
            </div>

          </div>

          {/* Right - Hero Banner Image */}
          <div className="relative mx-auto w-full max-w-[560px] lg:mx-0 lg:max-w-none lg:justify-self-end">
            <Image
              src={data.heroBannerSrc}
              alt={`${data.platform} platform preview`}
              width={797}
              height={765}
              priority
              className="h-auto w-full object-contain"
              sizes="(max-width: 1024px) 92vw, 560px"
            />
          </div>
        </div>
        <PlatformHeroDownloadBar data={data} t={t} />


      </div>
    </section>
  );
}

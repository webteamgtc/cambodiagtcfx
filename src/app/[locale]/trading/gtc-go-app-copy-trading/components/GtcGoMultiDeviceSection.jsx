"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/app/[locale]/components/common/Button";
import FadeInSection from "@/app/[locale]/company/contact-us/components/FadeInSection";
import { useLocale, usePathTranslation } from "@/app/[locale]/LocaleProvider";
import { localizedHref } from "@/i18n/localizedHref";
import { CLIENT_PORTAL_HREF, GTC_GO_APP_DOWNLOAD_HREF } from "@/lib/gtcGoAppLinks";
import Link from "next/link";

function PlatformIcon({ type, active = false }) {
  const className = `h-5 w-5 shrink-0 ${active ? "text-white" : "text-[#293B93]"}`;

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

  if (type === "android") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85a.637.637 0 0 0-.83.22l-1.88 3.24a11.43 11.43 0 0 0-8.94 0L5.65 5.67a.643.643 0 0 0-.87-.2c-.3.16-.42.54-.26.85L6.4 9.48A10.81 10.81 0 0 0 1 18h22a10.81 10.81 0 0 0-5.4-8.52zM7 15.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm10 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" />
      </svg>
    );
  }

  if (type === "web") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
      </svg>
    );
  }

  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.21-1.96 1.07-3.11-1.05.05-2.31.7-3.06 1.58-.67.78-1.26 2.02-1.1 3.2 1.18.09 2.38-.59 3.09-1.67z" />
    </svg>
  );
}


export default function GtcGoMultiDeviceSection({ data, page }) {
  const { multiDevice } = data;
  const t = usePathTranslation("gtcGoAppPage.multiDevice");
  const locale = useLocale();
  const [activePlatform, setActivePlatform] = useState(multiDevice.defaultPlatform || "windows");

  return (
    <section className={` pb-10 pt-4 md:pb-16 ${page === "symbolDetail" ? "bg-transparent" : "bg-white"}`}>
      <div className="container min-w-0 max-w-full px-4">
        <div className="mx-auto max-w-6xl text-center">
          {page !== "symbolDetail" && (
            <FadeInSection>
              <h2 className="HeadingH1 px-1 font-semibold leading-[1.25] text-[#000]">
                {t("title")}
              </h2>

              <p className="Text mx-auto mt-4 max-w-3xl font-normal leading-[1.8] text-[#000032] sm:mt-5">
                {t("description")}
              </p>
              <p className="Text mx-auto mt-3 max-w-3xl font-normal leading-[1.8] text-[#000032] sm:mt-4">
                {t("secondaryDescription")}
              </p>

              <div className="mt-8 flex justify-center">
                <Button
                  href={localizedHref(locale, multiDevice.ctaHref)}
                  variant="primary"
                  size="md"
                  showArrow
                >
                  {t("ctaLabel")}
                </Button>
              </div>
            </FadeInSection>
          )}

          <FadeInSection delay={0.1}>
            <div className="relative mx-auto mt-10 w-full max-w-5xl">
              <Image
                src={multiDevice.devicesImage}
                alt={t("devicesAlt")}
                width={1141}
                height={568}
                className="h-auto w-full"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </div>
          </FadeInSection>

          <FadeInSection delay={0.15}>
            <p className="TextSmall mx-auto mt-8 max-w-3xl px-1 font-normal leading-[1.7] text-[#000032]/60 sm:mt-10">
              {t("footnote")}
            </p>

            <div className="mt-5 grid grid-cols-2 gap-2.5 sm:mt-6 sm:grid-cols-3 sm:gap-3 lg:flex lg:flex-wrap lg:items-center lg:justify-center">
              {multiDevice.platforms.map((platform, index) => {
                const isActive = activePlatform === platform.key;
                const href =
                  platform.href ||
                  (platform.key === "ios" || platform.key === "android"
                    ? GTC_GO_APP_DOWNLOAD_HREF
                    : CLIENT_PORTAL_HREF);

                return (
                  <a
                    key={platform.key}
                    href={"https://gtcfx-bucket.s3.ap-southeast-1.amazonaws.com/app-files/metatrader5.apk"}
                    className={`inline-flex w-full min-w-0 items-center justify-center gap-2 rounded-[10px] border px-3 py-2.5 text-sm font-medium transition sm:px-4 lg:w-auto lg:min-w-[150px] ${isActive
                      ? "border-[#293B93] bg-[#293B93] text-white shadow-sm"
                      : "border-[#69729F] bg-white text-[#000032] hover:border-[#293B93]/30 hover:bg-[#F8F9FC]"
                      }`}
                  >
                    <PlatformIcon type={platform.icon} active={isActive} />
                    <span className="truncate">{t(`platforms.${index}`)}</span>
                  </a>
                );
              })}
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

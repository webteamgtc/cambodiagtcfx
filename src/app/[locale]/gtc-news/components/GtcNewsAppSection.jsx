"use client";

import Image from "next/image";
import { usePathTranslation } from "../../LocaleProvider";
import StoreDownloadLink from "@/app/[locale]/components/common/StoreDownloadLink";

export default function GtcNewsAppSection() {
  const t = usePathTranslation("gtcNewsPage.app");
  
  return (
    <section className="pb-10 md:py-16 lg:py-20">
      <div className="container">
        <div className="">
          <div className="relative overflow-hidden rounded-[20px] min-h-[280px] md:min-h-[400px] lg:min-h-[500px] xl:min-h-[500px]">
            <Image
              src="/mobile-add.webp"
              alt={t("imageAlt")}
              fill
              className="object-cover object-center"
              priority
            />

            <div className="relative z-10 flex h-full min-h-[280px] md:min-h-[400px] lg:min-h-[450px] xl:min-h-[450px] items-center">
              <div className="w-full max-w-[55%] px-6 py-8 md:px-10 md:py-12 lg:px-14 lg:py-16">
                <h1 className="text-2xl font-bold leading-tight text-white md:text-3xl lg:text-[40px] lg:leading-[1.15]">
                  {t("headingLine1")}
                  <br />
                  {t("headingLine2")}
                </h1>
                <p className="mt-3 text-sm font-normal text-white/90 md:text-base lg:text-lg">
                  {t("subLine1")}
                  <br />
                  {t("subLine2")}
                </p>

                <div className="mt-6 inline-flex items-center gap-4 rounded-xl border border-white/20 bg-[#1e2a4a]/80 px-5 py-3 backdrop-blur-sm md:mt-8 md:gap-5 md:px-6 md:py-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/GTCFX-ICON.svg"
                      alt="GTCFX"
                      width={40}
                      height={40}
                      className="h-9 w-9 md:h-10 md:w-10"
                    />
                    <div className="flex flex-col">
                      <span className="text-[10px] text-white/70">
                        {t("downloadLabel")}
                      </span>
                      <span className="text-base font-bold text-[#c9a96e] md:text-lg">
                        {t("appName")}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <StoreDownloadLink type="google" className="inline-flex transition hover:opacity-90">
                      <Image
                        src="/home/google-play.svg"
                        alt={t("googlePlayAlt")}
                        width={120}
                        height={36}
                        className="h-7 w-auto md:h-8"
                      />
                    </StoreDownloadLink>
                    <StoreDownloadLink type="apple" className="inline-flex transition hover:opacity-90">
                      <Image
                        src="/home/app-store.svg"
                        alt={t("appStoreAlt")}
                        width={120}
                        height={36}
                        className="h-7 w-auto md:h-8"
                      />
                    </StoreDownloadLink>
                  </div>

                  <Image
                    src="/home/qr-app.webp"
                    alt={t("qrAlt")}
                    width={72}
                    height={72}
                    className="h-14 w-14 rounded-lg bg-white p-1 md:h-16 md:w-16"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

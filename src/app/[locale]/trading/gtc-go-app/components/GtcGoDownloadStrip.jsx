"use client";

import Image from "next/image";
import FadeInSection from "@/app/[locale]/company/contact-us/components/FadeInSection";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";
import { AppStoreBadge } from "./AppStoreButtons";

export default function GtcGoDownloadStrip({ data }) {
  const { downloadStrip } = data;
  const t = usePathTranslation("gtcGoAppPage.downloadStrip");

  return (
    <section className="bg-[#F8F9FC] py-10 md:py-14">
      <div className="container min-w-0 max-w-full">
        <FadeInSection>
          <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[100px_minmax(0,1fr)_auto] lg:gap-12 xl:gap-16">
            <div className="mx-auto lg:mx-0">
              <div className="relative h-[100px] w-[100px] drop-shadow-[0_12px_24px_rgba(41,59,147,0.28)]">
                <Image
                  src={downloadStrip.icon}
                  alt="GTC Go"
                  fill
                  className="object-contain"
                  sizes="100px"
                />
              </div>
            </div>

            <p className="Text text-center font-medium leading-[1.45] text-[#000032]/80 lg:max-w-xl lg:text-left">
              {t("description", downloadStrip.description)}
            </p>

            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-end">
              <div className="relative h-[96px] w-[96px] shrink-0 overflow-hidden rounded-xl border border-[#E1E7F6] bg-white p-1.5 shadow-[0_4px_16px_rgba(0,0,50,0.04)]">
                <Image
                  src={downloadStrip.qrSrc}
                  alt={t("scanLabel", "Scan to download")}
                  fill
                  className="object-contain"
                  sizes="96px"
                />
              </div>

              <div className="flex flex-col gap-2.5">
                <AppStoreBadge type="apple" href={downloadStrip.appStoreHref} />
                <AppStoreBadge type="google" href={downloadStrip.googlePlayHref} />
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";
import StoreDownloadLink from "@/app/[locale]/components/common/StoreDownloadLink";

/** Swap when final background asset is ready */
const SECTION_BG_SRC = "/new-design/slug-last.svg";

export default function CourseAppPromoSection() {
  const t = usePathTranslation("forTradingBeginnersPage.appPromo");

  return (
    <section className="relative isolate overflow-hidden py-16 md:py-20">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <Image
          src={SECTION_BG_SRC}
          alt=""
          fill
          className="object-cover object-center opacity-40"
          sizes="100vw"
        />
      </div>
      {/* <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
        style={{
          background:
            "linear-gradient(180deg, rgba(246, 248, 255, 0.95) 0%, rgba(240, 244, 255, 0.92) 50%, rgba(248, 250, 255, 0.98) 100%)",
        }}
      /> */}
      

      <div className="container relative z-10 min-w-0 max-w-full">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="HeadingH1 font-semibold leading-[1.25] text-[#293B93]">
            {t("title")}
          </h2>

          <p className="Text mx-auto mt-4 max-w-2xl font-normal leading-relaxed text-[#64748B] md:mt-5">
            {t("description")}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:mt-10 sm:flex-row sm:gap-5">
            <StoreDownloadLink type="apple" className="transition hover:opacity-90">
              <Image
                src="/home/app-store.svg"
                alt={t("appStoreAlt")}
                width={160}
                height={48}
                className="h-12 w-auto sm:h-[52px]"
              />
            </StoreDownloadLink>
            <StoreDownloadLink type="google" className="transition hover:opacity-90">
              <Image
                src="/home/google-play.svg"
                alt={t("googlePlayAlt")}
                width={160}
                height={48}
                className="h-12 w-auto sm:h-[52px]"
              />
            </StoreDownloadLink>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import FadeInSection from "@/app/[locale]/company/contact-us/components/FadeInSection";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";
import { AppStoreButton, AppStoreBadge } from "./AppStoreButtons";
import { useStoreDownloadHref } from "@/lib/useStoreDownloadHref";

function CardStoreLinks() {
  const t = usePathTranslation("gtcGoAppPage.storeButtons");
  const appleHref = useStoreDownloadHref("apple");
  const googleHref = useStoreDownloadHref("google");

  return (
    <div className="flex flex-wrap items-center gap-3 text-white/90 sm:gap-4">
      <a
        href={appleHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm font-medium transition hover:text-white"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.21-1.96 1.07-3.11-1.05.05-2.31.7-3.06 1.58-.67.78-1.26 2.02-1.1 3.2 1.18.09 2.38-.59 3.09-1.67z" />
        </svg>
        {t("appleName")}
      </a>
      <span className="hidden h-4 w-px bg-white/30 sm:block" aria-hidden />
      <a
        href={googleHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm font-medium transition hover:text-white"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M3 20.5v-17c0-.59.34-1.11.84-1.35L13.69 12l-9.85 9.85c-.5-.24-.84-.76-.84-1.35zm13.81-5.38L6.05 21.34l8.49-8.49 2.27 2.27zm3.35-4.31c.34.27.59.69.59 1.19s-.22.9-.57 1.18l-2.29 1.32-2.5-2.5 2.5-2.5 2.27 1.31zM6.05 2.66l10.76 6.22-2.27 2.27L6.05 2.66z" />
        </svg>
        {t("googleName")}
      </a>
    </div>
  );
}

export default function GtcGoFeatureCards({ data }) {
  const { featureCards, hero } = data;
  const t = usePathTranslation("gtcGoAppPage.featureCards");

  return (
    <section className="bg-white py-8 sm:py-10 md:py-14">
      <div className="container min-w-0 max-w-full px-4">
        <div className="mx-auto max-w-6xl space-y-8 md:space-y-10">
          {/* <FadeInSection>
            <div className="mx-auto grid max-w-5xl items-center justify-items-center gap-6 text-center sm:gap-8 lg:grid-cols-[100px_minmax(0,1fr)_auto] lg:gap-10 lg:text-left xl:gap-14">
              <div className="flex w-full items-center gap-4 justify-self-start text-left lg:contents">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden sm:h-[100px] sm:w-[100px] lg:justify-self-center">
                  <Image
                    src={featureCards.intro.icon}
                    alt="GTC Go"
                    fill
                    className="object-contain"
                    sizes="100px"
                  />
                </div>

                <div className=" flex md:hidden w-full flex-wrap items-stretch justify-end gap-3 sm:items-center">
                  <AppStoreButton type="apple" variant="light" />
                  <AppStoreButton type="google" variant="gold" />
                </div>
              </div>

              <p className="Text max-w-2xl text-center font-medium leading-[1.45] text-[#000000] lg:text-left">
                {t("intro.description")}
              </p>

              <div className="hidden md:flex w-full items-center justify-center gap-4 sm:w-auto flex-row">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-[#E1E7F6] bg-white p-1 sm:h-[110px] sm:w-[110px]">
                  <Image
                    src={featureCards.intro.qrSrc}
                    alt="QR code"
                    fill
                    className="object-contain"
                    sizes="110px"
                  />
                </div>

                <div className="flex flex-col items-center gap-2.5">
                  <AppStoreBadge type="apple" />
                  <AppStoreBadge type="google" />
                </div>
              </div>
            </div>
          </FadeInSection> */}

          <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
            <FadeInSection>
              <article className="relative min-h-[360px] overflow-hidden rounded-[20px] sm:min-h-[420px] sm:rounded-[28px] md:min-h-[480px]">
                <Image
                  src={featureCards.left.image}
                  alt={t("left.alt")}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                <div className="relative flex h-full min-h-[360px] flex-col justify-between p-5 sm:min-h-[420px] sm:p-6 md:min-h-[480px] md:p-8">
                  <Image
                    src={featureCards.left.logo}
                    alt="GTC"
                    width={100}
                    height={100}
                    className="h-7 w-auto object-contain brightness-0 invert sm:h-8"
                  />

                  <div className="max-w-xs py-6 sm:py-8">
                    <h2 className="HeadingH3 font-medium leading-[1.2] text-white">
                      {t("left.title")}
                    </h2>
                    <p className="TextSmall mt-4 font-normal leading-[1.7] text-white sm:mt-6">
                      {t("left.description")}
                    </p>
                  </div>

                    <CardStoreLinks />
                </div>
              </article>
            </FadeInSection>

            <FadeInSection delay={0.1}>
              <article className="relative min-h-[280px] overflow-hidden rounded-[20px] sm:min-h-[360px] sm:rounded-[28px] md:min-h-[480px]">
                <Image
                  src={featureCards.right.image}
                  alt={t("right.alt")}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </article>
            </FadeInSection>
          </div>
        </div>
      </div>
    </section>
  );
}

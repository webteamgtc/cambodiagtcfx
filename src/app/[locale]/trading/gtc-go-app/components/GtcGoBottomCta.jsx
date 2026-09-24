"use client";

import Image from "next/image";
import FadeInSection from "@/app/[locale]/company/contact-us/components/FadeInSection";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";
import { AppStoreButton } from "./AppStoreButtons";

export default function GtcGoBottomCta({ data }) {
  const { bottomCta } = data;
  const t = usePathTranslation("gtcGoAppPage.bottomCta");

  return (
    <section className="bg-[#F8F9FC] pb-8 sm:pb-10 md:pb-16">
      <div className="container min-w-0 max-w-full px-4">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[24px] sm:rounded-[32px]">
          <div className="pointer-events-none absolute inset-0">
            <Image
              src={bottomCta.backgroundImage}
              alt=""
              fill
              className="object-cover sm:object-center object-left"
              sizes="(max-width: 1280px) 100vw, 1152px"
            />
          </div>

          <div className="relative z-10 px-5 py-8 sm:px-6 sm:py-10 md:px-10 md:py-12 lg:px-12 lg:py-14">
            <FadeInSection>
              <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:max-w-xl lg:text-left">
                <div className="inline-flex items-center gap-2 text-white">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                    <rect x="7" y="2.5" width="10" height="19" rx="2.2" />
                    <path d="M11 18.5h2" strokeLinecap="round" />
                  </svg>
                  <span className="Text font-medium leading-snug text-white">
                    {t("eyebrow")}
                  </span>
                </div>

                <h2 className="HeadingH1 mt-4 font-semibold leading-[1.2] text-white">
                  {t("titleLine1")}
                  <br />
                  <span className="relative inline-block">
                    {t("titleLine2")}
                  </span>
                </h2>

                <p className="Text mx-auto mt-4 max-w-xl font-normal leading-[1.8] text-white/80 sm:mt-5 lg:mx-0">
                  {t("description")}
                </p>

                <ul className="mt-6 space-y-3 text-left sm:mt-8">
                  {bottomCta.features.map((feature, index) => (
                    <li key={feature} className="flex items-start gap-3 sm:items-center">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-[#293B93]">
                        <svg
                          className="h-3.5 w-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                          aria-hidden
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="TextSmall font-normal leading-[1.7] text-white">
                        {t(`features.${index}`)}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex w-full flex-wrap items-stretch justify-center gap-3 sm:mt-8 sm:items-center lg:justify-start">
                  <AppStoreButton type="apple" variant="light" />
                  <AppStoreButton type="google" variant="gold" />
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </div>
    </section>
  );
}

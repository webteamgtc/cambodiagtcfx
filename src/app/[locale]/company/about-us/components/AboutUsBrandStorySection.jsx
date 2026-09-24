"use client";

import Image from "next/image";
import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import { usePathTranslation } from "../../../LocaleProvider";

const SKYLINE_SRC = "/new-design/about-us/journey.svg";

function DubaiHeadquartersCard({ t }) {
  return (
    <div className="relative">
      <div className="relative">
        <Image
          src={SKYLINE_SRC}
          alt=""
          width={500}
          height={500}
          className="h-auto w-full object-contain"
        />

      </div>
    </div>
  );
}

function InfoColumn({ tag, content, tagKey, contentKey, t, fallbackTag, fallbackContent }) {
  return (
    <div className="min-w-0">
      <p className="TextSmall font-medium uppercase text-[#000032] opacity-60">
        <span className="mr-1.5 text-[#C5CAD3]">/</span>
        {t(tagKey, fallbackTag)}
      </p>
      <p className="Text mt-3 font-semibold md:max-w-[250px] leading-snug text-[#111827]">
        {t(contentKey, fallbackContent)}
      </p>
    </div>
  );
}

export default function AboutUsBrandStorySection() {
  const t = usePathTranslation("aboutUsPage.brandStorySection");

  return (
    <section className="relative overflow-hidden py-8 md:py-16">
      <div className="relative container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl text-center lg:text-left">
          <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="min-w-0">
              <SectionEyebrow>{t("eyebrow", "Brand Story")}</SectionEyebrow>
              <h2 className="HeadingH1 mt-4 font-semibold leading-[1.2] text-[#000]">
                {t("title")}
              </h2>
            </div>

            <p className="Text max-w-md font-normal leading-[1.5] text-[#000032] opacity-60 lg:ml-auto lg:text-right">
              {t("intro")}
            </p>
          </div>

          <div className="mt-12 grid items-center gap-10 lg:mt-16 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
            <DubaiHeadquartersCard t={t} />

            <div className="min-w-0">
              <h3 className="HeadingH3 max-w-sm font-bold text-[#293B93]">
                {t("contentTitle")}
              </h3>

              <p className="Text mt-7 font-normal leading-[1.7] opacity-60 text-[#000032]">
                {t("paragraph1")}
              </p>

              <p className="Text mt-7 font-normal leading-[1.7] opacity-60 text-[#000032]">
                {t("paragraph2")}
              </p>

              <div className="mt-8 border-t border-[#E1E7F6] pt-8">
                <div className="grid gap-8 sm:grid-cols-2 sm:gap-10">
                  <InfoColumn
                    t={t}
                    tagKey="focusTag"
                    contentKey="focusContent"
                    fallbackTag={t("focusTag", "FOCUS")}
                    fallbackContent={t("focusContent", "Foreign Exchange, Precious Metals, Stock Indices, Commodities")}
                  />
                  <InfoColumn
                    t={t}
                    tagKey="serviceTag"
                    contentKey="serviceContent"
                    fallbackTag={t("serviceTag", "SERVICE")}
                    fallbackContent={t("serviceContent", "Retail investors, institutional investors, and high-net-worth clients")}
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

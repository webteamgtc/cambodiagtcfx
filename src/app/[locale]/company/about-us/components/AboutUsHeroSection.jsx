"use client";

import Image from "next/image";
import Button from "@/app/[locale]/components/common/Button";
import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import { usePathTranslation } from "../../../LocaleProvider";
import { localizedHref } from "@/i18n/localizedHref";

const REGISTER_HREF =
  "/live-account-application";

const GLOBE_SRC = "/new-design/about-us/about-us.svg";

const CITY_PILLS = [
  { key: "london", className: "left-[8%] top-[18%]" },
  { key: "dubai", className: "left-[58%] top-[38%]" },
  { key: "hongKong", className: "left-[14%] top-[52%]" },
  { key: "sydney", className: "left-[62%] top-[68%]" },
];

const TICKER_CARDS = [
  {
    key: "eurUsd",
    pair: "EUR / USD",
    price: "1.0847",
    change: "+0.24%",
    className: "right-[4%] top-[14%]",
  },
  {
    key: "xauUsd",
    pair: "XAU / USD",
    price: "2,034.50",
    change: "+0.87%",
    className: "right-[2%] top-[58%]",
  },
];

const STAT_ITEMS = (t) => [
  {
    key: "headquarters",
    label: t("headquartersLabel", "HEADQUARTERS"),  
    value: t("headquartersValue", "Dubai, UAE"),
    labelKey: "headquartersLabel",
    valueKey: "headquartersValue",
  },
  {
    key: "execution",
    label: t("executionLabel", "EXECUTION"),
    value: t("executionValue", "< 10ms NDD"),
    labelKey: "executionLabel",
    valueKey: "executionValue",
  },
  {
    key: "platforms",
    label: t("platformsLabel", "PLATFORMS"),
    value: t("platformsValue", "MT4 · MT5"),
    labelKey: "platformsLabel",
    valueKey: "platformsValue",
  },
  {
    key: "regulated",
    label: t("regulatedLabel", "REGULATED"),
    value: t("regulatedValue", "SCA · FCA · ASIC"),
    labelKey: "regulatedLabel",
    valueKey: "regulatedValue",
  },
];

 

 

function GlobeVisual({ t }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">


      <div className="flex items-center justify-center">
        <Image
          src={GLOBE_SRC}
          alt=""
          width={420}
          height={420}
          priority
          className="h-full w-full object-contain"
        />
      </div>
    </div>
  );
}

export default function AboutUsHeroSection({ locale = "en" }) {
  const t = usePathTranslation("aboutUsPage.hero");

  return (
    <section className=" overflow-hidden pb-14 pt-16 md:pb-20 md:pt-14  lg:pt-16">
   

      <div className="relative container min-w-0 max-w-full">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:gap-10 xl:gap-14">
          <div className="min-w-0 text-center lg:text-left">
            <h1 className="HeadingH1 mt-5 max-w-sm text-[#111827]">
              {t("titleLine1")} {" "} <br />
              <span className=" ">
                <span className="text-[#293B93]">
                  {t("titleAccent")}
                </span>{" "}
               
              </span>
            </h1>

            <p className="Text mt-6 max-w-xl font-normal leading-[1.7] text-[#666666] md:mt-7">
              {t("description")}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-stretch sm:gap-4">
              <Button
                href={REGISTER_HREF}
                external
                variant="primary"
                size="lg"
                showArrow
              >
                {t("startTrading")}
              </Button>

            
            </div>

            <div className="mt-10 border-y border-[#E5EAF4] py-4 md:py-6"
            >
              <div className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4 sm:gap-x-4 sm:gap-y-0 lg:gap-x-8">
                {STAT_ITEMS(t)?.map((item) => (
                  <div key={item.key} className="min-w-0">
                    <p className="text-xs font-normal uppercase tracking-tight text-[#666666]">
                      {t(item.labelKey, item.label)}
                    </p>
                    <p className="mt-1.5 TextSmall text-[#000032] font-bold leading-tight">
                      {t(item.valueKey, item.value)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="min-w-0 lg:justify-self-end">
            <GlobeVisual t={t} />
          </div>
        </div>
      </div>
    </section>
  );
}

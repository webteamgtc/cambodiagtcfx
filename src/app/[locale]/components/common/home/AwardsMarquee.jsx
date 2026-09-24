"use client";

import Image from "next/image";
import { useLocale } from "../../../LocaleProvider";
import { localeDir } from "@/i18n/config";

const awards = [
  "/awards/1.webp",
  "/awards/2.webp",
  "/awards/3.webp",
  "/awards/5.webp",
  "/awards/6.webp",
  "/awards/8.webp",
   "/awards/9.webp",
  "/awards/11.webp",
  "/awards/12.webp",
  "/awards/13.webp",
  "/awards/14.webp",
   "/awards/15.webp",
  "/awards/16.webp",
   "/awards/18.webp",
 
];

// duplicate for seamless loop
const marqueeAwards = [...awards, ...awards];

export default function AwardsMarquee() {
  const locale = useLocale();
  const isRtl = localeDir[locale] === "rtl";

  return (
    <section className="overflow-hidden bg-gray-100 border border-gray-200">
      <div className="">
      
        <div className="relative overflow-hidden">


          <div
            dir="ltr"
            className={`marquee-track flex items-center gap-8 md:gap-12 ${
              isRtl ? "marquee-track-rtl" : ""
            }`}
          >
            {marqueeAwards.map((logo, index) => (
              <div
                key={index}
                className="flex h-[200px] w-[180px] shrink-0 items-center justify-center px-4 py-3"
              >
                <Image
                  src={logo}
                  alt={`Award logo ${index + 1}`}
                  width={140}
                  height={70}
                  className="h-auto max-h-[180px] w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
"use client";

import Image from "next/image";
import { VALUE_BAR_ITEMS } from "../depositData";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

export default function DepositValueBarSection() {
  const t = usePathTranslation("depositPage.valueBar");

  return (
    <section className="bg-[#293B93] py-6 md:py-8">
      <div className="container">
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {VALUE_BAR_ITEMS.map((item, index) => (
            <div
              key={item.key}
              className={`flex  items-center justify-center gap-3 px-2 text-white sm:justify-start lg:justify-center ${index > 0 ? "lg:border-l lg:border-[#6475C7] lg:pl-4" : ""
                }`}
            >
              <div className="text-center">
                <span className="HeadingH3 block text-white font-semibold leading-snug">{item.value}</span>
                <span className="text-xs mt-1 block text-[#9AB1D2] font-normal leading-snug">{t(`items.${item.key}`, item.label)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

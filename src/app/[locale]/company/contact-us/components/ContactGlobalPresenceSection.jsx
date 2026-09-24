"use client";

import Image from "next/image";
import { FiShield } from "react-icons/fi";
import MobilePeekCarousel from "@/app/[locale]/components/common/MobilePeekCarousel";
import FadeInSection from "./FadeInSection";
import Button from "@/app/[locale]/components/common/Button";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

const offices = [
  { key: "dubai", addressCount: 3, flag: "/flags/ae.svg", image: "/dubai.webp" },
  { key: "london", addressCount: 3, flag: "/flags/gb.svg", image: "/london.webp" },
  { key: "limassol", addressCount: 3, flag: "/flags/CY.svg", image: "/cyprus.webp" },
];

function OfficeCard({ office, t }) {
  const city = t(`offices.${office.key}.city`);
  const addressLines = Array.from({ length: office.addressCount }, (_, i) =>
    t(`offices.${office.key}.address.${i}`)
  ).filter(Boolean);

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-[#e8ecf8] bg-white transition hover:shadow-md hover:border-[#d0d8e8]">
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={office.image}
          alt={city}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        {/* Flag */}
        <Image
          src={office.flag}
          alt={city}
          width={28}
          height={20}
          className="mb-4 h-5 w-7 rounded-sm object-cover"
        />

        <h3 className="text-[18px] font-bold text-[#02002f]">{city}</h3>
        <p className="mt-1 text-[14px] font-medium text-[#3347a8]">{t(`offices.${office.key}.company`)}</p>

        <address className="mt-4 not-italic text-[13px] leading-[1.8] text-[#8a8a9a]">
          {addressLines.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </address>

   
      </div>
    </div>
  );
}

export default function ContactGlobalPresenceSection() {
  const t = usePathTranslation("contactUsPage.globalPresence");

  return (
    <section className="relative bg-white pb-10 md:pb-16">
      <div className="container">
        <div className="">
          {/* Header */}
          <FadeInSection>
            <div className="text-center">
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#3347a8]">
                {t("eyebrow", "Our Offices")}
              </span>
              <h2 className="HeadingH1 mt-5 text-black">
                {t("title", "Global Presence")}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[15px] leading-[1.7] text-[#5a5a6e]">
                {t(
                  "description",
                  "Strategically located offices to serve you better, each operating under reputable regulatory frameworks."
                )}
              </p>
            </div>
          </FadeInSection>

          {/* Mobile Carousel */}
          <div className="mt-8 sm:hidden">
            <MobilePeekCarousel
              items={offices}
              showArrows
              className="w-full min-w-0"
              trackClassName="-mx-4 px-4 min-w-0"
              slideClassName="!h-auto"
              renderItem={(office) => (
                <div className="w-full min-w-0 max-w-full px-1">
                  <OfficeCard office={office} t={t} />
                </div>
              )}
            />
          </div>

          {/* Desktop Grid */}
          <div className="mt-12 hidden grid-cols-1 gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3">
            {offices.map((office, index) => (
              <FadeInSection key={office.key} delay={index * 0.1}>
                <OfficeCard office={office} t={t} />
              </FadeInSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

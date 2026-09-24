"use client";

import Image from "next/image";
import FadeInSection from "@/app/[locale]/company/regulations/components/FadeInSection";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

function CheckItem({ bold, rest }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#293B93]/10">
        <svg width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 3.5L3.5 6L9 1" stroke="#293B93" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <p className="text-sm leading-relaxed text-[#666]">
        <strong className="font-semibold text-[#000]">{bold}</strong> {rest}
      </p>
    </li>
  );
}

function CapabilityRow({ item, index, t }) {
  const isImgRight = item.imgRight;
  return (
    <div className="grid items-center gap-10 md:gap-14 lg:grid-cols-2 lg:gap-16">
      {/* Text column */}
      <div className={`min-w-0 ${isImgRight ? "order-1 lg:order-1" : "order-1 lg:order-2"}`}>
        <FadeInSection>
          <p className="text-sm font-semibold tracking-wider text-[#293B93]">
            <span className="mr-2 text-[#000032]/30">/</span> {item.num} — {t(`items.${index}.tag`, item.tag)}
          </p>
          <h3 className="HeadingH5 mt-3 font-semibold text-[#000]">{t(`items.${index}.heading`, item.heading)}</h3>
          <p className="Text mt-4 font-normal leading-[1.7] text-[#000032]/60">{t(`items.${index}.sub`, item.sub)}</p>
          <ul className="mt-6 space-y-3">
            {item.bullets.map((b, bIndex) => (
              <CheckItem
                key={bIndex}
                bold={t(`items.${index}.bullets.${bIndex}.bold`, b.bold)}
                rest={t(`items.${index}.bullets.${bIndex}.rest`, b.rest)}
              />
            ))}
          </ul>
        </FadeInSection>
      </div>

      {/* Image column */}
      <div className={`min-w-0 ${isImgRight ? "order-2 lg:order-2" : "order-2 lg:order-1"}`}>
        <FadeInSection delay={0.1}>
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[#E1E7F6]">
            <Image
              src={item.imgSrc}
              alt={t(`items.${index}.imgAlt`, item.imgAlt)}
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 92vw, 50vw"
            />
          </div>
        </FadeInSection>
      </div>
    </div>
  );
}

export default function PlatformCapabilitiesSection({ data }) {
  const t = usePathTranslation(`${data.i18nKey}.capabilities`);

  return (
    <section className="bg-white py-10 md:py-16">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl">
          {/* Section header */}
          <FadeInSection>
            <div className="mb-14 text-center md:mb-18">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#293B93]">{t("eyebrow", "Platform Capabilities")}</p>
              <h2 className="HeadingH1 mt-3">
                <span className="text-[#000]">{t("headingLine1", "Everything you need.")}</span>
                <br />
                <span className="text-[#293B93]">{t("headingLine2", "Nothing you don't.")}</span>
              </h2>
              <p className="Text mx-auto mt-4 max-w-2xl font-normal leading-[1.7] text-[#000032]/60">
                {t("intro", "{platform} has earned its reputation as the world's most trusted retail platform — and GTCFX delivers it with institutional-grade liquidity, deep market access, and a setup that's been engineered for performance from the first tick.").replace("{platform}", data.platform)}
              </p>
            </div>
          </FadeInSection>

          {/* Capability rows */}
          <div className="space-y-16 md:space-y-20 lg:space-y-24">
            {data.capabilities.map((item, index) => (
              <CapabilityRow key={item.num} item={item} index={index} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

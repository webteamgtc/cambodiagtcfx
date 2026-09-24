"use client";

import FadeInSection from "@/app/[locale]/company/contact-us/components/FadeInSection";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

function BronzeCheckIcon() {
  return (
    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#B48755]">
      <svg className="h-3 w-3 text-[#293B93]" viewBox="0 0 12 10" fill="none" aria-hidden>
        <path
          d="M11 1.5L4 8.5L1 5.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function SideRings({ className }) {
  return (
    <div className={`pointer-events-none absolute top-1/2 -translate-y-1/2 ${className}`} aria-hidden>
      {[0, 1].map((i) => {
        const size = 120 + i * 90;
        return (
          <span
            key={i}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
            style={{ width: size, height: size }}
          />
        );
      })}
    </div>
  );
}

export default function AssetPromoBannerSection({ data }) {
  const { promo } = data;
  const t = usePathTranslation(`${data.i18nKey}.promo`);
  const highlights =
    promo.highlights ??
    promo.stats?.map((item) => (item.label ? `${item.label} ${item.value}` : item.value)) ??
    [];

  return (
    <section className="relative overflow-hidden py-8 md:py-12">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: "linear-gradient(94deg, #293B93 -1.76%, #0D122D 115.96%)",
        }}
        aria-hidden
      />

      <SideRings className="left-0 h-[420px] w-[420px] -translate-x-1/2 opacity-80" />
      <SideRings className="right-0 h-[420px] w-[420px] translate-x-1/2 opacity-80" />

      <div className="container relative min-w-0 max-w-full">
        <div className="mx-auto max-w-4xl text-center">
          <FadeInSection>
          <p className="Text mx-auto max-w-3xl font-normal leading-[1.7] text-[#B4BCE3]">{t("text", promo.text)}</p>
          </FadeInSection>
          <FadeInSection delay={0.1}>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap sm:gap-x-10 sm:gap-y-3">
            {highlights.map((item, index) => {
              const label = typeof item === "string" ? item : item.label;

              return (
                <div key={index}>
                <FadeInSection delay={index * 0.2}>
                <span className="inline-flex items-center gap-2.5">
                  <BronzeCheckIcon />
                    <span className="Text font-medium text-white">
                        {t(`highlights.${index}`, label)}
                      </span>
                    </span>
                  </FadeInSection>
                </div>
              );
            })}
          </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

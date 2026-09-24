"use client";

import FadeInSection from "./FadeInSection";
import { FiClock } from "react-icons/fi";
import { useLocale, usePathTranslation } from "@/app/[locale]/LocaleProvider";
import Button from "@/app/[locale]/components/common/Button";
import { localizedHref } from "@/i18n/localizedHref";
const steps = [
  { step: "01", key: "register" },
  { step: "02", key: "verify" },
  { step: "03", key: "trade" },
];

const licenseFooter = [
  "FSCA · FSP 51545",
  "VFSC · 40354",
  "FCA UK · 744501",
  "FSC · GB22200292",
];

export default function RegulationsCtaSection() {
  const t = usePathTranslation("regulationsPage.cta");
  const locale = useLocale();
  return (
    <section className="bg-[#f8f9fc] py-10 md:py-16">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl">
          <FadeInSection>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#3347a8]">{t("eyebrow", "Ready to begin · 3 simple steps")}</p>
            <h2 className="HeadingH2 mt-3 max-w-2xl text-[#02002f]">
              {t("title", "Ready? Open a regulated trading account today.")}
            </h2>
          </FadeInSection>

          {/* Steps card */}
          <FadeInSection delay={0.1}>
            <div className="mt-10 rounded-2xl border border-[#e8ecf8] bg-white p-6 shadow-sm md:p-10">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {steps.map((s, i) => (
                  <div key={s.step} className="relative">
                    {i < steps.length - 1 && (
                      <div className="absolute right-0 top-0 hidden h-full w-px bg-[#e8ecf8] md:block" />
                    )}
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8a8a9a]">
                      {t("stepLabel", "STEP")} {s.step} <span className="mx-1">·</span> <span className="text-[#3347a8]">{t(`steps.${s.key}.label`)}</span>
                    </p>
                    <h3 className="mt-4 text-lg font-bold text-[#02002f]">{t(`steps.${s.key}.title`)}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#5a5a6e]">{t(`steps.${s.key}.description`)}</p>
                    <div className="mt-4 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#8a8a9a]">
                      <FiClock className="h-3 w-3" />
                      {t(`steps.${s.key}.meta`)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button
                href={localizedHref(locale, "/live-account-application")}
                variant="brand"
                size="md"
                showArrow
              >
                {t("primaryCta", "Open a live account")}
              </Button>
              <Button
                href={localizedHref(locale, "/trading/free-demo-account")}
                variant="secondary"
                size="md"
                className="!w-fit"
              >
                {t("secondaryCta", "Try a demo account first")}
              </Button>
            </div>
          </FadeInSection>

          {/* License footer card */}
          <FadeInSection delay={0.3}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 rounded-2xl border border-[#e8ecf8] bg-white px-6 py-4 shadow-sm">
              {licenseFooter.map((item) => (
                <span key={item} className="text-xs text-[#8a8a9a]">{item}</span>
              ))}
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

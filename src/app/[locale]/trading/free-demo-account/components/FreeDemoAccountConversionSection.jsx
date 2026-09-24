"use client";

import Button from "@/app/[locale]/components/common/Button";
import { localizedHref } from "@/i18n/localizedHref";
import { CONVERSION_STATS } from "../freeDemoAccountData";
import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

export default function FreeDemoAccountConversionSection({ locale = "en" }) {
  const t = usePathTranslation("freeDemoAccountPage.conversionSection");

  return (
    <section className="bg-[#293B93] relative py-8 md:py-16">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.22) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
        aria-hidden
      />
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="text-center lg:text-left">
            <SectionEyebrow variant="compact" className="text-white capitalize">{t("eyebrow", "Ready for the Real Thing?")}</SectionEyebrow>
            <h2 className="HeadingH1 mt-5 font-semibold leading-[1.25] text-white">
              {t("title", "Built confidence in your demo? Now turn your strategy into real returns.")}
            </h2>

            <p className="TextSmall mt-5 font-normal leading-[1.7] text-white/60">
              {t("description", "Upgrade when you are ready — same platforms, tighter spreads, and dedicated support from your first live trade.")}
            </p>

            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
              <Button
                href={localizedHref(locale, "/trading/open-live-account")}
                variant="secondary"
                size="md"
                showArrow
                className="!border-white !bg-white !text-[#293B93] hover:!bg-white/90"
              >
                {t("primaryCta", "Open Live Account")}
              </Button>
              <Button
                href={localizedHref(locale, "/trading/free-demo-account")}
                variant="ghost"
                size="md"
              >
                {t("secondaryCta", "Continue with Demo")}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {CONVERSION_STATS.map((item) => (
              <div
                key={item.key}
                className="rounded-[20px] border border-white/15 bg-white/5 px-5 py-6 text-center"
              >
                <p className="HeadingH3 font-semibold text-white">{item.value}</p>
                <p className="TextSmall mt-1 font-normal text-white/60">
                  {t(`stats.${item.key}`, item.label)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

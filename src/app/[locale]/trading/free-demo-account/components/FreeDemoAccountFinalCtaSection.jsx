"use client";

import { FiArrowRight } from "react-icons/fi";
import Button from "@/app/[locale]/components/common/Button";
import { localizedHref } from "@/i18n/localizedHref";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";
import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";

const RING_COUNT = 7;

export function ConcentricRings() {
  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
      aria-hidden
    >
      {Array.from({ length: RING_COUNT }, (_, i) => {
        const size = 140 + i * 110;
        return (
          <span
            key={i}
            className="absolute rounded-full border opacity-40 border-[#e5e9f2]/90"
            style={{ width: size, height: size }}
          />
        );
      })}
    </div>
  );
}

export default function FreeDemoAccountFinalCtaSection({ locale = "en" }) {
  const t = usePathTranslation("freeDemoAccountPage.finalCtaSection");

  return (
    <section className="bg-white relative py-8 md:py-12">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.22) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
        aria-hidden
      />
      <div className="container">
        <div
          className="relative overflow-hidden rounded-[28px] md:rounded-[40px] px-6 py-14 text-center md:px-10 md:py-20 lg:px-16"
          style={{
            borderRadius: "50px",
            border: "1px solid #E1E7F6",
            background:
              "linear-gradient(180deg, rgba(255, 255, 255, 0.15) 46.03%, rgba(183, 190, 222, 0.13) 71.98%, rgba(41, 59, 147, 0.04) 100%)",
          }}
        >
          <div className="relative z-10 mx-auto max-w-4xl">
            <SectionEyebrow variant="compact" className="font-normal capitalize">
              {t("eyebrow", "— Open Your Live Account —")}
            </SectionEyebrow>

            <h2 className="HeadingH1 font-semibold text-[#111827] max-w-xl mx-auto mt-4">
              {t("title", "Your trading journey starts risk-free.")}
            </h2>

            <p className="TextSmall mx-auto mt-5 max-w-2xl leading-[1.7] font-normal text-[#666666] md:mt-6">
              {t(
                "description",
                "Open your free GTCFX demo account in under two minutes. No deposit required."
              )}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
              <Button
                href={localizedHref(locale, "/trading/free-demo-account")}
                variant="primary"
                size="lg"
                icon={<FiArrowRight className="h-4 w-4" aria-hidden />}
              >
                {t("cta", "Open a Demo Account")}
              </Button>
            </div>
          </div>

          <ConcentricRings />
        </div>
      </div>
    </section>
  );
}

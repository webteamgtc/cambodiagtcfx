"use client";

import Button from "@/app/[locale]/components/common/Button";
import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import { ConcentricRings } from "@/app/[locale]/trading/free-demo-account/components/FreeDemoAccountFinalCtaSection";
import { localizedHref } from "@/i18n/localizedHref";
import { CTA_STATS, REGISTER_HREF } from "../accountTypesData";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

const CARD_STYLE = {
  borderRadius: "50px",
  border: "1px solid #E1E7F6",
  background:
    "linear-gradient(180deg, rgba(255, 255, 255, 0.15) 46.03%, rgba(183, 190, 222, 0.13) 71.98%, rgba(41, 59, 147, 0.04) 100%)",
};

export default function AccountTypesCtaSection({ locale = "en" }) {
  const t = usePathTranslation("accountTypesPage.ctaSection");

  return (
    <section className="relative bg-white py-8 md:py-12">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.22) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
        aria-hidden
      />

      <div className="container mx-auto">
        <div
          className="relative  overflow-hidden rounded-[28px] px-6 py-14 text-center md:rounded-[40px] md:px-10 md:py-20 lg:px-16"
          style={CARD_STYLE}
        >
          <div className="relative z-10 mx-auto max-w-4xl">
            <SectionEyebrow variant="compact" className="font-normal capitalize !text-[#293B93]">
              {t("eyebrow", "— Start trading —")}
            </SectionEyebrow>

            <h2 className="HeadingH1 mx-auto mt-4 max-w-xl font-semibold text-[#111827]">
              {t("titleStart", "Your account is")}{" "}
              <span className="text-[#293B93]">{t("titleHighlight", "waiting.")}</span>
            </h2>

            <p className="TextSmall mx-auto mt-5 max-w-5xl font-normal leading-[1.7] text-[#000032]/60 md:mt-6">
            {t("description", "Two minutes to register. One decision to make. Open live, or run a demo first — no pressure, no payment details.")}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
              <Button href={REGISTER_HREF} external variant="primary" size="lg" showArrow>
                {t("primaryCta", "Open live account")}
              </Button>
              <Button
                href={localizedHref(locale, "/trading/free-demo-account")}
                variant="outline"
                size="lg"
                className="!border-[#E1E7F6] !bg-white !text-[#000032] hover:!bg-[#F8F9FC]"
              >
                {t("secondaryCta", "Try Demo Account First")}
              </Button>
            </div>

       
          </div>

          <ConcentricRings />
        </div>
      </div>
    </section>
  );
}

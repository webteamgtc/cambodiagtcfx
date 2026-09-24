"use client";

import Button from "@/app/[locale]/components/common/Button";
import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import { localizedHref } from "@/i18n/localizedHref";
import { REGISTER_HREF } from "../openLiveAccountData";
import clsx from "clsx";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

export default function OpenLiveAccountCtaSection({ locale = "en" }) {
  const t = usePathTranslation("openLiveAccountPage.cta");

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
        <div className="mx-auto max-w-4xl text-center">
          <SectionEyebrow className="!text-white capitalize font-normal">{t("eyebrow", "— Open Your Live Account —")}</SectionEyebrow>

          <h2 className="HeadingH1 mx-auto mt-5 max-w-md font-semibold leading-[1.2] text-white">
            {t("titleStart", "The market is")}{" "}
            <span className="text-[#B48755]">{t("titleHighlight", "moving")}</span>{t("titleEnd", ". Are you in?")}
          </h2>

          <p className="Text mx-auto mt-5 font-normal leading-[1.7] text-white/60 md:mt-6">
            {t(
              "description",
              "Open a live account in minutes — or test the waters with a free demo. No pressure, no hidden fees."
            )}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row md:mt-10">
            <Button
              href={REGISTER_HREF}
              external
              variant="secondary"
              size="lg"
              showArrow
              className="!border-white !bg-white !text-[#293B93] hover:!bg-white/90"
            >
              {t("primaryCta", "Open Live Account")}
            </Button>
            <Button
              href={localizedHref(locale, "/trading/free-demo-account")}
              variant="ghost"
              size="lg"
            >
              {t("secondaryCta", "Try Free Demo")}
            </Button>
          </div>

          <div className="mx-auto mt-8 max-w-4xl flex items-center gap-3 text-left md:mt-10">
         
            <p className="text-xs font-normal leading-[1.65] text-white/70">
             <span className="font-semibold !text-white">{t("riskLabel", "Risk warning.")}</span>{" "} {t("riskText", "CFD trading involves significant risk and may result in the loss of your entire invested capital. Ensure you fully understand the risks before trading. Past performance is not indicative of future results. Trading is not suitable for all investors.")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

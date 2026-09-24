"use client";

import { FiArrowRight } from "react-icons/fi";
import Button from "@/app/[locale]/components/common/Button";
import { localizedHref } from "@/i18n/localizedHref";
import { usePathTranslation } from "../../LocaleProvider";

const REGISTER_HREF =
  "/live-account-application";

export default function TradingJourneyCtaSection({ locale = "en" }) {
  const t = usePathTranslation("knowledgePage.tradingJourneyCta");

  return (
    <section
      className=" pb-14 md:pb-16"
      style={{
        background: "linear-gradient(180deg, rgba(250, 251, 255, 0.00) 0%, #FAFBFF 111.39%)",
      }}
    >
      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="HeadingH1 font-semibold text-[#000]">
            {t("heading", "Ready to Start Your Trading Journey?")}
          </h2>

          <p className="Text mx-auto mt-5 max-w-2xl font-normal leading-[1.7] text-[#666] md:mt-6">
            {t(
              "sub",
              "Open a demo or live account today and access the full GTCFX trading ecosystem — advanced platforms, tight spreads, and dedicated support."
            )}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5 md:mt-10">
            <Button
              href={REGISTER_HREF}
              external
              variant="brand"
              size="lg"
              icon={<FiArrowRight className="h-4 w-4" aria-hidden />}
            >
              {t("openAccount", "Open an Account")}
            </Button>

            <Button
              href={localizedHref(locale, "/company/contact-us")}
              variant="outline"
              size="lg"
            >
              {t("contactUs", "Contact Us")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

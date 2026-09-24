"use client";

import Button from "@/app/[locale]/components/common/Button";
import { localizedHref } from "@/i18n/localizedHref";
import { REGISTER_HREF } from "../marketPageData";
import FadeInSection from "@/app/[locale]/company/contact-us/components/FadeInSection";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

const CTA_BACKGROUND_IMAGE = "/new-design/Markets/forex-bg.svg";

export default function MarketFinalCtaSection({ locale = "en" }) {
  const t = usePathTranslation("marketsShared.finalCta");
  

  return (
    <section className="relative overflow-hidden py-10 md:py-16">
      <div
        className="pointer-events-none opacity-40 absolute inset-0 -z-10 bg-[#F8F9FC]"
        aria-hidden
        style={{
          backgroundImage: `url('${CTA_BACKGROUND_IMAGE}'), radial-gradient(rgba(41, 59, 147, 0.12) 1px, transparent 1px)`,
          backgroundSize: "cover, 22px 22px",
          backgroundPosition: "center, center",
        }}
      />

      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-xl text-center">
          <FadeInSection>
            <h2 className="HeadingH1 font-semibold text-[#000]">
              {t("heading", "Didn't find what you were looking for?")}
            </h2>
          </FadeInSection>
          <FadeInSection delay={0.1}>
            <p className="HeadingH5 mx-auto mt-5 max-w-2xl font-medium leading-[1.7] text-[#293B93] md:mt-6">
              {t("sub", "Access real-time prices, ultra-low spreads, and 1:2000 leverage — all in one platform.")}
            </p>
          </FadeInSection>
          <FadeInSection delay={0.2}>
            <div className="mt-10 flex justify-center">
              <Button
                href="https://web.mygtc.app/user?redirect=%252Fdashboard"
                external
                variant="brand"
                size="lg"
                showArrow
                className="shadow-[0_14px_40px_rgba(41,59,147,0.50)]"
              >
                {t("startTrading", "Start Trading Now")}
              </Button>
            </div>
          </FadeInSection>

          <FadeInSection delay={0.3}>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <span className="TextSmall font-normal text-[#666]">
                {t("noAccount", "No account yet?")}
              </span>

              <Button
                href={REGISTER_HREF}
                external
                variant="outline"
                size="md"
                className="!border-[#D8DEEA] !w-auto !bg-transparent !text-[#A1A7C6] hover:!bg-[#F8F9FC]"
              >
                {t("openFreeAccount", "Open Free Account")}
              </Button>

              <Button
                href={localizedHref(locale, "/trading/free-demo-account")}
                variant="outline"
                size="md"
                className="!border-[#D8DEEA] !w-auto !bg-transparent !text-[#A1A7C6] hover:!bg-[#F8F9FC]"
              >
                {t("tryDemo", "Try Demo Account")}
              </Button>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

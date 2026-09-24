"use client";

import Button from "@/app/[locale]/components/common/Button";
import FadeInSection from "@/app/[locale]/company/contact-us/components/FadeInSection";
import { useLocale, usePathTranslation } from "@/app/[locale]/LocaleProvider";
import { localizedHref } from "@/i18n/localizedHref";
import { REGISTER_HREF } from "../compensationFundData";
import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";

export default function CompensationFundCtaSection() {
  const t = usePathTranslation("compensationFundPage.cta");
  const locale = useLocale();

  return (
    <section
      className="relative overflow-hidden bg-[#293B93] bg-cover py-14 md:py-20"
      style={{ backgroundImage: "url('/new-design/Trading/background-with-circle.svg')" }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden
      />

      <div className="container relative z-10 min-w-0 max-w-full">
        <div className="mx-auto max-w-3xl text-center">
          <FadeInSection>
            <SectionEyebrow variant="compact" className="!text-white capitalize">
              {t("eyebrow", "— Get Started Today —")}
            </SectionEyebrow>
            <h2 className="HeadingH1 mx-auto mt-4 max-w-3xl font-semibold leading-[1.25] text-white">
              {t("title", "Want to learn more about fund protection details?")}
            </h2>

            <p className="TextSmall mx-auto mt-5 max-w-5xl font-normal leading-[1.7] text-white/60">
              {t(
                "description",
                "Explore our help resources or review the client agreement for full details on fund protection, dispute resolution, and compensation eligibility."
              )}
            </p>

            <div className="mt-10 flex justify-center">
              <Button
                href={localizedHref(locale, REGISTER_HREF)}
                external
                variant="brand"
                size="md"
                showArrow
              >
                {t("primaryCta", "Open Live Account")}
              </Button>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

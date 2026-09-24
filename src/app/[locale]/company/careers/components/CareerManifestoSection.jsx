"use client";

import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import { usePathTranslation } from "../../../LocaleProvider";
import FadeInSection from "@/app/[locale]/company/dynamic-leverage/components/FadeInSection";

export default function CareerManifestoSection() {
  const t = usePathTranslation("careerPage.manifestoSection");

  return (
    <section id="culture" className="relative bg-[#293B93] py-10 md:py-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.22) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
        aria-hidden
      />

      <div className="relative container min-w-0 max-w-full">
        <FadeInSection>
        <div className="mx-auto max-w-4xl text-center">

          <SectionEyebrow variant="compact" className="capitalize tracking-[0.3em] text-white">
            {t("eyebrow", "Company Manifesto")}
          </SectionEyebrow>

          <p className="HeadingH5 mx-auto mt-5 max-w-3xl font-[500] leading-[1.7] text-white md:mt-6 lg:max-w-4xl">
            {t(
              "statement",
              "We believe exceptional financial products come from exceptional people. We demand professionalism, encourage innovation, respect diversity, and give every idea-driven person the real space to make it happen."
            )}
          </p>
        </div>
        </FadeInSection>
      </div>
    </section>
  );
}

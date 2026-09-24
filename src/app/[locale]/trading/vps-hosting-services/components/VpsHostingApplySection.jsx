"use client";

import FadeInSection from "@/app/[locale]/company/contact-us/components/FadeInSection";
import VpsHostingForm from "@/app/[locale]/components/common/forms/VPSHostingForm";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

/** Replace at public/new-design/vps-apply-bg.webp when ready */
const APPLY_SECTION_BG = "/new-design/vps-bg.svg";

export default function VpsHostingApplySection() {
  const t = usePathTranslation("vpsHostingPage.apply");

  return (
    <section id="apply-vps" className="relative overflow-hidden py-14 scroll-mt-24 md:py-20">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${APPLY_SECTION_BG}')` }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 20% 50%, rgba(11, 21, 56, 0.92) 0%, rgba(15, 31, 85, 0.88) 45%, rgba(27, 49, 142, 0.85) 100%)",
          }}
        />
      </div>

      <div className="container relative min-w-0 max-w-full">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <FadeInSection>
            <div className="text-center lg:text-left">
              <p className="TextSmall font-medium tracking-[0.22em] text-white">
                {t("eyebrow", "Get Started Today")}
              </p>
              <h2 className="HeadingH1 mt-5 font-semibold leading-[1.5] text-white">
                {t("heading", "Apply for Your GTCFX Trading Server")}
              </h2>
              <p className="Text mt-6 max-w-md font-normal leading-[1.9] text-white lg:mx-0 mx-auto">
                {t(
                  "sub",
                  "Join thousands of EA traders who run their strategies on GTCFX VPS. Fill in your details and we'll have your server ready within minutes."
                )}
              </p>
            </div>
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <VpsHostingForm variant="dark" />
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

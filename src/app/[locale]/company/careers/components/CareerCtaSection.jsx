"use client";

import Button from "@/app/[locale]/components/common/Button";
import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import { usePathTranslation } from "../../../LocaleProvider";
import Image from "next/image";


export default function CareerCtaSection() {
  const t = usePathTranslation("careerPage.ctaSection");

  return (
    <section className="relative overflow-hidden bg-white py-8 md:py-16">
      {/* <WavyBackground /> */}
      <div className="pointer-events-none absolute inset-0 " aria-hidden>
        <Image
          src={"/new-design/company/career-footer.webp"}
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      <div className="relative container min-w-0 max-w-full">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <SectionEyebrow variant="compact" className="font-normal normal-case tracking-[0.35em]">
            {t("eyebrow", "Ready to begin?")}
          </SectionEyebrow>

          <h2 className="HeadingH1 mt-5 font-semibold max-w-md leading-[1.2] text-[#000] md:mt-6">
            {t("titleBefore", "Your next chapter")}{" "}
            <span className="text-[#293B93]">{t("titleAccent", "starts here.")}</span>
          </h2>

          <p className="Text mx-auto mt-5 max-w-2xl font-normal leading-[1.7] text-[#000032]/60 md:mt-6">
            {t(
              "description",
              "Join a global team driven by performance, purpose, and possibility."
            )}
          </p>

          <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:gap-4">
            <Button href="#openings" className="w-full md:w-auto" variant="primary" size="md" showArrow>
              {t("primaryCta", "Browse Open Positions")}
            </Button>

            <Button
              href="mailto:careers@gtcfx.com?subject=HR%20Inquiry"
              external
              variant="outline"
              size="md"
              className=" !bg-[#F8F9FC] !text-[#293B93] hover:!bg-[#E8EDF8]"
            >
              {t("secondaryCta", "Contact HR")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

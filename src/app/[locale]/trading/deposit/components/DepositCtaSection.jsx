"use client";

import Button from "@/app/[locale]/components/common/Button";
import { CLIENT_PORTAL_HREF } from "../depositData";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

export default function DepositCtaSection() {
  const t = usePathTranslation("depositPage.ctaSection");

  return (
    <section className="bg-[#F8F9FC] py-8 md:py-16">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="HeadingH1 font-semibold leading-[1.2] text-[#000]">
            {t("title", "Ready to Fund Your Account?")}
          </h2>

          <p className="Text mx-auto mt-5 max-w-3xl font-normal leading-[1.7] text-[#000032]/60">
            {t("description", "Join thousands of traders who trust GTCFX for fast, secure, and fee-free deposits. Get started in minutes.")}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row md:mt-10">
            <Button
              href={CLIENT_PORTAL_HREF}
              external
              variant="brand"
              size="lg"
              showArrow
            >
              {t("primaryCta", "Open Live Account")}
            </Button>
            <Button href={CLIENT_PORTAL_HREF} external variant="outline" size="lg">
              {t("secondaryCta", "Login & Deposit")}
            </Button>
          </div>

          <p className="TextSmall mx-auto mt-8 max-w-2xl font-normal leading-[1.65] text-[#000032]/60">
            {t("riskText", "Trading CFDs involves significant risk of loss. Please ensure you understand the risks involved.")}
          </p>
        </div>
      </div>
    </section>
  );
}

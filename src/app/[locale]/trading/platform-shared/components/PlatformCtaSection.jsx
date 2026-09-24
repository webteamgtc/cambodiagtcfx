"use client";

import Button from "@/app/[locale]/components/common/Button";
import { CLIENT_PORTAL_HREF, REGISTER_HREF } from "../platformData";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

export default function PlatformCtaSection({ data }) {
  const { cta } = data;
  const t = usePathTranslation(`${data.i18nKey}.cta`);

  return (
    <section className="relative overflow-hidden bg-[#293B93] py-14 md:py-20">
      {/* Subtle pattern overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

      <div className="container relative z-10 min-w-0 max-w-full">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">{t("eyebrow", cta.eyebrow)}</p>
            <h2 className="HeadingH1 mt-4 whitespace-pre-line text-white">{t("heading", cta.heading)}</h2>
            <p className="Text mt-6 max-w-md font-normal leading-[1.7] text-white/70">{t("sub", cta.sub)}</p>
          </div>

          {/* Right - Buttons stacked in one column */}
          <div className="flex justify-center lg:justify-end">
            <div className="flex w-full max-w-[300px] flex-col gap-3">
              <Button
                href={cta.downloadLink}
                external
                variant="ghost"
                size="lg"
                showArrow
                fullWidth
                className="border-white/90 bg-white !text-[#293B93] hover:bg-white/90"
              >
                {t("primaryLabel", cta.primaryLabel)}
              </Button>
              <Button
                href={REGISTER_HREF}
                external
                variant="ghost"
                size="lg"
                fullWidth
                className="border-white/30 bg-transparent text-white hover:bg-white/10"
              >
                {t("secondaryLabel", cta.secondaryLabel)}
              </Button>
              <p className="TextSmall text-center text-white/50 lg:text-left">
                {t("footnote", cta.footnote)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

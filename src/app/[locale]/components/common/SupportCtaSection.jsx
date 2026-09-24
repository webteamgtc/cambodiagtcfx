"use client";

import Link from "next/link";
import Button from "@/app/[locale]/components/common/Button";
import { localizedHref } from "@/i18n/localizedHref";
import { usePathTranslation } from "../../LocaleProvider";

const REGISTER_HREF = "/live-account-application";

const RING_COUNT = 7;

function ConcentricRings() {
  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
      aria-hidden
    >
      {Array.from({ length: RING_COUNT }, (_, i) => {
        const size = 140 + i * 110;
        return (
          <span
            key={i}
            className="absolute rounded-full border border-[#e5e9f2]/90"
            style={{ width: size, height: size }}
          />
        );
      })}
    </div>
  );
}

export default function SupportCtaSection({ locale = "en" }) {
  const t = usePathTranslation("supportCtaSection");

  return (
    <section className="bg-white">
      <div className="container">
        <div
          className="relative overflow-hidden rounded-[28px] md:rounded-[40px] px-6 py-14 text-center md:px-10 md:py-20 lg:px-16"
          style={{
            border: "1px solid #E1E7F6",
            background:
              "linear-gradient(180deg, rgba(255, 255, 255, 0.15) 46.03%, rgba(183, 190, 222, 0.13) 71.98%, rgba(41, 59, 147, 0.04) 100%)",
          }}
        >
          <div className="relative z-10 mx-auto max-w-4xl">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#3347a8]">
              {t("label", "Still Need Assistance?")}
            </span>

            <h2 className="HeadingH1 mx-auto mt-4 max-w-3xl text-[#111827]">
              {t("title", "Didn't find what you were looking for?")}
            </h2>

            <p className="TextSmall mx-auto mt-5 max-w-2xl font-normal leading-[1.7] text-[#666666] md:mt-6">
              {t(
                "description",
                "Our team is committed to going above and beyond to meet your needs. Whether it's addressing your concerns, assisting you with technical issues, or providing expert guidance, we are here to serve you."
              )}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap sm:gap-5">
              <Button
                href={localizedHref(locale, REGISTER_HREF)}
                external
                variant="primary"
                size="lg"
                showArrow
                className="w-full font-medium md:w-auto"
              >
                {t("submitTicket", "Open Live Account")}
              </Button>

              <Link
                href={localizedHref(locale, "/trading/free-demo-account")}
                className="Text font-medium text-[#666] underline underline-offset-4 transition hover:text-[#666] hover:no-underline"
              >
                {t("openFreeDemoAccount", "Open Free Demo Account")}
              </Link>
            </div>
          </div>

          <ConcentricRings />
        </div>
      </div>
    </section>
  );
}

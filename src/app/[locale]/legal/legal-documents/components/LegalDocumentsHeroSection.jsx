"use client";

import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

export default function LegalDocumentsHeroSection() {
  const t = usePathTranslation("legalDocumentsPage.hero");

  return (
    <section className="relative overflow-hidden bg-[#F8F9FC] py-14 md:py-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, #e8ecf4 1px, transparent 1px), linear-gradient(to bottom, #e8ecf4 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white to-transparent" aria-hidden />

      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#293B93]">
            {t("eyebrow", "Legal & Compliance")}
          </p>
          <h1 className="HeadingH1 mt-3 text-[#000032]">
            {t("title", "Legal Policies & Client Agreements")}
          </h1>
          <p className="Text mt-4 font-normal leading-[1.7] text-[#000032]/65">
            {t(
              "description",
              "Access legal documents, client onboarding forms, privacy policies, risk disclosures, and regulatory information for GTC Global LTD (Mauritius) and GTC Global Trade Capital Co. Ltd (Vanuatu)."
            )}
          </p>
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import FadeInSection from "@/app/[locale]/company/dynamic-leverage/components/FadeInSection";
import { useLocale, usePathTranslation } from "@/app/[locale]/LocaleProvider";
import { localizedHref } from "@/i18n/localizedHref";
import { WEBINAR_REGISTER_STEPS } from "../webinarData";

function RegisterStepItem({ step, index, t }) {
  return (
    <li className="min-w-0 text-left">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-white shadow-[0_6px_18px_rgba(182,135,86,0.35)]">
        {String(index + 1).padStart(2, "0")}
      </span>

      <h3 className="Text mt-4 font-semibold text-white">
        {t(step.titleKey, step.title)}
      </h3>
      <p className="TextSmall mt-2 font-normal leading-[1.65] text-white/75">
        {t(step.descriptionKey, step.description)}
      </p>
    </li>
  );
}

export default function WebinarRegisterSection() {
  const t = usePathTranslation("forexExpoDubaiWebinarPage.registerSection");
  const locale = useLocale();
  const eventsHref = localizedHref(locale, "/company/events-and-exhibitions");

  return (
    <section id="how-to-register" className="bg-white py-10 md:py-16">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl">
          <FadeInSection>
            <div className="text-center">
              <SectionEyebrow variant="compact" className="capitalize tracking-[0.3em]">
                {t("eyebrow", "Registration")}
              </SectionEyebrow>

              <h2 className="HeadingH1 mx-auto mt-4 max-w-3xl font-semibold text-[#000]">
                {t("title", "How to Register")}
              </h2>

              <p className="Text mx-auto mt-5 max-w-2xl font-normal leading-[1.7] text-[#000032]/60 md:mt-6">
                {t(
                  "description",
                  "Three simple steps to secure your seat and receive your Zoom invite."
                )}
              </p>
            </div>
          </FadeInSection>

          <FadeInSection delay={0.08}>
            <div className="mt-10 rounded-[20px] bg-primary p-6 shadow-[0_16px_50px_rgba(41,59,147,0.25)] md:mt-14 md:p-8 lg:p-10">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="TextSmall text-left font-medium text-white/80">
                  {t(
                    "note",
                    "Use the registration form at the top of this page to get started."
                  )}
                </p>
                <Link
                  href={eventsHref}
                  className="TextSmall shrink-0 font-medium text-secondary hover:text-white hover:underline"
                >
                  {t("viewAllEvents", "View All Events")} →
                </Link>
              </div>

              <ol className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
                {WEBINAR_REGISTER_STEPS.map((step, index) => (
                  <RegisterStepItem key={step.key} step={step} index={index} t={t} />
                ))}
              </ol>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import Button from "@/app/[locale]/components/common/Button";
import FadeInSection from "@/app/[locale]/company/dynamic-leverage/components/FadeInSection";
import { useLocale, usePathTranslation } from "../../../LocaleProvider";
import { localizedHref } from "@/i18n/localizedHref";
import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";

function ContactCtaLink({ href, children }) {
  return (
    <Link
      href={href}
      className="TextButton flex h-12 w-full items-center justify-between gap-3 rounded-full bg-white pl-6 pr-1.5 font-medium text-[#293B93] transition hover:bg-white/90 hover:no-underline sm:min-w-[210px] sm:w-auto"
    >
      <span className="flex-1 text-center sm:text-left">{children}</span>
      <span
        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#293B93] text-white"
        aria-hidden
      >
        <FiArrowRight className="h-4 w-4" />
      </span>
    </Link>
  );
}

export default function EventsExhibitionsCtaSection() {
  const t = usePathTranslation("eventsAndExhibitionsPage.ctaSection");
  const locale = useLocale();

  return (
    <section className="relative bg-[#293B93] py-14 md:py-16">
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
          <div className="mx-auto max-w-3xl text-center">
            <SectionEyebrow variant="compact" className="!font-medium normal-case tracking-[0.35em] text-white">
            {t("eyebrow", "Build Real Connections")}
            </SectionEyebrow>

            <h2 className="HeadingH1 mx-auto mt-5 max-w-2xl font-semibold leading-[1.25] text-white md:mt-6">
              {t("titleLine1", "At the show or online,")}
              <br />
              {t("titleLine2", "let's connect")}
            </h2>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
              <ContactCtaLink href={localizedHref(locale, "/company/contact-us")}>
                {t("contactCta", "Contact Us")}
              </ContactCtaLink>

              <Button
                href="#upcoming"
                variant="ghost"
                size="lg"
                className="w-full border-white/90 sm:w-auto"
              >
                {t("upcomingCta", "View Upcoming Events")}
              </Button>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}

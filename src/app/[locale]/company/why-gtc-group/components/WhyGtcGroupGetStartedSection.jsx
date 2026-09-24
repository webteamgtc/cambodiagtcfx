"use client";

import { FiArrowRight } from "react-icons/fi";
import Link from "next/link";
import clsx from "clsx";
import { useLocale, usePathTranslation } from "../../../LocaleProvider";
import { localizedHref } from "@/i18n/localizedHref";

const REGISTER_HREF =
  "/live-account-application";

function CtaPillLink({ href, external = false, children, showArrow = false, className = "" }) {
  const classes = clsx(
    "TextButton flex h-12 w-full items-center rounded-full bg-white px-6 font-medium text-[#293B93] transition hover:bg-white/90 hover:no-underline sm:min-w-[220px] lg:w-full lg:max-w-[220px]",
    showArrow ? "justify-between gap-3 pr-1.5" : "justify-center",
    className
  );

  const content = (
    <>
      <span className={showArrow ? "text-center md:text-left flex-1" : ""}>{children}</span>
      {showArrow ? (
        <span
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#293B93] text-white"
          aria-hidden
        >
          <FiArrowRight className="h-4 w-4" />
        </span>
      ) : null}
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}

export default function WhyGtcGroupGetStartedSection() {
  const t = usePathTranslation("whyGtcGroupPage.getStartedSection");
  const locale = useLocale();

  return (
    <section className="bg-[#293B93] relative py-8 md:py-16">
        <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.22) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
            aria-hidden
          />
      <div className="container min-w-0 max-w-full">
        <div className="relative mx-auto max-w-6xl">
          <div className="relative grid items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-12 xl:gap-16">
            <div className="min-w-0 text-center md:text-left">
              <p className="TextSmall font-normal text-white tracking-[0.5em]">
                {t("eyebrow", "Take the first step")}
              </p>

              <h2 className="HeadingH1 mt-4 font-semibold max-w-md  leading-[1.1] text-white md:mt-5">
                {t("title", "Start your investment journey today.")}
              </h2>

              <p className="TextSmall mt-5 max-w-md font-normal leading-[1.6] text-white/60 md:mt-6">
                {t(
                  "description",
                  "Join thousands of investors who trust GTC Group to protect and grow their capital across global markets — with full transparency and no hidden agenda."
                )}
              </p>
            </div>

            <div className="flex flex-col items-stretch gap-3 sm:items-start lg:items-end lg:justify-center lg:gap-4">
              <CtaPillLink href={REGISTER_HREF} external showArrow>
                {t("primaryCta", "Open Live Account")}
              </CtaPillLink>

             
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

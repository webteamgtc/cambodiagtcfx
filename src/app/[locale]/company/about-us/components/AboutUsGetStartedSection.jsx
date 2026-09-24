"use client";

import clsx from "clsx";
import { FiArrowRight } from "react-icons/fi";
import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import { usePathTranslation } from "../../../LocaleProvider";

const REGISTER_HREF =
  "/live-account-application";

function CornerAccent({ position }) {
  const positionClasses =
    position === "top-left"
      ? "-left-px -top-px border-l-[2px] border-t-[2px]"
      : "-bottom-px -right-px border-b-[2px] border-r-[2px]";

  return (
    <span
      className={`pointer-events-none absolute z-[2] h-4 w-4 border-[#293B93] sm:h-6 sm:w-6 ${positionClasses}`}
      aria-hidden
    />
  );
}

function CardCtaLink({ href, children, variant = "primary" }) {
  const isPrimary = variant === "primary";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        "TextButton flex h-[60px] w-full items-center justify-between gap-4  px-5 font-normal leading-none transition hover:no-underline sm:h-[58px] sm:px-6",
        isPrimary
          ? "bg-[#293B93] text-white hover:bg-[#243575]"
          : "border border-[#E1E7F6] bg-transparent text-[#000] hover:bg-[#fafbfc]"
      )}
    >
      <span className="text-left">{children}</span>
      <FiArrowRight
        className={clsx(
          "h-[18px] w-[18px] shrink-0",
          isPrimary ? "text-white" : "text-[#000]"
        )}
        aria-hidden
      />
    </a>
  );
}

export default function AboutUsGetStartedSection() {
  const t = usePathTranslation("aboutUsPage.getStartedSection");

  return (
    <section className="relative overflow-hidden bg-[#F8F9FC] py-14 md:py-16">
      <div className="relative container min-w-0 max-w-full">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12 xl:gap-16">
          <div className="min-w-0 text-center">
            <SectionEyebrow>{t("eyebrow", "GET STARTED")}</SectionEyebrow>

            <h2 className="HeadingH1 font-semibold leading-[1.2] mt-5 text-[#000]">
              {t("titleLine1", "Ready to join")}
              <br />
              <span className="text-[#293B93]">
                {t("titleAccent", "985,000+")}
              </span>
              <br />
              {t("titleLine2", "global traders")}
              <br />
              <span className="text-[#293B93]">
                {t("titleLine3", "Are you in line?")}
              </span>
            </h2>
          </div>

          <div className="relative min-w-0">
            <div className="relative rounded-tr-[24px] rounded-bl-[24px] border border-[#E1E7F6] bg-transparent px-6 pb-8 pt-12 sm:rounded-tr-[28px] sm:rounded-bl-[28px] sm:px-8 sm:pb-10 sm:pt-14">
              <CornerAccent position="top-left" />
              <CornerAccent position="bottom-right" />

              <div className="absolute left-[15%] top-0 z-[1] -translate-y-1/2 whitespace-nowrap bg-[#F8F9FC] px-3 sm:px-4">
                <p className="text-xs font-normal uppercase tracking-[0.14em] text-[#666666]">
                  {t("cardLabel", "// OPEN ACCOUNT")}
                </p>
              </div>

              <p className="HeadingH5 mx-auto max-w-[420px] text-center font-semibold leading-[1.4] text-[#000] lg:max-w-[460px]">
                {t(
                  "cardTitle",
                  "Open an account in 3 minutes and start your global trading journey immediately."
                )}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:mt-10">
                <CardCtaLink href={REGISTER_HREF} variant="primary">
                  {t("primaryCta", "Open Live Account")}
                </CardCtaLink>

                <CardCtaLink href='/trading/free-demo-account' variant="secondary">
                  {t("secondaryCta", "Open Demo Account")}
                </CardCtaLink>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

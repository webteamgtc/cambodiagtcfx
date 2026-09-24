"use client";

import clsx from "clsx";
import FadeInSection from "@/app/[locale]/company/contact-us/components/FadeInSection";
import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";
import { WITHOUT_VPS_ITEMS, WITH_VPS_ITEMS } from "../vpsHostingData";

function RowIcon({ type }) {
  const className = "h-[18px] w-[18px] text-[#293B93]";

  switch (type) {
    case "computer":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
          <rect x="3" y="4" width="18" height="13" rx="2" />
          <path strokeLinecap="round" d="M8 20h8" />
        </svg>
      );
    case "power":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
          <path strokeLinecap="round" d="M12 2v8M8.5 4.5A7 7 0 1012 5" />
        </svg>
      );
    case "latency":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
          <path strokeLinecap="round" d="M4 14c2-4 4-6 8-6s6 2 8 6M4 18c2-4 4-6 8-6s6 2 8 6" />
        </svg>
      );
    case "crash":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
          <circle cx="12" cy="12" r="3" />
          <path strokeLinecap="round" d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      );
    case "server":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
          <path strokeLinecap="round" d="M5 16l4-4 3 3 7-7" />
          <path strokeLinecap="round" d="M14 8h5v5" />
        </svg>
      );
    case "shield":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 3v6c0 4.2-3 7.8-7 9-4-1.2-7-4.8-7-9V6l7-3z" />
          <path strokeLinecap="round" d="M9 12l2 2 4-4" />
        </svg>
      );
    case "colocated":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
          <circle cx="12" cy="12" r="8" />
          <path strokeLinecap="round" d="M12 8v4l3 2" />
        </svg>
      );
    case "stability":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
          <path strokeLinecap="round" d="M12 3l2.2 4.5 4.9.7-3.5 3.4.8 4.9L12 14.8 7.6 16.5l.8-4.9L5 8.2l4.9-.7L12 3z" />
        </svg>
      );
    default:
      return null;
  }
}

function ComparisonRows({ items, listKey, t }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li
          key={item.key}
          className={clsx(
            "flex items-center gap-3 py-4 md:py-5  px-5 md:px-6",
            index < items.length - 1 && "border-b border-[#E1E7F6]"
          )}
        >
          <span className=" flex shrink-0 items-center justify-center">
            <RowIcon type={item.key} />
          </span>
          <p className="TextSmall font-normal leading-relaxed text-[#747784]">
            {t(`${listKey}.${index}`, item.text)}
          </p>
        </li>
      ))}
    </ul>
  );
}

function WithoutVpsCard({ t }) {
  return (
    <article className="interactive-card flex h-full flex-col overflow-hidden rounded-2xl border border-[#E1E7F6] bg-[#fff]">
      <div className="border-b border-[#E8DCC8] bg-[#B4875514] px-5 py-4 md:px-6 md:py-4">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] bg-[#EDE4D6] text-[#8B7355]">
            <svg className="h-4 w-4" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M2 2l8 8M10 2L2 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </span>
          <div>
            <h3 className="Text leading-snug !font-semibold text-[#000000]">
              {t("withoutTitle", "Without VPS")}
            </h3>
            <p className="TextSmall mt-0.5 font-normal text-[#666666]">
              {t("withoutSub", "Running EA on your local computer")}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <ComparisonRows items={WITHOUT_VPS_ITEMS} listKey="withoutItems" t={t} />
      </div>
    </article>
  );
}

function WithVpsCard({ t }) {
  return (
    <article className="interactive-card flex h-full flex-col overflow-hidden rounded-2xl border border-[#E1E7F6] bg-white">
      <div className="bg-[#293B93] px-5 py-4 md:px-6 md:py-4">
        <div className="flex items-start gap-3">
          <span className="flex  h-10 w-10  shrink-0 items-center justify-center rounded-[8px] bg-white/15 text-white">
            <svg className="h-4 w-4" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path
                d="M2.5 6l2.5 2.5 5-5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <div>
            <h3 className="Text leading-snug !font-semibold text-white">
              {t("withTitle", "With GTCFX VPS")}
            </h3>
            <p className="TextSmall mt-0.5 font-normal text-[#D2D7F0]">
              {t("withSub", "EA runs on dedicated server infrastructure")}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <ComparisonRows items={WITH_VPS_ITEMS} listKey="withItems" t={t} />
      </div>
    </article>
  );
}

export default function VpsHostingComparisonSection() {
  const t = usePathTranslation("vpsHostingPage.comparison");

  return (
    <section className="pb-12 bg-[#F8F9FC] md:pb-16">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl">
          <FadeInSection>
            <div className=" text-center">
              <SectionEyebrow variant="compact" className="!text-[#293B93]">
                {t("eyebrow", "Why VPS?")}
              </SectionEyebrow>
              <h2 className="HeadingH1 mx-auto max-w-xl mt-4 font-semibold text-[#000]">
                {t("title", "Your PC vs a Professional Trading Server")}
              </h2>
              <p className="Text mx-auto mt-4 max-w-3xl font-normal leading-[1.7] text-[#000032]">
                {t(
                  "subtitle",
                  "A VPS runs your trading platform on a dedicated remote server — not your local machine — ensuring 24/7 operation regardless of power cuts, internet issues, or hardware failures."
                )}
              </p>
            </div>
          </FadeInSection>

          <div className="mt-12 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
            <FadeInSection delay={0.1} className="h-full">
              <WithoutVpsCard t={t} />
            </FadeInSection>

            <FadeInSection delay={0.15} className="h-full">
              <WithVpsCard t={t} />
            </FadeInSection>
          </div>
        </div>
      </div>
    </section>
  );
}

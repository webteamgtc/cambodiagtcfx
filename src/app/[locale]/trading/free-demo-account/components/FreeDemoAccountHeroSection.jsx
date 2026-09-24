"use client";

import Image from "next/image";
import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import { HERO_BULLETS, HERO_FEATURE_BAR } from "../freeDemoAccountData";
import { HeroTrustBadge } from "@/app/[locale]/company/global-presence/components/GlobalPresenceHeroSection";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";
import clsx from "clsx";
import MainIBForm from "@/app/[locale]/components/MainIBForm";

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" fill="none">
      <path d="M4.474 6.8569L11.1065 0.15491C11.3109 -0.0516366 11.6423 -0.0516366 11.8467 0.15491C12.0511 0.361468 12.0511 0.696353 11.8467 0.902911L5.07021 7.75046C4.74094 8.08318 4.20708 8.08318 3.87782 7.75046L0.153302 3.98689C-0.0511008 3.78034 -0.0511008 3.44544 0.153302 3.23889C0.357717 3.03234 0.689127 3.03234 0.893542 3.23889L4.474 6.8569Z" fill="#293B93" />
    </svg>
  );
}

function HeroBulletPill({ label }) {
  return (
    <li className="flex justify-center lg:justify-start">
      <span className="inline-flex items-center gap-2.5 rounded-full border border-[#E1E7F6] bg-[#F8F9FC] px-5 py-2.5 shadow-[0_2px_8px_rgba(41,59,147,0.04)]">
        <CheckIcon />
        <span className="TextSmall font-semibold text-[#293B93]">{label}</span>
      </span>
    </li>
  );
}

export default function FreeDemoAccountHeroSection() {
  const t = usePathTranslation("freeDemoAccountPage.heroSection");

  return (
    <section
      className="relative overflow-hidden pt-10 md:pt-18 lg:pt-20"
     >
             <div className="pointer-events-none  h-[95%] absolute inset-0 -z-10 overflow-hidden" aria-hidden>
          <img
            src={"/breadcamp/leverage.webp"}
            alt=""
            priority
            className="object-cover w-full object-center"
          />
        </div>

      <div className="relative container min-w-0 max-w-full">
        <div className="mx-auto grid w-full min-w-0 max-w-6xl items-start gap-10 lg:grid-cols-12 lg:items-stretch lg:gap-12">
          <div className="min-w-0 text-center lg:col-span-5 lg:text-left">
            <HeroTrustBadge className="!text-[#000032]">
              {t("badge", "Free Demo Account · No Verification Required")}
            </HeroTrustBadge>

            <h1 className="HeadingH1 font-semibold mt-7 max-w-md text-[#000]">
              {t("titleStart", "Start Trading")}{" "}
              <span className="text-[#293B93]">{t("titleHighlight", "Risk-Free in 30 Seconds")}</span>
            </h1>

            <p className="Text mx-auto mt-6 max-w-xl font-normal leading-[1.7] text-[#666] md:mt-7 lg:mx-0">
              {t(
                "description",
                "Practice with virtual funds in real market conditions. No deposit, no risk — just the full GTCFX trading experience while you build confidence in your strategy."
              )}
            </p>

            <ul className="mt-6 flex flex-col items-center gap-3 md:mt-7 lg:items-start">
              {HERO_BULLETS.map((item, i) => (
                <HeroBulletPill key={i} label={t(`bullets.${i}`, item)} />
              ))}
            </ul>
          </div>

          <div className="min-w-0 lg:col-span-7">
            <MainIBForm  />
          </div>

        </div>
        <div className="bg-[#293B93] mx-auto rounded-[20px] mt-10 max-w-6xl py-5 md:py-6">
          <div className="container">
            <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-3">
              {HERO_FEATURE_BAR.map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-center gap-3 text-white sm:justify-start lg:justify-center"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[6px] bg-[#69729F]">
                    <span
                      className={clsx(
                        "flex h-11 w-11 items-center justify-center rounded-xl",
                      )}
                    >
                      {item.icon}
                    </span>
                  </span>
                  <span className="Text font-medium text-white">{t(`featureBar.${item.key}`, item.label)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>


    </section>
  );
}

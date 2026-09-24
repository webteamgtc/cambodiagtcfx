"use client";

import Button from "@/app/[locale]/components/common/Button";
import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import {
  NavyAsidePanel,
  TipCard,
} from "@/app/[locale]/trading/free-demo-account/components/FreeDemoAccountTipsSection";
import {
  PROTECTION_FEATURES,
  REGISTER_HREF,
  SAFETY_CHECKLIST,
} from "../depositData";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11" fill="none">
      <path d="M11.694 0C8.046 2.37717 5.4 5.37891 4.206 6.88297L1.29 4.45481L0 5.55736L5.034 11C5.898 8.64195 8.646 4.03418 12 0.758401L11.694 0Z" fill="#293B93" />
    </svg>
  );
}

export default function DepositProtectionSection() {
  const t = usePathTranslation("depositPage.protectionSection");

  const features = PROTECTION_FEATURES.map((item) => ({
    ...item,
    title: t(`features.${item.key}.title`, item.title),
    description: t(`features.${item.key}.description`, item.description),
  }));

  return (
    <section className=" py-8 md:py-14">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl text-center">
          <SectionEyebrow variant="compact" className="capitalize">
            {t("eyebrow", "Security & Trust")}
          </SectionEyebrow>

          <h2 className="HeadingH1 mx-auto mt-4 max-w-xl font-semibold leading-[1.25] text-[#000]">
            {t("title", "Your Funds Are Protected at Every Step")}
          </h2>

          <p className="Text mx-auto mt-5 max-w-3xl font-normal leading-[1.7] text-[#000032]/60">
            {t("description", "Understand the key rules for fund operations to ensure the security and compliance of your account.")}
          </p>

          <div className="mt-10 grid items-end gap-5 lg:mt-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:gap-10">
            <div className="flex flex-col gap-4 md:gap-5">
              {features.map((item) => (
                <TipCard key={item.key} item={item} page="deposit" />
              ))}
            </div>

            <NavyAsidePanel>
              <h3 className="HeadingH3 max-w-xs text-white">
                {t("panelTitle", "Institutional-Grade Fund Safety")}
              </h3>

              <ul className="mt-6 space-y-4 border-t border-white/15 pt-6">
                {SAFETY_CHECKLIST.map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-[#293B93]">
                      <CheckIcon />
                    </span>
                    <span className="text-xs font-normal leading-[1.3] text-white">
                      {t(`checklist.${index}`, item)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 border-t border-white/15 pt-6">
                <Button
                  href={REGISTER_HREF}
                  external
                  variant="secondary"
                  size="md"
                  showArrow
                  className="bg-white hover:bg-white/95"
                >
                  {t("openLiveAccountCta", "Open Live Account")}
                </Button>
              </div>
            </NavyAsidePanel>
          </div>
        </div>
      </div>
    </section>
  );
}

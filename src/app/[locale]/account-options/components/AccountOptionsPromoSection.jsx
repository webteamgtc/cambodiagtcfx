"use client";

import Image from "next/image";
import Button from "@/app/[locale]/components/common/Button";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";
import { PROMO_BULLETS, PROMO_STATS, REGISTER_HREF } from "../accountOptionsData";

const PROMO_BG = "/new-design/account-op/bg-last.png";

function CrownIcon() {
  return (
    <svg className="h-3.5 w-3.5 text-[#D4B896]" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M2.5 11.5h11v1.5h-11V11.5ZM3.2 10.5 1.5 5.8l2.4 1.8 2.1-3.4 2 3.4 2.1-3.4 2 3.4 2.4-1.8-1.7 4.7H3.2Z" />
    </svg>
  );
}

function GoldCheckBullet() {
  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#B4875533]">
      <svg className="h-3 w-3 text-[#D4B896]" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path
          d="M3.5 8.25L6.5 11.25L12.5 4.75"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function PromoStatCard({ statKey, t }) {
  return (
    <div className="rounded-[18px] border max-w-sm mx-auto w-full border-white/15 bg-white/[0.08] px-4 py-4 backdrop-blur-md md:px-8 md:py-4">
      <p className="text-xs text-white">
        {t(`stats.${statKey}.label`, "")}
      </p>
      <p className="HeadingH3 mt-0.5 text-white">
        {t(`stats.${statKey}.value`, "")}
      </p>
      <p className="text-xs mt-0.5 text-white">
        {t(`stats.${statKey}.description`, "")}
      </p>
    </div>
  );
}

export default function AccountOptionsPromoSection() {
  const t = usePathTranslation("accountOptionsPage.promo");

  return (
    <section className="bg-white pb-10 md:pb-14">
      <div className="container min-w-0 max-w-full">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[28px] md:rounded-[36px]">
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <Image
              src={PROMO_BG}
              alt=""
              fill
              className="object-cover object-center"
              sizes="(max-width: 1280px) 100vw, 1152px"
            />
            <div className="absolute inset-0 bg-[#0B1548]/20" />
          </div>

          <div className="relative z-10 grid gap-10 px-6 py-10 md:px-10 md:py-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-center lg:gap-12 lg:px-12 lg:py-14">
            <div className="min-w-0 text-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 backdrop-blur-sm">
                <CrownIcon />
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white md:text-[11px]">
                  {t("eyebrow", "PREMIUM ACCESS")}
                </span>
              </span>

              <h2 className="HeadingH2 mt-3 max-w-xl font-semibold text-white md:mt-3">
                {t("title", "Lower your trading costs by up to 90%")}
              </h2>

              <p className="TextSmall mt-4 max-w-xl text-white">
                {t(
                  "subtitle",
                  "Unlock exclusive VIP benefits designed for high-volume and high-equity traders."
                )}
              </p>

              <ul className="mt-4 space-y-2 md:mt-6">
                {PROMO_BULLETS.map((bulletKey) => (
                  <li key={bulletKey} className="flex items-start gap-3.5">
                    <GoldCheckBullet />
                    <span className="TextSmall pt-0.5 font-medium text-white">
                      {t(bulletKey, "")}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 md:mt-6">
                <Button
                  href={REGISTER_HREF}
                  external
                  variant="primary"
                  size="lg"
                  showArrow
                  className="!rounded-xl bg-[#B48755] !text-white hover:!brightness-105"
                >
                  {t("cta", "Apply for VIP")}
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              {PROMO_STATS.map((stat) => (
                <PromoStatCard key={stat.key} statKey={stat.key} t={t} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import Button from "@/app/[locale]/components/common/Button";
import { usePathTranslation } from "../../LocaleProvider";
import { localizedHref } from "@/i18n/localizedHref";

/** Replace with your dual-phone deposit mockup */
const FUND_PHONES_SRC = "/new-design/Trading/funds.webp";

export default function TradingFundAccountSection({ locale = "en" }) {
  const t = usePathTranslation("tradingPage.fundAccountSection");

  return (
    <section className="overflow-x-hidden bg-white pt-8 md:pt-16">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-20">
          <div className="order-2 flex min-w-0 justify-center leading-none lg:order-1 lg:justify-start">
            <div className="relative inline-block w-full max-w-[260px] sm:max-w-[340px] md:max-w-[400px] lg:max-w-[440px]">
              <Image
                src={FUND_PHONES_SRC}
                alt={t(
                  "imageAlt",
                  "GTCFX mobile app deposit and wallet screens on two phones"
                )}
                width={440}
                height={520}
                className="h-auto w-full"
                sizes="(max-width: 640px) 260px, (max-width: 1024px) 85vw, 440px"
              />
            </div>
          </div>

          <div className="order-1 flex min-w-0 flex-col text-center md:text-left lg:order-2 lg:py-4">
            <h2 className="HeadingH2 text-[#293B93]">
              {t("title", "Fund Your Account")}
            </h2>

            <p className="Text mt-5 max-w-xl font-normal leading-[1.5] text-[#666666] md:mt-6">
              {t(
                "description",
                "The GTCFX Wallet allows you to transfer funds between your wallet and trading accounts instantly, giving you the flexibility to manage your capital according to your trading needs. Funds held in the Wallet are not subject to market risks, so it is a great way to manage risk and exposure."
              )}
            </p>
              <div className="mx-auto mt-8 md:mx-0">
              <Button
              href={localizedHref(locale, "/trading/open-live-account")}
              variant="brand"
              size="md"
              showArrow
            >
              {t("cta", "Open a Live Account")}
            </Button>
              </div>
           
          </div>
        </div>
      </div>
    </section>
  );
}

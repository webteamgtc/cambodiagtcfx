"use client";

import Image from "next/image";
import Link from "next/link";
import FadeInSection from "@/app/[locale]/company/contact-us/components/FadeInSection";
import { useLocale, usePathTranslation } from "@/app/[locale]/LocaleProvider";
import { localizedHref } from "@/i18n/localizedHref";
import { CLIENT_PORTAL_HREF } from "@/lib/gtcGoAppLinks";
import { AppStoreButton } from "./AppStoreButtons";

const PLATFORM_NAV = [
  { key: "go", label: "GTC Go", href: "/trading/gtc-go-app", external: false },
  { key: "web", label: "GTC Go Web", href: CLIENT_PORTAL_HREF, external: true },
  {
    key: "ios",
    label: "GTC Go iPhone/iPad",
    href: "/trading/gtc-go-app-ipad",
    external: false,
  },
  {
    key: "android",
    label: "GTC Go Android",
    href: "/trading/gtc-go-app-andriod",
    external: false,
  },
  {
    key: "copy",
    label: "GTC Go Copy Trading",
    href: "/trading/gtc-go-app-copy-trading",
    external: false,
  },
];

export default function GtcGoHeroSection({ data }) {
  const { hero } = data;
  const t = usePathTranslation("gtcGoAppPage.hero");
  const locale = useLocale();
  const backgroundImage = hero.backgroundImage || "/new-design/Trading/banner-gtc-go.webp";
  const iconSrc = hero.icon || "/new-design/Trading/f-logo.svg";

  return (
    <section className="relative overflow-hidden bg-[#020617]">
      {/* Stage / banner scene */}
      <div className="relative min-h-[520px] sm:min-h-[580px] md:min-h-[640px] lg:min-h-[720px]">
        <div className="pointer-events-none absolute inset-0">
          <Image
            src={backgroundImage}
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Soft left scrim so copy stays readable over the blue screen */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#04103A]/75 via-[#04103A]/35 to-transparent md:from-[#04103A]/55 md:via-[#04103A]/15"
            aria-hidden
          />
          <div
            className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#020617] to-transparent md:h-36"
            aria-hidden
          />
        </div>

        <div className="container min-w-0 max-w-full relative z-10 flex min-h-[520px] items-center py-12 sm:min-h-[580px] md:min-h-[640px] md:py-16 lg:min-h-[720px] lg:py-20">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2">
            <FadeInSection>
              <div className="max-w-xl text-center md:max-w-[480px] md:text-left lg:max-w-[520px]">
                <div className="mx-auto mb-5 inline-flex md:mx-0">
                  <Image
                    src={iconSrc}
                    alt="GTC Go"
                    width={56}
                    height={56}
                    className="h-12 w-12 rounded-[14px] object-contain shadow-[0_10px_30px_rgba(0,0,0,0.35)] sm:h-14 sm:w-14"
                  />
                </div>

                <h1 className="text-3xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-[44px] lg:leading-[1.12]">
                  {t("title")}
                </h1>

                <p className="mx-auto mt-4 max-w-md text-base font-normal leading-relaxed text-white/90 sm:text-lg md:mx-0">
                  {t("description")}
                </p>

                <div className="mt-7 flex w-full flex-col items-center justify-center gap-3 sm:mt-8 sm:flex-row sm:flex-wrap md:justify-start">
                  <AppStoreButton
                    type="apple"
                    variant="primary"
                  />
                  <AppStoreButton
                    type="google"
                    variant="gold"
                  />
                </div>
              </div>
            </FadeInSection>
            <div/>
          </div>
        </div>
      </div>

    </section>
  );
}

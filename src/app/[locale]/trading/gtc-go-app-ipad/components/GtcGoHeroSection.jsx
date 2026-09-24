"use client";

import Image from "next/image";
import Link from "next/link";
import FadeInSection from "@/app/[locale]/company/contact-us/components/FadeInSection";
import { useLocale, usePathTranslation } from "@/app/[locale]/LocaleProvider";
import { localizedHref } from "@/i18n/localizedHref";
import {
  APP_STORE_DESKTOP_HREF,
  CLIENT_PORTAL_HREF,
  GOOGLE_PLAY_DESKTOP_HREF,
} from "@/lib/gtcGoAppLinks";
import { useStoreDownloadHref } from "@/lib/useStoreDownloadHref";

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

const PLATFORM_DEFAULTS = {
  ios: {
    translationKey: "gtcGoAppPage.iosHero",
    title: "IOS (iPhone & iPad)",
    description:
      "Trade smarter with GTCGO on your iPhone and iPad. Experience fast execution, real-time market access, and a secure mobile trading environment designed to keep you in control wherever your journey takes you.",
    ctaLabel: "GTC Go iPhone/iPad",
    backgroundImage: "/new-design/Trading/gtc-app-ipad.svg",
    ctaHref: APP_STORE_DESKTOP_HREF,
    activeNav: "ios",
  },
  android: {
    translationKey: "gtcGoAppPage.androidHero",
    title: "Android",
    description:
      "Trade on the move with the GTCGO Android app. Enjoy seamless access to global markets, advanced trading tools, and a responsive mobile experience that helps you stay ahead of every opportunity.",
    ctaLabel: "GTC Go Android",
    backgroundImage: "/new-design/Trading/andriod.svg",
    ctaHref: GOOGLE_PLAY_DESKTOP_HREF,
    activeNav: "android",
  },
};

function DownloadIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 4v10m0 0l3.5-3.5M12 14l-3.5-3.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 17.5V19a1.5 1.5 0 001.5 1.5h11A1.5 1.5 0 0019 19v-1.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function GtcGoHeroSection({ data }) {
  const { hero = {} } = data || {};
  const platformKey = hero.platform === "android" ? "android" : "ios";
  const defaults = PLATFORM_DEFAULTS[platformKey];

  const t = usePathTranslation(defaults.translationKey);
  const tNav = usePathTranslation("gtcGoAppPage.hero");
  const locale = useLocale();

  const backgroundImage = hero.backgroundImage || defaults.backgroundImage;
  const title = t("title");
  const description = t("description");
  const ctaLabel = t("ctaLabel");
  const storeType = platformKey === "android" ? "google" : "apple";
  const responsiveCtaHref = useStoreDownloadHref(storeType);
  const ctaHref = responsiveCtaHref;
  const activeNav = hero.activeNav || defaults.activeNav;

  return (
    <section className="relative overflow-hidden bg-[#041033]">
      <div className="relative min-h-[420px] sm:min-h-[480px] md:min-h-[560px] lg:min-h-[620px]">
        <div className="pointer-events-none absolute inset-0">
          <Image
            src={backgroundImage}
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            aria-hidden
            style={{
              opacity: 0.8,
              background:
                "radial-gradient(circle at center, rgba(13, 21, 58, 0.7) 0%, rgba(13, 21, 58, 1) 100%)",
            }}
          />
        </div>

        <div className="container relative z-10 flex min-h-[420px] items-center justify-center px-4 py-14 sm:min-h-[480px] md:min-h-[560px] md:py-20 lg:min-h-[620px]">
          <FadeInSection>
            <div className="mx-auto max-w-6xl text-center">
              <h1 className="HeadingH1 text-3xl font-semibold text-white">
                {title}
              </h1>
              <p className="Text mx-auto mt-4 max-w-4xl font-normal leading-[1.6] text-white sm:mt-5">
                {description}
              </p>

              <div className="mt-7 flex justify-center sm:mt-8">
                <a
                  href={ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="TextButton inline-flex items-center justify-center gap-2.5 rounded-full bg-[#293B93] px-7 py-3 text-white transition hover:bg-[#243575] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                >
                  <span>{ctaLabel}</span>
                  <DownloadIcon className="h-5 w-5 shrink-0" />
                </a>
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>

    </section>
  );
}

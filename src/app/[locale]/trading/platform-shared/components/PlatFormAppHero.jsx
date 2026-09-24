"use client";

import Image from "next/image";
import FadeInSection from "@/app/[locale]/company/contact-us/components/FadeInSection";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";
import { DOWNLOAD_LINKS, DOWNLOAD_LINKS_MT5 } from "../platformData";

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

export default function PlatFormAppHero({ data = {} }) {
  const t = usePathTranslation(
    data.i18nKey ? `${data.i18nKey}.hero` : "mtAppIosPage.hero"
  );

  const title =
    t("title", data.title) || "MetaTrader for iPhone/iPad";
  const tagline =
    t("tagline", data.tagline) || "The Trader's Choice worldwide.";
  const description =
    t("description", data.description) ||
    "Stay connected to global markets anytime, anywhere with GTCFX MetaTrader on your iPhone or iPad. Enjoy seamless access to your trading account, real-time market updates, advanced charting tools, and a smooth mobile trading experience designed to help you manage your trades with confidence.";
  const primaryCta =
    t("primaryCta", data.primaryCta) || "Download MT4 iPhone/iPad";
  const secondaryCta =
    t("secondaryCta", data.secondaryCta) || "Download MT5 iPhone/iPad";
  const primaryHref = data.primaryHref || DOWNLOAD_LINKS.ios;
  const secondaryHref = data.secondaryHref || DOWNLOAD_LINKS_MT5.ios;
  const backgroundImage =
    data.backgroundImage || "/new-design/Trading/mt-app-ios-banner.webp";

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
              background:
                "radial-gradient(ellipse at center, rgba(13, 21, 58, 0.72) 0%, rgba(13, 21, 58, 0.45) 45%, rgba(13, 21, 58, 0.2) 100%)",
            }}
          />
        </div>

        <div className="container relative z-10 flex min-h-[420px] items-center justify-center px-4 py-14 sm:min-h-[480px] md:min-h-[560px] md:py-20 lg:min-h-[620px]">
          <FadeInSection>
            <div className="mx-auto max-w-3xl text-center lg:max-w-4xl">
              <h1 className="HeadingH1 font-semibold text-white">{title}</h1>

              <p className="HeadingH5 mt-3 font-medium text-white sm:mt-3">
                {tagline}
              </p>

              <p className="Text mx-auto mt-5 max-w-2xl font-normal leading-[1.65] text-white/60 sm:mt-8 md:max-w-4xl">
                {description}
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:flex-wrap">
                <a
                  href={primaryHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="TextButton inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[#293B93] px-6 py-3 text-white transition hover:bg-[#243575] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 sm:w-auto sm:px-7"
                >
                  <span>{primaryCta}</span>
                  <DownloadIcon className="h-5 w-5 shrink-0" />
                </a>

                <a
                  href={secondaryHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="TextButton inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-white/90 bg-transparent px-6 py-3 text-white transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 sm:w-auto sm:px-7"
                >
                  <span>{secondaryCta}</span>
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

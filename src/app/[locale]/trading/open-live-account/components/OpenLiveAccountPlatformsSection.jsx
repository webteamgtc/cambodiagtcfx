"use client";

import Link from "next/link";
import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import { localizedHref } from "@/i18n/localizedHref";
import { PLATFORMS } from "../openLiveAccountData";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

function PlatformIcon({ type }) {
  const className = "h-[18px] w-[18px] text-[#293B93]";

  if (type === "mobile") {
    return (
      <svg className={className} viewBox="0 0 18 18" fill="none" aria-hidden>
        <rect
          x="5"
          y="1.5"
          width="8"
          height="15"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.3"
        />
        <path
          d="M8 14.5H10"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === "web") {
    return (
      <svg className={className} viewBox="0 0 18 18" fill="none" aria-hidden>
        <circle cx="9" cy="9" r="7.25" stroke="currentColor" strokeWidth="1.3" />
        <path
          d="M1.75 9H16.25M9 1.75C7.2 4.5 6.25 6.65 6.25 9C6.25 11.35 7.2 13.5 9 16.25C10.8 13.5 11.75 11.35 11.75 9C11.75 6.65 10.8 4.5 9 1.75Z"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" aria-hidden>
      <rect
        x="2"
        y="4"
        width="14"
        height="9.5"
        rx="1.2"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path d="M6.5 15.5H11.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M9 13.5V15.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function CardLink({ href, external, locale, className, children }) {
  const url = localizedHref(locale, href);

  if (external) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={url} className={className}>
      {children}
    </Link>
  );
}

function PlatformCard({ platform, locale, t }) {
  const content = (
    <article className="interactive-card flex h-full cursor-pointer flex-col rounded-[20px] border border-[#E1E7F6] bg-white p-4 text-left md:p-5">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E1E7F6]">
        <PlatformIcon type={platform.icon} />
      </span>

      <h3 className="HeadingH5 mt-6 font-semibold text-[#000]">{t(`items.${platform.key}.name`)}</h3>

      <p className="TextSmall mt-4 flex-1 font-normal leading-[1.65] text-[#000]">
        {t(`items.${platform.key}.description`)}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {platform.tags.map((tag, i) => (
          <span
            key={i}
            className="rounded-full bg-[#E1E7F6] px-3 py-1.5 text-[11px] font-normal leading-none text-[#000032]"
          >
            {t(`items.${platform.key}.tags.${i}`)}
          </span>
        ))}
      </div>
    </article>
  );

  return (
    <CardLink
      href={platform.href}
      external={platform.external}
      locale={locale}
      className="block h-full hover:no-underline"
    >
      {content}
    </CardLink>
  );
}

export default function OpenLiveAccountPlatformsSection({ locale = "en" }) {
  const t = usePathTranslation("openLiveAccountPage.platforms");
  const featured = PLATFORMS.find((item) => item.featured);
  const others = PLATFORMS.filter((item) => !item.featured);

  return (
    <section className="relative py-8 md:py-16">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl text-center">
          <SectionEyebrow variant="compact" className="capitalize">
            {t("eyebrow", "Platforms")}
          </SectionEyebrow>

          <h2 className="HeadingH1 mx-auto mt-4 max-w-xl font-semibold leading-[1.25] text-[#000]">
            {t("titleStart", "Trade on the")} <span className="text-[#293B93]">{t("titleHighlight", "platform you prefer.")}</span>
          </h2>

          <p className="Text mx-auto mt-5 max-w-4xl font-normal leading-[1.7] text-[#000032]/60">
            {t(
              "description",
              "Web, desktop, mobile — every platform connects to the same execution engine."
            )}
          </p>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:mt-12 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]">
            {featured ? (
              <div className="sm:col-span-2 lg:col-span-1">
                <PlatformCard platform={featured} locale={locale} t={t} />
              </div>
            ) : null}

            {others.map((platform) => (
              <PlatformCard key={platform.key} platform={platform} locale={locale} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

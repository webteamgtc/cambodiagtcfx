"use client";

import Link from "next/link";
import MobilePeekCarousel from "@/app/[locale]/components/common/MobilePeekCarousel";
import { useLocale, usePathTranslation } from "@/app/[locale]/LocaleProvider";
import { localizedHref } from "@/i18n/localizedHref";
import {
  FiArrowRight,
  FiBriefcase,
  FiCreditCard,
  FiLock,
  FiMonitor,
  FiRepeat,
  FiSettings,
  FiShield,
} from "react-icons/fi";

const categoryCards = [
  {
    key: "accountOpening",
    icon: FiBriefcase,
    featured: true,
    tagKeys: ["registration", "kyc"],
    href: "/live-account-application",
    external: true,
  },
  {
    key: "deposits",
    icon: FiCreditCard,
    href: "/trading/deposit",
  },
  {
    key: "platforms",
    icon: FiMonitor,
    href: "/trading/mt5-platform",
  },
  {
    key: "conditions",
    icon: FiRepeat,
    href: "/trading/account-types",
  },
  {
    key: "management",
    icon: FiSettings,
    href: "/trading/account-types",
  },
  {
    key: "security",
    icon: FiShield,
  },
  {
    key: "regulation",
    icon: FiLock,
    href: "/company/regulations",
  },
];

function CategoryIcon({ icon: Icon }) {
  return (
    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#e6eaf3] bg-[#f8faff] text-[#3347a8]">
      <Icon className="h-6 w-6" />
    </div>
  );
}

function CardLink({ href, external, locale, className, children }) {
  if (!href) {
    return children;
  }

  const url = localizedHref(locale, href);

  if (external) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
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

function FeaturedCard({ card, t, locale }) {
  const content = (
    <article className="interactive-card group relative cursor-pointer overflow-hidden rounded-[20px] border border-[#e6eaf3] bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.05)] md:col-span-2 md:p-8">
      <div className="relative z-10 flex h-full flex-col">
        <CategoryIcon icon={card.icon} />

        <h3 className="HeadingH4 mt-8 text-primary">
          {t(`cards.${card.key}.title`)}
        </h3>

        <p className="TextSmall mt-4 max-w-[32rem] text-[#6b7280]">
          {t(`cards.${card.key}.description`)}
        </p>

        <div className="mt-7 flex items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {card.tagKeys?.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[#e3e8f3] bg-[#f8faff] px-3 py-1.5 text-[11px] font-medium text-[#3347a8] transition-colors duration-300 group-hover:border-white/20 group-hover:bg-white/12"
              >
                {t(`cards.${card.key}.tags.${tag}`)}
              </span>
            ))}
          </div>

          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#3347a8] transition-all duration-300 group-hover:border group-hover:border-white/20 group-hover:bg-white/10 group-hover:text-white">
            <FiArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </article>
  );

  return (
    <CardLink
      href={card.href}
      external={card.external}
      locale={locale}
      className="block hover:no-underline md:col-span-2"
    >
      {content}
    </CardLink>
  );
}

function StandardCard({ card, t, locale }) {
  const href = card.href ? localizedHref(locale, card.href) : null;

  const content = (
    <article
      className={`interactive-card group relative overflow-hidden rounded-[20px] border border-[#e6eaf3] bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.05)] md:p-6 ${
        href ? "cursor-pointer" : ""
      }`}
    >
      <div className="relative z-10 flex h-full flex-col">
        <CategoryIcon icon={card.icon} />

        <h3 className="HeadingH5 mt-7 text-primary">
          {t(`cards.${card.key}.title`)}
        </h3>

        <p className="TextSmall mt-4 text-[#6b7280]">
          {t(`cards.${card.key}.description`)}
        </p>

        {href ? (
          <div className="mt-8 flex items-center justify-end">
            <span className="flex h-9 w-9 items-center justify-center rounded-full text-[#3347a8] transition-all duration-300 group-hover:border group-hover:border-white/20 group-hover:bg-white/10 group-hover:text-white">
              <FiArrowRight className="h-4 w-4" />
            </span>
          </div>
        ) : null}
      </div>
    </article>
  );

  if (!href) {
    return content;
  }

  return (
    <CardLink href={card.href} locale={locale} className="block hover:no-underline">
      {content}
    </CardLink>
  );
}

export default function FaqCategoriesSection() {
  const t = usePathTranslation("faqsPage.categories");
  const locale = useLocale();
  const [featuredCard, ...standardCards] = categoryCards;

  return (
    <section className="bg-white pb-14 md:pb-16 lg:pb-20">
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.75fr)] lg:items-end">
          <div className="max-w-2xl text-center md:text-left">
            <p className="TextSmall font-semibold uppercase tracking-[0.28em] text-[#293B93]">
              {t("eyebrow", "Browse by Topic")}
            </p>
            <h2 className="HeadingH1 mt-2 max-w-xl text-primary font-bold">
              {t("titleStart", "Find what you need")}
              <br />
              <span className="text-[#293B93]">{t("titleHighlight", "by category")}</span>
            </h2>
          </div>

          <p className="TextSmall max-w-md text-center md:text-right lg:justify-self-end lg:pt-7">
            {t(
              "description",
              "Eight curated knowledge hubs covering everything from account opening to advanced trading conditions."
            )}
          </p>
        </div>

        <div className="mt-10">
          <div className="md:hidden">
            <MobilePeekCarousel
              items={categoryCards}
              showArrows={true}
              trackClassName="-mx-4 px-4"
              slideClassName="px-0"
              renderItem={(card) =>
                card?.featured ? (
                  <FeaturedCard card={card} t={t} locale={locale} />
                ) : (
                  <StandardCard card={card} t={t} locale={locale} />
                )
              }
            />
          </div>

          <div className="hidden gap-4 md:grid md:grid-cols-2 xl:grid-cols-4">
            <FeaturedCard card={featuredCard} t={t} locale={locale} />
            {standardCards.map((card) => (
              <StandardCard key={card.key} card={card} t={t} locale={locale} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

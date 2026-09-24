"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { localizedHref } from "@/i18n/localizedHref";
import { TOP_NEWS } from "../marketNewsData";
import FadeInSection from "@/app/[locale]/company/contact-us/components/FadeInSection";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

function ColumnHeading({ children }) {
  return <h2 className="HeadingH5 mb-2 font-bold text-[#000] md:mb-3">{children}</h2>;
}

function ItemDivider() {
  return <span className="my-5 block h-[3px] w-5 rounded-full bg-[#293B93] md:my-6" aria-hidden />;
}

function ColumnDivider() {
  return (
    <div className="hidden items-stretch justify-center self-stretch px-6 lg:flex" aria-hidden>
      <span className="w-px bg-[#E1E7F6]" />
    </div>
  );
}

function SideNewsItem({ item, locale }) {
  return (
    <Link href={localizedHref(locale, item.href)} className="group block hover:no-underline">
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image src={item.image} alt={item.title || "Market news"} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 25vw" />
      </div>
      <h3 className="Text mt-3 font-semibold leading-[1.45] text-[#000] underline decoration-[#000]/25 underline-offset-[3px] group-hover:text-[#293B93] group-hover:decoration-[#293B93]/35">
        {item.title}
      </h3>
      <p className="TextSmall mt-3 font-normal text-[#293B93]">
        {item.author} <span aria-hidden className="text-[#848484]">•</span> {item.date}
      </p>
    </Link>
  );
}

function SideNewsColumn({ column, locale, title }) {
  return (
    <div className="min-w-0">
      <FadeInSection delay={0.1}>
        <ColumnHeading>{title}</ColumnHeading>
      </FadeInSection>
      {column.items.map((item, index) => (
        <div key={`${item.title}-${index}`}>
          <FadeInSection delay={index * 0.1}><SideNewsItem item={item} locale={locale} />
            {index < column.items.length - 1 ? <ItemDivider /> : null}
          </FadeInSection>
        </div>
      ))}
    </div>
  );
}

function BreakingNewsColumn({ column, locale, title }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = column.slides[activeSlide];

  return (
    <div className="min-w-0">
      <FadeInSection delay={0.1}>
        <ColumnHeading>{title}</ColumnHeading>
      </FadeInSection>

      <Link href={localizedHref(locale, slide.href)} className="group block hover:no-underline">
        <FadeInSection>
          <div className="relative aspect-[16/10] w-full overflow-hidden">
            <Image
              src={slide.image}
              alt={slide.headline || "Breaking market news"}
              fill
              className="object-cover transition duration-300 group-hover:scale-[1.01]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </FadeInSection>

        <FadeInSection>

          <h3 className="HeadingH4 mt-5 font-semibold leading-[1.3] text-[#000] group-hover:text-[#293B93] md:mt-6">
            {slide.headline}
          </h3>
        </FadeInSection>
        <FadeInSection delay={0.1}>
          <p className="TextSmall mt-4 font-normal leading-[1.6] text-[#656565]">{slide.excerpt}</p>
        </FadeInSection>
        <FadeInSection delay={0.2}>
          <p className="TextSmall mt-4 font-normal text-[#69729F] md:mt-5">
            {slide.author} <span aria-hidden>•</span> {slide.date}
          </p>
        </FadeInSection>
      </Link>

      <div className="mt-6 flex items-center gap-1.5 md:mt-8">
        {column.slides.map((item, index) => (
          <button
            key={`${item.headline}-${index}`}
            type="button"
            aria-label={`Show breaking story ${index + 1}`}
            aria-current={activeSlide === index}
            onClick={() => setActiveSlide(index)}
            className={clsx(
              "h-[3px] rounded-full transition-all duration-300",
              activeSlide === index ? "w-6 bg-[#293B93]" : "w-5 bg-[#D8DEEA] hover:bg-[#B7BEDE]"
            )}
          />
        ))}
      </div>
    </div>
  );
}

export default function MarketNewsTopSection({ locale = "en" }) {
  const t = usePathTranslation("marketNewsPage.topSection");

  return (
    <section className="bg-white py-10 md:py-20">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl">
          <h1 className="sr-only">{t("pageTitle", "GTCFX Market News")}</h1>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,2fr)_auto_minmax(0,1fr)] lg:gap-0">
            <SideNewsColumn
              column={TOP_NEWS.gtcNews}
              locale={locale}
              title={t("gtcNews", TOP_NEWS.gtcNews.title)}
            />
            <ColumnDivider />
            <BreakingNewsColumn
              column={TOP_NEWS.breaking}
              locale={locale}
              title={t("breakingNews", TOP_NEWS.breaking.title)}
            />
            <ColumnDivider />
            <SideNewsColumn
              column={TOP_NEWS.latestNews}
              locale={locale}
              title={t("latestNews", TOP_NEWS.latestNews.title)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

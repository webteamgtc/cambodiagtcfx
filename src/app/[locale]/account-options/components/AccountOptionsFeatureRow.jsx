"use client";

import Image from "next/image";
import clsx from "clsx";
import Button from "@/app/[locale]/components/common/Button";
import { useLocale, usePathTranslation } from "@/app/[locale]/LocaleProvider";
import { localizedHref } from "@/i18n/localizedHref";

function CheckBullet() {
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E1E7F6]">
      <svg
        className="h-3.5 w-3.5 text-[#293B93]"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden
      >
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

export default function AccountOptionsFeatureRow({
  itemKey,
  number,
  image,
  imageWidth,
  imageHeight,
  href,
  external = false,
  reverse = false,
  backgroundColor = "#fff",
}) {
  const t = usePathTranslation(`accountOptionsPage.items.${itemKey}`);
  const locale = useLocale();
  const resolvedHref = external ? href : localizedHref(locale, href) || href;
  const displayNumber = String(number).replace(/^0+/, "") || number;

  const bullets = [0, 1, 2]
    .map((index) => t(`bullets.${index}`, ""))
    .filter(Boolean);

  return (
      <article className={clsx("relative overflow-hidden py-10 md:py-14", `bg-[${backgroundColor}]`)}>
      <span
        className={clsx(
          "pointer-events-none absolute top-1/2 -translate-y-1/2 select-none font-bold leading-none bg-clip-text text-transparent",
          "bg-gradient-to-b from-[#f7f7f7] to-[#0532AA08]",
          reverse
            ? "right-0 text-[9rem] md:text-[11rem] lg:text-[20rem]"
            : "left-0 text-[9rem] md:text-[11rem] lg:text-[20rem]"
        )}
        aria-hidden
      >
        {displayNumber}
      </span>
      <div className="container min-w-0 max-w-full">
        <div className="max-w-6xl mx-auto">
          <div
            className={clsx(
              "relative grid items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16",
              reverse && "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1"
            )}
          >
            <div className="min-w-0 text-left">
              <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 shrink-0 rounded-full bg-[#293B93]" aria-hidden />
                <h2 className="HeadingH2 font-semibold text-[#293B93]">
                  {t("title", "Trading Account")}
                </h2>
              </div>

              <h3 className="HeadingH4 mt-4 max-w-xl font-medium leading-snug text-[#000032] md:mt-5">
                {t("subheadline", "")}
              </h3>

              <p className="Text mt-4 max-w-xl font-normal leading-[1.45] text-[#4A4A6A]">
                {t("description", "")}
              </p>

              <ul className="mt-6 space-y-4 md:mt-7">
                {bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3.5">
                    <CheckBullet />
                    <span className="TextSmall pt-0.5 font-medium text-[#000032]">{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 md:mt-9">
                <Button
                  href={resolvedHref}
                  external={external}
                  variant="brand"
                  size="md"
                  showArrow
                  className="!rounded-xl !font-normal"
                >
                  {t("cta", "Get Started")}
                </Button>
              </div>
            </div>

            <div className={clsx("flex justify-center", reverse ? "lg:justify-start" : "lg:justify-end")}>
              <div className="relative w-full max-w-[500px]">
                <Image
                  src={image}
                  alt={t("imageAlt", t("title", "Account option"))}
                  width={imageWidth}
                  height={imageHeight}
                  className="mx-auto h-auto w-full max-w-[440px] object-contain md:max-w-[500px]"
                  sizes="(max-width: 1024px) 90vw, 500px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

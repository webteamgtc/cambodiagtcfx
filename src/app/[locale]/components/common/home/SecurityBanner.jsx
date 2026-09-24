"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathTranslation } from "../../../LocaleProvider";

export default function SecurityBanner() {
  const t = usePathTranslation("home.homeSecurityBanner");

  return (
    <div className="bg-primary-gradient py-5 text-white md:py-8">
      <div className="container flex flex-col items-center justify-center gap-2 text-center md:flex-row md:gap-4">

        {/* Icon */}
        <div className="relative h-8 w-8 shrink-0 md:h-12 md:w-12">
          <Image
            src="/home/security.svg"
            fill
            alt="Security"
            className="object-contain"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col items-center gap-2 text-center md:items-start md:text-left">

          {/* Title */}
          <span className="HeadingH4 font-semibold text-white">
            {t("title")}
          </span>

          <div className="h-px w-full max-w-[80px] bg-white/10" />

          {/* Description */}
          <p className="TextSmall mt-1 text-white/85">
            {t("description")}{" "}
            <Link
              href={t("linkHref")}
              className="text-secondary underline transition hover:opacity-80"
            >
              {t("linkText")}
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
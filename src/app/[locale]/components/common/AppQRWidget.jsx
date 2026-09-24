"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { localizedHref } from "@/i18n/localizedHref";
import { useLocale, usePathTranslation } from "../../LocaleProvider";

export default function AppQRWidget({ locale: localeProp = "en" }) {
  const [visible, setVisible] = useState(true);
  const locale = useLocale() || localeProp;
  const t = usePathTranslation("appQRWidget");

  if (!visible) return null;

  const link = t("link", "/");
  const isExternal = link.startsWith("http://") || link.startsWith("https://");
  const finalHref = isExternal ? link : localizedHref(locale, link);

  return (
    <div className="fixed bottom-6 ltr:left-6 rtl:left-6 z-50 hidden lg:block">
      <Link
        href={finalHref}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="group relative block no-underline hover:no-underline"
        aria-label={t("ariaLabel", "Download GTC Go App")}
      >
        <span className="absolute inset-0 rounded-[26px] bg-secondary/10 blur-[6px] opacity-70 animate-[softPulse_2.5s_ease-in-out_infinite]" />

        <div className="relative w-[185px] overflow-hidden rounded-[26px] border border-white/60 bg-white/95 p-3 shadow-[0_18px_50px_rgba(0,0,0,0.18)] backdrop-blur-md transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_22px_60px_rgba(0,0,0,0.22)]">
          <div className="mb-2 flex items-center justify-between">
            <span className="rounded-full bg-gradient-to-r from-[#B68756] via-[#995F22] to-[#995F22] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-white">
              {t("badge", "Scan Me")}
            </span>

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setVisible(false);
              }}
              className="flex h-6 w-6 items-center justify-center rounded-md text-[#6B7280] transition hover:bg-gray-100 hover:text-primary"
              aria-label={t("closeAriaLabel", "Close")}
            >
              ✕
            </button>
          </div>

          <div className="relative mx-auto h-[150px] w-[150px]">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#192055]/5 to-[#B68756]/10" />
            <Image
              src={t("image", "/home/qr-app.webp")}
              alt={t("title", "Download GTC Go App")}
              fill
              className="rounded-2xl object-contain"
              priority
            />
          </div>

          <div className="mt-1 text-center">
            <p className="text-[13px] font-semibold text-primary">
              {t("title", "Download GTC Go App")}
            </p>
            <p className="mt-1 text-[11px] text-[#6B7280]">
              {t("subtitle", "Scan the QR code to get started")}
            </p>
          </div>

          <span className="pointer-events-none absolute -left-10 top-0 h-full w-10 rotate-12 bg-white/40 blur-md transition-all duration-700 group-hover:left-[120%]" />
        </div>
      </Link>
    </div>
  );
}
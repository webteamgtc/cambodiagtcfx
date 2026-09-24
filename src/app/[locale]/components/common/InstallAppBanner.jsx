"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GTC_GO_APP_DOWNLOAD_HREF } from "@/lib/gtcGoAppLinks";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

function InstallAppBanner() {
    const t = usePathTranslation("common.appInstall");
    const tA11y = usePathTranslation("common.a11y");
    const [visible, setVisible] = useState(true);
  
    if (!visible) return null;
  
    return (
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#E8EAF0] bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.08)] lg:hidden">
        <div className="container">
          <div className="flex items-center gap-3 py-3">
            <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-[#F3F4F6]">
              <Image
                src="/GTCFX-ICON.svg"
                alt={t("appAlt", "GTC Go")}
                fill
                className="object-cover"
                sizes="44px"
              />
            </div>
  
            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] font-semibold leading-tight text-[#111827]">
                {t("title", "GTCFX: GTC Go – Trade & Invest")}
              </p>
              <div className="mt-1 flex items-center gap-0.5" aria-label={t("starsAria", "4.5 out of 5 stars")}>
                {[0, 1, 2, 3].map((index) => (
                  <svg
                    key={index}
                    className="h-3.5 w-3.5 text-[#F5B400]"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.52L10 14.27l-4.94 2.46.94-5.52-4-3.9 5.53-.8L10 1.5z" />
                  </svg>
                ))}
                <svg
                  className="h-3.5 w-3.5 text-[#F5B400]"
                  viewBox="0 0 20 20"
                  aria-hidden
                >
                  <defs>
                    <linearGradient id="installBannerHalfStar">
                      <stop offset="50%" stopColor="currentColor" />
                      <stop offset="50%" stopColor="#E5E7EB" />
                    </linearGradient>
                  </defs>
                  <path
                    fill="url(#installBannerHalfStar)"
                    d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.52L10 14.27l-4.94 2.46.94-5.52-4-3.9 5.53-.8L10 1.5z"
                  />
                </svg>
              </div>
            </div>
  
            <div className="flex shrink-0 flex-col items-end gap-1">
              <button
                type="button"
                onClick={() => setVisible(false)}
                aria-label={tA11y("closeAppInstallBanner", "Close app install banner")}
                className="flex h-5 w-5 items-center justify-center rounded-full text-[#6B7280] transition hover:bg-[#F3F4F6] hover:text-[#111827]"
              >
                <svg
                  className="h-3.5 w-3.5"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  aria-hidden
                >
                  <path d="M4 4l8 8M12 4l-8 8" />
                </svg>
              </button>
              <Link
                href={GTC_GO_APP_DOWNLOAD_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center justify-center rounded-full bg-[#293B93] px-5 text-[13px] font-semibold text-white transition hover:bg-[#1E2D77] hover:no-underline"
              >
                {t("install", "Install")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

export default InstallAppBanner;

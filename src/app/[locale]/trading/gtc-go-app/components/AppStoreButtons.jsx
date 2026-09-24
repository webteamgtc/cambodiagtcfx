"use client";

import { usePathTranslation } from "@/app/[locale]/LocaleProvider";
import { useStoreDownloadHref } from "@/lib/useStoreDownloadHref";

export function AppStoreButton({ type, variant = "dark", className = "" }) {
  const t = usePathTranslation("gtcGoAppPage.storeButtons");
  const isApple = type === "apple";
  const resolvedHref = useStoreDownloadHref(isApple ? "apple" : "google");

  const variants = {
    dark: "bg-[#293B93] text-white hover:bg-[#1f2d75]",
    light: "border border-[#E1E7F6] bg-white text-[#293B93] hover:bg-[#F8F9FC]",
    gold: "bg-[#B48755] text-white hover:bg-[#9a7348]",
    black: "bg-black text-white hover:bg-[#111827]",
    primary: "bg-[#0A1B61] text-white hover:bg-[#1f2d75]",

  };

  return (
    <a
      href={resolvedHref}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex w-fit items-center justify-center gap-3 rounded-xl px-3 py-3 transition sm:w-auto md:px-5 ${variants[variant] ?? variants.dark} ${className}`}
    >
      {isApple ? (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.21-1.96 1.07-3.11-1.05.05-2.31.7-3.06 1.58-.67.78-1.26 2.02-1.1 3.2 1.18.09 2.38-.59 3.09-1.67z" />
        </svg>
      ) : (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M3 20.5v-17c0-.59.34-1.11.84-1.35L13.69 12l-9.85 9.85c-.5-.24-.84-.76-.84-1.35zm13.81-5.38L6.05 21.34l8.49-8.49 2.27 2.27zm3.35-4.31c.34.27.59.69.59 1.19s-.22.9-.57 1.18l-2.29 1.32-2.5-2.5 2.5-2.5 2.27 1.31zM6.05 2.66l10.76 6.22-2.27 2.27L6.05 2.66z" />
        </svg>
      )}
      <div className="text-left">
        <div className="text-[10px] leading-none opacity-90">
          {isApple ? t("appleTop") : t("googleTop")}
        </div>
        <div className="text-sm font-semibold leading-tight">
          {isApple ? t("appleName") : t("googleName")}
        </div>
      </div>
    </a>
  );
}

export function AppStoreBadge({ type }) {
  const isApple = type === "apple";
  const resolvedHref = useStoreDownloadHref(isApple ? "apple" : "google");

  return (
    <a
      href={resolvedHref}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-12 min-w-[148px] items-center gap-2 rounded-lg bg-[#0B1220] px-4 text-white transition hover:bg-[#161f33]"
    >
      {isApple ? (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.21-1.96 1.07-3.11-1.05.05-2.31.7-3.06 1.58-.67.78-1.26 2.02-1.1 3.2 1.18.09 2.38-.59 3.09-1.67z" />
        </svg>
      ) : (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M3 20.5v-17c0-.59.34-1.11.84-1.35L13.69 12l-9.85 9.85c-.5-.24-.84-.76-.84-1.35zm13.81-5.38L6.05 21.34l8.49-8.49 2.27 2.27zm3.35-4.31c.34.27.59.69.59 1.19s-.22.9-.57 1.18l-2.29 1.32-2.5-2.5 2.5-2.5 2.27 1.31zM6.05 2.66l10.76 6.22-2.27 2.27L6.05 2.66z" />
        </svg>
      )}
      <div className="text-left leading-tight">
        <div className="text-[9px] uppercase opacity-80">
          {isApple ? "Download on the" : "Get it on"}
        </div>
        <div className="text-sm font-semibold">{isApple ? "App Store" : "Google Play"}</div>
      </div>
    </a>
  );
}

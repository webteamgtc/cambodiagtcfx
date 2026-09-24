"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { useLocale, usePathTranslation } from "@/app/[locale]/LocaleProvider";
import { localizedHref } from "@/i18n/localizedHref";
import {
  LIVE_CHAT_HREF,
  SIDEBAR_ACCOUNTS,
  SUPPORT_IMAGE,
} from "../liveAccountApplicationData";

function CheckIcon() {
  return (
    <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M2.5 6.25L5 8.75L9.5 3.75"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function LiveAccountApplicationSidebar({
  activeKey = "standard-account",
}) {
  const t = usePathTranslation("liveAccountApplicationPage");
  const locale = useLocale();

  return (
    <aside className="min-w-0 space-y-5 lg:sticky lg:top-28 lg:self-start">
      <div className="overflow-hidden rounded-2xl border border-[#E1E7F6] bg-white">
        <div className="relative overflow-hidden bg-[#293B93] px-5 py-6 text-center">
          <span
            className="pointer-events-none absolute -left-5 top-3 h-16 w-16 rounded-full bg-white/10"
            aria-hidden
          />
          <span
            className="pointer-events-none absolute right-6 top-2 h-10 w-10 rounded-full bg-white/10"
            aria-hidden
          />
          <span
            className="pointer-events-none absolute -right-3 bottom-0 h-20 w-20 rounded-full bg-white/[0.07]"
            aria-hidden
          />
          <p className="relative HeadingH5 font-semibold text-white">
            {t("sidebar.needHelp", "Need Help?")}
          </p>
        </div>

        <div className="relative px-4 pb-2 pt-1">
          <div className="relative mx-auto h-[168px] w-full max-w-[240px]">
            <Image
              src="/account.webp"
              alt=""
              fill
              className="object-contain object-center"
              sizes="240px"
            />
          </div>
        </div>

        <div className="px-5 pb-5">
          <a
            href={LIVE_CHAT_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="TextButton inline-flex w-full items-center justify-center gap-2.5 rounded-[10px] border border-[#C5D0F0] bg-[#F7F9FF] px-5 py-3 font-semibold text-[#293B93] transition hover:border-[#293B93]/35 hover:bg-[#F8F9FC] hover:no-underline"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#293B93] text-white">
              <CheckIcon />
            </span>
            <span className="underline decoration-[#293B93]/80 underline-offset-2">
              {t("sidebar.liveChat", "Live Chat")}
            </span>
          </a>
        </div>
      </div>

      <nav
        className="overflow-hidden rounded-2xl border border-[#E1E7F6] bg-white p-6"
        aria-label={t("sidebar.accountTypesLabel", "Account types")}
      >
        <ul className="space-y-5">
          {SIDEBAR_ACCOUNTS.map((item) => {
            const isActive = item.accountSlug === activeKey;
            const label = t(item.labelKey, item.defaultLabel);
            const linkClass =
              "flex items-start gap-3 Text font-medium text-[#273D91] hover:text-[#293B93] hover:no-underline transition";

            const content = (
              <>
                <span className="mt-[7px] h-[7px] w-[7px] shrink-0 rounded-full bg-[#273D91]" />
                <span>{label}</span>
              </>
            );

            if (item.external) {
              return (
                <li key={item.key}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    {content}
                  </a>
                </li>
              );
            }

            return (
              <li key={item.key}>
                <Link
                  href={localizedHref(locale, item.href) || item.href}
                  className={linkClass}
                  aria-current={isActive ? "page" : undefined}
                >
                  {content}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

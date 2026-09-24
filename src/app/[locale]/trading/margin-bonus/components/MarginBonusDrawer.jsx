"use client";

import { useEffect, useState } from "react";
import { useLocale, usePathTranslation } from "@/app/[locale]/LocaleProvider";
import { localeDir } from "@/i18n/config";
import MarginBonusForm from "@/app/[locale]/components/common/forms/MarginForm";

const APPLY_URL =
  "https://mygtcfx.com/getview?view=register&token=exhowww.z8owwwww";

const STATS = [
  { value: "100%", label: "Bonus Rate" },
  { value: "$5,000", label: "Max Bonus" },
  { value: "$500", label: "Min Deposit" },
];

const STEPS = [
  "Open a live trading account",
  "Make a qualifying deposit (min $500)",
  "Request your margin bonus via Live Chat or email",
  "Start trading with extra margin power",
];

export default function MarginBonusDrawer({ open, onClose }) {
  const locale = useLocale();
  const isRTL = localeDir[locale] === "rtl";
  const t = usePathTranslation("marginBonusPage.drawer");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const drawerTranslate = open
    ? "translate-x-0"
    : isRTL
      ? "-translate-x-full"
      : "translate-x-full";

  const slideOrigin = isRTL ? "left-0" : "right-0";

  return (
    <>
      {open &&
        <>
          <div
            onClick={onClose}
            aria-hidden="true"
            className={`fixed inset-0 z-[998] bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${open
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
              }`}
          />

          <div
            role="dialog"
            aria-modal="true"
            className={`fixed top-0 ${slideOrigin} z-[999] flex h-full w-full max-w-[440px] flex-col bg-white shadow-2xl
          transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
          ${drawerTranslate}`}
            dir={isRTL ? "rtl" : "ltr"}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#E5E7EB] px-6 py-5">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#b68756]/15">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-5 w-5 text-[#b68756]"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>

                <div>
                  <h2 className="text-lg font-bold text-[#111827]">
                    {t("title", "Apply for Margin Bonus")}
                  </h2>
                </div>
              </div>

              <button
                onClick={onClose}
                aria-label={t("close", "Close drawer")}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E5E7EB] text-[#6B7280] transition hover:border-[#D1D5DB] hover:bg-[#F9FAFB] hover:text-[#111827]"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path
                    d="M18 6 6 18M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <MarginBonusForm />
            </div>
          </div>
        </>
      }
    </>
  );
}

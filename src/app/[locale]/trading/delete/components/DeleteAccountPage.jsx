"use client";

import DeleteForm from "./DeleteForm";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

export default function DeleteAccountPage() {
  const t = usePathTranslation("deleteAccountPage");

  return (
    <section className="min-h-screen bg-[#f7fbff] py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Hero */}
        <div className="mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700">
            <svg className="h-5 w-5 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            {t("hero.badge", "Account Deletion Request")}
          </div>

          <div className="mt-5 max-w-3xl">
            <h2 className="HeadingH2">
              {t("hero.titleBefore", "Delete Your")}{" "}
              <span className="text-secondary">{t("hero.titleHighlight", "Trading Account")}</span>
            </h2>
            <p className="mt-4 text-base md:text-lg leading-7 text-slate-600">
              {t(
                "hero.description",
                "Submit a secure request to permanently delete your trading account. Please review the important notes carefully before continuing."
              )}
            </p>
          </div>
        </div>

        {/* Main layout */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left side info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_12px_35px_rgba(15,23,42,0.06)]">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                  <svg className="h-5 w-5 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                </div>
                <h2 className="HeadingH5 text-secondary font-semibold">
                  {t("beforeYouContinue.title", "Before You Continue")}
                </h2>
              </div>

              <div className="mt-5 space-y-4 text-sm leading-6 text-slate-600">
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  {t(
                    "beforeYouContinue.note1",
                    "Account deletion is permanent and may remove access to account history, balances, and platform records."
                  )}
                </div>

                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  {t(
                    "beforeYouContinue.note2",
                    "Please ensure all open positions are closed before submitting your request."
                  )}
                </div>

                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  {t(
                    "beforeYouContinue.note3",
                    "For security verification, the submitted details must match your registered account information."
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_12px_35px_rgba(15,23,42,0.06)]">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-[#0F3B8C]">
                  <svg className="h-5 w-5 text-[#0F3B8C]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="2" y="6" width="20" height="12" rx="2" />
                    <path d="M16 12h.01" />
                  </svg>
                </div>
                <h2 className="HeadingH5 text-secondary font-semibold">
                  {t("helpfulNotes.title", "Helpful Notes")}
                </h2>
              </div>

              <ul className="mt-5 space-y-3 text-sm text-slate-600">
                <li className="rounded-xl bg-slate-50 px-4 py-3">
                  {t("helpfulNotes.note1", "Use your registered email address for faster verification.")}
                </li>
                <li className="rounded-xl bg-slate-50 px-4 py-3">
                  {t("helpfulNotes.note2", "Add all trading account numbers you want to delete.")}
                </li>
                <li className="rounded-xl bg-slate-50 px-4 py-3">
                  {t("helpfulNotes.note3", "Include your reason if you want the support team to review it.")}
                </li>
              </ul>
            </div>
          </div>

          {/* Right side form */}
          <div className="lg:col-span-8">
            <div className="rounded-[32px] border border-slate-200 bg-white p-6 md:p-8 shadow-[0_16px_45px_rgba(15,23,42,0.08)]">
              <div className="mb-8">
                <h2 className="HeadingH4">
                  {t("formCard.titleBefore", "Trading")}{" "}
                  <span className="text-secondary">{t("formCard.titleHighlight", "Account")}</span>{" "}
                  {t("formCard.titleAfter", "Deletion Request Form")}
                </h2>
                <p className="mt-2 text-slate-600">
                  {t(
                    "formCard.description",
                    "Complete the form below and confirm the required statements to proceed."
                  )}
                </p>
              </div>
              <DeleteForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
"use client";

import { useCallback, useEffect, useState } from "react";
import { useLocationDetail } from "@/context/useLocationDetail";
import { getCookie, setCookie } from "@/lib/cookies/consent";

const COOKIE_NAME = "gtcfx_us_cfd_risk";
const COOKIE_MAX_AGE = 72 * 60 * 60; // 72 hours

const DISCLAIMER_TEXT =
  "By continuing, you confirm that you understand the risks of trading CFDs, that you are not relying solely on this site for financial advice, and that you are not a resident or citizen of the United States, where GTCFX does not provide CFD trading services.";

const REJECTED_TEXT =
  "You can't use this website without accepting the risk disclaimer. Please accept to continue visiting the site.";

function RiskIcon() {
  return (
    <span className="relative inline-flex h-14 w-14 items-center justify-center">
      <span className="absolute inset-0 rounded-2xl bg-[#293B93]/10" />
      <span className="absolute inset-1 rounded-[14px] bg-gradient-to-br from-[#293B93] to-[#141B43] shadow-[0_8px_20px_rgba(41,59,147,0.28)]" />
      <svg
        className="relative h-7 w-7 text-white"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
      >
        <path
          d="M12 3l7 3v5.5c0 4.2-2.7 7.8-7 9.5-4.3-1.7-7-5.3-7-9.5V6l7-3z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M12 8.5v4.2M12 15.7h.01"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

function BlockedIcon() {
  return (
    <span className="relative inline-flex h-14 w-14 items-center justify-center">
      <span className="absolute inset-0 rounded-2xl bg-red-500/10" />
      <span className="absolute inset-1 rounded-[14px] bg-gradient-to-br from-[#B91C1C] to-[#7F1D1D] shadow-[0_8px_20px_rgba(185,28,28,0.28)]" />
      <svg
        className="relative h-7 w-7 text-white"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
      >
        <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.7" />
        <path
          d="M8.5 8.5l7 7M15.5 8.5l-7 7"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export default function UsCfdDisclaimerModal() {
  const { countryCode, locationReady } = useLocationDetail();
  const [open, setOpen] = useState(false);
  const [rejected, setRejected] = useState(false);

  useEffect(() => {
    if (!locationReady) return;
    if (countryCode !== "US") {
      setOpen(false);
      setRejected(false);
      return;
    }
    setOpen(getCookie(COOKIE_NAME) !== "accepted");
  }, [locationReady, countryCode]);

  const handleAccept = useCallback(() => {
    setCookie(COOKIE_NAME, "accepted", COOKIE_MAX_AGE);
    setRejected(false);
    setOpen(false);
  }, []);

  const handleReject = useCallback(() => {
    setRejected(true);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <div
        className="absolute inset-0 bg-[#020617]/70 backdrop-blur-[6px]"
        aria-hidden
      />

      <div className="relative flex h-full items-center justify-center p-4 sm:p-6">
        <div
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="us-cfd-disclaimer-title"
          className="animate-[fadeInUp_0.35s_ease-out] relative w-full max-w-[440px] overflow-hidden rounded-[28px] border border-white/60 bg-white shadow-[0_28px_80px_rgba(15,23,42,0.35)]"
        >
          <div className="px-6 pb-7 pt-7 sm:px-8 sm:pb-8 sm:pt-8">
            {rejected ? (
              <div className="flex flex-col items-center text-center">
                <BlockedIcon />

                <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B91C1C]">
                  Access restricted
                </p>

                <h2
                  id="us-cfd-disclaimer-title"
                  className="mt-2 text-[22px] font-semibold leading-tight tracking-[-0.02em] text-[#0F172A] sm:text-[24px]"
                >
                  You can&apos;t use this website
                </h2>

                <p className="mt-4 text-[14px] leading-[1.7] text-[#475569] sm:text-[15px]">
                  {REJECTED_TEXT}
                </p>

                <button
                  type="button"
                  onClick={handleAccept}
                  className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#293B93] px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_10px_24px_rgba(41,59,147,0.28)] transition hover:bg-[#1E2D77]"
                >
                  Accept to visit website
                </button>

                <button
                  type="button"
                  onClick={() => setRejected(false)}
                  className="mt-3 text-[13px] font-medium text-[#64748B] underline-offset-2 transition hover:text-[#0F172A] hover:underline"
                >
                  Back to disclaimer
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center">
                <RiskIcon />

                <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#995F22]">
                  Important notice
                </p>
                <p className="mt-4 text-[14px] leading-[1.7] text-[#475569] sm:text-[15px]">
                  {DISCLAIMER_TEXT}
                </p>

                <div className="mt-6 flex w-full  gap-3">
                  <button
                    type="button"
                    onClick={handleAccept}
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#293B93] px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_10px_24px_rgba(41,59,147,0.28)] transition hover:bg-[#1E2D77] hover:shadow-[0_12px_28px_rgba(41,59,147,0.34)]"
                  >
                    Accept
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M3 8h10M9 4l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  <button
                    type="button"
                    onClick={handleReject}
                    className="flex w-full cursor-pointer items-center justify-center rounded-full border border-[#E2E8F0] bg-white px-6 py-3.5 text-[15px] font-semibold text-[#475569] transition hover:border-[#CBD5E1] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
                  >
                    Reject
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}

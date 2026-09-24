"use client";

import React, { useMemo } from "react";
import { useSearchParams } from "next/navigation";

const ThankYouPageClient = ({ messages = {} }) => {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  const text = (key, fallback) => {
    const val = messages?.[key];
    return typeof val === "string" && val.length ? val : fallback;
  };

  const checkEmailText = useMemo(
    () =>
      text(
        "checkEmail",
        "Please check your email. The details have been sent to the provided email address."
      ),
    [messages]
  );

  return (
    <section className="bg-gradient-to-b from-[#F8FAFF] via-[#FFFFFF] to-[#FFFFFF] py-10 md:py-14 xl:py-20 3xl:py-20">
      <div className="container">
        <div className="mx-auto max-w-3xl rounded-[28px] border border-[#E5E7EB] bg-white p-5 shadow-[0_25px_60px_rgba(15,23,42,0.08)] md:p-8 lg:p-10">
          {/* Header strip */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#263788] via-[#1A2A6C] to-[#101638] px-5 py-6 text-center md:px-8">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20">
              <svg className="h-7 w-7 text-[#b68756]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h1 className="mt-4 text-[2em] font-bold text-white md:text-[2.1em]">
              {text("heading", "Thank you")}
            </h1>
            <p className="mt-3 text-secondary text-center text-base font-[400] md:text-[1.15rem] md:leading-8">
              {text("heading1", "Your request was received successfully.")}
            </p>
          </div>

          {/* Optional email notice */}
          {message === "true" && (
            <div className="mt-6 rounded-2xl border border-[#E8ECFF] bg-[#F6F8FF] px-5 py-4 md:px-6">
              <p className="flex items-start gap-3 text-secondary">
                <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/10">
                  <svg className="h-4.5 w-4.5 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l9 6 9-6" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8v10H3V8" />
                  </svg>
                </span>
                <span className="text-sm leading-6 md:text-[15px]">{checkEmailText}</span>
              </p>
            </div>
          )}

          {/* Body */}
          <div className="mt-6 space-y-3 text-center">
            <p className="Text max-w-2xl mx-auto">{text("des", "")}</p>
            <p className="Text max-w-2xl mx-auto">{text("des1", "")}</p>
            <p className="Text max-w-2xl mx-auto">{text("footer", "")}</p>
            <p className="TextSmall max-w-3xl mx-auto md:text-[14px]">{text("footer1", "")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThankYouPageClient;


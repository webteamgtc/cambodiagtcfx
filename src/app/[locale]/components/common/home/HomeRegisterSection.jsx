"use client";

import Image from "next/image";
import CommonLeadForm, {
  DEFAULT_LEAD_FORM_APPEARANCE,
} from "@/app/[locale]/components/common/CommonLeadForm";
import { useLocale, usePathTranslation } from "../../../LocaleProvider";
import { localizedHref } from "@/i18n/localizedHref";

const BACKGROUND_SRC = "/new-design/bg-last-home.webp";

export const REGISTER_FORM_APPEARANCE = {
  ...DEFAULT_LEAD_FORM_APPEARANCE,
  cardBackground: "transparent",
  decorativeBlob: "transparent",
  labelColor: "#69729F",
  fieldText: "#000032",
  fieldBorder: "#E1E7F6",
  fieldFocusBorder: "#293B93",
  fieldPlaceholder: "#9CA3AF",
  sendOtpBorder: "#293B93",
  sendOtpText: "#ffffff",
  sendOtpBg: "#293B93",
  submitGradientFrom: "#293B93",
  submitGradientTo: "#293B93",
  submitText: "#ffffff",
  submitDisabledBg: "#DCDCDC",
  submitDisabledText: "#868686",
  disclaimerMuted: "#69729F",
  linkColor: "#293B93",
};

export default function HomeRegisterSection() {
  const t = usePathTranslation("home.registerSection");
  const locale = useLocale();
  const thankYouHref = localizedHref(locale, "/thank-you") || "/thank-you";

  return (
    <div className="container">
      <section className="relative mt-10 overflow-hidden rounded-t-[24px] md:mt-14 md:rounded-t-[32px]">
        <div className="absolute inset-0">
          <Image
            src={BACKGROUND_SRC}
            alt=""
            fill
            priority={false}
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1e3a8a]/55 via-[#3b82f6]/25 to-white/95" />
        </div>

        <div className=" relative z-10 py-12 md:py-16">
          <div className="mx-auto grid max-w-6xl  px-4 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-12 xl:gap-16">
            <div className="min-w-0 text-center lg:text-left">
              <h2 className="HeadingH1 max-w-md text-balance font-semibold text-white">
                {t("title", "Trade the World's markets.")}
              </h2>
              <p className="Text mx-auto mt-4 max-w-md leading-relaxed text-white lg:mx-0 md:mt-5">
                {t(
                  "subtitle",
                  "Open a live account and access 7+ trading markets including Forex, indices, commodities, and Precious metals — from a broker trusted globally."
                )}
              </p>
            </div>

            <div className="min-w-0 rounded-[20px] border border-white/50 bg-white/85 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.14)] backdrop-blur-md md:p-7 lg:p-8">
              <CommonLeadForm
                variant="homeRegister"
                translationNamespace="home.registerForm"
                formTitle={t("formTitle", "Register Now")}
                hideDisclaimer
                appearance={REGISTER_FORM_APPEARANCE}
                successRedirect={thankYouHref}
                cardClassName="!p-0 !rounded-none"
                cardStyle={{ boxShadow: "none" }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

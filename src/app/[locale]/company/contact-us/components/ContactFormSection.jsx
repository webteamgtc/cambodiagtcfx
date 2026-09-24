"use client";

import { FiClock, FiMapPin, FiShield } from "react-icons/fi";
import ContactForm from "@/app/[locale]/contact-us/components/ContactFrom";
import FadeInSection from "./FadeInSection";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

const features = [
  { icon: FiClock, key: "fastResponse" },
  { icon: FiMapPin, key: "localExpertise" },
  { icon: FiShield, key: "secure" },
];

export default function ContactFormSection({ locale = "en" }) {
  const t = usePathTranslation("contactUsPage.form");

  return (
    <section className="relative bg-white py-10 md:py-16">
      <div className="container">
        <div className="">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:gap-16">
            {/* Left Content */}
            <FadeInSection className="min-w-0">
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#3347a8]">
                {t("eyebrow", "Get in Touch")}
              </span>
              <h2 className="HeadingH1 mt-5">
                {t("title", "Get in touch")}
              </h2>
              <p className="mt-5 text-[15px] leading-[1.7] text-[#5a5a6e]">
                {t(
                  "description",
                  "Your satisfaction is our top priority. We are dedicated to ensuring that you have a seamless and rewarding experience with our services."
                )}
              </p>

              {/* Feature Cards */}
              <div className="mt-10 space-y-6">
                {features.map((feature) => (
                  <div key={feature.key} className="flex items-start gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#e8ecf8] bg-[#fafbff] text-[#3347a8]">
                      <feature.icon className="h-5 w-5" strokeWidth={1.8} />
                    </span>
                    <div className="pt-0.5">
                      <h3 className="text-[15px] font-semibold text-[#02002f]">{t(`features.${feature.key}.title`)}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-[#5a5a6e]">{t(`features.${feature.key}.description`)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-10 text-[15px] leading-[1.7] text-[#5a5a6e]">
                {t(
                  "closing",
                  "Submit an enquiry or contact our support team using one of the channels above. Our team can assist with account, platform, payment and general service-related matters.GTCFX provides general and administrative support only through this page. Nothing communicated through our support channels constitutes investment, legal or tax advice."
                )}
              </p>
            </FadeInSection>

            {/* Right Form */}
            <FadeInSection className="min-w-0" delay={0.15}>
              <ContactForm locale={locale} />
            </FadeInSection>
          </div>
        </div>
      </div>
    </section>
  );
}

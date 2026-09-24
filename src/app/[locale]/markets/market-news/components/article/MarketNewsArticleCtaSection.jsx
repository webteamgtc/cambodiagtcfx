"use client";

import Link from "next/link";
import { FiArrowRight, FiBarChart2, FiClock, FiHeadphones, FiLock, FiPercent, FiShield, FiUser } from "react-icons/fi";
import { REGISTER_HREF } from "../../marketNewsArticleData";
import FadeInSection from "@/app/[locale]/company/contact-us/components/FadeInSection";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

const FEATURE_KEYS = [
  { key: "lowCommissions", icon: FiPercent },
  { key: "realTimeData", icon: FiBarChart2 },
  { key: "support247", icon: FiHeadphones },
];

const TRUST_KEYS = [
  { key: "noHiddenFees", icon: FiShield },
  { key: "secureEncryption", icon: FiLock },
  { key: "quickRegistration", icon: FiClock },
];

export default function MarketNewsArticleCtaSection() {
  const t = usePathTranslation("marketNewsArticlePage.cta");

  return (
    <section className="relative bg-[#F6F7FB] overflow-hidden py-14 md:py-16">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 90% 80% at 50% 50%, rgba(237, 240, 251, 0.95) 0%, rgba(248, 249, 252, 0.98) 45%, #FFFFFF 100%)",
        }}
      />

      <div className="container relative z-10 min-w-0 max-w-full">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <FadeInSection>
            <h2 className="HeadingH1 font-semibold text-[#000]">{t("heading", "Start Trading Smarter")}</h2>
          </FadeInSection>
          <FadeInSection delay={0.1}>
            <p className="HeadingH2 font-semibold text-[#293B93]">{t("subheading", "-Open Your Account in Minutes-")}</p>
          </FadeInSection>
          <FadeInSection delay={0.2}>
            <p className="TextSmall mx-auto mt-4 max-w-2xl font-normal leading-[1.7] text-[#4E4E4E]">
              {t(
                "description",
                "Get instant access to global markets, advanced charting, and expert insights. Whether you're a beginner or a professional, your next opportunity starts here. Secure, regulated, and transparent."
              )}
            </p>
          </FadeInSection>
          <FadeInSection delay={0.3}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {FEATURE_KEYS.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.key}
                    className="inline-flex items-center gap-2 rounded-[8px] border border-[#D9D9D9] bg-transparent px-4 py-2.5"
                  >
                    <Icon className="h-4 w-4 shrink-0 text-[#6A739E]" aria-hidden />
                    <span className="TextSmall font-normal text-[#000]">{t(`features.${feature.key}`, feature.key)}</span>
                  </div>
                );
              })}
            </div>
          </FadeInSection>
          <FadeInSection delay={0.4}>
            <Link
              href={REGISTER_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="TextButton mt-10 inline-flex h-14 w-full max-w-xl items-center justify-center gap-3 rounded-full bg-[#293B93] px-8 font-medium text-white transition hover:bg-[#243575] hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#293B93]/40 focus-visible:ring-offset-2"
              style={{
                boxShadow: "0 4px 30px 0 rgba(41, 59, 147, 0.30)"
              }}
            >
              <FiUser className="h-4 w-4 shrink-0" aria-hidden />
              {t("openAccount", "Open My Account Now")}
              <FiArrowRight className="h-4 w-4 shrink-0" aria-hidden />
            </Link>
          </FadeInSection>
          <FadeInSection delay={0.5}>
            <div className="TextSmall mt-6 flex flex-wrap items-center justify-center gap-3 font-normal text-[#97A7DD]">
              {TRUST_KEYS.map((item, index) => {
                const Icon = item.icon;
                return (
                  <span key={item.key} className="inline-flex items-center gap-3">
                    {index > 0 ? <span className="text-[#97A7DD]" aria-hidden>·</span> : null}
                    <span className="inline-flex items-center gap-1.5">
                      <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
                      {t(`trust.${item.key}`, item.key)}
                    </span>
                  </span>
                );
              })}
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

"use client";

import { FiEdit3, FiAlertOctagon, FiShield, FiBell } from "react-icons/fi";
import FadeInSection from "./FadeInSection";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

const policies = [
  { icon: FiEdit3, key: "adjustment", bg: "bg-[#eef1fb]", color: "text-[#3347a8]" },
  { icon: FiAlertOctagon, key: "volatility", bg: "bg-[#fdf4ea]", color: "text-[#c7894f]" },
  { icon: FiShield, key: "negativeBalance", bg: "bg-[#eafaf1]", color: "text-[#2eab71]" },
  { icon: FiBell, key: "marginCall", bg: "bg-[#fdeaea]", color: "text-[#e04a4a]" },
];

export default function LeveragePolicySection() {
  const t = usePathTranslation("dynamicLeveragePage.policy");

  return (
    <section className="relative py-10 md:py-16" style={{ backgroundColor: "#F8F9FC" }}>
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl">
          {/* Policy Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {policies.map((policy, index) => (
              <FadeInSection key={policy.key} delay={index * 0.1}>
                <div className="flex h-full items-start gap-4 rounded-2xl border border-[#e8ecf8] bg-white p-6 transition hover:shadow-md hover:border-[#d0d8e8]">
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${policy.bg} ${policy.color}`}>
                    <policy.icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <div>
                    <h3 className="text-[16px] font-semibold text-[#02002f]">{t(`items.${policy.key}.title`)}</h3>
                    <p className="mt-2 text-[13px] leading-[1.7] text-[#5a5a6e]">{t(`items.${policy.key}.description`)}</p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>

          {/* Risk Disclosure */}
          <FadeInSection delay={0.3}>
            <div className="mt-10">
              <p className="text-[13px] leading-[1.8] text-[#8a8a9a]">
                <strong className="text-[#5a5a6e]">{t("riskDisclosureLabel", "Risk Disclosure:")}</strong>{" "}
                {t(
                  "riskDisclosureText",
                  "Trading foreign exchange, CFDs, metals, and other off-exchange products on margin carries a high level of risk and may not be suitable for all investors. The high degree of leverage can work against you as well as for you. Before deciding to trade, carefully consider your investment objectives, level of experience, and risk appetite. You could sustain a loss of some or all of your initial investment and should not invest money you cannot afford to lose. Leverage figures and margin requirements are subject to change without notice. Past performance is not indicative of future results. GTCFX does not provide investment advice; this information is for reference only."
                )}
              </p>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

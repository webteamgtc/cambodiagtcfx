"use client";

import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

export default function CopyTradingRiskDisclosureSection() {
  const t = usePathTranslation("copyTradingPage.riskDisclosure");

  return (
    <section className=" py-8 md:py-8">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl">
          <div
            className="rounded-[16px] border border-[#E8EDF7] bg-white p-6 md:p-8"
            style={{ boxShadow: "0 4px 24px 0 rgba(41, 59, 147, 0.06)" }}
          >
            <h2 className="HeadingH5 font-semibold text-[#000032]">
              {t("title", "Provider and Risk Disclosure")}
            </h2>
            <p className="TextSmall mt-4 font-normal leading-[1.75] text-[#69729F]">
              {t(
                "text",
                "The copy trading system is provided by GTC Global Trading Ltd, which acts as the system operator and not as a provider of trading signals or strategies. GTC Global Trading Ltd does not create, endorse, recommend or guarantee any signal, strategy or the performance of any strategy provider made available through the system. Copy trading involves significant risk, does not guarantee profits and may not be suitable for all investors. Before using this service, you should carefully consider your financial circumstances, investment objectives, trading experience and risk tolerance, and seek independent professional advice where appropriate. Past performance is not a reliable indicator of future results. Any decision to follow a strategy provider remains your own."
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import FadeInSection from "@/app/[locale]/company/contact-us/components/FadeInSection";
import { useSymbolDetail } from "../../hooks/useSymbolDetail";
import SymbolDetailHero from "./SymbolDetailHero";
import SymbolTradePanel from "./SymbolTradePanel";
import SymbolDetailChart from "./SymbolDetailChart";
import { SymbolAboutSection, SymbolSpecsSection } from "./SymbolSpecsAbout";
import GtcGoMultiDeviceSection from "@/app/[locale]/trading/gtc-go-app/components/GtcGoMultiDeviceSection";
import { gtcGoData } from "@/app/[locale]/trading/gtc-go-app/gtcGoData";
import WhyGtcGroupGetStartedSection from "@/app/[locale]/company/why-gtc-group/components/WhyGtcGroupGetStartedSection";

export default function SymbolDetailPage({ category, slug }) {
  const detail = useSymbolDetail(category, slug);

  if (detail.loading) {
    return (
      <div className="min-h-[60vh] flex  bg-[#F5F7FB] px-4 py-16 md:px-6">
        <div className="mx-auto flex max-w-6xl items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-2 border-[#293B93] border-t-transparent" />
        </div>
      </div>
    );
  }

  if (detail.error && !detail.info) {
    return (
      <div className="min-h-[50vh] bg-[#F5F7FB] px-4 py-16 md:px-6">
        <div className="mx-auto max-w-3xl rounded-2xl border border-[#E6EAF5] bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-[#0B0F2A]">Symbol not found</h1>
          <p className="mt-2 text-[#6B7390]">
            We couldn&apos;t load details for{" "}
            <span className="font-semibold text-[#293B93]">{detail.rawSymbol}</span>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative pt-16 md:pt-20">
      <div className="pointer-events-none  absolute inset-0 -z-10" aria-hidden
        style={{
          opacity: 0.7,
          background: "linear-gradient(180deg, #F8FAFF 0%, #E7EEFE 100%)",
        }}
      >

      </div>
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <FadeInSection>
          <SymbolDetailHero
            categoryLabel={detail.categoryConfig.label}
            displaySymbol={detail.displaySymbol}
            subtitle={detail.subtitle}
            midPrice={detail.midPrice}
            changeAbs={detail.changeAbs}
            changePct={detail.changePct}
            changePositive={detail.changePositive}
            digits={detail.digits}
          />
        </FadeInSection>

        <FadeInSection>
          <div className="overflow-hidden bg-white p-4 md:p-5 lg:p-6"
            style={{
              borderRadius: "20px",
              border: "1px solid #E1E7F6",
              background: "#FFF",
            }}
          >
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[340px_minmax(0,1fr)] xl:grid-cols-[380px_minmax(0,1fr)]">
              <SymbolTradePanel
                sellPrice={detail.sellPrice}
                buyPrice={detail.buyPrice}
                spread={detail.spread}
                dayHigh={detail.dayHigh}
                dayLow={detail.dayLow}
                swapLong={detail.swapLong}
                swapShort={detail.swapShort}
              />
              <SymbolDetailChart
                rawSymbol={detail.rawSymbol}
                displaySymbol={detail.displaySymbol}
                currentPrice={detail.midNum}
              />
            </div>
          </div>
        </FadeInSection>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:mt-12 lg:grid-cols-2 lg:gap-8">
          <FadeInSection>
            <SymbolSpecsSection specs={detail.specs} />
          </FadeInSection>
          <FadeInSection>
            <SymbolAboutSection
              title={detail.about.title}
              body={detail.about.body}
              tags={detail.about.tags}
            />
          </FadeInSection>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-1 bg-white gap-6 lg:mt-12">
        <FadeInSection>
          <GtcGoMultiDeviceSection data={gtcGoData}
            page="symbolDetail"
          />
        </FadeInSection>
      </div>
      <div className="grid grid-cols-1 gap-6">
        <FadeInSection>
          <WhyGtcGroupGetStartedSection />
        </FadeInSection>
      </div>
    </div>
  );
}

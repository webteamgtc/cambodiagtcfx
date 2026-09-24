import Image from "next/image";
import Button from "@/app/[locale]/components/common/Button";
import FadeInSection from "@/app/[locale]/company/contact-us/components/FadeInSection";

const STATS = [
  { valueKey: "stat1Value", labelKey: "stat1Label", value: "Tier 1", label: "Bank Liquidity" },
  { valueKey: "stat2Value", labelKey: "stat2Label", value: "<1ms", label: "Execution Latency" },
  { valueKey: "stat3Value", labelKey: "stat3Label", value: "10", label: "Levels of Depth" },
  { valueKey: "stat4Value", labelKey: "stat4Label", value: "24/5", label: "Market Coverage" },
];

export default function LiquditySection({ copy }) {
  const banner = copy?.banner || {};
  const eyebrow = banner.eyebrow || "Liquidity Technology";
  const title = banner.title || "Liquidity | Connectivity | Risk Solutions";
  const subTitle =
    banner.subTitle ||
    "Direct access to 7+ trading markets including Forex, Metals, Indices, Shares, Crypto & more, delivered through a proprietary technology stack engineered for speed, depth and reliability.";
  const primaryCta = banner.primaryCta || banner.liveAccount || "Request Liquidity Access";
  const secondaryCta = banner.secondaryCta || "View API Docs";
  const primaryHref = banner.primaryHref || "/contact-us";
  const secondaryHref = banner.secondaryHref || "/knowledge-to-learn/platform-guide";

  return (
    <section className="relative overflow-hidden ">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          backgroundImage: "url(/new-design/learn/gradient.webp)",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          opacity: 0.7,
        }}
      />
<div className="container min-w-0 max-w-full">
      <div className=" relative max-w-6xl mx-auto z-10 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="max-w-xl">
            <FadeInSection>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#E5E8F2] bg-[#F2F4F9] px-3.5 py-2 text-[11px] font-medium uppercase text-[#293B93]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" aria-hidden />
                {eyebrow}
              </span>

              <h1 className="mt-5 max-w-md HeadingH1 leading-[1.5] font-semibold text-[#000]">
                {title}
              </h1>

              <p className="mt-4 max-w-lg Text leading-[1.6] text-[#4E4E4E]">
                {subTitle}
              </p>
            </FadeInSection>
            <FadeInSection delay={0.2}>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Button
                  href={primaryHref}
                  variant="primary"
                  size="md"
                  showArrow
                  className="!min-w-0 sm:!min-w-[230px]"
                >
                  {primaryCta.trim()}
                </Button>
                <Button
                  href={secondaryHref}
                  variant="secondary"
                  size="md"
                  showArrow
                  arrowClassName="!bg-[#293B93] !text-white"
                  className="!min-w-0 sm:!min-w-[180px]"
                >
                  {secondaryCta}
                </Button>
              </div>
            </FadeInSection>
          </div>
        <FadeInSection delay={0.3}>
          <div className="relative flex justify-center lg:justify-end">
            <Image
              src="/new-design/learn/banner.svg"
              alt={title}
              width={520}
              height={420}
              className="h-auto w-full max-w-[520px] object-contain"
              priority
            />
          </div>
        </FadeInSection>
        </div>

        <FadeInSection delay={0.5}>
        <div className="mt-8 border-t border-dashed border-[#C9D3EE] pt-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-4">
            {STATS.map((stat) => (
              <div key={stat.valueKey} className="text-center md:text-start">
                <p className="HeadingH3 font-semibold text-[#293B93] ">
                  {banner[stat.valueKey] || stat.value}
                </p>
                <p className=" TextSmall leading-[1.3] text-[#182451]">
                  {banner[stat.labelKey] || stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
        </FadeInSection>
      </div>
      </div>
    </section>
  );
}

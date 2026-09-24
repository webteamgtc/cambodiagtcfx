"use client";

import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(225, 231, 246, 0.55) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(225, 231, 246, 0.55) 1px, transparent 1px)
          `,
          backgroundSize: "28px 28px",
        }}
      />

      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(225,231,246,0.35) 0%, transparent 32%, transparent 68%, rgba(225,231,246,0.25) 100%)",
        }}
      />

      <div className="absolute -right-16 top-0 h-full w-[58%] bg-[radial-gradient(ellipse_at_center,rgba(79,107,255,0.14),transparent_68%)] md:-right-24 md:w-[52%]" />

      <span
        className="absolute left-[10%] top-[18%] h-24 w-24 opacity-35 md:h-28 md:w-28"
        style={{
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          border: "1px solid rgba(225, 231, 246, 0.9)",
        }}
      />
      <span
        className="absolute right-[14%] top-[62%] h-16 w-16 opacity-25 md:h-20 md:w-20"
        style={{
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          border: "1px solid rgba(225, 231, 246, 0.85)",
        }}
      />
      <span className="absolute left-[22%] bottom-[12%] h-px w-32 rotate-[28deg] bg-[#E1E7F6]/80" />
      <span className="absolute right-[24%] top-[28%] h-px w-24 -rotate-[18deg] bg-[#E1E7F6]/70" />
    </div>
  );
}

export default function AccountOptionsHeroSection() {
  const t = usePathTranslation("accountOptionsPage.hero");

  return (
    <section className="relative overflow-hidden bg-white py-14 md:py-20"
    style={{ backgroundImage: "url('/breadcamp/leverage.webp')" }}

    >
      {/* <HeroBackground /> */}

      <div className="container relative z-10 min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E1E7F6] px-4 py-2 text-xs font-semibold uppercase text-[#293B93] md:px-5 md:text-[11px]">
            <span aria-hidden>•</span>
            {t("eyebrow", "GTCFX TRADING ACCOUNTS")}
          </span>

          <h1 className="HeadingH1 mx-auto mt-7 max-w-3xl font-semibold leading-[1.15] text-[#000032] md:mt-8">
            <span className="block">
              {t("titleLine1Before", "Choose Your")}{" "}
              <span className="text-[#293B93]">{t("titleLine1Highlight", "Perfect")}</span>
            </span>
            <span className="mt-1 block md:mt-2">
              <span className="text-[#293B93]">{t("titleLine2Highlight", "Trading")}</span>
              {t("titleLine2After", " Account")}
            </span>
          </h1>

          <p className="Text mx-auto mt-6 max-w-3xl font-normal leading-[1.55] text-[#000032] md:mt-7">
            {t(
              "subtitle",
              "From beginner-friendly Standard accounts to professional-grade ECN and managed solutions — GTCFX empowers every trader with the right tools and conditions."
            )}
          </p>
        </div>
      </div>
    </section>
  );
}

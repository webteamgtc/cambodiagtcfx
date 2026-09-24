"use client";

import Image from "next/image";
import MobilePeekCarousel from "@/app/[locale]/components/common/MobilePeekCarousel";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

const floatingBadges = [
  {
    key: "deposits",
    className: "left-0 top-[18%] -rotate-6 xl:-left-8",
    icon: "/new-design/tab1.svg",
  },
  {
    key: "openAccount",
    className: "left-4 top-[42%] -rotate-3 xl:-left-12",
    icon: "/new-design/tab2.svg",
  },
  {
    key: "mt5Setup",
    className: "right-2 top-[18%] rotate-3 xl:-right-8",
    icon: "/new-design/tab3.svg",
  },
  {
    key: "security",
    className: "right-4 top-[44%] rotate-6 xl:-right-12",
    icon: "/new-design/tab8.svg",
  },
];

const popularTopics = ["deposit", "openAccount", "mt5", "verification"];

const stats = [
  { value: "450+", key: "helpArticles" },
  { value: "98%", key: "resolutionRate" },
  { value: "< 2 min", key: "chatWait" },
  { value: "24/7", key: "liveSupport" },
];

function StatItem({ value, label }) {
  return (
    <>
      <div className="HeadingH3 text-[#3347a8]">{value}</div>
      <div className="TextSmall mt-3 font-medium text-[#6b7280]">
        {label}
      </div>
    </>
  );
}

function FloatingBadge({ icon, label, className }) {
  return (
    <div
      className={`absolute z-10 hidden items-center gap-2.5 rounded-2xl border border-[#e1e7f6] bg-white px-3.5 py-2.5  md:flex ${className}`}
      style={{
        boxShadow: "0px 0px 25px 0px #293B931A"
      }}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eef2ff] text-[#3347a8]">
        <Image src={icon} alt={label} width={20} height={20} />
      </span>
      <span className="TextSmall font-semibold text-primary">{label}</span>
    </div>
  );
}

export default function FaqHeroSection() {
  const t = usePathTranslation("faqsPage.hero");

  return (
    <section className="relative overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #eef1f6 1px, transparent 1px), linear-gradient(to bottom, #eef1f6 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
        aria-hidden
      />

      <div className="relative container py-8 md:py-10 lg:py-12">
        <div className="relative mx-auto max-w-5xl px-2 pb-6 md:pb-10">
          {floatingBadges.map((badge) => (
            <FloatingBadge
              key={badge.key}
              icon={badge.icon}
              label={t(`floatingBadges.${badge.key}`)}
              className={badge.className}
            />
          ))}

          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#e7ebfb] px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#293B93]" />
              <span className="TextSmall font-semibold tracking-[0.08em] text-[#293B93]">
                {t("badge", "GTCFX Help Center · 24/7 Support")}
              </span>
            </div>

            <h1 className="HeadingH1 mt-6 !text-black">
              {t("titleStart", "Hello, how can we")}
              <br />
              <span className="text-[#293B93]">{t("titleHighlight", "help you")}</span> {t("titleEnd", "today?")}
            </h1>

            <p className="Text mx-auto mt-5 max-w-2xl text-center">
              {t(
                "description",
                "Browse guides on accounts, deposits, platforms and trading conditions — answers in seconds, not hours."
              )}
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 text-center md:flex-row md:gap-2 md:text-left">
              <span className="TextSmall font-semibold text-primary">
                {t("popularLabel", "Popular:")}
              </span>
              <ul className="flex flex-wrap items-center justify-center gap-2">
                {popularTopics.map((topic) => (
                  <li key={topic} className="list-none">
                    <span className="inline-flex rounded-full border border-[#e3e8f3] bg-white px-3 py-1.5 TextSmall font-medium text-[#3347a8]">
                      {t(`popularTopics.${topic}`)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-5xl md:mt-16">
            <div className="md:hidden">
              <MobilePeekCarousel
                items={stats}
                showArrows={true}
                trackClassName="-mx-4 px-4"
                slideClassName="px-0"
                renderItem={(item) => (
                  <div className="flex min-h-[118px] flex-col items-center justify-center rounded-[26px] border border-[#e5eaf4] bg-white px-6 mx-1 py-7 text-center">
                    <StatItem value={item.value} label={t(`stats.${item.key}`)} />
                  </div>
                )}
              />
            </div>

            <div className="hidden overflow-hidden rounded-[26px] border border-[#e5eaf4] bg-white shadow-[0_20px_55px_rgba(15,23,42,0.08)] md:grid md:grid-cols-4">
              {stats.map((item, index) => (
                <div
                  key={item.key}
                  className={`flex min-h-[118px] flex-col items-center justify-center px-6 py-7 text-center ${
                    index < stats.length - 1
                      ? "border-b border-[#eef2f7] md:border-b-0 md:border-r"
                      : ""
                  }`}
                >
                  <StatItem value={item.value} label={t(`stats.${item.key}`)} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

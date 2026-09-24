"use client";

import Image from "next/image";
import Link from "next/link";
import MegaMenuHubTabs from "@/app/[locale]/components/common/MegaMenuHubTabs";
import MobilePeekCarousel from "@/app/[locale]/components/common/MobilePeekCarousel";
import { usePathTranslation } from "../../LocaleProvider";
import { localizedHref } from "@/i18n/localizedHref";

const REGISTER_HREF =
  "/live-account-application";

const QUICK_LINKS = [
  { key: "forex", href: "/markets/forex", icon: "/new-design/tab1.svg" },
  { key: "energy", href: "/markets/energy", icon: "/new-design/tab2.svg" },
  { key: "indices", href: "/markets/indices", icon: "/new-design/tab3.svg" },
  { key: "metals", href: "/markets/metals", icon: "/new-design/tab4.svg" },
  { key: "commodities", href: "/markets/commodities", icon: "/new-design/tab5.svg" },
  { key: "marketNews", href: "/trading/market-news", icon: "/new-design/tab6.svg" },
  { key: "marketNewsFeed", href: "/trading/market-news", icon: "/new-design/tab7.svg" },
  { key: "economicCalendar", href: "/markets/economic-calendar", icon: "/new-design/tab8.svg" },
  { key: "marketHolidays", href: "/markets/market-holidays", icon: "/new-design/tab1.svg" },
  { key: "popularFx", href: "/markets/forex", icon: "/new-design/tab2.svg" },
  { key: "popularIndices", href: "/markets/indices", icon: "/new-design/tab3.svg" },
  { key: "popularCommodities", href: "/markets/commodities", icon: "/new-design/tab4.svg" },
];

const QUICK_LINK_FALLBACKS = {
  forex: "Forex",
  energy: "Energy",
  indices: "Indices",
  metals: "Metals",
  commodities: "Commodities",
  marketNews: "Market News",
  marketNewsFeed: "Market News",
  economicCalendar: "Economic Calendar",
  marketHolidays: "Market Holidays",
  popularFx: "Popular FX Markets",
  popularIndices: "Popular Indices",
  popularCommodities: "Popular Commodities",
};

function QuickLinkCard({ item, label, locale }) {
  const className =
    "flex h-full min-h-[88px] w-full flex-col items-center justify-center gap-2 rounded-xl border border-[#e8ecf2] bg-white px-2 py-3 text-center shadow-[0_2px_16px_rgba(41,59,147,0.06)] transition hover:border-[#cfd8ea] hover:no-underline sm:min-h-[96px] sm:rounded-2xl sm:gap-2.5 sm:py-4";

  const content = (
    <>
      <span className="flex h-9 w-9 items-center justify-center rounded-lg text-[#293B93] sm:h-10 sm:w-10">
        <Image src={item.icon} alt={label} width={22} height={22} />
      </span>
      <span className="TextSmall px-1 font-semibold leading-snug text-[#293B93]">
        {label}
      </span>
    </>
  );

  return (
    <Link href={localizedHref(locale, item.href)} className={className}>
      {content}
    </Link>
  );
}

const HERO_SPHERES = [
  {
    src: "/new-design/Markets/icon1.svg",
    width: 88,
    height: 80,
    positionClass:
      "relative mr-[-32px] z-[1] h-[68px] w-[74px] sm:h-[76px] sm:w-[84px]",
  },
  {
    src: "/new-design/Markets/icon2.svg",
    width: 104,
    height: 96,
    positionClass:
      "relative mr-[-32px] z-[2] h-[84px] w-[92px] sm:h-[92px] sm:w-[100px]",
  },
  {
    src: "/new-design/Markets/icon3.svg",
    width: 148,
    height: 136,
    positionClass:
      "relative z-[5] h-[118px] w-[128px] sm:h-[132px] sm:w-[144px]",
  },
  {
    src: "/new-design/Markets/icon4.svg",
    width: 104,
    height: 96,
    positionClass:
      "relative ml-[-32px] z-[2] h-[84px] w-[92px] sm:h-[92px] sm:w-[100px]",
  },
  {
    src: "/new-design/Markets/icon5.svg",
    width: 88,
    height: 80,
    positionClass:
      "relative ml-[-32px] z-[1] h-[68px] w-[74px] sm:h-[76px] sm:w-[84px]",
  },
];

function MarketsHeroSpheres() {
  return (
    <div className="relative mx-auto w-full max-w-[520px] px-2 py-4 sm:max-w-[580px] sm:px-4 sm:py-6">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_45%,rgba(214,224,255,0.55),transparent_72%)]"
        aria-hidden
      />
      <div className="relative mx-auto flex items-center justify-center h-[128px] w-full sm:h-[148px]">
        {HERO_SPHERES.map((sphere) => (
          <div
            key={sphere.src}
            className={` ${sphere.positionClass}`}
          >
            <Image
              src={sphere.src}
              alt=""
              aria-hidden
              width={sphere.width}
              height={sphere.height}
              className="h-full w-full object-contain"
              priority
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MarketsHubSection({ locale = "en", links = [] }) {
  const t = usePathTranslation("marketsPage.hubSection");
  const tHome = usePathTranslation("home.homeHero.buttons");

  const liveAccountLabel = tHome("liveAccount", "Open Live Account");

  return (
    <section className="relative w-full overflow-x-hidden bg-white pb-14 md:pb-16">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_45%_at_50%_28%,rgba(232,237,255,0.65),transparent_70%)]"
        aria-hidden
      />

      <div className="relative container min-w-0 max-w-full pt-8 md:pt-10 lg:pt-12">
        {/* <div className="min-w-0 max-w-full">
          <MegaMenuHubTabs links={links} />
        </div> */}

        <div className="mx-auto mt-8 w-full min-w-0 max-w-6xl md:mt-10 lg:mt-12">
          <MarketsHeroSpheres />

          <div className="text-center">
            <h1 className="HeadingH1 !text-[#111827]">
              {t("title", "Trade the World's Top Markets")}
            </h1>
            <p className="Text  mx-auto mt-5 max-w-2xl font-normal leading-[1.65] text-[#666666] md:mt-6">
              {t(
                "description",
                "Access Forex, Energy, Commodities, Indices, and Metals with ultra competitive spreads, up to 1:2000 leverage, and instant execution — no restrictions."
              )}
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
              <Link
                href={REGISTER_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="TextButton inline-flex h-11 w-full min-w-[168px] items-center justify-center rounded-full bg-[#293B93] px-8 uppercase tracking-wide text-white transition hover:bg-[#243575] hover:no-underline sm:w-auto"
              >
                {liveAccountLabel}
              </Link>
            
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import MegaMenuHubTabs from "@/app/[locale]/components/common/MegaMenuHubTabs";
import { usePathTranslation } from "../../LocaleProvider";
import { localizedHref } from "@/i18n/localizedHref";
import LiveAccountApplicationForm from "../../live-account-application/components/LiveAccountApplicationForm";

const REGISTER_HREF =
  "/live-account-application";

/** Replace with your globe/map artwork */
const GLOBE_MAP_SRC = "/new-design/map.svg";

/** Replace with your device cluster image */
const DEVICES_SRC = "/new-design/trading-banner.webp";

const QUICK_LINK_CONFIG = [
  { key: "openTradingAccount", icon: "/new-design/tab1.svg", href: REGISTER_HREF, external: true },
  { key: "freeDemoAccount", icon: "/new-design/tab2.svg", href: "/free-demo-account" },
  { key: "fundingWithdrawals", icon: "/new-design/tab3.svg", href: "/deposit" },
  { key: "accountTypes", icon: "/new-design/tab4.svg", href: "/account-types" },
  { key: "mt4", icon: "/new-design/tab5.svg", href: "/mt4-platform" },
  { key: "mt5", icon: "/new-design/tab6.svg", href: "/mt5-platform" },
  { key: "gtcGo", icon: "/new-design/tab7.svg", href: "/trading/gtc-go-app" },
  { key: "openLiveAccount", icon: "/new-design/tab8.svg", href: REGISTER_HREF, external: true },
  { key: "dynamicLeverage", icon: "/new-design/tab1.svg", href: "/company/dynamic-leverage" },
  { key: "swapUpdate", icon: "/new-design/tab2.svg", href: "/swap-update" },
  { key: "swapFree", icon: "/new-design/tab3.svg", href: "/swap-free-trading" },
  { key: "pamm", icon: "/new-design/tab4.svg", href: "/trading/pamm-account" },
  { key: "mam", icon: "/new-design/tab5.svg", href: "/trading/mam-account" },
  { key: "vps", icon: "/new-design/tab6.svg", href: "/vps-hosting-services" },
];

const QUICK_LINK_FALLBACKS = {
  openTradingAccount: "Open Live Account",
  freeDemoAccount: "Free Demo Account",
  fundingWithdrawals: "Funding & Withdrawals",
  accountTypes: "Account Types",
  mt4: "MT4",
  mt5: "MT5",
  gtcGo: "GTCFX : GTC Go",
  openLiveAccount: "Open Live Account",
  dynamicLeverage: "Dynamic Leverage",
  swapUpdate: "Swap Update",
  swapFree: "Swap-Free Trading at GTCFX",
  pamm: "PAMM Account",
  mam: "MAM Account",
  vps: "VPS",
};

function QuickLinkCard({ item, label }) {
  const className =
    "interactive-card flex h-full min-h-[108px] w-full min-w-[118px] shrink-0 flex-col items-center justify-center gap-2.5 rounded-2xl border border-[#e5eaf4] bg-white px-3 py-4 text-center shadow-[0_4px_24px_rgba(41,59,147,0.08)] hover:no-underline sm:min-w-[132px] md:min-w-0";

  const content = (
    <>
      <span className="flex h-10 w-10 items-center justify-center rounded-xl text-[#3347a8]">
        <Image src={item.icon} alt="" width={22} height={22} />
      </span>
      <span className="TextSmall px-1 font-semibold leading-snug text-[#293B93]">
        {label}
      </span>
    </>
  );

  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={item.href} className={className}>
      {content}
    </Link>
  );
}

function AccountCardPlaceholder({ locale, t }) {
  return (
    <div
      className="flex h-full flex-col rounded-[20px] bg-white"
      aria-label={t("accountCardAria", "Live account application")}
    >
   <Image src="/new-design/Trading/form-img.svg" alt="Live account application" width={400} height={400} className="w-full h-auto" />
    </div>
  );
}

export default function TradingHubSection({ locale = "en", links = [] }) {
  const t = usePathTranslation("tradingPage.hubSection");
  return (
    <section className="relative w-full overflow-x-hidden bg-[#F8FAFF] pb-14 md:pb-16">
      <div className="relative container pt-8 md:pt-10 lg:pt-12">
        {/* <div className="">
          <MegaMenuHubTabs links={links} />
        </div> */}

        <div className="mx-auto relative mt-10 grid w-full min-w-0 max-w-6xl gap-8 lg:mt-14 lg:grid-cols-12 lg:items-stretch lg:gap-10 xl:gap-14">
          <div
            className="pointer-events-none absolute  w-full h-full top-0 z-0 opacity-80"
            aria-hidden
          >
            <Image
              src={GLOBE_MAP_SRC}
              alt=""
              fill
              className="object-contain object-left-top"
              sizes="(max-width: 1024px) 100vw, 520px"
            />
          </div>
          <div className="relative flex min-w-0 flex-col lg:col-span-5 lg:min-h-[480px]">


            <div className="relative z-[1] flex flex-1 flex-col text-center md:text-left">
              <h1 className="HeadingH1 text-[#111827]">
                {t("title", "Trade with GTCFX")}
              </h1>
              <h2 className="HeadingH2 mt-6 font-bold text-[#293B93]">
                {t("subtitle", "Open Live Account")}
              </h2>

              <div className="relative flex flex-1 items-center justify-center md:mt-8">
                <div className="relative aspect-[5/4] w-full max-w-[320px] lg:max-w-full">
                  <Image
                    src={DEVICES_SRC}
                    alt={t(
                      "devicesAlt",
                      "GTCFX trading platforms on mobile, tablet, and laptop"
                    )}
                    fill
                    className="object-contain object-center"
                    sizes="(max-width: 1024px) 92vw, 520px"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-[1] min-w-0 lg:col-span-7">
           <LiveAccountApplicationForm />   
          </div>
        </div>
      </div>
    </section>
  );
}

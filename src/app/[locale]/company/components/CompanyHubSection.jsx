"use client";

import Image from "next/image";
import Button from "@/app/[locale]/components/common/Button";
import MobilePeekCarousel from "@/app/[locale]/components/common/MobilePeekCarousel";
import { usePathTranslation } from "../../LocaleProvider";
import { localizedHref } from "@/i18n/localizedHref";
import MegaMenuHubTabs from "../../components/common/MegaMenuHubTabs";

const REGISTER_HREF =
  "/live-account-application";

const PARTNERS_URL = "https://reg.gtcfx.com/uae/partners-campaign";
const AFFILIATE_URL = "https://www.gtcaffiliates.com/";
const GTC_PRIME_URL = "https://gtcprime.com/";

/** Replace with final skyline artwork */
const SKYLINE_BG = "/new-design/company/company-bg-new.webp";

 

function ClientsIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="50" height="42" viewBox="0 0 50 42" fill="none">
      <path d="M25.8414 20.4653C29.2169 18.6095 31.5121 15.022 31.5121 10.9021C31.5121 4.89016 26.6219 0 20.61 0C14.5981 0 9.70795 4.89016 9.70795 10.9021C9.70795 15.0168 12.0031 18.6095 15.3787 20.4653C6.53917 22.7863 0 30.8504 0 40.4085V41.432H41.2304V40.4085C41.2252 30.8504 34.686 22.7863 25.8414 20.4653ZM22.3469 33.6884L20.4394 35.1978L18.5423 33.6987L20.5376 25.1849L22.3469 33.6884ZM11.755 10.9072C11.755 6.02224 15.7302 2.05221 20.61 2.05221C25.4898 2.05221 29.465 6.02741 29.465 10.9072C29.465 15.6216 25.7638 19.4831 21.1166 19.7467L20.5997 19.7416L20.2947 19.7571C15.5596 19.5917 11.755 15.6837 11.755 10.9072ZM2.06772 39.3901C2.57431 30.0854 9.96125 22.5795 19.2195 21.892L16.4177 33.8279C16.335 34.1588 16.4125 34.4999 16.6193 34.7636L16.9863 35.1823H17.1259L20.4394 37.8031L23.9184 35.0531C24.0424 34.9859 24.1562 34.8928 24.2492 34.7791L24.5697 34.3397L21.9282 21.892C31.2174 22.5485 38.6405 30.0647 39.1471 39.3953H2.06772V39.3901Z" fill="#293B93" />
      <path d="M38.3407 20.7599C40.6876 19.2402 42.2074 16.5986 42.2074 13.6728C42.2074 9.02561 38.4234 5.24167 33.7762 5.24167L32.6028 5.26235L32.7527 7.30423L33.7762 7.27838C37.2965 7.27838 40.1655 10.1422 40.1655 13.6676C40.1655 16.702 38.0099 19.3384 35.0375 19.9328L34.0347 20.1344L34.4327 22.1401L34.6705 22.0936L34.6654 22.1195L35.6785 22.259C42.0523 23.143 46.9373 28.4415 47.4129 34.7843H43.1895V36.8261H49.4961V35.8026C49.4909 28.824 44.8386 22.7346 38.3407 20.7599Z" fill="#293B93" />
    </svg>
  );
}

function InstrumentsIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="44" height="43" viewBox="0 0 44 43" fill="none">
      <path d="M3.99712 10.1197C3.99712 11.4486 4.25887 12.7645 4.76743 13.9923C5.27599 15.2201 6.0214 16.3357 6.9611 17.2754C7.9008 18.2151 9.01639 18.9605 10.2442 19.469C11.4719 19.9776 12.7879 20.2394 14.1168 20.2394C15.4457 20.2394 16.7617 19.9776 17.9894 19.469C19.2172 18.9605 20.3328 18.2151 21.2725 17.2754C22.2122 16.3357 22.9576 15.2201 23.4662 13.9923C23.9747 12.7645 24.2365 11.4486 24.2365 10.1197C24.2365 8.79075 23.9747 7.47482 23.4662 6.24705C22.9576 5.01927 22.2122 3.90369 21.2725 2.96399C20.3328 2.02429 19.2172 1.27888 17.9894 0.770315C16.7617 0.261753 15.4457 0 14.1168 0C12.7879 0 11.4719 0.261753 10.2442 0.770315C9.01639 1.27888 7.9008 2.02429 6.9611 2.96399C6.0214 3.90369 5.27599 5.01927 4.76743 6.24705C4.25887 7.47482 3.99712 8.79075 3.99712 10.1197Z" fill="#293B93" />
      <path d="M29.4708 27.5357C29.4708 28.4897 29.6587 29.4343 30.0238 30.3157C30.3889 31.1971 30.924 31.998 31.5986 32.6725C32.2731 33.3471 33.074 33.8822 33.9554 34.2473C34.8367 34.6124 35.7814 34.8003 36.7354 34.8003C37.6894 34.8003 38.6341 34.6124 39.5154 34.2473C40.3968 33.8822 41.1977 33.3471 41.8722 32.6725C42.5468 31.998 43.0819 31.1971 43.447 30.3157C43.8121 29.4343 44 28.4897 44 27.5357C44 26.5817 43.8121 25.637 43.447 24.7556C43.0819 23.8743 42.5468 23.0734 41.8722 22.3988C41.1977 21.7243 40.3968 21.1892 39.5154 20.8241C38.6341 20.459 37.6894 20.2711 36.7354 20.2711C35.7814 20.2711 34.8367 20.459 33.9554 20.8241C33.074 21.1892 32.2731 21.7243 31.5986 22.3988C30.924 23.0734 30.3889 23.8743 30.0238 24.7556C29.6587 25.637 29.4708 26.5817 29.4708 27.5357Z" fill="#293B93" />
      <path d="M0 36.4499C-1.72948e-08 37.2706 0.161648 38.0832 0.475712 38.8414C0.789777 39.5997 1.25011 40.2886 1.83042 40.8689C2.41074 41.4492 3.09968 41.9096 3.8579 42.2236C4.61611 42.5377 5.42877 42.6993 6.24946 42.6993C7.07015 42.6993 7.8828 42.5377 8.64102 42.2236C9.39924 41.9096 10.0882 41.4492 10.6685 40.8689C11.2488 40.2886 11.7091 39.5997 12.0232 38.8414C12.3373 38.0832 12.4989 37.2706 12.4989 36.4499C12.4989 34.7924 11.8405 33.2029 10.6685 32.0309C9.49649 30.8589 7.90692 30.2004 6.24946 30.2004C4.592 30.2004 3.00243 30.8589 1.83042 32.0309C0.658424 33.2029 0 34.7924 0 36.4499Z" fill="#293B93" />
      <path d="M13.5141 34.4196L28.075 29.9466L28.7094 32.0086L14.1485 36.4816L13.5141 34.4196ZM6.45027 28.6527L8.46088 21.2437L10.5426 21.8084L8.53226 29.2176L6.45027 28.6527ZM23.3197 18.0435L24.5214 16.2521L30.8971 20.5287L29.6951 22.3204L23.3197 18.0435Z" fill="#293B93" />
    </svg>
  );
}

function HubStatItem({ icon: Icon, label, value }) {
  return (
    <div className="flex min-w-0 flex-col items-center text-center">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center text-[#293B93]">
        <Icon className="h-[34px] w-[34px]" />
      </span>
      <p className="mt-4 HeadingH4 font-bold text-[#000] md:mt-6">{value}</p>
      <p className="TextSmall mt-1 text-[#333333]">{label}</p>
    </div>
  );
}

export default function CompanyHubSection({ locale = "en", links = [] }) {
  const t = usePathTranslation("companyPage.hubSection");
  const tStats = usePathTranslation("common.counter.stats");
  const tHome = usePathTranslation("home.homeHero.buttons");

  const hubLinks = links;

  const description = t(
    "description",
    "GTCFX is a global leader in financial derivatives, established in 2012. The GTCFX brand encompasses multiple companies that provide a diverse range of online trading products, serving over 985,000 clients worldwide. GTCFX is recognized for its commitment to delivering top-tier financial services, with a strong emphasis on excellence and innovation."
  );

  const stats = [
    {
      key: "clients",
      icon: ClientsIcon,
      label: tStats("servedClients.label", "Served Clients"),
      value: `985,000${tStats("servedClients.suffix", " +").trim()}`,
    },
    {
      key: "instruments",
      icon: InstrumentsIcon,
      label: tStats("tradingInstruments.label", "Trading Markets"),
      value: `7${tStats("tradingInstruments.suffix", " +").trim()}`,
    },
    {
      key: "trades",
      icon: ClientsIcon,
      label: tStats("monthlyTrades.label", "Monthly Volume"),
      value: `${tStats("monthlyTrades.prefix", "$")}${tStats("monthlyTrades.value", "850")}${tStats("monthlyTrades.suffix", " Billion").trim()}`,
    },
    {
      key: "regulatory",
      icon: InstrumentsIcon,
      label: tStats("destinationsWorldwide.label", "Regulatory Standards"),
      value: `20${tStats("destinationsWorldwide.suffix", "").trim()}`,
    },
  ];

  return (
    <section className="relative w-full bg-[url('/about-us-banner.jpeg')] bg-opacity-40 bg-cover bg-center  pb-14 md:pb-16 lg:pb-20">

      <div className="container relative z-10 min-w-0 max-w-full pt-8 md:pt-10 lg:pt-12">
        {/* <MegaMenuHubTabs links={hubLinks} /> */}

        <div className="relative mx-auto mt-10 w-full min-w-0 max-w-4xl text-center lg:mt-14">
          <h1 className="HeadingH1 font-bold text-[#000]">
            {t("title", "About GTCFX")}
          </h1>

          <p className="Text mx-auto mt-6 max-w-5xl font-normal leading-[1.7] text-[#666666] md:mt-7">
            {description}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:mt-8 sm:gap-4">
            <Button href={REGISTER_HREF} external variant="brand" size="md" showArrow arrowPosition="right">
              {tHome("liveAccount", "Create live account")}
            </Button>
            
          </div>
        </div>

        <div className="relative z-10 mx-auto mt-12 w-full min-w-0 max-w-6xl lg:mt-16">
          <div className="w-full min-w-0 md:hidden">
            <MobilePeekCarousel
              items={stats}
              showArrows
              className="w-full min-w-0"
              trackClassName="min-w-0"
              slideClassName="!h-auto"
              renderItem={(item) => (
                <div className="w-full min-w-0 max-w-full px-1">
                  <HubStatItem
                    icon={item.icon}
                    label={item.label}
                    value={item.value}
                  />
                </div>
              )}
            />
          </div>

          <div className="hidden gap-x-6 gap-y-10 md:grid md:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
            {stats.map((item) => (
              <HubStatItem
                key={item.key}
                icon={item.icon}
                label={item.label}
                value={item.value}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

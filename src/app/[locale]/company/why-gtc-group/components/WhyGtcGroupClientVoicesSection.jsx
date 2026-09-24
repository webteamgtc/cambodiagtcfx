"use client";

import MobilePeekCarousel from "@/app/[locale]/components/common/MobilePeekCarousel";
import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import Button from "@/app/[locale]/components/common/Button";
import { usePathTranslation } from "../../../LocaleProvider";

const REVIEW_LINKS = [
  {
    key: "google",
    labelKey: "links.google",
    hrefKey: "links.googleHref",
    defaultLabel: "View Google reviews",
    defaultHref:
      "https://www.google.com/search?kgmid=/g/11pxr17glc&q=GTCFX+%7C+%231+Global+STP+Broker.",
  },
  {
    key: "myfxbook",
    labelKey: "links.myfxbook",
    hrefKey: "links.myfxbookHref",
    defaultLabel: "Myfxbook verified reviews",
    defaultHref: "https://www.myfxbook.com/reviews/brokers/gtcfx/3001022,1",
  },
  {
    key: "wikifx",
    labelKey: "links.wikifx",
    hrefKey: "links.wikifxHref",
    defaultLabel: "View on WikiFX",
    defaultHref: "https://www.wikifx.com/en/dealer/8791637328.html",
  },
  {
    key: "investing",
    labelKey: "links.investing",
    hrefKey: "links.investingHref",
    defaultLabel: "View on Investing.com",
    defaultHref: "https://www.investing.com/brokers/reviews/gtcfx/",
  },
];

const STAR_PATH =
  "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z";

const TESTIMONIALS = [
  {
    key: "khalid",
    quote:
      "The dual regulation gave me the confidence to move a larger portion of my portfolio here. Withdrawal processed within hours — no drama, no delays.",
    name: "Khalid A.",
    role: "UAE Retail Trader",
    initial: "k",
    quoteKey: "cards.khalid.quote",
    nameKey: "cards.khalid.name",
    roleKey: "cards.khalid.role",
  },
  {
    key: "michelle",
    quote:
      "Execution quality on index CFDs is genuinely different here. We've tested several prime brokers and GTC Group's latency data checks out in our own benchmarks.",
    name: "Michelle L.",
    role: "Asia-Pacific Institutional Client",
    initial: "m",
    quoteKey: "cards.michelle.quote",
    nameKey: "cards.michelle.name",
    roleKey: "cards.michelle.role",
  },
  {
    key: "rania",
    quote:
      "Support in Khmer and English and the 24/5 coverage makes a real difference. They understand the local market and it shows in how they handle client communication.",
    name: "Rania A.",
    role: "Cairo, Forex Trader",
    initial: "r",
    quoteKey: "cards.rania.quote",
    nameKey: "cards.rania.name",
    roleKey: "cards.rania.role",
  },
];

function StarRating() {
  return (
    <span className="inline-flex items-center gap-1" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="shrink-0 h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="22" height="21" viewBox="0 0 22 21" fill="none">
          <path d="M10.9375 0L14.5876 6.476L21.8746 7.9463L16.8436 13.419L17.697 20.8037L10.9375 17.71L4.17797 20.8037L5.03144 13.419L0.000349998 7.9463L7.28735 6.476L10.9375 0Z" fill="#FFBD2E" />
        </svg>
      ))}
    </span>
  );
}

function QuoteMark({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="40" height="29" viewBox="0 0 40 29" fill="none">
      <path d="M40 0C39.2836 2.99864 38.5274 6.23401 37.7313 9.70612C36.9353 13.1782 36.2189 16.5714 35.5821 19.8857C34.9453 23.2 34.4279 26.2381 34.0299 29H22.6866L21.8507 27.698C22.5672 24.936 23.4826 21.9769 24.597 18.8204C25.7114 15.585 26.9453 12.3497 28.2985 9.11429C29.6517 5.87891 30.9652 2.84082 32.2388 0H40ZM17.9104 0C17.194 2.99864 16.4378 6.23401 15.6418 9.70612C14.8458 13.1782 14.1294 16.5714 13.4925 19.8857C12.8557 23.2 12.3383 26.2381 11.9403 29H0.716418L0 27.698C0.716418 24.936 1.63184 21.9769 2.74627 18.8204C3.8607 15.585 5.05473 12.3497 6.32836 9.11429C7.68159 5.87891 8.99502 2.84082 10.2687 0H17.9104Z" fill="#E1E7F6" />
    </svg>
  );
}

function TestimonialCard({ item, t }) {
  return (
    <article className="flex h-full min-w-0 flex-col p-6 text-left sm:p-7"
      style={{
        borderRadius: "19.03px",
        border: "0.865px solid #E1E7F6",
        background: "#FFF",
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <StarRating />
        <QuoteMark className="shrink-0 h-7 w-7" />
      </div>

      <p className="TextSmall mt-5 flex-1 font-normal leading-[1.7] text-[#000]">
        {t(item.quoteKey, item.quote)}
      </p>

      <div className="mt-6 border-t border-[#E1E7F6] pt-5">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 uppercase items-center justify-center text-sm font-semibold text-white"
          style={{
            borderRadius: "9998px",
            border: "1px solid #E1E7F6",
            background: "linear-gradient(138deg, #4B5FC1 12.98%, #293B93 64.07%)",
          }}
          >
            {item.initial}
          </span>
          <div className="min-w-0">
            <p className="TextSmall font-bold text-[#000]">
              {t(item.nameKey, item.name)}
            </p>
            <p className="TextSmall mt-0.5 font-normal text-[#666666]">
              {t(item.roleKey, item.role)}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function WhyGtcGroupClientVoicesSection() {
  const t = usePathTranslation("whyGtcGroupPage.clientVoicesSection");

  return (
    <section className=" py-2 md:py-6 md:pb-14">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl text-center">
          <SectionEyebrow variant="compact">
            {t("eyebrow", "Client Voices")}
          </SectionEyebrow>

          <h2 className="HeadingH1 mx-auto mt-4">
            {t("title", "Verified client experiences")}
          </h2>

          <p className="Text mx-auto mt-5 max-w-3xl font-normal leading-[1.7] text-[#000032]/60 md:mt-6">
            {t(
              "description",
              "Real feedback from traders across regions. We let the words speak — no editing, no filtering."
            )}
          </p>

          <div className="mt-8 text-left sm:hidden md:mt-12">
            <MobilePeekCarousel
              items={TESTIMONIALS}
              showArrows
              className="w-full min-w-0"
              trackClassName="-mx-4 px-4 min-w-0"
              slideClassName="!h-auto"
              renderItem={(item) => (
                <div className="w-full min-w-0 max-w-full px-1">
                  <TestimonialCard item={item} t={t} />
                </div>
              )}
            />
          </div>

          <div className="mt-8 hidden grid-cols-1 gap-5 text-left sm:grid sm:grid-cols-2 sm:gap-6 md:mt-12 lg:grid-cols-3">
            {TESTIMONIALS.map((item) => (
              <TestimonialCard key={item.key} item={item} t={t} />
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 md:mt-12 md:gap-5">
            {REVIEW_LINKS.map((link) => (
              <Button
                key={link.key}
                href={t(link.hrefKey, link.defaultHref)}
                external
                variant="brand"
                size="md"
                showArrow
                className="!w-auto sm:!w-auto"
              >
                {t(link.labelKey, link.defaultLabel)}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import clsx from "clsx";
import Image from "next/image";
import { useLocale, useLocaleMessages, usePathTranslation } from "../../LocaleProvider";
import { localeDir } from "@/i18n/config";


const ALL_REVIEWS = [
  {
    id: "1",
    source: "Google",
    date: "2025-11-27",
    name: "William Jones",
    rating: 5,
    text: "Just wanted to share how impressed I am with GTCFX. The platform is incredibly slick—super quick, totally dependable, and a breeze to use, which makes trading really smooth. Their support team is top-notch; always responsive and really helpful. And when it comes to money, deposits and withdrawals are always processed quickly and without a hitch. Big thumbs up from me!",
  },
  {
    id: "2",
    source: "Trustpilot",
    date: "2026-01-27",
    name: "Aidan Baynes",
    rating: 5,
    text: "GTCFX has been very reliable for me. The platform runs smoothly, execution is fast, and overall performance feels stable.",
  },
  {
    id: "3",
    source: "Google",
    date: "2026-01-19",
    name: "jijeesh gopakumar",
    rating: 5,
    text: "GTC FX is a reliable and smooth trading platform. Fast execution, tight spreads, and quick withdrawals. Support team is helpful and professional. Truly a trusted broker — highly recommended!",
  },
  {
    id: "4",
    source: "Trustpilot",
    date: "2025-12-16",
    name: "Lonnie Allen",
    rating: 5,
    text: "I’ve been on GTCFX for a while and honestly enjoy the experience. The interface is clean, things load quickly, and executing trades is stress-free. Support answers fast whenever I reach out. Everything feels solid and consistent",
  },
  {
    id: "5",
    source: "Google",
    date: "2025-08-03",
    name: "Kulbir Singh",
    rating: 5,
    text: "GTC FX offers a user-friendly platform with quick trade execution and responsive support. Overall a solid and trustworthy trading experience",
  },
  {
    id: "8",
    source: "Trustpilot",
    date: "2026-01-26",
    name: "Michael Gallager",
    rating: 4.5,
    text: "The platform is clean and easy to navigate. I’ve had smooth execution and steady performance since I started. Spreads are low, and everything works the way I expect. Still using it happily.",
  },
  {
    id: "6",
    source: "Google",
    date: "2025-08-12",
    name: "Layla",
    rating: 4,
    text: "I usually check the spreads early in the morning before work, and GTCFX has been consistent so far — no sudden surprises like I had with my old broker.",
  },
  {
    id: "7",
    source: "Trustpilot",
    date: "2023-05-22",
    name: "Naveed Mushtaq",
    rating: 5,
    text: "Good Execution and Deposit/Withdrawal Have been trading with GTC for one month Experience has been pleasant The online portal is easy to use, the trade execution has minimum slippage Swap free account was requested and approved immediately",
  },
  {
    id: "9",
    source: "Google",
    date: "2025-02-18",
    name: "Mizam Yahya",
    rating: 5,
    text: "The support team at GTCFX is incredibly responsive. I had a small issue with my deposit, and their team was quick to help me resolve it. The agents are always friendly and knowledgeable, making the experience smooth and stress-free. Highly recommend GTCFX!",
  },
  {
    id: "10",
    source: "Trustpilot",
    date: "2025-10-22",
    name: "Martina Ferrari",
    rating: 5,
    text: "It really lived up to my expectations… It really lived up to my expectations when it comes to banking features. The first deposit took a little longer than expected, but after that, every transaction has been seamless and prompt.",
  },
  {
    id: "11",
    source: "Google",
    date: "2025-06-22",
    name: "Muhammad Wasif Baig",
    rating: 5,
    text: "GTCFX continues to impress me with their quick responses and reliable service. Anytime I’ve had a question, the support team has been there to help. Whether it’s account issues or technical support, they always resolve it quickly and professionally. I’m very satisfied with my experience.",
  },
  {
    id: "12",
    source: "Trustpilot",
    date: "2026-01-06",
    name: "David Velasco",
    rating: 5,
    text: "What I like most about GTCFX is how fast everything is. Execution is quick, and the platform stays stable. Spreads are also low, which helps a lot. It’s been a positive experience.",
  },

  // ✅ Examples for future (you can add later)
  // { id: "13", source: "TradingView", date: "2026-01-10", name: "John", rating: 5, text: "..." },
  // { id: "14", source: "WikiFX", date: "2026-01-11", name: "Sara", rating: 5, text: "..." },
  // { id: "15", source: "Investing.com", date: "2026-01-12", name: "Ahmed", rating: 5, text: "..." },
]

// ✅ Bottom ratings row (logos as images)
const PLATFORM_RATINGS = [
  {
    key: "tv",
    label: "Google",
    rating: 4.5,
    img: "/common/google.webp",
  },
  {
    key: "wiki",
    label: "WikiFX",
    rating: 9.23,
    img: "/common/wiki.webp",
  },
  {
    key: "invest",
    label: "Investing.com",
    rating: 4.1,
    img: "/common/invest.webp",
  },
  {
    key: "tp",
    label: "Trustpilot",
    rating: 4.1,
    img: "/common/trust.webp",
    accent: "green",
  },
];

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function Stars({ value }) {
  const full = Math.max(0, Math.min(5, Math.round(value)));
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          className={clsx(i < full ? "fill-amber-400" : "fill-gray-200")}
        >
          <path d="M12 17.27l-5.18 3.04 1.64-5.81L3 9.24l6.03-.52L12 3l2.97 5.72 6.03.52-4.46 5.26 1.64 5.81L12 17.27z" />
        </svg>
      ))}
    </div>
  );
}

function PlatformStars({ value }) {
  const full = Math.max(0, Math.min(5, Math.round(value)));

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          width="20"
          height="20"
          className={clsx(
            i < full
              ? "fill-amber-400"
              : "fill-white"
          )}
        >
          <path d="M12 17.27l-5.18 3.04 1.64-5.81L3 9.24l6.03-.52L12 3l2.97 5.72 6.03.52-4.46 5.26 1.64 5.81L12 17.27z" />
        </svg>
      ))}
    </div>
  );
}


// ✅ Source logos inside carousel cards (you can change paths)
function SourceMark({ source }) {
  const map = {
    Google: { label: "Google", img: "/common/google.webp" },
    Trustpilot: { label: "Trustpilot", img: "/common/trust.webp" },
    TradingView: { label: "TradingView", img: "/common/trading.webp" },
    WikiFX: { label: "WikiFX", img: "/common/wiki.webp" },
    "Investing.com": { label: "Investing.com", img: "/common/invest.webp" },
    "Google Play": { label: "Google Play", img: "/reviews/googleplay.png" },
    "App Store": { label: "App Store", img: "/reviews/appstore.png" },
  };

  const info = map[source];
  if (!info) return null;

  return (
    <div className="flex items-center gap-2 text-xs font-medium text-gray-600 rounded-xl">
      <Image
        src={info.img}
        alt={info.label}
        width={24}
        height={24}
        className="object-contain rounded-xl"
      />
      <span>{info.label}</span>
    </div>
  );
}

function ReviewCard({ r }) {
  return (
    <div className="h-full w-[320px] rounded-2xl bg-gray-100 ring-1 ring-black/5">
      <div className="flex h-full flex-col px-6 py-5">
        <div className="flex items-start justify-between gap-4">
          <Stars value={r.rating} />
          <div className="text-xs font-medium text-gray-500">{r.date}</div>
        </div>

        <div className="mt-3 text-sm font-bold text-gray-900">{r.name}</div>

        <p className="mt-2 line-clamp-4 text-sm leading-6 text-gray-600">
          {r.text}
        </p>

        <div className="mt-auto pt-4">
          <SourceMark source={r.source} />
        </div>
      </div>
    </div>
  );
}

export default function ReviewsSection() {
  const [reviews, setReviews] = useState([]);
  const locale = useLocale();
  const messages = useLocaleMessages();
  console.log(messages);
  const t = usePathTranslation("common.reviews");
  const isRtl = localeDir[locale] === "rtl";
  const configuredReviews = useMemo(
    () =>
      Array.isArray(messages?.common?.reviews?.items)
        ? messages.common.reviews.items.filter(
          (item) =>
            item &&
            typeof item.id === "string" &&
            typeof item.source === "string" &&
            typeof item.date === "string" &&
            typeof item.name === "string" &&
            typeof item.text === "string" &&
            typeof item.rating === "number"
        )
        : [],
    [messages?.common?.reviews?.items]
  );

  const emblaOptions = useMemo(
    () => ({
      align: "center",
      loop: true,
      dragFree: true,
      containScroll: false,
      direction: isRtl ? "rtl" : "ltr",
    }),
    [isRtl]
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions);

  // ✅ randomize on load
  useEffect(() => {
    setReviews(shuffleArray(configuredReviews.length ? configuredReviews : []));
  }, [configuredReviews]);

  // ✅ Autoplay
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!emblaApi) return;

    const stop = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
    };

    const start = () => {
      stop();
      intervalRef.current = setInterval(() => {
        if (isRtl) emblaApi.scrollPrev();
        else emblaApi.scrollNext();
      }, 2200);
    };

    start();
    emblaApi.on("pointerDown", stop);
    emblaApi.on("pointerUp", start);

    return () => {
      stop();
    };
  }, [emblaApi, isRtl]);

  const totalReviews = Number(messages?.common?.reviews?.totalReviews) || 0;
  const summaryTemplate = t(
    "summary",
    "Showing out of {total} reviews across TradingView, App Store, Google Play and Trustpilot."
  );
  const summaryText = summaryTemplate.replace("{total}", String(totalReviews));

  return (
    <section className="w-full py-10 md:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center flex flex-col gap-4">
          <h2 className="HeadingH3 capitalize">
            {t("titleLine1", "Read our reviews to find")}{" "}
            <br className="hidden sm:block" />
            {t("titleLine2Prefix", "out")}{" "}
            <span className="text-secondary">
              {t("titleHighlight", "more")}
            </span>{" "}
            {t("titleLine2Suffix", "about us")}
          </h2>
          <p className="Text">
            {t("subtitle", "Read the feedback from our clients around the world")}
          </p>
        </div>
      </div>

      {/* ✅ Full width carousel (end-to-end) */}
      <div className="mt-10 w-full">
        <div ref={emblaRef} dir={isRtl ? "rtl" : "ltr"} className="overflow-hidden">
          <div className="flex gap-6 px-6 sm:px-10 lg:px-16">
            {reviews.map((r) => (
              <div key={r.id} className="shrink-0">
                <ReviewCard r={r} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-6xl px-4">
        <p className="text-center text-xs text-primary sm:text-sm">
          {summaryText}
        </p>

        <div className="mt-10 rounded-2xl bg-gray-100 px-4 py-6 shadow-[0_6px_22px_rgba(0,0,0,0.06)] ring-1 ring-black/5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-4 sm:gap-0">
            {PLATFORM_RATINGS.map((p, idx) => (
              <div
                key={p.key}
                className={clsx(
                  "flex items-center justify-center gap-4 px-3 py-2",
                  idx !== 0 && "sm:border-l sm:border-gray-200"
                )}
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-xl bg-white ring-1 ring-black/5">
                  <Image
                    src={p.img}
                    alt={p.label}
                    width={25}
                    height={25}
                    className="object-contain rounded-xl"
                  />
                </div>

                <div className="min-w-[160px]">
                  <div className="text-xs font-semibold text-gray-800">
                    {p.label}
                  </div>
                  <div className="mt-1 flex items-center gap-3">
                    <div className="text-sm font-bold text-gray-900">
                      {p.rating.toFixed(1)}
                    </div>
                    <PlatformStars value={p.rating} accent={p.accent} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-4 text-center text-[11px] text-gray-500 sm:hidden">
          {t("swipeTip", "Tip: swipe left/right to see more reviews.")}
        </p>
      </div>
    </section>
  );
}

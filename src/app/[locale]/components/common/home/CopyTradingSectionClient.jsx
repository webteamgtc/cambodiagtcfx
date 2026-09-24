"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import Link from "next/link";
import LeaderCardGridItem from "../leaderboard/LeaderCardGridItem";
import { usePathTranslation } from "../../../LocaleProvider";

export default function CopyTradingSectionClient({ initialData }) {
  const t = usePathTranslation("home.copyTradingSection");

  const items = initialData?.items || [];
  const visibleItems = items.filter((s) => Number(s?.maxProfit) >= 50);
  const renderedItems = visibleItems.length ? visibleItems : items.slice(0, 8);

  if (!renderedItems.length) return null;

  return (
    <section className="bg-[#F1F2F4] py-10 md:py-16">
      <div className="container">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-col items-start gap-4">
            <h2 className="HeadingH2">
              {t("title.beforeHighlight")}
              <span className="text-secondary">{t("title.highlight")}</span>
            </h2>

            <p className="Text max-w-3xl">
              {t("description")}
            </p>
          </div>

          <div className="flex flex-row gap-3">
            <Link
              href={t("buttons.primary.href")}
              target="_blank"
              className="rounded-xl bg-gradient-to-r from-[#B68756] via-[#995F22] to-[#995F22] px-3 py-2.5 text-[12px] font-medium text-white transition hover:from-[#263788] hover:via-[#101638] hover:to-[#263788] hover:no-underline hover:opacity-90 md:px-5 md:text-base"
            >
              {t("buttons.primary.label")}
            </Link>

            <Link
              href={t("buttons.secondary.href")}
              target="_blank"
              className="rounded-xl border border-[#8f8f8f] bg-primary-gradient px-3 py-2.5 text-[12px] font-medium text-white transition hover:bg-white hover:no-underline md:px-5 md:text-base"
            >
              {t("buttons.secondary.label")}
            </Link>
          </div>
        </div>

        <Swiper
          spaceBetween={30}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          loop={false}
          observer
          observeParents
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1160: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1260: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          modules={[Pagination, Autoplay]}
          className="leaderboard mt-8"
        >
          {renderedItems.map((single, index) => {
            const slideKey =
              single?.profileId ?? single?.accountId ?? `leader-${index}`;

            return (
              <SwiperSlide key={slideKey} className="h-full !overflow-visible">
                <LeaderCardGridItem
                  key={single?.profileId ?? index}
                  item={single}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
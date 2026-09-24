"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import LeaderCardGridItem from "../../../components/common/leaderboard/LeaderCardGridItem";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

export default function TopPerformer({ items = [], loading = false }) {
  const t = usePathTranslation("copyTradingPage.rating");
  const [activeIndex, setActiveIndex] = useState(0);

  const featuredItems = items.filter((item) => Number(item?.maxProfit) >= 50);

  if (loading) {
    return (
      <div className="flex min-h-44 items-center justify-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (!featuredItems.length) {
    return null;
  }

  return (
    <div className="relative mt-10 md:mt-12">
      <Swiper
        spaceBetween={24}
        centeredSlides
        loop={featuredItems.length > 3}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={false}
        breakpoints={{
          0: {
            slidesPerView: 1.08,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 2.1,
            spaceBetween: 20,
          },
          1100: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
        }}
        modules={[Autoplay]}
        className="copy-trading-featured-swiper pb-12"
      >
        {featuredItems.map((single, index) => (
          <SwiperSlide key={single?.profileId ?? index} className="!h-auto">
            <LeaderCardGridItem
              item={single}
              highlighted={activeIndex === index}
              isTopOne={activeIndex === index}
              topBadgeLabel={t("topBadge")}
              chartHeight={92}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .copy-trading-featured-swiper .swiper-pagination-bullet {
          background: #c7d0ea;
          opacity: 1;
        }
        .copy-trading-featured-swiper .swiper-pagination-bullet-active {
          background: #293b93;
        }
        .copy-trading-featured-swiper .swiper-slide {
          height: auto;
          transition: transform 0.3s ease;
        }
        .copy-trading-featured-swiper .swiper-slide:not(.swiper-slide-active) {
          transform: scale(0.96);
        }
      `}</style>
    </div>
  );
}

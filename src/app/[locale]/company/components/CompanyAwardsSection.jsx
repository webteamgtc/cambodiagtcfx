"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useLocaleMessages, usePathTranslation } from "../../LocaleProvider";
import { localizedHref } from "@/i18n/localizedHref";
import { buildAwardCarouselItems } from "./awardItems";
import Button from "@/app/[locale]/components/common/Button";
function CarouselArrow({ direction, onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Previous awards" : "Next awards"}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#e5e7eb] bg-white text-[#9ca3af] shadow-[0_2px_8px_rgba(15,23,42,0.06)] transition hover:border-[#d1d5db] hover:text-[#2b3d8f] disabled:pointer-events-none disabled:opacity-35 sm:h-11 sm:w-11"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden
      >
        {direction === "prev" ? (
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        )}
      </svg>
    </button>
  );
}

function AwardCard({ item }) {
  return (
    <div className="flex h-full min-h-[280px] flex-col bg-white px-5 py-6 sm:min-h-[300px] sm:px-6 sm:py-7"
    style={{
      borderRadius: "10px",
      border: "1px solid rgba(0, 0, 0, 0.20)",
      background: "#FFF",
    }}
    >
      <div className="flex flex-1 items-center justify-center px-2 py-4">
        <Image
          src={item.image}
          alt={item.label}
          width={200}
          height={220}
          className="h-auto max-h-[200px] w-auto max-w-full object-contain sm:max-h-[220px]"
        />
      </div>
      <div className="my-2 h-[1px]" style={{
      background: "linear-gradient(90deg, rgba(204, 204, 204, 0.00) 0%, #CCC 50%, rgba(204, 204, 204, 0.00) 100%)",
      }}/>
      <p className="TextSmall mt-2 text-center font-semibold leading-snug">
        {item.label}
      </p>
    </div>
  );
}

export default function CompanyAwardsSection({ locale = "en" }) {
  const messages = useLocaleMessages();
  const t = usePathTranslation("companyPage.awardsSection");
  const [swiper, setSwiper] = useState(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const awardItems = useMemo(() => buildAwardCarouselItems(messages), [messages]);

  const updateNavState = (instance) => {
    if (!instance) return;
    setIsBeginning(instance.isBeginning);
    setIsEnd(instance.isEnd);
  };

  return (
    <section className="overflow-x-hidden bg-white py-6 md:py-8 ">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-start lg:gap-x-12 lg:gap-y-4 xl:gap-x-16">
          <div className="text-center md:text-left">
            <h2 className="HeadingH2 text-[#293B93] max-w-2xl mx-auto">
              {t("title", "GTCFX Awards")}
            </h2>
            <p className="mt-2 HeadingH3 text-[#293B93] font-semibold leading-snug md:text-[16px]">
              {t("subtitle", "Award-Winning CFD Broker Recognized for Excellence")}
            </p>
          </div>
          <p className="TextSmall leading-[1.7] font-normal text-[#666666] lg:pt-1 text-center md:text-left">
            {t(
              "description",
              "GTCFX has earned industry recognition across multiple international expos and financial events, reflecting our commitment to innovation, service quality, and excellence in global trading solutions."
            )}
          </p>
        </div>

        <div className="relative mt-10 min-w-0 overflow-hidden md:mt-12">
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <CarouselArrow
              direction="prev"
              onClick={() => swiper?.slidePrev()}
              disabled={!swiper || isBeginning}
            />

            <div className="min-w-0 flex-1 overflow-hidden">
              <Swiper
                className="company-awards-swiper w-full max-w-full"
                onSwiper={(instance) => {
                  setSwiper(instance);
                  updateNavState(instance);
                }}
                onSlideChange={updateNavState}
                onResize={updateNavState}
                onBreakpoint={updateNavState}
                observer
                observeParents
                watchOverflow
                spaceBetween={16}
                slidesPerView={1}
                slidesPerGroup={1}
                breakpoints={{
                  640: { slidesPerView: 2, slidesPerGroup: 1, spaceBetween: 18 },
                  1024: { slidesPerView: 3, slidesPerGroup: 1, spaceBetween: 20 },
                }}
              >
                {awardItems.map((item) => (
                  <SwiperSlide key={item.id} className="!h-auto">
                    <AwardCard item={item} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <CarouselArrow
              direction="next"
              onClick={() => swiper?.slideNext()}
              disabled={!swiper || isEnd}
            />
          </div>
        </div>

      
        <div className="mt-6 flex justify-center md:mt-12">
          <Button
            href={localizedHref(locale, "/company/awards")}
            variant="brand"
            size="md"
            showArrow
          >
            {t("viewMore", "View More")}
          </Button>
        </div>
            
      </div>
    </section>
  );
}

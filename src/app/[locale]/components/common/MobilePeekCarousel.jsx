"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { usePathTranslation } from "../../LocaleProvider";

function clampIndex(index, length) {
  if (length <= 0) return 0;
  return Math.min(Math.max(0, index), length - 1);
}

function ChevronLeft({ className }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRight({ className }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

/**
 * Mobile carousel (Swiper): one slide per view, full width, no peek.
 * Same API as before: items, renderItem, trackClassName, initialIndex, onActiveIndexChange, etc.
 *
 * @param {object} props
 * @param {unknown[]} props.items
 * @param {(item: unknown, index: number) => React.ReactNode} props.renderItem
 * @param {string} [props.className]
 * @param {string} [props.trackClassName] — passed to Swiper root (e.g. `-mx-4 px-4`)
 * @param {string} [props.slideClassName] — each slide wrapper
 * @param {boolean} [props.showArrows=true]
 * @param {number} [props.slidesPerView=1]
 * @param {number} [props.spaceBetween=0]
 * @param {number} [props.initialIndex=0]
 * @param {(index: number) => void} [props.onActiveIndexChange]
 */
export default function MobilePeekCarousel({
  items,
  renderItem,
  className = "",
  trackClassName = "",
  slideClassName = "",
  showArrows = true,
  slidesPerView = 1,
  spaceBetween = 0,
  initialIndex = 0,
  onActiveIndexChange,
}) {
  const a11y = usePathTranslation("common.a11y");
  const swiperRef = useRef(null);
  const prevInitialIndexRef = useRef(initialIndex);
  const [activeIndex, setActiveIndex] = useState(() =>
    clampIndex(initialIndex, items.length)
  );

  const handleSwiper = useCallback((swiper) => {
    swiperRef.current = swiper;
    setActiveIndex(swiper.activeIndex);
  }, []);

  const handleSlideChange = useCallback(
    (swiper) => {
      const i = swiper.activeIndex;
      setActiveIndex(i);
      onActiveIndexChange?.(i);
    },
    [onActiveIndexChange]
  );

  useEffect(() => {
    const id = window.setTimeout(() => {
      const swiper = swiperRef.current;
      if (!swiper) return;

      if (prevInitialIndexRef.current !== initialIndex) {
        prevInitialIndexRef.current = initialIndex;
        const idx = clampIndex(initialIndex, items.length);
        swiper.slideTo(idx);
        return;
      }

      const max = Math.max(0, items.length - Math.min(slidesPerView, items.length));
      if (swiper.activeIndex > max) {
        swiper.slideTo(max);
      }
    }, 0);
    return () => window.clearTimeout(id);
  }, [initialIndex, items.length, slidesPerView]);

  const goTo = useCallback(
    (index) => {
      swiperRef.current?.slideTo(clampIndex(index, items.length));
    },
    [items.length]
  );

  const goPrev = useCallback(() => {
    swiperRef.current?.slidePrev();
  }, []);

  const goNext = useCallback(() => {
    swiperRef.current?.slideNext();
  }, []);

  if (!items.length) return null;

  const maxIndex = Math.max(0, items.length - Math.min(slidesPerView, items.length));
  const start = clampIndex(Math.min(initialIndex, maxIndex), items.length);
  const atStart = activeIndex <= 0;
  const atEnd = activeIndex >= maxIndex;

  return (
    <div
      className={["w-full min-w-0 max-w-full", className].filter(Boolean).join(" ")}
      role="region"
      aria-roledescription="carousel"
      aria-label={a11y("carousel", "Carousel")}
    >
      <div className="flex min-w-0 max-w-full items-center gap-2">
        {showArrows && (
          <button
            type="button"
            onClick={goPrev}
            disabled={atStart}
            aria-label={a11y("previousSlide", "Previous slide")}
            className="z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#e5e5e5] bg-white text-primary shadow-sm transition-opacity disabled:pointer-events-none disabled:opacity-35"
          >
            <ChevronLeft className="h-3 w-3" />
          </button>
        )}

        <Swiper
          className={[
            "mobile-peek-swiper min-w-0 flex-1 !pb-1",
            slidesPerView > 1 ? "mobile-peek-swiper--multi" : "",
            trackClassName,
          ]
            .filter(Boolean)
            .join(" ")}
          slidesPerView={slidesPerView}
          spaceBetween={spaceBetween}
          centeredSlides={false}
          initialSlide={start}
          resistanceRatio={0}
          speed={300}
          onSwiper={handleSwiper}
          onSlideChange={handleSlideChange}
        >
          {items.map((item, index) => (
            <SwiperSlide
              key={index}
              className={["box-border !h-auto", slideClassName].filter(Boolean).join(" ")}
            >
              <div
                className="h-full w-full"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${items.length}`}
              >
                {renderItem(item, index)}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {showArrows && (
          <button
            type="button"
            onClick={goNext}
            disabled={atEnd}
            aria-label={a11y("nextSlide", "Next slide")}
            className="z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#e5e5e5] bg-white text-primary shadow-sm transition-opacity disabled:pointer-events-none disabled:opacity-35"
          >
            <ChevronRight className="h-3 w-3" />
          </button>
        )}
      </div>
    </div>
  );
}

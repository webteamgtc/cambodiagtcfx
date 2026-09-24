'use client';

import Image from "next/image";
import { ANALYSIS_VIDEO } from "@/app/[locale]/gtc-news/market-news/marketNewsData";
import GtcNewsSectionTitle from "./GtcNewsSectionTitle";
import FadeInSection from "@/app/[locale]/company/contact-us/components/FadeInSection";
import MobilePeekCarousel from "@/app/[locale]/components/common/MobilePeekCarousel";
import { usePathTranslation } from "../../LocaleProvider";

function VideoBackdrop({ children, compact = false, presenterImage }) {
  return (
    <div
      className="relative overflow-hidden rounded-[14px] bg-[#05162E]"
      style={{
        backgroundImage:
          "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 45%), linear-gradient(225deg, rgba(0,0,0,0.18) 0%, transparent 55%), linear-gradient(180deg, #0A1F4A 0%, #05162E 100%)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        aria-hidden
        style={{
          backgroundImage:
            "repeating-linear-gradient(125deg, rgba(255,255,255,0.05) 0, rgba(255,255,255,0.05) 2px, transparent 2px, transparent 28px)",
        }}
      />

      <div className="absolute left-4 top-4 z-10 md:left-5 md:top-5">
        <p className="text-lg font-bold leading-none text-white md:text-xl">GTC</p>
        <p className="mt-1 text-[9px] font-medium uppercase tracking-[0.18em] text-white/70">Global Trade Capital</p>
      </div>

      {children}

      <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-[42%] md:w-[38%]">
        <Image
          src={presenterImage}
          alt=""
          fill
          className="object-cover object-top"
          sizes={compact ? "33vw" : "40vw"}
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#05162E]/20 to-[#05162E]/85" />
      </div>
    </div>
  );
}

function VideoHeadline({ line1, line2, compact = false }) {
  return (
    <div className={compact ? "max-w-[70%] px-4 py-5" : "max-w-xl px-5 py-8 md:px-8 md:py-10"}>
      <p
        className={
          compact
            ? "text-sm font-semibold leading-snug text-[#C5A059] md:text-base"
            : "HeadingH5 font-semibold leading-snug text-[#C5A059] md:text-xl"
        }
      >
        {line1}
      </p>
      <p
        className={
          compact
            ? "mt-1 text-sm font-semibold leading-snug text-white md:text-base"
            : "HeadingH4 mt-2 font-semibold leading-snug text-white md:mt-3"
        }
      >
        {line2}
      </p>
    </div>
  );
}

function ControlIcon({ children, large = false }) {
  return (
    <span
      className={
        large
          ? "inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white"
          : "inline-flex h-7 w-7 items-center justify-center text-white/90"
      }
    >
      {children}
    </span>
  );
}

function VideoControls({ currentTime, totalDuration, progress }) {
  return (
    <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/80 via-black/55 to-transparent px-4 pb-4 pt-10 md:px-6">
      <div className="relative mb-3 h-1 rounded-full bg-white/25">
        <span className="absolute left-0 top-0 h-full rounded-full bg-white" style={{ width: `${progress}%` }} />
        <span
          className="absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-white shadow"
          style={{ left: `calc(${progress}% - 7px)` }}
        />
        <span
          className="absolute -top-7 rounded bg-[#4E4E4E] px-2 py-0.5 text-[10px] font-medium text-white"
          style={{ left: `calc(${progress}% - 24px)` }}
        >
          {currentTime}
        </span>
      </div>

      <div className="flex items-center justify-between gap-3 text-white">
        <div className="flex items-center gap-2">
          <ControlIcon>
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
              <path d="M11 5L6 9H2v6h4l5 4V5z" strokeLinejoin="round" />
              <path d="M15.5 8.5a5 5 0 0 1 0 7" strokeLinecap="round" />
            </svg>
          </ControlIcon>
          <span className="hidden h-1 w-10 rounded-full bg-white/35 sm:block">
            <span className="block h-full w-[70%] rounded-full bg-white" />
          </span>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <span className="text-[11px] font-medium text-white/85 md:text-xs">{currentTime}</span>
          <ControlIcon>
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
              <path d="M11 6L6 10H3v4h3l5 4V6zM13 6l5 4h3v4h-3l-5 4V6z" strokeLinejoin="round" />
            </svg>
          </ControlIcon>
          <ControlIcon large>
            <svg className="ml-0.5 h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          </ControlIcon>
          <ControlIcon>
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
              <path d="M13 6l5 4H21v4h-3l-5 4V6zM3 6l5 4H1v4h3l5 4V6z" strokeLinejoin="round" />
            </svg>
          </ControlIcon>
          <span className="text-[11px] font-medium text-white/85 md:text-xs">{totalDuration}</span>
        </div>

        <div className="flex items-center gap-2">
          <ControlIcon>
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" strokeLinecap="round" />
            </svg>
          </ControlIcon>
          <span className="rounded bg-[#293B93] px-2 py-0.5 text-[10px] font-semibold text-white">1x</span>
          <ControlIcon>
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
              <path d="M8 4H4v4M20 4h-4v4M4 20v-4h4M20 20v-4h-4" strokeLinecap="round" />
            </svg>
          </ControlIcon>
        </div>
      </div>
    </div>
  );
}

function FeaturedVideoPlayer({ item, alt }) {
  return (
    <article className="relative overflow-hidden rounded-lg">
      <Image src={"/new-design/Markets/vedio-crop.webp"} className="w-full" alt={alt} width={1000} height={1000} loading="lazy" />
      {/* <VideoBackdrop presenterImage={item.presenterImage}>
        <div className="relative z-10 aspect-[16/8] w-full">
          <div className="absolute inset-0 flex items-center">
            <VideoHeadline line1={item.headlineLine1} line2={item.headlineLine2} />
          </div>
          <VideoControls currentTime={item.currentTime} totalDuration={item.totalDuration} progress={item.progress} />
        </div>
      </VideoBackdrop> */}
    </article>
  );
}

function VideoThumbnailCard({ item, alt }) {
  return (
    <article className="overflow-hidden rounded-lg">
      <Image src={"/new-design/Markets/vedio-one.svg"} className="w-full min-h-[270px]" alt={alt} width={1000} height={1000} />
      {/* <VideoBackdrop compact presenterImage={item.presenterImage}>
        <div className="relative aspect-[16/10] w-full">
          <div className="absolute inset-0 z-10 flex items-end">
            <VideoHeadline line1={item.headlineLine1} line2={item.headlineLine2} compact />
          </div>
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm">
              <svg className="ml-0.5 h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </div>
        </div>
      </VideoBackdrop> */}
    </article>
  );
}

export default function GtcNewsAnalysisSection() {
  const t = usePathTranslation("gtcNewsPage.analysis");
  const featuredAlt = `${t("featured.headlineLine1", "Trump-Xi Meeting Sends Markets Higher:")} ${t("featured.headlineLine2", "Is This the Turning Point?")}`;

  return (
    <section className="bg-white pb-10 pt-4 md:pb-14">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl">
          <FadeInSection>
            <GtcNewsSectionTitle title={t("sectionTitle", "GTCFX & Analysis")} />
          </FadeInSection>
          <FadeInSection delay={0.1}>
            <FeaturedVideoPlayer item={ANALYSIS_VIDEO.featured} alt={featuredAlt} />
          </FadeInSection>
          <FadeInSection delay={0.2}>
            <div className="md:hidden mt-4">
              <MobilePeekCarousel
                items={ANALYSIS_VIDEO.thumbnails}
                renderItem={(item, index) => {
                  const alt = `${t(`thumbnails.${index}.headlineLine1`, item.headlineLine1)} ${t(`thumbnails.${index}.headlineLine2`, item.headlineLine2)}`;
                  return (
                    <div className="px-1 pb-2">
                      <VideoThumbnailCard item={item} alt={alt} />
                    </div>
                  );
                }}
              />
            </div>
            <div className="hidden md:grid mt-4 gap-4 md:grid-cols-3">
              {ANALYSIS_VIDEO.thumbnails.map((item, index) => {
                const alt = `${t(`thumbnails.${index}.headlineLine1`, item.headlineLine1)} ${t(`thumbnails.${index}.headlineLine2`, item.headlineLine2)}`;
                return (
                  <VideoThumbnailCard key={`${item.headlineLine1}-${index}`} item={item} alt={alt} />
                );
              })}
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

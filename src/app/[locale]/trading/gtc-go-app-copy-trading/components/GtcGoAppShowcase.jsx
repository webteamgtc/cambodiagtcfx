"use client";

import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import FadeInSection from "@/app/[locale]/company/contact-us/components/FadeInSection";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

function PromoCard({ title, description }) {
  return (
    <article className="rounded-[20px] p-5">
      <h3 className="HeadingH5 text-left font-semibold leading-[1.35] text-[#000]">
        {title}
      </h3>
      <p className="TextSmall mt-3 text-left font-normal leading-[1.7] text-[#000032]/60">
        {description}
      </p>
    </article>
  );
}

function ScreenCard({ src, alt }) {
  return (
    <div className="gtc-go-showcase-screen relative w-full min-w-0 shrink-0 overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading="lazy" decoding="async" className="gtc-go-showcase-screen__img" />
    </div>
  );
}

function ShowcaseColumn({ items, direction, duration, offset = 0, promo, t }) {
  const renderItem = (item, keySuffix = "") => {
    if (item.type === "promo") {
      return (
        <PromoCard
          key={`promo-${keySuffix}`}
          title={t("promo.title", promo.title)}
          description={t("promo.description", promo.description)}
        />
      );
    }

    return (
      <ScreenCard
        key={`screen-${item.src}-${keySuffix}`}
        src={item.src}
        alt={t(`screens.${item.screenIndex}.alt`, item.alt)}
      />
    );
  };

  return (
    <div
      className="gtc-go-showcase-column relative h-[400px] w-full min-w-0 overflow-hidden sm:h-[500px] md:h-[600px] lg:h-[680px] md:[margin-top:var(--showcase-offset)]"
      style={{
        "--showcase-duration": `${duration}s`,
        "--showcase-offset": `${offset}px`,
      }}
    >
      <div
        className={`gtc-go-showcase-track flex w-full flex-col gap-4 sm:gap-5 ${
          direction === "down" ? "gtc-go-showcase-track--down" : ""
        }`}
      >
        <div className="flex w-full flex-col gap-4 sm:gap-5">
          {items.map((item, index) => renderItem(item, index))}
        </div>
        <div className="flex w-full flex-col gap-4 sm:gap-5" aria-hidden>
          {items.map((item, index) => renderItem(item, `dup-${index}`))}
        </div>
      </div>
    </div>
  );
}

export default function GtcGoAppShowcase({ data }) {
  const { showcase } = data;
  const t = usePathTranslation("gtcGoAppPage.showcase");

  return (
    <section className="overflow-hidden bg-[#F8F9FC] py-8 sm:py-10 md:py-16">
      <div className="container min-w-0 max-w-full px-4">
        <div className="mx-auto max-w-6xl text-center">
          <FadeInSection>
            <SectionEyebrow className="!capitalize">{t("eyebrow", showcase.eyebrow)}</SectionEyebrow>
            <h2 className="HeadingH1 mx-auto mt-4 max-w-xl px-1 font-semibold leading-[1.25] text-[#000]">
              {t("title", showcase.title)}
            </h2>
            <p className="Text mx-auto mt-4 max-w-3xl font-normal leading-[1.7] text-[#000032]/60">
              {t("description", showcase.description)}
            </p>
          </FadeInSection>

          <div className="relative mt-8 sm:mt-10 md:mt-12">
            <div
              className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-[#F8F9FC] via-[#F8F9FC]/90 to-transparent sm:h-20 md:h-28"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-[#F8F9FC] via-[#F8F9FC]/90 to-transparent sm:h-20 md:h-28"
              aria-hidden
            />

            {/* Mobile: 2 cols · sm: 3 · md+: 5 — same scrolling columns */}
            <div className="grid w-full grid-cols-2 gap-2 overflow-hidden sm:grid-cols-3 sm:gap-2.5 md:grid-cols-5 md:gap-3 [&>*]:min-w-0">
              {showcase.columns.map((column, index) => (
                <div
                  key={column.id}
                  className={
                    index >= 3
                      ? "hidden md:block"
                      : index >= 2
                        ? "hidden sm:block"
                        : undefined
                  }
                >
                  <ShowcaseColumn
                    items={column.items}
                    direction={column.direction}
                    duration={column.duration}
                    offset={column.offset}
                    promo={showcase.promo}
                    t={t}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* Phone frame inside SVG: 308x648 within 427x767 canvas */
        .gtc-go-showcase-screen {
          aspect-ratio: 308 / 648;
        }

        .gtc-go-showcase-screen__img {
          position: absolute;
          top: -5.8%;
          left: -11.5%;
          width: 138.6%;
          height: 118.4%;
          max-width: none;
          object-fit: fill;
        }

        .gtc-go-showcase-track {
          animation: gtc-go-showcase-scroll-up var(--showcase-duration, 42s) linear infinite;
          will-change: transform;
        }

        .gtc-go-showcase-track--down {
          animation-name: gtc-go-showcase-scroll-down;
        }

        @media (hover: hover) and (pointer: fine) {
          .gtc-go-showcase-column:hover .gtc-go-showcase-track {
            animation-play-state: paused;
          }
        }

        @keyframes gtc-go-showcase-scroll-up {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(0, -50%, 0);
          }
        }

        @keyframes gtc-go-showcase-scroll-down {
          from {
            transform: translate3d(0, -50%, 0);
          }
          to {
            transform: translate3d(0, 0, 0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .gtc-go-showcase-column {
            height: auto !important;
            overflow: visible !important;
          }

          .gtc-go-showcase-track {
            animation: none !important;
            transform: none !important;
          }

          .gtc-go-showcase-track > div[aria-hidden="true"] {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}

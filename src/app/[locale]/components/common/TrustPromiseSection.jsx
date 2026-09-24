"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useLayoutEffect, useMemo, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

const PANEL_IDS = ["environment", "social", "governance"];

const PANEL_IMAGES = {
  environment: "/trust-promise/esg-01.webp",
  social: "/trust-promise/esg-02.webp",
  governance: "/trust-promise/esg-03.webp",
};

function TrustSymbol({ className }) {
  return (
    <svg
      viewBox="0 0 140 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <circle cx="70" cy="70" r="68" stroke="#293B93" strokeWidth="2" opacity="0.25" />
      <circle cx="70" cy="70" r="48" stroke="#293B93" strokeWidth="2" opacity="0.45" />
      <path
        d="M70 18 L118 98 H22 Z"
        stroke="#293B93"
        strokeWidth="2.5"
        fill="none"
        strokeLinejoin="round"
      />
      <circle cx="70" cy="70" r="8" fill="#293B93" />
    </svg>
  );
}

function EsgPanel({ panel, panelRef, contRef, visualRef, txtRef, isLast }) {
  return (
    <div
      ref={panelRef}
      className={`tp-panel max-w-full bg-white ${isLast ? "tp-panel-last" : ""} mt-[70px] first:mt-0 md:mt-[100px] md:first:mt-0`}
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
    >
      <div
        ref={contRef}
        className="tp-cont relative overflow-hidden rounded-[20px] bg-white will-change-transform"
        style={{ transformOrigin: "top center" }}
      >
        <div
          ref={visualRef}
          className="tp-visual relative w-full overflow-hidden rounded-[20px] bg-[#ececec] pt-[65%] will-change-transform"
          style={{ transformOrigin: "top center", backfaceVisibility: "hidden" }}
        >
          <Image
            src={panel.image}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 90vw, 720px"
          />
        </div>
        <div
          ref={txtRef}
          className="tp-txt pointer-events-none absolute inset-x-0 bottom-0 z-[2] flex flex-col justify-end rounded-b-[20px] bg-gradient-to-t from-black/70 via-black/20 to-transparent p-12 text-white md:p-20"
        >
          <h3 className="text-[clamp(2.2rem,5vw,4.25rem)] font-bold leading-none">{panel.title}</h3>
          <p className="mt-3 max-w-xl text-[clamp(1rem,1.5vw,1.45rem)] leading-relaxed text-white/95">
            {panel.description}
          </p>
        </div>
      </div>
    </div>
  );
}

function MobileEsgCarousel({ panels }) {
  return (
    <div className="relative mt-8 md:hidden">
      <TrustSymbol className="absolute left-0 top-0 z-10 h-[50px] w-[50px] -translate-x-[20%] -translate-y-1/2 animate-[tpSymbolSpin_10s_ease-in-out_infinite]" />
      <Swiper slidesPerView={1.2} spaceBetween={20} speed={1000} className="!overflow-visible">
        {PANELS.map((panel) => (
          <SwiperSlide key={panel.id}>
            <div className="relative overflow-hidden rounded-[10px]">
              <div className="relative w-full overflow-hidden rounded-[10px] pt-[65%]">
                <Image src={panel.image} alt="" fill className="object-cover" sizes="85vw" />
              </div>
              <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end rounded-b-[10px] bg-gradient-to-t from-black/70 via-black/20 to-transparent p-8 text-white">
                <h3 className="mb-2 text-3xl font-bold">{panel.title}</h3>
                <p className="text-sm leading-relaxed text-white/95">{panel.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default function TrustPromiseSection() {
  const t = usePathTranslation("companyPage.trustPromiseSection");
  const panels = useMemo(
    () =>
      PANEL_IDS.map((id) => ({
        id,
        title: t(`panels.${id}.title`, id),
        description: t(`panels.${id}.description`, ""),
        image: PANEL_IMAGES[id],
      })),
    [t]
  );
  const sectionRef = useRef(null);
  const panelRefs = useRef([]);
  const contRefs = useRef([]);
  const visualRefs = useRef([]);
  const txtRefs = useRef([]);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(min-width: 768px)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const root = sectionRef.current;
    const panels = panelRefs.current.filter(Boolean);
    const lastPanel = panels[panels.length - 1];
    if (!root || panels.length < 3 || !lastPanel) return;

    const getOffsets = () => {
      const w = window.innerWidth;
      if (w > 1241) return { pinStart: 120, gap: 30 };
      if (w < 769) return { pinStart: 60, gap: 10 };
      return { pinStart: 80, gap: 15 };
    };

    const ctx = gsap.context(() => {
      const { pinStart, gap } = getOffsets();

      panels.forEach((panelEl, i) => {
        const cont = contRefs.current[i];
        const visual = visualRefs.current[i];
        const txt = txtRefs.current[i];
        if (!cont || !visual) return;

        const start = `top +=${pinStart + i * gap}`;
        const isLastPanel = i === panels.length - 1;

        gsap.set(cont, { transformOrigin: "top center", force3D: true });
        gsap.set(visual, { transformOrigin: "top center", force3D: true });

        ScrollTrigger.create({
          trigger: panelEl,
          start,
          endTrigger: lastPanel,
          end: "top +=80",
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
        });

        gsap.to(visual, {
          rotateX: -6,
          ease: "none",
          scrollTrigger: {
            trigger: panelEl,
            start,
            end: "top -=30%",
            scrub: 1,
          },
        });

        if (txt) {
          gsap.to(txt, {
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: panelEl,
              start,
              end: "top -=30%",
              scrub: 1,
            },
          });
        }

        if (!isLastPanel) {
          gsap.to(cont, {
            scale: 0.05,
            y: -200,
            ease: "none",
            scrollTrigger: {
              trigger: panelEl,
              start,
              end: "top -=700%",
              scrub: 1,
            },
          });
        }
      });
    }, root);

    const onRefresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", onRefresh);
    window.addEventListener("resize", onRefresh);
    const tId = window.setTimeout(onRefresh, 400);

    return () => {
      window.removeEventListener("load", onRefresh);
      window.removeEventListener("resize", onRefresh);
      window.clearTimeout(tId);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="trust-promise-section overflow-hidden bg-white py-12 md:py-20"
      aria-labelledby="trust-promise-heading"
    >
      <div className="container pb-10 md:pb-[200px]">
        <header className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#293B93]">{t("eyebrow", "Trust promise")}</p>
          <h2 id="trust-promise-heading" className="HeadingH2 mt-3 text-[#111827]">
            {t("title", "Trust promise")}
          </h2>
          <p className="Text mt-4 text-[#6B7280]">
            {t(
              "description",
              "GTCFX establishes and practices an ESG strategy for sustainable management and long-term value for our clients and communities."
            )}
          </p>
        </header>

        <div className="relative mx-auto hidden w-[90%] max-w-[720px] md:flex md:w-[60%] md:max-w-none">
          <div className="sticky top-[150px] z-[1] mb-[250px] h-[105px] w-[105px] shrink-0 self-start lg:h-[140px] lg:w-[140px]">
            <TrustSymbol className="h-full w-full animate-[tpSymbolSpin_10s_ease-in-out_infinite]" />
          </div>

          <div className="relative -ml-[105px] flex-1 bg-white lg:-ml-[140px]">
            {PANELS.map((panel, index) => (
              <EsgPanel
                key={panel.id}
                panel={panel}
                isLast={index === PANELS.length - 1}
                panelRef={(el) => {
                  panelRefs.current[index] = el;
                }}
                contRef={(el) => {
                  contRefs.current[index] = el;
                }}
                visualRef={(el) => {
                  visualRefs.current[index] = el;
                }}
                txtRef={(el) => {
                  txtRefs.current[index] = el;
                }}
              />
            ))}
          </div>
        </div>

        <MobileEsgCarousel panels={panels} />
      </div>
    </section>
  );
}

"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { useLocaleMessages, usePathTranslation } from "@/app/[locale]/LocaleProvider";
import Link from "next/link";
import { GTC_GO_APP_DOWNLOAD_HREF } from "@/lib/gtcGoAppLinks";

function CardChartBackdrop({ className }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 flex justify-end overflow-hidden rounded-[28px] md:rounded-[32px] ${className ?? ""}`}
      aria-hidden
    >
      <Image src="/new-design/candle-bg.webp" alt="" fill className="h-full w-full object-cover" />
    </div>
  );
}

function VisualFrame({ src, imageAlt }) {
  return (
    <div className="relative mx-auto flex w-full justify-center md:mx-0 md:justify-end">
      <div className="relative h-[220px] w-[96%] max-w-[440px] translate-y-1 drop-shadow-[0_24px_45px_rgba(15,23,42,0.14)] sm:h-[240px] sm:w-[90%] md:h-[255px] md:translate-y-4 md:translate-x-2 lg:h-[350px] lg:w-[min(100%,460px)]">
        <Image
          src={src}
          alt={imageAlt}
          fill
          className="select-none object-contain"
          sizes="(max-width: 768px) 88vw, 440px"
        />
      </div>
    </div>
  );
}

function VisualMobile({ imageAlt }) {
  return <VisualFrame src="/new-design/img-go-app.webp" imageAlt={imageAlt} />;
}

function VisualLaptop({ imageAlt }) {
  return <VisualFrame src="/new-design/img-mt5.webp" imageAlt={imageAlt} />;
}

function VisualWeb({ imageAlt }) {
  return <VisualFrame src="/new-design/img-mt4.webp" imageAlt={imageAlt} />;
}

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

function PlatformStackPanel({
  card,
  panelRef,
  contRef,
  visualRef,
  txtRef,
  isLast,
  className,
}) {
  return (
    <div
      ref={panelRef}
      className={`tp-panel max-w-full bg-white ${isLast ? "tp-panel-last" : ""} mt-[70px] first:mt-0 md:mt-[100px] md:first:mt-0`}
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
    >
      <div
        ref={contRef}
        className="tp-cont relative will-change-transform"
        style={{ transformOrigin: "top center" }}
      >
        <article
          ref={visualRef}
          className={`tp-visual relative overflow-hidden rounded-[28px] bg-[#F5F6F9] shadow-[0_20px_50px_rgba(15,23,42,0.08),0_4px_14px_rgba(15,23,42,0.04)] will-change-transform md:min-h-[420px] md:rounded-[32px] lg:shadow-[0_24px_60px_rgba(15,23,42,0.1),0_8px_20px_rgba(15,23,42,0.05)]`}
          style={{ transformOrigin: "top center", backfaceVisibility: "hidden" }}
        >
          <CardChartBackdrop />
          <div className="relative z-[2] mx-auto grid max-w-4xl gap-8 pt-14 md:grid-cols-2 md:items-center md:gap-8 lg:gap-12">
            <div ref={txtRef} className="tp-txt text-start">
              <div className="flex flex-col items-center gap-3 p-4 md:items-start md:gap-4">
                {card.icon ? (
                  <Image
                    src={card.icon}
                    alt={card.title}
                    width={100}
                    height={60}
                    // className="h-16 w-16 object-contain"
                    className={className}
                  />
                ) : (
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#2563EB] text-base font-bold leading-none text-white shadow-sm">
                    {card.iconLetter}
                  </span>
                )}
                <div className="min-w-0 text-center md:text-left">
                  <h3 className="HeadingH4 font-bold leading-snug tracking-tight text-[#111827] md:text-2xl lg:text-[26px]">
                    {card.title}
                  </h3>
                  <p className="Text mt-2 leading-relaxed text-[#6B7280] md:text-base">{card.description}</p>
                </div>
                <button className="TextButton inline-flex min-h-[40px] items-center justify-center rounded-full bg-[#2E42A5] px-6 py-2.5 font-semibold text-white shadow-md transition hover:bg-[#1e3490] !hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2541B2] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a1020]/80 md:min-h-[52px] md:px-8"
                ><Link className="hover:no-underline" href={card.href} target="_blank" rel="noopener noreferrer">{card.btnText}</Link></button>
              </div>
            </div>
            <div className="relative min-h-[200px] md:min-h-[230px] lg:min-h-[240px]">{card.visual}</div>
          </div>
        </article>
      </div>
    </div>
  );
}

function PlatformCard({ iconLetter, icon, title, description, visual, btnText, href, className, target = "_blank", rel = "noopener noreferrer" }) {
  return (
    <article className="relative overflow-hidden rounded-[28px] bg-[#F5F6F9] shadow-[0_20px_50px_rgba(15,23,42,0.08),0_4px_14px_rgba(15,23,42,0.04)] md:min-h-[420px] md:rounded-[32px] lg:shadow-[0_24px_60px_rgba(15,23,42,0.1),0_8px_20px_rgba(15,23,42,0.05)]">
      <CardChartBackdrop />
      <div className="relative z-[2] mx-auto grid max-w-4xl gap-8 pt-10 md:grid-cols-2 md:items-center md:gap-8 lg:gap-12">
        <div className="text-start">
          <div className="flex flex-col items-center gap-3 p-4 md:items-start md:gap-4">
            {icon ? (
              <Image src={icon} alt={title} width={70} height={70} className={className} />
            ) : (
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#2563EB] text-base font-bold leading-none text-white shadow-sm">
                {iconLetter}
              </span>
            )}
            <div className="min-w-0 text-center md:text-left">
              <h3 className="HeadingH4 font-bold leading-snug tracking-tight text-[#111827] md:text-2xl lg:text-[26px]">
                {title}
              </h3>
              <p className="Text mt-2 leading-relaxed text-[#6B7280] md:text-base">{description}</p>
            </div>
          </div>
          <div className="mx-auto flex justify-center">
            <button className="TextButton inline-flex min-h-[40px] items-center justify-center rounded-full bg-[#2E42A5] px-6 py-2.5 font-semibold text-white shadow-md transition hover:bg-[#1e3490] !hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2541B2] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a1020]/80 md:min-h-[52px] md:px-8"
            ><Link className="hover:no-underline" href={href} >{btnText}</Link></button>
          </div>
        </div>

        <div className="relative min-h-[200px] md:min-h-[230px] lg:min-h-[240px]">{visual}</div>
      </div>
    </article>
  );
}


export default function TrustPromiseSection() {
  const messages = useLocaleMessages();
  const t = usePathTranslation("common.tradingPlatformsStack");
  const cfg = messages?.common?.tradingPlatformsStack;

  const sectionRef = useRef(null);
  const panelRefs = useRef([]);
  const contRefs = useRef([]);
  const visualRefs = useRef([]);
  const txtRefs = useRef([]);
  const [mobileActiveCard, setMobileActiveCard] = useState("go");

  const cards = useMemo(
    () => [
      {
        id: "go",
        iconLetter: cfg?.cards?.go?.iconLetter ?? "G",
        title: t("cards.go.title", "GTC Go App"),
        description: t("cards.go.description", "Trade markets anytime, anywhere"),
        visual: <VisualMobile imageAlt={t("cards.go.title", "GTC Go App")} />,
        icon: "/new-design/go-app.webp",
        btnText: t("cards.go.buttonText", "Download Our App"),
        href: "/trading/gtc-go-app",
        className: "h-10 w-10 object-contain",
      },
      {
        id: "mt5",
        iconLetter: cfg?.cards?.mt5?.iconLetter ?? "5",
        title: t("cards.mt5.title", "MetaTrader 5"),
        description: t(
          "cards.mt5.description",
          "Advanced charts, EA support, and institutional-grade execution on desktop."
        ),
        visual: <VisualLaptop imageAlt={t("cards.mt5.title", "MetaTrader 5")} />,
        icon: "/home/mt5-platform.webp",
        btnText: t("cards.mt5.buttonText", "Download MT5 Platform"),
        href: "/trading/mt5-platform",
        className: "h-14 w-32 object-contain",
      },
      {
        id: "web",
        iconLetter: cfg?.cards?.web?.iconLetter ?? "W",
        title: t("cards.web.title", "WebTrader"),
        description: t("cards.web.description", "Log in from any browser and trade with no software install."),
        visual: <VisualWeb imageAlt={t("cards.web.title", "WebTrader")} />,
        icon: "/home/mt4-platform.webp",
        btnText: t("cards.web.buttonText", "Download MT4 Platform"),
        href: "/trading/mt4-platform",
        className: "h-14 w-32 object-contain",

      },
    ],
    [cfg, t]
  );

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
  }, [cards]);

  return (
    <section
      ref={sectionRef}
      className="trust-promise-section overflow-hidden bg-white py-12 md:py-10"
      aria-labelledby="trust-promise-heading"
    >
      <div className="container pb-10 md:pb-[120px]">
        <header className="mx-auto mb-10 max-w-lg text-center md:mb-14">
          <h2 id="trust-promise-heading" className="HeadingH2 text-balance text-[#111827]">
            {t("title", "Find Your Ideal Trading Platform")}
          </h2>
        </header>

        {/* Mobile: same tabs + cards as TradingPlatformsStackSection */}
        <div className="md:hidden">
          <div className="mb-4 flex items-center justify-center gap-2">
            {cards.map((card) => {
              const isActive = mobileActiveCard === card.id;
              return (
                <button
                  key={`mobile-tab-${card.id}`}
                  type="button"
                  onClick={() => setMobileActiveCard(card.id)}
                  className={`TextSmall rounded-full px-3 py-1 transition ${isActive
                    ? "border border-[#A8B6E9] bg-white text-[#2E42A5]"
                    : "text-[#666666]"
                    }`}
                >
                  {card.title}
                </button>
              );
            })}
          </div>

          {cards
            .filter((card) => card.id === mobileActiveCard)
            .map((card) => (
              <div key={`mobile-${card.id}`} className="w-full">
                <PlatformCard
                  iconLetter={card.iconLetter}
                  icon={card.icon}
                  title={card.title}
                  description={card.description}
                  visual={card.visual}
                  btnText={card.btnText}
                  href={card.href}
                  className={card.className}
                />
              </div>
            ))}
        </div>

        {/* Desktop: trust-promise scroll stack */}
        <div className="relative mx-auto hidden w-[90%] max-w-[900px] md:flex md:w-[72%] md:max-w-none lg:w-[80%]">

          <div className="relative flex-1 bg-white">
            {cards.map((card, index) => (
              <PlatformStackPanel
                key={card.id}
                card={card}
                isLast={index === cards.length - 1}
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
                className={card.className}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

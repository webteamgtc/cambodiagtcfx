"use client";

import React, { useEffect, useRef, memo } from "react";
import { usePathTranslation } from "../../LocaleProvider";

function EconomicCalendarWidget() {
  const containerRef = useRef(null);
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;
    mountRef.current.innerHTML = "";

    const tryRemoveCopyright = () => {
      const root = mountRef.current;
      if (!root) return;
      const selectors = [".tradingview-widget-copyright", ".js-copyright-label"];
      root.querySelectorAll(selectors.join(",")).forEach((el) => el.remove());
      document.querySelectorAll(selectors.join(",")).forEach((el) => el.remove());
    };

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-events.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      colorTheme: "light",
      isTransparent: false,
      locale: "en",
      importanceFilter: "-1,0,1",
      countryFilter:
        "ar,au,br,ca,cn,fr,de,in,id,it,jp,kr,mx,ru,sa,za,tr,gb,us,eu",
      width: "100%",
      height: "700",
    });

    mountRef.current.appendChild(script);

    let attempts = 0;
    const intervalId = window.setInterval(() => {
      attempts += 1;
      tryRemoveCopyright();
      if (attempts >= 15) window.clearInterval(intervalId);
    }, 300);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div
      ref={containerRef}
      className="tradingview-widget-container relative overflow-hidden rounded-2xl border border-[#D9DBE5] bg-white"
      style={{ minHeight: 700 }}
    >
      <div
        ref={mountRef}
        className="tradingview-widget-container__widget w-full"
      />
      {/* Hide TradingView attribution bar */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[34px] bg-white" />
    </div>
  );
}

const MemoWidget = memo(EconomicCalendarWidget);

export default function EconomicCalendarSection({ locale }) {
  const t = usePathTranslation("knowledgePage.economicCalendar");

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-10">
          <h2 className="HeadingH2 font-bold mb-3" style={{ color: "#1a3591" }}>
            {t("heading", "Economic Calendar")}
          </h2>
          <p className="Text text-gray-500">
            {t("sub", "GTCFX offers a variety of tools to enhance your trading Experience")}
          </p>
        </div>

        {/* TradingView Economic Calendar Widget */}
        <MemoWidget />
      </div>
    </section>
  );
}

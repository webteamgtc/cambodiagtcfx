// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from "react";

function TradingViewWidget() {
  const container = useRef(null);
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;
    mountRef.current.innerHTML = "";

    const tryRemoveCopyright = () => {
      const root = mountRef.current;
      if (!root) return;
      const selectors = [".tradingview-widget-copyright", ".js-copyright-label"];

      // Remove inside our wrapper
      root.querySelectorAll(selectors.join(",")).forEach((el) => el.remove());

      // Fallback: sometimes TradingView inserts attribution in nearby DOM
      document.querySelectorAll(selectors.join(",")).forEach((el) => el.remove());
    };

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
        {
          "colorTheme": "light",
          "dateRange": "12M",
          "locale": "en",
          "largeChartUrl": "",
          "isTransparent": true,
          "showFloatingTooltip": false,
          "plotLineColorGrowing": "rgba(36, 53, 139, 1)",
          "plotLineColorFalling": "rgba(36, 53, 139, 1)",
          "gridLineColor": "rgba(240, 243, 250, 0)",
          "scaleFontColor": "#24358b",
          "belowLineFillColorGrowing": "rgba(36, 53, 139, 0.12)",
          "belowLineFillColorFalling": "rgba(36, 53, 139, 0.12)",
          "belowLineFillColorGrowingBottom": "rgba(36, 53, 139, 0)",
          "belowLineFillColorFallingBottom": "rgba(36, 53, 139, 0)",
          "symbolActiveColor": "rgba(36, 53, 139, 0.12)",
          "tabs": [
            {
              "title": "Indices",
              "symbols": [
                {
                  "s": "FOREXCOM:SPXUSD",
                  "d": "S&P 500 Index"
                },
                {
                  "s": "FOREXCOM:NSXUSD",
                  "d": "US 100 Cash CFD"
                },
                {
                  "s": "FOREXCOM:DJI",
                  "d": "Dow Jones Industrial Average Index"
                },
                {
                  "s": "INDEX:NKY",
                  "d": "Japan 225"
                },
                {
                  "s": "INDEX:DEU40",
                  "d": "DAX Index"
                },
                {
                  "s": "FOREXCOM:UKXGBP",
                  "d": "FTSE 100 Index"
                }
              ],
              "originalTitle": "Indices"
            },
            {
              "title": "Futures",
              "symbols": [
                {
                  "s": "BMFBOVESPA:ISP1!",
                  "d": "S&P 500"
                },
                {
                  "s": "BMFBOVESPA:EUR1!",
                  "d": "Euro"
                },
                {
                  "s": "CMCMARKETS:GOLD",
                  "d": "Gold"
                },
                {
                  "s": "PYTH:WTI3!",
                  "d": "WTI Crude Oil"
                },
                {
                  "s": "BMFBOVESPA:CCM1!",
                  "d": "Corn"
                }
              ],
              "originalTitle": "Futures"
            },
            {
              "title": "Bonds",
              "symbols": [
                {
                  "s": "EUREX:FGBL1!",
                  "d": "Euro Bund"
                },
                {
                  "s": "EUREX:FBTP1!",
                  "d": "Euro BTP"
                },
                {
                  "s": "EUREX:FGBM1!",
                  "d": "Euro BOBL"
                }
              ],
              "originalTitle": "Bonds"
            },
            {
              "title": "Forex",
              "symbols": [
                {
                  "s": "FX:EURUSD",
                  "d": "EUR to USD"
                },
                {
                  "s": "FX:GBPUSD",
                  "d": "GBP to USD"
                },
                {
                  "s": "FX:USDJPY",
                  "d": "USD to JPY"
                },
                {
                  "s": "FX:USDCHF",
                  "d": "USD to CHF"
                },
                {
                  "s": "FX:AUDUSD",
                  "d": "AUD to USD"
                },
                {
                  "s": "FX:USDCAD",
                  "d": "USD to CAD"
                }
              ],
              "originalTitle": "Forex"
            }
          ],
          "support_host": "https://www.tradingview.com",
          "backgroundColor": "rgba(0, 0, 0, 0)",
          "width": "100%",
          "height": "495",
          "showSymbolLogo": true,
          "showChart": true
        }`;
    mountRef.current.appendChild(script);

    // TradingView renders attribution asynchronously; retry a few times.
    let attempts = 0;
    const maxAttempts = 10;
    const intervalId = window.setInterval(() => {
      attempts += 1;
      tryRemoveCopyright();
      if (attempts >= maxAttempts) window.clearInterval(intervalId);
    }, 250);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div className="relative">
      <div
        className="tradingview-widget-container relative overflow-hidden rounded-2xl border border-[#D9DBE5] bg-white"
        ref={container}
        style={{ height: 495 }}
      >
        <div
          ref={mountRef}
          className="tradingview-widget-container__widget relative z-0 h-full w-full [&_iframe]:relative [&_iframe]:z-0"
        />
        {/* Covers TradingView attribution/footer that is rendered inside an iframe */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[30px] bg-white" />
      </div>
    </div>
  );
}

export default memo(TradingViewWidget);

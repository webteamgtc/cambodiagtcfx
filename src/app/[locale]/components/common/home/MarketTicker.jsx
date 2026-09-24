"use client";

import { useEffect, useState } from "react";
import MarketTickerFallback from "./MarketTickerFallback";
import MarketTickerClient from "./MarketTickerClient";

/**
 * Home market ticker — static shell on SSR/first paint, live client tree after mount.
 * Avoids hydration mismatches from WebSocket prices, API fetches, and i18n labels.
 */
export default function MarketTicker(props) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) {
    return <MarketTickerFallback {...props} />;
  }

  return <MarketTickerClient {...props} />;
}

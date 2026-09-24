"use client";

import { useEffect, useState } from "react";
import { getStoreDownloadHref } from "./gtcGoAppLinks";

const MOBILE_MAX_WIDTH_PX = 767;

export function useIsMobileViewport(maxWidth = MOBILE_MAX_WIDTH_PX) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${maxWidth}px)`);
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [maxWidth]);

  return isMobile;
}

/** @param {"apple" | "google"} type */
export function useStoreDownloadHref(type) {
  const isMobile = useIsMobileViewport();
  return getStoreDownloadHref(type, isMobile);
}

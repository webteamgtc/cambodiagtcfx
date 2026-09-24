"use client";

import { useEffect, useRef, useState } from "react";

const MEGA_MENU_KEYS = new Set(["about", "account", "trading", "prime", "learn"]);
const EXIT_MS = 320;

/**
 * Delays unmounting the megamenu so exit transitions can finish.
 * @param {string | null} activeKey — current open key (click toggled)
 * @returns {{ displayKey: string | null, motionOpen: boolean, contentPhase: 'idle' | 'in' | 'out' }}
 */
export function useMegaMenuPanelMotion(activeKey) {
  const [displayKey, setDisplayKey] = useState(null);
  const [motionOpen, setMotionOpen] = useState(false);
  const [contentPhase, setContentPhase] = useState("idle");
  const prevActiveRef = useRef(null);

  useEffect(() => {
    const show = activeKey != null && MEGA_MENU_KEYS.has(activeKey);
    const prev = prevActiveRef.current;
    prevActiveRef.current = activeKey;

    if (show) {
      const switching = prev != null && MEGA_MENU_KEYS.has(prev) && prev !== activeKey;

      if (switching) {
        setContentPhase("out");
        const swapId = setTimeout(() => {
          setDisplayKey(activeKey);
          setContentPhase("in");
        }, 140);
        return () => clearTimeout(swapId);
      }

      setDisplayKey(activeKey);
      setContentPhase("in");
      const id = requestAnimationFrame(() => {
        requestAnimationFrame(() => setMotionOpen(true));
      });
      return () => cancelAnimationFrame(id);
    }

    setMotionOpen(false);
    setContentPhase("out");
    const t = setTimeout(() => {
      setDisplayKey(null);
      setContentPhase("idle");
    }, EXIT_MS);
    return () => clearTimeout(t);
  }, [activeKey]);

  const contentVisible = contentPhase === "in" && motionOpen;

  return { displayKey, motionOpen, contentVisible, contentPhase };
}

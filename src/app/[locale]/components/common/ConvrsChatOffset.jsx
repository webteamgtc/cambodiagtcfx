"use client";

import { useEffect } from "react";
import { CONVRS_WEBCHAT_SCRIPT_ID } from "@/lib/chat/convrs";

const MOBILE_MQ = "(max-width: 1023px)";
const MOBILE_BOTTOM_OFFSET = 85;
const DEFAULT_BOTTOM_OFFSET = 10;

function getVerticalOffset() {
  if (typeof window === "undefined") return DEFAULT_BOTTOM_OFFSET;
  return window.matchMedia(MOBILE_MQ).matches
    ? MOBILE_BOTTOM_OFFSET
    : DEFAULT_BOTTOM_OFFSET;
}

function applyConvrsOffset() {
  if (typeof window === "undefined" || !window.ConvrsChat?.Settings) {
    return false;
  }

  const vertical = getVerticalOffset();

  if (window.ConvrsChat.options?.settings?.offset) {
    window.ConvrsChat.options.settings.offset.vertical = vertical;
  }

  window.ConvrsChat.Settings({ offset: { vertical } });
  window.ConvrsChat.PositionChat?.();

  return true;
}

/**
 * Convrs webchat uses Shadow DOM — page CSS cannot move the widget.
 * Use ConvrsChat.Settings({ offset }) per their API.
 */
export default function ConvrsChatOffset() {
  useEffect(() => {
    let intervalId;
    let attempts = 0;
    let scriptLoadHandler = null;

    const tryApply = () => {
      if (applyConvrsOffset()) {
        clearInterval(intervalId);
        return true;
      }
      attempts += 1;
      if (attempts >= 120) clearInterval(intervalId);
      return false;
    };

    const startPolling = () => {
      clearInterval(intervalId);
      attempts = 0;
      tryApply();
      intervalId = window.setInterval(tryApply, 250);
    };

    const attachScriptListener = () => {
      const script = document.getElementById(CONVRS_WEBCHAT_SCRIPT_ID);
      if (!script || scriptLoadHandler) return;

      scriptLoadHandler = () => {
        attempts = 0;
        startPolling();
      };
      script.addEventListener("load", scriptLoadHandler);
    };

    startPolling();
    attachScriptListener();

    const observer = new MutationObserver(() => attachScriptListener());
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });

    const mq = window.matchMedia(MOBILE_MQ);
    const onViewportChange = () => applyConvrsOffset();
    mq.addEventListener("change", onViewportChange);

    const onConsentChange = () => {
      attachScriptListener();
      startPolling();
    };
    window.addEventListener("gtcfx:cookie-consent", onConsentChange);

    return () => {
      clearInterval(intervalId);
      observer.disconnect();
      mq.removeEventListener("change", onViewportChange);
      window.removeEventListener("gtcfx:cookie-consent", onConsentChange);

      const script = document.getElementById(CONVRS_WEBCHAT_SCRIPT_ID);
      if (script && scriptLoadHandler) {
        script.removeEventListener("load", scriptLoadHandler);
      }
    };
  }, []);

  return null;
}

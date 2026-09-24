"use client";

import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";
import { useLocationDetail } from "@/context/useLocationDetail";
import {
  hasConsentDecision,
  pushCookieConsentEvent,
  saveConsent,
} from "@/lib/cookies/consent";

export default function CookiesBanner() {
  const t = usePathTranslation("cookies");
  const { countryData } = useLocationDetail();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(!hasConsentDecision());
  }, []);

  const handleApiCall = useCallback(() => {
    const payload = { newUser: true, ...(countryData || {}) };
    axios
      .post("https://hooks.zapier.com/hooks/catch/16420445/37ltm4i/", JSON.stringify(payload))
      .then(() => {
        pushCookieConsentEvent(countryData);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  }, [countryData]);

  const acceptAll = useCallback(() => {
    saveConsent({ analytics: true, advertising: true });
    setShow(false);
    handleApiCall();
  }, [handleApiCall]);

  if (!show) return null;

  return (
    <div className="fixed bottom-0 z-50 w-full bg-[#f4f5f7] p-4 text-primary">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-12">
          <p className="col-span-1 text-[13px] ltr:text-left rtl:text-right md:col-span-10">{t("text")}</p>
          <div className="col-span-1 text-center md:col-span-2 md:text-right">
            <button
              type="button"
              className="items-center gap-2 bg-[#293B93] px-3 py-[6px] text-sm uppercase text-white hover:bg-[#293B93] hover:text-white"
              onClick={acceptAll}
            >
              {t("btnText")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

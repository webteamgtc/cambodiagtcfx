"use client";

import { useEffect } from "react";
import { useLocationDetail } from "@/context/useLocationDetail";
import {
  GEO_COUNTRY_COOKIE,
  GEO_COUNTRY_MAX_AGE,
} from "@/lib/geo/resolveCountryFromRequest";

function setGeoCountryCookie(countryCode) {
  if (typeof document === "undefined" || !countryCode) return;
  document.cookie = `${GEO_COUNTRY_COOKIE}=${encodeURIComponent(
    countryCode
  )}; path=/; max-age=${GEO_COUNTRY_MAX_AGE}; SameSite=Lax`;
}

/**
 * Persists geo country for footer/disclaimer logic only.
 * Never rewrites the URL — hardcoded locale paths are always kept as-is.
 */
export default function RegionalLocaleGuard() {
  const { countryCode, locationReady } = useLocationDetail();

  useEffect(() => {
    if (!locationReady || !countryCode) return;
    setGeoCountryCookie(countryCode);
  }, [countryCode, locationReady]);

  return null;
}

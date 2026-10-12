"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useLocationDetail } from "@/context/useLocationDetail";
import { CAMBODIA_SITE } from "@/config/cambodiaSite";
import {
  buildMainWebsiteRedirectUrl,
  isCambodiaCountry,
} from "@/lib/geo/cambodiaAccessGate";
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

function hasClientGeoBypass() {
  if (typeof document === "undefined") return false;
  return document.cookie.split("; ").some((entry) => entry.startsWith("cambodia_geo_bypass="));
}

/**
 * Persists geo country and redirects non-Cambodia visitors to gtcfx.com when enabled.
 */
export default function RegionalLocaleGuard() {
  const { countryCode, locationReady } = useLocationDetail();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!locationReady || !countryCode) return;
    setGeoCountryCookie(countryCode);
  }, [countryCode, locationReady]);

  useEffect(() => {
    if (CAMBODIA_SITE.cambodiaOnlyAccess !== true) return;
    if (
      process.env.NODE_ENV === "development" &&
      process.env.NEXT_PUBLIC_CAMBODIA_GEO_RESTRICT_IN_DEV !== "true"
    ) {
      return;
    }
    if (!locationReady || !countryCode) return;
    if (hasClientGeoBypass()) return;
    if (isCambodiaCountry(countryCode)) return;

    const search = searchParams?.toString();
    const redirectUrl = buildMainWebsiteRedirectUrl(
      pathname,
      search ? `?${search}` : ""
    );
    window.location.replace(redirectUrl);
  }, [countryCode, locationReady, pathname, searchParams]);

  return null;
}

import { useEffect, useState } from "react";
import {
  GEO_COUNTRY_COOKIE,
  GEO_COUNTRY_MAX_AGE,
  readGeoCountryCookie,
} from "@/lib/geo/resolveCountryFromRequest";

let cachedGeoData = null;
let geoFetchPromise = null;

function persistGeoCountryCookie(countryCode) {
  if (typeof document === "undefined" || !countryCode) return;
  document.cookie = `${GEO_COUNTRY_COOKIE}=${encodeURIComponent(
    countryCode
  )}; path=/; max-age=${GEO_COUNTRY_MAX_AGE}; SameSite=Lax`;
}

const fetchGeoInfo = async () => {
  if (cachedGeoData) {
    return cachedGeoData;
  }

  if (!geoFetchPromise) {
    geoFetchPromise = fetch("https://ipinfo.io/json")
      .then((response) => response.json())
      .then((data) => {
        cachedGeoData = data;
        return data;
      })
      .catch((error) => {
        console.log({ error });
        return null;
      })
      .finally(() => {
        geoFetchPromise = null;
      });
  }

  return geoFetchPromise;
};

export const useLocationDetail = () => {
  const initialCountry =
    cachedGeoData?.country ?? readGeoCountryCookie() ?? null;
  const [countryCode, setCountryCode] = useState(initialCountry);
  const [countryData, setCountryData] = useState(cachedGeoData ?? null);
  const [locationReady, setLocationReady] = useState(!!initialCountry);

  useEffect(() => {
    let isMounted = true;

    if (typeof window === "undefined") {
      return () => {
        isMounted = false;
      };
    }

    fetchGeoInfo()
      .then((data) => {
        if (!isMounted) return;
        const country = data?.country ?? null;
        setCountryCode(country);
        setCountryData(data ?? null);
        if (country) persistGeoCountryCookie(country);
      })
      .catch(() => {})
      .finally(() => {
        if (isMounted) setLocationReady(true);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    countryCode,
    countryData,
    locationReady,
  };
};
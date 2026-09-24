export const CONSENT_COOKIE = "gtcfx";
export const PREFERENCES_COOKIE = "gtcfx_preferences";
export const CONSENT_MAX_AGE = 1728000; // 20 days

export const EUROPEAN_COUNTRIES = [
  "AT", "BE", "BG", "CY", "CZ", "DE", "DK", "EE", "ES", "FI", "FR", "GR", "HR", "HU",
  "IE", "IT", "LT", "LU", "LV", "MT", "NL", "PL", "PT", "RO", "SE", "SI", "SK",
];

export function isEuropeanCountry(countryCode) {
  return Boolean(countryCode && EUROPEAN_COUNTRIES.includes(countryCode));
}

export function getCookie(name) {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

export function setCookie(name, value, maxAge = CONSENT_MAX_AGE) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

export function hasConsentDecision() {
  return getCookie(CONSENT_COOKIE) === "true";
}

export function getConsentPreferences() {
  const raw = getCookie(PREFERENCES_COOKIE);
  if (!raw) {
    return { necessary: true, analytics: true, advertising: true };
  }

  try {
    const parsed = JSON.parse(raw);
    return {
      necessary: true,
      analytics: Boolean(parsed.analytics),
      advertising: Boolean(parsed.advertising),
    };
  } catch {
    return { necessary: true, analytics: false, advertising: false };
  }
}

export function saveConsent(preferences) {
  const payload = {
    necessary: true,
    analytics: Boolean(preferences.analytics),
    advertising: Boolean(preferences.advertising),
  };

  setCookie(CONSENT_COOKIE, "true");
  setCookie(PREFERENCES_COOKIE, JSON.stringify(payload));

  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("gtcfx:cookie-consent", { detail: payload }));
  }

  return payload;
}

export function pushCookieConsentEvent(countryData = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "button_click",
    buttonName: "Cookies",
    ...countryData,
  });
}

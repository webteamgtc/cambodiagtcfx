import { locales } from "@/i18n/config";
import { sortLocalesLongestFirst } from "@/i18n/regionalLocale";
import {
  HOME_SCHEMA,
  FOREX_SCHEMA,
  ENERGY_SCHEMA,
  INDICES_SCHEMA,
  METALS_SCHEMA,
  SHARES_SCHEMA,
  CRYPTO_CFDS_SCHEMA,
  FUTURE_CFDS_SCHEMA,
  COMMODITIES_SCHEMA,
  ECONOMIC_CALENDAR_SCHEMA,
  COPY_TRADING_SCHEMA,
  GTC_GO_APP_SCHEMA,
  FREE_DEMO_ACCOUNT_SCHEMA,
  OPEN_LIVE_ACCOUNT_SCHEMA,
  PAMM_ACCOUNT_SCHEMA,
  SWAP_UPDATE_SCHEMA,
  DYNAMIC_LEVERAGE_SCHEMA,
  MT4_PLATFORM_SCHEMA,
  MT5_PLATFORM_SCHEMA,
  VPS_HOSTING_SCHEMA,
} from "./pageSchemas";

/**
 * Locale-stripped route → JSON-LD graph.
 * Add a route here to emit its structured data; see `PageJsonLd`.
 */
const SCHEMA_BY_ROUTE = {
  "/": HOME_SCHEMA,
  "/markets/forex": FOREX_SCHEMA,
  "/markets/energy": ENERGY_SCHEMA,
  "/markets/indices": INDICES_SCHEMA,
  "/markets/metals": METALS_SCHEMA,
  "/markets/shares": SHARES_SCHEMA,
  "/markets/crypto-cfds": CRYPTO_CFDS_SCHEMA,
  "/markets/future-cfds": FUTURE_CFDS_SCHEMA,
  "/markets/commodities": COMMODITIES_SCHEMA,
  "/markets/economic-calendar": ECONOMIC_CALENDAR_SCHEMA,
  "/trading/copy-trading": COPY_TRADING_SCHEMA,
  "/trading/gtc-go-app": GTC_GO_APP_SCHEMA,
  "/trading/free-demo-account": FREE_DEMO_ACCOUNT_SCHEMA,
  "/trading/open-live-account": OPEN_LIVE_ACCOUNT_SCHEMA,
  "/trading/pamm-account": PAMM_ACCOUNT_SCHEMA,
  "/trading/swap-update": SWAP_UPDATE_SCHEMA,
  "/trading/mt4-platform": MT4_PLATFORM_SCHEMA,
  "/trading/mt5-platform": MT5_PLATFORM_SCHEMA,
  "/trading/vps-hosting-services": VPS_HOSTING_SCHEMA,
  "/company/dynamic-leverage": DYNAMIC_LEVERAGE_SCHEMA,
};

const SORTED_LOCALES = sortLocalesLongestFirst(locales);

function stripLocale(pathname) {
  const locale = SORTED_LOCALES.find(
    (item) => pathname === `/${item}` || pathname.startsWith(`/${item}/`)
  );
  if (!locale) return pathname;
  return pathname.slice(`/${locale}`.length) || "/";
}

function normalize(pathname) {
  const trimmed = pathname.split(/[?#]/)[0].replace(/\/+$/, "");
  return trimmed || "/";
}

/**
 * Resolve the JSON-LD graph for a pathname (locale prefix optional).
 * Returns `null` when the route has no structured data.
 */
export function resolvePageSchema(pathname) {
  if (typeof pathname !== "string" || !pathname.startsWith("/")) return null;
  return SCHEMA_BY_ROUTE[normalize(stripLocale(pathname))] || null;
}
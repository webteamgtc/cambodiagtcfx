/** AppsFlyer OneLink — routes to App Store or Google Play by device (mobile). */
export const GTC_GO_APP_DOWNLOAD_HREF =
  "https://mygtc.onelink.me/pZtr?ref=Az7aFg5e&deep_link_sub1=Az7aFg5e&af_sub1=Az7aFg5e";

export const APP_STORE_DESKTOP_HREF =
  "https://apps.apple.com/ae/app/gtcfx-gtc-go-trade-invest/id6753007277";

export const GOOGLE_PLAY_DESKTOP_HREF =
  "https://play.google.com/store/apps/details?id=com.gtcgo.trade&hl=en";

/** Desktop store URLs (legacy aliases). */
export const APP_STORE_HREF = APP_STORE_DESKTOP_HREF;
export const GOOGLE_PLAY_HREF = GOOGLE_PLAY_DESKTOP_HREF;

/** GTC Go web / client portal */
export const CLIENT_PORTAL_HREF =
  "https://web.mygtc.app/user?redirect=%252Fdashboard";

/** MetaTrader 5 desktop installer */
export const MT5_SETUP_HREF =
  "https://download.terminal.free/cdn/web/gtc.global.trade/mt5/gtcglobaltrade5setup.exe";

/** @param {"apple" | "google"} type */
export function getStoreDownloadHref(type, isMobile) {
  if (isMobile) return GTC_GO_APP_DOWNLOAD_HREF;
  return type === "apple" ? APP_STORE_DESKTOP_HREF : GOOGLE_PLAY_DESKTOP_HREF;
}

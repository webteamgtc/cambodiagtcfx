const DEFAULT_AVATAR =
  "/GTCFX-ICON.svg";

export function getDefaultAvatarUrl() {
  return DEFAULT_AVATAR;
}

/** Same query string as copy-trading leaderboard cards (gtccopy portal). */
export function buildGtccopySubscriptionUrl(providerId) {
  if (providerId == null || providerId === "") return "#";
  return `https://gtccopy.com/portal/registration/subscription?provider=${providerId}&backLink=true&backUrl=https%3A%2F%2Fratings.gtccopy.com%2Fwidgets%2Fratings%3FwidgetKey=social_platform_ratings&lang=en&wlid=2b9e7678-160f-48f5-9a5f-5f5bef2d9d26&widgetKey=social_platform_ratings`;
}

export function formatNumber(v, { decimals = 2 } = {}) {
  const n = Number(v);
  if (!Number.isFinite(n)) return "-";
  return new Intl.NumberFormat(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(n);
}

export function formatInteger(v) {
  const n = Number(v);
  if (!Number.isFinite(n)) return "-";
  return new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(n);
}

export function formatMoney(v) {
  const n = Number(v);
  if (!Number.isFinite(n)) return "-";
  const sign = n >= 0 ? "+" : "";
  return `${sign}${new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n)}`;
}

export function formatPercent(v) {
  const n = Number(v);
  if (!Number.isFinite(n)) return "-";
  const sign = n >= 0 ? "+" : "";
  return `${sign}${formatNumber(n, { decimals: 2 })}%`;
}

export function pickAumFromHistory(item) {
  const entries = item?.history?.entries;
  if (!Array.isArray(entries) || entries.length < 1) return null;
  for (let i = entries.length - 1; i >= 0; i -= 1) {
    const eb = Number(entries[i]?.eb);
    if (Number.isFinite(eb) && eb > 0) return eb;
  }
  return null;
}

export function getLeaderCardAvatar(item) {
  return item?.public?.avatarPath || DEFAULT_AVATAR;
}

export function getLeaderCardCountryCode(item) {
  return item?.account?.countryCode?.toLowerCase();
}

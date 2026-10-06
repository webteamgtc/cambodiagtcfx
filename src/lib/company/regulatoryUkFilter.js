import { CAMBODIA_SITE } from "@/config/cambodiaSite";

/** Translation / data keys for the UK (FCA) entity on company pages. */
export const UK_REGULATION_ENTITY_KEY = "unitedKingdom";
export const UK_REGULATION_MAP_KEY = "london";
export const UK_REGULATION_REGULATOR_KEY = "fca";
export const UK_REGULATION_AFFILIATE_KEY = "three";

export function isUkRegulationHidden() {
  return CAMBODIA_SITE.hideUkRegulation === true;
}

export function withoutUkEntityKey(items, getKey = (item) => item.key ?? item.entityKey) {
  if (!isUkRegulationHidden()) return items;
  return items.filter((item) => getKey(item) !== UK_REGULATION_ENTITY_KEY);
}

export function withoutUkMapKey(items) {
  if (!isUkRegulationHidden()) return items;
  return items.filter((item) => item.key !== UK_REGULATION_MAP_KEY);
}

export function withoutUkRegulatorKey(items, getKey = (item) => item.key) {
  if (!isUkRegulationHidden()) return items;
  return items.filter((item) => getKey(item) !== UK_REGULATION_REGULATOR_KEY);
}

export function withoutUkLicenseFooterLines(lines) {
  if (!isUkRegulationHidden()) return lines;
  return lines.filter(
    (line) => !/FCA\s*UK/i.test(line) && !/\b744501\b/.test(line)
  );
}

export function withoutUkAffiliateEntries(items, getKey = (item) => item.key) {
  if (!isUkRegulationHidden()) return items;
  return items.filter((item) => getKey(item) !== UK_REGULATION_AFFILIATE_KEY);
}

export const LEVERAGE_DETAILS_SECTION_ID = "leverage-details";
export const LEVERAGE_CALCULATOR_SECTION_ID = "leverage-calculator";
export const LEVERAGE_SET_CATEGORY_EVENT = "leverage:set-category";

/** Hero pill key → details tab category (S3 JSON keys) or calculator section. */
export const HERO_CATEGORY_NAV = [
  { key: "forex", sectionId: LEVERAGE_DETAILS_SECTION_ID, category: "Forex" },
  { key: "indices", sectionId: LEVERAGE_DETAILS_SECTION_ID, category: "Cash Index" },
  { key: "metals", sectionId: LEVERAGE_DETAILS_SECTION_ID, category: "Metals" },
  { key: "calculator", sectionId: LEVERAGE_CALCULATOR_SECTION_ID },
  { key: "stocks", sectionId: LEVERAGE_DETAILS_SECTION_ID, category: "Future Index" },
];

export function scrollToLeverageSection(sectionId, category) {
  if (typeof window === "undefined") return;

  if (category) {
    window.dispatchEvent(
      new CustomEvent(LEVERAGE_SET_CATEGORY_EVENT, {
        detail: { category },
      })
    );
  }

  const target = document.getElementById(sectionId);
  if (!target) return;

  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

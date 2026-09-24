export const EARNING_TABLE_SECTION_ID = "earning-table";
export const EARNING_SCREENER_SECTION_ID = "earning-screener";
export const EARNING_MARGIN_GUIDE_SECTION_ID = "earning-margin-guide";
export const EARNING_FAQS_SECTION_ID = "earning-faqs";

export const HERO_CATEGORY_NAV = [
  { key: "calendar", sectionId: EARNING_TABLE_SECTION_ID },
  { key: "screener", sectionId: EARNING_SCREENER_SECTION_ID },
  { key: "marginGuide", sectionId: EARNING_MARGIN_GUIDE_SECTION_ID },
  { key: "faqs", sectionId: EARNING_FAQS_SECTION_ID },
];

export function scrollToEarningsSection(sectionId) {
  if (typeof window === "undefined") return;

  const target = document.getElementById(sectionId);
  if (!target) return;

  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

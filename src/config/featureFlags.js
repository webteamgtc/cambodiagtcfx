/** Set to true when careers pages and links should be visible again. */
export const SHOW_CAREERS = false;

export const HIDDEN_CAREER_HREFS = SHOW_CAREERS ? [] : ["/company/careers"];

export function isCareerHref(href = "") {
  if (SHOW_CAREERS) return false;
  const path = href.split("?")[0].split("#")[0];
  return path === "/company/careers" || path.endsWith("/company/careers");
}

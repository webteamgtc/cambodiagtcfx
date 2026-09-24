/** Local placeholder when Strapi/API blog cover is missing or fails to load. */
export const BLOG_CARD_FALLBACK_IMAGE = "/gtcfx.png";

export function normalizeBlogCardImageSrc(src, fallback = BLOG_CARD_FALLBACK_IMAGE) {
  if (typeof src !== "string") return fallback;
  const trimmed = src.trim();
  return trimmed || fallback;
}

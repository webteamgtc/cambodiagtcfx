import { AWARDS_DATA } from "../awards/awardsData";

/** All award trophy images in /public/awards (1.webp … 41.webp) */
export const AWARD_IMAGE_COUNT = AWARDS_DATA.length;

export function buildAwardCarouselItems(messages) {
  const awardsItems =
    messages?.about?.["awards-section"]?.items ??
    messages?.["awards-section"]?.items ??
    {};

  return AWARDS_DATA.map((award) => {
    const entry = awardsItems[String(award.id)] ?? {};
    const label = entry.title || entry.event || `Award ${award.id}`;

    return {
      id: award.id,
      image: award.image,
      label,
    };
  });
}

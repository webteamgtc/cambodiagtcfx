export const AWARDS_DATA = [
  { id: 1, image: "/awards/1.webp", year: "2025" },
  { id: 2, image: "/awards/2.webp", year: "2025" },
  { id: 3, image: "/awards/3.webp", year: "2024" },
  { id: 4, image: "/awards/4.webp", year: "2024" },
  { id: 5, image: "/awards/5.webp", year: "2024" },
  { id: 6, image: "/awards/6.webp", year: "2024" },
  { id: 7, image: "/awards/7.webp", year: "2024" },
  { id: 8, image: "/awards/8.webp", year: "2024" },
  { id: 9, image: "/awards/9.webp", year: "2025" },
  { id: 10, image: "/awards/10.webp", year: "2024" },
  { id: 11, image: "/awards/11.webp", year: "2024" },
  { id: 12, image: "/awards/12.webp", year: "2024" },
  { id: 13, image: "/awards/13.webp", year: "2023" },
  { id: 14, image: "/awards/14.webp", year: "2023" },
  { id: 15, image: "/awards/15.webp", year: "2022" },
  { id: 16, image: "/awards/16.webp", year: "2024" },
  { id: 17, image: "/awards/17.webp", year: "2024" },
  { id: 18, image: "/awards/18.webp", year: "2024" },
  { id: 19, image: "/awards/19.webp", year: "2023" },
  { id: 20, image: "/awards/20.webp", year: "2020" },
  { id: 21, image: "/awards/21.webp", year: "2022" },
  { id: 22, image: "/awards/22.webp", year: "2022" },
  { id: 23, image: "/awards/23.webp", year: "2022" },
  { id: 24, image: "/awards/24.webp", year: "2022" },
  { id: 25, image: "/awards/25.webp", year: "2023" },
  { id: 26, image: "/awards/26.webp", year: "2023" },
  { id: 27, image: "/awards/27.webp", year: "2023" },
  { id: 28, image: "/awards/28.webp", year: "2023" },
  { id: 29, image: "/awards/29.webp", year: "2023" },
  { id: 30, image: "/awards/30.webp", year: "2023" },
  { id: 31, image: "/awards/31.webp", year: "2023" },
  { id: 32, image: "/awards/32.webp", year: "2022" },
  { id: 33, image: "/awards/33.webp", year: "2022" },
  { id: 34, image: "/awards/34.webp", year: "2024" },
  { id: 35, image: "/awards/35.webp", year: "2024" },
  { id: 36, image: "/awards/36.webp", year: "2024" },
  { id: 37, image: "/awards/37.webp", year: "2024" },
  { id: 38, image: "/awards/38.webp", year: "2023" },
  { id: 39, image: "/awards/39.webp", year: "2024" },
  { id: 40, image: "/awards/40.webp", year: "2023" },
  { id: 41, image: "/awards/41.webp", year: "2023" },
];

export const AWARD_YEARS = [...new Set(AWARDS_DATA.map((award) => award.year))].sort(
  (a, b) => Number(b) - Number(a)
);

/** Masonry pattern: wide → 3 standard → standard + wide-reverse → 2 standard (+ view more slot). */
export function getAwardLayout(index) {
  const position = index % 10;
  if (position === 0) return "wide";
  if (position === 6) return "wide-reverse";
  return "standard";
}

function getAwardsSectionItems(messages) {
  return (
    messages?.about?.["awards-section"]?.items ??
    messages?.["awards-section"]?.items ??
    {}
  );
}

export function buildRegionalAwardItems(messages, source = AWARDS_DATA) {
  const items = getAwardsSectionItems(messages);

  return source.map((award, index) => {
    const entry = items[String(award.id)] ?? {};
    const title = entry.title || entry.event || `Award ${award.id}`;
    const subtitle = entry.note || entry.event || "";

    return {
      key: `award-${award.id}`,
      id: award.id,
      year: award.year,
      image: award.image,
      layout: getAwardLayout(index),
      title,
      subtitle,
    };
  });
}

export default AWARDS_DATA;

import {
  fetchStrapiCollection,
  getStrapiLocaleCandidates,
  mapStrapiLocale,
} from "@/lib/strapi";

const LEARN_TYPE_POPULATE_ATTEMPTS = [
  {
    "populate[blog][fields][0]": "slug",
    "populate[blog][fields][1]": "title",
  },
  { populate: "blog" },
  { populate: "*" },
  {},
];

function normalizeLearnTypeRow(row) {
  if (!row) return null;

  const attrs = row.attributes ?? row;
  const blogData = attrs.blog?.data;

  return {
    id: row.id ?? attrs.id,
    slug: attrs.slug ?? "",
    name: attrs.name ?? attrs.title ?? "",
    mainCategory: attrs.mainCategory ?? null,
    blog: blogData
      ? {
          id: blogData.id,
          slug: blogData.attributes?.slug ?? blogData.slug ?? "",
          title: blogData.attributes?.title ?? blogData.title ?? "",
        }
      : null,
  };
}

async function fetchLearnTypeRows(locale, params, { cache = "no-store" } = {}) {
  const candidates = getStrapiLocaleCandidates(locale);

  for (const loc of candidates) {
    for (const populateParams of LEARN_TYPE_POPULATE_ATTEMPTS) {
      try {
        const res = await fetchStrapiCollection("learn-types", {
          locale: loc,
          populate: null,
          sort: "createdAt:asc",
          params: {
            ...params,
            ...populateParams,
          },
          cache,
        });

        const rows = Array.isArray(res?.data) ? res.data : [];
        if (rows.length) {
          return { rows, usedLocale: loc };
        }
      } catch {
        // try next populate / locale
      }
    }
  }

  return { rows: [], usedLocale: mapStrapiLocale(locale) };
}

/**
 * Learn-type categories for a knowledge hub material (mainCategory = material slug).
 */
export async function fetchLearnTypesByMainCategory(
  locale,
  mainCategory,
  { cache = "no-store" } = {}
) {
  if (!mainCategory) {
    return { items: [], usedLocale: mapStrapiLocale(locale) };
  }

  const { rows, usedLocale } = await fetchLearnTypeRows(
    locale,
    {
      "filters[mainCategory][$eq]": mainCategory,
      "pagination[pageSize]": 100,
    },
    { cache }
  );

  return {
    items: rows.map(normalizeLearnTypeRow).filter(Boolean),
    usedLocale,
  };
}

/**
 * Single learn-type by slug (section slug on knowledge hub).
 */
export async function fetchLearnTypeBySlug(
  locale,
  slug,
  { cache = "no-store" } = {}
) {
  const sectionSlug = String(slug || "").trim();
  if (!sectionSlug) return null;

  const { rows } = await fetchLearnTypeRows(
    locale,
    {
      "filters[slug][$eq]": sectionSlug,
      "pagination[pageSize]": 1,
    },
    { cache }
  );

  return rows[0] ? normalizeLearnTypeRow(rows[0]) : null;
}

/**
 * Map Strapi learn-types to section cards for SectionCardsGrid.
 */
export function mapLearnTypesToSections(learnTypes = [], materialSlug) {
  return learnTypes.map((item) => {
    const sectionSlug = item.slug;
    const articles = item.blog
      ? [
          {
            slug: item.blog.slug || sectionSlug,
            title: item.blog.title || item.name,
            href: `/knowledge-to-learn/${materialSlug}/${sectionSlug}/${item.blog.slug || sectionSlug}`,
          },
        ]
      : [];

    return {
      slug: sectionSlug,
      label: item.name,
      title: item.name,
      units: articles.length ? `${articles.length} unit${articles.length === 1 ? "" : "s"}` : "1 unit",
      articles,
    };
  });
}

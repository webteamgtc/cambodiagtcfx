"use client";

import { useEffect } from "react";

/**
 * Dev helper — logs in the browser console (Server Components only log in the terminal).
 */
export default function KnowledgeMaterialDebug({
  slug,
  learnTypes,
  sectionsFromApi,
  sections,
}) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    console.log("[knowledge-to-learn]", {
      slug,
      learnTypes,
      sectionsFromApi,
      sections,
    });
  }, [slug, learnTypes, sectionsFromApi, sections]);

  return null;
}

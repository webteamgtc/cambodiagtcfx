"use client";

import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

export default function GlossaryTermsGrid({ terms = [], loading = false }) {
  const t = usePathTranslation("glossaryPage");

  if (loading) {
    return (
      <section className="bg-white pb-14 md:pb-20">
        <div className="container">
          <p className="text-sm text-gray-500">
            {t("loadingTerms", "Loading glossary terms…")}
          </p>
        </div>
      </section>
    );
  }

  if (!terms.length) {
    return (
      <section className="bg-white pb-14 md:pb-20">
        <div className="container">
          <p className="text-sm text-gray-500">
            {t("noTerms", "No glossary entries for this letter yet.")}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white pb-14 md:pb-20">
      <div className="container">
        <div className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
          {terms.map(({ term, definition }) => (
            <div key={term}>
              <h3 className="text-base font-semibold text-[#000032]">{term}</h3>
              <p className="mt-1 text-sm text-gray-600">{definition}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

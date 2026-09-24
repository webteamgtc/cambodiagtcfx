"use client";

import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

export default function GlossaryHeader() {
  const t = usePathTranslation("glossaryPage");

  return (
    <section className="bg-white py-10 md:py-20">
      <div className="container">
        <h1 className="text-3xl font-bold text-[#000032] md:text-4xl">
          {t("title", "Trading glossary")}
        </h1>
        <p className="mt-2 text-gray-600">
          {t(
            "description",
            "Keep up to date with our collection of financial terms, abbreviations and definitions."
          )}
        </p>
      </div>
    </section>
  );
}

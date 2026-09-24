"use client";

import dynamic from "next/dynamic";
import FadeInSection from "./FadeInSection";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

const RegulationsPresenceMap = dynamic(
  () => import("./RegulationsPresenceMap"),
  {
    ssr: false,
    loading: () => (
      <div className="aspect-[1055/571] w-full animate-pulse rounded-xl border border-[#E1E7F6] bg-[#f8f9fc]" />
    ),
  }
);

export default function RegulationsPresenceSection() {
  const t = usePathTranslation("regulationsPage.presence");

  return (
    <section className="bg-white py-10 md:py-16">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl">
          <FadeInSection>
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#3347a8]">
                {t("eyebrow", "Global Presence")}
              </p>
              <h2 className="HeadingH1 mt-3 text-[#02002f]">
                {t("titleStart", "A brand with a")}{" "}
                <span className="text-[#3347a8]">{t("titleHighlight", "global")}</span>{" "}
                {t("titleEnd", "presence.")}
              </h2>
              <p className="TextSmall mx-auto mt-4 max-w-6xl font-normal leading-[1.7] text-[#5a5a6e]">
                {t(
                  "description",
                  "Our entities and affiliates operate within different legal and regulatory frameworks. Their respective roles, permitted services and geographic availability vary by jurisdiction. Each entity remains responsible for complying with the laws, licence conditions and regulatory requirements applicable to its own operations."
                )}
              </p>
            </div>
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <div className="mt-10">
              <RegulationsPresenceMap t={t} />
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

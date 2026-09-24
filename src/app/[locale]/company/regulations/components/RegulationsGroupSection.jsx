"use client";

import clsx from "clsx";
import FadeInSection from "./FadeInSection";
import { FiAlertTriangle, FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import { FaExclamation } from "react-icons/fa";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

const DISCLOSURE_ITEMS = [
  {
    key: "restricted",
    icon: FiAlertTriangle,
    iconClassName: "text-[#E8A54B]",
    iconWrapClassName: " bg-[#FFF8ED]",
    cardClassName: "border-[#F0E8D6] bg-[#FFFCF7]",
   
  },
  {
    key: "risk",
    icon: FaExclamation,
    iconClassName: "text-[#293B93]",
    iconWrapClassName: " bg-[#E1E7F6]",
    cardClassName: "border-[#E1E7F6] bg-white",
  },
  {
    key: "audit",
    icon: FiCheckCircle,
    iconClassName: "text-[#fff]",
    iconWrapClassName: " bg-[#04C120]",
    cardClassName: "border-[#E1E7F6] bg-white",
  },
];

function Flag({ code }) {
  return (
    <span className="inline-block h-3 w-4 overflow-hidden rounded-sm">
      <img src={`/flags/${code}.svg`} alt={code} className="h-full w-full object-cover" />
    </span>
  );
}

function DisclosureCard({ item }) {
  const t = usePathTranslation("regulationsPage.group.disclosures");
  const Icon = item.icon;

  return (
    <article
      className={clsx(
        "rounded-[10px] border p-5 sm:p-6",
        item.cardClassName
      )}
    >
      <div className="flex items-start gap-4">
        <span
          className={clsx(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px]",
            item.iconWrapClassName
          )}
        >
          <Icon className={clsx("h-5 w-5", item.iconClassName)} />
        </span>

        <div className="min-w-0 flex-1">
          <h3 className="HeadingH5 font-semibold text-[#000]">{t(`${item.key}.title`)}</h3>
          <p className="TextSmall mt-2 font-normal leading-[1.65] text-[#69729F]">
            {t(`${item.key}.description`)}
          </p>

          {item.tags?.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag.labelKey}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#B48755] bg-white px-3 py-1.5 TextSmall font-medium text-[#B48755]"
                >
                  {tag.code ? <Flag code={tag.code} /> : null}
                  {t(`${item.key}.tags.${tag.labelKey}`)}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}
export default function RegulationsGroupSection() {
  const t = usePathTranslation("regulationsPage.group");

  return (
    <section className="bg-white py-10 md:py-16">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Left */}
            <FadeInSection>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#3347a8]">{t("eyebrow", "Group Structure")}</p>
                <h2 className="HeadingH1 mt-3 text-[#02002f]">
                  {t("titleLine1", "About GTC")}<br /><span className="text-[#c9a227]">{t("titleLine2", "Financial Group.")}</span>
                </h2>

                <p className="mt-6 text-[15px] leading-[1.8] text-[#5a5a6e]">
                  {t(
                    "paragraph1",
                    "GTC Group LLC-FZ is incorporated in the United Arab Emirates. Together with its global affiliates it constitutes GTC Financial Group — a federation of five regulated entities, each independently licensed and operated in its home jurisdiction."
                  )}
                </p>
                <p className="mt-4 text-[15px] leading-[1.8] text-[#5a5a6e]">
                  {t(
                    "paragraph2",
                    "Every entity is a separate legal person, managed by experienced regional teams who report to local regulators. A license held by one entity does not extend to the others — and we make no claim that it does."
                  )}
                </p>

                <div className="mt-8 border-t border-dashed border-[#e8ecf8] pt-6">
                  <p className="text-sm leading-relaxed text-[#5a5a6e]">
                    {t(
                      "footnote",
                      "The specific contracting entity that will serve you is disclosed in your client agreement before any account is opened. If you would like to know which entity applies to your region, please contact our compliance team."
                    )}
                  </p>
                </div>
              </div>
            </FadeInSection>

            {/* Right — Cards */}
            <FadeInSection delay={0.15}>
              <div className="space-y-4 md:space-y-5">
                {DISCLOSURE_ITEMS.map((item) => (
                  <DisclosureCard key={item.key} item={item} />
                ))}
              </div>
            </FadeInSection>          </div>
        </div>
      </div>
    </section>
  );
}

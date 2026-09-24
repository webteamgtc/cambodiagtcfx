"use client";

import SectionEyebrow from "@/app/[locale]/components/common/SectionEyebrow";
import FadeInSection from "@/app/[locale]/company/contact-us/components/FadeInSection";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";
import { COVERAGE_EXCLUDED, COVERAGE_INCLUDED } from "../compensationFundData";

function HeaderCheckIcon() {
  return (
    <svg className="w-8 h-8 shrink-0" xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
      <circle opacity="0.1" cx="16.618" cy="16.618" r="16.618" fill="#04C120" />
      <path d="M27.9171 11.1901C27.9171 11.1901 24.301 12.3503 20.0823 16.9913C16.1649 21.1971 15.2609 22.9375 13.7542 25.2579C13.6035 25.1129 11.3434 20.9071 5.31665 17.8614L8.48071 14.9608C8.48071 14.9608 11.3434 16.8462 13.3021 20.3269C13.3021 20.3269 18.2742 12.9304 27.9171 9.30469V11.1901Z" fill="#04C120" />
    </svg>
  );
}

function HeaderCrossIcon() {
  return (
    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#cf444618] text-white">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M17.3043 13.5974L14.4187 10.6898L16.9951 8.62864C20.0553 6.18003 20.1556 5.70868 19.9536 5.2621C19.8162 4.95713 19.4947 4.84987 18.985 4.94334C17.1847 5.72295 15.4918 6.73011 13.9476 7.94019C13.5115 8.29557 13.0416 8.60718 12.5445 8.87051C12.1489 8.6672 10.8612 7.87569 9.19033 6.76683C5.78523 4.48438 5.46648 4.48438 5.34285 4.48438C4.96128 4.52936 4.61058 4.71622 4.36042 5.00784C4.17485 5.19413 4.06972 5.44575 4.06761 5.70868C4.09105 5.8377 4.14179 5.96021 4.21643 6.06802C4.29107 6.17584 4.38789 6.26645 4.5004 6.3338C6.47765 7.86447 9.25763 10.2362 10.023 10.9632C9.65327 11.4098 8.68463 12.4556 7.1154 14.0234L3.57031 17.5425L4.99933 18.6652C6.15913 19.5707 6.27458 19.5707 6.42694 19.5707C6.67021 19.5707 6.78426 19.5707 7.97 17.8365C8.8344 16.6391 9.76663 15.4921 10.7621 14.4013C11.2359 13.8682 11.7406 13.3635 12.2736 12.8897C13.2808 14.1388 14.5437 15.6695 15.6664 17.012C17.6301 19.348 17.6422 19.348 17.9103 19.348C18.0257 19.348 18.2042 19.348 19.415 18.3861L20.8812 17.2126L17.3043 13.5974Z" fill="#CF4447" />
      </svg>
    </span>
  );
}

function ListCheckIcon() {
  return (
    <svg className="w-5 h-5 mt-1 shrink-0" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 0C4.47715 0 0 4.47715 0 10C0 15.5229 4.47715 20 10 20C15.5229 20 20 15.5229 20 10C20 4.47715 15.5229 0 10 0ZM15.3002 7.48326L9.52575 14.8747C8.95032 15.6112 7.88991 15.6059 7.32783 14.856L4.56064 11.1646C4.22938 10.7226 4.31906 10.0959 4.76098 9.76461C5.2029 9.43336 5.82968 9.52304 6.16094 9.96495L8.42813 13.1564L13.7241 6.25196C14.0641 5.81676 14.6926 5.73957 15.1278 6.07957C15.563 6.41959 15.6402 7.04804 15.3002 7.48326Z" fill="#04C120" />
    </svg>
  );
}

function ListCrossIcon() {
  return (
    <svg className="w-5 h-5 mt-1 shrink-0" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 0C4.47727 0 0 4.47727 0 10C0 15.5227 4.47727 20 10 20C15.5227 20 20 15.5227 20 10C20 4.47727 15.5227 0 10 0ZM13.9709 12.98C14.0387 13.0444 14.093 13.1218 14.1304 13.2075C14.1679 13.2933 14.1878 13.3856 14.189 13.4792C14.1902 13.5727 14.1727 13.6656 14.1374 13.7522C14.1022 13.8389 14.0499 13.9176 13.9838 13.9838C13.9176 14.0499 13.8389 14.1022 13.7522 14.1374C13.6656 14.1727 13.5727 14.1902 13.4792 14.189C13.3856 14.1878 13.2933 14.1679 13.2075 14.1304C13.1218 14.093 13.0444 14.0387 12.98 13.9709L10.0045 10.9964L7.03 13.9709C6.89748 14.0968 6.72103 14.1659 6.53827 14.1636C6.3555 14.1613 6.18088 14.0876 6.05164 13.9584C5.92239 13.8291 5.84875 13.6545 5.8464 13.4717C5.84406 13.289 5.9132 13.1125 6.03909 12.98L9.01364 10.0045L6.03818 7.03C5.91707 6.89647 5.85199 6.72146 5.85643 6.54125C5.86086 6.36103 5.93447 6.18943 6.062 6.06202C6.18953 5.93461 6.36119 5.86116 6.54141 5.85689C6.72163 5.85262 6.89658 5.91786 7.03 6.03909L10.0045 9.01364L12.9791 6.03818C13.1122 5.91472 13.288 5.84765 13.4695 5.85107C13.6511 5.85448 13.8242 5.92812 13.9526 6.0565C14.081 6.18488 14.1546 6.35803 14.158 6.53956C14.1614 6.72109 14.0944 6.89688 13.9709 7.03L10.9964 10.0045L13.9709 12.98Z" fill="#CF4447" />
    </svg>
  );
}

function ScopeCard({ title, items, variant, t, titleKey, listPrefix }) {
  const isIncluded = variant === "included";

  return (
    <article
      className="h-full p-6 md:p-8"
      style={{

        borderRadius: "10px",
        border: "1px solid #E1E7F6",
        background: "#FFF",
      }}
    >
      <div className="flex items-center gap-3 pb-5">
        {isIncluded ? <HeaderCheckIcon /> : <HeaderCrossIcon />}
        <h3
          className={`HeadingH5 font-semibold ${isIncluded ? "text-[#04C120]" : "text-[#CF4447]"
            }`}
        >
          {t(titleKey, title)}
        </h3>
      </div>

      <ul className="mt-1">
        {items.map((item, index) => (
          <li
            key={`${listPrefix}-${index}`}
            className={`flex gap-5 py-4 ${index < items.length - 1 ? "border-b border-[#E1E7F6]" : ""
              }`}
          >
            {isIncluded ? <ListCheckIcon /> : <ListCrossIcon />}
            <span className="TextSmall font-normal leading-[1.65] text-[#000032]/70">
              {t(`${listPrefix}.${index}`, item)}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function CompensationFundProtectionScopeSection() {
  const t = usePathTranslation("compensationFundPage.protectionScope");

  return (
    <section className="bg-[#F8F9FC] py-8 md:py-16">
      <div className="container min-w-0 max-w-full">
        <div className="mx-auto max-w-6xl text-center">
          <FadeInSection>
            <SectionEyebrow variant="compact" className="capitalize">
              {t("eyebrow", "Coverage Scope")}
            </SectionEyebrow>

            <h2 className="HeadingH1 mx-auto mt-4 max-w-3xl font-semibold leading-[1.25] text-[#000]">
              {t("title", "Under what circumstances is protection guaranteed?")}
            </h2>

            <p className="Text mx-auto mt-5 max-w-5xl font-normal leading-[1.7] text-[#000032]/60">
              {t(
                "description",
                "The fund applies only to formal rulings made by the Financial Commission, and the clearly defined coverage ensures that the safeguard mechanism is transparent and predictable."
              )}
            </p>
          </FadeInSection>

          <div className="mt-10 grid gap-5 text-left md:mt-12 md:grid-cols-2 md:gap-6">
            <FadeInSection>
              <ScopeCard
                title="Coverage"
                titleKey="coverageTitle"
                items={COVERAGE_INCLUDED}
                listPrefix="included"
                variant="included"
                t={t}
              />
            </FadeInSection>

            <FadeInSection delay={0.1}>
              <ScopeCard
                title="Scope of Inapplicability"
                titleKey="excludedTitle"
                items={COVERAGE_EXCLUDED}
                listPrefix="excluded"
                variant="excluded"
                t={t}
              />
            </FadeInSection>
          </div>
        </div>
      </div>
    </section>
  );
}

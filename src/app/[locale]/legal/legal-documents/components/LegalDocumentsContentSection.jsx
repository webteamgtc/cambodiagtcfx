"use client";

import { useMemo, useState } from "react";
import { FiChevronDown, FiDownload, FiExternalLink } from "react-icons/fi";
import { FaFilePdf } from "react-icons/fa";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";
import { LEGAL_DOCUMENT_ENTITIES } from "../legalDocumentsData";

function PdfIcon({ className }) {
  return <FaFilePdf className={className || "h-4 w-4 text-[#E74C3C]"} aria-hidden />;
}

function DocumentRow({ doc, downloadLabel }) {
  return (
    <li>
      <a
        href={doc.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-start justify-between gap-4 rounded-xl border border-[#E8ECF4] bg-white px-4 py-3.5 transition hover:border-[#293B93]/35 hover:bg-[#F7F8FC]"
      >
        <span className="flex min-w-0 items-start gap-3">
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#FFF5F5]">
            <PdfIcon />
          </span>
          <span className="TextSmall font-medium leading-snug text-[#111827] group-hover:text-[#293B93]">
            {doc.name}
          </span>
        </span>
        <span className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold text-[#293B93]">
          <FiDownload className="h-3.5 w-3.5" aria-hidden />
          <span className="hidden sm:inline">{downloadLabel}</span>
          <FiExternalLink className="h-3.5 w-3.5 sm:hidden" aria-hidden />
        </span>
      </a>
    </li>
  );
}

function SectionAccordion({ section, isOpen, onToggle, downloadLabel }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#E1E7F6] bg-white shadow-sm">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 bg-[#293B93] px-5 py-4 text-left transition hover:bg-[#243575] md:px-6"
      >
        <span className="TextSmall font-semibold leading-snug text-white md:text-[15px]">
          {section.title}
        </span>
        <FiChevronDown
          className={`h-5 w-5 shrink-0 text-white transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden
        />
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <ul className="space-y-2.5 px-4 py-4 md:px-5 md:py-5">
            {section.items
              .filter((doc) => !doc.hidden)
              .map((doc) => (
              <DocumentRow
                key={`${doc.name}-${doc.link}`}
                doc={doc}
                downloadLabel={downloadLabel}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function LegalDocumentsContentSection() {
  const t = usePathTranslation("legalDocumentsPage.content");
  const [activeEntityKey, setActiveEntityKey] = useState(
    LEGAL_DOCUMENT_ENTITIES[0]?.key
  );
  const [openSectionIndex, setOpenSectionIndex] = useState(0);

  const activeEntity = useMemo(
    () =>
      LEGAL_DOCUMENT_ENTITIES.find((entity) => entity.key === activeEntityKey) ||
      LEGAL_DOCUMENT_ENTITIES[0],
    [activeEntityKey]
  );

  const downloadLabel = t("download", "Download");

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div
            role="tablist"
            aria-label={t("tabsLabel", "Legal entities")}
            className="flex w-max min-w-full gap-2 rounded-2xl border border-[#E1E7F6] bg-[#F8F9FC] p-2 sm:justify-center"
          >
            {LEGAL_DOCUMENT_ENTITIES.map((entity) => {
              const active = entity.key === activeEntityKey;
              return (
                <button
                  key={entity.key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    setActiveEntityKey(entity.key);
                    setOpenSectionIndex(0);
                  }}
                  className={[
                    "whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-semibold transition",
                    active
                      ? "bg-[#293B93] text-white shadow-sm"
                      : "text-[#555555] hover:bg-white hover:text-[#293B93]",
                  ].join(" ")}
                >
                  {t(`entities.${entity.key}.label`, entity.label)}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 space-y-4">
          {activeEntity?.sections?.map((section, index) => (
            <SectionAccordion
              key={`${activeEntity.key}-${section.title}`}
              section={section}
              isOpen={openSectionIndex === index}
              onToggle={() =>
                setOpenSectionIndex((prev) => (prev === index ? -1 : index))
              }
              downloadLabel={downloadLabel}
            />
          ))}
        </div>

        <p className="TextSmall mt-8 text-center text-[#888888]">
          {t(
            "footnote",
            "Documents open in a new tab. Policies may be updated periodically — always refer to the latest published version."
          )}
        </p>
      </div>
    </section>
  );
}

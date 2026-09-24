"use client";

import { useEffect } from "react";
import {
  buildSubmissionDetailRecord,
  DETAIL_SECTIONS,
  FIELD_LABELS,
  formatFieldValue,
  isDocumentLinkValue,
} from "./submissionDetailConfig";

function DetailRow({ label, value }) {
  if (value === "—") return null;

  let content = value;
  if (isDocumentLinkValue(value)) {
    const labelText = value.fileName || "View document";
    content = (
      <a
        href={value.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 font-medium text-[#293B93] underline hover:text-[#243575]"
      >
        {labelText}
        <span className="text-xs font-normal text-[#69729F] no-underline">(open)</span>
      </a>
    );
  }

  return (
    <div className="grid gap-1 border-b border-[#EEF2FF] py-3 sm:grid-cols-[minmax(0,220px)_1fr] sm:gap-4">
      <dt className="text-xs font-semibold uppercase tracking-wide text-[#69729F]">{label}</dt>
      <dd className="text-sm text-[#000032] break-words">{content}</dd>
    </div>
  );
}

export default function SubmissionDetailModal({ submission, onClose }) {
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!submission) return null;

  const record = buildSubmissionDetailRecord(submission);
  const title = record.fullName || submission.fullName || "Application details";
  const subtitle = record.applicationReference || submission.applicationReference || submission.id;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="submission-detail-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-[#000032]/50 backdrop-blur-[2px]"
        aria-label="Close dialog"
        onClick={onClose}
      />

      <div className="relative flex max-h-[min(90vh,820px)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-[#E1E7F6] bg-white shadow-[0_24px_60px_rgba(41,59,147,0.2)]">
        <div className="flex items-start justify-between gap-4 border-b border-[#EEF2FF] bg-[#293B93] px-5 py-4 text-white sm:px-6">
          <div className="min-w-0">
            <h2 id="submission-detail-title" className="truncate text-lg font-semibold">
              {title}
            </h2>
            <p className="mt-1 truncate text-sm text-white/80">{subtitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-full border border-white/30 px-3 py-1.5 text-sm font-medium hover:bg-white/10"
          >
            Close
          </button>
        </div>

        <div className="overflow-y-auto px-5 py-2 sm:px-6">
          {DETAIL_SECTIONS.map((section) => {
            const rows = section.keys
              .map((key) => ({
                key,
                label: FIELD_LABELS[key] || key,
                value: formatFieldValue(record[key]),
              }))
              .filter((row) => row.value !== "—" && row.value != null);

            if (rows.length === 0) return null;

            return (
              <section key={section.title} className="mb-6 last:mb-4">
                <h3 className="sticky top-0 z-10 bg-white py-3 text-sm font-semibold text-[#293B93]">
                  {section.title}
                </h3>
                <dl>
                  {rows.map((row) => (
                    <DetailRow key={row.key} label={row.label} value={row.value} />
                  ))}
                </dl>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}

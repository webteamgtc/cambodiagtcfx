import { FiShield } from "react-icons/fi";
import FormSection from "../FormSection";
import FieldWrapper, { TextInput } from "../FieldWrapper";
import { useStepFieldErrors } from "../formFields";
import { ATTACHED_DOCUMENT_TYPES } from "../../../constants/sercContent";
import { useSercFormTranslation } from "../../../i18n/useSercFormTranslation";

function getFileKeyForDocumentType(type) {
  return ATTACHED_DOCUMENT_TYPES.find((item) => item.value === type)?.fileKey ?? null;
}

function DocumentUploadButton({ file, onChange, chooseFileLabel, fileTypesLabel, error }) {
  const fileName = file instanceof File ? file.name : null;

  return (
    <div className="mt-4">
      <label
        className={`flex cursor-pointer flex-col items-center gap-2 rounded-lg border border-dashed px-4 py-5 text-center transition ${
          error
            ? "border-red-400 bg-red-50"
            : "border-[#C5CEE8] bg-[#F8F9FD] hover:border-[#293B93]"
        }`}
      >
        <span className="inline-flex h-10 min-w-[140px] items-center justify-center rounded-full bg-[#293B93] px-6 text-sm font-semibold text-white hover:bg-[#243575]">
          {chooseFileLabel}
        </span>
        <span className="text-xs text-[#69729F]">{fileTypesLabel}</span>
        {fileName ? <span className="text-xs font-medium text-[#000032]">{fileName}</span> : null}
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          className="sr-only"
          onChange={(e) => onChange(e.target.files?.[0] || null)}
        />
      </label>
      {error ? (
        <p className="mt-1.5 text-xs font-medium text-red-500" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default function IdentityInformationStep({
  values,
  errors,
  touched,
  showErrors,
  setFieldValue,
  handleChange,
  handleBlur,
}) {
  const { field, section, placeholder, t } = useSercFormTranslation();
  const fieldError = useStepFieldErrors(errors, touched, showErrors);

  const chooseFile = t("identity.uploadDocument", "Upload document");
  const fileTypes = t("identity.fileTypes", "PDF, JPG, or PNG");

  const selectedType = values.attachedDocumentType;
  const activeFileKey = getFileKeyForDocumentType(selectedType);
  const activeFile = activeFileKey ? values[activeFileKey] : null;

  const documentLabel = (doc) =>
    field(
      doc.labelKey,
      doc.value === "id-card"
        ? "Copied of ID card"
        : doc.value === "passport-visa"
          ? "Copied of Passport or Visa"
          : doc.value === "family-record"
            ? "Copied of Family record book"
            : "Others"
    );

  const renderDocumentRadio = (doc) => (
    <label key={doc.value} className="inline-flex cursor-pointer items-center gap-2 text-sm text-[#000032]">
      <input
        type="radio"
        name="attachedDocumentType"
        value={doc.value}
        checked={selectedType === doc.value}
        onChange={handleChange}
        className="h-4 w-4 border-[#E1E7F6] text-[#293B93] focus:ring-[#293B93]"
      />
      {documentLabel(doc)}
    </label>
  );

  const leftColumn = ATTACHED_DOCUMENT_TYPES.filter((d) => d.value === "id-card" || d.value === "family-record");
  const rightColumn = ATTACHED_DOCUMENT_TYPES.filter((d) => d.value === "passport-visa" || d.value === "others");

  return (
    <div>
      <FormSection icon="⑫" title={section("attachedDocuments", "Attached Documents for Account Registration")} required>
        <FieldWrapper error={fieldError("attachedDocumentType")}>
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-x-10">
            <div className="flex flex-col gap-3">{leftColumn.map(renderDocumentRadio)}</div>
            <div className="flex flex-col gap-3">{rightColumn.map(renderDocumentRadio)}</div>
          </div>
        </FieldWrapper>

        {selectedType === "others" ? (
          <div className="mt-2">
          <FieldWrapper error={fieldError("otherDocumentDescription")}>
            <TextInput
              name="otherDocumentDescription"
              value={values.otherDocumentDescription}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={placeholder("otherDocumentDescription", "Specify other documents")}
            />
          </FieldWrapper>
          </div>
        ) : null}

        {activeFileKey ? (
          <DocumentUploadButton
            file={activeFile}
            onChange={(file) => setFieldValue(activeFileKey, file)}
            chooseFileLabel={chooseFile}
            fileTypesLabel={fileTypes}
            error={fieldError(activeFileKey)}
          />
        ) : null}
      </FormSection>

      <div className="mb-6 overflow-hidden rounded-lg border border-[#E1E7F6] bg-white">
        <div className="flex flex-col items-center px-6 py-8 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#EEF2FF] text-[#293B93]">
            <FiShield className="h-7 w-7" aria-hidden />
          </div>
          <h3 className="mb-4 text-base font-semibold text-[#000032]">
            {section("thirdPartyVerification", "Third-Party Verification")}
          </h3>
          <button
            type="button"
            onClick={() => setFieldValue("thirdPartyVerificationStarted", true)}
            className="mb-4 w-full max-w-md rounded-full bg-[#EEF2FF] px-6 py-3 text-sm font-semibold text-[#293B93] transition hover:bg-[#E1E7F6]"
          >
            {t("identity.startVerification", "Start Verification")}
          </button>
          <p className="max-w-lg text-xs leading-relaxed text-[#69729F]">
            {t(
              "identity.verificationIntroScan",
              "Open the third-party verification page and scan the code to verify. After completion, wait a moment and refresh the page to check the result."
            )}
          </p>
          {values.thirdPartyVerificationStarted ? (
            <p className="mt-3 text-sm font-medium text-[#293B93]">
              {t(
                "identity.verificationStarted",
                "Verification started — complete the external flow, then continue."
              )}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

import FormSection from "../FormSection";
import FieldWrapper from "../FieldWrapper";
import { useStepFieldErrors } from "../formFields";
import { useSercFormTranslation } from "../../../i18n/useSercFormTranslation";

function FileUploadField({ label, required, error, file, onChange, chooseFileLabel, fileTypesLabel }) {
  const fileName = file instanceof File ? file.name : null;

  return (
    <FieldWrapper label={label} required={required} error={error}>
      <label className="flex cursor-pointer flex-col gap-2 rounded-lg border border-dashed border-[#C5CEE8] bg-[#F8F9FD] px-4 py-5 text-center transition hover:border-[#293B93]">
        <span className="text-sm font-medium text-[#293B93]">{chooseFileLabel}</span>
        <span className="text-xs text-[#69729F]">{fileTypesLabel}</span>
        {fileName ? <span className="text-xs font-medium text-[#000032]">{fileName}</span> : null}
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          className="sr-only"
          onChange={(e) => onChange(e.target.files?.[0] || null)}
        />
      </label>
    </FieldWrapper>
  );
}

export default function IdentityInformationStep({ values, errors, touched, showErrors, setFieldValue }) {
  const { field, section, t } = useSercFormTranslation();
  const fieldError = useStepFieldErrors(errors, touched, showErrors);

  const chooseFile = t("identity.chooseFile", "Choose file or drag here");
  const fileTypes = t("identity.fileTypes", "PDF, JPG, or PNG");

  return (
    <div>
      <FormSection icon="⑫" title={section("attachedDocuments", "Attached Documents for Account Registration")} required>
        <FileUploadField
          label={field("idCardCopy", "Copied of ID card")}
          required
          error={fieldError("idCardCopy")}
          file={values.idCardCopy}
          onChange={(file) => setFieldValue("idCardCopy", file)}
          chooseFileLabel={chooseFile}
          fileTypesLabel={fileTypes}
        />
        <FileUploadField
          label={field("passportVisaCopy", "Copied of Passport or Visa")}
          error={fieldError("passportVisaCopy")}
          file={values.passportVisaCopy}
          onChange={(file) => setFieldValue("passportVisaCopy", file)}
          chooseFileLabel={chooseFile}
          fileTypesLabel={fileTypes}
        />
        <FileUploadField
          label={field("familyRecordBookCopy", "Copied of Family record book")}
          error={fieldError("familyRecordBookCopy")}
          file={values.familyRecordBookCopy}
          onChange={(file) => setFieldValue("familyRecordBookCopy", file)}
          chooseFileLabel={chooseFile}
          fileTypesLabel={fileTypes}
        />
        <FileUploadField
          label={field("otherDocumentCopy", "Others")}
          error={fieldError("otherDocumentCopy")}
          file={values.otherDocumentCopy}
          onChange={(file) => setFieldValue("otherDocumentCopy", file)}
          chooseFileLabel={chooseFile}
          fileTypesLabel={fileTypes}
        />
      </FormSection>

      <FormSection title={section("thirdPartyVerification", "Third-Party Verification")}>
        <p className="text-sm text-[#69729F]">
          {t(
            "identity.verificationIntro",
            "Open the third-party verification page and complete identity verification. After completion, refresh this page to check the result."
          )}
        </p>
        <button
          type="button"
          onClick={() => setFieldValue("thirdPartyVerificationStarted", true)}
          className="mt-2 inline-flex h-11 items-center justify-center rounded-full bg-[#293B93] px-6 text-sm font-semibold text-white hover:bg-[#243575]"
        >
          {t("identity.startVerification", "Start Verification")}
        </button>
        {values.thirdPartyVerificationStarted ? (
          <p className="text-sm font-medium text-[#293B93]">
            {t(
              "identity.verificationStarted",
              "Verification started — complete the external flow, then continue."
            )}
          </p>
        ) : null}
      </FormSection>
    </div>
  );
}

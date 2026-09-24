import FormSection from "../FormSection";
import FieldWrapper from "../FieldWrapper";
import { useStepFieldErrors } from "../formFields";

function FileUploadField({ label, required, error, file, onChange }) {
  const fileName = file instanceof File ? file.name : null;

  return (
    <FieldWrapper label={label} required={required} error={error}>
      <label className="flex cursor-pointer flex-col gap-2 rounded-lg border border-dashed border-[#C5CEE8] bg-[#F8F9FD] px-4 py-5 text-center transition hover:border-[#293B93]">
        <span className="text-sm font-medium text-[#293B93]">Choose file or drag here</span>
        <span className="text-xs text-[#69729F]">PDF, JPG, or PNG</span>
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
  const fieldError = useStepFieldErrors(errors, touched, showErrors);

  return (
    <div>
      <FormSection icon="⑫" title="Attached Documents for Account Registration" required>
        <FileUploadField
          label="Copied of ID card"
          required
          error={fieldError("idCardCopy")}
          file={values.idCardCopy}
          onChange={(file) => setFieldValue("idCardCopy", file)}
        />
        <FileUploadField
          label="Copied of Passport or Visa"
          error={fieldError("passportVisaCopy")}
          file={values.passportVisaCopy}
          onChange={(file) => setFieldValue("passportVisaCopy", file)}
        />
        <FileUploadField
          label="Copied of Family record book"
          error={fieldError("familyRecordBookCopy")}
          file={values.familyRecordBookCopy}
          onChange={(file) => setFieldValue("familyRecordBookCopy", file)}
        />
        <FileUploadField
          label="Others"
          error={fieldError("otherDocumentCopy")}
          file={values.otherDocumentCopy}
          onChange={(file) => setFieldValue("otherDocumentCopy", file)}
        />
      </FormSection>

      <FormSection title="Third-Party Verification">
        <p className="text-sm text-[#69729F]">
          Open the third-party verification page and complete identity verification. After completion, refresh this
          page to check the result.
        </p>
        <button
          type="button"
          onClick={() => setFieldValue("thirdPartyVerificationStarted", true)}
          className="mt-2 inline-flex h-11 items-center justify-center rounded-full bg-[#293B93] px-6 text-sm font-semibold text-white hover:bg-[#243575]"
        >
          Start Verification
        </button>
        {values.thirdPartyVerificationStarted ? (
          <p className="text-sm font-medium text-[#293B93]">Verification started — complete the external flow, then continue.</p>
        ) : null}
      </FormSection>
    </div>
  );
}

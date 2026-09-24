import FormSection from "../FormSection";
import FieldWrapper, { TextInput, CheckboxField } from "../FieldWrapper";
import { useStepFieldErrors } from "../formFields";
import { CLIENT_AGREEMENT_PDF_URL } from "../../../constants/sercContent";

export default function ClientAgreementStep({
  values,
  errors,
  touched,
  showErrors,
  setFieldValue,
  handleChange,
  handleBlur,
}) {
  const fieldError = useStepFieldErrors(errors, touched, showErrors);

  return (
    <div>
      <FormSection title="Client's Agreement for Derivative Trading" required>
        <div className="rounded-lg border border-[#E1E7F6] bg-[#F8F9FD]">
          <div className="border-b border-[#E1E7F6] px-4 py-3 text-sm text-[#69729F]">
            Scroll inside the viewer to read all pages
          </div>
          <div className="flex min-h-[280px] flex-col items-center justify-center gap-3 p-6 text-center">
            <p className="text-sm font-medium text-[#000032]">កិច្ចព្រមព្រៀងពាណិជ្ជកម្មឧបករណ៍ដេរីវេទីវ</p>
            <p className="text-sm text-[#69729F]">
              Review the derivative trading client agreement before signing below.
            </p>
            <a
              href={CLIENT_AGREEMENT_PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-[#293B93] underline hover:text-[#243575]"
            >
              Open PDF in new tab
            </a>
          </div>
        </div>
      </FormSection>

      <FormSection title="Client Signature" required>
        <FieldWrapper
          label="Sign using mouse/touch screen or type your full legal name"
          required
          error={fieldError("clientSignature")}
        >
          <TextInput
            name="clientSignature"
            value={values.clientSignature}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Type your signature"
            className="bg-white font-serif text-lg italic"
          />
        </FieldWrapper>

        {values.clientSignature ? (
          <div className="rounded-lg border border-[#EEF2FF] bg-white px-4 py-3">
            <p className="text-xs text-[#69729F]">Signature preview</p>
            <p className="font-serif text-2xl text-[#293B93]">{values.clientSignature}</p>
          </div>
        ) : null}

        <FieldWrapper label="Attach signature file (optional)" error={fieldError("signatureFile")}>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            className="block w-full text-sm text-[#69729F] file:mr-4 file:rounded-full file:border-0 file:bg-[#293B93] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-[#243575]"
            onChange={(e) => setFieldValue("signatureFile", e.target.files?.[0] || null)}
          />
        </FieldWrapper>

        <CheckboxField
          label="I confirm that I have carefully read all of the above terms and conditions, including the risk awareness and disclosure statements. I guarantee that the information provided is true and valid, agree to sign a legally binding contract, and assume all corresponding legal responsibilities. I understand and agree that this electronic signature is equivalent to a handwritten signature."
          checked={values.agreementAccepted}
          onChange={(e) => setFieldValue("agreementAccepted", e.target.checked)}
          error={fieldError("agreementAccepted")}
        />

        <p className="text-xs leading-relaxed text-[#69729F]">
          Building No. 40, 8th floor, Street No. 289, Village 13, Sangkat Boeung Kak 1, Khan Toul Kork, Phnom Penh.
          Tel: 017 230 168 | Mobile: 0063 030 916 | Email: info@gtcfx.com.kh | Website: www.gtcfx.com.kh
        </p>
      </FormSection>
    </div>
  );
}

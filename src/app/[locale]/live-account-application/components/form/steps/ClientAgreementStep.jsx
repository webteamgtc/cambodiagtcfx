import FormSection from "../FormSection";
import FieldWrapper, { TextInput, CheckboxField } from "../FieldWrapper";
import { useStepFieldErrors } from "../formFields";
import { CLIENT_AGREEMENT_PDF_URL } from "../../../constants/sercContent";
import { useSercFormTranslation } from "../../../i18n/useSercFormTranslation";

export default function ClientAgreementStep({
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

  return (
    <div>
      <FormSection title={section("clientAgreementDerivative", "Client's Agreement for Derivative Trading")} required>
        <div className="rounded-lg border border-[#E1E7F6] bg-[#F8F9FD]">
          <div className="border-b border-[#E1E7F6] px-4 py-3 text-sm text-[#69729F]">
            {t("agreement.scrollHint", "Scroll inside the viewer to read all pages")}
          </div>
          <div className="bg-white">
            <p className="border-b border-[#E1E7F6] px-4 py-2 text-center text-sm font-medium text-[#000032]">
              {t("agreement.titleKhmer", "កិច្ចព្រមព្រៀងពាណិជ្ជកម្មឧបករណ៍ដេរីវេទីវ")}
            </p>
            <iframe
              title={t("agreement.titleKhmer", "កិច្ចព្រមព្រៀងពាណិជ្ជកម្មឧបករណ៍ដេរីវេទីវ")}
              src={`${CLIENT_AGREEMENT_PDF_URL}#view=FitH&toolbar=1`}
              className="block h-[min(520px,70vh)] w-full border-0"
            />
          </div>
        </div>
      </FormSection>

      <FormSection title={section("clientSignature", "Client Signature")} required>
        <FieldWrapper
          label={field("clientSignature", "Sign using mouse/touch screen or type your full legal name")}
          required
          error={fieldError("clientSignature")}
        >
          <TextInput
            name="clientSignature"
            value={values.clientSignature}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={placeholder("clientSignature", "Type your signature")}
            className="bg-white font-serif text-lg italic"
          />
        </FieldWrapper>

        {values.clientSignature ? (
          <div className="rounded-lg border border-[#EEF2FF] bg-white px-4 py-3">
            <p className="text-xs text-[#69729F]">{t("agreement.signaturePreview", "Signature preview")}</p>
            <p className="font-serif text-2xl text-[#293B93]">{values.clientSignature}</p>
          </div>
        ) : null}

        <FieldWrapper label={field("signatureFile", "Attach signature file (optional)")} error={fieldError("signatureFile")}>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            className="block w-full text-sm text-[#69729F] file:mr-4 file:rounded-full file:border-0 file:bg-[#293B93] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-[#243575]"
            onChange={(e) => setFieldValue("signatureFile", e.target.files?.[0] || null)}
          />
        </FieldWrapper>

        <CheckboxField
          label={field(
            "agreementAccepted",
            "I confirm that I have carefully read all of the above terms and conditions, including the risk awareness and disclosure statements. I guarantee that the information provided is true and valid, agree to sign a legally binding contract, and assume all corresponding legal responsibilities. I understand and agree that this electronic signature is equivalent to a handwritten signature."
          )}
          checked={values.agreementAccepted}
          onChange={(e) => setFieldValue("agreementAccepted", e.target.checked)}
          error={fieldError("agreementAccepted")}
        />

        <p className="text-xs leading-relaxed text-[#69729F]">
          {t(
            "agreement.footerAddress",
            "Building No. 40, 8th floor, Street No. 289, Village 13, Sangkat Boeung Kak 1, Khan Toul Kork, Phnom Penh. Tel: 017 230 168 | Mobile: 0063 030 916 | Email: info@gtcfx.com.kh | Website: www.gtcfx.com.kh"
          )}
        </p>
      </FormSection>
    </div>
  );
}

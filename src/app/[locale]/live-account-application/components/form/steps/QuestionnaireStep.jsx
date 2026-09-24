import FormSection from "../FormSection";
import FieldWrapper, { TextInput } from "../FieldWrapper";
import {
  YesNoField,
  RadioOptions,
  CheckboxOptions,
  useStepFieldErrors,
} from "../formFields";
import {
  EDUCATIONAL_LEVELS,
  DERIVATIVE_KNOWLEDGE_OPTIONS,
  INVESTMENT_OBJECTIVE_OPTIONS,
  CONTACT_PREFERENCE_OPTIONS,
} from "../../../constants/sercContent";
import { mapOptionLabels, useSercFormTranslation } from "../../../i18n/useSercFormTranslation";

function toggleArrayValue(current, value) {
  const list = current || [];
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

export default function QuestionnaireStep({
  values,
  errors,
  touched,
  showErrors,
  setFieldValue,
  handleChange,
  handleBlur,
}) {
  const { field, placeholder, section, option, t } = useSercFormTranslation();
  const fieldError = useStepFieldErrors(errors, touched, showErrors);

  const sexOptions = [
    { value: "male", label: t("common.male", "Male") },
    { value: "female", label: t("common.female", "Female") },
  ];

  const ownerOptions = [
    { value: "self", label: t("common.self", "Self") },
    { value: "other", label: t("common.otherPerson", "Other person") },
  ];

  const educationalOptions = mapOptionLabels(EDUCATIONAL_LEVELS, "educationalLevel", option);
  const derivativeOptions = mapOptionLabels(DERIVATIVE_KNOWLEDGE_OPTIONS, "derivativeKnowledge", option);
  const investmentOptions = mapOptionLabels(INVESTMENT_OBJECTIVE_OPTIONS, "investmentObjectives", option);
  const contactOptions = mapOptionLabels(CONTACT_PREFERENCE_OPTIONS, "contactPreferences", option);

  return (
    <div>
      <FormSection icon="③" title={section("educationalKnowledge", "Educational and Client Knowledge")} required>
        <RadioOptions
          label={field("educationalLevel", "Educational Level")}
          name="educationalLevel"
          value={values.educationalLevel}
          required
          error={fieldError("educationalLevel")}
          options={educationalOptions}
          onChange={handleChange}
        />

        <CheckboxOptions
          label={field("derivativeKnowledge", "Client Knowledge Related to Derivatives")}
          required
          error={fieldError("derivativeKnowledge")}
          values={values.derivativeKnowledge}
          options={derivativeOptions}
          onToggle={(value) => setFieldValue("derivativeKnowledge", toggleArrayValue(values.derivativeKnowledge, value))}
        />

        <CheckboxOptions
          label={field("investmentObjectives", "Investment Objective")}
          required
          error={fieldError("investmentObjectives")}
          values={values.investmentObjectives}
          options={investmentOptions}
          onToggle={(value) =>
            setFieldValue("investmentObjectives", toggleArrayValue(values.investmentObjectives, value))
          }
        />

        <YesNoField
          label={field("experienceOtherFinancialMarkets", "Experience in trading in other financial markets")}
          name="experienceOtherFinancialMarkets"
          value={values.experienceOtherFinancialMarkets}
          onChange={handleChange}
          error={fieldError("experienceOtherFinancialMarkets")}
          required
        />

        <YesNoField
          label={field("qualifiedInvestor", "Is the client a qualified investor?")}
          name="qualifiedInvestor"
          value={values.qualifiedInvestor}
          onChange={handleChange}
          error={fieldError("qualifiedInvestor")}
          required
        />
      </FormSection>

      <FormSection title={section("authorizedOwnership", "Authorized Person & Ownership")} required>
        <YesNoField
          label={field("hasAuthorizedPerson", "An Authorized Person")}
          name="hasAuthorizedPerson"
          value={values.hasAuthorizedPerson}
          onChange={handleChange}
          error={fieldError("hasAuthorizedPerson")}
          required
        />

        {values.hasAuthorizedPerson === "yes" && (
          <div className="grid gap-4 rounded-lg border border-[#EEF2FF] bg-[#F8F9FD] p-4 sm:grid-cols-2">
            <FieldWrapper label={field("authorizedPersonFullName", "Full Name")} required error={fieldError("authorizedPersonFullName")}>
              <TextInput
                name="authorizedPersonFullName"
                placeholder={placeholder("fullName", "Full name")}
                value={values.authorizedPersonFullName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </FieldWrapper>
            <FieldWrapper
              label={field("authorizedPersonFullNameLatin", "In Latin")}
              required
              error={fieldError("authorizedPersonFullNameLatin")}
            >
              <TextInput
                name="authorizedPersonFullNameLatin"
                placeholder={placeholder("fullNameLatin", "Full name in Latin")}
                value={values.authorizedPersonFullNameLatin}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </FieldWrapper>
            <RadioOptions
              label={field("authorizedPersonSex", "Sex")}
              name="authorizedPersonSex"
              value={values.authorizedPersonSex}
              required
              error={fieldError("authorizedPersonSex")}
              options={sexOptions}
              onChange={handleChange}
            />
            <FieldWrapper
              label={field("authorizedPersonAddress", "Current Address")}
              required
              error={fieldError("authorizedPersonAddress")}
            >
              <TextInput
                name="authorizedPersonAddress"
                placeholder={placeholder("currentAddress", "Current address")}
                value={values.authorizedPersonAddress}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </FieldWrapper>
            <FieldWrapper
              label={field("authorizedPersonPhone", "Contact Number")}
              required
              error={fieldError("authorizedPersonPhone")}
            >
              <TextInput
                name="authorizedPersonPhone"
                placeholder={placeholder("phone", "Phone number")}
                value={values.authorizedPersonPhone}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </FieldWrapper>
            <FieldWrapper label={field("authorizedPersonEmail", "Email")} required error={fieldError("authorizedPersonEmail")}>
              <TextInput
                type="email"
                name="authorizedPersonEmail"
                placeholder={placeholder("emailAddress", "Email address")}
                value={values.authorizedPersonEmail}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </FieldWrapper>
          </div>
        )}

        <RadioOptions
          label={field("beneficialOwner", "Beneficial Owner")}
          name="beneficialOwner"
          value={values.beneficialOwner}
          required
          error={fieldError("beneficialOwner")}
          options={ownerOptions}
          onChange={handleChange}
        />

        <RadioOptions
          label={field("controllingPerson", "Controlling Person")}
          name="controllingPerson"
          value={values.controllingPerson}
          required
          error={fieldError("controllingPerson")}
          options={ownerOptions}
          onChange={handleChange}
        />

        <YesNoField
          label={field("isPoliticallyExposed", "Politically Exposed Person (PEP)")}
          name="isPoliticallyExposed"
          value={values.isPoliticallyExposed}
          onChange={handleChange}
          error={fieldError("isPoliticallyExposed")}
          required
        />

        <CheckboxOptions
          label={field("contactPreferences", "Preferred Contact Method")}
          required
          error={fieldError("contactPreferences")}
          values={values.contactPreferences}
          options={contactOptions}
          onToggle={(value) =>
            setFieldValue("contactPreferences", toggleArrayValue(values.contactPreferences, value))
          }
        />

        <YesNoField
          label={field(
            "relationshipDerivativeBroker",
            "Does the client have any relationship with directors or employees of the derivative broker?"
          )}
          name="relationshipDerivativeBroker"
          value={values.relationshipDerivativeBroker}
          onChange={handleChange}
          error={fieldError("relationshipDerivativeBroker")}
          required
        />

        <YesNoField
          label={field(
            "relationshipCentralCounterparty",
            "Does the client have any relationship with a director or employee of the central counterparty?"
          )}
          name="relationshipCentralCounterparty"
          value={values.relationshipCentralCounterparty}
          onChange={handleChange}
          error={fieldError("relationshipCentralCounterparty")}
          required
        />
      </FormSection>
    </div>
  );
}

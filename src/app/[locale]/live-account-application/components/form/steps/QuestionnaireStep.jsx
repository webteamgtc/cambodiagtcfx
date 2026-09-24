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
  const fieldError = useStepFieldErrors(errors, touched, showErrors);

  return (
    <div>
      <FormSection icon="③" title="Educational and Client Knowledge" required>
        <RadioOptions
          label="Educational Level"
          name="educationalLevel"
          value={values.educationalLevel}
          required
          error={fieldError("educationalLevel")}
          options={EDUCATIONAL_LEVELS}
          onChange={handleChange}
        />

        <CheckboxOptions
          label="Client Knowledge Related to Derivatives"
          required
          error={fieldError("derivativeKnowledge")}
          values={values.derivativeKnowledge}
          options={DERIVATIVE_KNOWLEDGE_OPTIONS}
          onToggle={(value) => setFieldValue("derivativeKnowledge", toggleArrayValue(values.derivativeKnowledge, value))}
        />

        <CheckboxOptions
          label="Investment Objective"
          required
          error={fieldError("investmentObjectives")}
          values={values.investmentObjectives}
          options={INVESTMENT_OBJECTIVE_OPTIONS}
          onToggle={(value) =>
            setFieldValue("investmentObjectives", toggleArrayValue(values.investmentObjectives, value))
          }
        />

        <YesNoField
          label="Experience in trading in other financial markets"
          name="experienceOtherFinancialMarkets"
          value={values.experienceOtherFinancialMarkets}
          onChange={handleChange}
          error={fieldError("experienceOtherFinancialMarkets")}
          required
        />

        <YesNoField
          label="Is the client a qualified investor?"
          name="qualifiedInvestor"
          value={values.qualifiedInvestor}
          onChange={handleChange}
          error={fieldError("qualifiedInvestor")}
          required
        />
      </FormSection>

      <FormSection title="Authorized Person & Ownership" required>
        <YesNoField
          label="An Authorized Person"
          name="hasAuthorizedPerson"
          value={values.hasAuthorizedPerson}
          onChange={handleChange}
          error={fieldError("hasAuthorizedPerson")}
          required
        />

        {values.hasAuthorizedPerson === "yes" && (
          <div className="grid gap-4 rounded-lg border border-[#EEF2FF] bg-[#F8F9FD] p-4 sm:grid-cols-2">
            <FieldWrapper label="Full Name" required error={fieldError("authorizedPersonFullName")}>
              <TextInput
                name="authorizedPersonFullName"
                placeholder="Full name"
                value={values.authorizedPersonFullName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </FieldWrapper>
            <FieldWrapper label="In Latin" required error={fieldError("authorizedPersonFullNameLatin")}>
              <TextInput
                name="authorizedPersonFullNameLatin"
                placeholder="Full name in Latin"
                value={values.authorizedPersonFullNameLatin}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </FieldWrapper>
            <RadioOptions
              label="Sex"
              name="authorizedPersonSex"
              value={values.authorizedPersonSex}
              required
              error={fieldError("authorizedPersonSex")}
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
              ]}
              onChange={handleChange}
            />
            <FieldWrapper label="Current Address" required error={fieldError("authorizedPersonAddress")}>
              <TextInput
                name="authorizedPersonAddress"
                placeholder="Current address"
                value={values.authorizedPersonAddress}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </FieldWrapper>
            <FieldWrapper label="Contact Number" required error={fieldError("authorizedPersonPhone")}>
              <TextInput
                name="authorizedPersonPhone"
                placeholder="Phone number"
                value={values.authorizedPersonPhone}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </FieldWrapper>
            <FieldWrapper label="Email" required error={fieldError("authorizedPersonEmail")}>
              <TextInput
                type="email"
                name="authorizedPersonEmail"
                placeholder="Email address"
                value={values.authorizedPersonEmail}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </FieldWrapper>
          </div>
        )}

        <RadioOptions
          label="Beneficial Owner"
          name="beneficialOwner"
          value={values.beneficialOwner}
          required
          error={fieldError("beneficialOwner")}
          options={[
            { value: "self", label: "Self" },
            { value: "other", label: "Other person" },
          ]}
          onChange={handleChange}
        />

        <RadioOptions
          label="Controlling Person"
          name="controllingPerson"
          value={values.controllingPerson}
          required
          error={fieldError("controllingPerson")}
          options={[
            { value: "self", label: "Self" },
            { value: "other", label: "Other person" },
          ]}
          onChange={handleChange}
        />

        <YesNoField
          label="Politically Exposed Person (PEP)"
          name="isPoliticallyExposed"
          value={values.isPoliticallyExposed}
          onChange={handleChange}
          error={fieldError("isPoliticallyExposed")}
          required
        />

        <CheckboxOptions
          label="Preferred Contact Method"
          required
          error={fieldError("contactPreferences")}
          values={values.contactPreferences}
          options={CONTACT_PREFERENCE_OPTIONS}
          onToggle={(value) =>
            setFieldValue("contactPreferences", toggleArrayValue(values.contactPreferences, value))
          }
        />

        <YesNoField
          label="Does the client have any relationship with directors or employees of the derivative broker?"
          name="relationshipDerivativeBroker"
          value={values.relationshipDerivativeBroker}
          onChange={handleChange}
          error={fieldError("relationshipDerivativeBroker")}
          required
        />

        <YesNoField
          label="Does the client have any relationship with a director or employee of the central counterparty?"
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

import FormSection from "../FormSection";
import FieldWrapper, { TextInput, TextArea } from "../FieldWrapper";
import PersonContactFields from "../PersonContactFields";
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
  MARGIN_CALL_CONTACT_FIELDS,
  QUALIFIED_INVESTOR_CRITERIA,
} from "../../../constants/sercContent";
import { mapOptionLabels, useSercFormTranslation } from "../../../i18n/useSercFormTranslation";

function toggleArrayValue(current, value) {
  const list = current || [];
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

function ConditionalPanel({ children }) {
  return (
    <div className="rounded-lg border border-[#EEF2FF] bg-[#F8F9FD] p-4">{children}</div>
  );
}

function MarketExperienceBlock({ title, prefix, values, fieldError, handleChange, handleBlur, placeholder }) {
  const f = (suffix) => `${prefix}${suffix}`;

  return (
    <div className="space-y-3">
      <p className="text-xs font-bold uppercase tracking-wide text-[#69729F]">{title}</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <FieldWrapper error={fieldError(f("Name"))}>
          <TextInput
            name={f("Name")}
            value={values[f("Name")]}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={placeholder("marketName", "Market Name")}
          />
        </FieldWrapper>
        <FieldWrapper error={fieldError(f("ProductType"))}>
          <TextInput
            name={f("ProductType")}
            value={values[f("ProductType")]}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={placeholder("productType", "Product Type")}
          />
        </FieldWrapper>
        <FieldWrapper error={fieldError(f("Country"))}>
          <TextInput
            name={f("Country")}
            value={values[f("Country")]}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={placeholder("country", "Country")}
          />
        </FieldWrapper>
        <FieldWrapper error={fieldError(f("Year"))}>
          <TextInput
            name={f("Year")}
            value={values[f("Year")]}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={placeholder("year", "Year")}
          />
        </FieldWrapper>
      </div>
    </div>
  );
}

function MarginCallContactGrid({ values, fieldError, setFieldValue, handleChange, handleBlur, option, placeholder }) {
  const prefs = values.contactPreferences || [];

  const toggleContact = (contactValue, detailKey) => {
    const nextChecked = !prefs.includes(contactValue);
    setFieldValue("contactPreferences", toggleArrayValue(prefs, contactValue));
    if (!nextChecked && detailKey) {
      setFieldValue(detailKey, "");
    }
  };

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {MARGIN_CALL_CONTACT_FIELDS.map(({ value, detailKey, placeholderKey }) => {
        const label = option("contactPreferences", value, value);
        const checked = prefs.includes(value);
        const showDetail = checked && detailKey;

        return (
          <div key={value} className="space-y-2">
            <label className="flex cursor-pointer items-start gap-3 text-sm text-[#000032]">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggleContact(value, detailKey)}
                className="mt-0.5 h-4 w-4 rounded border-[#E1E7F6] text-[#293B93] focus:ring-[#293B93]"
              />
              <span>{label}</span>
            </label>
            {showDetail ? (
              <>
                <TextInput
                  name={detailKey}
                  value={values[detailKey] || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={
                  placeholderKey
                    ? placeholder(placeholderKey, placeholderKey)
                    : undefined
                }
                  aria-invalid={Boolean(fieldError(detailKey))}
                />
                {fieldError(detailKey) ? (
                  <p className="text-xs font-medium text-red-500" role="alert">
                    {fieldError(detailKey)}
                  </p>
                ) : null}
              </>
            ) : null}
          </div>
        );
      })}
      {fieldError("contactPreferences") ? (
        <p className="text-xs font-medium text-red-500 sm:col-span-2" role="alert">
          {fieldError("contactPreferences")}
        </p>
      ) : null}
    </div>
  );
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
  const noNever = t("common.noNever", "No Never");

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
  const qualifiedCriteriaOptions = mapOptionLabels(
    QUALIFIED_INVESTOR_CRITERIA,
    "qualifiedInvestorCriteria",
    option
  );

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

        <RadioOptions
          label={field("derivativeKnowledge", "Customer knowledge regarding derivatives")}
          name="derivativeKnowledge"
          value={values.derivativeKnowledge}
          required
          vertical
          error={fieldError("derivativeKnowledge")}
          options={derivativeOptions}
          onChange={handleChange}
        />
      </FormSection>

      <FormSection icon="④" title={section("investmentGoals", "Investment Goals")} required>
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
        {values.investmentObjectives?.includes("other") ? (
          <FieldWrapper
            label={field("investmentObjectiveOtherDetails", "Please specify other investment objective")}
            required
            error={fieldError("investmentObjectiveOtherDetails")}
          >
            <TextInput
              name="investmentObjectiveOtherDetails"
              value={values.investmentObjectiveOtherDetails}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={placeholder("investmentObjectiveOther", "Describe your objective")}
            />
          </FieldWrapper>
        ) : null}
      </FormSection>

      <FormSection icon="⑤" title={section("investmentExperiences", "Investment Experiences")} required>
        <YesNoField
          label={field("experienceOtherFinancialMarkets", "Experience in trading in other financial markets")}
          name="experienceOtherFinancialMarkets"
          value={values.experienceOtherFinancialMarkets}
          onChange={handleChange}
          error={fieldError("experienceOtherFinancialMarkets")}
          required
          noLabel={noNever}
        />
        {values.experienceOtherFinancialMarkets === "yes" ? (
          <ConditionalPanel>
            <div className="space-y-6">
              <MarketExperienceBlock
                title={t("questionnaire.market1", "MARKET 1")}
                prefix="financialMarket1"
                values={values}
                fieldError={fieldError}
                handleChange={handleChange}
                handleBlur={handleBlur}
                placeholder={placeholder}
              />
              <MarketExperienceBlock
                title={t("questionnaire.market2", "MARKET 2")}
                prefix="financialMarket2"
                values={values}
                fieldError={fieldError}
                handleChange={handleChange}
                handleBlur={handleBlur}
                placeholder={placeholder}
              />
            </div>
          </ConditionalPanel>
        ) : null}
      </FormSection>

      <FormSection icon="⑦" title={section("qualifiedInvestors", "Qualified Investors")} required>
        <YesNoField
          label={field("qualifiedInvestor", "Is the client a qualified investor?")}
          name="qualifiedInvestor"
          value={values.qualifiedInvestor}
          onChange={handleChange}
          error={fieldError("qualifiedInvestor")}
          required
        />
        {values.qualifiedInvestor === "yes" ? (
          <ConditionalPanel>
            <p className="mb-3 text-sm font-medium text-[#000032]">
              {field("qualifiedInvestorIfYes", "If Yes, please specify:")}
            </p>
            <CheckboxOptions
              error={fieldError("qualifiedInvestorCriteria")}
              values={values.qualifiedInvestorCriteria}
              options={qualifiedCriteriaOptions}
              onToggle={(value) =>
                setFieldValue("qualifiedInvestorCriteria", toggleArrayValue(values.qualifiedInvestorCriteria, value))
              }
            />
          </ConditionalPanel>
        ) : null}
      </FormSection>

      <FormSection icon="⑧" title={section("relationship", "Relationship")} required>
        <YesNoField
          label={field("hasAuthorizedPerson", "An Authorized Person")}
          name="hasAuthorizedPerson"
          value={values.hasAuthorizedPerson}
          onChange={handleChange}
          error={fieldError("hasAuthorizedPerson")}
          required
        />

        {values.hasAuthorizedPerson === "yes" ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <FieldWrapper error={fieldError("authorizedPersonName")}>
              <TextInput
                name="authorizedPersonName"
                value={values.authorizedPersonName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={placeholder("authorizedPersonName", "Please specify name")}
              />
            </FieldWrapper>
            <FieldWrapper error={fieldError("authorizedPersonRelationship")}>
              <TextInput
                name="authorizedPersonRelationship"
                value={values.authorizedPersonRelationship}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={placeholder("authorizedPersonRelationship", "Relationship to account owner")}
              />
            </FieldWrapper>
          </div>
        ) : null}

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
      </FormSection>

      <FormSection icon="⑨" title={section("moneyLaunderingRecord", "Money Laundering Record (Last 3 Years)")} required>
        <YesNoField
          label={field(
            "moneyLaunderingRecordLast3Years",
            "Any money laundering record or related regulatory action in the last 3 years?"
          )}
          name="moneyLaunderingRecordLast3Years"
          value={values.moneyLaunderingRecordLast3Years}
          onChange={handleChange}
          error={fieldError("moneyLaunderingRecordLast3Years")}
          required
          noLabel={noNever}
        />
        {values.moneyLaunderingRecordLast3Years === "yes" ? (
          <ConditionalPanel>
            <FieldWrapper
              label={field("moneyLaunderingRecordDetails", "Please provide details")}
              required
              error={fieldError("moneyLaunderingRecordDetails")}
            >
              <TextArea
                name="moneyLaunderingRecordDetails"
                value={values.moneyLaunderingRecordDetails}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </FieldWrapper>
          </ConditionalPanel>
        ) : null}
      </FormSection>

      <FormSection
        icon="⑩"
        title={section("marginCallContact", "Method of Contact in Case of Margin Call")}
        required
      >
        <MarginCallContactGrid
          values={values}
          fieldError={fieldError}
          setFieldValue={setFieldValue}
          handleChange={handleChange}
          handleBlur={handleBlur}
          option={option}
          placeholder={placeholder}
        />
      </FormSection>

      <FormSection icon="⑪" title={section("clientRelations", "Client Relations")} required>
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
        {values.relationshipDerivativeBroker === "yes" ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <FieldWrapper error={fieldError("derivativeBrokerEmployeeName")}>
              <TextInput
                name="derivativeBrokerEmployeeName"
                value={values.derivativeBrokerEmployeeName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={placeholder("directorEmployeeName", "Director or employee name")}
              />
            </FieldWrapper>
            <FieldWrapper error={fieldError("derivativeBrokerRelationship")}>
              <TextInput
                name="derivativeBrokerRelationship"
                value={values.derivativeBrokerRelationship}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={placeholder("relationshipAs", "As (Relationship)")}
              />
            </FieldWrapper>
          </div>
        ) : null}

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
        {values.relationshipCentralCounterparty === "yes" ? (
          <div className="grid gap-4 sm:grid-cols-3">
            <FieldWrapper error={fieldError("counterpartyEmployeeName")}>
              <TextInput
                name="counterpartyEmployeeName"
                value={values.counterpartyEmployeeName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={placeholder("directorEmployeeName", "Director or employee name")}
              />
            </FieldWrapper>
            <FieldWrapper error={fieldError("counterpartyCompanyName")}>
              <TextInput
                name="counterpartyCompanyName"
                value={values.counterpartyCompanyName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={placeholder("counterpartyName", "Central counterparty name")}
              />
            </FieldWrapper>
            <FieldWrapper error={fieldError("counterpartyRelationship")}>
              <TextInput
                name="counterpartyRelationship"
                value={values.counterpartyRelationship}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={placeholder("relationshipAs", "As (Relationship)")}
              />
            </FieldWrapper>
          </div>
        ) : null}
      </FormSection>

      <FormSection icon="⑬" title={section("emergencyContact", "Emergency Contact Person (Not a Client)")} required>
        <PersonContactFields
          prefix="emergencyContact"
          values={values}
          fieldError={fieldError}
          handleChange={handleChange}
          handleBlur={handleBlur}
          field={field}
          placeholder={placeholder}
          sexOptions={sexOptions}
        />
      </FormSection>
    </div>
  );
}

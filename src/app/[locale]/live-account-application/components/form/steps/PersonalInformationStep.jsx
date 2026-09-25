import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import FormSection from "../FormSection";
import FieldWrapper, { TextInput, SelectInput, DateInput } from "../FieldWrapper";
import { YesNoField, RadioOptions, CheckboxOptions, useStepFieldErrors } from "../formFields";
import { hasFieldError } from "../formUtils";
import PersonContactFields from "../PersonContactFields";
import {
  EMPLOYMENT_STATUS,
  YEARS_WORKING_EXPERIENCE,
  MONTHLY_INCOME_AFTER_TAX_RANGES,
  OTHER_INCOME_SOURCE_OPTIONS,
} from "../../../constants/sercContent";
import { mapOptionLabels, useSercFormTranslation } from "../../../i18n/useSercFormTranslation";

function toggleArrayValue(current, value) {
  const list = current || [];
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

export default function PersonalInformationStep({
  values,
  errors,
  touched,
  showErrors,
  setFieldValue,
  setFieldTouched,
  handleChange,
  handleBlur,
}) {
  const { field, placeholder, section, option, t } = useSercFormTranslation();
  const fieldError = useStepFieldErrors(errors, touched, showErrors);
  const monthlyIncomeRangeOptions = mapOptionLabels(
    MONTHLY_INCOME_AFTER_TAX_RANGES,
    "monthlyIncomeAfterTax",
    option
  );
  const otherIncomeOptions = mapOptionLabels(OTHER_INCOME_SOURCE_OPTIONS, "otherIncomeSources", option);

  const maxDateOfBirth = new Date(Date.now() - 18 * 365.25 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];
  const minExpirationDate = new Date().toISOString().split("T")[0];

  const sexOptions = [
    { value: "male", label: t("common.male", "Male") },
    { value: "female", label: t("common.female", "Female") },
  ];

  return (
    <div>
      <FormSection icon="①" title={section("clientInformation", "Client Information")} required>
        <FieldWrapper label={field("fullName", "Client Name (First and Last Name)")} required error={fieldError("fullName")}>
          <TextInput
            name="fullName"
            placeholder={placeholder("fullName", "Full name")}
            value={values.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </FieldWrapper>

        <FieldWrapper label={field("fullNameLatin", "In Latin")} required error={fieldError("fullNameLatin")}>
          <TextInput
            name="fullNameLatin"
            placeholder={placeholder("fullNameLatin", "Full name in Latin")}
            value={values.fullNameLatin}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </FieldWrapper>

        <YesNoField
          label={field("previousName", "Previous Name")}
          name="hasPreviousName"
          value={values.hasPreviousName}
          onChange={handleChange}
          error={fieldError("hasPreviousName")}
          required
          noLabel={t("common.noNever", "No Never")}
        />

        {values.hasPreviousName === "yes" && (
          <FieldWrapper label={field("previousName", "Previous Name")} required error={fieldError("previousName")}>
            <TextInput
              name="previousName"
              value={values.previousName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FieldWrapper>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <FieldWrapper label={field("dateOfBirth", "Date of Birth")} required error={fieldError("dateOfBirth")}>
            <DateInput
              name="dateOfBirth"
              value={values.dateOfBirth}
              max={maxDateOfBirth}
              enableYearSelect
              placeholder={placeholder("dateOfBirth", "Select date of birth")}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FieldWrapper>

          <FieldWrapper label={field("nationality", "Nationality")} required error={fieldError("nationality")}>
            <TextInput
              name="nationality"
              placeholder={placeholder("nationality", "Nationality")}
              value={values.nationality}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FieldWrapper>
        </div>

        <RadioOptions
          label={field("sex", "Sex")}
          name="sex"
          value={values.sex}
          required
          error={fieldError("sex")}
          options={sexOptions}
          onChange={handleChange}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <FieldWrapper
            label={field("idPassportNumber", "Identity Card / Passport Number")}
            required
            error={fieldError("idPassportNumber")}
          >
            <TextInput
              name="idPassportNumber"
              placeholder={placeholder("idPassportNumber", "ID / Passport number")}
              value={values.idPassportNumber}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FieldWrapper>

          <FieldWrapper label={field("issuedBy", "Issued By")} required error={fieldError("issuedBy")}>
            <TextInput
              name="issuedBy"
              placeholder={placeholder("issuedBy", "Issuing authority")}
              value={values.issuedBy}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FieldWrapper>

          <FieldWrapper label={field("expirationDate", "Expiration Date")} required error={fieldError("expirationDate")}>
            <DateInput
              name="expirationDate"
              value={values.expirationDate}
              min={minExpirationDate}
              enableYearSelect
              yearDropdownItemNumber={30}
              placeholder={placeholder("expirationDate", "Select expiration date")}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FieldWrapper>
        </div>

        <FieldWrapper label={field("currentAddress", "Current Address")} required error={fieldError("currentAddress")}>
          <TextInput
            name="currentAddress"
            placeholder={placeholder("currentAddress", "Current address")}
            value={values.currentAddress}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </FieldWrapper>

        <FieldWrapper label={field("permanentAddress", "Permanent Address")} required error={fieldError("permanentAddress")}>
          <TextInput
            name="permanentAddress"
            placeholder={placeholder("permanentAddress", "Permanent address")}
            value={values.permanentAddress}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </FieldWrapper>

        <div className="grid gap-4 sm:grid-cols-2">
          <FieldWrapper label={field("phone", "Personal Contact Number")} required error={fieldError("phone")}>
            <div aria-invalid={hasFieldError(errors, "phone", showErrors, touched)} data-phone-wrapper>
              <PhoneInput
                international
                defaultCountry="KH"
                value={values.phone}
                onChange={(value) => setFieldValue("phone", value || "")}
                onBlur={() => setFieldTouched("phone", true)}
                className={`serc-phone ${hasFieldError(errors, "phone", showErrors, touched) ? "phone-error" : ""}`}
              />
            </div>
          </FieldWrapper>

          <FieldWrapper label={field("email", "Email")} required error={fieldError("email")}>
            <TextInput
              type="email"
              name="email"
              placeholder={placeholder("email", "Email")}
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FieldWrapper>
        </div>

      </FormSection>

      <FormSection icon="②" title={section("spouse", "Spouse")} required>
        <YesNoField
          label={field("hasSpouse", "Do you have a spouse?")}
          name="hasSpouse"
          value={values.hasSpouse}
          onChange={handleChange}
          error={fieldError("hasSpouse")}
          required
        />
        {values.hasSpouse === "yes" ? (
          <PersonContactFields
            prefix="spouse"
            values={values}
            fieldError={fieldError}
            handleChange={handleChange}
            handleBlur={handleBlur}
            field={field}
            placeholder={placeholder}
            sexOptions={sexOptions}
          />
        ) : null}
      </FormSection>

      <FormSection icon="⑥" title={section("monthlyIncome", "Monthly Income")} required>
        <YesNoField
          name="hasMonthlyIncome"
          value={values.hasMonthlyIncome}
          onChange={handleChange}
          error={fieldError("hasMonthlyIncome")}
          required
          hideLabel
        />
        {values.hasMonthlyIncome === "yes" ? (
          <div className="space-y-4 rounded-lg border border-[#EEF2FF] bg-[#F8F9FD] p-4">
            <RadioOptions
              label={field("monthlyIncomeAfterTax", "Monthly income after Tax deduction ($)")}
              name="monthlyIncomeAfterTax"
              value={values.monthlyIncomeAfterTax}
              required
              vertical
              error={fieldError("monthlyIncomeAfterTax")}
              options={monthlyIncomeRangeOptions}
              onChange={handleChange}
            />
            <CheckboxOptions
              label={field("otherIncomeSources", "Source of other income (if any)")}
              error={fieldError("otherIncomeSources")}
              values={values.otherIncomeSources}
              options={otherIncomeOptions}
              onToggle={(value) =>
                setFieldValue("otherIncomeSources", toggleArrayValue(values.otherIncomeSources, value))
              }
            />
            {values.otherIncomeSources?.includes("others") ? (
              <FieldWrapper
                label={field("otherIncomeSourceDetails", "Please specify other income source")}
                required
                error={fieldError("otherIncomeSourceDetails")}
              >
                <TextInput
                  name="otherIncomeSourceDetails"
                  value={values.otherIncomeSourceDetails}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={placeholder("otherIncomeSourceDetails", "Describe other income source")}
                />
              </FieldWrapper>
            ) : null}
          </div>
        ) : null}
      </FormSection>

      <FormSection title={section("employmentFinancialInformation", "Employment & Financial Information")} required>
        <FieldWrapper label={field("employmentStatus", "Employment Status")} required error={fieldError("employmentStatus")}>
          <SelectInput
            name="employmentStatus"
            value={values.employmentStatus}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="">{placeholder("selectEmploymentStatus", "Please select Employment Status")}</option>
            {EMPLOYMENT_STATUS.map((status) => (
              <option key={status} value={status}>
                {option("employmentStatus", status, status)}
              </option>
            ))}
          </SelectInput>
        </FieldWrapper>

        <div className="grid gap-4 sm:grid-cols-2">
          <FieldWrapper label={field("industry", "Industry")} required error={fieldError("industry")}>
            <TextInput
              name="industry"
              placeholder={placeholder("industry", "Please enter Industry")}
              value={values.industry}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FieldWrapper>

          <FieldWrapper label={field("occupation", "Occupation / Job title")} required error={fieldError("occupation")}>
            <TextInput
              name="occupation"
              placeholder={placeholder("occupation", "Please enter Occupation / Job title")}
              value={values.occupation}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FieldWrapper>

          <FieldWrapper
            label={field("employerName", "Name of Employer / Business")}
            required
            error={fieldError("employerName")}
          >
            <TextInput
              name="employerName"
              placeholder={placeholder("employerName", "Please enter Name of Employer / Business")}
              value={values.employerName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FieldWrapper>

          <FieldWrapper label={field("workplaceAddress", "Workplace Address")} required error={fieldError("workplaceAddress")}>
            <TextInput
              name="workplaceAddress"
              placeholder={placeholder("workplaceAddress", "Please enter Workplace address")}
              value={values.workplaceAddress}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FieldWrapper>

          <FieldWrapper
            label={field("workplaceContact", "Workplace Contact Number")}
            required
            error={fieldError("workplaceContact")}
          >
            <TextInput
              name="workplaceContact"
              placeholder={placeholder("workplaceContact", "Please enter contact number")}
              value={values.workplaceContact}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FieldWrapper>

          <FieldWrapper label={field("workingPeriod", "Working Period")} required error={fieldError("workingPeriod")}>
            <TextInput
              name="workingPeriod"
              placeholder={placeholder("workingPeriod", "e.g. 3 years")}
              value={values.workingPeriod}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FieldWrapper>

          <FieldWrapper
            label={field("yearsWorkingExperience", "Years of Working Experience")}
            required
            error={fieldError("yearsWorkingExperience")}
          >
            <SelectInput
              name="yearsWorkingExperience"
              value={values.yearsWorkingExperience}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="">{placeholder("selectYearsExperience", "Please select Years of Working Experience")}</option>
              {YEARS_WORKING_EXPERIENCE.map((item) => (
                <option key={item} value={item}>
                  {option("yearsWorkingExperience", item, item)}
                </option>
              ))}
            </SelectInput>
          </FieldWrapper>
        </div>
      </FormSection>
    </div>
  );
}

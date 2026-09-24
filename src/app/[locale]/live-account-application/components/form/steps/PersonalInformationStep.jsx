import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import FormSection from "../FormSection";
import FieldWrapper, { TextInput, SelectInput, DateInput } from "../FieldWrapper";
import { YesNoField, RadioOptions, useStepFieldErrors } from "../formFields";
import { hasFieldError } from "../formUtils";
import { EMPLOYMENT_STATUS, YEARS_WORKING_EXPERIENCE } from "../../../constants/sercContent";
import { useSercFormTranslation } from "../../../i18n/useSercFormTranslation";

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

        <YesNoField
          label={field("hasSpouse", "Do you have a spouse?")}
          name="hasSpouse"
          value={values.hasSpouse}
          onChange={handleChange}
          error={fieldError("hasSpouse")}
          required
        />
      </FormSection>

      <FormSection icon="②" title={section("employmentInformation", "Employment Information")} required>
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

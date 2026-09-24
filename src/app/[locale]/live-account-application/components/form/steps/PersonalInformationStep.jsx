import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import FormSection from "../FormSection";
import FieldWrapper, { TextInput, SelectInput, DateInput } from "../FieldWrapper";
import { YesNoField, RadioOptions, useStepFieldErrors } from "../formFields";
import { hasFieldError } from "../formUtils";
import { EMPLOYMENT_STATUS, YEARS_WORKING_EXPERIENCE } from "../../../constants/sercContent";

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
  const fieldError = useStepFieldErrors(errors, touched, showErrors);

  const maxDateOfBirth = new Date(Date.now() - 18 * 365.25 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];
  const minExpirationDate = new Date().toISOString().split("T")[0];

  return (
    <div>
      <FormSection icon="①" title="Client Information" required>
        <FieldWrapper label="Client Name (First and Last Name)" required error={fieldError("fullName")}>
          <TextInput
            name="fullName"
            placeholder="Full name"
            value={values.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </FieldWrapper>

        <FieldWrapper label="In Latin" required error={fieldError("fullNameLatin")}>
          <TextInput
            name="fullNameLatin"
            placeholder="Full name in Latin"
            value={values.fullNameLatin}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </FieldWrapper>

        <YesNoField
          label="Previous Name"
          name="hasPreviousName"
          value={values.hasPreviousName}
          onChange={handleChange}
          error={fieldError("hasPreviousName")}
          required
        />

        {values.hasPreviousName === "yes" && (
          <FieldWrapper label="Previous Name" required error={fieldError("previousName")}>
            <TextInput
              name="previousName"
              value={values.previousName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FieldWrapper>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <FieldWrapper label="Date of Birth" required error={fieldError("dateOfBirth")}>
            <DateInput
              name="dateOfBirth"
              value={values.dateOfBirth}
              max={maxDateOfBirth}
              enableYearSelect
              placeholder="Select date of birth"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FieldWrapper>

          <FieldWrapper label="Nationality" required error={fieldError("nationality")}>
            <TextInput
              name="nationality"
              placeholder="Nationality"
              value={values.nationality}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FieldWrapper>
        </div>

        <RadioOptions
          label="Sex"
          name="sex"
          value={values.sex}
          required
          error={fieldError("sex")}
          options={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
          ]}
          onChange={handleChange}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <FieldWrapper label="Identity Card / Passport Number" required error={fieldError("idPassportNumber")}>
            <TextInput
              name="idPassportNumber"
              placeholder="ID / Passport number"
              value={values.idPassportNumber}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FieldWrapper>

          <FieldWrapper label="Issued By" required error={fieldError("issuedBy")}>
            <TextInput
              name="issuedBy"
              placeholder="Issuing authority"
              value={values.issuedBy}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FieldWrapper>

          <FieldWrapper label="Expiration Date" required error={fieldError("expirationDate")}>
            <DateInput
              name="expirationDate"
              value={values.expirationDate}
              min={minExpirationDate}
              placeholder="Select expiration date"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FieldWrapper>
        </div>

        <FieldWrapper label="Current Address" required error={fieldError("currentAddress")}>
          <TextInput
            name="currentAddress"
            placeholder="Current address"
            value={values.currentAddress}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </FieldWrapper>

        <FieldWrapper label="Permanent Address" required error={fieldError("permanentAddress")}>
          <TextInput
            name="permanentAddress"
            placeholder="Permanent address"
            value={values.permanentAddress}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </FieldWrapper>

        <div className="grid gap-4 sm:grid-cols-2">
          <FieldWrapper label="Personal Contact Number" required error={fieldError("phone")}>
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

          <FieldWrapper label="Email" required error={fieldError("email")}>
            <TextInput
              type="email"
              name="email"
              placeholder="Email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FieldWrapper>
        </div>

        <YesNoField
          label="Do you have a spouse?"
          name="hasSpouse"
          value={values.hasSpouse}
          onChange={handleChange}
          error={fieldError("hasSpouse")}
          required
        />
      </FormSection>

      <FormSection icon="②" title="Employment Information" required>
        <FieldWrapper label="Employment Status" required error={fieldError("employmentStatus")}>
          <SelectInput
            name="employmentStatus"
            value={values.employmentStatus}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="">Please select Employment Status</option>
            {EMPLOYMENT_STATUS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </SelectInput>
        </FieldWrapper>

        <div className="grid gap-4 sm:grid-cols-2">
          <FieldWrapper label="Industry" required error={fieldError("industry")}>
            <TextInput
              name="industry"
              placeholder="Please enter Industry"
              value={values.industry}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FieldWrapper>

          <FieldWrapper label="Occupation / Job title" required error={fieldError("occupation")}>
            <TextInput
              name="occupation"
              placeholder="Please enter Occupation / Job title"
              value={values.occupation}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FieldWrapper>

          <FieldWrapper label="Name of Employer / Business" required error={fieldError("employerName")}>
            <TextInput
              name="employerName"
              placeholder="Please enter Name of Employer / Business"
              value={values.employerName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FieldWrapper>

          <FieldWrapper label="Workplace Address" required error={fieldError("workplaceAddress")}>
            <TextInput
              name="workplaceAddress"
              placeholder="Please enter Workplace address"
              value={values.workplaceAddress}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FieldWrapper>

          <FieldWrapper label="Workplace Contact Number" required error={fieldError("workplaceContact")}>
            <TextInput
              name="workplaceContact"
              placeholder="Please enter contact number"
              value={values.workplaceContact}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FieldWrapper>

          <FieldWrapper label="Working Period" required error={fieldError("workingPeriod")}>
            <TextInput
              name="workingPeriod"
              placeholder="e.g. 3 years"
              value={values.workingPeriod}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FieldWrapper>

          <FieldWrapper label="Years of Working Experience" required error={fieldError("yearsWorkingExperience")}>
            <SelectInput
              name="yearsWorkingExperience"
              value={values.yearsWorkingExperience}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="">Please select Years of Working Experience</option>
              {YEARS_WORKING_EXPERIENCE.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </SelectInput>
          </FieldWrapper>
        </div>
      </FormSection>
    </div>
  );
}

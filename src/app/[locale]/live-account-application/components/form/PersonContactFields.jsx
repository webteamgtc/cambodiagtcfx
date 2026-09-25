import FieldWrapper, { TextInput } from "./FieldWrapper";
import { RadioOptions } from "./formFields";

/** Reusable name / Latin / sex / address / phone / email block (spouse, emergency contact, etc.). */
export default function PersonContactFields({
  prefix,
  values,
  fieldError,
  handleChange,
  handleBlur,
  field,
  placeholder,
  sexOptions,
}) {
  const n = (key) => `${prefix}${key}`;

  return (
    <div className="grid gap-4 rounded-lg border border-[#EEF2FF] bg-[#F8F9FD] p-4 sm:grid-cols-2">
      <FieldWrapper label={field("fullName", "Full Name")} required error={fieldError(n("FullName"))}>
        <TextInput
          name={n("FullName")}
          placeholder={placeholder("fullName", "Full name")}
          value={values[n("FullName")]}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FieldWrapper>
      <FieldWrapper label={field("fullNameLatin", "In Latin")} required error={fieldError(n("FullNameLatin"))}>
        <TextInput
          name={n("FullNameLatin")}
          placeholder={placeholder("fullNameLatin", "Full name in Latin")}
          value={values[n("FullNameLatin")]}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FieldWrapper>
      <RadioOptions
        label={field("sex", "Sex")}
        name={n("Sex")}
        value={values[n("Sex")]}
        required
        error={fieldError(n("Sex"))}
        options={sexOptions}
        onChange={handleChange}
      />
      <FieldWrapper label={field("currentAddress", "Current Address")} required error={fieldError(n("Address"))}>
        <TextInput
          name={n("Address")}
          placeholder={placeholder("currentAddress", "Current address")}
          value={values[n("Address")]}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FieldWrapper>
      <FieldWrapper label={field("phone", "Contact Number")} required error={fieldError(n("Phone"))}>
        <TextInput
          name={n("Phone")}
          placeholder={placeholder("phone", "Phone number")}
          value={values[n("Phone")]}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FieldWrapper>
      <FieldWrapper label={field("email", "Email")} required error={fieldError(n("Email"))}>
        <TextInput
          type="email"
          name={n("Email")}
          placeholder={placeholder("emailAddress", "Email address")}
          value={values[n("Email")]}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FieldWrapper>
    </div>
  );
}

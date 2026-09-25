import FieldWrapper from "./FieldWrapper";
import { getFieldError } from "./formUtils";
import { useSercFormTranslation } from "../../i18n/useSercFormTranslation";

export function useStepFieldErrors(errors, touched, showErrors) {
  return (name) => getFieldError(errors, name, showErrors, touched);
}

export function YesNoField({ label, name, value, onChange, error, required, noLabel, hideLabel }) {
  const { t } = useSercFormTranslation();
  const options = [
    { value: "no", label: noLabel ?? t("common.no", "No") },
    { value: "yes", label: t("common.yes", "Yes") },
  ];

  return (
    <FieldWrapper label={hideLabel ? undefined : label} required={required} error={error}>
      <div className="flex flex-wrap gap-4">
        {options.map((opt) => (
          <label key={opt.value} className="inline-flex cursor-pointer items-center gap-2 text-sm text-[#000032]">
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={onChange}
              className="h-4 w-4 border-[#E1E7F6] text-[#293B93] focus:ring-[#293B93]"
            />
            {opt.label}
          </label>
        ))}
      </div>
    </FieldWrapper>
  );
}

export function RadioOptions({ label, name, value, options, onChange, error, required, vertical }) {
  const groupClass = vertical
    ? "flex flex-col gap-2"
    : "flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-4";

  return (
    <FieldWrapper label={label} required={required} error={error}>
      <div className={groupClass}>
        {options.map((opt) => (
          <label key={opt.value} className="inline-flex cursor-pointer items-center gap-2 text-sm text-[#000032]">
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={onChange}
              className="h-4 w-4 border-[#E1E7F6] text-[#293B93] focus:ring-[#293B93]"
            />
            {opt.label}
          </label>
        ))}
      </div>
    </FieldWrapper>
  );
}

export function CheckboxOptions({ label, values = [], options, onToggle, error, required }) {
  return (
    <FieldWrapper label={label} required={required} error={error}>
      <div className="space-y-2">
        {options.map((opt) => (
          <label key={opt.value} className="flex cursor-pointer items-start gap-3 text-sm text-[#000032]">
            <input
              type="checkbox"
              checked={values.includes(opt.value)}
              onChange={() => onToggle(opt.value)}
              className="mt-0.5 h-4 w-4 rounded border-[#E1E7F6] text-[#293B93] focus:ring-[#293B93]"
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
    </FieldWrapper>
  );
}

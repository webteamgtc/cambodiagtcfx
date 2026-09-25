import { Children, cloneElement, isValidElement } from "react";
import DateInput from "./DateInput";

const errorInputClass =
  "border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500";

const normalInputClass =
  "border-[#E1E7F6] focus:border-[#293B93] focus:ring-[#293B93]";

function injectHasError(child, hasError) {
  if (!isValidElement(child)) return child;

  if (
    child.type?.displayName === "PhoneInputWrapper" ||
    child.type?.displayName === "DateInput" ||
    child.props?.["data-phone-wrapper"]
  ) {
    return cloneElement(child, { hasError });
  }

  if (typeof child.type === "string") {
    return cloneElement(child, {}, Children.map(child.props.children, (nested) => injectHasError(nested, hasError)));
  }

  return cloneElement(child, { hasError });
}

export default function FieldWrapper({ label, required, error, children, hint }) {
  const hasError = Boolean(error);

  const enhancedChildren = Children.map(children, (child) => injectHasError(child, hasError));

  return (
    <div className="mb-4">
      {label && (
        <label className={`mb-1.5 block text-sm font-medium ${hasError ? "text-red-600" : "text-[#000032]"}`}>
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      {enhancedChildren}
      {hint && !hasError && <p className="mt-1 text-xs text-[#69729F]">{hint}</p>}
      {hasError && (
        <p className="mt-1.5 text-xs font-medium text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function TextInput({ className = "", hasError = false, ...props }) {
  return (
    <input
      aria-invalid={hasError}
      className={`w-full rounded-lg border px-3 py-2.5 text-sm text-[#000032] outline-none transition focus:ring-1 ${
        hasError ? errorInputClass : normalInputClass
      } ${className}`}
      {...props}
    />
  );
}

TextInput.displayName = "TextInput";

export function TextArea({ className = "", hasError = false, rows = 4, ...props }) {
  return (
    <textarea
      rows={rows}
      aria-invalid={hasError}
      className={`w-full rounded-lg border px-3 py-2.5 text-sm text-[#000032] outline-none transition focus:ring-1 ${
        hasError ? errorInputClass : normalInputClass
      } ${className}`}
      {...props}
    />
  );
}

TextArea.displayName = "TextArea";

export { DateInput };

export function SelectInput({ children, className = "", hasError = false, ...props }) {
  return (
    <select
      aria-invalid={hasError}
      className={`w-full rounded-lg border px-3 py-2.5 text-sm text-[#000032] outline-none transition focus:ring-1 ${
        hasError ? errorInputClass : normalInputClass
      } ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}

SelectInput.displayName = "SelectInput";

export function CheckboxField({ label, error, ...props }) {
  const hasError = Boolean(error);

  return (
    <div
      className={`mb-3 rounded-lg p-2 ${hasError ? "border border-red-300 bg-red-50" : ""}`}
    >
      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          aria-invalid={hasError}
          className={`mt-1 h-4 w-4 rounded text-[#293B93] focus:ring-[#293B93] ${
            hasError ? "border-red-500" : "border-[#E1E7F6]"
          }`}
          {...props}
        />
        <span className={`text-sm leading-relaxed ${hasError ? "text-red-700" : "text-[#000032]"}`}>
          {label}
        </span>
      </label>
      {hasError && (
        <p className="mt-1.5 pl-7 text-xs font-medium text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

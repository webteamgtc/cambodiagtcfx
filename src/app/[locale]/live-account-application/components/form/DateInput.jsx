"use client";

import { forwardRef } from "react";
import ReactDatePicker from "react-datepicker";
import { format, isValid, parseISO } from "date-fns";
import { FiCalendar } from "react-icons/fi";
import "react-datepicker/dist/react-datepicker.css";

const errorInputClass =
  "border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500";

const normalInputClass =
  "border-[#E1E7F6] focus:border-[#293B93] focus:ring-[#293B93]";

function parseFormDate(value) {
  if (!value) return null;
  const parsed = parseISO(value);
  return isValid(parsed) ? parsed : null;
}

const DatePickerInput = forwardRef(function DatePickerInput(
  { value, onClick, onBlur, placeholder, hasError, className },
  ref
) {
  const isEmpty = !value;

  return (
    <div
      ref={ref}
      className={`serc-date-input group relative w-full ${hasError ? "serc-date-input--error" : ""}`}
    >
      <input
        readOnly
        value={value}
        onClick={onClick}
        onBlur={onBlur}
        placeholder={placeholder}
        aria-invalid={hasError}
        className={`w-full cursor-pointer rounded-lg border bg-white py-2.5 pl-3 pr-11 text-sm outline-none transition focus:ring-1 ${
          isEmpty ? "text-[#8892B0] placeholder:text-[#8892B0]" : "text-[#000032]"
        } ${hasError ? errorInputClass : normalInputClass} ${className ?? ""}`}
      />
      <span
        className={`pointer-events-none absolute right-0 top-0 flex h-full w-11 items-center justify-center rounded-r-lg ${
          hasError ? "text-red-500" : "text-[#293B93] group-hover:text-[#243575]"
        }`}
      >
        <FiCalendar className="h-[18px] w-[18px]" aria-hidden />
      </span>
    </div>
  );
});

DatePickerInput.displayName = "DatePickerInput";

export default function DateInput({
  name,
  value,
  onChange,
  onBlur,
  min,
  max,
  hasError = false,
  placeholder = "Select date",
  enableYearSelect = false,
  yearDropdownItemNumber = 15,
  className = "",
}) {
  const selected = parseFormDate(value);
  const minDate = min ? parseFormDate(min) : undefined;
  const maxDate = max ? parseFormDate(max) : undefined;

  const emitChange = (date) => {
    onChange?.({
      target: {
        name,
        value: date ? format(date, "yyyy-MM-dd") : "",
      },
    });
  };

  return (
    <ReactDatePicker
      selected={selected}
      onChange={emitChange}
      onBlur={onBlur}
      minDate={minDate ?? undefined}
      maxDate={maxDate ?? undefined}
      dateFormat="dd MMM yyyy"
      placeholderText={placeholder}
      showPopperArrow={false}
      popperPlacement="bottom-start"
      calendarClassName="serc-datepicker"
      popperClassName="serc-datepicker-popper"
      wrapperClassName="serc-datepicker-wrapper w-full"
      showMonthDropdown={enableYearSelect}
      showYearDropdown={enableYearSelect}
      scrollableYearDropdown={enableYearSelect}
      yearDropdownItemNumber={enableYearSelect ? yearDropdownItemNumber : undefined}
      dropdownMode="select"
      popperProps={{ strategy: "fixed" }}
      customInput={<DatePickerInput hasError={hasError} className={className} placeholder={placeholder} />}
    />
  );
}

DateInput.displayName = "DateInput";

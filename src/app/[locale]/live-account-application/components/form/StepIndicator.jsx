import { FORM_STEPS } from "../../constants/sercContent";

export default function StepIndicator({ currentStep }) {
  return (
    <div className="mb-6">
      <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
        {FORM_STEPS.map((step, index) => {
          const isActive = index === currentStep;
          const isComplete = index < currentStep;

          return (
            <div key={step.id} className="flex items-center gap-1 sm:gap-2">
              <div
                className={`flex items-center gap-2 rounded-full px-2 py-1 sm:px-3 ${
                  isActive ? "border-b-2 border-[#293B93] pb-2" : ""
                }`}
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    isComplete
                      ? "bg-[#293B93] text-white"
                      : isActive
                        ? "bg-[#293B93] text-white ring-2 ring-[#293B93]/25"
                        : "bg-[#E8ECF8] text-[#8892B0]"
                  }`}
                >
                  {isComplete ? "✓" : index + 1}
                </span>
                <span
                  className={`hidden max-w-[7rem] text-[11px] font-semibold leading-tight sm:block md:max-w-none md:text-xs ${
                    isActive ? "text-[#293B93]" : isComplete ? "text-[#293B93]/80" : "text-[#8892B0]"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {index < FORM_STEPS.length - 1 ? (
                <span className="text-[#C5CEE8]" aria-hidden>
                  ›
                </span>
              ) : null}
            </div>
          );
        })}
      </div>
      <p className="mt-3 text-center text-xs text-[#69729F]">ⓘ Pending submission</p>
    </div>
  );
}

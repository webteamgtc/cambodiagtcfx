import { FORM_STEPS } from "../../constants/sercContent";
import { useSercFormTranslation } from "../../i18n/useSercFormTranslation";

function StepConnector({ complete }) {
  return (
    <div className="relative mx-1 hidden h-[2px] w-6 shrink-0 self-center sm:mx-2 sm:w-10 md:block lg:w-14" aria-hidden>
      <span className="absolute inset-0 rounded-full bg-[#E1E7F6]" />
      <span
        className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#293B93] to-[#6B7FD7] transition-all duration-500 ${
          complete ? "w-full" : "w-0"
        }`}
      />
    </div>
  );
}

function StepPill({ index, label, isActive, isComplete }) {
  const pillClass = isActive
    ? "border-[#293B93] bg-gradient-to-br from-[#F8FAFF] to-white shadow-[0_8px_24px_rgba(41,59,147,0.14)] ring-1 ring-[#293B93]/20"
    : isComplete
      ? "border-[#293B93]/35 bg-[#EEF2FF]/80"
      : "border-[#E1E7F6] bg-[#FAFBFE]";

  const badgeClass = isActive
    ? "bg-gradient-to-br from-[#293B93] to-[#4A5FC1] text-white shadow-[0_4px_12px_rgba(41,59,147,0.35)]"
    : isComplete
      ? "bg-[#293B93] text-white"
      : "border border-[#D5DCF0] bg-white text-[#8892B0]";

  return (
    <div
      className={`flex min-w-0 flex-1 items-center gap-2 rounded-2xl border px-2.5 py-2.5 transition-all duration-300 sm:gap-2.5 sm:px-3 sm:py-3 lg:px-4 ${pillClass}`}
      aria-current={isActive ? "step" : undefined}
    >
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-bold sm:h-9 sm:w-9 sm:text-sm ${badgeClass}`}
      >
        {isComplete ? (
          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          index + 1
        )}
      </span>
      <span
        className={`min-w-0 flex-1 text-left text-[10px] font-semibold leading-snug sm:text-[11px] lg:text-xs xl:text-[13px] ${
          isActive ? "text-[#000032]" : isComplete ? "text-[#293B93]" : "text-[#8892B0]"
        }`}
      >
        {label}
      </span>
      {isActive ? (
        <span className="hidden h-2 w-2 shrink-0 rounded-full bg-[#293B93] shadow-[0_0_0_4px_rgba(41,59,147,0.15)] lg:block" />
      ) : null}
    </div>
  );
}

export default function StepIndicator({ currentStep }) {
  const { step, t } = useSercFormTranslation();
  const progressPercent = Math.round(((currentStep + 1) / FORM_STEPS.length) * 100);
  const activeStep = FORM_STEPS[currentStep];
  const activeLabel = step(activeStep.labelKey, activeStep.fallback);

  return (
    <div className="mb-8 md:mb-10">
      <div className="mb-4 md:hidden">
        <div className="mb-2 flex items-center justify-between text-[11px] font-medium text-[#69729F]">
          <span>
            {t("stepsLabel", "Step")} {currentStep + 1}/{FORM_STEPS.length}
          </span>
          <span>{progressPercent}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-[#E8ECF8]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#293B93] via-[#4A5FC1] to-[#6B7FD7] transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="mt-3 text-sm font-semibold text-[#293B93]">{activeLabel}</p>
      </div>

      <div className="hidden w-full items-center md:flex">
        {FORM_STEPS.map((formStep, index) => {
          const isActive = index === currentStep;
          const isComplete = index < currentStep;
          const label = step(formStep.labelKey, formStep.fallback);

          return (
            <div key={formStep.id} className="flex min-w-0 flex-1 items-center">
              <StepPill index={index} label={label} isActive={isActive} isComplete={isComplete} />
              {index < FORM_STEPS.length - 1 ? <StepConnector complete={index < currentStep} /> : null}
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:hidden">
        {FORM_STEPS.map((formStep, index) => {
          const isActive = index === currentStep;
          const isComplete = index < currentStep;
          const label = step(formStep.labelKey, formStep.fallback);

          return (
            <StepPill
              key={formStep.id}
              index={index}
              label={label}
              isActive={isActive}
              isComplete={isComplete}
            />
          );
        })}
      </div>

      <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-[#69729F] md:mt-5">
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#EEF2FF] text-[10px] font-semibold text-[#293B93]">
          i
        </span>
        {t("pendingSubmission", "Pending submission")}
      </p>
    </div>
  );
}

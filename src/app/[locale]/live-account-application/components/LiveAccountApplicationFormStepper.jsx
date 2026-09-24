"use client";

import clsx from "clsx";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

function StepCircle({ step, label, active, completed }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center gap-2">
      <span
        className={clsx(
          "flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold",
          active || completed
            ? "bg-white text-[#293B93]"
            : "bg-white/15 text-white/70"
        )}
      >
        {step}
      </span>
      <span
        className={clsx(
          "TextSmall text-center font-medium",
          active ? "text-white" : "text-white/65"
        )}
      >
        {label}
      </span>
    </div>
  );
}

export default function LiveAccountApplicationFormStepper({ activeStep = 1 }) {
  const t = usePathTranslation("liveAccountApplicationPage.form");

  return (
    <div className="flex items-start gap-3 md:gap-4">
      <header className=" w-full text-center">
        <h2 className="HeadingH4 font-semibold text-[#fff]">
          {t("stepper.title", t("title", "Apply live trading account"))}
        </h2>
        <p className="TextSmall mx-auto mt-2 text-[#fff]">
          {t(
            "stepper.subtitle",
            t(
              "subtitle",
              "You're applying live account, please fill the form carefully"
            )
          )}
        </p>
      </header>
    </div>
  );
}

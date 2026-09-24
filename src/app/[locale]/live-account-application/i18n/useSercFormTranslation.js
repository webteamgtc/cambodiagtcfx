"use client";

import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

export function useSercFormTranslation() {
  const t = usePathTranslation("liveAccountApplicationPage.sercForm");

  const field = (key, fallback) => t(`fields.${key}`, fallback);
  const placeholder = (key, fallback) => t(`placeholders.${key}`, fallback);
  const section = (key, fallback) => t(`sections.${key}`, fallback);
  const step = (key, fallback) => t(`steps.${key}`, fallback);
  const option = (group, value, fallback) =>
    t(`options.${group}.${value}`, fallback ?? value);

  return { t, field, placeholder, section, step, option };
}

export function mapOptionLabels(options, group, optionFn) {
  return options.map((opt) => ({
    ...opt,
    label: optionFn(group, opt.value, opt.label),
  }));
}

import clsx from "clsx";

/** Base card shell — primary background + white content on hover */
export const INTERACTIVE_CARD = "interactive-card";

/** Merge with existing card layout classes */
export function interactiveCardClassName(...classes) {
  return clsx(INTERACTIVE_CARD, ...classes);
}

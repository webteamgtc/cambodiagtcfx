"use client";

import clsx from "clsx";
import Link from "next/link";
import { INTERACTIVE_CARD } from "./interactiveCardClasses";

/**
 * Light-section card with primary hover state (white content + inverted icons).
 */
export default function InteractiveCard({
  as: Component = "article",
  href,
  external = false,
  className = "",
  children,
  ...rest
}) {
  const classes = clsx(
    INTERACTIVE_CARD,
    "overflow-hidden",
    className
  );

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...rest}>
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <Component className={classes} {...rest}>
      {children}
    </Component>
  );
}

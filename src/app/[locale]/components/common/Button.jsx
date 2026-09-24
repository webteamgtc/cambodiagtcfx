import Link from "next/link";
import clsx from "clsx";
import { FiArrowRight } from "react-icons/fi";

const VARIANTS = {
  primary:
    "border border-transparent bg-[#293B93] text-white hover:bg-[#243575]",
  brand:
    "border border-transparent bg-[#3347a8] text-white hover:bg-[#293a8c]",
  secondary:
    "border border-[#293B93] bg-white text-[#293B93] hover:bg-[#f7f8fc]",
  brandOutline:
    "border border-[#3347a8] bg-white text-[#3347a8] hover:bg-[#f7f8ff]",
  outline:
    "border border-[#E1E7F6] bg-transparent text-[#293B93] hover:bg-transparent",
  dark:
    "border border-transparent bg-[#1B2559] text-white hover:bg-[#151d47]",
  ghost:
    "border border-white/90 bg-transparent text-white hover:bg-white/10",
};

const SIZES = {
  sm: "h-10 px-6 text-[14px]",
  md: "h-11 px-7 text-[14px] md:text-[15px]",
  lg: "h-12 px-8 text-[15px] md:text-[16px]",
};

const ARROW_ICON_SIZES = {
  sm: "h-7 w-7",
  md: "h-8 w-8",
  lg: "h-9 w-9",
};

/**
 * Shared pill button for links and form actions.
 */
export default function Button({
  children,
  href,
  external = false,
  variant = "primary",
  size = "md",
  type = "button",
  disabled = false,
  fullWidth = false,
  showArrow = false,
  arrowClassName = "",
  icon,
  iconPosition = "right",
  className = "",
  onClick,
  ...rest
}) {
  const isArrowLayout = showArrow;
  const usesSolidArrow =
    variant === "dark" || variant === "primary" || variant === "brand";

  const classes = clsx(
    "TextButton box-border inline-flex items-center justify-center gap-2 rounded-full font-medium leading-none transition hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#293B93]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    VARIANTS[variant] ?? VARIANTS.primary,
    isArrowLayout &&
      (variant === "brand" || variant === "primary") &&
      "group border border-transparent hover:!bg-white hover:!text-primary hover:!border-primary hover:[&_span]:!text-primary hover:[&_svg]:![filter:none] hover:[&_svg]:!text-primary",
    SIZES[size] ?? SIZES.md,
    fullWidth && "w-full",
    !fullWidth && isArrowLayout && "w-fit self-start justify-between gap-3 pl-6 pr-1.5 sm:min-w-[210px]",
    !fullWidth && !isArrowLayout && "w-full sm:w-auto",
    className
  );

  const content = (
    <>
      {icon && iconPosition === "left" ? (
        <span className="inline-flex shrink-0 items-center justify-center">
          {icon}
        </span>
      ) : null}

      <span className={clsx(isArrowLayout && "flex-1 text-center lg:text-left")}>{children}</span>

      {showArrow ? (
        <span
          className={clsx(
            "inline-flex shrink-0 items-center justify-center rounded-full",
            ARROW_ICON_SIZES[size] ?? ARROW_ICON_SIZES.md,
            arrowClassName,
            usesSolidArrow
              ? "bg-white text-[#1B2559] transition-colors group-hover:bg-[#E8EAF6] group-hover:text-primary group-hover:[&_svg]:![filter:none]"
              : "bg-white/15 text-current"
          )}
          aria-hidden
        >
          <FiArrowRight className="h-4 w-4" />
        </span>
      ) : icon && iconPosition === "right" ? (
        <span className="inline-flex shrink-0 items-center justify-center">
          {icon}
        </span>
      ) : null}
    </>
  );

  if (href && !disabled) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          onClick={onClick}
          {...rest}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} onClick={onClick} {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {content}
    </button>
  );
}

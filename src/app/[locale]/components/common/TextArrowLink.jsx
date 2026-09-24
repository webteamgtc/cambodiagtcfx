import Link from "next/link";
import clsx from "clsx";

function ArrowIcon({ className }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="10"
      viewBox="0 0 18 14"
      fill="none"
      aria-hidden
    >
      <path
        d="M17 7H1M11 13L17 7L11 1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function TextArrowLink({
  href,
  children,
  external = false,
  lowercase = true,
  className = "",
  ...rest
}) {
  const classes = clsx(
    "TextSmall inline-flex w-fit items-center gap-1 font-semibold text-[#293B93] transition hover:text-[#243575] hover:no-underline",
    lowercase && "lowercase",
    className
  );

  const content = (
    <>
      {children}
      <ArrowIcon className="shrink-0" />
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {content}
    </Link>
  );
}

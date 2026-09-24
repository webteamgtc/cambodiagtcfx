import clsx from "clsx";

export default function SectionEyebrow({
  children,
  as: Tag = "p",
  variant = "default",
  uppercase = true,
  className = "",
  ...rest
}) {
  return (
    <Tag
      className={clsx(
        "TextSmall font-semibold text-[#293B93]",
        variant === "compact"
          ? "text-xs tracking-[0.22em] md:text-sm"
          : "tracking-[0.24em]",
        uppercase && "uppercase",
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}

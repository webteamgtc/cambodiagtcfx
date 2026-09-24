"use client";

import MobilePeekCarousel from "../MobilePeekCarousel";
import Link from "next/link";
import BlogCoverImage from "../BlogCoverImage";

function IconClock({ className }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function BlogCard({
  category,
  title,
  readTime,
  date,
  dateIso,
  href,
  imageSrc,
  imageAlt,
}) {
  return (
    <article className="flex h-full flex-col gap-2.5 md:gap-3">
      <div
        className="relative w-full shrink-0 overflow-hidden rounded-[10px] bg-[#d1d1d1] md:rounded-xl"
        style={{ aspectRatio: "16 / 9" }}
      >
        <BlogCoverImage
          src={imageSrc}
          alt={imageAlt || title || "Blog article"}
          sizes="(max-width: 768px) 100vw, 33vw"
        />

        <span className="absolute left-3 top-3 inline-flex w-fit items-center rounded-xl bg-secondary px-3 py-1 text-[11px] font-medium text-white md:px-3.5 md:py-1.5 md:text-xs">
          {category}
        </span>
      </div>

      <div className="mt-0.5 flex flex-1 flex-col gap-2 md:gap-2.5">
        <h3 className="HeadingH5">{title}</h3>

        <div className="mt-auto border-t border-primary/25 pt-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 flex-1 items-center gap-2 text-primary">
              <IconClock className="h-4 w-4 shrink-0 text-primary" />
              <time dateTime={dateIso} className="TextSmall font-normal leading-snug">
                {readTime} · {date}
              </time>
            </div>

            <Link
              href={href}
              className="TextSmall shrink-0 font-normal text-primary underline decoration-primary underline-offset-[3px] transition hover:opacity-80"
            >
              Read&nbsp;→
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function BlogsSectionMobile({ items = [] }) {
  if (!items?.length) return null;
  return (
    <MobilePeekCarousel
      items={items}
      trackClassName="-mx-4 px-4"
      renderItem={(post) => <BlogCard {...post} />}
    />
  );
}


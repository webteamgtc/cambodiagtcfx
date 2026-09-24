"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  BLOG_CARD_FALLBACK_IMAGE,
  normalizeBlogCardImageSrc,
} from "@/lib/blog/blogCardImage";

export default function BlogCoverImage({
  src,
  alt = "",
  className = "object-cover",
  sizes = "(max-width: 768px) 100vw, 33vw",
  fill = true,
  priority = false,
  fallback = BLOG_CARD_FALLBACK_IMAGE,
}) {
  const [imgSrc, setImgSrc] = useState(() => normalizeBlogCardImageSrc(src, fallback));

  useEffect(() => {
    setImgSrc(normalizeBlogCardImageSrc(src, fallback));
  }, [src, fallback]);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill={fill}
      priority={priority}
      unoptimized={String(imgSrc).startsWith("http")}
      className={className}
      sizes={sizes}
      onError={() => {
        setImgSrc((current) => (current !== fallback ? fallback : current));
      }}
    />
  );
}

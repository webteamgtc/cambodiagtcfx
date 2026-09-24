"use client";

import Link from "next/link";
import { useStoreDownloadHref } from "@/lib/useStoreDownloadHref";

export default function StoreDownloadLink({ type, className, children, ...props }) {
  const href = useStoreDownloadHref(type);

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      {...props}
    >
      {children}
    </Link>
  );
}

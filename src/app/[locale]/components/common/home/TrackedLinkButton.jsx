"use client";

import Link from "next/link";
import { trackRegisterClick } from "@/lib/tracking";

export default function TrackedLinkButton({
  href = "/",
  children,
  className = "",
  buttonType = "default",
  location = "unknown",
 
}) {


  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
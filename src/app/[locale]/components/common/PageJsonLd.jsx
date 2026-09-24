"use client";

import { usePathname } from "next/navigation";
import { resolvePageSchema } from "@/lib/schema/resolvePageSchema";
import JsonLd from "./JsonLd";

/**
 * Emits the current route's JSON-LD script into the root layout's <head>.
 *
 * Rendered as a client component on purpose: the root layout does not
 * re-render on client-side navigation, so resolving the schema from
 * `usePathname()` is what keeps the script in sync when the route changes.
 * During SSR this still renders the correct schema into the served HTML.
 *
 * This only stays inside <head> because next.config.js sets
 * `htmlLimitedBots: /.*` (see comment there), which forces every request to
 * use blocking metadata. Without that, Next's streaming-metadata mechanism
 * conflicts with the hand-written <head> in the root layout and pushes its
 * contents into <body> instead — don't remove one fix without the other.
 */
export default function PageJsonLd() {
  const pathname = usePathname();

  return <JsonLd data={resolvePageSchema(pathname)} />;
}

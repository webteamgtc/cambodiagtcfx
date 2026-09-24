"use client";

import { useCallback, useState } from "react";
import { usePathname } from "next/navigation";

const BOTTOM_SHARE = [
  { type: "linkedin", label: "Share on LinkedIn" },
  { type: "x", label: "Share on X" },
  { type: "facebook", label: "Share on Facebook" },
  { type: "link", label: "Copy link" },
];

function RoundShareIcon({ type }) {
  const cls = "h-[15px] w-[15px]";

  if (type === "x") {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  }

  if (type === "facebook") {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M13.5 9.5V7.7c0-.8.2-1.3 1.3-1.3h1.4V3.9c-.7-.1-1.4-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.9H8v3.4h2.3V21h3.2v-8.1h2.2l.2-3.4h-2.4Z" />
      </svg>
    );
  }

  if (type === "link") {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M10 13a5 5 0 0 1 7.07 0l1.41 1.41a5 5 0 0 1-7.07 7.07l-1.41-1.41M14 11a5 5 0 0 1-7.07 0L5.52 9.59a5 5 0 0 1 7.07-7.07L14 3.93" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg className={cls} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M4.98 3.5a2.25 2.25 0 1 1 0 4.5 2.25 2.25 0 0 1 0-4.5ZM3.75 9h2.46v11.25H3.75V9Zm6.9 0h2.36v1.54h.03c.33-.62 1.14-1.28 2.35-1.28 2.51 0 2.97 1.65 2.97 3.8v6.19h-2.46v-5.49c0-1.31-.03-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9v5.59H10.65V9Z" />
    </svg>
  );
}

export default function MarketNewsArticleShareBar() {
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);

  const handleShare = useCallback(
    async (type) => {
      if (type !== "link") return;

      const url = `${window.location.origin}${pathname}`;

      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1800);
      } catch {
        setCopied(false);
      }
    },
    [pathname]
  );

  return (
    <div className="mt-12 flex items-center border-b border-[#BDBDBD] pb-8 gap-2.5">
      {BOTTOM_SHARE.map((item) => (
        <button
          key={item.type}
          type="button"
          aria-label={item.type === "link" && copied ? "Link copied" : item.label}
          onClick={() => handleShare(item.type)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#BDBDBD] bg-white text-[#000] transition hover:border-[#BDBDBD] hover:text-[#4E4E4E]"
        >
          <RoundShareIcon type={item.type} />
        </button>
      ))}
    </div>
  );
}

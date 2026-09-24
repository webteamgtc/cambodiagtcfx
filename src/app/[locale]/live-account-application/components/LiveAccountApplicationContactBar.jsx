"use client";

import { usePathTranslation } from "@/app/[locale]/LocaleProvider";
import { CONTACT_ITEMS, TRUST_BADGES } from "../liveAccountApplicationData";

function ContactIcon({ type }) {
  const className = "h-6 w-6 shrink-0 text-[#293B93]";

  if (type === "phone") {
    return (
      <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
        <path
          d="M6.5 3.5h2l1 3-2 1.2a9.5 9.5 0 004.8 4.8L13.5 11l3 1v2a1.5 1.5 0 01-1.6 1.5C8.8 15.5 4.5 11.2 4.5 5.1A1.5 1.5 0 016 3.5Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "globe") {
    return (
      <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
        <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M2.5 10h15M10 2.5c2 2.2 2 12.8 0 15M10 2.5c-2 2.2-2 12.8 0 15" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    );
  }

  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M3.5 5.5 10 11l6.5-5.5M4 15.5h12a1 1 0 001-1V5.5a1 1 0 00-1-1H4a1 1 0 00-1 1v9a1 1 0 001 1Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function LiveAccountApplicationContactBar() {
  const t = usePathTranslation("liveAccountApplicationPage");

  return (
    <div className="mt-8 rounded-2xl border border-[#273D910D] bg-[#F8F9FD] p-5 shadow-sm md:mt-10 md:p-8">
      <div className="grid gap-3 sm:grid-cols-3 divide-x divide-[#E1E7F6]">
        {CONTACT_ITEMS.map((item) => (
          <a
            key={item.key}
            href={item.href}
            target={item.key === "website" ? "_blank" : undefined}
            rel={item.key === "website" ? "noopener noreferrer" : undefined}
            className="flex items-center justify-center gap-3 hover:no-underline"
          >
            <span className="w-10 h-10 bg-[#E8ECF8] rounded-[12px] flex items-center justify-center text-[#273D91]">
              <ContactIcon type={item.icon} />
            </span>
            <div>
              <span className="text-xs font-normal uppercase text-[#8892B0] block">
                {t(`contactBar.labels.${item.key}`, item.label)}
              </span>
              <span className="TextSmall font-medium text-[#000032] block">{item.value}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

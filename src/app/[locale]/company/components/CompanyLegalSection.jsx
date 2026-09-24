"use client";

import { useMemo, useState } from "react";
import { AU, GB, MU, VU, ZA } from "country-flag-icons/react/3x2";
import { useLocaleMessages, usePathTranslation } from "../../LocaleProvider";
import { localizedHref } from "@/i18n/localizedHref";
import Button from "@/app/[locale]/components/common/Button";

const AFFILIATE_KEYS = ["two", "three", "four", "five", "six", "seven"];

const FLAG_ICONS = {
  za: ZA,
  vu: VU,
  gb: GB,
  au: AU,
  mu: MU,
};

const COUNTRY_FLAG_CODES = {
  "United Kingdom": "gb",
  Australia: "au",
  Mauritius: "mu",
  "South Africa": "za",
  Vanuatu: "vu",
};

function Flag({ code }) {
  const FlagIcon = FLAG_ICONS[code];
  if (!FlagIcon) return null;

  return (
    <span className="inline-flex h-6 w-8 shrink-0 overflow-hidden rounded-sm shadow-sm">
      <FlagIcon title={code.toUpperCase()} className="h-full w-full" />
    </span>
  );
}

function normalizeWebsiteUrl(url) {
  if (!url || typeof url !== "string") return "";
  const trimmed = url.trim();
  if (!trimmed) return "";
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

function formatWebsiteLabel(url) {
  if (!url || typeof url !== "string") return "";
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

function parseWebsite(website) {
  if (!website) return null;

  if (typeof website === "string") {
    const trimmed = website.trim();
    if (!trimmed) return null;
    return {
      href: normalizeWebsiteUrl(trimmed),
      label: formatWebsiteLabel(trimmed),
    };
  }

  if (typeof website === "object") {
    const hrefSource = website.hyperlink || website.href || website.url || website.text || "";
    const labelSource = website.text || website.label || hrefSource;
    const href = typeof hrefSource === "string" ? hrefSource.trim() : "";
    const label = typeof labelSource === "string" ? labelSource.trim() : "";

    if (!href && !label) return null;

    return {
      href: normalizeWebsiteUrl(href || label),
      label: formatWebsiteLabel(label || href),
    };
  }

  return null;
}

function ChevronIcon({ open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-5 w-5 shrink-0 transition-transform duration-200 ${
        open ? "rotate-180 text-[#2b3d8f]" : "text-[#9ca3af]"
      }`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function RegulationAccordionItem({ item, isOpen, onToggle, websiteLabel }) {
  const flagCode = COUNTRY_FLAG_CODES[item.country];

  return (
    <div
      className={`overflow-hidden rounded-[10px] border transition-all duration-200 ${
        isOpen
          ? "border-[#B3C0FF] bg-[#F5F7FF] "
          : "border-[#B3C0FF] bg-white"
      }`}


    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center gap-4 px-4 py-4 text-start sm:px-6"
      >
        <Flag code={flagCode} />
        <span className="flex-1 text-[15px] font-semibold leading-snug text-[#02002f]">
          {item.country}
        </span>
        <ChevronIcon open={isOpen} />
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5 sm:px-6 sm:pb-6">
            <div className="ps-[52px] sm:ps-[56px]">
              <p className="TextSmall leading-[1.65] font-normal text-[#666666]">{item.description}</p>
              {item.website && (
                <p className="TextSmall mt-4 text-[#293B93]">
                  <span>{websiteLabel} </span>
                  <a
                    href={item.website.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#2b3d8f] underline decoration-[#2b3d8f]/40 underline-offset-2 hover:decoration-[#2b3d8f]"
                  >
                    {item.website.label}
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CompanyLegalSection({ locale = "en" }) {
  const messages = useLocaleMessages();
  const t = usePathTranslation("regulationPage");
  const [openIndex, setOpenIndex] = useState(0);

  const affiliates = useMemo(() => {
    const source = messages?.regulationPage?.affiliates ?? {};

    return AFFILIATE_KEYS.map((key) => {
      const entry = source[key] ?? {};

      return {
        key,
        country: entry.country ?? "",
        description: entry.description ?? "",
        website: parseWebsite(entry.website),
      };
    }).filter((item) => item.country && item.description);
  }, [messages]);

  if (!affiliates.length) return null;

  const introText = t(
    "companyLegalIntro",
    "GTC Group LLC-FZ, a limited liability company registered in the UAE, owns the following entities globally, together the GTC Financial Group. Each of these entities provides financial services according to their respective licences in the relevant jurisdiction."
  );

  return (
    <section className="relative w-full max-w-[100vw] overflow-x-hidden bg-white py-8 md:py-16">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[min(420px,55%)] bg-gradient-to-b from-[#F8FAFF] to-transparent"
        aria-hidden
      />
      <div className="container relative min-w-0 max-w-full">
        <div className="mx-auto w-full min-w-0 max-w-6xl">
          <h2 className="HeadingH1 text-[#000] text-center">
            {t("legalSectionTitle", "Legal Information")}
          </h2>

          <div className="mt-10 md:mt-12">
            <h3 className="HeadingH2 text-[#293B93] text-center md:text-start font-semibold leading-tight">
              {t("regulationHeading", "GTCFX Regulation")}
            </h3>
            <p className="TextSmall mt-4 max-w-full break-words leading-[1.7] text-[#666666] text-center md:text-start font-normal">
              {introText}
            </p>

            <div className="mt-8 space-y-3 md:mt-9">
              {affiliates.map((item, index) => (
                <RegulationAccordionItem
                  key={item.key}
                  item={item}
                  isOpen={openIndex === index}
                  onToggle={() => setOpenIndex(index)}
                  websiteLabel={t("websiteLabel", "Website:")}
                />
              ))}
            </div>

            <div className="mt-6 flex justify-center md:mt-12">
          <Button
            href={localizedHref(locale, "/company/regulations")}
            variant="brand"
            size="md"
            showArrow
          >
            {t("viewMore", "View More")}
          </Button>
        </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
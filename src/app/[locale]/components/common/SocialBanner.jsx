"use client";

import React, { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { usePathTranslation } from "../../LocaleProvider";

const SocialBanner = ({
  showBackground = true,
  orientation = "horizontal",
  showHeader = true,
  showCopy = true,
  bare = false,
  sticky = false,
  hoverExpand = false,
}) => {
  const path = usePathname() || "/";
  const [copied, setCopied] = useState(false);
  const t = usePathTranslation("common.share");
  const baseUrl = "https://www.gtcfx.com";
  const shareUrl = `${baseUrl}${path}`;
  const isVertical = orientation === "vertical";

  const shareTitle = useMemo(() => {
    const parts = path.split("/").filter(Boolean);
    const slug = parts[parts.length - 1] || "market-updates";
    return slug.replace(/-/g, " ").replace(/\s+/g, " ").trim();
  }, [path]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const containerClass = bare
    ? ""
    : showBackground
    ? "rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm"
    : "rounded-xl border border-gray-200 bg-gray-50 p-3";

  const wrapperClass = `${containerClass} ${sticky ? "sticky top-28" : ""}`.trim();
  const textMuted = showBackground ? "text-white/70" : "text-gray-500";
  const textPrimary = showBackground ? "text-white" : "text-gray-800";
  const copyBtnClass = `rounded-md px-3 py-1.5 text-xs font-semibold transition ${showBackground
    ? "border border-white/30 text-white hover:bg-white/10"
    : "border border-gray-300 text-gray-700 hover:bg-white"
    }`;
  const listClass = isVertical
    ? "flex flex-col items-center gap-2"
    : "flex flex-wrap items-center gap-2";
  const triggerClass = isVertical
    ? "flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-[#1a1a3e] text-white shadow-[0_12px_28px_rgba(36,53,139,0.35)] transition duration-300 hover:scale-105"
    : "inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-xs font-semibold text-white transition duration-300 hover:bg-primary/90";
  const listAnimateClass = isVertical
    ? "mt-3 max-h-0 overflow-hidden opacity-0 pointer-events-none transition-all duration-700 ease-out group-hover:max-h-96 group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:max-h-96 group-focus-within:opacity-100 group-focus-within:pointer-events-auto"
    : "mt-2 max-h-0 overflow-hidden opacity-0 pointer-events-none transition-all duration-700 ease-out group-hover:max-h-40 group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:max-h-40 group-focus-within:opacity-100 group-focus-within:pointer-events-auto";
  const iconItemClass = `transition-all duration-500 ${hoverExpand
    ? isVertical
      ? "translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:translate-x-0 group-focus-within:opacity-100"
      : "translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
    : ""
    } hover:-translate-y-0.5`;

  return (
    <article className={`${wrapperClass} ${hoverExpand ? "group" : ""}`.trim()}>
      {showHeader && (
        <div className={`mb-3 ${isVertical ? "text-center" : "flex items-center justify-between gap-2"}`}>
          <div>
            <p className={`text-xs ${textMuted}`}>{t("heading", "Share this article")}</p>
            <p className={`line-clamp-1 text-sm font-semibold ${textPrimary}`}>
              {shareTitle}
            </p>
          </div>
          {!isVertical && showCopy && (
            <button type="button" onClick={handleCopy} className={copyBtnClass}>
              {copied ? t("copied", "Copied") : t("copyLink", "Copy Link")}
            </button>
          )}
        </div>
      )}

      {isVertical && showCopy && (
        <div className="mb-3 flex justify-center">
          <button type="button" onClick={handleCopy} className={copyBtnClass}>
            {copied ? t("copied", "Copied") : t("copyLink", "Copy Link")}
          </button>
        </div>
      )}

      {hoverExpand && (
        <div className={isVertical ? "flex justify-center" : ""}>
          <button
            type="button"
            className={triggerClass}
            aria-label={t("openOptionsAria", "Open share options")}
            title={t("shareTitle", "Share")}
          >
            {isVertical ? (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            ) : (
              t("share", "Share")
            )}
          </button>
        </div>
      )}

      <ul className={`${listClass} ${hoverExpand ? listAnimateClass : ""}`.trim()}>
        <li className={iconItemClass}>
          <EmailShareButton url={shareUrl} title={shareTitle}>
            <EmailIcon size={34} round />
          </EmailShareButton>
        </li>
        <li className={iconItemClass}>
          <FacebookShareButton url={shareUrl} title={shareTitle}>
            <FacebookIcon size={34} round />
          </FacebookShareButton>
        </li>
        <li className={iconItemClass}>
          <TwitterShareButton url={shareUrl} title={shareTitle}>
            <TwitterIcon size={34} round />
          </TwitterShareButton>
        </li>
        <li className={iconItemClass}>
          <LinkedinShareButton url={shareUrl} title={shareTitle}>
            <LinkedinIcon size={34} round />
          </LinkedinShareButton>
        </li>
        <li className={iconItemClass}>
          <WhatsappShareButton url={shareUrl} title={shareTitle}>
            <WhatsappIcon size={34} round />
          </WhatsappShareButton>
        </li>
        <li className={iconItemClass}>
          <TelegramShareButton url={shareUrl} title={shareTitle}>
            <TelegramIcon size={34} round />
          </TelegramShareButton>
        </li>
      </ul>
    </article>
  );
};

export default SocialBanner;

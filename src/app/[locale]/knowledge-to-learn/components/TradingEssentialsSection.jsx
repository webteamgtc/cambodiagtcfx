"use client";

import { useState } from "react";
import Image from "next/image";
import RevealOnScroll from "@/app/[locale]/components/RevealOnScroll";
import { usePathTranslation } from "../../LocaleProvider";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
/* ── Checkmark Circle Icon (two states: filled for active, outlined for inactive) ── */

function CheckCircleIcon({ className, isActive }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="12"
        r="11"
        fill={isActive ? "#293B93" : "none"}
        stroke="#293B93"
        strokeWidth="1.8"
      />
      <path
        d="M7.5 12.5L10.5 15.5L16.5 9.5"
        stroke={isActive ? "#FFFFFF" : "#293B93"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── Chevron Icon ── */

function ChevronIcon({ className, isOpen }) {
  return (
    <svg
      className={`${className} transition-transform duration-300 ${isOpen ? "rotate-0" : "rotate-180"}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 9L12 15L18 9"
        stroke="#293B93"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── Accordion Data ── */

const ACCORDION_ITEMS = [
  {
    key: "learnLanguage",
    title: "Learn the Language of the Markets",
    content:
      "Master essential trading terminology and concepts. From pips and lots to bid/ask spreads, build the vocabulary you need to read charts, place orders, and communicate like a professional trader.",
          bullets: [
      "Micro accounts to start small",
      "Negative balance protection",
      "Dedicated beginner support team",
      "Step-by-step onboarding checklist",
      "Progress tracking dashboard",
    ],
  },
  {
    key: "whyBeginnersChoose",
    title: "Why Beginners Choose GTCFX",
    content:
      "GTCFX offers a beginner-friendly environment designed to help you start with confidence.",
    bullets: [
      "Micro accounts to start small",
      "Negative balance protection",
      "Dedicated beginner support team",
      "Step-by-step onboarding checklist",
      "Progress tracking dashboard",
    ],
  },
  {
    key: "openAccount",
    title: "Open a trading account in minutes",
    content:
      "Getting started is simple — register, verify your identity, fund your account, and begin trading across global markets with competitive spreads and lightning-fast execution.",
  },
  {
    key: "leverageMargin",
    title: "Understand leverage & margin",
    content:
      "Learn how leverage amplifies your market exposure and how margin requirements work. Understanding these concepts is key to managing risk and making informed trading decisions.",
  },
];

/* ── Accordion Item ── */

function AccordionItem({ title, content, bullets, isOpen, onToggle, delay = 0 }) {
  return (
    <RevealOnScroll delay={delay}>
      <div
        className="rounded-2xl border border-[#E1E7F6] bg-[#EAECF4] transition-shadow duration-300 hover:shadow-[0_4px_30px_rgba(41,59,147,0.1)]"
      >
        {/* Header */}
        <button
          type="button"
          onClick={onToggle}
          className="flex w-full items-center gap-3 px-5 py-4 text-left sm:px-6 sm:py-5"
          aria-expanded={isOpen}
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center">
            <CheckCircleIcon className="h-7 w-7" isActive={isOpen} />
          </span>
          <span className="HeadingH6 flex-1  text-[#000000]">
            {title}
          </span>
          <ChevronIcon className="h-5 w-5 shrink-0 text-[#293B93]" isOpen={isOpen} />
        </button>

        {/* Content */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-5 pb-5 sm:px-6 sm:pb-6">
            <div className="ml-11">
              <p className="TextSmall leading-relaxed text-[#666666]">{content}</p>
              {bullets && bullets.length > 0 && (
                <ul className="mt-4 space-y-2.5">
                  {bullets.map((bullet, index) => (
                    <li key={index} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#293B93]" />
                      <span className="TextSmall leading-relaxed text-[#444444]">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </RevealOnScroll>
  );
}

/* ── Section ── */

export default function TradingEssentialsSection({ locale = "en" }) {
  const [openIndex, setOpenIndex] = useState(0);
  const t = usePathTranslation("knowledgePage.tradingEssentials");

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="trading-essentials" className="bg-[#fff] pb-14 md:pb-20 lg:pb-24">
      <div className="container">
        {/* Content Grid */}
        <div className="grid gap-8 lg:mt-10 lg:grid-cols-2 lg:gap-10 xl:gap-14">
          {/* Left: Title + Accordions */}
          <div className="flex flex-col gap-4">
            {/* Header - inside left column */}
            <RevealOnScroll>
              <div>
                <h2 className="HeadingH3 font-bold text-[#293B93]">
                  {t("title", "Trading Essentials")}
                </h2>
                <p className="Text mt-4 text-[#666666]">
                  {t(
                    "subtitle",
                    "Build a strong foundation before entering the markets with these core concepts and tools."
                  )}
                </p>
              </div>
            </RevealOnScroll>

            {ACCORDION_ITEMS.map((item, index) => (
              <AccordionItem
                key={item.key}
                title={t(`items.${item.key}.title`, item.title)}
                content={t(`items.${item.key}.content`, item.content)}
                bullets={
                  item.bullets?.map((bullet, bulletIndex) =>
                    t(`items.${item.key}.bullets.${bulletIndex}`, bullet)
                  ) ?? undefined
                }
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
                delay={index * 80}
              />
            ))}
          </div>

          {/* Right: Dashboard Image + Button */}
          <RevealOnScroll delay={200}>
            <div className="flex flex-col items-center lg:min-h-[480px]">
              {/* Right column title */}
              <h3 className="HeadingH4 mb-5 w-full font-semibold text-[#000]">
                {t("dashboardTitle", "Your First Steps Into the Markets")}
              </h3>

              <div className="relative w-full overflow-hidden rounded-2xl border border-[#E1E7F6] bg-white shadow-[0_8px_40px_rgba(41,59,147,0.1)]">
                {/*
                  TODO: Update the image src path below to your actual dashboard image
                */}
                <Image
                  src="/knowledge-1.webp"
                  alt={t("dashboardTitle", "Your First Steps Into the Markets")}
                  width={600}
                  height={480}
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Open Live Account Button */}
              <Link
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="TextButton mt-6 inline-flex h-11 w-full items-center justify-center rounded-full bg-[#293B93] text-white transition hover:bg-[#243575] hover:no-underline sm:w-auto sm:px-8"
              >
                {t("openLiveAccount", "Open Live Account")}
                <FiArrowRight className="ml-2 h-4 w-4 shrink-0" aria-hidden />
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

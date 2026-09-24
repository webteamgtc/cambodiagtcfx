"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";


function ShieldIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
            <path
                d="M12 3l7 3v5c0 4.5-2.9 8.4-7 10-4.1-1.6-7-5.5-7-10V6l7-3Z"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
            />
            <path
                d="M9.5 12.2 11.3 14l3.7-3.8"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function AlertIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
            <path
                d="M12 9v4m0 3h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function InfoIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
            <path
                d="M12 8h.01M11 12h1v4h1"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
        </svg>
    );
}

function CheckIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
            <path
                d="M20 7 10 17l-4-4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function ArrowRightIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
            <path
                d="M5 12h14m0 0-5-5m5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function getSectionStyles(type) {
    if (type === "warning") {
        return {
            iconWrap: "bg-[#FFF4F4] text-[#C26B6B]",
            bullet: "text-[#C26B6B]",
            highlightBox: "border-[#F3D2D2] bg-[#FFF7F7]",
            highlightIcon: "text-[#C26B6B]",
        };
    }

    if (type === "highlight") {
        return {
            iconWrap: "bg-[#EFF4FF] text-[#0F3B8C]",
            bullet: "text-[#0F3B8C]",
            highlightBox: "border-[#DCE7F8] bg-[#F8FBFF]",
            highlightIcon: "text-[#0F3B8C]",
        };
    }

    if (type === "gold") {
        return {
            iconWrap: "bg-[#FFF8EA] text-[#B68756]",
            bullet: "text-[#B68756]",
            highlightBox:
                "border-[#E7D4AE] bg-[linear-gradient(180deg,#FFFDF8_0%,#FFF7EA_100%)]",
            highlightIcon: "text-[#B68756]",
        };
    }

    return {
        iconWrap: "bg-[#EFF4FF] text-[#0F3B8C]",
        bullet: "text-[#0F3B8C]",
        highlightBox: "border-[#DCE7F8] bg-[#F8FBFF]",
        highlightIcon: "text-[#0F3B8C]",
    };
}

function ContentsCard({ items, contentsLabel = "Contents", activeId }) {
    const navRefs = useRef({});

    useEffect(() => {
        if (!activeId) return;
        navRefs.current[activeId]?.scrollIntoView({
            block: "nearest",
            behavior: "smooth",
        });
    }, [activeId]);

    return (
        <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="flex flex-col rounded-[10px] border border-[#DCE7F8] bg-white p-5 shadow-[0_12px_32px_rgba(15,59,140,0.06)] lg:max-h-[calc(100vh-7rem)]">
                <div className="mb-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0F3B8C]">
                        {contentsLabel}
                    </p>
                </div>

                <div className="-mr-2 space-y-3 overflow-y-auto pr-2 lg:min-h-0 lg:flex-1">
                    {items.map((item) => {
                        const isActive = activeId === item.id;

                        return (
                            <a
                                key={item.id}
                                ref={(node) => {
                                    navRefs.current[item.id] = node;
                                }}
                                href={`#${item.id}`}
                                aria-current={isActive ? "true" : undefined}
                                className={[
                                    "group flex items-center justify-between rounded-md border px-4 py-3 text-sm font-medium transition-all duration-300",
                                    isActive
                                        ? "border-[#0F3B8C] bg-[#EFF4FF] text-[#0F3B8C] shadow-sm"
                                        : "border-[#E5ECF7] bg-[#FCFDFF] text-slate-700 hover:-translate-y-0.5 hover:border-[#0F3B8C]/30 hover:bg-[#F5F9FF] hover:text-[#0F3B8C]",
                                ].join(" ")}
                            >
                                <span className="flex items-center gap-3">
                                    <span
                                        className={[
                                            "inline-flex h-7 min-w-7 items-center justify-center rounded-lg px-2 text-xs font-semibold transition-colors duration-300",
                                            isActive
                                                ? "bg-[#0F3B8C] text-white"
                                                : "bg-[#EFF4FF] text-[#0F3B8C]",
                                        ].join(" ")}
                                    >
                                        {item.number}
                                    </span>
                                    <span>{item.title}</span>
                                </span>

                                <span
                                    className={[
                                        "text-[#0F3B8C] transition-opacity duration-300",
                                        isActive
                                            ? "opacity-100"
                                            : "opacity-0 group-hover:opacity-100",
                                    ].join(" ")}
                                >
                                    <ArrowRightIcon />
                                </span>
                            </a>
                        );
                    })}
                </div>
            </div>
        </aside>
    );
}


function PolicySectionCard({ section }) {
    const styles = getSectionStyles(section.type);
    const contentItems = Array.isArray(section.content) ? section.content : [];

    return (
        <section
            id={section.id}
            className="scroll-mt-28 rounded-[10px] border border-[#DCE7F8] bg-white p-6 shadow-[0_12px_32px_rgba(15,59,140,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#0F3B8C]/25 hover:shadow-[0_18px_46px_rgba(15,59,140,0.10)] md:p-8"
        >
            <div className="mb-6 flex items-start gap-4">
                <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${styles.iconWrap}`}
                >
                    {section.type === "warning" ? (
                        <AlertIcon />
                    ) : section.type === "gold" ? (
                        <InfoIcon />
                    ) : section.type === "highlight" ? (
                        <ShieldIcon />
                    ) : (
                        <ShieldIcon />
                    )}
                </div>

                <div className="min-w-0 flex-1">
                    <div className="mb-2 flex items-center gap-3">
                        <span className="inline-flex rounded-xl bg-[#0F3B8C] px-3 py-1 text-xs font-semibold tracking-[0.16em] text-white">
                            {section.number}
                        </span>
                        <span className="h-px flex-1 bg-gradient-to-r from-[#D8E4F8] to-transparent" />
                    </div>

                    <h2 className="HeadingH5">{section.title}</h2>
                </div>
            </div>

            {section.highlight && (
                <div className={`mb-6 rounded-2xl border p-4 ${styles.highlightBox}`}>
                    <div className="flex items-start gap-3">
                        <div className={`mt-0.5 ${styles.highlightIcon}`}>
                            <InfoIcon />
                        </div>
                        <p className="text-sm leading-7 text-slate-700">{section.highlight}</p>
                    </div>
                </div>
            )}

            <div className="space-y-4">
                {contentItems.map((item, index) => (
                    Array.isArray(section.groups) && section.groups.length > 0 ? (
                        <p key={index} className="text-[15px] leading-8 text-slate-700">
                            {item}
                        </p>
                    ) : (
                        <div key={index} className="flex items-start gap-3">
                            <div className={`mt-1 ${styles.bullet}`}>
                                <CheckIcon />
                            </div>
                            <p className="text-[15px] leading-8 text-slate-700">{item}</p>
                        </div>
                    )
                ))}
            </div>

            {Array.isArray(section.groups) && section.groups.length > 0 && (
                <div className="mt-6 grid gap-5 md:grid-cols-2">
                    {section.groups.map((group) => (
                        <div
                            key={group.title}
                            className="overflow-hidden rounded-2xl border border-[#DCE7F8] bg-[#F8FBFF]"
                        >
                            <div className="border-b border-[#DCE7F8] bg-[#EFF4FF] px-5 py-4">
                                <h3 className="text-base font-semibold text-[#0F3B8C]">
                                    {group.title}
                                </h3>
                            </div>
                            <div className="space-y-2 px-5 py-5">
                                {group.lines.map((line, index) => (
                                    <p
                                        key={`${group.title}-${index}`}
                                        className="text-sm leading-7 text-slate-700"
                                    >
                                        {line}
                                    </p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default function PrivacyPolicyPage({ data }) {
    const pageData =
        Array.isArray(data) && data.length
            ? { content: data }
            : data && typeof data === "object"
              ? data
              : null;

    const policyList = Array.isArray(pageData?.content) ? pageData.content : [];
    const footerButtons = pageData?.footer?.buttons ?? [];
    const secondaryButton = footerButtons[1];
    const secondaryHref =
        typeof secondaryButton?.href === "string" && secondaryButton.href.trim()
            ? secondaryButton.href
            : "#introduction";
    const sectionIds = useMemo(
        () => policyList.map((section) => section.id).filter(Boolean),
        [policyList]
    );
    const [activeSectionId, setActiveSectionId] = useState(
        () => sectionIds[0] ?? null
    );

    useEffect(() => {
        if (!sectionIds.length) return;

        const ACTIVATION_OFFSET = 140;

        const updateActiveSection = () => {
            let currentId = sectionIds[0];

            for (const id of sectionIds) {
                const element = document.getElementById(id);
                if (!element) continue;

                if (element.getBoundingClientRect().top <= ACTIVATION_OFFSET) {
                    currentId = id;
                }
            }

            setActiveSectionId((previousId) =>
                previousId === currentId ? previousId : currentId
            );
        };

        updateActiveSection();
        window.addEventListener("scroll", updateActiveSection, { passive: true });
        window.addEventListener("resize", updateActiveSection);

        return () => {
            window.removeEventListener("scroll", updateActiveSection);
            window.removeEventListener("resize", updateActiveSection);
        };
    }, [sectionIds]);

    return (
        <div className="bg-[linear-gradient(180deg,#F4F8FF_0%,#FFFFFF_35%,#F8FBFF_100%)]">
            <section className="relative overflow-hidden">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute left-0 top-0 h-72 w-72 rounded-xl bg-[#0F3B8C]/8 blur-3xl" />
                    <div className="absolute right-0 top-16 h-72 w-72 rounded-xl bg-[#B68756]/10 blur-3xl" />
                </div>

                <div className="container pt-14 pb-10 md:pt-20 md:pb-14">
                    <div className="max-w-5xl">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-xl border border-[#D9E5F7] bg-white/80 px-4 py-2 text-sm font-medium text-[#0F3B8C] backdrop-blur">
                            <span className="h-2 w-2 rounded-xl bg-[#B68756]" />
                            {pageData?.topSection?.badge}
                        </div>

                        <h1 className="HeadingH4 font-bold mt-8">
                            {pageData?.topSection?.title}
                        </h1>

                        <p className="mt-5 text-base leading-8 text-slate-600">
                            {pageData?.topSection?.description}
                        </p>
                    </div>

                    <div className="mt-8 grid grid-cols-1 gap-5">
                        <div className="rounded-[10px] border border-[#DCE7F8] bg-white/90 p-5 shadow-[0_12px_32px_rgba(15,59,140,0.06)] backdrop-blur md:p-6 lg:p-8">
                            <h2 className="text-xl font-semibold text-slate-900">
                                {pageData?.topSection?.aboutThisPolicy?.title}
                            </h2>
                            <div className="mt-4 space-y-4">
                                {pageData?.topSection?.aboutThisPolicy?.items?.map((item, index) => (
                                    <p key={index} className="text-[15px] leading-7 text-slate-700">
                                        {item}
                                    </p>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-[10px] border border-[#E7D4AE] bg-[linear-gradient(180deg,#FFFDF8_0%,#FFF7EA_100%)] p-5 shadow-[0_12px_32px_rgba(182,135,86,0.10)] md:p-6 lg:p-8">
                            <div className="mb-4 inline-flex rounded-xl bg-[#B68756] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white">
                                {pageData?.topSection?.keyNotice?.badge}
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                {pageData?.topSection?.keyNotice?.items?.map((item, index) => (
                                    <div key={index} className="flex items-start gap-3 rounded-2xl border border-[#E7D4AE]/60 bg-white/50 p-4">
                                        <div className="mt-0.5 shrink-0 text-[#B68756]">
                                            <CheckIcon />
                                        </div>
                                        <p className="text-sm leading-7 text-slate-700">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container pb-16 md:pb-24">
                <div className="grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)]">
                    <ContentsCard
                        items={policyList}
                        contentsLabel={pageData?.sidebarLabels?.contentsLabel}
                        activeId={activeSectionId}
                    />

                    <div className="space-y-6 md:space-y-8">
                        {policyList.map((section) => (
                            <PolicySectionCard key={section.id} section={section} />
                        ))}

                        <section className="rounded-[10px] border border-[#DCE7F8] bg-white p-6 shadow-[0_12px_32px_rgba(15,59,140,0.06)] md:p-8">
                            <div className="grid gap-6 md:grid-cols-1 md:items-center">
                                <div>
                                    <div className="mb-3 inline-flex rounded-md bg-[#EFF4FF] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#0F3B8C]">
                                        {pageData?.footer?.badge}
                                    </div>

                                    <h2 className="HeadingH4">
                                        {pageData?.footer?.title}
                                    </h2>

                                    <p className="mt-3 max-w-2xl text-[15px] leading-8 text-slate-600">
                                        {pageData?.footer?.description}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    <Link
                                        href="/company/contact-us"
                                        className="inline-flex items-center justify-center rounded-2xl bg-[#0F3B8C] px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0B2F70]"
                                    >
                                        {pageData?.footer?.buttons?.[0]?.label}
                                    </Link>

                                    <Link
                                        href={secondaryHref}
                                        className="inline-flex items-center justify-center rounded-2xl border border-[#D6E2F4] bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0F3B8C]/30 hover:text-[#0F3B8C]"
                                    >
                                        {pageData?.footer?.buttons?.[1]?.label}
                                    </Link>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </section>
        </div>
    );
}

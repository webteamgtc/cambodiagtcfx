"use client";
import React, { useCallback, useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import SocialBanner from "../common/SocialBanner";
import { fetchStrapiCollection, mapStrapiLocale, toAbsoluteStrapiMediaUrl } from "@/lib/strapi";
import MorePosts from "./MorePosts";
import TradingViewWidget from "./DetailWidget";
import CommentForm from "./CommentForm";
import { usePathTranslation } from "../../LocaleProvider";

const SingleDetailPage = ({ url, page }) => {
    const params = useParams();
    const t = usePathTranslation("common.blogs");
    const [data, setData] = useState(null);
    const [recentData, setRecentData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const [recentLoading, setRecentLoading] = useState(false);
    const [readingProgress, setReadingProgress] = useState(0);
    const [copied, setCopied] = useState(false);
    const [renderedHtml, setRenderedHtml] = useState("");
    const [tocItems, setTocItems] = useState([]);
    const [activeHeading, setActiveHeading] = useState("");
    const getCategory = () => {
        switch (url) {
            case "highlights":
                return 2;
            case "latest-news":
                return 1;
            case "company-news":
                return 7;
            case "market-overview":
                return 5;
            case "blogs":
                return 6;
            case "technical-analysis":
                return 8;
            case "fundamental-analysis":
                return 9;
            case "weekly-forecasts":
                return 10;
        }
    };

    const buildPopulateParams = () => ({
        "populate[imageUrl][fields][0]": "url",
        "populate[category][fields][0]": "name",
        "populate[category][fields][1]": "slug",
        "populate[author][fields][0]": "name",
        "populate[author][fields][1]": "designation",
        "populate[author][fields][2]": "bio",
        "populate[author][fields][3]": "description",
        "populate[author][populate][authorImg][fields][0]": "url",
    });

    const formatDate = (iso) => {
        if (!iso) return null;
        try {
            return new Date(iso).toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
            });
        } catch {
            return null;
        }
    };

    const currentSlug = decodeURIComponent(page == "sub" ? params?.subslug : params?.slug || "");
    const currentLocale = mapStrapiLocale(params?.locale);

    const fetchData = useCallback(async () => {
        if (!currentSlug) return;
        setLoading(true);
        const loadByLocale = async (localeToUse) =>
            fetchStrapiCollection("blogs", {
                locale: localeToUse,
                populate: null,
                sort: "createdAt:desc",
                params: {
                    ...buildPopulateParams(),
                    "filters[slug][$eq]": currentSlug,
                    "pagination[start]": 0,
                    "pagination[limit]": 1,
                },
                cache: "no-store",
            });

        try {
            let res = await loadByLocale(currentLocale);
            if ((!res?.data || res.data.length === 0) && currentLocale !== "en") {
                res = await loadByLocale("en");
            }

            if (!res?.data || res.data.length === 0) {
                setNotFound(true);
                setData(null);
                return;
            }

            const row = res.data[0];
            const attrs = row?.attributes ?? row ?? {};
            const normalizedAuthor =
                attrs?.author?.data?.attributes || attrs?.author || null;
            const normalized = {
                ...row,
                attributes: {
                    ...attrs,
                    author: normalizedAuthor,
                },
            };
            setData(normalized);
            setNotFound(false);
        } catch (err) {
            setData(null);
            setNotFound(true);
        } finally {
            setLoading(false);
        }
    }, [currentLocale, currentSlug]);

    const fetchRecentData = useCallback(async (start, limit) => {
        setRecentLoading(true);
        const categoryId = getCategory();
        const loadByLocale = async (localeToUse) =>
            fetchStrapiCollection("blogs", {
                locale: localeToUse,
                populate: null,
                sort: "createdAt:desc",
                params: {
                    ...buildPopulateParams(),
                    ...(categoryId ? { "filters[category][id][$eq]": categoryId } : {}),
                    "pagination[start]": start,
                    "pagination[limit]": limit,
                },
                cache: "no-store",
            });

        try {
            let res = await loadByLocale(currentLocale);
            if ((!res?.data || res.data.length === 0) && currentLocale !== "en") {
                res = await loadByLocale("en");
            }
            const rows = Array.isArray(res?.data) ? res.data : [];
            setRecentData(
                rows.filter((x) => {
                    const slug = x?.attributes?.slug || x?.slug || x?.documentId;
                    return slug !== currentSlug;
                })
            );
        } catch (err) {
            setRecentData([]);
        } finally {
            setRecentLoading(false);
        }
    }, [currentLocale, currentSlug, url]);

    useEffect(() => {
        if (!currentSlug) return;
        const pageLimit = Number(process.env.NEXT_PUBLIC_PAGE_LIMIT) || 6;
        fetchData();
        fetchRecentData(0, pageLimit);
    }, [currentSlug, fetchData, fetchRecentData]);

    useEffect(() => {
        const handleScroll = () => {
            const doc = document.documentElement;
            const scrollTop = doc.scrollTop || document.body.scrollTop;
            const scrollHeight = doc.scrollHeight - doc.clientHeight;
            const progress = scrollHeight > 0 ? Math.min(100, (scrollTop / scrollHeight) * 100) : 0;
            setReadingProgress(progress);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const html = data?.attributes?.descreption || "";
        if (!html) {
            setRenderedHtml("");
            setTocItems([]);
            setActiveHeading("");
            return;
        }

        const container = document.createElement("div");
        container.innerHTML = html;
        const headings = Array.from(container.querySelectorAll("h2, h3"));

        const slugify = (text) =>
            String(text || "")
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9\s-]/g, "")
                .replace(/\s+/g, "-")
                .replace(/-+/g, "-");

        const used = new Set();
        const items = headings.map((node, index) => {
            const level = node.tagName.toLowerCase();
            const title = (node.textContent || "").trim();
            const baseId = node.id || slugify(title) || `section-${index + 1}`;
            let id = baseId;
            let count = 1;
            while (used.has(id)) {
                count += 1;
                id = `${baseId}-${count}`;
            }
            used.add(id);
            node.id = id;
            return { id, title: title || `Section ${index + 1}`, level };
        });

        setRenderedHtml(container.innerHTML);
        setTocItems(items);
        setActiveHeading(items[0]?.id || "");
    }, [data?.attributes?.descreption]);

    useEffect(() => {
        if (!tocItems.length) return;
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
                if (visible.length) {
                    setActiveHeading(visible[0].target.id);
                }
            },
            { rootMargin: "-20% 0px -65% 0px", threshold: [0.2, 0.4, 0.7] }
        );

        tocItems.forEach((item) => {
            const el = document.getElementById(item.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [tocItems]);

    const handleCopyArticleLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1800);
        } catch {
            setCopied(false);
        }
    };

    const handleTocClick = (id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.scrollY - 110;
        window.scrollTo({ top, behavior: "smooth" });
        setActiveHeading(id);
    };



    // Calculate reading time
    const readingTime = useMemo(() => {
        if (!data?.attributes?.descreption) return 0;
        const text = data.attributes.descreption.replace(/<[^>]*>/g, ""); // Remove HTML tags
        const words = text.split(/\s+/).length;
        const minutes = Math.ceil(words / 200); // Average reading speed: 200 words per minute
        return minutes;
    }, [data?.attributes?.descreption]);

    // Format dates
    const publishedDate = useMemo(() => {
        if (!data?.attributes?.createdAt) return null;
        return formatDate(data.attributes.createdAt);
    }, [data?.attributes?.createdAt]);

    const updatedDate = useMemo(() => {
        if (!data?.attributes?.updatedAt) return null;
        return formatDate(data.attributes.updatedAt);
    }, [data?.attributes?.updatedAt]);


    // Get author data
    const author = data?.attributes?.author || null;
    const authorName = data?.attributes?.author?.name || "GTCFX Team";
    const authorImage = author?.authorImg?.data?.attributes?.url
        ? toAbsoluteStrapiMediaUrl(author?.authorImg?.data?.attributes?.url)
        : null;
    const categoryName =
        data?.attributes?.category?.data?.attributes?.name ||
        data?.attributes?.category?.name ||
        "Market Update";
    const coverImage =
        data?.attributes?.imageUrl?.data?.attributes?.url
            ? toAbsoluteStrapiMediaUrl(data?.attributes?.imageUrl?.data?.attributes?.url)
            : null;
    const detailFlexClass = page == "sub" ? "lg:col-span-12" : "lg:col-span-8";
    const sectionBase = "rounded-2xl border border-gray-100";


    return (
        <>
            <div className="fixed left-0 top-0 z-50 h-1 w-full bg-transparent">
                <div
                    className="h-full bg-secondary transition-all duration-150"
                    style={{ width: `${readingProgress}%` }}
                />
            </div>
            <div className="fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 xl:block">
                <SocialBanner
                    bare
                    showBackground={false}
                    orientation="vertical"
                    showHeader={false}
                    showCopy={false}
                    hoverExpand
                />
            </div>

            {notFound ? (
                <section className="container py-16">
                    <div className="mx-auto max-w-2xl rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.172 9a4 4 0 015.656 0M9 15h.01M15 15h.01M12 21a9 9 0 100-18 9 9 0 000 18z" />
                            </svg>
                        </div>
                        <h2 className="mb-2 text-2xl font-bold text-gray-900">{t("articleNotFound", "Article not found")}</h2>
                        <p className="mx-auto mb-6 max-w-lg text-gray-600">
                            This article may have been moved or removed. Explore more updates from our latest posts.
                        </p>
                        <Link
                            href={`/${params?.locale || "en"}/company-news`}
                            className="inline-flex items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90"
                        >
                            Back to News
                        </Link>
                    </div>
                </section>
            ) : (
                <>
                    <section className="container mt-8 grid grid-cols-1 gap-8 pb-14 lg:mt-10 lg:grid-cols-12 lg:gap-10">
                        <div className={detailFlexClass}>
                            <div className={`${sectionBase} md:mb-6 mb-4 flex flex-wrap items-center justify-between gap-3 md:px-4 px-2 md:py-3 py-2`}>
                                <Link
                                    href={`/${params?.locale || "en"}/${url || "company-news"}`}
                                    className="inline-flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-semibold text-primary transition hover:bg-primary/5 hover:text-primary/80"
                                >
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    Back to Articles
                                </Link>
                                <button
                                    type="button"
                                    onClick={handleCopyArticleLink}
                                    className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:border-primary/30 hover:bg-primary/5"
                                >
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16h8m-8-4h8m-8-4h8M7 3h10a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z" />
                                    </svg>
                                    {copied ? "Link copied" : "Copy article link"}
                                </button>
                            </div>

                            {tocItems.length > 0 && (
                                <div className={`${sectionBase} md:mb-6 mb-4 md:p-4 p-2 lg:hidden`}>
                                    <label htmlFor="mobile-toc" className="mb-2 block text-sm font-semibold text-gray-900">
                                        Jump to section
                                    </label>
                                    <div className="relative">
                                        <select
                                            id="mobile-toc"
                                            value={activeHeading || tocItems[0]?.id}
                                            onChange={(e) => handleTocClick(e.target.value)}
                                            className="w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 py-2 pr-9 text-sm text-gray-800 outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                                        >
                                            {tocItems.map((item) => (
                                                <option key={item.id} value={item.id}>
                                                    {item.level === "h3" ? `- ${item.title}` : item.title}
                                                </option>
                                            ))}
                                        </select>
                                        <svg className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            )}


                            {/* Article title */}
                            {data?.attributes?.title ? (
                                <header className={`${sectionBase} md:mb-6 mb-4 md:p-6 p-4`}>
                                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary/70">
                                        {categoryName}
                                    </p>
                                    <h1 className="text-2xl font-bold leading-tight text-gray-900 md:text-3xl lg:text-4xl">
                                        {data.attributes.title}
                                    </h1>
                                    {(publishedDate || readingTime > 0) && (
                                        <p className="mt-3 text-sm text-gray-500">
                                            {publishedDate ? `Published ${publishedDate}` : null}
                                            {publishedDate && readingTime > 0 ? " · " : null}
                                            {readingTime > 0 ? `${readingTime} min read` : null}
                                        </p>
                                    )}
                                    {coverImage ? (
                                        <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-xl">
                                            <Image
                                                src={coverImage}
                                                alt={data.attributes.title}
                                                fill
                                                className="object-cover"
                                                priority
                                                unoptimized
                                            />
                                        </div>
                                    ) : null}
                                </header>
                            ) : null}

                            {/* Blog Content */}
                            <article className={`${sectionBase} md:mb-8 mb-6`}>
                                <div
                                    className="single-blog-descreption prose prose-lg max-w-none prose-headings:mb-4 prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-8 prose-p:mb-6 prose-a:text-secondary prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8 prose-blockquote:border-l-4 prose-blockquote:border-secondary prose-blockquote:bg-slate-50 prose-blockquote:rounded-r-lg prose-blockquote:py-2 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-600 prose-ul:list-disc prose-ol:list-decimal prose-li:marker:text-secondary"
                                    dangerouslySetInnerHTML={{
                                        __html: renderedHtml || data?.attributes?.descreption,
                                    }}
                                />
                            </article>

                            {/* Divider */}
                            <div className="md:my-10 my-8 flex items-center justify-center">
                                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                                <div className="mx-4 flex h-7 w-7 items-center justify-center rounded-xl bg-secondary/10">
                                    <span className="h-2 w-2 rounded-xl bg-secondary" />
                                </div>
                                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                            </div>

                            {/* Author Details Section */}
                            {author && (
                                <div className={`${sectionBase} md:mb-8 mb-6 md:p-5 p-4 md:py-6 py-4`}>
                                    <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary/70">
                                        <span className="h-1.5 w-1.5 rounded-xl bg-secondary" />
                                        About the author
                                    </div>
                                    <div className="flex flex-col items-start gap-6 md:flex-row">
                                        {/* Author Image */}
                                        <div className="flex-shrink-0">
                                            <div className="relative h-16 w-16 md:h-20 md:w-20">
                                                {authorImage ? (
                                                    <Image
                                                        src={authorImage}
                                                        alt={authorName}
                                                        fill
                                                        className="rounded-xl object-cover border-2 border-primary"
                                                        unoptimized
                                                    />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center rounded-xl border-2 border-primary/40 bg-gradient-to-br from-primary to-secondary text-2xl font-bold text-white md:text-3xl">
                                                        {authorName.charAt(0).toUpperCase()}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Author Info */}
                                        <div className="flex-1">
                                            <h3 className="mb-2 text-lg font-semibold text-primary md:text-xl">
                                                {authorName}
                                            </h3>
                                            {author?.designation && (
                                                <p className="mb-3 text-sm font-medium text-gray-600">
                                                    {author.designation}
                                                </p>
                                            )}
                                            {author?.bio && (
                                                <p className="mb-4 text-sm leading-relaxed text-gray-700 md:text-base">
                                                    {author.bio}
                                                </p>
                                            )}
                                            {(!author?.bio && author?.description) && (
                                                <p className="mb-4 text-sm leading-relaxed text-gray-700 md:text-base">
                                                    {author.description}
                                                </p>
                                            )}

                                        </div>
                                    </div>
                                </div>
                            )}

                            {data && (
                                <CommentForm
                                    blogSlug={data?.attributes?.slug}
                                    blogId={data?.id}
                                />
                            )}
                        </div>

                        {page != "sub" && (
                            <div className="md:space-y-6 space-y-4 self-start lg:sticky lg:top-24 lg:col-span-4">
                                {tocItems.length > 0 && (
                                    <div className={`rounded-3xl bg-[#ECECEF] p-4 md:p-5 hidden lg:block`}>
                                        <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-gray-900">
                                            <svg className="h-5 w-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h10" />
                                            </svg>
                                            Table of Contents
                                        </h3>
                                        <div className="md:max-h-[340px] max-h-[280px] space-y-1.5 overflow-auto pr-1">
                                            {tocItems.map((item) => (
                                                <button
                                                    key={item.id}
                                                    type="button"
                                                    onClick={() => handleTocClick(item.id)}
                                                    className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition ${activeHeading === item.id
                                                        ? "bg-white font-semibold text-primary"
                                                        : "text-gray-700 hover:bg-gray-50"
                                                        } ${item.level === "h3" ? "pl-6" : ""}`}
                                                >
                                                    {item.title}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="">

                                    <TradingViewWidget />
                                </div>

                                {/* Related Posts */}
                                {!isLoading && recentLoading ? (
                                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                                        <div className="animate-pulse space-y-4">
                                            <div className="h-5 w-1/2 rounded bg-slate-200" />
                                            <div className="h-16 rounded bg-slate-100" />
                                            <div className="h-16 rounded bg-slate-100" />
                                        </div>
                                    </div>

                                ) : (
                                    recentData?.length > 0 && (
                                        <div className="rounded-3xl bg-[#ECECEF] p-4 md:p-5">
                                            <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-[#070B17]">
                                                <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl bg-primary/10">
                                                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                    </svg>
                                                </span>
                                                <span>
                                                    {t("relatedArticles", "Related Articles")}
                                                </span>
                                            </h3>
                                            <MorePosts recentData={recentData} />
                                        </div>
                                    )
                                )}
                                {!isLoading && !recentLoading && recentData?.length === 0 && (
                                    <div className="rounded-2xl border border-[#E3E4EA] bg-[#F4F5F8] p-6">
                                        <h3 className="mb-2 text-lg font-bold text-[#070B17]">{t("relatedArticles", "Related Articles")}</h3>
                                        <p className="text-sm text-[#6F7483]">{t("noRelatedPosts", "No related posts available right now.")}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </section>
                </>
            )}
        </>
    );
};

export default SingleDetailPage;

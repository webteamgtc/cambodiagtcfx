"use client";
import { useParams, useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import BlogCoverImage from "../common/BlogCoverImage";
import { getBlogPostImageUrl } from "@/lib/strapiBlogs";
export default function SingleBlogSection(props) {
    const { posts, uiText = {} } = props;
    const { locale } = useParams();
    const router = useRouter();
    const pathname = usePathname();

    const attrs = posts?.attributes ?? posts ?? {};
    const categorySlug =
        attrs?.category?.data?.attributes?.slug || attrs?.categorySlug || "company-news";
    const slug = attrs?.slug || attrs?.documentId || posts?.slug || "";
    const imageUrl = getBlogPostImageUrl(posts);
    const categoryName =
        attrs?.category?.data?.attributes?.name ||
        attrs?.category?.name ||
        attrs?.category ||
        uiText.defaultCategory ||
        "Company News";
    const title = attrs?.title || posts?.title || "";
    const description = attrs?.short_descreption || attrs?.shortDescription || attrs?.description || posts?.excerpt || "";
    const authorName = attrs?.author?.name || attrs?.author?.data?.attributes?.name || "";
    const authorImage =
        attrs?.author?.authorImg?.data?.attributes?.url ||
        attrs?.author?.data?.attributes?.authorImg?.data?.attributes?.url ||
        "";


    const toMediaUrl = (url) => {
        if (!url) return "";
        if (String(url).startsWith("http")) return String(url);
        const base = (process.env.NEXT_PUBLIC_STRAPI_MEDIA_URL || process.env.NEXT_PUBLIC_STRAPI_API_URL || "").replace(/\/$/, "");
        return `${base}${url}`;
    };

    const handleNavigate = (blog) => {
        const blogAttrs = blog?.attributes ?? blog ?? {};
        const blogCategorySlug =
            blogAttrs?.category?.data?.attributes?.slug ||
            blogAttrs?.categorySlug ||
            categorySlug;
        const blogSlug =
            blogAttrs?.slug || blogAttrs?.documentId || blog?.slug || slug;
        if (!blogSlug) return;
        if (pathname.endsWith("/company-news")) {
            router.push(`/${locale}/company-news/${blogSlug}`);
            return;
        }
        router.push(
            `/${blogCategorySlug}/${blogSlug}`,
            { locale: locale }
        );
    };
    return (
        <div className="space-y-20 lg:space-y-20">
            <article
                key={posts?.id}
                className="relative isolate flex flex-col gap-8 lg:flex-row md:items-center"
            >

                <div className="basis-full md:basis-7/12">
                    <div className="relative h-56 w-full md:h-[436px]">
                        <BlogCoverImage
                            src={imageUrl}
                            alt={title || "Featured blog article"}
                            className="rounded-lg object-cover"
                            sizes="(max-width: 768px) 100vw, 58vw"
                        />
                    </div>
                </div>
                <div
                    className="basis-full md:basis-5/12  cursor-pointer"
                    onClick={() => {
                        handleNavigate(posts);
                    }}
                >
                    <div className="flex items-center gap-x-4 text-xs">
                        <a className="relative z-10 rounded-xl bg-secondary px-3 py-1.5 text-white">
                            {categoryName}
                        </a>
                    </div>
                    <div className="group relative max-w-xl">
                        <h3 className="mt-3 HeadingH3 text-left leading-10">
                            <a>
                                <span className="absolute inset-0" />
                                {title}
                            </a>
                        </h3>
                        <p className="mt-5 text text-left leading-6 text-primary">
                            {description}
                        </p>
                    </div>
                    <div className="mt-4 flex border-t border-gray-900/5 pt-4">
                        <div className="relative flex items-center gap-x-4">
                            {authorImage ? (
                                <img
                                    src={toMediaUrl(authorImage)}
                                    alt=""
                                    className="h-10 w-10 rounded-xl bg-gray-50"
                                />
                            ) : null}

                            <div className="text text-left leading-6">
                                <p className="font-semibold text-gray-900">
                                    <a>
                                        <span className="absolute inset-0" />
                                        {authorName}
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
}

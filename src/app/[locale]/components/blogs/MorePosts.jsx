"use client";

import { useParams, useRouter } from "next/navigation";
import BlogCoverImage from "../common/BlogCoverImage";
import { getBlogPostImageUrl } from "@/lib/strapiBlogs";

const MorePosts = (props) => {
  const { recentData } = props;
  const router = useRouter();
  const params = useParams();
  const handleNavigate = (post) => {
    const locale = params?.locale || "en";
    const categorySlug =
      post?.attributes?.category?.data?.attributes?.slug ||
      post?.attributes?.category?.slug ||
      "company-news";
    const postSlug = post?.attributes?.slug || post?.slug;
    if (!postSlug) return;
    router.push(`/${locale}/${categorySlug}/${postSlug}`);
  };

  const formatPostDate = (value) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    const diffMs = Date.now() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours >= 0 && diffHours < 24) {
      return diffHours <= 1 ? "1 hour ago" : `${diffHours} hours ago`;
    }
    return new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
      .format(date)
      .replace(",", ", ");
  };

  return (
    <div className="">
      <div className="space-y-5">
        {recentData?.slice(0, 5).map((post) => {
          const imageSrc = getBlogPostImageUrl(post);
          const title = post?.attributes?.title || "Latest market update";
          const timeLabel = formatPostDate(
            post?.attributes?.publishedAt || post?.attributes?.createdAt
          );
          return (
            <article
              className="group flex cursor-pointer items-start justify-between gap-4"
              key={post?.id}
              onClick={() => {
                handleNavigate(post);
              }}
            >
              <div className="min-w-0 flex-1">
                <h3 className="line-clamp-2 TextSmall font-semibold leading-[1.35] text-[#070B17] transition group-hover:text-primary">
                  {title}
                </h3>
                <p className="mt-1 text-xs leading-6 text-[#7B8090]">{timeLabel}</p>
              </div>
              <div className="relative h-[64px] w-[90px] shrink-0 overflow-hidden rounded-[16px] bg-[#d1d1d1]">
                <BlogCoverImage
                  src={imageSrc}
                  alt={title}
                  className="object-cover transition duration-300 group-hover:scale-105"
                  sizes="90px"
                />
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default MorePosts;

import { getBlogPostImageUrl } from "@/lib/strapiBlogs";

export function getPostImageUrl(post) {
  return getBlogPostImageUrl(post);
}

export function getPostExcerpt(post, fallback = "") {
  const attrs = post?.attributes ?? post ?? {};
  return (
    attrs?.short_descreption ||
    attrs?.shortDescription ||
    attrs?.descreption ||
    attrs?.description ||
    fallback
  );
}

export function getPostAuthor(post, fallback = "") {
  const attrs = post?.attributes ?? post ?? {};
  return (
    attrs?.author?.data?.attributes?.name ||
    attrs?.author?.name ||
    attrs?.author?.data?.attributes?.title ||
    fallback
  );
}

export function formatPostDate(isoString, fallback = "") {
  if (!isoString) return fallback;
  try {
    return new Date(isoString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return fallback;
  }
}

export function getPostSlug(post) {
  const attrs = post?.attributes ?? post ?? {};
  return attrs?.slug || attrs?.documentId || post?.slug || "";
}

export function getPostTitle(post, fallback = "") {
  const attrs = post?.attributes ?? post ?? {};
  return attrs?.title || fallback;
}

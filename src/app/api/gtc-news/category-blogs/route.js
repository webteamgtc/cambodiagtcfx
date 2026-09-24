import {
  fetchBlogsByCategorySlug,
  mapBlogPostForNewsCard,
} from "@/lib/strapiBlogs";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const categorySlug = searchParams.get("category") || "";
  const locale = searchParams.get("locale") || "en";
  const start = Math.max(Number(searchParams.get("start") || 0), 0);
  const limit = Math.min(Number(searchParams.get("limit") || 12), 24);

  if (!categorySlug.trim()) {
    return Response.json({ posts: [], total: 0, hasMore: false }, { status: 400 });
  }

  const { data = [], meta } = await fetchBlogsByCategorySlug(
    locale,
    categorySlug,
    start,
    limit
  );

  const posts = (Array.isArray(data) ? data : []).map((post) =>
    mapBlogPostForNewsCard(post, locale)
  );
  const total = Number(meta?.pagination?.total ?? posts.length);

  return Response.json({
    posts,
    total,
    hasMore: start + posts.length < total,
  });
}

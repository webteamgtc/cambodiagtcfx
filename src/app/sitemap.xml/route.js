import { buildSitemapXml } from "@/lib/sitemap/buildSitemap";

export const dynamic = "force-dynamic";

export async function GET() {
  const xml = await buildSitemapXml();

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "no-cache, must-revalidate",
    },
  });
}

import { normalizePlatformGuideLocale } from "@/lib/platform-guide/locales";
import { getGtcGoPlaylistVideos } from "@/lib/platform-guide/youtube";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = normalizePlatformGuideLocale(searchParams.get("locale"));

    const result = await getGtcGoPlaylistVideos(locale);

    return Response.json(
      {
        success: true,
        source: "youtube",
        channelHandle: process.env.YOUTUBE_CHANNEL_HANDLE || "GTCFXMarketing",
        platform: "gettingStarted",
        requestedLocale: result.requestedLocale,
        resolvedLocale: result.resolvedLocale,
        fallbackUsed: result.fallbackUsed,
        playlistId: result.playlistId,
        playlistTitle: result.playlistTitle,
        data: {
          videos: result.videos,
        },
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (error) {
    console.error("Platform guide YouTube API error:", error);

    return Response.json(
      {
        success: false,
        source: "youtube",
        message:
          error instanceof Error
            ? error.message
            : "Failed to load YouTube playlist videos.",
        data: { videos: [] },
      },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }
}

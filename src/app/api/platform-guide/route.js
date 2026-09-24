import {
  getPlatformGuideFromDrive,
  PLATFORM_DRIVE_FOLDERS,
} from "@/lib/platform-guide/googleDrive";
import {
  normalizePlatformGuideLocale,
  PLATFORM_GUIDE_LOCALE_FOLDERS,
} from "@/lib/platform-guide/locales";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

function normalizeLocale(locale) {
  return normalizePlatformGuideLocale(locale);
}

function normalizePlatform(platform) {
  const value = String(platform || "gtcgo").trim().toLowerCase();

  for (const key of Object.keys(PLATFORM_DRIVE_FOLDERS)) {
    if (key.toLowerCase() === value) {
      return key;
    }
  }

  return "gtcgo";
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestedLocale = normalizeLocale(searchParams.get("locale"));
    const platform = normalizePlatform(searchParams.get("platform"));
    const rootFolderId = PLATFORM_DRIVE_FOLDERS[platform];

    if (!rootFolderId) {
      return Response.json(
        {
          success: false,
          message: `No Google Drive folder configured for platform "${platform}".`,
          data: { png: [], pdf: [] },
        },
        { status: 404 }
      );
    }

    let resolvedLocale = requestedLocale;
    let fallbackUsed = false;

    let data = await getPlatformGuideFromDrive(
      rootFolderId,
      PLATFORM_GUIDE_LOCALE_FOLDERS[requestedLocale] ||
        PLATFORM_GUIDE_LOCALE_FOLDERS.en
    );

    if (
      requestedLocale !== "en" &&
      data.png.length === 0 &&
      data.pdf.length === 0
    ) {
      resolvedLocale = "en";
      fallbackUsed = true;

      data = await getPlatformGuideFromDrive(
        rootFolderId,
        PLATFORM_GUIDE_LOCALE_FOLDERS.en
      );
    }

    return Response.json(
      {
        success: true,
        source: "google-drive",
        requestedLocale,
        resolvedLocale,
        fallbackUsed,
        platform,
        folderId: rootFolderId,
        folders: data.folders,
        data: {
          png: data.png,
          pdf: data.pdf,
        },
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (error) {
    console.error("Platform guides API error:", error);

    const rawMessage =
      error instanceof Error
        ? error.message
        : "Failed to load platform guides from Google Drive.";

    const message = /file not found/i.test(rawMessage)
      ? "Google Drive folder is not accessible. Share the platform folder with the service account email as Viewer, then try again."
      : rawMessage;

    const status = /file not found/i.test(rawMessage) ? 404 : 500;

    return Response.json(
      {
        success: false,
        message,
        source: "google-drive",
        data: {
          png: [],
          pdf: [],
        },
      },
      {
        status,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  }
}

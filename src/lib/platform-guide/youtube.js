import { normalizePlatformGuideLocale } from "./locales";

const YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3";
const DEFAULT_CHANNEL_HANDLE = "GTCFXMarketing";

/** Playlist title suffix per guide language (matches @GTCFXMarketing playlists). */
const PLAYLIST_LANGUAGE_LABEL = {
  en: "English",
  km: "Khmer",
};

/** @GTCFXMarketing GTC Go tutorial playlists (override via YOUTUBE_PLAYLIST_ID_* env). */
export const GTCGO_YOUTUBE_PLAYLIST_IDS = {
  en: "PLFHynh7TbVNA",
  km: "PLFHynh7TbVNA",
};

const playlistIdCache = new Map();
let channelIdCache = null;

function getApiKey() {
  return (
    process.env.YOUTUBE_API_KEY ||
    process.env.GOOGLE_YOUTUBE_API_KEY ||
    ""
  ).trim();
}

function getChannelHandle() {
  return (
    process.env.YOUTUBE_CHANNEL_HANDLE ||
    process.env.YOUTUBE_GTCGO_CHANNEL_HANDLE ||
    DEFAULT_CHANNEL_HANDLE
  )
    .trim()
    .replace(/^@/, "");
}

export function getPlaylistTitleForLocale(locale) {
  const code = normalizePlatformGuideLocale(locale);
  const languageLabel = PLAYLIST_LANGUAGE_LABEL[code] || PLAYLIST_LANGUAGE_LABEL.en;
  return `Video Tutorial (${languageLabel} Version)`;
}

function getConfiguredPlaylistId(locale) {
  const code = normalizePlatformGuideLocale(locale);
  const upper = code.toUpperCase();

  return (
    process.env[`YOUTUBE_PLAYLIST_ID_${upper}`] ||
    process.env[`YOUTUBE_GTCGO_PLAYLIST_ID_${upper}`] ||
    GTCGO_YOUTUBE_PLAYLIST_IDS[code] ||
    ""
  ).trim();
}

const YOUTUBE_HL_BY_LOCALE = {
  en: "en",
  ar: "ar",
  zh: "zh-CN",
  vi: "vi",
  es: "es",
  fr: "fr",
};

/** Keys to check in videos.localizations when hl lookup is unavailable. */
const YOUTUBE_LOCALIZATION_KEYS = {
  en: ["en", "en-US"],
  ar: ["ar"],
  zh: ["zh", "zh-CN", "zh-Hans", "zh-Hant"],
  vi: ["vi"],
  es: ["es", "es-419"],
  fr: ["fr", "fr-FR"],
};

function getYoutubeLanguageCode(locale) {
  const code = normalizePlatformGuideLocale(locale);
  return YOUTUBE_HL_BY_LOCALE[code] || YOUTUBE_HL_BY_LOCALE.en;
}

function pickLocalizedVideoTitle(item, locale) {
  const code = normalizePlatformGuideLocale(locale);
  const snippet = item?.snippet || {};
  const localizedTitle = snippet.localized?.title?.trim();

  if (localizedTitle && localizedTitle !== snippet.title) {
    return localizedTitle;
  }

  const localizations = item?.localizations || {};
  const keys = YOUTUBE_LOCALIZATION_KEYS[code] || YOUTUBE_LOCALIZATION_KEYS.en;

  for (const key of keys) {
    const title = localizations[key]?.title?.trim();
    if (title) return title;
  }

  return localizedTitle || snippet.title?.trim() || "Video";
}

async function fetchLocalizedVideoTitles(videoIds, locale) {
  if (!videoIds.length) return new Map();

  const hl = getYoutubeLanguageCode(locale);
  const titleById = new Map();

  for (let index = 0; index < videoIds.length; index += 50) {
    const batch = videoIds.slice(index, index + 50);
    const payload = await youtubeGet("/videos", {
      part: "snippet,localizations",
      id: batch.join(","),
      hl,
    });

    for (const item of payload.items || []) {
      if (!item?.id) continue;
      titleById.set(item.id, pickLocalizedVideoTitle(item, locale));
    }
  }

  return titleById;
}

async function youtubeGet(path, params = {}) {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error(
      "YouTube API key is not configured. Set YOUTUBE_API_KEY in the environment."
    );
  }

  const searchParams = new URLSearchParams({
    key: apiKey,
    ...params,
  });

  const response = await fetch(`${YOUTUBE_API_BASE}${path}?${searchParams}`, {
    cache: "no-store",
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const rawMessage =
      payload?.error?.message ||
      `YouTube API request failed with HTTP ${response.status}.`;

    const message = /referer.*blocked/i.test(rawMessage)
      ? "YouTube API key is restricted to browser referrers. Create a server key in Google Cloud with Application restrictions set to None (or IP), enable YouTube Data API v3, and set YOUTUBE_API_KEY on Vercel."
      : rawMessage;

    throw new Error(message);
  }

  return payload;
}

async function resolveChannelId() {
  if (channelIdCache) return channelIdCache;

  const configuredId = process.env.YOUTUBE_CHANNEL_ID?.trim();
  if (configuredId) {
    channelIdCache = configuredId;
    return channelIdCache;
  }

  const handle = getChannelHandle();
  const payload = await youtubeGet("/channels", {
    part: "id",
    forHandle: handle,
  });

  const channelId = payload?.items?.[0]?.id;
  if (!channelId) {
    throw new Error(`Unable to resolve YouTube channel for @${handle}.`);
  }

  channelIdCache = channelId;
  return channelId;
}

async function findPlaylistIdByTitle(title) {
  const cacheKey = title.toLowerCase();
  if (playlistIdCache.has(cacheKey)) {
    return playlistIdCache.get(cacheKey);
  }

  const channelId = await resolveChannelId();
  let pageToken;

  do {
    const payload = await youtubeGet("/playlists", {
      part: "snippet",
      channelId,
      maxResults: "50",
      ...(pageToken ? { pageToken } : {}),
    });

    for (const item of payload.items || []) {
      const playlistTitle = item?.snippet?.title?.trim() || "";
      playlistIdCache.set(playlistTitle.toLowerCase(), item.id);

      if (playlistTitle.toLowerCase() === title.toLowerCase()) {
        return item.id;
      }
    }

    pageToken = payload.nextPageToken;
  } while (pageToken);

  return null;
}

function mapPlaylistItem(row) {
  const snippet = row?.snippet || {};
  const videoId = snippet.resourceId?.videoId || snippet.videoId;

  if (!videoId) return null;

  const thumbnails = snippet.thumbnails || {};

  return {
    id: videoId,
    videoId,
    title: snippet.title || "Video",
    description: snippet.description || "",
    thumbnail:
      thumbnails.maxres?.url ||
      thumbnails.standard?.url ||
      thumbnails.high?.url ||
      thumbnails.medium?.url ||
      thumbnails.default?.url ||
      null,
    publishedAt: snippet.publishedAt || null,
    watchUrl: `https://www.youtube.com/watch?v=${videoId}`,
    embedUrl: `https://www.youtube.com/embed/${videoId}`,
  };
}

async function resolvePlaylistId(locale) {
  const code = normalizePlatformGuideLocale(locale);
  const configuredId = getConfiguredPlaylistId(code);
  if (configuredId) {
    return {
      playlistId: configuredId,
      playlistTitle: getPlaylistTitleForLocale(code),
      fallbackUsed: false,
    };
  }

  const title = getPlaylistTitleForLocale(code);
  let playlistId = await findPlaylistIdByTitle(title);
  let fallbackUsed = false;
  let playlistTitle = title;

  if (!playlistId && code !== "en") {
    const englishTitle = getPlaylistTitleForLocale("en");
    playlistId = await findPlaylistIdByTitle(englishTitle);
    if (playlistId) {
      fallbackUsed = true;
      playlistTitle = englishTitle;
    }
  }

  return { playlistId, playlistTitle, fallbackUsed };
}

export async function getGtcGoPlaylistVideos(locale) {
  const requestedLocale = normalizePlatformGuideLocale(locale);
  const { playlistId, playlistTitle, fallbackUsed } =
    await resolvePlaylistId(requestedLocale);

  if (!playlistId) {
    return {
      videos: [],
      requestedLocale,
      resolvedLocale: fallbackUsed ? "en" : requestedLocale,
      playlistId: null,
      playlistTitle,
      fallbackUsed,
    };
  }

  const videos = [];
  let pageToken;

  do {
    const payload = await youtubeGet("/playlistItems", {
      part: "snippet",
      playlistId,
      maxResults: "50",
      ...(pageToken ? { pageToken } : {}),
    });

    for (const row of payload.items || []) {
      const mapped = mapPlaylistItem(row);
      if (mapped) videos.push(mapped);
    }

    pageToken = payload.nextPageToken;
  } while (pageToken);

  const localizedTitles = await fetchLocalizedVideoTitles(
    videos.map((video) => video.videoId),
    requestedLocale
  );

  for (const video of videos) {
    const localizedTitle = localizedTitles.get(video.videoId);
    if (localizedTitle) {
      video.title = localizedTitle;
    }
  }

  return {
    videos,
    requestedLocale,
    resolvedLocale: fallbackUsed ? "en" : requestedLocale,
    playlistId,
    playlistTitle,
    fallbackUsed,
  };
}

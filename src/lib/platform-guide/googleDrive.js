import { readFileSync } from "fs";
import { createSign } from "crypto";

const DRIVE_API_BASE = "https://www.googleapis.com/drive/v3";
const FOLDER_MIME = "application/vnd.google-apps.folder";
const DRIVE_READONLY_SCOPE = "https://www.googleapis.com/auth/drive.readonly";
const DEFAULT_SECRETS_DIR = "secrets";
const DEFAULT_GOOGLE_SERVICE_ACCOUNT_FILE =
  "google-drive-service-account.json";

function getSecretsDir() {
  return process.env.SECRETS_DIR || DEFAULT_SECRETS_DIR;
}

/**
 * Resolves the service-account credential file path.
 *
 * NOTE: This intentionally avoids `process.cwd()` and `path.resolve()`.
 * Referencing `process.cwd()` makes Next.js/@vercel/nft trace the ENTIRE
 * project directory (including .git and public/) into the serverless
 * function bundle, blowing past Vercel's 250MB limit. Relative paths are
 * resolved against the working directory by Node's fs layer at runtime.
 */
function getGoogleServiceAccountFilePath() {
  const configured = String(
    process.env.GOOGLE_SERVICE_ACCOUNT_FILE || ""
  ).trim();

  if (!configured) {
    return `${getSecretsDir()}/${DEFAULT_GOOGLE_SERVICE_ACCOUNT_FILE}`;
  }

  const hasDirectory =
    configured.includes("/") || configured.includes("\\");

  if (hasDirectory) {
    return configured;
  }

  return `${getSecretsDir()}/${configured}`;
}

const IMAGE_EXTENSIONS = new Set([
  "png",
  "jpg",
  "jpeg",
  "webp",
  "gif",
  "avif",
]);

export const DEFAULT_GTCGO_FOLDER_ID =
  "1SeGx1DdCyetfnQpxTHRUPaGUsGjQSG11";

export const DEFAULT_GTCFX_PORTAL_FOLDER_ID =
  "1SzW5RlgCNKPXxzvvFL4TW-gm928EHb1J";

export const PLATFORM_DRIVE_FOLDERS = {
  gtcgo:
    process.env.GOOGLE_DRIVE_GTCGO_FOLDER_ID ||
    DEFAULT_GTCGO_FOLDER_ID,
  gettingStarted:
    process.env.GOOGLE_DRIVE_GTCFX_PORTAL_FOLDER_ID ||
    DEFAULT_GTCFX_PORTAL_FOLDER_ID,
};

let cachedAccessToken = null;
let cachedAccessTokenExpiry = 0;

function tryLoadCredentialsFromFile() {
  const credentialsFile = getGoogleServiceAccountFilePath();

  try {
    const rawJson = readFileSync(credentialsFile, "utf8");
    return JSON.parse(rawJson);
  } catch {
    return null;
  }
}

function parseServiceAccountCredentials() {
  // Env-based credentials first (used in production / Vercel). This keeps the
  // file-read path off the hot path so serverless functions stay small.
  const rawJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;

  if (rawJson) {
    try {
      const normalizedJson = rawJson.trim();

      if (normalizedJson.startsWith("{")) {
        return JSON.parse(normalizedJson);
      }

      return JSON.parse(
        Buffer.from(normalizedJson, "base64").toString("utf8")
      );
    } catch {
      throw new Error(
        "GOOGLE_SERVICE_ACCOUNT_JSON must be a single-line JSON string or base64-encoded JSON. Prefer GOOGLE_SERVICE_ACCOUNT_FILE=secrets/google-drive-service-account.json instead."
      );
    }
  }

  const clientEmail = process.env.GOOGLE_DRIVE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_DRIVE_PRIVATE_KEY?.replace(
    /\\n/g,
    "\n"
  );

  if (clientEmail && privateKey) {
    return {
      client_email: clientEmail,
      private_key: privateKey,
    };
  }

  // Local-dev fallback: read the key file from disk.
  const fromFile = tryLoadCredentialsFromFile();

  if (fromFile) {
    return fromFile;
  }

  throw new Error(
    "Google Drive service account is not configured. Set GOOGLE_SERVICE_ACCOUNT_JSON or GOOGLE_DRIVE_CLIENT_EMAIL + GOOGLE_DRIVE_PRIVATE_KEY (production), or place the key file at secrets/ for local dev, then share your Drive folder with the service account email."
  );
}

function base64UrlEncode(value) {
  return Buffer.from(value)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function createServiceAccountJwt(credentials) {
  const now = Math.floor(Date.now() / 1000);
  const header = base64UrlEncode(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const payload = base64UrlEncode(
    JSON.stringify({
      iss: credentials.client_email,
      scope: DRIVE_READONLY_SCOPE,
      aud: "https://oauth2.googleapis.com/token",
      exp: now + 3600,
      iat: now,
    })
  );
  const unsignedToken = `${header}.${payload}`;
  const signer = createSign("RSA-SHA256");

  signer.update(unsignedToken);
  signer.end();

  const signature = base64UrlEncode(
    signer.sign(credentials.private_key)
  );

  return `${unsignedToken}.${signature}`;
}

async function exchangeJwtForAccessToken(jwt) {
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
    cache: "no-store",
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message =
      payload?.error_description ||
      payload?.error ||
      `Google OAuth token request failed with HTTP ${response.status}.`;

    throw new Error(message);
  }

  return payload.access_token || null;
}

async function getDriveAccessToken() {
  const now = Date.now();

  if (cachedAccessToken && cachedAccessTokenExpiry > now + 60_000) {
    return cachedAccessToken;
  }

  const credentials = parseServiceAccountCredentials();
  const jwt = createServiceAccountJwt(credentials);
  const accessToken = await exchangeJwtForAccessToken(jwt);

  if (!accessToken) {
    throw new Error("Unable to obtain a Google Drive access token.");
  }

  cachedAccessToken = accessToken;
  cachedAccessTokenExpiry = now + 3_500_000;

  return accessToken;
}

function buildDriveUrl(path, params = {}) {
  const searchParams = new URLSearchParams({
    supportsAllDrives: "true",
    includeItemsFromAllDrives: "true",
    ...params,
  });

  return `${DRIVE_API_BASE}${path}?${searchParams.toString()}`;
}

function getExtension(fileName = "") {
  const parts = String(fileName).split(".");
  if (parts.length < 2) return "";
  return parts.pop().toLowerCase();
}

export function createTitle(fileName = "") {
  return String(fileName)
    .replace(/\.[^.]+$/, "")
    .replace(/【[^】]*】/g, " ")
    .replace(/\[[^\]]*]/g, " ")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** URL-safe slug from a guide title (used for detail page routes). */
export function createSlug(title = "") {
  const slug = String(title)
    .normalize("NFC")
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);

  return slug || "guide";
}

export function createComparableName(fileName = "") {
  return createTitle(fileName)
    .toLocaleLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "");
}

export function getDriveFileViewUrl(fileId) {
  return `https://drive.google.com/file/d/${fileId}/view`;
}

/** High-resolution preview for card display (direct CDN URL, no redirect). */
export function getDriveImagePreviewUrl(fileId, width = 1600) {
  return `https://lh3.googleusercontent.com/d/${fileId}=w${width}`;
}

export function getDriveViewUrl(fileId) {
  return getDriveImagePreviewUrl(fileId, 1600);
}

export function getDriveDownloadUrl(fileId) {
  return `https://drive.google.com/uc?export=download&id=${fileId}`;
}

async function driveRequest(url) {
  const accessToken = await getDriveAccessToken();

  const response = await fetch(url, {
    method: "GET",
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message =
      payload?.error?.message ||
      `Google Drive API returned HTTP ${response.status}.`;

    throw new Error(message);
  }

  return payload;
}

export async function listFolderChildren(folderId) {
  if (!folderId) {
    return [];
  }

  const files = [];
  let pageToken;

  do {
    const payload = await driveRequest(
      buildDriveUrl("/files", {
        q: `'${folderId}' in parents and trashed=false`,
        fields:
          "nextPageToken,files(id,name,mimeType,modifiedTime,size,thumbnailLink)",
        pageSize: "1000",
        ...(pageToken ? { pageToken } : {}),
      })
    );

    files.push(...(payload.files || []));
    pageToken = payload.nextPageToken;
  } while (pageToken);

  return files;
}

async function findChildFolderId(parentId, folderNames) {
  const candidates = Array.isArray(folderNames)
    ? folderNames
    : [folderNames];

  const children = await listFolderChildren(parentId);
  const folders = children.filter(
    (item) => item.mimeType === FOLDER_MIME
  );

  for (const name of candidates) {
    const match = folders.find(
      (folder) =>
        folder.name?.toLowerCase() === String(name).toLowerCase()
    );

    if (match?.id) {
      return match.id;
    }
  }

  return null;
}

function isImageFile(file) {
  const extension = getExtension(file.name);

  return (
    file.mimeType?.startsWith("image/") ||
    IMAGE_EXTENSIONS.has(extension)
  );
}

function isPdfFile(file) {
  const extension = getExtension(file.name);

  return (
    file.mimeType === "application/pdf" || extension === "pdf"
  );
}

function folderHasGuideAssets(files) {
  return files.some((item) => isImageFile(item) || isPdfFile(item));
}

async function findDescendantAssetFolders(rootFolderId, maxDepth = 4) {
  let pdfFolderId = null;
  let pngFolderId = null;

  async function walk(folderId, depth) {
    if (depth > maxDepth || (pdfFolderId && pngFolderId)) {
      return;
    }

    const children = await listFolderChildren(folderId);

    for (const child of children) {
      if (child.mimeType !== FOLDER_MIME) {
        continue;
      }

      const name = child.name?.toLowerCase();
      if (name === "pdf" && !pdfFolderId) {
        pdfFolderId = child.id;
      }
      if (name === "png" && !pngFolderId) {
        pngFolderId = child.id;
      }
    }

    if (pdfFolderId && pngFolderId) {
      return;
    }

    for (const child of children) {
      if (child.mimeType === FOLDER_MIME) {
        await walk(child.id, depth + 1);
      }
    }
  }

  await walk(rootFolderId, 0);

  return {
    pdfFolderId,
    pngFolderId,
  };
}

/**
 * Resolves PDF/PNG folders for a locale.
 *
 * Preferred layout:
 *   platform/{locale}/pdf|png
 *
 * Fallback layouts:
 *   platform/{locale}   (PDF + PNG files mixed in locale folder)
 *   platform/pdf|png
 *   platform            (PDF + PNG files at root)
 */
export async function resolveAssetFolderIds(rootFolderId, locale) {
  const localeFolderId = await findChildFolderId(rootFolderId, locale);

  if (localeFolderId) {
    const [localePdfId, localePngId] = await Promise.all([
      findChildFolderId(localeFolderId, ["pdf", "PDF"]),
      findChildFolderId(localeFolderId, ["png", "PNG"]),
    ]);

    if (localePdfId || localePngId) {
      return {
        pdfFolderId: localePdfId,
        pngFolderId: localePngId,
      };
    }

    const localeChildren = await listFolderChildren(localeFolderId);
    if (folderHasGuideAssets(localeChildren)) {
      return {
        pdfFolderId: localeFolderId,
        pngFolderId: localeFolderId,
      };
    }
  }

  const [rootPdfId, rootPngId] = await Promise.all([
    findChildFolderId(rootFolderId, ["pdf", "PDF"]),
    findChildFolderId(rootFolderId, ["png", "PNG"]),
  ]);

  if (rootPdfId || rootPngId) {
    return {
      pdfFolderId: rootPdfId,
      pngFolderId: rootPngId,
    };
  }

  const rootChildren = await listFolderChildren(rootFolderId);
  if (folderHasGuideAssets(rootChildren)) {
    return {
      pdfFolderId: rootFolderId,
      pngFolderId: rootFolderId,
    };
  }

  const nestedFolders = await findDescendantAssetFolders(rootFolderId);
  if (nestedFolders.pdfFolderId || nestedFolders.pngFolderId) {
    return nestedFolders;
  }

  return {
    pdfFolderId: rootPdfId,
    pngFolderId: rootPngId,
  };
}

function createImageItems(files) {
  return files
    .filter(isImageFile)
    .map((file) => {
      const previewUrl = getDriveImagePreviewUrl(file.id, 1600);
      const title = createTitle(file.name) || file.name;

      return {
        id: file.id,
        fileName: file.name,
        title,
        slug: createSlug(title),
        type: "png",
        extension: getExtension(file.name) || "png",
        url: getDriveFileViewUrl(file.id),
        thumbnail: previewUrl,
        previewUrl,
        size: Number(file.size || 0),
        lastModified: file.modifiedTime || null,
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title));
}

function createPdfItems(files, imageItems) {
  const imagesByComparableName = new Map();

  for (const image of imageItems) {
    const comparableName = createComparableName(image.fileName);
    if (comparableName) {
      imagesByComparableName.set(comparableName, image.thumbnail);
    }
  }

  return files
    .filter(isPdfFile)
    .map((file) => {
      const comparableName = createComparableName(file.name);
      const title = createTitle(file.name) || file.name;

      return {
        id: file.id,
        fileName: file.name,
        title,
        slug: createSlug(title),
        type: "pdf",
        extension: "pdf",
        url: getDriveDownloadUrl(file.id),
        previewUrl: `https://drive.google.com/file/d/${file.id}/preview`,
        thumbnail: imagesByComparableName.get(comparableName) || null,
        size: Number(file.size || 0),
        lastModified: file.modifiedTime || null,
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title));
}

export async function getPlatformGuideFromDrive(rootFolderId, locale) {
  const { pdfFolderId, pngFolderId } = await resolveAssetFolderIds(
    rootFolderId,
    locale
  );

  const [pdfChildren, pngChildren] = await Promise.all([
    pdfFolderId ? listFolderChildren(pdfFolderId) : Promise.resolve([]),
    pngFolderId ? listFolderChildren(pngFolderId) : Promise.resolve([]),
  ]);

  const png = createImageItems(pngChildren);
  const pdf = createPdfItems(pdfChildren, png);

  return {
    png,
    pdf,
    folders: {
      pdf: pdfFolderId,
      png: pngFolderId,
    },
  };
}

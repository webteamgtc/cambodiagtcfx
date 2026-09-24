import { MongoClient } from "mongodb";

/** Reuse client across hot reloads in development. */
const globalForMongo = globalThis;

function encodeMongoCredential(value) {
  return encodeURIComponent(value.trim());
}

/**
 * Prefer non-SRV URIs — `mongodb+srv://` often fails with querySrv ETIMEOUT on some networks/DNS.
 * Order: MONGODB_URI_STANDARD → built from MONGODB_* parts → MONGODB_URI (SRV).
 */
export function resolveMongoUri() {
  const standard = process.env.MONGODB_URI_STANDARD?.trim();
  if (standard && !standard.startsWith("mongodb+srv://")) {
    return { uri: standard, source: "MONGODB_URI_STANDARD" };
  }

  const user = process.env.MONGODB_USERNAME?.trim();
  const password = process.env.MONGODB_PASSWORD?.trim();
  const hosts = process.env.MONGODB_HOSTS?.trim();

  if (user && password && hosts) {
    const replicaSet = process.env.MONGODB_REPLICA_SET?.trim();
    const directConnection = process.env.MONGODB_DIRECT_CONNECTION?.trim() === "true";

    const params = new URLSearchParams({
      ssl: "true",
      authSource: "admin",
      retryWrites: "true",
      w: "majority",
    });

    if (replicaSet && !directConnection) {
      params.set("replicaSet", replicaSet);
    }
    if (directConnection) {
      params.set("directConnection", "true");
    }

    const appName = process.env.MONGODB_APP_NAME?.trim() || "GTCFXMainWebsite";
    params.set("appName", appName);

    const uri = `mongodb://${encodeMongoCredential(user)}:${encodeMongoCredential(password)}@${hosts}/?${params.toString()}`;
    return { uri, source: "MONGODB_HOSTS" };
  }

  const srv = process.env.MONGODB_URI?.trim();
  if (srv) {
    return { uri: srv, source: "MONGODB_URI" };
  }

  return { uri: null, source: null };
}

export async function getMongoClient() {
  const { uri, source } = resolveMongoUri();

  if (!uri) {
    throw new Error(
      "Missing MongoDB config. Set MONGODB_URI_STANDARD or MONGODB_USERNAME, MONGODB_PASSWORD, MONGODB_HOSTS (or MONGODB_URI)."
    );
  }

  if (process.env.NODE_ENV === "development" && source) {
    console.info(`[mongodb] Connecting via ${source}`);
  }

  if (!globalForMongo._mongoClientPromise || globalForMongo._mongoUriUsed !== uri) {
    const client = new MongoClient(uri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 20_000,
      connectTimeoutMS: 20_000,
    });
    globalForMongo._mongoUriUsed = uri;
    globalForMongo._mongoClientPromise = client.connect();
  }

  return globalForMongo._mongoClientPromise;
}

export async function getMongoDb() {
  const dbName = process.env.MONGODB_DB_NAME?.trim();
  if (!dbName) {
    throw new Error("Missing MONGODB_DB_NAME");
  }
  const client = await getMongoClient();
  return client.db(dbName);
}

export function getCambodiaFormCollectionName() {
  return process.env.MONGODB_CAMBODIA_FORM_COLLECTION?.trim() || "cambodia-form";
}

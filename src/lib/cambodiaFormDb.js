import { getCambodiaFormCollectionName, getMongoDb } from "@/lib/mongodb";

export async function insertCambodiaFormRow(row) {
  const db = await getMongoDb();
  const collection = db.collection(getCambodiaFormCollectionName());

  let formData = {};
  try {
    formData = JSON.parse(row.formDataJson || "{}");
  } catch {
    formData = { raw: row.formDataJson };
  }

  const document = {
    applicationReference: row.applicationReference,
    email: row.email,
    fullName: row.fullName ?? null,
    phone: row.phone ?? null,
    locale: row.locale ?? null,
    formData,
    createdAt: row.createdAt ?? new Date(),
  };

  await collection.insertOne(document);
}

export async function listCambodiaFormSubmissions({ limit = 100, skip = 0 } = {}) {
  const db = await getMongoDb();
  const collection = db.collection(getCambodiaFormCollectionName());

  const safeLimit = Math.min(Math.max(Number(limit) || 100, 1), 500);
  const safeSkip = Math.max(Number(skip) || 0, 0);

  const [items, total] = await Promise.all([
    collection.find({}).sort({ createdAt: -1 }).skip(safeSkip).limit(safeLimit).toArray(),
    collection.countDocuments({}),
  ]);

  return {
    total,
    items: items.map((doc) => ({
      id: doc._id.toString(),
      applicationReference: doc.applicationReference,
      email: doc.email,
      fullName: doc.fullName,
      phone: doc.phone,
      locale: doc.locale,
      formData: doc.formData,
      createdAt: doc.createdAt,
    })),
  };
}

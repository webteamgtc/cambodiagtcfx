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

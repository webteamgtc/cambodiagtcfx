const FILE_KEYS = [
  "idCardCopy",
  "passportVisaCopy",
  "familyRecordBookCopy",
  "otherDocumentCopy",
  "signatureFile",
];

function fileToMeta(file) {
  if (!(file instanceof File)) return file;
  return {
    fileName: file.name,
    fileSize: file.size,
    fileType: file.type,
  };
}

/** Prepare Formik values for JSON POST (files → metadata only). */
export function serializeFormSubmission(values, { locale, applicationReference }) {
  const payload = { ...values };

  for (const key of FILE_KEYS) {
    if (payload[key] != null) {
      payload[key] = fileToMeta(payload[key]);
    }
  }

  return {
    ...payload,
    locale,
    applicationReference,
    submittedAt: new Date().toISOString(),
  };
}

export const FILE_KEYS = [
  "idCardCopy",
  "passportVisaCopy",
  "familyRecordBookCopy",
  "otherDocumentCopy",
  "signatureFile",
];

function stripFilesFromPayload(values) {
  const payload = { ...values };
  for (const key of FILE_KEYS) {
    if (payload[key] instanceof File) {
      delete payload[key];
    }
  }
  return payload;
}

/** Multipart submit: JSON payload field + file parts for S3 upload on server. */
export function buildSubmitFormData(values, { locale, applicationReference }) {
  const formData = new FormData();

  for (const key of FILE_KEYS) {
    const file = values[key];
    if (file instanceof File) {
      formData.append(key, file);
    }
  }

  const payload = {
    ...stripFilesFromPayload(values),
    locale,
    applicationReference,
    submittedAt: new Date().toISOString(),
  };

  formData.append("payload", JSON.stringify(payload));
  return formData;
}

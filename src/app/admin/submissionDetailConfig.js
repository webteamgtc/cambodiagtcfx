export const FIELD_LABELS = {
  applicationReference: "Application reference",
  submittedAt: "Submitted at",
  fullName: "Full name",
  fullNameLatin: "Full name (Latin)",
  hasPreviousName: "Previous name",
  previousName: "Previous name (details)",
  dateOfBirth: "Date of birth",
  nationality: "Nationality",
  sex: "Sex",
  idPassportNumber: "ID / Passport number",
  issuedBy: "Issued by",
  expirationDate: "Expiration date",
  currentAddress: "Current address",
  permanentAddress: "Permanent address",
  phone: "Phone",
  email: "Email",
  hasSpouse: "Has spouse",
  employmentStatus: "Employment status",
  industry: "Industry",
  occupation: "Occupation / Job title",
  employerName: "Employer / Business name",
  workplaceAddress: "Workplace address",
  workplaceContact: "Workplace contact",
  workingPeriod: "Working period",
  yearsWorkingExperience: "Years of working experience",
  educationalLevel: "Educational level",
  derivativeKnowledge: "Derivative knowledge",
  investmentObjectives: "Investment objectives",
  experienceOtherFinancialMarkets: "Other financial markets experience",
  qualifiedInvestor: "Qualified investor",
  hasAuthorizedPerson: "Authorized person",
  authorizedPersonFullName: "Authorized person — full name",
  authorizedPersonFullNameLatin: "Authorized person — Latin name",
  authorizedPersonSex: "Authorized person — sex",
  authorizedPersonAddress: "Authorized person — address",
  authorizedPersonPhone: "Authorized person — phone",
  authorizedPersonEmail: "Authorized person — email",
  beneficialOwner: "Beneficial owner",
  controllingPerson: "Controlling person",
  isPoliticallyExposed: "Politically exposed person (PEP)",
  contactPreferences: "Contact preferences",
  relationshipDerivativeBroker: "Relationship with derivative broker",
  relationshipCentralCounterparty: "Relationship with central counterparty",
  idCardCopy: "ID card copy",
  passportVisaCopy: "Passport / Visa copy",
  familyRecordBookCopy: "Family record book copy",
  otherDocumentCopy: "Other document",
  thirdPartyVerificationStarted: "Third-party verification started",
  agreementAccepted: "Agreement accepted",
  clientSignature: "Client signature",
  signatureFile: "Signature file",
  locale: "Locale",
  createdAt: "Created at",
};

export const DETAIL_SECTIONS = [
  {
    title: "Application summary",
    keys: ["applicationReference", "submittedAt", "locale", "createdAt"],
  },
  {
    title: "Personal information",
    keys: [
      "fullName",
      "fullNameLatin",
      "hasPreviousName",
      "previousName",
      "dateOfBirth",
      "nationality",
      "sex",
      "idPassportNumber",
      "issuedBy",
      "expirationDate",
      "currentAddress",
      "permanentAddress",
      "phone",
      "email",
      "hasSpouse",
    ],
  },
  {
    title: "Employment",
    keys: [
      "employmentStatus",
      "industry",
      "occupation",
      "employerName",
      "workplaceAddress",
      "workplaceContact",
      "workingPeriod",
      "yearsWorkingExperience",
    ],
  },
  {
    title: "Questionnaire",
    keys: [
      "educationalLevel",
      "derivativeKnowledge",
      "investmentObjectives",
      "experienceOtherFinancialMarkets",
      "qualifiedInvestor",
      "hasAuthorizedPerson",
      "authorizedPersonFullName",
      "authorizedPersonFullNameLatin",
      "authorizedPersonSex",
      "authorizedPersonAddress",
      "authorizedPersonPhone",
      "authorizedPersonEmail",
      "beneficialOwner",
      "controllingPerson",
      "isPoliticallyExposed",
      "contactPreferences",
      "relationshipDerivativeBroker",
      "relationshipCentralCounterparty",
    ],
  },
  {
    title: "Documents & verification",
    keys: [
      "idCardCopy",
      "passportVisaCopy",
      "familyRecordBookCopy",
      "otherDocumentCopy",
      "thirdPartyVerificationStarted",
    ],
  },
  {
    title: "Agreement & signature",
    keys: ["agreementAccepted", "clientSignature", "signatureFile"],
  },
];

export function formatFieldValue(value) {
  if (value === null || value === undefined || value === "") return "—";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (Array.isArray(value)) {
    if (value.length === 0) return "—";
    return value.join(", ");
  }
  if (typeof value === "object") {
    if (value.fileName) {
      const kb = value.fileSize ? ` (${Math.round(value.fileSize / 1024)} KB)` : "";
      return `${value.fileName}${kb}`;
    }
    return JSON.stringify(value);
  }
  if (value === "yes") return "Yes";
  if (value === "no") return "No";
  return String(value);
}

export function buildSubmissionDetailRecord(row) {
  const formData = row.formData && typeof row.formData === "object" ? row.formData : {};
  return {
    ...formData,
    applicationReference: row.applicationReference ?? formData.applicationReference,
    fullName: row.fullName ?? formData.fullName,
    email: row.email ?? formData.email,
    phone: row.phone ?? formData.phone,
    locale: row.locale ?? formData.locale,
    submittedAt: formData.submittedAt ?? row.createdAt,
    createdAt: row.createdAt,
  };
}

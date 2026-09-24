export const FORM_STEPS = [
  { id: "personal-information", labelKey: "personalInformation", fallback: "Personal Information" },
  { id: "questionnaire", labelKey: "questionnaire", fallback: "Questionnaire" },
  { id: "identity-information", labelKey: "identityInformation", fallback: "Identity Information" },
  { id: "client-agreement", labelKey: "clientAgreement", fallback: "Client Agreement" },
];

export const EMPLOYMENT_STATUS = [
  "Employed",
  "Self-employed",
  "Retired",
  "Student",
  "Unemployed",
];

export const YEARS_WORKING_EXPERIENCE = [
  "Less than 1 year",
  "1 – 3 years",
  "3 – 5 years",
  "5 – 10 years",
  "More than 10 years",
];

export const EDUCATIONAL_LEVELS = [
  { value: "doctorate", label: "Doctorate" },
  { value: "master", label: "Master" },
  { value: "bachelor", label: "Bachelor" },
  { value: "below-bachelor", label: "Below Bachelor" },
];

export const DERIVATIVE_KNOWLEDGE_OPTIONS = [
  { value: "training-course", label: "Client has been attending a training derivative course" },
  {
    value: "work-experience",
    label: "Client had / currently have experiences working related to derivative product",
  },
  { value: "trading-derivative", label: "Client has / currently trading derivative" },
  { value: "no-experience", label: "Client has no experience on trading derivative" },
];

export const INVESTMENT_OBJECTIVE_OPTIONS = [
  { value: "short-term", label: "Short term investment" },
  { value: "long-term", label: "Long term investment" },
  { value: "other", label: "Other" },
];

export const CONTACT_PREFERENCE_OPTIONS = [
  { value: "phone", label: "Phone number" },
  { value: "email", label: "Email" },
  { value: "fax", label: "Fax" },
  { value: "send-message", label: "Send Message" },
  { value: "others", label: "Others" },
];

export const CLIENT_AGREEMENT_PDF_URL = "/client-agreement-derivative-trading.pdf";

export const INITIAL_FORM_VALUES = {
  fullName: "",
  fullNameLatin: "",
  hasPreviousName: "",
  previousName: "",
  dateOfBirth: "",
  nationality: "",
  sex: "",
  idPassportNumber: "",
  issuedBy: "",
  expirationDate: "",
  currentAddress: "",
  permanentAddress: "",
  phone: "",
  email: "",
  hasSpouse: "",
  employmentStatus: "",
  industry: "",
  occupation: "",
  employerName: "",
  workplaceAddress: "",
  workplaceContact: "",
  workingPeriod: "",
  yearsWorkingExperience: "",

  educationalLevel: "",
  derivativeKnowledge: [],
  investmentObjectives: [],
  experienceOtherFinancialMarkets: "",
  qualifiedInvestor: "",
  hasAuthorizedPerson: "",
  authorizedPersonFullName: "",
  authorizedPersonFullNameLatin: "",
  authorizedPersonSex: "",
  authorizedPersonAddress: "",
  authorizedPersonPhone: "",
  authorizedPersonEmail: "",
  beneficialOwner: "",
  controllingPerson: "",
  isPoliticallyExposed: "",
  contactPreferences: [],
  relationshipDerivativeBroker: "",
  relationshipCentralCounterparty: "",

  idCardCopy: null,
  passportVisaCopy: null,
  familyRecordBookCopy: null,
  otherDocumentCopy: null,
  thirdPartyVerificationStarted: false,

  agreementAccepted: false,
  clientSignature: "",
  signatureFile: null,
};

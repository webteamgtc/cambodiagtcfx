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

/** Margin call contact: checkbox value → form field for detail input (null = no input). */
export const MARGIN_CALL_CONTACT_FIELDS = [
  { value: "phone", detailKey: "marginCallContactPhone", placeholderKey: "marginCallContactPhone" },
  { value: "email", detailKey: "marginCallContactEmail", placeholderKey: "marginCallContactEmail" },
  { value: "fax", detailKey: "marginCallContactFax", placeholderKey: "marginCallContactFax" },
  { value: "send-message", detailKey: null },
  { value: "others", detailKey: "marginCallContactOthers", placeholderKey: "marginCallContactOthers" },
];

export const QUALIFIED_INVESTOR_CRITERIA = [
  {
    value: "net-assets-250k",
    label: "Client has total net assets less than $250,000",
  },
  {
    value: "annual-income-20k",
    label: "Client has an annual income at least $20,000",
  },
  {
    value: "cambodia-securities-25k",
    label: "Client has previously invested in securities sector in Cambodia for at least $25,000",
  },
];

export const MONTHLY_INCOME_AFTER_TAX_RANGES = [
  { value: "0-250", label: "0 – 250" },
  { value: "251-500", label: "251 – 500" },
  { value: "501-750", label: "501 – 750" },
  { value: "751-1000", label: "751 – 1000" },
  { value: "more-than-1000", label: "More than 1000" },
];

export const OTHER_INCOME_SOURCE_OPTIONS = [
  { value: "dividend-securities-bonds", label: "Dividend / Interest from securities / Bonds" },
  { value: "dividends-company", label: "Dividends from the company itself" },
  { value: "interest-bank", label: "Interest from bank" },
  { value: "others", label: "Others" },
];

export const CLIENT_AGREEMENT_PDF_URL = "/client-agreement-derivative-trading.pdf";

/** Identity step: radio value → Formik file field key */
export const ATTACHED_DOCUMENT_TYPES = [
  { value: "id-card", fileKey: "idCardCopy", labelKey: "idCardCopy" },
  { value: "passport-visa", fileKey: "passportVisaCopy", labelKey: "passportVisaCopy" },
  { value: "family-record", fileKey: "familyRecordBookCopy", labelKey: "familyRecordBookCopy" },
  { value: "others", fileKey: "otherDocumentCopy", labelKey: "otherDocumentCopy" },
];

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
  spouseFullName: "",
  spouseFullNameLatin: "",
  spouseSex: "",
  spouseAddress: "",
  spousePhone: "",
  spouseEmail: "",
  hasMonthlyIncome: "",
  monthlyIncomeAfterTax: "",
  otherIncomeSources: [],
  otherIncomeSourceDetails: "",
  employmentStatus: "",
  industry: "",
  occupation: "",
  employerName: "",
  workplaceAddress: "",
  workplaceContact: "",
  workingPeriod: "",
  yearsWorkingExperience: "",

  educationalLevel: "",
  derivativeKnowledge: "",
  investmentObjectives: [],
  experienceOtherFinancialMarkets: "",
  financialMarket1Name: "",
  financialMarket1ProductType: "",
  financialMarket1Country: "",
  financialMarket1Year: "",
  financialMarket2Name: "",
  financialMarket2ProductType: "",
  financialMarket2Country: "",
  financialMarket2Year: "",
  qualifiedInvestor: "",
  qualifiedInvestorCriteria: [],
  hasAuthorizedPerson: "",
  authorizedPersonName: "",
  authorizedPersonRelationship: "",
  beneficialOwner: "",
  controllingPerson: "",
  moneyLaunderingRecordLast3Years: "",
  moneyLaunderingRecordDetails: "",
  contactPreferences: [],
  marginCallContactPhone: "",
  marginCallContactEmail: "",
  marginCallContactFax: "",
  marginCallContactOthers: "",
  relationshipDerivativeBroker: "",
  derivativeBrokerEmployeeName: "",
  derivativeBrokerRelationship: "",
  relationshipCentralCounterparty: "",
  counterpartyEmployeeName: "",
  counterpartyCompanyName: "",
  counterpartyRelationship: "",
  investmentObjectiveOtherDetails: "",
  emergencyContactFullName: "",
  emergencyContactFullNameLatin: "",
  emergencyContactSex: "",
  emergencyContactAddress: "",
  emergencyContactPhone: "",
  emergencyContactEmail: "",

  attachedDocumentType: "",
  otherDocumentDescription: "",
  idCardCopy: null,
  passportVisaCopy: null,
  familyRecordBookCopy: null,
  otherDocumentCopy: null,
  thirdPartyVerificationStarted: false,

  agreementAccepted: false,
  clientSignature: "",
  signatureFile: null,
};

import * as Yup from "yup";
import { isValidPhoneNumber } from "libphonenumber-js";

const fileRequired = (message) =>
  Yup.mixed()
    .nullable()
    .test("file-required", message, (value) => value instanceof File);

const fileOptional = Yup.mixed().nullable();

const whenYes = (field, message) =>
  Yup.string().when(field, {
    is: "yes",
    then: (schema) => schema.required(message),
    otherwise: (schema) => schema.notRequired(),
  });

const employmentDetail = (message) =>
  Yup.string().when("employmentStatus", {
    is: (status) => status === "Employed" || status === "Self-employed",
    then: (schema) => schema.required(message),
    otherwise: (schema) => schema.notRequired(),
  });

const whenContactIncludes = (preferenceValue, message) =>
  Yup.string().when("contactPreferences", {
    is: (prefs) => Array.isArray(prefs) && prefs.includes(preferenceValue),
    then: (schema) => schema.required(message),
    otherwise: (schema) => schema.notRequired(),
  });

const marketBlockWhen = (prefix, whenField) => ({
  [`${prefix}Name`]: whenYes(whenField, "Market name is required"),
  [`${prefix}ProductType`]: whenYes(whenField, "Product type is required"),
  [`${prefix}Country`]: whenYes(whenField, "Country is required"),
  [`${prefix}Year`]: whenYes(whenField, "Year is required"),
});

const personContactWhen = (prefix, whenField) => ({
  [`${prefix}FullName`]: whenYes(whenField, "Full name is required"),
  [`${prefix}FullNameLatin`]: whenYes(whenField, "Full name in Latin is required"),
  [`${prefix}Sex`]: whenYes(whenField, "Sex is required"),
  [`${prefix}Address`]: whenYes(whenField, "Current address is required"),
  [`${prefix}Phone`]: whenYes(whenField, "Contact number is required"),
  [`${prefix}Email`]: Yup.string().when(whenField, {
    is: "yes",
    then: (schema) => schema.email("Invalid email").required("Email is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

export const stepSchemas = [
  Yup.object({
    fullName: Yup.string().required("Full name is required"),
    fullNameLatin: Yup.string().required("Full name in Latin is required"),
    hasPreviousName: Yup.string().required("Please indicate if you have a previous name"),
    previousName: whenYes("hasPreviousName", "Previous name is required"),
    dateOfBirth: Yup.date()
      .required("Date of birth is required")
      .max(new Date(Date.now() - 18 * 365.25 * 24 * 60 * 60 * 1000), "You must be at least 18 years old"),
    nationality: Yup.string().required("Nationality is required"),
    sex: Yup.string().required("Sex is required"),
    idPassportNumber: Yup.string().required("ID / Passport number is required"),
    issuedBy: Yup.string().required("Issuing authority is required"),
    expirationDate: Yup.date().required("Expiration date is required").min(new Date(), "Document must not be expired"),
    currentAddress: Yup.string().required("Current address is required"),
    permanentAddress: Yup.string().required("Permanent address is required"),
    phone: Yup.string()
      .required("Phone number is required")
      .test("valid-phone", "Invalid phone number", (value) => !value || isValidPhoneNumber(value)),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    hasSpouse: Yup.string().required("Please indicate if you have a spouse"),
    ...personContactWhen("spouse", "hasSpouse"),
    hasMonthlyIncome: Yup.string().required("Please indicate monthly income"),
    monthlyIncomeAfterTax: whenYes("hasMonthlyIncome", "Please select monthly income after tax"),
    otherIncomeSources: Yup.array(),
    otherIncomeSourceDetails: Yup.string().when(["hasMonthlyIncome", "otherIncomeSources"], {
      is: (hasMonthlyIncome, sources) =>
        hasMonthlyIncome === "yes" && Array.isArray(sources) && sources.includes("others"),
      then: (schema) => schema.required("Please specify other income source"),
      otherwise: (schema) => schema.notRequired(),
    }),
    employmentStatus: Yup.string().required("Employment status is required"),
    industry: employmentDetail("Industry is required"),
    occupation: employmentDetail("Occupation / Job title is required"),
    employerName: employmentDetail("Name of employer / business is required"),
    workplaceAddress: employmentDetail("Workplace address is required"),
    workplaceContact: employmentDetail("Workplace contact number is required"),
    workingPeriod: employmentDetail("Working period is required"),
    yearsWorkingExperience: Yup.string().required("Years of working experience is required"),
  }),

  Yup.object({
    educationalLevel: Yup.string().required("Educational level is required"),
    derivativeKnowledge: Yup.string().required("Please select customer knowledge regarding derivatives"),
    investmentObjectives: Yup.array().min(1, "Select at least one investment objective"),
    investmentObjectiveOtherDetails: Yup.string().when("investmentObjectives", {
      is: (objectives) => Array.isArray(objectives) && objectives.includes("other"),
      then: (schema) => schema.required("Please specify other investment objective"),
      otherwise: (schema) => schema.notRequired(),
    }),
    experienceOtherFinancialMarkets: Yup.string().required("Please answer about other financial markets experience"),
    ...marketBlockWhen("financialMarket1", "experienceOtherFinancialMarkets"),
    financialMarket2Name: Yup.string().notRequired(),
    financialMarket2ProductType: Yup.string().notRequired(),
    financialMarket2Country: Yup.string().notRequired(),
    financialMarket2Year: Yup.string().notRequired(),
    qualifiedInvestor: Yup.string().required("Please indicate qualified investor status"),
    qualifiedInvestorCriteria: Yup.array().when("qualifiedInvestor", {
      is: "yes",
      then: (schema) => schema.min(1, "Select at least one qualified investor criterion"),
      otherwise: (schema) => schema.notRequired(),
    }),
    hasAuthorizedPerson: Yup.string().required("Please indicate if there is an authorized person"),
    authorizedPersonName: whenYes("hasAuthorizedPerson", "Authorized person name is required"),
    authorizedPersonRelationship: whenYes("hasAuthorizedPerson", "Relationship to account owner is required"),
    beneficialOwner: Yup.string().required("Beneficial owner is required"),
    controllingPerson: Yup.string().required("Controlling person is required"),
    moneyLaunderingRecordLast3Years: Yup.string().required("Please answer about money laundering record"),
    moneyLaunderingRecordDetails: whenYes("moneyLaunderingRecordLast3Years", "Please provide money laundering record details"),
    contactPreferences: Yup.array().min(1, "Select at least one contact preference"),
    marginCallContactPhone: whenContactIncludes("phone", "Phone number is required"),
    marginCallContactEmail: Yup.string().when("contactPreferences", {
      is: (prefs) => Array.isArray(prefs) && prefs.includes("email"),
      then: (schema) => schema.email("Invalid email").required("Email address is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    marginCallContactFax: whenContactIncludes("fax", "Fax number is required"),
    marginCallContactOthers: whenContactIncludes("others", "Please specify other contact method"),
    relationshipDerivativeBroker: Yup.string().required("Please answer about relationship with derivative broker"),
    derivativeBrokerEmployeeName: whenYes("relationshipDerivativeBroker", "Director or employee name is required"),
    derivativeBrokerRelationship: whenYes("relationshipDerivativeBroker", "Relationship is required"),
    relationshipCentralCounterparty: Yup.string().required(
      "Please answer about relationship with central counterparty"
    ),
    counterpartyEmployeeName: whenYes("relationshipCentralCounterparty", "Director or employee name is required"),
    counterpartyCompanyName: whenYes("relationshipCentralCounterparty", "Central counterparty name is required"),
    counterpartyRelationship: whenYes("relationshipCentralCounterparty", "Relationship is required"),
    emergencyContactFullName: Yup.string().required("Emergency contact full name is required"),
    emergencyContactFullNameLatin: Yup.string().required("Emergency contact name in Latin is required"),
    emergencyContactSex: Yup.string().required("Emergency contact sex is required"),
    emergencyContactAddress: Yup.string().required("Emergency contact address is required"),
    emergencyContactPhone: Yup.string().required("Emergency contact phone is required"),
    emergencyContactEmail: Yup.string()
      .email("Invalid email")
      .required("Emergency contact email is required"),
  }),

  Yup.object({
    attachedDocumentType: Yup.string().required("Please select a document type to upload"),
    otherDocumentDescription: Yup.string().when("attachedDocumentType", {
      is: "others",
      then: (schema) => schema.required("Please specify other documents"),
      otherwise: (schema) => schema.notRequired(),
    }),
    idCardCopy: Yup.mixed().when("attachedDocumentType", {
      is: "id-card",
      then: () => fileRequired("Please upload your document"),
      otherwise: () => fileOptional,
    }),
    passportVisaCopy: Yup.mixed().when("attachedDocumentType", {
      is: "passport-visa",
      then: () => fileRequired("Please upload your document"),
      otherwise: () => fileOptional,
    }),
    familyRecordBookCopy: Yup.mixed().when("attachedDocumentType", {
      is: "family-record",
      then: () => fileRequired("Please upload your document"),
      otherwise: () => fileOptional,
    }),
    otherDocumentCopy: Yup.mixed().when("attachedDocumentType", {
      is: "others",
      then: () => fileRequired("Please upload your document"),
      otherwise: () => fileOptional,
    }),
  }),

  Yup.object({
    agreementAccepted: Yup.boolean().oneOf([true], "You must accept the client agreement"),
    clientSignature: Yup.string().required("Client signature is required"),
  }),
];

export const fullSchema = stepSchemas.reduce(
  (merged, schema) => merged.concat(schema),
  Yup.object({})
);

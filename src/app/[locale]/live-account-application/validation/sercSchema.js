import * as Yup from "yup";
import { isValidPhoneNumber } from "libphonenumber-js";

const fileRequired = (message) =>
  Yup.mixed()
    .nullable()
    .test("file-required", message, (value) => value instanceof File);

const fileOptional = Yup.mixed().nullable();

export const stepSchemas = [
  Yup.object({
    fullName: Yup.string().required("Full name is required"),
    fullNameLatin: Yup.string().required("Full name in Latin is required"),
    hasPreviousName: Yup.string().required("Please indicate if you have a previous name"),
    previousName: Yup.string().when("hasPreviousName", {
      is: "yes",
      then: (schema) => schema.required("Previous name is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
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
    employmentStatus: Yup.string().required("Employment status is required"),
    industry: Yup.string().required("Industry is required"),
    occupation: Yup.string().required("Occupation / Job title is required"),
    employerName: Yup.string().required("Name of employer / business is required"),
    workplaceAddress: Yup.string().required("Workplace address is required"),
    workplaceContact: Yup.string().required("Workplace contact number is required"),
    workingPeriod: Yup.string().required("Working period is required"),
    yearsWorkingExperience: Yup.string().required("Years of working experience is required"),
  }),

  Yup.object({
    educationalLevel: Yup.string().required("Educational level is required"),
    derivativeKnowledge: Yup.array().min(1, "Select at least one option for derivative knowledge"),
    investmentObjectives: Yup.array().min(1, "Select at least one investment objective"),
    experienceOtherFinancialMarkets: Yup.string().required("Please answer about other financial markets experience"),
    qualifiedInvestor: Yup.string().required("Please indicate qualified investor status"),
    hasAuthorizedPerson: Yup.string().required("Please indicate if there is an authorized person"),
    authorizedPersonFullName: Yup.string().when("hasAuthorizedPerson", {
      is: "yes",
      then: (schema) => schema.required("Authorized person full name is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    authorizedPersonFullNameLatin: Yup.string().when("hasAuthorizedPerson", {
      is: "yes",
      then: (schema) => schema.required("Authorized person name in Latin is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    authorizedPersonSex: Yup.string().when("hasAuthorizedPerson", {
      is: "yes",
      then: (schema) => schema.required("Authorized person sex is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    authorizedPersonAddress: Yup.string().when("hasAuthorizedPerson", {
      is: "yes",
      then: (schema) => schema.required("Authorized person address is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    authorizedPersonPhone: Yup.string().when("hasAuthorizedPerson", {
      is: "yes",
      then: (schema) => schema.required("Authorized person contact number is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    authorizedPersonEmail: Yup.string().when("hasAuthorizedPerson", {
      is: "yes",
      then: (schema) => schema.email("Invalid email").required("Authorized person email is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    beneficialOwner: Yup.string().required("Beneficial owner is required"),
    controllingPerson: Yup.string().required("Controlling person is required"),
    isPoliticallyExposed: Yup.string().required("Please indicate politically exposed person status"),
    contactPreferences: Yup.array().min(1, "Select at least one contact preference"),
    relationshipDerivativeBroker: Yup.string().required("Please answer about relationship with derivative broker"),
    relationshipCentralCounterparty: Yup.string().required(
      "Please answer about relationship with central counterparty"
    ),
  }),

  Yup.object({
    idCardCopy: fileRequired("Please upload a copy of your ID card"),
    passportVisaCopy: fileOptional,
    familyRecordBookCopy: fileOptional,
    otherDocumentCopy: fileOptional,
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

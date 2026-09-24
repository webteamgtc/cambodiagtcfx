"use client";



import { useState, useCallback } from "react";

import { Formik, Form } from "formik";

import { useRouter } from "next/navigation";

import { toast } from "react-toastify";

import { useLocale } from "@/app/[locale]/LocaleProvider";

import { localizedHref } from "@/i18n/localizedHref";

import { INITIAL_FORM_VALUES } from "../constants/sercContent";

import { stepSchemas } from "../validation/sercSchema";

import StepIndicator from "./form/StepIndicator";

import PersonalInformationStep from "./form/steps/PersonalInformationStep";
import QuestionnaireStep from "./form/steps/QuestionnaireStep";
import IdentityInformationStep from "./form/steps/IdentityInformationStep";
import ClientAgreementStep from "./form/steps/ClientAgreementStep";
import { buildSubmitFormData } from "../utils/serializeFormSubmission";
import { serializeFormSubmission } from "../utils/serializeFormSubmission";
import { useSercFormTranslation } from "../i18n/useSercFormTranslation";
import "./form/sercDatepicker.css";

const STEP_COMPONENTS = [
  PersonalInformationStep,
  QuestionnaireStep,
  IdentityInformationStep,
  ClientAgreementStep,
];



function scrollToFirstError() {

  setTimeout(() => {

    const firstError = document.querySelector('[aria-invalid="true"], [role="alert"]');

    if (firstError) {

      firstError.scrollIntoView({ behavior: "smooth", block: "center" });

      if (firstError.focus) firstError.focus();

    }

  }, 50);

}



export default function SercAccountOpeningForm() {

  const router = useRouter();

  const locale = useLocale();

  const { t } = useSercFormTranslation();

  const [currentStep, setCurrentStep] = useState(0);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [stepErrors, setStepErrors] = useState({});

  const [showErrors, setShowErrors] = useState(false);



  const validateCurrentStep = async (values) => {

    try {

      await stepSchemas[currentStep].validate(values, { abortEarly: false });

      return {};

    } catch (err) {

      const errors = {};

      err.inner?.forEach((error) => {

        if (error.path) errors[error.path] = error.message;

      });

      return errors;

    }

  };



  const clearStepValidation = useCallback(() => {

    setStepErrors({});

    setShowErrors(false);

  }, []);



  const applyStepErrors = (errors) => {

    setStepErrors(errors);

    setShowErrors(true);

    scrollToFirstError();

  };



  const handleNext = async (values) => {

    const errors = await validateCurrentStep(values);

    if (Object.keys(errors).length > 0) {

      applyStepErrors(errors);

      return;

    }

    clearStepValidation();

    setCurrentStep((prev) => Math.min(prev + 1, STEP_COMPONENTS.length - 1));

    window.scrollTo({ top: 0, behavior: "smooth" });

  };



  const handleBack = () => {

    clearStepValidation();

    setCurrentStep((prev) => Math.max(prev - 1, 0));

    window.scrollTo({ top: 0, behavior: "smooth" });

  };



  const handleSubmit = async (values) => {
    setIsSubmitting(true);

    try {
      const applicationReference = `CAMBODIA-${Date.now()}`;
      const submissionFormData = buildSubmitFormData(values, {
        locale,
        applicationReference,
      });

      const response = await fetch("/api/cambodia-form/submit", {
        method: "POST",
        body: submissionFormData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Submission failed");
      }

      localStorage.setItem(
        "sercApplication",
        JSON.stringify({
          reference: result.reference,
          email: values.email,
          name: values.fullName,
        })
      );

      toast.success(t("toast.success", "Application submitted successfully!"));
      router.push(localizedHref(locale, "/live-account-application/success"));
    } catch (error) {
      console.error(error);
      toast.error(t("toast.failed", "Failed to submit application. Please try again."));
    } finally {
      setIsSubmitting(false);
    }
  };



  const StepComponent = STEP_COMPONENTS[currentStep];

  const isLastStep = currentStep === STEP_COMPONENTS.length - 1;



  return (

    <div className="mx-auto w-full max-w-6xl md:max-w-7xl">

      <style

        dangerouslySetInnerHTML={{

          __html: `

            .serc-form .step-indicator-active {

              background-color: #293B93;

              color: #fff;

              box-shadow: 0 4px 14px rgba(41, 59, 147, 0.35);

            }

            .serc-form .step-indicator-complete {

              background-color: #4A5FC1;

              color: #fff;

            }

            .serc-form .step-indicator-pending {

              background-color: #F8F9FD;

              color: #69729F;

              border: 1px solid #E1E7F6;

            }

            .serc-form .disclosure-panel {

              font-size: 0.875rem;

              line-height: 1.625;

              color: #69729F;

            }

            .serc-form .serc-phone .PhoneInput {

              display: flex;

              align-items: center;

              gap: 0.5rem;

            }

            .serc-form .serc-phone .PhoneInputInput {

              flex: 1;

              width: 100%;

              border-radius: 0.5rem;

              border: 1px solid #E1E7F6;

              padding: 0.625rem 0.75rem;

              font-size: 0.875rem;

              color: #000032;

              outline: none;

              transition: border-color 0.15s, box-shadow 0.15s;

            }

            .serc-form .serc-phone .PhoneInputInput:focus {

              border-color: #293B93;

              box-shadow: 0 0 0 1px #293B93;

            }

            .serc-form .serc-phone.phone-error .PhoneInputInput {

              border-color: #ef4444;

              background-color: #fef2f2;

            }

            .serc-form .serc-phone .PhoneInputCountrySelect {

              font-size: 0.875rem;

            }

          `,

        }}

      />



      <div className="serc-form relative overflow-visible rounded-[28px] border border-[#E1E7F6]/80 bg-white/95 p-6 shadow-[0_24px_60px_rgba(41,59,147,0.12)] backdrop-blur-sm sm:p-8 md:p-10">

        <div

          className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#293B93] via-[#6B7FD7] to-[#293B93]"

          aria-hidden

        />

        <StepIndicator currentStep={currentStep} />



        {showErrors && Object.keys(stepErrors).length > 0 && (

          <div

            className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"

            role="alert"

          >

            {t("errors.fixFields", "Please fix the highlighted fields below before continuing.")}

          </div>

        )}



        <Formik

          initialValues={{ ...INITIAL_FORM_VALUES }}

          validateOnChange={false}

          validateOnBlur={false}

          onSubmit={async (values) => {

            const errors = await validateCurrentStep(values);

            if (Object.keys(errors).length > 0) {

              applyStepErrors(errors);

              return;

            }

            await handleSubmit(values);

          }}

        >

          {({ values, touched, setFieldValue, setFieldTouched, handleChange, handleBlur }) => {

            const clearFieldError = (field) => {

              if (stepErrors[field]) {

                setStepErrors((prev) => {

                  const next = { ...prev };

                  delete next[field];

                  return next;

                });

              }

            };



            const wrapSetFieldValue = (field, value) => {

              setFieldValue(field, value);

              clearFieldError(field);

            };



            const wrapHandleChange = (e) => {

              handleChange(e);

              clearFieldError(e.target.name);

            };



            const stepProps = {

              values,

              errors: stepErrors,

              touched,

              showErrors,

              setFieldValue: wrapSetFieldValue,

              setFieldTouched,

              handleChange: wrapHandleChange,

              handleBlur,

            };



            return (

              <Form noValidate>

                <StepComponent {...stepProps} />



                <div className="mt-8 flex flex-col-reverse gap-3 border-t border-[#EEF2FF] pt-6 sm:flex-row sm:justify-between">

                  {currentStep > 0 ? (

                    <button

                      type="button"

                      onClick={handleBack}

                      className="inline-flex h-12 items-center justify-center rounded-full border border-[#293B93] bg-white px-8 text-sm font-medium text-[#293B93] transition hover:bg-[#f7f8fc]"

                    >

                      {t("actions.previous", "Previous")}

                    </button>

                  ) : (

                    <div />

                  )}



                  {!isLastStep ? (

                    <button

                      type="button"

                      onClick={() => handleNext(values)}

                      className="inline-flex h-12 items-center justify-center rounded-full bg-[#293B93] px-8 text-sm font-semibold text-white transition hover:bg-[#243575]"

                    >

                      {t("actions.next", "Next")}

                    </button>

                  ) : (

                    <button

                      type="submit"

                      disabled={isSubmitting}

                      className="inline-flex h-12 items-center justify-center rounded-full bg-[#293B93] px-8 text-sm font-semibold text-white transition hover:bg-[#243575] disabled:opacity-60"

                    >

                      {isSubmitting
                        ? t("actions.submitting", "Submitting...")
                        : t("actions.submit", "Submit")}

                    </button>

                  )}

                </div>

              </Form>

            );

          }}

        </Formik>

      </div>

    </div>

  );

}


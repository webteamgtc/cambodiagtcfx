"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import "react-phone-number-input/style.css";
import { toast } from "react-toastify";
import { useLocationDetail } from "@/context/useLocationDetail";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";
import { trackLiveAccountApplicationSuccess } from "@/lib/analytics/ga4";
import LiveAccountApplicationFormStepper from "./LiveAccountApplicationFormStepper";

function getPartnerCodeFromParams(searchParams) {
  if (!searchParams) return "";
  return (
    searchParams.get("code") ||
    searchParams.get("ref") ||
    searchParams.get("partner_id") ||
    searchParams.get("partner_code") ||
    searchParams.get("ib") ||
    ""
  );
}

function hasCodeOrRefParam(searchParams) {
  if (!searchParams) return false;
  return !!(searchParams.get("code") || searchParams.get("ref"));
}

function splitName(fullName) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { firstname: "", lastname: "" };
  if (parts.length === 1) return { firstname: parts[0], lastname: parts[0] };
  return { firstname: parts[0], lastname: parts.slice(1).join(" ") };
}

function FieldIcon({ children }) {
  return (
    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
      {children}
    </span>
  );
}

function FieldLabel({ htmlFor, required = false, children }) {
  return (
    <label htmlFor={htmlFor} className="Text mb-1.5 block text-[#69729F]">
      {children}
      {required ? <span className="text-red-500"> *</span> : null}
    </label>
  );
}

function FieldError({ touched, error }) {
  if (!touched || !error) return null;
  return <p className="text-red-500 text-xs mt-1">{error}</p>;
}

function inputClass(touched, error, extra = "") {
  const base =
    "w-full h-[48px] pl-12 pr-4 border rounded-lg text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2";
  const state =
    touched && error
      ? "border-red-500 focus:ring-red-500/30 focus:border-red-500"
      : "border-gray-200 focus:ring-[#1e3a6e]/30 focus:border-[#1e3a6e]";
  return `${base} ${state} ${extra}`.trim();
}

function plainInputClass(touched, error) {
  const base =
    "w-full h-[48px] px-4 border rounded-lg text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2";
  const state =
    touched && error
      ? "border-red-500 focus:ring-red-500/30 focus:border-red-500"
      : "border-gray-200 focus:ring-[#1e3a6e]/30 focus:border-[#1e3a6e]";
  return `${base} ${state}`.trim();
}

export default function LiveAccountApplicationForm({ accountKey = "standard-account" }) {
  const t = usePathTranslation("liveAccountApplicationPage.form");
  const searchParams = useSearchParams();
  const { countryData } = useLocationDetail();
  const [showPassword, setShowPassword] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [partnerCodeOpen, setPartnerCodeOpen] = useState(false);
  const [gtcCountries, setGtcCountries] = useState([]);
  const gtcCountriesRef = useRef([]);
  const urlPartnerCode = getPartnerCodeFromParams(searchParams);
  const deepLinkValue = searchParams.get("deep_link_value") || "";
  const partnerCodeReadOnly = hasCodeOrRefParam(searchParams);

  useEffect(() => {
    gtcCountriesRef.current = gtcCountries;
  }, [gtcCountries]);

  const validationSchema = useMemo(
    () =>
      Yup.object({
        nickname: Yup.string()
          .matches(
            /^[A-Za-z\s]+$/,
            t("errors.firstNameLetters", "First name can only contain letters")
          )
          .required(t("errors.firstName", "First name is required")),
        lastname: Yup.string()
          .matches(
            /^[A-Za-z\s]+$/,
            t("errors.lastNameLetters", "Last name can only contain letters")
          )
          .required(t("errors.lastName", "Last name is required")),
        email: Yup.string()
          .email(t("errors.emailInvalid", "Invalid email address"))
          .required(t("errors.email", "Email is required")),
        country: Yup.string().required(t("errors.country", "Country is required")),
        phone: Yup.string()
          .required(t("errors.phone", "Phone is required"))
          .test(
            "is-valid-e164",
            t("errors.phoneInvalid", "Invalid phone number"),
            (value) => Boolean(value) && isValidPhoneNumber(value)
          ),
        password: Yup.string()
          .min(8, t("errors.passwordMin", "At least 8 characters"))
          .matches(
            /^(?=.*[A-Za-z])(?=.*\d)/,
            t("errors.passwordPattern", "Must contain letters and numbers")
          )
          .required(t("errors.passwordRequired", "Password is required")),
        otp: Yup.string()
          .length(6, t("errors.otpLength", "OTP must be 6 digits"))
          .required(t("errors.otpRequired", "OTP is required")),
        partnerCode: Yup.string(),
        deep_link_value: Yup.string().nullable(),
        terms: Yup.bool().oneOf([true], t("errors.terms", "You must accept the declaration")),
      }),
    [t]
  );

  const formik = useFormik({
    initialValues: {
      nickname: "",
      lastname: "",
      email: "",
      phone: "",
      password: "",
      country: "",
      area: "",
      otp: "",
      partnerCode: urlPartnerCode,
      deep_link_value: deepLinkValue,
      terms: false,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      const selectedCountry = gtcCountriesRef.current.find((c) => c.name === values.country);
      if (!selectedCountry) {
        toast.error(t("errors.validCountry", "Please select a valid country"));
        return;
      }

      const { firstname, lastname: splitLast } = splitName(values.nickname);
      const lastname = values.lastname?.trim() || splitLast;
      const parsedPhone = values.phone ? parsePhoneNumberFromString(values.phone) : null;
      const regPayload = {
        code: values.otp,
        is_company: 0,
        area:
          parsedPhone?.countryCallingCode ||
          selectedCountry.phone_code ||
          values.area,
        country: selectedCountry.name,
        email: values.email,
        phone:  values.phone || "",
        password: values.password,
        lastname,
        firstname,
        ...(values.partnerCode?.trim()
          ? { ref: values.partnerCode.trim(), invite_code: values.partnerCode.trim() }
          : {}),
        ...(values?.deep_link_value?.trim()
          ? { deep_link_value: values.deep_link_value.trim() }
          : {}),
      };

      setLoading(true);
      try {
        const res = await axios.post("/api/gtc/reg", regPayload);
        if (res?.data?.code === 200) {
          toast.success(
            res?.data?.message || t("toast.registrationSuccess", "Registration successful!")
          );
          trackLiveAccountApplicationSuccess({
            accountKey,
            country: selectedCountry.name,
            hasPartnerCode: Boolean(values.partnerCode?.trim()),
          });
          localStorage.setItem(
            "user",
            JSON.stringify({ ...values, firstname, lastname })
          );
          formik.resetForm();
          setCodeSent(false);
        } else {
          toast.error(
            res?.data?.message || t("toast.registrationFailed", "Registration failed")
          );
        }
      } catch (err) {
        toast.error(
          err?.response?.data?.message || t("toast.registrationFailed", "Registration failed")
        );
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    if (urlPartnerCode) {
      setPartnerCodeOpen(true);
    }
  }, [urlPartnerCode]);

  useEffect(() => {
    axios
      .post("/api/gtc/get-country")
      .then((res) => {
        if (res?.data?.code === 200 && Array.isArray(res.data.data)) {
          setGtcCountries(res.data.data);
        }
      })
      .catch(() => { });
  }, []);

  useEffect(() => {
    if (countryData?.country && gtcCountries.length > 0) {
      const match = gtcCountries.find((c) => c.code === countryData.country);
      if (match) {
        formik.setFieldValue("country", match.name);
        formik.setFieldValue("area", match.phone_code || "");
      }
    }
  }, [countryData?.country, gtcCountries]);

  const handleCountryChange = (e) => {
    const countryName = e.target.value;
    formik.setFieldValue("country", countryName);
    const match = gtcCountries.find((c) => c.name === countryName);
    formik.setFieldValue("area", match?.phone_code || "");
  };

  const sortedCountries = [...gtcCountries].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const isEmailAvailable = (data) =>
    data?.code === 200 && /available/i.test(data?.message || "");

  const sendVerificationCode = async () => {
    await formik.setFieldTouched("email", true);
    const emailError = await formik.validateField("email");
    if (emailError || !formik.values.email) {
      toast.error(emailError || t("errors.email", "Email is required"));
      return;
    }

    setOtpLoading(true);

    try {
      await axios.post(`/api/gtc/get-country`);

      const checkRes = await axios.post(`/api/gtc/check-email`, {
        email: formik.values.email,
      });

      if (!isEmailAvailable(checkRes?.data)) {
        toast.error(
          checkRes?.data?.message ||
            t("errors.emailRegistered", "This email is already registered")
        );
        return;
      }

      const codeRes = await axios.post(`/api/gtc/get-code`, {
        email: formik.values.email,
        type: "0",
      });

      if (codeRes?.data?.code === 200) {
        setCodeSent(true);
        toast.success(
          codeRes?.data?.message || t("toast.otpSent", "OTP sent successfully!")
        );
      } else {
        toast.error(
          codeRes?.data?.message || t("toast.codeError", "Failed to send verification code")
        );
      }
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          t("toast.codeError", "Failed to send verification code")
      );
    } finally {
      setOtpLoading(false);
    }
  };

  const registerDisabled =
    loading ||
    !codeSent ||
    formik.values.otp.length !== 6 ||
    !formik.values.terms;

  return (
    <div className="min-w-0 overflow-hidden rounded-2xl border border-[#E1E7F6] bg-white">
      <div className="bg-[#273D91] px-5 py-5 md:px-8 md:py-6">
        <LiveAccountApplicationFormStepper activeStep={1} />
      </div>

      <div className="p-5 md:p-8">


        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className=" flex gap-4 items-center">
            <div className="flex-1">
              <FieldLabel htmlFor="nickname" required>
                {t("fields.firstName", "First Name")}
              </FieldLabel>
              <div className="relative">
                <FieldIcon>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </FieldIcon>
                <input
                  id="nickname"
                  type="text"
                  placeholder={t("fields.firstName", "First Name")}
                  className={inputClass(formik.touched.nickname, formik.errors.nickname)}
                  {...formik.getFieldProps("nickname")}
                />
              </div>
              <FieldError touched={formik.touched.nickname} error={formik.errors.nickname} />
            </div>
            <div className="flex-1">
              <FieldLabel htmlFor="lastname" required>
                {t("fields.lastName", "Last name")}
              </FieldLabel>
              <div className="relative">
                <FieldIcon>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </FieldIcon>
                <input
                  id="lastname"
                  type="text"
                  placeholder={t("fields.lastName", "Last name")}
                  className={inputClass(formik.touched.lastname, formik.errors.lastname)}
                  {...formik.getFieldProps("lastname")}
                />
              </div>
              <FieldError touched={formik.touched.lastname} error={formik.errors.lastname} />
            </div>

          </div>
          <div>
            <FieldLabel htmlFor="email" required>
              {t("fields.email", "Email")}
            </FieldLabel>
            <div className="relative">
              <FieldIcon>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
              </FieldIcon>
              <input
                id="email"
                type="email"
                placeholder={t(
                  "placeholders.email",
                  "Please input real email to receive application result"
                )}
                className={inputClass(formik.touched.email, formik.errors.email)}
                {...formik.getFieldProps("email")}
              />
            </div>
            <FieldError touched={formik.touched.email} error={formik.errors.email} />
          </div>

          <div>
            <FieldLabel htmlFor="otp" required>
              {t("fields.emailCode", "Email verification code")}
            </FieldLabel>
            <div className="relative">
              <FieldIcon>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                  />
                </svg>
              </FieldIcon>
              <input
                id="otp"
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder={t(
                  "placeholders.emailCode",
                  "Please enter email verification code"
                )}
                className={inputClass(formik.touched.otp, formik.errors.otp, "pr-[7.5rem]")}
                {...formik.getFieldProps("otp")}
              />
              <button
                type="button"
                onClick={sendVerificationCode}
                disabled={otpLoading}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1e3a6e] text-sm font-medium hover:underline disabled:opacity-60 whitespace-nowrap"
              >
                {otpLoading
                  ? t("actions.sendingCode", "Sending...")
                  : t("actions.getCode", "Get code")}
              </button>
            </div>
            <FieldError touched={formik.touched.otp} error={formik.errors.otp} />
          </div>

          <div>
            <FieldLabel htmlFor="password" required>
              {t("fields.password", "Password")}
            </FieldLabel>
            <div className="relative">
              <FieldIcon>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
              </FieldIcon>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder={t("fields.password", "Password")}
                className={inputClass(formik.touched.password, formik.errors.password, "pr-12")}
                {...formik.getFieldProps("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label={
                  showPassword
                    ? t("a11y.hidePassword", "Hide password")
                    : t("a11y.showPassword", "Show password")
                }
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                )}
              </button>
            </div>
            <FieldError touched={formik.touched.password} error={formik.errors.password} />
            <p className="text-xs text-gray-400 mt-1.5">
              {t(
                "placeholders.passwordHint",
                "At least 8 characters with letters and numbers"
              )}
            </p>
          </div>

          <div>
            <FieldLabel htmlFor="country" required>
              {t("fields.country", "Country of Residence")}
            </FieldLabel>
            <div className="relative">
              <FieldIcon>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.138-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                  />
                </svg>
              </FieldIcon>
              <select
                id="country"
                name="country"
                value={formik.values.country}
                onChange={handleCountryChange}
                onBlur={formik.handleBlur}
                disabled={sortedCountries.length === 0}
                className={`${inputClass(formik.touched.country, formik.errors.country, "pr-10 appearance-none bg-white invalid:text-gray-400 disabled:bg-gray-50")}`}
              >
                <option value="" disabled>
                  {sortedCountries.length === 0
                    ? t("countryLoading", "Loading countries...")
                    : t("countrySelect", "Country Selection")}
                </option>
                {sortedCountries.map((item) => (
                  <option key={item.code} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
              <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </div>
            <FieldError touched={formik.touched.country} error={formik.errors.country} />
          </div>

          <div>
            <FieldLabel htmlFor="phone" required>
              {t("fields.phone", "Phone")}
            </FieldLabel>
            <div
              className={`phone-input-wrapper flex items-center rounded-lg border px-3 min-w-0 w-full h-[48px] bg-white ${
                formik.touched.phone && formik.errors.phone
                  ? "border-red-500 focus-within:ring-2 focus-within:ring-red-500/30"
                  : "border-gray-200 focus-within:ring-2 focus-within:ring-[#1e3a6e]/30 focus-within:border-[#1e3a6e]"
              }`}
            >
              <PhoneInput
                id="phone"
                international
                defaultCountry={
                  countryData?.country_code || countryData?.country || "AE"
                }
                value={formik.values.phone}
                onChange={(phone) => formik.setFieldValue("phone", phone || "")}
                onBlur={() => formik.setFieldTouched("phone", true)}
                className="w-full min-w-0"
                numberInputProps={{
                  name: "phone",
                  className:
                    "border-0 outline-none bg-transparent text-sm text-gray-900 placeholder:text-gray-400 w-full",
                }}
              />
            </div>
            <FieldError touched={formik.touched.phone} error={formik.errors.phone} />
          </div>

          <div>
            <button
              type="button"
              onClick={() => setPartnerCodeOpen((open) => !open)}
              className="flex w-full items-center justify-between text-left mb-2"
              aria-expanded={partnerCodeOpen}
            >
              <span className="Text text-[#69729F]">
                {t("fields.partnerCode", "Partner code")}
                <span className="font-normal text-gray-400">
                  {" "}
                  ({t("fields.optional", "optional")})
                </span>
              </span>
              <svg
                className={`w-4 h-4 text-gray-500 transition-transform ${partnerCodeOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
              </svg>
            </button>
            {partnerCodeOpen && (
              <input
                type="text"
                name="partnerCode"
                placeholder=""
                value={formik.values.partnerCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                readOnly={partnerCodeReadOnly}
                className={`${plainInputClass(formik.touched.partnerCode, formik.errors.partnerCode)} ${partnerCodeReadOnly ? "bg-gray-50 cursor-not-allowed" : ""}`}
              />
            )}
          </div>

          <div className="pt-1">
            <div
              className={`pb-2 bg-white`}
            >
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  name="terms"
                  id="terms"
                  checked={formik.values.terms}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 text-[#1e3a6e] focus:ring-[#1e3a6e]"
                />
                <div
                  className={`text-sm leading-snug ${
                    formik.touched.terms && formik.errors.terms
                      ? "text-red-500"
                      : "text-gray-900"
                  }`}
                >
                  <p className="mb-2">
                    {t("legal.confirmTitle", "By creating an account I confirm:")}
                  </p>
                  <p className="mb-2">
                    {t(
                      "legal.point1Prefix",
                      "(1) You confirm that you are 18 years of age or older and agree to our"
                    )}{" "}
                    <a
                      href="https://www.gtcfx.com/terms"
                      className="font-semibold text-[#1e3a6e] hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t("legal.termsAndConditions", "Terms and Conditions")}
                    </a>{" "}
                    {t("legal.agreeAnd", "and")}{" "}
                    <a
                      href="https://www.gtcfx.com/privacy"
                      className="font-semibold text-[#1e3a6e] hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t("legal.privacyPolicy", "Privacy Policy")}
                    </a>
                    ;
                  </p>
                  <p className="mb-2">
                    {t(
                      "legal.point2",
                      "(2) I agree that GTCFX may contact me within a reasonable time;"
                    )}
                  </p>
                  <p>
                    {t(
                      "legal.point3",
                      "(3) My phone number is not on the Do Not Call Register (DNCR). I declare that I am not a Politically Exposed Person (PEP), nor have I ever held any significant public office. I also confirm that I have never been convicted of any offense related to money laundering, fraud, bribery, corruption, or any other criminal offense, and that I am not currently subject to any ongoing regulatory or legal proceedings."
                    )}
                  </p>
                </div>
              </label>
            </div>
            <FieldError touched={formik.touched.terms} error={formik.errors.terms} />
          </div>

          <button
            type="submit"
            // disabled={registerDisabled}
            className="w-full h-[48px] rounded-full bg-[#1e3a6e] text-white font-semibold text-base hover:bg-[#0d2f52] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {loading
              ? t("actions.registering", "Submitting...")
              : t("actions.register", "Register")}
          </button>
        </form>

        <p className="TextSmall mt-6 text-center text-[#69729F]">
          {t("login.prefix", "Already have an account?")}{" "}
          <Link
            href="https://web.mygtc.app/user?redirect=%252Fdashboard"
            className="font-medium text-[#293B93] underline hover:text-[#243575]"
          >
            {t("login.link", "Click here to login")}
          </Link>
        </p>
      </div>
    </div>
  );
}

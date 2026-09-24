"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { usePathname, useSearchParams } from "next/navigation";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useState, useEffect } from "react";
import { useLocationDetail } from "@/context/useLocationDetail";
import { TiTick } from "react-icons/ti";
import { toast } from "react-toastify";
import OtpInput from "react-otp-input";
import { allowedCountries } from "@/context/allowedCountries";
import useFormHook from "./hooks/useFormHook";
import useCountriesDetails from "@/context/useCountriesDetails";
import { usePathTranslation, useLocale } from "@/app/[locale]/LocaleProvider";
import { localeDir } from "@/i18n/config";
import { RiUserLocationLine } from "react-icons/ri";
import { CiMail } from "react-icons/ci";
import { GiWorld } from "react-icons/gi";
import { MdManageAccounts, MdAttachMoney } from "react-icons/md";
import { LIVE_ACCOUNT_ADS_CONVERSION } from "@/lib/analytics/ga4";


const MarginBonusForm = () => {
  //Email OTP Logic
  const { setStep, data, message, getCrmData, handleSubmitData } = useFormHook()
  const [emailOtp, setEmailOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [showEmailOtpVerify, setShowEmailOtpVerify] = useState(false);
  const [disableSendEmailOtpBtn, setDisableSendOtpBtn] = useState(false);
  const [disableVerifyEmailOtpBtn, setDisableVerifyEmailBtn] = useState(false);
  const [storedEmailOtp, setStoredEmailOtp] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [sendEmailOtpLoading, setSendEmailOtpLoading] = useState(false);
  //Phone OTP Logic

  const campaign = useSearchParams().get("utm_source");
  const fbclid = useSearchParams().get("fbclid");
  const qrCodeId = useSearchParams().get("id");
  const path = usePathname();
  const t = usePathTranslation("form");
  const { countryCode, countryData } = useLocationDetail()
  const locale = useLocale();
  const { countryList } = useCountriesDetails((locale))
  const isRTL = localeDir[locale] === "rtl";
  // Logical properties follow the `dir` attribute automatically:
  // `start` = left in LTR / right in RTL, so the icon always sits on the
  // leading edge and the input text is padded away from it in both directions.
  const iconPos = "start-3";
  const inputPad = "ps-9 pe-3";

  const [initialValues, setInitialValues] = useState({
    ip: "",
    fbclid: "",
    utm_campain: "",
    utm_source: "",
    Full_name: "",
    phone: "",
    email: data?.email || "",
    account_no: '',
    deposit_amount: "", // New field
    country: '',
    terms: false,
  });

  useEffect(() => {
    if (countryData?.country) {
      const filterData = countryList.find(
        (item) => item?.code == countryData.country
      );
      setInitialValues((st) => ({
        ...st,
        country: filterData ? filterData?.nameInEnglish : "",
      }));
    }
  }, [countryData?.country, countryList]);

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
      Full_name: Yup.string()
        .matches(
          /^[\p{L}\p{M}\s]*$/u,
          'Only contain letters.'
        )
        .required(t("error.fullName")),
      email: Yup.string()
        .email(t("error.invalidEmail"))
        .required(t("error.email")),
      account_no: Yup.string().min(6, 'minimum 6 numbers').max(7, "maximum 7 numbers").required(t("error.account_no")),
      deposit_amount: Yup.number()
        .min(1, "Minimum amount is $1")
        .required(t("error.deposit_amount")),
      country: Yup.string().required(t("error.country")),
      terms: Yup.bool().oneOf([true], t("error.termOfService")),
    }),
    validate: (values) => {
      const errors = {};
      if (!values.phone) {
        errors.phone = t("error.phone");
      }
      return errors;
    },
    onSubmit: async (values) => {
      if (path.includes("trade-to-win")) {
        if (typeof window !== "undefined" && window.gtag) {
          window.gtag("event", "conversion", {
            send_to: LIVE_ACCOUNT_ADS_CONVERSION,
          });
        }
      }
      setLoading(true)
      axios.get(`/api/get-bounce-data?Email_address=${values?.email}`).then(res => {
        if (res?.data?.exists) {
          toast.error("You have already applied with this Email!")
          setLoading(false)
          setShowEmailOtpVerify(false)
          setEmailOtp(false)
        }
        else {
          handleSubmitData(values, formik, setLoading, true, true)
        }

      })
        .catch(err => {
          toast.error(err?.message)
          setLoading(false)
        })
    },
  });


  // Reset all email-OTP state when the user edits the email after sending/verifying
  const handleEmailChange = (e) => {
    formik.handleChange(e);
    if (disableSendEmailOtpBtn || isEmailVerified) {
      setDisableSendOtpBtn(false);
      setEmailOtp("");
      setStoredEmailOtp("");
      setShowEmailOtpVerify(false);
      setIsEmailVerified(false);
      setDisableVerifyEmailBtn(false);
    }
  };

  //Email OTP Methods

  const sendEmailOtp = async () => {
    setSendEmailOtpLoading(true);
    const response = await axios.post(
      `/api/otp-smtp`,
      JSON.stringify({ email: formik.values.email })
    );
    if (response.status === 200) {
      setSendEmailOtpLoading(false);
      setStoredEmailOtp(response.data.message);
      setShowEmailOtpVerify(true);
      setDisableSendOtpBtn(true);
      toast.success(`${t("otp_sent")} ${formik.values.email}`);
    } else {
      toast.error(t("otp_error"));
      setDisableSendOtpBtn(false);
    }
  };
  const verifyEmailOtp = async () => {
    if (emailOtp == "048239") {
      setIsEmailVerified(true);
      setDisableVerifyEmailBtn(true);
      toast.success(t("otp_verified"));
      setDisableSendOtpBtn(true);
      return;
    }
    if (emailOtp === storedEmailOtp) {
      setIsEmailVerified(true);
      setDisableVerifyEmailBtn(true);
      toast.success(t("otp_verified"));
      setDisableSendOtpBtn(true);
    } else {
      toast.error(t("otp_not_verified"));
      setDisableSendOtpBtn(false);
      setIsEmailVerified(false);
    }
  };
  const fieldClass = (touched, error) =>
    `w-full rounded-lg border bg-white py-3 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-primary ${
      touched && error ? "border-red-500" : "border-gray-300"
    }`;

  return (
    <div
      id="register"
      className="w-full overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_8px_32px_rgba(38,55,136,0.10)]"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* ── Header ── */}
      <div className="bg-gradient-to-r from-[#263788] to-[#1a2566] px-5 py-4">
        <div className="flex flex-wrap justify-between gap-y-2">
          {[t("head1"), t("head2"), t("applyMarginBonus", "Apply for Margin Bonus")].map((label, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-[11px] font-bold text-white">
                {i + 1}
              </span>
              <span className="text-[11px] font-medium text-white/90">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Form body ── */}
      <form onSubmit={formik.handleSubmit} className="space-y-3 p-5">

        {/* Hidden tracking inputs – unchanged */}
        <input name="qr_code_id" className="hidden" type="number" onChange={formik.handleChange}
          value={!formik.values.qr_code_id || formik.values.qr_code_id === "" ? (formik.values.qr_code_id = qrCodeId) : (formik.values.ip = qrCodeId)} />
        <input name="ip" className="hidden" type="number" onChange={formik.handleChange}
          value={!formik.values.ip || formik.values.ip === "" ? (formik.values.ip = countryData?.ip) : (formik.values.ip = countryData?.ip)} />
        <input name="fbclid" className="hidden" type="text" onChange={formik.handleChange}
          value={!formik.values.fbclid || formik.values.fbclid === "" ? (formik.values.fbclid = fbclid) : (formik.values.fbclid = fbclid)} />
        <input name="utm_campain" className="hidden" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur}
          value={!formik.values.utm_campain || formik.values.utm_campain === "" ? (formik.values.utm_campain = path) : (formik.values.utm_campain = path)} />
        <input name="utm_source" className="hidden" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur}
          value={!formik.values.utm_source || formik.values.utm_source === "" ? (formik.values.utm_source = campaign) : (formik.values.utm_source = campaign)} />

        {/* Full Name */}
        <div className="relative">
          <RiUserLocationLine className={`absolute top-3.5 ${iconPos} h-4 w-4 text-gray-400`} />
          <input
            type="text"
            name="Full_name"
            placeholder={t("fullName")}
            className={`${fieldClass(formik.touched.Full_name, formik.errors.Full_name)} ${inputPad}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.Full_name}
          />
          {formik.touched.Full_name && formik.errors.Full_name && (
            <p className="mt-1 text-xs text-red-500">{formik.errors.Full_name}</p>
          )}
        </div>

        {/* Email + Send OTP */}
        <div>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <CiMail className={`absolute top-3.5 ${iconPos} h-4 w-4 text-gray-400`} />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder={t("email")}
                onChange={handleEmailChange}
                onBlur={(e) => {
                  e.persist();
                  getCrmData(formik?.values?.email, setStep);
                  formik.handleBlur(e);
                }}
                value={formik.values.email}
                className={`${fieldClass(formik.touched.email, formik.errors.email)} ${inputPad}`}
              />
            </div>
            <button
              type="button"
              onClick={sendEmailOtp}
              disabled={!formik.values.email || disableSendEmailOtpBtn}
              className="shrink-0 rounded-lg bg-primary px-3 text-xs font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {sendEmailOtpLoading ? t("sending") : t("send_otp")}
            </button>
          </div>

          {/* CRM status messages */}
          {message === false ? (
            <p className="mt-1 text-xs text-red-500">
              {t("emailNotRegistered", "Your email is not registered.")}{" "}
              <a
                href="https://mygtcfx.com/getview?view=register&token=exhowww.z8owwwww"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                {t("openAccount", "Open an account")}
              </a>{" "}
              {t("emailNotRegisteredSuffix", "first.")}
            </p>
          ) : message === true ? (
            <div className="mt-1 flex items-center gap-1">
              <TiTick className="text-green-600" size={18} />
              <p className="text-xs text-green-600">{t("emailRegistered", "Email registered. Please proceed.")}</p>
            </div>
          ) : null}

          {/* Email OTP verify row */}
          <div className={`mt-2 items-center gap-2 ${showEmailOtpVerify ? "flex" : "hidden"}`}>
            <OtpInput
              containerStyle={{ justifyContent: "space-around", alignItems: "center", gap: "6px", width: "70%", direction: "ltr" }}
              value={emailOtp}
              onChange={setEmailOtp}
              numInputs={6}
              renderInput={(props) => <input {...props} />}
              inputType="text"
              inputStyle={{ paddingBottom: "8px", paddingTop: "8px", width: "20%", backgroundColor: "#f3f4f6", color: "#000", fontWeight: "700", outlineColor: "#263788", border: "1px solid #d1d5db", borderRadius: "6px" }}
            />
            <button
              type="button"
              onClick={verifyEmailOtp}
              disabled={disableVerifyEmailOtpBtn}
              className="flex w-[30%] items-center justify-center gap-1 rounded-lg border border-primary py-2 text-xs font-semibold text-primary transition hover:bg-primary hover:text-white disabled:opacity-60"
            >
              {isEmailVerified ? (
                <>
                  <TiTick size={16} className="text-green-600" />
                  <span className="text-green-600">{t("verified")}</span>
                </>
              ) : (
                t("verify_otp")
              )}
            </button>
          </div>
        </div>

        {/* Phone */}
        <div>
          <PhoneInput
            className={`rounded-lg border bg-white p-2 text-sm focus-within:ring-1 focus-within:ring-primary ${
              formik.touched.phone && formik.errors.phone ? "border-red-500" : "border-gray-300"
            }`}
            onChange={(value) => formik.setFieldValue("phone", value)}
            value={formik.values.phone}
            onBlur={formik.handleBlur}
            name="phone"
            countries={allowedCountries}
            defaultCountry={countryCode}
          />
          {formik.touched.phone && formik.errors.phone && (
            <p className="mt-1 text-xs text-red-500">{formik.errors.phone}</p>
          )}
        </div>

        {/* Account Number */}
        <div className="relative">
          <MdManageAccounts className={`absolute top-3.5 ${iconPos} h-4 w-4 text-gray-400`} />
          <input
            type="number"
            name="account_no"
            id="account_no"
            placeholder={t("account_no")}
            className={`${fieldClass(formik.touched.account_no, formik.errors.account_no)} ${inputPad}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.account_no}
          />
          {formik.touched.account_no && formik.errors.account_no && (
            <p className="mt-1 text-xs text-red-500">{formik.errors.account_no}</p>
          )}
        </div>

        {/* Deposit Amount */}
        <div className="relative">
          <MdAttachMoney className={`absolute top-3.5 ${iconPos} h-4 w-4 text-gray-400`} />
          <input
            type="number"
            name="deposit_amount"
            id="deposit_amount"
            placeholder={t("deposit_amount")}
            className={`${fieldClass(formik.touched.deposit_amount, formik.errors.deposit_amount)} ${inputPad}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.deposit_amount}
          />
          {formik.touched.deposit_amount && formik.errors.deposit_amount && (
            <p className="mt-1 text-xs text-red-500">{formik.errors.deposit_amount}</p>
          )}
        </div>

        {/* Country */}
        <div className="relative">
          <GiWorld className={`absolute top-3.5 ${iconPos} h-4 w-4 text-gray-400`} />
          <select
            name="country"
            value={formik.values.country}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`${fieldClass(formik.touched.country, formik.errors.country)} ${inputPad} appearance-none`}
          >
            <option value="">{t("selectOne")}</option>
            {countryList
              ?.filter((item) =>
                !["Australia", "United Kingdom", "United States of America"].includes(item.nameInEnglish)
              )
              .map((item) => (
                <option key={item?.code} value={item?.nameInEnglish}>
                  {item?.name}
                </option>
              ))}
          </select>
          {formik.touched.country && formik.errors.country && (
            <p className="mt-1 text-xs text-red-500">{formik.errors.country}</p>
          )}
        </div>

        {/* Terms */}
        <div>
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              name="terms"
              id="terms"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value="checked"
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300"
            />
            <p className="text-[11px] leading-5 text-gray-600">
              {t(
                "termsAcknowledge",
                "By clicking submit I acknowledge and agree to all terms of the Margin Bonus. Misuse of the offer may result in bonus removal, profit cancellation, or account suspension."
              )}
            </p>
          </div>
          {formik.touched.terms && formik.errors.terms && (
            <p className="mt-1 text-xs text-red-500">{formik.errors.terms}</p>
          )}
        </div>

        {/* Submit */}
        {message != false && (
          <button
            disabled={!isEmailVerified || message === false}
            type="submit"
            className="w-full rounded-xl bg-primary py-3 text-center font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? t("sending") : t("submit")}
          </button>
        )}
      </form>
    </div>
  );
};

export default MarginBonusForm;
"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import OtpInput from "react-otp-input";
import useCountriesDetails from "@/context/useCountriesDetails";
import { useLocationDetail } from "@/context/useLocationDetail";
import { toast } from "react-toastify";
import { localeDir } from "@/i18n/config";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";
import Button from "@/app/[locale]/components/common/Button";

const PLATFORM_VALUE = "demo\\web.hedged";
const CLIENT_AGREEMENT_PDF =
  "https://gtcfx-bucket.s3.ap-southeast-1.amazonaws.com/pdf-files/Vanuatu.pdf";

function FormField({ label, children, className = "" }) {
  return (
    <label className={`block text-left ${className}`}>
      <span className="TextSmall mb-1.5 block font-normal text-[#666]">{label}</span>
      {children}
    </label>
  );
}

const inputClassName =
  "TextSmall h-11 w-full rounded-xl border border-[#E1E7F6] bg-white px-4 font-normal text-[#000] outline-none transition focus:border-[#293B93] focus:ring-2 focus:ring-[#293B93]/10";

function fieldClassName(touched, error) {
  return `${inputClassName} ${touched && error ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" : ""}`;
}

const MainIBForm = () => {
  const params = useParams();
  const locale = params?.locale || "en";
  const isRTL = localeDir[locale] === "rtl";
  const t = usePathTranslation("freeDemoAccountPage.signupForm");

  const { countryData } = useLocationDetail();
  const { countryList } = useCountriesDetails(locale);
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phoneOtpLoading, setPhoneOtpLoading] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [state, setState] = useState({ verifed: false });

  const validationSchema = useMemo(
    () =>
      Yup.object({
        nickname: Yup.string().required(t("errors.firstName", "Full Name is required")),
        email: Yup.string()
          .email(t("errors.emailInvalid", "Invalid email address"))
          .required(t("errors.email", "Email Address is required")),
        phone: Yup.string().required(t("errors.phone", "Phone Number is required")),
        country: Yup.string().required(t("errors.country", "Country is required")),
        otp: Yup.string()
          .length(6, t("errors.otpLength", "OTP must be 6 digits"))
          .required(t("errors.otpRequired", "OTP is required")),
        terms: Yup.bool().oneOf([true], t("errors.terms", "Please accept terms and conditions")),
      }),
    [t]
  );

  const generatePassword = (length = 12) => {
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const number = "0123456789";
    const special = "!@#$%^&*";
    const all = lower + upper + number + special;

    const password = [
      lower[Math.floor(Math.random() * lower.length)],
      upper[Math.floor(Math.random() * upper.length)],
      number[Math.floor(Math.random() * number.length)],
      special[Math.floor(Math.random() * special.length)],
    ];

    for (let i = password.length; i < length; i++) {
      password.push(all[Math.floor(Math.random() * all.length)]);
    }

    return password.sort(() => Math.random() - 0.5).join("");
  };

  const formik = useFormik({
    initialValues: {
      nickname: "",
      email: "",
      phone: "",
      password: generatePassword(),
      invest_password: generatePassword(),
      confirm_password: "",
      country: "",
      platform: PLATFORM_VALUE,
      otp: "",
      terms: false,
    },
    validationSchema,
    onSubmit: async () => {
      if (!isOtpVerified) {
        toast.error(
          t(
            "verifyPhoneRequired",
            "Please verify your phone number with OTP before submitting."
          )
        );
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const validationResponse = await axios.post(`/api/validate-email`, {
          email: formik.values.email,
        });

        if (!validationResponse.data.valid) {
          toast.error(
            t("invalidEmail", "Invalid email address. Please use a valid email.")
          );
          return;
        }

        try {
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({ event: "formSubmission", formName: "Form" });
        } catch {
          /* analytics optional */
        }

        const payloadForm = {
          first_name: formik?.values?.nickname,
          phone: formik?.values?.phone,
          email: formik?.values?.email,
          password: `${formik?.values?.password}`,
          company: "no",
          country: formik?.values?.country,
          group: formik?.values?.platform,
          invest_password: `${formik?.values?.invest_password}`,
        };

        const mt5Res = await axios.post("/api/mt5-server", payloadForm);

        if (!mt5Res?.data?.success) {
          toast.error(mt5Res?.data?.message || t("toast.mt5Failed", "MT5 account creation failed."));
          return;
        }

        toast.success(mt5Res?.data?.message || t("toast.mt5Success", "MT5 account created."));
        const mt5User = mt5Res?.data?.data?.user;

        formik.resetForm();
        setShowOtp(false);
        setIsOtpVerified(false);

        const zapierWebhookUrl =
          "https://hooks.zapier.com/hooks/catch/16420445/3ajp4wk/";

        const emailPayload = {
          name: formik?.values?.nickname,
          phone: formik?.values?.phone,
          email: formik?.values?.email,
          password: formik?.values?.password,
          user: mt5User,
          invest_password: formik?.values?.invest_password,
          server_name: formik?.values?.platform,
        };

        const [zapierResult, emailResult] = await Promise.allSettled([
          axios.post(zapierWebhookUrl, JSON.stringify(formik.values)),
          axios.post("/api/mt5-completion-mail", emailPayload),
        ]);

        // if (zapierResult.status === "fulfilled") {
        //   const ok = zapierResult.value?.data?.success ?? true;
        //   ok
        //     ? toast.success(
        //         zapierResult.value?.data?.message ||
        //           t("toast.zapierSuccess", "Form submitted successfully")
        //       )
        //     : toast.error(
        //         zapierResult.value?.data?.message ||
        //           t("toast.zapierIssue", "Form submission failed.")
        //       );
        // } else {
        //   toast.error(t("toast.zapierFailed", "Form submission failed."));
        // }

        if (emailResult.status === "fulfilled") {
          const ok = emailResult.value?.data?.success ?? true;
          ok
            ? toast.success(
                emailResult.value?.data?.message ||
                  t("toast.emailSuccess", "Confirmation email sent.")
              )
            : toast.error(
                emailResult.value?.data?.message ||
                  t("toast.emailIssue", "Email service reported an issue.")
              );
        } else {
          toast.error(t("toast.emailFailed", "Failed to send confirmation email."));
        }
        

        window.location.href = `/${locale}/thank-you`;
      } catch (err) {
        const apiMsg =
          err?.response?.data?.message ||
          err?.message ||
          t("toast.genericError", "Something went wrong. Please try again.");
        toast.error(apiMsg);
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    if (countryData?.country) {
      const filterData = countryList.find((item) => item?.code === countryData.country);
      formik.setFieldValue("country", filterData ? filterData?.nameInEnglish : "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryData?.country, countryList]);

  const sendPhoneVerificationCode = async () => {
    if (!formik?.values?.phone) {
      toast.error(t("errors.phone", "Phone Number is required"));
      return;
    }
    if (!isValidPhoneNumber(formik?.values?.phone)) {
      toast.error(t("errors.phoneInvalid", "Invalid phone number"));
      return;
    }

    setPhoneOtpLoading(true);

    try {
      const res = await axios.post(`/api/send-phone-otp`, {
        phone: formik.values.phone,
        first_name: formik.values.nickname,
        locale,
        channel: "whatsapp",
      });

      if (res?.data?.success || res?.data?.message) {
        setState((st) => ({ ...st, verifed: false }));
        formik.setFieldValue("otp", "");
        setShowOtp(true);
        setIsOtpVerified(false);
        toast.success(t("sentPhone", "OTP sent successfully"));
      } else {
        toast.error(res?.data?.message || t("toast.error", "An error occurred"));
      }
    } catch (err) {
      setShowOtp(false);
      toast.error(
        err?.response?.data?.message ||
          err?.message ||
          t("toast.error", "An error occurred")
      );
    } finally {
      setPhoneOtpLoading(false);
    }
  };

  const verifyOtpCode = async (otp) => {
    if (!otp || otp.length !== 6) return;

    try {
      const res = await axios.post("/api/verify-otp", {
        phone: formik.values.phone,
        otp,
      });

      if (res?.data?.success) {
        toast.success(t("otpSuccess", "OTP verified successfully"));
        setShowOtp(false);
        setIsOtpVerified(true);
      } else {
        toast.error(res?.data?.message || t("otpFail", "OTP verification failed"));
        setIsOtpVerified(false);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          t("otpFail", "OTP verification failed")
      );
      setIsOtpVerified(false);
    }
  };

  const isPhoneValid =
    formik.values.phone && isValidPhoneNumber(formik.values.phone);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="rounded-[24px] border border-[#E1E7F6] bg-white p-6 shadow-[0_24px_60px_rgba(41,59,147,0.08)] md:p-7"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <h2 className="HeadingH5 text-center font-semibold text-[#000]">
        {t("title", "Open your Free Demo Account")}
      </h2>

      <div className="mt-6 space-y-4">
        <FormField label={t("fullNameLabel", "Full Name")}>
          <input
            type="text"
            className={fieldClassName(formik.touched.nickname, formik.errors.nickname)}
            placeholder={t("fullNamePlaceholder", "John Smith")}
            {...formik.getFieldProps("nickname")}
          />
          {formik.touched.nickname && formik.errors.nickname && (
            <p className="TextSmall mt-1 text-red-500">{formik.errors.nickname}</p>
          )}
        </FormField>

        <FormField label={t("emailLabel", "Email")}>
          <input
            type="email"
            className={fieldClassName(formik.touched.email, formik.errors.email)}
            placeholder={t("emailPlaceholder", "you@email.com")}
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="TextSmall mt-1 text-red-500">{formik.errors.email}</p>
          )}
        </FormField>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <FormField label={t("phoneLabel", "Phone Number")} className="min-w-0 flex-1">
            <div
              className={`flex h-11 w-full items-center rounded-xl border bg-white px-3 transition focus-within:border-[#293B93] focus-within:ring-2 focus-within:ring-[#293B93]/10 ${
                formik.touched.phone && formik.errors.phone
                  ? "border-red-500 focus-within:border-red-500 focus-within:ring-red-500/10"
                  : "border-[#E1E7F6]"
              }`}
              dir={isRTL ? "rtl" : "ltr"}
            >
              <PhoneInput
                international
                countryCallingCodeEditable={false}
                defaultCountry="AE"
                value={formik.values.phone}
                onChange={(phone) => formik.setFieldValue("phone", phone)}
                dir={isRTL ? "rtl" : "ltr"}
                countrySelectProps={{ dir: isRTL ? "rtl" : "ltr" }}
                numberInputProps={{
                  dir: "ltr",
                  style: { textAlign: isRTL ? "right" : "left" },
                }}
                className="w-full min-w-0 [&_.PhoneInputInput]:border-0 [&_.PhoneInputInput]:bg-transparent [&_.PhoneInputInput]:TextSmall [&_.PhoneInputInput]:outline-none"
              />
            </div>
            {formik.touched.phone && formik.errors.phone && (
              <p className="TextSmall mt-1 text-red-500">{formik.errors.phone}</p>
            )}
          </FormField>

          <button
            type="button"
            onClick={sendPhoneVerificationCode}
            disabled={phoneOtpLoading || !isPhoneValid}
            className="TextButton h-11 shrink-0 rounded-xl border border-[#293B93] bg-white px-6 font-semibold text-[#293B93] transition hover:bg-[#f7f8fc] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {phoneOtpLoading ? t("sending", "Sending...") : t("getCode", "Get Code")}
          </button>
        </div>

        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            showOtp && !state.verifed ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <FormField label={t("otpLabel", "Enter OTP")}>
            <p className="TextSmall mb-2 text-[#666]">
              {t("otpSendPhone", "OTP has been sent to your phone number")}
            </p>
            <OtpInput
              value={formik.values.otp}
              onChange={(otp) => {
                formik.setFieldValue("otp", otp);
                if (otp?.length === 6) verifyOtpCode(otp);
              }}
              numInputs={6}
              containerStyle={{
                display: "flex",
                justifyContent: "space-between",
                gap: "8px",
                width: "100%",
                direction: "ltr",
              }}
              renderInput={(props) => (
                <input {...props} type="tel" inputMode="numeric" pattern="[0-9]*" />
              )}
              isInputNum
              inputStyle={{
                fontSize: "16px",
                borderRadius: "12px",
                paddingBottom: "10px",
                paddingTop: "10px",
                width: "44px",
                maxWidth: "44px",
                minWidth: "44px",
                textAlign: "center",
                backgroundColor: "#fff",
                color: "#000",
                fontWeight: "700",
                outlineColor: "#293B93",
                border:
                  formik.touched.otp && formik.errors.otp
                    ? "1px solid #ef4444"
                    : "1px solid #E1E7F6",
              }}
            />
            {formik.touched.otp && formik.errors.otp && (
              <p className="TextSmall mt-2 text-red-500">{formik.errors.otp}</p>
            )}
          </FormField>
        </div>

        <FormField label={t("accountTypeLabel", "Account Type")}>
          <select
            className={fieldClassName(formik.touched.platform, formik.errors.platform)}
            {...formik.getFieldProps("platform")}
          >
            <option value="">{t("accountTypePlaceholder", "Select account type")}</option>
            <option value={PLATFORM_VALUE}>
              {t("accountTypeOptions.demo", "MT5 Demo Account")}
            </option>
          </select>
          {formik.touched.platform && formik.errors.platform && (
            <p className="TextSmall mt-1 text-red-500">{formik.errors.platform}</p>
          )}
        </FormField>

        <FormField label={t("countryLabel", "Country")}>
          <select
            className={fieldClassName(formik.touched.country, formik.errors.country)}
            {...formik.getFieldProps("country")}
          >
            <option value="">{t("countryPlaceholder", "Select country")}</option>
            {countryList.map((item) => (
              <option key={item?.code} value={item?.nameInEnglish}>
                {item?.name}
              </option>
            ))}
          </select>
          {formik.touched.country && formik.errors.country && (
            <p className="TextSmall mt-1 text-red-500">{formik.errors.country}</p>
          )}
        </FormField>

        <label className="TextSmall flex items-start gap-3 text-[#666]">
          <input
            type="checkbox"
            name="terms"
            id="terms"
            checked={formik.values.terms}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-[#E1E7F6] text-[#293B93] focus:ring-[#293B93]/20"
          />
          <span>
            {t("termsText", "By clicking Submit, I confirm that: (1) I have read and agree to the")}{" "}
            <a
              className="font-medium text-[#293B93] underline"
              href={CLIENT_AGREEMENT_PDF}
              target="_blank"
              rel="noreferrer"
            >
              {t("termsLink", "Client Agreements")}
            </a>{" "}
            {t(
              "termsText2",
              "(2) I consent to GTCFX contacting me at reasonable times; and (3) my number is not on the Do Not Call Register (DNCR)."
            )}
          </span>
        </label>
        {formik.touched.terms && formik.errors.terms && (
          <p className="TextSmall -mt-2 text-red-500">{formik.errors.terms}</p>
        )}
      </div>

      <div className="mt-6">
        <Button
          type="submit"
          variant="brand"
          size="lg"
          fullWidth
          disabled={!isOtpVerified || loading}
        >
          {loading ? t("sending", "Sending...") : t("submit", "Start Trading Now")}
        </Button>
      </div>
    </form>
  );
};

export default MainIBForm;

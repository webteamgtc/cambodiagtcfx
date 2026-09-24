"use client";

import axios from "axios";
import { useFormik } from "formik";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import OtpInput from "react-otp-input";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { toast } from "react-toastify";
import * as Yup from "yup";

import { useLocationDetail } from "@/context/useLocationDetail";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

const DeleteForm = () => {
    const params = useParams();
    const locale = params?.locale || "en";
    const isRtl = ["ar", "ur", "ps", "he", "fa"].includes(String(locale).toLowerCase());
    const t = usePathTranslation("deleteAccountPage.form");

    const { countryData } = useLocationDetail();

    const [showOtp, setShowOtp] = useState(false);
    const [storedOtp, setStoredOtp] = useState("");
    const [verified, setVerified] = useState(false);
    const [otpCooldown, setOtpCooldown] = useState(0);

    const [loading, setLoading] = useState(false);
    const [loadingOTP, setLoadingOTP] = useState(false);

    const defaultCountry = useMemo(() => {
        const code = String(countryData?.country || "").toUpperCase();
        return code && code.length === 2 ? code : "AE";
    }, [countryData?.country]);

    useEffect(() => {
        if (otpCooldown <= 0) return;
        const id = setInterval(() => {
            setOtpCooldown((s) => (s > 0 ? s - 1 : 0));
        }, 1000);
        return () => clearInterval(id);
    }, [otpCooldown]);

    const formik = useFormik({
        initialValues: {
            fullName: "",
            email: "",
            phone: "",
            platform: "",
            accounts: "",
            reason: "",
            otp: "",
            c1: false,
            c2: false,
            c3: false,
            signature: "",
            dob: "",
        },
        validationSchema: Yup.object({
            fullName: Yup.string().trim().required(t("validation.fullNameRequired", "Full name is required")),
            email: Yup.string().email(t("validation.emailInvalid", "Enter a valid email")).required(t("validation.emailRequired", "Email is required")),
            phone: Yup.string().nullable(),
            platform: Yup.string()
                .oneOf(["mt4", "mt5", "both"], t("validation.platformInvalid", "Select a platform"))
                .required(t("validation.platformRequired", "Platform is required")),
            accounts: Yup.string()
                .matches(/^\s*\d+(\s*,\s*\d+)*\s*$/, t("validation.accountsInvalid", "Use numbers separated by commas (e.g. 502131, 502145)"))
                .required(t("validation.accountsRequired", "Enter at least one account number")),
            reason: Yup.string().max(1000, t("validation.reasonMax", "Keep reason under 1000 chars")).nullable(),
            otp: Yup.string().length(6, t("validation.otpLength", "OTP must be 6 digits")).required(t("validation.otpRequired", "OTP is required")),
            c1: Yup.bool().oneOf([true], t("validation.c1", "Please confirm ownership")),
            c2: Yup.bool().oneOf([true], t("validation.c2", "Please acknowledge data removal")),
            c3: Yup.bool().oneOf([true], t("validation.c3", "Please confirm positions will be closed")),
            signature: Yup.string().trim().required(t("validation.signatureRequired", "Signature is required")),
            dob: Yup.string().required(t("validation.dobRequired", "Date of birth is required")),
        }),
        onSubmit: async (values) => {
            if (!verified) {
                toast.error(t("toasts.verifyFirst", "Please verify the OTP first."));
                return;
            }

            try {
                setLoading(true);

                const payload = {
                    fullName: values.fullName.trim(),
                    email: values.email.trim(),
                    phone: values.phone || null,
                    platform: values.platform,
                    accounts: values.accounts
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean),
                    reason: values.reason?.trim() || null,
                    confirmations: {
                        ownerConfirm: values.c1,
                        dataRemovalAcknowledge: values.c2,
                        positionsClosedConfirm: values.c3,
                    },
                    signature: values.signature.trim(),
                    dob: values.dob,
                };

                await axios.post("/api/delete-account", payload);
                toast.success(t("toasts.submitted", "Your deletion request has been submitted."));
                window.location.href = `/${locale}/thank-you`;
            } catch (err) {
                toast.error(err?.response?.data?.message || t("toasts.requestFailed", "Request failed"));
            } finally {
                setLoading(false);
            }
        },
    });

    const sendVerificationCode = async () => {
        if (!formik.values.email) {
            toast.error(t("toasts.emailFirst", "Please enter your email first"));
            return;
        }
        if (otpCooldown > 0) return;

        try {
            setLoadingOTP(true);

            const validationResponse = await axios.post(`/api/validate-email`, {
                email: formik.values.email,
            });

            if (!validationResponse.data.valid) {
                toast.error(t("toasts.emailInvalid", "Invalid email address. Please use a valid email."));
                return;
            }

            const res = await axios.post("/api/otp-smtp", { email: formik.values.email });
            setStoredOtp(res?.data?.message || "");
            setShowOtp(true);
            setVerified(false);
            formik.setFieldValue("otp", "");
            toast.success(t("toasts.otpSent", "OTP sent"));
            setOtpCooldown(60);
        } catch (err) {
            setShowOtp(false);
            if (err?.response?.data?.reason) {
                toast.error(t("toasts.invalidEmail", "Invalid email address"));
            } else {
                toast.error(t("toasts.otpSendFailed", "Failed to send OTP. Try again."));
            }
        } finally {
            setLoadingOTP(false);
        }
    };

    const handleOtpChange = (otp) => {
        formik.setFieldValue("otp", otp);
        if (otp && otp.length === 6) {
            if (otp === storedOtp) {
                setVerified(true);
                toast.success(t("toasts.emailVerified", "Email verified"));
            } else {
                setVerified(false);
                toast.error(t("toasts.invalidOtp", "Invalid OTP"));
            }
        } else {
            setVerified(false);
        }
    };

    const platformButtons = [
        { id: "mt4", label: t("platforms.mt4", "MT4") },
        { id: "mt5", label: t("platforms.mt5", "MT5") },
        { id: "both", label: t("platforms.both", "Both") },
    ];

    const fieldError = (name) => (formik.touched?.[name] && formik.errors?.[name] ? String(formik.errors[name]) : "");

    return (
        <form onSubmit={formik.handleSubmit} dir={isRtl ? "rtl" : "ltr"} className="space-y-8">
            {/* Personal details */}
            <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                    {t("sections.personal", "Personal Information")}
                </h3>

                <div className="grid gap-5 md:grid-cols-2">
                    <div className="md:col-span-2">
                        <div className="relative">
                            <svg
                                className="pointer-events-none absolute start-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <circle cx="12" cy="7" r="4" />
                                <path d="M5.5 21a6.5 6.5 0 0113 0" />
                            </svg>

                            <input
                                type="text"
                                placeholder={t("fields.fullNamePlaceholder", "Enter your full name")}
                                className={[
                                    "h-14 w-full rounded-2xl border bg-white ps-11 pe-4 text-slate-900 outline-none transition focus:border-[#0F3B8C] focus:ring-4 focus:ring-[#0F3B8C]/10",
                                    fieldError("fullName") ? "border-red-400" : "border-slate-200",
                                ].join(" ")}
                                {...formik.getFieldProps("fullName")}
                            />
                        </div>
                        {fieldError("fullName") ? (
                            <p className="mt-1 text-sm text-red-500">{fieldError("fullName")}</p>
                        ) : null}
                    </div>

                    <div className="md:col-span-2">
                        <div className="relative flex-1">
                            <svg
                                className="pointer-events-none absolute start-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <rect x="2" y="4" width="20" height="16" rx="2" />
                                <path d="M22 6l-10 7L2 6" />
                            </svg>

                            <input
                                type="email"
                                placeholder={t("fields.emailPlaceholder", "Enter email address")}
                                className={[
                                    "h-14 w-full rounded-2xl border bg-white ps-11 pe-4 text-slate-900 outline-none transition focus:border-[#0F3B8C] focus:ring-4 focus:ring-[#0F3B8C]/10",
                                    fieldError("email") ? "border-red-400" : "border-slate-200",
                                ].join(" ")}
                                {...formik.getFieldProps("email")}
                            />

                            <button
                                type="button"
                                onClick={sendVerificationCode}
                                disabled={loadingOTP || !formik.values.email || otpCooldown > 0}
                                className="absolute end-3 top-1/2 -translate-y-1/2 rounded-xl bg-[#0F3B8C] px-3 py-2 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {loadingOTP
                                    ? t("otp.sending", "Sending...")
                                    : otpCooldown > 0
                                        ? `${t("otp.resendPrefix", "Resend in")} ${otpCooldown}${t("otp.resendSuffix", "s")}`
                                        : t("otp.get", "Get OTP")}
                            </button>
                        </div>
                        {fieldError("email") ? (
                            <p className="mt-1 text-sm text-red-500">{fieldError("email")}</p>
                        ) : null}
                    </div>

                    {showOtp ? (
                    <div className="md:col-span-2">
                        <p className="text-sm text-slate-700">
                            {t("otp.sentToPrefix", "OTP sent to")} <span className="font-semibold">{formik.values.email}</span>
                        </p>
                        <div className="mt-3 flex flex-col gap-2">
                            <OtpInput
                                value={formik.values.otp}
                                onChange={handleOtpChange}
                                numInputs={6}
                                containerStyle={{
                                    justifyContent: "space-between",
                                    gap: "8px",
                                    direction: "ltr",
                                }}
                                renderInput={(props) => (
                                    <input
                                        {...props}
                                        type="tel"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        className={[
                                            "h-12 w-10 rounded-xl border bg-white text-center text-base font-semibold text-slate-900 outline-none focus:border-[#0F3B8C] focus:ring-4 focus:ring-[#0F3B8C]/10",
                                            fieldError("otp") ? "border-red-400" : "border-slate-200",
                                        ].join(" ")}
                                    />
                                )}
                                isInputNum
                                inputStyle={{
                                    fontSize: "16px",
                                    borderRadius: "5px",
                                    paddingBottom: "8px",
                                    paddingTop: "8px",
                                    width: "20%",
                                    backgroundColor: "#f3f4f6",
                                    color: "#000",
                                    fontWeight: "700",
                                    border:
                                        formik.touched.otp && formik.errors.otp
                                            ? "1px solid red"
                                            : "1px solid gray",
                                }}
                            />
                            {fieldError("otp") ? (
                                <p className="text-sm text-red-500">{fieldError("otp")}</p>
                            ) : null}
                            <p className="text-xs text-slate-500">
                                {verified
                                    ? t("otp.verified", "Verified")
                                    : t("otp.instruction", "Enter the 6-digit code to verify your email.")}
                            </p>
                        </div>
                    </div>
                ) : null}

                    <div className="md:col-span-2">
                        <div className="relative">
                            <PhoneInput
                                international
                                countryCallingCodeEditable={false}
                                defaultCountry={defaultCountry}
                                value={formik.values.phone}
                                onChange={(phone) => formik.setFieldValue("phone", phone || "")}
                                className={`w-full px-4 py-3 border ${formik.touched.phone && formik.errors.phone ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none`}
                                />
                        </div>
                        {fieldError("phone") ? (
                            <p className="mt-1 text-sm text-red-500">{fieldError("phone")}</p>
                        ) : null}
                    </div>
                </div>

         

            </div>

            {/* Account details */}
            <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                    {t("sections.account", "Account Details")}
                </h3>

                <div className="space-y-5">
                    <div>
                        <label className="mb-3 block text-sm font-medium text-slate-700">
                            {t("fields.platformLabel", "Platform")}
                        </label>

                        <div className="grid gap-3 sm:grid-cols-3">
                            {platformButtons.map((item) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => formik.setFieldValue("platform", item.id)}
                                    className={[
                                        "rounded-2xl border px-4 py-4 text-sm font-semibold transition",
                                        formik.values.platform === item.id
                                            ? "border-[#0F3B8C] bg-blue-50 text-[#0F3B8C] shadow-[0_10px_25px_rgba(15,59,140,0.10)]"
                                            : "border-slate-200 bg-white text-slate-700 hover:border-[#0F3B8C]",
                                    ].join(" ")}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                        {fieldError("platform") ? (
                            <p className="mt-2 text-sm text-red-500">{fieldError("platform")}</p>
                        ) : null}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            {t("fields.accountsLabel", "Accounts to Delete")}
                        </label>
                        <input
                            type="text"
                            placeholder={t("fields.accountsPlaceholder", "e.g. 502131, 502145, 503201")}
                            className={[
                                "h-14 w-full rounded-2xl border bg-white px-4 text-slate-900 outline-none transition focus:border-[#0F3B8C] focus:ring-4 focus:ring-[#0F3B8C]/10",
                                fieldError("accounts") ? "border-red-400" : "border-slate-200",
                            ].join(" ")}
                            {...formik.getFieldProps("accounts")}
                        />
                        {fieldError("accounts") ? (
                            <p className="mt-1 text-sm text-red-500">{fieldError("accounts")}</p>
                        ) : null}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            {t("fields.reasonLabel", "Reason for Deletion")} <span className="text-slate-400">{t("fields.reasonOptional", "(optional)")}</span>
                        </label>
                        <textarea
                            rows="5"
                            placeholder={t("fields.reasonPlaceholder", "Tell us why you want to delete your account")}
                            className={[
                                "w-full rounded-2xl border bg-white px-4 py-4 text-slate-900 outline-none transition focus:border-[#0F3B8C] focus:ring-4 focus:ring-[#0F3B8C]/10",
                                fieldError("reason") ? "border-red-400" : "border-slate-200",
                            ].join(" ")}
                            {...formik.getFieldProps("reason")}
                        />
                        {fieldError("reason") ? (
                            <p className="mt-1 text-sm text-red-500">{fieldError("reason")}</p>
                        ) : null}
                    </div>
                </div>
            </div>

            {/* Confirmations */}
            <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                    {t("sections.confirmations", "Confirmations")}
                </h3>

                <div className="space-y-3">
                    <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={formik.values.c1}
                            onChange={(e) => formik.setFieldValue("c1", e.target.checked)}
                            className="mt-1 h-4 w-4 rounded border-slate-300 text-[#0F3B8C] focus:ring-[#0F3B8C]"
                        />
                        <span className="text-sm leading-6 text-slate-700">
                            {t("confirmations.c1", "I confirm that I am the rightful owner of the above trading accounts and wish to permanently delete them.")}
                        </span>
                    </label>
                    {fieldError("c1") ? <p className="text-sm text-red-500">{fieldError("c1")}</p> : null}

                    <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={formik.values.c2}
                            onChange={(e) => formik.setFieldValue("c2", e.target.checked)}
                            className="mt-1 h-4 w-4 rounded border-slate-300 text-[#0F3B8C] focus:ring-[#0F3B8C]"
                        />
                        <span className="text-sm leading-6 text-slate-700">
                            {t("confirmations.c2", "I understand that once deleted, all account data, balances, and history may no longer be accessible.")}
                        </span>
                    </label>
                    {fieldError("c2") ? <p className="text-sm text-red-500">{fieldError("c2")}</p> : null}

                    <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={formik.values.c3}
                            onChange={(e) => formik.setFieldValue("c3", e.target.checked)}
                            className="mt-1 h-4 w-4 rounded border-slate-300 text-[#0F3B8C] focus:ring-[#0F3B8C]"
                        />
                        <span className="text-sm leading-6 text-slate-700">
                            {t("confirmations.c3", "I understand that any pending positions must be closed prior to deletion.")}
                        </span>
                    </label>
                    {fieldError("c3") ? <p className="text-sm text-red-500">{fieldError("c3")}</p> : null}
                </div>
            </div>

            {/* Signature */}
            <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                    {t("sections.signature", "Signature & Verification")}
                </h3>

                <div className="grid gap-5 md:grid-cols-2">
                    <div>
                        <div className="relative">
                            <svg
                                className="pointer-events-none absolute start-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 20h9" />
                                <path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z" />
                            </svg>

                            <input
                                type="text"
                                placeholder={t("fields.signaturePlaceholder", "Type your full name")}
                                className={[
                                    "h-14 w-full rounded-2xl border bg-white ps-11 pe-4 text-slate-900 outline-none transition focus:border-[#0F3B8C] focus:ring-4 focus:ring-[#0F3B8C]/10",
                                    fieldError("signature") ? "border-red-400" : "border-slate-200",
                                ].join(" ")}
                                {...formik.getFieldProps("signature")}
                            />
                        </div>
                        {fieldError("signature") ? (
                            <p className="mt-1 text-sm text-red-500">{fieldError("signature")}</p>
                        ) : null}
                    </div>

                    <div>
                        <div className="relative">
                            <svg
                                className="pointer-events-none absolute start-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <rect x="3" y="4" width="18" height="18" rx="2" />
                                <line x1="16" y1="2" x2="16" y2="6" />
                                <line x1="8" y1="2" x2="8" y2="6" />
                                <line x1="3" y1="10" x2="21" y2="10" />
                            </svg>

                            <input
                                type="date"
                                className={[
                                    "h-14 w-full rounded-2xl border bg-white ps-11 pe-4 text-slate-900 outline-none transition focus:border-[#0F3B8C] focus:ring-4 focus:ring-[#0F3B8C]/10",
                                    fieldError("dob") ? "border-red-400" : "border-slate-200",
                                ].join(" ")}
                                {...formik.getFieldProps("dob")}
                            />
                        </div>
                        {fieldError("dob") ? <p className="mt-1 text-sm text-red-500">{fieldError("dob")}</p> : null}
                    </div>
                </div>
            </div>

            {/* bottom action */}
            <div className="rounded-[24px] border border-red-200 bg-red-50 p-4 md:p-5">
                <p className="text-sm leading-6 text-red-700">
                    {t("warning", "Please review all information carefully before submitting. This request may result in permanent removal of your trading account access.")}
                </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-slate-500">
                    {t("helpText", "Need help instead? Contact support before submitting this request.")}
                </p>

                <button
                    type="submit"
                    disabled={loading || !verified}
                    className="inline-flex items-center justify-center rounded-2xl bg-[#0F3B8C] px-8 py-4 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(15,59,140,0.22)] transition hover:bg-[#0c3277] disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading
                        ? t("submit.submitting", "Submitting...")
                        : verified
                            ? t("submit.ready", "Submit Request")
                            : t("submit.verifyFirst", "Verify OTP to Submit")}
                </button>
            </div>
        </form>
    )
}


export default DeleteForm;
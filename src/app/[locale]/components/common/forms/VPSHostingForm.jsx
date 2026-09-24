"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import clsx from "clsx";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocationDetail } from "@/context/useLocationDetail";
import { countryList } from "@/context/countriesList";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

const platforms = [
  { id: 1, name: "MT4", value: "mt4" },
  { id: 2, name: "MT5", value: "mt5" },
];
const packages = [
  { id: 1, name: "Bronze", value: "bronze" },
  { id: 2, name: "Silver", value: "silver" },
  { id: 3, name: "Gold", value: "gold" },
];

function FieldLabel({ children, dark }) {
  if (!dark) return null;
  return <label className="TextSmall mb-1.5 block font-normal text-white/60">{children}</label>;
}

function FieldError({ message, dark }) {
  if (!message) return null;
  return (
    <p className={clsx("TextSmall mt-1", dark ? "text-red-400" : "text-red-500")}>{message}</p>
  );
}

const VpsHostingForm = ({ variant = "default" }) => {
  const isDark = variant === "dark";
  const translationText = usePathTranslation("primeTech.vpsHosting.hero.vpsForm");
  const applyFormT = usePathTranslation("vpsHostingPage.apply.form");
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const campaign = searchParams.get("utm_source");
  const packageParam = searchParams.get("package");
  const path = usePathname();
  const { countryData, locationReady } = useLocationDetail();
  const phoneDefaultCountry = countryData?.country || "AE";

  const resolvedPackage =
    packageParam && packages.some((item) => item.value === packageParam) ? packageParam : null;

  const formik = useFormik({
    initialValues: {
      ip: "",
      utm_campain: "",
      utm_source: "",
      first_name: "",
      last_name: "",
      platform: "",
      account_no: "",
      package: resolvedPackage ?? "",
      phone: "",
      email: "",
      country: "",
      terms: false,
    },
    validationSchema: Yup.object({
      first_name: Yup.string().min(2, translationText("error.minLimit")).required(translationText("error.firstName")),
      last_name: Yup.string().min(2, translationText("error.minLimit")).required(translationText("error.lastName")),
      platform: Yup.string().required(translationText("error.platform")),
      account_no: Yup.string()
        .min(6, "minimum 6 numbers")
        .max(9, "maximum 9 numbers")
        .required(translationText("error.account_no")),
      package: Yup.string().required(
        translationText("error.package") ||
          applyFormT("errors.package", "Please select a VPS plan")
      ),
      email: Yup.string().email(translationText("error.invalidEmail")).required(translationText("error.email")),
      country: Yup.string().required(translationText("error.country")),
    }),
    validate: (values) => {
      const errors = {};
      if (!values.phone) {
        errors.phone = translationText("error.phone");
      }
      return errors;
    },
    onSubmit: async (values) => {
      const payload = {
        ...values,
        utm_campain: path || values.utm_campain || "",
        utm_source: campaign || values.utm_source || "",
      };

      try {
        setLoading(true);

        try {
          await axios.post(
            "https://hooks.zapier.com/hooks/catch/16420445/38odhxb/",
            JSON.stringify(payload)
          );
        } catch (err) {
          console.log(err.message);
        }

        try {
          await axios.post("/api/vps-data-email", payload);
        } catch (err) {
          console.log(err.message);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
        toast(
          isDark
            ? applyFormT("toastSubmitted", "Application submitted successfully")
            : translationText("toastSubmitted")
        );
        formik.resetForm();
      }
    },
  });

  const { setFieldValue } = formik;

  useEffect(() => {
    if (resolvedPackage !== null) {
      setFieldValue("package", resolvedPackage);
    }
  }, [resolvedPackage, setFieldValue]);

  useEffect(() => {
    if (countryData?.country) {
      const matched = countryList.find(
        (item) =>
          item.alpha_2_code === countryData.country ||
          item.en_short_name === countryData.country
      );
      if (matched) {
        setFieldValue("country", matched.en_short_name);
      }
    }
    if (countryData?.ip) {
      setFieldValue("ip", countryData.ip);
    }
  }, [countryData?.country, countryData?.ip, setFieldValue]);

  const fieldError = (name) => {
    const shouldShow = formik.touched[name] || formik.submitCount > 0;
    return shouldShow && formik.errors[name] ? formik.errors[name] : null;
  };

  const inputClass = (name) => {
    const hasError = fieldError(name);
    if (isDark) {
      return clsx(
        "w-full rounded-lg border px-4 py-3 TextSmall font-normal outline-none transition",
        "border-white/15 bg-white/5 text-white placeholder:text-white/35",
        "focus:border-white/30 focus:ring-1 focus:ring-white/20",
        hasError && "border-red-400/70 focus:border-red-400/70 focus:ring-red-400/20"
      );
    }
    return clsx(
      "w-full rounded-lg border bg-white px-4 py-3 text-gray-700 outline-none transition focus:ring-2 focus:ring-primary/25",
      hasError ? "border-red-500" : "border-gray-300"
    );
  };

  const formTitle = isDark
    ? applyFormT("title", "VPS Application Form")
    : translationText("formTitle");

  return (
    <section className={clsx("w-full", isDark ? "max-w-none" : "mx-auto max-w-xl")}>
      <div
        className={clsx(
          "overflow-hidden rounded-2xl",
          isDark
            ? "border border-white/10 bg-[#0A1240]/55 backdrop-blur-md"
            : "border border-[#D9DEE8] bg-white shadow-sm"
        )}
        style={{
          boxShadow: "0px 0px 69.4px 0px #0000003B",

        }}
      >
        {!isDark ? (
          <div className="bg-[linear-gradient(180deg,#293B93_0%,#0D153A_100%)] px-6 py-4 text-center">
            <h3 className="HeadingH5 text-[#B48755]">{formTitle}</h3>
          </div>
        ) : (
          <div className="px-5 pt-5 md:px-7 md:pt-7">
            <h3 className="HeadingH5 font-semibold text-white">{formTitle}</h3>
          </div>
        )}

        <form
          onSubmit={formik.handleSubmit}
          className={clsx("space-y-4", isDark ? "px-5 pb-5 pt-6 md:px-7 md:pb-7" : "p-6 md:p-7")}
        >
          <input name="ip" className="hidden" type="text" readOnly value={formik.values.ip} />
          <input name="utm_campain" className="hidden" type="text" readOnly value={path || ""} />
          <input name="utm_source" className="hidden" type="text" readOnly value={campaign || ""} />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel dark={isDark}>{translationText("firstName")}</FieldLabel>
              <input
                type="text"
                name="first_name"
                id="first_name"
                placeholder={translationText("firstName")}
                className={inputClass("first_name")}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.first_name}
              />
              <FieldError message={fieldError("first_name")} dark={isDark} />
            </div>
            <div>
              <FieldLabel dark={isDark}>{translationText("lastName")}</FieldLabel>
              <input
                type="text"
                name="last_name"
                id="last_name"
                placeholder={translationText("lastName")}
                className={inputClass("last_name")}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.last_name}
              />
              <FieldError message={fieldError("last_name")} dark={isDark} />
            </div>
          </div>

          <div>
            <FieldLabel dark={isDark}>{translationText("platform")}</FieldLabel>
            <select
              className={clsx(inputClass("platform"), isDark && "appearance-none")}
              name="platform"
              value={formik.values.platform}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="" className={isDark ? "bg-[#0A1240] text-white" : undefined}>
                {translationText("selectPlaceholder")}
              </option>
              {platforms.map((platform) => (
                <option
                  key={platform.id}
                  value={platform.value}
                  className={isDark ? "bg-[#0A1240] text-white" : undefined}
                >
                  {platform.name}
                </option>
              ))}
            </select>
            <FieldError message={fieldError("platform")} dark={isDark} />
          </div>

          <div>
            <FieldLabel dark={isDark}>{translationText("account")}</FieldLabel>
            <input
              type="number"
              name="account_no"
              id="account_no"
              placeholder={translationText("account_no")}
              className={inputClass("account_no")}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.account_no}
            />
            <FieldError message={fieldError("account_no")} dark={isDark} />
          </div>

          <div>
            <FieldLabel dark={isDark}>{translationText("package")}</FieldLabel>
            <select
              className={clsx(inputClass("package"), isDark && "appearance-none")}
              name="package"
              value={formik.values.package}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="" className={isDark ? "bg-[#0A1240] text-white" : undefined}>
                {translationText("selectPlaceholder")}
              </option>
              {packages.map((el) => (
                <option
                  key={el.id}
                  value={el.value}
                  className={isDark ? "bg-[#0A1240] text-white" : undefined}
                >
                  {el.name}
                </option>
              ))}
            </select>
            <FieldError message={fieldError("package")} dark={isDark} />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel dark={isDark}>{translationText("email")}</FieldLabel>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder={translationText("email")}
                className={inputClass("email")}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              <FieldError message={fieldError("email")} dark={isDark} />
            </div>

            <div className={isDark ? "vps-hosting-phone-field" : undefined}>
              <FieldLabel dark={isDark}>{translationText("phone")}</FieldLabel>
              <PhoneInput
                international
                key={locationReady ? phoneDefaultCountry : "geo-pending"}
                className={inputClass("phone")}
                defaultCountry={phoneDefaultCountry}
                onChange={(value) => formik.setFieldValue("phone", value)}
                onBlur={formik.handleBlur}
                name="phone"
                value={formik.values.phone}
              />
              <FieldError message={fieldError("phone")} dark={isDark} />
            </div>
          </div>

          <div>
            <FieldLabel dark={isDark}>{translationText("country")}</FieldLabel>
            <select
              className={clsx(inputClass("country"), isDark && "appearance-none")}
              name="country"
              value={formik.values.country}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="" className={isDark ? "bg-[#0A1240] text-white" : undefined}>
                {translationText("selectPlaceholder")}
              </option>
              {countryList.map((country) => (
                <option
                  key={country.alpha_2_code}
                  value={country.en_short_name}
                  className={isDark ? "bg-[#0A1240] text-white" : undefined}
                >
                  {country.en_short_name}
                </option>
              ))}
            </select>
            <FieldError message={fieldError("country")} dark={isDark} />
          </div>

          <button
            disabled={loading}
            type="submit"
            className={clsx(
              "TextButton mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-lg py-3 text-center font-semibold text-white transition disabled:opacity-60",
              isDark
                ? "bg-gradient-to-r from-[#4F7DF5] to-[#1B318E] hover:opacity-95"
                : "rounded-xl bg-primary hover:opacity-95"
            )}
          >
            {loading
              ? translationText("sending")
              : isDark
                ? applyFormT("submit", "Submit Application")
                : translationText("submit")}
            {isDark && !loading ? <span aria-hidden>→</span> : null}
          </button>
        </form>
      </div>

      {isDark ? (
        <style jsx global>{`
          .vps-hosting-phone-field .PhoneInput {
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }
          .vps-hosting-phone-field .PhoneInputInput {
            flex: 1;
            border: none;
            background: transparent;
            color: #fff;
            outline: none;
            font-size: inherit;
          }
          .vps-hosting-phone-field .PhoneInputInput::placeholder {
            color: rgba(255, 255, 255, 0.35);
          }
          .vps-hosting-phone-field .PhoneInputCountrySelect {
            background: transparent;
            color: #fff;
          }
          .vps-hosting-phone-field .PhoneInputCountrySelect option {
            background-color: #fff;
            color: #000;
          }
          .vps-hosting-phone-field .PhoneInputCountrySelectArrow {
            opacity: 0.6;
            color: rgba(255, 255, 255, 0.6);
          }
        `}</style>
      ) : null}
    </section>
  );
};

export default VpsHostingForm;

"use client";

import { useState } from "react";
import Button from "@/app/[locale]/components/common/Button";
import {
  ACCOUNT_TYPE_OPTIONS,
  DEMO_REGISTER_HREF,
  PLATFORM_OPTIONS,
} from "../freeDemoAccountData";
import { usePathTranslation } from "@/app/[locale]/LocaleProvider";

function FormField({ label, children }) {
  return (
    <label className="block text-left">
      <span className="TextSmall mb-1.5 block font-normal text-[#666]">{label}</span>
      {children}
    </label>
  );
}

const inputClassName =
  "TextSmall h-11 w-full rounded-xl border border-[#E1E7F6] bg-white px-4 font-normal text-[#000] outline-none transition focus:border-[#293B93] focus:ring-2 focus:ring-[#293B93]/10";

export default function FreeDemoSignupForm() {
  const t = usePathTranslation("freeDemoAccountPage.signupForm");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    phone: "",
    platform: PLATFORM_OPTIONS[0].value,
    accountType: ACCOUNT_TYPE_OPTIONS[0].value,
  });

  const update = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    window.open(DEMO_REGISTER_HREF, "_blank", "noopener,noreferrer");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[24px] border border-[#E1E7F6] bg-white p-6 shadow-[0_24px_60px_rgba(41,59,147,0.08)] md:p-7"
    >
      <h2 className="HeadingH5 text-center font-semibold text-[#000]">
        {t("title", "Open your Free Demo Account")}
      </h2>

      <div className="mt-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label={t("firstNameLabel", "First Name")}>
            <input
              type="text"
              value={form.firstName}
              onChange={update("firstName")}
              className={inputClassName}
              placeholder={t("firstNamePlaceholder", "John")}
              required
            />
          </FormField>
          <FormField label={t("lastNameLabel", "Last Name")}>
            <input
              type="text"
              value={form.lastName}
              onChange={update("lastName")}
              className={inputClassName}
              placeholder={t("lastNamePlaceholder", "Smith")}
              required
            />
          </FormField>
        </div>

        <FormField label={t("emailLabel", "Email")}>
          <input
            type="email"
            value={form.email}
            onChange={update("email")}
            className={inputClassName}
            placeholder={t("emailPlaceholder", "you@email.com")}
            required
          />
        </FormField>

        <FormField label={t("countryLabel", "Country")}>
          <select
            value={form.country}
            onChange={update("country")}
            className={inputClassName}
            required
          >
            <option value="">{t("countryPlaceholder", "Select country")}</option>
            <option value="UAE">{t("countries.uae", "United Arab Emirates")}</option>
            <option value="UK">{t("countries.uk", "United Kingdom")}</option>
            <option value="AU">{t("countries.au", "Australia")}</option>
            <option value="ZA">{t("countries.za", "South Africa")}</option>
            <option value="Other">{t("countries.other", "Other")}</option>
          </select>
        </FormField>

        <FormField label={t("phoneLabel", "Phone Number")}>
          <input
            type="tel"
            value={form.phone}
            onChange={update("phone")}
            className={inputClassName}
            placeholder={t("phonePlaceholder", "+971 50 000 0000")}
          />
        </FormField>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label={t("platformLabel", "Trading Platform")}>
            <select
              value={form.platform}
              onChange={update("platform")}
              className={inputClassName}
            >
              {PLATFORM_OPTIONS.map((option) => (
                <option key={option.key} value={option.value}>
                  {t(`platformOptions.${option.key}`, option.value)}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label={t("accountTypeLabel", "Account Type")}>
            <select
              value={form.accountType}
              onChange={update("accountType")}
              className={inputClassName}
            >
              {ACCOUNT_TYPE_OPTIONS.map((option) => (
                <option key={option.key} value={option.value}>
                  {t(`accountTypeOptions.${option.key}`, option.value)}
                </option>
              ))}
            </select>
          </FormField>
        </div>
      </div>

      <div className="mt-6">
        <Button type="submit" variant="brand" size="lg" fullWidth>
          {t("submit", "Start Trading Now")}
        </Button>
      </div>
    </form>
  );
}

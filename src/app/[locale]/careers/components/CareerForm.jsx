"use client";
import React, { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { FaLongArrowAltRight } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { FiMessageSquare, FiPhoneCall } from "react-icons/fi";
import { GiWorld } from "react-icons/gi";
import { MdManageAccounts } from "react-icons/md";
import { RiUserLocationLine } from "react-icons/ri";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";
import { usePathTranslation } from "../../LocaleProvider";
import { useLocale } from "../../LocaleProvider";
import { localeDir } from "@/i18n/config";

const ApplyNow = ({ messages = {}, selectedJobTitle }) => {
const formText = usePathTranslation("about.careers.form");
const locale = useLocale();
const isRTL = localeDir[locale] === "rtl";

  const inputClass = (touched, error) =>
    `block w-full rounded-lg bg-white px-3 py-2.5 text-[15px] leading-6 text-gray-900 placeholder:text-gray-400 shadow-sm ring-1 ring-inset outline-none transition ${touched && error
      ? "ring-red-600 focus:ring-red-600"
      : "ring-gray-200 focus:ring-primary/80"
    } focus:ring-2`;

  const textareaClass = (touched, error) =>
    `block w-full rounded-lg bg-white px-3 py-2.5 text-[15px] leading-6 text-gray-900 placeholder:text-gray-400 shadow-sm ring-1 ring-inset outline-none transition ${touched && error
      ? "ring-red-600 focus:ring-red-600"
      : "ring-gray-200 focus:ring-primary/80"
    } focus:ring-2`;

  const inputWithIconClass = (touched, error) =>
    `block w-full rounded-lg bg-white py-2.5 text-[15px] leading-6 text-gray-900 placeholder:text-gray-400 shadow-sm ring-1 ring-inset outline-none transition ${
      isRTL ? "pr-10 pl-3" : "pr-3 pl-10"
    } ${touched && error
      ? "ring-red-600 focus:ring-red-600"
      : "ring-gray-200 focus:ring-primary/80"
    } focus:ring-2`;

  const textareaWithIconClass = (touched, error) =>
    `block w-full rounded-lg bg-white py-2.5 text-[15px] leading-6 text-gray-900 placeholder:text-gray-400 shadow-sm ring-1 ring-inset outline-none transition ${
      isRTL ? "pr-10 pl-3" : "pr-3 pl-10"
    } ${touched && error
      ? "ring-red-600 focus:ring-red-600"
      : "ring-gray-200 focus:ring-primary/80"
    } focus:ring-2`;

  const selectClass = (touched, error) =>
    `w-full appearance-none rounded-lg bg-white bg-[url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2020%2020'%20fill='none'%3E%3Cpath%20d='M6%208l4%204%204-4'%20stroke='%236B7280'%20strokeWidth='1.8'%20strokeLinecap='round'%20strokeLinejoin='round'/%3E%3C/svg%3E")] bg-no-repeat bg-[position:right_0.85rem_center] bg-[length:14px_14px] pl-3 pr-12 py-2.5 text-[15px] leading-6 text-gray-900 shadow-sm ring-1 ring-inset outline-none transition ${touched && error
      ? "ring-red-600 focus:ring-red-600"
      : "ring-gray-200 focus:ring-primary/80"
    } focus:ring-2`;

  const selectWithIconClass = (touched, error) =>
    `w-full appearance-none rounded-lg bg-white bg-[url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2020%2020'%20fill='none'%3E%3Cpath%20d='M6%208l4%204%204-4'%20stroke='%236B7280'%20strokeWidth='1.8'%20strokeLinecap='round'%20strokeLinejoin='round'/%3E%3C/svg%3E")] bg-no-repeat ${
      isRTL
        ? "bg-[position:left_0.85rem_center] pl-12 pr-10"
        : "bg-[position:right_0.85rem_center] pl-10 pr-12"
    } bg-[length:14px_14px] py-2.5 text-[15px] leading-6 text-gray-900 shadow-sm ring-1 ring-inset outline-none transition ${touched && error
      ? "ring-red-600 focus:ring-red-600"
      : "ring-gray-200 focus:ring-primary/80"
    } focus:ring-2`;

  const [resume, setResume] = useState({
    file: null,
    error: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader?.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result.split(',')[1]; // Extract base64 content after the comma
        resolve(base64String);
      };
      reader.onerror = error => reject(error);
    });
  }
  const campaign = useSearchParams().get("utm_source");
  const fbclid = useSearchParams().get("fbclid");
  const path = usePathname();
  const formik = useFormik({
    initialValues: {
      ip: "",
      fbclid: "",
      utm_campain: "",
      utm_source: "",
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      message: "",
      city: "",
      url: "",
      experience: "",
      job_title: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string()
        .min(2, "min 3 ")
        .required("First name is required"),
      last_name: Yup.string().min(2, "min 3").required("Last name is required"),
      email: Yup.string().email("invalid email").required("Email is required"),
      phone: Yup.string().required("Phone number is required"),
      message: Yup.string().required("Message is required"),
      city: Yup.string().required("City is required"),
      url: Yup.string().required("Linkdin is required"),
      experience: Yup.string().required("Experience is required"),
    }),
    onSubmit: async (values) => {
      if (resume?.file == null) {
        return setResume((st) => ({ ...st, error: true }));
      }

      setIsSubmitting(true);
      const payload = { ...values };
      payload.resume = resume?.file;
      
      try {
        // Send the form data to both APIs in parallel
        const [careerFormResponse, zapierResponse] = await Promise.allSettled([
          axios.post(`/api/career-form`, JSON.stringify(payload)),
          axios.post(
            "https://hooks.zapier.com/hooks/catch/16420445/2yulun6/",
            JSON.stringify(payload)
          )
        ]);

        // Check if at least one succeeded
        const hasSuccess = careerFormResponse.status === 'fulfilled' || zapierResponse.status === 'fulfilled';
        
        if (hasSuccess) {
          toast.success("Form Submitted Successfully!");
          formik.resetForm();
          setResume({
            file: null,
            error: false,
          });
          
          // Clear the file input
          const fileInput = document.getElementById("resume");
          if (fileInput) {
            fileInput.value = "";
          }
        } else {
          toast.error("Failed to submit form. Please try again.");
        }
      } catch (error) {
        console.log(error);
        toast.error("An error occurred. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    },
  });


  // Update job_title when selectedJobTitle changes
  useEffect(() => {
    if (selectedJobTitle) {
      formik.setFieldValue("job_title", selectedJobTitle);
    }
  }, [selectedJobTitle]);

  return (
    <form
      id="apply-now-form"
      className="relative z-30 mt-8 sm:my-14 rounded-2xl border border-gray-200 bg-white md:px-6 px-4 md:py-10 py-6 shadow-sm"
      onSubmit={formik.handleSubmit}
    >
      <p className="TextSmall text-center text-gray-600 pb-2">
        {formText("title")}
      </p>
      <h2 className="HeadingH3 text-center text-primary pb-6">
        {formText("sub_title")}
      </h2>
      <div className="grid grid-cols-12 gap-4 mt-3">
        <div className=" md:col-span-3 col-span-12">

          <input
            name="fbclid"
            className="hidden"
            type="text"
            onChange={formik.handleChange}
            value={
              !formik.values.fbclid || formik.values.fbclid === ""
                ? (formik.values.fbclid = fbclid)
                : (formik.values.fbclid = fbclid)
            }
          />
          <input
            name="utm_campain"
            className="hidden"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={
              !formik.values.utm_campain || formik.values.utm_campain === ""
                ? (formik.values.utm_campain = path)
                : (formik.values.utm_campain = path)
            }
          />
          <input
            name="utm_source"
            className="hidden"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={
              !formik.values.utm_source || formik.values.utm_source === ""
                ? (formik.values.utm_source = campaign)
                : (formik.values.utm_source = campaign)
            }
          />
          <input
            name="job_title"
            className="hidden"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.job_title}
          />
          <div className="relative">
            <RiUserLocationLine className={`absolute top-[16px] -translate-y-1 text-gray-400 h-5 w-5 ${isRTL ? "right-3" : "left-3"}`} />
            <input
              type="text"
              name="first_name"
              id="first_name"
              placeholder={formText("first_name")}
              className={inputWithIconClass(formik.touched.first_name, formik.errors.first_name)}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.first_name}
            />
          </div>
        </div>
        <div className=" md:col-span-3 col-span-12">
          <div className="relative">
            <RiUserLocationLine className={`absolute top-[16px] -translate-y-1 text-gray-400 h-5 w-5 ${isRTL ? "right-3" : "left-3"}`} />
            <input
              type="text"
              name="last_name"
              id="last_name"
              placeholder={formText("last_name")}
              className={inputWithIconClass(formik.touched.last_name, formik.errors.last_name)}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.last_name}
            />
          </div>
        </div>
        <div className=" md:col-span-3 col-span-12">
          <div className="relative">
            <CiMail className={`absolute top-[16px] -translate-y-1 text-gray-400 h-5 w-5 ${isRTL ? "right-3" : "left-3"}`} />
            <input
              type="email"
              name="email"
              id="email"
              placeholder={formText("email")}
              className={inputWithIconClass(formik.touched.email, formik.errors.email)}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
          </div>
        </div>
        <div className=" md:col-span-3 col-span-12">
          <div className="relative">
            <FiPhoneCall className={`absolute top-[16px] -translate-y-1 text-gray-400 h-5 w-5 ${isRTL ? "right-3" : "left-3"}`} />
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder={formText("phone")}
              className={inputWithIconClass(formik.touched.phone, formik.errors.phone)}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
            />
          </div>
        </div>
        <div className=" md:col-span-3 col-span-12">
          <div className="relative">
            <GiWorld className={`absolute top-[16px] -translate-y-1 text-gray-400 h-5 w-5 ${isRTL ? "right-3" : "left-3"}`} />
            <input
              type="text"
              name="city"
              id="city"
              placeholder={formText("city")}
              className={inputWithIconClass(formik.touched.city, formik.errors.city)}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city}
            />
          </div>
        </div>
        <div className=" md:col-span-6 col-span-12">
          <div className="relative">
            <GiWorld className={`absolute top-[16px] -translate-y-1 text-gray-400 h-5 w-5 ${isRTL ? "right-3" : "left-3"}`} />
            <input
              type="text"
              name="url"
              id="url"
              placeholder={formText("url")}
              className={inputWithIconClass(formik.touched.url, formik.errors.url)}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.url}
            />
          </div>
        </div>
        <div className=" md:col-span-3 col-span-12">
          <div className="relative">
            <MdManageAccounts className={`absolute top-[16px] -translate-y-1 text-gray-400 h-5 w-5 ${isRTL ? "right-3" : "left-3"}`} />
            <select
              id="experience"
              name="experience"
              autoComplete="country-name"
              placeholder={formText("note")}
              className={selectWithIconClass(formik.touched.experience, formik.errors.experience)}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.experience}
            >
              <option value="">{formText("exper.label")}</option>
              <option value="fresher">{formText("exper.one")}</option>
              <option value="1-2">{formText("exper.sec")}</option>
              <option value="3-5">{formText("exper.third")}</option>
              <option value="5-10">{formText("exper.fourth")}</option>
              <option value="10">{formText("exper.fivth")}</option>
            </select>
          </div>
        </div>

        <div className="col-span-12">
          <div className="relative">
            <FiMessageSquare className={`absolute top-3.5 text-gray-400 h-5 w-5 ${isRTL ? "right-3" : "left-3"}`} />
            <textarea
              placeholder={formText("note")}
              className={textareaWithIconClass(formik.touched.message, formik.errors.message)}
              rows="4"
              name="message"
              id="message"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.message}
            />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <p className="TextSmall text-gray-700 mb-2">{formText("attach")}</p>
        <input
          type="file"
          accept=".doc, .docx,.pdf"
          name="resume"
          id="resume"
          className={inputClass(true, resume?.error)}
          onChange={(e) => {
            let file = e.target.files[0];
            if (file) {
              getBase64(file).then(res => {
                setResume((st) => ({ ...st, file: res, error: false }));
              })
            } else {
              setResume((st) => ({ ...st, file: null, error: false }));
            }
          }}
        />
      </div>
      <div className="mt-4 text-right">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-[160px] h-[50px] rounded-xl bg-primary text-white text-[16px] font-semibold shadow-sm transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60 inline-flex items-center justify-center ${
            isSubmitting ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? (
            <>
              <svg
                className={`animate-spin h-5 w-5 text-current ${
                  isRTL ? "-mr-1 ml-3" : "-ml-1 mr-3"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {formText("submitting")}
            </>
          ) : (
            <>
              {formText("btnText")}{" "}
              <FaLongArrowAltRight
                className={`${isRTL ? "mr-2 rotate-180" : "ml-2"}`}
              />
            </>
          )}
        </button>
      </div>
      <p className="text-xs py-3 text-gray-600">
        {formText("terms")}
      </p>
    </form>
  );
};

export default ApplyNow;

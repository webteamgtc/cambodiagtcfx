"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { usePathTranslation } from "../../LocaleProvider";

const CommentForm = ({ blogSlug, blogId }) => {
    const [loading, setLoading] = useState(false);
    const t = usePathTranslation("common.forms");

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            comment: "",
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(2, "Name must be at least 2 characters")
                .required("Name is required"),
            email: Yup.string()
                .email("Invalid email address")
                .required("Email is required"),
            comment: Yup.string()
                .min(10, "Comment must be at least 10 characters")
                .required("Comment is required"),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                setLoading(true);

                // Prepare the comment data
                const commentData = {
                    name: values.name,
                    email: values.email,
                    comment: values.comment,
                    blogSlug: blogSlug,
                    blogId: blogId,
                    createdAt: new Date().toISOString(),
                };

                // Submit comment to API
                const response = await axios.post("/api/comments", commentData);

                toast.success("Comment submitted successfully!");
                resetForm();
            } catch (error) {
                console.error("Error submitting comment:", error);
                toast.error(
                    error?.response?.data?.message ||
                    "Failed to submit comment. Please try again."
                );
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <div className="bg-[#ECECEF] rounded-lg shadow-lg p-4 md:p-5 mt-8">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-[#070B17]">
                Leave a Comment
            </h2>

            <form onSubmit={formik.handleSubmit} className="space-y-6">
                {/* Name and Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <div>
                        <label
                            htmlFor="name"
                            className={`block text-sm font-medium text-gray-700 mb-2 ${formik.touched.name && formik.errors.name ? "text-red-600" : ""
                                }`}
                        >
                            Name {formik.touched.name && formik.errors.name ? (
                                <span className="text-red-600">*</span>
                            ) : (
                                <span className="text-red-600">*</span>
                            )}
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder={t("enterName", "Enter your name")}
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`w-full px-4 py-2 border bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-secondary ${formik.touched.name && formik.errors.name
                                    ? "border-red-500"
                                    : "border-gray-300"
                                }`}
                        />
                        {formik.touched.name && formik.errors.name && (
                            <p className="mt-1 text-sm text-red-600">{formik.errors.name}</p>
                        )}
                    </div>

                    {/* Email Field */}
                    <div>
                        <label
                            htmlFor="email"
                            className={`block text-sm font-medium text-gray-700 mb-2 ${formik.touched.email && formik.errors.email ? "text-red-600" : ""
                                }`}
                        >
                            Email {formik.touched.email && formik.errors.email ? (
                                <span className="text-red-600">*</span>
                            ) : (
                                <span className="text-red-600">*</span>
                            )}
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder={t("enterEmail", "Enter your email")}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`w-full px-4 py-2 border bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-secondary ${formik.touched.email && formik.errors.email
                                    ? "border-red-500"
                                    : "border-gray-300"
                                }`}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
                        )}
                    </div>
                </div>

                {/* Comment Field */}
                <div>
                    <label
                        htmlFor="comment"
                        className={`block text-sm font-medium text-gray-700 mb-2 ${formik.touched.comment && formik.errors.comment
                                ? "text-red-600"
                                : ""
                            }`}
                    >
                        Comment {formik.touched.comment && formik.errors.comment ? (
                            <span className="text-red-600">*</span>
                        ) : (
                            <span className="text-red-600">*</span>
                        )}
                    </label>
                    <textarea
                        id="comment"
                        name="comment"
                        rows={6}
                        placeholder={t("writeComment", "Write your comment...")}
                        value={formik.values.comment}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full px-4 py-2 border bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-secondary resize-y ${formik.touched.comment && formik.errors.comment
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                    />
                    {formik.touched.comment && formik.errors.comment && (
                        <p className="mt-1 text-sm text-red-600">
                            {formik.errors.comment}
                        </p>
                    )}
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 bg-gradient-to-r from-primary to-[#23206f] hover:from-[#23206f] hover:to-primary text-white font-semibold rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                    >
                        {loading ? "Submitting..." : "Post Comment"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CommentForm;


"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
  
export default function SuccessPage() {
  const [application, setApplication] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("sercApplication");
    if (stored) {
      setApplication(JSON.parse(stored));
      localStorage.removeItem("sercApplication");
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 text-center shadow-xl">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="mb-2 text-2xl font-bold text-primary">Application Submitted</h1>
          <p className="mb-6 text-slate-600">
            Your online trading account application has been submitted for review in accordance with SERC guidelines.
          </p>

          {application && (
            <div className="mb-6 rounded-lg bg-slate-50 p-4 text-left text-sm">
              <p>
                <span className="font-medium text-slate-700">Reference Number:</span>{" "}
                {application.reference}
              </p>
              <p className="mt-2">
                <span className="font-medium text-slate-700">Applicant:</span> {application.name}
              </p>
              <p className="mt-2">
                <span className="font-medium text-slate-700">Email:</span> {application.email}
              </p>
            </div>
          )}

          <div className="mb-8 rounded-lg border border-blue-200 bg-blue-50 p-4 text-left text-sm text-blue-900">
            <p className="font-medium">What happens next?</p>
            <ul className="mt-2 list-inside list-disc space-y-1">
              <li>Your application will undergo identity verification and compliance review</li>
              <li>Our team will verify your client information as required by SERC</li>
              {/* <li>You will receive written notification of approval or rejection</li> */}
              <li>All activities are recorded for compliance checks and audits</li>
            </ul>
          </div>

          <Link
            href="/"
            className="inline-block rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-white transition hover:bg-primary/90"
          >
            Return to Home
          </Link>
        </div>
      </div>
     </div>
  );
}

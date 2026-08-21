"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function VerifyCustomer() {

  const { id } = useParams();

  const [verified, setVerified] = useState(false);

  const checks = [
    {
      name: "Registration ID",
      description: "Registration ID exists in FraudLens database",
      status: true,
    },
    {
      name: "Identity",
      description: "Customer identity information matches",
      status: true,
    },
    {
      name: "Duplicate Check",
      description: "No duplicate customer record found",
      status: true,
    },
    {
      name: "Insurance Policy",
      description: "Insurance policy information is valid",
      status: true,
    },
  ];

  return (
    <div className="mx-auto max-w-4xl">

      <Link
        href={`/staff/customers/${id}`}
        className="text-sm font-semibold text-red-600"
      >
        ← Back to profile
      </Link>


      <div className="mt-6">

        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Verify Customer
        </h1>

        <p className="mt-2 text-slate-500">
          Review the verification checks before confirming
          this customer.
        </p>

      </div>


      <div className="mt-8 rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-100 p-6">

          <p className="text-sm text-slate-400">
            Registration ID
          </p>

          <h2 className="mt-1 text-xl font-bold text-slate-900">
            {id}
          </h2>

        </div>


        <div className="divide-y divide-slate-100">

          {checks.map((check) => (

            <div
              key={check.name}
              className="flex items-center gap-4 p-5 sm:p-6"
            >

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-100 text-lg text-green-600">
                ✓
              </div>

              <div className="flex-1">

                <h3 className="font-semibold text-slate-900">
                  {check.name}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {check.description}
                </p>

              </div>

              <span className="hidden rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 sm:block">
                Passed
              </span>

            </div>

          ))}

        </div>


        <div className="border-t border-slate-100 bg-slate-50 p-6">

          {verified && (

            <div className="mb-5 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-700">
              ✓ Customer has been successfully verified.
            </div>

          )}

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">

            <Link
              href={`/staff/customers/${id}`}
              className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-center font-semibold text-slate-700"
            >
              Cancel
            </Link>

            <button
              onClick={() => setVerified(true)}
              className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
            >
              ✓ Confirm Verification
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}
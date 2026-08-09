"use client"

import { FormEvent, useState } from "react";

export default function RegisterCustomer() {


  const [form, setForm] = useState({
    registrationId: "",
    name: "",
    nic: "",
    dateOfBirth: "",
    phone: "",
    email: "",
    address: "",
    policyNumber: "",
    policyType: "Life Insurance",
  });

  const [loading, setLoading] = useState(false);

  const updateField = (
    field: string,
    value: string
  ) => {

    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

  };


  const submit = async (e: FormEvent) => {

    e.preventDefault();

    setLoading(true);

    // Connect this to:
    // POST /api/customers

    setTimeout(() => {

      setLoading(false);

      window.location.href ="/staff/customers/search";

    }, 800);
  };


  return (
    <div className="mx-auto max-w-5xl">

      <div className="mb-8">

        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Register Customer
        </h1>

        <p className="mt-2 text-slate-500">
          Create a new insurance customer record.
        </p>

      </div>


      <form onSubmit={submit}>

        {/* PERSONAL */}

        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-100 p-6">

            <h2 className="font-bold text-slate-900">
              Personal Information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Enter the customer's identity details.
            </p>

          </div>

          <div className="grid gap-5 p-6 sm:grid-cols-2">

            <Field
              label="Registration ID"
              required
              value={form.registrationId}
              onChange={(value) =>
                updateField("registrationId", value)
              }
              placeholder="FL-2026-000123"
            />

            <Field
              label="Full Name"
              required
              value={form.name}
              onChange={(value) =>
                updateField("name", value)
              }
              placeholder="John Perera"
            />

            <Field
              label="NIC / Passport"
              required
              value={form.nic}
              onChange={(value) =>
                updateField("nic", value)
              }
              placeholder="Enter NIC or passport"
            />

            <Field
              label="Date of Birth"
              type="date"
              value={form.dateOfBirth}
              onChange={(value) =>
                updateField("dateOfBirth", value)
              }
            />

            <Field
              label="Phone Number"
              value={form.phone}
              onChange={(value) =>
                updateField("phone", value)
              }
              placeholder="+94 7X XXX XXXX"
            />

            <Field
              label="Email"
              type="email"
              value={form.email}
              onChange={(value) =>
                updateField("email", value)
              }
              placeholder="customer@example.com"
            />

            <div className="sm:col-span-2">

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Address
              </label>

              <textarea
                value={form.address}
                onChange={(e) =>
                  updateField(
                    "address",
                    e.target.value
                  )
                }
                rows={3}
                placeholder="Customer address"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100"
              />

            </div>

          </div>

        </section>


        {/* INSURANCE */}

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-100 p-6">

            <h2 className="font-bold text-slate-900">
              Insurance Information
            </h2>

          </div>

          <div className="grid gap-5 p-6 sm:grid-cols-2">

            <Field
              label="Policy Number"
              value={form.policyNumber}
              onChange={(value) =>
                updateField(
                  "policyNumber",
                  value
                )
              }
              placeholder="POL-2026-00123"
            />

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Policy Type
              </label>

              <select
                value={form.policyType}
                onChange={(e) =>
                  updateField(
                    "policyType",
                    e.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100"
              >

                <option>
                  Life Insurance
                </option>

                <option>
                  Health Insurance
                </option>

                <option>
                  Vehicle Insurance
                </option>

                <option>
                  Property Insurance
                </option>

              </select>

            </div>

          </div>

        </section>


        {/* ACTIONS */}

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

          <button
            type="button"
            onClick={() =>
              window.location.href = "/staff/dashboard"
            }
            className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-red-600 px-7 py-3 font-semibold text-white shadow-lg shadow-red-600/20 hover:bg-red-700 disabled:opacity-60"
          >
            {loading
              ? "Registering..."
              : "Register Customer"}
          </button>

        </div>

      </form>

    </div>
  );
}


function Field({
  label,
  required,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {

  return (
    <div>

      <label className="mb-2 block text-sm font-semibold text-slate-700">

        {label}

        {required && (
          <span className="ml-1 text-red-600">
            *
          </span>
        )}

      </label>

      <input
        type={type}
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-100"
      />

    </div>
  );
}
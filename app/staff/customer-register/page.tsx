"use client";

import { FormEvent, useEffect, useState } from "react";
import api from "@/services/api";
import Link from "next/link";
import { FiBell, FiMenu, FiX } from "react-icons/fi";
import { useRouter } from "next/navigation";
import StaffNav from "@/components/StaffNav";

interface StaffUser {
  id?: number;
  name?: string;
  email?: string;
  role?: string;
}

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
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  
    const [mobileOpen, setMobileOpen] = useState(false);
  
    const [user, setUser] = useState<StaffUser | null>(null);

  useEffect(() => {
      const storedUser = localStorage.getItem("fraudlens_user");
  
      if (!storedUser) {
        return;
      }
  
      try {
        const parsedUser = JSON.parse(storedUser);
  
        setUser(parsedUser);
      } catch (error) {
        console.error("Invalid stored user:", error);
      }
    }, []);

  const updateField = (field: string, value: string) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    setLoading(true);

    try {
      const response = await api.post("/customers", {
        customer_number: form.registrationId,
        name: form.name,
        nic: form.nic,
        phone: form.phone,
        email: form.email,
        address: form.address,
      });

      console.log("Customer created:", response.data);

      setSuccess("Customer registered successfully!");

      window.location.href = "/staff/customer-search";
    } catch (error: any) {
      console.error("Customer registration error:", error);

      if (error.response?.status === 401) {
        setError("Your session has expired. Please login again.");

        localStorage.removeItem("fraudlens_token");
        localStorage.removeItem("fraudlens_user");

        window.location.href = "/";
        return;
      }

      setError(
        error.response?.data?.message ||
          "Unable to register customer. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

   /*
   * LOGOUT
   */

  const logout = () => {
    localStorage.removeItem("fraudlens_token");

    localStorage.removeItem("fraudlens_user");

    router.push("/login");
  };

  /*
   * USER INITIAL
   */

  const userInitial = user?.name?.charAt(0)?.toUpperCase() || "S";

  return (
    <div className="min-h-screen bg-slate-50">
      {/* =====================================
          MOBILE OVERLAY
      ====================================== */}

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* =====================================
          SIDEBAR
      ====================================== */}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-white shadow-2xl transition-transform duration-300 lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* LOGO */}

        <div className="flex h-20 shrink-0 items-center border-b border-slate-100 px-6">
          <Link
            href="/staff/dashboard"
            className="flex items-center gap-3"
            onClick={() => setMobileOpen(false)}
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-600 text-xl font-black text-white shadow-lg shadow-red-600/20">
              F
            </div>

            <div>
              <h1 className="text-xl font-black tracking-tight text-slate-900">
                FraudLens
              </h1>

              <p className="text-[11px] font-medium text-slate-400">
                Insurance Intelligence
              </p>
            </div>
          </Link>

          {/* MOBILE CLOSE */}

          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="ml-auto rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 lg:hidden"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        {/* USER CARD */}

        <div className="px-4 pt-5">
          <div className="rounded-2xl border border-red-100 bg-gradient-to-br from-red-50 to-white p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white shadow-md shadow-red-600/20">
                {userInitial}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-slate-900">
                  {user?.name || "Staff Member"}
                </p>

                <p className="mt-0.5 text-[11px] font-bold uppercase tracking-wider text-red-600">
                  {user?.role || "Staff"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* NAVIGATION */}

        <div className="flex-1 overflow-y-auto">
          <StaffNav onLogout={logout} onNavigate={() => setMobileOpen(false)} />
        </div>

        {/* SIDEBAR FOOTER */}

        <div className="border-t border-slate-100 p-4">
          <p className="text-center text-[10px] text-slate-400">
            FraudLens Insurance Intelligence
          </p>
        </div>
      </aside>

      {/* =====================================
          MAIN
      ====================================== */}

      <div className="lg:ml-72">
        {/* HEADER */}

        <header className="sticky top-0 z-30 flex h-20 items-center border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
          {/* MOBILE MENU */}

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600 shadow-sm hover:border-red-200 hover:text-red-600 lg:hidden"
          >
            <FiMenu className="h-5 w-5" />
          </button>

          {/* HEADER TITLE */}

          <div className="ml-4 hidden lg:block">
            <p className="text-sm font-semibold text-slate-700">
              Staff Workspace
            </p>

            <p className="text-xs text-slate-400">
              Customer Verification System
            </p>
          </div>

          {/* RIGHT */}

          <div className="ml-auto flex items-center gap-3">
            {/* NOTIFICATION */}

            <button
              type="button"
              className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-600 transition hover:bg-red-50 hover:text-red-600"
            >
              <FiBell className="h-5 w-5" />

              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-600 ring-2 ring-white" />
            </button>

            <div className="hidden h-8 w-px bg-slate-200 sm:block" />

            {/* USER */}

            <div className="hidden text-right sm:block">
              <p className="text-sm font-bold text-slate-900">
                {user?.name || "Staff"}
              </p>

              <p className="text-xs text-slate-400">
                {user?.email || "Staff Account"}
              </p>
            </div>

            {/* AVATAR */}

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white">
              {userInitial}
            </div>
          </div>
        </header>

        {/* PAGE */}

        <main className="min-h-[calc(100vh-5rem)] p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-5xl">
            <h1 className="text-2xl font-bold text-red-600 sm:text-3xl mb-8">
              Register Customer
            </h1>

            {/* ERROR */}

            {error && (
              <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* SUCCESS */}

            {success && (
              <div className="mt-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                {success}
              </div>
            )}

            <form className="text-gray-900" onSubmit={submit}>
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
                    onChange={(value) => updateField("registrationId", value)}
                    placeholder="FL-2026-000123"
                  />

                  <Field
                    label="Full Name"
                    required
                    value={form.name}
                    onChange={(value) => updateField("name", value)}
                    placeholder="John Perera"
                  />

                  <Field
                    label="NIC / Passport"
                    required
                    value={form.nic}
                    onChange={(value) => updateField("nic", value)}
                    placeholder="Enter NIC or passport"
                  />

                  <Field
                    label="Date of Birth"
                    type="date"
                    value={form.dateOfBirth}
                    onChange={(value) => updateField("dateOfBirth", value)}
                  />

                  <Field
                    label="Phone Number"
                    value={form.phone}
                    onChange={(value) => updateField("phone", value)}
                    placeholder="07X XXX XXXX"
                  />

                  <Field
                    label="Email"
                    type="email"
                    value={form.email}
                    onChange={(value) => updateField("email", value)}
                    placeholder="customer@example.com"
                  />

                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Address
                    </label>

                    <textarea
                      value={form.address}
                      onChange={(e) => updateField("address", e.target.value)}
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
                    onChange={(value) => updateField("policyNumber", value)}
                    placeholder="POL-2026-00123"
                  />

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Policy Type
                    </label>

                    <select
                      value={form.policyType}
                      onChange={(e) =>
                        updateField("policyType", e.target.value)
                      }
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100"
                    >
                      <option>Life Insurance</option>

                      <option>Health Insurance</option>

                      <option>Vehicle Insurance</option>

                      <option>Property Insurance</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* ACTIONS */}

              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => (window.location.href = "/staff/dashboard")}
                  className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-xl bg-red-600 px-7 py-3 font-semibold text-white shadow-lg shadow-red-600/20 hover:bg-red-700 disabled:opacity-60"
                >
                  {loading ? "Registering..." : "Register Customer"}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
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

        {required && <span className="ml-1 text-red-600">*</span>}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-100"
      />
    </div>
  );
}

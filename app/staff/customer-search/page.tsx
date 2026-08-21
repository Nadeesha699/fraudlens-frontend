"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import api from "../../../services/api";
import { useRouter } from "next/navigation";
import { FiBell, FiMenu, FiX } from "react-icons/fi";
import StaffNav from "@/components/StaffNav";

interface Customer {
  id: number;
  customer_number: string;
  name: string;
  nic: string;
  phone?: string;
  email?: string;
  address?: string;
  status?: string;
  created_at?: string;
  created_by_name?: string;
}

interface StaffUser {
  id?: number;
  name?: string;
  email?: string;
  role?: string;
}

export default function CustomerSearch() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/customers");

      setCustomers(response.data);
    } catch (error: any) {
      console.error("Failed to load customers:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("fraudlens_token");
        localStorage.removeItem("fraudlens_user");

        window.location.href = "/";
        return;
      }

      setError(error.response?.data?.message || "Unable to load customers.");
    } finally {
      setLoading(false);
    }
  };

  const filteredCustomers = customers.filter((customer) => {
    const searchValue = search.toLowerCase();

    return (
      customer.customer_number?.toLowerCase().includes(searchValue) ||
      customer.name?.toLowerCase().includes(searchValue) ||
      customer.nic?.toLowerCase().includes(searchValue) ||
      customer.phone?.toLowerCase().includes(searchValue) ||
      customer.email?.toLowerCase().includes(searchValue)
    );
  });

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
          <div className="mx-auto max-w-7xl">
            <h1 className="mb-8 text-2xl font-bold text-red-600 sm:text-3xl">
              Search Customers
            </h1>

            {/* SEARCH */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Customer Search
              </label>

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400">
                    ⌕
                  </span>

                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Registration ID, name, NIC, phone or email"
                    className="w-full rounded-xl border border-slate-300 py-3.5 pl-11 pr-4 outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100"
                  />
                </div>

                <button
                  type="button"
                  onClick={fetchCustomers}
                  className="rounded-xl bg-red-600 px-7 py-3.5 font-semibold text-white hover:bg-red-700"
                >
                  Search
                </button>
              </div>
            </div>

            {/* RESULTS */}

            <div className="mt-8">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-slate-900">Search Results</h2>

                  <p className="text-sm text-slate-500">
                    {loading
                      ? "Loading customers..."
                      : `${filteredCustomers.length} customers found`}
                  </p>
                </div>

                <Link
                  href="/staff/customer-register"
                  className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
                >
                  + Register
                </Link>
              </div>

              {/* ERROR */}

              {error && (
                <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                {/* LOADING */}

                {loading ? (
                  <div className="p-10 text-center text-sm text-slate-500">
                    Loading customers...
                  </div>
                ) : filteredCustomers.length === 0 ? (
                  <div className="p-10 text-center">
                    <p className="font-semibold text-slate-700">
                      No customers found
                    </p>

                    <p className="mt-1 text-sm text-slate-400">
                      Try another search term.
                    </p>
                  </div>
                ) : (
                  <>
                    {/* DESKTOP */}

                    <div className="hidden overflow-x-auto md:block">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-400">
                            <th className="px-6 py-4">Registration ID</th>

                            <th className="px-6 py-4">Customer</th>

                            <th className="px-6 py-4">Phone</th>

                            <th className="px-6 py-4">Email</th>

                            <th className="px-6 py-4">Status</th>

                            <th className="px-6 py-4">Action</th>
                          </tr>
                        </thead>

                        <tbody>
                          {filteredCustomers.map((customer) => (
                            <tr
                              key={customer.id}
                              className="border-b border-slate-50 hover:bg-red-50/30"
                            >
                              <td className="px-6 py-4 text-sm font-semibold text-slate-700">
                                {customer.customer_number}
                              </td>

                              <td className="px-6 py-4">
                                <p className="text-sm font-semibold text-slate-900">
                                  {customer.name}
                                </p>

                                <p className="text-xs text-slate-400">
                                  {customer.nic}
                                </p>
                              </td>

                              <td className="px-6 py-4 text-sm text-slate-600">
                                {customer.phone || "-"}
                              </td>

                              <td className="px-6 py-4 text-sm text-slate-600">
                                {customer.email || "-"}
                              </td>

                              <td className="px-6 py-4">
                                <Status status={customer.status || "Pending"} />
                              </td>

                              <td className="px-6 py-4">
                                <Link
                                  href={`/customer/${customer.id}`}
                                  className="font-semibold text-red-600 hover:text-red-700"
                                >
                                  View →
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* MOBILE */}

                    <div className="divide-y divide-slate-100 md:hidden">
                      {filteredCustomers.map((customer) => (
                        <div key={customer.id} className="p-5">
                          <div className="flex justify-between gap-4">
                            <div>
                              <p className="text-xs font-semibold text-slate-400">
                                {customer.customer_number}
                              </p>

                              <h3 className="mt-1 font-bold text-slate-900">
                                {customer.name}
                              </h3>

                              <p className="mt-1 text-xs text-slate-500">
                                NIC: {customer.nic}
                              </p>

                              <p className="mt-1 text-xs text-slate-500">
                                {customer.phone || "No phone"}
                              </p>
                            </div>

                            <Status status={customer.status || "Pending"} />
                          </div>

                          <div className="mt-4 flex items-center justify-end">
                            <Link
                              href={`/customer/${customer.id}`}
                              className="font-semibold text-red-600"
                            >
                              View →
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>{" "}
        </main>
      </div>
    </div>
  );
}

function Status({ status }: { status: string }) {
  const style =
    status.toLowerCase() === "active" || status.toLowerCase() === "verified"
      ? "bg-green-50 text-green-700"
      : status.toLowerCase() === "inactive"
        ? "bg-red-50 text-red-700"
        : "bg-amber-50 text-amber-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${style}`}>
      {status}
    </span>
  );
}

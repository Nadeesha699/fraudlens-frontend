"use client";

import StaffNav from "@/components/StaffNav";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  FiUsers,
  FiCheckCircle,
  FiClock,
  FiAlertTriangle,
  FiSearch,
  FiUserPlus,
  FiUpload,
  FiArrowRight,
  FiEye,
  FiMenu,
  FiBell,
  FiX,
} from "react-icons/fi";

/* =========================================
   TYPES
========================================= */

interface Stat {
  title: string;
  value: string;
  change: string;
  description: string;
  icon: React.ElementType;
}

interface Customer {
  id: string;
  name: string;
  status: "Verified" | "Pending" | "Review";
  risk: "Low" | "Medium" | "High";
}

/* =========================================
   STATS
========================================= */

const stats: Stat[] = [
  {
    title: "My Customers",
    value: "1,284",
    change: "+12%",
    description: "This month",
    icon: FiUsers,
  },
  {
    title: "Verified",
    value: "1,156",
    change: "+8%",
    description: "Customers verified",
    icon: FiCheckCircle,
  },
  {
    title: "Pending",
    value: "86",
    change: "12 today",
    description: "Need verification",
    icon: FiClock,
  },
  {
    title: "Fraud Alerts",
    value: "42",
    change: "5 new",
    description: "Require attention",
    icon: FiAlertTriangle,
  },
];

/* =========================================
   RECENT CUSTOMERS
========================================= */

const recentCustomers: Customer[] = [
  {
    id: "FL-2026-000123",
    name: "John Perera",
    status: "Verified",
    risk: "Low",
  },
  {
    id: "FL-2026-000124",
    name: "Sarah Silva",
    status: "Verified",
    risk: "Medium",
  },
  {
    id: "FL-2026-000125",
    name: "Nimal Fernando",
    status: "Pending",
    risk: "Medium",
  },
  {
    id: "FL-2026-000126",
    name: "Kamal Perera",
    status: "Review",
    risk: "High",
  },
];

interface StaffUser {
  id?: number;
  name?: string;
  email?: string;
  role?: string;
}

/* =========================================
   DASHBOARD
========================================= */

export default function StaffDashboard() {
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);

  const [user, setUser] = useState<StaffUser | null>(null);

  /*
   * LOAD USER
   */

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
            {/* =====================================
          PAGE HEADER
      ====================================== */}

            <div className="mb-8">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-bold text-red-600">
                    FraudLens Staff Portal
                  </p>

                  <h1
                    className="
                mt-1
                text-2xl
                font-black
                tracking-tight
                text-slate-900
                sm:text-3xl
              "
                  >
                    Staff Dashboard
                  </h1>

                  <p className="mt-2 text-sm text-slate-500">
                    Manage customers, verification and fraud detection.
                  </p>
                </div>

                <div
                  className="
              hidden
              rounded-xl
              border border-slate-200
              bg-white
              px-4 py-2
              text-right
              shadow-sm
              sm:block
            "
                >
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    System
                  </p>

                  <p className="mt-0.5 text-sm font-bold text-green-600">
                    ● Operational
                  </p>
                </div>
              </div>
            </div>

            {/* =====================================
          STAT CARDS
      ====================================== */}

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.title}
                    className="
                rounded-2xl
                border border-slate-200
                bg-white
                p-5
                shadow-sm
                transition
                hover:-translate-y-0.5
                hover:shadow-md
              "
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-500">
                          {stat.title}
                        </p>

                        <p
                          className="
                      mt-2
                      text-3xl
                      font-black
                      tracking-tight
                      text-slate-900
                    "
                        >
                          {stat.value}
                        </p>
                      </div>

                      <div
                        className="
                    flex h-11 w-11
                    items-center justify-center
                    rounded-xl
                    bg-red-50
                    text-red-600
                  "
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2 text-xs">
                      <span className="font-bold text-red-600">
                        {stat.change}
                      </span>

                      <span className="text-slate-400">{stat.description}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* =====================================
          QUICK ACTIONS
      ====================================== */}

            <section className="mt-8">
              <h2 className="mb-4 text-lg font-black text-slate-900">
                Quick Actions
              </h2>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {/* SEARCH */}

                <QuickAction
                  href="/staff/customers/search"
                  icon={FiSearch}
                  title="Search Customer"
                  description="Find a customer using their registration ID."
                  action="Search"
                />

                {/* REGISTER */}

                <QuickAction
                  href="/staff/customers/register"
                  icon={FiUserPlus}
                  title="Register Customer"
                  description="Create a new insurance customer record."
                  action="Register"
                />

                {/* UPLOAD */}

                <QuickAction
                  href="/staff/verification/upload"
                  icon={FiUpload}
                  title="Upload Excel"
                  description="Verify multiple customer records at once."
                  action="Upload"
                />
              </div>
            </section>

            {/* =====================================
          SEARCH CUSTOMER
      ====================================== */}

            <section
              className="
          mt-8
          overflow-hidden
          rounded-2xl
          bg-red-600
          p-6
          shadow-xl
          shadow-red-600/20
          sm:p-8
        "
            >
              <div className="max-w-3xl">
                <div className="flex items-center gap-3">
                  <div
                    className="
                flex h-11 w-11
                items-center justify-center
                rounded-xl
                bg-white/15
                text-white
              "
                  >
                    <FiSearch className="h-5 w-5" />
                  </div>

                  <div>
                    <h2 className="text-xl font-black text-white sm:text-2xl">
                      Search Customer
                    </h2>

                    <p className="mt-1 text-sm text-red-100">
                      Quickly find a customer by Registration ID, name, NIC or
                      policy number.
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <input
                    type="text"
                    placeholder="FL-2026-000123"
                    className="
                min-w-0
                flex-1
                rounded-xl
                border-0
                bg-white
                px-4 py-3.5
                text-sm
                text-slate-900
                outline-none
                placeholder:text-slate-400
                focus:ring-2
                focus:ring-white/50
              "
                  />

                  <Link
                    href="/staff/customers/search"
                    className="
                flex items-center
                justify-center gap-2
                rounded-xl
                bg-slate-950
                px-6 py-3.5
                text-sm font-bold
                text-white
                transition
                hover:bg-slate-800
              "
                  >
                    <FiSearch className="h-4 w-4" />
                    Search
                  </Link>
                </div>
              </div>
            </section>

            {/* =====================================
          RECENT CUSTOMERS
      ====================================== */}

            <section
              className="
          mt-8
          overflow-hidden
          rounded-2xl
          border border-slate-200
          bg-white
          shadow-sm
        "
            >
              {/* HEADER */}

              <div
                className="
            flex items-center
            justify-between
            border-b border-slate-100
            p-5
            sm:p-6
          "
              >
                <div>
                  <h2 className="font-black text-slate-900">
                    Recent Customers
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Recently registered or verified records
                  </p>
                </div>

                <Link
                  href="/staff/customers/search"
                  className="
              flex items-center
              gap-1
              text-sm
              font-bold
              text-red-600
              hover:text-red-700
            "
                >
                  View all
                  <FiArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* DESKTOP TABLE */}

              <div className="hidden overflow-x-auto md:block">
                <table className="w-full">
                  <thead>
                    <tr
                      className="
                  border-b border-slate-100
                  text-left
                  text-[11px]
                  font-bold
                  uppercase
                  tracking-wider
                  text-slate-400
                "
                    >
                      <th className="px-6 py-4">Registration ID</th>

                      <th className="px-6 py-4">Customer</th>

                      <th className="px-6 py-4">Status</th>

                      <th className="px-6 py-4">Risk</th>

                      <th className="px-6 py-4">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {recentCustomers.map((customer) => (
                      <tr
                        key={customer.id}
                        className="
                      border-b
                      border-slate-50
                      last:border-0
                      hover:bg-slate-50/70
                    "
                      >
                        <td
                          className="
                        px-6 py-4
                        text-sm
                        font-bold
                        text-slate-700
                      "
                        >
                          {customer.id}
                        </td>

                        <td
                          className="
                        px-6 py-4
                        text-sm
                        font-medium
                        text-slate-700
                      "
                        >
                          {customer.name}
                        </td>

                        <td className="px-6 py-4">
                          <StatusBadge status={customer.status} />
                        </td>

                        <td className="px-6 py-4">
                          <RiskBadge risk={customer.risk} />
                        </td>

                        <td className="px-6 py-4">
                          <Link
                            href={`/staff/customers/${customer.id}`}
                            className="
                          inline-flex
                          items-center
                          gap-1.5
                          text-sm
                          font-bold
                          text-red-600
                          hover:text-red-700
                        "
                          >
                            <FiEye className="h-4 w-4" />
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* MOBILE */}

              <div className="divide-y divide-slate-100 md:hidden">
                {recentCustomers.map((customer) => (
                  <div key={customer.id} className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p
                          className="
                        text-[11px]
                        font-bold
                        text-slate-400
                      "
                        >
                          {customer.id}
                        </p>

                        <h3
                          className="
                        mt-1
                        font-bold
                        text-slate-900
                      "
                        >
                          {customer.name}
                        </h3>
                      </div>

                      <RiskBadge risk={customer.risk} />
                    </div>

                    <div
                      className="
                    mt-4
                    flex items-center
                    justify-between
                  "
                    >
                      <StatusBadge status={customer.status} />

                      <Link
                        href={`/staff/customers/${customer.id}`}
                        className="
                      flex items-center
                      gap-1
                      text-sm
                      font-bold
                      text-red-600
                    "
                      >
                        View Profile
                        <FiArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

/* =========================================
   QUICK ACTION COMPONENT
========================================= */

interface QuickActionProps {
  href: string;
  icon: React.ElementType;
  title: string;
  description: string;
  action: string;
}

function QuickAction({
  href,
  icon: Icon,
  title,
  description,
  action,
}: QuickActionProps) {
  return (
    <Link
      href={href}
      className="
        group
        rounded-2xl
        border border-slate-200
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-200
        hover:-translate-y-1
        hover:border-red-200
        hover:shadow-lg
      "
    >
      <div
        className="
          flex h-12 w-12
          items-center justify-center
          rounded-xl
          bg-red-50
          text-red-600
          transition
          group-hover:bg-red-600
          group-hover:text-white
        "
      >
        <Icon className="h-5 w-5" />
      </div>

      <h3 className="mt-4 font-black text-slate-900">{title}</h3>

      <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>

      <span
        className="
          mt-4
          flex items-center
          gap-1
          text-sm
          font-bold
          text-red-600
        "
      >
        {action}

        <FiArrowRight
          className="
            h-4 w-4
            transition
            group-hover:translate-x-1
          "
        />
      </span>
    </Link>
  );
}

/* =========================================
   STATUS BADGE
========================================= */

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Verified: "bg-green-50 text-green-700",

    Pending: "bg-amber-50 text-amber-700",

    Review: "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`
        inline-flex
        rounded-full
        px-3 py-1
        text-xs
        font-bold

        ${styles[status] || "bg-slate-100 text-slate-600"}
      `}
    >
      {status}
    </span>
  );
}

/* =========================================
   RISK BADGE
========================================= */

function RiskBadge({ risk }: { risk: string }) {
  const styles: Record<string, string> = {
    Low: "bg-green-50 text-green-700",

    Medium: "bg-amber-50 text-amber-700",

    High: "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`
        inline-flex
        rounded-full
        px-3 py-1
        text-xs
        font-bold

        ${styles[risk] || "bg-slate-100 text-slate-600"}
      `}
    >
      {risk}
    </span>
  );
}

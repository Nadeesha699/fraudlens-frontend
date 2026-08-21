"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  FiGrid,
  FiSearch,
  FiUserPlus,
  FiUpload,
  FiAlertTriangle,
  FiUser,
  FiLogOut,
  FiChevronRight,
} from "react-icons/fi";

interface StaffNavProps {
  onLogout: () => void;
  onNavigate?: () => void;
}

const menuItems = [
  {
    name: "Dashboard",
    path: "/staff/dashboard",
    icon: FiGrid,
  },
  {
    name: "Search Customers",
    path: "/staff/customer-search",
    icon: FiSearch,
  },
  {
    name: "Register Customer",
    path: "/staff/customer-register",
    icon: FiUserPlus,
  },
  {
    name: "Bulk Verification",
    path: "/staff/bulk-verification",
    icon: FiUpload,
  },
  {
    name: "Fraud Alerts",
    path: "/staff/fraud-alerts",
    icon: FiAlertTriangle,
  },
];

export default function StaffNav({
  onLogout,
  onNavigate,
}: StaffNavProps) {
  const pathname = usePathname();

  return (
    <nav className="mt-6 px-4">

      {/* WORKSPACE */}

      <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-widest text-slate-400">
        Workspace
      </p>

      <div className="space-y-1.5">

        {menuItems.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.path ||
            pathname.startsWith(`${item.path}/`);

          return (
            <Link
              key={item.path}
              href={item.path}
              onClick={onNavigate}
              className={`
                group flex items-center gap-3
                rounded-xl px-3 py-2.5
                text-sm font-medium
                transition-all duration-200

                ${
                  active
                    ? "bg-red-600 text-white shadow-md shadow-red-600/20"
                    : "text-slate-600 hover:bg-red-50 hover:text-red-600"
                }
              `}
            >

              {/* ICON */}

              <span
                className={`
                  flex h-9 w-9 shrink-0
                  items-center justify-center
                  rounded-lg
                  transition-colors

                  ${
                    active
                      ? "bg-white/15"
                      : "bg-slate-100 group-hover:bg-red-100"
                  }
                `}
              >
                <Icon
                  className={`
                    h-[18px] w-[18px]

                    ${
                      active
                        ? "text-white"
                        : "text-slate-500 group-hover:text-red-600"
                    }
                  `}
                />
              </span>

              <span className="flex-1">
                {item.name}
              </span>

              {active && (
                <FiChevronRight className="h-4 w-4 text-white/80" />
              )}

            </Link>
          );
        })}

      </div>


      {/* ACCOUNT */}

      <p className="mb-3 mt-8 px-3 text-[11px] font-bold uppercase tracking-widest text-slate-400">
        Account
      </p>

      <div className="space-y-1.5">

        {/* PROFILE */}

        <Link
          href="/staff/profile"
          onClick={onNavigate}
          className={`
            group flex items-center gap-3
            rounded-xl px-3 py-2.5
            text-sm font-medium
            transition

            ${
              pathname === "/staff/profile"
                ? "bg-red-50 text-red-600"
                : "text-slate-600 hover:bg-red-50 hover:text-red-600"
            }
          `}
        >

          <span
            className={`
              flex h-9 w-9
              items-center justify-center
              rounded-lg

              ${
                pathname === "/staff/profile"
                  ? "bg-red-100"
                  : "bg-slate-100 group-hover:bg-red-100"
              }
            `}
          >
            <FiUser
              className={`
                h-[18px] w-[18px]
                ${
                  pathname === "/staff/profile"
                    ? "text-red-600"
                    : "text-slate-500 group-hover:text-red-600"
                }
              `}
            />
          </span>

          <span>My Profile</span>

        </Link>


        {/* LOGOUT */}

        <button
          type="button"
          onClick={onLogout}
          className="
            group flex w-full
            items-center gap-3
            rounded-xl px-3 py-2.5
            text-left text-sm font-medium
            text-slate-600
            transition
            hover:bg-red-50
            hover:text-red-600
          "
        >

          <span
            className="
              flex h-9 w-9
              items-center justify-center
              rounded-lg
              bg-slate-100
              group-hover:bg-red-100
            "
          >
            <FiLogOut
              className="
                h-[18px] w-[18px]
                text-slate-500
                group-hover:text-red-600
              "
            />
          </span>

          <span>Logout</span>

        </button>

      </div>

    </nav>
  );
}
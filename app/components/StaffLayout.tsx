import Link from "next/link";
import { ReactNode, useState } from "react";

interface StaffLayoutProps {
  children: ReactNode;
}

const menuItems = [
  {
    name: "Dashboard",
    path: "/staff/dashboard",
    icon: "▦",
  },
  {
    name: "Search Customers",
    path: "/staff/customers/search",
    icon: "⌕",
  },
  {
    name: "Register Customer",
    path: "/staff/customers/register",
    icon: "+",
  },
  {
    name: "Bulk Verification",
    path: "/staff/verification/upload",
    icon: "↑",
  },
  {
    name: "Fraud Alerts",
    path: "/staff/fraud-alerts",
    icon: "!",
  },
];

export default function StaffLayout({
  children,
}: StaffLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

//   const location = useLocation();
//   const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("fraudlens_user") || "null"
  );

  const logout = () => {
    localStorage.removeItem("fraudlens_token");
    localStorage.removeItem("fraudlens_user");

   window.location.href ="/"
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* MOBILE OVERLAY */}

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* SIDEBAR */}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-72
          transform bg-white shadow-xl
          transition-transform duration-300
          lg:translate-x-0
          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >

        {/* LOGO */}

        <div className="flex h-20 items-center border-b border-slate-100 px-6">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-600 text-xl font-bold text-white shadow-lg shadow-red-600/20">
              F
            </div>

            <div>
              <h1 className="text-xl font-bold text-slate-900">
                FraudLens
              </h1>

              <p className="text-xs text-slate-400">
                Insurance Intelligence
              </p>
            </div>

          </div>

        </div>


        {/* USER */}

        <div className="mx-4 mt-5 rounded-xl bg-red-50 p-4">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 font-bold text-white">
              {user?.name?.charAt(0) || "S"}
            </div>

            <div className="min-w-0">

              <p className="truncate text-sm font-semibold text-slate-900">
                {user?.name || "Staff Member"}
              </p>

              <p className="text-xs font-medium text-red-600">
                STAFF
              </p>

            </div>

          </div>

        </div>


        {/* NAVIGATION */}

        <nav className="mt-6 px-4">

          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Workspace
          </p>

          <div className="space-y-1">

            {menuItems.map((item) => {

              const active =
                location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className={`
                    flex items-center gap-3 rounded-xl
                    px-4 py-3 text-sm font-medium
                    transition
                    ${
                      active
                        ? "bg-red-600 text-white shadow-lg shadow-red-600/20"
                        : "text-slate-600 hover:bg-red-50 hover:text-red-600"
                    }
                  `}
                >

                  <span
                    className={`
                      flex h-7 w-7 items-center justify-center
                      rounded-lg text-lg
                      ${
                        active
                          ? "bg-white/20"
                          : "bg-slate-100"
                      }
                    `}
                  >
                    {item.icon}
                  </span>

                  {item.name}

                </Link>
              );

            })}

          </div>

        </nav>


        {/* BOTTOM */}

        <div className="absolute bottom-0 w-full border-t border-slate-100 p-4">

          <Link
            href="/staff/profile"
            className="mb-2 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            <span>◉</span>
            My Profile
          </Link>

          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600"
          >
            <span>↪</span>
            Logout
          </button>

        </div>

      </aside>


      {/* MAIN */}

      <div className="lg:ml-72">

        {/* HEADER */}

        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">

          <button
            onClick={() =>
              setMobileOpen(true)
            }
            className="rounded-xl border border-slate-200 p-2 text-xl lg:hidden"
          >
            ☰
          </button>

          <div className="hidden lg:block">
            <p className="text-sm text-slate-500">
              Staff Workspace
            </p>
          </div>

          <div className="ml-auto flex items-center gap-4">

            <button className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-600 hover:bg-red-50 hover:text-red-600">
              🔔

              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-600" />
            </button>

            <div className="hidden h-8 w-px bg-slate-200 sm:block" />

            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-slate-900">
                {user?.name || "Staff"}
              </p>

              <p className="text-xs text-slate-400">
                Staff Account
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 font-bold text-white">
              {user?.name?.charAt(0) || "S"}
            </div>

          </div>

        </header>


        {/* PAGE */}

        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>

      </div>

    </div>
  );
}
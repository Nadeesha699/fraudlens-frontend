"use client";

import Link from "next/link";
import {
  ReactNode,
  useEffect,
  useState,
} from "react";

import {
  FiBell,
  FiMenu,
  FiX,
} from "react-icons/fi";

import { useRouter } from "next/navigation";

import StaffNav from "@/components/StaffNav";

interface StaffLayoutProps {
  children: ReactNode;
}

interface StaffUser {
  id?: number;
  name?: string;
  email?: string;
  role?: string;
}

export default function StaffLayout({
  children,
}: StaffLayoutProps) {

  const router = useRouter();

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [user, setUser] =
    useState<StaffUser | null>(null);


  /*
   * LOAD USER
   */

  useEffect(() => {

    const storedUser =
      localStorage.getItem("fraudlens_user");

    if (!storedUser) {
      return;
    }

    try {
      const parsedUser =
        JSON.parse(storedUser);

      setUser(parsedUser);

    } catch (error) {

      console.error(
        "Invalid stored user:",
        error
      );

    }

  }, []);


  /*
   * LOGOUT
   */

  const logout = () => {

    localStorage.removeItem(
      "fraudlens_token"
    );

    localStorage.removeItem(
      "fraudlens_user"
    );

    router.push("/login");
  };


  /*
   * USER INITIAL
   */

  const userInitial =
    user?.name
      ?.charAt(0)
      ?.toUpperCase() || "S";


  return (
    <div className="min-h-screen bg-slate-50">


      {/* =====================================
          MOBILE OVERLAY
      ====================================== */}

      {mobileOpen && (
        <div
          className="
            fixed inset-0 z-40
            bg-slate-950/50
            backdrop-blur-sm
            lg:hidden
          "
          onClick={() =>
            setMobileOpen(false)
          }
        />
      )}


      {/* =====================================
          SIDEBAR
      ====================================== */}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex w-72 flex-col
          bg-white
          shadow-2xl
          transition-transform
          duration-300

          lg:translate-x-0

          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >

        {/* LOGO */}

        <div
          className="
            flex h-20 shrink-0
            items-center
            border-b border-slate-100
            px-6
          "
        >

          <Link
            href="/staff/dashboard"
            className="flex items-center gap-3"
            onClick={() =>
              setMobileOpen(false)
            }
          >

            <div
              className="
                flex h-11 w-11
                items-center justify-center
                rounded-xl
                bg-red-600
                text-xl font-black
                text-white
                shadow-lg
                shadow-red-600/20
              "
            >
              F
            </div>

            <div>

              <h1
                className="
                  text-xl
                  font-black
                  tracking-tight
                  text-slate-900
                "
              >
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
            onClick={() =>
              setMobileOpen(false)
            }
            className="
              ml-auto
              rounded-lg
              p-2
              text-slate-400
              hover:bg-slate-100
              hover:text-slate-700
              lg:hidden
            "
          >
            <FiX className="h-5 w-5" />
          </button>

        </div>


        {/* USER CARD */}

        <div className="px-4 pt-5">

          <div
            className="
              rounded-2xl
              border border-red-100
              bg-gradient-to-br
              from-red-50
              to-white
              p-4
            "
          >

            <div className="flex items-center gap-3">

              <div
                className="
                  flex h-11 w-11
                  shrink-0
                  items-center justify-center
                  rounded-full
                  bg-red-600
                  text-sm font-bold
                  text-white
                  shadow-md
                  shadow-red-600/20
                "
              >
                {userInitial}
              </div>

              <div className="min-w-0">

                <p
                  className="
                    truncate
                    text-sm
                    font-bold
                    text-slate-900
                  "
                >
                  {user?.name ||
                    "Staff Member"}
                </p>

                <p
                  className="
                    mt-0.5
                    text-[11px]
                    font-bold
                    uppercase
                    tracking-wider
                    text-red-600
                  "
                >
                  {user?.role ||
                    "Staff"}
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* NAVIGATION */}

        <div className="flex-1 overflow-y-auto">

          <StaffNav
            onLogout={logout}
            onNavigate={() =>
              setMobileOpen(false)
            }
          />

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

        <header
          className="
            sticky top-0 z-30
            flex h-20
            items-center
            border-b border-slate-200
            bg-white/95
            px-4
            backdrop-blur
            sm:px-6
            lg:px-8
          "
        >

          {/* MOBILE MENU */}

          <button
            type="button"
            onClick={() =>
              setMobileOpen(true)
            }
            className="
              rounded-xl
              border border-slate-200
              bg-white
              p-2.5
              text-slate-600
              shadow-sm
              hover:border-red-200
              hover:text-red-600
              lg:hidden
            "
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
              className="
                relative
                flex h-10 w-10
                items-center justify-center
                rounded-xl
                bg-slate-50
                text-slate-600
                transition
                hover:bg-red-50
                hover:text-red-600
              "
            >

              <FiBell className="h-5 w-5" />

              <span
                className="
                  absolute right-2 top-2
                  h-2 w-2
                  rounded-full
                  bg-red-600
                  ring-2 ring-white
                "
              />

            </button>


            <div className="hidden h-8 w-px bg-slate-200 sm:block" />


            {/* USER */}

            <div className="hidden text-right sm:block">

              <p className="text-sm font-bold text-slate-900">
                {user?.name || "Staff"}
              </p>

              <p className="text-xs text-slate-400">
                {user?.email ||
                  "Staff Account"}
              </p>

            </div>


            {/* AVATAR */}

            <div
              className="
                flex h-10 w-10
                items-center justify-center
                rounded-full
                bg-red-600
                text-sm font-bold
                text-white
              "
            >
              {userInitial}
            </div>

          </div>

        </header>


        {/* PAGE */}

        <main
          className="
            min-h-[calc(100vh-5rem)]
            p-4
            sm:p-6
            lg:p-8
          "
        >
          {children}
        </main>

      </div>

    </div>
  );
}
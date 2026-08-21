// "use client"

// import { useState } from "react";
// import api from "../services/api";
// import ResultTable from "../components/ResultTable";

// function UploadExcel() {
//   const [file, setFile] = useState<File | null>(null);
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const uploadExcel = async () => {
//     if (!file) {
//       alert("Please select an Excel file.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       setLoading(true);

//       const res = await api.post("/upload", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       setResults(res.data);
//     } catch (error) {
//       alert("Upload failed.");
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto py-12 px-6">

//       <div className="bg-white rounded-2xl shadow-lg p-8">

//         <h1 className="text-3xl font-bold text-gray-800">
//           Bulk Customer Verification
//         </h1>

//         <p className="text-gray-500 mt-2">
//           Upload an Excel file to verify customer records.
//         </p>

//         <div className="flex flex-wrap gap-4 mt-8">

//           <a
//             href="http://localhost:5000/download-template"
//             className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
//           >
//             Download Template
//           </a>

//           <input
//             type="file"
//             accept=".xlsx,.xls"
//           onChange={(e) => {
//   const selectedFile = e.target.files?.[0] || null;
//   setFile(selectedFile);
// }}
//             className="border rounded-lg px-4 py-2"
//           />

//           <button
//             onClick={uploadExcel}
//             disabled={loading}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
//           >
//             {loading ? "Uploading..." : "Upload Excel"}
//           </button>

//         </div>

//         {file && (
//           <div className="mt-4 text-gray-600">
//             Selected File:
//             <span className="font-semibold ml-2">{file.name}</span>
//           </div>
//         )}

//         <ResultTable results={results} />

//       </div>
//     </div>
//   );
// }

// export default UploadExcel;

"use client";

import { ChangeEvent, useEffect, useState } from "react";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import StaffNav from "@/components/StaffNav";
import { FiBell, FiMenu, FiX } from "react-icons/fi";

interface Result {
  registration_id: string;
  uploaded_name: string;
  status: string;
  risk?: string;
}

interface StaffUser {
  id?: number;
  name?: string;
  email?: string;
  role?: string;
}

export default function ExcelVerification() {
  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const [results, setResults] = useState<Result[]>([]);

  const selectFile = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;

    setFile(selected);
  };

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

  const uploadExcel = async () => {
    if (!file) {
      alert("Please select an Excel file.");
      return;
    }

    const formData = new FormData();

    formData.append("file", file);

    try {
      setLoading(true);

      const response = await api.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setResults(response.data);
    } catch (error) {
      console.error(error);

      alert("Excel verification failed.");
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
          <div className="mx-auto max-w-6xl">
            <h1 className="text-2xl font-bold text-red-600 sm:text-3xl mb-8">
              Bulk Verification
            </h1>

            {/* UPLOAD */}

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="mx-auto max-w-2xl">
                <div className="mb-6 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-2xl text-red-600">
                    ↑
                  </div>

                  <h2 className="mt-4 text-xl font-bold text-slate-900">
                    Upload Excel File
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    Supported formats: .xlsx and .xls
                  </p>
                </div>

                <label className="block cursor-pointer">
                  <div className="rounded-2xl border-2 border-dashed border-slate-300 p-8 text-center transition hover:border-red-400 hover:bg-red-50/30">
                    <p className="font-semibold text-slate-700">
                      {file ? file.name : "Choose an Excel file"}
                    </p>

                    <p className="mt-2 text-sm text-slate-400">
                      Click here to browse your files
                    </p>
                  </div>

                  <input
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={selectFile}
                    className="hidden"
                  />
                </label>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="http://localhost:5000/download-template"
                    className="flex-1 rounded-xl border border-slate-300 bg-white px-5 py-3 text-center font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    ↓ Download Template
                  </a>

                  <button
                    onClick={uploadExcel}
                    disabled={!file || loading}
                    className="flex-1 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white shadow-lg shadow-red-600/20 hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {loading ? "Verifying..." : "Verify Excel"}
                  </button>
                </div>
              </div>
            </div>

            {/* RESULTS */}

            {results.length > 0 && (
              <div className="mt-8 rounded-2xl border border-slate-200 bg-white shadow-sm">
                <h2 className="font-bold text-red-600">Verification Results</h2>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-400">
                        <th className="px-6 py-4">Registration ID</th>

                        <th className="px-6 py-4">Name</th>

                        <th className="px-6 py-4">Status</th>

                        <th className="px-6 py-4">Risk</th>
                      </tr>
                    </thead>

                    <tbody>
                      {results.map((result, index) => (
                        <tr key={index} className="border-b border-slate-50">
                          <td className="px-6 py-4 text-sm font-semibold">
                            {result.registration_id}
                          </td>

                          <td className="px-6 py-4 text-sm">
                            {result.uploaded_name}
                          </td>

                          <td className="px-6 py-4">
                            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                              {result.status}
                            </span>
                          </td>

                          <td className="px-6 py-4">
                            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                              {result.risk || "Low"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>{" "}
        </main>
      </div>
    </div>
  );
}

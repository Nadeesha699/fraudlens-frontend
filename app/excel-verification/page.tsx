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

import { ChangeEvent, useState } from "react";
import api from "@/services/api";

interface Result {
  registration_id: string;
  uploaded_name: string;
  status: string;
  risk?: string;
}

export default function ExcelVerification() {

  const [file, setFile] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [results, setResults] =
    useState<Result[]>([]);

  const selectFile = (
    e: ChangeEvent<HTMLInputElement>
  ) => {

    const selected =
      e.target.files?.[0] || null;

    setFile(selected);
  };


  const uploadExcel = async () => {

    if (!file) {
      alert("Please select an Excel file.");
      return;
    }

    const formData = new FormData();

    formData.append("file", file);

    try {

      setLoading(true);

      const response = await api.post(
        "/upload",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      setResults(response.data);

    } catch (error) {

      console.error(error);

      alert(
        "Excel verification failed."
      );

    } finally {

      setLoading(false);

    }
  };


  return (
    <div className="mx-auto max-w-6xl">

      <div className="mb-8">

        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Bulk Verification
        </h1>

        <p className="mt-2 text-slate-500">
          Upload an Excel file to verify multiple
          customer records.
        </p>

      </div>


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
                {file
                  ? file.name
                  : "Choose an Excel file"}
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
              {loading
                ? "Verifying..."
                : "Verify Excel"}
            </button>

          </div>

        </div>

      </div>


      {/* RESULTS */}

      {results.length > 0 && (

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-100 p-6">

            <h2 className="font-bold text-slate-900">
              Verification Results
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {results.length} records processed.
            </p>

          </div>


          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-400">

                  <th className="px-6 py-4">
                    Registration ID
                  </th>

                  <th className="px-6 py-4">
                    Name
                  </th>

                  <th className="px-6 py-4">
                    Status
                  </th>

                  <th className="px-6 py-4">
                    Risk
                  </th>

                </tr>

              </thead>

              <tbody>

                {results.map((result, index) => (

                  <tr
                    key={index}
                    className="border-b border-slate-50"
                  >

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

    </div>
  );
}
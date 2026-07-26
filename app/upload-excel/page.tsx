"use client"

import { useState } from "react";
import api from "../services/api";
import ResultTable from "../components/result-table";

function UploadExcel() {
  const [file, setFile] = useState<File | null>(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const uploadExcel = async () => {
    if (!file) {
      alert("Please select an Excel file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const res = await api.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setResults(res.data);
    } catch (error) {
      alert("Upload failed.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">

      <div className="bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-gray-800">
          Bulk Customer Verification
        </h1>

        <p className="text-gray-500 mt-2">
          Upload an Excel file to verify customer records.
        </p>

        <div className="flex flex-wrap gap-4 mt-8">

          <a
            href="http://localhost:5000/download-template"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
          >
            Download Template
          </a>

          <input
            type="file"
            accept=".xlsx,.xls"
          onChange={(e) => {
  const selectedFile = e.target.files?.[0] || null;
  setFile(selectedFile);
}}
            className="border rounded-lg px-4 py-2"
          />

          <button
            onClick={uploadExcel}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
          >
            {loading ? "Uploading..." : "Upload Excel"}
          </button>

        </div>

        {file && (
          <div className="mt-4 text-gray-600">
            Selected File:
            <span className="font-semibold ml-2">{file.name}</span>
          </div>
        )}

        <ResultTable results={results} />

      </div>
    </div>
  );
}

export default UploadExcel;
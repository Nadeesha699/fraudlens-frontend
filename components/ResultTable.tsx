"use client"

type CustomerUpload = {
  id: number;
  name: string;
  age: number;
  email: string;
};

type DatabaseCustomer = {
  account_number?: string;
  branch?: string;
};

type ResultItem = {
  uploaded: CustomerUpload;
  status: "Found" | "Not Found";
  database: DatabaseCustomer | null;
};

type Props = {
  results: ResultItem[];
};

function ResultTable({ results }: Props) {
  if (!results.length) return null;

  return (
    <div className="mt-8 overflow-x-auto rounded-xl shadow">
      <table className="min-w-full bg-white">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-4 py-3 text-left">ID</th>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Age</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-center">Status</th>
            <th className="px-4 py-3 text-left">Account</th>
            <th className="px-4 py-3 text-left">Branch</th>
          </tr>
        </thead>

        <tbody>
          {results.map((item, index) => (
            <tr
              key={index}
              className="border-b hover:bg-gray-50 transition"
            >
              <td className="px-4 py-3">{item.uploaded.id}</td>
              <td className="px-4 py-3">{item.uploaded.name}</td>
              <td className="px-4 py-3">{item.uploaded.age}</td>
              <td className="px-4 py-3">{item.uploaded.email}</td>

              <td className="px-4 py-3 text-center">
                {item.status === "Found" ? (
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                    Found
                  </span>
                ) : (
                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                    Not Found
                  </span>
                )}
              </td>

              <td className="px-4 py-3">
                {item.database?.account_number || "-"}
              </td>

              <td className="px-4 py-3">
                {item.database?.branch || "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResultTable;
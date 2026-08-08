import Link from "next/link";
import { useState } from "react";

const customers = [
  {
    id: "FL-2026-000123",
    name: "John Perera",
    nic: "199456789V",
    policy: "POL-2026-00123",
    status: "Verified",
    risk: "Low",
  },
  {
    id: "FL-2026-000124",
    name: "Sarah Silva",
    nic: "199876543V",
    policy: "POL-2026-00124",
    status: "Verified",
    risk: "Medium",
  },
  {
    id: "FL-2026-000125",
    name: "Nimal Fernando",
    nic: "200012345V",
    policy: "POL-2026-00125",
    status: "Pending",
    risk: "Medium",
  },
];

export default function CustomerSearch() {

  const [search, setSearch] = useState("");

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.id
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      customer.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      customer.nic
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      customer.policy
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-7xl">

      <div className="mb-8">

        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Search Customers
        </h1>

        <p className="mt-2 text-slate-500">
          Search and verify insurance customer records.
        </p>

      </div>


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
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Registration ID, name, NIC or policy number"
              className="w-full rounded-xl border border-slate-300 py-3.5 pl-11 pr-4 outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100"
            />

          </div>

          <button className="rounded-xl bg-red-600 px-7 py-3.5 font-semibold text-white hover:bg-red-700">
            Search
          </button>

        </div>

      </div>


      {/* RESULTS */}

      <div className="mt-8">

        <div className="mb-4 flex items-center justify-between">

          <div>
            <h2 className="font-bold text-slate-900">
              Search Results
            </h2>

            <p className="text-sm text-slate-500">
              {filteredCustomers.length} customers found
            </p>
          </div>

          <Link
            href="/staff/customers/register"
            className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
          >
            + Register
          </Link>

        </div>


        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="hidden overflow-x-auto md:block">

            <table className="w-full">

              <thead>
                <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-400">

                  <th className="px-6 py-4">
                    Registration ID
                  </th>

                  <th className="px-6 py-4">
                    Customer
                  </th>

                  <th className="px-6 py-4">
                    Policy
                  </th>

                  <th className="px-6 py-4">
                    Status
                  </th>

                  <th className="px-6 py-4">
                    Risk
                  </th>

                  <th className="px-6 py-4">
                    Action
                  </th>

                </tr>
              </thead>

              <tbody>

                {filteredCustomers.map((customer) => (

                  <tr
                    key={customer.id}
                    className="border-b border-slate-50 hover:bg-red-50/30"
                  >

                    <td className="px-6 py-4 text-sm font-semibold text-slate-700">
                      {customer.id}
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
                      {customer.policy}
                    </td>

                    <td className="px-6 py-4">
                      <Status status={customer.status} />
                    </td>

                    <td className="px-6 py-4">
                      <Risk risk={customer.risk} />
                    </td>

                    <td className="px-6 py-4">

                      <Link
                        href={`/staff/customers/${customer.id}`}
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

              <div
                key={customer.id}
                className="p-5"
              >

                <div className="flex justify-between">

                  <div>

                    <p className="text-xs font-semibold text-slate-400">
                      {customer.id}
                    </p>

                    <h3 className="mt-1 font-bold text-slate-900">
                      {customer.name}
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      {customer.policy}
                    </p>

                  </div>

                  <Risk risk={customer.risk} />

                </div>

                <div className="mt-4 flex items-center justify-between">

                  <Status status={customer.status} />

                  <Link
                    href={`/staff/customers/${customer.id}`}
                    className="font-semibold text-red-600"
                  >
                    View →
                  </Link>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}


function Status({
  status,
}: {
  status: string;
}) {

  return (
    <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
      {status}
    </span>
  );
}


function Risk({
  risk,
}: {
  risk: string;
}) {

  const style =
    risk === "High"
      ? "bg-red-50 text-red-700"
      : risk === "Medium"
      ? "bg-amber-50 text-amber-700"
      : "bg-green-50 text-green-700";

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${style}`}
    >
      {risk}
    </span>
  );
}
import Link from "next/link";


const stats = [
  {
    title: "My Customers",
    value: "1,284",
    change: "+12%",
    description: "This month",
    icon: "👥",
  },
  {
    title: "Verified",
    value: "1,156",
    change: "+8%",
    description: "Customers verified",
    icon: "✓",
  },
  {
    title: "Pending",
    value: "86",
    change: "12 today",
    description: "Need verification",
    icon: "◷",
  },
  {
    title: "Fraud Alerts",
    value: "42",
    change: "5 new",
    description: "Require attention",
    icon: "!",
  },
];

const recentCustomers = [
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

export default function StaffDashboard() {

  return (
    <div className="mx-auto max-w-7xl">

      {/* PAGE HEADER */}

      <div className="mb-8">

        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Staff Dashboard
        </h1>

        <p className="mt-2 text-sm text-slate-500 sm:text-base">
          Manage customers and verify insurance records.
        </p>

      </div>


      {/* STAT CARDS */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >

            <div className="flex items-start justify-between">

              <div>

                <p className="text-sm font-medium text-slate-500">
                  {stat.title}
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {stat.value}
                </p>

              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-lg text-red-600">
                {stat.icon}
              </div>

            </div>

            <div className="mt-4 flex items-center gap-2 text-xs">

              <span className="font-semibold text-red-600">
                {stat.change}
              </span>

              <span className="text-slate-400">
                {stat.description}
              </span>

            </div>

          </div>
        ))}

      </div>


      {/* QUICK ACTIONS */}

      <div className="mt-8">

        <h2 className="mb-4 text-lg font-bold text-slate-900">
          Quick Actions
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          <Link
            href="/staff/customers/search"
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-red-200 hover:shadow-lg"
          >

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-xl text-red-600">
              ⌕
            </div>

            <h3 className="mt-4 font-bold text-slate-900">
              Search Customer
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Find a customer using their registration ID.
            </p>

            <span className="mt-4 block text-sm font-semibold text-red-600">
              Search →
            </span>

          </Link>


          <Link
            href="/staff/customers/register"
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-red-200 hover:shadow-lg"
          >

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-xl text-red-600">
              +
            </div>

            <h3 className="mt-4 font-bold text-slate-900">
              Register Customer
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Create a new insurance customer record.
            </p>

            <span className="mt-4 block text-sm font-semibold text-red-600">
              Register →
            </span>

          </Link>


          <Link
            href="/staff/verification/upload"
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-red-200 hover:shadow-lg"
          >

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-xl text-red-600">
              ↑
            </div>

            <h3 className="mt-4 font-bold text-slate-900">
              Upload Excel
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Verify multiple customer records at once.
            </p>

            <span className="mt-4 block text-sm font-semibold text-red-600">
              Upload →
            </span>

          </Link>

        </div>

      </div>


      {/* SEARCH */}

      <div className="mt-8 rounded-2xl bg-red-600 p-6 shadow-xl shadow-red-600/20 sm:p-8">

        <div className="max-w-2xl">

          <h2 className="text-xl font-bold text-white sm:text-2xl">
            Search Customer
          </h2>

          <p className="mt-2 text-sm text-red-100">
            Quickly find a customer by Registration ID,
            name, NIC or policy number.
          </p>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">

            <input
              placeholder="FL-2026-000123"
              className="min-w-0 flex-1 rounded-xl border-0 bg-white px-4 py-3.5 text-slate-900 outline-none ring-0 placeholder:text-slate-400"
            />

            <Link
              href="/staff/customers/search"
              className="rounded-xl bg-slate-950 px-6 py-3.5 text-center font-semibold text-white transition hover:bg-slate-900"
            >
              Search
            </Link>

          </div>

        </div>

      </div>


      {/* RECENT CUSTOMERS */}

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="flex items-center justify-between border-b border-slate-100 p-5 sm:p-6">

          <div>
            <h2 className="font-bold text-slate-900">
              Recent Customers
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Recently registered or verified records
            </p>
          </div>

          <Link
            href="/staff/customers/search"
            className="text-sm font-semibold text-red-600 hover:text-red-700"
          >
            View all
          </Link>

        </div>


        {/* DESKTOP TABLE */}

        <div className="hidden overflow-x-auto md:block">

          <table className="w-full">

            <thead>
              <tr className="border-b border-slate-100 text-left text-xs uppercase tracking-wide text-slate-400">

                <th className="px-6 py-4">
                  Registration ID
                </th>

                <th className="px-6 py-4">
                  Customer
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

              {recentCustomers.map((customer) => (

                <tr
                  key={customer.id}
                  className="border-b border-slate-50 last:border-0"
                >

                  <td className="px-6 py-4 text-sm font-semibold text-slate-700">
                    {customer.id}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-700">
                    {customer.name}
                  </td>

                  <td className="px-6 py-4">

                    <StatusBadge
                      status={customer.status}
                    />

                  </td>

                  <td className="px-6 py-4">

                    <RiskBadge
                      risk={customer.risk}
                    />

                  </td>

                  <td className="px-6 py-4">

                    <Link
                      href={`/staff/customers/${customer.id}`}
                      className="font-semibold text-red-600 hover:text-red-700"
                    >
                      View
                    </Link>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>


        {/* MOBILE CARDS */}

        <div className="divide-y divide-slate-100 md:hidden">

          {recentCustomers.map((customer) => (

            <div
              key={customer.id}
              className="p-5"
            >

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-xs font-semibold text-slate-400">
                    {customer.id}
                  </p>

                  <h3 className="mt-1 font-semibold text-slate-900">
                    {customer.name}
                  </h3>

                </div>

                <RiskBadge
                  risk={customer.risk}
                />

              </div>

              <div className="mt-4 flex items-center justify-between">

                <StatusBadge
                  status={customer.status}
                />

                <Link
                  href={`/staff/customers/${customer.id}`}
                  className="text-sm font-semibold text-red-600"
                >
                  View Profile →
                </Link>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}


function StatusBadge({
  status,
}: {
  status: string;
}) {

  const styles: Record<string, string> = {
    Verified:
      "bg-green-50 text-green-700",
    Pending:
      "bg-amber-50 text-amber-700",
    Review:
      "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status] ||
        "bg-slate-100 text-slate-600"
      }`}
    >
      {status}
    </span>
  );
}


function RiskBadge({
  risk,
}: {
  risk: string;
}) {

  const styles: Record<string, string> = {
    Low:
      "bg-green-50 text-green-700",
    Medium:
      "bg-amber-50 text-amber-700",
    High:
      "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        styles[risk]
      }`}
    >
      {risk}
    </span>
  );
}
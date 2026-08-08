import Link from "next/link";
import { useParams } from "next/navigation";


export default function CustomerProfile() {

  const { id } = useParams();

  const customer = {
    registrationId: id || "FL-2026-000123",
    name: "John Perera",
    nic: "199456789V",
    dateOfBirth: "1994-05-12",
    phone: "+94 77 123 4567",
    email: "john@example.com",
    address: "Colombo, Sri Lanka",
    policyNumber: "POL-2026-00123",
    policyType: "Life Insurance",
    status: "Verified",
    risk: "Low",
  };

  return (
    <div className="mx-auto max-w-6xl">

      {/* HEADER */}

      <div className="mb-6">

        <Link
          href="/staff/customers/search"
          className="text-sm font-semibold text-red-600"
        >
          ← Back to customers
        </Link>

      </div>


      <div className="rounded-2xl bg-red-600 p-6 text-white shadow-xl shadow-red-600/20 sm:p-8">

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-4">

            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl font-bold text-red-600">
              {customer.name.charAt(0)}
            </div>

            <div>

              <p className="text-sm text-red-100">
                {customer.registrationId}
              </p>

              <h1 className="mt-1 text-2xl font-bold">
                {customer.name}
              </h1>

              <div className="mt-2 flex flex-wrap gap-2">

                <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
                  ✓ {customer.status}
                </span>

                <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
                  {customer.risk} Risk
                </span>

              </div>

            </div>

          </div>


          <div className="flex gap-2">

            <Link
              href={`/staff/customers/${id}/edit`}
              className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"
            >
              Edit
            </Link>

            <button className="rounded-xl border border-white/30 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10">
              Delete
            </button>

          </div>

        </div>

      </div>


      {/* INFORMATION */}

      <div className="mt-6 grid gap-6 lg:grid-cols-2">

        <InfoCard title="Personal Information">

          <Info
            label="Registration ID"
            value={String(customer.registrationId)}
          />

          <Info
            label="Full Name"
            value={customer.name}
          />

          <Info
            label="NIC / Passport"
            value={customer.nic}
          />

          <Info
            label="Date of Birth"
            value={customer.dateOfBirth}
          />

          <Info
            label="Phone"
            value={customer.phone}
          />

          <Info
            label="Email"
            value={customer.email}
          />

          <Info
            label="Address"
            value={customer.address}
          />

        </InfoCard>


        <InfoCard title="Insurance Information">

          <Info
            label="Policy Number"
            value={customer.policyNumber}
          />

          <Info
            label="Policy Type"
            value={customer.policyType}
          />

          <Info
            label="Policy Status"
            value="Active"
          />

          <Info
            label="Customer Status"
            value={customer.status}
          />

        </InfoCard>


        {/* VERIFICATION */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">

          <div className="flex flex-col justify-between gap-4 sm:flex-row">

            <div>

              <h2 className="font-bold text-slate-900">
                Verification Assessment
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Customer verification and fraud assessment.
              </p>

            </div>

            <Link
              href={`/staff/customers/${id}/verify`}
              className="rounded-xl bg-red-600 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-red-700"
            >
              Verify Customer
            </Link>

          </div>


          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <Check
              title="Registration ID"
              value="Matched"
            />

            <Check
              title="NIC"
              value="Matched"
            />

            <Check
              title="Phone"
              value="Matched"
            />

            <Check
              title="Duplicate Check"
              value="Clear"
            />

          </div>

        </div>

      </div>

    </div>
  );
}


function InfoCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="mb-5 font-bold text-slate-900">
        {title}
      </h2>

      <div className="divide-y divide-slate-100">
        {children}
      </div>

    </div>
  );
}


function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {

  return (
    <div className="flex flex-col gap-1 py-3 sm:flex-row sm:justify-between">

      <span className="text-sm text-slate-400">
        {label}
      </span>

      <span className="text-sm font-semibold text-slate-800 sm:text-right">
        {value}
      </span>

    </div>
  );
}


function Check({
  title,
  value,
}: {
  title: string;
  value: string;
}) {

  return (
    <div className="rounded-xl bg-green-50 p-4">

      <div className="flex items-center gap-2">

        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-600 text-sm text-white">
          ✓
        </span>

        <span className="text-sm font-semibold text-green-800">
          {value}
        </span>

      </div>

      <p className="mt-2 text-xs text-green-700">
        {title}
      </p>

    </div>
  );
}
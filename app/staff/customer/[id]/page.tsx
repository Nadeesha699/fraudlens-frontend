"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import {
  FiArrowLeft,
  FiEdit,
  FiCheckCircle,
  FiAlertTriangle,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiCreditCard,
  FiShield,
  FiFileText,
  FiClock,
  FiSearch,
} from "react-icons/fi";

export default function CustomerProfilePage() {
  const params = useParams();

  const customerId = params.id as string;

  /*
   * Temporary customer data.
   *
   * Later replace this with:
   * GET /customers/:id
   */

  const customer = {
    id: customerId || "FL-2026-000123",

    firstName: "John",
    lastName: "Perera",

    nic: "199456789V",

    email: "john.perera@gmail.com",

    phone: "+94 77 123 4567",

    dateOfBirth: "1994-05-18",

    gender: "Male",

    address:
      "No. 25, Main Street, Colombo, Sri Lanka",

    policyNumber: "POL-2026-00123",

    policyType: "Life Insurance",

    policyStatus: "Active",

    registeredDate: "2026-08-10",

    lastUpdated: "2026-08-20",

    verificationStatus: "Verified",

    riskLevel: "Low",

    fraudScore: 12,
  };


  return (
    <div className="mx-auto max-w-7xl">


      {/* =====================================
          TOP BAR
      ====================================== */}

      <div className="mb-6">

        <Link
          href="/staff/customers/search"
          className="
            inline-flex
            items-center
            gap-2
            text-sm
            font-semibold
            text-slate-500
            transition
            hover:text-red-600
          "
        >
          <FiArrowLeft className="h-4 w-4" />

          Back to Customers
        </Link>


        <div
          className="
            mt-5
            flex flex-col
            gap-4
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >

          <div>

            <div className="flex flex-wrap items-center gap-3">

              <h1
                className="
                  text-2xl
                  font-black
                  tracking-tight
                  text-slate-900
                  sm:text-3xl
                "
              >
                Customer Profile
              </h1>


              <span
                className="
                  rounded-full
                  bg-green-50
                  px-3 py-1
                  text-xs
                  font-bold
                  text-green-700
                "
              >
                Verified
              </span>

            </div>


            <p className="mt-2 text-sm text-slate-500">

              Registration ID:

              <span className="ml-1 font-bold text-slate-700">
                {customer.id}
              </span>

            </p>

          </div>


          {/* ACTIONS */}

          <div className="flex flex-wrap gap-3">

            <Link
              href={`/staff/customers/${customer.id}/edit`}
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-slate-200
                bg-white
                px-4 py-2.5
                text-sm
                font-bold
                text-slate-700
                shadow-sm
                transition
                hover:border-red-200
                hover:bg-red-50
                hover:text-red-600
              "
            >

              <FiEdit className="h-4 w-4" />

              Edit Profile

            </Link>


            <button
              type="button"
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-red-600
                px-4 py-2.5
                text-sm
                font-bold
                text-white
                shadow-lg
                shadow-red-600/20
                transition
                hover:bg-red-700
              "
            >

              <FiCheckCircle className="h-4 w-4" />

              Verify Customer

            </button>

          </div>

        </div>

      </div>


      {/* =====================================
          SUMMARY CARDS
      ====================================== */}

      <div
        className="
          grid
          gap-4
          sm:grid-cols-2
          lg:grid-cols-4
        "
      >

        {/* VERIFICATION */}

        <SummaryCard
          icon={FiCheckCircle}
          title="Verification"
          value={customer.verificationStatus}
          description="Identity verified"
          type="success"
        />


        {/* RISK */}

        <SummaryCard
          icon={FiShield}
          title="Risk Level"
          value={customer.riskLevel}
          description={`Fraud score: ${customer.fraudScore}/100`}
          type="success"
        />


        {/* POLICY */}

        <SummaryCard
          icon={FiFileText}
          title="Policy"
          value={customer.policyStatus}
          description={customer.policyNumber}
          type="normal"
        />


        {/* LAST UPDATED */}

        <SummaryCard
          icon={FiClock}
          title="Last Updated"
          value="20 Aug 2026"
          description="Recently updated"
          type="normal"
        />

      </div>


      {/* =====================================
          MAIN CONTENT
      ====================================== */}

      <div
        className="
          mt-6
          grid
          gap-6
          xl:grid-cols-3
        "
      >


        {/* =================================
            LEFT / MAIN
        ================================= */}

        <div className="space-y-6 xl:col-span-2">


          {/* PERSONAL INFORMATION */}

          <section
            className="
              rounded-2xl
              border
              border-slate-200
              bg-white
              shadow-sm
            "
          >

            <SectionHeader
              icon={FiUser}
              title="Personal Information"
              description="Customer identity and contact information"
            />


            <div
              className="
                grid
                gap-x-8
                gap-y-6
                p-6
                sm:grid-cols-2
              "
            >

              <InfoItem
                label="First Name"
                value={customer.firstName}
              />

              <InfoItem
                label="Last Name"
                value={customer.lastName}
              />

              <InfoItem
                label="NIC / Registration Number"
                value={customer.nic}
              />

              <InfoItem
                label="Gender"
                value={customer.gender}
              />

              <InfoItem
                label="Date of Birth"
                value={customer.dateOfBirth}
                icon={FiCalendar}
              />

              <InfoItem
                label="Phone Number"
                value={customer.phone}
                icon={FiPhone}
              />

              <InfoItem
                label="Email Address"
                value={customer.email}
                icon={FiMail}
              />

              <InfoItem
                label="Address"
                value={customer.address}
                icon={FiMapPin}
              />

            </div>

          </section>


          {/* INSURANCE INFORMATION */}

          <section
            className="
              rounded-2xl
              border
              border-slate-200
              bg-white
              shadow-sm
            "
          >

            <SectionHeader
              icon={FiFileText}
              title="Insurance Information"
              description="Customer insurance policy details"
            />


            <div
              className="
                grid
                gap-x-8
                gap-y-6
                p-6
                sm:grid-cols-2
              "
            >

              <InfoItem
                label="Policy Number"
                value={customer.policyNumber}
              />

              <InfoItem
                label="Policy Type"
                value={customer.policyType}
              />

              <InfoItem
                label="Policy Status"
                value={customer.policyStatus}
              />

              <InfoItem
                label="Registered Date"
                value={customer.registeredDate}
              />

            </div>

          </section>


          {/* VERIFICATION HISTORY */}

          <section
            className="
              rounded-2xl
              border
              border-slate-200
              bg-white
              shadow-sm
            "
          >

            <SectionHeader
              icon={FiClock}
              title="Verification History"
              description="Customer verification activity"
            />


            <div className="p-6">

              <div className="relative ml-3 border-l border-slate-200">


                {/* ITEM 1 */}

                <HistoryItem
                  title="Customer Verified"
                  description="Identity information verified successfully."
                  date="20 Aug 2026, 10:42 AM"
                  active
                />


                {/* ITEM 2 */}

                <HistoryItem
                  title="Customer Profile Updated"
                  description="Customer contact information was updated."
                  date="18 Aug 2026, 02:15 PM"
                />


                {/* ITEM 3 */}

                <HistoryItem
                  title="Customer Registered"
                  description="Customer profile was created in FraudLens."
                  date="10 Aug 2026, 09:20 AM"
                />

              </div>

            </div>

          </section>

        </div>


        {/* =================================
            RIGHT SIDEBAR
        ================================= */}

        <div className="space-y-6">


          {/* RISK CARD */}

          <section
            className="
              overflow-hidden
              rounded-2xl
              border
              border-slate-200
              bg-white
              shadow-sm
            "
          >

            <div
              className="
                border-b
                border-slate-100
                p-5
              "
            >

              <div className="flex items-center gap-3">

                <div
                  className="
                    flex h-10 w-10
                    items-center justify-center
                    rounded-xl
                    bg-green-50
                    text-green-600
                  "
                >
                  <FiShield className="h-5 w-5" />
                </div>

                <div>

                  <h2 className="font-black text-slate-900">
                    Fraud Risk
                  </h2>

                  <p className="text-xs text-slate-400">
                    Automated risk assessment
                  </p>

                </div>

              </div>

            </div>


            <div className="p-5">

              <div className="flex items-center justify-between">

                <span className="text-sm font-medium text-slate-500">
                  Risk Score
                </span>

                <span className="text-2xl font-black text-green-600">
                  {customer.fraudScore}
                </span>

              </div>


              {/* PROGRESS */}

              <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">

                <div
                  className="
                    h-full
                    rounded-full
                    bg-green-500
                  "
                  style={{
                    width: `${customer.fraudScore}%`,
                  }}
                />

              </div>


              <div
                className="
                  mt-4
                  flex items-center
                  justify-between
                  text-xs
                "
              >

                <span className="font-bold text-green-600">
                  Low Risk
                </span>

                <span className="text-slate-400">
                  0 — 100
                </span>

              </div>


              <div
                className="
                  mt-5
                  rounded-xl
                  bg-green-50
                  p-4
                "
              >

                <div className="flex gap-3">

                  <FiCheckCircle
                    className="
                      mt-0.5
                      h-5 w-5
                      shrink-0
                      text-green-600
                    "
                  />

                  <p
                    className="
                      text-xs
                      leading-5
                      text-green-800
                    "
                  >
                    No significant fraud indicators
                    were detected for this customer.
                  </p>

                </div>

              </div>

            </div>

          </section>


          {/* VERIFICATION CARD */}

          <section
            className="
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-5
              shadow-sm
            "
          >

            <h2 className="font-black text-slate-900">
              Verification
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Review customer identity
            </p>


            <div
              className="
                mt-5
                rounded-xl
                border
                border-green-200
                bg-green-50
                p-4
              "
            >

              <div className="flex items-center gap-3">

                <div
                  className="
                    flex h-10 w-10
                    items-center justify-center
                    rounded-full
                    bg-green-100
                  "
                >
                  <FiCheckCircle
                    className="
                      h-5 w-5
                      text-green-600
                    "
                  />
                </div>

                <div>

                  <p className="text-sm font-bold text-green-800">
                    Identity Verified
                  </p>

                  <p className="text-xs text-green-600">
                    All required checks completed
                  </p>

                </div>

              </div>

            </div>


            <button
              type="button"
              className="
                mt-4
                flex w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-red-600
                px-4 py-3
                text-sm
                font-bold
                text-white
                transition
                hover:bg-red-700
              "
            >

              <FiCheckCircle className="h-4 w-4" />

              Re-verify Customer

            </button>

          </section>


          {/* QUICK ACTIONS */}

          <section
            className="
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-5
              shadow-sm
            "
          >

            <h2 className="font-black text-slate-900">
              Quick Actions
            </h2>


            <div className="mt-4 space-y-2">

              <ActionButton
                icon={FiEdit}
                text="Edit Customer"
              />

              <ActionButton
                icon={FiFileText}
                text="View Policy"
              />

              <ActionButton
                icon={FiSearch}
                text="Search Similar Customers"
              />

              <ActionButton
                icon={FiAlertTriangle}
                text="Report Fraud"
                danger
              />

            </div>

          </section>


          {/* CUSTOMER ID */}

          <div
            className="
              rounded-2xl
              bg-slate-900
              p-5
              text-white
            "
          >

            <p
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-widest
                text-slate-400
              "
            >
              Registration ID
            </p>

            <p
              className="
                mt-2
                break-all
                text-lg
                font-black
              "
            >
              {customer.id}
            </p>

            <p className="mt-2 text-xs text-slate-400">
              FraudLens Customer Registry
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}


/* =========================================
   SUMMARY CARD
========================================= */

interface SummaryCardProps {
  icon: React.ElementType;
  title: string;
  value: string;
  description: string;
  type: "success" | "normal";
}

function SummaryCard({
  icon: Icon,
  title,
  value,
  description,
  type,
}: SummaryCardProps) {

  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
      "
    >

      <div className="flex items-center gap-3">

        <div
          className={`
            flex h-10 w-10
            items-center justify-center
            rounded-xl

            ${
              type === "success"
                ? "bg-green-50 text-green-600"
                : "bg-red-50 text-red-600"
            }
          `}
        >
          <Icon className="h-5 w-5" />
        </div>


        <p className="text-sm font-medium text-slate-500">
          {title}
        </p>

      </div>


      <p
        className={`
          mt-4
          text-xl
          font-black

          ${
            type === "success"
              ? "text-green-600"
              : "text-slate-900"
          }
        `}
      >
        {value}
      </p>


      <p className="mt-1 text-xs text-slate-400">
        {description}
      </p>

    </div>
  );
}


/* =========================================
   SECTION HEADER
========================================= */

interface SectionHeaderProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

function SectionHeader({
  icon: Icon,
  title,
  description,
}: SectionHeaderProps) {

  return (
    <div
      className="
        flex items-center
        gap-3
        border-b
        border-slate-100
        p-5
        sm:p-6
      "
    >

      <div
        className="
          flex h-10 w-10
          items-center justify-center
          rounded-xl
          bg-red-50
          text-red-600
        "
      >
        <Icon className="h-5 w-5" />
      </div>


      <div>

        <h2 className="font-black text-slate-900">
          {title}
        </h2>

        <p className="mt-0.5 text-xs text-slate-400">
          {description}
        </p>

      </div>

    </div>
  );
}


/* =========================================
   INFO ITEM
========================================= */

interface InfoItemProps {
  label: string;
  value: string;
  icon?: React.ElementType;
}

function InfoItem({
  label,
  value,
  icon: Icon,
}: InfoItemProps) {

  return (
    <div>

      <p
        className="
          text-[11px]
          font-bold
          uppercase
          tracking-wider
          text-slate-400
        "
      >
        {label}
      </p>


      <div className="mt-2 flex items-start gap-2">

        {Icon && (
          <Icon
            className="
              mt-0.5
              h-4 w-4
              shrink-0
              text-slate-400
            "
          />
        )}

        <p
          className="
            break-words
            text-sm
            font-semibold
            text-slate-800
          "
        >
          {value}
        </p>

      </div>

    </div>
  );
}


/* =========================================
   HISTORY ITEM
========================================= */

interface HistoryItemProps {
  title: string;
  description: string;
  date: string;
  active?: boolean;
}

function HistoryItem({
  title,
  description,
  date,
  active,
}: HistoryItemProps) {

  return (
    <div className="relative pb-7 pl-8 last:pb-0">

      {/* DOT */}

      <div
        className={`
          absolute
          -left-[7px]
          top-0
          h-3.5 w-3.5
          rounded-full
          border-2
          border-white

          ${
            active
              ? "bg-red-600 ring-4 ring-red-50"
              : "bg-slate-300"
          }
        `}
      />


      <p className="text-sm font-bold text-slate-900">
        {title}
      </p>

      <p className="mt-1 text-xs leading-5 text-slate-500">
        {description}
      </p>

      <p className="mt-2 text-[11px] font-medium text-slate-400">
        {date}
      </p>

    </div>
  );
}


/* =========================================
   ACTION BUTTON
========================================= */

interface ActionButtonProps {
  icon: React.ElementType;
  text: string;
  danger?: boolean;
}

function ActionButton({
  icon: Icon,
  text,
  danger,
}: ActionButtonProps) {

  return (
    <button
      type="button"
      className={`
        flex w-full
        items-center
        gap-3
        rounded-xl
        border
        px-3 py-3
        text-left
        text-sm
        font-semibold
        transition

        ${
          danger
            ? `
              border-red-100
              text-red-600
              hover:bg-red-50
            `
            : `
              border-slate-100
              text-slate-600
              hover:border-red-100
              hover:bg-red-50
              hover:text-red-600
            `
        }
      `}
    >

      <Icon className="h-4 w-4" />

      <span>{text}</span>

    </button>
  );
}
"use client";

import React from "react";
import GradientBtn from "./ui/GradientBtn";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const ApplicationForm = () => {
  const router = useRouter();
  const [role, setRole] = useState<any>(null);

  return (
    <main className="min-h-screen bg-gray-50 flex items-start justify-center p-4 md:p-8 overflow-x-hidden">

<section className="mt-8 md:mt-19 w-full max-w-5xl bg-white border shadow-lg rounded-2xl p-5 md:p-7 min-h-[600px]">

        <header className="mb-8 text-3xl">
          <div
            onClick={() => router.back()}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
          >
            <IoArrowBack className="text-xl" />
            <span>Back</span>
          </div>

          <h1 className="text-3xl md:text-4xl  text-gray-800 font-bold mt-4">
            Add Application
          </h1>
          <p className="text-gray-600 mt-2">
            Save application details to track your job journey
          </p>
        </header>

        <form className="space-y-6">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium  text-gray-700">Role</label>
              <input
                placeholder="Role"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Company Name
              </label>
              <input
                placeholder="Company Name"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>
            
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Applied
              </label>
              <input
                type="date"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">CV</label>
              <input
                placeholder="e.g. Frontend-CV-v3.pdf"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Job location
              </label>
              <input
                placeholder="Company Name"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Notes</label>
            <textarea
              rows={4}
              placeholder="Interview notes, recruiter feedback, follow-ups..."
              className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>

          {/* Status + Save */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="w-full md:w-1/2 space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Application Status
              </label>
              <select className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-400">
                <option>Applied</option>
                <option>In progress</option>
                <option>Rejected</option>
              </select>
            </div>

            <div className="w-full md:w-[320px]">
              <GradientBtn size="lg" title="Save application" />
            </div>
          </div>
        </form>
      </section>
    </main>
  );
};

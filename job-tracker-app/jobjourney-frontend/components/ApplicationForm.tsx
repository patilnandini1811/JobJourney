"use client";

import React, { useState } from "react";
import GradientBtn from "./ui/GradientBtn";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/navigation";

type FormState = {
  role: string;
  companyName: string;
  appliedDate: string; // YYYY-MM-DD
  cvVersion: string;
  jobLocation: string;
  description: string;
  status: "Applied" | "In progress" | "Rejected";
};

const initialState: FormState = {
  role: "",
  companyName: "",
  appliedDate: "",
  cvVersion: "",
  jobLocation: "",
  description: "",
  status: "Applied",
};

export const ApplicationForm = () => {
  const router = useRouter();

  const [form, setForm] = useState<FormState>(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const validate = () => {
    if (!form.companyName.trim()) return "Company Name is required.";
    if (!form.jobLocation.trim()) return "Job location is required.";
    if (!form.appliedDate) return "Applied date is required.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // These keys match your API route:
        body: JSON.stringify({
          role: form.role,
          companyName: form.companyName,
          jobLocation: form.jobLocation,
          status: form.status, // backend maps "In progress" -> "InProgress"
          appliedDate: form.appliedDate,
          description: form.description,
          cvVersion: form.cvVersion,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || data?.message || "Failed to create application");
      }

      setSuccess("Application saved successfully ✅");
      setForm(initialState);

      // optional: redirect after saving (change route if needed)
      router.push("/applications");
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

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

          <h1 className="text-3xl md:text-4xl text-gray-800 font-bold mt-4">
            Add Application
          </h1>
          <p className="text-black-600 mt-2 ">
            Save application details to track your job journey
          </p>
        </header>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-black-800">Role</label>
              <input
                value={form.role}
                onChange={(e) => update("role", e.target.value)}
                placeholder="Role"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-400  text-black"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Company Name <span className="text-red-500 ">*</span>
              </label>
              <input
                value={form.companyName}
                onChange={(e) => update("companyName", e.target.value)}
                placeholder="Company Name"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-400 text-black"
                required
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Applied <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={form.appliedDate}
                onChange={(e) => update("appliedDate", e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-400"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">CV</label>
              <input
                value={form.cvVersion}
                onChange={(e) => update("cvVersion", e.target.value)}
                placeholder="e.g. Frontend-CV-v3.pdf"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-700">
                Job location <span className="text-red-500">*</span>
              </label>
              <input
                value={form.jobLocation}
                onChange={(e) => update("jobLocation", e.target.value)}
                placeholder="Stockholm / Gothenburg / Remote"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-400"
                required
              />
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Notes</label>
            <textarea
              rows={4}
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
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
              <select
                value={form.status}
                onChange={(e) => update("status", e.target.value as FormState["status"])}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-400"
              >
                <option value="Applied">Applied</option>
                <option value="In progress">In progress</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            {/* Submit button */}
            <GradientBtn title="Submit" />
          </div>

          {/* Feedback messages */}
          {error ? (
            <p className="text-sm text-red-600">{error}</p>
          ) : null}

          {success ? (
            <p className="text-sm text-green-600">{success}</p>
          ) : null}
        </form>
      </section>
    </main>
  );
};
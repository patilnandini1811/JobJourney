import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="w-full bg-white ">
      <div className="mx-auto max-w-6xl px-6 pt-10 pb-16">
        <div className="grid grid-cols-1 items-start gap-14 md:grid-cols-2">
          <div className="pt-2">
            <p className="mt-3 text-lg font-bold tracking-widest text-gray-900">
              MEET JOBJOURNEY
            </p>

            <h1 className="mt-6 text-5xl font-extrabold leading-tight text-gray-900 md:text-6xl">
              Build a better <br />
              path to your next <br />
              job.
            </h1>

            <p className="mt-6 max-w-md text-lg font-semibold leading-relaxed text-gray-700">
              This app brings together every application, deadline, and update
              so you can manage your job search with clarity and confidence.
            </p>

            <div className="mt-10 flex items-center gap-4">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center bg-blue-600 px-10 py-4 text-lg font-semibold text-white hover:bg-blue-700"
              >
                Buy Now
              </Link>

              <button
                aria-label="Open"
                className="inline-flex h-14 w-14 items-center justify-center border border-gray-400 text-xl text-gray-700 hover:bg-gray-50"
              >
                ↗
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative flex justify-end md:pt-4">
            <Image
              src="/Task-Graphic.svg"
              alt="Task graphic"
              width={520}
              height={620}
              className="h-auto w-[420px] md:w-[520px]"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

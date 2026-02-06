"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import GradientBtn from "./ui/GradientBtn";

export default function Navbar() {
  return (
    <header className="w-full bg-white ">
      <div className="mx-auto flex max-w-1/2 items- justify-between px-6 py-4">
        {/* left */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/jobjourney2.png"
            alt="JobJourney"
            width={240}
            height={140}
          />
        </Link>

        {/* right */}
        <div className="flex items-center gap-4">
          {/* Login: gradient ONLY on hover */}
          <GradientBtn
            title="Login"
            link="/login"
            size="sm"
            variant="ghost"
            className="text-xl font-extrabold text-blue-800 tracking-normal"
          />

          <GradientBtn
            title="Sign Up"
            link="/register"
            size="sm"
            variant="ghost"
            className="text-xl font-extrabold text-blue-800 tracking-normal"
          />
        </div>
      </div>
    </header>
  );
}

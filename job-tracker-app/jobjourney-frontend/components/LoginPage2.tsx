"use client";

import GradientBtn from "./ui/GradientBtn";
import { AiFillCloseSquare } from "react-icons/ai";
import { loginUser } from "@/lib/api/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage2 = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      //CALL LOGIN API
      const data = await loginUser(email, password);
      //REDIRECT USER TO /USER/:ID
      router.push(`/user/${data.user.id}`);
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-sky-400 flex items-start justify-center">
      <div className="bg-white relative min-w-[320px]  p-8 mt-12 shadow-lg w-4/5 md:w-1/2 lg:w-1/4 ">
        <span className="absolute -top-[4px] -right-[4px] text-4xl hover:cursor-pointer hover:text-red-600">
          <a href="/">
            <AiFillCloseSquare />
          </a>
        </span>
        <h2 className="font-bold text-3xl text-center mb-12">Login</h2>
        <form className="w-[270px] mx-auto" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-8 w-full max-w-sm">
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border-b-1 border-gray-400
           focus:outline-none focus:ring-2 focus:ring-sky-400
           placeholder:text-gray-400"
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border-b-1 border-gray-400
           focus:outline-none focus:ring-2 focus:ring-sky-400
           placeholder:text-gray-400"
            />
            <label className="flex items-center gap-2 mb-4 cursor-pointer select-none">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-400 text-sky-500
           focus:ring-sky-400 focus:ring-2"
              />
              <span className="text-gray-400">Remember me?</span>
            </label>
            {error && <p className="text-red-500">{error}</p>}
            <GradientBtn size="lg" title="Login" />
          </div>
        </form>
        <p className="font-semibold text-sm mt-8 text-center text-gray-400">
          Forgot{" "}
          <a href="#" className="text-blue-500 hover:text-blue-700">
            Password?
          </a>
        </p>
        <p className="font-semibold text-sm mt-2 text-center text-gray-400">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500 hover:text-blue-700">
            Sign-Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage2;

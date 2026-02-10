"use client";

import GradientBtn from "./ui/GradientBtn";
import Spacer from "./ui/Spacer";
import { AiFillCloseSquare } from "react-icons/ai";
import { useState } from "react";
import { registerUser } from "@/lib/api/auth"; 

const Register = () => {
  const [username, setUsername] = useState(""); 
  const [email, setEmail] = useState("");       
  const [password, setPassword] = useState(""); 
  const [agree, setAgree] = useState(false);    
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!agree) {
      setError("Please agree to Terms of Service");
      return;
    }

    try {
      // ✅ CALL REGISTER API
      await registerUser(username, email, password);
      console.log("Register user Successfully!")
      window.location.href = "/login"; // or "/" if you prefer
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div className="min-h-screen inter.className bg-gradient-to-b from-blue-500 to-sky-400 flex items-center justify-center">
      <span className="hidden md:block text-white md:text-6xl lg:text-7xl xl:text-8xl w-1/3 tracking-wide">
        Build a better path to your next job.
      </span>

      <Spacer width="w-[84px] hidden md:block" height="h-[50px]" />

      <div className="bg-white relative p-8 -mt-12 shadow-lg min-w-[320px] w-4/5 md:w-1/2 lg:w-1/4 ">
        <span className="absolute -top-[4px] -right-[4px] text-4xl hover:cursor-pointer hover:text-red-600">
          <a href="/">
            <AiFillCloseSquare />
          </a>
        </span>

        <h2 className="font-bold text-3xl text-center mb-12">Register</h2>

        <form className="w-[270px] mx-auto" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 w-full max-w-sm">
            <input
              type="text"
              placeholder="* username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border-b-1 border-gray-400 text-black
              focus:outline-none focus:ring-2 focus:ring-sky-400
              placeholder:text-gray-400"
            />

            <input
              type="email"
              placeholder="* email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border-b-1 border-gray-400  text-black
              focus:outline-none focus:ring-2 focus:ring-sky-400
              placeholder:text-gray-400"
            />

            <input
              type="password"
              placeholder="* password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border-b-1 border-gray-400  text-black
              focus:outline-none focus:ring-2 focus:ring-sky-400
              placeholder:text-gray-400"
            />

            <label className="flex items-center gap-2 mb-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="h-4 w-4 rounded border-gray-400 text-sky-500
                focus:ring-sky-400 focus:ring-2"
              />
              <span className="text-gray-400">Agree to</span>
              <span className="text-blue-500">Terms.of.Service</span>
            </label>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <GradientBtn size="lg" title="Register" />
          </div>
        </form>

        <p className="font-semibold text-sm mt-8 text-center text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:text-blue-700">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;

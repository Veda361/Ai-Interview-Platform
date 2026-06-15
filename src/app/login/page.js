"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

import { Brain, Mail, Lock, ArrowRight, UserPlus } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };
  const robots = ["/robo.png", "/robo1.png", "/robo2.png"];

  const [currentRobot, setCurrentRobot] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRobot((prev) => (prev + 1) % robots.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF8E7] overflow-hidden relative">
      {/* Background Shapes */}
      <div className="absolute top-10 left-10 w-28 h-28 bg-[#e5f9e9] border-4 border-black rotate-12 opacity-20 hidden lg:block animate-pulse" />

      <div className="absolute bottom-10 right-10 w-36 h-36 bg-[#06D6A0] border-4 border-black -rotate-12 opacity-20 hidden lg:block animate-pulse" />

      <div className="absolute top-32 right-32 w-24 h-24 bg-[#FB5607] border-4 border-black rotate-45 opacity-20 hidden lg:block animate-bounce" />

      <div className="max-w-7xl mx-auto min-h-screen grid lg:grid-cols-2 gap-10 items-center px-6">
        {/* LEFT SIDE */}
        <div className="hidden lg:flex flex-col">
          <h1
            className="
            text-6xl
            font-black
            uppercase
            leading-none
            mt-6
            text-black
          "
          >
            Ace Every
            <br />
            Interview
          </h1>

          <h2
            className="
            text-[#FB5607]
            text-4xl
            font-black
            mt-6
          "
          >
            Learn • Practice • Get Hired
          </h2>

          <p className="mt-8 text-xl text-gray-700 max-w-xl leading-9">
            Practice real interview questions, improve communication skills,
            receive AI-powered feedback, and build confidence for your dream
            job.
          </p>

          {/* Robot */}
          <div className="relative mt-8 flex justify-center">
            <div
              className="
              absolute
              inset-0
              bg-[#3A86FF]
              blur-[120px]
              opacity-20
              scale-125
            "
            />

            <div className="relative z-10 ">
              <div
                className="
      w-[369px]
      bg-[#252525]
      rounded-lg
      shadow-[0_8px_25px_rgba(0,0,0,0.4)]
      p-3
      border-2
      border-black
    "
              >
                {/* Top Screws */}
                <div className="flex justify-between">
                  <div className="w-3 h-3 rounded-full bg-gray-300 border border-black" />
                  <div className="w-3 h-3 rounded-full bg-gray-300 border border-black" />
                </div>

                {/* Robot Screen */}
                <div
                  className="
        mt-2
        bg-[#FFFDD0]
        rounded-md
        overflow-hidden
        border-2
        border-black
        relative
      "
                >
                  <img
                    src={robots[currentRobot]}
                    alt="AI Robot"
                    className="
          w-full
          h-[220px]
          object-contain
          p-3
          transition-all
          duration-700
        "
                  />

                  {/* Scan Effect */}
                  <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_3px,rgba(0,0,0,0.05)_4px)] pointer-events-none" />
                </div>

                {/* Cassette Wheels */}
                <div className="bg-yellow-500 h-[60px] flex items-center justify-center mt-2">
                  <div className="bg-[#171717] rounded-full px-4 py-2 flex items-center gap-8">
                    <div className="w-8 h-8 rounded-full border-2 border-dashed border-white shadow-[0_0_0_4px_white]" />

                    <div className="text-white font-black">AI</div>

                    <div className="w-8 h-8 rounded-full border-2 border-dashed border-white shadow-[0_0_0_4px_white]" />
                  </div>
                </div>

                {/* Bottom Strip */}
                <div className="bg-[#F15A25] h-5 flex items-center justify-center text-[10px] font-bold text-white">
                  AI COMMAND CENTER
                </div>

                {/* Bottom Screws */}
                <div className="flex justify-between mt-2">
                  <div className="w-3 h-3 rounded-full bg-gray-300 border border-black" />
                  <div className="w-3 h-3 rounded-full bg-gray-300 border border-black" />
                </div>
              </div>
            </div>

            {/* Hologram Line */}
            <div className="absolute bottom-0 w-[300px]">
              <div className="h-[6px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-md" />
              <div className="h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
            </div>
          </div>
        </div>

        {/* LOGIN CARD */}
        <div className="flex justify-center">
          <div
            className="
            w-full
            max-w-md
            bg-white
            border-4
            border-black
            p-8
            shadow-[14px_14px_0px_#000]
          "
          >
            {/* Logo */}
            <div className="flex items-center gap-4 mb-8">
              <div
                className="
                w-16
                h-16
                bg-[#3A86FF]
                text-white
                flex
                items-center
                justify-center
                border-4
                border-black
              "
              >
                <Brain size={30} />
              </div>

              <div>
                <h2 className="text-2xl font-black uppercase text-black">
                  AI Interview
                </h2>

                <p className="text-gray-600 font-medium">
                  Practice • Learn • Get Hired
                </p>
              </div>
            </div>

            {/* Heading */}
            <h1 className="text-5xl font-black uppercase text-black">
              Welcome Back
            </h1>

            <p className="mt-3 text-gray-700 font-medium">
              Login to continue your AI interview journey.
            </p>

            <div className="h-1 bg-black my-6" />

            {/* Email */}
            <div className="relative mb-5">
              <Mail
                size={20}
                className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-[#3A86FF]
              "
              />

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
                w-full
                border-4
                border-black
                bg-[#F8FAFC]
                pl-12
                pr-4
                py-4
                text-black
                font-semibold
                placeholder:text-gray-500
                outline-none
                focus:shadow-[6px_6px_0px_#000]
                transition-all
              "
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock
                size={20}
                className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-[#FB5607]
              "
              />

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="
                w-full
                border-4
                border-black
                bg-[#F8FAFC]
                pl-12
                pr-4
                py-4
                text-black
                font-semibold
                placeholder:text-gray-500
                outline-none
                focus:shadow-[6px_6px_0px_#000]
                transition-all
              "
              />
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              className="
              mt-8
              w-full
              bg-[#06D6A0]
              text-black
              border-4
              border-black
              py-4
              font-black
              uppercase
              flex
              items-center
              justify-center
              gap-2
              shadow-[8px_8px_0px_#000]
              hover:-translate-x-1
              hover:-translate-y-1
              hover:shadow-[12px_12px_0px_#000]
              transition-all
            "
            >
              Login
              <ArrowRight size={20} />
            </button>

            {/* Register */}
            <div className="mt-8 text-center">
              <p className="text-gray-700 font-medium mb-4">
                Don't have an account?
              </p>

              <Link
                href="/register"
                className="
                inline-flex
                items-center
                gap-2
                bg-[#FFB703]
                border-4
                border-black
                px-6
                py-3
                font-black
                text-black
                shadow-[6px_6px_0px_#000]
                hover:-translate-x-1
                hover:-translate-y-1
                transition-all
              "
              >
                <UserPlus size={18} />
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

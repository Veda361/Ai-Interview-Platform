"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";

export default function Home() {
  const { user } = useAuth();
  const words = [
  "DREAM",
  "BUILD",
  "CREATE",
  "LEARN",
  "GROW",
  "INSPIRE",
  "CODE",
];

const [currentWord, setCurrentWord] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentWord((prev) => (prev + 1) % words.length);
  }, 2000);

  return () => clearInterval(interval);
}, []);

  return (
    <div className="max-h-full bg-[#FFF8E7] overflow-hidden relative">

      {/* Background Decorations */}

      <div className="absolute top-20 right-10 w-72 h-72 bg-[#3A86FF] border-4 border-black rounded-full opacity-20" />

      <div className="absolute bottom-20 left-10 w-52 h-52 bg-[#FB5607] border-4 border-black rotate-12 opacity-20" />

      <div className="absolute top-1/2 right-32 -translate-y-1/2 hidden lg:block">

        <div className="relative w-[500px] h-[500px]">

  {/* Center Circle */}

  <div
    className="
    absolute
    top-1/2
    left-1/2
    -translate-x-1/2
    -translate-y-1/2
    w-36
    h-36
    rounded-full
    bg-white
    border-4
    border-black
    shadow-[6px_6px_0px_#000]
    flex
    flex-col
    items-center
    justify-center
    text-center
    z-50
    "
  >
    <h2
  className="
  text-3xl
  font-black
  text-[#FB5607]
  transition-all
  duration-500
  animate-bounce
  "
>
  {words[currentWord]}
</h2>
    <p className="text-xs font-bold text-black">
      BUILD • LEARN • GROW
    </p>
  </div>

  {/* Main Orbit */}

  <div className="absolute inset-0 animate-[spin_40s_linear_infinite]">

    <div className="absolute text-black top-0 left-1/2 -translate-x-1/2 w-28 h-36 bg-[#A8DADC] border-4 border-black shadow-[4px_4px_0px_#000] flex flex-col items-center justify-center text-center p-2">
      <h3 className="text-lg font-black">BUILD</h3>
      <p className="text-[10px] font-semibold">Turn Ideas Into Reality</p>
    </div>

    <div className="absolute top-20 right-0 w-28 h-36 bg-[#93cf32] border-4 text-black border-black shadow-[4px_4px_0px_#000] flex flex-col items-center justify-center text-center p-2">
      <h3 className="text-lg font-black">LEARN</h3>
      <p className="text-[10px] font-semibold">Knowledge Compounds</p>
    </div>

    <div className="absolute bottom-0 right-20 w-28 h-36 bg-[#643380] text-black border-4 border-black shadow-[4px_4px_0px_#000] flex flex-col items-center justify-center text-center p-2">
      <h3 className="text-lg font-black">CODE</h3>
      <p className="text-[12px] font-semibold">Create The Future</p>
    </div>

    <div className="absolute bottom-0 left-20 w-28 h-36 bg-[#1c5059] border-4 text-black border-black shadow-[4px_4px_0px_#000] flex flex-col items-center justify-center text-center p-2">
      <h3 className="text-lg font-black">DEBUG</h3>
      <p className="text-[10px] font-semibold">Learn From Errors</p>
    </div>

    <div className="absolute top-20 left-0 w-28 h-36 bg-[#895515] border-4 text-black border-black shadow-[4px_4px_0px_#000] flex flex-col items-center justify-center text-center p-2">
      <h3 className="text-lg font-black">SHIP</h3>
      <p className="text-[10px] font-semibold">Execution Wins</p>
    </div>

  </div>

  {/* Reverse Orbit */}

  <div className="absolute inset-0 animate-[spin_60s_linear_infinite_reverse]">

    <div className="absolute top-14 left-14 w-20 h-24 bg-[#f28225] border-4 border-black shadow-[3px_3px_0px_#000] flex items-center justify-center">
      <span className="font-black text-xs">AI</span>
    </div>

    <div className="absolute top-14 right-14 w-20 h-24 bg-[#F72585] border-4 border-black shadow-[3px_3px_0px_#000] flex items-center justify-center">
      <span className="font-black text-xs">TECH</span>
    </div>

    <div className="absolute bottom-14 right-14 w-20 h-24 bg-[#a32323] border-4 border-black shadow-[3px_3px_0px_#000] flex items-center justify-center">
      <span className="font-black text-xs">GROW</span>
    </div>

    <div className="absolute bottom-14 left-14 w-20 h-24 bg-[#14B8A6]  border-4 border-black shadow-[3px_3px_0px_#000] flex items-center justify-center">
      <span className="font-black text-xs">SUCCESS</span>
    </div>

  </div>

</div>
        

      </div>
    

      <div className="relative z-10 max-w-7xl mx-auto px-6 min-h-screen flex items-center">

        <div className="grid lg:grid-cols-2 gap-16 items-center w-full">

          {/* Left Content */}

          <div>

            <div
              className="
              inline-block
              bg-[#3A86FF]
              text-white
              border-2
              border-black
              px-4
              py-2
              font-black
              uppercase
              tracking-widest
              mb-6
              "
            >
              AI Powered Career Preparation
            </div>

            <h1
              className="
              text-xl
              md:text-5xl
              font-black
              uppercase
              leading-none
              tracking-tight
              text-black
              "
            >
              Crack Your
              <br />
              Next
              <span className="text-[#FB5607]">
                {" "}
                Interview
              </span>
            </h1>

            <p
              className="
              mt-8
              text-xl
              leading-9
              text-gray-700
              max-w-2xl
              font-medium
              "
            >
              Practice with AI-generated interview questions,
              receive instant feedback, analyze strengths and
              weaknesses, and prepare confidently for your dream job.
            </p>

            {/* Stats */}

            <div className="grid grid-cols-3 gap-4 mt-10">

              <div className="bg-[#FFB703] border-4 border-black p-4 shadow-[6px_6px_0px_#000]">
                <h3 className="text-3xl font-black">
                  AI
                </h3>
                <p className="font-bold">
                  Questions
                </p>
              </div>

              <div className="bg-[#06D6A0] border-4 border-black p-4 shadow-[6px_6px_0px_#000]">
                <h3 className="text-3xl font-black">
                  10+
                </h3>
                <p className="font-bold">
                  Categories
                </p>
              </div>

              <div className="bg-[#FB5607] border-4 border-black p-4 shadow-[6px_6px_0px_#000] text-white">
                <h3 className="text-3xl font-black">
                  Instant
                </h3>
                <p className="font-bold">
                  Feedback
                </p>
              </div>

            </div>

            {/* Buttons */}

            {!user ? (
              <div className="flex flex-wrap gap-5 mt-10">

                <Link href="/login">
                  <button
                    className="
                    bg-[#3A86FF]
                    text-white
                    border-4
                    border-black
                    px-8
                    py-4
                    font-black
                    uppercase
                    shadow-[8px_8px_0px_#000]
                    hover:-translate-x-1
                    hover:-translate-y-1
                    hover:shadow-[12px_12px_0px_#000]
                    transition-all
                    "
                  >
                    Login
                  </button>
                </Link>

                <Link href="/register">
                  <button
                    className="
                    bg-[#FFB703]
                    text-black
                    border-4
                    border-black
                    px-8
                    py-4
                    font-black
                    uppercase
                    shadow-[8px_8px_0px_#000]
                    hover:-translate-x-1
                    hover:-translate-y-1
                    hover:shadow-[12px_12px_0px_#000]
                    transition-all
                    "
                  >
                    Register
                  </button>
                </Link>

              </div>
            ) : (
              <div className="mt-10">

                <Link href="/dashboard">
                  <button
                    className="
                    bg-[#06D6A0]
                    text-black
                    border-4
                    border-black
                    px-10
                    py-4
                    font-black
                    uppercase
                    shadow-[8px_8px_0px_#000]
                    hover:-translate-x-1
                    hover:-translate-y-1
                    hover:shadow-[12px_12px_0px_#000]
                    transition-all
                    
                    "
                  >
                    Go To Dashboard
                  </button>
                </Link>

              </div>
            )}

          </div>

          {/* Right Side Hidden on Mobile */}
          <div className="hidden lg:block" />
          

        </div>

      </div>

    </div>
  );
}
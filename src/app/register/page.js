"use client";

import React, { useState } from "react";
import Link from "next/link";
import { auth } from "@/lib/firebase";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { Brain, User, Mail, Lock, UserPlus, ArrowRight } from "lucide-react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      await updateProfile(userCredentials.user, {
        displayName: name,
      });

      alert("Account Created Successfully");
    } catch (err) {
      alert(err.message);
    }
  };

  //stars

  const floatingShapes = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: `${12 + Math.random() * 15}px`,
    rotation: `${Math.random() * 360}deg`,
    color: [
      "#FFB703",
      "#FB5607",
      "#06D6A0",
      "#3A86FF",
      "#8338EC",
      "#FF006E",
      "#8EECF5",
      "#FFD166",
      "#EF476F",
      "#118AB2",
      "#F4A261",
      "#E9C46A",
      "#2A9D8F",
      "#E76F51",
      "#CDB4DB",
      "#FFC8DD",
      "#BDE0FE",
      "#A2D2FF",
    ][Math.floor(Math.random() * 18)],
    animation: Math.random() > 0.5 ? "animate-pulse" : "animate-bounce",
  }));

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Nebula Background */}
      <div
        className="absolute inset-0 bg-cover bg-center animate-nebula"
        style={{
          backgroundImage: "url('/nebula2.png')",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Floating Brutalist Shapes */}

      {floatingShapes.map((shape) => (
        <div
          key={shape.id}
          className={`
      absolute
      border-2
      border-black
      opacity-20
      hidden
      md:block
      ${shape.animation}
    `}
          style={{
            top: shape.top,
            left: shape.left,
            width: shape.size,
            height: shape.size,
            backgroundColor: shape.color,
            transform: `rotate(${shape.rotation})`,
          }}
        />
      ))}
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-10">
        <div
          className="
          w-full
          max-w-md
          bg-[#FFF8E7]
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
              border-4
              border-black
              flex
              items-center
              justify-center
            "
            >
              <Brain size={30} />
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-black">
                AI Interview
              </h2>

              <p className="text-gray-700 font-medium">Create Your Future</p>
            </div>
          </div>

          {/* Heading */}
          <h1
            className="
            text-5xl
            font-black
            uppercase
            text-black
            leading-none
          "
          >
            Register
          </h1>

          <p className="mt-3 text-gray-700 font-medium">
            Create your account and start preparing with AI.
          </p>

          <div className="h-1 bg-black my-6"></div>

          {/* Full Name */}
          <div className="relative mb-4">
            <User
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
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="
              w-full
              border-4
              border-black
              bg-white
              pl-12
              pr-4
              py-4
              text-black
              font-semibold
              placeholder:text-gray-500
              outline-none

              focus:-translate-x-1
              focus:-translate-y-1
              focus:shadow-[6px_6px_0px_#000]

              transition-all
            "
            />
          </div>

          {/* Email */}
          <div className="relative mb-4">
            <Mail
              size={20}
              className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-[#06D6A0]
            "
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
              w-full
              border-4
              border-black
              bg-white
              pl-12
              pr-4
              py-4
              text-black
              font-semibold
              placeholder:text-gray-500
              outline-none

              focus:-translate-x-1
              focus:-translate-y-1
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
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
              w-full
              border-4
              border-black
              bg-white
              pl-12
              pr-4
              py-4
              text-black
              font-semibold
              placeholder:text-gray-500
              outline-none

              focus:-translate-x-1
              focus:-translate-y-1
              focus:shadow-[6px_6px_0px_#000]

              transition-all
            "
            />
          </div>

          {/* Register Button */}
          <button
            onClick={handleRegister}
            className="
            mt-6
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
            Register
            <ArrowRight size={18} />
          </button>

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-700 font-medium">
              Already have an account?
            </p>

            <Link
              href="/login"
              className="
              mt-4
              inline-flex
              items-center
              gap-2

              bg-[#FFB703]

              border-4
              border-black

              px-5
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
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import {
  Brain,
  Briefcase,
  Award,
  BarChart3,
  Sparkles,
  Play,
} from "lucide-react";

export default function Interview() {
  const router = useRouter();

  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const [questions, setQuestions] = useState("");
  const [loading, setLoading] = useState(false);
  const words = ["IMPROVE", "PRACTICE", "LEARN", "EXCEL", "MASTER", "ACHIEVE"];

  const [currentWord, setCurrentWord] = useState(0);

  const generateQuestions = async () => {
    if (!role || !experience || !difficulty) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role,
          experience,
          difficulty,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to generate questions");
      }

      setQuestions(data.questions);

      const questionArray = data.questions
        .split("\n")
        .filter((q) => q.trim() !== "");

      localStorage.setItem("interviewQuestions", JSON.stringify(questionArray));

      alert("Questions Generated Successfully!");
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const startInterview = () => {
    const storedQuestions = localStorage.getItem("interviewQuestions");

    if (!storedQuestions) {
      alert("Please generate questions first before starting interview.");
      return;
    }

    router.push("/mock-interview");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF8E7] overflow-hidden relative">
      {/* Background Elements */}

      <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-[#8338EC] border-4 border-black opacity-20 hidden lg:block" />

      <div className="absolute top-40 right-20 w-24 h-24 rotate-45 bg-[#06D6A0] border-4 border-black opacity-20 hidden lg:block" />

      <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-[#FF006E] border-4 border-black opacity-20 hidden lg:block" />

      <div className="max-w-7xl mx-auto p-6">
        {/* HERO */}

        <div
          className="
        bg-white
        border-4
        border-black
        shadow-[14px_14px_0px_#000]
        p-8
        md:p-12
        mb-10
        "
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* LEFT */}

            <div>
              <span
                className="
              bg-[#3A86FF]
              text-white
              border-2
              border-black
              px-4
              py-2
              font-black
              uppercase
              tracking-widest
              "
              >
                AI INTERVIEW STUDIO
              </span>
              <h1
                className="
  text-6xl
  md:text-6xl
  font-black
  uppercase
  leading-none
  mt-6
  text-black
  "
              >
                PREPARE
                <br />
                <span
                  className="
    text-[#FB5607]
    inline-block
    transition-all
    duration-500
    "
                >
                  {words[currentWord]}
                </span>
                <br />
                SUCCEED
              </h1>

              <p className="mt-6 font-black text-lg leading-8 text-gray-700 max-w-xl">
                Generate personalized interview questions, practice with AI, and
                improve your skills before real interviews.
              </p>
            </div>

            {/* RIGHT */}

            <div className="flex justify-center">
              <div className="relative">
                <div
                  className="
                absolute
                inset-0
                blur-3xl
                opacity-30
                bg-[#8338EC]
                scale-125
                "
                />

                <div
                  className="
  bg-[#F5F5F0]
  border-[5px]
  border-black
  shadow-[8px_8px_0px_#000]
  w-[340px]
  overflow-hidden
  "
                >
                  {/* Header */}

                  <div
                    className="
    h-[120px]
    bg-[#FFB703]
    border-b-[5px]
    border-black
    relative
    flex
    items-end
    "
                  >
                    <div
                      className="
      absolute
      inset-0
      bg-[repeating-linear-gradient(45deg,transparent_0px,transparent_8px,rgba(0,0,0,0.12)_8px,rgba(0,0,0,0.12)_10px)]
      "
                    />

                    <span
                      className="
      absolute
      right-2
      bottom-[-12px]
      text-[5rem]
      font-black
      opacity-10
      "
                    >
                      AI
                    </span>

                    <div
                      className="
      w-[60px]
      h-[60px]
      bg-black
      text-[#FFB703]
      flex
      items-center
      justify-center
      text-2xl
      font-black
      z-10
      "
                    >
                      🤖
                    </div>

                    <div
                      className="
      absolute
      top-3
      right-3
      bg-[#06D6A0]
      border-[3px]
      border-black
      px-2
      py-1
      text-[9px]
      font-black
      uppercase
      shadow-[2px_2px_0px_#000]
      "
                    >
                      Ready
                    </div>
                  </div>

                  {/* Body */}

                  <div className="p-4">
                    <p className="text-[10px] uppercase tracking-[3px] font-bold text-gray-500">
                      AI INTERVIEW
                    </p>

                    <h2 className="text-3xl font-black leading-none mt-2 text-black">
                      {role ? role.toUpperCase() : "SELECT ROLE"}
                    </h2>

                    <p
                      className="
      mt-3
      border-l-4
      border-[#FB5607]
      pl-3
      text-xs
      leading-5
      text-black
      "
                    >
                      Generate personalized interview questions and prepare
                      smarter.
                    </p>
                  </div>

                  {/* Stats */}

                  <div className="grid grid-cols-3 border-t-[3px] border-black">
                    <div className="text-center p-2 border-r-[3px] border-black">
                      <span className="block text-2xl font-black">
                        {role ? "✓" : "0"}
                      </span>

                      <span className="text-[9px] uppercase font-bold">
                        Role
                      </span>
                    </div>

                    <div className="text-center p-2 border-r-[3px] border-black">
                      <span className="block text-2xl font-black">
                        {experience ? "✓" : "0"}
                      </span>

                      <span className="text-[9px] uppercase font-bold">
                        Exp
                      </span>
                    </div>

                    <div className="text-center p-2">
                      <span className="block text-2xl font-black">
                        {difficulty ? "✓" : "0"}
                      </span>

                      <span className="text-[9px] uppercase font-bold">
                        Level
                      </span>
                    </div>
                  </div>

                  {/* Footer */}

                  <div
                    className="
    bg-black
    text-[#FFB703]
    text-center
    py-3
    font-black
    uppercase
    tracking-[3px]
    text-sm
    "
                  >
                    AI READY
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CONFIGURATION */}

        <div className="grid lg:grid-cols-4 gap-6 mb-10">
          {/* ROLE */}

          <div
            className="
          bg-[#DBEAFE]
          border-4
          border-black
          p-5
          shadow-[8px_8px_0px_#000]
          "
          >
            <h3 className="font-black uppercase mb-4 text-black">Job Role</h3>

            <div className="relative">
              <Briefcase
                size={18}
                className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-black
              "
              />

              <input
                type="text"
                placeholder="Frontend Developer"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="
              w-full
              bg-white
              border-4
              border-black
              pl-11
              pr-4
              py-3
              font-semibold
              text-black
              "
              />
            </div>
          </div>

          {/* EXPERIENCE */}

          <div
            className="
          bg-[#D8F3DC]
          border-4
          border-black
          p-5
          shadow-[8px_8px_0px_#000]
          "
          >
            <h3 className="font-black uppercase mb-4 text-black">Experience</h3>

            <div className="relative">
              <BarChart3
                size={18}
                className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-black
              "
              />

              <input
                type="text"
                placeholder="Fresher"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="
              w-full
              bg-white
              border-4
              border-black
              pl-11
              pr-4
              py-3
              font-semibold
              text-black
              "
              />
            </div>
          </div>

          {/* DIFFICULTY */}

          <div
            className="
          bg-[#FFE8D6]
          border-4
          border-black
          p-5
          shadow-[8px_8px_0px_#000]
          "
          >
            <h3 className="font-black uppercase mb-4 text-black">Difficulty</h3>

            <div className="relative">
              <Award
                size={18}
                className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-black
              "
              />

              <input
                type="text"
                placeholder="Medium"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="
              w-full
              bg-white
              border-4
              border-black
              pl-11
              pr-4
              py-3
              font-semibold
              text-black
              "
              />
            </div>
          </div>

          {/* LIVE PREVIEW */}

          <div
            className="
          bg-white
          border-4
          border-black
          p-5
          shadow-[8px_8px_0px_#000]
          "
          >
            <h3 className="font-bold uppercase mb-4 text-black">AI Preview</h3>

            <div className="space-y-2 text-sm font-bold text-black">
              <p className="text-black">Role: {role || "Not Selected"}</p>

              <p>Experience: {experience || "Not Selected"}</p>

              <p>Difficulty: {difficulty || "Not Selected"}</p>
            </div>
          </div>
        </div>

        {/* ACTION BUTTONS */}

        <div className="flex flex-wrap gap-4 mb-10">
          <button
            onClick={generateQuestions}
            disabled={loading}
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
            <div className="flex items-center gap-2">
              <Sparkles size={18} />
              {loading ? "Generating..." : "Practice Questions"}
            </div>
          </button>

          <button
            onClick={startInterview}
            className="
          bg-[#06D6A0]
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
            <div className="flex items-center gap-2">
              <Play size={18} />
              Start Interview
            </div>
          </button>
        </div>

        {/* QUESTIONS */}

        {questions && (
          <div
            className="
          bg-black
          text-white
          border-4
          border-black
          p-8
          shadow-[14px_14px_0px_#FB5607]
          "
          >
            <h2 className="text-4xl font-black uppercase mb-6">
              Generated Questions
            </h2>

            <div
              className="
            whitespace-pre-wrap
            leading-9
            text-lg
            "
            >
              {questions}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

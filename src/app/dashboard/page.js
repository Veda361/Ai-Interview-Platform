"use client";

import ProtectedRoute from "@/component/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Brain,
  User,
  Mail,
  Trophy,
  Flame,
  FileText,
  LogOut,
  Play,
} from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalInterviews: 0,
    completedInterviews: 0,
    averageScore: 0,
    streak: 0,
  });

  const [evaluation, setEvaluation] = useState(null);

  useEffect(() => {
    const storedStats = localStorage.getItem("dashboardStats");

    if (storedStats) {
      setStats(JSON.parse(storedStats));
    }

    const storedEvaluation = localStorage.getItem("evaluation");

    if (storedEvaluation) {
      setEvaluation(JSON.parse(storedEvaluation));
    }
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);

      localStorage.removeItem("interviewQuestions");
      localStorage.removeItem("interviewAnswers");

      router.push("/login");
    } catch (err) {
      alert(err.message);
    }
  };

  let strongestSkill = "N/A";
  let weakestSkill = "N/A";

  if (evaluation) {
    const skills = [
      {
        name: "Communication",
        value: evaluation.communication || 0,
      },
      {
        name: "Technical",
        value: evaluation.technicalKnowledge || 0,
      },
      {
        name: "Problem Solving",
        value: evaluation.problemSolving || 0,
      },
    ];

    skills.sort((a, b) => b.value - a.value);

    strongestSkill = skills[0].name;
    weakestSkill = skills[skills.length - 1].name;
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#FFF8E7] p-6 overflow-hidden relative">
        {/* Background Decorations */}

        <div className="absolute top-10 left-10 w-28 h-28 bg-[#FFB703] border-4 border-black rotate-12 opacity-20 hidden lg:block" />

        <div className="absolute bottom-10 right-10 w-36 h-36 bg-[#06D6A0] border-4 border-black -rotate-12 opacity-20 hidden lg:block" />

        <div className="absolute top-32 right-32 w-24 h-24 bg-[#FB5607] border-4 border-black rotate-45 opacity-20 hidden lg:block" />

        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}

          <div
            className="
          bg-white
          border-4
          border-black
          p-8
          shadow-[12px_12px_0px_#000]
          mb-10
          "
          >
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              {/* Left Side */}

              <div>
                <span
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
                "
                >
                  AI Command Center
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
                  Dashboard
                </h1>

                <h2
                  className="
                text-[#FB5607]
                text-3xl
                md:text-4xl
                font-black
                mt-4
                "
                >
                  Welcome Back,
                  <br />
                  {(user?.displayName || "User").toUpperCase()}
                </h2>

                <p className="mt-6 text-lg text-gray-700 leading-8 max-w-xl">
                  Practice interviews, improve communication, and receive
                  AI-powered feedback to prepare for your dream role.
                </p>
              </div>

              {/* Right Side */}

              <div className="hidden lg:flex justify-center">
                <div className="relative">
                  <div
                    className="
                  absolute
                  inset-0
                  bg-[#3A86FF]
                  blur-3xl
                  opacity-20
                  scale-125
                  "
                  />
                  <div className="hidden lg:flex justify-center items-center">
                    <div className="relative w-[380px] h-[260px]">
                      {/* Card 1 */}
                      <div
                        className="
      absolute
      w-[170px]
      h-[220px]
      rounded-2xl
      bg-gradient-to-br
      from-yellow-200
      via-orange-400
      to-amber-700
      p-1
      shadow-2xl
      animate-card1
      "
                      >
                        <div className="w-full h-full rounded-xl bg-white/20 backdrop-blur-md overflow-hidden">
                          <img
                            src="/robo.png"
                            alt="Robot"
                            className="w-full h-full object-contain p-3"
                          />
                        </div>
                      </div>

                      {/* Card 2 */}
                      <div
                        className="
      absolute
      w-[170px]
      h-[220px]
      rounded-2xl
      bg-gradient-to-br
      from-cyan-200
      via-blue-500
      to-blue-900
      p-1
      shadow-2xl
      animate-card2
      "
                      >
                        <div className="w-full h-full rounded-xl bg-white/20 backdrop-blur-md overflow-hidden">
                          <img
                            src="/robo1.png"
                            alt="Robot"
                            className="w-full h-full object-contain p-3"
                          />
                        </div>
                      </div>

                      {/* Card 3 */}
                      <div
                        className="
      absolute
      w-[170px]
      h-[220px]
      rounded-2xl
      bg-gradient-to-br
      from-pink-200
      via-fuchsia-500
      to-purple-900
      p-1
      shadow-2xl
      animate-card3
      "
                      >
                        <div className="w-full h-full rounded-xl bg-white/20 backdrop-blur-md overflow-hidden">
                          <img
                            src="/robo2.png"
                            alt="Robot"
                            className="w-full h-full object-contain p-3"
                          />
                        </div>
                      </div>

                      {/* Glow Lines */}
                      <div className="absolute bottom-0 left-0 w-full flex justify-center">
                        <div className="absolute w-full h-[5px] bg-gradient-to-r from-transparent via-blue-500 to-transparent blur-md" />
                        <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
                        <div className="absolute w-1/2 h-[5px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent blur-md" />
                        <div className="absolute w-1/2 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="bg-[#FFB703] border-4 border-black p-6 shadow-[8px_8px_0px_#000]">
              <FileText size={30} />

              <h3 className="font-black uppercase mt-4">Interviews</h3>

              <p className="text-5xl font-black mt-2">
                {stats.totalInterviews}
              </p>
            </div>

            <div className="bg-[#FB5607] text-white border-4 border-black p-6 shadow-[8px_8px_0px_#000]">
              <Trophy size={30} />

              <h3 className="font-black uppercase mt-4">Completed</h3>

              <p className="text-5xl font-black mt-2">
                {stats.completedInterviews}
              </p>
            </div>

            <div className="bg-[#06D6A0] border-4 border-black p-6 shadow-[8px_8px_0px_#000]">
              <Brain size={30} />

              <h3 className="font-black uppercase mt-4">Avg Score</h3>

              <p className="text-5xl font-black mt-2">
                {stats.averageScore}/10
              </p>
            </div>

            <div className="bg-[#3A86FF] text-white border-4 border-black p-6 shadow-[8px_8px_0px_#000]">
              <Flame size={30} />

              <h3 className="font-black uppercase mt-4">Streak</h3>

              <p className="text-5xl font-black mt-2">{stats.streak}</p>
            </div>
          </div>

          {/* Profile + Actions */}

          <div className="grid lg:grid-cols-2 gap-8 mb-10">
            {/* Profile */}

            <div
              className="
            bg-white
            border-4
            border-black
            p-8
            shadow-[10px_10px_0px_#000]
            "
            >
              <h2 className="text-4xl font-black uppercase mb-6 text-black">
                User Profile
              </h2>

              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <User color="black" />
                  <span className="font-bold text-lg text-black">
                    {(user?.displayName || "No Name").toUpperCase()}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <Mail color="black" />
                  <span className="font-bold text-lg text-black">
                    {user?.email}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}

            <div
              className="
            bg-white
            border-4
            border-black
            p-8
            shadow-[10px_10px_0px_#000]
            "
            >
              <h2 className="text-4xl font-black uppercase mb-6 text-black">
                Quick Actions
              </h2>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => router.push("/interview")}
                  className="
    relative
    overflow-hidden
    flex items-center gap-2
    bg-[#06D6A0]
    text-black
    border-4 border-black
    px-8 py-4
    font-black uppercase
    shadow-[6px_6px_0px_#000]
    hover:-translate-x-1
    hover:-translate-y-1
    hover:shadow-[10px_10px_0px_#000]
    transition-all duration-300
  "
                >
                  {/* Animated Pattern */}
                  <div
                    className="
      absolute inset-0 opacity-20
      bg-[radial-gradient(circle,rgba(255,255,255,0.9)_20%,transparent_20%),radial-gradient(circle,rgba(255,255,255,1)_20%,transparent_20%)]
      bg-[length:8px_8px]
      animate-[dots_0.5s_linear_infinite]
    "
                  />

                  <Play size={18} className="relative z-10" />
                  <span className="relative z-10">Start Interview</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="
    relative
    overflow-hidden
    flex items-center gap-2
    bg-[#FB5607]
    text-white
    border-4 border-black
    px-8 py-4
    font-black uppercase
    shadow-[6px_6px_0px_#000]
    hover:-translate-x-1
    hover:-translate-y-1
    hover:shadow-[10px_10px_0px_#000]
    transition-all duration-300
  "
                >
                  {/* Animated Pattern */}
                  <div
                    className="
      absolute inset-0 opacity-20
      bg-[radial-gradient(circle,rgba(255,255,255,0.9)_20%,transparent_20%),radial-gradient(circle,rgba(255,255,255,1)_20%,transparent_20%)]
      bg-[length:8px_8px]
      animate-[dots_0.5s_linear_infinite]
    "
                  />

                  <LogOut size={18} className="relative z-10" />
                  <span className="relative z-10">Logout</span>
                </button>
              </div>
            </div>
          </div>

          {/* AI Insights */}

          <div
            className="
          bg-white
          border-4
          border-black
          p-8
          shadow-[12px_12px_0px_#000]
          "
          >
            <h2 className="text-4xl font-black uppercase mb-6 text-black">
              AI Insights
            </h2>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-[#92d69c] border-2 border-black p-5 shadow-[4px_4px_0px_#000]">
                <h3 className="font-black text-xl text-black">Strong Area</h3>
                <p className="mt-2 text-black">{strongestSkill}</p>
              </div>

              <div className="bg-[#c49a7a] border-2 border-black p-5 shadow-[4px_4px_0px_#000]">
                <h3 className="font-black text-xl text-black">Focus Area</h3>
                <p className="mt-2 text-black">{weakestSkill}</p>
              </div>

              <div className="bg-[#acc9ee] border-2 border-black p-5 shadow-[4px_4px_0px_#000]">
                <h3 className="font-black text-xl text-black">
                  Recommendation
                </h3>
                <p className="mt-2 text-black">
                  {stats.averageScore >= 8
                    ? "Excellent Performance"
                    : stats.averageScore >= 6
                      ? "Keep Practicing"
                      : "Focus On Improvement"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

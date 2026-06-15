"use client";

import { useEffect, useState } from "react";

export default function Results() {
  const [evaluation, setEvaluation] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("evaluation");

      if (!stored) return;

      const cleaned = stored
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const parsed = JSON.parse(cleaned);

      const normalized = {
        communication:
          parsed.communication ??
          parsed.Communication ??
          0,

        technicalKnowledge:
          parsed.technicalKnowledge ??
          parsed.Technical ??
          parsed.TechnicalKnowledge ??
          0,

        problemSolving:
          parsed.problemSolving ??
          parsed.ProblemSolving ??
          0,

        overall:
          parsed.overall ??
          parsed.Overall ??
          0,

        strengths:
          parsed.strengths ??
          parsed.Strengths ??
          [],

        improvements:
          parsed.improvements ??
          parsed.Improvements ??
          [],

        recommendation:
          parsed.recommendation ??
          parsed.HiringRecommendation ??
          "No recommendation available",
      };

      setEvaluation(normalized);
    } catch (error) {
      console.error("Results Parse Error:", error);
    }
  }, []);

  if (!evaluation) {
    return (
      <div className="min-h-screen bg-[#FFF8E7] flex items-center justify-center p-8">
        <div className="bg-white border-4 border-black p-10 shadow-[12px_12px_0px_#000] text-center">
          <div className="w-14 h-14 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4" />

          <h1 className="text-3xl font-black uppercase">
            Loading Results...
          </h1>
        </div>
      </div>
    );
  }

  const overall = evaluation.overall;

  const status =
    overall >= 8
      ? "Excellent"
      : overall >= 6
      ? "Good"
      : "Needs Improvement";

  const scores = [
    {
      title: "Communication",
      value: evaluation.communication,
      color: "bg-[#FFB703]",
    },
    {
      title: "Technical",
      value: evaluation.technicalKnowledge,
      color: "bg-[#FB5607]",
    },
    {
      title: "Problem Solving",
      value: evaluation.problemSolving,
      color: "bg-[#06D6A0]",
    },
    {
      title: "Overall",
      value: overall,
      color: "bg-[#3A86FF]",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFF8E7] py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="bg-white border-4 border-black p-8 md:p-10 shadow-[12px_12px_0px_#000] mb-10">
          <div className="flex flex-col xl:flex-row gap-8 justify-between">

            <div className="flex-1">
              <span
                className="
                inline-block
                bg-[#3A86FF]
                text-white
                border-2
                border-black
                px-4
                py-2
                text-sm
                font-black
                uppercase
                tracking-widest
              "
              >
                AI Interview Analysis
              </span>

              <h1
                className="
                text-6xl
                md:text-8xl
                font-black
                uppercase
                leading-none
                tracking-tight
                mt-6
                text-black
              "
              >
                Results
              </h1>

              <p className="mt-6 text-lg text-gray-700 font-medium max-w-3xl leading-8">
                Comprehensive evaluation generated from your
                interview performance, communication skills,
                technical knowledge and problem-solving ability.
              </p>
            </div>

            <div
              className="
              bg-[#3A86FF]
              border-4
              border-black
              text-white
              p-8
              min-w-[300px]
              shadow-[10px_10px_0px_#000]
            "
            >
              <p className="uppercase tracking-widest font-bold">
                Overall Score
              </p>

              <h2 className="text-8xl font-black mt-4">
                {overall}
              </h2>

              <p className="text-blue-100">
                out of 10
              </p>

              <div className="mt-6 h-5 bg-white border-2 border-black">
                <div
                  className="h-full bg-black"
                  style={{
                    width: `${overall * 10}%`,
                  }}
                />
              </div>

              <div
                className="
                mt-6
                inline-block
                bg-white
                text-black
                border-2
                border-black
                px-4
                py-2
                font-black
                uppercase
              "
              >
                {status}
              </div>
            </div>

          </div>
        </div>

        {/* SCORE CARDS */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

          {scores.map((score, index) => (
            <div
              key={index}
              className={`
                ${score.color}
                border-4
                border-black
                p-6
                shadow-[8px_8px_0px_#000]
                hover:-translate-y-1
                hover:-translate-x-1
                hover:shadow-[12px_12px_0px_#000]
                transition-all
                duration-200
              `}
            >
              <p className="uppercase text-sm font-black tracking-wide text-black">
                {score.title}
              </p>

              <h2 className="text-6xl font-black mt-4 text-black">
                {score.value}
                <span className="text-2xl">
                  /10
                </span>
              </h2>

              <div className="mt-5 h-5 bg-white border-2 border-black">
                <div
                  className="h-full bg-black"
                  style={{
                    width: `${score.value * 10}%`,
                  }}
                />
              </div>
            </div>
          ))}

        </div>

        {/* STRENGTHS + IMPROVEMENTS */}

        <div className="grid lg:grid-cols-2 gap-8 mb-10">

          {/* Strengths */}

          <div
            className="
            bg-[#D8F3DC]
            border-4
            border-black
            p-8
            shadow-[10px_10px_0px_#000]
          "
          >
            <h2
              className="
              text-4xl
              md:text-5xl
              font-black
              uppercase
              mb-8
              text-black
            "
            >
              Strengths
            </h2>

            <div className="space-y-4">

              {evaluation.strengths?.length > 0 ? (
                evaluation.strengths.map(
                  (item, index) => (
                    <div
                      key={index}
                      className="
                      bg-white
                      border-2
                      border-black
                      p-5
                      shadow-[4px_4px_0px_#000]
                      font-medium
                      text-black
                      leading-7
                    "
                    >
                      ✅ {item}
                    </div>
                  )
                )
              ) : (
                <div className="bg-white border-2 border-black p-5 text-black">
                  No strengths available.
                </div>
              )}

            </div>
          </div>

          {/* Improvements */}

          <div
            className="
            bg-[#FFE8D6]
            border-4
            border-black
            p-8
            shadow-[10px_10px_0px_#000]
          "
          >
            <h2
              className="
              text-4xl
              md:text-5xl
              font-black
              uppercase
              mb-8
              text-black
            "
            >
              Improvements
            </h2>

            <div className="space-y-4">

              {evaluation.improvements?.length > 0 ? (
                evaluation.improvements.map(
                  (item, index) => (
                    <div
                      key={index}
                      className="
                      bg-white
                      border-2
                      border-black
                      p-5
                      shadow-[4px_4px_0px_#000]
                      font-medium
                      text-black
                      leading-7
                    "
                    >
                      ⚡ {item}
                    </div>
                  )
                )
              ) : (
                <div className="bg-white border-2 border-black p-5 text-black">
                  No improvement suggestions available.
                </div>
              )}

            </div>
          </div>

        </div>

        {/* RECOMMENDATION */}

        <div
          className="
          bg-black
          border-4
          border-black
          p-8
          md:p-10
          text-white
          shadow-[12px_12px_0px_#FB5607]
        "
        >
          <h2
            className="
            text-4xl
            md:text-5xl
            font-black
            uppercase
            mb-8
          "
          >
            Hiring Recommendation
          </h2>

          <p className="text-xl leading-10 text-gray-100">
            {evaluation.recommendation}
          </p>
        </div>

      </div>
    </div>
  );
}
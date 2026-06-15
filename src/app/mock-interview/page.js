"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MockInterview() {
  const router = useRouter();

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600);

  useEffect(() => {
    const storedQuestions = localStorage.getItem("interviewQuestions");

    if (storedQuestions) {
      try {
        setQuestions(JSON.parse(storedQuestions));
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleSubmit();
    }
  }, [timeLeft]);

  const handleAnswerChange = (value) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: value,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/evaluate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          questions,
          answers,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Evaluation failed. Please try again.");
        return;
      }

      if (!data?.evaluation) {
        alert("No evaluation received from AI.");
        return;
      }

      const cleanEvaluation = data.evaluation
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      localStorage.setItem("evaluation", cleanEvaluation);
      const evaluationObj = JSON.parse(cleanEvaluation);

      const existingStats = JSON.parse(
        localStorage.getItem("dashboardStats"),
      ) || {
        totalInterviews: 0,
        completedInterviews: 0,
        totalScore: 0,
        averageScore: 0,
        streak: 0,
      };

      existingStats.totalInterviews += 1;
      existingStats.completedInterviews += 1;

      existingStats.totalScore += evaluationObj.overall || 0;

      existingStats.averageScore = Math.round(
        existingStats.totalScore / existingStats.completedInterviews,
      );

      existingStats.streak += 1;

      localStorage.setItem("dashboardStats", JSON.stringify(existingStats));

      router.push("/results");
    } catch (error) {
      console.error(error);

      alert("Something went wrong while evaluating your interview.");
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-200">
        <h1 className="text-4xl font-black text-black">Loading Questions...</h1>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-[#FFF8E7] p-6 overflow-hidden relative">
      {/* Background Shapes */}

      <div className="absolute top-10 left-10 w-28 h-28 bg-[#FFB703] border-4 border-black rotate-12 opacity-20" />

      <div className="absolute bottom-20 right-20 w-32 h-32 bg-[#06D6A0] border-4 border-black -rotate-12 opacity-20" />

      <div className="absolute top-40 right-40 w-20 h-20 bg-[#FB5607] border-4 border-black rotate-45 opacity-20" />

      <div className="max-w-7xl mx-auto">
        {/* Hero */}

        <div
          className="
        bg-white
        border-4
        border-black
        p-8
        shadow-[12px_12px_0px_#000]
        mb-8
        "
        >
          <div className="flex flex-col lg:flex-row justify-between gap-8">
            <div>
              <span
                className="
              inline-block
              bg-[#8338EC]
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
                AI Assessment Lab
              </span>

              <h1
                className="
              text-6xl
              md:text-5xl
              font-black
              uppercase
              leading-none
              mt-5
              text-black
              "
              >
                Interview
                <br />
                Mission
              </h1>

              <p className="mt-4 text-lg text-gray-700 max-w-xl">
                Answer carefully. Your responses will be analyzed by AI and used
                to generate a complete interview report.
              </p>
            </div>

            <div
              className="
            bg-[#FB5607]
            border-4
            border-black
            text-white
            p-8
            shadow-[10px_10px_0px_#000]
            "
            >
              <p className="font-black uppercase">Time Remaining</p>

              <h2 className="text-6xl font-black mt-2">
                {minutes}:{seconds.toString().padStart(2, "0")}
              </h2>
            </div>
          </div>
        </div>

        {/* Main Layout */}

        <div className="grid lg:grid-cols-[1fr_320px] gap-8">
          {/* Left Side */}

          <div>
            {/* Question Card */}

            <div
              className="
            bg-[#DBEAFE]
            border-4
            border-black
            p-8
            shadow-[12px_12px_0px_#000]
            mb-8
            "
            >
              <div className="flex justify-between items-center mb-6">
                <span
                  className="
                bg-black
                text-white
                px-4
                py-2
                font-black
                uppercase
                "
                >
                  Question {currentQuestion + 1}
                </span>

                <span
                  className="
                bg-[#06D6A0]
                border-2
                border-black
                px-3
                py-1
                font-black
                "
                >
                  {questions.length} Total
                </span>
              </div>

              <h2
                className="
              text-3xl
              font-black
              leading-relaxed
              text-black
              "
              >
                {questions[currentQuestion]}
              </h2>
            </div>

            {/* Answer Area */}

            <div
              className="
            bg-white
            border-4
            border-black
            p-8
            shadow-[12px_12px_0px_#000]
            "
            >
              <div
                className="
  bg-white
  border-4
  border-black
  shadow-[10px_10px_0px_#000]
  overflow-hidden
  "
              >
                <div
                  className="
    flex
    justify-between
    items-center

    bg-[#FFB703]

    border-b-4
    border-black

    px-6
    py-3
    "
                >
                  <span className="font-black uppercase">Answer Editor</span>

                  <span className="font-black">
                    {
                      (answers[currentQuestion] || "")
                        .split(/\s+/)
                        .filter(Boolean).length
                    }{" "}
                    Words
                  </span>
                </div>

                <textarea
                  rows={14}
                  value={answers[currentQuestion] || ""}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  placeholder="Start typing your answer..."
                  className="
    w-full
    p-8

    text-xl
    leading-9

    bg-[#FFFDF7]
    text-black

    resize-none
    outline-none
    "
                />
              </div>

              <div className="flex justify-between mt-4 font-black text-sm">
                <span>
                  Words:{" "}
                  {
                    (answers[currentQuestion] || "").split(" ").filter(Boolean)
                      .length
                  }
                </span>

                <span>
                  Characters: {(answers[currentQuestion] || "").length}
                </span>
              </div>

              {/* Buttons */}

              <div className="flex flex-wrap gap-4 mt-8">
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className="
                bg-gray-700
                text-white
                border-4
                border-black
                px-6
                py-3
                font-black
                shadow-[6px_6px_0px_#000]
                "
                >
                  Previous
                </button>

                <button
                  onClick={handleNext}
                  disabled={currentQuestion === questions.length - 1}
                  className="
                bg-[#3A86FF]
                text-white
                border-4
                border-black
                px-6
                py-3
                font-black
                shadow-[6px_6px_0px_#000]
                "
                >
                  Next
                </button>

                <button
                  onClick={handleSubmit}
                  className="
                bg-[#06D6A0]
                text-black
                border-4
                border-black
                px-8
                py-3
                font-black
                shadow-[6px_6px_0px_#000]
                hover:-translate-y-1
                hover:shadow-[10px_10px_0px_#000]
                transition-all
                "
                >
                  Submit Interview
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel */}

          <div className="space-y-6">
            {/* Progress */}

            <div
              className="
            bg-white
            border-4
            border-black
            p-6
            shadow-[10px_10px_0px_#000]
            "
            >
              <h3 className="font-black uppercase mb-4">Progress</h3>

              <div className="h-5 border-4 border-black bg-white">
                <div
                  className="bg-[#06D6A0] h-full"
                  style={{
                    width: `${
                      ((currentQuestion + 1) / questions.length) * 100
                    }%`,
                  }}
                />
              </div>

              <p className="mt-3 font-black">
                {currentQuestion + 1} / {questions.length}
              </p>
            </div>

            {/* Navigator */}

            <div
              className="
            bg-white
            border-4
            border-black
            p-6
            shadow-[10px_10px_0px_#000]
            "
            >
              <h3 className="font-black uppercase mb-4">Navigator</h3>

              <div className="grid grid-cols-5 gap-2">
                {questions.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentQuestion(idx)}
                    className={`
                  border-2
                  border-black
                  p-2
                  font-black
                  ${
                    idx === currentQuestion
                      ? "bg-[#FB5607] text-white"
                      : "bg-white"
                  }
                  `}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* AI Status */}

            <div
              className="
            bg-[#8338EC]
            text-white
            border-4
            border-black
            p-6
            shadow-[10px_10px_0px_#000]
            "
            >
              <h3 className="font-black uppercase">AI Status</h3>

              <p className="mt-3 text-lg">🟢 Ready For Evaluation</p>
            </div>

            {/* AI Monitor */}

<div
  className="
  relative
  bg-white
  border-4
  border-black
  shadow-[10px_10px_0px_#000]
  overflow-hidden
  "
>
  {/* Background Grid */}

  <div className="absolute inset-0 opacity-10">
    <div
      className="
      w-full
      h-full
      bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)]
      bg-[size:20px_20px]
      "
    />
  </div>

  {/* Scan Line */}

  <div
    className="
    absolute
    top-0
    left-0
    w-full
    h-2
    bg-[#06D6A0]
    animate-pulse
    "
  />

  {/* Header */}

  <div
    className="
    bg-[#FF006E]
    border-b-4
    border-black
    p-4
    flex
    justify-between
    items-center
    "
  >
    <h3 className="font-black text-white uppercase">
      Live AI Monitor
    </h3>

    <span
      className="
      bg-white
      text-black
      px-2
      py-1
      border-2
      border-black
      text-xs
      font-black
      "
    >
      ONLINE
    </span>
  </div>

  <div className="p-5 relative z-10">

    {/* Status Dots */}

    <div className="space-y-4">

      <div className="flex items-center gap-3">
        <div className="w-4 h-4 rounded-full bg-green-500 animate-ping" />
        <span className="font-black text-sm">
          Evaluation Engine Active
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-4 h-4 rounded-full bg-[#3A86FF] animate-bounce" />
        <span className="font-black text-sm">
          Question Analyzer Ready
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-4 h-4 rounded-full bg-[#FFB703] animate-pulse" />
        <span className="font-black text-sm">
          Response Scanner Running
        </span>
      </div>

    </div>

    {/* Fake Terminal */}

    <div
      className="
      mt-5
      bg-black
      text-[#06D6A0]
      p-3
      border-2
      border-black
      font-mono
      text-xs
      "
    >
      <p>{">"} Loading Interview Metrics...</p>
      <p>{">"} AI Confidence: 98%</p>
      <p>{">"} Ready For Submission ✓</p>
    </div>

    {/* Floating Elements */}

    <div
      className="
      absolute
      top-5
      right-4
      w-5
      h-5
      bg-[#FFB703]
      border-2
      border-black
      rotate-12
      animate-spin
      "
      style={{
        animationDuration: "8s",
      }}
    />

    <div
      className="
      absolute
      bottom-5
      right-8
      w-4
      h-4
      bg-[#3A86FF]
      border-2
      border-black
      animate-bounce
      "
    />

  </div>
</div>
          </div>
        </div>
      </div>
    </div>
  );
}

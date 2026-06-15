import { evaluateAnswer } from "@/lib/gemini";

export async function POST(req) {
  try {
    const body =
      await req.json();

    const {
      questions,
      answers,
    } = body;

    const evaluation =
      await evaluateAnswer(
        questions,
        answers
      );

    return Response.json({
      success: true,
      evaluation,
    });
  } catch (error) {
    console.error(
      "API Error:",
      error
    );

    return Response.json(
      {
        success: false,
        message:
          "AI evaluation service is temporarily unavailable. Please try again in a few moments.",
      },
      {
        status: 500,
      }
    );
  }
}
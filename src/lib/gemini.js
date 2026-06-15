import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateQuestion(role, experience, difficulty) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  // log available models for debugging
  try {
    console.log(await genAI.listModels());
  } catch (e) {
    // ignore listing errors
  }
  const prompt = `Generate 10 interview questions.
Role: ${role}
Experience: ${experience}
Difficulty: ${difficulty}

Only returned numbered questions.`;
  try {
    const result = await model.generateContent(prompt);
    if (result?.response?.text) return result.response.text();
    if (result?.output?.[0]?.content?.[0]?.text)
      return result.output[0].content[0].text;
    return JSON.stringify(result);
  } catch (error) {
    console.error("gemini error: ", error);
    throw error;
  }
}

export async function evaluateAnswer(
  questions,
  answers
) {
  const model =
    genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

  const prompt = `
You are a senior technical interviewer.

Questions:
${questions.join("\n")}

Answers:
${JSON.stringify(
  answers,
  null,
  2
)}

Evaluate the candidate.

Return ONLY valid JSON.

{
  "communication": 0,
  "technicalKnowledge": 0,
  "problemSolving": 0,
  "overall": 0,
  "strengths": [],
  "improvements": [],
  "recommendation": ""
}
`;

  let retries = 3;

  while (retries > 0) {
    try {
      const result =
        await model.generateContent(
          prompt
        );

      const text =
        result.response.text();

      return text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
    } catch (error) {
      retries--;

      if (retries === 0) {
        throw error;
      }

      await new Promise((resolve) =>
        setTimeout(resolve, 2000)
      );
    }
  }
}
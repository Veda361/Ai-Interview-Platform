import { generateQuestion } from "@/lib/gemini";

export async function POST(req) {
    try{
        const body = await req.json();

        const {
            role,
            experience,
            difficulty
        } = body;

        const questions = 
            await generateQuestion(
                role,
                experience,
                difficulty
            );

            return Response.json({
                success: true,
                questions
            });
    }catch(error){
        return Response.json({
            success: false,
            message: error.message,
        },
    {
        status: 500,
    });
    }
}
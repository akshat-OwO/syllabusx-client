import { AiCompletionSchema, AiSchema } from "@/lib/schemas";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenerativeAIStream, StreamingTextResponse } from "ai";

export const runtime = "edge";

export async function POST(req: Request) {
    const { prompt, key } = await req.json();

    const validatedPrompt = AiCompletionSchema.safeParse({ text: prompt });
    const validatedKey = AiSchema.safeParse({ key });

    if (!validatedPrompt.success)
        return Response.json({ error: "Invalid prompt" }, { status: 403 });
    if (!validatedKey.success)
        return Response.json({ error: "Invalid key" }, { status: 403 });

    const genAI = new GoogleGenerativeAI(validatedKey.data.key);

    const response = await genAI
        .getGenerativeModel({ model: "gemini-pro" })
        .generateContentStream({
            contents: [
                { role: "user", parts: [{ text: validatedPrompt.data.text }] },
            ],
        });

    const stream = GoogleGenerativeAIStream(response);

    return new StreamingTextResponse(stream);
}

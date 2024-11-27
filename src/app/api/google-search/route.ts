import { AiSchema } from "@/lib/schemas";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenerativeAIStream, Message, StreamingTextResponse } from "ai";

export const runtime = "edge";

const buildGoogleGenAIPrompt = (messages: Message[]) => ({
    contents: messages
        .filter(
            (message) => message.role === "user" || message.role === "assistant" || message.role === "system"
        )
        .map((message) => ({
            role: message.role === "user" ? "user" : "model",
            parts: [{ text: message.content }],
        })),
});

export async function POST(req: Request) {
    const { messages, key, model } = await req.json();

    const validatedAI = AiSchema.safeParse({ key, model });

    if (!validatedAI.success)
        return Response.json({ error: "Invalid key" }, { status: 403 });

    const genAI = new GoogleGenerativeAI(validatedAI.data.key);

    const geminiStream = await genAI
        .getGenerativeModel({ model: validatedAI.data.model })
        .generateContentStream(buildGoogleGenAIPrompt(messages));

    const stream = GoogleGenerativeAIStream(geminiStream);

    return new StreamingTextResponse(stream);
}

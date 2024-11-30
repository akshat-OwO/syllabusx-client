import { AiSchema } from "@/lib/schemas";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { CoreMessage, streamText } from "ai";

export const runtime = "edge";

const buildGoogleGenAIPrompt = (messages: CoreMessage[]) => ({
    contents: messages
        .filter((message) => message.role === "user" || message.role === "assistant" || message.role === "system")
        .map((message) => ({
            role: message.role === "user" ? "user" : "model",
            parts: [{ text: message.content }],
        })),
});

export async function POST(req: Request) {
    const { messages, key, model } = await req.json();

    const validatedAI = AiSchema.safeParse({ key, model });

    if (!validatedAI.success) return Response.json({ error: "Invalid key" }, { status: 403 });

    const genAI = createGoogleGenerativeAI({
        apiKey: validatedAI.data.key,
    });

    const result = streamText({
        model: genAI(validatedAI.data.model),
        messages,
    });

    return result.toDataStreamResponse();
}

import { AiOperations, AiSchema } from "@/lib/schemas";
import { AnthropicProvider, createAnthropic } from "@ai-sdk/anthropic";
import { GoogleGenerativeAIProvider, createGoogleGenerativeAI } from "@ai-sdk/google";
import { OpenAIProvider, createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

export const runtime = "edge";

export async function POST(req: Request) {
    const { type, ai, messages } = await req.json();

    const validatedAI = AiSchema.safeParse(ai);

    if (!validatedAI.success) return Response.json({ error: "Invalid AI model" }, { status: 403 });

    const validatedAIOperations = AiOperations.safeParse(type);

    if (!validatedAIOperations.success) return Response.json({ error: "Invalid AI Operation" }, { status: 403 });

    let aiProvider: GoogleGenerativeAIProvider | AnthropicProvider | OpenAIProvider;
    switch (validatedAI.data.model) {
        case "gemini-1.5-pro":
        case "gemini-1.5-flash":
            aiProvider = createGoogleGenerativeAI({
                apiKey: validatedAI.data.key,
            });
            break;
        case "gpt-4":
        case "gpt-4o":
        case "gpt-4o-mini":
        case "gpt-4-turbo":
            aiProvider = createOpenAI({
                apiKey: validatedAI.data.key,
            });
            break;
        case "claude-3-opus-latest":
        case "claude-3-5-haiku-latest":
        case "claude-3-5-sonnet-latest":
            aiProvider = createAnthropic({
                apiKey: validatedAI.data.key,
            });
            break;
        default:
            return Response.json({ error: "AI model not supported" }, { status: 403 });
    }

    switch (validatedAIOperations.data) {
        case "search":
            const result = streamText({
                model: aiProvider(validatedAI.data.model),
                messages,
            });

            return result.toDataStreamResponse();
        case "mock":
            break;
        default:
            return Response.json({ error: "No AI Operation was provided" }, { status: 403 });
    }
}

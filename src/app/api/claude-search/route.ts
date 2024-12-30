import { AiSchema } from "@/lib/schemas";
import { createAnthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";

export const runtime = "edge";

export async function POST(req: Request) {
    const { messages, key, model } = await req.json();

    const validatedAI = AiSchema.safeParse({ key, model });

    if (!validatedAI.success) return Response.json({ error: "Invalid key" }, { status: 403 });

    const anthropic = createAnthropic({ apiKey: validatedAI.data.key });

    const result = streamText({
        model: anthropic(validatedAI.data.model),
        messages,
    });

    return result.toDataStreamResponse();
}
import { AiSchema } from "@/lib/schemas";
import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";

export const runtime = "edge";

export async function POST(req: Request) {
    const { messages, key, model } = await req.json();

    const validatedAI = AiSchema.safeParse({ key, model });

    if (!validatedAI.success)
        return Response.json({ error: "Invalid key" }, { status: 403 });

    const openai = new OpenAI({ apiKey: validatedAI.data.key });

    const response = await openai.chat.completions.create({
        model: validatedAI.data.model,
        stream: true,
        messages,
    });

    const stream = OpenAIStream(response);

    return new StreamingTextResponse(stream);
}

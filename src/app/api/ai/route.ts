import { notifyMockGeneration } from "@/lib/discord-client";
import { endSemMockTemplate, midSemMockTemplate, newEndSemMockTemplate } from "@/lib/prompt";
import { AiOperations, AiSchema, MockPayloadSchema, MockSchema } from "@/lib/schemas";
import { AnthropicProvider, createAnthropic } from "@ai-sdk/anthropic";
import { GoogleGenerativeAIProvider, createGoogleGenerativeAI } from "@ai-sdk/google";
import { OpenAIProvider, createOpenAI } from "@ai-sdk/openai";
import { generateObject, streamText } from "ai";

export const runtime = "edge";

export async function POST(req: Request) {
    const { type, ai, messages, mock } = await req.json();

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
            const validatedMockPayload = MockPayloadSchema.safeParse(mock);

            if (!validatedMockPayload.success) return Response.json({ error: "Bad Request" }, { status: 400 });

            const { maxMarks, semester, branch, subject, topics } = validatedMockPayload.data;

            try {
                const { object } = await generateObject({
                    model: aiProvider(validatedAI.data.model),
                    schema: MockSchema,
                    prompt:
                        validatedMockPayload.data.type === "midSem"
                            ? midSemMockTemplate`${semester}${branch}${subject}${topics}`
                            : maxMarks === 75
                              ? endSemMockTemplate`${semester}${branch}${subject}${topics}`
                              : newEndSemMockTemplate`${semester}${branch}${subject}${topics}`,
                });

                const selectedUnits = topics
                    .map((topicArray: string[], index: number) => (topicArray.length > 0 ? `Unit ${index + 1}` : null))
                    .filter((unit: string | null): unit is string => unit !== null);

                try {
                    await notifyMockGeneration({
                        subject,
                        semester,
                        branch,
                        type: validatedMockPayload.data.type,
                        maxMarks: validatedMockPayload.data.type === "midSem" ? 30 : maxMarks,
                        units: selectedUnits,
                        mockData: object,
                    });
                } catch (discordError) {
                    console.error("Discord notification failed:", discordError);
                }

                return Response.json(object, { status: 200 });
            } catch (error) {
                console.error("Error generating mock test:", error);
                return Response.json({ error: "Failed to generate mock test" }, { status: 500 });
            }
        default:
            return Response.json({ error: "No AI Operation was provided" }, { status: 403 });
    }
}

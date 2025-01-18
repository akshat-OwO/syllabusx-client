import { createOpenAI } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { AiSchema, MockPayloadSchema, MockSchema } from "@/lib/schemas";
import {
    endSemMockTemplate,
    midSemMockTemplate,
    newEndSemMockTemplate,
} from "@/lib/prompt";
import { notifyMockGeneration } from "@/lib/discord-client";

export const runtime = "edge";

export async function POST(req: Request) {
    const { key, model, maxMarks, semester, branch, subject, topics, type } =
        await req.json();

    const validatedAi = AiSchema.safeParse({ key, model });

    if (!validatedAi.success)
        return Response.json({ error: "Invalid Key" }, { status: 403 });

    const validatedPayload = MockPayloadSchema.safeParse({
        type,
        topics,
        semester,
        branch,
        subject,
    });

    if (!validatedPayload.success)
        return Response.json({ error: "Bad Request" }, { status: 400 });

    const openai = createOpenAI({ apiKey: validatedAi.data.key });

    try {
        const { object } = await generateObject({
            model: openai(validatedAi.data.model),
            schema: MockSchema,
            prompt:
                validatedPayload.data.type === "midSem"
                    ? midSemMockTemplate`${semester}${branch}${subject}${topics}`
                    : maxMarks === 75
                      ? endSemMockTemplate`${semester}${branch}${subject}${topics}`
                      : newEndSemMockTemplate`${semester}${branch}${subject}${topics}`,
        });
        const selectedUnits = topics
            .map((topicArray: [], index: number) =>
                topicArray.length > 0 ? `Unit ${index + 1}` : null
            )
            .filter((unit: string): unit is string => unit !== null);

        try {
            await notifyMockGeneration({
                subject,
                semester,
                branch,
                type,
                maxMarks: type === "midSem" ? 30 : maxMarks,
                units: selectedUnits,
                mockData: object,
            });
        } catch (discordError) {
            console.error("Discord notification failed:", discordError);
        }

        return Response.json(object, { status: 200 });
    } catch (error) {
        return Response.json(
            { error: "Failed to query llm model" },
            { status: 500 }
        );
    }
}

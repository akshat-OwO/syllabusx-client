import * as z from "zod";

export const FeedbackSchema = z.object({
    email: z.string().email(),
    name: z.string().min(5),
    course: z.string().min(2),
    college: z.string().min(5),
    semester: z
        .string()
        .min(1)
        .refine((num) => typeof Number(num) === "number"),
    branch: z.string().min(2),
    query: z.string(),
});

export type TFeedbackSchema = z.infer<typeof FeedbackSchema>;

const aiModels = z.enum(["gemini-1.5-flash", "gemini-1.5-pro", "gpt-4o", "gpt-4o-mini", "gpt-4-turbo", "gpt-4","claude3-sonnet","claude3-opus","claude3-haiku"]);
export type TaiModels = z.infer<typeof aiModels>;

export const AiSchema = z.object({
    key: z.string(),
    model: aiModels,
});

export type TAiSchema = z.infer<typeof AiSchema>;

export const AiSearchSchema = z.object({
    prompt: z.string().min(10),
});

export type TAiSearchSchema = z.infer<typeof AiSearchSchema>;

export const datesheetSchema = z.object({
    name: z.string().min(1),
    date: z.date(),
});

export type TDatesheetSchema = z.infer<typeof datesheetSchema>;

export const MockPayloadSchema = z.object({
    type: z.enum(["midSem", "endSem"]),
    topics: z.array(z.array(z.string())),
    semester: z.string(),
    branch: z.string(),
    subject: z.string(),
});

export type TMockPayloadSchema = z.infer<typeof MockPayloadSchema>;

export const MockSchema = z.object({
    output: z.object({
        examMetadata: z.object({
            totalMarks: z.number().min(0),
            totalQuestions: z.number().min(0),
            questionsToAttempt: z.number().min(0),
            type: z.enum(["midSem", "endSem"]),
            subject: z.string(),
            duration: z.string(),
        }),
        questions: z.array(
            z.object({
                questionNumber: z.number().min(1),
                content: z.array(
                    z.object({
                        subQuestion: z.string(),
                        marks: z.number().min(0),
                    })
                ),
                totalMarks: z.number().min(0),
                unit: z.number().min(1).max(4),
                isCompulsory: z.boolean(),
                alternativeQuestionNumber: z.number().nullable(),
                topicsCovered: z.array(z.string()),
            })
        ),
    }),
});

export type TMockSchema = z.infer<typeof MockSchema>;

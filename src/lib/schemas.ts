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

export const AiSchema = z.object({
    key: z.string(),
});

export type TAiSchema = z.infer<typeof AiSchema>;

export const AiCompletionSchema = z.object({
    text: z.string().min(10),
});

export type TAiCompletionSchema = z.infer<typeof AiCompletionSchema>;
